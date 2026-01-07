import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const ViewPending = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));

  const id = user.internal_code;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      phaseId: phaseId,
      schoolId: btoa("all"),
    },
  });

  const [loading, setLoading] = useState(false); // loader
  const [listOfSchool, setSchoolList] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const onLoadHandler = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `getSchoolList/${id}`);

      if (response.error) {
        console.error("Failed to fetch school list:", response.message);
        setSchoolList([]);
      } else {
        setSchoolList(response.data.schoolList);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
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
      const response = await callApi("POST", `getSchoolVerifyList`, data);

      if (response.error) {
        toast.error(
          "Failed to fetch school verification list:",
          response.message
        );
        setSchoolData([]);
      } else {
        setSchoolData(response.data.schoolList);
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, []);

  // Call on change of value
  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Pending Applications From School for phase {phaseDetails.phaseName}{" "}
            - {phaseDetails.year}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="p-6">
              <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 md:flex-none">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-800"
                      name="schoolId"
                      {...register("schoolId")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value={btoa("all")}>All</option>
                      <option value={btoa("pending")}>Pending</option>
                      {listOfSchool.map((school) => (
                        <option
                          key={school.school_id_pk + school.school_name}
                          value={btoa(school.school_id_pk)}
                        >
                          {school.school_name}
                        </option>
                      ))}
                    </SelectInput>
                    <InputLabel
                      htmlFor="schoolId"
                      value="School Name"
                      mandatory={false}
                    >
                      Select School
                    </InputLabel>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {schoolData.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 rounded-tl-lg">
                      Sl.No.
                    </th>
                    <th scope="col" className="p-4">
                      SCHOOL
                    </th>
                    <th scope="col" className="p-4 text-center">
                      Total Pending (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                    <th scope="col" className="p-4 text-center">
                      Total Approved (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                    <th scope="col" className="p-4 text-center rounded-tr-lg">
                      Total Rejected (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schoolData.map((school, index) => (
                    <tr
                      key={school.id}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{school.schname}</td>
                      <td className="p-4 text-center">
                        {school.pending > 0 ? (
                          <Link
                            to={`/CircleVerifyListApplicant/${phaseId}/${btoa(
                              school.school_code
                            )}/${btoa(2)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {school.pending}
                          </Link>
                        ) : (
                          school.pending
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {school.approve > 0 ? (
                          <Link
                            to={`/CircleVerifyListApplicant/${phaseId}/${btoa(
                              school.school_code
                            )}/${btoa(3)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {school.approve}
                          </Link>
                        ) : (
                          school.approve
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {school.reject > 0 ? (
                          <Link
                            to={`/CircleVerifyListApplicant/${phaseId}/${btoa(
                              school.school_code
                            )}/${btoa(4)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {school.reject}
                          </Link>
                        ) : (
                          school.reject
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 rounded-tl-lg">
                      Sl.No.
                    </th>
                    <th scope="col" className="p-4">
                      SCHOOL
                    </th>
                    <th scope="col" className="p-4">
                      Total Pending (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                    <th scope="col" className="p-4">
                      Total Approved (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                    <th scope="col" className="p-4 rounded-tr-lg">
                      Total Rejected (PH{phaseDetails.phaseName}{" "}
                      {phaseDetails.year})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center p-4" colSpan={5}>
                      No Data Found
                    </td>
                  </tr>
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

export default ViewPending;
