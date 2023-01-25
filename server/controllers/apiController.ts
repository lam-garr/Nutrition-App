import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { nextTick } from 'process';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

//function for user sign up api call
export async function POST_sign_up(req: Request, res: Response, next: NextFunction){
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
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

//make api call to edamam
export async function GET_NUTR_info(req: Request, res: Response){
    const ingr:string = '1 lb chicken breast'
    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
    //let response:any = await apiResponse.json();
    res.json({data:apiResponse.data.totalNutrients});
}