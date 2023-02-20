import express from 'express';
import { GET_index, GET_NUTR_info, POST_sign_up, POST_log_in, GET_validate, TOKEN, GET_collection, GET_sortedCollection, POST_newEntry, POST_update, GET_diary } from '../controllers/apiController';

const router = express.Router();

router.get('/', GET_index);

router.get('/nutr', GET_NUTR_info);

router.post('/sign-up', POST_sign_up);

router.post('/log-in', POST_log_in);

router.get('/validate', GET_validate);

router.post('/login', TOKEN);

router.get('/collections', GET_collection);

router.get('/sort-colle', GET_sortedCollection);

router.post('/new-entry', POST_newEntry);

router.post('/update', POST_update);

router.get('/populate', GET_diary);

export default router;