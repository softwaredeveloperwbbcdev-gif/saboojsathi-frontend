import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Map,
  Tags,
  Users,
  GraduationCap,
  Info,
  ArrowRight,
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

const TaggingDetailsReportBlock = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const { id } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const navigate = useNavigate();
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Optimized: Single pass reduction for all block-level tagging totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        schools: acc.schools + (Number(val.no_of_school) || 0),
        taggedSchools: acc.taggedSchools + (Number(val.tagged_school) || 0),
        tBoys: acc.tBoys + (Number(val.tagged_boys) || 0),
        tGirls: acc.tGirls + (Number(val.tagged_girls) || 0),
        tTotal: acc.tTotal + (Number(val.tagged_total) || 0),
        eBoys: acc.eBoys + (Number(val.eligible_boys) || 0),
        eGirls: acc.eGirls + (Number(val.eligible_girls) || 0),
        eTotal: acc.eTotal + (Number(val.eligible_total) || 0),
      }),
      {
        schools: 0,
        taggedSchools: 0,
        tBoys: 0,
        tGirls: 0,
        tTotal: 0,
        eBoys: 0,
        eGirls: 0,
        eTotal: 0,
      },
    );
  }, [data]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await callApi("POST", `taggingReport`, {
        phaseId: phaseId,
        distId: id,
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
          Back to District Report
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Block-Wise{" "}
            <span className="text-indigo-600">Tagging Progression</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
            <Info size={16} className="text-indigo-500" />
            Phase {phaseDetails.phase} • Delivery Center Monitoring (AY{" "}
            {phaseDetails.year})
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatMiniCard
            title="Total Schools"
            value={totals.schools}
            icon={Map}
            color="text-blue-600"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Schools Tagged"
            value={totals.taggedSchools}
            icon={Tags}
            color="text-emerald-600"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
          <StatMiniCard
            title="Tagged Students"
            value={totals.tTotal}
            icon={Users}
            color="text-indigo-600"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Eligible Students"
            value={totals.eTotal}
            icon={GraduationCap}
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
                    Block Name
                  </th>
                  <th
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800 text-center bg-blue-50/30 dark:bg-blue-900/10"
                  >
                    Total Schools
                  </th>
                  <th
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800 text-center bg-emerald-50/30 dark:bg-emerald-900/10"
                  >
                    Tagged Schools
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10"
                  >
                    Tagged Students
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-rose-50/30 dark:bg-rose-900/10"
                  >
                    Eligible Students
                  </th>
                </tr>
                <tr className="bg-slate-50/30 dark:bg-slate-800/30 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Boys
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Girls
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600 dark:text-slate-300">
                    Total
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Boys
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Girls
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-slate-600 dark:text-slate-300">
                    Total
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
                      No block-level tagging data available
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
                            to={`/TaggingDetailsReportSchool/${btoa(value.block_id_pk)}`}
                            className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 transition-colors"
                          >
                            {value.block_name}
                            <ArrowRight
                              size={12}
                              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            />
                          </Link>
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500 bg-blue-50/10">
                          {value.no_of_school}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500 bg-emerald-50/10">
                          {value.tagged_school}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.tagged_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.tagged_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-indigo-600 bg-indigo-50/20">
                          {value.tagged_total}
                        </td>

                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.eligible_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.eligible_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-rose-600 bg-rose-50/20">
                          {value.eligible_total}
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
                      <td className="p-3 text-center text-xs bg-blue-600 text-white">
                        {totals.schools}
                      </td>
                      <td className="p-3 text-center text-xs bg-emerald-600 text-white">
                        {totals.taggedSchools}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.tBoys}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.tGirls}
                      </td>
                      <td className="p-3 text-center text-xs bg-indigo-600 text-white">
                        {totals.tTotal}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.eBoys}
                      </td>
                      <td className="p-3 text-center text-xs">
                        {totals.eGirls}
                      </td>
                      <td className="p-3 text-center text-xs bg-rose-600 text-white">
                        {totals.eTotal}
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

export default TaggingDetailsReportBlock;
