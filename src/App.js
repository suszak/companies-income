import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import './App.css'
import LoadingScreen from './conteiners/loadingScreen/loadingScreen'
import Loaded from './conteiners/loaded/loaded'
import readVh from './helper/readingVh.js'
import Company from './conteiners/company/company'
import usePrevious from './helper/usePrevious.js'

const App = () => {
  const [companies, setCompanies] = useState([])
  const [incomes, setIncomes] = useState([])
  const [sorted, setSorted] = useState(false)
  const [numberOfItems, setNumberOfItems] = useState(5)
  const [loading, setLoading] = useState(true)

  //  Getting data from first API (city, id, name), data save into state.companiesArray
  const getSummaryData = async () => {
    let array = []

    try {
      const response = await fetch(`https://recruitment.hal.skygate.io/companies`);
      if (response.ok) {
        array = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
    setCompanies(array)
  }

  //  Getting data from second API (id, incomes {date, value})
  const getIncomeData = async () => {
    if (companies.length > 0) {
      Promise.all(
        companies.map(
          el => axios(`https://recruitment.hal.skygate.io/incomes/${el.id}`)
        )
      ).then(
        responses => Promise.all(
          responses.map(
            res => res.data
          )
        ).then(
          data => {
            const filtered = data.filter(el => {
              return el !== ""
            })
            setIncomes(filtered)
          }
        )
      ).catch(error =>
        console.error(error)
      )
    }
  }

  //  Count total incomes and insert them to each object in companies
  const countTotalIncomes = () => {
    const newCompanies = []
    companies.map((company) => {
      let sum = 0;
      const income = incomes.find(el =>
        el.id === company.id)

      income.incomes.map(el => {
        sum += parseFloat(el.value)
        return el
      })
      newCompanies.push({
        ...company,
        totalIncome: sum.toFixed(2)
      })

      return company
    })

    setCompanies(newCompanies)
    setLoading(false)
  }

  //  Sorting state.companies by totalIncome desc
  const sortArrayByTotalIncome = () => {
    const sortedArray = companies.sort((a, b) => {
      return b.totalIncome - a.totalIncome
    })
    setCompanies(sortedArray)
    setSorted(true)
  }

  //  Download data from first API, calculate vh and calculate numberOfItems
  const prevCompanies = usePrevious(companies)
  const prevIncomes = usePrevious(incomes)
  useEffect(() => {
    window.addEventListener('resize', () => {
      readVh()
    })
    if(companies.length === 0) {
      getSummaryData()
      setNumberOfItems(readVh())
    }
    //  Get income data after getting companies
    if (prevCompanies) {
      if (prevCompanies.length !== companies.length) {
        if (companies.length > 0) {
          getIncomeData(companies)
        }
      }
    }

    //  Count total incomes after getting incomes
    if(prevIncomes) {
      if (prevIncomes.length !== incomes.length && incomes.length > 0) {
        countTotalIncomes()
      }
    }

    //  Sort companies after total incomes count
    if (companies.length > 0) {
      if (!loading && !sorted && companies[0].totalIncome) {
        sortArrayByTotalIncome()
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, incomes])

  return(
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            {(sorted)?<Loaded company={companies} numberOfItems={numberOfItems} />:<LoadingScreen />}
          </Route>
          <Route exact path='/companies-income/'>
            {(sorted)?<Loaded company={companies} numberOfItems={numberOfItems} />:<LoadingScreen />}
          </Route>
          <Route path='/company/:id'>
            {(sorted)?<Company data={[companies, incomes]} />:<LoadingScreen />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
