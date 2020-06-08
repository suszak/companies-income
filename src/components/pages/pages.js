import React from 'react'
import './pages.css'

const Pages = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = []
    if(totalPages >= 5) {
      if(currentPage - 1 > 1 && currentPage + 1 < totalPages) {
          pageNumbers.push(1)
          pageNumbers.push('...')
          for(let i = currentPage - 1; i <= currentPage + 1; i++) {
              pageNumbers.push(i)
          }
          pageNumbers.push('...')
          pageNumbers.push(totalPages)
      } else if(currentPage - 1 <= 1 && currentPage + 1 < totalPages) {
          for(let i = 1; i <= currentPage + 1; i++) {
              pageNumbers.push(i)
          }
          pageNumbers.push('...')
          pageNumbers.push(totalPages)
      } else if(currentPage - 1 > 1 && currentPage + 1 >= totalPages) {
          pageNumbers.push(1)
          pageNumbers.push('...')
          for(let i = currentPage - 1; i <= totalPages; i++) {
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
            (number==='...')?(<li key={9999-index} className='pages__number dots'>{number}</li>): 
            <li onClick={() => paginate(number)} key={number} className={(number===currentPage)?'pages__number pages__number--current':'pages__number'}>
              <p className={(number===currentPage)?'pages__item pages__item--current':'pages__item'}>{number}</p>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pages;