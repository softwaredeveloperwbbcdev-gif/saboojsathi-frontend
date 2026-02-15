// src/layouts/Admin/sideMenus/blockMenu.js

export const getBlockSideMenu = () => {
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = btoa(user.internal_code);

  // Configuration for phases. Add new phases here.
  const phases = [
    { id: btoa(9), label: "Phase VIII AY 2022" },
    { id: btoa(10), label: "Phase IX AY 2023" },
    { id: btoa(11), label: "Phase X AY 2024" },
    { id: btoa(12), label: "Phase XI AY 2025" },
    { id: btoa(13), label: "Phase XII AY 2026" },
    { id: btoa(14), label: "Phase XIII AY 2027" },
  ];

  // Helper to generate phase-specific submenus
  // const generatePhaseSubmenu = (phase, index) => {
  //   const encodedPhaseId = btoa(phase.phaseId);

  //   const menuItems = [
  //     // 1. Profile Entry Status
  //     {
  //       id: parseInt(`${index + 1}1`),
  //       label: `${phase.label} Class IX Profile Entry Status`,
  //       submenu: [
  //         {
  //           id: parseInt(`${index + 1}11`),
  //           label: `Schoolwise Profile Entry Status(Class IX) ${phase.label} ${phase.year}`,
  //           to: `/ProfileEntryStatusReportSchool/${encodedPhaseId}/${id}`,
  //         },
  //       ],
  //     },
  //     // 2. Manage Distribution
  //     {
  //       id: parseInt(`${index + 1}2`),
  //       label: `Manage Distribution ${phase.label}`,
  //       submenu: [
  //         {
  //           id: parseInt(`${index + 1}21`),
  //           label: `Tag School with Delivery Center ${phase.label}`,
  //           to: `/DistributionLocationProcess/${encodedPhaseId}`,
  //         },
  //         {
  //           id: parseInt(`${index + 1}22`),
  //           label: `View Tagged School with Delivery Center ${phase.label}`,
  //           to: `/DistributionManageTaggedSchool/${encodedPhaseId}`,
  //         },
  //       ],
  //     },
  //   ];

  //   // 3. Challan Management (Only for Phase VIII onwards)
  //   if (phase.hasChallan) {
  //     menuItems.push({
  //       id: parseInt(`${index + 1}3`),
  //       label: `Challan Management ${phase.label}`,
  //       submenu: [
  //         {
  //           id: parseInt(`${index + 1}31`),
  //           label: `Approved Challan ${phase.label}`,
  //           to: `/ApproveChallanView/${encodedPhaseId}`,
  //         },
  //         {
  //           id: parseInt(`${index + 1}32`),
  //           label: `Allocate Bicycle ${phase.label}`,
  //           to: `/AllocateChallanView/${encodedPhaseId}`,
  //         },
  //         {
  //           id: parseInt(`${index + 1}33`),
  //           label: `School Receipt Download ${phase.label}`,
  //           to: `/DownloadMemorandumView/${encodedPhaseId}`,
  //         },
  //         {
  //           id: parseInt(`${index + 1}34`),
  //           label: "Challan Generation report",
  //           to: `/ChallanGenerationReportSchool/${encodedPhaseId}/${id}`,
  //         },
  //         {
  //           id: parseInt(`${index + 1}35`),
  //           label: "Challan/Allocation Status View",
  //           to: "/Dashboard",
  //         },
  //       ],
  //     });
  //   }

  //   return menuItems;
  // };

  // Helper for Backlog Menus
  const backlogMenu = {
    id: 6,
    label: "Backlog Challan View",
    submenu: [
      { id: 61, label: "P7 Challan MIS", to: "Admin.dashboard" },
      { id: 62, label: "P6 Challan MIS", to: "Admin.dashboard" },
      { id: 63, label: "P5 Challan MIS", to: "Admin.dashboard" },
      { id: 64, label: "P4 Challan MIS", to: "Admin.dashboard" },
      { id: 65, label: "P3 Challan MIS", to: "Admin.dashboard" },
      { id: 66, label: "P2 Challan MIS", to: "Admin.dashboard" },
      { id: 67, label: "P1 Challan MIS", to: "Admin.dashboard" },
    ],
  };

  // Helper for MIS Reports (Dynamic generation based on phases array reversed or specific logic)
  const misReportMenu = {
    id: 7,
    label: "MIS Report",
    submenu: phases
      .slice()
      .reverse() // Often reports show newest first
      .flatMap((phase, idx) => [
        {
          id: parseInt(`7${idx}1`),
          label: `Distribution Update Report ${phase.label}`,
          to: "Admin.dashboard",
        },
        {
          id: parseInt(`7${idx}2`),
          label: `Schoolwise Tagging Details Report ${phase.label}`,
          to: "Admin.dashboard",
        },
      ]),
  };

  return {
    user: "Block Development Officer (BDO)",
    data: [
      {
        id: 1,
        label: "Student Profile",
        submenu: phases.map((phase, index) => ({
          id: index + 1,
          label: phase.label,
          phaseId: phase.id,
          to: "/Dashboard", // encrypted phase_id
        })),
      },
      {
        id: 2,
        label: "Manage Tagging",
        submenu: phases.map((phase, index) => ({
          id: index + 1,
          label: phase.label,
          phaseId: phase.id,
          to: "/DashboardTagging", // encrypted phase_id
        })),
      },
      {
        id: 3,
        label: "Challan Management",
        submenu: phases.map((phase, index) => ({
          id: index + 1,
          label: phase.label,
          phaseId: phase.id,
          to: "/DashboardChallan", // encrypted phase_id
        })),
      },
      // Static/Separate Menus
      // backlogMenu,
      // misReportMenu,
    ],
  };
};
