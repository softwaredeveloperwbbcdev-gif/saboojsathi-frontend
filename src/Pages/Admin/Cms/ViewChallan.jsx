import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SelectInput from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import InputLabel from "../../../Components/InputLabel";
const ViewChallan = () => {
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const [districts, setDistricts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Mock backend calls (replace with real APIs)
  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     const res = await axios.get("/api/districts");
  //     setDistricts(res.data);
  //   };

  //   const fetchSuppliers = async () => {
  //     const res = await axios.get("/api/suppliers");
  //     setSuppliers(res.data);
  //   };

  //   fetchDistricts();
  //   fetchSuppliers();
  // }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle search action here (API call, etc.)
  };
  ////////////////
  const handleOnChange = (name, value) => {
    alert(value);
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    // handleSubmit(viewConsignment)();
    // setTimeout(() => {
    //   handleSubmit(viewConsignment)(); // Wait for form state to update
    // }, 0);
    const currentForm = getValues(); // 👈 get current form values
    viewConsignment(currentForm);
  };
  ///////////////

  return (
    <>
      <AdminAuthenticatedLayout>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* District */}
              <div>
                <label className="block mb-2">District</label>
                <SelectInput
                  {...register("district", {
                    onChange: (e) => handleOnChange("district", e.target.value),
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.district_id_pk} value={d.district_id_pk}>
                      {d.district_name}
                    </option>
                  ))}
                </SelectInput>
              </div>

              {/* Bill / Challan No */}
              <div>
                <label className="block mb-2">Bill No./ Challan No.</label>
                <TextInput
                  type="text"
                  placeholder="Search"
                  {...register("search", {
                    pattern: {
                      value: /^[a-zA-Z0-9\s\-\/]+$/,
                      message: "Invalid characters",
                    },
                    onBlur: (e) => handleOnChange("search", e.target.value),
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.search && (
                  <p className="text-red-500 text-sm">
                    {errors.search.message}
                  </p>
                )}
              </div>

              {/* Phase */}
              <div>
                <label className="block mb-2">Phase</label>
                <SelectInput
                  {...register("phase", {
                    onChange: (e) => handleOnChange("phase", e.target.value),
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">ALL</option>
                </SelectInput>
              </div>

              {/* Supplier */}
              <div>
                <label className="block mb-2">Supplier</label>
                <SelectInput
                  {...register("supplier", {
                    onChange: (e) => handleOnChange("supplier", e.target.value),
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">ALL</option>
                  {suppliers.map((s) => (
                    <option key={s.supplier_id} value={encode(s.supplier_id)}>
                      {s.supplier_name}
                    </option>
                  ))}
                </SelectInput>
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
              >
                Search
              </button>
            </div> */}
          </form>
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

export default ViewChallan;
