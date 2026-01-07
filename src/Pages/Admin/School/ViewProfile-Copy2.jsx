import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { IoIosWarning } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import SelectInput from "../../../Components/SelectInput";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

function ViewProfile() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loader
  const [students, setStudents] = useState([]); // view list of all students
  const [finializeBtn, setFinializeBtn] = useState(false); // data of each student to be view

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const phase = phaseDetails["phase"];
  const year = phaseDetails["year"];
  const phaseName = phaseDetails["phaseName"];
  const schoolName = user.name;

  const finilize_student = () => {
    const result = window.confirm("Do you want to finalize ?");
    if (result) {
      /////////////////////////////////////////////////////////
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/finilizeStudent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("finilize_student--" + JSON.stringify(data));
          // console.log("studentProfileGet--"+JSON.stringify(data.data.students[0].name));
          if (data.status == "success") {
          } else if (data.status == "fail") {
            // setStudents([]);
          }
        })
        .catch((err) => {
          console.error("finilize_student:", err);
          alert("❌ Failed to finilize_student.");
        })
        .finally(() => {
          setLoading(false);
        });
      /////////////////////////////////////////////////////////
    } else {
      alert("You clicked No");
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch("http://127.0.0.1:8000/api/studentsProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`, // if protected route
      },
      body: JSON.stringify(data), // 🔁 send the form data as JSON
    });
    const res = await response.json();

    console.log(res);
    if (res.status == "success") {
      setStudents(res.studentdata);
      setFinializeBtn(res.finialize_status);
    } else if (res.status == "fail") {
      setStudents([]);
    }
    setLoading(false);
  };
  // Call on component mount
  useEffect(() => {
    handleSubmit(onSubmit)();
  }, []);
  // Call on change of value
  const handleOnChange = () => {
    onSubmit(watch());
  };
  ////////////////////////////////////

  const viewRecjectedCause = (id, e) => {
    console.log(id);
    console.log(e);
  };

  const editApplicantDetails = (applicantId) => {
    navigate(`/StudentEditPhaseX/${applicantId}/${phase}/${year}`);
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        {/* Page Heading */}
        <section className="p-4">
          <div className="bg-white dark:bg-black/50 rounded-2xl shadow-xl border-t-8 border-green-500 overflow-hidden">
            {/* Sticky Heading & Filter Section */}
            <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-black/50 px-6 py-4 border-b border-green-200 dark:border-green-700">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Class IX Phase {phaseName} Application under{" "}
                {schoolName
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                (AY {year})
              </h1>

              {/* Filter Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-4">
                  {/* Status */}
                  <div className="basis-full sm:basis-1/4">
                    <label className="block text-sm mb-1 dark:text-white">
                      Application Status
                    </label>
                    <SelectInput
                      name="status_code"
                      {...register("status_code")}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleOnChange();
                      }}
                      className="w-full p-2 rounded-lg border border-green-500 dark:border-green-300 bg-white/90 dark:bg-black/60"
                    >
                      <option value="1">Pending</option>
                      <option value="2">Finalize</option>
                      <option value="4">Rejected</option>
                    </SelectInput>
                  </div>

                  {/* Year */}
                  <div className="basis-full sm:basis-1/4">
                    <label className="block text-sm mb-1 dark:text-white">
                      Year
                    </label>
                    <SelectInput
                      name="year"
                      {...register("year")}
                      className="w-full p-2 rounded-lg border border-green-500 dark:border-green-300 bg-white/90 dark:bg-black/60"
                    >
                      <option value={year}>{year}</option>
                    </SelectInput>
                  </div>

                  {/* SortField */}
                  <div className="basis-full sm:basis-1/4">
                    <label className="block text-sm mb-1 dark:text-white">
                      Sort By
                    </label>
                    <SelectInput
                      name="sortField"
                      {...register("sortField")}
                      onChange={handleOnChange}
                      className="w-full p-2 rounded-lg border border-green-500 dark:border-green-300 bg-white/90 dark:bg-black/60"
                    >
                      <option value="(applicant_section, applicant_roll_no)">
                        Section & Roll Number
                      </option>
                      <option value="applicant_id">Applicant ID</option>
                      <option value="applicant_name">Student Name</option>
                    </SelectInput>
                  </div>
                </div>
              </form>
            </div>

            {/* Table + Loader */}
            <div className="relative max-h-[550px] overflow-y-auto">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                  <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                </div>
              )}

              <table className="w-full text-sm border border-gray-400">
                <thead className="bg-green-600 text-white text-center">
                  <tr>
                    <th className="p-2 border">Sl.No.</th>
                    <th className="p-2 border">Applicant ID</th>
                    <th className="p-2 border">Applicant Name</th>
                    <th className="p-2 border">Guardian Name</th>
                    <th className="p-2 border">DOB</th>
                    <th className="p-2 border">Section</th>
                    <th className="p-2 border">Roll No.</th>
                    <th className="p-2 border">Gender</th>
                    <th className="p-2 border">Source</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="text-center p-2 border">{index + 1}</td>
                      <td className="text-center p-2 border">{student.id}</td>
                      <td className="text-left p-2 border">{student.name}</td>
                      <td className="text-left p-2 border">
                        {student.guardian}
                      </td>
                      <td className="text-center p-2 border">{student.dob}</td>
                      <td className="text-center p-2 border">
                        {student.section}
                      </td>
                      <td className="text-center p-2 border">{student.roll}</td>
                      <td className="text-center p-2 border">
                        {student.gender}
                      </td>
                      <td className="text-left p-2 border">{student.source}</td>
                      <td className="text-left p-2 border">
                        {student.status == 1 && student.source_status == 2 && (
                          <button
                            onClick={() => editApplicantDetails(student.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-xs mx-1"
                          >
                            Edit
                          </button>
                        )}
                        {student.status == 1 &&
                          student.source_status == 1 &&
                          student.declaration != 1 && (
                            <button
                              onClick={() => editApplicantDetails(student.id)}
                              className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-xs mx-1"
                            >
                              Verify
                            </button>
                          )}
                        {student.status == 1 &&
                          student.source_status == 1 &&
                          student.declaration == 1 && (
                            <button
                              onClick={() => editApplicantDetails(student.id)}
                              className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-md text-xs mx-1"
                            >
                              Verified
                            </button>
                          )}
                        {student.status == 1 &&
                          student.source == 2 &&
                          student.declaration == 1 &&
                          "Finalized"}
                        {student.status == 1 && (
                          <button className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded-md text-xs mx-1">
                            Reject
                          </button>
                        )}
                        {student.status == 4 && (
                          <button
                            onClick={viewRecjectedCause}
                            className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded-md text-xs mx-1 flex items-center"
                          >
                            <IoIosWarning className="mr-1" /> Rejected
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Finalize Button */}
            {finializeBtn && (
              <div className="flex justify-end p-4">
                <button
                  onClick={finilize_student}
                  className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  Finalize
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      {/* Modal section */}
    </>
  );
}

export default ViewProfile;
