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

function DistributionReportDistrict() {
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
        `distwise_distribution_report_download`,
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
        const filename = `District_Wise_Distribution_Report_${phase}_${year}_${timestamp}.xlsx`;
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
    ////////////////////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `distwise_distribution_report/${phaseId}`
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
    ///////////////////////////////////////////////////////////////
  };

  const boys_muster_roll_generated_total = data.reduce((acc, value) => {
    return acc + value.boys_muster_roll_generated;
  }, 0);

  const girls_muster_roll_generated_total = data.reduce((acc, value) => {
    return acc + value.girls_muster_roll_generated;
  }, 0);
  const muster_roll_generated_total = data.reduce((acc, value) => {
    return (
      acc + value.boys_muster_roll_generated + value.girls_muster_roll_generated
    );
  }, 0);
  const boys_updated_total = data.reduce((acc, value) => {
    return acc + value.boys_updated;
  }, 0);
  const girls_updated_total = data.reduce((acc, value) => {
    return acc + value.girls_updated;
  }, 0);
  const updated_total = data.reduce((acc, value) => {
    return acc + value.boys_updated + value.girls_updated;
  }, 0);
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            District Wise Distribution Status Phase {phaseDetails.phaseName}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* Download Button */}
          {data.length != 0 && (
            <div className="w-full pb-2 flex justify-end">
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
                  <th rowSpan="2" scope="col" className="p-4 rounded-tl-lg">
                    District Name
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Distribution Record Generated
                  </th>

                  <th
                    colSpan="3"
                    scope="col"
                    className="p-4 text-center rounded-tr-lg"
                  >
                    Distribution Record Updated
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
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="p-4 text-center text-gray-500">
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
                        <td className="p-4">
                          <Link
                            to={`/DistributionReportBlock/${btoa(
                              value.district_id_pk
                            )}/${phaseId}`}
                          >
                            {value.district_name}
                          </Link>
                        </td>

                        <td className="p-4">
                          {value.boys_muster_roll_generated}
                        </td>
                        <td className="p-4">
                          {value.girls_muster_roll_generated}
                        </td>
                        <td className="p-4">
                          {value.boys_muster_roll_generated +
                            value.girls_muster_roll_generated}
                        </td>
                        <td className="p-4">{value.boys_updated}</td>
                        <td className="p-4">{value.girls_updated}</td>
                        <td className="p-4">
                          {value.boys_updated + value.girls_updated}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="p-4">Total</td>
                      <td className="p-4">
                        {boys_muster_roll_generated_total}
                      </td>
                      <td className="p-4">
                        {girls_muster_roll_generated_total}
                      </td>
                      <td className="p-4">{muster_roll_generated_total}</td>
                      <td className="p-4">{boys_updated_total}</td>
                      <td className="p-4">{girls_updated_total}</td>
                      <td className="p-4">{updated_total}</td>
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

export default DistributionReportDistrict;
