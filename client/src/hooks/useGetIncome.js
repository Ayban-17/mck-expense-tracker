import axios from "axios";
import { useStatementStore } from "../store/store";

const useGetIncome = () => {
  const setIncomes = useStatementStore((s) => s.setIncomes);
  const setIncomeToEdit = useStatementStore((s) => s.setIncomeToEdit);
  const setIncomeToDelete = useStatementStore((s) => s.setIncomeToDelete);
  const setRevenue = useStatementStore((s) => s.setRevenue);

  const getIncome = async () => {
    const url = "/api/v1/statements/income";
    try {
      setIncomes([]);
      const response = await axios.get(url, { withCredentials: true });
      setIncomes(response.data);
      getRevenue(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getRevenue = (incomes) => {
    const revenue = incomes
      .map((income) => income.amount)
      .reduce((total, currentValue) => total + currentValue, 0)
      .toLocaleString();
    setRevenue(revenue);
  };

  const getOneIncome = async (id) => {
    try {
      const response = await axios.get("/api/v1/statements/income/" + id, {
        withCredentials: true,
      });
      setIncomeToEdit(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getOneIncomeToDelete = async (id) => {
    try {
      const response = await axios.get("/api/v1/statements/income/" + id, {
        withCredentials: true,
      });
      setIncomeToDelete(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { getIncome, getOneIncome, getOneIncomeToDelete };
};

export default useGetIncome;
