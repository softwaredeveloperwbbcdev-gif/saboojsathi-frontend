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

const PreBidMinutes = () => {
  const minutesList = [
    {
      id: "01",
      title: "PRE-BID MINUTES - PHASE I",
      date: "24-09-2023",
      size: "920 KB",
      type: "Meeting Record",
    },
    {
      id: "02",
      title: "PRE-BID MINUTES - PHASE II",
      date: "02-11-2023",
      size: "1.1 MB",
      type: "Meeting Record",
    },
    {
      id: "03",
      title: "PRE-BID MINUTES - PHASE III",
      date: "28-12-2023",
      size: "1.4 MB",
      type: "Meeting Record",
    },
    {
      id: "04",
      title: "PRE-BID MINUTES - PHASE IV",
      date: "15-02-2024",
      size: "1.2 MB",
      type: "Meeting Record",
    },
    {
      id: "05",
      title: "PRE-BID MINUTES - PHASE V",
      date: "01-03-2024",
      size: "1.6 MB",
      type: "Meeting Record",
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
                  <th className="px-8 py-6 font-black">Meeting Description</th>
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
                      <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
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
          Official Portal for Sabooj Sathi Scheme Procurement
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
