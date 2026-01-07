import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

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
  const supplier_id = watch("supplierId");
  const grossBillAmount = watch("grossBillAmount");

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `invoiceaddsave`, formData);
      if (response.error) {
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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `invoiceaddsupplierdetails`);
      if (response.error) {
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

  useEffect(() => {
    if (supplier_id) {
      orderDetails();
    }
  }, [supplier_id]);

  const orderDetails = async () => {
    const postData = {
      id: supplier_id,
    };
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `invoiceaddorderdetails`,
        postData
      );
      if (response.error) {
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setInvoiceAddDetails((prev) => ({
          ...prev,
          order: response.data,
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const amount = parseFloat(grossBillAmount);

    if (!isNaN(amount) && grossBillAmount !== "") {
      const taxable = Math.floor(amount / 1.12);
      const tds = Math.floor((taxable * 2) / 100);
      const net = Math.floor(amount - tds);

      setValue("taxableAmount", taxable);
      setValue("tdsOnGst", tds);
      setValue("netPayableAmount", net);
    } else {
      // Clear fields if grossBillAmount is empty or invalid
      setValue("taxableAmount", "");
      setValue("tdsOnGst", "");
      setValue("netPayableAmount", "");
    }
  }, [grossBillAmount, setValue]);

  return (
    <>
      <AdminAuthenticatedLayout>
        Add Invoice
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-white rounded shadow"
        >
          {loading && <Loader />} {/* 👈 show the loader component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Invoice Number */}
              <div>
                <label className="block font-semibold">
                  Invoice Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Invoice No"
                  autoComplete="off"
                  {...register("invoiceNo", {
                    required: "Invoice number is required",
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.invoiceNo && (
                  <p className="text-red-500 text-sm">
                    {errors.invoiceNo.message}
                  </p>
                )}
              </div>

              {/* Supplier */}
              <div>
                <label className="block font-semibold">
                  Supplier <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("supplierId", {
                    required: "Supplier is required",
                  })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Supplier</option>
                  {invoiceAddDetails.supplier.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.desc}
                    </option>
                  ))}
                </select>
                {errors.supplierId && (
                  <p className="text-red-500 text-sm">
                    {errors.supplierId.message}
                  </p>
                )}
              </div>

              {/* Gross Bill Amount */}
              <div>
                <label className="block font-semibold">
                  Gross Bill Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Gross Bill Amount (Rs.)"
                  autoComplete="off"
                  {...register("grossBillAmount", {
                    required: "Gross bill amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Enter valid number",
                    },
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.grossBillAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.grossBillAmount.message}
                  </p>
                )}
              </div>

              {/* TDS on GST */}
              <div>
                <label className="block font-semibold">
                  TDS on GST <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="TDS on GST (Rs.)"
                  autoComplete="off"
                  {...register("tdsOnGst", {
                    required: "TDS on GST is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Enter valid number",
                    },
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.tdsOnGst && (
                  <p className="text-red-500 text-sm">
                    {errors.tdsOnGst.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Invoice Date */}
              <div>
                <label className="block font-semibold">
                  Invoice Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="DD-MM-YYYY"
                  autoComplete="off"
                  {...register("invoiceDate", {
                    required: "Invoice date is required",
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.invoiceDate && (
                  <p className="text-red-500 text-sm">
                    {errors.invoiceDate.message}
                  </p>
                )}
              </div>

              {/* Order */}
              <div>
                <label className="block font-semibold">
                  Order No, Date and Quantity{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("orderId", {
                    required: "Order selection is required",
                  })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">--Select Order--</option>
                  {invoiceAddDetails.order.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.desc}
                    </option>
                  ))}
                </select>
                {errors.orderId && (
                  <p className="text-red-500 text-sm">
                    {errors.orderId.message}
                  </p>
                )}
              </div>

              {/* Taxable Amount */}
              <div>
                <label className="block font-semibold">
                  Taxable Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Taxable Amount (Rs.)"
                  autoComplete="off"
                  {...register("taxableAmount", {
                    required: "Taxable amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Enter valid number",
                    },
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.taxableAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.taxableAmount.message}
                  </p>
                )}
              </div>

              {/* Net Payable Amount */}
              <div>
                <label className="block font-semibold">
                  Net Payable Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Net Payable Amount (Rs.)"
                  autoComplete="off"
                  {...register("netPayableAmount", {
                    required: "Net payable amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Enter valid number",
                    },
                  })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.netPayableAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.netPayableAmount.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Submit and Reset */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 ml-4 text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </AdminAuthenticatedLayout>
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

export default InvoiceAdd;
