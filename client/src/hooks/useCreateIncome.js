import axios from "axios";
import { useState } from "react";

const useCreateIncome = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const createIncome = async (date, category, amount) => {
    setIsLoading(true);
    const url = import.meta.env.VITE_BASE + "statements/income";
    try {
      const response = await axios.post(
        url,
        { date, category, amount },
        { withCredentials: true }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { createIncome, error, isLoading, message, setError, setMessage };
};

export default useCreateIncome;
