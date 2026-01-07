import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const DistributionDetailsReport = ({
    data,
    stake_cd,
    time,
    type,
    year,
    phase,
    phaseName,
}) => {
    const total_boys_muster_roll_generated = data.reduce((acc, value) => {
        return acc + value.boys_muster_roll_generated;
    }, 0);

    const total_girls_muster_roll_generated = data.reduce((acc, value) => {
        return acc + value.girls_muster_roll_generated;
    }, 0);

    const total_muster_roll_generated = data.reduce((acc, value) => {
        return (
            acc +
            value.boys_muster_roll_generated +
            value.girls_muster_roll_generated
        );
    }, 0);

    const total_boys_updated = data.reduce((acc, value) => {
        return acc + value.boys_updated;
    }, 0);

    const total_girls_updated = data.reduce((acc, value) => {
        return acc + value.girls_updated;
    }, 0);

    const total_updated = data.reduce((acc, value) => {
        return acc + value.boys_updated + value.girls_updated;
    }, 0);

    return (
        <div>
            <AdminAuthenticatedLayout stake_cd={stake_cd}>
                <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {type} Wise Distribution Status Report Phase {phaseName}
                        &nbsp;For Academic Year {year}
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Last updated: {time}
                    </p>
                </section>
                <section>
                    <div className=" rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
                        <div className="text-gray-600 block p-3.5 relative">
                            &nbsp;&nbsp;
                            {/* Download Button */}
                            <button className="absolute right-5 top-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none">
                                Download
                            </button>
                        </div>
                        <div>
                            <table className="w-full border border-gray-400 mb-6">
                                <thead className="bg-sky-500 text-white text-center">
                                    <tr>
                                        <th
                                            rowSpan="2"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            {type} Name
                                        </th>
                                        <th
                                            colSpan="3"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            Distribution Records Generated
                                        </th>
                                        <th
                                            colSpan="3"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            Distribution Details Updated
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-400">
                                            Boys
                                        </th>
                                        <th className="p-2 border border-gray-400">
                                            Girls
                                        </th>
                                        <th className="p-2 border border-gray-400">
                                            Total
                                        </th>

                                        <th className="p-2 border border-gray-400">
                                            Boys
                                        </th>
                                        <th className="p-2 border border-gray-400">
                                            Girls
                                        </th>
                                        <th className="p-2 border border-gray-400">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        // Show this row if no student data is available
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center p-2 text-gray-500"
                                            >
                                                No records found
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((value, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-100"
                                            >
                                                <td className="text-center p-2 border border-gray-400">
                                                    <Link
                                                        href={
                                                            type === "District"
                                                                ? route(
                                                                      "Admin.distributionDetailsReportBlock",
                                                                      {
                                                                          year: year,
                                                                          phase: phase,
                                                                          district:
                                                                              value.district_id,
                                                                      }
                                                                  )
                                                                : type ===
                                                                  "Block"
                                                                ? route(
                                                                      "Admin.distributionDetailsReportSchool",
                                                                      {
                                                                          year: year,
                                                                          phase: phase,
                                                                          block: value.block_id,
                                                                      }
                                                                  )
                                                                : "#"
                                                        } // Replace with your actual route and parameters
                                                        className="text-sky-500 hover:text-sky-700" // Optional styling for the link
                                                    >
                                                        {type === "District"
                                                            ? value.district_name
                                                            : type === "Block"
                                                            ? value.block_name
                                                            : value.school_name}
                                                    </Link>
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.boys_muster_roll_generated
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.girls_muster_roll_generated
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.boys_muster_roll_generated +
                                                        value.girls_muster_roll_generated}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.boys_updated}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.girls_updated}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.boys_updated +
                                                        value.girls_updated}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    <tr>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            Total
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_boys_muster_roll_generated}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_girls_muster_roll_generated}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_muster_roll_generated}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_boys_updated}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_girls_updated}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_updated}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </AdminAuthenticatedLayout>
        </div>
    );
};

export default DistributionDetailsReport;
