import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  HiOutlineDocumentArrowDown,
  HiOutlineBuildingOffice2,
  HiOutlineFunnel,
  HiOutlineClipboardDocumentList,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";
import { usePhaseStore } from "../../../Store/phaseStore";

const DownloadDistributionViewDistrict = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  const onLoadHandler = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `/getBlock/${btoa(id)}`);
      if (!response.error && response.data) {
        setBlockList(response.data);
      } else {
        setBlockList([]);
        toast.error(response.message || "Failed to load blocks");
      }
    } catch (err) {
      toast.error("Unexpected error occurred while fetching blocks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadHandler();
  }, []);

  const onSubmit = async (data) => {
    const updatedData = { ...data, phaseId: phaseId };
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `/getSchoolListDistrict`,
        updatedData,
      );
      if (!response.error && response.data?.schoolList) {
        console.log(response.data.schoolList);
        setSchoolList(response.data.schoolList);
      } else {
        setSchoolList([]);
        toast.info("No schools found for the selected block.");
      }
    } catch (err) {
      toast.error("Error fetching school records.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, { shouldDirty: true, shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  const downloadPdf = async (phaseId, schoolId) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `downloadMusterRoll/${phaseId}/${btoa(schoolId)}`,
        null,
        {
          responseType: "blob",
        },
      );

      if (response.error) {
        toast.error(`Download failed: ${response.message || "Server error"}`);
      } else {
        // Create the Blob specifically as a PDF
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `MasterRoll_${schoolId}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("PDF download started successfully");
      }
    } catch (err) {
      console.error("❌ PDF download failed:", err);
      toast.error("Unexpected PDF download error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
        {/* --- Header Section --- */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-2">
            <HiOutlineClipboardDocumentList className="w-5 h-5" />
            Distribution Management
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Download <span className="text-blue-600">Muster Rolls</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Phase {phaseDetails.phaseName} ({phaseDetails.year}) — District View
          </p>
        </div>

        {/* --- Filter Card --- */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8 transition-all">
          <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase text-xs font-bold tracking-widest">
            <HiOutlineFunnel className="text-lg text-blue-500" />
            Select Jurisdiction
          </div>
          <form className="max-w-md relative group">
            <HiOutlineBuildingOffice2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors w-5 h-5 z-10" />
            <select
              {...register("blockId")}
              onChange={(e) => handleOnChange("blockId", e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer font-semibold"
            >
              <option value="">Select a Block...</option>
              {blockList.map((block) => (
                <option key={block.loginid} value={btoa(block.id)}>
                  {block.desc}
                </option>
              ))}
            </select>
          </form>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    DISE Code
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    School Institution
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Muster Roll
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {schoolList.length > 0 ? (
                  schoolList.map((school, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-mono font-bold">
                          {school.dise}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                          {school.school_name}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            downloadPdf(phaseId, school.school_id_pk)
                          }
                          disabled={!school.status_flag > 0}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg 
                            ${
                              school.status_flag > 0
                                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-blue-500/20 active:scale-95"
                                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                            }`}
                        >
                          <HiOutlineDocumentArrowDown className="w-4 h-4" />
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
                        <HiOutlineMagnifyingGlass className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold text-lg">No Schools Listed</p>
                        <p className="text-sm">
                          Select a block to view distribution records
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Global Loading Overlay --- */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                Processing Request...
              </p>
            </div>
          </div>
        )}

        {/* --- Logout Confirmation --- */}
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

export default DownloadDistributionViewDistrict;
