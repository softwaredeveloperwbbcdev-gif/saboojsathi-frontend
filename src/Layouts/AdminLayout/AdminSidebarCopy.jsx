import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LightLogo from "../../assets/images/Admin/Askoka-stambha-light.png";
import DarkLogo from "../../assets/images/Admin/Askoka-stambha-dark.png";
import { usePhaseStore } from "../../Store/phaseStore";

import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  X,
  LayoutDashboard,
  Layers,
  UserCircle,
} from "lucide-react";

export default function Sidebar({
  menuData = [],
  username,
  location_name,
  onLogout,
}) {
  const navigate = useNavigate();
  const setPhaseId = usePhaseStore((state) => state.setPhaseId);

  const handlePhaseClick = (phaseId, to) => {
    setPhaseId(phaseId); // store in Zustand
    navigate(to); // go to dashboard
  };

  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleMenu = (id) => {
    if (!sidebarOpen) setSidebarOpen(true);
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Mobile Menu Button - ONLY visible on mobile screens when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white"
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-black text-gray-800 dark:text-gray-200 ${
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        {/* HEADER: Ashoka Stambha Logo & Sabooj Sathi Text */}
        <header
          className={`px-5 py-6 flex flex-col ${sidebarOpen ? "items-start" : "items-center"}`}
        >
          <Link to="/Dashboard" className="flex items-center gap-3">
            <img
              src={LightLogo}
              alt="Logo"
              className="h-10 w-auto block dark:hidden"
            />
            <img
              src={DarkLogo}
              alt="Logo"
              className="h-10 w-auto hidden dark:block"
            />
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="leading-tight"
              >
                <h1 className="text-xl font-bold text-green-800 dark:text-green-600">
                  Sabooj Sathi
                </h1>
                <p className="text-[12px] font-semibold text-green-700 dark:text-gray-400">
                  Govt. of West Bengal
                </p>
              </motion.div>
            )}
          </Link>

          {/* Toggle Buttons Container */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded bg-gray-100 dark:bg-gray-900"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {sidebarOpen && (
              <button
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                className="p-2 rounded bg-gray-100 dark:bg-gray-900"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>
        </header>

        {/* NAVIGATION: Uses item.submenu and item.to */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuData.map((item) => {
            const hasSub = item.submenu && item.submenu.length > 0;
            const isOpen = openMenus[item.id] && sidebarOpen;
            const Icon = item.label === "Dashboard" ? LayoutDashboard : Layers;

            return (
              <div key={item.id}>
                {hasSub ? (
                  <button
                    onClick={() => toggleMenu(item.id)}
                    title={!sidebarOpen ? item.label : ""}
                    className={`w-full flex items-center p-3 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-900 ${
                      sidebarOpen ? "justify-between" : "justify-center"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={22}
                        className="text-green-700 dark:text-green-500"
                      />
                      {sidebarOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {sidebarOpen && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    title={!sidebarOpen ? item.label : ""}
                    className={`w-full flex items-center p-3 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-900 ${
                      sidebarOpen ? "justify-start gap-3" : "justify-center"
                    }`}
                  >
                    <Icon
                      size={22}
                      className="text-green-700 dark:text-green-500"
                    />
                    {sidebarOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {hasSub && isOpen && sidebarOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-9 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-800"
                    >
                      {item.submenu.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handlePhaseClick(sub.phaseId, sub.to)}
                          className="block px-4 py-2 text-xs text-gray-500 hover:text-green-700 dark:hover:text-green-400"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* FOOTER: Displays the dynamic Username and Role */}
        <footer className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <div
            className={`flex items-center gap-3 mb-3 ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <UserCircle className="h-9 w-9 text-gray-400" />
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{username}</p>
                <p className="text-[10px] uppercase font-bold text-green-700 dark:text-green-500 truncate">
                  {location_name}
                </p>
              </div>
            )}
          </div>
          <div
            className={`flex flex-col gap-1 ${!sidebarOpen ? "items-center" : ""}`}
          >
            <button className="flex items-center gap-3 p-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Settings size={18} /> {sidebarOpen && <span>Settings</span>}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 p-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md text-red-600"
            >
              <LogOut size={18} /> {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
