"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true },
    myID: {},
    password: {},
    firstName: { type: String },
    lastName: { type: String },
    token: { type: String },
    myData: []
});
exports.default = mongoose_1.default.model('NutritionUser', UserSchema);
