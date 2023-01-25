import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

//make api call to edamam
export async function GET_NUTR_info(req: Request, res: Response){
    const ingr:string = '1 lb chicken breast'
    const apiResponse: any = await axios(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
    //let response:any = await apiResponse.json();
    res.json({data:apiResponse.data.totalNutrients});
}