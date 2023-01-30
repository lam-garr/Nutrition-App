import React from 'react';
import { objInterface } from '../interface';
import '../styles/Table.css';

interface propData {
    //clickHandler: (event: React.MouseEvent<HTMLButtonElement>, id:string) => void,
    //addHandler: (data:{id: number, name: string}) => void,
    deleteHandler: (id:number) => void,
    itemData: objInterface[],
    itemDataHandler: (id:number) => void;
}

function Table(prop:propData){

    const sendDelete = (id:number) => {
        prop.deleteHandler(id);
    }

   // const sendAdd = () => {
   //     prop.addHandler({id:Math.floor(Math.random() * 100), name:'world'});
    //}

    //onClick will render modal with item information
    const getItemData = (id:number) => {
        prop.itemDataHandler(id);
    }

    const getInfo = (id:number) => {
        console.log(id)
    }

    return(
        <table className='food-table'>
            <tbody>
            <tr className='food-table-top'>
                <th>Name</th>
                <th>Calories</th>
                <th>Info</th>
                <th>Delete</th>
            </tr>
            {prop.itemData.map(item => {
                return(
                    <tr key={item.id} className='food-table-data'>
                        <td>{item.name}</td>
                        <td>{Math.round(item.ENERC_KCAL.quantity)} kcal</td>
                        <td><button onClick={()=>getItemData(item.id)} className='tableInfo'>Info</button></td>
                        <td><button onClick={()=>sendDelete(item.id)} className='tableDelete'>Delete</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default Table;


//have a onClick to remove item from array
//