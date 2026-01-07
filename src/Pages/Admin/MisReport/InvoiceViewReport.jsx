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
import ChallanDetailsModal from "../../../Components/ChallanDetailsModal";
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

function InvoiceViewReport() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    setValue,
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cycleSuppliers, setCycleSuppliers] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(null);
  const [invoiceChallanLinked, setInvoiceChallanLinked] = useState([]);

  useEffect(() => {
    fetchCycle();
    handleSubmit(onSubmit)();
  }, [phaseId]);

  const fetchCycle = async () => {
    /////////////////////////////////////////////////////
    setValue("phaseId", phaseId);
    setLoading(true);
    try {
      const response = await callApi("POST", `cycledetails`); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setCycleSuppliers(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    ////////////////////////////////////////////////////
  };

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    setLoading(true);
    try {
      const response = await callApi("POST", `invoice_view`, data); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
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

  //////////

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "Invoice Number",
      selector: (data) => data.invoice_no,
      center: true,
    },
    {
      name: "Invoice Date",
      selector: (data) => data.invoice_date,
      center: true,
    },
    {
      name: "Supplier",
      selector: (data) => data.supp_name,
      center: true,
    },
    {
      name: "Order id, Date, Quantity",
      selector: (data) => data.description,
      center: true,
    },
    {
      name: "Gross Payable Amount",
      selector: (data) => data.gross_bill_amount,
      center: true,
    },

    {
      name: "TDS on GST",
      selector: (data) => data.tds,
      center: true,
    },
    {
      name: "Net Payable Amount",
      selector: (data) => data.net_payable_amount,
      center: true,
    },
    {
      name: "Status",
      selector: (data) => (data.status == 1 ? "Linked" : "Not linked"),
      center: true,
    },

    {
      name: "Action",
      center: true,
      cell: (data) =>
        data.status == 1 ? (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() =>
              viewChallanDetails(data.invoice_id_pk, data.invoice_no)
            }
          >
            View
          </button>
        ) : null,
    },
  ];

  const NoDataMessage = ({ isDarkMode }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
          textAlign: "center",
          backgroundColor: isDarkMode ? "#111827" : "#F9FAFB",
          color: isDarkMode ? "#D1D5DB" : "#6B7280",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          border: `1px dashed ${isDarkMode ? "#374151" : "#D1D5DB"}`,
          transition: "all 0.3s ease-in-out",
          width: "100%",
          minHeight: "180px",
          boxSizing: "border-box",
        }}
      >
        {/* Icon with subtle animation */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.4}
          stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
          fill="none"
          style={{
            width: "44px", // smaller size
            height: "44px",
            marginBottom: "1rem",
            opacity: 0.85,
            transform: "translateY(0)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.opacity = "0.85";
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
          />
        </svg>

        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "0.4rem",
            color: isDarkMode ? "#E5E7EB" : "#374151",
          }}
        >
          No Data Available
        </h2>

        <p
          style={{
            fontSize: "0.875rem",
            color: isDarkMode ? "#9CA3AF" : "#6B7280",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          There are currently no records to display. Try adjusting filters or
          adding new entries.
        </p>
      </div>
    );
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  const viewChallanDetails = async (invoiceId, invoiceNo) => {
    setSelectedInvoiceNo(invoiceNo);
    setLoading(true);
    try {
      const response = await callApi("POST", `invoiceAllocatedChallan`, {
        invoice_id: invoiceId,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setInvoiceChallanLinked(response.data);
        setModalOpen(true);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async (challanId, phase) => {
    setLoading(true);
    const challan = {
      phase: phaseId,
      challan_no: btoa(challanId),
    };
    try {
      const response = await callApi("POST", `downloadChallanReceipt`, challan);

      if (response.error) {
        console.error("Failed to download PDF:", response.message);
        toast.error(`❌ Failed to download the PDF: ${response.message}`);
      } else {
        const { base64, mime, filename } = response.data;
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename || "muster-roll.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("❌ An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Invoice View Phase {phaseDetails.phaseName}
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
                      name="supplier"
                      {...register("supplier", {})}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Supplier</option>
                      {cycleSuppliers &&
                        cycleSuppliers.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.desc}
                          </option>
                        ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="supplier"
                      value="Supplier"
                      mandatory={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <TextInput
                      name="invoiceNo"
                      id="invoiceNo"
                      placeholder="Invoice number"
                      {...register("invoiceNo", {})}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                    <InputLabel
                      htmlFor="invoiceNo"
                      value="Invoice No"
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="text-gray-600 p-3.5 relative flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              Invoice Report
            </h2>
            {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
              Download
            </button> */}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              customStyles={getCustomStyles(isDarkMode)}
              noDataComponent={<NoDataMessage isDarkMode={isDarkMode} />}
            />
          </div>
          {loading && <Loader />} {/* 👈 show the loader component */}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      <ChallanDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        invoiceNo={selectedInvoiceNo}
        challanData={invoiceChallanLinked}
        onDownloadPdf={downloadPdf}
      />
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

export default InvoiceViewReport;
