import axios from "axios";
import { useState } from "react";

const useDeleteExpense = () => {
  const [message, setMessage] = useState(null);

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete("/api/v1/statements/expense/" + id, {
        withCredentials: true,
      });
      setMessage(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { deleteExpense, message };
};

export default useDeleteExpense;
