import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FileText, Calendar, Info, ArrowLeft, Bike, Truck } from "lucide-react";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { usePhaseStore } from "../../../Store/phaseStore";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ChallanDetailsByBlock = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const { id } = useParams();
  const navigate = useNavigate();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Memoized total calculation
  const totalCycles = useMemo(() => {
    return data.reduce((acc, val) => acc + (Number(val.no_of_cycles) || 0), 0);
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `challanMisReportPhaseWise`, {
        phaseId: phaseId,
        blockId: id,
      });
      if (response.error) {
        toast.error(`Failed to fetch data: ${response.message}`);
      } else {
        // console.log(response.data);
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
          Back to Block List
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Challan <span className="text-indigo-500">View Report</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              Phase {phaseDetails.phaseName} • Academic Year {phaseDetails.year}
            </p>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatMiniCard
            title="Total Entries"
            value={data.length}
            icon={FileText}
            color="text-blue-500"
            bg="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatMiniCard
            title="Total Cycles Distributed"
            value={totalCycles}
            icon={Bike}
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Suppliers Active"
            value={new Set(data.map((item) => item.supplier_name)).size}
            icon={Truck}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
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
                    Supplier Name
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800">
                    Challan No.
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Challan Date
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center">
                    Type of Cycle
                  </th>
                  <th className="p-5 border-b border-slate-100 dark:border-slate-800 text-center bg-indigo-50/30 dark:bg-indigo-900/10 text-indigo-600">
                    No. of Cycles
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
                      No specific challan details found for this selection.
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
                          <p className="text-sm font-black text-slate-700 dark:text-slate-200">
                            {value.supplier_name}
                          </p>
                        </td>
                        <td className="p-5">
                          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                            {value.challan_no}
                          </span>
                        </td>
                        <td className="p-5 text-center text-xs font-semibold text-slate-500">
                          <div className="flex items-center justify-center gap-1">
                            <Calendar size={12} className="text-slate-400" />
                            {value.challan_date}
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <span
                            className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                              Number(value?.type_of_cycle) === 1
                                ? "bg-sky-50 text-sky-600 dark:bg-sky-900/20"
                                : "bg-rose-50 text-rose-600 dark:bg-rose-900/20"
                            }`}
                          >
                            {Number(value?.type_of_cycle) === 1
                              ? "Boys"
                              : "Girls"}
                          </span>
                        </td>
                        <td className="p-5 text-center text-sm font-black text-indigo-600 bg-indigo-50/5">
                          {Number(value.no_of_cycles).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black">
                      <td
                        colSpan="5"
                        className="p-6 text-xs uppercase tracking-widest text-right"
                      >
                        Total Cycles Distributed
                      </td>
                      <td className="p-5 text-center text-lg bg-indigo-600 text-white">
                        {totalCycles.toLocaleString()}
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

export default ChallanDetailsByBlock;
