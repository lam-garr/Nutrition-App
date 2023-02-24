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
router.get('/collections', apiController_1.verifyToken, apiController_1.GET_collection);
router.get('/sort-colle', apiController_1.verifyToken, apiController_1.GET_sortedCollection);
router.post('/new-entry', apiController_1.verifyToken, apiController_1.POST_newEntry);
router.post('/update', apiController_1.verifyToken, apiController_1.POST_update);
router.post('/user-diary', apiController_1.verifyToken, apiController_1.GET_diary);
router.post('/testing', apiController_1.verifyToken, (req, res) => {
    console.log(req.user);
    res.json(req.user);
});
exports.default = router;
