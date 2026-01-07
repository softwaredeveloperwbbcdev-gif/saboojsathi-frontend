import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import Modal from "../../../Components/Modal";
import RejectedChallanModal from "../../../Components/RejectedChallanModal";
import AllocationViewModal from "../../../Components/AllocationViewModal";
import { FaFilePdf } from "react-icons/fa";
import { FiEye, FiInfo, FiDownload } from "react-icons/fi";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

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

function ChallanParticularsView() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const selectedDistrict = watch("district");
  const [challanViewSearchDts, setChallanViewSearchDts] = useState({
    cdistricts: [],
    cblocks: [],
  });

  const [rejectReason, setRejectReason] = useState("");
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  const [allocationList, setAllocationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDistricts();
    handleSubmit(onSubmit)();
  }, [phaseId]);

  const fetchDistricts = async () => {
    //////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi("GET", `districts`); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        // setData(response.data);
        setChallanViewSearchDts((prev) => ({
          ...prev,
          cdistricts: response.data || [],
        }));
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    /////////////////////////////////////////////////
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlock();
    }
  }, [selectedDistrict]);

  const fetchBlock = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `getBlock/${btoa(selectedDistrict)}`
      ); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        // setData(response.data);
        setChallanViewSearchDts((prev) => ({
          ...prev,
          cblocks: response.data || [],
        }));
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    /////////////////////////////////////////////////
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `get_challan`, data); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
        setData([]);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    /////////////////////////////////////////////////
  };

  const onDownload = async (challanId) => {
    const challan = {
      phaseId: phaseId, // or challanData.phase if available
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
    const ChallanData = { challan_id: challanId };

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
    const finalData = { challan_id: btoa(challanId) };

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
      }
    } catch (err) {
      toast.error(`❌ Error while fetching challan list: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isDarkMode = useDarkMode();

  const getCustomStyles = (isDarkMode) => ({
    tableWrapper: {
      style: {
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        overflow: "hidden",
      },
    },
    table: {
      style: {
        width: "100%",
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
      },
    },
    rows: {
      style: {
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
        color: isDarkMode ? "#D1D5DB" : "#6B7280",
        fontSize: "0.875rem",
        borderBottom: "none",
        transition: "background-color 0.2s ease",
      },
      highlightOnHoverStyle: {
        backgroundColor: isDarkMode ? "#4B5563" : "#F1F5F9", // ✅ hover color
        color: isDarkMode ? "#F9FAFB" : "#111827",
        transition: "background-color 0.25s ease",
      },
    },
    headRow: {
      style: {
        backgroundColor: isDarkMode ? "#374151" : "#F9FAFB",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        fontSize: "0.75rem",
        fontWeight: "700",
        textTransform: "uppercase",
      },
    },
    headCells: {
      style: {
        padding: "1rem",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        backgroundColor: isDarkMode ? "#374151" : "#F9FAFB",
        borderBottom: "none",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        padding: "1rem",
        color: isDarkMode ? "#D1D5DB" : "#6B7280",
        justifyContent: "center",
      },
    },
    // ✅ Add pagination customization here
    pagination: {
      style: {
        backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        borderTop: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
        minHeight: "56px",
      },
      pageButtonsStyle: {
        borderRadius: "0.375rem",
        height: "32px",
        width: "32px",
        padding: "4px",
        margin: "0 2px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        color: isDarkMode ? "#D1D5DB" : "#374151",
        backgroundColor: "transparent",

        "&:hover:not(:disabled)": {
          backgroundColor: isDarkMode ? "#4B5563" : "#E5E7EB",
          color: isDarkMode ? "#F9FAFB" : "#111827",
        },
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.5,
        },
        "&.rdt_Pagination-active": {
          backgroundColor: isDarkMode ? "#4B5563" : "#E5E7EB",
          color: isDarkMode ? "#F9FAFB" : "#111827",
        },
      },
    },
  });

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "District",
      selector: (data) => data.district,
      center: true,
    },
    {
      name: "Block/Municipality",
      selector: (data) => data.block,
      center: true,
    },
    {
      name: "Supplier",
      selector: (data) => data.supplier_name,
      center: true,
    },
    {
      name: "phase",
      selector: (data) => data.phase,
      center: true,
    },
    {
      name: "Challan No.",
      selector: (data) => data.challan_no,
      center: true,
    },

    {
      name: "Challan Date",
      selector: (data) => data.challan_date,
      center: true,
    },
    {
      name: "Type of Bicycles",
      selector: (data) => data.gender,
      center: true,
    },
    {
      name: "Number of Bicycles",
      selector: (data) => data.no_of_cycles,
      center: true,
    },
    {
      name: "Status",
      center: true,
      cell: (data) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
            {
              1: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
              9: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
              4: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
              3: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
            }[data.status] ||
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {{
            1: "Pending",
            9: "Rejected",
            4: "Fully Allocated",
            3: "Partially Allocated",
          }[data.status] || "Approved"}
        </span>
      ),
    },
    {
      name: "Action",
      center: true,
      cell: (row) => {
        const status = Number(row.status); // 👈 convert once

        return (
          <div className="flex items-center justify-center gap-2">
            {/* Download Button */}
            {status !== 9 && status !== 1 && (
              <button
                onClick={() => onDownload(btoa(row.challan_no))}
                title="Download PDF"
                className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
              >
                <FaFilePdf />
              </button>
            )}

            {/* View Allocation Button */}
            {(status === 3 || status === 4) && (
              <button
                onClick={() => onViewAllocation(row.challan_id_pk)}
                title="View Allocation"
                className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
              >
                <FiEye />
              </button>
            )}

            {/* Rejected Reason Button */}
            {status === 9 && (
              <button
                onClick={() => onShowRejectReason(row.challan_id_pk)}
                title="View Reject Reason"
                className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-colors"
              >
                <FiInfo />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Challan Particulars View phase {phaseDetails.phaseName}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form
                className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <div className="flex-1">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="district"
                      {...register("district", {
                        // required: "District is required",
                      })}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select District</option>
                      {challanViewSearchDts.cdistricts.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="district"
                      value="District"
                      mandatory={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="block"
                      {...register("block", {
                        // required: "Block is required",
                      })}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select Block</option>
                      {challanViewSearchDts.cblocks.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="block"
                      value="Block"
                      mandatory={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <TextInput
                      id="challanNo"
                      name="challanNo"
                      placeholder="Challan No."
                      {...register("challanNo", {
                        // required: "Phase is required",
                      })}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                    <InputLabel
                      htmlFor="challanNo"
                      value="Challan No."
                      mandatory={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <TextInput
                      type="date"
                      name="challanDate"
                      {...register("challanDate", {
                        // required: "Phase is required",
                      })}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                    <InputLabel
                      htmlFor="challanDate"
                      value="Challan Date"
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="text-gray-600 p-3.5 relative flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              Challan Issued/Entry Reports
            </h2>
            {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button> */}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            {data && data.length > 0 ? (
              <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                customStyles={getCustomStyles(isDarkMode)}
              />
            ) : (
              <p className="text-center text-gray-500">No records found.</p>
            )}
          </div>
          {loading && <Loader />} {/* 👈 show the loader component */}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
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
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
      {/* Modal section */}
    </>
  );
}

export default ChallanParticularsView;
