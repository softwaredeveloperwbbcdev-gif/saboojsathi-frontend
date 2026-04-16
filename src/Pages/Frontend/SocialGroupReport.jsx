import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Search,
  FileSpreadsheet,
  Clock,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const phases = [
  { phaseId: 1, Phase: "Phase I" },
  { phaseId: 2, Phase: "Phase II" },
  { phaseId: 3, Phase: "Phase III" },
  { phaseId: 5, Phase: "Phase IV" },
  { phaseId: 6, Phase: "Phase V" },
  { phaseId: 7, Phase: "Phase VI" },
  { phaseId: 8, Phase: "Phase VII" },
  { phaseId: 9, Phase: "Phase VIII" },
  { phaseId: 10, Phase: "Phase IX" },
  { phaseId: 11, Phase: "Phase X" },
  { phaseId: 12, Phase: "Phase XI" },
  { phaseId: 13, Phase: "Phase XII" },
];

const SocialGroupReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialData, setSocialData] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(btoa(13)); // Default Phase XII

  const generatedOn = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      // Added phaseId to the post request payload
      const response = await axios.post(
        `http://${host}:8000/api/catagoryWiseDistributionReportWeb`,
        { phaseId: selectedPhase },
      );

      if (response.data.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        setSocialData(response.data);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Triggers fetchData whenever selectedPhase changes
  useEffect(() => {
    fetchData();
  }, [selectedPhase]);

  const filteredData = socialData.filter((item) =>
    item.district_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totals = filteredData.reduce(
    (acc, curr) => ({
      sc: acc.sc + (Number(curr.sc_total) || 0),
      st: acc.st + (Number(curr.st_total) || 0),
      obc: acc.obc + (Number(curr.obc_total) || 0),
      gen: acc.gen + (Number(curr.gen_total) || 0),
      min: acc.min + (Number(curr.mi_total) || 0),
      grand:
        acc.grand +
        ((Number(curr.sc_total) || 0) +
          (Number(curr.st_total) || 0) +
          (Number(curr.obc_total) || 0) +
          (Number(curr.gen_total) || 0) +
          (Number(curr.mi_total) || 0)),
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
        {/* Filters Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search Input */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
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

          {/* Phase Select Input */}
          <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
            <div className="relative">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                size={20}
              />
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none font-bold text-gray-700 bg-emerald-50/30 appearance-none cursor-pointer"
              >
                {phases.map((p) => (
                  <option key={btoa(p.phaseId)} value={btoa(p.phaseId)}>
                    {p.Phase}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Area */}
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
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {row.district_name}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-600">
                        {row.sc_total}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-600">
                        {row.st_total}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-600">
                        {row.obc_total}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-600">
                        {row.gen_total}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-600">
                        {row.mi_total}
                      </td>
                      <td className="px-6 py-4 text-right font-black text-emerald-700">
                        {(
                          (Number(row.sc_total) || 0) +
                          (Number(row.st_total) || 0) +
                          (Number(row.obc_total) || 0) +
                          (Number(row.gen_total) || 0) +
                          (Number(row.mi_total) || 0)
                        ).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-gray-400 font-medium"
                    >
                      No records found for the selected phase.
                    </td>
                  </tr>
                )}
              </tbody>
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

        <p className="text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          End of Social Group Wise Report
        </p>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default SocialGroupReport;
