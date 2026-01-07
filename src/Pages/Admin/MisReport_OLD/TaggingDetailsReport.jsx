import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const TaggingDetailsReport = ({
    data,
    stake_cd,
    time,
    type,
    year,
    phase,
    phaseName,
}) => {
    const total_no_of_schools = data.reduce((acc, value) => {
        return acc + value.no_of_schools;
    }, 0);

    const total_no_of_schools_tagged = data.reduce((acc, value) => {
        return acc + value.no_of_schools_tagged;
    }, 0);

    const total_tagged_boys = data.reduce((acc, value) => {
        return acc + value.total_tagged_boys;
    }, 0);

    const total_tagged_girls = data.reduce((acc, value) => {
        return acc + value.total_tagged_girls;
    }, 0);

    const total_tagged = data.reduce((acc, value) => {
        return acc + value.total_tagged;
    }, 0);

    const total_eligible_boys = data.reduce((acc, value) => {
        return acc + value.total_eligible_boys;
    }, 0);

    const total_eligible_girls = data.reduce((acc, value) => {
        return acc + value.total_eligible_girls;
    }, 0);
    const total_eligible = data.reduce((acc, value) => {
        return acc + value.total_eligible;
    }, 0);

    return (
        <div>
            <AdminAuthenticatedLayout stake_cd={stake_cd}>
                <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {type} Wise Delivery Center School Tagging Report Phase{" "}
                        {phaseName}
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
                                            className="w-[2%] p-2 border border-gray-400"
                                        >
                                            Serial. No.
                                        </th>
                                        <th
                                            rowSpan="2"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            {type} Name
                                        </th>
                                        {type != "School" && (
                                            <th
                                                rowSpan="2"
                                                className="w-[10%] p-2 border border-gray-400"
                                            >
                                                Total No. of Schools
                                            </th>
                                        )}
                                        {type != "School" && (
                                            <th
                                                rowSpan="2"
                                                className="w-[10%] p-2 border border-gray-400"
                                            >
                                                No. of Schools Tagged
                                            </th>
                                        )}
                                        <th
                                            colSpan="3"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            Students in Tagged School
                                        </th>
                                        {type == "School" && (
                                            <th
                                                rowSpan="2"
                                                className="w-[10%] p-2 border border-gray-400"
                                            >
                                                Delivery Location
                                            </th>
                                        )}
                                        <th
                                            colSpan="3"
                                            className="w-[10%] p-2 border border-gray-400"
                                        >
                                            Eligible Students
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
                                                <td className="text-center p-2 border border-gray-400">
                                                    <Link
                                                        href={
                                                            type === "District"
                                                                ? route(
                                                                      "Admin.taggingReportBlock",
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
                                                                      "Admin.taggingReportSchool",
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
                                                {type != "School" && (
                                                    <td className="text-center p-2 border border-gray-400">
                                                        {value.no_of_schools}
                                                    </td>
                                                )}
                                                {type != "School" && (
                                                    <td className="text-center p-2 border border-gray-400">
                                                        {
                                                            value.no_of_schools_tagged
                                                        }
                                                    </td>
                                                )}
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_tagged_boys}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_tagged_girls}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_tagged}
                                                </td>
                                                {type == "School" && (
                                                    <td className="text-center p-2 border border-gray-400">
                                                        {value.delivery_center}
                                                    </td>
                                                )}
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_eligible_boys}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_eligible_girls}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.total_eligible}
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
                                        {type != "School" && (
                                            <td className="text-center font-semibold p-2 border border-gray-400">
                                                {total_no_of_schools}
                                            </td>
                                        )}
                                        {type != "School" && (
                                            <td className="text-center font-semibold p-2 border border-gray-400">
                                                {total_no_of_schools_tagged}
                                            </td>
                                        )}
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_tagged_boys}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_tagged_girls}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_tagged}
                                        </td>
                                        {type == "School" && (
                                            <td className="text-center font-semibold p-2 border border-gray-400">
                                                &nbsp;
                                            </td>
                                        )}
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_eligible_boys}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_eligible_girls}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_eligible}
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

export default TaggingDetailsReport;
