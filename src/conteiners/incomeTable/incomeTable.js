import React, { Component } from 'react'
import './incomeTable.css'
import TableItem from '../../components/tableItem/tableItem'

class IncomeTable extends Component {
  render() {
    return(
      <section className='incomeTable'>
        <ul className='table'>
          {(this.props.currentCompanies.length !== 0)?this.props.currentCompanies.map((el) =>
            <TableItem key={el.id} id={el.id} name={el.name} city={el.city} totalIncome={el.totalIncome} />
          ):<p className='table__error'>Nothing to show</p>}
        </ul>
      </section>
    )
  }
}

export default IncomeTable