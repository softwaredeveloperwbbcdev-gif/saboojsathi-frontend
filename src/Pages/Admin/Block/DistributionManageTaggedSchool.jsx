import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function DistributionManageTaggedSchool() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const { register, handleSubmit, setValue } = useForm();

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [isLoading, setLoading] = useState(false); // loader
  const [distributionLocationList, setDistributionLocationList] = useState([]);
  const [taggedSchoolList, setTaggedSchoolList] = useState([]);
  const [locationName, setLocationName] = useState("");

  const total_boys = taggedSchoolList.reduce((acc, value) => {
    return acc + value.boys;
  }, 0);

  const total_girls = taggedSchoolList.reduce((acc, value) => {
    return acc + value.girls;
  }, 0);

  const all_total = taggedSchoolList.reduce((acc, value) => {
    return acc + value.total;
  }, 0);

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
      } else {
        toast.error("⚠️ Failed to fetch:", response.message);
      }
    } catch (err) {
      console.error("❌ Failed to fetch distribution location:", err);
      toast.error("❌ Failed to fetch location data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockWiseDistributionLocationDetails();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      phaseId: phaseId,
      block_id: btoa(id),
    };

    const response = await callApi("POST", "/getTaggedSchoolList", finalData);

    if (!response.error && response.data?.schoolList) {
      setTaggedSchoolList(response.data.schoolList);
      setLocationName(response.data.devLocationName || "");
    } else {
      setTaggedSchoolList([]);
      setLocationName("");
      console.warn("Failed to fetch tagged school list:", response.message);
    }

    setLoading(false);
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit]);

  const handleUntag = async (schoolId, listKey) => {
    const untagData = {
      phaseId: phaseId,
      school_id: schoolId,
    };

    setLoading(true);

    try {
      const response = await callApi("POST", "/untagSchool", untagData);

      if (!response.error) {
        toast.success("✅ School has been untagged");

        setTaggedSchoolList((prevList) =>
          prevList.filter((school) => school.school_id !== schoolId),
        );
      } else {
        toast.error(`❌ Failed to untag school: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Error while untagging school: ${err}`);
      // alert("❌ Failed to untag school due to a network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            View Tagged School with delivery centre [ Phase{" "}
            {phaseDetails.phaseName}]
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
                          key={location.location_id + index}
                          value={btoa(location.location_id)}
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
          {taggedSchoolList.length != 0 && locationName != "" && (
            <>
              <div
                className="flex items-center w-full max-w-sm h-10 px-4 m-2 text-sm font-semibold rounded-lg shadow-md transition-colors duration-500
                    bg-gray-100 dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    border border-gray-300 dark:border-gray-700
                    md:w-1/2 md:max-w-md lg:max-w-lg"
              >
                <FaInfoCircle className="text-blue-500 dark:text-teal-400 text-base mr-2 transition-colors duration-500" />
                <span className="truncate">
                  School Tagged Under {locationName}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4 rounded-tl-lg">
                        Sl.No.
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
                      <th scope="col" className="p-4">
                        Total
                      </th>
                      <th scope="col" className="p-4 text-center rounded-tr-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {taggedSchoolList.map((school, index) => (
                      <tr
                        key={`${school.school_id}_${index}`}
                        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">{school.schcd}</td>
                        <td className="p-4">{school.school_name}</td>
                        <td className="p-4">{school.boys}</td>
                        <td className="p-4">{school.girls}</td>
                        <td className="p-4">{school.total}</td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              handleUntag(
                                school.school_id,
                                `${school.school_id}_${index}`,
                              )
                            }
                          >
                            <FaTimes className="text-[#FF0004] text-[14px] inline-block" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="p-4 text-center font-bold">
                        Total
                      </td>
                      <td className="p-4 font-bold">{total_boys}</td>
                      <td className="p-4 font-bold">{total_girls}</td>
                      <td className="p-4 font-bold">{all_total}</td>
                      <td className="p-4 font-bold"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
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
}

export default DistributionManageTaggedSchool;
