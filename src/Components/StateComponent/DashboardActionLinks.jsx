// src/Components/StateComponent/dashboardLinks.jsx
import { usePhaseStore } from "../../Store/phaseStore";
import {
  UserCheck,
  PieChart,
  Activity,
  Truck,
  Tags,
  ClipboardCheck,
  Eye,
  School,
  MapPin,
  UserPlus,
  FileText,
  ListChecks,
  Receipt,
  CreditCard,
} from "lucide-react";

const DashboardActionLinks = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const stake_cd = user.stake_cd;
  // Helper to check the current phase against rules
  const isVisible = (rule) => {
    if (!rule) return true; // Default to visible if no rule provided

    const currentPhase = phaseId; // This is the btoa encoded string

    // 1. Single Phase or Array of Phases
    if (rule.only) {
      return Array.isArray(rule.only)
        ? rule.only.includes(currentPhase)
        : rule.only === currentPhase;
    }

    // 2. Blacklist (Hide in specific phases like Legacy)
    if (rule.except) {
      return Array.isArray(rule.except)
        ? !rule.except.includes(currentPhase)
        : rule.except !== currentPhase;
    }

    return true; // "always"
  };
  const configs = {
    // STATE (0207 / 0208)
    "0207": [
      {
        title: "Eligible Student Report",
        subText: "District Summary",
        icon: UserCheck,
        colorClass: "from-blue-500 to-blue-700",
        path: "/EligibleStudentReportDistrict",
        visibility: {
          only: [
            btoa("7"),
            btoa("8"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "District Wise Report",
        subText: "Overall Profile Summary",
        icon: PieChart,
        colorClass: "from-indigo-500 to-indigo-700",
        path: "/ProfileEntryDistrictReport",
        visibility: {
          only: [
            btoa("6"),
            btoa("8"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "Profile Entry Status",
        subText: "Data Entry Tracking",
        icon: Activity,
        colorClass: "from-purple-500 to-purple-700",
        path: "/ProfileEntryStatusReportDist",
        visibility: {
          only: [
            btoa("7"),
            btoa("8"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "Distribution Detail Report",
        subText: "Cycle Delivery Progress",
        icon: Truck,
        colorClass: "from-emerald-500 to-emerald-700",
        path: "/DistributionReportDistrict",
        visibility: {
          only: [
            btoa("6"),
            btoa("8"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "District Tagging Report",
        subText: "Mapping & Verification",
        icon: Tags,
        colorClass: "from-amber-500 to-amber-700",
        path: "/TaggingDetailsReport",
        visibility: {
          only: [
            btoa("6"),
            btoa("7"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "Challan MIS",
        subText: "Phase Specific Management",
        icon: ClipboardCheck,
        colorClass: "from-rose-500 to-rose-700",
        path: "/DistrictChallanReport",
        visibility: {
          only: [
            btoa("6"),
            btoa("7"),
            btoa("8"),
            btoa("9"),
            btoa("10"),
            btoa("11"),
            btoa("12"),
            btoa("13"),
          ],
        },
      },
      {
        title: "Challan Generation",
        subText: "Batch Process Tracking",
        icon: Eye,
        colorClass: "from-slate-600 to-slate-800",
        path: "/ChallanGenerationReport",
        visibility: {
          only: [btoa("9"), btoa("10"), btoa("11"), btoa("12"), btoa("13")],
        },
      },
      {
        title: "Challan View",
        subText: "Detailed Particulars",
        icon: FileText,
        colorClass: "from-cyan-500 to-cyan-700",
        path: `/ChallanParticularsView/${phaseId}`,
        visibility: {
          only: [btoa("9"), btoa("10"), btoa("11"), btoa("12"), btoa("13")],
        },
      },
      {
        title: "Allocation Status",
        subText: "Challan/Bicycle Mapping",
        icon: ListChecks,
        colorClass: "from-teal-500 to-teal-700",
        path: "/ChallanAllocationStatusReport",
        visibility: {
          only: [btoa("9"), btoa("10"), btoa("11"), btoa("12"), btoa("13")],
        },
      },
      {
        title: "Invoice View",
        subText: "Billing & Records",
        icon: Receipt,
        colorClass: "from-pink-500 to-pink-700",
        path: "/InvoiceViewReport",
        visibility: {
          only: [btoa("9"), btoa("10"), btoa("11"), btoa("12"), btoa("13")],
        },
      },
      {
        title: "Challan Payment",
        subText: "Settlement & Finance",
        icon: CreditCard,
        colorClass: "from-orange-500 to-orange-700",
        path: `/ChallanPaymentReport/${phaseId}`,
        visibility: {
          only: [btoa("9"), btoa("10"), btoa("11"), btoa("12"), btoa("13")],
        },
      },
    ],

    // DISTRICT (0304)
    "0304": [
      {
        title: "Block wise Status",
        subText: "Entry Tracking",
        icon: MapPin,
        colorClass: "from-purple-500 to-purple-700",
        path: "/ProfileEntryStatusReportDist",
        visibility: true,
      },
      {
        title: "Distribution Summary",
        icon: Truck,
        colorClass: "from-emerald-500 to-emerald-700",
        path: "/DistributionReportDistrict",
        visibility: true,
      },
    ],

    // BLOCK (0501)
    "0501": [
      {
        title: "School Wise Entry",
        icon: School,
        colorClass: "from-cyan-500 to-cyan-700",
        path: "/SchoolWiseEntryReport",
        visibility: true,
      },
      {
        title: "Finalized List",
        icon: ClipboardCheck,
        colorClass: "from-indigo-500 to-indigo-700",
        path: "/FinalizedStudentList",
        visibility: true,
      },
    ],

    // CIRCLE / SI (0601)
    "0601": [
      {
        title: "SI Tagging Report",
        icon: Tags,
        colorClass: "from-orange-500 to-orange-700",
        path: "/SiTaggingReport",
        visibility: true,
      },
    ],

    // SCHOOL (0701)
    "0701": [
      {
        title: "Student Entry",
        icon: UserPlus,
        colorClass: "from-pink-500 to-pink-700",
        path: "/StudentEntryForm",
        visibility: true,
      },
      {
        title: "Profile Status",
        icon: Activity,
        colorClass: "from-blue-400 to-blue-600",
        path: "/SchoolProfileStatus",
        visibility: true,
      },
    ],
  };

  // Add logic for 0208
  const selectedConfig =
    stake_cd === "0208" ? configs["0207"] : configs[stake_cd];

  // Filter based on the visibility logic function
  return (selectedConfig || []).filter((link) => isVisible(link.visibility));
};

export default DashboardActionLinks;
