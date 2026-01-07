import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// Reusing existing imports (assuming they are set up or mocked as above)
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import { toast } from "react-toastify";
// Mock LogoutPopup for completeness (assuming it's a separate component)
// const LogoutPopup = () => <div>Logout Modal</div>; // Defined in mock section

const ChallanCmsEntry = () => {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distribution_phase: "",
      district: "",
      block: "",
      bicycle: "",
      deliveryCenter: "",
      no_of_bicycle: "",
      order_date_quantity: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  // const [applicantId, setApplicantId] = useState(null); // Assuming applicantId is used for MsgDisplayModal

  // Watch fields
  const phase = watch("distribution_phase");
  const districtChallan = watch("district");
  const blockChallan = watch("block");
  const orderDateQuantity = watch("order_date_quantity");
  const noOfBicycle = watch("no_of_bicycle");

  const [challanMasterData, setChallanMasterData] = useState({
    phase: [],
    districts: [],
    blocks: [],
    cyleType: [],
    deliveryCenter: [],
    orderDtQut: [],
    cycleDetails: {},
  });

  // 1. Initial Data Fetch (Phase, Cycle Type, Order Dt/Qty)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmsphase`);
      if (response.error) {
        toast.error(`Failed to fetch initial data: ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          phase: response.data.challanPhase || [],
          cyleType: response.data.challanCycle || [],
          orderDtQut: response.data.orderQtyDt || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected initial download error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Fetch Districts when Phase changes
  const fetchDistrict = async (phaseId) => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmsdistrictchallan/${phaseId}`);
      if (response.error) {
        toast.error(`Failed to fetch districts: ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          districts: response.data,
          // Reset dependent fields
          blocks: [],
          deliveryCenter: [],
        }));
        setValue("district", "");
        setValue("block", "");
        setValue("deliveryCenter", "");
      }
    } catch (err) {
      toast.error("Unexpected district download error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phase) {
      fetchDistrict(phase);
    } else {
      // Clear districts if phase is unselected
      setChallanMasterData((prev) => ({
        ...prev,
        districts: [],
        blocks: [],
        deliveryCenter: [],
      }));
      setValue("district", "");
      setValue("block", "");
      setValue("deliveryCenter", "");
    }
  }, [phase]);

  // 3. Fetch Blocks when District changes
  const fetchBlocks = async (districtId) => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmsblockchallan/${districtId}`);
      if (response.error) {
        toast.error(`Failed to fetch blocks: ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          blocks: response.data,
          // Reset dependent fields
          deliveryCenter: [],
        }));
        setValue("block", "");
        setValue("deliveryCenter", "");
      }
    } catch (err) {
      toast.error("Unexpected block download error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (districtChallan) {
      fetchBlocks(districtChallan);
    } else {
      // Clear blocks if district is unselected
      setChallanMasterData((prev) => ({
        ...prev,
        blocks: [],
        deliveryCenter: [],
      }));
      setValue("block", "");
      setValue("deliveryCenter", "");
    }
  }, [districtChallan]);

  // 4. Fetch Delivery Locations when Phase, District, Block change
  const fetchDeliveryLocation = async (phaseId, districtId, blockId) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `cmsdeliveryloc/${phaseId}/${districtId}/${blockId}`
      );
      if (response.error) {
        toast.error(`Failed to fetch delivery locations: ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          deliveryCenter: response.data,
        }));
      }
    } catch (err) {
      toast.error("Unexpected delivery location download error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phase && districtChallan && blockChallan) {
      fetchDeliveryLocation(phase, districtChallan, blockChallan);
    } else {
      // Clear delivery centers if block is unselected
      setChallanMasterData((prev) => ({ ...prev, deliveryCenter: [] }));
      setValue("deliveryCenter", "");
    }
  }, [phase, districtChallan, blockChallan]);

  // 5. Fetch Remaining Cycle when Order Date/Quantity changes
  const fetchRemainingCycle = async (orderDtQtyId) => {
    setLoading(true);
    try {
      const response = await callApi("GET", `cmscycleremain/${orderDtQtyId}`);
      if (response.error) {
        toast.error(
          `Failed to fetch remaining cycle data: ${response.message}`
        );
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          cycleDetails: response.data[0] || {},
        }));
      }
    } catch (err) {
      toast.error("Unexpected remaining cycle download error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderDateQuantity) {
      fetchRemainingCycle(orderDateQuantity);
    } else {
      setChallanMasterData((prev) => ({ ...prev, cycleDetails: {} }));
    }
  }, [orderDateQuantity]);

  // 6. Validation for No. of Bicycles (cannot exceed remaining)
  const skipClearError = useRef(false);

  useEffect(() => {
    const totalRemaining =
      challanMasterData.cycleDetails.order_quantity -
      challanMasterData.cycleDetails.requested_cycle;
    const isInvalid =
      noOfBicycle &&
      totalRemaining !== undefined &&
      parseInt(noOfBicycle) > totalRemaining;

    if (isInvalid) {
      skipClearError.current = true;
      setValue("no_of_bicycle", "");
      setError("no_of_bicycle", {
        type: "manual",
        message: `Value cannot be more than Remaining Cycle (${totalRemaining})`,
      });
    } else if (errors.no_of_bicycle && errors.no_of_bicycle.type === "manual") {
      // Only clear the custom error if the value is now valid
      if (!skipClearError.current) {
        clearErrors("no_of_bicycle");
      }
      skipClearError.current = false; // Reset flag
    } else {
      skipClearError.current = false; // Reset flag for other cases
    }
  }, [
    noOfBicycle,
    challanMasterData.cycleDetails,
    errors.no_of_bicycle,
    setError,
    clearErrors,
    setValue,
  ]);

  // 7. Form Submission
  const formSubmit = async (formdata) => {
    setLoading(true);
    setBackendErrors({}); // Clear previous backend errors
    try {
      const response = await callApi("POST", `cmschallansubmit`, formdata);
      if (response.error) {
        // Assuming backend sends a generic message or field-specific errors
        toast.error(`Submission Failed: ${response.message}`);
        // setBackendErrors(response.errors || {}); // If backend sends field errors
      } else {
        toast.success(response.message);
        // setSuccessMessage(response.message);
        // setShowModal(true);
        reset({
          distribution_phase: phase, // Keep phase selected
          district: districtChallan, // Keep district selected
          // Reset all other fields
          block: "",
          bicycle: "",
          deliveryCenter: "",
          no_of_bicycle: "",
          order_date_quantity: "",
        });
        // Refetch cycle details to update remaining count after a successful submission
        if (orderDateQuantity) {
          fetchRemainingCycle(orderDateQuantity);
        }
      }
    } catch (err) {
      toast.error("Unexpected submission error.");
    } finally {
      setLoading(false);
    }
  };

  const remainingCycleCount =
    challanMasterData.cycleDetails?.order_quantity -
    challanMasterData.cycleDetails?.requested_cycle;

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-10 transition-colors duration-300 relative">
            {/* Header Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Add Challan Entry
              </h3>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="space-y-6">
                {/* Row 1: Distribution Phase & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="distribution_phase"
                      {...register("distribution_phase", {
                        required: "Phase Is required",
                      })}
                    >
                      <option value="">Select Phase</option>
                      {challanMasterData.phase.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="distribution_phase"
                      value="Distribution Phase"
                    />
                    <InputError
                      message={
                        errors.distribution_phase?.message ||
                        backendErrors.distribution_phase?.[0]
                      }
                    />
                  </div>
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="district"
                      {...register("district", {
                        required: "District Is required",
                      })}
                      disabled={
                        !phase || challanMasterData.districts.length === 0
                      }
                    >
                      <option value="">Select District</option>
                      {challanMasterData.districts.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="district" value="District" />
                    <InputError
                      message={
                        errors.district?.message || backendErrors.district?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 2: Block & Type of Bicycle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="block"
                      {...register("block", { required: "Block Is required" })}
                      disabled={
                        !districtChallan ||
                        challanMasterData.blocks.length === 0
                      }
                    >
                      <option value="">Select Block</option>
                      {challanMasterData.blocks.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="block" value="Block/Municipality" />
                    <InputError
                      message={
                        errors.block?.message || backendErrors.block?.[0]
                      }
                    />
                  </div>
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="bicycle"
                      {...register("bicycle", {
                        required: "Cycle Is required",
                      })}
                    >
                      <option value="">Select Cycle</option>
                      {challanMasterData.cyleType.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel htmlFor="bicycle" value="Type of Bicycle" />
                    <InputError
                      message={
                        errors.bicycle?.message || backendErrors.bicycle?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 3: Delivery Center & Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="deliveryCenter"
                      {...register("deliveryCenter", {
                        required: "Delivery Center Is required",
                      })}
                      disabled={
                        !blockChallan ||
                        challanMasterData.deliveryCenter.length === 0
                      }
                    >
                      <option value="">Select Delivery Center</option>
                      {challanMasterData.deliveryCenter.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="deliveryCenter"
                      value="Delivery Center"
                    />
                    <InputError
                      message={
                        errors.deliveryCenter?.message ||
                        backendErrors.deliveryCenter?.[0]
                      }
                    />
                  </div>
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      id="order_date_quantity"
                      {...register("order_date_quantity", {
                        required: "Order Info Is required",
                      })}
                    >
                      <option value="">
                        --Select Order No, Date and Quantity--
                      </option>
                      {challanMasterData.orderDtQut.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="order_date_quantity"
                      value="Order No, Date and Quantity"
                    />
                    <InputError
                      message={
                        errors.order_date_quantity?.message ||
                        backendErrors.order_date_quantity?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 4: No. of Bicycles & Remaining Cycle Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <TextInput
                      id="no_of_bicycle"
                      type="number"
                      min="1"
                      placeholder="No Of Bicycles"
                      {...register("no_of_bicycle", {
                        required: "No Of Bicyle is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          parseInt(value) > 0 || "Value must be positive",
                      })}
                      disabled={!orderDateQuantity}
                    />
                    <InputLabel
                      htmlFor="no_of_bicycle"
                      value="Number Of Bicycles"
                    />
                    <InputError
                      message={
                        errors.no_of_bicycle?.message ||
                        backendErrors.no_of_bicycle?.[0]
                      }
                    />
                  </div>
                  <div className="flex items-center pt-2">
                    {orderDateQuantity &&
                      challanMasterData.cycleDetails?.order_quantity !==
                        undefined && (
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-md text-sm text-gray-800 dark:text-gray-200 w-full">
                          <p>
                            <span className="font-semibold">
                              Remaining Cycle:
                            </span>{" "}
                            <span
                              className={`${
                                remainingCycleCount <= 0
                                  ? "text-red-500 font-bold"
                                  : "text-green-600 dark:text-green-400 font-semibold"
                              }`}
                            >
                              {remainingCycleCount}
                            </span>
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold">
                              Total Ordered:
                            </span>{" "}
                            {challanMasterData.cycleDetails.order_quantity}
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold">
                              Total Requested:
                            </span>{" "}
                            {challanMasterData.cycleDetails.requested_cycle}
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* Submit/Reset Buttons */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-lg text-sm transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    disabled={loading}
                  >
                    Submit
                  </button>
                  <button
                    type="button" // Use type="button" for reset button to prevent form submission
                    onClick={() => reset()}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold px-8 py-2 rounded-lg text-sm transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    disabled={loading}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
          {loading && <Loader />} {/* Show loader component */}
        </section>
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

export default ChallanCmsEntry;

// Note: To run this code, you would need to include the mock dependencies
// or ensure the actual imported components and hooks are available in your project.
