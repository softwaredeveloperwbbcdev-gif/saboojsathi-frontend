import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  School,
  MapPin,
  Users,
  GraduationCap,
  Info,
  ArrowLeft,
  Download,
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

const TaggingDetailsReportSchool = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const { id } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const navigate = useNavigate();
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Optimized: Single-pass reduction for school-specific totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, val) => ({
        tBoys: acc.tBoys + (Number(val.tagged_boys) || 0),
        tGirls: acc.tGirls + (Number(val.tagged_girls) || 0),
        tTotal: acc.tTotal + (Number(val.total_tagged) || 0),
        eBoys: acc.eBoys + (Number(val.eligible_boys) || 0),
        eGirls: acc.eGirls + (Number(val.eligible_girls) || 0),
        eTotal: acc.eTotal + (Number(val.total_eligible) || 0),
      }),
      { tBoys: 0, tGirls: 0, tTotal: 0, eBoys: 0, eGirls: 0, eTotal: 0 },
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
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 mb-2 text-sm font-bold transition-all group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Block Report
            </button>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              School Wise{" "}
              <span className="text-indigo-600">Delivery Report</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              Phase {phaseDetails.phase} • Academic Year {phaseDetails.year}
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatMiniCard
            title="Total Schools Listed"
            value={data.length}
            icon={School}
            color="text-blue-600"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Total Tagged Students"
            value={totals.tTotal}
            icon={Users}
            color="text-indigo-600"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Total Eligible"
            value={totals.eTotal}
            icon={GraduationCap}
            color="text-rose-600"
            bg="bg-rose-50 dark:bg-rose-900/20"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
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
                    School Name
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10"
                  >
                    Tagged Students
                  </th>
                  <th
                    rowSpan="2"
                    className="p-5 border-b border-slate-100 dark:border-slate-800 text-center"
                  >
                    Delivery Location
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
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-indigo-600">
                    Total
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Boys
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center">
                    Girls
                  </th>
                  <th className="p-3 border-b border-slate-100 dark:border-slate-800 text-center font-black text-rose-600">
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
                      No school records found for this block
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-indigo-50/30 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 text-xs font-bold text-slate-300 text-center">
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase leading-tight">
                            {value.school_name}
                          </p>
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.tagged_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.tagged_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-indigo-600 bg-indigo-50/20">
                          {value.total_tagged}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 italic">
                            <MapPin size={12} className="text-slate-400" />
                            {value.distribution_location_name}
                          </div>
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.eligible_boys}
                        </td>
                        <td className="p-3 text-center text-xs text-slate-500">
                          {value.eligible_girls}
                        </td>
                        <td className="p-3 text-center text-xs font-bold text-rose-600 bg-rose-50/20">
                          {value.total_eligible}
                        </td>
                      </tr>
                    ))}
                    {/* Summary Footer Row */}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td
                        colSpan="2"
                        className="p-5 text-[10px] uppercase tracking-widest text-right"
                      >
                        Block Totals
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
                      <td className="p-3 bg-slate-800 dark:bg-slate-100"></td>
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

// Internal Sub-component for consistent styling
const StatMiniCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
    <div className={`p-4 rounded-2xl ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">
        {Number(value).toLocaleString()}
      </p>
    </div>
  </div>
);

export default TaggingDetailsReportSchool;
