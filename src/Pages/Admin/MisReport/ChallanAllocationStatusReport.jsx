import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FileCheck,
  Clock,
  AlertCircle,
  Info,
  ArrowRight,
  TrendingUp,
  ArrowLeft,
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

const ChallanAllocationStatusReport = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Optimized: Single pass reduction for all totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        reqB: acc.reqB + (Number(val.request_sent_boys) || 0),
        reqG: acc.reqG + (Number(val.request_sent_girls) || 0),
        reqT: acc.reqT + (Number(val.request_sent) || 0),
        appB: acc.appB + (Number(val.approved_boys) || 0),
        appG: acc.appG + (Number(val.approved_girls) || 0),
        appT: acc.appT + (Number(val.approved) || 0),
        rejB: acc.rejB + (Number(val.rejected_boys) || 0),
        rejG: acc.rejG + (Number(val.rejected_girls) || 0),
        rejT: acc.rejT + (Number(val.rejected) || 0),
        penB: acc.penB + (Number(val.pending_boys) || 0),
        penG: acc.penG + (Number(val.pending_girls) || 0),
        penT: acc.penT + (Number(val.pending) || 0),
        alcB: acc.alcB + (Number(val.allocated_boys) || 0),
        alcG: acc.alcG + (Number(val.allocated_girls) || 0),
        alcT: acc.alcT + (Number(val.allocated) || 0),
        pAlcB: acc.pAlcB + (Number(val.pending_allocation_boys) || 0),
        pAlcG: acc.pAlcG + (Number(val.pending_allocation_girls) || 0),
        pAlcT: acc.pAlcT + (Number(val.pending_allocation) || 0),
      }),
      {
        reqB: 0,
        reqG: 0,
        reqT: 0,
        appB: 0,
        appG: 0,
        appT: 0,
        rejB: 0,
        rejG: 0,
        rejT: 0,
        penB: 0,
        penG: 0,
        penT: 0,
        alcB: 0,
        alcG: 0,
        alcT: 0,
        pAlcB: 0,
        pAlcG: 0,
        pAlcT: 0,
      },
    );
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `challanAllocationStatusReport`, {
        phaseId: phaseId,
      });
      if (response.error) {
        toast.error(`Error: ${response.message}`);
      } else {
        setData(response.data || []);
      }
    } catch (err) {
      toast.error(`Unexpected error: ${err}`);
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
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            e-Challan &{" "}
            <span className="text-indigo-600">Allocation Status</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
            <Info size={16} className="text-indigo-500" />
            Phase {phaseDetails.phaseName} • District-wise Progression
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Total Requests"
            value={totals.reqT}
            icon={TrendingUp}
            color="text-blue-600"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Generated"
            value={totals.appT}
            icon={FileCheck}
            color="text-emerald-600"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
          <StatMiniCard
            title="Pending Approval"
            value={totals.penT}
            icon={Clock}
            color="text-amber-600"
            bg="bg-amber-50 dark:bg-amber-900/20"
          />
          <StatMiniCard
            title="Allocation Pending"
            value={totals.pAlcT}
            icon={AlertCircle}
            color="text-rose-600"
            bg="bg-rose-50 dark:bg-rose-900/20"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800"
                  >
                    #
                  </th>
                  <th
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800"
                  >
                    District
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-blue-50/30 dark:bg-blue-900/10"
                  >
                    Requested
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-emerald-50/30 dark:bg-emerald-900/10"
                  >
                    Generated
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-rose-50/30 dark:bg-rose-900/10"
                  >
                    Rejected
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-amber-50/30 dark:bg-amber-900/10"
                  >
                    Pending
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10"
                  >
                    Allocated
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-slate-100/50 dark:bg-slate-700/50"
                  >
                    P-Allocation
                  </th>
                </tr>
                <tr className="bg-slate-50/30 dark:bg-slate-800/30 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {/* B G T pairs for all 6 categories */}
                  {[...Array(6)].map((_, i) => (
                    <>
                      <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center text-xs font-medium">
                        B
                      </th>
                      <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center text-xs font-medium">
                        G
                      </th>
                      <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600 dark:text-slate-300">
                        T
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="20"
                      className="p-12 text-center text-slate-400 font-medium italic"
                    >
                      No progression data available
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 text-xs font-bold text-slate-300 text-center">
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <Link
                            to={`/ChallanAllocationStatusBlockReport/${btoa(value.dist_id_pk)}`}
                            className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 transition-colors"
                          >
                            {value.district_name}
                            <ArrowRight
                              size={12}
                              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            />
                          </Link>
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.request_sent_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.request_sent_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-blue-600 bg-blue-50/20">
                          {value.request_sent}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.approved_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.approved_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-emerald-600 bg-emerald-50/20">
                          {value.approved}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.rejected_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.rejected_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-rose-600 bg-rose-50/20">
                          {value.rejected}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.pending_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.pending_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-amber-600 bg-amber-50/20">
                          {value.pending}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.allocated_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.allocated_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-indigo-600 bg-indigo-50/20">
                          {value.allocated}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.pending_allocation_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.pending_allocation_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-slate-600 bg-slate-50/50">
                          {value.pending_allocation}
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td
                        colSpan="2"
                        className="p-5 text-[10px] uppercase tracking-widest text-right"
                      >
                        Totals
                      </td>
                      <td className="p-3 text-center text-xs">{totals.reqB}</td>
                      <td className="p-3 text-center text-xs">{totals.reqG}</td>
                      <td className="p-3 text-center text-xs bg-blue-600 text-white">
                        {totals.reqT}
                      </td>

                      <td className="p-3 text-center text-xs">{totals.appB}</td>
                      <td className="p-3 text-center text-xs">{totals.appG}</td>
                      <td className="p-3 text-center text-xs bg-emerald-600 text-white">
                        {totals.appT}
                      </td>

                      <td className="p-3 text-center text-xs">{totals.rejB}</td>
                      <td className="p-3 text-center text-xs">{totals.rejG}</td>
                      <td className="p-3 text-center text-xs bg-rose-600 text-white">
                        {totals.rejT}
                      </td>

                      <td className="p-3 text-center text-xs">{totals.penB}</td>
                      <td className="p-3 text-center text-xs">{totals.penG}</td>
                      <td className="p-3 text-center text-xs bg-amber-600 text-white">
                        {totals.penT}
                      </td>

                      <td className="p-3 text-center text-xs">{totals.alcB}</td>
                      <td className="p-3 text-center text-xs">{totals.alcG}</td>
                      <td className="p-3 text-center text-xs bg-indigo-600 text-white">
                        {totals.alcT}
                      </td>

                      <td className="p-3 text-center text-xs">
                        {totals.pAlcB}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.pAlcG}
                      </td>
                      <td className="p-3 text-center text-xs bg-slate-500 text-white">
                        {totals.pAlcT}
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

// Internal Sub-component
const StatMiniCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
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

export default ChallanAllocationStatusReport;
