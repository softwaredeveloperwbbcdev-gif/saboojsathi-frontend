export const getBlockSideMenu = () => {
  return {
    user: "Block Development Officer (BDO)",
    data: [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "/Dashboard",
      },
      {
        id: 5,
        label: "Phase X",
        submenu: [
          {
            id: 51,
            label: "Phase X Class IX Profile Entry Status",
            submenu: [
              {
                id: 511,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase X AY 2024",
                to: "/Dashboard",
              },
            ],
          },
          {
            id: 52,
            label: "Manage Distribution Phase IX",
            submenu: [
              {
                id: 521,
                label: "Tag School with Delivery Center Phase X",
                to: "/DistributionLocationProcess/10/2024",
              },
              {
                id: 522,
                label: "View Tagged School with Delivery Center Phase X",
                to: "/DistributionManageTaggedSchool/10/2024",
              },
            ],
          },
          {
            id: 53,
            label: "Challan Management Phase X",
            submenu: [
              {
                id: 531,
                label: "Approved Challan Phase X",
                to: "/ApproveChallanView/9/2023",
              },
              {
                id: 532,
                label: "Allocate Bicycle Phase X",
                to: "/Dashboard",
              },
              {
                id: 533,
                label: "School Receipt Download Phase X",
                to: "/DownloadMemorandumView/10/2024",
              },
              {
                id: 534,
                label: "Challan Generation report",
                to: "/Dashboard",
              },
              {
                id: 535,
                label: "Challan/Allocation Status View",
                to: "/Dashboard",
              },
            ],
          },
        ],
      },
      {
        id: 6,
        label: "Backlog Challan View",
        submenu: [
          {
            id: 61,
            label: "P7 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 62,
            label: "P6 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 63,
            label: "P5 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 64,
            label: "P4 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 65,
            label: "P3 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 66,
            label: "P2 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 67,
            label: "P1 Challan MIS",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 7,
        label: "MIS Report",
        submenu: [
          {
            id: 71,
            label: "Distribution Update Report Phase X",
            to: "Admin.dashboard",
          },
          {
            id: 72,
            label: "Schoolwise Tagging Details Report Phase X",
            to: "Admin.dashboard",
          },
          {
            id: 73,
            label: "Distribution Update Report Phase IX",
            to: "Admin.dashboard",
          },
          {
            id: 74,
            label: "Schoolwise Tagging Details Report Phase IX",
            to: "Admin.dashboard",
          },
          {
            id: 75,
            label: "Distribution Update Report Phase VIII",
            to: "Admin.dashboard",
          },
          {
            id: 76,
            label: "Schoolwise Tagging Details Report Phase VIII",
            to: "Admin.dashboard",
          },
          {
            id: 77,
            label: "Distribution Update Report Phase VII",
            to: "Admin.dashboard",
          },
          {
            id: 78,
            label: "Schoolwise Tagging Details Report Phase VII",
            to: "Admin.dashboard",
          },
          {
            id: 79,
            label: "Distribution Update Report Phase VI",
            to: "Admin.dashboard",
          },
          {
            id: 710,
            label: "Schoolwise Tagging Details Report Phase VI",
            to: "Admin.dashboard",
          },
        ],
      },
    ],
  };
};
