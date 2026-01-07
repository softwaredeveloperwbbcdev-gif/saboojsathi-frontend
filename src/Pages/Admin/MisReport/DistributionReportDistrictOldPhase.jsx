import React, { useEffect, useState } from "react";
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

  // console.log(year, phase);

  useEffect(() => {
    fetchData();
  }, [phaseId]);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "POST",
        `distwise_distribution_report`,
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
  const boys_updated_total = data.reduce((acc, value) => {
    return acc + value.boys_total_dis;
  }, 0);
  const girls_updated_total = data.reduce((acc, value) => {
    return acc + value.girls_total_dis;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-800">
            District Wise Distribution Status phase
            {phaseDetails.phaseName} For Academic Year&nbsp;
            {phaseDetails.year}
          </h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p>
        </section>
        <section>
          {loading && <Loader />} {/* 👈 show the loader component */}
          <div className=" rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
            <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
              {/* Download Button */}
              {data.length != 0 && (
                <button
                  onClick={handleDownload}
                  className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none"
                >
                  Download
                </button>
              )}
            </div>
            <div>
              <table className="w-full border border-gray-400 mb-6">
                <thead className="bg-sky-500 text-white text-center">
                  <tr>
                    {/* <th
                      rowSpan="2"
                      className="w-[10%] p-2 border border-gray-400"
                    >
                      Serial. No.
                    </th> */}
                    <th
                      rowSpan="2"
                      className="w-[22%] p-2 border border-gray-400"
                    >
                      District Name
                    </th>
                    {/* <th
                      colSpan="3"
                      className="w-[30%] p-2 border border-gray-400"
                    >
                      Profile Entry
                    </th> */}
                    {/* <th className="w-[20%] p-2 border border-gray-400">
                      Boys 
                    </th> */}
                    {/* <th className="w-[20%] p-2 border border-gray-400">
                      Girls (profile entry )
                    </th>
                    <th className="w-[20%] p-2 border border-gray-400">
                      Total (profile entry )
                    </th> */}
                    <th
                      colSpan="3"
                      className="w-[30 %] p-2 border border-gray-400"
                    >
                      Distribution Record Generated
                    </th>

                    <th
                      colSpan="3"
                      className="w-[30%] p-2 border border-gray-400"
                    >
                      Distribution Record Updated
                    </th>
                  </tr>
                  <tr>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Boys
                    </th>
                    <th className="p-2 border border-gray-400">Girls</th>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Total
                    </th>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Boys
                    </th>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Girls
                    </th>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Total
                    </th>
                    {/* <th className="p-2 border border-gray-400">Girls</th>
                    <th rowSpan="2" className="p-2 border border-gray-400">
                      Total
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    // Show this row if no student data is available
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center p-2 text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  ) : (
                    data.map((value, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="text-left p-2 border border-gray-400">
                          <Link
                            to={`/DistributionReportBlock/${btoa(
                              value.district_id_pk
                            )}/${phaseId}`}
                          >
                            {value.district_name}
                          </Link>
                        </td>

                        <td className="text-center p-2 border border-gray-400">
                          {value.boys_muster_roll_generated}
                        </td>
                        <td className="text-center p-2 border border-gray-400">
                          {value.girls_muster_roll_generated}
                        </td>
                        <td className="text-center p-2 border border-gray-400">
                          {value.boys_muster_roll_generated +
                            value.girls_muster_roll_generated}
                        </td>
                        <td className="text-center p-2 border border-gray-400">
                          {value.boys_total_dis}
                        </td>
                        <td className="text-center p-2 border border-gray-400">
                          {value.girls_total_dis}
                        </td>
                        <td className="text-center p-2 border border-gray-400">
                          {value.boys_total_dis + value.girls_total_dis}
                        </td>
                      </tr>
                    ))
                  )}
                  <tr>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      Total
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {boys_muster_roll_generated_total}
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {girls_muster_roll_generated_total}
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {boys_muster_roll_generated_total +
                        girls_muster_roll_generated_total}
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {boys_updated_total}
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {girls_updated_total}
                    </td>
                    <td className="text-center font-semibold p-2 border border-gray-400">
                      {boys_updated_total + girls_updated_total}
                    </td>
                    {/* <td className="text-center font-semibold p-2 border border-gray-400">
                      {updated_total}
                    </td> */}
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </div>
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
