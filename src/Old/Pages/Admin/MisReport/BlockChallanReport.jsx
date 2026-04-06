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

function BlockChallanReport() {
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
        `blockwise_challan_report/${id}/${phaseId}`
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
    ///////////////////////////////////////////////
  };

  const challan_total = data.reduce((acc, value) => {
    return acc + value.no_of_challan;
  }, 0);

  const boys_total = data.reduce((acc, value) => {
    return acc + value.boys;
  }, 0);
  const girls_total = data.reduce((acc, value) => {
    return acc + value.girls;
  }, 0);
  const cycle_total = data.reduce((acc, value) => {
    return acc + value.total;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Block Wise Challan Report {"("}Phase {phaseDetails.phaseName}
            {")"}
          </h1>
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
                  <th scope="col" className="p-4">
                    Number of Challan Issued
                  </th>

                  <th scope="col" className="p-4">
                    No. of Boy's Cycles
                  </th>
                  <th scope="col" className="p-4">
                    No. of Girl's Cycles
                  </th>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Total No. of Cycles
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
                            to={`/ChallanDetailsByBlock/${btoa(
                              value.block_id_pk
                            )}/${phaseId}`}
                          >
                            {value.block_name}
                          </Link>
                        </td>

                        <td className="p-4">{value.no_of_challan}</td>
                        <td className="p-4">{value.boys}</td>
                        <td className="p-4">{value.girls}</td>
                        <td className="p-4">{value.total}</td>
                      </tr>
                    ))}
                  </>
                )}
                <tr>
                  <td colSpan="2" className="text-center font-semibold p-4">
                    Total
                  </td>
                  <td className="font-semibold p-4">{challan_total}</td>
                  <td className="font-semibold p-4">{boys_total}</td>
                  <td className="font-semibold p-4">{girls_total}</td>
                  <td className="font-semibold p-4">{cycle_total}</td>
                </tr>
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

export default BlockChallanReport;
