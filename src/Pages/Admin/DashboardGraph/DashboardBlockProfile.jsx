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
  HiUsers, // Profile Entered
  HiShieldCheck, // Profile Verified
  HiClipboardDocumentCheck, // Profile Finalized
  HiCheckBadge, // Approved
  HiXCircle, // Rejected
  HiUserGroup, // Eligible
  HiTruck, // Distributed
  HiDocumentChartBar, // Profile Status Report
  HiClipboardDocumentList, // Distribution Report
  HiChartBar,
  HiOutlineUserGroup as HiOutlineUserGroupIcon,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { usePhaseStore } from "../../../Store/phaseStore";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const DashboardBlockProfile = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  useEffect(() => {
    if (graphData) setShowData(graphData);
  }, [graphData]);

  // Metric Mapping
  const stats = {
    entered: showData.general?.[0]?.application || 0,
    verified: showData.general?.[0]?.verified || 0,
    finalized: showData.general?.[0]?.finalization || 0,
    approved: showData.general?.[0]?.approved || 0,
    rejected: showData.general?.[0]?.rejected || 0,
    eligible: showData.general?.[0]?.eligible || 0, // Assumed API key
    distributed: showData.general?.[0]?.distributed || 0, // Assumed API key
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

  // --- Components ---

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
          <Icon className="text-xl" />
        </div>
      </div>
      {/* Decorative Background Icon */}
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] text-gray-900 dark:text-white transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
        <Icon size={90} />
      </div>
      {/* Bottom Gradient Line */}
      <div className={`absolute bottom-0 left-0 w-full h-1 ${gradient}`} />
    </div>
  );

  const ActionCard = ({ title, subText, icon: Icon, onClick, colorClass }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg active:scale-95 text-left w-full group"
    >
      <div
        className={`p-3 rounded-xl ${colorClass} text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}
      >
        <Icon className="text-2xl" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-800 dark:text-white">
          {title}
        </h4>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
          {subText}
        </p>
      </div>
    </button>
  );

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Student Profile <span className="text-indigo-600">Overview</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center justify-center md:justify-start gap-2">
            <HiChartBar className="text-indigo-500" /> Dashboard • Phase{" "}
            {phaseDetails.phaseName}
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Year: {phaseDetails.year}
          </span>
        </div>
      </div>

      {/* --- STATS GRID (7 Items) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          title="Profile Entered"
          value={stats.entered}
          icon={HiUsers}
          colorClass="bg-blue-500"
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <StatCard
          title="Profile Verified"
          value={stats.verified}
          icon={HiShieldCheck}
          colorClass="bg-indigo-500"
          gradient="bg-gradient-to-r from-indigo-400 to-indigo-600"
        />
        <StatCard
          title="Profile Finalized"
          value={stats.finalized}
          icon={HiClipboardDocumentCheck}
          colorClass="bg-purple-500"
          gradient="bg-gradient-to-r from-purple-400 to-purple-600"
        />
        <StatCard
          title="Approved Profile"
          value={stats.approved}
          icon={HiCheckBadge}
          colorClass="bg-emerald-500"
          gradient="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <StatCard
          title="Rejected Profile"
          value={stats.rejected}
          icon={HiXCircle}
          colorClass="bg-red-500"
          gradient="bg-gradient-to-r from-red-400 to-red-600"
        />
        <StatCard
          title="Eligible Profile"
          value={stats.eligible}
          icon={HiUserGroup}
          colorClass="bg-amber-500"
          gradient="bg-gradient-to-r from-amber-400 to-amber-600"
        />
        <StatCard
          title="Distributed"
          value={stats.distributed}
          icon={HiTruck}
          colorClass="bg-teal-500"
          gradient="bg-gradient-to-r from-teal-400 to-teal-600"
        />
      </div>

      {/* --- QUICK ACTIONS --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1.5 bg-indigo-600 rounded-full"></div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Reports & Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="Profile Status Report"
            subText="View Application Status"
            icon={HiDocumentChartBar}
            colorClass="bg-blue-600"
            onClick={() => navigate(`/BlockReport/ProfileStatus/${phaseId}`)}
          />
          <ActionCard
            title="Distribution Details"
            subText="View Delivery Report"
            icon={HiClipboardDocumentList}
            colorClass="bg-teal-600"
            onClick={() => navigate(`/BlockReport/Distribution/${phaseId}`)}
          />
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Gender Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-8">
            <HiOutlineUserGroupIcon className="text-2xl text-blue-500" />
            <h2 className="text-lg font-black text-gray-800 dark:text-white tracking-tight">
              Gender Split
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
                    hoverOffset: 15,
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: "75%",
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                      font: { weight: "bold" },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Caste Wise Summary */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-8">
            <HiChartBar className="text-2xl text-indigo-500" />
            <h2 className="text-lg font-black text-gray-800 dark:text-white tracking-tight">
              Caste Wise Analysis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-64">
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
                cutout: "75%",
                plugins: { legend: { display: false } },
              }}
            />
            <div className="space-y-3">
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
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}
                    ></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-black text-gray-800 dark:text-white">
                    {item.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* School/Sector Summary (Bar Chart) */}
      {barData.labels.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-black text-gray-800 dark:text-white mb-8 tracking-tight">
            Application Load Summary
          </h2>
          <div className="h-80">
            <Bar
              data={{
                labels: barData.labels,
                datasets: [
                  {
                    label: "Applications",
                    data: barData.data,
                    backgroundColor: "#4f46e5", // Indigo for Block theme
                    borderRadius: 8,
                    barThickness: 30,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { display: false } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBlockProfile;
