import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import InputLabel from "../../../../Components/InputLabel";
import InputError from "../../../../Components/InputError";
import TextInput from "../../../../Components/TextInput";
import SelectInput from "../../../../Components/SelectInput";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MsgDisplayModal from "../../../../Components/MsgDisplayModal";
import useApi from "../../../../Hooks/useApi";
import LogoutPopup from "../../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../../Utils/Constants/Constants";

function StudentAdd() {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [schoolMasterData, setSchoolMasterData] = useState({
    classes: [],
    genders: [],
    districts: [],
    boards: [],
    religions: [],
    categories: [],
    relationships: [],
  });
  const [blockData, setBlockData] = useState([]);
  const [backendErrors, setBackendErrors] = useState({}); // to show form backend error message
  const [successMessage, setSuccessMessage] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-07-09"

  //Feteches the data for the opening form
  const fetchData = async () => {
    setLoading(true);
    const response = await callApi("GET", "studentform");

    if (response.error) {
      toast(response.message);
    } else {
      setSchoolMasterData(response.data);
    }
    setLoading(false);
  };

  //calls fetchData on page load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchBlocks = async (districtId) => {
    try {
      const response = await callApi("GET", `getBlock/${btoa(districtId)}`);
      if (response.error) {
        toast(`Failed to fetch blocks: ${response.message}`);
      } else {
        setBlockData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    }
  };

  const {
    register, // Connects inputs to React Hook Form
    handleSubmit, // Handles form submission
    watch, // Watches input changes (optional)
    reset,
    setValue,
    formState: { errors }, // Contains validation errors
  } = useForm({
    mode: "all",
    defaultValues: {
      appl_class: "1", // 👈 preselect class with id "1"
      phaseId: phaseId,
    },
  });

  const applAlreadyReceived = watch("appl_already_received");

  // The new form submit function using apiCall
  const formSubmit = async (data) => {
    setLoading(true);
    // Clear previous messages to avoid confusion
    setSuccessMessage("");
    setBackendErrors({});

    try {
      const response = await callApi("POST", "studentregistration", data);

      if (response.error) {
        // ⚠️ Use a separate state for errors
        if (response.message === "Validation Errors") {
          setBackendErrors(response.errors);
        } else {
          toast(response.message);
        }
      } else {
        console.log("✅ Success:", response.data);
        reset(); // Reset form
        setSuccessMessage(response.message);
        setApplicantId(response.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error("❌ Exception:", err);
      toast(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        {/* Page Heading */}
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Online Application Class IX Phase {phaseDetails.phaseName} for
            Academic Year {phaseDetails.year}
          </h1>
          {/* Page Heading */}
          {/* Main Content */}
          <div>
            <form onSubmit={handleSubmit(formSubmit)}>
              {/* Applicant's Details */}
              <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 flex items-center gap-2 rounded-md">
                <FaUser />
                &nbsp;&nbsp;&nbsp;Applicant's Details
              </h2>
              {/* Applicant Details First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="relative">
                  <TextInput
                    id="appl_name"
                    type="text"
                    placeholder="Applicant's Name"
                    {...register("appl_name", {
                      required: "Applicant's Name is required",
                      maxLength: {
                        value: 255,
                        message: "Name cannot exceed 255 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                        message: "Only alphabetic characters are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_name", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_name"
                    value="Applicant's Name"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_name?.message || backendErrors.appl_name?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_g_name"
                    type="text"
                    placeholder="Guardian's Name"
                    {...register("appl_g_name", {
                      required: "Guardian's Name is required",
                      maxLength: {
                        value: 255,
                        message: "Name cannot exceed 255 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                        message: "Only alphabetic characters are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_g_name", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_g_name"
                    value="Guardian's Name"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_g_name?.message ||
                      backendErrors.appl_g_name?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_class"
                    placeholder="Current Class"
                    {...register("appl_class", {
                      required: "Class Is required",
                    })}
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
                  <InputLabel
                    htmlFor="appl_class"
                    value="Current Class"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_class?.message ||
                      backendErrors.appl_class?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_board_council"
                    {...register("appl_board_council", {
                      required: "Board/Council selection is required",
                    })}
                  >
                    <option value="">Board/Council</option>
                    {schoolMasterData.boards.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_board_council"
                    value="Board/Council"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_board_council?.message ||
                      backendErrors.appl_board_council?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_g_relation"
                    {...register("appl_g_relation", {
                      required: "Relationship required",
                    })}
                  >
                    <option value="">Guardian's Relationship</option>
                    {schoolMasterData.relationships.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_g_relation"
                    value="Guardian's Relationship"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_g_relation?.message ||
                      backendErrors.appl_g_relation?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_cast"
                    placeholder="Caste"
                    {...register("appl_cast", {
                      required: "Caste is required",
                    })}
                  >
                    <option value="">Caste</option>
                    {schoolMasterData.categories.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_cast"
                    value="Caste"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_cast?.message || backendErrors.appl_cast?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_religion"
                    {...register("appl_religion", {
                      required: "Religion is required",
                    })}
                  >
                    <option value="">Religion</option>
                    {schoolMasterData.religions.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_religion"
                    value="Religion"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_religion?.message ||
                      backendErrors.appl_religion?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_sex"
                    placeholder="Gender"
                    {...register("appl_sex", {
                      required: "Gender is required",
                    })}
                  >
                    <option value="">Gender</option>
                    {schoolMasterData.genders.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_sex"
                    value="Gender"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_sex?.message || backendErrors.appl_sex?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_dob"
                    type="date"
                    max={today}
                    placeholder="Date of Birth"
                    {...register("appl_dob", {
                      required: "required",
                      validate: {
                        validDate: (value) => {
                          const dob = new Date(value);
                          const today = new Date();

                          if (dob >= today) {
                            return "Date of Birth must be in the past";
                          }

                          let age = today.getFullYear() - dob.getFullYear();
                          const m = today.getMonth() - dob.getMonth();
                          if (
                            m < 0 ||
                            (m === 0 && today.getDate() < dob.getDate())
                          ) {
                            age--; // Adjust for month/day
                          }

                          if (age < 5 || age > 25) {
                            return "Age must be between 5 and 25 years";
                          }
                          return true;
                        },
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_dob"
                    value="Date of Birth"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_dob?.message || backendErrors.appl_dob?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_reg_no"
                    type="text"
                    placeholder="Registration No."
                    {...register("appl_reg_no", {
                      required: "Registration no. required",
                      pattern: {
                        value: /^[A-Za-z0-9\-\/]+$/, // Allows letters, numbers, '-' and '/'
                        message:
                          "Only letters, numbers, '-' and '/' are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_reg_no", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_reg_no"
                    value="Registration No."
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_reg_no?.message ||
                      backendErrors.appl_reg_no?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_sec"
                    type="text"
                    placeholder="Section"
                    {...register("appl_sec", {
                      required: "Section is required",
                      maxLength: {
                        value: 1,
                        message: "Section cannot have more then 1 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\/]+$/, // Allows only letters and spaces
                        message: "Only alphabetic characters are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_sec", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_sec"
                    value="Section"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_sec?.message || backendErrors.appl_sec?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_roll_no"
                    type="text"
                    placeholder="Roll No."
                    {...register("appl_roll_no", {
                      required: "Roll no. is required",
                      pattern: {
                        value: /^[0-9]+$/, // only digits allowed
                        message: "Only numeric characters are allowed",
                      },
                      minLength: {
                        value: 1, // example minimum length
                        message: "Roll number must be at least 1 digit",
                      },
                      maxLength: {
                        value: 3, // example maximum length
                        message: "Roll number cannot exceed 8 digits",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_roll_no"
                    value="Roll No."
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_roll_no?.message ||
                      backendErrors.appl_roll_no?.[0]
                    }
                  />
                </div>
              </div>
              {/* Contact Details */}
              <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 mt-8 flex items-center gap-2 rounded-md">
                <FaLocationDot />
                &nbsp;&nbsp;&nbsp;Contact Details
              </h2>
              {/* Contact Details First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="relative">
                  <TextInput
                    id="appl_premisis_no"
                    type="text"
                    placeholder="Premisis No. & Locality/Road"
                    {...register("appl_premisis_no", {
                      maxLength: {
                        value: 255,
                        message: "Premisis cant have more than 255 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9\s\-\/]+$/, // letters, digits, space, slash, hyphen
                        message:
                          "Only letters, numbers, spaces, '-' and '/' are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_premisis_no", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_premisis_no"
                    value="Premisis No. & Locality/Road"
                  />
                  <InputError
                    message={
                      errors.appl_premisis_no?.message ||
                      backendErrors.appl_premisis_no?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_city"
                    type="text"
                    placeholder="City/Town/Village"
                    {...register("appl_city", {
                      required: "City/Town/Village is required",
                      maxLength: {
                        value: 255,
                        message: "Premisis cant have more than 255 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9\s\-\/]+$/, // Allows letters, numbers, '-' and '/'
                        message:
                          "Only letters, numbers, '-' and '/' are allowed",
                      },
                      onBlur: (e) => {
                        const trimmed = e.target.value.trim();
                        setValue("appl_city", trimmed, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_city"
                    value="City/Town/Village"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_city?.message || backendErrors.appl_city?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_po"
                    type="text"
                    placeholder="Post Office"
                    {...register("appl_po", {
                      required: "Post Office is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/, // Allows letters and space
                        message: "Only letters are allowed",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_po"
                    value="Post Office"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_po?.message || backendErrors.appl_po?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_pin"
                    type="text"
                    maxLength="6"
                    placeholder="Pincode"
                    {...register("appl_pin", {
                      required: "required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numeric characters are allowed",
                      },
                      minLength: {
                        value: 6,
                        message: "PIN must be exactly 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "PIN must be exactly 6 digits",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_pin"
                    value="Pincode"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_pin?.message || backendErrors.appl_pin?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_dist"
                    {...register("appl_dist", {
                      required: "District is required",
                    })}
                    onChange={(e) => {
                      const selectedDistrictId = e.target.value;
                      fetchBlocks(selectedDistrictId); // 👈 Call Laravel API here
                    }}
                  >
                    <option value="">District</option>
                    {schoolMasterData.districts.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_dist"
                    value="District"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_dist?.message || backendErrors.appl_dist?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <SelectInput
                    className="dark:bg-gray-900"
                    id="appl_block"
                    {...register("appl_block", {
                      required: "Block is required",
                    })}
                  >
                    <option value="">Block</option>
                    {blockData ? (
                      blockData.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.desc}
                        </option>
                      ))
                    ) : (
                      <option disabled>No blocks available</option>
                    )}
                  </SelectInput>
                  <InputLabel
                    htmlFor="appl_block"
                    value="Block/Municipality"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_block?.message ||
                      backendErrors.appl_block?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_ps"
                    type="text"
                    placeholder="Police Station"
                    {...register("appl_ps", {
                      required: "Police station is reuired",
                      pattern: {
                        value: /^[A-Za-z\s]+$/, // Allows letters and space
                        message: "Only letters are allowed",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_ps"
                    value="Police Station"
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_ps?.message || backendErrors.appl_ps?.[0]
                    }
                  />
                </div>

                <div className="relative">
                  <TextInput
                    id="appl_mob"
                    type="text"
                    maxLength="10" //
                    placeholder="Mobile No."
                    onInput={(e) => {
                      let digits = e.target.value.replace(/[^0-9]/g, "");
                      if (digits.length > 10) {
                        digits = digits.slice(0, 10);
                      }
                      e.target.value = digits;
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const paste = e.clipboardData
                        .getData("text")
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      e.target.value = paste;
                    }}
                    {...register("appl_mob", {
                      required: "Mobile No. is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only number allowed",
                      },
                      minLength: {
                        value: 10,
                        message: "Mobile number must be exactly 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Mobile number must be exactly 10 digits",
                      },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_mob"
                    value="Mobile No."
                    mandatory={true}
                  />
                  <InputError
                    message={
                      errors.appl_mob?.message || backendErrors.appl_mob?.[0]
                    }
                  />
                </div>
              </div>
              {/* Declaration */}
              <h2 className="bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800 text-lg font-semibold px-4 py-2 mt-8 flex items-center gap-2 rounded-md">
                <GrDocumentText />
                &nbsp;&nbsp;&nbsp;Declaration
              </h2>
              <div className="flex flex-col mt-4">
                <div className="flex flex-wrap items-start gap-2">
                  <div className="relative">
                    <SelectInput
                      className="dark:bg-gray-900"
                      id="appl_already_received"
                      {...register("appl_already_received", {
                        required: "Select Yes Or No",
                      })}
                    >
                      <option value="">Already received Bi-cycle</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </SelectInput>
                    <InputLabel
                      htmlFor="appl_already_received"
                      value="Already received Bi-cycle"
                      mandatory={true}
                    />
                    <InputError
                      message={
                        errors.appl_already_received?.message ||
                        backendErrors.appl_already_received?.[0]
                      }
                    />
                  </div>
                  {applAlreadyReceived === "1" && (
                    <div className="relative">
                      <TextInput
                        id="appl_scheme_name"
                        name="appl_scheme_name"
                        placeholder="Scheme Name"
                        {...register("appl_scheme_name", {
                          required: "Scheme name is required",
                        })}
                      />
                      <InputLabel
                        htmlFor="appl_scheme_name"
                        value="Scheme Name"
                        mandatory={true}
                      />
                      <InputError
                        message={
                          errors.appl_scheme_name?.message ||
                          backendErrors.appl_scheme_name?.[0]
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-center">
                <div className="flex flex-row my-1.5 justify-center dark:text-white">
                  <input
                    type="checkbox"
                    id="appl_check"
                    {...register("appl_check", {
                      required: "Declaration is required",
                    })}
                  />
                  &nbsp;&nbsp;&nbsp;I hereby declare that all particular's of
                  student profile have been verified and only correct data have
                  been provided.
                </div>
                <InputError
                  message={
                    errors.appl_check?.message || backendErrors.appl_check?.[0]
                  }
                />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  type="reset"
                  onClick={() => reset()}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          {showModal && (
            <MsgDisplayModal
              msg={successMessage}
              applicantId={applicantId}
              setShowModal={setShowModal}
              setSuccessMessage={setSuccessMessage}
              phaseId={phaseId}
            />
          )}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
        </section>
        {/* Main Content */}
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
      {/* Modal section */}
    </>
  );
}

export default StudentAdd;
