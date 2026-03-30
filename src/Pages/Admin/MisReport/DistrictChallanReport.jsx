import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FileText,
  Users,
  Info,
  ArrowLeft,
  Bike,
  CircleUserRound,
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

const DistrictChallanReport = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Memoized totals for the summary cards and grand total row
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        challans: acc.challans + (Number(val.no_of_challan) || 0),
        boys: acc.boys + (Number(val.boys) || 0),
        girls: acc.girls + (Number(val.girls) || 0),
        cycles: acc.cycles + (Number(val.total) || 0),
      }),
      { challans: 0, boys: 0, girls: 0, cycles: 0 },
    );
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `challanMisReportPhaseWise`, {
        phaseId: phaseId,
      });
      if (response.error) {
        toast.error(`Failed to fetch data: ${response.message}`);
      } else {
        setData(response.data || []);
      }
    } catch (err) {
      toast.error(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  return (
    <AdminAuthenticatedLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 mb-4 text-sm font-bold transition-all group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              District Wise{" "}
              <span className="text-indigo-500">Challan Report</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              Phase {phaseDetails.phaseName} • Academic Year {phaseDetails.year}
            </p>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Total Challans"
            value={totals.challans}
            icon={FileText}
            color="text-blue-500"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Boys Cycles"
            value={totals.boys}
            icon={CircleUserRound}
            color="text-sky-500"
            bg="bg-sky-50 dark:bg-sky-900/20"
          />
          <StatMiniCard
            title="Girls Cycles"
            value={totals.girls}
            icon={Users}
            color="text-rose-500"
            bg="bg-rose-50 dark:bg-rose-900/20"
          />
          <StatMiniCard
            title="Grand Total Cycles"
            value={totals.cycles}
            icon={Bike}
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800">
                    #
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800">
                    District
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Challans Issued
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center text-sky-500">
                    Boys Cycles
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center text-rose-400">
                    Girls Cycles
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10 text-indigo-600">
                    Total Cycles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-12 text-center text-slate-400 font-medium italic"
                    >
                      No challan records available for this phase.
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-5 text-xs font-bold text-slate-300 text-center">
                          {index + 1}
                        </td>
                        <td className="p-5">
                          <Link
                            to={`/BlockChallanReport/${btoa(value.district_id)}`}
                            className="text-sm font-black text-slate-700 dark:text-slate-200 hover:text-indigo-500 flex items-center gap-2"
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.no_of_challan}
                        </td>
                        <td className="p-5 text-center text-xs font-bold text-sky-600">
                          {value.boys}
                        </td>
                        <td className="p-5 text-center text-xs font-bold text-rose-500/80">
                          {value.girls}
                        </td>
                        <td className="p-5 text-center text-sm font-black text-indigo-600 bg-indigo-50/5">
                          {value.total}
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td
                        colSpan="2"
                        className="p-6 text-xs uppercase tracking-widest text-right"
                      >
                        Grand Total
                      </td>
                      <td className="p-5 text-center">{totals.challans}</td>
                      <td className="p-5 text-center text-sky-400 dark:text-sky-600">
                        {totals.boys}
                      </td>
                      <td className="p-5 text-center text-rose-400 dark:text-rose-600">
                        {totals.girls}
                      </td>
                      <td className="p-5 text-center text-lg bg-indigo-600 text-white">
                        {totals.cycles}
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
};

const StatMiniCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
    <div className={`p-4 rounded-2xl ${bg} ${color}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <p className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1">
        {Number(value).toLocaleString()}
      </p>
    </div>
  </div>
);

export default DistrictChallanReport;
