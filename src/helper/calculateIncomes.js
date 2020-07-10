import { store } from "react-notifications-component";

const calculateSumAndAvg = (setSum, setAvg, incomes, startDate, endDate) => {
  const tempIncomes = incomes[0].incomes;
  const array = tempIncomes.filter(
    (el) => new Date(el.date) >= startDate && new Date(el.date) <= endDate
  );
  let sum = 0;
  let avg = 0;
  if (array.length > 0) {
    sum = array.reduce((previous, current) => {
      return previous + parseFloat(current.value);
    }, 0);
    avg = sum / array.length;
  }
  setAvg(avg.toFixed(2));
  setSum(sum.toFixed(2));
};

export const calculateIncomes = (
  startDate,
  endDate,
  incomes,
  setAvg,
  setSum,
  setEndDate
) => {
  if (startDate <= endDate) {
    calculateSumAndAvg(setSum, setAvg, incomes, startDate, endDate);
  } else {
    setEndDate(startDate);

    calculateSumAndAvg(setSum, setAvg, incomes, startDate, endDate);

    store.addNotification({
      title: "Date changed",
      message: "End date automatically set as start date.",
      type: "info",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    store.addNotification({
      title: "Bad dates",
      message: "Start date is earlier than end date!",
      type: "danger",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }
};

export const calculateTotalIncomes = (incomes, setTotalSum, setTotalAvg) => {
  if (incomes.length > 0) {
    let sum = incomes[0].incomes.reduce((previous, current) => {
      return previous + parseFloat(current.value);
    }, 0);

    const avg = sum / incomes[0].incomes.length;
    setTotalSum(sum.toFixed(2));
    setTotalAvg(avg.toFixed(2));
  }
};
