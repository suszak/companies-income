import React, { Component } from 'react'
import './App.css'
import LoadingScreen from './conteiners/loadingScreen/loadingScreen'
import Loaded from './conteiners/loaded/loaded'
import readVh from './functions'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArray: [],
      sorted: false,
      numberOfItems: 5
    }
  }

  //  Getting data from first API (city, id, name), data save into state.companiesArray
  getSummaryData = async () => {
    const array = []

    try {
        const response = await fetch(`https://recruitment.hal.skygate.io/companies`);
        if(response.status === 200) {
            const data = await response.json();
            array.push(data)
        }
    } catch(error) {
        console.error(error);
    }
    return array
  }

  //  Getting data from second API (id, incomes {date, value}), data save into state.incomeArray
  //  Remake state.companiesArray - added totalIncome to each object
  getIncomeData = async (companies) => {
    companies = companies[0]
    const newCompanies = []
    const incomes = []

    companies.map(async el => {
      let temp = {}
      let sum = 0
      try {
        const response = await fetch(`https://recruitment.hal.skygate.io/incomes/${el.id}`);
        if(response.status === 200) {
            const data = await response.json();
            incomes.push(data)
            sum = 0;
            data.incomes.map(income => {
              sum += parseFloat(income.value)
              return data
            })
            temp = {...el, totalIncome: parseFloat(sum.toFixed(2))}
            newCompanies.push(temp)
            return 0
        }
      } catch(error) {
        console.error(error);
        return 0
      }
    })
    return [newCompanies, incomes]
  }

  //  Sorting state.companiesArray by totalIncome desc
  sortArrayByTotalIncome = (array) => {
    if(array.length > 0) {
      const companies = array[0]
      const incomes = array[1]
      const sortedArray = companies.sort((a,b) => {
        return b.totalIncome - a.totalIncome
      })
      return [sortedArray, incomes]
    }
  }

  async componentDidMount() {
    const numberOfItems = readVh()
    this.setState({ dataArray: await this.getIncomeData(await this.getSummaryData()), numberOfItems: numberOfItems})
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.dataArray.length !== this.state.dataArray.length)
    { 
      let length = -100
      //  Wait until all data loads
      while(length !== this.state.dataArray[0].length) {
        length = this.state.dataArray[0].length
        await new Promise(r => setTimeout(r, 5000))
      }
      this.setState({ dataArray: this.sortArrayByTotalIncome(this.state.dataArray), sorted: true})
    }
  }

  render() {
    return (
      <div className="App">
        {(this.state.sorted)?<Loaded data={this.state.dataArray} numberOfItems={this.state.numberOfItems} />:<LoadingScreen />}
      </div>
    )
  }
}

export default App;
