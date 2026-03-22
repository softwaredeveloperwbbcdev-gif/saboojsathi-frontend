import React from "react";
import {
  FileSpreadsheet,
  ArrowLeft,
  Clock,
  Users,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const GenderWiseReport = () => {
  const generatedTime = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const genderData = [
    {
      name: "ALIPURDUAR",
      phases: [
        { b: 24554, g: 25310, t: 49864 },
        { b: 11690, g: 13248, t: 24938 },
        { b: 19839, g: 23578, t: 43417 },
        { b: 9677, g: 11042, t: 20719 },
        { b: 9708, g: 11096, t: 20804 },
        { b: 10431, g: 11416, t: 21847 },
        { b: 8020, g: 8361, t: 16381 },
        { b: 9426, g: 10018, t: 19444 },
        { b: 9397, g: 10161, t: 19558 },
        { b: 9056, g: 9836, t: 18892 },
        { b: 7392, g: 7923, t: 15315 },
        { b: 153, g: 136, t: 289 },
      ],
      boysTotal: 129343,
      girlsTotal: 142125,
      grandTotal: 271468,
    },
    {
      name: "BANKURA",
      phases: [
        { b: 61856, g: 44855, t: 106711 },
        { b: 29205, g: 27764, t: 56969 },
        { b: 56195, g: 58725, t: 114920 },
        { b: 27824, g: 28792, t: 56616 },
        { b: 28936, g: 29877, t: 58813 },
        { b: 30008, g: 30427, t: 60435 },
        { b: 17862, g: 16730, t: 34592 },
        { b: 26728, g: 26555, t: 53283 },
        { b: 26540, g: 26294, t: 52834 },
        { b: 26472, g: 26126, t: 52598 },
        { b: 22631, g: 21725, t: 44356 },
        { b: 380, g: 155, t: 535 },
      ],
      boysTotal: 354637,
      girlsTotal: 338025,
      grandTotal: 692662,
    },
  ];

  const phaseLabels = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header Area */}
      <div className="bg-[#065f46] pt-32 pb-20 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-emerald-200 hover:text-white flex items-center justify-center md:justify-start gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Gender <span className="text-yellow-400">Wise</span> Distribution
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-emerald-100/70 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> Generated: {generatedTime}
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <Users size={12} /> Statewide Reporting
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-[#065f46] px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest active:scale-95">
            <Download size={18} /> Export Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-[1600px] mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="w-full text-left border-collapse border-separate border-spacing-0">
              <thead>
                {/* Row 1: Phases */}
                <tr className="bg-gray-900 text-white">
                  <th className="sticky left-0 top-0 z-50 bg-gray-900 px-6 py-6 font-black uppercase text-[10px] tracking-widest border-r border-white/5">
                    District
                  </th>
                  {phaseLabels.map((p) => (
                    <th
                      key={p}
                      colSpan="3"
                      className="px-4 py-4 text-center font-black uppercase text-[10px] tracking-[0.2em] border-r border-white/5 bg-gray-800/50"
                    >
                      Phase {p}
                    </th>
                  ))}
                  <th
                    colSpan="3"
                    className="sticky right-0 top-0 z-50 bg-gray-900 px-6 py-4 text-center font-black uppercase text-[10px] tracking-widest border-l border-white/5"
                  >
                    Cumulative Total
                  </th>
                </tr>
                {/* Row 2: B/G/T Labels */}
                <tr className="bg-gray-900 text-gray-400">
                  <th className="sticky left-0 top-[60px] z-50 bg-gray-900 border-r border-white/5"></th>
                  {phaseLabels.map((p, i) => (
                    <React.Fragment key={i}>
                      <th className="px-3 py-3 text-center text-[9px] font-bold border-r border-white/5">
                        B
                      </th>
                      <th className="px-3 py-3 text-center text-[9px] font-bold border-r border-white/5">
                        G
                      </th>
                      <th className="px-3 py-3 text-center text-[9px] font-black text-emerald-400 border-r border-white/5">
                        T
                      </th>
                    </React.Fragment>
                  ))}
                  <th className="sticky right-[120px] top-[60px] z-50 bg-gray-900 px-3 py-3 text-center text-[9px] font-bold border-l border-white/5">
                    Boys
                  </th>
                  <th className="sticky right-[60px] top-[60px] z-50 bg-gray-900 px-3 py-3 text-center text-[9px] font-bold border-l border-white/5">
                    Girls
                  </th>
                  <th className="sticky right-0 top-[60px] z-50 bg-gray-900 px-4 py-3 text-center text-[10px] font-black text-yellow-400 border-l border-white/5">
                    Grand Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {genderData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-emerald-50/40 transition-colors group text-xs"
                  >
                    <td className="sticky left-0 z-20 bg-white group-hover:bg-[#f8fafc] px-6 py-4 font-bold text-gray-900 border-r border-gray-100">
                      {row.name}
                    </td>
                    {row.phases.map((ph, pi) => (
                      <React.Fragment key={pi}>
                        <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                          {ph.b.toLocaleString("en-IN")}
                        </td>
                        <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                          {ph.g.toLocaleString("en-IN")}
                        </td>
                        <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                          {ph.t.toLocaleString("en-IN")}
                        </td>
                      </React.Fragment>
                    ))}
                    <td className="sticky right-[120px] z-20 bg-white group-hover:bg-[#f8fafc] px-3 py-4 text-center font-mono font-bold text-blue-800 border-l border-gray-100">
                      {row.boysTotal.toLocaleString("en-IN")}
                    </td>
                    <td className="sticky right-[60px] z-20 bg-white group-hover:bg-[#f8fafc] px-3 py-4 text-center font-mono font-bold text-pink-800 border-l border-gray-100">
                      {row.girlsTotal.toLocaleString("en-IN")}
                    </td>
                    <td className="sticky right-0 z-20 bg-emerald-50 group-hover:bg-emerald-100 px-4 py-4 text-center font-mono font-black text-emerald-900 border-l border-emerald-200">
                      {row.grandTotal.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>{" "}
              Boys
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>{" "}
              Girls
            </span>
          </div>
          <p>Swipe to explore phases ↔</p>
        </div>
      </div>
    </div>
  );
};

export default GenderWiseReport;
