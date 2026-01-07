import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
// import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ChallanAllocationStatusBlockReport() {
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
    ////////////////////////////////////////////////
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `challan_allocation_status_block/${id}/${phaseId}`
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
    //////////////////////////////////////////////////
  };

  const request_sent_boys_total = data.reduce((acc, value) => {
    return acc + value.request_sent_boys;
  }, 0);

  const request_sent_girls_total = data.reduce((acc, value) => {
    return acc + value.request_sent_girls;
  }, 0);
  const request_sent_total = data.reduce((acc, value) => {
    return acc + value.request_sent;
  }, 0);
  const approved_boys_total = data.reduce((acc, value) => {
    return acc + value.approved_boys;
  }, 0);
  const approved_girls_total = data.reduce((acc, value) => {
    return acc + value.approved_girls;
  }, 0);
  const approved_total = data.reduce((acc, value) => {
    return acc + value.approved;
  }, 0);
  const rejected_boys_total = data.reduce((acc, value) => {
    return acc + value.rejected_boys;
  }, 0);
  const rejected_girls_total = data.reduce((acc, value) => {
    return acc + value.rejected_girls;
  }, 0);
  const rejected_total = data.reduce((acc, value) => {
    return acc + value.rejected;
  }, 0);
  const pending_boys_total = data.reduce((acc, value) => {
    return acc + value.pending_boys;
  }, 0);
  const pending_girls_total = data.reduce((acc, value) => {
    return acc + value.pending_girls;
  }, 0);
  const pending_total = data.reduce((acc, value) => {
    return acc + value.pending;
  }, 0);
  const allocated_boys_total = data.reduce((acc, value) => {
    return acc + value.allocated_boys;
  }, 0);
  const allocated_girls_total = data.reduce((acc, value) => {
    return acc + value.allocated_girls;
  }, 0);
  const allocated_total = data.reduce((acc, value) => {
    return acc + value.allocated;
  }, 0);
  const pending_allocation_boys_total = data.reduce((acc, value) => {
    return acc + value.pending_allocation_boys;
  }, 0);
  const pending_allocation_girls_total = data.reduce((acc, value) => {
    return acc + value.pending_allocation_girls;
  }, 0);
  const pending_allocation_total = data.reduce((acc, value) => {
    return acc + value.pending_allocation;
  }, 0);
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Report on Generation of e-Challan & Allocation to School under
            Sabooj Sathi Wise Phase {phaseDetails.phaseName}
          </h1>
          {/* <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p> */}
          <div className="text-gray-600 block p-3.5 relative">
            {/* Download Button */}
            {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button> */}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th rowSpan="2" scope="col" className="p-4 rounded-tl-lg">
                    Sl No.
                  </th>
                  <th rowSpan="2" scope="col" className="p-4">
                    Block
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Challan Request Received
                  </th>

                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Request Accepted/Challan Generated
                  </th>

                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Request Rejected
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Challan Approval Pending
                  </th>
                  <th colSpan="3" scope="col" className="p-4 text-center">
                    Allocated to School
                  </th>
                  <th
                    colSpan="3"
                    scope="col"
                    className="p-4 text-center rounded-tr-lg"
                  >
                    Allocation Pending
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
                        <td className="p-4">{value.block_name}</td>
                        <td className="p-4">{value.request_sent_boys}</td>
                        <td className="p-4">{value.request_sent_girls}</td>
                        <td className="p-4">{value.request_sent}</td>
                        <td className="p-4">{value.approved_boys}</td>
                        <td className="p-4">{value.approved_girls}</td>
                        <td className="p-4">{value.approved}</td>
                        <td className="p-4">{value.rejected_boys}</td>
                        <td className="p-4">{value.rejected_girls}</td>
                        <td className="p-4">{value.rejected}</td>
                        <td className="p-4">{value.pending_boys}</td>
                        <td className="p-4">{value.pending_girls}</td>
                        <td className="p-4">{value.pending}</td>
                        <td className="p-4">{value.allocated_boys}</td>
                        <td className="p-4">{value.allocated_girls}</td>
                        <td className="p-4">{value.allocated}</td>
                        <td className="p-4">{value.pending_allocation_boys}</td>
                        <td className="p-4">
                          {value.pending_allocation_girls}
                        </td>
                        <td className="p-4">{value.pending_allocation}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="text-center font-semibold p-4">
                        Total
                      </td>
                      <td className="font-semibold p-4">
                        {request_sent_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {request_sent_girls_total}
                      </td>
                      <td className="font-semibold p-4">
                        {request_sent_total}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {approved_girls_total}
                      </td>
                      <td className="font-semibold p-4">{approved_total}</td>
                      <td className="font-semibold p-4">
                        {rejected_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {rejected_girls_total}
                      </td>
                      <td className="font-semibold p-4">{rejected_total}</td>
                      <td className="font-semibold p-4">
                        {pending_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {pending_girls_total}
                      </td>
                      <td className="font-semibold p-4">{pending_total}</td>
                      <td className="font-semibold p-4">
                        {allocated_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {allocated_girls_total}
                      </td>
                      <td className="font-semibold p-4">{allocated_total}</td>
                      <td className="font-semibold p-4">
                        {pending_allocation_boys_total}
                      </td>
                      <td className="font-semibold p-4">
                        {pending_allocation_girls_total}
                      </td>
                      <td className="font-semibold p-4">
                        {pending_allocation_total}
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
}

export default ChallanAllocationStatusBlockReport;
