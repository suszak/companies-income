import React, { useEffect } from 'react'
import './incomeTable.css'

const fetchSummaryData = async () => {
    try {
        const response = await fetch(`https://recruitment.hal.skygate.io/companies`);
        if(response.status === 200) {
            return await response.json()
        }
    } catch(error) {
        console.error(error);
    }
}

const IncomeTable = () => {
    useEffect(() => {
        async function getData() {
            const contentTable = await fetchSummaryData()
            console.log(contentTable[1])
        }
        getData()
    }, [])

    return (
        <div>
            <header><h1>companies:</h1></header>
        </div>
    )
}

export default IncomeTable