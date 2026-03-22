import React from "react";
import {
  FileSearch,
  Download,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Scale,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";

const TechnicalEvaluation = () => {
  const evaluationList = [
    {
      id: "T-01",
      title: "TECHNICAL EVALUATION REPORT - PHASE I",
      date: "05-11-2023",
      size: "2.4 MB",
      status: "Qualified",
    },
    {
      id: "T-02",
      title: "TECHNICAL EVALUATION REPORT - PHASE II",
      date: "18-12-2023",
      size: "1.9 MB",
      status: "Qualified",
    },
    {
      id: "T-03",
      title: "TECHNICAL EVALUATION REPORT - PHASE III",
      date: "12-01-2024",
      size: "3.1 MB",
      status: "Qualified",
    },
    {
      id: "T-04",
      title: "TECHNICAL EVALUATION REPORT - PHASE IV",
      date: "28-02-2024",
      size: "2.8 MB",
      status: "Qualified",
    },
    {
      id: "T-05",
      title: "TECHNICAL EVALUATION REPORT - PHASE V",
      date: "15-03-2024",
      size: "2.2 MB",
      status: "Qualified",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- BOLD SYNOPTIC HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
            Technical <span className="text-yellow-400">Evaluation</span>
          </h1>
          <p className="text-emerald-100/60 text-xs mt-3 font-medium uppercase tracking-[0.3em]">
            Bidder Qualification Summary • Technical Compliance
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        {/* --- ANALYTICAL INFO STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<ClipboardCheck className="text-blue-500" />}
            label="Process"
            value="Technical Scrutiny"
          />
          <InfoCard
            icon={<Scale className="text-orange-500" />}
            label="Criteria"
            value="Specification Matching"
          />
          <InfoCard
            icon={<History className="text-emerald-500" />}
            label="Archive"
            value="Current Selection"
          />
        </div>

        {/* --- MAIN DATA TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-8 py-6 font-black text-center">Ref No.</th>
                  <th className="px-8 py-6 font-black">Evaluation Summary</th>
                  <th className="px-8 py-6 font-black">Published On</th>
                  <th className="px-8 py-6 font-black">Compliance</th>
                  <th className="px-8 py-6 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {evaluationList.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/40 transition-all group"
                  >
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-gray-400 font-bold text-xs">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FileSearch size={18} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm tracking-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500">
                        {item.date}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-gray-600 tracking-wider">
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
                        <Download size={14} /> VIEW REPORT
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
          Department of SC, ST & OBC Development • Government of West Bengal
        </p>
      </div>
    </div>
  );
};

// Helper Component for Info Cards
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 flex items-center gap-4 hover:border-blue-100 transition-colors">
    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-white">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-black text-gray-800 tracking-tight">{value}</p>
    </div>
  </div>
);

export default TechnicalEvaluation;
