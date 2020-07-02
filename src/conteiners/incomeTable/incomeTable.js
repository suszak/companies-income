import React from 'react'
import './incomeTable.css'
import TableItem from '../../components/tableItem/tableItem'

const IncomeTable = ({ currentCompanies }) => {
  return(
    <section className='incomeTable'>
      <ul className='table'>
        {
          (currentCompanies.length !== 0)
            ?
              currentCompanies.map((el) =>
                <TableItem key={el.id} id={el.id} name={el.name} city={el.city} totalIncome={el.totalIncome} />)
            :
              <p className='table__error'>Nothing to show</p>
        }
      </ul>
    </section>
  )
}

export default IncomeTable
