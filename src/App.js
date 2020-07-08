import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./conteiners/loadingScreen/loadingScreen";
import Loaded from "./conteiners/loaded/loaded";
import readVh from "./helper/readingVh.js";
import Company from "./conteiners/company/company";
import usePrevious from "./helper/usePrevious.js";
import {
  getSummaryData,
  getIncomeData,
  calculateTotalIncomes,
  sortArrayByTotalIncome,
} from "./helper/gettingData.js";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(5);
  const [loading, setLoading] = useState(true);

  //  Download data from first API, calculate vh and calculate numberOfItems
  const prevCompanies = usePrevious(companies);
  const prevIncomes = usePrevious(incomes);

  useEffect(() => {
    window.addEventListener("resize", () => {
      readVh();
    });

    //  Get companies data from API
    if (companies.length === 0) {
      getSummaryData(setCompanies);
      setNumberOfItems(readVh());
    }
    //  Get income data after getting companies
    if (prevCompanies) {
      if (prevCompanies.length !== companies.length) {
        if (companies.length > 0) {
          getIncomeData(companies, setIncomes);
        }
      }
    }

    //  Calculate total incomes after getting incomes
    if (prevIncomes) {
      if (prevIncomes.length !== incomes.length && incomes.length > 0) {
        calculateTotalIncomes(companies, incomes, setCompanies, setLoading);
      }
    }

    //  Sort companies after total incomes calculate
    if (companies.length > 0) {
      if (!loading && !sorted && companies[0].totalIncome) {
        sortArrayByTotalIncome(companies, setCompanies, setSorted);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, incomes]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {sorted ? (
              <Loaded company={companies} numberOfItems={numberOfItems} />
            ) : (
              <LoadingScreen />
            )}
          </Route>
          <Route exact path="/companies-income/">
            {sorted ? (
              <Loaded company={companies} numberOfItems={numberOfItems} />
            ) : (
              <LoadingScreen />
            )}
          </Route>
          <Route path="/company/:id">
            {sorted ? (
              <Company data={[companies, incomes]} />
            ) : (
              <LoadingScreen />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
