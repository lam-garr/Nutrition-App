import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

//connect to MONGO database
const mongoDB = `${process.env.MOGNODB}`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'db connection error'));

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})