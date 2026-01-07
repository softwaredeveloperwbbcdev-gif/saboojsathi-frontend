export const getDistrictSideMenu = () => {
  return {
    user: "District Project Management Unit (DPMU)",
    data: [
      {
        id: 2,
        label: "Phase X",
        submenu: [
          {
            id: 21,
            label: "Verification of Applications",
            submenu: [
              {
                id: 211,
                label: "Pending Application from Schools",
                to: "/DownloadDistributionDistrictPhaseX",
              },
            ],
          },
          {
            id: 22,
            label: "Distribution Records (Phase )",
            submenu: [
              {
                id: 221,
                label: "Download Distribution Records",
                to: "/DownloadDistributionDistrictPhaseX",
              },
            ],
          },
          {
            id: 23,
            label: "Mis Report",
            to: "Admin.dashboard",
          },
        ],
      },
    ],
  };
};
