import React from "react";
import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";

function EligibleStudentReport({
    data,
    stake_cd,
    time,
    type,
    year,
    phase,
    phaseName,
}) {
    const total_boys = data.reduce((acc, value) => {
        return acc + value.eligible_students_class_ix_boys;
    }, 0);

    const total_girls = data.reduce((acc, value) => {
        return acc + value.eligible_students_class_ix_girls;
    }, 0);
    return (
        <div>
            <AdminAuthenticatedLayout stake_cd={stake_cd}>
                <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {type} Wise Eligible Student Phase {phaseName} For
                        Academic Year&nbsp;
                        {year}
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
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Serial. No.
                                        </th>
                                        <th className="w-[30%] p-2 border border-gray-400">
                                            {type} Name
                                        </th>
                                        <th className="w-[20%] p-2 border border-gray-400">
                                            Eligible Students(Boys)
                                        </th>
                                        <th className="w-[20%] p-2 border border-gray-400">
                                            Eligible Students(Girls)
                                        </th>
                                        <th className="w-[20%] p-2 border border-gray-400">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        // Show this row if no student data is available
                                        <tr>
                                            <td
                                                colSpan="10"
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
                                                    {index + 1}
                                                </td>
                                                <td className="text-left p-2 border border-gray-400">
                                                    <Link
                                                        href={
                                                            type === "District"
                                                                ? route(
                                                                      "Admin.eligibleStudentReportBlock",
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
                                                                      "Admin.eligibleStudentReportSchool",
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
                                                        value.eligible_students_class_ix_boys
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.eligible_students_class_ix_girls
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.eligible_students_class_ix_boys +
                                                        value.eligible_students_class_ix_girls}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="text-center font-semibold p-2 border border-gray-400"
                                        >
                                            Total
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_boys}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_girls}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_boys + total_girls}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>
                </section>
            </AdminAuthenticatedLayout>
        </div>
    );
}

export default EligibleStudentReport;
