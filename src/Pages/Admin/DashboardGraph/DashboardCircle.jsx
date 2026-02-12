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
  HiCheckBadge,
  HiXCircle,
  HiChartBar,
  HiOutlineUserGroup,
  HiShieldCheck,
  HiTableCells,
  HiClipboardDocumentList,
  HiCursorArrowRays, // New icon for "Action"
  HiHomeModern, // For "School List"
  HiArrowDownTray, // For downloads
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

const DashboardCircle = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  useEffect(() => {
    if (graphData) setShowData(graphData);
  }, [graphData]);

  // Logic specifically for Circle/SI level
  const profileStats = {
    total: showData.general?.[0]?.application || 0,
    pending: showData.general?.[0]?.verified || 0, // In SI context, 'verified' usually means waiting for SI approval
    approved: showData.general?.[0]?.approved || 0,
    rejected: showData.general?.[0]?.rejected || 0,
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
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white mt-1">
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl shadow-lg ${colorClass}`}>
          <Icon className="text-xl text-white" />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] text-gray-900 dark:text-white">
        <Icon size={90} />
      </div>
    </div>
  );

  const ActionCard = ({ title, icon: Icon, onClick, colorClass, subText }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl active:scale-95"
    >
      <div
        className={`mb-4 p-4 rounded-2xl shadow-md ${colorClass} group-hover:rotate-6 transition-transform duration-300`}
      >
        <Icon className="text-2xl text-white" />
      </div>
      <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter">
        {subText}
      </p>
    </button>
  );

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* SI Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center gap-2">
            <HiShieldCheck className="text-blue-500" /> Phase{" "}
            {phaseDetails.phaseName} - Academic Year {phaseDetails.year}
          </p>
        </div>
      </div>

      {/* SI Focused Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Pending Approval"
          value={profileStats.pending}
          icon={HiCursorArrowRays}
          colorClass="bg-amber-500"
        />
        <StatCard
          title="Approved Profile"
          value={profileStats.approved}
          icon={HiCheckBadge}
          colorClass="bg-emerald-500"
        />
        <StatCard
          title="Rejected Profile"
          value={profileStats.rejected}
          icon={HiXCircle}
          colorClass="bg-red-500"
        />
      </div>

      {/* --- SI QUICK ACTIONS --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1.5 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Circle Operations
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <ActionCard
            title="Approve Profiles"
            subText="Pending Verification"
            icon={HiShieldCheck}
            colorClass="bg-blue-600"
            onClick={() => navigate(`/CircleVerifyListSchool/${phaseId}`)}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Gender Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-8">
            <HiOutlineUserGroup className="text-2xl text-blue-500" />
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
                    backgroundColor: ["#2563eb", "#10b981"],
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
              Caste Wise Summary
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

      {/* Circle/School Summary (Bar Chart) */}
      {barData.labels.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-black text-gray-800 dark:text-white mb-8 tracking-tight">
            School-wise Application Load
          </h2>
          <div className="h-80">
            <Bar
              data={{
                labels: barData.labels,
                datasets: [
                  {
                    label: "Applications",
                    data: barData.data,
                    backgroundColor: "#2563eb",
                    borderRadius: 8,
                    barThickness: 20,
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

export default DashboardCircle;
