import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import Loader from "../../../Components/Loader";
import { useForm } from "react-hook-form";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import RejectedChallanModal from "../../../Components/RejectedChallanModal";
import Modal from "../../../Components/Modal";
import { FaFilePdf } from "react-icons/fa";
import AllocationViewModal from "../../../Components/AllocationViewModal";

const ChallanViewFilter = () => {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    setValue,
  } = useForm({});

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [challanData, setChallanData] = useState([]);
  const [challanViewData, setChallanViewData] = useState({
    phase: [],
    districts: [],
    blocks: [],
  });
  const [rejectReason, setRejectReason] = useState("");
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [allocationList, setAllocationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Start loader
    try {
      const response = await callApi("GET", `cmsphase`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data phase ${response.message}`);
      } else {
        setChallanViewData((prev) => ({
          ...prev,
          phase: response.data.challanPhase || [],
        }));
      }
    } catch (err) {
      toast.error("Unexpected error phase:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (name === "phase") {
      fetchDistrict(value);
    }
    if (name === "district") {
      fetchBlocks(value);
    }
    handleSubmit(onSubmit)();
  };

  const fetchDistrict = async (phase) => {
    setLoading(true);
    setChallanViewData((prev) => ({
      ...prev,
      districts: [], // ✅ Only update 'districts'
      blocks: [], // Reset blocks when phase changes
    }));
    try {
      if (phase !== "") {
        const response = await callApi("GET", `cmsdistrictchallan/${phase}`);
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch district data ${response.message}`);
        } else {
          setChallanViewData((prev) => ({
            ...prev,
            districts: response.data, // ✅ Only update 'districts'
          }));
        }
      }
    } catch (err) {
      toast.error("Unexpected district error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async (districtChallan) => {
    setLoading(true);
    setChallanViewData((prev) => ({
      ...prev,
      blocks: [], // Reset blocks when phase changes
    }));
    try {
      if (districtChallan !== "") {
        const response = await callApi(
          "GET",
          `cmsblockchallan/${districtChallan}`
        );
        if (response.error) {
          // Handle the error (e.g., alert the user)
          toast.error(`Failed to fetch block data ${response.message}`);
        } else {
          setChallanViewData((prev) => ({
            ...prev,
            blocks: response.data, // ✅ Only update 'districts'
          }));
        }
      }
    } catch (err) {
      toast.error("Unexpected block error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await callApi(
        "Post",
        `cmschallanviewsupplier`,
        formdata
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to submit data ${response.message}`);
      } else {
        setChallanData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async (challanId) => {
    const challan = {
      phaseId: challanData.phase,
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-6">
          {/* Search Filter Box */}
          <div className="bg-white rounded shadow mb-6">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Search Challan</h2>
            </div>
            {/* <div className="px-6 py-4"> */}
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              {/* Row 1 */}
              <div className="flex flex-wrap -mx-5">
                {/* Phase */}
                <div className="w-full md:w-1/4 px-5 mb-4">
                  <InputLabel htmlFor="phase" value="Phase" />
                  <SelectInput
                    id="phase"
                    {...register("phase", { required: "Phase is required" })}
                    onChange={(e) =>
                      handleOnChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Select Phase</option>
                    {challanViewData.phase.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                {/* District */}
                <div className="w-full md:w-1/4 px-5 mb-4">
                  <InputLabel htmlFor="district" value="District" />
                  <SelectInput
                    id="district"
                    name="district"
                    {...register("district")}
                    onChange={(e) =>
                      handleOnChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Select District</option>
                    {challanViewData.districts.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                {/* Block */}
                <div className="w-full md:w-1/4 px-5 mb-4">
                  <InputLabel htmlFor="block" value="Block" />
                  <SelectInput
                    id="block"
                    name="block"
                    {...register("block")}
                    onChange={(e) =>
                      handleOnChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Select Block/Municipality</option>
                    {challanViewData.blocks.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                {/* Challan No */}
                <div className="w-full md:w-1/4 px-5 mb-4">
                  <div className="relative">
                    <TextInput
                      id="challan_no"
                      name="challan_no"
                      placeholder="Challan No."
                      {...register("challan_no")}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                    <InputLabel htmlFor="challan_no" value="Challan No" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap -mx-5">
                <div className="w-full md:w-1/4 px-5 mb-4">
                  <div className="relative">
                    <TextInput
                      id="challan_date"
                      type="date"
                      name="challan_date"
                      placeholder="Challan Date"
                      {...register("challan_date")}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                    <InputLabel htmlFor="challan_date" value="Challan Date" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Challan Report Table */}
          <div className="bg-white rounded shadow">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-red-600">
                Challan Issued/Entry Report
              </h3>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded inline-flex items-center justify-center"
              >
                Download
              </a>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-orange-100">
                  <tr className="text-sm text-gray-700 text-center">
                    <th className="border px-4 py-2">Serial No</th>
                    <th className="border px-4 py-2">District</th>
                    <th className="border px-4 py-2">Block</th>
                    <th className="border px-4 py-2">Phase</th>
                    <th className="border px-4 py-2">Challan No </th>
                    <th className="border px-4 py-2">Challan Date</th>
                    <th className="border px-4 py-2">Approval Date</th>
                    <th className="border px-4 py-2">Type Of Bicycles</th>
                    <th className="border px-4 py-2">Number Of Bicycles</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                    {/* ... other headers */}
                  </tr>
                </thead>
                <tbody className="text-center text-sm">
                  {challanData.length > 0 ? (
                    challanData.map((item, index) => (
                      <tr key={item.challan_no + "-" + item.phase_order}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="text-center px-4 py-2">
                          {item.district}
                        </td>
                        <td className="text-center px-4 py-2">{item.block}</td>
                        <td className="text-center px-4 py-2">
                          {item.phase_order === 8
                            ? "VIII"
                            : item.phase_order === 9
                            ? "IX"
                            : item.phase_order === 10
                            ? "X"
                            : ""}
                        </td>{" "}
                        {/* Replace if phase info needed */}
                        <td className="text-center px-4 py-2">
                          {item.challan_no}
                        </td>
                        <td className="text-center px-4 py-2">
                          {item.challan_date}
                        </td>
                        <td className="text-center px-4 py-2">
                          {/* You can format this if needed */}
                          {item.status_date_challan || "—"}
                        </td>
                        <td className="text-center px-4 py-2">{item.gender}</td>
                        <td className="text-center px-4 py-2">
                          {item.no_of_cycles}
                        </td>
                        <td className="text-center px-4 py-2">
                          {item.status === 1 ? "Approved" : "Pending"}
                        </td>
                        <td className="text-center px-4 py-2">
                          {item.status != 9 && item.status != 1 && (
                            <>
                              <button
                                onClick={() =>
                                  downloadPdf(btoa(item.challan_no))
                                }
                                className="bg-[#3c8dbc] border border-[#367fa9] hover:bg-[#367fa9] hover:border-[#204d74] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1"
                              >
                                <FaFilePdf className="inline-block text-[14px] text-white" />{" "}
                                Download
                              </button>
                            </>
                          )}
                          {(item.status === 3 || item.status === 4) && (
                            <button
                              onClick={() =>
                                handleViewAllocation(item.challan_id_pk)
                              }
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                            >
                              View Allocation
                            </button>
                          )}
                          {item.status == 9 && (
                            <>
                              <button
                                onClick={() =>
                                  handleOpenRejectModal(item.challan_id_pk)
                                }
                                className="bg-[#dd4b39] border border-[#d73925] hover:bg-[#d73925] hover:border-[#ac2925] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5]"
                              >
                                Rejected
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-4 text-gray-500"
                      >
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {loading && <Loader />}
        </section>
      </AdminAuthenticatedLayout>
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
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        closeable={true}
      >
        <AllocationViewModal data={allocationList} onClose={handleCloseModal} />
      </Modal>
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

export default ChallanViewFilter;
