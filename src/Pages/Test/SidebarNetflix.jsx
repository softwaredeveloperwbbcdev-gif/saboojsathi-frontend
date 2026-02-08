import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  PlaySquare,
  X,
} from "lucide-react";

export default function Sidebar({ links = [] }) {
  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const toggleMenu = (index) => {
    // Only allow opening submenus if the sidebar is expanded
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* Toggle Button: Now visible on all screens. 
         Fixed position when sidebar is closed so you can always reopen it.
      */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className={
          `fixed md:static top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-gray-200 dark:border-gray-800 ` +
          `${sidebarOpen 
              ? "translate-x-0 w-64" 
              : "-translate-x-full md:translate-x-0 md:w-20"
          } ` +
          `bg-white dark:bg-black text-gray-800 dark:text-gray-200 flex flex-col`
        }
      >
        {/* --------------------------- Header --------------------------- */}
        <header className={`px-5 py-6 flex flex-col  ${sidebarOpen ? 'items-start' : 'items-center'}`}>
          <div className="flex items-center gap-2 text-xl font-bold text-green-700">
            <PlaySquare size={32} />
            {sidebarOpen && <motion.span initial={{opacity: 0}} animate={{opacity: 1}}>NETFLIX</motion.span>}
          </div>

          <div className="flex gap-2 mt-4">
            {/* Collapse button inside header */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            
            {sidebarOpen && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>
        </header>

        {/* ---------------------------- Menu ---------------------------- */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {links.map((item, index) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMenus[index] && sidebarOpen;

            return (
              <div key={index}>
                <button
                  onClick={() => hasChildren && toggleMenu(index)}
                  title={!sidebarOpen ? item.label : ""}
                  className={`w-full flex items-center rounded-md p-3 transition
                             hover:bg-gray-100 dark:hover:bg-gray-900
                             ${sidebarOpen ? "justify-between" : "justify-center"}`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={22} />}
                    {sidebarOpen && (
                      <span className="font-medium whitespace-nowrap">{item.label}</span>
                    )}
                  </div>

                  {hasChildren && sidebarOpen && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {hasChildren && isOpen && sidebarOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-10 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.children.map((child, cIndex) => (
                        <a
                          key={cIndex}
                          href={child.href}
                          className="block px-3 py-1.5 text-sm text-gray-500 hover:text-black dark:hover:text-white"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* --------------------------- Profile -------------------------- */}
        <footer className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className={`flex items-center gap-3 mb-3 ${!sidebarOpen ? "justify-center" : ""}`}>
            <User className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 p-2" />
            {sidebarOpen && (
              <div className="transition-opacity">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            )}
          </div>

          <div className={`flex flex-col gap-2 ${!sidebarOpen ? "items-center" : ""}`}>
            <SidebarAction icon={Settings} label="Settings" isCollapsed={!sidebarOpen} />
            <SidebarAction icon={LogOut} label="Logout" isCollapsed={!sidebarOpen} />
          </div>
        </footer>
      </aside>
    </>
  );
}

function SidebarAction({ icon: Icon, label, isCollapsed }) {
  return (
    <button
      title={isCollapsed ? label : ""}
      className={`flex items-center gap-3 p-3 text-sm rounded-md w-full transition
                 hover:bg-gray-100 dark:hover:bg-gray-900
                 ${isCollapsed ? "justify-center" : ""}`}
    >
      <Icon size={20} />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}
