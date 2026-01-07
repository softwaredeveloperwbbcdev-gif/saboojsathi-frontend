import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { FaCirclePlus } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import Modal from "../../../Components/Modal";
import DistributionLocationAdd from "../../../Components/DistributionLocationAdd";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const DistributionLocationProcess = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false); // loader
  const [isLocationSelected, setLocationSelected] = useState("");
  const [distributionLocationList, setDistributionLocationList] = useState([]);

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

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
      } else if (response.error) {
        toast.error(`Failed to fetch data: ${response.message}`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockWiseDistributionLocationDetails();
  }, []);

  const handleCheck = (id) => {
    const inputElement = document.getElementById(id);
    if (inputElement.value == isLocationSelected) {
      setLocationSelected("");
    } else {
      setLocationSelected(inputElement.value);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addLocation = async (addLocationData) => {
    setLoading(true);

    const updatedFrameData = {
      ...addLocationData,
      phaseId: phaseId,
      blockId: btoa(id),
    };

    try {
      const response = await callApi(
        "POST",
        "/addDeliveryLocation",
        updatedFrameData
      );

      if (!response.error) {
        handleCloseModal();
        getBlockWiseDistributionLocationDetails(); // Refresh the list
        toast.success("Delivery Point Location added");
      } else {
        if (response.message === "Validation Errors") {
          return { validationErrors: response.errors };
        }
        toast.error(`Failed: ${response.message}`);
      }
    } catch (err) {
      toast.error(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTagProceed = () => {
    if (!isLocationSelected) {
      toast.error("Select a Delivery Location to Tag School with.");
    } else {
      navigate(`/DistributionTagSchool/${phaseId}/${btoa(isLocationSelected)}`);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            School Tagging with Delivery Center Phase {phaseDetails.phaseName}
          </h1>
          <div className="p-2 flex justify-end">
            <button
              className="bg-[#F19612] border border-[#E57F0C] text-white text-[15px] rounded px-[10px] py-[5px]"
              onClick={handleOpenModal}
            >
              <FaCirclePlus className="inline" /> Add Delivery Center
            </button>
          </div>
          <div className="p-2 w-full flex flex-row flex-wrap">
            {distributionLocationList.map((location, index) => (
              <div
                onClick={() => handleCheck(`chk_location_${index}`)}
                className={`flex flex-col min-w-[400px] m-1 p-[10px] mb-[12px] bg-[#f9f9f9] border-[2px] ${
                  isLocationSelected == location.distribution_location_id
                    ? "border-[#47CF32]"
                    : "border-[#e6e6e6]"
                } transition-all duration-200`}
              >
                <div className="flex w-full justify-between p-[10px] mb-[12px]">
                  <p className="inline-block">
                    {location.distribution_location_name}
                  </p>
                  <input
                    type="radio"
                    id={`chk_location_${index}`}
                    className="hidden"
                    name="location"
                    value={location.distribution_location_id}
                  ></input>
                  <FaRegCheckCircle
                    className={`mt-1 mr-2 text-xl ${
                      isLocationSelected == location.distribution_location_id
                        ? "text-[#47CF32]"
                        : "text-[#e6e6e6]"
                    }`}
                  />
                </div>
                <hr />
                <div className="flex w-full p-[10px] mb-6">
                  <FaLocationDot className="mt-1 mr-6 text-xl" />
                  <p className="inline-block">
                    {location.distribution_location_details}
                  </p>
                </div>
                <hr />
                <div className="flex w-full p-[10px] mb-[12px]">
                  <BsFillTelephoneFill className="mt-1 mr-6 text-xl" />
                  <p className="inline-block">
                    {location.distribution_location_ph}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 w-full flex flex-row justify-center">
            <button
              disabled={!isLocationSelected}
              onClick={() => handleTagProceed()}
              className={`text-white text-[15px] border border-[#00D3D7] rounded-[3px] shadow-none px-[10px] py-[5px] leading-[1.5] ${
                !isLocationSelected ? "bg-[#00b7ba]" : "bg-[#00DCE0]"
              }`}
            >
              <FaShare className="inline-block" /> Proceed to School Tagging
            </button>
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
        maxWidth="xl"
        closeable={true}
      >
        <DistributionLocationAdd
          addLocation={addLocation}
          onClose={handleCloseModal}
        ></DistributionLocationAdd>
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

export default DistributionLocationProcess;
