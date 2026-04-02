import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {
  HiUsers,
  HiPresentationChartLine,
  HiXCircle,
  HiCheckBadge,
  HiChartBar,
  HiOutlineUserGroup,
  HiShieldCheck,
  HiUserPlus, // For Add Student
  HiTableCells, // For View List
  HiDocumentArrowDown, // For Excel/Download
  HiClipboardDocumentList, // For Muster Roll
  HiArrowPathRoundedSquare, // For Update Record
} from "react-icons/hi2";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router

import { useStudentDownload } from "../School/SchoolAction";

import { usePhaseStore } from "../../../Store/phaseStore";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const DashboardSchool = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { downloadPdf, downloadExcel, isDownloading } = useStudentDownload();

  useEffect(() => {
    if (graphData) {
      setShowData(graphData);
    }
  }, [graphData]);

  useEffect(() => {
    setLoading(isDownloading);
  }, [isDownloading]);

  const genderData = {
    boys: showData.gender?.[0]?.boys || 0,
    girls: showData.gender?.[0]?.girls || 0,
  };

  const casteData = {
    general: showData.category?.[0]?.general || 0,
    sc: showData.category?.[0]?.sc || 0,
    st: showData.category?.[0]?.st || 0,
    obc: showData.category?.[0]?.obc || 0,
  };

  const barData = {
    labels: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.name)
      : [],
    data: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.count_application)
      : [],
  };

  // --- Sub-Components ---
  const StatCard = ({ title, value, icon: Icon, colorClass, gradient }) => (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md group">
      <div className="flex items-center justify-between z-10 relative">
        <div>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white group-hover:scale-105 transition-transform origin-left">
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl shadow-lg ${colorClass} text-white`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] text-gray-900 dark:text-white transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
        <Icon size={90} />
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${gradient}`} />
    </div>
  );

  // Helper for Functional Link Cards
  // const ActionCard = ({ title, subText, icon: Icon, onClick, colorClass }) => (
  //   <button
  //     onClick={onClick}
  //     className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg active:scale-95 text-left w-full group"
  //   >
  //     <div
  //       className={`p-3 rounded-xl ${colorClass} text-white shadow-md group-hover:scale-110 transition-transform`}
  //     >
  //       <Icon className="text-2xl" />
  //     </div>
  //     <div>
  //       <h4 className="text-sm font-bold text-gray-800 dark:text-white">
  //         {title}
  //       </h4>
  //       <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
  //         {subText}
  //       </p>
  //     </div>
  //   </button>
  // );

  const ActionCard = ({ title, subText, icon: Icon, onClick, colorClass }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg group w-full"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white shadow-sm group-hover:rotate-3 transition-transform`}
        >
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h4>
          <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter italic">
            {subText}
          </p>
        </div>
      </div>
      <ChevronRight
        size={14}
        className="text-slate-300 group-hover:translate-x-1 transition-transform"
      />
    </button>
  );

  return (
    <div className="p-4 bg-[#e9ebed] dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col  md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Student Profile <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center justify-center md:justify-start gap-2">
            <HiShieldCheck className="text-blue-500" /> Dashboard • Phase{" "}
            {phaseDetails.phaseName}
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Year: {phaseDetails.year}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Profile Entered"
          value={showData?.total_application || 0}
          icon={HiUsers}
          colorClass="bg-blue-500"
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <StatCard
          title="Profile Verified"
          value={showData?.verified_application || 0}
          icon={HiShieldCheck}
          colorClass="bg-indigo-500"
          gradient="bg-gradient-to-r from-indigo-400 to-indigo-600"
        />
        <StatCard
          title="Profile Finalized"
          value={showData?.finalized_application || 0}
          icon={HiPresentationChartLine}
          colorClass="bg-purple-500"
          gradient="bg-gradient-to-r from-purple-400 to-purple-600"
        />
        <StatCard
          title="Approved Profile"
          value={showData?.approved_application || 0}
          icon={HiCheckBadge}
          colorClass="bg-emerald-500"
          gradient="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <StatCard
          title="Rejected Profile"
          value={showData?.rejected_application || 0}
          icon={HiXCircle}
          colorClass="bg-red-500"
          gradient="bg-gradient-to-r from-red-400 to-red-600"
        />
      </div>

      {/* --- QUICK ACTIONS SECTION --- */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 w-1.5 bg-indigo-600 rounded-full"></div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Reports & Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols- gap-4">
          <ActionCard
            title="Add Student"
            subText="Registration"
            icon={HiUserPlus}
            colorClass="bg-blue-500"
            onClick={() => navigate(`/StudentAdd/${phaseId}`)}
          />
          <ActionCard
            title="Student List"
            subText="Management"
            icon={HiTableCells}
            colorClass="bg-indigo-500"
            onClick={() => navigate(`/StudentProfile/${phaseId}`)}
          />
          <ActionCard
            title="Excel Export"
            subText="Student Data"
            icon={HiDocumentArrowDown}
            colorClass="bg-emerald-500"
            onClick={() => downloadExcel(phaseId)}
          />
          <ActionCard
            title="Muster Roll"
            subText="PDF Report"
            icon={HiClipboardDocumentList}
            colorClass="bg-purple-500"
            onClick={() => downloadPdf(phaseId)}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
        {/* Gender Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6 text-blue-500">
            <HiOutlineUserGroup className="text-xl" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Gender Distribution
            </h2>
          </div>
          <div className="h-64">
            <Doughnut
              data={{
                labels: [`Boys`, `Girls`],
                datasets: [
                  {
                    data: [genderData.boys, genderData.girls],
                    backgroundColor: ["#3b82f6", "#10b981"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>

        {/* Caste Distribution */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6 text-purple-500">
            <HiChartBar className="text-xl" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Caste Wise Analysis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-64">
            <Doughnut
              data={{
                labels: ["General", "SC", "ST", "OBC"],
                datasets: [
                  {
                    data: [
                      casteData.general,
                      casteData.sc,
                      casteData.st,
                      casteData.obc,
                    ],
                    backgroundColor: [
                      "#3b82f6",
                      "#10b981",
                      "#f59e0b",
                      "#06b6d4",
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: { legend: { display: false } },
              }}
            />
            <div className="space-y-2">
              {[
                {
                  label: "General",
                  val: casteData.general,
                  color: "bg-blue-500",
                },
                { label: "SC", val: casteData.sc, color: "bg-emerald-500" },
                { label: "ST", val: casteData.st, color: "bg-orange-500" },
                { label: "OBC", val: casteData.obc, color: "bg-cyan-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 border-b border-gray-50 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${item.color}`}
                    ></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {item.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* District Summary Chart */}
      {barData.labels.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
            District Summary
          </h2>
          <div className="h-72">
            <Bar
              data={{
                labels: barData.labels,
                datasets: [
                  {
                    label: "Applications",
                    data: barData.data,
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    borderRadius: 4,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSchool;
