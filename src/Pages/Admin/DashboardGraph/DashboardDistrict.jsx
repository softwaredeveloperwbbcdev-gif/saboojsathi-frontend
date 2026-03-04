import React, { useEffect, useState } from "react";
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
  Users,
  ShieldCheck,
  ClipboardCheck,
  BadgeCheck,
  XCircle,
  UserCheck,
  Truck,
  FileCheck,
  Download,
  FileSpreadsheet,
  Tags,
  ListChecks,
  LayoutDashboard,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { HiChartBar } from "react-icons/hi2";
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

const DashboardDistrict = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  useEffect(() => {
    if (graphData) setShowData(graphData);
  }, [graphData]);

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
        className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}
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
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 p-4 md:p-8 lg:p-10 transition-colors duration-500">
      {/* Header Section */}

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Profile{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Overview
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center justify-center md:justify-start gap-2">
            <HiChartBar className="text-indigo-500" /> Dashboard • Phase{" "}
            {phaseDetails.phaseName}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Calendar size={20} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Academic Year
            </p>
            <p className="text-sm font-black text-slate-700 dark:text-slate-200">
              {phaseDetails.year}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          title="Profile Entered"
          value={showData.general?.[0]?.application || 0}
          icon={Users}
          colorClass="bg-blue-500"
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <StatCard
          title="Profile Verified"
          value={showData.general?.[0]?.verified || 0}
          icon={ShieldCheck}
          colorClass="bg-indigo-500"
          gradient="bg-gradient-to-r from-indigo-400 to-indigo-600"
        />
        <StatCard
          title="Profile Finalized"
          value={showData.general?.[0]?.finalization || 0}
          icon={ClipboardCheck}
          colorClass="bg-purple-500"
          gradient="bg-gradient-to-r from-purple-400 to-purple-600"
        />
        <StatCard
          title="Approved Profile"
          value={showData.general?.[0]?.approved || 0}
          icon={BadgeCheck}
          colorClass="bg-emerald-500"
          gradient="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <StatCard
          title="Rejected Profile"
          value={showData.general?.[0]?.rejected || 0}
          icon={XCircle}
          colorClass="bg-rose-500"
          gradient="bg-gradient-to-r from-rose-400 to-rose-600"
        />
        <StatCard
          title="Eligible Profile"
          value={showData.general?.[0]?.eligible || 0}
          icon={UserCheck}
          colorClass="bg-amber-500"
          gradient="bg-gradient-to-r from-amber-400 to-amber-600"
        />
        <StatCard
          title="Distributed"
          value={showData.general?.[0]?.distributed || 0}
          icon={Truck}
          colorClass="bg-teal-500"
          gradient="bg-gradient-to-r from-teal-400 to-teal-600"
        />
      </div>

      {/* Action Center */}
      <div className="mb-10">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
            Action Center
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="Approve Profile"
              subText="Review & verify student data"
              icon={FileCheck}
              colorClass="from-emerald-500 to-teal-600"
              onClick={() => navigate(`/DistrictVerifyListSchool`)}
            />
            <ActionCard
              title="Download Muster Roll"
              subText="Generate attendance sheets"
              icon={Download}
              colorClass="from-blue-500 to-indigo-600"
              onClick={() => navigate(`/DownloadDistributionDistrict`)}
            />
            <ActionCard
              title="Entry Status Report"
              subText="Monitor data entry progress"
              icon={FileSpreadsheet}
              colorClass="from-purple-500 to-pink-600"
              onClick={() => navigate(`/Report/EntryStatus/${phaseId}`)}
            />
            <ActionCard
              title="School Tagging Report"
              subText="Verify institutional mapping"
              icon={Tags}
              colorClass="from-orange-500 to-amber-600"
              onClick={() => navigate(`/Report/SchoolTagging/${phaseId}`)}
            />
            <ActionCard
              title="Distribution Report"
              subText="Track cycle delivery status"
              icon={ListChecks}
              colorClass="from-cyan-500 to-blue-600"
              onClick={() => navigate(`/Report/Distribution/${phaseId}`)}
            />
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gender Split */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-8">
            Gender Split
          </h3>
          <div className="h-64 relative">
            <Doughnut
              data={{
                labels: ["Boys", "Girls"],
                datasets: [
                  {
                    data: [
                      showData.gender?.[0]?.boys || 0,
                      showData.gender?.[0]?.girls || 0,
                    ],
                    backgroundColor: ["#6366f1", "#10b981"],
                    borderWidth: 0,
                    hoverOffset: 20,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: "80%",
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { usePointStyle: true, font: { weight: "bold" } },
                  },
                },
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {(
                  (showData.gender?.[0]?.boys || 0) +
                  (showData.gender?.[0]?.girls || 0)
                ).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Caste Analysis */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-8">
            Caste Wise Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div className="h-60">
              <Doughnut
                data={{
                  labels: ["General", "SC", "ST", "OBC"],
                  datasets: [
                    {
                      data: [
                        showData.category?.[0]?.general || 0,
                        showData.category?.[0]?.sc || 0,
                        showData.category?.[0]?.st || 0,
                        showData.category?.[0]?.obc || 0,
                      ],
                      backgroundColor: [
                        "#6366f1",
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
                  cutout: "80%",
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
            <div className="space-y-2">
              {[
                {
                  label: "General",
                  val: showData.category?.[0]?.general || 0,
                  color: "bg-indigo-500",
                },
                {
                  label: "SC",
                  val: showData.category?.[0]?.sc || 0,
                  color: "bg-emerald-500",
                },
                {
                  label: "ST",
                  val: showData.category?.[0]?.st || 0,
                  color: "bg-amber-500",
                },
                {
                  label: "OBC",
                  val: showData.category?.[0]?.obc || 0,
                  color: "bg-cyan-500",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {c.label}
                    </span>
                  </div>
                  <span className="font-black text-slate-800 dark:text-white">
                    {c.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDistrict;
