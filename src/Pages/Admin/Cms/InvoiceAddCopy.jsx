import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Mock Imports (replace with your actual components)
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import Loader from "../../../Components/Loader";

// Helper component for form fields to reduce repetition
const FormField = ({ label, name, register, errors, children }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    {children}
    {errors[name] && (
      <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
    )}
  </div>
);

const InvoiceAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [invoiceAddDetails, setInvoiceAddDetails] = useState({
    supplier: [],
    order: [],
  });

  // Watch for changes in these fields
  const supplier_id = watch("supplierId");
  const grossBillAmount = watch("grossBillAmount");

  // Use your existing API hook logic
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("Form Data Submitted:", formData);
    try {
      const response = await callApi("POST", `invoiceaddsave`, formData);
      if (response.error) {
        toast.error(`Failed to save invoice: ${response.message}`);
      } else {
        toast.success(response.data.message);
        reset(); // Clear form on successful submission
      }
    } catch (err) {
      toast.error(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial supplier data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await callApi("POST", `invoiceaddsupplierdetails`);
        if (response.error) {
          toast.error(`Failed to fetch suppliers: ${response.message}`);
        } else {
          setInvoiceAddDetails((prev) => ({
            ...prev,
            supplier: response.data,
          }));
        }
      } catch (err) {
        toast.error(`An unexpected error occurred: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch order details when a supplier is selected
  useEffect(() => {
    if (supplier_id) {
      const orderDetails = async () => {
        setLoading(true);
        try {
          const response = await callApi("POST", `invoiceaddorderdetails`, {
            id: supplier_id,
          });
          if (response.error) {
            toast.error(`Failed to fetch orders: ${response.message}`);
          } else {
            // Clear previously selected order when supplier changes
            setValue("orderId", "");
            setInvoiceAddDetails((prev) => ({ ...prev, order: response.data }));
          }
        } catch (err) {
          toast.error(`An unexpected error occurred: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      orderDetails();
    } else {
      // Clear orders if no supplier is selected
      setInvoiceAddDetails((prev) => ({ ...prev, order: [] }));
      setValue("orderId", "");
    }
  }, [supplier_id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-calculate financial fields when gross amount changes
  useEffect(() => {
    const amount = parseFloat(grossBillAmount);

    if (!isNaN(amount) && grossBillAmount !== "") {
      // Assuming a GST of 12%
      const taxable = amount / 1.12;
      // Assuming TDS on GST is 2% of the taxable amount
      const tds = taxable * 0.02;
      const net = amount - tds;

      setValue("taxableAmount", taxable.toFixed(2));
      setValue("tdsOnGst", tds.toFixed(2));
      setValue("netPayableAmount", net.toFixed(2));
    } else {
      // Clear fields if grossBillAmount is empty or invalid
      setValue("taxableAmount", "");
      setValue("tdsOnGst", "");
      setValue("netPayableAmount", "");
    }
  }, [grossBillAmount, setValue]);

  const inputStyles =
    "block w-full px-4 py-2.5 text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300";

  return (
    <>
      <AdminAuthenticatedLayout>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Create New Invoice
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Fill in the details below to add a new invoice to the system.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white dark:bg-gray-900/50 rounded-xl shadow-md space-y-6 ring-1 ring-gray-200 dark:ring-gray-800"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Invoice Number */}
              <FormField
                label="Invoice Number"
                name="invoiceNo"
                errors={errors}
              >
                <input
                  type="text"
                  id="invoiceNo"
                  placeholder="e.g., INV-2025-001"
                  className={inputStyles}
                  {...register("invoiceNo", {
                    required: "Invoice number is required",
                  })}
                />
              </FormField>

              {/* Invoice Date */}
              <FormField
                label="Invoice Date"
                name="invoiceDate"
                errors={errors}
              >
                <input
                  type="date"
                  id="invoiceDate"
                  className={inputStyles}
                  {...register("invoiceDate", {
                    required: "Invoice date is required",
                  })}
                />
              </FormField>

              {/* Supplier */}
              <FormField label="Supplier" name="supplierId" errors={errors}>
                <select
                  id="supplierId"
                  className={inputStyles}
                  {...register("supplierId", {
                    required: "Please select a supplier",
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

              {/* Order */}
              <FormField
                label="Order No, Date & Quantity"
                name="orderId"
                errors={errors}
              >
                <select
                  id="orderId"
                  className={inputStyles}
                  {...register("orderId", {
                    required: "Please select an order",
                  })}
                  disabled={
                    !supplier_id || invoiceAddDetails.order.length === 0
                  }
                >
                  <option value="">Select an Order</option>
                  {invoiceAddDetails.order.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.desc}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Gross Bill Amount */}
              <FormField
                label="Gross Bill Amount (₹)"
                name="grossBillAmount"
                errors={errors}
              >
                <input
                  type="number"
                  id="grossBillAmount"
                  placeholder="e.g., 11200.00"
                  className={inputStyles}
                  {...register("grossBillAmount", {
                    required: "Gross bill amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid amount",
                    },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Taxable Amount (Read-only) */}
              <FormField
                label="Taxable Amount (₹)"
                name="taxableAmount"
                errors={errors}
              >
                <input
                  type="number"
                  id="taxableAmount"
                  readOnly
                  placeholder="Calculated automatically"
                  className={`${inputStyles} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                  {...register("taxableAmount", {
                    required: "Taxable amount is required",
                  })}
                />
              </FormField>

              {/* TDS on GST (Read-only) */}
              <FormField label="TDS on GST (₹)" name="tdsOnGst" errors={errors}>
                <input
                  type="number"
                  id="tdsOnGst"
                  readOnly
                  placeholder="Calculated automatically"
                  className={`${inputStyles} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                  {...register("tdsOnGst", {
                    required: "TDS on GST is required",
                  })}
                />
              </FormField>

              {/* Net Payable Amount (Read-only) */}
              <FormField
                label="Net Payable Amount (₹)"
                name="netPayableAmount"
                errors={errors}
              >
                <input
                  type="number"
                  id="netPayableAmount"
                  readOnly
                  placeholder="Calculated automatically"
                  className={`${inputStyles} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                  {...register("netPayableAmount", {
                    required: "Net payable amount is required",
                  })}
                />
              </FormField>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition-all"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all"
              >
                Submit Invoice
              </button>
            </div>
          </form>
        </div>
        {loading && <Loader />}
      </AdminAuthenticatedLayout>

      {/* Logout Modal/Popup */}
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default InvoiceAdd;
