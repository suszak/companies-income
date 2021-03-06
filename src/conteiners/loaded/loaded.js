import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./loaded.css";
import IncomeTable from "../incomeTable/incomeTable";
import Pages from "../../components/pages/pages";
import { filter } from "../../helper/filterResults.js";

const Loaded = ({ company, numberOfItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(numberOfItems); //   Read from readVh in readingVh.js
  const [dataToShow, setDataToShow] = useState([]);

  const indexOfLastPost = currentPage * companiesPerPage;
  const indexOfFirstPost = indexOfLastPost - companiesPerPage;
  const currentCompanies = dataToShow.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(dataToShow.length / companiesPerPage);

  //  Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setDataToShow(company);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  return (
    <section className="loaded">
      <header className="header">
        <Link to="/companies-income/" className="header__text">
          <h1 className="header__text">Companies</h1>
        </Link>
      </header>

      <main className="main">
        <section className="search">
          <input
            type="text"
            id="filter"
            onChange={() => filter(company, setDataToShow, setCurrentPage)}
            className="search__input"
            placeholder="Type company name here..."
          ></input>
        </section>
        <IncomeTable currentCompanies={currentCompanies} />
        <Pages
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </main>

      <footer className="footer">
        <p className="footer__text">Created by Mateusz Greń, 2020</p>
      </footer>

      <span className="background"></span>
    </section>
  );
};

export default Loaded;
