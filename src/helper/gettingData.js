import axios from "axios";

//  Getting data from first API (city, id, name), data save into state.companiesArray
export const getSummaryData = async (setCompanies) => {
  let array = [];

  try {
    const response = await fetch(
      `https://recruitment.hal.skygate.io/companies`
    );
    if (response.ok) {
      array = await response.json();
    }
  } catch (error) {
    console.error(error);
  }
  setCompanies(array);
};

//  Getting data from second API (id, incomes {date, value})
export const getIncomeData = async (companies, setIncomes) => {
  if (companies.length > 0) {
    Promise.all(
      companies.map((el) =>
        axios(`https://recruitment.hal.skygate.io/incomes/${el.id}`)
      )
    )
      .then((responses) =>
        Promise.all(responses.map((res) => res.data)).then((data) => {
          const filtered = data.filter((el) => {
            return el !== "";
          });
          setIncomes(filtered);
        })
      )
      .catch((error) => console.error(error));
  }
};
//  Calculate total incomes and insert them to each object in companies
export const calculateTotalIncomes = (
  companies,
  incomes,
  setCompanies,
  setLoading
) => {
  const newCompanies = companies.map((company) => {
    const income = incomes.find((income) => income.id === company.id);
    const sum = income.incomes.reduce((previous, current) => {
      return previous + parseFloat(current.value);
    }, 0);

    return { ...company, totalIncome: sum.toFixed(2) };
  });

  setCompanies(newCompanies);
  setLoading(false);
};

//  Sorting state.companies by totalIncome desc
export const sortArrayByTotalIncome = (companies, setCompanies, setSorted) => {
  const sortedArray = companies.sort((a, b) => {
    return b.totalIncome - a.totalIncome;
  });
  setCompanies(sortedArray);
  setSorted(true);
};
