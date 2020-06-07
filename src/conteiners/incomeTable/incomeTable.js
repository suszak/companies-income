import React, { Component } from 'react'
import './incomeTable.css'
import TableItem from '../../components/tableItem/tableItem'

class IncomeTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArray: [],
    }
  }
  
  render() {
    return(
      <section className='incomeTable'>
        <ul className='table'>
          {(this.props.sorted && this.props.data[0].length !== 0)?this.props.data[0].map((el) =>  
            <TableItem key={el.id} id={el.id} name={el.name} city={el.city} totalIncome={el.totalIncome} />
          ):<div>'Loading'</div>}
        </ul> 
      </section>
    )
  }
}

export default IncomeTable