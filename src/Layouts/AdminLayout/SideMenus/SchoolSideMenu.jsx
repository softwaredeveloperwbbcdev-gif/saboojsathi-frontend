// src/layouts/Admin/sideMenus/schoolMenu.js
export const getSchoolSideMenu = () => {
  const phases = [
    { id: btoa(9), label: "Phase VIII AY 2022" },
    { id: btoa(10), label: "Phase IX AY 2023" },
    { id: btoa(11), label: "Phase X AY 2024" },
    { id: btoa(12), label: "Phase XI AY 2025" },
    { id: btoa(13), label: "Phase XII AY 2026" },
    { id: btoa(14), label: "Phase XIII AY 2027" },
  ];

  return {
    user: "Head of Institute (HOI)",
    data: [
      {
        id: 1,
        label: "Phase",
        submenu: phases.map((phase, index) => ({
          id: index + 1,
          label: phase.label,
          phaseId: phase.id,
          to: "/Dashboard", // encrypted phase_id
        })),
      },
    ],
  };
};
