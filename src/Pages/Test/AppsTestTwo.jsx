import React from "react";
import { Home, Film, Tv } from "lucide-react";
import Sidebar from "./SidebarNetflix";

function AppsTestTwo() {
  const links = [
    {
      label: "Phase",
      icon: Tv,
      children: [
        { label: "Phase I", href: "/phase I" },
        { label: "Phase II", href: "/phase II" },
        { label: "Phase III", href: "/phase III" },
        { label: "Phase IV", href: "/phase IV" },
        { label: "Phase V", href: "/phase V" },
        { label: "Phase VI", href: "/phase VI" },
        { label: "Phase VII", href: "/phase VII" },
        { label: "Phase VIII", href: "/phase VIII" },
        { label: "Phase IX", href: "/phase IX" },
        { label: "Phase X", href: "/phase X" },
        { label: "Phase XI", href: "/phase XI" },
        { label: "Phase XII", href: "/phase XII" },
        { label: "Phase XIII", href: "/phase XIII" },
      ],
    },
    {
      label: "CMS",
      icon: Film,
      children: [{ label: "Consignment", href: "/Consignment" }],
    },
  ];
  return <Sidebar links={links} />;
}

export default AppsTestTwo;
