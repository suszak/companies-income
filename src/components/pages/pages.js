import React from 'react'
import './pages.css'

const Pages = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = []
    
    if(currentPage - 2 > 1 && currentPage + 2 < totalPages) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for(let i = currentPage - 2; i <= currentPage + 2; i++) {
            pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
    } else if(currentPage - 2 <= 1 && currentPage + 2 < totalPages) {
        for(let i = 1; i <= currentPage + 2; i++) {
            pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
    } else if(currentPage - 2 > 1 && currentPage + 2 >= totalPages) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for(let i = currentPage - 2; i <= totalPages; i++) {
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