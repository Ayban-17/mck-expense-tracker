import { useEffect } from "react";
import useGetIncome from "../hooks/useGetIncome";
import { useStatementStore } from "../store/store";
import useGetExpense from "../hooks/useGetExpense";

const Dashboard = () => {
  const { getIncome } = useGetIncome();
  const { getExpense } = useGetExpense();
  const revenue = useStatementStore((s) => s.revenue);
  const expenditure = useStatementStore((s) => s.expenditure);

  let balance = (
    +revenue.toString().replace(",", "") -
    +expenditure.toString().replace(",", "")
  ).toLocaleString();

  useEffect(() => {
    const getAllData = async () => {
      await getIncome();
      await getExpense();
    };
    getAllData();
  }, []);

  return (
    <section>
      <h1 className="font-bold text-5xl">Dashboard</h1>
      <div className="font-semibold grid grid-cols-1 gap-8 p-8 md:grid-cols-3 ">
        <div className="card p-4">
          <h1>Revenue</h1>
          <p className="text-5xl text-green-600">₱{revenue}</p>
        </div>
        <div className="card p-4">
          <h1>Expenses</h1>
          <p className="text-5xl text-red-600">₱{expenditure}</p>
        </div>
        <div className="card p-4">
          <h1>Balance</h1>
          <p className="text-5xl text-sky-600">₱{balance}</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
