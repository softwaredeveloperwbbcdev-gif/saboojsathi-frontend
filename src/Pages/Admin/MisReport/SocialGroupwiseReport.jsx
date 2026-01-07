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

function SocialGroupwiseReport() {
  const { phaseId } = useParams();

  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  // alert(JSON.stringify(phaseDetails));
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues, // <-- add this
    formState: { errors },
  } = useForm({
    defaultValues: {
      phaseId: phaseId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [phases, setPhases] = useState({ phases: [] });
  const [phases, setPhases] = useState([]);
  const [phaseDtls, setPhaseDtls] = useState([]);
  useEffect(() => {
    fetchPhases();
    socialReport({ phaseId: btoa(phaseDetails.phase) || "" });
  }, []);
  const fetchPhases = async () => {
    try {
      setLoading(true); // optional: show loader
      const response = await callApi("POST", "phases"); // your API call function

      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch phases: ${response.message}`);
      } else {
        // setPhaseDtls((prev) => ({
        //   ...prev,
        //   phases: response.data || [],
        // }));
        setPhases(response.data || []);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false); // optional: hide loader
    }
  };

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

  const handleOnChange = (name, value) => {
    setValue(name, value);
    const phaseId = value; // just the selected phase value
    const encodedPhaseId = btoa(phaseId);
    socialReport({ phaseId: encodedPhaseId });
  };

  /////////////////////////////////////////////////
  // useEffect(() => {
  //   socialReport({ phaseId: phaseId || "" });
  // }, []);
  const socialReport = async (data) => {
    // alert("sssss" + JSON.stringify(data));

    setLoading(true);
    try {
      const response = await callApi("GET", `social_report`, data); // API call
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
  };

  // };
  // const total = data.reduce((acc, value) => {
  //   return (
  //     acc +
  //     value.sc_total +
  //     st_total +
  //     obc_total +
  //     gen_total +
  //     mi_total +
  //     gen_total
  //   );
  // }, 0);

  const columns = [
    {
      name: "Serial No",
      cell: (data, index) => <div className="text-center">{index + 1}</div>,
      width: "100px",
    },
    {
      name: "District",
      selector: (data) => data.district_name,
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
            Challan Particulars View phase {phaseDetails.phaseName}
          </h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: {"time"}</p>
        </section>
        <section>
          {loading && <Loader />} {/* 👈 show the loader component */}
          <div className=" rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
            <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
              <form onSubmit={handleSubmit(socialReport)}>
                {loading && <Loader />} {/* 👈 show the loader component */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* District */}
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
            <div className="text-gray-600 block p-3.5 relative">
              &nbsp;&nbsp;
            </div>
          </div>
        </section>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">
            Challan Issued/Entry Reportsssss
          </h2>
          <DataTable
            columns={columns}
            data={filteredData}
            // pagination
            // paginationPerPage={25}
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

export default SocialGroupwiseReport;
