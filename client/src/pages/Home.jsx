import Sidebar from "../components/Sidebar";

import { useMenuStore } from "../store/store";
import { Outlet } from "react-router-dom";

const Home = () => {
  const isOpen = useMenuStore((state) => state.isOpen);
  return (
    <section id="home" className={`${isOpen ? "home" : ""} h-[84vh] `}>
      <Sidebar />
      <main className="p-10 text-white ml-1 h-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Home;
