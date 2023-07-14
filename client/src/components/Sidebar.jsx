import axios from "axios";
import { useMenuStore, userStore } from "../store/store";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const setUserInfo = userStore((state) => state.setUserInfo);
  const isOpen = useMenuStore((state) => state.isOpen);

  const handleLogOut = async () => {
    const url = import.meta.env.VITE_BASE + "users/logout";
    try {
      await axios.post(url, {}, { withCredentials: true });
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className={`w-full  h-full ${isOpen ? "" : "hidden"}`}>
      <div className="text-white h-full ">
        <ul className="flex flex-col  py-8 text-lg text-left h-full ">
          <NavLink to="/dashboard">
            <li className="cursor-pointer">Dashboard</li>
          </NavLink>
          <NavLink to="/incomes">
            <li className="cursor-pointer">My Incomes</li>
          </NavLink>
          <NavLink to="/expenses">
            <li className="cursor-pointer">My Expenses</li>
          </NavLink>
          <div className="h-full flex ">
            <li
              className="cursor-pointer self-end w-full"
              onClick={handleLogOut}
            >
              Log out
            </li>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
