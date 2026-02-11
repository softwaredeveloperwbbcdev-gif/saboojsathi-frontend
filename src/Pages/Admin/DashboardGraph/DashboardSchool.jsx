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

  const profileStats = {
    application: showData.general?.[0]?.application || 0,
    verified: showData.general?.[0]?.verified || 0,
    finalization: showData.general?.[0]?.finalization || 0,
    rejected: showData.general?.[0]?.rejected || 0,
    approved: showData.general?.[0]?.approved || 0,
  };

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

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="text-xl text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 opacity-5">
          <Icon size={80} />
        </div>
      </div>
    </div>
  );

  // Helper for Functional Link Cards
  const ActionCard = ({ title, icon: Icon, onClick, colorClass, subText }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg active:scale-95"
    >
      <div
        className={`mb-4 p-4 rounded-full ${colorClass} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="text-2xl text-white" />
      </div>
      <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
        {subText}
      </p>
    </button>
  );

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Phase {phaseDetails.phaseName} - Academic Year {phaseDetails.year}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Profile Entered"
          value={profileStats.application}
          icon={HiUsers}
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Profile Verified"
          value={profileStats.verified}
          icon={HiShieldCheck}
          colorClass="bg-indigo-500"
        />
        <StatCard
          title="Profile Finalized"
          value={profileStats.finalization}
          icon={HiPresentationChartLine}
          colorClass="bg-emerald-500"
        />
        <StatCard
          title="Approved Profile"
          value={profileStats.approved}
          icon={HiCheckBadge}
          colorClass="bg-cyan-500"
        />
        <StatCard
          title="Rejected Profile"
          value={profileStats.rejected}
          icon={HiXCircle}
          colorClass="bg-orange-500"
        />
      </div>

      {/* --- QUICK ACTIONS SECTION --- */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Quick Operations
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
