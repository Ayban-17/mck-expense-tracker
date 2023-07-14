import axios from "axios";
import { useState } from "react";

const useDeleteIncome = () => {
  const [message, setMessage] = useState(null);

  const deleteIncome = async (id) => {
    const url = import.meta.env.VITE_BASE + "statements/income/" + id;

    try {
      const response = await axios.delete(url, { withCredentials: true });
      setMessage(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { deleteIncome, message };
};

export default useDeleteIncome;
