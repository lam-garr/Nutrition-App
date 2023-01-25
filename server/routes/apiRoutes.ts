import express from 'express';
import { GET_index, GET_NUTR_info } from '../controllers/apiController';

const router = express.Router();

router.get('/', GET_index)

router.get('/nutr', GET_NUTR_info)

export default router;