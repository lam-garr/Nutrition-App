import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//function for index api call
export function GET_index(req: Request, res: Response){
    res.json({message:'Welcome!!!'});
}

