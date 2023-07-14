import axios from "axios";
import { useStatementStore } from "../store/store";

const useGetExpense = () => {
  const setExpense = useStatementStore((s) => s.setExpense);
  const setExpenseToEdit = useStatementStore((s) => s.setExpenseToEdit);
  const setExpenseToDelete = useStatementStore((s) => s.setExpenseToDelete);
  const setExpenditure = useStatementStore((s) => s.setExpenditure);

  const getExpense = async () => {
    const url = import.meta.env.VITE_BASE + "statements/expense";
    try {
      setExpense([]);
      const response = await axios.get(url, { withCredentials: true });
      setExpense(response.data);
      getExpenditure(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getExpenseToUpdate = async (id) => {
    const url = import.meta.env.VITE_BASE + "statements/expense/" + id;

    try {
      const response = await axios.get(url, { withCredentials: true });
      setExpenseToEdit(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getExpenseToDelete = async (id) => {
    const url = import.meta.env.VITE_BASE + "statements/expense/" + id;

    try {
      const response = await axios.get(url, { withCredentials: true });
      setExpenseToDelete(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getExpenditure = (expense) => {
    const expenditure = expense
      .map((expense) => expense.amount)
      .reduce((total, currentValue) => total + currentValue, 0)
      .toLocaleString();
    setExpenditure(expenditure);
  };

  return { getExpense, getExpenseToDelete, getExpenseToUpdate };
};

export default useGetExpense;
