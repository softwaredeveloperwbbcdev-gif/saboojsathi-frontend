export const getBlockSideMenu = () => {
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = btoa(user.internal_code);
  return {
    user: "Block Development Officer (BDO)",
    data: [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "/dashboard",
      },
      {
        id: 1,
        label: "Phase VI",
        submenu: [
          {
            id: 11,
            label: "Phase VI Class IX Profile Entry Status",
            submenu: [
              {
                id: 111,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase VI AY 2020",
                to: `/ProfileEntryStatusReportSchool/${btoa(7)}/${id}`,
              },
            ],
          },
          {
            id: 12,
            label: "Manage Distribution Phase VI",
            submenu: [
              {
                id: 121,
                label: "Tag School with Delivery Center Phase VI",
                to: `/DistributionLocationProcess/${btoa(7)}`,
              },
              {
                id: 122,
                label: "View Tagged School with Delivery Center Phase VI",
                to: `/DistributionManageTaggedSchool/${btoa(7)}`,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Phase VII",
        submenu: [
          {
            id: 21,
            label: "Phase VII Class IX Profile Entry Status",
            submenu: [
              {
                id: 211,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase VII AY 2021",
                to: `/ProfileEntryStatusReportSchool/${btoa(8)}/${id}`,
              },
            ],
          },
          {
            id: 22,
            label: "Manage Distribution Phase VII",
            submenu: [
              {
                id: 221,
                label: "Tag School with Delivery Center Phase VII",
                to: `/DistributionLocationProcess/${btoa(8)}`,
              },
              {
                id: 222,
                label: "View Tagged School with Delivery Center Phase VII",
                to: `/DistributionManageTaggedSchool/${btoa(8)}`,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "Phase VIII",
        submenu: [
          {
            id: 31,
            label: "Phase VIII Class IX Profile Entry Status",
            submenu: [
              {
                id: 311,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase VIII AY 2022",
                to: `/ProfileEntryStatusReportSchool/${btoa(9)}/${id}`,
              },
            ],
          },
          {
            id: 32,
            label: "Manage Distribution Phase VIII",
            submenu: [
              {
                id: 321,
                label: "Tag School with Delivery Center Phase VIII",
                to: `/DistributionLocationProcess/${btoa(9)}`,
              },
              {
                id: 322,
                label: "View Tagged School with Delivery Center Phase VIII",
                to: `/DistributionManageTaggedSchool/${btoa(9)}`,
              },
            ],
          },
          {
            id: 33,
            label: "Challan Management Phase VIII",
            submenu: [
              {
                id: 331,
                label: "Approved Challan Phase VIII",
                to: `/ApproveChallanView/${btoa(9)}`,
              },
              {
                id: 332,
                label: "Allocate Bicycle Phase VIII",
                to: `/AllocateChallanView/${btoa(9)}`,
              },
              {
                id: 333,
                label: "School Receipt Download Phase VIII",
                to: `/DownloadMemorandumView/${btoa(9)}`,
              },
              {
                id: 334,
                label: "Challan Generation report",
                to: `/ChallanGenerationReportSchool/${btoa(9)}/${id}`,
              },
              {
                id: 335,
                label: "Challan/Allocation Status View",
                to: "/Dashboard",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        label: "Phase IX",
        submenu: [
          {
            id: 41,
            label: "Phase IX Class IX Profile Entry Status",
            submenu: [
              {
                id: 411,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase IX AY 2023",
                to: `/ProfileEntryStatusReportSchool/${btoa(10)}/${id}`,
              },
            ],
          },
          {
            id: 42,
            label: "Manage Distribution Phase IX",
            submenu: [
              {
                id: 421,
                label: "Tag School with Delivery Center Phase IX",
                to: `/DistributionLocationProcess/${btoa(10)}`,
              },
              {
                id: 422,
                label: "View Tagged School with Delivery Center Phase IX",
                to: `/DistributionManageTaggedSchool/${btoa(10)}`,
              },
            ],
          },
          {
            id: 43,
            label: "Challan Management Phase IX",
            submenu: [
              {
                id: 431,
                label: "Approved Challan Phase IX",
                to: `/ApproveChallanView/${btoa(10)}`,
              },
              {
                id: 432,
                label: "Allocate Bicycle Phase IX",
                to: `/AllocateChallanView/${btoa(10)}`,
              },
              {
                id: 433,
                label: "School Receipt Download Phase IX",
                to: `/DownloadMemorandumView/${btoa(10)}`,
              },
              {
                id: 434,
                label: "Challan Generation report",
                to: `/ChallanGenerationReportSchool/${btoa(10)}/${id}`,
              },
              {
                id: 435,
                label: "Challan/Allocation Status View",
                to: "/Dashboard",
              },
            ],
          },
        ],
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
                to: `/ProfileEntryStatusReportSchool/${btoa(11)}/${id}`,
              },
            ],
          },
          {
            id: 52,
            label: "Manage Distribution Phase X",
            submenu: [
              {
                id: 521,
                label: "Tag School with Delivery Center Phase X",
                to: `/DistributionLocationProcess/${btoa(11)}`,
              },
              {
                id: 522,
                label: "View Tagged School with Delivery Center Phase X",
                to: `/DistributionManageTaggedSchool/${btoa(11)}`,
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
                to: `/ApproveChallanView/${btoa(11)}`,
              },
              {
                id: 532,
                label: "Allocate Bicycle Phase X",
                to: `/AllocateChallanView/${btoa(11)}`,
              },
              {
                id: 533,
                label: "School Receipt Download Phase X",
                to: `/DownloadMemorandumView/${btoa(11)}`,
              },
              {
                id: 534,
                label: "Challan Generation report",
                to: `/ChallanGenerationReportSchool/${btoa(11)}/${id}`,
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
