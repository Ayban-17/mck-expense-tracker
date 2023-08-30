import axios from "axios";
import { useState } from "react";

const useDeleteIncome = () => {
  const [message, setMessage] = useState(null);

  const deleteIncome = async (id) => {
    try {
      const response = await axios.delete("/api/v1/statements/income/" + id, {
        withCredentials: true,
      });
      setMessage(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { deleteIncome, message };
};

export default useDeleteIncome;
