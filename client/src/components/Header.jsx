import { Link, Outlet } from "react-router-dom";
import { useMenuStore, userStore } from "../store/store";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";

const Header = () => {
  const userInfo = userStore((state) => state.userInfo);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const isOpen = useMenuStore((state) => state.isOpen);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="border-b-2 p-5 lg:px-32 flex justify-between text-white sticky top-0 left-0 z-10 mb-1">
        <h1 className="logo self-center text-sm">MaChaKath</h1>
        {!userInfo && (
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-lg  cursor-pointer">
              Log in
            </Link>

            <Link to="/register" className="text-lg cursor-pointer">
              Register
            </Link>
          </div>
        )}
        {userInfo && (
          <div className="flex items-center gap-8 text-lg">
            <span className="text-xl font-bold">Hello {userInfo.name}</span>
            <Button
              id="fade-button"
              sx={{ color: "white" }}
              onClick={handleMenuClick}
            >
              <Bars3Icon />
            </Button>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
