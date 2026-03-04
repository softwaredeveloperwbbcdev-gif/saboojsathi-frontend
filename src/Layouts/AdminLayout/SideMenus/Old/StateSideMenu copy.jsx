export const getStateSideMenu = () => {
  return {
    user: "State Project Management Unit (SPMU)",
    data: [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "Admin.dashboard",
      },
      {
        id: 1,
        label: "CS Dashboard",
        submenu: [
          {
            id: 11,
            label: "Distribution Wise Form",
            to: "Admin.dashboard",
          },
          {
            id: 12,
            label: "Social Wise Form",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 2,
        label: "Reports",
        submenu: [
          {
            id: 20,
            label: "Phase XI",
            submenu: [
              {
                id: 201,
                label: "2025 District Wise Eligible Students",
                to: `/EligibleStudentReportDistrict/${btoa("12")}`,
              },
              {
                id: 202,
                label: "2025 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("12")}`,
              },
              {
                id: 203,
                label: "Profile Entry Status 2025",
                to: `/ProfileEntryStatusReportDist/${btoa("12")}`,
              },
              {
                id: 204,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("12")}`,
                // params: { year: 2024, phase: 10 },
              },
              {
                id: 205,
                label: "District Wise Tagging 2025",
                to: `/TaggingDetailsReport/${btoa("12")}`,
                // params: { year: 2024, phase: 10 },
              },
              {
                id: 206,
                label: "Challan MIS Phase XI",
                to: `/DistrictChallanReport/${btoa("12")}`,
              },
              {
                id: 207,
                label: "Challan Generation Report",
                to: `/ChallanGenerationReport/${btoa("12")}`,
              },
              {
                id: 208,
                label: "Challan View phase XI",
                to: `/ChallanParticularsView/${btoa("12")}`,
              },
              {
                id: 209,
                label: "Challan/Allocation Status View",
                to: `/ChallanAllocationStatusReport/${btoa("12")}`,
              },
              {
                id: 201.0,
                label: "Invoice View",
                to: `/InvoiceViewReport/${btoa("12")}`,
              },
              {
                id: 201.0,
                label: "Challan Payment Report",
                to: `/ChallanPaymentReport/${btoa("12")}`,
              },
            ],
          },
          {
            id: 21,
            label: "Phase X",
            submenu: [
              {
                id: 211,
                label: "2024 District Wise Eligible Students",
                to: `/EligibleStudentReportDistrict/${btoa("11")}`,
              },
              {
                id: 212,
                label: "2024 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("11")}`,
              },
              {
                id: 213,
                label: "Profile Entry Status 2024",
                to: `/ProfileEntryStatusReportDist/${btoa("11")}`,
              },
              {
                id: 214,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("11")}`,
              },
              {
                id: 215,
                label: "District Wise Tagging 2024",
                to: `/TaggingDetailsReport/${btoa("11")}`,
              },
              {
                id: 216,
                label: "Challan MIS Phase X",
                to: `/DistrictChallanReport/${btoa("11")}`,
              },
              {
                id: 217,
                label: "Challan Generation Report",
                to: `/ChallanGenerationReport/${btoa("11")}`,
              },
              {
                id: 218,
                label: "Challan View phase X",
                to: `/ChallanParticularsView/${btoa("11")}`,
              },
              {
                id: 219,
                label: "Challan/Allocation Status View",
                to: `/ChallanAllocationStatusReport/${btoa("11")}`,
              },
              {
                id: 211.0,
                label: "Invoice View",
                to: `/InvoiceViewReport/${btoa("11")}`,
              },
              {
                id: 211,
                label: "Challan Payment Report",
                to: `/ChallanPaymentReport/${btoa("11")}`,
              },
            ],
          },
          {
            id: 22,
            label: "Phase IX",
            submenu: [
              {
                id: 221,
                label: "2023 District Wise Eligible Students",
                to: `/EligibleStudentReportDistrict/${btoa("10")}`,
              },
              {
                id: 222,
                label: "2023 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("10")}`,
              },
              {
                id: 223,
                label: "Profile Entry Status 2023",
                to: `/ProfileEntryStatusReportDist/${btoa("10")}`,
              },
              {
                id: 224,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("10")}`,
              },
              {
                id: 225,
                label: "District Wise Tagging 2023",
                to: `/TaggingDetailsReport/${btoa("10")}`,
              },
              {
                id: 226,
                label: "Challan MIS Phase IX",
                to: `/DistrictChallanReport/${btoa("10")}`,
              },
              {
                id: 227,
                label: "Challan Generation Report",
                to: `/ChallanGenerationReport/${btoa("10")}`,
              },
              {
                id: 228,
                label: "Challan View phase IX",
                to: `/ChallanParticularsView/${btoa("10")}`,
              },
              {
                id: 229,
                label: "Challan/Allocation Status View",
                to: `/ChallanAllocationStatusReport/${btoa("10")}`,
              },
              {
                id: 221.0,
                label: "Invoice view",
                to: `/InvoiceViewReport/${btoa("10")}`,
              },
              {
                id: 221.1,
                label: "Challan Payment Report",
                to: `/ChallanPaymentReport/${btoa("10")}`,
              },

              // {
              //   id: 221.2,
              //   label: "Invoice Wise Report",
              //   to: `/InvoiceViewReport/${btoa("10")}`,
              // },
            ],
          },
          {
            id: 23,
            label: "Phase VIII",
            submenu: [
              {
                id: 231,
                label: "2022 District Wise Eligible Students",
                to: `/EligibleStudentReportDistrict/${btoa("9")}`,
              },
              {
                id: 232,
                label: "2022 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("9")}`,
              },
              {
                id: 233,
                label: "Profile Entry Status 2022",
                to: `/ProfileEntryStatusReportDist/${btoa("9")}`,
              },
              {
                id: 234,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("9")}`,
                // params: { year: 2024, phase: 10 },
              },
              {
                id: 235,
                label: "District Wise Tagging 2022",
                to: `/TaggingDetailsReport/${btoa("9")}`,
                params: { year: 2024, phase: 10 },
              },
              {
                id: 236,
                label: "Challan MIS Phase VIII",
                to: `/DistrictChallanReport/${btoa("9")}`,
              },
              {
                id: 237,
                label: "Challan Generation Report",
                to: `/ChallanGenerationReport/${btoa("9")}`,
              },
              {
                id: 238,
                label: "Challan View phase VIII",
                to: `/ChallanParticularsView/${btoa("9")}`,
              },
              {
                id: 239,
                label: "Challan/Allocation Status View",
                to: `/ChallanAllocationStatusReport/${btoa("9")}`,
              },
              {
                id: 231.0,
                label: "Challan Payment Report",
                to: `/ChallanPaymentReport/${btoa("9")}`,
              },
            ],
          },
          {
            id: 24,
            label: "Phase VII",
            submenu: [
              {
                id: 241,
                label: "2021 Districtwise Eligible Students",
                to: `/EligibleStudentReportDistrict/${btoa("8")}`,
              },
              {
                id: 242,
                label: "2021 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("8")}`,
              },
              {
                id: 243,
                label: "Profile Entry Status 2021",
                to: `/ProfileEntryStatusReportDist/${btoa("8")}`,
              },
              {
                id: 244,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("8")}`,
                // params: { year: 2024, phase: 10 },
              },
              {
                id: 245,
                label: "P-7 Challan MIS",
                to: `/ChallanMis/${btoa("8")}`,
                // params: { year: 2024, phase: 10 },
              },
            ],
          },
          {
            id: 25,
            label: "Phase VI",
            submenu: [
              {
                id: 251,
                label: "Profile Entry Status 2020",
                to: "Admin.dashboard",
              },
              {
                id: 252,
                label: "2020 Eligible Students",
                to: "Admin.dashboard",
              },
              {
                id: 253,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("7")}`,
              },
              {
                id: 254,
                label: "P-6 Challan MIS",
                to: `/ChallanMis/${btoa("7")}`,
              },
            ],
          },
          {
            id: 26,
            label: "Phase V",
            submenu: [
              {
                id: 261,
                label: "2019 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("6")}`,
              },
              {
                id: 262,
                label: "School Tagging Report",
                to: `/TaggingDetailsReportOld/${btoa("6")}`,
              },
              {
                id: 263,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("6")}`,
              },
              {
                id: 264,
                label: "P-5 Challan MIS",
                to: `/ChallanMis/${btoa("6")}`,
              },
            ],
          },
          {
            id: 27,
            label: "Phase IV",
            submenu: [
              {
                id: 271,
                label: "2018 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("5")}`,
              },
              {
                id: 272,
                label: "School Tagging Report",
                to: `/TaggingDetailsReportOld/${btoa("5")}`,
              },
              {
                id: 273,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrict/${btoa("5")}`,
              },
              {
                id: 274,
                label: "P-4 Challan MIS",
                to: `/ChallanMis/${btoa("5")}`,
              },
            ],
          },
          {
            id: 28,
            label: "Phase III",
            submenu: [
              {
                id: 281,
                label: "2016 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("3")}`,
              },
              {
                id: 282,
                label: "2017 District Wise Report",
                to: `/ProfileEntryDistrictReport/${btoa("4")}`,
              },
              {
                id: 283,
                label: "School Tagging Report",
                to: `/TaggingDetailsReportOld/${btoa("3")}`,
              },
              {
                id: 284,
                label: "Distribution Details Report",
                to: `/DistributionReportDistrictOldPhase/${btoa("3")}`,
              },
              {
                id: 285,
                label: "Download Requirement",
                to: "Admin.dashboard",
              },
              {
                id: 286,
                label: "P-3 Challan MIS",
                to: `/ChallanMis/${btoa("3")}`,
              },
            ],
          },
          {
            id: 29,
            label: "Phase I & Phase II",
            submenu: [
              {
                id: 291,
                label: "P-1 Distribution Details(All)",
                to: "Admin.dashboard",
              },
              {
                id: 292,
                label: "P-1 Distribution Details(Class IX)",
                to: "Admin.dashboard",
              },
              {
                id: 293,
                label: "P-1 Distribution Details(Class X)",
                to: "Admin.dashboard",
              },
              {
                id: 294,
                label: "P-1 Distribution Details(Class XI)",
                to: "Admin.dashboard",
              },
              {
                id: 295,
                label: "P-1 Distribution Details(Class XII)",
                to: "Admin.dashboard",
              },
              {
                id: 296,
                label: "P-1 Tagging Details",
                to: "Admin.dashboard",
              },
              {
                id: 297,
                label: "P-1 Challan MIS",
                to: `/ChallanMis/${btoa("1")}`,
              },
              {
                id: 298,
                label: "P-2 District Wise Entry",
                to: "Admin.dashboard",
              },
              {
                id: 299,
                label: "P-2 Distribution Details",
                to: "Admin.dashboard",
              },
              {
                id: 291.0,
                label: "P-2 Tagging Details",
                to: "Admin.dashboard",
              },
              {
                id: 291.1,
                label: "P-2 Challan MIS",
                to: `/ChallanMis/${btoa("2")}`,
              },
            ],
          },
          {
            id: 21.0,
            label: "Backlog Challan MIS",
            to: "Admin.dashboard",
          },
          // {
          //   id: 21.1,
          //   label: "Category wise Student Report",
          //   to: "/CategorywiseReport",
          // },
          // {
          //   id: 21.2,
          //   label: "Download Requirement",
          //   to: "Admin.dashboard",
          // },
          {
            id: 21.3,
            label: "Synoptic Report",
            to: "/SynopticReport",
          },
          {
            id: 21.4,
            label: "Gender Wise Distribution Report",
            to: "/GenderwiseReport",
          },
          {
            id: 21.5,
            label: "Social Group Wise Report",
            to: "/SocialGroupwiseReport ",
          },
        ],
      },
      {
        id: 3,
        label: "Access control",
        submenu: [
          {
            id: 31,
            label: "Notice List",
            to: "Admin.dashboard",
          },
          {
            id: 32,
            label: "Reset Password",
            to: "/ResetPasswordState",
          },
          {
            id: 33,
            label: "Reset Finalise",
            to: "/ResetFinalize",
          },
        ],
      },
      {
        id: 4,
        label: "Access Manage Grievances",
        submenu: [
          {
            id: 41,
            label: "Grievance List",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 5,
        label: "Consignment Management System",
        submenu: [
          {
            id: 51,
            label: "Dashboard",
            to: "Admin.dashboard",
          },
        ],
      },
    ],
  };
};
