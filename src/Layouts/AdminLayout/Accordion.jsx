import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccordionSubmenu from "./AccordionSubmenu";

const Accordion = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  useEffect(() => {
    if (items) {
      setAccordionItems(
        items.map((item) => ({
          ...item,
          toggled: false,
        }))
      );
    }
  }, [items]);

  const handleAccordionToggle = (clickedItem) => {
    setAccordionItems((prev) =>
      prev.map((item) => {
        const isSame = clickedItem.id === item.id;
        return {
          ...item,
          toggled: isSame
            ? !item.toggled
            : keepOthersOpen
            ? item.toggled
            : false,
        };
      })
    );
  };

  return (
    <div className="text-gray-800 dark:text-gray-100 bg-white dark:bg-[#111827]">
      {accordionItems?.map((item, index) => (
        <div className="flex flex-col max-w-full" key={index} id={item.id}>
          {/* Case 1: Download link */}
          {item.to && item.download && (
            <a
              href={item.to}
              download
              className="flex text-[15px] p-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-l-4 hover:border-green-600 dark:hover:border-green-400 transition-all"
            >
              {item.label}
            </a>
          )}

          {/* Case 2: Regular Link */}
          {item.to && !item.download && !item.submenu && (
            <Link
              to={item.to}
              className="flex text-[15px] p-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-l-4 hover:border-green-600 dark:hover:border-green-400 transition-all"
            >
              {item.label}
            </Link>
          )}

          {/* Case 3: Has submenu */}
          {item.submenu && (
            <>
              <button
                onClick={() => handleAccordionToggle(item)}
                className="flex justify-between items-center text-[15px] p-2.5 px-4 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-l-4 hover:border-green-600 dark:hover:border-green-400 transition-all"
              >
                <span>{item.label}</span>
                <span className="text-lg font-semibold">
                  {item.toggled ? "-" : "+"}
                </span>
              </button>

              <div
                className={`pl-4 transition-all overflow-hidden ${
                  item.toggled
                    ? "max-h-[2000px] ease-in duration-250"
                    : "max-h-0 overflow-hidden ease-out duration-150"
                }`}
              >
                <AccordionSubmenu items={item.submenu} keepOthersOpen={false} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
