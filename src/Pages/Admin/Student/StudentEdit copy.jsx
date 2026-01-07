import React, { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import TextInput from "../../../Components/TextInput";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";

const StudentEdit = ({ student, closeHandler }) => {
  //  console.log(studentExtraData);
  const token = JSON.parse(localStorage.getItem("token")).token;
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch, // Watches input changes (optional)
    reset,
    formState: { errors }, // Contains validation errors
  } = useForm({
    defaultValues: {
      appl_class: "1", // 👈 preselect class with id "1"
    },
  });

  const applAlreadyReceived = watch("appl_already_received");

  const [schoolMasterData, setSchoolMasterData] = useState({
    classes: student.classes || [],
    genders: student.genders || [],
    districts: student.districts || [],
    boards: student.boards || [],
    religions: student.religions || [],
    categories: student.categories || [],
    relationships: student.relationships || [],
  });

  const [blockData, setBlockData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [backendErrors, setBackendErrors] = useState({}); // to show form backend error message

  useEffect(() => {
    console.log(student.students[0].district);
    const s = student?.students?.[0];
    if (!s) return;

    reset({
      appl_name: student.students[0].name,
      appl_g_name: student.students[0].guardian,
      appl_class: student.students[0].class || 1,
      appl_board_council: student.students[0].edu_board,
      appl_g_relation: student.students[0].guardian_relation,
      appl_cast: student.students[0].caste,
      appl_religion: student.students[0].religion,
      appl_sex: student.students[0].gender,
      appl_dob: student.students[0].dob, //student.students[0].dob,
      appl_reg_no: student.students[0].reg_no,
      appl_sec: student.students[0].section,
      appl_roll_no: student.students[0].roll,
      appl_premisis_no: student.students[0].road,
      appl_city: student.students[0].cityvil,
      appl_po: student.students[0].po,
      appl_pin: student.students[0].pin,
      appl_dist: student.students[0].district,
      appl_block: student.students[0].block,
      appl_ps: student.students[0].ps,
      appl_mob: student.students[0].contactno,
      appl_already_received: student.students[0].cycle_rev,
      appl_scheme_name: student.students[0].cycle_scheme,
      appl_ckeck: student.students[0].name,
    });
    // if(!student.students[0]) return;
    const fetchBlocks = async () => {
      // setBlockData(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getBlock/${student.students[0].district}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ⬅️ Send token in headers
            },
          }
        );
        const data = await response.json();
        // console.log(data);
        setBlockData(data.data);
      } catch (err) {
        // console.log("error my --" + err);
        // setError(err.message);
      }
    };

    fetchBlocks();
  }, [student, reset]);

  const formSubmit = async (data) => {};

  return (
    <section>
      {/* //////////////////////////// */}
      <div className=" rounded-md bg-white border-t-4 border-sky-500 my-5 mx-3 shadow-md">
        <div className="border-gray-400 p-4 border-b justify-between flex flex-row">
          <h4>
            Student Details for Applicant ID - <b>{student.students[0].id}</b>
          </h4>
          <button
            onClick={closeHandler}
            className="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-600"
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="text-gray-600 block p-2.5 relative">&nbsp;&nbsp;</div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div>
            {/* Applicant's Details */}
            <div className="mt-2 text-white p-2 font-bold bg-teal-600 w-full flex flex-row">
              <FaUser className="mt-1" />
              &nbsp;&nbsp;&nbsp;Applicant's Details
            </div>
            {/* Applicant Details First Row */}
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_name" value="Applicant's Name" />
                <TextInput
                  id="appl_name"
                  type="text"
                  placeholder="Applicant's Name"
                  {...register("appl_name", { required: "Name is required" })}
                />
                <InputError
                  message={
                    errors.appl_name?.message || backendErrors.appl_name?.[0]
                  }
                />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_g_name" value="Guardian's Name" />
                <TextInput
                  id="appl_g_name"
                  type="text"
                  placeholder="Guardian's Name"
                  {...register("appl_g_name", {
                    required: "Guardian's Name is required",
                  })}
                />
                <InputError message={errors.appl_g_name?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_class" value="Current Class" />
                <SelectInput
                  id="appl_class"
                  {...register("appl_class", { required: "required" })}
                  readOnly
                  disabled
                >
                  <option value="" disabled>
                    Select Class
                  </option>
                  {schoolMasterData.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                {/* Hidden input to submit the selected class */}
                {/* <input
                              type="hidden"
                              value="1" // 👈 Same value as the selected one
                              {...register("appl_class", { required: true })}
                            /> */}
                <InputError message={errors.appl_class?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel
                  htmlFor="appl_board_council"
                  value="Board/Council"
                />
                <SelectInput
                  id="appl_board_council"
                  {...register("appl_board_council", { required: "required" })}
                >
                  <option value="">Select Board</option>
                  {schoolMasterData.boards.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_board_council?.message} />
              </div>
            </div>
            {/* Applicant Details Second Row */}
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel
                  htmlFor="appl_g_relation"
                  value="Relationship with Applicant"
                />
                <SelectInput
                  id="appl_g_relation"
                  {...register("appl_g_relation", { required: "required" })}
                >
                  <option value="">Select Relationship</option>
                  {schoolMasterData.relationships.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_g_relation?.message} />
              </div>

              <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_cast" value="Caste" />
                <SelectInput
                  id="appl_cast"
                  {...register("appl_cast", { required: "required" })}
                >
                  <option value="">Select Caste</option>
                  {schoolMasterData.categories.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_cast?.message} />
              </div>

              <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_religion" value="Religion" />
                <SelectInput
                  id="appl_religion"
                  {...register("appl_religion", { required: "required" })}
                >
                  <option value="">Select Religion</option>
                  {schoolMasterData.religions.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_religion?.message} />
              </div>

              <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_sex" value="Gender" />
                <SelectInput
                  id="appl_sex"
                  {...register("appl_sex", { required: "required" })}
                >
                  <option value="">Select Gender</option>
                  {schoolMasterData.genders.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_sex?.message} />
              </div>
            </div>
            {/* Applicant Details Third Row */}
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_dob" value="Date of Birth" />
                <TextInput
                  id="appl_dob"
                  type="date"
                  {...register("appl_dob", { required: "required" })}
                />
                <InputError message={errors.appl_dob?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel
                  htmlFor="appl_reg_no"
                  value="Board/Council Registration No."
                />
                <TextInput
                  id="appl_reg_no"
                  type="text"
                  {...register("appl_reg_no", { required: "required" })}
                />
                <InputError message={errors.appl_reg_no?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_sec" value="Section" />
                <TextInput
                  id="appl_sec"
                  type="text"
                  {...register("appl_sec", { required: "required" })}
                />
                <InputError message={errors.appl_sec?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_roll_no" value="Roll No." />
                <TextInput
                  id="appl_roll_no"
                  type="text"
                  {...register("appl_roll_no", { required: "required" })}
                />
                <InputError message={errors.appl_roll_no?.message} />
              </div>
            </div>
            {/* Contact Details */}
            <div className="mt-2 text-white p-2 font-bold bg-teal-600 w-full flex flex-row">
              <FaLocationDot />
              &nbsp;&nbsp;&nbsp;Contact Details
            </div>
            {/* Contact Details First Row */}
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel
                  htmlFor="appl_premisis_no"
                  value="Premisis No. & Locality/Road"
                />
                <TextInput
                  id="appl_premisis_no"
                  type="text"
                  {...register("appl_premisis_no", { required: "required" })}
                />
                <InputError message={errors.appl_premisis_no?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_city" value="City/Town/Village" />
                <TextInput
                  id="appl_city"
                  type="text"
                  {...register("appl_city", { required: true })}
                />
                <InputError message={errors.appl_city?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_po" value="Post Office" />
                <TextInput
                  id="appl_po"
                  type="text"
                  {...register("appl_po", { required: true })}
                />
                <InputError message={errors.appl_po?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_pin" value="Pincode" />
                <TextInput
                  id="appl_pin"
                  type="text"
                  {...register("appl_pin", { required: "required" })}
                />
                <InputError message={errors.appl_pin?.message} />
              </div>
            </div>
            {/* Contact Details Second Row */}
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_dist" value="District" />
                <SelectInput
                  id="appl_dist"
                  {...register("appl_dist", { required: true })}
                  onChange={(e) => {
                    const selectedDistrictId = e.target.value;
                    fetchBlocks(selectedDistrictId); // 👈 Call Laravel API here
                  }}
                >
                  <option value="">Select District</option>
                  {schoolMasterData.districts.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.desc}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.appl_dist?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_block" value="Block/Municipality" />
                <SelectInput
                  id="appl_block"
                  {...register("appl_block", { required: "required" })}
                >
                  <option value="">Select Block</option>
                  {!blockData.length ? (
                    <option>Loading blocks...</option>
                  ) : (
                    blockData.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))
                  )}
                </SelectInput>
                <InputError message={errors.appl_block?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_ps" value="Police Station" />
                <TextInput
                  id="appl_ps"
                  type="text"
                  {...register("appl_ps", { required: "required" })}
                />
                <InputError message={errors.appl_ps?.message} />
              </div>
              <div className="w-1/4 mb-1.5 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel htmlFor="appl_mob" value="Mobile No." />
                <TextInput
                  id="appl_mob"
                  type="text"
                  {...register("appl_mob", { required: "required" })}
                />
                <InputError message={errors.appl_mob?.message} />
              </div>
            </div>
            {/* Declaration */}
            <div className="mt-2 text-white p-2 font-bold bg-teal-600 w-full flex flex-row">
              <GrDocumentText />
              &nbsp;&nbsp;&nbsp;Declaration
            </div>
            <div className="flex flex-wrap my-1.5">
              <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                <InputLabel
                  htmlFor="appl_already_received"
                  value="Already received Bi-cycle"
                />
                <SelectInput
                  id="appl_already_received"
                  {...register("appl_already_received", {
                    required: "Select Yes Or No",
                  })}
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </SelectInput>
              </div>

              {applAlreadyReceived === "1" && (
                <div className="w-1/4 px-3.5 py-1.5 flex flex-col min-w-72">
                  <InputLabel htmlFor="appl_scheme_name" value="Scheme Name" />
                  <TextInput
                    id="appl_scheme_name"
                    {...register("appl_scheme_name", {
                      required: "Scheme name is required",
                    })}
                  />
                  <InputError message={errors.appl_scheme_name?.message} />
                </div>
              )}
            </div>

            <div className="flex flex-row my-1.5 justify-center">
              <input
                type="checkbox"
                id="appl_ckeck"
                {...register("appl_ckeck", { required: "required" })}
              />
              &nbsp;&nbsp;&nbsp;I hereby declare that all particular's of
              student profile have been verified and only correct data have been
              provided
              <InputError message={errors.appl_ckeck?.message} />
            </div>
            <div className="flex flex-row my-1.5 justify-center">
              <input
                className="rounded-md bg-sky-800 px-4 py-2 text-xs font-semibold uppercase m-1 text-white"
                type="submit"
                value="Update"
              />
              <input
                className="rounded-md bg-red-700 px-4 py-2 text-xs font-semibold uppercase m-1 text-white"
                type="reset"
                value="Reset"
                onClick={() => reset()}
              />
            </div>
          </div>
        </form>
      </div>
      {/* //////////////////////////// */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default StudentEdit;
