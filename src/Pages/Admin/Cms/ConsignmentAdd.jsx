import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { MapPin, Truck, Package } from "lucide-react";

const InputLabel = ({ htmlFor, value, className = "", children, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    {...props}
  >
    {value || children}
  </label>
);

const TextInput = ({ className = "", name, ...props }) => (
  <input
    name={name}
    className={`mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${className}`}
    {...props}
  />
);

const SelectInput = ({ className = "", name, children, ...props }) => (
  <select
    name={name}
    className={`mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

const InputError = ({ message, className = "" }) => {
  return message ? (
    <p className={`text-xs text-red-500 mt-1 ${className}`}>{message}</p>
  ) : null;
};

const ConsignmentAdd = () => {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm({});

  const [loading, setLoading] = useState(false);
  const phase = watch("phase");
  const district = watch("district");
  const block = watch("block");

  const [consignmentAddData, setConsignmentAddData] = useState({
    csupplier: [],
    cphase: [],
    cdistricts: [],
    cblocks: [],
    ccyleType: [],
    cdeliveryCenter: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", "cmsconsignmentadddetails");
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setConsignmentAddData((prev) => ({
          ...prev,
          csupplier: response.data.supplier_name || [],
          cphase: response.data.supplier_phase || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    ///////////////////////+
  };

  useEffect(() => {
    if (phase) {
      fetcDistrict(phase);
    }
  }, [phase]); // run when phase changes

  useEffect(() => {
    if (district) {
      // Make the API call when phase changes
      fetchBlocks(district);
    }
  }, [district]); // run when phase changes

  const fetcDistrict = async (phase) => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmsdistrictchallan/${phase}`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setConsignmentAddData((prev) => ({
          ...prev,
          cdistricts: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    //////////////////////////
  };

  const fetchBlocks = async (districtChallan) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `cmsblockchallan/${districtChallan}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setConsignmentAddData((prev) => ({
          ...prev,
          cblocks: response.data || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    //////////////////////////
  };

  useEffect(() => {
    if (phase && district && block) {
      // Make the API call when phase changes
      fetchDeliveryLocation(phase, district, block);
    }
  }, [block]);

  const fetchDeliveryLocation = async (phase, district, block) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `cmsdeliveryloc/${phase}/${district}/${block}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setConsignmentAddData((prev) => ({
          ...prev,
          cdeliveryCenter: response.data || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    //////////////////////////
  };

  const formSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsconsignmentstore`, formdata);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        toast.success(response.data.message);
        reset();
        // alert(JSON.stringify(response.data));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    //////////////////////////
  };
  const InputLabel = ({
    htmlFor,
    value,
    className = "",
    children,
    ...props
  }) => (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    >
      {value || children}
    </label>
  );

  // Helper for SelectInput to integrate with useSimpleForm's register and watch
  const SelectField = ({
    label,
    name,
    options,
    placeholder,
    isCascading = false,
    ...props
  }) => {
    const { onChange, ...regProps } = register(name, props.rules);

    // Custom onChange handler for cascading fields
    const handleCascadingChange = (e) => {
      onChange(e); // Update form data
      // If this is a cascading field, it will trigger the useEffects above.
    };

    return (
      <div>
        <InputLabel htmlFor={name} value={label} />
        <SelectInput
          name={name}
          id={name}
          onChange={handleCascadingChange}
          {...regProps}
        >
          <option value="">{placeholder}</option>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.desc}
            </option>
          ))}
        </SelectInput>
        <InputError message={errors[name]?.message} />
      </div>
    );
  };

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    rules,
    ...props
  }) => {
    const fieldProps = register(name, rules);
    return (
      <div>
        <InputLabel htmlFor={name} value={label} />
        <TextInput
          type={type}
          id={name}
          placeholder={placeholder}
          {...fieldProps}
          {...props}
        />
        <InputError message={errors[name]?.message} />
      </div>
    );
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all mb-10 overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="border-b dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex flex-col">
                  <span className="flex items-center">
                    <Truck className="w-8 h-8 mr-3 text-blue-600 -mb-5" />
                    New Consignment
                  </span>

                  <small className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-0.5 ml-10">
                    Add details for a new shipment
                  </small>
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(formSubmit)} className="relative">
                {loading && <Loader />}

                <div className="p-6 space-y-8">
                  {/* Row 1 & 2: Main Details (Consignment No, Supplier, Date, Phase) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Consignment No */}
                    <InputField
                      label="Consignment No (L.R)"
                      name="consignment_no"
                      placeholder="Enter Consignment No (Max 20 chars)"
                      maxLength={20}
                    />

                    {/* Supplier */}
                    <SelectField
                      label="Supplier"
                      name="supplier_brand"
                      placeholder="Select Supplier"
                      options={consignmentAddData.csupplier}
                    />

                    {/* Date */}
                    <InputField
                      label="Consignment Date"
                      name="consignment_date"
                      type="date"
                      className="bg-gray-50 dark:bg-gray-700"
                    />

                    {/* Phase - Cascading Parent 1 */}
                    <SelectField
                      label="Phase"
                      name="phase"
                      placeholder="Select Phase"
                      options={consignmentAddData.cphase}
                      isCascading={true}
                    />
                  </div>

                  <hr className="dark:border-gray-700" />

                  {/* Destination Details and Vehicle Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Destination Details */}
                    <div className="space-y-6 p-4 border dark:border-gray-700 rounded-xl shadow-inner bg-gray-50 dark:bg-gray-900/50">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-500" />
                        Destination Details
                      </h3>

                      {/* District - Cascading Parent 2 */}
                      <SelectField
                        label="District"
                        name="district"
                        placeholder="Select District"
                        options={consignmentAddData.cdistricts}
                        isCascading={true}
                        disabled={
                          !phase || consignmentAddData.cdistricts.length === 0
                        }
                      />

                      {/* Block - Cascading Parent 3 */}
                      <SelectField
                        label="Block"
                        name="block"
                        placeholder="Select Block"
                        options={consignmentAddData.cblocks}
                        isCascading={true}
                        disabled={
                          !district || consignmentAddData.cblocks.length === 0
                        }
                      />

                      {/* Delivery Location - Cascading Child */}
                      <SelectField
                        label="Delivery Location"
                        name="location"
                        placeholder="Select Delivery Location"
                        options={consignmentAddData.cdeliveryCenter}
                        disabled={
                          !block ||
                          consignmentAddData.cdeliveryCenter.length === 0
                        }
                      />
                    </div>

                    {/* Column 2: Vehicle Details */}
                    <div className="space-y-6 p-4 border dark:border-gray-700 rounded-xl shadow-inner bg-gray-50 dark:bg-gray-900/50">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-yellow-500" />
                        Vehicle Details
                      </h3>

                      <InputField
                        label="Truck No"
                        name="truckno"
                        placeholder="Enter Truck Registration No"
                      />

                      <InputField
                        label="Driver Name"
                        name="drivername"
                        placeholder="Enter Driver's Full Name"
                      />

                      <InputField
                        label="Driver Mobile"
                        name="drivermob"
                        type="tel"
                        placeholder="Driver Mobile Number"
                      />

                      <InputField
                        label="Driver Alt. Mobile"
                        name="driveraltmob"
                        type="tel"
                        placeholder="Alternative Contact Number"
                      />
                    </div>
                  </div>

                  <hr className="dark:border-gray-700" />

                  {/* Dispatch, Arrival, and Quantity Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Dispatch Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        Dispatch
                      </h3>

                      <InputField
                        label="Dispatch Date"
                        name="dispacthdate"
                        type="date"
                      />

                      <InputField
                        label="Dispatch Time"
                        name="dispacthtime"
                        type="time"
                      />
                    </div>

                    {/* Column 2: Expected Arrival Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        Expected Arrival
                      </h3>

                      <InputField
                        label="Arrival Date"
                        name="arrivaldate"
                        type="date"
                      />

                      <InputField
                        label="Arrival Time"
                        name="arrivaltime"
                        type="time"
                      />
                    </div>

                    {/* Column 3: Quantity Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-blue-500" />
                        Quantity
                      </h3>

                      <InputField
                        label="Boys Bi-cycle Quantity"
                        name="boyscycle"
                        placeholder="No. of Boys Cycles (E.g., 100)"
                        type="number"
                        step="1"
                        min="0"
                      />

                      <InputField
                        label="Girls Bi-cycle Quantity"
                        name="girlscycle"
                        placeholder="No. of Girls Cycles (E.g., 100)"
                        type="number"
                        step="1"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 p-6 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={reset}
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-150 shadow-md"
                  >
                    Reset Form
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-150 shadow-lg shadow-blue-500/50 dark:shadow-blue-600/50"
                  >
                    {loading ? "Submitting..." : "Submit Consignment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
      {/* Modal section */}
    </>
  );
};

export default ConsignmentAdd;
//
