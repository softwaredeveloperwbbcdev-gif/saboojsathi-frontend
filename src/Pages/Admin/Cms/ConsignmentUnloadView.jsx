import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import { toast } from "react-toastify";

const ConsignmentUnloadView = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [phase, setPhases] = useState([]);
  const [filter, setFilter] = useState({ district: "", block: "", phase: "" });
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedDist = watch("district");

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  useEffect(() => {
    fetchDistricts();
  }, []);
  // Replace with actual API call
  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const response = await callApi("POST", `getDistrict`);
      if (response.error) {
        // Handle the error (e.g., alert the user)
        toast.error(`Failed to fetch data ${response.message}`);
      } else {
        setDistricts(response.data.dist);
        setPhases(response.data.phase);
      }
    } catch (err) {
      toast.error("Unexpected download error:", err);
    } finally {
      setLoading(false);
    }
    ///////////////////////
  };
  useEffect(() => {
    if (selectedDist) {
      // alert(selectedDistrict);
      const fetchBlocks = async () => {
        try {
          const response = await postMethodCalling(`cmsblockchallanget`, {
            id: selectedDist,
          });
          if (response.success) {
            console.log(JSON.stringify(response.data));
            setBlocks(response.data);
            // setValue("block", ""); // reset block selection
          } else {
            alert("Failed to Link Challan: " + response.message);
          }
        } catch {}
      };
      fetchBlocks();
    } else {
      // setBlocks([]);
      // setValue("block", "");
    }
  }, [selectedDist]);
  const handleDistrictChange = async (e) => {
    alert(e.target.value);
    try {
      const response = await postMethodCalling(`cmsblockchallanget`, {
        id: e.target.value,
      });
      if (response.success) {
        alert(JSON.stringify(response.data));
        setBlocks(response.data);
        // setValue("block", ""); // reset block selection
      } else {
        alert("Failed to Link Challan: " + response.message);
      }
    } catch {}
  };

  const search = () => {
    if (!filter.district || !filter.phase) {
      alert("District and Phase are required");
      return;
    }
    setLoading(true);
    axios
      .post("/api/consignments/unload", filter)
      .then((res) => setConsignments(res.data.data))
      .finally(() => setLoading(false));
  };

  const reset = () => setFilter({ district: "", block: "", phase: "" });

  const onSubmit = (searchdata) => {
    console.log("Form Submitted:", searchdata);
    // // You can now send `data` to your backend
    // const fetchChallanListing = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await postMethodCalling("cmschallanview", {
    //       district: searchdata.district,
    //       block: searchdata.block,
    //       challan_no: searchdata.challan_no,
    //       challan_date: searchdata.challan_date,
    //     });
    //     if (response.success) {
    //       // invoiceData
    //       alert(JSON.stringify(response.data));
    //       setChallanData(response.data);
    //       // setInvoiceData(response.data); // not changing the old data with new data on calling again
    //     } else {
    //       alert("Failed to Fetch Challan: " + response.message);
    //     }
    //   } catch (err) {
    //     alert("API error fetching districts");
    //   }
    //   setLoading(false);
    // };
    // fetchChallanListing();
  };
  /*
  const resetConsignment = id => {
    if (!window.confirm('Reset unloading details?')) return;
    axios.post(`/api/consignments/reset-unload/${id}`, {}).then(res => {
      alert(res.data.message);
      search();
    });
  };
*/
  return (
    <AdminAuthenticatedLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Consignment Unload</h1>
        <div className="bg-white p-4 rounded shadow mb">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -mx-2"
          >
            {loading && <Loader />}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
            {/* District */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block font-medium mb-1">District *</label>
              <select
                className="w-full border p-2 rounded"
                {...register("district")}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.desc}
                  </option>
                ))}
              </select>
            </div>
            {/* Block */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block font-medium mb-1">Block</label>
              <select
                className="w-full border p-2 rounded"
                {...register("block")}
              >
                <option value="">Select Block</option>
                {blocks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.desc}
                  </option>
                ))}
              </select>
            </div>
            {/* Phase */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block font-medium mb-1">Phase *</label>
              <select
                className="w-full border p-2 rounded"
                {...register("phase")}
              >
                <option value="">Select Phase</option>
                {phase.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.desc}
                  </option>
                ))}
              </select>
            </div>
            {/* </div> */}
            {/* <div className="w-full text-center mt-4">
              <button
                onClick={reset}
                className="bg-yellow-500 px-4 py-2 rounded"
              >
                Reset
              </button>
              <button
                onClick={search}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div> */}
            <div className="w-full text-center mt-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
              >
                Search
              </button>
              <button
                onClick={reset}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Table */}
        <div className="bg-white p-4 rounded shadow">
          {consignments.length === 0 ? (
            <p className="text-center text-gray-600">No data available</p>
          ) : (
            <table className="w-full table-auto text-center">
              <thead className="bg-amber-200 font-bold">
                <tr>
                  {/* place headers */}
                  <th className="px-2 py-1">Serial No</th>
                  <th className="px-2 py-1">Supplier</th>
                  <th className="px-2 py-1">District</th>
                  <th className="px-2 py-1">Block</th>
                  <th className="px-2 py-1">Phase</th>
                  <th className="px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* {consignments.map((c,i)=>(
                  <tr key={c.id} className="hover:bg-gray-100">
                    <td>{i+1}</td>
                    <td>{c.supplier_name}</td>
                    <td>{c.district}</td>
                    <td>{c.block}</td>
                    <td>{c.phase}</td>
                    <td>
                      <button
                        onClick={() => resetConsignment(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminAuthenticatedLayout>
  );
};

export default ConsignmentUnloadView;
