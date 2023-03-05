"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
function sortArray(dataArray, sortTerm) {
    if (sortTerm === 'select') {
        return dataArray;
    }
    if (sortTerm === 'calorie high') {
        return dataArray.sort((a, b) => b.ENERC_KCAL.quantity - a.ENERC_KCAL.quantity);
    }
    if (sortTerm === 'calorie low') {
        return dataArray.sort((a, b) => a.ENERC_KCAL.quantity - b.ENERC_KCAL.quantity);
    }
}
exports.sortArray = sortArray;
