"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const router = express_1.default.Router();
router.get('/', apiController_1.GET_index);
router.get('/nutr', apiController_1.GET_NUTR_info);
router.post('/sign-up', apiController_1.POST_sign_up);
router.post('/log-in', apiController_1.POST_log_in);
router.get('/validate', apiController_1.GET_validate);
router.post('/collections', apiController_1.verifyToken, apiController_1.POST_collection);
router.get('/sort-colle', apiController_1.verifyToken, apiController_1.GET_sortedCollection);
router.post('/new-entry', apiController_1.verifyToken, apiController_1.POST_newEntry);
router.post('/update', apiController_1.verifyToken, apiController_1.POST_update);
router.post('/delete-item', apiController_1.verifyToken, apiController_1.POST_deleteItem);
router.post('/user-diary', apiController_1.verifyToken, apiController_1.POST_diary);
router.post('/update-date', apiController_1.verifyToken, apiController_1.POST_date);
router.post('/sort-diary', apiController_1.verifyToken, apiController_1.POST_sortDiary);
router.post('/delete-diary', apiController_1.verifyToken, apiController_1.POST_deleteDiary);
router.get('/user-account', apiController_1.verifyToken, apiController_1.GET_userInfo);
exports.default = router;
