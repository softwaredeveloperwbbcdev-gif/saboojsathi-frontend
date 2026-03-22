import React from "react";
import {
  Banknote,
  Download,
  ArrowLeft,
  TrendingDown,
  Gavel,
  Award,
  FileSpreadsheet,
} from "lucide-react";
import { Link } from "react-router-dom";

const FinancialEvaluation = () => {
  const financialReports = [
    {
      id: "FIN-01",
      title: "FINANCIAL BID SUMMARY - PHASE I",
      date: "15-12-2023",
      size: "1.8 MB",
      l1_status: "Determined",
    },
    {
      id: "FIN-02",
      title: "FINANCIAL BID SUMMARY - PHASE II",
      date: "22-01-2024",
      size: "1.4 MB",
      l1_status: "Determined",
    },
    {
      id: "FIN-03",
      title: "FINANCIAL BID SUMMARY - PHASE III",
      date: "05-02-2024",
      size: "2.5 MB",
      l1_status: "Determined",
    },
    {
      id: "FIN-04",
      title: "FINANCIAL BID SUMMARY - PHASE IV",
      date: "10-03-2024",
      size: "2.1 MB",
      l1_status: "Determined",
    },
    {
      id: "FIN-05",
      title: "FINANCIAL BID SUMMARY - PHASE V",
      date: "28-03-2024",
      size: "1.9 MB",
      l1_status: "Under Review",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- BOLD SYNOPTIC HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
            Financial <span className="text-yellow-400">Evaluation</span>
          </h1>
          <p className="text-emerald-100/60 text-xs mt-3 font-medium uppercase tracking-[0.3em]">
            Commercial Bid Opening • L1 Determination Summary
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        {/* --- FINANCIAL INFO STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<TrendingDown className="text-amber-600" />}
            label="Metric"
            value="Lowest Quote (L1)"
          />
          <InfoCard
            icon={<Gavel className="text-blue-600" />}
            label="Authority"
            value="Tender Committee"
          />
          <InfoCard
            icon={<Award className="text-yellow-500" />}
            label="Outcome"
            value="Contract Awarding"
          />
        </div>

        {/* --- MAIN DATA TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-8 py-6 font-black text-center">ID No.</th>
                  <th className="px-8 py-6 font-black">Financial Document</th>
                  <th className="px-8 py-6 font-black">Opening Date</th>
                  <th className="px-8 py-6 font-black">Status</th>
                  <th className="px-8 py-6 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {financialReports.map((report, index) => (
                  <tr
                    key={index}
                    className="hover:bg-yellow-50/40 transition-all group"
                  >
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-gray-400 font-bold text-xs">
                        {report.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-amber-600 group-hover:text-white transition-all">
                          <FileSpreadsheet size={18} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm tracking-tight">
                            {report.title}
                          </p>
                          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                            {report.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500">
                        {report.date}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full tracking-wider uppercase ${
                          report.l1_status === "Determined"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {report.l1_status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
                        <Download size={14} /> DOWNLOAD
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          Finalized Procurement Documentation • Sabooj Sathi Online Portal
        </p>
      </div>
    </div>
  );
};

// Helper Component for Info Cards
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 flex items-center gap-4 hover:border-amber-200 transition-all duration-300">
    <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-black text-gray-800 tracking-tight">{value}</p>
    </div>
  </div>
);

export default FinancialEvaluation;
