import { FaCircle } from "react-icons/fa";
import Accordion from "./Accordion";

const AdminSidebar = ({ location_name, data, isOpen }) => {
  // alert("AdminSidebar-" + location_name);
  return (
    <aside
      className={`fixed lg:sticky lg:pb-16 lg:h-screen top-0 left-0 h-full w-64 lg:w-60 bg-white dark:bg-[#111827] text-gray-800 dark:text-gray-100 z-50 
    transform transition-all duration-500 ease-in-out
    border-r border-gray-200 dark:border-gray-700 shadow-xl lg:shadow-none
    ${
      isOpen
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100"
    }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 transition duration-300 ease-in-out">
          <h2 className="text-lg font-bold truncate animate-fade-in">
            {location_name}
          </h2>
          <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1 animate-slide-in-left">
            <FaCircle className="mr-1" /> Online
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto animate-fade-in-up">
          <p className="text-xs font-semibold px-6 py-3 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wide">
            Access List
          </p>
          <Accordion items={data} keepOthersOpen={false} />
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
