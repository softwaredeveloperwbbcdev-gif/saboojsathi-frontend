import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
  Calendar,
  ChevronRight,
  PieChart,
  FileText,
  CreditCard,
  Receipt,
  Eye,
  Activity,
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

const DashboardState = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const encodedPhaseId = btoa(phaseId);

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
          <Icon size={20} />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] text-gray-900 dark:text-white transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
        <Icon size={90} />
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${gradient}`} />
    </div>
  );

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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
              State Level Control
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            SPMU{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
              Analytics
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
            <HiChartBar className="text-indigo-500" /> Monitoring Dashboard •
            Phase {phaseDetails.phaseName}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Session
            </p>
            <p className="text-lg font-black text-slate-700 dark:text-slate-200">
              {phaseDetails.year}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-12">
        <StatCard
          title="Total Entry"
          value={showData.general?.[0]?.application || 0}
          icon={Users}
          colorClass="bg-blue-500"
          gradient="bg-blue-500"
        />
        <StatCard
          title="Verified"
          value={showData.general?.[0]?.verified || 0}
          icon={ShieldCheck}
          colorClass="bg-indigo-500"
          gradient="bg-indigo-500"
        />
        <StatCard
          title="Finalized"
          value={showData.general?.[0]?.finalization || 0}
          icon={ClipboardCheck}
          colorClass="bg-purple-500"
          gradient="bg-purple-500"
        />
        <StatCard
          title="Approved"
          value={showData.general?.[0]?.approved || 0}
          icon={BadgeCheck}
          colorClass="bg-emerald-500"
          gradient="bg-emerald-500"
        />
        <StatCard
          title="Rejected"
          value={showData.general?.[0]?.rejected || 0}
          icon={XCircle}
          colorClass="bg-rose-500"
          gradient="bg-rose-500"
        />
        <StatCard
          title="Eligible"
          value={showData.general?.[0]?.eligible || 0}
          icon={UserCheck}
          colorClass="bg-amber-500"
          gradient="bg-amber-500"
        />
        <StatCard
          title="Distributed"
          value={showData.general?.[0]?.distributed || 0}
          icon={Truck}
          colorClass="bg-cyan-500"
          gradient="bg-cyan-500"
        />
      </div>

      {/* Action Center - 11 Reports */}
      <div className="mb-12">
        <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
          State Report Console
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ActionCard
            title="Eligible Student Report"
            subText="District Wise Eligibility"
            icon={UserCheck}
            colorClass="from-blue-500 to-blue-700"
            onClick={() => navigate(`/EligibleStudentReportDistrict`)}
          />
          <ActionCard
            title="District Wise Report"
            subText="Overall Profile Summary"
            icon={PieChart}
            colorClass="from-indigo-500 to-indigo-700"
            onClick={() => navigate(`/ProfileEntryDistrictReport`)}
          />
          <ActionCard
            title="Profile Entry Status"
            subText="Data Entry Tracking"
            icon={Activity}
            colorClass="from-purple-500 to-purple-700"
            onClick={() => navigate(`/ProfileEntryStatusReportDist`)}
          />
          <ActionCard
            title="Distribution Detail Report"
            subText="Cycle Delivery Progress"
            icon={Truck}
            colorClass="from-emerald-500 to-emerald-700"
            onClick={() => navigate(`/DistributionReportDistrict`)}
          />
          <ActionCard
            title="District Tagging Report"
            subText="Mapping & Verification"
            icon={Tags}
            colorClass="from-amber-500 to-amber-700"
            onClick={() => navigate(`/TaggingDetailsReport/${encodedPhaseId}`)}
          />
          <ActionCard
            title="Challan MIS"
            subText="Phase Specific Management"
            icon={ClipboardCheck}
            colorClass="from-rose-500 to-rose-700"
            onClick={() => navigate(`/DistrictChallanReport`)}
          />
          <ActionCard
            title="Challan Generation"
            subText="Batch Process Tracking"
            icon={FileText}
            colorClass="from-cyan-500 to-cyan-700"
            onClick={() => navigate(`/ChallanGenerationReport`)}
          />
          <ActionCard
            title="Challan View"
            subText="Detailed Particulars"
            icon={Eye}
            colorClass="from-slate-600 to-slate-800"
            onClick={() =>
              navigate(`/ChallanParticularsView/${encodedPhaseId}`)
            }
          />
          <ActionCard
            title="Allocation Status"
            subText="Challan/Bicycle Mapping"
            icon={ListChecks}
            colorClass="from-teal-500 to-teal-700"
            onClick={() =>
              navigate(`/ChallanAllocationStatusReport/${encodedPhaseId}`)
            }
          />
          <ActionCard
            title="Invoice View"
            subText="Billing & Records"
            icon={Receipt}
            colorClass="from-pink-500 to-pink-700"
            onClick={() => navigate(`/InvoiceViewReport/${encodedPhaseId}`)}
          />
          <ActionCard
            title="Challan Payment"
            subText="Settlement & Finance"
            icon={CreditCard}
            colorClass="from-orange-500 to-orange-700"
            onClick={() => navigate(`/ChallanPaymentReport/${encodedPhaseId}`)}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-8 flex items-center gap-2">
            <Users size={20} className="text-indigo-500" /> Gender Demographics
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
                      padding: 20,
                      usePointStyle: true,
                      font: { weight: "bold", size: 11 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-8 flex items-center gap-2">
            <ShieldCheck size={20} className="text-indigo-500" /> Social
            Category Distribution
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "General",
                val: showData.category?.[0]?.general || 0,
                color: "text-indigo-500",
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
              },
              {
                label: "SC",
                val: showData.category?.[0]?.sc || 0,
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
              },
              {
                label: "ST",
                val: showData.category?.[0]?.st || 0,
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-900/20",
              },
              {
                label: "OBC",
                val: showData.category?.[0]?.obc || 0,
                color: "text-cyan-500",
                bg: "bg-cyan-50 dark:bg-cyan-900/20",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.bg} p-6 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  {item.label}
                </p>
                <p className={`text-2xl font-black ${item.color}`}>
                  {item.val.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardState;
