import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const ProfileEntryStatusReport = ({
    data,
    stake_cd,
    time,
    type,
    year,
    phase,
    phaseName,
}) => {
    const total_imported_from_bs = data.reduce((acc, value) => {
        return acc + value.imported_from_banglar_siksha;
    }, 0);

    const total_imported_from_banglar_siksha_rejected = data.reduce(
        (acc, value) => {
            return acc + value.imported_from_banglar_siksha_rejected;
        },
        0
    );

    const total_banglar_siksha_verified = data.reduce((acc, value) => {
        return acc + value.banglar_siksha_verified;
    }, 0);

    const total_profile_entry_class_ix_new = data.reduce((acc, value) => {
        return acc + value.profile_entry_class_ix_new;
    }, 0);

    const total_finalyse_class_ix_total = data.reduce((acc, value) => {
        return acc + value.finalyse_class_ix_total;
    }, 0);

    const total_all_ready_get_cycle_yes_ix_total = data.reduce((acc, value) => {
        return acc + value.all_ready_get_cycle_yes_ix_total;
    }, 0);

    const total_eligible_ix_total = data.reduce((acc, value) => {
        return acc + value.eligible_ix_total;
    }, 0);

    const total_approved_class_ix_total = data.reduce((acc, value) => {
        return acc + value.approved_class_ix_total;
    }, 0);

    return (
        <div>
            <AdminAuthenticatedLayout stake_cd={stake_cd}>
                <section className="content-header py-6 px-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {type} Wise Eligible Student Phase {phaseName} For
                        Academic Year {year}
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
                                        <th className="w-[5%] p-2 border border-gray-400">
                                            Serial. No.
                                        </th>
                                        <th className="w-[15%] p-2 border border-gray-400">
                                            {type} Name
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Imported from Banglar Siksha
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Rejected by HOI/SI
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Banglar Siksha Data Verified (Not
                                            Finalized)
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            New Entry by School
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Data Finalized (Not Validated)
                                        </th>

                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Already Received bicycle(YES)
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Eligible Students
                                        </th>
                                        <th className="w-[10%] p-2 border border-gray-400">
                                            Data Validated by SI
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
                                                                      "Admin.profileEntryStatusReportBlock",
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
                                                                      "Admin.profileEntryStatusReportSchool",
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
                                                        value.imported_from_banglar_siksha
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.imported_from_banglar_siksha_rejected
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.banglar_siksha_verified
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.profile_entry_class_ix_new
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.finalyse_class_ix_total
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.all_ready_get_cycle_yes_ix_total
                                                    }
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {value.eligible_ix_total}
                                                </td>
                                                <td className="text-center p-2 border border-gray-400">
                                                    {
                                                        value.approved_class_ix_total
                                                    }
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
                                            {total_imported_from_bs}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {
                                                total_imported_from_banglar_siksha_rejected
                                            }
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_banglar_siksha_verified}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_profile_entry_class_ix_new}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_finalyse_class_ix_total}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {
                                                total_all_ready_get_cycle_yes_ix_total
                                            }
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_eligible_ix_total}
                                        </td>
                                        <td className="text-center font-semibold p-2 border border-gray-400">
                                            {total_approved_class_ix_total}
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

export default ProfileEntryStatusReport;
