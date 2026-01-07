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
} from "lucide-react";

/**
 * Netflix-style Responsive Sidebar
 * - Dark / Light mode
 * - Mobile drawer
 * - Nested menus with icons
 * - Profile section with actions
 */
export default function Sidebar({ links = [] }) {
  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  /* ------------------------- Theme handling ------------------------- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  /* ------------------------- Menu handling -------------------------- */
  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  /* --------------------------- Render ------------------------------- */
  return (
    <>
      {/* Mobile open button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white"
      >
        <Menu />
      </button>

      <aside
        className={
          `fixed md:static top-0 left-0 z-40 h-screen w-64 ` +
          `transform transition-transform duration-300 ` +
          `${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ` +
          `bg-white dark:bg-black text-gray-800 dark:text-gray-200 flex flex-col`
        }
      >
        {/* --------------------------- Header --------------------------- */}
        <header className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xl font-bold text-green-700">
            <PlaySquare />
            <span>NETFLIX</span>
          </div>

          {/* Mobile header controls */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-800"
            >
              <Menu size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-gray-200 dark:bg-gray-800"
            >
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* ---------------------------- Menu ---------------------------- */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map((item, index) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMenus[index];

            return (
              <div key={index}>
                <button
                  onClick={() => hasChildren && toggleMenu(index)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md
                             hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={18} />}
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {hasChildren && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {hasChildren && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="ml-8 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.children.map((child, cIndex) => (
                        <a
                          key={cIndex}
                          href={child.href}
                          className="block px-3 py-1.5 text-sm text-gray-500
                                     hover:text-black dark:hover:text-white"
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
          <div className="flex items-center gap-3 mb-3">
            <User className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1" />
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Profile</p>
            </div>
          </div>

          <div className="flex md:flex-col gap-2">
            <SidebarAction icon={Settings} label="Settings" />
            <SidebarAction icon={LogOut} label="Logout" />
          </div>
        </footer>
      </aside>
    </>
  );
}

/* ------------------------- Helper component -------------------------- */
function SidebarAction({ icon: Icon, label }) {
  return (
    <button
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md w-full
                 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
    >
      <Icon size={16} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
