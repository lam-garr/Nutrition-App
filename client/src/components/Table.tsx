import React from 'react';
import '../styles/Table.css';

interface propData {
    //clickHandler: (event: React.MouseEvent<HTMLButtonElement>, id:string) => void,
    addHandler: (data:{id: number, name: string}) => void,
    deleteHandler: (id:number) => void,
    itemData: {id: number, name: string}[];
}

function Table(prop:propData){

    const sendDelete = (id:number) => {
        prop.deleteHandler(id);
    }

   // const sendAdd = () => {
   //     prop.addHandler({id:Math.floor(Math.random() * 100), name:'world'});
    //}

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
                        <td onClick={()=>getInfo(item.id)}>info</td>
                        <td onClick={()=>sendDelete(item.id)}>delete</td>
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