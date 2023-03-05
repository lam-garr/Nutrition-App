import { objInterface } from './objInterface';

export function sortArray(dataArray: objInterface[],sortTerm: string){
    
    if(sortTerm === 'select'){
        return dataArray;
    }

    if(sortTerm === 'calorie high'){
        return dataArray.sort((a: objInterface, b: objInterface) => b.ENERC_KCAL.quantity - a.ENERC_KCAL.quantity);
    }

    if(sortTerm === 'calorie low'){
        return dataArray.sort((a: objInterface, b: objInterface) => a.ENERC_KCAL.quantity - b.ENERC_KCAL.quantity);
    }
}