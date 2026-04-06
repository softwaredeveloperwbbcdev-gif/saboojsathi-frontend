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

function ProfileEntryBlockReport() {
  const { phaseId, id } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [phaseId, id]);

  const fetchData = async () => {
    ///////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `repo-profile-entry-block/${phaseId}/${id}`
      ); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    //////////////////////////////////////////////////
  };

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
  const profile_entry_total = data.reduce((acc, value) => {
    return acc + value.profile_entry_class_ix_total;
  }, 0);
  const finalyse_total = data.reduce((acc, value) => {
    return acc + value.finalyse_class_ix_total;
  }, 0);
  const approved_total = data.reduce((acc, value) => {
    return acc + value.approved_class_ix_total;
  }, 0);
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Block Wise Profile Entry Phase {phaseDetails.phaseName} For Academic
            Year&nbsp;
            {phaseDetails.year}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
              Download Button
              <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button>
            </div> */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th rowSpan="2" scope="col" className="p-4 rounded-tr-lg">
                    Serial. No.
                  </th>
                  <th rowSpan="2" scope="col" className="p-4">
                    Block Name
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
                    className="p-4 text-center rounded-tl-lg"
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
                            to={`/ProfileEntrySchoolReport/${phaseId}/${btoa(
                              value.block_id_pk
                            )}`}
                          >
                            {value.block_name}
                          </Link>
                        </td>

                        <td className="p-4">
                          {value.profile_entry_class_ix_boys}
                        </td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_girls}
                        </td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_total}
                        </td>
                        <td className="p-4">{value.finalyse_class_ix_boys}</td>
                        <td className="p-4">{value.finalyse_class_ix_girls}</td>
                        <td className="p-4">{value.finalyse_class_ix_total}</td>
                        <td className="p-4">{value.approved_class_ix_boys}</td>
                        <td className="p-4">{value.approved_class_ix_girls}</td>
                        <td className="p-4">{value.approved_class_ix_total}</td>
                      </tr>
                    ))}
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
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
                        {profile_entry_total}
                      </td>
                      <td className="font-semibold p-4">
                        {finalyse_total_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {finalyse_total_girls}
                      </td>
                      <td className="font-semibold p-4">{finalyse_total}</td>
                      <td className="font-semibold p-4">
                        {approved_total_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_total_girls}
                      </td>
                      <td className="font-semibold p-4">{approved_total}</td>
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

export default ProfileEntryBlockReport;
