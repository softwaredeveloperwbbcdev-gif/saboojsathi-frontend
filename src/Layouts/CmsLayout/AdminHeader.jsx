import React from "react";
import LightLogo from "../../assets/images/Admin/Askoka-stambha-light.png";
import DarkLogo from "../../assets/images/Admin/Askoka-stambha-dark.png";
import ProfileLogo from "../../assets/images/Admin/user2-160x160.jpg";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export const AdminHeader = ({
  user,
  onLogout,
  onProfileToggle,
  isOpenProfile,
  onSidebarToggle,
}) => {
  // alert("AdminHeader" + user);
  return (
    <header
      className="relative z-[1030] flex items-center justify-between px-4 sm:px-6 py-2 h-[64px] shadow-md
    bg-emerald-400/60 dark:bg-[#0f1f0f]/60 backdrop-blur-xl border-b border-white/20 dark:border-green-900
    transition-all duration-300"
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle for Mobile */}
        <button
          className="block lg:hidden text-black dark:text-green-300 text-2xl focus:outline-none hover:bg-white/20 p-2 rounded"
          onClick={onSidebarToggle}
          aria-label="Toggle Sidebar"
        >
          <MdOutlineMenu />
        </button>

        {/* Logo and App Name */}
        <Link to="/dashboard" className="flex items-center gap-3">
          {/* Light Mode Logo */}
          <img
            src={LightLogo}
            alt="Ashoke Stambha"
            className="h-10 w-auto block dark:hidden"
          />

          {/* Dark Mode Logo */}
          <img
            src={DarkLogo}
            alt="Ashoke Stambha Dark"
            className="h-10 w-auto hidden dark:block"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-green-800 dark:text-green-600">
              Sabooj Sathi
            </h1>
            <p className="text-sm font-semibold text-green-800 dark:text-white m-0">
              Govt. of West Bengal
            </p>
          </div>
        </Link>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={onProfileToggle}
          className="flex items-center space-x-2 focus:outline-none hover:ring-2 hover:ring-white/30 rounded px-2 py-1 transition"
        >
          <img
            src={ProfileLogo}
            alt="User"
            className="w-8 h-8 rounded-full border border-white shadow"
          />
          <span className="text-black dark:text-green-300 hidden sm:inline-block">
            {user}
          </span>
        </button>

        {/* Glassmorphic Dropdown */}
        <div
          className={`absolute right-0 mt-4 w-64 rounded-xl border border-white/10 shadow-lg backdrop-blur-xl
          bg-emerald-400/60 dark:bg-[#0f1f0f]/60 text-black dark:text-white transition-all duration-300 ease-in-out transform
          ${
            isOpenProfile
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          } z-10`}
        >
          <div className="p-4 border-b border-white/20 dark:border-green-800 text-center">
            <img
              src={ProfileLogo}
              className="w-16 h-16 rounded-full mx-auto border-2 border-white/70 dark:border-green-400"
              alt="User"
            />
            <p className="font-semibold mt-2">{user}</p>
            <small className="text-green-800 dark:text-green-300">
              West Bengal
            </small>
          </div>
          <div className="flex justify-between px-4 py-2 bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-b-xl">
            <Link
              to="/change-password"
              className="py-1.5 px-3 text-sm font-medium text-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition"
            >
              Change Password
            </Link>
            <button
              onClick={onLogout}
              className="py-1.5 px-3 text-sm font-medium text-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
