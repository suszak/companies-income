import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './loaded.css'
import IncomeTable from '../incomeTable/incomeTable'
import Pages from '../../components/pages/pages'

const Loaded = ({data, numberOfItems}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [companiesPerPage] = useState(numberOfItems) //   Read from readVh in functions.js
    const [dataToShow, setDataToShow] = useState([])
    
    const indexOfLastPost = currentPage * companiesPerPage
    const indexOfFirstPost = indexOfLastPost - companiesPerPage
    const currentCompanies = dataToShow.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(dataToShow.length / companiesPerPage)
    
    //  Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    }

    //  Filter results
    const filter = () => {
        const filterValue = document.querySelector('#filter').value;
        if(filterValue.length > 0) {
            const result = data[0].filter(company => company.name.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1)
            setDataToShow(result)
            setCurrentPage(1)
        } else {
            setDataToShow(data[0])
            setCurrentPage(1)
        }
    }

    useEffect((prevProps, prevState) => {
        if(!prevState) {
            document.querySelector('#filter').addEventListener("keydown", (e) => {
                if(e.keyCode === 13) {
                    filter()
                }
            })
        }

        if(!prevState || prevState.dataToShow.length !== data[0].length) {
            setDataToShow(data[0])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return(
        <section className='loaded'>
            <header className='header'>
                <Link to='/companies-income/' className='header__text'><h1 className='header__text'>Companies</h1></Link>
            </header>

            <main className='main'>
                <section className='search'>
                    <input type='text' id='filter' className='search__input' placeholder='Type company name here...' ></input>
                    <button className='search__button' onClick={filter} >Filter</button>
                </section>
                <IncomeTable data={dataToShow} currentCompanies={currentCompanies} />
                <Pages currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </main>

            <footer className='footer'>
                <p className='footer__text'>Created by Mateusz Greń, 2020</p>
            </footer>
            
            <span className='background'></span>
        </section>
    )
}

export default Loaded
