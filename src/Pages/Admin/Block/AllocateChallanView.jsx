import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import Modal from "../../../Components/Modal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import AllocationViewModal from "../../../Components/AllocationViewModal";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ChallanStatus = {
  2: "Allocation Pending",
  3: "Partially Allocated",
  4: "Completely Allocated",
};

const AllocateChallanView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm();

  const [isLoading, setLoading] = useState(false); // loader

  const [allocationList, setAllocationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [distributionLocationList, setDistributionLocationList] = useState([]);
  const [challanList, setChallanList] = useState([]);

  const navigate = useNavigate();

  const getBlockWiseDistributionLocationDetails = async () => {
    const deliveryData = {
      phaseId: phaseId,
      locationId: btoa(id),
    };

    setLoading(true);

    try {
      const response = await callApi(
        "POST",
        "/getDeliveryLocations",
        deliveryData
      );

      if (!response.error && response.data?.locationList) {
        setDistributionLocationList(response.data.locationList);
      } else {
        toast.error("⚠️ Failed to fetch location list:", response.message);
        // Optional: display toast or fallback UI
      }
    } catch (err) {
      console.error("❌ Error fetching distribution locations:", err);
      toast.error(`❌ Failed to fetch location data. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockWiseDistributionLocationDetails();
    setChallanList([]);
  }, [phaseId]);

  const onSubmit = async (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      phaseId: phaseId,
      block_id: btoa(id),
    };

    try {
      const response = await callApi(
        "POST",
        "/getAllocationChallanView",
        finalData
      );

      if (!response.error && response.data?.challanList) {
        setChallanList(response.data.challanList);
      } else {
        setChallanList([]);
        toast.error(`⚠️ Failed to fetch challan list: ${response.message}`);
        // Optionally show a toast or message to the user
      }
    } catch (err) {
      toast.error("❌ Error while fetching challan list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  const handleViewAllocation = async (challanId) => {
    setLoading(true);

    const finalData = {
      challan_id: btoa(challanId),
    };

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
        // Optionally show a toast or message to the user
      }
    } catch (err) {
      toast.error("❌ Error while fetching challan list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocationToSchool = (challanId) => {
    navigate(`/AllocateChallanToSchool/${phaseId}/${btoa(challanId)}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Allocate Challan Phase {phaseDetails.phaseName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 md:max-w-96">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="delivery_location"
                      {...register("delivery_location")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select Delivery Center</option>
                      {distributionLocationList.map((location, index) => (
                        <option
                          key={location.distribution_location_id + index}
                          value={btoa(location.sl)}
                        >
                          {location.distribution_location_name}
                        </option>
                      ))}
                      ;
                    </SelectInput>
                    <InputLabel
                      htmlFor="delivery_location"
                      value="Delivery Center"
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl. No.
                  </th>
                  <th scope="col" className="p-4">
                    Challan No.
                  </th>
                  <th scope="col" className="p-4">
                    Challan Date
                  </th>
                  <th scope="col" className="p-4">
                    Supplier
                  </th>
                  <th scope="col" className="p-4">
                    Gender
                  </th>
                  <th scope="col" className="p-4">
                    No. of Cycles
                  </th>
                  <th scope="col" className="p-4">
                    Status
                  </th>
                  <th scope="col" className="p-4 text-center rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {challanList && challanList.length > 0 ? (
                  challanList.map((challan, index) => (
                    <tr
                      key={`${challan.challan_id_pk}_${index}`}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{challan.challanNo}</td>
                      <td className="p-4">{challan.challan_date}</td>
                      <td className="p-4">{challan.supplierName}</td>
                      <td className="p-4">
                        {challan.typeOfCycle === 1 ? "BOYS" : "GIRLS"}
                      </td>
                      <td className="p-4">{challan.noOfCycles}</td>
                      <td className="p-4">{ChallanStatus[challan.status]}</td>
                      <td className="p-4">
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
                          {(challan.status === 2 || challan.status === 3) && (
                            <button
                              onClick={() =>
                                handleAllocationToSchool(challan.challan_id_pk)
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                            >
                              Allocate
                            </button>
                          )}
                          {(challan.status === 3 || challan.status === 4) && (
                            <button
                              onClick={() =>
                                handleViewAllocation(challan.challan_id_pk)
                              }
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                            >
                              View Allocation
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
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
};

export default AllocateChallanView;
