import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineCheckBadge,
  HiOutlineXCircle,
  HiOutlineFunnel,
  HiOutlineArrowPath,
} from "react-icons/hi2";

import { MdOutlineSchool } from "react-icons/md";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ViewPending = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const [loading, setLoading] = useState(false);
  const [listOfSchool, setSchoolList] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      phaseId: phaseId,
      schoolId: btoa("all"),
    },
  });

  const fetchData = async (data) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `getSchoolVerifyList`, data);
      if (response.error) {
        toast.error("Failed to fetch list");
        setSchoolData([]);
      } else {
        setSchoolData(response.data.schoolList);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const res = await callApi("GET", `getSchoolList/${id}`);
      if (!res.error) setSchoolList(res.data.schoolList);
      handleSubmit(fetchData)();
    };
    init();
  }, [id, phaseId]);

  const handleOnChange = (name, value) => {
    setValue(name, value, { shouldDirty: true, shouldValidate: true });
    handleSubmit(fetchData)();
  };

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">
              <HiOutlineAcademicCap className="w-5 h-5" />
              Phase {phaseDetails.phaseName} • {phaseDetails.year}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              School <span className="text-blue-600">Verification</span> Status
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Monitor and manage pending applications across verified schools.
            </p>
          </div>

          {/* Stats Summary (Optional Visual) */}
          <div className="hidden lg:flex gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400 font-bold uppercase">
                Total Schools
              </p>
              <p className="text-xl font-bold dark:text-white">
                {listOfSchool.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase text-xs font-bold tracking-widest">
            <HiOutlineFunnel className="text-lg text-blue-500" />
            Filter by Institution
          </div>
          <form className="max-w-md">
            <div className="relative group">
              <MdOutlineSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
              <select
                {...register("schoolId")}
                onChange={(e) => handleOnChange("schoolId", e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer font-medium"
              >
                <option value={btoa("all")}>All Institutions</option>
                <option value={btoa("pending")}>Pending Approval Only</option>
                {listOfSchool.map((school) => (
                  <option
                    key={school.school_id_pk}
                    value={btoa(school.school_id_pk)}
                  >
                    {school.school_name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Sl.No
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2 text-amber-500">
                      <HiOutlineClock className="w-4 h-4" /> Pending
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2 text-emerald-500">
                      <HiOutlineCheckBadge className="w-4 h-4" /> Approved
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <HiOutlineXCircle className="w-4 h-4" /> Rejected
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {schoolData.length > 0 ? (
                  schoolData.map((school, index) => (
                    <tr
                      key={school.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                          {school.schname}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusLink
                          count={school.pending}
                          status="3"
                          schoolCode={school.school_code}
                          phaseId={phaseId}
                          color="amber"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusLink
                          count={school.approve}
                          status="4"
                          schoolCode={school.school_code}
                          phaseId={phaseId}
                          color="emerald"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusLink
                          count={school.reject}
                          status="5"
                          schoolCode={school.school_code}
                          phaseId={phaseId}
                          color="red"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <HiOutlineArrowPath className="w-12 h-12 mb-4 opacity-20 animate-spin-slow" />
                        <p className="font-bold text-lg">No Records Found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Loader */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                Processing Data...
              </p>
            </div>
          </div>
        )}

        {showPopup && (
          <LogoutPopup
            message={popupMessage}
            onConfirm={() => {
              handleLogout();
              setShowPopup(false);
            }}
          />
        )}
      </section>
    </AdminAuthenticatedLayout>
  );
};

// Sub-component for clean status links
const StatusLink = ({ count, status, schoolCode, phaseId, color }) => {
  const colorMap = {
    amber:
      "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30",
    emerald:
      "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30",
    red: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30",
  };

  if (count <= 0)
    return (
      <span className="text-slate-300 dark:text-slate-700 font-bold">
        {count}
      </span>
    );

  return (
    <Link
      to={`/CircleVerifyListApplicant/${phaseId}/${btoa(schoolCode)}/${btoa(status)}`}
      className={`inline-flex items-center justify-center min-w-[3rem] px-3 py-1 rounded-full text-xs font-black border transition-all hover:scale-110 active:scale-95 ${colorMap[color]}`}
    >
      {count}
    </Link>
  );
};

export default ViewPending;
