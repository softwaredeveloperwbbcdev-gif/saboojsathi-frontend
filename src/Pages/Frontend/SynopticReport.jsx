import React, { useEffect, useState } from "react";
import { FileSpreadsheet, ArrowLeft, Download, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
const SynopticReport = () => {
  // Logic to get current Date and Time
  const generatedTime = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      // Added phaseId to the post request payload
      const response = await axios.post(
        `http://${host}:8000/api/synopticReportWeb`,
      );

      if (response.data.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        console.log(response.data);
        setReportData(response.data);
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

  const downloadExcel = async () => {
    setLoading(true);
    const host = window.location.hostname;
    try {
      const response = await axios({
        url: `http://${host}:8000/api/synopticReportWeb`,
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
      link.setAttribute("download", `Synoptic_report.xlsx`);

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

  const totalReceived = reportData.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      {/* Header Area - Matching Social Group Style */}
      <div className="bg-[#065f46] pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 uppercase">
              Synoptic <span className="text-yellow-400">Report</span>
            </h1>
            <p className="text-emerald-100/80 text-xs font-medium flex items-center justify-center md:justify-start gap-2">
              <Clock size={14} /> Generated on: {generatedTime}
            </p>
          </div>
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-yellow-400 text-emerald-950 px-6 py-3 rounded-xl font-black shadow-lg hover:bg-yellow-300 transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            <FileSpreadsheet size={18} /> Export Excel
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        {/* Simple Table Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-6 py-5 font-black border-r border-white/5">
                    Year
                  </th>
                  <th className="px-6 py-5 font-black border-r border-white/5">
                    Phase
                  </th>
                  <th className="px-6 py-5 font-black border-r border-white/5">
                    Eligible Students
                  </th>
                  <th className="px-6 py-5 text-right font-black">
                    Received Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {reportData.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-emerald-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5 font-bold text-emerald-800 bg-gray-50/30 group-hover:bg-transparent">
                      {row.year}
                    </td>
                    <td className="px-6 py-5 font-extrabold text-gray-500 text-xs uppercase">
                      {row.phase_name}
                    </td>
                    <td className="px-6 py-5 text-gray-600 leading-relaxed max-w-md font-medium">
                      {row.eligible_students}
                    </td>
                    <td className="px-6 py-5 text-right font-black text-gray-900 font-mono text-base">
                      {row.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Grand Total Footer */}
              <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                <tr className="font-black text-gray-900">
                  <td
                    colSpan="3"
                    className="px-6 py-6 text-right uppercase tracking-[0.15em] text-xs"
                  >
                    Grand Total Count
                  </td>
                  <td className="px-6 py-6 text-right text-emerald-800 text-xl font-mono decoration-yellow-400 decoration-2 underline underline-offset-8">
                    {totalReceived.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Info Note - Simplified */}
        <div className="mt-8 flex items-center gap-3 justify-center">
          <div className="h-[1px] bg-gray-200 flex-grow"></div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Download size={14} className="text-emerald-600" />
            Localized Server Time (IST)
          </div>
          <div className="h-[1px] bg-gray-200 flex-grow"></div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default SynopticReport;
