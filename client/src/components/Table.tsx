import React from 'react';
import '../styles/Table.css';

interface propData {
    //clickHandler: (event: React.MouseEvent<HTMLButtonElement>, id:string) => void,
    //addHandler: (data:{id: number, name: string}) => void,
    deleteHandler: (id:number) => void,
    itemData: {id: number, name: string}[],
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
        <table>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            {prop.itemData.map(item => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td onClick={()=>getItemData(item.id)} className='tableInfo'>info</td>
                        <td onClick={()=>sendDelete(item.id)} className='tableDelete'>delete</td>
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