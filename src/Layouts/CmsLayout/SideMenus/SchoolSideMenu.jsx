// src/layouts/Admin/sideMenus/schoolMenu.js
export const getSchoolSideMenu = () => {
  return {
    user: "Head of Institute (HOI)",
    data: [
      {
        id: 0,
        label: "Dashboard",
        to: "/Dashboard",
      },
      {
        id: 4,
        label: "Phase IX AY 2023",
        submenu: [
          {
            id: 41,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("10")}`,
          },
          {
            id: 42,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("10")}`,
          },
          {
            id: 43,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("10")}`,
          },
          {
            id: 44,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("10")}`,
          },
          {
            id: 45,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("10")}`,
          },
          {
            id: 46,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("10")}`,
          },
        ],
      },
      {
        id: 5,
        label: "Phase X AY 2024",
        submenu: [
          {
            id: 51,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("11")}`,
          },
          {
            id: 52,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("11")}`,
          },
          {
            id: 53,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("11")}`,
          },
          {
            id: 54,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("11")}`,
          },
          {
            id: 55,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("11")}`,
          },
          {
            id: 56,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("11")}`,
          },
        ],
      },
      {
        id: 6,
        label: "Change Settings",
        submenu: [
          {
            id: 61,
            label: "Change Password",
            to: "/Dashboard",
          },
        ],
      },
    ],
  };
};
