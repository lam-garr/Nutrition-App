import React from 'react';
import '../styles/Table.css';

interface propData {
    //clickHandler: (event: React.MouseEvent<HTMLButtonElement>, id:string) => void,
    deleteHandler: (id:string) => void,
    itemData: {id: string, name: string}[];
}

function Table(prop:propData){
    console.log(prop.itemData.length)

    const sendBack = (id:string) => {
        prop.deleteHandler(id);
    }

    return(
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            {prop.itemData.map(item => {
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td onClick={()=>sendBack(item.id)}>delete</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default Table;


//have a onClick to remove item from array
//