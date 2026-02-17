import { useEffect, useState } from "react";
import {
  HiBuildingStorefront, // Delivery Center
  HiBuildingLibrary, // School
  HiLink, // Tagged
  HiLinkSlash, // Untagged
  HiPlusCircle, // Add Action
  HiPencilSquare, // Update Action
  HiArrowsRightLeft, // Tag/Untag Action
  HiMapPin,
} from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { usePhaseStore } from "../../../Store/phaseStore";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";
import Modal from "../../../Components/Modal";
import DistributionLocationAdd from "../../../Components/BlockComponent/DistributionLocationAdd";
import DistributionLocationUpdate from "../../../Components/BlockComponent/DistirbutionLocationUpdate";
import DistributionTagUntagSchool from "../../../Components/BlockComponent/DistributionTagUntagSchool";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";

const DashboardBlockTagging = ({ graphData, setLoading }) => {
  const phaseId = usePhaseStore((state) => state.phaseId);
  const [showData, setShowData] = useState({});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [distributionLocationList, setDistributionLocationList] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const { callApi } = useApi();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  useEffect(() => {
    // Assuming graphData contains the specific tagging stats structure
    if (graphData) setShowData(graphData);
  }, [graphData]);

  // Metric Mapping (Adjust keys based on your actual API response)
  const stats = {
    deliveryCenters: showData.tagging?.[0]?.total_centers || 0,
    untaggedSchools: showData.tagging?.[0]?.untagged_schools || 0,
    taggedSchools: showData.tagging?.[0]?.tagged_schools || 0,
    totalSchools: showData.tagging?.[0]?.total_schools || 0,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addLocation = async (addLocationData) => {
    setLoading(true);

    const addDeliveryData = {
      ...addLocationData,
      phaseId: phaseId,
      blockId: btoa(id),
    };

    try {
      const response = await callApi(
        "POST",
        "/addDeliveryLocation",
        addDeliveryData,
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
        deliveryData,
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
  // --- Components ---

  const StatCard = ({ title, value, icon: Icon, colorClass, gradient }) => (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md group">
      <div className="flex items-center justify-between z-10 relative">
        <div>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white group-hover:scale-105 transition-transform origin-left">
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl shadow-lg ${colorClass} text-white`}>
          <Icon className="text-xl" />
        </div>
      </div>
      {/* Decorative Background Icon */}
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] text-gray-900 dark:text-white transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
        <Icon size={90} />
      </div>
      {/* Bottom Gradient Line */}
      <div className={`absolute bottom-0 left-0 w-full h-1 ${gradient}`} />
    </div>
  );

  const ActionCard = ({
    title,
    subText,
    icon: Icon,
    onClick,
    colorClass,
    disabled = false,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 text-left w-full group ${
        disabled
          ? "cursor-not-allowed grayscale-[0.5]"
          : "hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg active:scale-95"
      }`}
    >
      <div
        className={`p-3 rounded-xl ${colorClass} text-white shadow-md transition-transform ${!disabled && "group-hover:scale-110 group-hover:rotate-6"}`}
      >
        <Icon className="text-2xl" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-800 dark:text-white">
          {title}
        </h4>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
          {subText}
        </p>
      </div>
    </button>
  );

  const handleUpdateOpenModal = (center) => {
    // 'center' comes from your selection or the ActionCard click
    setSelectedCenter(center);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCloseModal = () => {
    setIsUpdateModalOpen(false);
    // Optional: setSelectedCenter(null);
  };

  const updateLocation = async (formData) => {
    setLoading(true);

    const updateData = {
      ...formData,
      locationId: btoa(selectedCenter.location_id), // Assuming ID is needed
      phaseId: phaseId,
      blockId: btoa(id),
    };

    try {
      const response = await callApi(
        "POST",
        "/updateDeliveryLocation",
        updateData,
      );

      if (!response.error) {
        handleUpdateCloseModal();
        getBlockWiseDistributionLocationDetails(); // Refresh list
        toast.success("Delivery Center updated successfully");
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

  const handleOpenTagUntagModal = (center) => {
    setSelectedCenter(center);
    setTagModalOpen(true);
  };

  const handleCloseTagUntagModal = () => {
    setTagModalOpen(false);
  };

  return (
    <>
      <div className="p-4 md:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors duration-300">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Tagging <span className="text-indigo-600">Overview</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium flex items-center justify-center md:justify-start gap-2">
              <HiMapPin className="text-indigo-500" /> Delivery Center Tagging
              Dashboard • Phase {phaseDetails.phaseName}
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 px-5 py-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Academic Year: {phaseDetails.year}
            </span>
          </div>
        </div>

        {/* --- STATS GRID (4 Items) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Delivery Centers"
            value={stats.deliveryCenters}
            icon={HiBuildingStorefront}
            colorClass="bg-purple-600"
            gradient="bg-gradient-to-r from-purple-500 to-purple-700"
          />
          <StatCard
            title="Tagged Schools"
            value={stats.taggedSchools}
            icon={HiLink}
            colorClass="bg-emerald-600"
            gradient="bg-gradient-to-r from-emerald-500 to-emerald-700"
          />
          <StatCard
            title="Untagged Schools"
            value={stats.untaggedSchools}
            icon={HiLinkSlash}
            colorClass="bg-amber-500"
            gradient="bg-gradient-to-r from-amber-400 to-amber-600"
          />
          <StatCard
            title="Total Schools"
            value={stats.totalSchools}
            icon={HiBuildingLibrary}
            colorClass="bg-blue-600"
            gradient="bg-gradient-to-r from-blue-500 to-blue-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: ACTIONS --- */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ActionCard
                title="Add New Center"
                subText="Create Delivery Point"
                icon={HiPlusCircle}
                colorClass="bg-blue-600"
                onClick={() => handleOpenModal()}
              />
              <ActionCard
                title="Update Center"
                subText={
                  selectedCenter
                    ? `Edit ${selectedCenter.name}`
                    : "Select a location below"
                }
                icon={HiPencilSquare}
                colorClass={
                  selectedCenter
                    ? "bg-indigo-600"
                    : "bg-gray-400 dark:bg-gray-600 opacity-50"
                }
                onClick={() =>
                  selectedCenter && handleUpdateOpenModal(selectedCenter)
                }
                disabled={!selectedCenter}
              />

              <ActionCard
                title="Manage Tagging"
                subText={
                  selectedCenter ? "Link Schools" : "Select a location below"
                }
                icon={HiArrowsRightLeft}
                colorClass={
                  selectedCenter
                    ? "bg-teal-600"
                    : "bg-gray-400 dark:bg-gray-600 opacity-50"
                }
                onClick={() =>
                  selectedCenter && handleOpenTagUntagModal(selectedCenter)
                }
                disabled={!selectedCenter}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: DELIVERY CENTER LIST --- */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1.5 bg-purple-600 rounded-full"></div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Active Delivery Centers
                </h2>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              {distributionLocationList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                        <th className="p-5 text-center w-16">
                          <span className="sr-only">Select</span>
                        </th>
                        <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Center Name
                        </th>
                        <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Address
                        </th>
                        <th className="p-5 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Schools
                        </th>
                        <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Officer In-charge
                        </th>
                        <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                      {distributionLocationList.slice(0, 5).map((center) => (
                        <tr
                          key={center.location_id}
                          onClick={() => setSelectedCenter(center)}
                          className={`cursor-pointer transition-colors ${
                            selectedCenter?.location_id === center.location_id
                              ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          }`}
                        >
                          <td className="p-5 text-center">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedCenter?.location_id ===
                                center.location_id
                                  ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {selectedCenter?.location_id ===
                                center.location_id && (
                                <HiCheckCircle className="text-white text-xs" />
                              )}
                            </div>
                          </td>
                          <td className="p-5">
                            <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                              {center.distribution_location_name}
                            </span>
                          </td>
                          <td className="p-5 text-sm text-gray-500 dark:text-gray-400">
                            {center.distribution_location_address}
                          </td>
                          <td className="p-5 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                              {center.tagged_school}
                            </span>
                          </td>
                          <td className="p-5 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {center.officer_incharge_name}
                          </td>
                          <td className="p-5 text-sm font-mono text-gray-500 dark:text-gray-400">
                            {center.officer_contact_no}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-4">
                    <HiBuildingStorefront className="text-4xl text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    No Centers Found
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Start by creating a new delivery center.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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

      <Modal
        show={isUpdateModalOpen}
        onClose={handleUpdateOpenModal}
        maxWidth="xl"
        closeable={true}
      >
        <DistributionLocationUpdate
          centerDetails={selectedCenter}
          updateLocation={updateLocation}
          onClose={handleUpdateCloseModal}
        ></DistributionLocationUpdate>
      </Modal>

      <Modal
        show={isTagModalOpen}
        onClose={handleCloseTagUntagModal}
        maxWidth="2xl"
        closeable={true}
      >
        <DistributionTagUntagSchool
          centerDetails={selectedCenter}
          phaseId={phaseId}
          location={location}
          onRefresh={getBlockWiseDistributionLocationDetails}
          onClose={handleCloseTagUntagModal}
        ></DistributionTagUntagSchool>
      </Modal>
    </>
  );
};

export default DashboardBlockTagging;
