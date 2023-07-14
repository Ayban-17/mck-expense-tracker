import { useState } from "react";
import Copyright from "../components/Copyright";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "" || name === "" || confirm === "") {
      return console.log("all inputs are required");
    }

    if (!(password === confirm)) return setError("passwords don't match");

    try {
      const url = import.meta.env.VITE_BASE + "users/register";
      const response = await axios.post(url, { username, name, password });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <section className="border-2 md:border-0 p-7 text-white" id="register">
      <h1 className="text-center ">Register</h1>
      <form
        className=" border-2 border-slate-100 p-6 rounded-3xl md:w-1/2  mx-auto my-7 gap-8"
        onSubmit={handleSubmit}
      >
        {error && (
          <Button variant="outlined" color="error" fullWidth>
            {error}
          </Button>
        )}
        <div>
          <h1 className="text-lg">Username</h1>
          <input
            type="text"
            placeholder="Enter Your Username Here"
            className="p-2 mb-4 text-lg w-full bg-transparent border-2 rounded-3xl px-6"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="">
          <h1 className="text-lg ">Name</h1>
          <input
            type="text"
            placeholder="Enter Your Name Here"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-2 mb-4 text-lg w-full bg-transparent border-2 rounded-3xl px-6"
          />
        </div>
        <div>
          <h1 className="text-lg">Password</h1>
          <input
            type="password"
            placeholder="Enter Your Password Here"
            className="p-2  text-lg w-full bg-transparent border-2 rounded-3xl px-6"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <h1 className="text-lg mt-4">Confirm Password</h1>
          <input
            type="password"
            placeholder="Enter Your Password Again Here"
            className="p-2  text-lg w-full bg-transparent border-2 rounded-3xl px-6"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
        </div>

        <button className="border-sky-600 border-2 text-2xl w-full mt-8 py-2 rounded-3xl hover:bg-sky-600  col-span-2">
          Register
        </button>
        <p className="text-sm text-center mt-10">
          {`Already have an account?`}
          <Link to="/">
            <span className="text-sky-500"> Login now</span>
          </Link>
        </p>
      </form>

      <Copyright />
    </section>
  );
};

export default Register;
