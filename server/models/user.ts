import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {},
    firstName: {type: String},
    lastName: {type:String},
    myData: []
})

export default mongoose.model('NutritionUser', UserSchema);