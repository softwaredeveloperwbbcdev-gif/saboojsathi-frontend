import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Download,
  School,
  Users,
  ArrowLeft,
  Info,
  CheckCircle2,
} from "lucide-react";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { usePhaseStore } from "../../../Store/phaseStore";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function EligibleStudentReportSchool() {
  const { id } = useParams(); // Block ID from URL
  const phaseId = usePhaseStore((state) => state.phaseId);
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Memoized calculations for stat cards and footer
  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => ({
        boys: acc.boys + (Number(curr.eligible_students_class_ix_boys) || 0),
        girls: acc.girls + (Number(curr.eligible_students_class_ix_girls) || 0),
        total: acc.total + (Number(curr.eligible_students_class_ix_total) || 0),
      }),
      { boys: 0, girls: 0, total: 0 },
    );
  }, [data]);

  const fetchData = async () => {
    if (!phaseId || !id) return;
    setLoading(true);
    try {
      const response = await callApi("POST", `studentEligibiltyRoport`, {
        phaseId: phaseId,
        blockId: id,
      });
      if (response.error) {
        toast.error(`Failed to fetch: ${response.message}`);
      } else {
        setData(response.data || []);
      }
    } catch (err) {
      toast.error(`Connection Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [phaseId, id]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `repo-schoolwise-eligible-student-download`,
        { phaseId, id },
        { responseType: "blob" },
      );

      if (response.error) {
        toast.error(`Download failed: ${response.message}`);
      } else {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
        const filename = `School_Wise_Eligible_Students_Phase_${phaseDetails.phaseName}_${phaseDetails.year}_${timestamp}.xlsx`;

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Report downloaded successfully");
      }
    } catch (err) {
      toast.error("Unexpected download error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link
              to={-1}
              className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 mb-2 text-sm font-bold transition-all"
            >
              <ArrowLeft size={16} /> Back to Blocks
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              School Wise{" "}
              <span className="text-indigo-500">Eligible Students</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-400" /> Phase{" "}
              {phaseDetails.phaseName} • Academic Year {phaseDetails.year}
            </p>
          </div>

          {data.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-2xl font-bold shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all active:scale-95"
            >
              <Download size={18} /> Download Excel
            </button>
          )}
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Total Schools"
            value={data.length}
            icon={School}
            color="text-blue-500"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Eligible Boys"
            value={totals.boys}
            icon={Users}
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Eligible Girls"
            value={totals.girls}
            icon={Users}
            color="text-rose-500"
            bg="bg-rose-50 dark:bg-rose-900/20"
          />
          <StatMiniCard
            title="Total Eligible"
            value={totals.boys + totals.girls}
            icon={CheckCircle2}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-400">
                    #
                  </th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-400">
                    School Name
                  </th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-400 text-center">
                    Boys
                  </th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-400 text-center">
                    Girls
                  </th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-400 text-right">
                    Total Students
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-10 text-center text-slate-400 italic font-medium"
                    >
                      No records found for this block.
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-5 text-sm font-bold text-slate-400">
                          {index + 1}
                        </td>
                        <td className="p-5">
                          <span className="text-sm font-black text-slate-700 dark:text-slate-200 transition-colors">
                            {item.school_name}
                          </span>
                        </td>
                        <td className="p-5 text-sm text-center font-semibold text-indigo-600 dark:text-indigo-400">
                          {item.eligible_students_class_ix_boys?.toLocaleString()}
                        </td>
                        <td className="p-5 text-sm text-center font-semibold text-rose-600 dark:text-rose-400">
                          {item.eligible_students_class_ix_girls?.toLocaleString()}
                        </td>
                        <td className="p-5 text-sm text-right font-black text-slate-900 dark:text-white">
                          {item.eligible_students_class_ix_total?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Footer Row */}
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-t-2 border-slate-100 dark:border-slate-700">
                      <td
                        colSpan="2"
                        className="p-6 text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest text-right"
                      >
                        Total
                      </td>
                      <td className="p-6 text-center text-base font-black text-indigo-600 dark:text-indigo-400">
                        {totals.boys.toLocaleString()}
                      </td>
                      <td className="p-6 text-center text-base font-black text-rose-600 dark:text-rose-400">
                        {totals.girls.toLocaleString()}
                      </td>
                      <td className="p-6 text-right text-lg font-black text-slate-900 dark:text-white">
                        {totals.total.toLocaleString()}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {loading && <Loader />}
      </div>

      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
    </AdminAuthenticatedLayout>
  );
}

const StatMiniCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-indigo-500 transition-all">
    <div
      className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}
    >
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <p className="text-xl font-black text-slate-900 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  </div>
);

export default EligibleStudentReportSchool;
