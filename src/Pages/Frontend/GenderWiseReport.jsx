import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Clock, Users, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const GenderWiseReport = () => {
  const generatedTime = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const [loading, setLoading] = useState(false);
  const [genderData, setGenderData] = useState([]);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      // Added phaseId to the post request payload
      const response = await axios.post(
        `http://${host}:8000/api/genderWiseDistributionWeb`,
      );

      if (response.data.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        console.log(response.data);
        setGenderData(response.data);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totals = genderData.reduce((acc, curr) => {
    // Initialize or add to the district totals for each phase
    phaseLabels.forEach((_, i) => {
      const p = i + 1;
      acc[`boys_p${p}`] =
        (acc[`boys_p${p}`] || 0) + (Number(curr[`boys_total_p${p}`]) || 0);
      acc[`girls_p${p}`] =
        (acc[`girls_p${p}`] || 0) + (Number(curr[`girls_total_p${p}`]) || 0);
      acc[`total_p${p}`] =
        (acc[`total_p${p}`] || 0) + (Number(curr[`total_p${p}`]) || 0);
    });

    // Calculate row-level totals for the grand totals column
    const rowBoys = phaseLabels.reduce(
      (sum, _, i) => sum + (Number(curr[`boys_total_p${i + 1}`]) || 0),
      0,
    );
    const rowGirls = phaseLabels.reduce(
      (sum, _, i) => sum + (Number(curr[`girls_total_p${i + 1}`]) || 0),
      0,
    );
    const rowTotal = phaseLabels.reduce(
      (sum, _, i) => sum + (Number(curr[`total_p${i + 1}`]) || 0),
      0,
    );

    acc.grandBoys = (acc.grandBoys || 0) + rowBoys;
    acc.grandGirls = (acc.grandGirls || 0) + rowGirls;
    acc.grandTotal = (acc.grandTotal || 0) + rowTotal;

    return acc;
  }, {});

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
          <div className="overflow-x-auto overflow-y-auto">
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
                      {row.district_name}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p1}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p1}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p1}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p2}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p2}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p2}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p3}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p3}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p3}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p4}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p4}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p4}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p5}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p5}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p5}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p6}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p6}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p6}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p7}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p7}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p7}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p8}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p8}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p8}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p9}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p9}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p9}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p10}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p10}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p10}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p11}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p11}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p11}
                    </td>

                    <td className="px-3 py-4 text-center font-mono text-blue-600/70">
                      {row.boys_total_p12}
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-pink-600/70">
                      {row.girls_total_p12}
                    </td>
                    <td className="px-3 py-4 text-center font-mono font-bold text-gray-800 bg-gray-50/50 group-hover:bg-transparent border-r border-gray-50">
                      {row.total_p12}
                    </td>

                    <td className="sticky right-[120px] z-20 bg-white group-hover:bg-[#f8fafc] px-3 py-4 text-center font-mono font-bold text-blue-800 border-l border-gray-100">
                      {Number(row.boys_total_p1) +
                        Number(row.boys_total_p2) +
                        Number(row.boys_total_p3) +
                        Number(row.boys_total_p4) +
                        Number(row.boys_total_p5) +
                        Number(row.boys_total_p6) +
                        Number(row.boys_total_p7) +
                        Number(row.boys_total_p8) +
                        Number(row.boys_total_p9) +
                        Number(row.boys_total_p10) +
                        Number(row.boys_total_p11) +
                        Number(row.boys_total_p12)}
                    </td>
                    <td className="sticky right-[60px] z-20 bg-white group-hover:bg-[#f8fafc] px-3 py-4 text-center font-mono font-bold text-pink-800 border-l border-gray-100">
                      {Number(row.girls_total_p1) +
                        Number(row.girls_total_p2) +
                        Number(row.girls_total_p3) +
                        Number(row.girls_total_p4) +
                        Number(row.girls_total_p5) +
                        Number(row.girls_total_p6) +
                        Number(row.girls_total_p7) +
                        Number(row.girls_total_p8) +
                        Number(row.girls_total_p9) +
                        Number(row.girls_total_p10) +
                        Number(row.girls_total_p11) +
                        Number(row.girls_total_p12)}
                    </td>
                    <td className="sticky right-0 z-20 bg-emerald-50 group-hover:bg-emerald-100 px-4 py-4 text-center font-mono font-black text-emerald-900 border-l border-emerald-200">
                      {Number(row.total_p1) +
                        Number(row.total_p2) +
                        Number(row.total_p3) +
                        Number(row.total_p4) +
                        Number(row.total_p5) +
                        Number(row.total_p6) +
                        Number(row.total_p7) +
                        Number(row.total_p8) +
                        Number(row.total_p9) +
                        Number(row.total_p10) +
                        Number(row.total_p11) +
                        Number(row.total_p12)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-900 text-white font-mono text-xs">
                <tr>
                  <td className="sticky left-0 z-30 bg-gray-900 px-6 py-4 font-black uppercase">
                    Grand Total
                  </td>
                  {phaseLabels.map((_, i) => (
                    <React.Fragment key={i}>
                      <td className="px-3 py-4 text-center font-bold text-blue-400">
                        {totals[`boys_p${i + 1}`]?.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-4 text-center font-bold text-pink-400">
                        {totals[`girls_p${i + 1}`]?.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-4 text-center font-bold text-emerald-400">
                        {totals[`total_p${i + 1}`]?.toLocaleString("en-IN")}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="sticky right-[120px] z-30 bg-gray-900 px-3 py-4 text-center font-bold text-blue-400 border-l border-white/10">
                    {totals.grandBoys?.toLocaleString("en-IN")}
                  </td>
                  <td className="sticky right-[60px] z-30 bg-gray-900 px-3 py-4 text-center font-bold text-pink-400 border-l border-white/10">
                    {totals.grandGirls?.toLocaleString("en-IN")}
                  </td>
                  <td className="sticky right-0 z-30 bg-emerald-900 px-4 py-4 text-center font-black text-yellow-400 border-l border-white/10">
                    {totals.grandTotal?.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
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
      {loading && <Loader />}
    </div>
  );
};

export default GenderWiseReport;
