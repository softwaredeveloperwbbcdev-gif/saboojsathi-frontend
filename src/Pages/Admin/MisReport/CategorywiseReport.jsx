import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";
// import axios from "axios";

function CategorywiseReport() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
    formState: { errors }, // Contains validation errors
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const selectedDistrict = watch("district");
  // const selectedBlock = watch("block");
  // const selectedChallanDate = watch("challanDate");
  // const selectedChallanNo = watch("challanNo");
  const [challanViewSearchDts, setChallanViewSearchDts] = useState({
    cdistricts: [],
    cblocks: [],
  });

  // const selectedPhase = phase;
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data when searchText or data changes
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  // console.log(id, phase);

  // useEffect(() => {
  //   // alert("hiii")
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const response = await challanParticularsView(
  //       `challan_particulars_view/${year}/${phase}`
  //     ); // API call fo whole data by view

  //     if (response.success) {
  //       setData(response.data);
  //       setLoading(false);
  //       console.log(response.data);
  //     } else {
  //       setLoading(false);
  //       if (response.status === 401) {
  //         setBackEndErr(response.message);
  //       } else if (
  //         response.status === 401 &&
  //         response.code === "TOKEN_INVALID"
  //       ) {
  //         localStorage.removeItem("token");
  //         navigate("/LoginList");
  //       } else {
  //         setBackEndErr(response.message || "Login failed..");
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [phaseId]);

  useEffect(() => {
    fetchDistricts();
    handleSubmit(viewChallan)();
  }, []);
  const fetchDistricts = async () => {
    //////////////////////////////////////////////////
    try {
      setLoading(true);
      const response = await callApi("GET", `districts`); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        // setData(response.data);
        setChallanViewSearchDts((prev) => ({
          ...prev,
          cdistricts: response.data || [],
        }));
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    /////////////////////////////////////////////////
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlock();
    }
  }, [selectedDistrict]);
  const fetchBlock = async () => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `getBlock/${btoa(selectedDistrict)}`
      ); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        // setData(response.data);
        setChallanViewSearchDts((prev) => ({
          ...prev,
          cblocks: response.data || [],
        }));
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
    /////////////////////////////////////////////////
  };

  const handleOnChange = (name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleSubmit(viewChallan)();
  };

  const viewChallan = async (data) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `get_challan`, data); // API call
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
    /////////////////////////////////////////////////
  };

  // };

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "District",
      selector: (data) => data.district,
      center: true,
    },
    {
      name: "Block/Municipality",
      selector: (data) => data.block,
      center: true,
    },
    {
      name: "Supplier",
      selector: (data) => data.supplier_name,
      center: true,
    },
    {
      name: "phase",
      selector: (data) => data.phase,
      center: true,
    },
    {
      name: "Challan No.",
      selector: (data) => data.challan_no,
      center: true,
    },

    {
      name: "Challan Date",
      selector: (data) => data.challan_date,
      center: true,
    },
    {
      name: "Type of Bicycles",
      selector: (data) => data.gender,
      center: true,
    },
    {
      name: "Number of Bicycles",
      selector: (data) => data.no_of_cycles,
      center: true,
    },
    {
      name: "Status",
      selector: (data) => data.status,
      center: true,
    },
    {
      name: "Action",
      center: true,
      cell: (data) => (
        <div className="space-x-1">
          <button
            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            // onClick={() =>
            //   showViewChallan(data.serial_no, data.tracking_no, data.phase)
            // }
          >
            Download
          </button>
        </div>
      ),
    },
    // {
    //   name: "Action",
    //   center: true,
    //   cell: (data) => (
    //     <div className="space-x-1">
    //       <button
    //         className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
    //         onClick={() =>
    //           showViewChallan(data.serial_no, data.tracking_no, data.phase)
    //         }
    //       >
    //         View
    //       </button>
    //       {data.lock_consignment == 1 ? (
    //         <span className="inline-block px-2 py-1 bg-yellow-500 text-white text-xs rounded">
    //           Published
    //         </span>
    //       ) : (
    //         <>
    //           <button
    //             className="px-2 py-1 bg-cyan-600 text-white text-xs rounded hover:bg-cyan-700"
    //             onClick={() =>
    //               publishConsignment(
    //                 data.serial_no,
    //                 data.tracking_no,
    //                 data.phase
    //               )
    //             }
    //           >
    //             Publish
    //           </button>
    //           <button
    //             className="px-2 py-1 bg-cyan-600 text-white text-xs rounded hover:bg-cyan-700"
    //             onClick={() =>
    //               editConsignment(data.serial_no, data.tracking_no, data.phase)
    //             }
    //           >
    //             Edit
    //           </button>
    //           <button
    //             className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
    //             onClick={() =>
    //               deleteConsignment(
    //                 data.serial_no,
    //                 data.tracking_no,
    //                 data.phase
    //               )
    //             }
    //           >
    //             Delete
    //           </button>
    //         </>
    //       )}
    //       {/* <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded">
    //         {data.status}
    //       </span> */}
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Challan Particulars View phase {phaseDetails.phaseName}
          </h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p>
        </section>
        <section>
          {loading && <Loader />} {/* 👈 show the loader component */}
          <div className=" rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
            <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
              <form onSubmit={handleSubmit(viewChallan)}>
                {loading && <Loader />} {/* 👈 show the loader component */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* District */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="Consignment"
                      value="District"
                    />
                    <span className="text-red-500">*</span>
                    <SelectInput
                      className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                      name="district"
                      {...register("district", {
                        // required: "District is required",
                      })}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select District</option>
                      {challanViewSearchDts.cdistricts.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  {/* Block */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="block"
                      value="Block"
                    />
                    <span className="text-red-500">*</span>
                    <SelectInput
                      className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                      name="block"
                      {...register("block", {
                        // required: "Block is required",
                      })}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select Block</option>
                      {challanViewSearchDts.cblocks.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  {/* Phase */}
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="challanNO"
                      value="challanNo"
                    />{" "}
                    <span className="text-red-500">*</span>
                    <TextInput
                      className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                      name="challanNo"
                      {...register("challanNo", {
                        // required: "Phase is required",
                      })}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <InputLabel
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="phase"
                      value="Phase"
                    />{" "}
                    <span className="text-red-500">*</span>
                    <TextInput
                      type="date"
                      className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                      name="challanDate"
                      {...register("challanDate", {
                        // required: "Phase is required",
                      })}
                      onBlur={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
              {/* <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                Download
              </button> */}
            </div>
          </div>
        </section>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <div className="flex justify-end mb-4">
            <TextInput
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/3"
            />
          </div>
          <h2 className="text-lg font-semibold mb-3">
            Challan Issued/Entry Reportsssss
          </h2>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            striped
            highlightOnHover
            customStyles={{
              rows: {
                style: {
                  minHeight: "48px",
                },
              },
              headCells: {
                style: {
                  fontWeight: "bold",
                  backgroundColor: "#FFE0B2",
                  justifyContent: "center",
                },
              },
              cells: {
                style: {
                  justifyContent: "center",
                },
              },
            }}
          />
        </div>
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

export default CategorywiseReport;
