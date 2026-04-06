import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ProfileEntryDistrictReport() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // console.log(year, phase);

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  const fetchData = async () => {
    /////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `repo-profile-entry-dist/${phaseId}`
      ); // API call

      console.log(response);
      if (response.error) {
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  /////////////////////////////////////////////

  const profile_entry_total_boys = data.reduce((acc, value) => {
    return acc + value.profile_entry_class_ix_boys;
  }, 0);

  const profile_entry_total_girls = data.reduce((acc, value) => {
    return acc + value.profile_entry_class_ix_girls;
  }, 0);
  const finalyse_total_boys = data.reduce((acc, value) => {
    return acc + value.finalyse_class_ix_boys;
  }, 0);
  const finalyse_total_girls = data.reduce((acc, value) => {
    return acc + value.finalyse_class_ix_girls;
  }, 0); // approved_class_ix_boys
  const approved_total_boys = data.reduce((acc, value) => {
    return acc + value.approved_class_ix_boys;
  }, 0);
  const approved_total_girls = data.reduce((acc, value) => {
    return acc + value.approved_class_ix_girls;
  }, 0);
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            District Wise Profile Entry Phase {phaseDetails.phaseName} For
            Academic Year&nbsp;
            {phaseDetails.year}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
             
              <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button>
            </div> */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th rowSpan="2" scope="col" className="p-4 rounded-tl-lg">
                    Serial. No.
                  </th>
                  <th rowSpan="2" scope="col" className="p-4">
                    District Name
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Profile Entry
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Yet to be approved
                  </th>

                  <th
                    colSpan="3"
                    scope="col"
                    className="p-4 text-center rounded-tr-lg"
                  >
                    Profile Approved
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="p-4">
                    Boys
                  </th>
                  <th scope="col" className="p-4">
                    Girls
                  </th>
                  <th scope="col" className="p-4">
                    Total
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
                  <th scope="col" className="p-4">
                    Boys
                  </th>
                  <th scope="col" className="p-4">
                    Girls
                  </th>
                  <th scope="col" className="p-4">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="text-center p-2 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">
                          <Link
                            to={`/ProfileEntryBlockReport/${phaseId}/${btoa(
                              value.district_id_pk
                            )}`}
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_boys}
                        </td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_girls}
                        </td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_boys +
                            value.profile_entry_class_ix_girls}
                        </td>
                        <td className="p-4">{value.finalyse_class_ix_boys}</td>
                        <td className="p-4">{value.finalyse_class_ix_girls}</td>
                        <td className="p-4">
                          {value.finalyse_class_ix_boys +
                            value.finalyse_class_ix_girls}
                        </td>
                        <td className="p-4">{value.approved_class_ix_boys}</td>
                        <td className="p-4">{value.approved_class_ix_girls}</td>
                        <td className="p-4">
                          {value.approved_class_ix_boys +
                            value.approved_class_ix_girls}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="text-center font-semibold p-4">
                        Total
                      </td>
                      <td className="font-semibold p-4">
                        {profile_entry_total_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {profile_entry_total_girls}
                      </td>
                      <td className="font-semibold p-4">
                        {profile_entry_total_boys + profile_entry_total_girls}
                      </td>
                      <td className="font-semibold p-4">
                        {finalyse_total_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {finalyse_total_girls}
                      </td>
                      <td className="font-semibold p-4">
                        {finalyse_total_boys + finalyse_total_girls}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_total_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_total_girls}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_total_boys + approved_total_girls}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {loading && <Loader />} {/* 👈 show the loader component */}
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

export default ProfileEntryDistrictReport;
