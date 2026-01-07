import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

function GenderwiseReport() {
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
      const response = await callApi("GET", `/genderwise_report`);
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

  const total_boys_p1 = data.reduce((acc, value) => {
    return acc + value.boys_total_p1;
  }, 0);

  const total_girls_p1 = data.reduce((acc, value) => {
    return acc + value.girls_total_p1;
  }, 0);
  const total_boys_girls_p1 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p1;
  }, 0);
  const total_boys_p2 = data.reduce((acc, value) => {
    return acc + value.boys_total_p2;
  }, 0);

  const total_girls_p2 = data.reduce((acc, value) => {
    return acc + value.girls_total_p2;
  }, 0);
  const total_boys_girls_p2 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p2;
  }, 0);
  const total_boys_p3 = data.reduce((acc, value) => {
    return acc + value.boys_total_p3;
  }, 0);

  const total_girls_p3 = data.reduce((acc, value) => {
    return acc + value.girls_total_p3;
  }, 0);
  const total_boys_girls_p3 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p3;
  }, 0);
  const total_boys_p4 = data.reduce((acc, value) => {
    return acc + value.boys_total_p4;
  }, 0);

  const total_girls_p4 = data.reduce((acc, value) => {
    return acc + value.girls_total_p4;
  }, 0);
  const total_boys_girls_p4 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p4;
  }, 0);
  const total_boys_p5 = data.reduce((acc, value) => {
    return acc + value.boys_total_p5;
  }, 0);

  const total_girls_p5 = data.reduce((acc, value) => {
    return acc + value.girls_total_p5;
  }, 0);
  const total_boys_girls_p5 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p5;
  }, 0);
  const total_boys_p6 = data.reduce((acc, value) => {
    return acc + value.boys_total_p6;
  }, 0);

  const total_girls_p6 = data.reduce((acc, value) => {
    return acc + value.girls_total_p6;
  }, 0);
  const total_boys_girls_p6 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p6;
  }, 0);
  const total_boys_p7 = data.reduce((acc, value) => {
    return acc + value.boys_total_p7;
  }, 0);

  const total_girls_p7 = data.reduce((acc, value) => {
    return acc + value.girls_total_p7;
  }, 0);
  const total_boys_girls_p7 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p7;
  }, 0);
  const total_boys_p8 = data.reduce((acc, value) => {
    return acc + value.boys_total_p8;
  }, 0);

  const total_girls_p8 = data.reduce((acc, value) => {
    return acc + value.girls_total_p8;
  }, 0);
  const total_boys_girls_p8 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p8;
  }, 0);
  const total_boys_p9 = data.reduce((acc, value) => {
    return acc + value.boys_total_p9;
  }, 0);

  const total_girls_p9 = data.reduce((acc, value) => {
    return acc + value.girls_total_p9;
  }, 0);
  const total_boys_girls_p9 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p9;
  }, 0);
  const total_boys_p10 = data.reduce((acc, value) => {
    return acc + value.boys_total_p10;
  }, 0);

  const total_girls_p10 = data.reduce((acc, value) => {
    return acc + value.girls_total_p10;
  }, 0);
  const total_boys_girls_p10 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p10;
  }, 0);
  const total_boys_p11 = data.reduce((acc, value) => {
    return acc + value.boys_total_p11;
  }, 0);

  const total_girls_p11 = data.reduce((acc, value) => {
    return acc + value.girls_total_p11;
  }, 0);
  const total_boys_girls_p11 = data.reduce((acc, value) => {
    return acc + value.boys_girls_total_p11;
  }, 0);
  const total = data.reduce((acc, value) => {
    return acc + value.total;
  }, 0);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Gender wise Distribution Report
          </h1>
          <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto max-w-screen-2xl">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th rowSpan="3" scope="col" className="p-4 rounded-tl-lg">
                    District Name
                  </th>

                  <th colSpan="3" scope="col" className="p-4">
                    Phase I
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase II
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase III
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase IV
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase V
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase VI
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase VII
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase VIII
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase IX
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase X
                  </th>
                  <th colSpan="3" scope="col" className="p-4">
                    Phase XI (in pogress)
                  </th>
                  <th rowSpan="2" scope="col" className="p-4 rounded-tr-lg">
                    Total
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
                    <td colSpan="35" className="text-center p-2 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  data.map((value, index) => (
                    <tr
                      key={index + value.district_id_pk}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4">
                        <Link
                          to={`/GenderwiseReportBlock/${btoa(
                            value.district_id_pk
                          )}`}
                        >
                          {value.district_name}
                        </Link>
                      </td>
                      <td className="p-4">{value.boys_total_p1}</td>
                      <td className="p-4">{value.girls_total_p1}</td>
                      <td className="p-4">{value.boys_girls_total_p1}</td>
                      <td className="p-4">{value.boys_total_p2}</td>
                      <td className="p-4">{value.girls_total_p2}</td>
                      <td className="p-4">{value.boys_girls_total_p2}</td>
                      <td className="p-4">{value.boys_total_p3}</td>
                      <td className="p-4">{value.girls_total_p3}</td>
                      <td className="p-4">{value.boys_girls_total_p3}</td>
                      <td className="p-4">{value.boys_total_p4}</td>
                      <td className="p-4">{value.girls_total_p4}</td>
                      <td className="p-4">{value.boys_girls_total_p4}</td>

                      <td className="p-4">{value.boys_total_p5}</td>
                      <td className="p-4">{value.girls_total_p5}</td>
                      <td className="p-4">{value.boys_girls_total_p5}</td>
                      <td className="p-4">{value.boys_total_p6}</td>
                      <td className="p-4">{value.girls_total_p6}</td>
                      <td className="p-4">{value.boys_girls_total_p6}</td>
                      <td className="p-4">{value.boys_total_p7}</td>
                      <td className="p-4">{value.girls_total_p7}</td>
                      <td className="p-4">{value.boys_girls_total_p7}</td>
                      <td className="p-4">{value.boys_total_p8}</td>
                      <td className="p-4">{value.girls_total_p8}</td>
                      <td className="p-4">{value.boys_girls_total_p8}</td>
                      <td className="p-4">{value.boys_total_p9}</td>
                      <td className="p-4">{value.girls_total_p9}</td>
                      <td className="p-4">{value.boys_girls_total_p9}</td>
                      <td className="p-4">{value.boys_total_p10}</td>
                      <td className="p-4">{value.girls_total_p10}</td>
                      <td className="p-4">{value.boys_girls_total_p10}</td>
                      <td className="p-4">{value.boys_total_p11}</td>
                      <td className="p-4">{value.girls_total_p11}</td>
                      <td className="p-4">{value.boys_girls_total_p11}</td>
                      <td className="p-4">{value.total}</td>
                    </tr>
                  ))
                )}
                <tr>
                  <td className="p-4 font-bold text-center">Total</td>
                  <td className="p-4 font-bold">{total_boys_p1}</td>
                  <td className="p-4 font-bold">{total_girls_p1}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p1}</td>
                  <td className="p-4 font-bold">{total_boys_p2}</td>
                  <td className="p-4 font-bold">{total_girls_p2}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p2}</td>
                  <td className="p-4 font-bold">{total_boys_p3}</td>
                  <td className="p-4 font-bold">{total_girls_p3}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p3}</td>
                  <td className="p-4 font-bold">{total_boys_p4}</td>
                  <td className="p-4 font-bold">{total_girls_p4}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p4}</td>
                  <td className="p-4 font-bold">{total_boys_p5}</td>
                  <td className="p-4 font-bold">{total_girls_p5}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p5}</td>
                  <td className="p-4 font-bold">{total_boys_p6}</td>
                  <td className="p-4 font-bold">{total_girls_p6}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p6}</td>
                  <td className="p-4 font-bold">{total_boys_p7}</td>
                  <td className="p-4 font-bold">{total_girls_p7}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p7}</td>
                  <td className="p-4 font-bold">{total_boys_p8}</td>
                  <td className="p-4 font-bold">{total_girls_p8}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p8}</td>
                  <td className="p-4 font-bold">{total_boys_p9}</td>
                  <td className="p-4 font-bold">{total_girls_p9}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p9}</td>
                  <td className="p-4 font-bold">{total_boys_p10}</td>
                  <td className="p-4 font-bold">{total_girls_p10}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p10}</td>
                  <td className="p-4 font-bold">{total_boys_p11}</td>
                  <td className="p-4 font-bold">{total_girls_p11}</td>
                  <td className="p-4 font-bold">{total_boys_girls_p11}</td>
                  <td className="p-4 font-bold">{total}</td>
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

export default GenderwiseReport;
