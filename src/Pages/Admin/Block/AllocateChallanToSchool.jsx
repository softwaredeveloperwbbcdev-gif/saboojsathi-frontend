import { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const AllocateChallanToSchool = () => {
  const { phaseId, challanId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  //const user = JSON.parse(atob(localStorage.getItem("user")));

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [isLoading, setLoading] = useState(false); // loader

  const [schoolList, setSchoolList] = useState([]);
  const [challanDetails, setChallanDetails] = useState({});
  const [allocations, setAllocations] = useState({});

  const navigate = useNavigate();

  const totalCurrentAllocation = Object.values(allocations).reduce(
    (total, current) => total + current.boys + current.girls,
    0
  );

  const handleAllocationChange = (id, gender, value) => {
    const newAllocation = parseInt(value, 10) || 0;
    const school = schoolList.find((s) => s.school_id === id);

    if (!school) {
      return;
    }

    // Check if the school is selected before allowing allocation
    if (!allocations[id].selected) {
      toast.error("Please select the school first.");
      return;
    }

    const maxAllowed =
      gender === 1
        ? school.boys - school.boys_all
        : school.girls - school.girls_all;

    if (newAllocation > maxAllowed) {
      toast.error(
        `Allocation for ${school.school_name} (${gender}) cannot be more than ${maxAllowed}.`
      );
      return;
    }

    const currentTotalExcludingThis =
      totalCurrentAllocation - (allocations[id].boys + allocations[id].girls);
    if (
      currentTotalExcludingThis + newAllocation >
      challanDetails.remaining_allocation
    ) {
      toast.error(
        `Total allocation cannot exceed remaining cycles (${challanDetails.remaining_allocation}).`
      );
      return;
    }

    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [id]: {
        ...prevAllocations[id],
        [gender]: newAllocation,
      },
    }));
  };

  const handleCheckboxChange = (id) => {
    setAllocations((prevAllocations) => {
      // Defensive check to ensure the school allocation entry exists
      const currentAllocation = prevAllocations[id] || {
        boys: 0,
        girls: 0,
        selected: false,
      };

      const newSelectedState = !currentAllocation.selected;

      return {
        ...prevAllocations,
        [id]: {
          ...currentAllocation,
          selected: newSelectedState,
          // Reset allocations to 0 if the checkbox is unchecked
          boys: newSelectedState ? currentAllocation.boys : 0,
          girls: newSelectedState ? currentAllocation.girls : 0,
        },
      };
    });
  };

  // const handleAllocate = () => {
  //   const allocatedData = schoolList
  //     .filter((school) => allocations[school.school_id]?.selected)
  //     .map((school) => ({
  //       challanId: challanDetails.challan_id_pk ,
  //       schoolId: school.school_id,
  //       currentAllocation: {
  //         boys: allocations[school.school_id]?.boys || 0,
  //         girls: allocations[school.school_id]?.girls || 0,
  //       },
  //     }));

  //   if (allocatedData.length === 0) {
  //     toast.error("Please select at least one school for allocation.");
  //     return;
  //   }

  //   setAllocationOutput(JSON.stringify(allocatedData, null, 2));
  //   toast.success("Challan Allocated Successfully!", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const handleAllocate = async () => {
    const allocatedData = schoolList
      .filter((school) => allocations[school.school_id]?.selected)
      .map((school) => ({
        challanId: challanDetails.challan_no,
        schoolId: school.school_id,
        currentAllocation: {
          boys: allocations[school.school_id]?.boys || 0,
          girls: allocations[school.school_id]?.girls || 0,
        },
      }));

    if (allocatedData.length === 0) {
      toast.error("Please select at least one school for allocation.");
      return;
    }

    setLoading(true);
    try {
      const response = await callApi("POST", "/allocationSave", allocatedData);

      if (!response.error) {
        navigate(`/AllocateChallanView/${phaseId}`);
        toast.success("Challan Allocated Successfully!");
      } else {
        toast.error(`Failed to allocate challan: ${response.message}`);
      }
    } catch (err) {
      toast.error(`❌ Failed to allocate challan. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isAllocateButtonDisabled = !(
    Object.values(allocations).some((a) => a.selected) &&
    totalCurrentAllocation > 0
  );

  const getTaggedSchool = async () => {
    const deliveryData = {
      phaseId: phaseId,
      challanId: challanId,
    };

    setLoading(true);

    try {
      const response = await callApi(
        "POST",
        "/getAllocationChallanSchoolDetails",
        deliveryData
      );

      if (
        !response.error &&
        response.data?.schoolList &&
        response.data?.challanDetails
      ) {
        setSchoolList(response.data.schoolList);
        setChallanDetails(response.data.challanDetails);
      } else {
        toast.error("⚠️ Failed to tagged school list:", response.message);
        // Optional: display toast or fallback UI
      }
    } catch (err) {
      // console.error("❌ Error fetching tagged school list:", err);
      toast.error(`❌ Failed to fetch tagged school list. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolList && schoolList.length > 0) {
      setAllocations(
        schoolList.reduce((acc, school) => {
          acc[school.school_id] = { boys: 0, girls: 0, selected: false };
          return acc;
        }, {})
      );
    }
  }, [schoolList]);

  useEffect(() => {
    getTaggedSchool();
  }, [phaseId]);

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Allocate Challan Phase {phaseDetails.phaseName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-8 shadow-inner text-sm md:text-base">
              <div className="flex flex-col items-center justify-center p-2">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  Challan Number
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                  {challanDetails.challan_no}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  Total Cycles
                </span>
                <span className="text-gray-900 dark:text-white font-bold mt-1">
                  {challanDetails.no_of_cycles}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  Remaining Cycles
                </span>
                <span
                  className={`font-bold mt-1 ${
                    challanDetails.remaining_allocation > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {challanDetails.remaining_allocation}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  Challan Type
                </span>
                <span className="text-gray-900 dark:text-white font-bold mt-1">
                  {challanDetails.type_of_cycle == 1 ? "Boys" : "Girls"}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    S.No.
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Select
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    DIS E-Code
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    School Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    colSpan="3"
                  >
                    Requirement
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    colSpan="3"
                  >
                    Previous Allocation
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    colSpan="2"
                  >
                    Current Allocation
                  </th>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th
                    scope="col"
                    colSpan="4"
                    className="px-3 md:px-6 py-3"
                  ></th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Boys
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Girls
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Boys
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Girls
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Boys
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Girls
                  </th>
                </tr>
              </thead>
              <tbody>
                {schoolList && schoolList.length > 0 ? (
                  schoolList.map((school, index) => (
                    <tr
                      key={`${school.challan_id_pk}_${index}`}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out rounded dark:bg-gray-600 dark:border-gray-500 dark:checked:bg-indigo-500"
                          checked={
                            allocations[school.school_id]?.selected || false
                          }
                          onChange={() =>
                            handleCheckboxChange(school.school_id)
                          }
                        />
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {school.schcd}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                        {school.school_name}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.boys}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.girls}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.total}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.boys_all}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.girls_all}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        {school.total_all}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        <input
                          type="number"
                          value={allocations[school.school_id]?.boys || ""}
                          onChange={(e) =>
                            handleAllocationChange(
                              school.school_id,
                              "boys",
                              e.target.value
                            )
                          }
                          className={`w-16 md:w-20 text-center border rounded-md p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            challanDetails.type_of_cycle === 2
                              ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                              : "bg-white dark:bg-gray-800"
                          }`}
                          disabled={
                            challanDetails.type_of_cycle === 2 ||
                            !allocations[school.school_id]?.selected
                          }
                          max={school.boys - school.boys_all}
                        />
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                        <input
                          type="number"
                          value={allocations[school.school_id]?.girls || ""}
                          onChange={(e) =>
                            handleAllocationChange(
                              school.school_id,
                              "girls",
                              e.target.value
                            )
                          }
                          className={`w-16 md:w-20 text-center border rounded-md p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            challanDetails.type_of_cycle === 1
                              ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                              : "bg-white dark:bg-gray-800"
                          }`}
                          disabled={
                            challanDetails.type_of_cycle === 1 ||
                            !allocations[school.school_id]?.selected
                          }
                          max={school.girls - school.girls_all}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="px-4 py-4 text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-center md:justify-end">
            <button
              onClick={handleAllocate}
              disabled={isAllocateButtonDisabled}
              className={`py-2 px-8 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 transform ${
                isAllocateButtonDisabled
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }`}
            >
              Allocate Challan
            </button>
          </div>
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
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

export default AllocateChallanToSchool;
