import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})