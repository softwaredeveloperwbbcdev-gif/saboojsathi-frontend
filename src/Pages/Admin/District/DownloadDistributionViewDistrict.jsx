import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const DownloadDistributionViewDistrict = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const id = user.internal_code;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const location_name = user.name;

  const { register, handleSubmit, setValue } = useForm({});

  const [loading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  const onLoadHandler = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `/getBlockList/${btoa(id)}`);

      if (!response.error && response.data?.blockList) {
        setBlockList(response.data.blockList);
      } else {
        setBlockList([]);
        toast.error(response.message); // Optional: log or show error
      }
    } catch (err) {
      toast.error(`Unexpected Error Occured: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadHandler();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await callApi("POST", `/getSchoolListDistrict`, data);

      if (!response.error && response.data?.schoolList) {
        setSchoolList(response.data.schoolList);
      } else {
        setSchoolList([]);
        console.error(response.message); // Optional error logging
      }
    } catch (err) {
      toast.error(`Unexpected Error Occured: ${err}`);
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

  const downloadPdf = async (schoolId) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `downloadMusterRoll/${phaseId}/${btoa(schoolId)}`
      );

      if (response.error) {
        console.error("Failed to download PDF:", response.message);
        toast.error(`❌ Failed to download the PDF: ${response.message}`);
      } else {
        const { base64, mime, filename } = response.data;
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename || "muster-roll.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("❌ An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Download Distribution Records (Phase {phaseDetails.phaseName})
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 md:flex-none">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800 md:min-w-[400px]"
                      name="status_code"
                      {...register("block")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select Block</option>
                      {blockList.map((block) => (
                        <option
                          key={block.block_id_pk + block.block_name}
                          value={block.block_id_pk}
                        >
                          {block.block_name}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="block"
                      value="Block"
                      mandatory={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {schoolList.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 text-center rounded-tl-lg">
                      School Dise Code
                    </th>
                    <th scope="col" className="p-4 text-center">
                      School Name
                    </th>
                    <th scope="col" className="p-4 text-center rounded-tr-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schoolList.map((school, index) => (
                    <tr
                      key={school.school_id_pk + index}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4 text-center">{school.dise}</td>
                      <td className="p-4 text-center">{school.school_name}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => downloadPdf(school.school_id_pk)}
                          className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                          Download Distribution Records
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {loading && (
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

export default DownloadDistributionViewDistrict;
