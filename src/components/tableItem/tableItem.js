import React from 'react'
import './tableItem.css'

const TableItem = (props) => {
    return (
        <div className='tableItem'>
            <p className='tableItem__id'>{props.id}</p>
            <p className='tableItem__name'>{props.name}</p>
            <p className='tableItem__city'>{props.city}</p>
            <p className='tableItem__totalIncome'>{props.totalIncome}</p>
        </div>
    )
}

export default TableItem
