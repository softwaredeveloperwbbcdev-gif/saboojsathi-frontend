import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  HiUser,
  HiMapPin,
  HiDocumentCheck,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import TextInput from "../../../Components/TextInput";
import SelectInput from "../../../Components/SelectInput";
import MsgDisplayModal from "../../../Components/MsgDisplayModal";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
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
  const [backendErrors, setBackendErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    setLoading(true);
    const response = await callApi("GET", "studentform");
    if (!response.error) setSchoolMasterData(response.data);
    else toast.error(response.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchBlocks = async (districtId) => {
    const response = await callApi("GET", `getBlock/${btoa(districtId)}`);
    if (!response.error) setBlockData(response.data);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { appl_class: "1", phaseId: phaseId },
  });

  const applAlreadyReceived = watch("appl_already_received");

  const formSubmit = async (data) => {
    setLoading(true);
    setBackendErrors({});
    try {
      const response = await callApi("POST", "studentregistration", data);
      if (response.error) {
        if (response.message === "Validation Errors")
          setBackendErrors(response.errors);
        else toast.error(response.message);
      } else {
        reset();
        setSuccessMessage(response.message);
        setApplicantId(response.data);
        setShowModal(true);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      <section className="p-4 md:p-8 lg:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen">
        {/* Breadcrumb & Heading */}
        <div className="2xl:ml-40 mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Fresh Application Registration
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
                icon={HiUser}
                title="Applicant Profile"
                subtitle="Personal and academic identification details"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
                {/* 1. Applicant's Name */}
                <div className="relative group">
                  <TextInput
                    id="appl_name"
                    placeholder="Full Name"
                    {...register("appl_name", {
                      required: "Full name required",
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
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_name?.message || backendErrors.appl_name?.[0]
                    }
                  />
                </div>

                {/* 2. Guardian's Name */}
                <div className="relative group">
                  <TextInput
                    id="appl_g_name"
                    placeholder="Full Name"
                    {...register("appl_g_name", {
                      required: "Guardian's full name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Letters only",
                      },
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

                {/* 3. Guardian's Relationship */}
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
                    value="Guardian's Relationship"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_g_relation?.message ||
                      backendErrors.appl_g_relation?.[0]
                    }
                  />
                </div>

                {/* 4. Date of Birth */}
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
                  <InputError
                    message={
                      errors.appl_dob?.message || backendErrors.appl_dob?.[0]
                    }
                  />
                </div>

                {/* 5. Gender */}
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
                  <InputError
                    message={
                      errors.appl_sex?.message || backendErrors.appl_sex?.[0]
                    }
                  />
                </div>

                {/* 6. Caste */}
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
                  <InputError
                    message={
                      errors.appl_cast?.message || backendErrors.appl_cast?.[0]
                    }
                  />
                </div>

                {/* 7. Religion */}
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
                  <InputError
                    message={
                      errors.appl_religion?.message ||
                      backendErrors.appl_religion?.[0]
                    }
                  />
                </div>

                {/* 8. Board/Council - NEW FIELD ADDED HERE */}
                <div className="relative group">
                  <SelectInput
                    id="appl_board_council"
                    {...register("appl_board_council", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Board/Council</option>
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

                {/* 9. Current Class */}
                <div className="relative group">
                  <SelectInput
                    id="appl_class"
                    {...register("appl_class")}
                    disabled
                    className="bg-gray-50 opacity-70 cursor-not-allowed"
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

                {/* 10. Section */}
                <div className="relative group">
                  <TextInput
                    id="appl_sec"
                    placeholder="e.g. A"
                    maxLength="1"
                    {...register("appl_sec", {
                      required: "Required",
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Alphabets only",
                      },
                    })}
                  />
                  <InputLabel htmlFor="appl_sec" value="Section" mandatory />
                  <InputError
                    message={
                      errors.appl_sec?.message || backendErrors.appl_sec?.[0]
                    }
                  />
                </div>

                {/* 11. Roll No. */}
                <div className="relative group">
                  <TextInput
                    id="appl_roll_no"
                    placeholder="e.g. 05"
                    {...register("appl_roll_no", {
                      required: "Required",
                      pattern: { value: /^[0-9]+$/, message: "Numeric only" },
                    })}
                  />
                  <InputLabel
                    htmlFor="appl_roll_no"
                    value="Roll No."
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_roll_no?.message ||
                      backendErrors.appl_roll_no?.[0]
                    }
                  />
                </div>

                {/* 12. Registration No. */}
                <div className="relative group">
                  <TextInput
                    id="appl_reg_no"
                    placeholder="Registration ID"
                    {...register("appl_reg_no", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_reg_no"
                    value="Registration No."
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_reg_no?.message ||
                      backendErrors.appl_reg_no?.[0]
                    }
                  />
                </div>
              </div>
            </div>

            {/* --- CONTACT DETAILS CARD --- */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <SectionHeader
                icon={HiMapPin}
                title="Contact Information"
                subtitle="Residential and communication addresses"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
                {/* Premisis No. & Locality/Road */}
                <div className="relative group lg:col-span-2">
                  <TextInput
                    id="appl_premisis_no"
                    placeholder="House No / Street Name"
                    {...register("appl_premisis_no", {
                      maxLength: { value: 255, message: "Too long" },
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

                {/* City/Town/Village - Renamed */}
                <div className="relative group">
                  <TextInput
                    id="appl_city"
                    placeholder="Enter City/Town/Village"
                    {...register("appl_city", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_city"
                    value="City/Town/Village"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_city?.message || backendErrors.appl_city?.[0]
                    }
                  />
                </div>

                {/* Post Office - Added */}
                <div className="relative group">
                  <TextInput
                    id="appl_po"
                    placeholder="Post Office"
                    {...register("appl_po", { required: "Required" })}
                  />
                  <InputLabel htmlFor="appl_po" value="Post Office" mandatory />
                  <InputError
                    message={
                      errors.appl_po?.message || backendErrors.appl_po?.[0]
                    }
                  />
                </div>

                {/* District */}
                <div className="relative">
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
                  <InputError
                    message={
                      errors.appl_dist?.message || backendErrors.appl_dist?.[0]
                    }
                  />
                </div>

                {/* Block/Municipality */}
                <div className="relative">
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
                  <InputError
                    message={
                      errors.appl_block?.message ||
                      backendErrors.appl_block?.[0]
                    }
                  />
                </div>

                {/* Police Station - Added */}
                <div className="relative group">
                  <TextInput
                    id="appl_ps"
                    placeholder="Police Station"
                    {...register("appl_ps", { required: "Required" })}
                  />
                  <InputLabel
                    htmlFor="appl_ps"
                    value="Police Station"
                    mandatory
                  />
                  <InputError
                    message={
                      errors.appl_ps?.message || backendErrors.appl_ps?.[0]
                    }
                  />
                </div>

                {/* Pincode - Added */}
                <div className="relative group">
                  <TextInput
                    id="appl_pin"
                    maxLength="6"
                    placeholder="6 Digit PIN"
                    {...register("appl_pin", {
                      required: "Required",
                      pattern: { value: /^[0-9]{6}$/, message: "Invalid PIN" },
                    })}
                  />
                  <InputLabel htmlFor="appl_pin" value="Pincode" mandatory />
                  <InputError
                    message={
                      errors.appl_pin?.message || backendErrors.appl_pin?.[0]
                    }
                  />
                </div>

                {/* Mobile No. */}
                <div className="relative group">
                  <TextInput
                    id="appl_mob"
                    maxLength="10"
                    placeholder="10 Digit Mobile"
                    {...register("appl_mob", {
                      required: "Required",
                      minLength: { value: 10, message: "10 digits required" },
                    })}
                  />
                  <InputLabel htmlFor="appl_mob" value="Mobile No." mandatory />
                  <InputError
                    message={
                      errors.appl_mob?.message || backendErrors.appl_mob?.[0]
                    }
                  />
                </div>
              </div>
            </div>

            {/* --- DECLARATION & SUBMIT --- */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <SectionHeader
                icon={HiDocumentCheck}
                title="Declaration"
                subtitle="Final review and verification"
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

                <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl cursor-pointer group hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    {...register("appl_check", { required: true })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    I hereby declare that all particulars of the student profile
                    have been verified and I confirm that the data provided is
                    accurate.
                  </span>
                </label>
                <InputError
                  message={
                    errors.appl_check && "You must accept the declaration"
                  }
                />

                <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-48 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Submit Application"}
                  </button>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="w-full md:w-48 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-bold py-4 rounded-2xl transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* MODALS */}
        {showModal && (
          <MsgDisplayModal
            msg={successMessage}
            applicantId={applicantId}
            setShowModal={setShowModal}
            setSuccessMessage={setSuccessMessage}
            phaseId={phaseId}
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

        {/* LOADING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-teal-600 font-bold animate-pulse">
              Saving Student Profile...
            </p>
          </div>
        )}
      </section>
    </AdminAuthenticatedLayout>
  );
}

export default StudentAdd;
