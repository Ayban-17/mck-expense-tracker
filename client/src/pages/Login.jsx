import { useState } from "react";
import Copyright from "../components/Copyright";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../store/store";
import { Button } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserInfo = userStore((state) => state.setUserInfo);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return console.log("all inputs are required");
    }
    try {
      const url = import.meta.env.VITE_BASE + "users/login";
      const response = await axios.post(
        url,
        { username, password },
        { withCredentials: true }
      );
      setUserInfo(response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <section className="border-2 md:border-0 p-7 text-white" id="login">
      <h1 className="text-center z-10">Login</h1>
      <form
        className=" border-2 border-slate-100 p-6 rounded-3xl md:w-1/2 xl:w-1/3 mx-auto my-7"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-4">Username</h1>
        <input
          type="text"
          placeholder="Enter Your Username Here"
          className="p-2 mb-4 text-lg w-full bg-transparent border-2 rounded-3xl px-6"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <h1 className="text-2xl mb-4">Password</h1>
        <input
          type="password"
          placeholder="Enter Your Passwor Here"
          className="p-2  text-lg w-full bg-transparent border-2 rounded-3xl px-6"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="border-sky-600 border-2 text-2xl w-full mt-8 py-2 rounded-3xl hover:bg-sky-600 ">
          Login
        </button>
        {error && (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{ marginTop: "1em" }}
          >
            {error}
          </Button>
        )}

        <p className="text-sm text-center mt-10">
          {`Don't have an account?`}
          <Link to="/register">
            <span className="text-sky-500"> Register now</span>
          </Link>
        </p>
      </form>

      <Copyright />
    </section>
  );
};

export default Login;
