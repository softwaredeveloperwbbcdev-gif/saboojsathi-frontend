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

const ProfileEntryStatusReportDist = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `profile-entry-status-report-district-download`,
        { phaseId }, // Data object is empty for a GET request
        { responseType: "blob" } // Specify the response type here
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Download failed: ${response.message}`);
      } else {
        //////////////////////////////////////
        const phase = phaseDetails.phaseName; // e.g., "3"
        const year = phaseDetails.year; // e.g., "2025"
        const timestamp = new Date().toISOString().replace(/[:.-]/g, "_"); // formatted timestamp
        const filename = `Profile_Entry_Status_Report_${phase}_${year}_${timestamp}.xlsx`;
        // Handle the successful download
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    ///////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `profile-entry-status-report-district/${phaseId}`
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
    //////////////////////////////////////////////////
  };

  const total_imported_from_bs = data.reduce((acc, value) => {
    return acc + value.imported_from_banglar_siksha;
  }, 0);

  const total_imported_from_banglar_siksha_rejected = data.reduce(
    (acc, value) => {
      return acc + value.imported_from_banglar_siksha_rejected;
    },
    0
  );

  const total_banglar_siksha_verified = data.reduce((acc, value) => {
    return acc + value.banglar_siksha_verified;
  }, 0);

  const total_profile_entry_class_ix_new = data.reduce((acc, value) => {
    return acc + value.profile_entry_class_ix_new;
  }, 0);

  const total_finalyse_class_ix_total = data.reduce((acc, value) => {
    return acc + value.finalyse_class_ix_total;
  }, 0);

  const total_eligible_ix_total = data.reduce((acc, value) => {
    return acc + value.eligible_ix_total;
  }, 0);
  const total_all_ready_get_cycle_yes_ix_total = data.reduce((acc, value) => {
    return acc + value.all_ready_get_cycle_yes_ix_total;
  }, 0);

  const total_approved_class_ix_total = data.reduce((acc, value) => {
    return acc + value.approved_class_ix_total;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            District Wise Profile Entry Status IX {"("}
            {phaseDetails.phase}
            <sup>th</sup>&nbsp;Phase
            {")"}
            {"("}Academic Year {phaseDetails.year}
            {")"}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">
                        Last updated: {time}
                    </p> */}
          {/* Download Button */}
          {data.length != 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownload}
                className="relative bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none"
              >
                Download
              </button>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Serial. No.
                  </th>
                  <th scope="col" className="p-4">
                    District Name
                  </th>
                  <th scope="col" className="p-4">
                    Imported from Banglar Siksha
                  </th>
                  <th scope="col" className="p-4">
                    Rejected by HOI/SI
                  </th>
                  <th scope="col" className="p-4">
                    Banglar Siksha Data Verified (Not Finalized)
                  </th>
                  <th scope="col" className="p-4">
                    New Entry by School
                  </th>
                  <th scope="col" className="p-4">
                    Data Finalized (Not Validated)
                  </th>

                  <th scope="col" className="p-4">
                    Data Validated by SI
                  </th>
                  <th scope="col" className="p-4">
                    Already Received bicycle(YES)
                  </th>
                  <th scope="col" className="p-4">
                    Eligible Students
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="text-center p-4 text-gray-500">
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
                            to={`/ProfileEntryStatusReportBlock/${phaseId}/${btoa(
                              value.district_id_pk
                            )}`}
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-4">
                          {value.imported_from_banglar_siksha}
                        </td>
                        <td className="p-4">
                          {value.imported_from_banglar_siksha_rejected}
                        </td>
                        <td className="p-4">{value.banglar_siksha_verified}</td>
                        <td className="p-4">
                          {value.profile_entry_class_ix_new}
                        </td>
                        <td className="p-4">{value.finalyse_class_ix_total}</td>
                        <td className="p-4">{value.approved_class_ix_total}</td>
                        <td className="p-4">
                          {value.all_ready_get_cycle_yes_ix_total}
                        </td>
                        <td className="p-4">{value.eligible_ix_total}</td>
                      </tr>
                    ))}
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td colSpan="2" className="text-center font-semibold p-4">
                        Total
                      </td>
                      <td className="font-semibold p-4">
                        {total_imported_from_bs}
                      </td>
                      <td className="font-semibold p-4">
                        {total_imported_from_banglar_siksha_rejected}
                      </td>
                      <td className="font-semibold p-4">
                        {total_banglar_siksha_verified}
                      </td>
                      <td className="font-semibold p-4">
                        {total_profile_entry_class_ix_new}
                      </td>
                      <td className="font-semibold p-4">
                        {total_finalyse_class_ix_total}
                      </td>

                      <td className="font-semibold p-4">
                        {total_approved_class_ix_total}
                      </td>
                      <td className="font-semibold p-4">
                        {total_all_ready_get_cycle_yes_ix_total}
                      </td>
                      <td className="font-semibold p-4">
                        {total_eligible_ix_total}
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
};

export default ProfileEntryStatusReportDist;
