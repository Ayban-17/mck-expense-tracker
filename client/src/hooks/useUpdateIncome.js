import axios from "axios";
import { useState } from "react";

const useUpdateIncome = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const updateIncome = async (date, category, amount, _id) => {
    try {
      const url = import.meta.env.VITE_BASE + "statements/income";
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

  return { updateIncome, error, message };
};

export default useUpdateIncome;
