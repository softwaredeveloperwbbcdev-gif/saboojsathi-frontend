import React from "react";
import Sidebar from "./Sidebar";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Mail,
  Bell,
  ShieldCheck,
  FolderKanban,
} from "lucide-react";

const myNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <BarChart3 size={20} />,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: <FolderKanban size={20} />,
  },
  {
    label: "Team Members",
    path: "/team",
    icon: <Users size={20} />,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: <Mail size={20} />,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: <Bell size={20} />,
  },
  {
    label: "Security",
    path: "/security",
    icon: <ShieldCheck size={20} />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings size={20} />,
  },
];
function AppsTest() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar menuItems={myNavigation} />
      <main className="flex-1 p-6 bg-gray-50">
        {/* Your Page Content Goes Here */}
      </main>
    </div>
  );
}

export default AppsTest;
