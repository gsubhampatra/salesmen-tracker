import { NavLink } from "react-router-dom";
import { Home, Users, BarChart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Salesman Tracker</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Home size={20} /> Home
        </NavLink>
        <NavLink
          to="/distributor-report"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <BarChart size={20} /> Distributor Report
        </NavLink>
        <NavLink
          to="/cityhead-report"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Users size={20} /> City Head Report
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
