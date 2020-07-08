//  Filter results
export const filter = (company, setDataToShow, setCurrentPage) => {
  const filterValue = document.querySelector("#filter").value;
  if (filterValue.length > 0) {
    const result = company.filter(
      (company) =>
        company.name.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1
    );
    setDataToShow(result);
    setCurrentPage(1);
  } else {
    setDataToShow(company);
    setCurrentPage(1);
  }
};
