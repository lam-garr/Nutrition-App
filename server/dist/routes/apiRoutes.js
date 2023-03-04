"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const user_1 = __importDefault(require("../models/user"));
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
router.post('/testing', apiController_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ myID: req.id.id });
    if (user) {
        const target = user.myData.find(obj => obj.id === '9ceefc33-9b07-4e43-8641-d4ea19ca7579');
        //target.diary.push({id:619,name:'Rey Mysterio'});
        //target.diary = target.diary.filter((obj: { id: number; name: string}) => obj.id !== 666);
        //target.diary = [];
        //user.markModified("myData");
        //user.save()
        res.json({ myArr: target.diary });
    }
}));
exports.default = router;
