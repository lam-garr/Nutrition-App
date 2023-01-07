import React from 'react';
import '../styles/Table.css';

interface propData {
    itemData: {id: string, name: string}[];
}

function Table(prop:propData){
    console.log(prop.itemData.length)
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
                    </tr>
                )
            })}
        </table>
    )
}

export default Table;