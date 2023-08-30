import axios from "axios";
import { useState } from "react";

const useUpdateExpense = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const updateExpense = async (date, category, amount, _id) => {
    try {
      const response = await axios.patch(
        "/api/v1/statements/expense",
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
