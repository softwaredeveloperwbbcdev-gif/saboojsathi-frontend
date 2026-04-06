// src/layouts/Admin/sideMenus/stateMenu.js

export const getStateSideMenu = () => {
  // Configuration for phases. Add new phases at the top.
  const phases = [
    { id: btoa(14), label: "Phase XIII AY 2027" },
    { id: btoa(13), label: "Phase XII AY 2026" },
    { id: btoa(12), label: "Phase XI AY 2025" },
    { id: btoa(11), label: "Phase X AY 2024" },
    { id: btoa(10), label: "Phase IX AY 2023" },
    { id: btoa(9), label: "Phase VIII AY 2022" },
    { id: btoa(8), label: "Phase VII AY 2021" },
    { id: btoa(7), label: "Phase VI AY 2020" },
  ];

  // Logic for older phases that don't follow the modern dynamic pattern
  const legacyPhases = [
    {
      id: 27,
      label: "Phase V",
      items: [
        {
          label: "2019 District Wise Report",
          to: `/ProfileEntryDistrictReport/${btoa("6")}`,
        },
        {
          label: "School Tagging Report",
          to: `/TaggingDetailsReportOld/${btoa("6")}`,
        },
        {
          label: "Distribution Details Report",
          to: `/DistributionReportDistrict/${btoa("6")}`,
        },
        { label: "P-5 Challan MIS", to: `/ChallanMis/${btoa("6")}` },
      ],
    },
  ];

  // Helper to generate standard report submenus for a phase
  const generatePhaseReports = (phase, index) => {
    return {
      id: parseInt(`2${index}`),
      label: phase.label,
      phaseId: phase.id,
      to: "/Dashboard", // encrypted phase_id
    };
  };

  return {
    user: "State Project Management Unit (SPMU)",
    data: [
      {
        id: 1,
        label: "CS Dashboard",
        submenu: [
          { id: 11, label: "Distribution Wise Form", to: "Admin.dashboard" },
          { id: 12, label: "Social Wise Form", to: "Admin.dashboard" },
        ],
      },
      {
        id: 2,
        label: "Reports",
        submenu: [
          // Dynamic Phases (Phase VII to XI)
          ...phases.map((phase, index) => generatePhaseReports(phase, index)),

          // Legacy Phases (Phase VI and below)
          ...legacyPhases.map((phase) => ({
            id: phase.id,
            label: phase.label,
            submenu: phase.items.map((item, i) => ({
              id: parseInt(`${phase.id}${i}`),
              label: item.label,
              to: item.to,
            })),
          })),

          // General MIS Reports
          {
            id: 211,
            label: "Category wise Student Report",
            to: "/CategorywiseReport",
          },
          { id: 213, label: "Synoptic Report", to: "/SynopticReport" },
          {
            id: 214,
            label: "Gender Wise Distribution Report",
            to: "/GenderwiseReport",
          },
          {
            id: 215,
            label: "Social Group Wise Report",
            to: "/SocialGroupwiseReport",
          },
        ],
      },
      {
        id: 3,
        label: "Access Control",
        submenu: [
          { id: 31, label: "Notice List", to: "Admin.dashboard" },
          { id: 32, label: "Reset Password", to: "/ResetPasswordState" },
          { id: 33, label: "Reset Finalise", to: "/ResetFinalize" },
        ],
      },
      {
        id: 4,
        label: "Manage Grievances",
        submenu: [{ id: 41, label: "Grievance List", to: "Admin.dashboard" }],
      },
      {
        id: 5,
        label: "Consignment Management",
        submenu: [{ id: 51, label: "Dashboard", to: "Admin.dashboard" }],
      },
    ],
  };
};
