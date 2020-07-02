import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './company.css'

const Company = ({data}) => {
    const [incomes, setIncomes] = useState([])
    const [companyInfo, setCompanyInfo] = useState([])
    const { id } = useParams()
    const [totalSum, setTotalSum] = useState(0)
    const [totalAvg, setTotalAvg] = useState(0)
    const [avg, setAvg] = useState(0)
    const [sum, setSum] = useState(0)
    //  Setting dates
    const today = new Date()
    let month, year = null

    if(today.getMonth() - 1 < 0) {
        month = 11
        year = today.getFullYear() - 1
    } else {
        month = today.getMonth() - 1
        year = today.getFullYear()
    }

    const [startDate, setStartDate] = useState(new Date(year, month, 1))
    const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

    const filterTable = (array) => {
        return array.filter(el => Number(el.id) === Number(id))
    }

    const countTotalIncomes = () => {
        if(incomes.length > 0) {
            let sum = 0;
            incomes[0].incomes.map(el => {
                sum += parseFloat(el.value)
                return el
            })
            const avg = sum/incomes[0].incomes.length
            setTotalSum(sum.toFixed(2))
            setTotalAvg(avg.toFixed(2))
        }
    }

    const countIncomes = (startDate, endDate) => {
        if(startDate <= endDate) {
            const tempIncomes = incomes[0].incomes
            const array = tempIncomes.filter(el => new Date(el.date) >= startDate && new Date(el.date) <= endDate)
            let sum = 0
            let avg = 0
            if(array.length > 0) {
                array.map((el) => {
                    sum += parseFloat(el.value)
                    return el
                })
                avg = sum/array.length
            }
            setAvg(avg.toFixed(2))
            setSum(sum.toFixed(2))
        } else {
            setEndDate(startDate)
            const tempIncomes = incomes[0].incomes
            const array = tempIncomes.filter(el => new Date(el.date) >= startDate && new Date(el.date) <= endDate)
            let sum = 0
            let avg = 0
            if(array.length > 0) {
                array.map((el) => {
                    sum += parseFloat(el.value)
                    return el
                })
                avg = sum/array.length
            }
            setAvg(avg.toFixed(2))
            setSum(sum.toFixed(2))
            alert('Start date is earlier than end date (end date automatically changed to start date)')
        }
    }

    useEffect((prevProps, prevState) => {
        if(!prevState) {
            if(incomes.length === 0)
                setIncomes(filterTable(data[1]))
            if(companyInfo.length === 0)
                setCompanyInfo(filterTable(data[0]))
            if(incomes.length > 0){
                countTotalIncomes()
                countIncomes(startDate, endDate)
                const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
                const [{ value: monthStart },,{ value: dayStart },,{ value: yearStart }] = dateTimeFormat.formatToParts(startDate)
                const [{ value: monthEnd },,{ value: dayEnd },,{ value: yearEnd }] = dateTimeFormat.formatToParts(endDate)
                document.querySelector('#startDate').value = `${yearStart}-${monthStart}-${dayStart}`
                document.querySelector('#endDate').value = `${yearEnd}-${monthEnd}-${dayEnd}`
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, companyInfo, incomes, startDate, endDate])
    return(
        <section className='company'>
            {(companyInfo.length > 0 && incomes.length > 0)?(
            <div className='wrapper'>
                <Link to='/companies-income/' className='company__back'>Back</Link>
                <div className='dateRange'>
                    <label htmlFor="startDate">From:</label>
                    <input type="date" id="startDate" name="startDate" onChange={() => {setStartDate(new Date(document.querySelector('#startDate').value))}}/>
                    <label htmlFor="endDate">to:</label>
                    <input type="date" id="endDate" name="endDate" onChange={() => {setEndDate(new Date(document.querySelector('#endDate').value))}}/>
                </div>

                <div className='company__info'>
                    <p>ID: {companyInfo[0].id}</p>
                    <p>Name: {companyInfo[0].name}</p>
                    <p>City: {companyInfo[0].city}</p>
                    <p>Total income: {totalSum}</p>
                    <p>Lifetime average: {totalAvg}</p>
                    <p>Your range income: {sum}</p>
                    <p>Your range average income: {avg}</p>
                </div>
            </div>):''}
            <div className='background'></div>
        </section>
    )
}

export default Company
