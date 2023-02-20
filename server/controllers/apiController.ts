import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { objInterface } from './objInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

//function for user sign up api call
export async function POST_sign_up(req: Request, res: Response, next: NextFunction){
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        //firstName: req.body.firstName,
        //lastName: req.body.lastName,
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
        const token = jwt.sign({user}, `${process.env.SECRET}`, {expiresIn: '15m'});
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
        apiObj['id']= Math.floor(Math.random() * 9000);
        apiObj['name']=`${ingr}`;

        res.json({data:apiObj});
    }else{
        res.json({data:'error with item'})
    }
}

//validate token passed from api call header
export function GET_validate(req: Request, res: Response){
    /* const authHeader = req.headers['authorization'];
 
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
    } */
    res.json({message:'success'});
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
export function GET_collection(req: Request, res: Response){
    
}

//return sorted collection of diary entries
export function GET_sortedCollection(req: Request, res: Response){
    //sort datat then return data back
}

//create new day entry
export function POST_newEntry(req: Request, res: Response){
    
}

//update db with send data
export function POST_update(req: Request, res: Response){
    
}

//get diary
export async function GET_diary(req: Request, res: Response){
    //return array from db
}
