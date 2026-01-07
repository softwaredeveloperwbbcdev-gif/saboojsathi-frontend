import { Transition } from "@headlessui/react";
import React, { useState, createContext, useContext } from "react";
// import { Link } from "@inertiajs/react";
import { Link } from "react-router-dom";

const DropDownContext = createContext();

const NavDropDown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="inline-block relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <p
        className="inline px-3 py-1 text-xl border-green-500 hover:text-green-500 hover:border-b-4"
        onClick={toggleOpen}
      >
        {children}
      </p>

      {open && (
        <ul
          className="bg-green-500  absolute top-full left-0 m-0 p-0 list-none text-left"
          onClick={() => setOpen(false)}
        ></ul>
      )}
    </>
  );
};

const Content = ({ children }) => {
  const { open, setOpen } = useContext(DropDownContext);

  return (
    <>
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className={`absolute z-50 m-0 p-0`} onClick={() => setOpen(false)}>
          <ul className="bg-green-500 m-0 p-0 list-none text-left">
            {children}
          </ul>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({ className = "", children, ...props }) => {
  return (
    <li className="cursor-pointer hover:bg-green-600">
      <Link
        {...props}
        className={
          "block h-full w-full no-underline text-white p-4 " + className
        }
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
