import { useState, useEffect, useRef } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import Loader from "../../../Components/Loader";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";
import useApi from "../../../Hooks/useApi";
import { toast } from "react-toastify";

const ChallanCmsEntry = () => {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [backEndErr, setBackEndErr] = useState("");
  const phase = watch("distribution_phase"); // watch the phase field
  const districtChallan = watch("district");
  const blockChallan = watch("block");
  const bicycleChallan = watch("bicycle");
  const deliveryLocChallan = watch("deliveryCenter");
  const orderDateQuantity = watch("order_date_quantity");
  const noOfBicycle = watch("no_of_bicycle");
  const [challanMasterData, setChallanMasterData] = useState({
    phase: [],
    districts: [],
    blocks: [],
    cyleType: [],
    deliveryCenter: [],
    totalCycle: [],
    orderDtQut: [],
    cycleDetails: {},
  });
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const skipClearError = useRef(false);

  useEffect(() => {
    const requestedCycle =
      challanMasterData.cycleDetails?.order_quantity -
      challanMasterData.cycleDetails?.requested_cycle;
    if (
      noOfBicycle &&
      requestedCycle &&
      parseInt(noOfBicycle) > parseInt(requestedCycle)
    ) {
      skipClearError.current = true;
      setValue("no_of_bicycle", "");
      setError("no_of_bicycle", {
        type: "manual",
        message: "Value cannot be more than Remaining Cycle",
      });
    } else {
      // Only clear if we didn't just trigger the error
      if (!skipClearError.current) {
        clearErrors("no_of_bicycle");
      }
      skipClearError.current = false; // Reset flag
    }
  }, [noOfBicycle, challanMasterData.cycleDetails]);

  const formSubmit = async (formdata) => {
    console.log("Submitted Form Data:", formdata);
    // console.log(formdata);
    setLoading(true); // Start loader
    try {
      const response = await callApi("POST", `cmschallansubmit`, formdata);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        // setChallanData(response.data);
        toast.success(response.message);
        reset({
          block: "",
          no_of_bicycle: "",
          // ... other fields
        });
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
    /////////////////////
    setLoading(true); // Start loader
    try {
      const response = await callApi("GET", `cmsphase`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          phase: response.data.challanPhase || [],
          cyleType: response.data.challanCycle || [],
          orderDtQut: response.data.orderQtyDt || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (phase) {
      // Make the API call when phase changes
      //  alert(phase);
      fetcDistrict(phase);
    }
  }, [phase]); // run when phase changes

  useEffect(() => {
    if (districtChallan) {
      // Make the API call when phase changes
      fetchBlocks(districtChallan);
    }
  }, [districtChallan]); // run when phase changes
  const fetcDistrict = async (phase) => {
    setLoading(true); // Start loader
    try {
      const response = await callApi("GET", `cmsdistrictchallan/${phase}`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          districts: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchBlocks = async (districtChallan) => {
    setLoading(true); // Start loader
    try {
      const response = await callApi(
        "GET",
        `cmsblockchallan/${districtChallan}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          blocks: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phase && districtChallan && blockChallan) {
      // Make the API call when phase changes
      fetchDeliveryLocation(phase, districtChallan, blockChallan);
    }
  }, [phase, districtChallan, blockChallan]);
  const fetchDeliveryLocation = async (
    phase,
    districtChallan,
    blockChallan
  ) => {
    setLoading(true); // Start loader
    try {
      const response = await callApi(
        "GET",
        `cmsdeliveryloc/${phase}/${districtChallan}/${blockChallan}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          deliveryCenter: response.data, // ✅ Only update 'districts'
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (orderDateQuantity) {
      // alert(orderDateQuantity);
      fetchRemainingCycle(orderDateQuantity);
    }
  }, [orderDateQuantity]);
  const fetchRemainingCycle = async (orderDateQuantity) => {
    //////////////////
    setLoading(true); // Start loader
    try {
      const response = await callApi(
        "GET",
        `cmscycleremain/${orderDateQuantity}`
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanMasterData((prev) => ({
          ...prev,
          cycleDetails: response.data, // ✅ Only update 'districts'0]
        }));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4">
          <div className="bg-white shadow rounded-md p-6">
            <div className="border-b border-gray-200 mb-4 pb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <i className="fa fa-user" aria-hidden="true"></i>
                Add Challan
              </h3>
            </div>

            <div
              id="error"
              className="hidden text-center text-red-700 bg-red-100 border border-red-400 p-2 rounded mb-4"
              role="alert"
            ></div>
            <div
              id="success"
              className="hidden text-center text-green-700 bg-green-100 border border-green-400 p-2 rounded mb-4"
              role="alert"
            ></div>

            <form onSubmit={handleSubmit(formSubmit)}>
              {loading && <Loader />} {/* 👈 show the loader component */}
              <div className="space-y-6">
                {/* Row 1: Distribution Phase & District */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel
                      htmlFor="distribution_phase"
                      value="Distribution Phase"
                    />
                    <SelectInput
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
                    <InputError
                      message={
                        errors.distribution_phase?.message ||
                        backendErrors.distribution_phase?.[0]
                      }
                    />
                  </div>
                  <div>
                    <InputLabel htmlFor="district" value="District" />
                    <SelectInput
                      id="district"
                      {...register("district", {
                        required: "District Is required",
                      })}
                    >
                      <option value="">Select District</option>
                      {challanMasterData.districts.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError
                      message={
                        errors.district?.message ||
                        backendErrors.distribution_phase?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 2: Block & Type of Bicycle */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel htmlFor="block" value="Block/Municipality" />
                    <SelectInput
                      id="block"
                      {...register("block", {
                        required: "Block Is required",
                      })}
                    >
                      <option value="" disabled>
                        Select Block
                      </option>
                      {challanMasterData.blocks.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError
                      message={
                        errors.block?.message || backendErrors.block?.[0]
                      }
                    />
                  </div>
                  <div>
                    <InputLabel htmlFor="bicycle" value="Type of Bicycle" />
                    <SelectInput
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
                    <InputError
                      message={
                        errors.bicycle?.message || backendErrors.bicycle?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 3: Delivery Center & No. of Bicycles */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel htmlFor="center" value="Delivery Center" />
                    <SelectInput
                      id="deliveryCenter"
                      {...register("deliveryCenter", {
                        required: "Delivery Center Is required",
                      })}
                    >
                      <option value="">Select Delivery Center</option>
                      {challanMasterData.deliveryCenter.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError
                      message={
                        errors.deliveryCenter?.message ||
                        backendErrors.deliveryCenter?.[0]
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Number Of Bicycles<span className="text-red-500"> *</span>
                    </label>
                    <TextInput
                      id="no_of_bicycle"
                      placeholder="No Of Bicycles"
                      {...register("no_of_bicycle", {
                        required: "No Of Bicyle is required",
                      })}
                    />
                    <InputError
                      message={
                        errors.no_of_bicycle?.message ||
                        backendErrors.no_of_bicycle?.[0]
                      }
                    />
                  </div>
                </div>

                {/* Row 4: Order Info (Full Width or same row) */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel
                      htmlFor="order_date_quantity"
                      value="Order No, Date and Quantity"
                    />
                    <SelectInput
                      id="order_date_quantity"
                      {...register("order_date_quantity", {
                        required:
                          "Select Order No, Date and Quantity Is required",
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
                    <InputError
                      message={
                        errors.order_date_quantity?.message ||
                        backendErrors.order_date_quantity?.[0]
                      }
                    />
                  </div>
                  <div>
                    {challanMasterData.cycleDetails && (
                      <div>
                        Remaining bi-cycle for request:{" "}
                        {challanMasterData.cycleDetails.order_quantity -
                          challanMasterData.cycleDetails.requested_cycle}
                        <br />
                        Total No. of bi-cycle already requested :{" "}
                        {challanMasterData.cycleDetails.order_quantity}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit/Reset Buttons */}
                <div className="text-center mt-6">
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm cursor-pointer"
                    id="save_changes"
                  />
                  <input
                    type="reset"
                    value="Reset"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm cursor-pointer ml-2"
                    id="form_reset"
                  />
                </div>
              </div>
            </form>
          </div>
          {showModal && (
            <MsgDisplayModal
              msg={successMessage}
              applicantId={applicantId}
              setShowModal={setShowModal}
              setSuccessMessage={setSuccessMessage}
            />
          )}
        </section>
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

export default ChallanCmsEntry;
//
