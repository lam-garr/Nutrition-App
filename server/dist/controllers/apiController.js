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
exports.verifyToken = exports.POST_diary = exports.POST_deleteItem = exports.POST_update = exports.POST_newEntry = exports.GET_sortedCollection = exports.POST_collection = exports.TOKEN = exports.GET_validate = exports.GET_NUTR_info = exports.POST_log_in = exports.POST_sign_up = exports.GET_index = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
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
            myID: (0, uuid_1.v4)(),
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
function POST_log_in(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: req.body.username });
        if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
            const id = user.myID;
            const token = jsonwebtoken_1.default.sign({ id }, `${process.env.SECRET}`, { expiresIn: '24h' });
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
        let ingr = req.query.search;
        if (ingr == '') {
            ingr = '1 large apple';
        }
        //const ingr = '1 sofa';
        const apiResponse = yield (0, axios_1.default)(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${ingr}`);
        //let response:any = await apiResponse.json();
        //const apiObj: objInterface = createObj(apiResponse.data.totalNutrients, ingr);
        const apiObj = apiResponse.data.totalNutrients;
        //check if object has empty properties
        if (apiObj.ENERC_KCAL) {
            apiObj['id'] = (0, uuid_1.v4)();
            apiObj['name'] = `${ingr}`;
            res.json({ data: apiObj });
        }
        else {
            res.json({ data: 'error with item' });
        }
    });
}
exports.GET_NUTR_info = GET_NUTR_info;
//validate token passed from api call header
function GET_validate(req, res) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, `${process.env.SECRET}`, (err, user) => {
            if (err) {
                return res.json({ message: 'error' });
            }
            else {
                return res.json({ message: 'success' });
            }
        });
    }
    else {
        res.json({ message: 'none' });
    }
    //res.json({message:'success'});
}
exports.GET_validate = GET_validate;
//test fn to return accesstoken
function TOKEN(req, res) {
    if (req.body.username === 'fuck') {
        res.json({ AccessToken: '696969420' });
    }
    else {
        res.status(400).json({ message: 'error' });
    }
}
exports.TOKEN = TOKEN;
//return collection of diary entries
function POST_collection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ myID: req.id.id });
        if (user) {
            res.json({ myArr: user.myData });
        }
        else {
            res.status(403);
        }
    });
}
exports.POST_collection = POST_collection;
//return sorted collection of diary entries
function GET_sortedCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //takes in an array and returns it sorted
        //res.json(req.body.arr.sort((a,b)=>a-b))
        //function compare(a,b){
        //return a.y-b.y
        //}
        const user = yield user_1.default.findOne({ myID: req.id.id });
        if (user && req.query.sort === 'calorie high') {
            //const target = user.myData.find(obj => obj.id === '0347d1f0-e511-4b0d-b9b0-84c6da9c3271');
            res.json({ arrHigh: user.myData.sort((a, b) => b.calories - a.calories) });
        }
        if (user && req.query.sort === 'calorie low') {
            res.json({ arrLow: user.myData.sort((a, b) => a.calories - b.calories) });
        }
    });
}
exports.GET_sortedCollection = GET_sortedCollection;
//create new day entry and push to array
function POST_newEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ myID: req.id.id });
        if (user) {
            const newEntry = { id: (0, uuid_1.v4)(), day: `${req.body.day}/${req.body.month}/${req.body.year}`, calories: 0, diary: [] };
            user.myData.push(newEntry);
            user.markModified("myData");
            user.save();
            res.status(203).json({ id: newEntry.id, myArr: user.myData });
        }
        else {
            res.status(400);
        }
    });
}
exports.POST_newEntry = POST_newEntry;
//add data to user diary array
function POST_update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiResponse = yield (0, axios_1.default)(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&ingr=${req.body.item}`);
        const apiObj = apiResponse.data.totalNutrients;
        const user = yield user_1.default.findOne({ myID: req.id.id });
        //check if object has empty properties & if user exists
        if ((apiObj.ENERC_KCAL) && (user)) {
            apiObj['id'] = (0, uuid_1.v4)();
            apiObj['name'] = `${req.body.item}`;
            //add item to db array
            const target = user.myData.find(obj => obj.id === req.body.id);
            target.diary.push(apiObj);
            //update calories value in myData array
            target.calories = target.diary.reduce((total, item) => total + Math.round(item.ENERC_KCAL.quantity), 0);
            user.markModified("myData");
            user.save();
            res.status(200).json({ myArr: target.diary });
        }
        else {
            res.status(404).json({ err: 'error with item' });
        }
    });
}
exports.POST_update = POST_update;
//delete item from diary
function POST_deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ myID: req.id.id });
        if (user) {
            const target = user.myData.find(obj => obj.id === req.body.diaryId);
            target.diary = target.diary.filter((obj) => obj.id !== req.body.delId);
            //target.calories = target.calories + (-Math.abs(Math.round(0)));
            target.calories = target.diary.reduce((total, item) => total + Math.round(item.ENERC_KCAL.quantity), 0);
            user.markModified("myData");
            user.save();
            console.log('before del');
            res.json({ myArr: target.diary });
        }
        else {
            res.status(404);
        }
    });
}
exports.POST_deleteItem = POST_deleteItem;
//get diary
function POST_diary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ myID: req.id.id });
        if (user) {
            const target = user.myData.find(obj => obj.id === req.body.diaryId);
            //console.log('before diary')
            //const day = target.day.split("/");
            //const datOne = day[0];
            //const datTwo = day[1];
            //const datTree = day[2];
            //console.log(datOne + ' ' + datTwo + ' ' + datTree)
            res.json({ myArr: target.diary, date: target.day });
        }
        else {
            res.status(404);
        }
    });
}
exports.POST_diary = POST_diary;
//middleware to validate JWT
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token, `${process.env.SECRET}`, (err, user) => {
                if (err) {
                    return res.status(403).json(err);
                }
                req.id = user;
                next();
            });
        }
        else {
            res.status(400);
        }
    });
}
exports.verifyToken = verifyToken;
//after an update re sign with jwt, send token back to front end and re-set it to localstorage
//63fc20a1f0bad1b9a8c2589a
