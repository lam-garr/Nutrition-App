import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { objInterface } from './objInterface';
import { entryInterface } from './entryInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';
import mongo from 'mongodb'
import axios from 'axios';
import { request } from 'http';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

//function for user sign up api call
export async function POST_sign_up(req: Request, res: Response, next: NextFunction){
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        myID: uuid(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPw
    }).save(err => {
        if(err){
            return next(err);
        }else{
            res.json({message:'Success'});
        }
    })
}

//function for user log in api call
export async function POST_log_in(req: Request, res: Response){
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
    if(ingr==''){
        ingr = '1 large apple'
    }
    //const ingr = '1 sofa';
    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
    //let response:any = await apiResponse.json();
    //const apiObj: objInterface = createObj(apiResponse.data.totalNutrients, ingr);
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
    //res.json({message:'success'});
}

//test fn to return accesstoken
export function TOKEN(req: Request, res: Response){
    if(req.body.username === 'fuck'){
        res.json({AccessToken:'696969420'})
    }else{
        res.status(400).json({message:'error'})
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
    //takes in an array and returns it sorted
    //res.json(req.body.arr.sort((a,b)=>a-b))
    //function compare(a,b){
    //return a.y-b.y
    //}
    const user = await User.findOne({myID:req.id.id});

    if(user && req.query.sort === 'calorie high'){
        //const target = user.myData.find(obj => obj.id === '0347d1f0-e511-4b0d-b9b0-84c6da9c3271');
        res.json({arrHigh: user.myData.sort((a: entryInterface, b: entryInterface) => b.calories - a.calories)})
    }

    if(user && req.query.sort === 'calorie low'){
        res.json({arrLow: user.myData.sort((a: entryInterface, b: entryInterface) => a.calories - b.calories)})
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
        res.status(200).json({myArr:target.diary});
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
        //target.calories = target.calories + (-Math.abs(Math.round(0)));
        target.calories = target.diary.reduce((total: number, item: objInterface) => total + Math.round(item.ENERC_KCAL.quantity), 0);
        user.markModified("myData");
        user.save()
        res.json({myArr:target.diary})
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
        console.log(target.day)
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

    if(user && req.query.sort === 'calorie high'){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        //const target = user.myData.find(obj => obj.id === '0347d1f0-e511-4b0d-b9b0-84c6da9c3271');
        res.json({arrHigh: target.diary.sort((a: objInterface, b: objInterface) => b.ENERC_KCAL.quantity - a.ENERC_KCAL.quantity)})
    }

    if(user && req.query.sort === 'calorie low'){
        const target = user.myData.find(obj => obj.id === req.body.diaryId);
        res.json({arrHigh: target.diary.sort((a: objInterface, b: objInterface) => a.ENERC_KCAL.quantity - b.ENERC_KCAL.quantity)})
    }
}

//after an update re sign with jwt, send token back to front end and re-set it to localstorage
//63fc20a1f0bad1b9a8c2589a