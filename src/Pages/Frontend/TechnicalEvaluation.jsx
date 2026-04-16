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
import phaseI from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_I.pdf";
import phaseII from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_II.pdf";
import phaseIII from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_III.pdf";
import phaseIV from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_IV.pdf";
import phaseV from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_V.pdf";
import phaseVIVII from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_VI_VII.pdf";
import phaseVIII from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_VIII.pdf";
import phaseIX from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_IX.pdf";
import phaseX from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_X.pdf";
import phaseXEOI from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_X_EOI.pdf";
import phaseXI from "../../assets/downloads/frontend/tender/technicalBidEvaluation/technical_bid_evaluation_phase_XI.pdf";

const TechnicalEvaluation = () => {
  // const evaluationList = [
  //   {
  //     id: "01",
  //     title: "PHASE I",
  //     message: "SUMMARY",
  //     date: "06-07-2015",
  //     size: "355 KB",
  //   },
  //   {
  //     id: "02",
  //     title: "PHASE II",
  //     message: "SUMMARY",
  //     date: "20-07-2016",
  //     size: "255 KB",
  //   },
  //   {
  //     id: "03",
  //     title: "PHASE III",
  //     message: "SUMMARY",
  //     date: "27-03-2017",
  //     size: "818 KB",
  //   },
  //   {
  //     id: "04",
  //     title: "PHASE IV",
  //     message: "SUMMARY",
  //     date: "26-03-2018",
  //     size: "2.69 MB",
  //   },
  //   {
  //     id: "05",
  //     title: "PHASE V",
  //     message: "SUMMARY",
  //     date: "25-03-2019",
  //     size: "422 KB",
  //   },
  //   {
  //     id: "06",
  //     title: "PHASE VI & VII",
  //     message: "SUMMARY",
  //     date: "30-11-2020",
  //     size: "255 KB",
  //   },
  //   {
  //     id: "07",
  //     title: "PHASE VIII",
  //     message: "SUMMARY",
  //     date: "14-11-2022",
  //     size: "375 KB",
  //   },
  //   {
  //     id: "08",
  //     title: "PHASE IX",
  //     message: "SUMMARY",
  //     date: "05-10-2023",
  //     size: "860 KB",
  //   },
  //   {
  //     id: "09",
  //     title: "PHASE X",
  //     message: "SUMMARY",
  //     date: "18-11-2024",
  //     size: "1.66 MB",
  //   },
  //   {
  //     id: "10",
  //     title: "PHASE X - EOI for procurement of up to 1,00,000 bicycles",
  //     message: "SUMMARY",
  //     date: "22-01-2025",
  //     size: "178 KB",
  //   },
  //   {
  //     id: "11",
  //     title: "PHASE XI",
  //     message: "SUMMARY",
  //     date: "16-06-2025",
  //     size: "285 KB",
  //   },
  // ];

  const evaluationList = [
    {
      id: "01",
      title: "PHASE I",
      message: "SUMMARY",
      date: "06-07-2015",
      size: "355 KB",
      file: phaseI, // Added
    },
    {
      id: "02",
      title: "PHASE II",
      message: "SUMMARY",
      date: "20-07-2016",
      size: "255 KB",
      file: phaseII, // Added
    },
    {
      id: "03",
      title: "PHASE III",
      message: "SUMMARY",
      date: "27-03-2017",
      size: "818 KB",
      file: phaseIII, // Added
    },
    {
      id: "04",
      title: "PHASE IV",
      message: "SUMMARY",
      date: "26-03-2018",
      size: "2.69 MB",
      file: phaseIV, // Added
    },
    {
      id: "05",
      title: "PHASE V",
      message: "SUMMARY",
      date: "25-03-2019",
      size: "422 KB",
      file: phaseV, // Added
    },
    {
      id: "06",
      title: "PHASE VI & VII",
      message: "SUMMARY",
      date: "30-11-2020",
      size: "255 KB",
      file: phaseVIVII, // Added
    },
    {
      id: "07",
      title: "PHASE VIII",
      message: "SUMMARY",
      date: "14-11-2022",
      size: "375 KB",
      file: phaseVIII, // Added
    },
    {
      id: "08",
      title: "PHASE IX",
      message: "SUMMARY",
      date: "05-10-2023",
      size: "860 KB",
      file: phaseIX, // Added
    },
    {
      id: "09",
      title: "PHASE X",
      message: "SUMMARY",
      date: "18-11-2024",
      size: "1.66 MB",
      file: phaseX, // Added
    },
    {
      id: "10",
      title: "PHASE X - EOI for procurement of up to 1,00,000 bicycles",
      message: "SUMMARY",
      date: "22-01-2025",
      size: "178 KB",
      file: phaseXEOI, // Added
    },
    {
      id: "11",
      title: "PHASE XI",
      message: "SUMMARY",
      date: "16-06-2025",
      size: "285 KB",
      file: phaseXI, // Added
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
            Technical Bid <span className="text-yellow-400">Evaluation</span>
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
            value="Current & Previous Bidder Selection"
          />
        </div>

        {/* --- MAIN DATA TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-8 py-6 font-black text-center">Sl. No.</th>
                  <th className="px-8 py-6 font-black">Description / Phase</th>
                  <th className="px-8 py-6 font-black">Published On</th>
                  <th className="px-8 py-6 font-black">File Size</th>
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
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <FileSearch size={18} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm tracking-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                            {item.message}
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
                          {item.size}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <a
                        href={item.file}
                        download
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
                      >
                        <Download size={14} /> Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          West Bengal SC, ST and OBC Development & Finance Corporation •
          Government of West Bengal
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
