"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObj = void 0;
function createObj(obj, ingr) {
    const nutrObj = {
        id: Math.floor(Math.random() * 100),
        name: `${ingr}`,
        calories: `${obj.ENERC_KCAL.quantity}${obj.ENERC_KCAL.unit}`,
        totalFat: `${obj.FAT.quantity}${obj.FAT.unit}`,
        totalSatFA: `${obj.FASAT.quantity}${obj.FASAT.unit}`,
        totalTransFA: `${obj.FATRN ? obj.FATRN.quantity : 0}${obj.FATRN ? obj.FATRN.unit : 'g'}`,
        totalMonoFA: `${obj.FAMS.quantity}${obj.FAMS.unit}`,
        totalPloyFA: `${obj.FAPU.quantity}${obj.FAPU.unit}`,
        carbohydrate: `${obj.CHOCDF.quantity}${obj.CHOCDF.unit}`,
        fiber: `${obj.FIBTG.quantity}${obj.FIBTG.unit}`,
        sugars: `${obj.SUGAR.quantity}${obj.SUGAR.unit}`,
        protien: `${obj.PROCNT.quantity}${obj.PROCNT.unit}`,
        cholesterol: `${obj.CHOLE.quantity}${obj.CHOLE.unit}`,
        sodium: `${obj.NA.quantity}${obj.NA.unit}`,
        calcium: `${obj.CA.quantity}${obj.CA.unit}`,
        magnesium: `${obj.MG.quantity}${obj.MG.unit}`,
        potassium: `${obj.K.quantity}${obj.K.unit}`,
        iron: `${obj.FE.quantity}${obj.FE.unit}`,
        zinc: `${obj.ZN.quantity}${obj.ZN.unit}`,
        phosphorus: `${obj.P.quantity}${obj.P.unit}`,
        vitaA: `${obj.VITA_RAE.quantity}${obj.VITA_RAE.unit}`,
        vitaC: `${obj.VITC.quantity}${obj.VITC.unit}`,
        thiamin: `${obj.THIA.quantity}${obj.THIA.unit}`,
        riboflavin: `${obj.RIBF.quantity}${obj.RIBF.unit}`,
        niacin: `${obj.NIA.quantity}${obj.NIA.unit}`,
        vitaB6: `${obj.VITB6A.quantity}${obj.VITB6A.unit}`,
        folateDFE: `${obj.FOLDFE.quantity}${obj.FOLDFE.unit}`,
        folateFD: `${obj.FOLFD.quantity}${obj.FOLFD.unit}`,
        folicAcid: `${obj.FOLAC.quantity}${obj.FOLAC.unit}`,
        vitaB12: `${obj.VITB12.quantity}${obj.VITB12.unit}`,
        vitaD2D3: `${obj.VITD.quantity}${obj.VITD.unit}`,
        vitaE: `${obj.TOCPHA.quantity}${obj.TOCPHA.unit}`,
        vitaK: `${obj.VITK1.quantity}${obj.VITK1.unit}`,
        water: `${obj.WATER.quantity}${obj.WATER.unit}`
    };
    return nutrObj;
}
exports.createObj = createObj;
