import React, { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../LayoutsTest/AdminAuthenticatedLayout";
import { getUserType, postMethodCall } from "../../../Services/ApiCall";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FaEye, FaReply, FaEyeSlash } from "react-icons/fa"; // or any other icon library
import Loader from "../../../Components/Loader";

function GrievanceList() {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm();
  const [userType, setUserType] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userTypes, setUserTypes] = useState([]);
  const [statusTypes, setStatusTypes] = useState([]);
  const [data, setData] = useState([]);
  const [dataGriev, setDataGriev] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState(null);

  const handleView = (row) => {
    setSelectedGrievance(row);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedGrievance(null);
  };
  const handleHide = (sang) => {
    alert(JSON.stringify(sang.grievance_id_pk));
    /////////////////////////////////////////////////
    try {
      // ✅ 1. Optimistically hide in frontend
      setDataGriev((prev) =>
        prev.map((item) =>
          item.grievance_id_pk === sang.grievance_id_pk
            ? { ...item, grv_status: "hidden" } // adjust status key name
            : item
        )
      );

      // ✅ 2. Call backend API to update status
      // const response = await postMethodCall("update-grievance-status", {
      //   grievance_id: row.grievance_id_pk,
      //   status: "hidden", // replace with your actual hidden status key
      // });

      // if (!response.success) {
      //   console.error("Backend failed to update status");
      //   // Optionally revert frontend change
      // }
    } catch (error) {
      console.error("Error updating grievance status:", error);
    }
    ////////////////////////////////////////////////
  };

  // const columns = [
  //   {
  //     name: "Serial No.",
  //     selector: (dataGriev, index) => index + 1,
  //     sortable: false,
  //     width: "100px", // Limits width
  //     center: true, // Centers text
  //     compact: true,
  //   },
  //   {
  //     name: "Grievance ID",
  //     selector: (dataGriev) => dataGriev.grievance_id_pk,
  //     sortable: true,
  //     width: "180px", // Limits width
  //     center: true, // Centers text
  //     compact: true,
  //   },
  //   {
  //     name: "Email",
  //     selector: (dataGriev) => dataGriev.email_id,
  //     sortable: true,
  //     wrap: true,
  //     width: "220px",
  //     compact: true,
  //   },
  //   {
  //     name: "Contact No",
  //     selector: (dataGriev) => dataGriev.contact_no,
  //     sortable: true,
  //     width: "230px",
  //     center: true,
  //     compact: true,
  //   },

  //   {
  //     name: "Entry Time",
  //     selector: (dataGriev) => dataGriev.entry_time,
  //     sortable: true,
  //     wrap: true,
  //     width: "180x",
  //     center: true,
  //     compact: true,
  //   },
  //   {
  //     name: "Grievance Is",
  //     selector: (dataGriev) =>
  //       typeof dataGriev.grievance_is === "string"
  //         ? dataGriev.grievance_is.slice(0, 100) +
  //           (dataGriev.grievance_is.length > 100 ? "..." : "")
  //         : JSON.stringify(dataGriev.grievance_is),
  //     sortable: true,
  //     wrap: true,
  //     width: "250px",
  //     compact: true,
  //   },
  //   {
  //     name: "Reply",
  //     selector: (dataGriev) =>
  //       typeof dataGriev.reply_grv === "string" ? dataGriev.reply_grv : "N/A",
  //     wrap: true,
  //     width: "120px",
  //     compact: true,
  //   },
  //   ,
  //   {
  //     name: "Action",
  //     width: "120px",
  //     center: true,
  //     cell: (row) => (
  //       <div className="flex items-center justify-center space-x-2">
  //         <button
  //           onClick={() => handleView(row)}
  //           className="text-blue-500 hover:text-blue-700"
  //           title="View Grievance"
  //         >
  //           <FaEye />
  //         </button>
  //         <button
  //           onClick={() => handleReply(row)}
  //           className="text-green-500 hover:text-green-700"
  //           title="Reply"
  //         >
  //           <FaReply />
  //         </button>
  //         <button
  //           onClick={() => handleHide(row)}
  //           className="text-red-500 hover:text-red-700"
  //           title="Hide Grievance"
  //         >
  //           <FaEyeSlash />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const getColumns = () => {
    // check if at least one row has applicant_id
    const hasApplicantId = dataGriev.some((row) => row.applicant_id);

    const baseColumns = [
      {
        name: "Serial No.",
        selector: (row, index) => index + 1,
        sortable: false,
        width: "100px",
        center: true,
        compact: true,
      },
      {
        name: "Grievance ID",
        selector: (row) => row.grievance_id_pk,
        sortable: true,
        width: "180px",
        center: true,
        compact: true,
      },
      {
        name: "Entry Time",
        selector: (row) => row.entry_time,
        sortable: true,
        wrap: true,
        width: "180px",
        center: true,
        compact: true,
      },
      {
        name: "Grievance Is",
        selector: (row) =>
          typeof row.grievance_is === "string"
            ? row.grievance_is.slice(0, 100) +
              (row.grievance_is.length > 100 ? "..." : "")
            : JSON.stringify(row.grievance_is),
        sortable: true,
        wrap: true,
        width: "250px",
        compact: true,
      },
      {
        name: "Reply",
        selector: (row) =>
          typeof row.reply_grv === "string" ? row.reply_grv : "N/A",
        wrap: true,
        width: "120px",
        compact: true,
      },
    ];

    // ➕ Conditional Columns
    const conditionalColumns = hasApplicantId
      ? [
          {
            name: "Applicant ID",
            selector: (row) => row.applicant_id,
            sortable: true,
            width: "200px",
            center: true,
            compact: true,
          },
        ]
      : [
          {
            name: "Email",
            selector: (row) => row.email_id,
            sortable: true,
            wrap: true,
            width: "220px",
            compact: true,
          },
          {
            name: "Contact No",
            selector: (row) => row.contact_no,
            sortable: true,
            width: "230px",
            center: true,
            compact: true,
          },
        ];

    const actionColumn = {
      name: "Action",
      width: "180px",
      center: true,
      cell: (row) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="text-blue-500 hover:text-blue-700"
            title="View Grievance"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleReply(row)}
            className="text-green-500 hover:text-green-700"
            title="Reply"
          >
            <FaReply />
          </button>
          <button
            onClick={() => handleHide(row)}
            className="text-red-500 hover:text-red-700"
            title="Hide Grievance"
          >
            <FaEyeSlash />
          </button>
        </div>
      ),
    };

    return [...baseColumns, ...conditionalColumns, actionColumn];
  };

  const handleChange = (e) => {
    setUserType(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserType(`user-types`);
        console.log(JSON.stringify(data));
        // console.log(data.data.usertypes);
        // console.log(data.data.statustypes);
        // return; && Array.isArray(data.data)
        if (data && data.success) {
          setUserTypes(data.data.usertypes);
          setStatusTypes(data.data.statustypes);
        } else {
          console.error("Invalid response format:", data);
          setUserTypes([]);
        }
      } catch (error) {
        console.error("Error fetching user types:", error);
        setUserTypes([]);
      }
    };

    fetchData();
  }, []);
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const newData = {
        grv_user_type: formData.type, // ✅ plain value
        grv_status: formData.status, // ✅ plain value
      };
      const response = await postMethodCall(
        // optional if your function supports passing route
        `get-grievance-data`,
        newData
      );
      console.log(response.data.grievances);
      if (!response.error) {
        setDataGriev(response.data.grievances || []);
      } else {
        console.error("API Error:", response.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  return (
    <AdminAuthenticatedLayout>
      <div className="w-full">
        <div className="bg-white border border-white-500 rounded shadow">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-t">
            <h3 className="text-lg font-semibold">Grievance List1111</h3>
          </div>

          {!isCollapsed && <div className="p-4"></div>}
        </div>
        <div className="bg-white p-4 rounded shadow">
          {loading && <Loader />} {/* 👈 show the loader component */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Type */}
              <div>
                <label
                  htmlFor="grv_user_type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("type", {})}
                  className="block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>select</option>
                  {userTypes.map((type) => (
                    <option key={type.id} value={type.id.toString()}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="grv_status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status", {})}
                  className="block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {statusTypes.map((type) => (
                    <option key={type.id} value={type.id.toString()}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-x-auto w-full">
          {dataGriev.length > 0 && (
            // data is not coming here
            <DataTable
              title="Filtered Grievances"
              // columns={columns}
              columns={getColumns()}
              // data={dataGriev}
              data={dataGriev.filter((row) => row.grv_status !== "hidden")} // adjust status key name if needed
              pagination
              striped
              highlightOnHover
              responsive
              customStyles={{
                table: {
                  style: {
                    width: "100%",
                    tableLayout: "fixed", // ← prevents expanding beyond width
                  },
                },
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
          )}
          {viewModalOpen && selectedGrievance && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Grievance Details
                </h2>
                <p className="mb-4 whitespace-pre-wrap text-gray-800">
                  {selectedGrievance.grievance_is}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={closeViewModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuthenticatedLayout>
  );
}

export default GrievanceList;
