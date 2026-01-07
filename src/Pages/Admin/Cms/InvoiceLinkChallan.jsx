import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { FileSearch, Plus, Minus, Link2, RotateCcw } from "lucide-react";

// Helper component for form fields
const FormField = ({ label, name, children, error }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

// Helper component for Invoice Detail display
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-200">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
      {value}
    </dd>
  </div>
);

const InvoiceLinkChallan = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [invoiceAddDetails, setInvoiceAddDetails] = useState({
    supplier: [],
    showDetails: false,
    showChallans: false,
  });
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [invoiceLinkChallanDetails, setInvoiceLinkChallanDetails] = useState({
    phase: null,
    districts: null,
    blocks: null,
    location: null,
    challans: null,
  });
  const [dropdownData, setDropdownData] = useState({});
  const selectedSupplier = watch("supplierId");
  const selectedInvoice = watch("invoiceno");

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `invoiceaddsupplierdetails`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setInvoiceAddDetails((prev) => ({
          ...prev,
          supplier: response.data,
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    console.log("Form Submitted:", formData);
    setLoading(true);
    try {
      const response = await callApi("POST", `invoicelinkdetails`, formData);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setInvoiceDetails(response.data);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const [rows, setRows] = useState([
    { id: 1, phase: "", district: "", block: "", location: "", challan: "" },
  ]);

  const appendRow = () => {
    const nextId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([
      ...rows,
      {
        id: nextId,
        phase: "",
        district: "",
        block: "",
        location: "",
        challan: "",
      },
    ]);
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };
  ////////////////////////////
  const handleChange = async (e, field, rowId) => {
    const value = e.target.value;
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, [field]: e.target.value } : row
    );
    setRows(updatedRows);

    // If phase selected, fetch districts
    if (field === "phase") {
      setLoading(true);
      //////////////////////
      try {
        const response = await callApi("POST", `invoicegetchallandistrict`, {
          phase: value,
          supplierid: selectedSupplier,
        });
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch data ${response.message}`);
        } else {
          setDropdownData((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              districts: response.data,
              blocks: [],
              locations: [],
              challans: [],
            },
          }));
        }
      } catch (err) {
        toast.error("Unexpected download error:", err);
      } finally {
        setLoading(false);
      }
    }
    //////////////////////////////
    if (field === "district") {
      setLoading(true);
      try {
        const response = await callApi("POST", `invoicegetchallanblock`, {
          district: value,
        });
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch data ${response.message}`);
        } else {
          setDropdownData((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              blocks: response.data,
              locations: [],
              challans: [],
            },
          }));
        }
      } catch (err) {
        toast.error("Unexpected download error:", err);
      } finally {
        setLoading(false);
      }
    }
    /////////////////////////////
    if (field === "block") {
      setLoading(true);
      const currentRow = rows.find((row) => row.id === rowId);
      const selectedPhase = currentRow?.phase;
      try {
        const response = await callApi("POST", `invoicegetchallanlocation`, {
          block: value,
          phase: selectedPhase,
        });
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch data ${response.message}`);
        } else {
          setDropdownData((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              locations: response.data,
              challans: [],
            },
          }));
        }
      } catch (err) {
        toast.error("Unexpected download error:", err);
      } finally {
        setLoading(false);
      }
    }
    /////////////////////////////
    if (field === "location") {
      setLoading(true);
      try {
        const response = await callApi("POST", `invoicegetchallandetails`, {
          location: value,
        });
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch data ${response.message}`);
        } else {
          setDropdownData((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              challans: response.data,
            },
          }));
        }
      } catch (err) {
        toast.error("Unexpected download error:", err);
      } finally {
        setLoading(false);
      }
    }
  };
  ///////////////////////////////
  const handleLinkClick = () => {
    const hasEmptyFields = rows.some(
      (row) =>
        !row.phase ||
        !row.district ||
        !row.block ||
        !row.location ||
        !row.challan
    );

    if (hasEmptyFields) {
      alert("Please fill in all fields before linking.");
      return;
    }
    const getChallanAllIds = rows.map((row) => row.challan);
    linkChallansWithInvoice(getChallanAllIds, invoiceDetails[0].invoice_id_pk);
    console.log(
      "Linked Challan Data:",
      getChallanAllIds,
      invoiceDetails.invoice_id_fk
    );
  };

  const linkChallansWithInvoice = async (challans, invoice) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `invoicelinkchallan`, {
        challanids: challans,
        invoiceid: invoice,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceDetails) {
      fetchPhase();
    }
  }, [invoiceDetails]);

  const fetchPhase = async () => {
    //////////////////////////
    setLoading(true);
    try {
      const response = await callApi("POST", `invoicelinkgetchallanphase`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setInvoiceAddDetails((prev) => ({
          ...prev,
          // phase: response.data,
          showDetails: true,
          showChallans: true,
        }));
        setInvoiceLinkChallanDetails((prev) => ({
          ...prev,
          phase: response.data,
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectStyles =
    "block w-full px-4 py-2.5 text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <>
      <AdminAuthenticatedLayout>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* 1. Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Link Invoice to Challan
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Search for an invoice to begin linking delivery challans.
            </p>
          </div>
          {/* 2. Search Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white dark:bg-gray-900/50 rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-800"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
              <FormField
                label="Supplier"
                name="supplierId"
                error={errors.supplierId}
              >
                <select
                  id="supplierId"
                  className={selectStyles}
                  {...register("supplierId", {
                    required: "Supplier is required",
                  })}
                >
                  <option value="">Select a Supplier</option>
                  {invoiceAddDetails.supplier.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.desc}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Invoice Number"
                name="invoiceno"
                error={errors.invoiceno}
              >
                <input
                  type="text"
                  id="invoiceno"
                  placeholder="Enter Invoice No."
                  className={selectStyles}
                  {...register("invoiceno", {
                    required: "Invoice number is required",
                  })}
                />
              </FormField>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all"
                >
                  <FileSearch size={18} />
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  title="Reset Form"
                  className="p-2.5 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition-all"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          </form>
          {/*  */}
          {/* 3. Invoice Details */}
          {invoiceAddDetails.showDetails && invoiceDetails && (
            <div className="p-4 sm:p-6 bg-white dark:bg-gray-900/50 rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                Invoice Details
              </h3>
              <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                <DetailItem
                  label="Invoice Number"
                  value={invoiceDetails[0].invoice_no}
                />
                <DetailItem
                  label="Invoice Date"
                  value={invoiceDetails[0].invoice_date}
                />
                <DetailItem
                  label="Supplier"
                  value={invoiceDetails[0].supplier_name}
                />
                <DetailItem
                  label="Order Info"
                  value={invoiceDetails[0].description}
                />
                <DetailItem
                  label="Gross Bill Amount"
                  value={`₹ ${invoiceDetails[0].gross_bill_amount}`}
                />
                <DetailItem
                  label="TDS on GST"
                  value={`₹ ${invoiceDetails[0].tds_on_gst}`}
                />
                <DetailItem
                  label="Net Payable Amount"
                  value={`₹ ${invoiceDetails[0].net_pay_amount}`}
                />
              </dl>
            </div>
          )}
          {/* 4. Challan Link Section */}
          {invoiceAddDetails.showChallans && (
            <div className="p-4 sm:p-6 bg-white dark:bg-gray-900/50 rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Link Challans
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={appendRow}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all"
                  >
                    <Plus size={16} /> Add Row
                  </button>
                  <button
                    type="button"
                    onClick={removeRow}
                    disabled={rows.length <= 1}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus size={16} /> Remove Row
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {rows.map((row, index) => (
                  <div
                    key={row.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <h4 className="sr-only">Row {index + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Phase */}
                      <FormField label="Phase" name={`phase-${row.id}`}>
                        <select
                          className={selectStyles}
                          onChange={(e) => handleChange(e, "phase", row.id)}
                          value={row.phase}
                        >
                          <option value="">Select Phase</option>
                          {invoiceLinkChallanDetails?.phase?.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.desc}
                            </option>
                          ))}
                        </select>
                      </FormField>

                      {/* District */}
                      <FormField label="District" name={`district-${row.id}`}>
                        <select
                          className={selectStyles}
                          onChange={(e) => handleChange(e, "district", row.id)}
                          value={row.district}
                          disabled={
                            !dropdownData[row.id]?.districts ||
                            dropdownData[row.id]?.districts.length === 0
                          }
                        >
                          <option value="">Select District</option>
                          {dropdownData[row.id]?.districts?.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.desc}
                            </option>
                          ))}
                        </select>
                      </FormField>

                      {/* Block/Municipality */}
                      <FormField label="Block" name={`block-${row.id}`}>
                        <select
                          className={selectStyles}
                          onChange={(e) => handleChange(e, "block", row.id)}
                          value={row.block}
                          disabled={
                            !dropdownData[row.id]?.blocks ||
                            dropdownData[row.id]?.blocks.length === 0
                          }
                        >
                          <option value="">Select Block</option>
                          {dropdownData[row.id]?.blocks?.map((block) => (
                            <option key={block.id} value={block.id}>
                              {block.desc}
                            </option>
                          ))}
                        </select>
                      </FormField>

                      {/* Delivery Location */}
                      <FormField label="Location" name={`location-${row.id}`}>
                        <select
                          className={selectStyles}
                          onChange={(e) => handleChange(e, "location", row.id)}
                          value={row.location}
                          disabled={
                            !dropdownData[row.id]?.locations ||
                            dropdownData[row.id]?.locations.length === 0
                          }
                        >
                          <option value="">Select Location</option>
                          {dropdownData[row.id]?.locations?.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.desc}
                            </option>
                          ))}
                        </select>
                      </FormField>

                      {/* Challan Number */}
                      <FormField label="Challan" name={`challan-${row.id}`}>
                        <select
                          className={selectStyles}
                          onChange={(e) => handleChange(e, "challan", row.id)}
                          value={row.challan}
                          disabled={
                            !dropdownData[row.id]?.challans ||
                            dropdownData[row.id]?.challans.length === 0
                          }
                        >
                          <option value="">Select Challan</option>
                          {dropdownData[row.id]?.challans?.map((challan) => (
                            <option key={challan.id} value={challan.id}>
                              {challan.desc}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-8 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 transition-all"
                  onClick={handleLinkClick}
                >
                  <Link2 size={18} />
                  Link All Challans
                </button>
              </div>
            </div>
          )}
        </div>
        {loading && <Loader />} {/* 👈 show the loader component */}
      </AdminAuthenticatedLayout>
      {/* Modal section */}
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

export default InvoiceLinkChallan;
