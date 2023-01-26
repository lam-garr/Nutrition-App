import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { objInterface } from './objInterface';
import { createObj } from './createObj';
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
export async function POST_log_in(req: Request, res: Response, next: NextFunction){
    const user = await User.findOne({username: req.body.username});

    if(user &&(await bcrypt.compare(req.body.password, user.password))){
        const token = jwt.sign(user._id, `${process.env.SECRET}`, {expiresIn: '15m'});
        res.json({accessToken: token});
    }else{
        res.status(400).json({message:'Login Error'});
    }
}

//make api call to edamam
export async function GET_NUTR_info(req: Request, res: Response){
    const ingr = req.query.search;
    //const ingr = '1 banana';
    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
    //let response:any = await apiResponse.json();
    const apiObj: objInterface = createObj(apiResponse.data.totalNutrients, ingr);
    res.json({data:apiObj});
}

///[a-zA-Z]+|[0-9]+/g
/**    const split = (apiObj.calories).match(/[a-z]+|[^a-z]+/gi);
    if(split){
        const kcal = `${split[0]} ${split[1]}`
        console.log(kcal);
    }
 */

