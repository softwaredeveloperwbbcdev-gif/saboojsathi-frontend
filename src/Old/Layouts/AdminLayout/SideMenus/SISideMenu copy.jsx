// src/layouts/Admin/sideMenus/siMenu.js
export const getSISideMenu = () => {
  return {
    user: "Sub Inspector of School (SI)",
    data: [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "Admin.dashboard",
      },
      {
        id: 1,
        label: "Verification of Application",
        submenu: [
          {
            id: 11,
            label: "Pending Application from AY 2024",
            to: `/CircleVerifyListSchool/${btoa("11")}`,
          },
        ],
      },
      {
        id: 2,
        label: "Change Settings",
        submenu: [
          {
            id: 21,
            label: "Change Password",
            to: "Admin.dashboard",
          },
        ],
      },
    ],
  };
};
