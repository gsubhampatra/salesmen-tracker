import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  Menu,
  ChevronDown,
  ChevronUp,
  LucideIcon,
  User,
  BarChart3
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const links: SidebarLink[] = [
    { title: "Dashboard", path: "/home", icon: LayoutDashboard },
    { title: "Detailed Analysis", path: "/detailed-analysis", icon: BarChart3 },
    { title: "Salesman Summary", path: "/Salesman-Summary", icon: User },
  ];

  const dropdownLinks: SidebarLink[] = [
    { title: "Distributors", path: "/distributor", icon: Building2 },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg md:hidden z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out z-50
          ${isExpanded ? "w-64" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
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
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                  hover:bg-gray-100 group relative
                  ${isActivePath(link.path) ? "bg-blue-50 text-blue-600" : "text-gray-600"}
                `}
                onClick={() => setIsMobileOpen(false)} // Close sidebar on mobile when a link is clicked
              >
                <div className="flex items-center justify-center w-6">
                  <Icon
                    size={22}
                    className={isActivePath(link.path) ? "text-blue-600" : "text-gray-600"}
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
                  <div
                    className="
                      absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm
                      rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100
                      pointer-events-none transition-opacity
                    "
                  >
                    {link.title}
                  </div>
                )}
              </Link>
            );
          })}

          {/* Section-Wise Reports Dropdown - Hidden when Sidebar is Collapsed */}
          {isExpanded && (
            <div className="mt-3">
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-medium">Section-Wise Reports</span>
                {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {/* Dropdown Links */}
              {isDropdownOpen && (
                <div className="pl-4 mt-1">
                  {dropdownLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`
                          flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                          hover:bg-gray-100 group relative
                          ${isActivePath(link.path) ? "bg-blue-50 text-blue-600" : "text-gray-600"}
                        `}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <div className="flex items-center justify-center w-6">
                          <Icon
                            size={22}
                            className={isActivePath(link.path) ? "text-blue-600" : "text-gray-600"}
                          />
                        </div>
                        <span className="font-medium whitespace-nowrap">{link.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
