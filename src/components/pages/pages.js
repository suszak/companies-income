import React, { useEffect, useState } from "react";
import "./pages.css";

const Pages = ({ currentPage, totalPages, paginate }) => {
  // let pageNumbers = [];
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    if (totalPages >= 5) {
      if (currentPage - 2 > 1 && currentPage + 2 < totalPages) {
        setPageNumbers(
          Array(5)
            .fill(currentPage - 2)
            .map((number, index) => number + index)
        );
      } else if (currentPage - 2 <= 1 && currentPage + 1 < totalPages) {
        setPageNumbers(
          Array(5)
            .fill(1)
            .map((number, index) => number + index)
        );
      } else if (currentPage - 2 > 1 && currentPage + 2 >= totalPages) {
        setPageNumbers(
          Array(5)
            .fill(totalPages - 4)
            .map((number, index) => number + index)
        );
      }
    } else {
      setPageNumbers(
        Array(totalPages)
          .fill(1)
          .map((number, index) => number + index)
      );
    }
  }, [currentPage, totalPages]);

  return (
    <nav>
      <ul className="pages">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={
              number === currentPage
                ? "pages__number pages__number--current"
                : "pages__number"
            }
          >
            <p
              className={
                number === currentPage
                  ? "pages__item pages__item--current"
                  : "pages__item"
              }
            >
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pages;
