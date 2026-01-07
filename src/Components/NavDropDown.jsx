import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";

const DropDownContext = createContext();

const NavDropDown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div ref={dropdownRef} className="inline-block relative">
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { toggleOpen } = useContext(DropDownContext);

  return (
    <p
      className="inline px-3 py-1 text-xl cursor-pointer border-green-500 hover:text-green-500 hover:border-b-4"
      onClick={toggleOpen}
    >
      {children}
    </p>
  );
};

const Content = ({ children }) => {
  const { open } = useContext(DropDownContext);

  if (!open) return null;

  return (
    <div className="absolute z-50 mt-2">
      <ul className="bg-green-500 rounded shadow-md p-0 m-0 list-none text-left min-w-[150px]">
        {children}
      </ul>
    </div>
  );
};

const DropdownLink = ({ className = "", children, to = "#", ...props }) => {
  return (
    <li className="cursor-pointer hover:bg-green-600">
      <Link
        to={to}
        {...props}
        className={`block w-full no-underline text-white px-4 py-2 ${className}`}
      >
        {children}
      </Link>
    </li>
  );
};

NavDropDown.Trigger = Trigger;
NavDropDown.Content = Content;
NavDropDown.Link = DropdownLink;

export default NavDropDown;
