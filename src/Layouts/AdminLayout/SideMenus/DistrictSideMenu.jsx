export const getDistrictSideMenu = () => {
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = btoa(user.internal_code);
  return {
    user: "District Project Management Unit (DPMU)",
    data: [
      {
        id: 0,
        label: "Dashboard",
        to: `/dashboard`,
      },
      {
        id: 1,
        label: "Phase VI",
        submenu: [
          {
            id: 11,
            label: "Verification of Applications",
            submenu: [
              {
                id: 111,
                label: "Pending Application from Schools",
                to: `/DistrictVerifyListSchool/${btoa(7)}`,
              },
            ],
          },
          {
            id: 12,
            label: "Distribution Records",
            submenu: [
              {
                id: 121,
                label: "Download Distribution Records",
                to: `/DownloadDistributionDistrict/${btoa(7)}`,
              },
            ],
          },
          {
            id: 13,
            label: "Mis Report",
            submenu: [
              {
                id: 131,
                label:
                  "Block Wise Student Profile Entry Status (Class IX) [Phase VI ADC. Yr. 2020]",
                to: `/ProfileEntryStatusReportBlock/${btoa(7)}/${id}`,
              },
              {
                id: 132,
                label: "Block Wise School Tagging Details Report (Phase VI)",
                to: `/TaggingDetailsReportBlock/${id}/${btoa(7)}`,
              },
              {
                id: 133,
                label: "Blockwise Distribution Details Report (Phase VI)",
                to: `/DistributionReportBlock/${id}/${btoa(7)}`,
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
            label: "Verification of Applications",
            submenu: [
              {
                id: 211,
                label: "Pending Application from Schools",
                to: `/DistrictVerifyListSchool/${btoa(8)}`,
              },
            ],
          },
          {
            id: 22,
            label: "Distribution Records",
            submenu: [
              {
                id: 221,
                label: "Download Distribution Records",
                to: `/DownloadDistributionDistrict/${btoa(8)}`,
              },
            ],
          },
          {
            id: 23,
            label: "Mis Report",
            submenu: [
              {
                id: 231,
                label:
                  "Block Wise Student Profile Entry Status (Class IX) [Phase VII ADC. Yr. 2021]",
                to: `/ProfileEntryStatusReportBlock/${btoa(8)}/${id}`,
              },
              {
                id: 232,
                label: "Block Wise School Tagging Details Report (Phase VII)",
                to: `/TaggingDetailsReportBlock/${id}/${btoa(8)}`,
              },
              {
                id: 233,
                label: "Blockwise Distribution Details Report (Phase VII)",
                to: `/DistributionReportBlock/${id}/${btoa(8)}`,
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
            label: "Verification of Applications",
            submenu: [
              {
                id: 311,
                label: "Pending Application from Schools",
                to: `/DistrictVerifyListSchool/${btoa(9)}`,
              },
            ],
          },
          {
            id: 32,
            label: "Distribution Records",
            submenu: [
              {
                id: 321,
                label: "Download Distribution Records",
                to: `/DownloadDistributionDistrict/${btoa(9)}`,
              },
            ],
          },
          {
            id: 33,
            label: "Mis Report",
            submenu: [
              {
                id: 331,
                label:
                  "Block Wise Student Profile Entry Status (Class IX) [Phase VIII ADC. Yr. 2022]",
                to: `/ProfileEntryStatusReportBlock/${btoa(9)}/${id}`,
              },
              {
                id: 332,
                label: "Block Wise School Tagging Details Report (Phase VIII)",
                to: `/TaggingDetailsReportBlock/${id}/${btoa(9)}`,
              },
              {
                id: 333,
                label: "Blockwise Distribution Details Report (Phase VIII)",
                to: `/DistributionReportBlock/${id}/${btoa(9)}`,
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
            label: "Verification of Applications",
            submenu: [
              {
                id: 411,
                label: "Pending Application from Schools",
                to: `/DistrictVerifyListSchool/${btoa(10)}`,
              },
            ],
          },
          {
            id: 42,
            label: "Distribution Records",
            submenu: [
              {
                id: 421,
                label: "Download Distribution Records",
                to: `/DownloadDistributionDistrict/${btoa(10)}`,
              },
            ],
          },
          {
            id: 43,
            label: "Mis Report",
            submenu: [
              {
                id: 431,
                label:
                  "Block Wise Student Profile Entry Status (Class IX) [Phase IX ADC. Yr. 2023]",
                to: `/ProfileEntryStatusReportBlock/${btoa(10)}/${id}`,
              },
              {
                id: 432,
                label: "Block Wise School Tagging Details Report (Phase IX)",
                to: `/TaggingDetailsReportBlock/${id}/${btoa(10)}`,
              },
              {
                id: 433,
                label: "Blockwise Distribution Details Report (Phase IX)",
                to: `/DistributionReportBlock/${id}/${btoa(10)}`,
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
            label: "Verification of Applications",
            submenu: [
              {
                id: 511,
                label: "Pending Application from Schools",
                to: `/DistrictVerifyListSchool/${btoa(11)}`,
              },
            ],
          },
          {
            id: 52,
            label: "Distribution Records",
            submenu: [
              {
                id: 521,
                label: "Download Distribution Records",
                to: `/DownloadDistributionDistrict/${btoa(11)}`,
              },
            ],
          },
          {
            id: 53,
            label: "Mis Report",
            submenu: [
              {
                id: 531,
                label:
                  "Block Wise Student Profile Entry Status (Class IX) [Phase X ADC. Yr. 2024]",
                to: `/ProfileEntryStatusReportBlock/${btoa(11)}/${id}`,
              },
              {
                id: 532,
                label: "Block Wise School Tagging Details Report (Phase X)",
                to: `/TaggingDetailsReportBlock/${id}/${btoa(11)}`,
              },
              {
                id: 533,
                label: "Blockwise Distribution Details Report (Phase X)",
                to: `/DistributionReportBlock/${id}/${btoa(11)}`,
              },
            ],
          },
        ],
      },
    ],
  };
};
