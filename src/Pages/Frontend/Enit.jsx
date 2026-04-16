import React from "react";
import {
  FileText,
  Download,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  FileType,
} from "lucide-react";
import phaseI from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_I.pdf";
import phaseII from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_II.pdf";
import phaseIII from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_III.pdf";
import phaseIV from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_IV.pdf";
import phaseV from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_V.pdf";
import phaseVIVIIFirst from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_VI_VII_First_Call.pdf";
import phaseVIVIISecond from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_VI_VII_Second_Call.pdf";
import phaseVIIIFirst from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_VI_VII_Second_Call.pdf";
import phaseVIIISecond from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_VIII_Second_Call.pdf";
import phaseIX from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_IX.pdf";
import phaseIXEOIFirst from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_IX_EOI_First_Call.pdf";
import phaseIXEOISecond from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_IX_EOI_Second_Call.pdf";
import phaseX from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_X.pdf";
import phaseXI from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_XI.pdf";
import phaseXII from "../../assets/downloads/frontend/tender/eNit/e-NIT_phase_XII.pdf";

import { Link } from "react-router-dom";

const ENit = () => {
  const tenderPhases = [
    {
      id: "01",
      title: "PHASE I",
      date: "11-06-2015",
      size: "142 KB",
      status: "Official",
      file: phaseI, // Correct way to reference the imported PDF
    },
    {
      id: "02",
      title: "PHASE II",
      date: "27-06-2016",
      size: "149 KB",
      status: "Official",
      file: phaseII,
    },
    {
      id: "03",
      title: "PHASE III",
      date: "02-03-2017",
      size: "179 KB",
      status: "Official",
      file: phaseIII,
    },
    {
      id: "04",
      title: "PHASE IV",
      date: "28-02-2018",
      size: "220 KB",
      status: "Official",
      file: phaseIV,
    },
    {
      id: "05",
      title: "PHASE V",
      date: "27-02-2019",
      size: "1.8 MB",
      status: "Official",
      file: phaseV,
    },
    {
      id: "06",
      title: "PHASE VI & VII (1st Call)",
      date: "07-10-2020",
      size: "308 KB",
      status: "Official",
      file: phaseVIVIIFirst,
    },
    {
      id: "07",
      title: "PHASE VI & VII (2nd Call)",
      date: "12-11-2020",
      size: "178 KB",
      status: "Official",
      file: phaseVIVIISecond,
    },
    {
      id: "08",
      title: "PHASE VIII",
      date: "15-09-2022",
      size: "185 KB",
      status: "Official",
      file: phaseVIIIFirst,
    },
    {
      id: "09",
      title: "PHASE VIII (2nd Call)",
      date: "19-10-2022",
      size: "186 KB",
      status: "Official",
      file: phaseVIIISecond,
    },
    {
      id: "11",
      title: "PHASE IX",
      date: "11-08-2023",
      size: "325 KB",
      status: "Official",
      file: phaseIX,
    },
    {
      id: "12",
      title: "PHASE IX LOCAL MANUFACTURERS",
      date: "12-12-2023",
      size: "730 KB",
      status: "Official",
      file: phaseIXEOIFirst,
    },
    {
      id: "13",
      title: "PHASE IX LOCAL MANUFACTURERS(2nd Call)",
      date: "04-01-2024",
      size: "740 KB",
      status: "Official",
      file: phaseIXEOISecond,
    },
    {
      id: "14",
      title: "PHASE X",
      date: "03-10-2024",
      size: "453 KB",
      status: "Official",
      file: phaseX,
    },
    {
      id: "15",
      title: "PHASE XI",
      date: "22-05-2025",
      size: "461 KB",
      status: "Official",
      file: phaseXI,
    },
    {
      id: "16",
      title: "PHASE XII",
      date: "23-12-2025",
      size: "3.59 MB",
      status: "Official",
      file: phaseXII,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- BOLD SYNOPTIC HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-28 px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            E-<span className="text-yellow-400">NIT</span>
          </h1>
          <p className="text-emerald-100/60 text-xs mt-3 font-medium uppercase tracking-[0.3em]">
            Notice Inviting Tender • Sabooj Sathi Scheme
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        {/* --- STATS / INFO STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<FileType className="text-yellow-500" />}
            label="File Format"
            value="PDF Documents"
          />
          <InfoCard
            icon={<ShieldCheck className="text-emerald-500" />}
            label="Verification"
            value="Digitally/Manually Signed"
          />
          <InfoCard
            icon={<Calendar className="text-blue-500" />}
            label="Last Updated"
            value="December 2025"
          />
        </div>

        {/* --- MAIN DATA TABLE (Synoptic Style) --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-8 py-6 font-black text-center">SL.</th>
                  <th className="px-8 py-6 font-black">Description / Phase</th>
                  <th className="px-8 py-6 font-black">Release Date</th>
                  <th className="px-8 py-6 font-black">Size</th>
                  <th className="px-8 py-6 text-right font-black">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tenderPhases.map((phase, index) => (
                  <tr
                    key={index}
                    className="hover:bg-emerald-50/40 transition-all group"
                  >
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-gray-800 font-bold text-xs">
                        {phase.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm tracking-tight">
                            {phase.title}
                          </p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                            Sabooj Sathi Official
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500">
                        {phase.date}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {phase.size}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <a
                        href={phase.file}
                        download
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
                      >
                        <Download size={14} /> PDF
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
  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-black text-gray-800 tracking-tight">{value}</p>
    </div>
  </div>
);

export default ENit;
