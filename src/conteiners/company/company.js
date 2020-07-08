import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./company.css";
import {
  calculateIncomes,
  calculateTotalIncomes,
} from "../../helper/calculateIncomes.js";

const Company = ({ data }) => {
  const [incomes, setIncomes] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const { id } = useParams();
  const [totalSum, setTotalSum] = useState(0);
  const [totalAvg, setTotalAvg] = useState(0);
  const [avg, setAvg] = useState(0);
  const [sum, setSum] = useState(0);

  //  Setting dates
  const today = new Date();
  let month,
    year = null;

  if (today.getMonth() - 1 < 0) {
    month = 11;
    year = today.getFullYear() - 1;
  } else {
    month = today.getMonth() - 1;
    year = today.getFullYear();
  }

  const [startDate, setStartDate] = useState(new Date(year, month, 1));
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  //  Returns choosen company from data array
  const filterTable = (array) => {
    return array.filter((el) => Number(el.id) === Number(id));
  };

  useEffect(() => {
    if (incomes.length === 0) setIncomes(filterTable(data[1]));
    if (companyInfo.length === 0) setCompanyInfo(filterTable(data[0]));
    if (incomes.length > 0) {
      calculateTotalIncomes(incomes, setTotalSum, setTotalAvg);
      calculateIncomes(startDate, endDate, incomes, setAvg, setSum, setEndDate);
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: monthStart },
        ,
        { value: dayStart },
        ,
        { value: yearStart },
      ] = dateTimeFormat.formatToParts(startDate);
      const [
        { value: monthEnd },
        ,
        { value: dayEnd },
        ,
        { value: yearEnd },
      ] = dateTimeFormat.formatToParts(endDate);
      document.querySelector(
        "#startDate"
      ).value = `${yearStart}-${monthStart}-${dayStart}`;
      document.querySelector(
        "#endDate"
      ).value = `${yearEnd}-${monthEnd}-${dayEnd}`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, companyInfo, incomes, startDate, endDate]);

  return (
    <section className="company">
      {companyInfo.length > 0 && incomes.length > 0 ? (
        <div className="wrapper">
          <Link to="/companies-income/" className="company__back">
            Back
          </Link>
          <div className="dateRange">
            <label htmlFor="startDate">From:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={() => {
                setStartDate(
                  new Date(document.querySelector("#startDate").value)
                );
              }}
            />
            <label htmlFor="endDate">to:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={() => {
                setEndDate(new Date(document.querySelector("#endDate").value));
              }}
            />
          </div>

          <div className="company__info">
            <p>ID: {companyInfo[0].id}</p>
            <p>Name: {companyInfo[0].name}</p>
            <p>City: {companyInfo[0].city}</p>
            <p>Total income: {totalSum}</p>
            <p>Lifetime average: {totalAvg}</p>
            <p>Your range income: {sum}</p>
            <p>Your range average income: {avg}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="background"></div>
    </section>
  );
};

export default Company;
