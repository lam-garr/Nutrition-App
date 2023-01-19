import React from 'react';
import '../styles/CollectionTable.css';

interface propData {
    //deleteHandler: (id:number) => void,
    itemData:String[],
   // itemDataHandler: (id:number) => void;
}

function CollectionTable(prop: propData){

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
                    <tr key={0} className='colle-table-data'>
                        <td>{item}</td>
                        <td>{item}</td>
                        <td>Calories</td>
                        <td><button className='colleInfo'>Info</button></td>
                        <td><button className='colleDelete'>Delete</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default CollectionTable;