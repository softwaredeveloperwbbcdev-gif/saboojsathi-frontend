import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { FaFilePdf } from "react-icons/fa";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const DownloadMemorandumView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [allocationList, setAllocationList] = useState([]);

  const getBlockWiseSchoolListDetails = async () => {
    const deliveryData = {
      phaseId: phaseId,
      blockId: btoa(id),
    };

    setLoading(true);

    try {
      const response = await callApi(
        "POST",
        "/getTaggedShoolListForChallan",
        deliveryData
      );

      if (!response.error && response.data?.schoolList) {
        setSchoolList(response.data.schoolList);
      } else {
        toast.error(`❌ Failed to fetch school list: ${response.message}`);
        // Optionally notify the user
      }
    } catch (err) {
      toast.error(`❌ Failed to fetch school list: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockWiseSchoolListDetails();
  }, [phaseId]);

  const onSubmit = async (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      phaseId: phaseId,
      block_id: id,
    };

    try {
      const response = await callApi(
        "POST",
        "/downloadMemorandumView",
        finalData
      );

      if (!response.error && response.data?.allocationList) {
        setAllocationList(response.data.allocationList);
      } else {
        setAllocationList([]);
        toast.error(`❌ Failed: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Failed to fetch memorandum view: ${err}`);
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

  const downloadPdf = async (allocationId) => {
    const payload = {
      allocation_id: allocationId,
      phaseId: phaseId,
    };
    setLoading(true);

    try {
      const response = await callApi("POST", "/downloadSchoolReceipt", payload);

      if (!response.error && response.data?.base64 && response.data?.mime) {
        const { base64, mime, filename } = response.data;

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });

        // Create object URL and force download
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename || "school-receipt.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error(`❌ Download failed: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Error during PDF download: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Download School Receipt Phase {phaseDetails.phaseName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 md:max-w-96">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="school_id"
                      {...register("school_id")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select School</option>
                      {schoolList.map((school, index) => (
                        <option
                          key={school.school_id_pk + index}
                          value={school.school_id_pk}
                        >
                          {school.school_name}
                        </option>
                      ))}
                      ;
                    </SelectInput>
                    <InputLabel
                      htmlFor="school_id"
                      value="School Name"
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {allocationList.length != 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 rounded-tl-lg">
                      Sl.No.
                    </th>
                    <th scope="col" className="p-4">
                      School Name
                    </th>
                    <th scope="col" className="p-4">
                      Allocation Date
                    </th>
                    <th scope="col" className="p-4">
                      Challan No.
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
                  {allocationList.map((allocation, index) => (
                    <tr
                      key={`${allocation.allocation_id_pk}_${index}`}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{allocation.school_name}</td>
                      <td className="p-4">{allocation.allocation_date}</td>
                      <td className="p-4">{allocation.challan_no}</td>
                      <td className="p-4">{allocation.type_of_cycle}</td>
                      <td className="p-4">{allocation.current_allocation}</td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            downloadPdf(allocation.allocation_id_pk)
                          }
                          className="bg-[#3c8dbc] border border-[#367fa9] hover:bg-[#367fa9] hover:border-[#204d74] rounded-[3px] shadow-none px-[10px] py-[5px] text-[12px] text-white leading-[1.5] m-1"
                        >
                          <FaFilePdf className="inline-block text-[14px] text-white" />{" "}
                          Download
                        </button>
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

export default DownloadMemorandumView;
