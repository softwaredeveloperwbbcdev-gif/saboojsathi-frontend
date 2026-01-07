import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";

const ChallanAdd = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orderOptions, setOrderOptions] = useState([]);

  // Mock API fetching
  useEffect(() => {
    setDistricts([
      { id: "1", name: "District A" },
      { id: "2", name: "District B" },
    ]);
    setSuppliers([
      { id: "1", name: "Supplier X" },
      { id: "2", name: "Supplier Y" },
    ]);
    setOrderOptions([
      { id: "1", description: "Order #1 - 01/01/2025 - 100 units" },
      { id: "2", description: "Order #2 - 02/01/2025 - 200 units" },
    ]);
  }, []);

  const selectedDistrict = watch("des_district");

  // Load blocks dynamically when district changes
  useEffect(() => {
    if (selectedDistrict === "1") {
      setBlocks([
        { id: "1", name: "Block A1" },
        { id: "2", name: "Block A2" },
      ]);
    } else if (selectedDistrict === "2") {
      setBlocks([
        { id: "3", name: "Block B1" },
        { id: "4", name: "Block B2" },
      ]);
    } else {
      setBlocks([]);
    }
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // You can send this data to an API here
  };

  return (
    <AdminAuthenticatedLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow rounded"
      >
        <h3 className="text-lg font-semibold mb-4">Add Challan</h3>

        {/* Row 1: District, Block, Phase, Supplier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District *</label>
            <select
              {...register("des_district")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Block *</label>
            <select
              {...register("des_block")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Block</option>
              {blocks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phase *</label>
            <select
              {...register("phase")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Phase</option>
              {Array.from({ length: 7 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Phase {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supplier *</label>
            <select
              {...register("supplier_brand")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Order, Challan No, Date, Boys No */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Order No, Date and Quantity *
            </label>
            <select
              {...register("order_date_qty")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Order</option>
              {orderOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Challan No *
            </label>
            <input
              {...register("challan_no")}
              type="text"
              placeholder="Challan No"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Challan Date (DD/MM/YYYY) *
            </label>
            <input
              {...register("challan_date")}
              type="date"
              placeholder="DD-MM-YYYY"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              No. of Boys Bi-cycles *
            </label>
            <input
              {...register("boys_no")}
              type="text"
              placeholder="Number of Boys Bicycles"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Row 3: Girls No, Paid, Bill No, Bill Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              No. of Girls Bi-cycles *
            </label>
            <input
              {...register("girls_no")}
              type="text"
              placeholder="Number of Girls Bicycles"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Challan Paid? *
            </label>
            <select
              {...register("challan_already_paid")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Please Select --</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bill No</label>
            <input
              {...register("bill_no")}
              type="text"
              placeholder="Bill No"
              className="w-full border rounded px-3 py-2 uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Bill Date (DD/MM/YYYY)
            </label>
            <input
              {...register("bill_date")}
              type="date"
              placeholder="DD-MM-YYYY"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 text-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </AdminAuthenticatedLayout>
  );
};

export default ChallanAdd;
