import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

const ChallanViewFilterDeo = () => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [search, setSearch] = useState("");
  const [challanData, setChallanData] = useState([]);

  const selectedDistrict = watch("district");

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  // ✅ Fetch districts on mount
  useEffect(() => {
    fetchDistricts();
  }, []);
  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `getDistrict`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        // alert(JSON.stringify(response));
        setDistricts(response.data.dist);
      }
    } catch (err) {
      toast.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch blocks when district changes
  useEffect(() => {
    if (selectedDistrict) {
      // alert(selectedDistrict);
      fetchBlocks(selectedDistrict);
    } else {
      setBlocks([]);
      setValue("block", "");
    }
  }, [selectedDistrict, setValue]);
  const fetchBlocks = async (district) => {
    setLoading(true);
    try {
      const response = await callApi("POST", `cmsblockchallanget`, {
        id: district,
      });
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setBlocks(response.data);
        setValue("block", ""); // reset block selection
      }
    } catch (err) {
      toast.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (name, value) => {
    // alert(name);
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    const currentForm = getValues(); // 👈 get current form values
    onSubmit(currentForm);
  };

  // ✅ Handle form submission
  const onSubmit = async (searchdata) => {
    setLoading(true);
    try {
      // const response = await callApi("POST", `cmschallanview`, {
      //   district: searchdata.district,
      //   block: searchdata.block,
      //   challan_no: searchdata.challan_no,
      //   challan_date: searchdata.challan_date,
      // });
      const response = await callApi("POST", `cmschallanview`, searchdata);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        console.log(response.data);
        setChallanData(response.data);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Serial No",
      selector: (row, index) => index + 1,
      center: true,
      wrap: true,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier_name,
      center: true,
      wrap: true,
    },
    {
      name: "District",
      selector: (row) => row.district,
      center: true,
      wrap: true,
    },
    {
      name: "Block",
      selector: (row) => row.block,
      center: true,
      wrap: true,
    },
    {
      name: "Phase",
      cell: () => "VIII",
      center: true,
      wrap: true,
    },
    {
      name: "Challan No",
      selector: (row) => row.challan_no,
      center: true,
      wrap: true,
    },
    {
      name: "Challan Date",
      selector: (row) => row.challan_date,
      center: true,
      wrap: true,
    },
    {
      name: "Approval Date",
      selector: (row) => row.status_date_challan,
      center: true,
      wrap: true,
    },
    {
      name: "Type Of Bicycles",
      selector: (row) => row.gender,
      center: true,
      wrap: true,
    },
    {
      name: "Number Of Bicycles",
      selector: (row) => row.no_of_cycles,
      center: true,
      wrap: true,
    },
    {
      name: "Invoice Number",
      selector: (row) => row.invoice_number,
      center: true,
      wrap: true,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.invoice_date,
      center: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => {
        switch (row.status) {
          case 1:
            return "Pending Approval";
          case 2:
            return "Approved";
          case 3:
            return "Partially Allocated";
          case 4:
            return "Fully Allocated";
          default:
            return "Rejected";
        }
      },
      center: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        const showDownload = [2, 3, 4].includes(row.status);
        const showViewAllocation = [3, 4].includes(row.status);
      },
      center: true,
      wrap: true,
    },
  ];

  return (
    <>
      <AdminAuthenticatedLayout>
        <div className="p-4 bg-white rounded shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -mx-2"
          >
            {loading && <Loader />}
            {/* District */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block mb-1">District</label>
              <select
                className="form-select w-full border border-gray-300 rounded p-2"
                {...register("district", {
                  onChange: (e) => handleOnChange("district", e.target.value),
                })}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Block */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block mb-1">Block</label>
              <select
                className="form-select w-full border border-gray-300 rounded p-2"
                {...register("block", {
                  onChange: (e) => handleOnChange("block", e.target.value),
                })}
              >
                <option value="">--Select Block/Municipality--</option>
                {blocks.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Challan No */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block mb-1">Challan No.</label>
              <input
                type="text"
                className="form-input w-full border border-gray-300 rounded p-2"
                placeholder="Challan No."
                {...register("challan_no", {
                  onBlur: (e) => handleOnChange("challan_no", e.target.value),
                })}
              />
            </div>

            {/* Challan Date */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block mb-1">Challan Date</label>
              <input
                type="date"
                className="form-input w-full border border-gray-300 rounded p-2"
                {...register("challan_date", {
                  onBlur: (e) => handleOnChange("phase", e.target.value),
                })}
              />
            </div>

            {/* Submit Button */}
            {/* <div className="w-full text-center mt-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
              >
                Search
              </button>
            </div> */}
          </form>
        </div>

        <div className="p-4 bg-white rounded shadow-md">
          {/* Header */}
          {/* <div className="flex justify-between items-center mb-4"> */}
          <h3 className="text-lg font-semibold">Challan View</h3>
          <a
            href="/challan_report.php"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Report
          </a>
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={challanData}
              pagination
              striped
              highlightOnHover
              responsive
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
          {/* </div> */}
        </div>
        {/* Data Table */}
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
    </>
  );
};

export default ChallanViewFilterDeo;
