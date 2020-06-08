import React from 'react'
import { Link } from 'react-router-dom'
import './tableItem.css'
import { ReactComponent as OpenSite } from '../../images/open white.svg'

const TableItem = (props) => {
    return (
        <div className='tableItem'>
            <div className='wrapper'>
                <div className='elements'>
                    <p className='tableItem__element'>{props.id}</p>
                    <p className='tableItem__element'>{props.name}</p>
                </div>
                <div className='elements'>
                    <p className='tableItem__element'>{props.city}</p>
                    <p className='tableItem__element'>{props.totalIncome}</p>        
                </div>
            </div>
            <Link to={`/company/${props.id}`} className='tableItem__open' ><OpenSite className='tableItem__open' /></Link>
        </div>
    )
}

export default TableItem
