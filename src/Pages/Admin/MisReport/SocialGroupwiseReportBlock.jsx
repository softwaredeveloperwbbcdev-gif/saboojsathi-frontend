import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import SelectInput from "../../../Components/SelectInput";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function SocialGroupwiseReportBlock() {
  const { phaseId, id } = useParams();
  //   alert(`Phase ID: ${phaseId}, Encoded ID: ${id}`);

  const districtId = id ? atob(id) : null;

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [phases, setPhases] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch on page load
  useEffect(() => {
    if (phaseId && districtId) {
      fetchPhases();
      socialReport(districtId, phaseId);
    }
  }, [phaseId, districtId]);

  // Fetch dropdown values
  const fetchPhases = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", "phases");
      if (response.error) {
        toast(`Failed to fetch phases: ${response.message}`);
      } else {
        setPhases(response.data || []);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
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

  // Handle dropdown phase change
  const handleOnChange = (name, value) => {
    setValue(name, value);
    if (value && districtId) {
      socialReport(districtId, value);
    }
  };

  // API Call
  const socialReport = async (districtId, phaseId) => {
    // alert(istrictId, phaseId);
    if (!districtId || !phaseId) return;

    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `social_report_block/${phaseId}/${districtId}`
      );
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

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "Block",
      selector: (data) => data.block_name,
      center: true,
    },
    {
      name: "SC",
      selector: (data) => data.sc_total,
      center: true,
    },
    {
      name: "ST",
      selector: (data) => data.st_total,
      center: true,
    },
    {
      name: "OBC",
      selector: (data) => data.obc_total,
      center: true,
    },
    {
      name: "GENERAL",
      selector: (data) => data.gen_total,
      center: true,
    },
    {
      name: "MINORITY",
      selector: (data) => data.mi_total,
      center: true,
    },
    {
      name: "TOTAL",
      selector: (data) =>
        data.sc_total +
        data.st_total +
        data.obc_total +
        data.gen_total +
        data.mi_total,
      center: true,
    },
  ];

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Social Group Wise Report
          </h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p>
        </section>

        <section>
          {loading && <Loader />}
          <div className="rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
            <div className="text-gray-600 block p-3.5 relative">
              <form onSubmit={handleSubmit(() => {})}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-red-500">*</span>
                    <SelectInput
                      className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                      name="phaseId"
                      {...register("phaseId")}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="">Select Phase</option>
                      {phases.map((cls) => (
                        <option key={cls.value} value={cls.value}>
                          {cls.label}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Block-wise Report</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mb-4 p-2 border rounded w-full max-w-xs"
          />
          <DataTable
            columns={columns}
            data={filteredData}
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

      {/* Logout Modal */}
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
}

export default SocialGroupwiseReportBlock;
