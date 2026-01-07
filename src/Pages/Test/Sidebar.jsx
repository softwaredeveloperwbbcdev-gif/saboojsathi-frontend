import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const Sidebar = ({ menuItems, title = "Dashboard" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Dynamic Theme Classes
  const themeClasses = isDarkMode
    ? "bg-slate-900 text-white border-slate-800"
    : "bg-white text-slate-900 border-gray-200 shadow-lg";

  const hoverClasses = isDarkMode
    ? "hover:bg-slate-800 text-slate-300 hover:text-white"
    : "hover:bg-gray-100 text-slate-600 hover:text-blue-600";

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* Mobile Top Bar */}
      <div
        className={`lg:hidden flex items-center justify-between p-4 w-full border-b ${themeClasses}`}
      >
        <span className="font-bold">{title}</span>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleSidebar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Container */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r transform transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${themeClasses}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b inherit-border">
          <span className="text-2xl font-bold tracking-tight">{title}</span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-500/10 transition-colors"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <ul className="space-y-1 px-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${hoverClasses}`}
                >
                  {item.icon && (
                    <span
                      className={`mr-3 transition-colors ${
                        isDarkMode
                          ? "text-slate-500 group-hover:text-blue-400"
                          : "text-slate-400 group-hover:text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
