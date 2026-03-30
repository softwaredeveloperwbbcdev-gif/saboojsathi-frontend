import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for the back button
import { toast } from "react-toastify";
import {
  FileText,
  ClipboardCheck,
  CheckCircle2,
  Info,
  Building2,
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

const ChallanGenerationReport = () => {
  const navigate = useNavigate();
  const phaseId = usePhaseStore((state) => state.phaseId);
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        musterRoll:
          acc.musterRoll + (Number(val.total_muster_roll_generated) || 0),
        challanIssued: acc.challanIssued + (Number(val.total_allocation) || 0),
        uploaded: acc.uploaded + (Number(val.total_updated) || 0),
        boysMuster:
          acc.boysMuster + (Number(val.boys_muster_roll_generated) || 0),
        girlsMuster:
          acc.girlsMuster + (Number(val.girls_muster_roll_generated) || 0),
        boysAlloc: acc.boysAlloc + (Number(val.boys_allocation) || 0),
        girlsAlloc: acc.girlsAlloc + (Number(val.girls_allocation) || 0),
        boysUpdated: acc.boysUpdated + (Number(val.boys_updated) || 0),
        girlsUpdated: acc.girlsUpdated + (Number(val.girls_updated) || 0),
      }),
      {
        musterRoll: 0,
        challanIssued: 0,
        uploaded: 0,
        boysMuster: 0,
        girlsMuster: 0,
        boysAlloc: 0,
        girlsAlloc: 0,
        boysUpdated: 0,
        girlsUpdated: 0,
      },
    );
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `challanGenerationReport`, {
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

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Challan <span className="text-indigo-500">Generation Report</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
            <Info size={16} className="text-indigo-500" />
            Phase {phaseDetails.phaseName} • Data Overview
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatMiniCard
            title="Muster Roll Generated"
            value={totals.musterRoll}
            icon={ClipboardCheck}
            color="text-amber-500"
            bg="bg-amber-50 dark:bg-amber-900/20"
          />
          <StatMiniCard
            title="Challans Issued"
            value={totals.challanIssued}
            icon={FileText}
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Records Uploaded"
            value={totals.uploaded}
            icon={CheckCircle2}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
        </div>

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
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800"
                  >
                    Supplier Name
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-amber-50/30 dark:bg-amber-900/10"
                  >
                    Muster Roll
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10"
                  >
                    Challan Issued
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-emerald-50/30 dark:bg-emerald-900/10"
                  >
                    Uploaded
                  </th>
                </tr>
                <tr className="bg-slate-50/30 dark:bg-slate-800/30 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    B
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    G
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600">
                    Total
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    B
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    G
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600">
                    Total
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    B
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    G
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="12"
                      className="p-12 text-center text-slate-400 font-medium italic"
                    >
                      No records found
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
                            to={`/ChallanGenerationReportBlock/${btoa(value.dist_id_pk)}`}
                            className="text-sm font-black text-slate-700 dark:text-slate-200 hover:text-indigo-500"
                          >
                            {value.district}
                          </Link>
                        </td>
                        <td className="p-4">
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            <Building2 size={12} className="text-slate-400" />
                            {value.supplier || "N/A"}
                          </p>
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.boys_muster_roll_generated}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.girls_muster_roll_generated}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-amber-600 bg-amber-50/20">
                          {value.total_muster_roll_generated}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.boys_allocation || 0}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.girls_allocation || 0}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-indigo-600 bg-indigo-50/20">
                          {value.total_allocation || 0}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.boys_updated}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.girls_updated}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-emerald-600 bg-emerald-50/20">
                          {value.total_updated}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td
                        colSpan="3"
                        className="p-5 text-[10px] uppercase tracking-widest text-right"
                      >
                        Grand Totals
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.boysMuster}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.girlsMuster}
                      </td>
                      <td className="p-3 text-center text-xs bg-amber-500 text-white">
                        {totals.musterRoll}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.boysAlloc}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.girlsAlloc}
                      </td>
                      <td className="p-3 text-center text-xs bg-indigo-600 text-white">
                        {totals.challanIssued}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.boysUpdated}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.girlsUpdated}
                      </td>
                      <td className="p-3 text-center text-xs bg-emerald-600 text-white">
                        {totals.uploaded}
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

export default ChallanGenerationReport;
