import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { FaFilePdf } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import RejectChallanModal from "../../../Components/RejectChallanModal";
import RejectedChallanModal from "../../../Components/RejectedChallanModal";
import Modal from "../../../Components/Modal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ApproveChallanView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm();

  const [isLoading, setLoading] = useState(false); // loader
  const [rejectId, setRejectId] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [distributionLocationList, setDistributionLocationList] = useState([]);
  const [challanList, setChallanList] = useState([]);

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
        "/getApproveChallanView",
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

  const downloadPdf = async (challanId) => {
    const challan = {
      phaseId: phaseId,
      challan_no: challanId,
    };
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        "/downloadChallanReceipt",
        challan
      );

      if (!response.error && response.data?.base64 && response.data?.mime) {
        const byteCharacters = atob(response.data.base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: response.data.mime });

        // Create a blob URL and trigger download
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = response.data.filename || "challan-receipt.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error(`❌ Failed to download PDF: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Error while downloading PDF: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRejectId({});
  };

  const handleAcceptChallan = async (challanId) => {
    const challanData = {
      challan_id: challanId,
      block_id: id,
    };

    setLoading(true);

    try {
      const response = await callApi("POST", "/acceptChallanById", challanData);

      if (!response.error) {
        toast.success("✅ Challan accepted successfully");
        handleSubmit(onSubmit)(); // Re-trigger form after acceptance
      } else {
        toast.error(`❌ Failed to accept challan: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Network error while accepting challan: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectChallan = (challanId) => {
    setRejectId({ challan_id: challanId });
    handleOpenModal();
  };

  const rejectChallanUpdate = async (challanData) => {
    setLoading(true);
    const updatedChallanData = {
      ...challanData,
      block_id: id,
    };

    try {
      const response = await callApi(
        "POST",
        "/rejectChallanById",
        updatedChallanData
      );

      if (!response.error) {
        toast.success("Success");
        handleSubmit(onSubmit)();
      } else {
        toast.error(`Failed: ${response.message || "Unknown error"}`);
      }
    } catch (err) {
      toast.error(`❌ Network error: ${err}`);
    } finally {
      handleCloseModal();
      setLoading(false);
    }
  };

  const handleOpenRejectModal = async (challanId) => {
    setLoading(true);
    const ChallanData = {
      challan_id: challanId,
    };

    try {
      const response = await callApi(
        "POST",
        "/getChallanRejectReason",
        ChallanData
      );

      if (!response.error && response.data) {
        setRejectReason(response.data);
        setIsModalRejectOpen(true);
      } else {
        toast.error(response.message || "Failed to fetch reject reason.");
      }
    } catch (err) {
      toast.error(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRejectModal = () => {
    setIsModalRejectOpen(false);
    setRejectReason("");
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Approve Challan Phase {phaseDetails.phaseName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 md:max-w-64">
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
          {challanList.length != 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 rounded-tl-lg">
                      Sl.No.
                    </th>
                    <th scope="col" className="p-4">
                      Delivery Center
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
                    <th scope="col" className="p-4 text-center rounded-tr-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {challanList.map((challan, index) => (
                    <tr
                      key={`${challan.challan_id_pk}_${index}`}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        {challan.distribution_location_name}
                      </td>
                      <td className="p-4">{challan.challan_no}</td>
                      <td className="p-4">{challan.challan_date}</td>
                      <td className="p-4">{challan.supplier_name}</td>
                      <td className="p-4">{challan.type_of_cycle}</td>
                      <td className="p-4">{challan.no_of_cycles}</td>
                      <td className="p-4">
                        {challan.status == 1 && (
                          <>
                            <button
                              onClick={() =>
                                handleAcceptChallan(challan.challan_id_pk)
                              }
                              className="bg-[#3c8dbc] border border-[#367fa9] hover:bg-[#367fa9] hover:border-[#204d74] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleRejectChallan(challan.challan_id_pk)
                              }
                              className="bg-[#dd4b39] border border-[#d73925] hover:bg-[#d73925] hover:border-[#ac2925] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {challan.status == 9 && (
                          <>
                            <button
                              onClick={() =>
                                handleOpenRejectModal(challan.challan_id_pk)
                              }
                              className="bg-[#dd4b39] border border-[#d73925] hover:bg-[#d73925] hover:border-[#ac2925] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5]"
                            >
                              Rejected
                            </button>
                          </>
                        )}
                        {challan.status != 9 && challan.status != 1 && (
                          <>
                            <button className="bg-[#00a65a] border border-[#008d4c] hover:bg-[#008d4c] hover:border-[#398439] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1">
                              <FaCheckSquare className="inline-block text-[14px] text-white" />{" "}
                              Accepted
                            </button>
                            <button
                              onClick={() =>
                                downloadPdf(btoa(challan.challan_no))
                              }
                              className="bg-[#3c8dbc] border border-[#367fa9] hover:bg-[#367fa9] hover:border-[#204d74] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1"
                            >
                              <FaFilePdf className="inline-block text-[14px] text-white" />{" "}
                              Download
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
        maxWidth="xs"
        closeable={true}
      >
        <RejectChallanModal
          modaldata={rejectId}
          rejectChallan={rejectChallanUpdate}
          onClose={handleCloseModal}
        />
      </Modal>
      <Modal
        show={isModalRejectOpen}
        onClose={handleCloseRejectModal}
        maxWidth="xs"
        closeable={true}
      >
        <RejectedChallanModal
          rejectedMsg={rejectReason}
          onClose={handleCloseRejectModal}
        />
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

export default ApproveChallanView;
