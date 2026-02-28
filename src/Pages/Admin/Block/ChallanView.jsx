import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useForm } from "react-hook-form";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Download,
  Building2,
  Search,
  Calendar,
  Bike,
  Loader2,
  LayoutGrid,
  Eye,
  CheckSquare,
  ClipboardCheck,
  Share2,
} from "lucide-react";
import { IoPieChart } from "react-icons/io5";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";
import RejectChallanModal from "../../../Components/RejectChallanModal";
import RejectedChallanModal from "../../../Components/RejectedChallanModal";
import AllocationViewModal from "../../../Components/AllocationViewModal"; // Assuming this path
import Modal from "../../../Components/Modal";
import LogoutPopup from "../../../Components/LogoutPopup";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";
import { usePhaseStore } from "../../../Store/phaseStore";

const ChallanView = () => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const navigate = useNavigate(); // For navigation to allocation page
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const { register, handleSubmit, setValue } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [rejectId, setRejectId] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [isModalRejectedOpen, setIsModalRejectedOpen] = useState(false);
  const [distributionLocationList, setDistributionLocationList] = useState([]);
  const [challanList, setChallanList] = useState([]);

  // Allocation specific states
  const [allocationList, setAllocationList] = useState([]);

  // Fetch Locations
  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", "/getDeliveryLocations", {
        phaseId: phaseId,
        locationId: btoa(id),
      });
      if (!response.error && response.data?.locationList) {
        setDistributionLocationList(response.data.locationList);
      }
    } catch (err) {
      toast.error("Failed to load delivery centers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, [phaseId]);

  const onSubmit = async (data) => {
    if (!data.delivery_location) return;
    setLoading(true);
    try {
      const response = await callApi("POST", "/getApproveChallanView", {
        ...data,
        phaseId: phaseId,
        block_id: btoa(id),
      });
      setChallanList(response.data?.challanList || []);
    } catch (err) {
      toast.error("Error fetching challans");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name, value) => {
    setValue(name, value);
    handleSubmit(onSubmit)();
  };

  // --- New Handlers ---
  const handleAllocationToSchool = (challanId) => {
    navigate(`/AllocateChallanToSchool/${phaseId}/${btoa(challanId)}`);
  };

  const handleViewAllocation = async (challanId) => {
    setLoading(true);
    try {
      const response = await callApi("POST", "/getAllocationDetails", {
        challan_id: btoa(challanId),
      });
      console.log(response);
      if (!response.error && response.data?.allocationList) {
        setAllocationList(response.data.allocationList);
        setIsModalOpen(true);
      } else {
        setAllocationList([]);
        toast.error(`⚠️ ${response.message || "Failed to fetch details"}`);
      }
    } catch (err) {
      toast.error("❌ Network error fetching allocation details");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const downloadPdf = async (challanNo) => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        "downloadChallanReceipt",
        {
          phaseId: phaseId, // Included from useParams()
          challan_no: challanNo,
        },
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

        // Setting filename; decoding challanNo for the label
        const fileNameLabel =
          typeof challanNo === "string" ? atob(challanNo) : "Receipt";
        link.download = `Challan_${fileNameLabel}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        // Clean up the URL object to free memory
        window.URL.revokeObjectURL(url);
        toast.success("Challan PDF downloaded successfully");
      }
    } catch (err) {
      console.error("❌ PDF download failed:", err);
      toast.error("Unexpected PDF download error.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRejectedModal = async (challanId) => {
    setLoading(true);
    const ChallanData = {
      challan_id: challanId,
    };

    try {
      const response = await callApi(
        "POST",
        "/getChallanRejectReason",
        ChallanData,
      );

      if (!response.error && response.data) {
        console.log(response.data);
        setRejectReason(response.data);
        setIsModalRejectedOpen(true);
      } else {
        toast.error(response.message || "Failed to fetch reject reason.");
      }
    } catch (err) {
      toast.error(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      <div className="p-6 lg:p-10 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              Challan Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Phase {phaseDetails.phaseName} • Approval & Allocation
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="pl-3 text-slate-400">
              <Building2 size={20} />
            </div>
            <select
              {...register("delivery_location")}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-0 min-w-[240px] cursor-pointer"
            >
              <option value="">Select Delivery Center</option>
              {distributionLocationList.map((loc) => (
                <option key={loc.location_id} value={btoa(loc.location_id)}>
                  {loc.distribution_location_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          {challanList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-5">Challan Info</th>
                    <th className="px-6 py-5">Supplier & Date</th>
                    <th className="px-6 py-5 text-center">Specifications</th>
                    <th className="px-6 py-5 text-center">Status</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {challanList.map((challan, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          #{challan.challan_no}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                          <Building2 size={12} />{" "}
                          {challan.distribution_location_name}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-tight">
                          {challan.supplier_name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-mono">
                          <Calendar size={12} /> {challan.challan_date}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center">
                          <span className="px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase mb-1">
                            {challan.type_of_cycle}
                          </span>
                          <span className="text-sm font-black dark:text-white flex items-center gap-1">
                            <Bike size={14} className="text-slate-400" />{" "}
                            {challan.no_of_cycles}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {/* Status Mappings */}
                        {challan.status == 1 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
                            Pending
                          </span>
                        )}
                        {challan.status == 9 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-200 transition-colors">
                            <XCircle size={14} /> Rejected
                          </span>
                        )}
                        {challan.status == 2 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                            <CheckCircle2 size={14} /> Accepted
                          </span>
                        )}
                        {challan.status == 3 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold">
                            <IoPieChart size={14} /> Partially Allocated
                          </span>
                        )}
                        {challan.status == 4 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                            <ClipboardCheck size={14} /> Fully Allocated
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          {/* Approval Actions */}
                          {challan.status == 1 && (
                            <>
                              <button
                                onClick={() =>
                                  callApi("POST", "/acceptChallanById", {
                                    challan_id: challan.challan_id_pk,
                                    block_id: id,
                                  }).then(() => handleSubmit(onSubmit)())
                                }
                                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all"
                                title="Accept"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button
                                onClick={() => {
                                  setRejectId({
                                    challan_id: challan.challan_id_pk,
                                  });
                                  setIsModalRejectOpen(true);
                                }}
                                className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}

                          {/* Allocation Actions */}
                          {(challan.status === 2 || challan.status === 3) && (
                            <button
                              onClick={() =>
                                handleAllocationToSchool(challan.challan_id_pk)
                              }
                              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-bold text-xs"
                              title="Allocate to School"
                            >
                              <Share2 size={16} /> Allocate
                            </button>
                          )}
                          {(challan.status === 3 || challan.status === 4) && (
                            <button
                              onClick={() =>
                                handleViewAllocation(challan.challan_id_pk)
                              }
                              className="flex items-center gap-2 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-200 rounded-xl transition-all font-bold text-xs"
                              title="View Details"
                            >
                              <Eye size={16} /> View
                            </button>
                          )}

                          {/* General Actions */}
                          {challan.status != 1 && challan.status != 9 && (
                            <button
                              onClick={() =>
                                downloadPdf(btoa(challan.challan_no))
                              }
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                              title="Download PDF"
                            >
                              <Download size={18} />
                            </button>
                          )}

                          {/* Challan Reject Cause Show */}
                          {challan.status === 9 && (
                            <button
                              onClick={() =>
                                handleOpenRejectedModal(challan.challan_id_pk)
                              }
                              className="bg-[#dd4b39] border border-[#d73925] hover:bg-[#d73925] hover:border-[#ac2925] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5]"
                            >
                              Rejected
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 flex flex-col items-center justify-center text-slate-400">
              <Search size={48} className="opacity-10 mb-4" />
              <h3 className="text-lg font-bold">No Records</h3>
              <p className="text-sm">Select a delivery center to start.</p>
            </div>
          )}
        </div>

        {/* Global Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm z-[99] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Allocation Details Modal */}
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          closeable={true}
        >
          <AllocationViewModal
            data={allocationList}
            onClose={handleCloseModal}
          />
        </Modal>

        {/* Rejection Handling Modals */}
        <Modal
          show={isModalRejectOpen}
          onClose={() => setIsModalRejectOpen(false)}
          maxWidth="xs"
        >
          <RejectChallanModal
            modaldata={rejectId}
            rejectChallan={(data) =>
              callApi("POST", "/rejectChallanById", {
                ...data,
                block_id: id,
              }).then(() => {
                setIsModalRejectOpen(false);
                handleSubmit(onSubmit)();
              })
            }
            onClose={() => setIsModalRejectOpen(false)}
          />
        </Modal>

        {/* Rejected Cause View Modal */}
        <Modal
          show={isModalRejectedOpen}
          onClose={() => setIsModalRejectedOpen(false)}
          maxWidth="xs"
        >
          <RejectedChallanModal
            rejectedMsg={rejectReason}
            onClose={() => setIsModalRejectedOpen(false)}
          />
        </Modal>

        {showPopup && (
          <LogoutPopup
            message={popupMessage}
            onConfirm={() => {
              handleLogout();
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </AdminAuthenticatedLayout>
  );
};

export default ChallanView;
