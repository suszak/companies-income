import React from 'react'
import './pages.css'

const Pages = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = []
    if(totalPages >= 5) {
      if(currentPage - 2 > 1 && currentPage + 2 < totalPages) {
          for(let i = currentPage - 2; i <= currentPage + 2; i++) {
              pageNumbers.push(i)
          }
      } else if(currentPage - 2 <= 1 && currentPage + 1 < totalPages) {
          for(let i = 1; i <= 5; i++) {
              pageNumbers.push(i)
          }
      } else if(currentPage - 2 > 1 && currentPage + 2 >= totalPages) {
          for(let i = totalPages - 4; i <= totalPages; i++) {
              pageNumbers.push(i)
          }
      }
    } else {
      for(let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    }

    return (
      <nav>
        <ul className='pages'>
          {pageNumbers.map((number, index) => (
            <li onClick={() => paginate(number)} key={number} className={(number===currentPage)?'pages__number pages__number--current':'pages__number'}>
              <p className={(number===currentPage)?'pages__item pages__item--current':'pages__item'}>{number}</p>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default Pages;