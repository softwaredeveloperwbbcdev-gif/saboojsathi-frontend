import React from "react";
import { router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";

function Index({ students, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("School.studentList", { year: 2024 }), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChange = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(
            route("School.studentList", { year: 2024, phase: 10 }),
            queryParams
        );
    };
    return (
        <AdminAuthenticatedLayout stake_cd="0701">
            <div className="py-12">
                <div className="min-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th>Sl. No.</th>
                                        <TableHeading
                                            name="applicant_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sort_change={sortChange}
                                            className="w-[10%]"
                                        >
                                            Applicant ID
                                        </TableHeading>
                                        <TableHeading
                                            name="applicant_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sort_change={sortChange}
                                        >
                                            Applicant Name
                                        </TableHeading>
                                        <th>Guardian's Name</th>
                                        <th className="w-[4%]">DOB</th>
                                        <TableHeading
                                            name="(applicant_section, applicant_roll_no)"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sort_change={sortChange}
                                            className="w-[5%]"
                                        >
                                            Section/Roll No.
                                        </TableHeading>
                                        <th>Gender</th>
                                        <th>Status</th>
                                        <th>Source</th>
                                        <th>Verification Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.data.map((student, index) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={student.id}
                                        >
                                            <td>{index + 1}</td>
                                            <td className="px-3 py-3">
                                                {student.id}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.name}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.guardian}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.dob}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.section +
                                                    ` / ` +
                                                    student.roll}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.gender}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.source}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.status}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.declaration}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}

export default Index;
