import express, { Request, Response, NextFunction } from 'express';
import { GET_index, GET_NUTR_info, POST_sign_up, POST_log_in, GET_validate, TOKEN, POST_collection, GET_sortedCollection, POST_newEntry, POST_update, POST_diary, verifyToken, POST_deleteItem, POST_date } from '../controllers/apiController';
import User from '../models/user';

const router = express.Router();

router.get('/', GET_index);

router.get('/nutr', GET_NUTR_info);

router.post('/sign-up', POST_sign_up);

router.post('/log-in', POST_log_in);

router.get('/validate', GET_validate);

router.post('/collections', verifyToken, POST_collection);

router.get('/sort-colle', verifyToken, GET_sortedCollection);

router.post('/new-entry', verifyToken, POST_newEntry);

router.post('/update', verifyToken, POST_update);

router.post('/delete-item', verifyToken, POST_deleteItem);

router.post('/user-diary', verifyToken, POST_diary);

router.post('/update-date', verifyToken, POST_date);

export default router;