import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Download,
  Map,
  Users,
  UserCheck,
  FileSpreadsheet,
  ArrowRight,
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

const DistributionReportBlock = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const { id } = useParams();
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Logic: Memoized totals for summary cards and footer
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        genBoys: acc.genBoys + (Number(val.boys_muster_roll_generated) || 0),
        genGirls: acc.genGirls + (Number(val.girls_muster_roll_generated) || 0),
        genTotal: acc.genTotal + (Number(val.total_muster_roll_generated) || 0),
        updBoys: acc.updBoys + (Number(val.boys_distribution_updated) || 0),
        updGirls: acc.updGirls + (Number(val.girls_distribution_updated) || 0),
        updTotal: acc.updTotal + (Number(val.total_distribution_updated) || 0),
      }),
      {
        genBoys: 0,
        genGirls: 0,
        genTotal: 0,
        updBoys: 0,
        updGirls: 0,
        updTotal: 0,
      },
    );
  }, [data]);

  const totalGenerated = totals.genBoys + totals.genGirls;
  const totalUpdated = totals.updBoys + totals.updGirls;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `distributionDetailsReport`, {
        phaseId: phaseId,
        distId: id,
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
        `blockwise_distribution_report_download`,
        { phaseId, id },
        { responseType: "blob" },
      );
      if (response.error) {
        toast.error(`Download failed: ${response.message}`);
      } else {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
        const filename = `Block_Wise_Distribution_${phaseDetails.phaseName}_${timestamp}.xlsx`;
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
      toast.error("Unexpected download error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [phaseId, id]);

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
          Back to Districts
        </button>

        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Block Wise{" "}
              <span className="text-indigo-500">Distribution Status</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              Phase {phaseDetails.phaseName} • Block Level Overview
            </p>
          </div>

          {data.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-2xl font-bold shadow-sm border border-slate-100 dark:border-slate-800 hover:border-sky-500 transition-all active:scale-95"
            >
              <Download size={20} className="text-sky-500" />
              Export Excel
            </button>
          )}
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Total Generated"
            value={totalGenerated}
            icon={Users}
            color="text-blue-500"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Total Updated"
            value={totalUpdated}
            icon={UserCheck}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
          <StatMiniCard
            title="Avg per Block"
            value={data.length ? Math.round(totalGenerated / data.length) : 0}
            icon={Map}
            color="text-orange-500"
            bg="bg-orange-50 dark:bg-orange-900/20"
          />
          <StatMiniCard
            title="Active Blocks"
            value={data.length}
            icon={FileSpreadsheet}
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
                  <th
                    rowSpan="2"
                    className="p-6 border-b border-slate-100 dark:border-slate-800"
                  >
                    Block Details
                  </th>
                  <th
                    colSpan="3"
                    className="p-4 border-b border-slate-100 dark:border-slate-800 text-center bg-blue-50/30 dark:bg-blue-900/10"
                  >
                    Distribution Record Generated
                  </th>
                  <th
                    colSpan="3"
                    className="p-4 border-b border-slate-100 dark:border-slate-800 text-center bg-emerald-50/30 dark:bg-emerald-900/10"
                  >
                    Distribution Record Updated
                  </th>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">
                    Boys
                  </th>
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">
                    Girls
                  </th>
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center font-bold text-blue-600">
                    Total
                  </th>
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">
                    Boys
                  </th>
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">
                    Girls
                  </th>
                  <th className="p-4 border-b border-slate-100 dark:border-slate-800 text-center font-bold text-emerald-600">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-12 text-center text-slate-400 font-medium italic"
                    >
                      No records found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-5">
                          <Link
                            to={`/DistributionReportSchool/${btoa(value.block_id_pk)}`}
                            className="flex items-center justify-between group/link"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight group-hover/link:text-sky-600">
                                {value.block_name}
                              </span>
                            </div>
                            <ArrowRight
                              size={14}
                              className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-sky-500"
                            />
                          </Link>
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.boys_muster_roll_generated}
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.girls_muster_roll_generated}
                        </td>
                        <td className="p-5 text-center text-xs font-black text-blue-600 bg-blue-50/10">
                          {value.total_muster_roll_generated}
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.boys_distribution_updated}
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          {value.girls_distribution_updated}
                        </td>
                        <td className="p-5 text-center text-xs font-black text-emerald-600 bg-emerald-50/10">
                          {value.total_distribution_updated}
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td className="p-6 text-xs uppercase tracking-widest text-right">
                        District Total
                      </td>
                      <td className="p-5 text-center text-slate-400 dark:text-slate-500">
                        {totals.genBoys}
                      </td>
                      <td className="p-5 text-center text-slate-400 dark:text-slate-500">
                        {totals.genGirls}
                      </td>
                      <td className="p-5 text-center text-lg bg-blue-600 text-white">
                        {totals.genTotal}
                      </td>
                      <td className="p-5 text-center text-slate-400 dark:text-slate-500">
                        {totals.updBoys}
                      </td>
                      <td className="p-5 text-center text-slate-400 dark:text-slate-500">
                        {totals.updGirls}
                      </td>
                      <td className="p-5 text-center text-lg bg-emerald-600 text-white">
                        {totals.updTotal}
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
  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
    <div
      className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}
    >
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

export default DistributionReportBlock;
