import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "./store/store";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import Income from "./pages/Income";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";

const App = () => {
  const userInfo = userStore((state) => state.userInfo);
  const setUserInfo = userStore((state) => state.setUserInfo);

  useEffect(() => {
    const isLogin = async () => {
      const url = import.meta.env.VITE_BASE + "users/auth";

      console.log(url)
      try {
        const response = await axios.post(url, {}, { withCredentials: true });
        setUserInfo(response.data);
      } catch (error) {
        return;
      }
    };
    isLogin();
  }, []);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Header />}>
  //       <Route path="/" element={userInfo ? <Home /> : <Login />}>
  //         <Route path="/" element={<Dashboard />} />
  //         <Route path="dashboard" element={<Dashboard />} />
  //         <Route path="incomes" element={<Income />} />
  //         <Route path="expenses" element={<Expenses />} />
  //       </Route>
  //       <Route path="/register" element={<Register />} />
  //     </Route>
  //   )
  // );

  return (
    <div className="App text-3xl bg-slate-950 h-screen m-1">
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={userInfo ? <Home /> : <Login />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="incomes" element={<Income />} />
              <Route path="expenses" element={<Expenses />} />
            </Route>
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
