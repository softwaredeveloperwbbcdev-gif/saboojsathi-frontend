import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

function SynopticReport() {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", `synoptic_report`); // API call
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

  const total = data.reduce((acc, value) => {
    return acc + value.data[0].verified;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Synoptic Report
          </h1>
          <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 rounded-tl-lg">
                    Sl. No.
                  </th>
                  <th scope="col" className="p-4">
                    Year
                  </th>
                  <th scope="col" className="p-4">
                    Phase
                  </th>
                  <th scope="col" className="p-4">
                    Eligible Students
                  </th>
                  <th scope="col" className="p-4">
                    No. of Students Received Bi-cycle
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
                  data.map((value, index) => (
                    <tr
                      key={index + value.phase}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{value.year}</td>
                      <td className="p-4">{value.phase}</td>
                      <td className="p-4">{value.view}</td>
                      <td className="p-4">{value.data[0].verified}</td>
                    </tr>
                  ))
                )}
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td colSpan="4" className="p-4 text-center font-bold">
                    Total
                  </td>
                  <td className="p-4 font-bold">{total}</td>
                </tr>
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
}

export default SynopticReport;
