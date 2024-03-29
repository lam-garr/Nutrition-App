import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { objInterface } from './objInterface';
import { entryInterface } from './entryInterface';
import { sortArray } from './sortArray';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';
import mongo from 'mongodb'
import axios from 'axios';
import { request } from 'http';
import { validationResult } from 'express-validator';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

//function for user sign up api call
export async function POST_sign_up(req: Request, res: Response, next: NextFunction){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message:'Signup Error'});
    }

    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        username: req.body.username,
        myID: uuid(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPw
    });

    if(user){
        res.json({message:'Success'});
    }else {
        res.json({message:'error'});
    }
}

//function for user log in api call
export async function POST_log_in(req: Request, res: Response){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message:'Login Error'});
    }

    const user = await User.findOne({username: req.body.username});

    if(user &&(await bcrypt.compare(req.body.password, user.password))){
        const id = user.myID;
        const token = jwt.sign({id}, `${process.env.SECRET}`, {expiresIn: '24h'});
        res.json({accessToken: token});
    }else{
        res.status(400).json({message:'Login Error'});
    }
}

//make api call to edamam
export async function GET_NUTR_info(req: Request, res: Response){
    let ingr = req.query.search;

    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
    const apiObj: objInterface = apiResponse.data.totalNutrients;

    //check if object has empty properties
    if(apiObj.ENERC_KCAL){
        apiObj['id']= uuid();
        apiObj['name']=`${ingr}`;

        res.json({data:apiObj});
    }else{
        res.json({data:'error with item'})
    }
}

//validate token passed from api call header
export function GET_validate(req: Request, res: Response){
    const authHeader = req.headers['authorization'];
 
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
            if(err){
                return res.json({message:'error'});
            }else{
                return res.json({message:'success'});
            }
        })
    }else{
        res.json({message:'none'})
    } 
}

//return collection of diary entries
export async function POST_collection(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});
    if(user){
        res.json({myArr:user.myData})
    }else{
        res.status(403);
    }
}

//return sorted collection of diary entries
export async function GET_sortedCollection(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user && req.query.sort === 'calorie high'){
        res.json({arrData: user.myData.sort((a: entryInterface, b: entryInterface) => b.calories - a.calories)})
    }

    if(user && req.query.sort === 'calorie low'){
        res.json({arrData: user.myData.sort((a: entryInterface, b: entryInterface) => a.calories - b.calories)})
    }
} 

//create new day entry and push to array
export async function POST_newEntry(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        const newEntry: entryInterface = {id: uuid(), day:`${req.body.day}/${req.body.month}/${req.body.year}`, calories: 0, diary:[]};
        user.myData.push(newEntry);
        user.markModified("myData");
        user.save();
        res.status(203).json({id: newEntry.id, myArr: user.myData});
    }else{
        res.status(400);
    }
}

//add data to user diary array
export async function POST_update(req: Request, res: Response){
    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${req.body.item}`);
    const apiObj: objInterface = apiResponse.data.totalNutrients;

    const user = await User.findOne({myID:req.id.id});

    if(!user) {
        res.status(404).json({fatalError:"fatalError"});
    }

    //check if object has empty properties & if user exists
    if((apiObj.ENERC_KCAL) && (user)){
        apiObj['id']= uuid();
        apiObj['name']=`${req.body.item}`;
        //add item to db array
        const target = user.myData.find(obj => obj.id === req.body.id);
        target.diary.push(apiObj);
        //update calories value in myData array
        target.calories = target.diary.reduce((total: number, item: objInterface) => total + Math.round(item.ENERC_KCAL.quantity), 0);
        user.markModified("myData");
        user.save()     
        res.status(200).json({myArr:sortArray(target.diary,req.body.sort)});
    }else{
        res.status(404).json({err:'error with item'});
    }
}

//delete item from diary
export async function POST_deleteItem(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        target.diary = target.diary.filter((obj: objInterface) => obj.id !== req.body.delId);
        target.calories = target.diary.reduce((total: number, item: objInterface) => total + Math.round(item.ENERC_KCAL.quantity), 0);
        user.markModified("myData");
        user.save()
        res.json({myArr:sortArray(target.diary,req.body.sort)})
    }else{
        res.status(404);
    }
}

//get diary
export async function POST_diary(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        res.json({myArr:target.diary, date: target.day})
    }else{
        res.status(404);
    }
}

//middleware to validate JWT
export async function verifyToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, `${process.env.SECRET}`, (err, user)=>{ 
            if(err){
                return res.status(403).json(err);
            }
            req.id = user;
            next();
        })
    }else{
        res.status(400);
    }
}

//update date being passed into req.body to db
export async function POST_date(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        target.day = `${req.body.newDay}/${req.body.newMonth}/2023`;
        user.markModified("myData");
        user.save()
        res.status(200);
    }else{
        res.status(400);
    }
}

//return sorted items
export async function POST_sortDiary(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        res.json({arrData: sortArray(target.diary, req.body.sort)})
    }
}

//delete diary entry by id
export async function POST_deleteDiary(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        user.myData = user.myData.filter((obj: entryInterface) => obj.id !== req.body.delId);
        user.markModified("myData");
        user.save();
        res.json({myArr:user.myData})
    }else{
        res.status(404);
    }
}

//returns users account info
export async function GET_userInfo(req: Request, res: Response){
    const user = await User.findOne({myID:req.id.id});

    if(user){
        res.json({fName:user.firstName, username: user.username});
    }else{
        res.status(404);
    }
}

export async function POST_setFromStorage(req: Request, res: Response) {
    const user = await User.findOne({myID:req.id.id});
    
    if(user) {
        let target = user.myData.find(obj => obj.id === req.body.diaryId);
        target.diary = req.body.storageData;
        target.calories = target.diary.reduce((total: number, item: objInterface) => total + Math.round(item.ENERC_KCAL.quantity), 0);
        res.json({myArr:target.diary, date: target.day})
    }else {
        res.status(404);
    }
}
