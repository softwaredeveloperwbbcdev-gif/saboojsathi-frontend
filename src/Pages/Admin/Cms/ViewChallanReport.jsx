import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

const ViewChallanReport = () => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const [challanReportViewData, setChallanReportViewData] = useState([]);

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const columns = [
    {
      name: "Serial No",
      cell: (row, index) => <div className="text-center">{index + 1}</div>,
      center: true,
      wrap: true,
    },
    {
      name: "District",
      selector: (row) => row.district_name,
      center: true,
      wrap: true,
    },
    {
      name: "Block",
      selector: (row) => row.block_name,
      center: true,
      wrap: true,
    },
    {
      name: "Phase",
      selector: (row) => row.phase,
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
      name: "Order No, Date and Quantity",
      selector: (row) => row.description,
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
      name: "Boys",
      selector: (row) => row.boys_no,
      center: true,
      wrap: true,
    },
    {
      name: "Girls",
      selector: (row) => row.girls_no,
      center: true,
      wrap: true,
    },
    {
      name: "Whether the Challan was paid",
      selector: (row) => (row.challan_already_paid == 1 ? "Yes" : "No"),
      center: true,
      wrap: true,
    },
    {
      name: "Bill No",
      selector: (row) => row.bill_no,
      center: true,
      wrap: true,
    },
    {
      name: "Bill Date",
      selector: (row) => row.bill_date,
      center: true,
      wrap: true,
    },
  ];

  const handleOnChange = (name, value) => {
    // alert(name);
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    const currentForm = getValues(); // 👈 get current form values
    onSubmit(currentForm);
  };
  ////////////////////////////////////////////////////
  const onSubmit = async (searchdata) => {
    setLoading(true);
    const user = JSON.parse(atob(localStorage.getItem("user")));
    const login_cd = user.login_cd;
    // console.log(searchdata);
    const dataWithLoginCd = {
      ...searchdata,
      login_cd: login_cd,
    };
    try {
      const response = await callApi(
        "POST",
        `cmschallanreport`,
        dataWithLoginCd
      );
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setChallanReportViewData(response.data);
        console.log(JSON.stringify(response.data));
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
  };
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
              <label className="block mb-1">Phase</label>
              <select
                className="form-select w-full border border-gray-300 rounded p-2"
                {...register("phase", {
                  onChange: (e) => handleOnChange("phase", e.target.value),
                })}
              >
                <option value="">Select Phase</option>
                <option value={btoa("1")}>I</option>
                <option value={btoa("2")}>II</option>
                <option value={btoa("3")}>III</option>
                <option value={btoa("4")}>IV</option>
                <option value={btoa("5")}>V</option>
                <option value={btoa("6")}>VI</option>
                <option value={btoa("7")}>VII</option>
              </select>
            </div>

            {/* Block */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block mb-1">Entry Date</label>
              <input
                type="date"
                className="form-input w-full border border-gray-300 rounded p-2"
                {...register("entry_date", {
                  onChange: (e) => handleOnChange("date", e.target.value),
                })}
              />
            </div>
          </form>
        </div>
        {/* Challan Report Table */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Invoice Report</h2>
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={challanReportViewData}
              pagination
              striped
              highlightOnHover
              responsive
              // customStyles={{
              //   rows: {
              //     style: {
              //       minHeight: "48px",
              //     },
              //   },
              //   headCells: {
              //     style: {
              //       fontWeight: "bold",
              //       backgroundColor: "#FFE0B2",
              //       justifyContent: "center",
              //     },
              //   },
              //   cells: {
              //     style: {
              //       justifyContent: "center",
              //     },
              //   },
              // }}
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
                    whiteSpace: "normal", // ✅ allows wrapping
                    textAlign: "center",
                  },
                },
                cells: {
                  style: {
                    justifyContent: "center",
                    whiteSpace: "normal", // ✅ allows wrapping
                  },
                },
              }}
            />
          </div>
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
    </>
  );
};

export default ViewChallanReport;
