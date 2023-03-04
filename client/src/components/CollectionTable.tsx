import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CollectionTable.css';

interface propData {
    //deleteHandler: (id:number) => void,
    itemData:any[],
    deleteHandler: (id:number) => void;
   // itemDataHandler: (id:number) => void;
}

function CollectionTable(prop: propData){

    const deleteDiaryById = (id: number) => {
        prop.deleteHandler(id);
    }

    return(
        <table className='colle-table'>
            <tbody>
            <tr className='colle-table-top'>
                <th>ID</th>
                <th>Day</th>
                <th>Calories</th>
                <th>View</th>
                <th>Delete</th>
            </tr>
            {prop.itemData.map(item => {
                return(
                    <tr className='colle-table-data'>
                        <td>{item.id}</td>
                        <td>{item.day}</td>
                        <td>{item.calories}</td>
                        <td><Link to={`/user/diary/${item.id}`} state={{option: 'exist'}}><button className='colleInfo'>Info</button></Link></td>
                        <td><button onClick={() => deleteDiaryById(item.id)} className='colleDelete'>Delete</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default CollectionTable;