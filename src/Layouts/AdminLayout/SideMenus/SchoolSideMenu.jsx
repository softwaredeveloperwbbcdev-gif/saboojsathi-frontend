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
        id: 1,
        label: "Phase VI AY 2020",
        submenu: [
          {
            id: 11,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("7")}`,
          },
          {
            id: 12,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("7")}`,
          },
          {
            id: 13,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("7")}`,
          },
          {
            id: 14,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("7")}`,
          },
          {
            id: 15,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("7")}`,
          },
          {
            id: 16,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("7")}`,
          },
        ],
      },
      {
        id: 2,
        label: "Phase VII AY 2021",
        submenu: [
          {
            id: 21,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("8")}`,
          },
          {
            id: 22,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("8")}`,
          },
          {
            id: 23,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("8")}`,
          },
          {
            id: 24,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("8")}`,
          },
          {
            id: 25,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("8")}`,
          },
          {
            id: 26,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("8")}`,
          },
        ],
      },
      {
        id: 3,
        label: "Phase VIII AY 2022",
        submenu: [
          {
            id: 31,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("9")}`,
          },
          {
            id: 32,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("9")}`,
          },
          {
            id: 33,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("9")}`,
          },
          {
            id: 34,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("9")}`,
          },
          {
            id: 35,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("9")}`,
          },
          {
            id: 36,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("9")}`,
          },
        ],
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
        label: "Phase XI AY 2025",
        submenu: [
          {
            id: 61,
            label: "Student Registration",
            to: `/StudentAdd/${btoa("12")}`,
          },
          {
            id: 62,
            label: "Student Profile Verification",
            to: `/StudentProfile/${btoa("12")}`,
          },
          {
            id: 63,
            label: "Download Profile",
            to: `/StudentProfileDownload/${btoa("12")}`,
          },
          {
            id: 64,
            label: "Approved Profile",
            to: `/ApprovedListView/${btoa("12")}`,
          },
          {
            id: 65,
            label: "Download Distribution Record",
            to: `/DownloadDistribution/${btoa("12")}`,
          },
          {
            id: 66,
            label: "Update Distribution Details",
            to: `/UploadDistribution/${btoa("12")}`,
          },
        ],
      },
      {
        id: 7,
        label: "Change Settings",
        submenu: [
          {
            id: 71,
            label: "Change Password",
            to: "/Dashboard",
          },
        ],
      },
    ],
  };
};
