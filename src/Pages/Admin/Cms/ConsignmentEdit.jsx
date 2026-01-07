import React, { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import InputError from "../../../Components/InputError";
import Loader from "../../../Components/Loader";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ConsignmentEdit = () => {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm({
    // defaultValues:{
    //   is_urgent: "No"
    // }
  });
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const divertion = watch("divert");
  const phaseOnChange = watch("phase");
  const districtOnChange = watch("district");
  const blockOnChange = watch("block");
  const locationChange = watch("location");
  // alert(divertion);
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
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
  const { sl, t, p } = useParams();
  // console.log(sl + "--" + t + "--" + p);

  ////////////////////////////////////////////
  useEffect(() => {
    // alert("hii");
    if (sl && t && p) showViewConsignment(sl, t, p);
  }, []);
  ////////////////////////////////////////////
  const showViewConsignment = async (sl, t, p) => {
    // alert("hii");
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsconsignmentdataeditonly`, {
        db_serial: sl,
        tracking_no: t,
        phase: p,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        // alert(JSON.stringify(response.data));
        setCmsConsignEditData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////
  useEffect(() => {
    if (cmsConsignEditData.did) {
      // alert(cmsConsignEditData);
      fetchDistrict(p);
    }
  }, [cmsConsignEditData.did]); // run when phase changes
  useEffect(() => {
    if (cmsConsignEditData.did) {
      // alert(cmsConsignEditData);
      fetchBlocks(cmsConsignEditData.did);
    }
  }, [cmsConsignEditData.bid]); // run when phase changes

  useEffect(() => {
    if (cmsConsignEditData && Object.keys(cmsConsignEditData).length > 0) {
      // alert("see mee-" + JSON.stringify(cmsConsignEditData));
      fetchAllDetails(p, cmsConsignEditData[0].did, cmsConsignEditData[0].bid);
    }
  }, [cmsConsignEditData]); // run when get data from backend
  // if(divertion == "Yes")
  // {
  //   reset({
  //      district: "",
  //      block: "",
  //      location: "",
  //     });
  // }
  const fetchAllDetails = async (phase, district, block) => {
    // alert("hiiii-" + phase, district, block);
    const searchData = {
      phase: phase,
      district: district,
      block: block,
    };
    setLoading(true);
    try {
      const response = await callApi("POST", `consignmentadddetailsplain`, {
        phase: phase,
        district: district,
        block: block,
      });
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
    // Converts "15:45:00" => "15:45"
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

  return (
    <AdminAuthenticatedLayout>
      <div className="bg-white rounded shadow mb-6">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Consignment
            <small className="block text-sm text-gray-500">
              Edit Consignment
            </small>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)}>
          {loading && <Loader />} {/* 👈 show the loader component */}
          <div className="w-full px-4 md:px-8 py-6">
            <div className="space-y-6">
              {/* Row 1: Consignment No & Supplier */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Consignment No */}
                <div>
                  <InputLabel
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="Consignment"
                    value="Consignment No (L.R)"
                  />
                  <TextInput
                    type="text"
                    name="consignment_no"
                    placeholder="Consignment No (L.R)"
                    maxLength={20}
                    className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    readOnly
                    {...register("consignment_no", {
                      required: "Consignment No Is required",
                    })}
                  />
                  <InputError
                    message={
                      errors.consignment_no?.message ||
                      backendErrors.consignment_no?.[0]
                    }
                  />
                </div>
                <div>
                  <InputLabel
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="Tracking No"
                    value="Tracking No"
                  />
                  <TextInput
                    type="text"
                    name="tracking_no"
                    placeholder="Tracking No"
                    maxLength={20}
                    className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    readOnly
                    {...register("tracking_no", {
                      required: "Consignment No Is required",
                    })}
                  />
                  <InputError
                    message={
                      errors.tracking_no?.message ||
                      backendErrors.tracking_no?.[0]
                    }
                  />
                </div>
                {/* Supplier */}
                <div>
                  <InputLabel
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="Supplier"
                    value="Supplier"
                  />
                  <SelectInput
                    name="supplier_brand"
                    className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    disabled
                    // value={consignmentAddData.csupplier[0]?.id || ""}
                    {...register("supplier_brand", {
                      required: "Supplier Brand  is required",
                    })}
                  >
                    <option value="">Select Supplier</option>
                    {cmsConsignmentEditStoreData.csupplier.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>

              {/* Row 2: Date & Phase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div>
                  <InputLabel
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="Date"
                    value="Date"
                  />
                  <TextInput
                    type="date"
                    name="consignment_date"
                    placeholder="Date"
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    disabled
                    {...register("consignment_date", {
                      required: "Consignment date is required",
                    })}
                  />
                </div>

                {/* Phase */}
                <div>
                  <InputLabel
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="Phase"
                    value="Phase"
                  />
                  <SelectInput
                    name="phase"
                    className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    {...register("phase", {
                      required: "Phase no is required",
                      onChange: (e) => {
                        // const selectedPhase_ = phaseOnChange; //e.target.value;
                        const phaseOnChange_ = watch("phase");
                        setValue("phase", phaseOnChange_); // ⬅ Update form value manually
                        setValue("district", "");
                        fetchDistrict(phaseOnChange_);
                      },
                    })}
                  >
                    <option value="">Select Phase</option>
                    {cmsConsignmentEditStoreData.cphase.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>
              {/*  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Destination Details
                  </h3>
                  {/* Field 1 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="District"
                      value="District"
                    />
                    <SelectInput
                      name="district"
                      className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      {...register("district", {
                        required: "District no is required",
                        onChange: (e) => {
                          // const selectedPhase_ = phaseOnChange; //e.target.value;
                          const districtOnChange_ = watch("district");
                          setValue("district", districtOnChange_); // ⬅ Update form value manually
                          setValue("block", "");
                          fetchBlocks(districtOnChange_);
                        },
                      })}
                    >
                      <option value="">Select District</option>
                      {cmsConsignmentEditStoreData.cdistricts.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  {/* Field 2 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="Block"
                      value="Block"
                    />
                    <SelectInput
                      name="block"
                      className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      {...register("block", {
                        required: "Block is required",
                        onChange: (e) => {
                          // const selectedPhase_ = phaseOnChange; //e.target.value;
                          const blockOnChange__ = watch("phase");
                          const districtOnChange__ = watch("district");
                          const blockOnChange_ = watch("block");
                          setValue("location", blockOnChange_); // ⬅ Update form value manually
                          setValue("location", "");
                          fetchDeliveryLocation(
                            blockOnChange__,
                            districtOnChange__,
                            blockOnChange_
                          );
                        },
                      })}
                    >
                      <option value="">Select Block</option>
                      {cmsConsignmentEditStoreData.cblocks.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  {/* Field 3 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="location"
                      value="Delivery Location"
                    />
                    <SelectInput
                      name="location"
                      className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      {...register("location", {
                        required: "Location is required",
                      })}
                    >
                      <option value="">Select Location</option>
                      {cmsConsignmentEditStoreData.cdeliveryCenter.map(
                        (cls) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.desc}
                          </option>
                        )
                      )}
                    </SelectInput>
                  </div>
                  {/* Field 4 */}
                  {/* Yes/No Toggle */}
                  <div className="mt-4">
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      value="Do You Want To Divert?"
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Yes"
                          {...register("divert", {
                            required: "Please select an option",
                          })}
                          className="form-radio"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="No"
                          {...register("divert")}
                          className="form-radio"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <InputError message={errors.divert?.message} />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Vehicle Details
                  </h3>
                  {/* Field 3 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="truckno"
                      value="Truck No"
                    />
                    <TextInput
                      type="text"
                      name="truckno"
                      placeholder="Truck No"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("truckno", {
                        required: "Truck No. is required",
                      })}
                    />
                    <InputError message={errors.truckno?.message} />
                  </div>

                  {/* Field 4 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="drivername"
                      value="Driver Name"
                    />
                    <TextInput
                      type="text"
                      name="drivername"
                      placeholder="Driver Name"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("drivername", {
                        required: "Driver name is required",
                      })}
                    />
                    <InputError message={errors.drivername?.message} />
                  </div>
                  {/* Field 4 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="drivername"
                      value="Driver Mob"
                    />
                    <TextInput
                      type="text"
                      name="drivermob"
                      placeholder="Driver Mobile Number"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("drivermob", {
                        required: "Driver Mobile No. is required",
                      })}
                    />
                  </div>
                  {/* Field 4 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="drivermobalt"
                      value="Driver Alt. Mob"
                    />
                    <TextInput
                      type="text"
                      name="driveraltmob"
                      placeholder="Driver Alernative Contact Number"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("driveraltmob", {
                        // required: "Driver Alt Mobile No. is required",
                      })}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Dispatch Details
                  </h3>
                  {/* Field 1 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="date"
                      value="Dispatch Date"
                    />
                    <TextInput
                      type="date"
                      name="dispacthdate"
                      placeholder="Dispatch Date"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("dispacthdate", {
                        required: "Dispatch Date is required",
                      })}
                    />
                  </div>

                  {/* Field 2 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="date"
                      value="Dispatch Time"
                    />
                    <TextInput
                      type="time"
                      name="dispacthtime"
                      placeholder="Dispatch Time"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("dispacthtime", {
                        required: "Dispatch Time is required",
                      })}
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Expected Arrival Details
                  </h3>
                  {/* Field 3 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="date"
                      value="Arrival Date"
                    />
                    <TextInput
                      type="date"
                      name="arrivaldate"
                      placeholder="Arrival Date"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("arrivaldate", {
                        required: "Dispatch Date is required",
                      })}
                    />
                  </div>

                  {/* Field 4 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="time"
                      value="Arrival Time"
                    />
                    <TextInput
                      type="time"
                      name="arrivaltime"
                      placeholder="Arrival Time"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("arrivaltime", {
                        required: "Dispatch Time is required",
                      })}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Quantity Details
                  </h3>
                  {/* Field 1 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="bcycle"
                      value="Boys Bi-cycle "
                    />
                    <TextInput
                      type="text"
                      name="noofcycleb"
                      placeholder="No. of Boys Cycle"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("boyscycle", {
                        required: "Figure is required",
                      })}
                    />
                  </div>

                  {/* Field 2 */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="gcycle"
                      value="Girls Bi-cycle "
                    />
                    <TextInput
                      type="text"
                      name="noofcycleg"
                      placeholder="No. of Boys Cycle"
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                      {...register("girlscycle", {
                        required: "Figure is required",
                      })}
                    />
                  </div>
                </div>

                {/* Column 2 */}
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center gap-4 px-4 md:px-8 pb-6">
            {/* Reset Button */}
            <button
              type="reset"
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Reset
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AdminAuthenticatedLayout>
  );
};

export default ConsignmentEdit;
//
