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

const ChallanMis = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  const fetchData = async () => {
    ////////////////////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi("GET", `challan_mis/${phaseId}`); // API call
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
  const total_distribution_record_generated = data.reduce((acc, value) => {
    return acc + value.distribution_record_generated;
  }, 0);

  const total_challan_issued = data.reduce((acc, value) => {
    return acc + value.challan_issued;
  }, 0);

  const total_distribution_updated = data.reduce((acc, value) => {
    return acc + value.distribution_updated;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            District Wise Backlog Distribution Update and Challan Issued Report{" "}
            {phaseDetails.phaseName}
            &nbsp;For Academic Year {phaseDetails.year}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* Download Button */}
          {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button> */}

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
                  <th scope="col" className="p-4 text-center">
                    Distribution Record Generated
                  </th>
                  <th scope="col" className="p-4 text-center">
                    Delivery Challan Issued
                  </th>
                  <th className="p-4 text-center rounded-tr-lg">
                    Distribution Details Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="5" className="text-center p-2 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  data.map((value, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        <Link
                          to={`/ChallanMisBlock/${phaseId}/${btoa(
                            value.district_id_pk
                          )}`}
                        >
                          {value.district_name}
                        </Link>
                      </td>

                      <td className="p-4 text-center">
                        {value.distribution_record_generated}
                      </td>

                      <td className="p-4 text-center">
                        {value.challan_issued}
                      </td>
                      <td className="p-4 text-center">
                        {value.distribution_updated}
                      </td>
                    </tr>
                  ))
                )}
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td colSpan="2" className="p-4 text-center font-bold">
                    Total
                  </td>

                  <td className="p-4 text-center font-bold">
                    {total_distribution_record_generated}
                  </td>

                  <td className="p-4 text-center font-bold">
                    {total_challan_issued}
                  </td>

                  <td className="p-4 text-center font-bold">
                    {total_distribution_updated}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {loading && <Loader />}
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

export default ChallanMis;
