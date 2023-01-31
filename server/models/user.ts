import mongoose from "mongoose";
import { objInterface } from '../controllers/objInterface';

const Schema = mongoose.Schema;

const diarySchema = new Schema({
    name: String,
    ENERC_KCAL: {label: String, quantity: Number, unit: String},
    FAT: {label: String, quantity: Number, unit: String},
    FASAT: {label: String, quantity: Number, unit: String},
    FATRN: {label: String, quantity: Number, unit: String},
    FAMS: {label: String, quantity: Number, unit: String},
    FAPU: {label: String, quantity: Number, unit: String},
    CHOCDF: {label: String, quantity: Number, unit: String},
    FIBTG: {label: String, quantity: Number, unit: String},
    SUGAR: {label: String, quantity: Number, unit: String},
    PROCNT: {label: String, quantity: Number, unit: String},
    CHOLE: {label: String, quantity: Number, unit: String},
    NA: {label: String, quantity: Number, unit: String},
    CA: {label: String, quantity: Number, unit: String},
    MG: {label: String, quantity: Number, unit: String},
    K: {label: String, quantity: Number, unit: String},
    FE: {label: String, quantity: Number, unit: String},
    ZN: {label: String, quantity: Number, unit: String},
    P: {label: String, quantity: Number, unit: String},
    VITA_RAE: {label: String, quantity: Number, unit: String},
    VITC: {label: String, quantity: Number, unit: String},
    THIA: {label: String, quantity: Number, unit: String},
    RIBF: {label: String, quantity: Number, unit: String},
    NIA: {label: String, quantity: Number, unit: String},
    VITB6A: {label: String, quantity: Number, unit: String},
    FOLDFE: {label: String, quantity: Number, unit: String},
    FOLDFD: {label: String, quantity: Number, unit: String},
    FOLAC: {label: String, quantity: Number, unit: String},
    VITB12: {label: String, quantity: Number, unit: String},
    VITD: {label: String, quantity: Number, unit: String},
    TOCPHA: {label: String, quantity: Number, unit: String},
    VITK1: {label: String, quantity: Number, unit: String},
    WATER: {label: String, quantity: Number, unit: String}
})

const UserSchema = new Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password:{},
    diaryEnries: [diarySchema]
})

export default mongoose.model('Nutrition-User', UserSchema);