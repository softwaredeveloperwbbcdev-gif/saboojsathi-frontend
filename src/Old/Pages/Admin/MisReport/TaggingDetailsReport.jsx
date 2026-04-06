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

const TaggingDetailsReport = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [phaseId]);
  // alert("hiii");
  const fetchData = async () => {
    ////////////////////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `distwise_tagging_report/${phaseId}`
      ); // API call
      if (response.error) {
        // console.log(JSON.stringify(response));
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
  const total_no_of_schools = data.reduce((acc, value) => {
    return acc + value.no_of_schools;
  }, 0);

  const total_no_of_schools_tagged = data.reduce((acc, value) => {
    return acc + value.no_of_schools_tagged;
  }, 0);

  const total_tagged_boys = data.reduce((acc, value) => {
    return acc + value.tagged_boys;
  }, 0);

  const total_tagged_girls = data.reduce((acc, value) => {
    return acc + value.tagged_girls;
  }, 0);

  const total_tagged = data.reduce((acc, value) => {
    return acc + value.total_tagged;
  }, 0);

  const total_eligible_boys = data.reduce((acc, value) => {
    return acc + value.eligible_boys;
  }, 0);

  const total_eligible_girls = data.reduce((acc, value) => {
    return acc + value.eligible_girls;
  }, 0);
  const total_eligible = data.reduce((acc, value) => {
    return acc + value.total_eligible;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            District Wise Delivery Center School Tagging Report{" "}
            {phaseDetails.phase}
            <sup>th</sup> Phase {"("}For Academic Year {phaseDetails.year}
            {")"}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          {/* Download Button */}
          {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button> */}

          <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th rowSpan="2" scope="col" className="p-4 rounded-tl-lg">
                    Serial. No.
                  </th>
                  <th rowSpan="2" scope="col" className="p-4">
                    District Name
                  </th>

                  <th rowSpan="2" scope="col" className="p-4">
                    Total No. of Schools
                  </th>

                  <th rowSpan="2" scope="col" className="p-4 text-center">
                    No. of Schools Tagged
                  </th>

                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Students in Tagged School
                  </th>
                  <th
                    colSpan="3"
                    scope="col"
                    className="p-4 text-center rounded-tr-lg"
                  >
                    Eligible Students
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
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">
                          <Link
                            to={`/TaggingDetailsReportBlock/${btoa(
                              value.district_id_pk
                            )}/${phaseId}/`}
                          >
                            {value.district_name}
                          </Link>
                        </td>
                        <td className="p-4">{value.no_of_schools}</td>

                        <td className="p-4">{value.no_of_schools_tagged}</td>
                        <td className="p-4">{value.tagged_boys}</td>
                        <td className="p-4">{value.tagged_girls}</td>

                        <td className="p-4">{value.total_tagged}</td>
                        <td className="p-4">{value.eligible_boys}</td>
                        <td className="p-4">{value.eligible_girls}</td>
                        <td className="p-4">{value.total_eligible}</td>
                      </tr>
                    ))}
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td colSpan="2" className="text-center font-semibold p-4">
                        Total
                      </td>

                      <td className="font-semibold p-4">
                        {total_no_of_schools}
                      </td>

                      <td className="font-semibold p-4">
                        {total_no_of_schools_tagged}
                      </td>

                      <td className="font-semibold p-4">{total_tagged_boys}</td>
                      <td className="font-semibold p-4">
                        {total_tagged_girls}
                      </td>
                      <td className="font-semibold p-4">{total_tagged}</td>
                      <td className="font-semibold p-4">
                        {total_eligible_boys}
                      </td>
                      <td className="font-semibold p-4">
                        {total_eligible_girls}
                      </td>
                      <td className="font-semibold p-4">{total_eligible}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {loading && <Loader />}
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

export default TaggingDetailsReport;
