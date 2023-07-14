import axios from "axios";
import { useState } from "react";

const useDeleteExpense = () => {
  const [message, setMessage] = useState(null);

  const deleteExpense = async (id) => {
    const url = import.meta.env.VITE_BASE + "statements/expense/" + id;

    try {
      const response = await axios.delete(url, { withCredentials: true });
      setMessage(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { deleteExpense, message };
};

export default useDeleteExpense;
