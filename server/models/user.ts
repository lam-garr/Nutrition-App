import mongoose from "mongoose";;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password:{}
})

export default mongoose.model('Nutrition-User', UserSchema);