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
  HiDocumentText, // Pending Challan
  HiDocumentCheck, // Approved Challan
  HiArrowPathRoundedSquare, // Partially Allocated
  HiCheckBadge, // Fully Allocated
  HiXCircle, // Rejected Challan
  HiTruck, // Bicycles Approved/Allocated
  HiClipboardDocumentList, // Challan List Action
  HiArrowDownTray, // Download Receipt Action
  HiDocumentChartBar, // Generation Report Action
  HiOutlineCube, // Icon for Doughnut/Bar
  HiOutlineDocumentText,
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

const DashboardBlockChallan = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  useEffect(() => {
    if (graphData) setShowData(graphData);
  }, [graphData]);

  // Metric Mapping (Adjust these keys based on your actual API response)
  const stats = {
    pendingChallan: showData.general?.[0]?.pending_challan || 0,
    approvedChallan: showData.general?.[0]?.approved_challan || 0,
    partiallyAllocated: showData.general?.[0]?.partially_allocated || 0,
    fullyAllocated: showData.general?.[0]?.fully_allocated || 0,
    rejectedChallan: showData.general?.[0]?.rejected_challan || 0,
    totalBicyclesApproved: showData.general?.[0]?.total_bicycles_approved || 0,
    totalBicyclesAllocated:
      showData.general?.[0]?.total_bicycles_allocated || 0,
  };

  // Example: Split of Bicycles (Boys vs Girls, if applicable to challans, or replace with appropriate data)
  const bicycleData = {
    boys: showData.bicycles?.[0]?.boys || 0,
    girls: showData.bicycles?.[0]?.girls || 0,
  };

  // Example: Challan Status Breakdown for Doughnut
  const challanStatusData = {
    pending: showData.status_breakdown?.[0]?.pending || 0,
    approved: showData.status_breakdown?.[0]?.approved || 0,
    rejected: showData.status_breakdown?.[0]?.rejected || 0,
    allocated: showData.status_breakdown?.[0]?.allocated || 0,
  };

  const barData = {
    labels: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.name) // e.g., Vendor Name or Delivery Point
      : [],
    data: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.count_challans)
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
            Challan <span className="text-teal-600">Overview</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center justify-center md:justify-start gap-2">
            <HiOutlineDocumentText className="text-teal-500" /> Supply Receipts
            • Phase {phaseDetails.phaseName}
          </p>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-xl border border-teal-100 dark:border-teal-800">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Year: {phaseDetails.year}
          </span>
        </div>
      </div>

      {/* --- STATS GRID (7 Items) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          title="Pending Challan"
          value={stats.pendingChallan}
          icon={HiDocumentText}
          colorClass="bg-amber-500"
          gradient="bg-gradient-to-r from-amber-400 to-amber-600"
        />
        <StatCard
          title="Approved Challan"
          value={stats.approvedChallan}
          icon={HiDocumentCheck}
          colorClass="bg-emerald-500"
          gradient="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <StatCard
          title="Partially Allocated"
          value={stats.partiallyAllocated}
          icon={HiArrowPathRoundedSquare}
          colorClass="bg-blue-500"
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <StatCard
          title="Fully Allocated"
          value={stats.fullyAllocated}
          icon={HiCheckBadge}
          colorClass="bg-indigo-500"
          gradient="bg-gradient-to-r from-indigo-400 to-indigo-600"
        />
        <StatCard
          title="Rejected Challan"
          value={stats.rejectedChallan}
          icon={HiXCircle}
          colorClass="bg-red-500"
          gradient="bg-gradient-to-r from-red-400 to-red-600"
        />
        <StatCard
          title="Total Bi-cycles Approved"
          value={stats.totalBicyclesApproved}
          icon={HiTruck}
          colorClass="bg-cyan-500"
          gradient="bg-gradient-to-r from-cyan-400 to-cyan-600"
        />
        <StatCard
          title="Total Bi-cycles Allocated"
          value={stats.totalBicyclesAllocated}
          icon={HiOutlineCube}
          colorClass="bg-teal-500"
          gradient="bg-gradient-to-r from-teal-400 to-teal-600"
        />
      </div>

      {/* --- QUICK ACTIONS --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1.5 bg-teal-600 rounded-full"></div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Reports & Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="Challan List"
            subText="View all supply receipts"
            icon={HiClipboardDocumentList}
            colorClass="bg-blue-600"
            onClick={() => navigate(`/Block/ChallanList/${phaseId}`)}
          />
          <ActionCard
            title="Download School Receipt"
            subText="Get individual receipts"
            icon={HiArrowDownTray}
            colorClass="bg-emerald-600"
            onClick={() => navigate(`/Block/DownloadReceipt/${phaseId}`)}
          />
          <ActionCard
            title="Challan Generation Report"
            subText="View generation statistics"
            icon={HiDocumentChartBar}
            colorClass="bg-indigo-600"
            onClick={() =>
              navigate(`/BlockReport/ChallanGeneration/${phaseId}`)
            }
          />
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Bicycle Gender Distribution (Or replace with another metric) */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-8">
            <HiOutlineCube className="text-2xl text-teal-500" />
            <h2 className="text-lg font-black text-gray-800 dark:text-white tracking-tight">
              Bi-cycle Allocation Split
            </h2>
          </div>
          <div className="h-64">
            <Doughnut
              data={{
                labels: [`Boys Models`, `Girls Models`],
                datasets: [
                  {
                    data: [bicycleData.boys, bicycleData.girls],
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

        {/* Challan Status Breakdown */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-8">
            <HiDocumentChartBar className="text-2xl text-indigo-500" />
            <h2 className="text-lg font-black text-gray-800 dark:text-white tracking-tight">
              Challan Status Breakdown
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-64">
            <Doughnut
              data={{
                labels: ["Pending", "Approved", "Allocated", "Rejected"],
                datasets: [
                  {
                    data: [
                      challanStatusData.pending,
                      challanStatusData.approved,
                      challanStatusData.allocated,
                      challanStatusData.rejected,
                    ],
                    backgroundColor: [
                      "#f59e0b", // Amber for pending
                      "#10b981", // Emerald for approved
                      "#3b82f6", // Blue for allocated
                      "#ef4444", // Red for rejected
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
                  label: "Pending",
                  val: challanStatusData.pending,
                  color: "bg-amber-500",
                },
                {
                  label: "Approved",
                  val: challanStatusData.approved,
                  color: "bg-emerald-500",
                },
                {
                  label: "Allocated",
                  val: challanStatusData.allocated,
                  color: "bg-blue-500",
                },
                {
                  label: "Rejected",
                  val: challanStatusData.rejected,
                  color: "bg-red-500",
                },
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

      {/* Challan Load Summary (Bar Chart) */}
      {barData.labels.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-black text-gray-800 dark:text-white mb-8 tracking-tight">
            Challan Load Summary
          </h2>
          <div className="h-80">
            <Bar
              data={{
                labels: barData.labels,
                datasets: [
                  {
                    label: "Challans Generated",
                    data: barData.data,
                    backgroundColor: "#0d9488", // Teal for Challan theme
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

export default DashboardBlockChallan;
