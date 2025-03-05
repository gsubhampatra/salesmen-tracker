import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  LucideIcon,
  User,
  BarChart3,
} from "lucide-react";

interface SidebarLink {
  title: string;
  path: string;
  icon: LucideIcon;
}

const Sidebar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const links: SidebarLink[] = [
    { title: "Dashboard", path: "/", icon: LayoutDashboard },
    { title: "Detailed Analysis", path: "/detailed-analysis", icon: BarChart3 },
    { title: "Salesman Summary", path: "/Salesman-Summary", icon: User },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="fixed z-50 p-2 bg-white rounded-lg shadow-lg top-4 left-4 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out z-50 
          ${isExpanded ? "w-64" : "w-20"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <h1
              className={`font-bold text-xl transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              SFA
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                  hover:bg-gray-100 group relative
                  ${
                    isActivePath(link.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600"
                  }
                `}
                onClick={() => setIsMobileOpen(false)} // Close sidebar on mobile when a link is clicked
              >
                <div className="flex items-center justify-center w-6">
                  <Icon
                    size={22}
                    className={
                      isActivePath(link.path)
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  />
                </div>
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-200 ${
                    isExpanded ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {link.title}
                </span>
                {!isExpanded && (
                  <div className="absolute px-2 py-1 ml-2 text-sm text-white transition-opacity bg-gray-800 rounded-md opacity-0 pointer-events-none left-full whitespace-nowrap group-hover:opacity-100">
                    {link.title}
                  </div>
                )}
              </Link>
            );
          })}
          {/* 
          <button
            className="flex items-center gap-3 px-3 py-3 transition-colors rounded-lg hover:bg-gray-100"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <div className="flex items-center justify-center w-6">
              <LogOut size={22} />
            </div>
            <span
              className={`font-medium whitespace-nowrap transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              Logout
            </span>
          </button> */}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
