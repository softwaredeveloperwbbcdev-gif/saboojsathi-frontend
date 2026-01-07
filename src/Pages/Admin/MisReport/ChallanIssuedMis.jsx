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

const ChallanIssuedMis = () => {
  const { id, phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    ////////////////////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `challan_issued_mis_details/${id}/${phaseId}`
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

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Backlog Distribution Update and Challan Issued Report Phase{" "}
            {phaseDetails.phaseName}
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
                    Supplier
                  </th>
                  <th scope="col" className="p-4">
                    Order No. Date and Quantity
                  </th>
                  <th scope="col" className="p-4">
                    Challan No
                  </th>
                  <th scope="col" className="p-4">
                    Challan Date
                  </th>
                  <th scope="col" className="p-4">
                    Boys
                  </th>
                  <th scope="col" className="p-4">
                    Girls
                  </th>
                  <th scope="col" className="p-4">
                    Whether the Challan was paid
                  </th>
                  <th scope="col" className="p-4">
                    Bill No.
                  </th>
                  <th scope="col" className="p-4 rounded-tr-lg">
                    Bill Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  // Show this row if no student data is available
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td colSpan="10" className="text-center p-4">
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
                      <td className="p-4">{value.supplier_name}</td>

                      <td className="p-4">{value.description}</td>

                      <td className="p-4">{value.challan_no}</td>
                      <td className="p-4">{value.challan_date}</td>
                      <td className="p-4">{value.boys_no}</td>
                      <td className="p-4">{value.girls_no}</td>
                      <td className="p-4">{value.challan_already_paid}</td>
                      <td className="p-4">{value.bill_no}</td>
                      <td className="p-4">{value.bill_date}</td>
                    </tr>
                  ))
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

export default ChallanIssuedMis;
