import express, { Request, Response, NextFunction } from 'express';
import { GET_index, GET_NUTR_info, POST_sign_up,
    POST_log_in, GET_validate, GET_userInfo,
    POST_collection, GET_sortedCollection, POST_newEntry,
    POST_update, POST_diary, verifyToken, POST_deleteItem,
    POST_date, POST_sortDiary, POST_deleteDiary } from '../controllers/apiController';
import { check, validationResult } from "express-validator";
import User from '../models/user';

const router = express.Router();

router.get('/', GET_index);

router.get('/nutr', GET_NUTR_info);

router.post('/sign-up',[check(["username", "firstName", "lastName", "password"])
    .trim()
    .notEmpty()
    .escape()
], POST_sign_up);

router.post('/log-in', [check(["username", "password"])
    .trim()
    .notEmpty()
    .escape()
], POST_log_in);

router.get('/validate', GET_validate);

router.post('/collections', verifyToken, POST_collection);

router.get('/sort-colle', verifyToken, GET_sortedCollection);

router.post('/new-entry', verifyToken, POST_newEntry);

router.post('/update', verifyToken, POST_update);

router.post('/delete-item', verifyToken, POST_deleteItem);

router.post('/user-diary', verifyToken, POST_diary);

router.post('/update-date', verifyToken, POST_date);

router.post('/sort-diary', verifyToken, POST_sortDiary);

router.post('/delete-diary', verifyToken, POST_deleteDiary);

router.get('/user-account', verifyToken, GET_userInfo);

export default router;