import express from 'express';
import { GET_index, GET_NUTR_info, POST_sign_up, POST_log_in, GET_validate, TOKEN, GET_collection, GET_sortedCollection, POST_newEntry, POST_update, GET_diary, verifyToken } from '../controllers/apiController';

const router = express.Router();

router.get('/', GET_index);

router.get('/nutr', GET_NUTR_info);

router.post('/sign-up', POST_sign_up);

router.post('/log-in', POST_log_in);

router.get('/validate', GET_validate);

router.post('/login', TOKEN);

router.get('/collections', verifyToken, GET_collection);

router.get('/sort-colle', verifyToken, GET_sortedCollection);

router.post('/new-entry', verifyToken, POST_newEntry);

router.post('/update', verifyToken, POST_update);

router.post('/user-diary', verifyToken, GET_diary);

export default router;