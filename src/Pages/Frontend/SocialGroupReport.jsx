import React, { useState } from "react";
import { ArrowLeft, Search, FileSpreadsheet, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const SocialGroupReport = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Real-time timestamp
  const generatedOn = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const socialData = [
    { name: "ALIPURDUAR", sc: 209, st: 19, obc: 78, general: 69, minority: 45 },
    { name: "BANKURA", sc: 208, st: 71, obc: 79, general: 153, minority: 227 },
    {
      name: "BIRBHUM",
      sc: 1039,
      st: 103,
      obc: 58,
      general: 404,
      minority: 693,
    },
    {
      name: "COOCH BIHAR",
      sc: 150,
      st: 0,
      obc: 11,
      general: 24,
      minority: 209,
    },
    {
      name: "DAKSHIN DINAJPUR",
      sc: 190,
      st: 147,
      obc: 20,
      general: 170,
      minority: 171,
    },
    { name: "HOOGHLY", sc: 475, st: 67, obc: 60, general: 505, minority: 263 },
    { name: "HOWRAH", sc: 131, st: 2, obc: 14, general: 244, minority: 531 },
    { name: "JALPAIGURI", sc: 222, st: 69, obc: 18, general: 27, minority: 75 },
    { name: "JHARGRAM", sc: 17, st: 24, obc: 16, general: 27, minority: 22 },
  ];

  const filteredData = socialData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totals = filteredData.reduce(
    (acc, curr) => ({
      sc: acc.sc + curr.sc,
      st: acc.st + curr.st,
      obc: acc.obc + curr.obc,
      gen: acc.gen + curr.general,
      min: acc.min + curr.minority,
      grand:
        acc.grand +
        (curr.sc + curr.st + curr.obc + curr.general + curr.minority),
    }),
    { sc: 0, st: 0, obc: 0, gen: 0, min: 0, grand: 0 },
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      {/* Header Area */}
      <div className="bg-[#065f46] pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Social Group Wise Report
            </h1>
            {/* GENERATED ON TIMESTAMP */}
            <p className="text-emerald-100/80 text-xs font-medium flex items-center justify-center md:justify-start gap-2">
              <Clock size={14} /> Generated on: {generatedOn}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-yellow-400 text-emerald-950 px-6 py-3 rounded-xl font-black shadow-lg hover:bg-yellow-300 transition-all text-xs uppercase tracking-widest">
            <FileSpreadsheet size={18} /> Export Excel
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        {/* Simple Search */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-6 border border-gray-100">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search district name..."
              className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none font-bold text-gray-700 bg-gray-50/50"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Clean Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-6 py-5 font-black">District</th>
                  <th className="px-6 py-5 text-center">SC</th>
                  <th className="px-6 py-5 text-center">ST</th>
                  <th className="px-6 py-5 text-center">OBC</th>
                  <th className="px-6 py-5 text-center">General</th>
                  <th className="px-6 py-5 text-center">Minority</th>
                  <th className="px-6 py-5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredData.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {row.sc}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {row.st}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {row.obc}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {row.general}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {row.minority}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-emerald-700">
                      {(
                        row.sc +
                        row.st +
                        row.obc +
                        row.general +
                        row.minority
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Grand Total Footer */}
              <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                <tr className="font-black text-gray-900 text-sm">
                  <td className="px-6 py-6 uppercase tracking-widest">
                    Grand Total
                  </td>
                  <td className="px-6 py-6 text-center font-mono">
                    {totals.sc.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-6 text-center font-mono">
                    {totals.st.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-6 text-center font-mono">
                    {totals.obc.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-6 text-center font-mono">
                    {totals.gen.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-6 text-center font-mono">
                    {totals.min.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-6 text-right text-emerald-800 text-lg font-mono">
                    {totals.grand.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          End of Social Group Wise Report
        </p>
      </div>
    </div>
  );
};

export default SocialGroupReport;
