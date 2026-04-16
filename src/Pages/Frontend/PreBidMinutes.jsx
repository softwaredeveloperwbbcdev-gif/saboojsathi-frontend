import React from "react";
import {
  FileText,
  Download,
  ArrowLeft,
  Users,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

import phaseI from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_I.pdf";
import phaseII from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_II.pdf";
import phaseIII from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_III.pdf";
import phaseIV from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_IV.pdf";
import phaseV from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_V.pdf";
import phaseVIVII from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_VI_VII.pdf";
import phaseVIIIFirst from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_VIII_first_call.pdf";
import phaseVIIISecond from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_VIII_second_call.pdf";
import phaseIX from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_IX.pdf";
import phaseX from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_X.pdf";
import phaseXEOI from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_X_EOI.pdf";
import phaseXI from "../../assets/downloads/frontend/tender/preBidMinutes/pre_bid_minutes_phase_XI.pdf";

const PreBidMinutes = () => {
  const minutesList = [
    {
      id: "01",
      title: "PRE-BID MINUTES - PHASE I",
      date: "19-06-2015",
      size: "1.41 MB",
      type: "Meeting Minutes",
      file: phaseI, // Added
    },
    {
      id: "02",
      title: "PRE-BID MINUTES - PHASE II",
      date: "05-07-2016",
      size: "1.17 MB",
      type: "Meeting Minutes",
      file: phaseII, // Added
    },
    {
      id: "03",
      title: "PRE-BID MINUTES - PHASE III",
      date: "14-03-2017",
      size: "138 KB",
      type: "Meeting Minutes",
      file: phaseIII, // Added
    },
    {
      id: "04",
      title: "PRE-BID MINUTES - PHASE IV",
      date: "07-03-2018",
      size: "159 KB",
      type: "Meeting Minutes",
      file: phaseIV, // Added
    },
    {
      id: "05",
      title: "PRE-BID MINUTES - PHASE V",
      date: "07-03-2019",
      size: "906 KB",
      type: "Meeting Minutes",
      file: phaseV, // Added
    },
    {
      id: "06",
      title: "PRE-BID MINUTES - PHASE VI - VII",
      date: "17-11-2020",
      size: "164 KB",
      type: "Meeting Minutes",
      file: phaseVIVII, // Added
    },
    {
      id: "07",
      title: "PRE-BID MINUTES - PHASE VIII (1st Call)",
      date: "23-09-2022",
      size: "759 KB",
      type: "Meeting Minutes",
      file: phaseVIIIFirst, // Added
    },
    {
      id: "08",
      title: "PRE-BID MINUTES - PHASE VIII (2nd Call)",
      date: "28-10-2022",
      size: "1.42 MB",
      type: "Meeting Minutes",
      file: phaseVIIISecond, // Added
    },
    {
      id: "09",
      title: "PRE-BID MINUTES - PHASE IX",
      date: "21-08-2023",
      size: "975 KB",
      type: "Meeting Minutes",
      file: phaseIX, // Added
    },
    {
      id: "10",
      title: "PRE-BID MINUTES - PHASE X",
      date: "23-10-2024",
      size: "1.37 MB",
      type: "Meeting Minutes",
      file: phaseX, // Added
    },
    {
      id: "11",
      title:
        "PRE-BID MINUTES - PHASE X - EOI for procurement of up to 1,00,000 bicycles",
      date: "10-01-2025",
      size: "280 KB",
      type: "Meeting Minutes",
      file: phaseXEOI, // Added
    },
    {
      id: "12",
      title: "PRE-BID MINUTES - PHASE XI",
      date: "29-05-2025",
      size: "804 KB",
      type: "Meeting Minutes",
      file: phaseXI, // Added
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- BOLD SYNOPTIC HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            PRE-BID <span className="text-yellow-400">MINUTES</span>
          </h1>
          <p className="text-emerald-100/60 text-xs mt-3 font-medium uppercase tracking-[0.3em]">
            Meeting Records & Clarifications • Sabooj Sathi Scheme
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        {/* --- STATS / INFO STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<MessageSquare className="text-blue-500" />}
            label="Category"
            value="Query Resolution"
          />
          <InfoCard
            icon={<Users className="text-emerald-500" />}
            label="Attendees"
            value="Authorized Bidders"
          />
          <InfoCard
            icon={<CheckCircle className="text-yellow-500" />}
            label="Status"
            value="Approved Minutes"
          />
        </div>

        {/* --- MAIN DATA TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-8 py-6 font-black text-center">SL.</th>
                  <th className="px-8 py-6 font-black">Description / Phase</th>
                  <th className="px-8 py-6 font-black">Meeting Date</th>
                  <th className="px-8 py-6 font-black">File Size</th>
                  <th className="px-8 py-6 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {minutesList.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-emerald-50/40 transition-all group"
                  >
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-gray-300 font-bold text-xs">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm tracking-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                            {item.type}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Clock size={14} className="text-gray-300" />{" "}
                        {item.date}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {item.size}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <a
                        href={item.file}
                        download
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
                      >
                        <Download size={14} /> DOWNLOAD
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

export default PreBidMinutes;
