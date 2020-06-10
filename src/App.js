import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import LoadingScreen from './conteiners/loadingScreen/loadingScreen'
import Loaded from './conteiners/loaded/loaded'
import readVh from './functions'
import Company from './conteiners/company/company'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArray: [],
      companies: [],
      incomes: [],
      sorted: false,
      numberOfItems: 5,
      loading: true
    }
  }

  //  Getting data from first API (city, id, name), data save into state.companiesArray
  getSummaryData = async () => {
    let array = []

    try {
        const response = await fetch(`https://recruitment.hal.skygate.io/companies`);
        if(response.ok) {
            array = await response.json();
        }
    } catch(error) {
        console.error(error);
    }
    return array
  }

  //  Getting data from second API (id, incomes {date, value}), data save into state.incomeArray
  //  Remake state.companiesArray - added totalIncome to each object
  getIncomeData = async () => {
      if(this.state.companies.length > 0) {
        Promise.all(
          this.state.companies.map(
            el => axios(`https://recruitment.hal.skygate.io/incomes/${el.id}`)
          )
        ).then(
          responses => Promise.all(
            responses.map(
              res => res.data
            )
          ).then(
            data => {
              this.setState({ incomes: data })
            }
          )
        )
    }
  }

  countTotalIncomes = () => {
    const companies = this.state.companies
    const incomes = this.state.incomes
    const newCompanies = []

    companies.map((company, index) => {
      let sum = 0;
      if(company.id === incomes[index].id) {
        incomes[index].incomes.map(el => {
          sum += parseFloat(el.value)
          return el
        })
        newCompanies.push({...company, totalIncome: sum.toFixed(2)})
      }
      return company
    })

    this.setState({ companies: newCompanies, loading: false })
  }

  //  Sorting state.companiesArray by totalIncome desc
  sortArrayByTotalIncome = () => {
    const companies = this.state.companies
    const sortedArray = companies.sort((a,b) => {
      return b.totalIncome - a.totalIncome
    })
    this.setState({companies: sortedArray, sorted: true})
  }

  async componentDidMount() {
    window.addEventListener('resize', () => {
      readVh()
    })
    const numberOfItems = readVh()
    this.setState({ companies: await this.getSummaryData(), numberOfItems: numberOfItems})
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.companies.length !== this.state.companies.length) { 
      if(this.state.companies.length > 0) {
        this.getIncomeData(this.state.companies)
      }
    }

    if(prevState.incomes.length !== this.state.incomes.length && this.state.incomes.length > 0) {
      this.countTotalIncomes()
    }

    if(this.state.companies.length > 0){
      if(!this.state.loading && !this.state.sorted && this.state.companies[0].totalIncome) {
        this.sortArrayByTotalIncome()
      }
    }
  }

  render() {
    return (
      <Router>
      <div className="App">
          <Switch>
            <Route exact path='/'>
              {(this.state.sorted)?<Loaded company={this.state.companies} numberOfItems={this.state.numberOfItems} />:<LoadingScreen />}
            </Route>
            <Route exact path='/companies-income/'>
              {(this.state.sorted)?<Loaded company={this.state.companies} numberOfItems={this.state.numberOfItems} />:<LoadingScreen />}
            </Route>
            <Route path='/company/:id'>
              {(this.state.sorted)?<Company data={[this.state.companies, this.state.incomes]} />:<LoadingScreen />}
            </Route>
          </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
