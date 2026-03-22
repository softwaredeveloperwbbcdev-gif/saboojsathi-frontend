import React from "react";
import {
  FileSpreadsheet,
  ArrowLeft,
  Clock,
  BarChart3,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const DistrictWiseReport = () => {
  const generatedTime = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const districtData = [
    {
      name: "ALIPURDUAR",
      phases: [
        49864, 24938, 43417, 20719, 20804, 21847, 16381, 19444, 19558, 18892,
        15315, 289,
      ],
    },
    {
      name: "BANKURA",
      phases: [
        106711, 56969, 114920, 56616, 58813, 60435, 34592, 53283, 52834, 52598,
        44356, 535,
      ],
    },
    {
      name: "BIRBHUM",
      phases: [
        121964, 25509, 104121, 53018, 53665, 54579, 35707, 55005, 54376, 52348,
        46276, 1803,
      ],
    },
    {
      name: "COOCH BIHAR",
      phases: [
        100653, 54989, 95407, 45402, 46711, 47987, 33241, 42501, 45525, 43960,
        35649, 43,
      ],
    },
    {
      name: "DAKSHIN DINAJPUR",
      phases: [
        45000, 22000, 41000, 20000, 21000, 22000, 15000, 18000, 19000, 17000,
        14000, 100,
      ],
    },
    {
      name: "DARJEELING",
      phases: [
        32000, 15000, 30000, 14000, 15000, 16000, 11000, 12000, 13000, 12000,
        10000, 50,
      ],
    },
    {
      name: "HOOGHLY",
      phases: [
        95000, 48000, 92000, 46000, 47000, 49000, 31000, 44000, 45000, 43000,
        36000, 400,
      ],
    },
    {
      name: "HOWRAH",
      phases: [
        88000, 44000, 85000, 42000, 43000, 45000, 29000, 41000, 42000, 40000,
        33000, 350,
      ],
    },
    {
      name: "JALPAIGURI",
      phases: [
        55000, 27000, 52000, 25000, 26000, 27000, 18000, 24000, 25000, 23000,
        19000, 200,
      ],
    },
  ];

  const districtRows = districtData.map((d) => ({
    ...d,
    total: d.phases.reduce((a, b) => a + b, 0),
  }));

  const phaseTotals = Array(12).fill(0);
  districtRows.forEach((row) => {
    row.phases.forEach((val, i) => (phaseTotals[i] += val));
  });

  const grandTotal = districtRows.reduce((sum, row) => sum + row.total, 0);
  const phasesLabels = [
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
      {/* Refined Header */}
      <div className="bg-[#065f46] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-emerald-200 hover:text-white flex items-center justify-center md:justify-start gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              District Wise <span className="text-yellow-400">Stats</span>
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-emerald-100/70 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> Generated: {generatedTime}
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 size={12} /> Statewide:{" "}
                {grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-[#065f46] px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest active:scale-95">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      {/* Modern Table Layout */}
      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.15em]">
                  <th className="px-6 py-5 font-black sticky left-0 z-10 bg-gray-900 border-r border-white/5">
                    District Name
                  </th>
                  {phasesLabels.map((p) => (
                    <th key={p} className="px-4 py-5 text-center font-black">
                      Ph {p}
                    </th>
                  ))}
                  <th className="px-6 py-5 text-right font-black sticky right-0 z-10 bg-gray-900 border-l border-white/5">
                    Grand Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {districtRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-emerald-50/40 transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-gray-800 sticky left-0 z-10 bg-white group-hover:bg-[#f8fafc] border-r border-gray-50">
                      {row.name}
                    </td>
                    {row.phases.map((val, pIdx) => (
                      <td
                        key={pIdx}
                        className="px-4 py-4 text-center font-mono text-gray-500 text-xs"
                      >
                        {val.toLocaleString("en-IN")}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right font-black text-emerald-700 sticky right-0 z-10 bg-gray-50/80 group-hover:bg-emerald-100 border-l border-gray-100 font-mono">
                      {row.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-900 text-white border-t-2 border-yellow-400">
                <tr className="font-black text-[10px] uppercase tracking-widest">
                  <td className="px-6 py-6 sticky left-0 z-10 bg-gray-900 border-r border-white/5">
                    State Totals
                  </td>
                  {phaseTotals.map((t, i) => (
                    <td
                      key={i}
                      className="px-4 py-6 text-center font-mono text-xs"
                    >
                      {t.toLocaleString("en-IN")}
                    </td>
                  ))}
                  <td className="px-6 py-6 text-right text-yellow-400 text-base font-mono sticky right-0 z-10 bg-gray-900 border-l border-white/5 underline underline-offset-8 decoration-2">
                    {grandTotal.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2">
          <p>Total Districts: {districtData.length}</p>
          <p>Scroll horizontally for phases ↔</p>
        </div>
      </div>
    </div>
  );
};

export default DistrictWiseReport;
