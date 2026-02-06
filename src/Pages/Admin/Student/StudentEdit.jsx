import React, { useEffect, useState, useRef } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import TextInput from "../../../Components/TextInput";
import SelectInput from "../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../Utils/Constants/Constants";

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
    <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
      <Icon className="text-2xl text-teal-600 dark:text-teal-400" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  </div>
);

const StudentEdit = () => {
  const { id, phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const navigate = useNavigate();

  const [blockData, setBlockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({}); // to show form backend error message
  const [studentData, setStudentData] = useState([]); // data of each student for edit
  const [successMessage, setSuccessMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);

  const [schoolMasterData, setSchoolMasterData] = useState({
    classes: [],
    genders: [],
    districts: [],
    boards: [],
    religions: [],
    categories: [],
    relationships: [],
  });
  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch, // Watches input changes (optional)
    reset,
    setValue,
    formState: { errors }, // Contains validation errors
  } = useForm({
    defaultValues: {
      appl_class: "1", // 👈 preselect class with id "1"
      phaseId: phaseId,
    },
  });
  const [showModal, setShowModal] = useState(false);
  const applAlreadyReceived = watch("appl_already_received");

  const viewApplicantDetails = async (id, phaseId) => {
    setLoading(true);
    try {
      const response = await callApi(
        "GET",
        `studentProfileEdit/${id}/${phaseId}`,
      );

      if (response.error) {
        console.error("Failed to fetch applicant details:", response.message);
        toast.error(
          `❌ Failed to fetch applicant details: ${response.message}`,
        );
      } else {
        // Handle successful response
        if (response.data) {
          setStudentData(response.data.students);
          setSchoolMasterData({
            classes: response.data.classes || [],
            genders: response.data.genders || [],
            districts: response.data.districts || [],
            boards: response.data.boards || [],
            religions: response.data.religions || [],
            categories: response.data.categories || [],
            relationships: response.data.relationships || [],
          });
        }
      }
    } catch (err) {
      console.error("❌ An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async (district) => {
    try {
      const response = await callApi("GET", `getBlock/${btoa(district)}`);

      if (response.error) {
        toast.error("Failed to fetch blocks:", response.message);
      } else {
        // API call was successful
        setBlockData(response.data);
        //console.log("Blocks data received:", response.data);
      }
    } catch (err) {
      toast.error("An unexpected error occurred:", err);
    }
  };

  useEffect(() => {
    viewApplicantDetails(id, phaseId);
  }, [id, phaseId]);

  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchBlocks(studentData[0].district);
    }
  }, [studentData]);

  useEffect(() => {
    ///////////////////////////////////
    if (!initialized.current && studentData?.[0] && blockData.length > 0) {
      reset({
        appl_name: studentData[0].name,
        appl_g_name: studentData[0].guardian,
        appl_class: studentData[0].class || 1,
        appl_board_council: studentData[0].edu_board,
        appl_g_relation: studentData[0].guardian_relation,
        appl_cast: studentData[0].caste,
        appl_religion: studentData[0].religion,
        appl_sex: studentData[0].gender,
        appl_dob: studentData[0].dob, //student.students[0].dob,
        appl_reg_no: studentData[0].reg_no,
        appl_sec: studentData[0].section,
        appl_roll_no: studentData[0].roll,
        appl_premisis_no: studentData[0].road,
        appl_city: studentData[0].cityvil,
        appl_po: studentData[0].po,
        appl_pin: studentData[0].pin,
        appl_dist: studentData[0].district,
        appl_block: studentData[0].block,
        appl_ps: studentData[0].ps,
        appl_mob: studentData[0].contactno,
        appl_already_received: studentData[0].cycle_rev,
        appl_scheme_name: studentData[0].cycle_scheme,
        appl_check: studentData[0].appl_check,
      });

      initialized.current = true;
    }
    ///////////////////////////////////
  }, [blockData]);

  useEffect(() => {
    if (studentData?.length > 0 && blockData.length > 0) {
      setLoading(false);
    }
  }, [studentData, blockData]);

  const formSubmit = async (formdata) => {
    const finalData = {
      ...formdata,
      id: studentData?.[0]?.id || id, // Prefer API-loaded ID if available
      phaseId: phaseId,
    };
    setLoading(true); // Start loader
    try {
      const response = await callApi("POST", "studentupdation", finalData);

      if (response.error) {
        if (response.message === "Validation Errors") {
          setBackendErrors(response.errors);
        } else {
          toast.error(`❌ Failed to update student data: ${response.message}`);
        }
      } else {
        toast.success(response.message);
        navigate(`/StudentProfile/${phaseId}`);
      }
    } catch (err) {
      // This catches unexpected exceptions not handled by the hook
      console.error("❌ Exception:", err);
      toast.error(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // return (
  //   <>
  //     <AdminAuthenticatedLayout>
  //       {/* Page Heading */}
  //       <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
  //         <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
  //           Update Application Class IX Phase {phaseDetails.phaseName} for
  //           Academic Year {phaseDetails.year}
  //         </h1>
  //         {/* Page Heading */}
  //         {/* Main Content */}
  //         <div>
  //           <form onSubmit={handleSubmit(formSubmit)}>
  //             {/* Applicant's Details */}
  //             <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 flex items-center gap-2 rounded-md">
  //               <FaUser />
  //               &nbsp;&nbsp;&nbsp;Applicant's Details
  //             </h2>
  //             {/* Applicant Details First Row */}

  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_name"
  //                   type="text"
  //                   placeholder="Applicant's Name"
  //                   {...register("appl_name", {
  //                     required: "Applicant's Name is required",
  //                     maxLength: {
  //                       value: 255,
  //                       message: "Name cannot exceed 255 characters",
  //                     },
  //                     pattern: {
  //                       value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
  //                       message: "Only alphabetic characters are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_name", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_name"
  //                   value="Applicant's Name"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_name?.message || backendErrors.appl_name?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_g_name"
  //                   type="text"
  //                   placeholder="Guardian's Name"
  //                   {...register("appl_g_name", {
  //                     required: "Guardian's Name is required",
  //                     maxLength: {
  //                       value: 255,
  //                       message: "Name cannot exceed 255 characters",
  //                     },
  //                     pattern: {
  //                       value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
  //                       message: "Only alphabetic characters are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_g_name", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_g_name"
  //                   value="Guardian's Name"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_g_name?.message ||
  //                     backendErrors.appl_g_name?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_class"
  //                   placeholder="Current Class"
  //                   {...register("appl_class", {
  //                     required: "Class Is required",
  //                   })}
  //                   readOnly
  //                   disabled
  //                 >
  //                   <option value="" disabled>
  //                     Select Class
  //                   </option>
  //                   {schoolMasterData.classes.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_class"
  //                   value="Current Class"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_class?.message ||
  //                     backendErrors.appl_class?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_board_council"
  //                   {...register("appl_board_council", {
  //                     required: "Board/Council selection is required",
  //                   })}
  //                 >
  //                   <option value="">Board/Council</option>
  //                   {schoolMasterData.boards.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_board_council"
  //                   value="Board/Council"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_board_council?.message ||
  //                     backendErrors.appl_board_council?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_g_relation"
  //                   {...register("appl_g_relation", {
  //                     required: "Relationship required",
  //                   })} // just
  //                 >
  //                   <option value="">Guardian's Relationship</option>
  //                   {schoolMasterData.relationships.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_g_relation"
  //                   value="Guardian's Relationship"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_g_relation?.message ||
  //                     backendErrors.appl_g_relation?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_cast"
  //                   placeholder="Caste"
  //                   {...register("appl_cast", {
  //                     required: "Caste is required",
  //                   })}
  //                 >
  //                   <option value="">Caste</option>
  //                   {schoolMasterData.categories.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_cast"
  //                   value="Caste"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_cast?.message || backendErrors.appl_cast?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_religion"
  //                   {...register("appl_religion", {
  //                     required: "Religion is required",
  //                   })}
  //                 >
  //                   <option value="">Religion</option>
  //                   {schoolMasterData.religions.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_religion"
  //                   value="Religion"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_religion?.message ||
  //                     backendErrors.appl_religion?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_sex"
  //                   placeholder="Gender"
  //                   {...register("appl_sex", {
  //                     required: "Gender is required",
  //                   })}
  //                 >
  //                   <option value="">Gender</option>
  //                   {schoolMasterData.genders.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_sex"
  //                   value="Gender"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_sex?.message || backendErrors.appl_sex?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_dob"
  //                   type="date"
  //                   max={today}
  //                   placeholder="Date of Birth"
  //                   {...register("appl_dob", {
  //                     required: "required",
  //                     validate: {
  //                       validDate: (value) => {
  //                         const dob = new Date(value);
  //                         const today = new Date();

  //                         if (dob >= today) {
  //                           return "Date of Birth must be in the past";
  //                         }

  //                         let age = today.getFullYear() - dob.getFullYear();
  //                         const m = today.getMonth() - dob.getMonth();
  //                         if (
  //                           m < 0 ||
  //                           (m === 0 && today.getDate() < dob.getDate())
  //                         ) {
  //                           age--; // Adjust for month/day
  //                         }

  //                         if (age < 5 || age > 25) {
  //                           return "Age must be between 5 and 25 years";
  //                         }
  //                         return true;
  //                       },
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_dob"
  //                   value="Date of Birth"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_dob?.message || backendErrors.appl_dob?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_reg_no"
  //                   type="text"
  //                   placeholder="Registration No."
  //                   {...register("appl_reg_no", {
  //                     required: "Registration no. required",
  //                     pattern: {
  //                       value: /^[A-Za-z0-9\-\/]+$/, // Allows letters, numbers, '-' and '/'
  //                       message:
  //                         "Only letters, numbers, '-' and '/' are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_reg_no", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_reg_no"
  //                   value="Registration No."
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_reg_no?.message ||
  //                     backendErrors.appl_reg_no?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_sec"
  //                   type="text"
  //                   placeholder="Section"
  //                   {...register("appl_sec", {
  //                     required: "Section is required",
  //                     maxLength: {
  //                       value: 1,
  //                       message: "Section cannot have more then 1 characters",
  //                     },
  //                     pattern: {
  //                       value: /^[A-Za-z\/]+$/, // Allows only letters and spaces
  //                       message: "Only alphabetic characters are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_sec", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_sec"
  //                   value="Section"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_sec?.message || backendErrors.appl_sec?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_roll_no"
  //                   type="text"
  //                   placeholder="Roll No."
  //                   {...register("appl_roll_no", {
  //                     required: "Roll no. is required",
  //                     pattern: {
  //                       value: /^[0-9]+$/, // only digits allowed
  //                       message: "Only numeric characters are allowed",
  //                     },
  //                     minLength: {
  //                       value: 1, // example minimum length
  //                       message: "Roll number must be at least 1 digit",
  //                     },
  //                     maxLength: {
  //                       value: 3, // example maximum length
  //                       message: "Roll number cannot exceed 3 digits",
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_roll_no"
  //                   value="Roll No."
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_roll_no?.message ||
  //                     backendErrors.appl_roll_no?.[0]
  //                   }
  //                 />
  //               </div>
  //             </div>

  //             {/* Applicant Details Third Row */}
  //             {/* Contact Details */}
  //             <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 mt-8 flex items-center gap-2 rounded-md">
  //               <FaLocationDot />
  //               &nbsp;&nbsp;&nbsp;Contact Details
  //             </h2>
  //             {/* Contact Details First Row */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_premisis_no"
  //                   type="text"
  //                   placeholder="Premisis No. & Locality/Road"
  //                   {...register("appl_premisis_no", {
  //                     maxLength: {
  //                       value: 255,
  //                       message: "Premisis cant have more than 255 characters",
  //                     },
  //                     pattern: {
  //                       value: /^[A-Za-z0-9\s\-\/]+$/, // letters, digits, space, slash, hyphen
  //                       message:
  //                         "Only letters, numbers, spaces, '-' and '/' are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_premisis_no", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_premisis_no"
  //                   value="Premisis No. & Locality/Road"
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_premisis_no?.message ||
  //                     backendErrors.appl_premisis_no?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_city"
  //                   type="text"
  //                   placeholder="City/Town/Village"
  //                   {...register("appl_city", {
  //                     required: "City/Town/Village is required",
  //                     maxLength: {
  //                       value: 255,
  //                       message: "Premisis cant have more than 255 characters",
  //                     },
  //                     pattern: {
  //                       value: /^[A-Za-z0-9\s\-\/]+$/, // Allows letters, numbers, '-' and '/'
  //                       message:
  //                         "Only letters, numbers, '-' and '/' are allowed",
  //                     },
  //                     onBlur: (e) => {
  //                       const trimmed = e.target.value.trim();
  //                       setValue("appl_city", trimmed, {
  //                         shouldValidate: true,
  //                       });
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_city"
  //                   value="City/Town/Village"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_city?.message || backendErrors.appl_city?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_po"
  //                   type="text"
  //                   placeholder="Post Office"
  //                   {...register("appl_po", {
  //                     required: "Post Office is required",
  //                     pattern: {
  //                       value: /^[A-Za-z\s]+$/, // Allows letters and space
  //                       message: "Only letters are allowed",
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_po"
  //                   value="Post Office"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_po?.message || backendErrors.appl_po?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_pin"
  //                   type="text"
  //                   maxLength="6"
  //                   placeholder="Pincode"
  //                   {...register("appl_pin", {
  //                     required: "required",
  //                     pattern: {
  //                       value: /^[0-9]+$/,
  //                       message: "Only numeric characters are allowed",
  //                     },
  //                     minLength: {
  //                       value: 6,
  //                       message: "PIN must be exactly 6 digits",
  //                     },
  //                     maxLength: {
  //                       value: 6,
  //                       message: "PIN must be exactly 6 digits",
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_pin"
  //                   value="Pincode"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_pin?.message || backendErrors.appl_pin?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_dist"
  //                   {...register("appl_dist", {
  //                     required: "District is required",
  //                   })}
  //                   onChange={(e) => {
  //                     const selectedDistrictId = e.target.value;
  //                     fetchBlocks(selectedDistrictId); // 👈 Call Laravel API here
  //                   }}
  //                 >
  //                   <option value="">District</option>
  //                   {schoolMasterData.districts.map((cls) => (
  //                     <option key={cls.id} value={cls.id}>
  //                       {cls.desc}
  //                     </option>
  //                   ))}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_dist"
  //                   value="District"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_dist?.message || backendErrors.appl_dist?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <SelectInput
  //                   className="dark:bg-gray-900"
  //                   id="appl_block"
  //                   {...register("appl_block", {
  //                     required: "Block is required",
  //                   })}
  //                 >
  //                   <option value="">Block</option>
  //                   {!blockData.length ? (
  //                     <option>Loading blocks...</option>
  //                   ) : (
  //                     blockData.map((cls) => (
  //                       <option key={cls.id} value={cls.id}>
  //                         {cls.desc}
  //                       </option>
  //                     ))
  //                   )}
  //                 </SelectInput>
  //                 <InputLabel
  //                   htmlFor="appl_block"
  //                   value="Block/Municipality"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_block?.message ||
  //                     backendErrors.appl_block?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_ps"
  //                   type="text"
  //                   placeholder="Police Station"
  //                   {...register("appl_ps", {
  //                     required: "Police station is reuired",
  //                     pattern: {
  //                       value: /^[A-Za-z\s]+$/, // Allows letters and space
  //                       message: "Only letters are allowed",
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_ps"
  //                   value="Police Station"
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_ps?.message || backendErrors.appl_ps?.[0]
  //                   }
  //                 />
  //               </div>

  //               <div className="relative">
  //                 <TextInput
  //                   id="appl_mob"
  //                   type="text"
  //                   maxlength="10" //
  //                   placeholder="Mobile No."
  //                   onInput={(e) => {
  //                     let digits = e.target.value.replace(/[^0-9]/g, "");
  //                     if (digits.length > 10) {
  //                       digits = digits.slice(0, 10);
  //                     }
  //                     e.target.value = digits;
  //                   }}
  //                   onPaste={(e) => {
  //                     e.preventDefault();
  //                     const paste = e.clipboardData
  //                       .getData("text")
  //                       .replace(/[^0-9]/g, "")
  //                       .slice(0, 10);
  //                     e.target.value = paste;
  //                   }}
  //                   {...register("appl_mob", {
  //                     required: "Mobile No. is required",
  //                     pattern: {
  //                       value: /^[0-9]+$/,
  //                       message: "Only number allowed",
  //                     },
  //                     minLength: {
  //                       value: 10,
  //                       message: "Mobile number must be exactly 10 digits",
  //                     },
  //                     maxLength: {
  //                       value: 10,
  //                       message: "Mobile number must be exactly 10 digits",
  //                     },
  //                   })}
  //                 />
  //                 <InputLabel
  //                   htmlFor="appl_mob"
  //                   value="Mobile No."
  //                   mandatory={true}
  //                 />
  //                 <InputError
  //                   message={
  //                     errors.appl_mob?.message || backendErrors.appl_mob?.[0]
  //                   }
  //                 />
  //               </div>
  //             </div>
  //             {/* Declaration */}
  //             <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 mt-8 flex items-center gap-2 rounded-md">
  //               <GrDocumentText />
  //               &nbsp;&nbsp;&nbsp;Declaration
  //             </h2>
  //             <div className="flex flex-col mt-4">
  //               <div className="flex flex-wrap items-start gap-2">
  //                 <div className="relative">
  //                   <SelectInput
  //                     className="dark:bg-gray-900"
  //                     id="appl_already_received"
  //                     {...register("appl_already_received", {
  //                       required: "Select Yes Or No",
  //                     })}
  //                   >
  //                     <option value="">Already received Bi-cycle</option>
  //                     <option value="0">No</option>
  //                     <option value="1">Yes</option>
  //                   </SelectInput>
  //                   <InputLabel
  //                     htmlFor="appl_already_received"
  //                     value="Already received Bi-cycle"
  //                     mandatory={true}
  //                   />
  //                   <InputError
  //                     message={
  //                       errors.appl_already_received?.message ||
  //                       backendErrors.appl_already_received?.[0]
  //                     }
  //                   />
  //                 </div>
  //                 {applAlreadyReceived === "1" && (
  //                   <div className="relative">
  //                     <TextInput
  //                       id="appl_scheme_name"
  //                       name="appl_scheme_name"
  //                       placeholder="Scheme Name"
  //                       {...register("appl_scheme_name", {
  //                         required: "Scheme name is required",
  //                       })}
  //                     />
  //                     <InputLabel
  //                       htmlFor="appl_scheme_name"
  //                       value="Scheme Name"
  //                       mandatory={true}
  //                     />
  //                     <InputError
  //                       message={
  //                         errors.appl_scheme_name?.message ||
  //                         backendErrors.appl_scheme_name?.[0]
  //                       }
  //                     />
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //             <div className="flex flex-col text-center">
  //               <div className="flex flex-row my-1.5 justify-center dark:text-white">
  //                 <input
  //                   type="checkbox"
  //                   id="appl_check"
  //                   {...register("appl_check", {
  //                     required: "Declaration is required",
  //                   })}
  //                 />
  //                 &nbsp;&nbsp;&nbsp;I hereby declare that all particular's of
  //                 student profile have been verified and only correct data have
  //                 been provided.
  //               </div>
  //               <InputError
  //                 message={
  //                   errors.appl_check?.message || backendErrors.appl_check?.[0]
  //                 }
  //               />
  //             </div>
  //             <div className="flex justify-center gap-4 mt-6">
  //               <button
  //                 className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
  //                 type="submit"
  //               >
  //                 Update
  //               </button>
  //               <button
  //                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
  //                 type="reset"
  //                 onClick={() => reset()}
  //               >
  //                 Reset
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //         {loading && (
  //           <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
  //             <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
  //           </div>
  //         )}
  //       </section>
  //     </AdminAuthenticatedLayout>
  //     {/* Modal section */}
  //     {showModal && (
  //       <MsgDisplayModal
  //         msg={successMessage}
  //         applicantId={null}
  //         setShowModal={setShowModal}
  //         setSuccessMessage={setSuccessMessage}
  //         edit={1}
  //       />
  //     )}
  //     {showPopup && (
  //       <LogoutPopup
  //         message={popupMessage}
  //         onConfirm={() => {
  //           handleLogout();
  //           setShowPopup(false);
  //         }}
  //       />
  //     )}
  //     {/* Modal section */}
  //   </>
  // );

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-8 lg:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen">
        {/* Breadcrumb & Heading */}
        <div className="2xl:ml-40 mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Update Student Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Academic Year {phaseDetails.year} • Phase {phaseDetails.phaseName}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
            {/* --- APPLICANT DETAILS CARD --- */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <SectionHeader
                icon={FaUser}
                title="Applicant Profile"
                subtitle="Update personal and academic identification details"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
                {/* Name */}
                <div className="relative group">
                  <TextInput
                    id="appl_name"
                    {...register("appl_name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Letters only",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_name"
                    value="Applicant's Name"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_name?.message || backendErrors.appl_name?.[0]
                    }
                  />
                </div>

                {/* Guardian */}
                <div className="relative group">
                  <TextInput
                    id="appl_g_name"
                    {...register("appl_g_name", {
                      required: "Guardian name required",
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_g_name"
                    value="Guardian's Name"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_g_name?.message ||
                      backendErrors.appl_g_name?.[0]
                    }
                  />
                </div>

                {/* Class (Disabled) */}
                <div className="relative group">
                  <SelectInput
                    id="appl_class"
                    {...register("appl_class")}
                    disabled
                    className="bg-gray-50 opacity-70"
                  >
                    {schoolMasterData.classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_class"
                    value="Current Class"
                    mandatory
                  />
                </div>

                {/* Board */}
                <div className="relative group">
                  <SelectInput
                    id="appl_board_council"
                    {...register("appl_board_council", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Board</option>
                    {schoolMasterData.boards.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_board_council"
                    value="Board/Council"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_board_council?.message ||
                      backendErrors.appl_board_council?.[0]
                    }
                  />
                </div>

                {/* Relationship */}
                <div className="relative group">
                  <SelectInput
                    id="appl_g_relation"
                    {...register("appl_g_relation", { required: "Required" })}
                  >
                    <option value="">Select Relation</option>
                    {schoolMasterData.relationships.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_g_relation"
                    value="Guardian Relation"
                    mandatory
                  />
                </div>

                {/* Caste */}
                <div className="relative group">
                  <SelectInput
                    id="appl_cast"
                    {...register("appl_cast", { required: "Required" })}
                  >
                    <option value="">Select Caste</option>
                    {schoolMasterData.categories.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel htmlFor="appl_cast" value="Caste" mandatory />
                </div>

                {/* Religion */}
                <div className="relative group">
                  <SelectInput
                    id="appl_religion"
                    {...register("appl_religion", { required: "Required" })}
                  >
                    <option value="">Select Religion</option>
                    {schoolMasterData.religions.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_religion"
                    value="Religion"
                    mandatory
                  />
                </div>

                {/* Gender */}
                <div className="relative group">
                  <SelectInput
                    id="appl_sex"
                    {...register("appl_sex", { required: "Required" })}
                  >
                    <option value="">Select Gender</option>
                    {schoolMasterData.genders.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel htmlFor="appl_sex" value="Gender" mandatory />
                </div>

                {/* DOB */}
                <div className="relative group">
                  <TextInput
                    id="appl_dob"
                    type="date"
                    max={today}
                    {...register("appl_dob", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_dob"
                    value="Date of Birth"
                    mandatory
                  />
                </div>

                {/* Reg No */}
                <div className="relative group">
                  <TextInput
                    id="appl_reg_no"
                    {...register("appl_reg_no", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_reg_no"
                    value="Registration No."
                    mandatory
                  />
                </div>

                {/* Section */}
                <div className="relative group">
                  <TextInput
                    id="appl_sec"
                    maxLength="1"
                    {...register("appl_sec", { required: "Required" })}
                  />
                  <InputLabel htmlFor="appl_sec" value="Section" mandatory />
                </div>

                {/* Roll */}
                <div className="relative group">
                  <TextInput
                    id="appl_roll_no"
                    {...register("appl_roll_no", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_roll_no"
                    value="Roll No."
                    mandatory
                  />
                </div>
              </div>
            </div>

            {/* --- CONTACT DETAILS CARD --- */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <SectionHeader
                icon={FaLocationDot}
                title="Contact Information"
                subtitle="Residential and communication addresses"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
                <div className="relative group lg:col-span-2">
                  <TextInput
                    id="appl_premisis_no"
                    {...register("appl_premisis_no")}
                  />
                  <InputLabel
                    htmlFor="appl_premisis_no"
                    value="Premisis No. & Locality"
                  />
                </div>

                <div className="relative group">
                  <TextInput
                    id="appl_city"
                    {...register("appl_city", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_city"
                    value="City/Town/Village"
                    mandatory
                  />
                </div>

                <div className="relative group">
                  <TextInput
                    id="appl_po"
                    {...register("appl_po", { required: "Required" })}
                  />
                  <InputLabel htmlFor="appl_po" value="Post Office" mandatory />
                </div>

                <div className="relative group">
                  <SelectInput
                    id="appl_dist"
                    {...register("appl_dist", { required: "Required" })}
                    onChange={(e) => fetchBlocks(e.target.value)}
                  >
                    <option value="">Select District</option>
                    {schoolMasterData.districts.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel htmlFor="appl_dist" value="District" mandatory />
                </div>

                <div className="relative group">
                  <SelectInput
                    id="appl_block"
                    {...register("appl_block", { required: "Required" })}
                  >
                    <option value="">Select Block</option>
                    {blockData.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_block"
                    value="Block/Mun."
                    mandatory
                  />
                </div>

                <div className="relative group">
                  <TextInput
                    id="appl_ps"
                    {...register("appl_ps", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_ps"
                    value="Police Station"
                    mandatory
                  />
                </div>

                <div className="relative group">
                  <TextInput
                    id="appl_pin"
                    maxLength="6"
                    {...register("appl_pin", { required: "Required" })}
                  />
                  <InputLabel htmlFor="appl_pin" value="Pincode" mandatory />
                </div>

                <div className="relative group">
                  <TextInput
                    id="appl_mob"
                    maxLength="10"
                    {...register("appl_mob", { required: "Required" })}
                  />
                  <InputLabel htmlFor="appl_mob" value="Mobile No." mandatory />
                </div>
              </div>
            </div>

            {/* --- DECLARATION & SUBMIT --- */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <SectionHeader
                icon={GrDocumentText}
                title="Declaration"
                subtitle="Review and save changes"
              />

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3">
                    <SelectInput
                      id="appl_already_received"
                      {...register("appl_already_received", {
                        required: "Required",
                      })}
                    >
                      <option value="">Bi-cycle Received?</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </SelectInput>
                    <InputLabel
                      htmlFor="appl_already_received"
                      value="Previous Benefit"
                      mandatory
                    />
                  </div>

                  {applAlreadyReceived === "1" && (
                    <div className="relative w-full md:w-1/3 animate-in fade-in slide-in-from-left-2">
                      <TextInput
                        id="appl_scheme_name"
                        {...register("appl_scheme_name", {
                          required: "Required",
                        })}
                      />
                      <InputLabel
                        htmlFor="appl_scheme_name"
                        value="Scheme Name"
                        mandatory
                      />
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    {...register("appl_check", { required: true })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I confirm that the updated data provided is accurate.
                  </span>
                </label>

                <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-48 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full md:w-48 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 font-bold py-4 rounded-2xl transition-all hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* MODALS & OVERLAYS */}
        {showModal && (
          <MsgDisplayModal
            msg={successMessage}
            applicantId={null}
            setShowModal={setShowModal}
            setSuccessMessage={setSuccessMessage}
            edit={1}
          />
        )}
        {showPopup && (
          <LogoutPopup
            message={popupMessage}
            onConfirm={() => {
              handleLogout();
              setShowPopup(false);
            }}
          />
        )}

        {loading && (
          <div className="fixed inset-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-teal-600 font-bold animate-pulse">
              Processing Request...
            </p>
          </div>
        )}
      </section>
    </AdminAuthenticatedLayout>
  );
};

export default StudentEdit;
