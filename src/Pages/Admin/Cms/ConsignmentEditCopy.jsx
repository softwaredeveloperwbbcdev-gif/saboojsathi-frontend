import React, { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

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

const ConsignmentEdit = () => {
  const navigate = useNavigate();
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm({});
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const phaseOnChange = watch("phase");
  const districtOnChange = watch("district");
  const blockOnChange = watch("block");

  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [cmsConsignEditData, setCmsConsignEditData] = useState([]);
  const [cmsConsignmentEditStoreData, setCmsConsignmentEditStoreData] =
    useState({
      csupplier: [],
      cphase: [],
      cdistricts: [],
      cblocks: [],
      ccyleType: [],
      cdeliveryCenter: [],
    });
  const { consignmentId } = useParams();

  useEffect(() => {
    if (consignmentId) showViewConsignment(consignmentId);
  }, []);

  const showViewConsignment = async (consignmentId) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsconsignmentdataeditonly`, {
        consignmentId: consignmentId,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setCmsConsignEditData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////
  // useEffect(() => {
  //   if (cmsConsignEditData.phase) {
  //     fetchDistrict(cmsConsignEditData.phase);
  //   }
  // }, [cmsConsignEditData.did]);

  // useEffect(() => {
  //   if (cmsConsignEditData.did) {
  //     fetchBlocks(cmsConsignEditData[0].did);
  //   }
  // }, [cmsConsignEditData.bid]);

  useEffect(() => {
    if (cmsConsignEditData && Object.keys(cmsConsignEditData).length > 0) {
      fetchAllDetails(
        cmsConsignEditData[0].phase,
        cmsConsignEditData[0].did,
        cmsConsignEditData[0].bid
      );
    }
  }, [cmsConsignEditData]);

  const fetchAllDetails = async (phase, district, block) => {
    const searchData = {
      phase: phase,
      district: district,
      block: block,
    };
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `consignmentadddetailsplain`,
        searchData
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setCmsConsignmentEditStoreData((prev) => ({
          ...prev,
          csupplier: [response.data.supplier_name] || [],
          cphase: response.data.supplier_phase || [],
          cdistricts: response.data.district || [],
          cblocks: response.data.blocks || [],
          cdeliveryCenter: response.data.location || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const convertFromBackendTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.slice(0, 5); // Cut off seconds
  };

  useEffect(() => {
    if (
      cmsConsignmentEditStoreData.cdeliveryCenter.length > 0 &&
      isInitialLoad
    ) {
      // alert("wwww---"+JSON.stringify(cmsConsignEditData));
      reset({
        consignment_no: cmsConsignEditData[0].consignment_no,
        tracking_no: cmsConsignEditData[0].tracking_no,
        supplier_brand: cmsConsignEditData[0].supplier_id,
        consignment_date: cmsConsignEditData[0].consignment_date,
        phase: cmsConsignEditData[0].phase,
        district: cmsConsignEditData[0].did,
        block: cmsConsignEditData[0].bid,
        location: cmsConsignEditData[0].location_id,
        truckno: cmsConsignEditData[0].truck_no,
        drivername: cmsConsignEditData[0].driver_name,
        drivermob: cmsConsignEditData[0].driver_mobile_no,
        driveraltmob: cmsConsignEditData[0].driver_alt_mob_no,
        dispacthdate: cmsConsignEditData[0].dispatch_date,
        dispacthtime: convertFromBackendTime(
          cmsConsignEditData[0].dispatch_time
        ),
        arrivaldate: cmsConsignEditData[0].exptd_arrival_date,
        arrivaltime: convertFromBackendTime(
          cmsConsignEditData[0].exptd_arrival_time
        ),
        boyscycle: cmsConsignEditData[0].qty_boys,
        girlscycle: cmsConsignEditData[0].qty_girls,
      });
      setIsInitialLoad(false); // 👈 important
    }
  }, [cmsConsignmentEditStoreData]);

  useEffect(() => {
    if (phaseOnChange) {
      fetchDistrict(phaseOnChange);
    }
  }, [phaseOnChange]);

  const fetchDistrict = async (phase) => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmsdistrictchallanget/${phase}`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setCmsConsignmentEditStoreData((prev) => ({
          ...prev,
          cdistricts: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (districtOnChange) {
      fetchBlocks(districtOnChange);
    }
  }, [districtOnChange]);

  const fetchBlocks = async (districtChallan) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `cmsblockchallanget/${districtChallan}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setCmsConsignmentEditStoreData((prev) => ({
          ...prev,
          cblocks: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blockOnChange && phaseOnChange && districtOnChange) {
      fetchDeliveryLocation(phaseOnChange, districtOnChange, blockOnChange);
    }
  }, [blockOnChange]);

  const fetchDeliveryLocation = async (phase, district, block) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `cmsdeliverylocget/${phase}/${district}/${block}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setCmsConsignmentEditStoreData((prev) => ({
          ...prev,
          cdeliveryCenter: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formSubmit = async (formdata) => {
    const formattedTime = (time) =>
      time && time.length === 5 ? `${time}:00` : time;
    const newFormData = {
      ...formdata,
      dispacthtime: formattedTime(formdata.dispacthtime),
      arrivaltime: formattedTime(formdata.arrivaltime),
      serial: sl,
    };
    // console.log("Submitted Form Data:", newFormData);
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `cmsconsignmenteditdivertsave`,
        newFormData
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        toast.success(response.data.message);
        // alert(JSON.stringify(response.data));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
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
          disabled={props.disabled}
          style={props.style}
          {...regProps}
        >
          <option value="">{placeholder}</option>
          {options?.map((item) => (
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
                    Edit Consignment
                  </span>

                  <small className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-0.5 ml-10">
                    Update details for shipment
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
                      readOnly={true}
                      style={{
                        backgroundColor: "#f3f3f3",
                        cursor: "not-allowed",
                      }}
                    />

                    {/* Supplier */}
                    <SelectField
                      label="Supplier"
                      name="supplier_brand"
                      placeholder="Select Supplier"
                      options={cmsConsignmentEditStoreData.csupplier}
                      disabled={true}
                      style={{
                        backgroundColor: "#f3f3f3",
                        cursor: "not-allowed",
                      }}
                    />

                    {/* Date */}
                    <InputField
                      label="Consignment Date"
                      name="consignment_date"
                      type="date"
                      className="bg-gray-50 dark:bg-gray-700"
                      disabled={true}
                      style={{
                        backgroundColor: "#f3f3f3",
                        cursor: "not-allowed",
                      }}
                    />

                    {/* Phase - Cascading Parent 1 */}
                    <SelectField
                      label="Phase"
                      name="phase"
                      placeholder="Select Phase"
                      options={cmsConsignmentEditStoreData.cphase}
                      isCascading={true}
                      disabled={true}
                      style={{
                        backgroundColor: "#f3f3f3",
                        cursor: "not-allowed",
                      }}
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
                        options={cmsConsignmentEditStoreData.cdistricts}
                        isCascading={true}
                      />

                      {/* Block - Cascading Parent 3 */}
                      <SelectField
                        label="Block"
                        name="block"
                        placeholder="Select Block"
                        options={cmsConsignmentEditStoreData.cblocks}
                        isCascading={true}
                      />

                      {/* Delivery Location - Cascading Child */}
                      <SelectField
                        label="Delivery Location"
                        name="location"
                        placeholder="Select Delivery Location"
                        options={cmsConsignmentEditStoreData.cdeliveryCenter}
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
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
                      />

                      <InputField
                        label="Driver Name"
                        name="drivername"
                        placeholder="Enter Driver's Full Name"
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
                      />

                      <InputField
                        label="Driver Mobile"
                        name="drivermob"
                        type="tel"
                        placeholder="Driver Mobile Number"
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
                      />

                      <InputField
                        label="Driver Alt. Mobile"
                        name="driveraltmob"
                        type="tel"
                        placeholder="Alternative Contact Number"
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
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
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
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
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
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
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
                      />

                      <InputField
                        label="Girls Bi-cycle Quantity"
                        name="girlscycle"
                        placeholder="No. of Girls Cycles (E.g., 100)"
                        type="number"
                        step="1"
                        min="0"
                        disabled={true}
                        style={{
                          backgroundColor: "#f3f3f3",
                          cursor: "not-allowed",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 p-6 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-150 shadow-md"
                  >
                    Cancel
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-150 shadow-lg shadow-blue-500/50 dark:shadow-blue-600/50"
                  >
                    {loading ? "Updating..." : "Update Consignment"}
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

export default ConsignmentEdit;
//
