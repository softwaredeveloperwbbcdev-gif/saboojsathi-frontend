import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import Loader from "../../../Components/Loader";
import { useForm } from "react-hook-form";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import RejectedChallanModal from "../../../Components/RejectedChallanModal";
import Modal from "../../../Components/Modal";
import { FaFilePdf } from "react-icons/fa";
import { FiEye, FiInfo, FiDownload } from "react-icons/fi";
import AllocationViewModal from "../../../Components/AllocationViewModal";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setIsDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isDark;
};

const ChallanViewFilter = () => {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    setValue,
    watch,
  } = useForm({});

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [challanData, setChallanData] = useState([]);
  const [challanViewData, setChallanViewData] = useState({
    phase: [],
    districts: [],
    blocks: [],
  });
  const [rejectReason, setRejectReason] = useState("");
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [allocationList, setAllocationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Start loader
    try {
      const response = await callApi("GET", `cmsphase`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data phase ${response.message}`);
      } else {
        setChallanViewData((prev) => ({
          ...prev,
          phase: response.data.challanPhase || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected error phase:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (name === "phase") {
      fetchDistrict(value);
    }
    if (name === "district") {
      fetchBlocks(value);
    }
    handleSubmit(onSubmit)();
  };

  const fetchDistrict = async (phase) => {
    setLoading(true);
    setChallanViewData((prev) => ({
      ...prev,
      districts: [], // ✅ Only update 'districts'
      blocks: [], // Reset blocks when phase changes
    }));
    try {
      if (phase !== "") {
        const response = await callApi("GET", `cmsdistrictchallan/${phase}`);
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch district data ${response.message}`);
        } else {
          setChallanViewData((prev) => ({
            ...prev,
            districts: response.data, // ✅ Only update 'districts'
          }));
        }
      }
    } catch (err) {
      toast.error("Unexpected district error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async (districtChallan) => {
    setLoading(true);
    setChallanViewData((prev) => ({
      ...prev,
      blocks: [], // Reset blocks when phase changes
    }));
    try {
      if (districtChallan !== "") {
        const response = await callApi(
          "GET",
          `cmsblockchallan/${districtChallan}`
        );
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch block data ${response.message}`);
        } else {
          setChallanViewData((prev) => ({
            ...prev,
            blocks: response.data, // ✅ Only update 'districts'
          }));
        }
      }
    } catch (err) {
      toast.error("Unexpected block error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await callApi(
        "Post",
        `cmschallanviewsupplier`,
        formdata
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to submit data ${response.message}`);
      } else {
        setChallanData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onDownload = async (challanId) => {
    const challan = {
      phaseId: challanData.phase,
      challan_no: challanId,
    };
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        "/downloadChallanReceipt",
        challan
      );

      if (!response.error && response.data?.base64 && response.data?.mime) {
        const byteCharacters = atob(response.data.base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: response.data.mime });

        // Create a blob URL and trigger download
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = response.data.filename || "challan-receipt.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error(`❌ Failed to download PDF: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Error while downloading PDF: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const onShowRejectReason = async (challanId) => {
    setLoading(true);
    const ChallanData = {
      challan_id: challanId,
    };

    try {
      const response = await callApi(
        "POST",
        "/getChallanRejectReason",
        ChallanData
      );

      if (!response.error && response.data) {
        setRejectReason(response.data);
        setIsModalRejectOpen(true);
      } else {
        toast.error(response.message || "Failed to fetch reject reason.");
      }
    } catch (err) {
      toast.error(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRejectModal = () => {
    setIsModalRejectOpen(false);
    setRejectReason("");
  };

  const onViewAllocation = async (challanId) => {
    setLoading(true);

    const finalData = {
      challan_id: btoa(challanId),
    };

    try {
      const response = await callApi(
        "POST",
        "/getAllocationDetails",
        finalData
      );

      if (!response.error && response.data?.allocationList) {
        setAllocationList(response.data.allocationList);
        setIsModalOpen(true);
      } else {
        setAllocationList([]);
        toast.error(`⚠️ Failed to fetch challan list: ${response.message}`);
        // Optionally show a toast or message to the user
      }
    } catch (err) {
      toast.error("❌ Error while fetching challan list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Filter Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Filter Challans
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Use the filters below to find specific challan records.
                </p>
              </div>
              <form
                className="p-6"
                noValidate
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Phase */}
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="phase"
                      {...register("phase")}
                      onChange={(e) => handleOnChange("phase", e.target.value)}
                    >
                      <option value="">All Phases</option>
                      {challanViewData.phase.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="phase" value="Phase" />
                  </div>
                  {/* District */}
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="district"
                      {...register("district")}
                      onChange={(e) =>
                        handleOnChange("district", e.target.value)
                      }
                      disabled={!watch("phase")}
                    >
                      <option value="">All Districts</option>
                      {challanViewData.districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="district" value="District" />
                  </div>
                  {/* Block */}
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="block"
                      {...register("block")}
                      onChange={(e) => handleOnChange("block", e.target.value)}
                      disabled={!watch("district")}
                    >
                      <option value="">All Blocks</option>
                      {challanViewData.blocks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="block" value="Block" />
                  </div>
                  {/* Challan No */}
                  <div className="relative">
                    <TextInput
                      id="challan_no"
                      placeholder="Enter Challan No."
                      {...register("challan_no")}
                      onBlur={(e) =>
                        handleOnChange("challan_no", e.target.value)
                      }
                    />
                    <InputLabel htmlFor="challan_no" value="Challan No" />
                  </div>
                  {/* Challan Date */}
                  <div className="relative">
                    <TextInput
                      id="challan_date"
                      type="date"
                      {...register("challan_date")}
                      onBlur={(e) =>
                        handleOnChange("challan_date", e.target.value)
                      }
                    />
                    <InputLabel htmlFor="challan_date" value="Challan Date" />
                  </div>
                </div>
              </form>
            </div>

            {/* Challan Report Table Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg relative">
              {loading && <Loader />}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Challan Report
                </h3>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-800 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Challan No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Challan Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phase
                      </th>
                      <th scope="col" className="px-6 py-3">
                        District / Block
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Bicycle Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Approval Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {challanData.length > 0 ? (
                      challanData.map((item, index) => (
                        <tr
                          key={item.challan_no}
                          className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {item.challan_no}
                          </th>
                          <td className="px-6 py-4">{item.challan_date}</td>
                          <td className="px-6 py-4">{`Phase ${item.phase_order}`}</td>
                          <td className="px-6 py-4">
                            {item.district} / {item.block}
                          </td>
                          <td className="px-6 py-4">{item.gender}</td>
                          <td className="px-6 py-4">{item.no_of_cycles}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                {
                                  1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                                  9: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                                }[item.status] ||
                                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {{
                                1: "Approved",
                                9: "Rejected",
                                4: "Fully Allocated",
                                3: "Partially Allocated",
                              }[item.status] || "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {item.status_date_challan || "N/A"}
                          </td>
                          <td>
                            <div className="flex items-center justify-center gap-2">
                              {/* Download Button */}
                              {item.status !== 9 && item.status !== 1 && (
                                <button
                                  onClick={() =>
                                    onDownload(btoa(item.challan_no))
                                  }
                                  title="Download PDF"
                                  className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
                                >
                                  <FaFilePdf />
                                </button>
                              )}
                              {/* View Allocation Button */}
                              {(item.status === 3 || item.status === 4) && (
                                <button
                                  onClick={() =>
                                    onViewAllocation(item.challan_id_pk)
                                  }
                                  title="View Allocation"
                                  className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
                                >
                                  <FiEye />
                                </button>
                              )}
                              {/* Rejected/Reason Button */}
                              {item.status === 9 && (
                                <button
                                  onClick={() =>
                                    onShowRejectReason(item.challan_id_pk)
                                  }
                                  title="View Reject Reason"
                                  className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
                                >
                                  <FiInfo />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-10 text-gray-500 dark:text-gray-400"
                        >
                          No data found. Please select filters to begin.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </AdminAuthenticatedLayout>
      <Modal
        show={isModalRejectOpen}
        onClose={handleCloseRejectModal}
        maxWidth="xs"
        closeable={true}
      >
        <RejectedChallanModal
          rejectedMsg={rejectReason}
          onClose={handleCloseRejectModal}
        />
      </Modal>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="xl"
        closeable={true}
      >
        <AllocationViewModal data={allocationList} onClose={handleCloseModal} />
      </Modal>
      {/* Logout Modal/Popup */}
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
};

export default ChallanViewFilter;
