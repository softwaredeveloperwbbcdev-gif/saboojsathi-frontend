import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  ArrowLeft,
  Clock,
  BarChart3,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const DistrictWiseReport = () => {
  const generatedTime = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const [loading, setLoading] = useState(false);
  const [districtData, setDistrictData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      // Added phaseId to the post request payload
      const response = await axios.post(
        `http://${host}:8000/api/districtWiseDistributionReportWeb`,
      );

      if (response.data.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        const transformedData = response.data.map((item) => {
          const phases = [
            parseInt(item.total_p1 || 0),
            parseInt(item.total_p2 || 0),
            parseInt(item.total_p3 || 0),
            parseInt(item.total_p4 || 0),
            parseInt(item.total_p5 || 0),
            parseInt(item.total_p6 || 0),
            parseInt(item.total_p7 || 0),
            parseInt(item.total_p8 || 0),
            parseInt(item.total_p9 || 0),
            parseInt(item.total_p10 || 0),
            parseInt(item.total_p11 || 0),
            parseInt(item.total_p12 || 0),
          ];

          return {
            name: item.district_name,
            phases: phases,
            total: phases.reduce((a, b) => a + b, 0),
          };
        });
        console.log(transformedData);
        setDistrictData(transformedData);
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

  const districtRows = districtData.map((d) => ({
    ...d,
    total: d.phases.reduce((a, b) => a + b, 0),
  }));

  const phaseTotals = Array(12).fill(0);
  districtData.forEach((row) => {
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

  const downloadExcel = async () => {
    setLoading(true);
    const host = window.location.hostname;
    try {
      const response = await axios({
        url: `http://${host}:8000/api/districtWiseDistributionReportWeb`,
        method: "POST",
        responseType: "blob",
        data: { download: 1 },
      });

      // 1. Create a URL for the blob data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      // 2. Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;

      // 3. Set the file name
      link.setAttribute("download", `District_Wise_Report.xlsx`);

      // 4. Append, trigger click, and cleanup
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started successfully");
    } catch (err) {
      // Axios puts the error details in err.response
      const errorMessage =
        err.response?.data?.message || "Unexpected download error.";
      toast.error(errorMessage);
      console.error("Download Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-yellow-400 text-emerald-950 px-6 py-3 rounded-xl font-black shadow-lg hover:bg-yellow-300 transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            <Download size={18} /> Export Excel
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
