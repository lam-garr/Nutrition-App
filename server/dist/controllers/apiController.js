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
exports.GET_NUTR_info = exports.POST_log_in = exports.POST_sign_up = exports.GET_index = void 0;
const user_1 = __importDefault(require("../models/user"));
const createObj_1 = require("./createObj");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
//function for index api call
function GET_index(req, res) {
    res.json({ message: 'Welcome!!!' });
}
exports.GET_index = GET_index;
//function for user sign up api call
function POST_sign_up(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPw = yield bcryptjs_1.default.hash(req.body.password, 10);
        const user = new user_1.default({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPw
        }).save(err => {
            if (err) {
                return next(err);
            }
            else {
                res.json({ message: 'Success' });
            }
        });
    });
}
exports.POST_sign_up = POST_sign_up;
//function for user log in api call
function POST_log_in(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: req.body.username });
        if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
            const token = jsonwebtoken_1.default.sign(user._id, `${process.env.SECRET}`, { expiresIn: '15m' });
            res.json({ accessToken: token });
        }
        else {
            res.status(400).json({ message: 'Login Error' });
        }
    });
}
exports.POST_log_in = POST_log_in;
//make api call to edamam
function GET_NUTR_info(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingr = '1 lb chicken breast';
        const apiResponse = yield (0, axios_1.default)(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
        //let response:any = await apiResponse.json();
        const apiObj = (0, createObj_1.createObj)(apiResponse.data.totalNutrients, ingr);
        console.log(apiObj);
        res.json({ data: apiObj });
    });
}
exports.GET_NUTR_info = GET_NUTR_info;
