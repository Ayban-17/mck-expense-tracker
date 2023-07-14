import axios from "axios";
import { useState } from "react";

const useUpdateExpense = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const updateExpense = async (date, category, amount, _id) => {
    try {
      const url = import.meta.env.VITE_BASE + "statements/expense";
      const response = await axios.patch(
        url,
        { date, category, amount, _id },
        { withCredentials: true }
      );
      setMessage(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return { updateExpense, error, message };
};

export default useUpdateExpense;
