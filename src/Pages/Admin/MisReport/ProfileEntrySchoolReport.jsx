import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Users,
  UserCheck,
  Hourglass,
  Info,
  School,
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

function ProfileEntrySchoolReport() {
  const { id } = useParams();
  const phaseId = usePhaseStore((state) => state.phaseId);
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Memoized calculations for summary cards and footer
  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => ({
        boys: {
          entry:
            acc.boys.entry + (Number(curr.profile_entry_class_ix_boys) || 0),
          pending:
            acc.boys.pending + (Number(curr.finalyse_class_ix_boys) || 0),
          approved:
            acc.boys.approved + (Number(curr.approved_class_ix_boys) || 0),
        },
        girls: {
          entry:
            acc.girls.entry + (Number(curr.profile_entry_class_ix_girls) || 0),
          pending:
            acc.girls.pending + (Number(curr.finalyse_class_ix_girls) || 0),
          approved:
            acc.girls.approved + (Number(curr.approved_class_ix_girls) || 0),
        },
        total: {
          entry:
            acc.total.entry + (Number(curr.profile_entry_class_ix_total) || 0),
          pending:
            acc.total.pending + (Number(curr.finalyse_class_ix_total) || 0),
          approved:
            acc.total.approved + (Number(curr.approved_class_ix_total) || 0),
        },
      }),
      {
        boys: { entry: 0, pending: 0, approved: 0 },
        girls: { entry: 0, pending: 0, approved: 0 },
        total: { entry: 0, pending: 0, approved: 0 },
      },
    );
  }, [data]);

  const fetchData = async () => {
    if (!phaseId || !id) return;
    setLoading(true);
    try {
      const response = await callApi("POST", `profileEntryReport`, {
        phaseId: phaseId,
        blockId: id,
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
  }, [phaseId, id]);

  return (
    <AdminAuthenticatedLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
        {/* Back Button */}
        <Link
          to={-1}
          className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 mb-2 text-sm font-bold transition-all"
        >
          <ArrowLeft size={16} /> Back to Block Report
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            School Wise <span className="text-indigo-500">Profile Entry</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2">
            <Info size={16} className="text-indigo-400" /> Phase{" "}
            {phaseDetails.phaseName} • Academic Year {phaseDetails.year}
          </p>
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
            title="Total Entries"
            value={totals.total.entry}
            icon={Users}
            color="text-indigo-500"
            bg="bg-indigo-50 dark:bg-indigo-900/20"
          />
          <StatMiniCard
            title="Pending Approval"
            value={totals.total.pending}
            icon={Hourglass}
            color="text-amber-500"
            bg="bg-amber-50 dark:bg-amber-900/20"
          />
          <StatMiniCard
            title="Total Approved"
            value={totals.total.approved}
            icon={UserCheck}
            color="text-emerald-500"
            bg="bg-emerald-50 dark:bg-emerald-900/20"
          />
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th
                    rowSpan="2"
                    className="p-5 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800"
                  >
                    #
                  </th>
                  <th
                    rowSpan="2"
                    className="p-5 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800"
                  >
                    School Name
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 text-xs font-black uppercase tracking-wider text-indigo-500 text-center border-b border-slate-100 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-900/10"
                  >
                    Profile Entry
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 text-xs font-black uppercase tracking-wider text-amber-500 text-center border-b border-slate-100 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-900/10"
                  >
                    Yet to be Approved
                  </th>
                  <th
                    colSpan="3"
                    className="p-3 text-xs font-black uppercase tracking-wider text-emerald-500 text-center border-b border-slate-100 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-900/10"
                  >
                    Profile Approved
                  </th>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    B
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    G
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-900 dark:text-white text-center border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-700/50">
                    Total
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    B
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    G
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-900 dark:text-white text-center border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-700/50">
                    Total
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    B
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 text-center border-b border-slate-100 dark:border-slate-800">
                    G
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-900 dark:text-white text-center border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-700/50">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="p-10 text-center text-slate-400 italic font-medium"
                    >
                      No records found.
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
                        <td className="p-5 text-sm font-black text-slate-700 dark:text-slate-200">
                          {item.school_name}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.profile_entry_class_ix_boys}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.profile_entry_class_ix_girls}
                        </td>
                        <td className="p-4 text-center text-sm font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50/10">
                          {item.profile_entry_class_ix_total}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.finalyse_class_ix_boys}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.finalyse_class_ix_girls}
                        </td>
                        <td className="p-4 text-center text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-50/10">
                          {item.finalyse_class_ix_total}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.approved_class_ix_boys}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {item.approved_class_ix_girls}
                        </td>
                        <td className="p-4 text-center text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50/10">
                          {item.approved_class_ix_total}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-t-2 border-slate-100 dark:border-slate-700">
                      <td
                        colSpan="2"
                        className="p-6 text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest text-right"
                      >
                        Grand Total
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.boys.entry}
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.girls.entry}
                      </td>
                      <td className="p-4 text-center text-base font-black text-indigo-600 dark:text-indigo-400">
                        {totals.total.entry}
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.boys.pending}
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.girls.pending}
                      </td>
                      <td className="p-4 text-center text-base font-black text-amber-600 dark:text-amber-400">
                        {totals.total.pending}
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.boys.approved}
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">
                        {totals.girls.approved}
                      </td>
                      <td className="p-4 text-center text-base font-black text-emerald-600 dark:text-emerald-400">
                        {totals.total.approved}
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

export default ProfileEntrySchoolReport;
