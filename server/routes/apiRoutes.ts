import express from 'express';
import { GET_index, GET_NUTR_info, POST_sign_up } from '../controllers/apiController';

const router = express.Router();

router.get('/', GET_index);

router.get('/nutr', GET_NUTR_info);

router.post('/sign-up', POST_sign_up);

export default router;