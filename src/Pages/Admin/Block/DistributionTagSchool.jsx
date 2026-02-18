import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const DistributionTagSchool = () => {
  const { phaseId, location } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  console.log(id);

  const navigate = useNavigate();

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [isLoading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const getBlockWiseSchoolList = async () => {
    const deliveryData = {
      phaseId: phaseId,
      locationId: btoa(id),
    };

    setLoading(true);

    try {
      const response = await callApi(
        "POST",
        "/getUntaggedSchoolList",
        deliveryData,
      );

      if (!response.error && response.data?.schoolList) {
        setSchoolList(response.data.schoolList);
      } else {
        console.warn("⚠️ Failed to fetch school list:", response.message);
        // Optional: toast or error message
      }
    } catch (err) {
      console.error("❌ Failed to fetch school list:", err);
      alert("❌ Failed to fetch student frame view.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockWiseSchoolList();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleSchoolTag = async () => {
    console.log(selectedIds);

    const dataSet = {
      phaseId: phaseId,
      schoolIds: [...selectedIds],
      locationId: location,
    };

    try {
      const response = await callApi(
        "POST",
        "/tagSchoolWithDeliveryPoint",
        dataSet,
      );

      if (!response.error) {
        toast.success(`Schools successfully tagged`);
        navigate(`/DistributionLocationProcess/${phaseId}`);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (err) {
      toast.error(`Unxpected error occured ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Distribution School List [Class IX Phase {phaseDetails.phaseName}]
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl. No.
                  </th>
                  <th scope="col" className="p-4">
                    Mark
                  </th>
                  <th scope="col" className="p-4">
                    Dise Code
                  </th>
                  <th scope="col" className="p-4">
                    School Name
                  </th>
                  <th scope="col" className="p-4">
                    Boys
                  </th>
                  <th scope="col" className="p-4">
                    Girls
                  </th>
                  <th className="p-4 text-center rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {schoolList.map((school, index) => (
                  <tr
                    key={school.schcd + index}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(school.school_id)}
                        onChange={() => handleCheckboxChange(school.school_id)}
                        disabled={!school.total}
                        value={school.school_id}
                      />
                    </td>
                    <td className="p-4">{school.schcd}</td>
                    <td className="p-4">{school.school_name}</td>
                    <td className="p-4">{school.boys}</td>
                    <td className="p-4">{school.girls}</td>
                    <td className="p-4">{school.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex flex-row justify-end">
              <button
                disabled={!selectedIds.length}
                onClick={() => handleSchoolTag()}
                className="text-white text-[15px] bg-[#109E99] border border-[#086C69] rounded-[3px] shadow-none hover:bg-[#03CC9A] hover:border-[#0C9A76] px-[10px] py-[5px] leading-[1.5] m-2"
              >
                <FaCheck className="inline-block" /> Tag School
              </button>
            </div>
          </div>
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

export default DistributionTagSchool;
