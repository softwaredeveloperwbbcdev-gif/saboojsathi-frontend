import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Download,
  Map,
  Database,
  FileCheck,
  CheckCircle2,
  Bike,
  ArrowLeft,
  Info,
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

const ProfileEntryStatusReportDist = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Efficient memoized calculation for the 9-column summary
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        imported:
          acc.imported + (Number(val.imported_from_banglar_siksha) || 0),
        rejected:
          acc.rejected +
          (Number(val.imported_from_banglar_siksha_rejected) || 0),
        verified: acc.verified + (Number(val.banglar_siksha_verified) || 0),
        newEntry: acc.newEntry + (Number(val.profile_entry_class_ix_new) || 0),
        finalized: acc.finalized + (Number(val.finalyse_class_ix_total) || 0),
        validated: acc.validated + (Number(val.approved_class_ix_total) || 0),
        receivedCycle:
          acc.receivedCycle +
          (Number(val.all_ready_get_cycle_yes_ix_total) || 0),
        eligible: acc.eligible + (Number(val.eligible_ix_total) || 0),
      }),
      {
        imported: 0,
        rejected: 0,
        verified: 0,
        newEntry: 0,
        finalized: 0,
        validated: 0,
        receivedCycle: 0,
        eligible: 0,
      },
    );
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `profileEntryStatusReport`, {
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

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `profile-entry-status-report-district-download`,
        { phaseId },
        { responseType: "blob" },
      );
      if (!response.error) {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
        const filename = `District_Status_Phase_${phaseDetails.phaseName}_${timestamp}.xlsx`;
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      toast.error("Download failed");
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
              <span className="text-indigo-500">Profile Entry Status</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              {phaseDetails.phase}th Phase • Academic Year {phaseDetails.year}
            </p>
          </div>

          {data.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Download size={20} />
              Export Report
            </button>
          )}
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Imported (BS)"
            value={totals.imported}
            icon={Database}
            color="text-blue-500"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Validated (SI)"
            value={totals.validated}
            icon={CheckCircle2}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
          <StatMiniCard
            title="Cycle Received"
            value={totals.receivedCycle}
            icon={Bike}
            color="text-orange-500"
            bg="bg-orange-50 dark:bg-orange-900/20"
          />
          <StatMiniCard
            title="Eligible Total"
            value={totals.eligible}
            icon={FileCheck}
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
                    Imported from <br />
                    Banglar Siksha
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center text-rose-400">
                    Rejected <br />
                    by HOI/SI
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Banglar Siksha <br />
                    Data Verified <br />
                    (Not Finalized)
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center text-sky-500">
                    New Entry <br />
                    by School
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Data Finalized <br />
                    (Not Validated)
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center text-emerald-500">
                    Data Validated <br />
                    by SI
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Already Received <br />
                    bicycle(YES)
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10 text-indigo-600">
                    Eligible Students
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="p-12 text-center text-slate-400 font-medium italic"
                    >
                      No district records available for this phase.
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
                            to={`/ProfileEntryStatusReportBlock/${btoa(value.dist_id_pk)}`}
                            className="text-sm font-black text-slate-700 dark:text-slate-200 hover:text-indigo-500 flex items-center gap-2 group/link"
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.imported_from_banglar_siksha}
                        </td>
                        <td className="p-5 text-center text-xs font-bold text-rose-500/80">
                          {value.imported_from_banglar_siksha_rejected}
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.banglar_siksha_verified}
                        </td>
                        <td className="p-5 text-center text-xs font-bold text-sky-600">
                          {value.profile_entry_class_ix_new}
                        </td>
                        <td className="p-5 text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                          {value.finalyse_class_ix_total}
                        </td>
                        <td className="p-5 text-center text-xs font-black text-emerald-600">
                          {value.approved_class_ix_total}
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.all_ready_get_cycle_yes_ix_total}
                        </td>
                        <td className="p-5 text-center text-sm font-black text-indigo-600 bg-indigo-50/5">
                          {value.eligible_ix_total}
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
                      <td className="p-5 text-center">{totals.imported}</td>
                      <td className="p-5 text-center text-rose-400 dark:text-rose-600">
                        {totals.rejected}
                      </td>
                      <td className="p-5 text-center">{totals.verified}</td>
                      <td className="p-5 text-center text-sky-400 dark:text-sky-600">
                        {totals.newEntry}
                      </td>
                      <td className="p-5 text-center">{totals.finalized}</td>
                      <td className="p-5 text-center text-emerald-400 dark:text-emerald-600">
                        {totals.validated}
                      </td>
                      <td className="p-5 text-center">
                        {totals.receivedCycle}
                      </td>
                      <td className="p-5 text-center text-lg bg-indigo-600 text-white">
                        {totals.eligible}
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
        {value.toLocaleString()}
      </p>
    </div>
  </div>
);

export default ProfileEntryStatusReportDist;
