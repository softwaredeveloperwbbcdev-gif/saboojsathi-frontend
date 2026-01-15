import React from "react";
import {
  HiUser,
  HiMapPin,
  HiDocumentCheck,
  HiXMark,
  HiIdentification,
  HiAcademicCap,
} from "react-icons/hi2";

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

const DetailField = ({ label, value, mandatory }) => (
  <div className="relative group">
    <div className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-medium">
      {value || "N/A"}
    </div>
    <label className="absolute -top-2.5 left-3 px-1 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-all">
      {label} {mandatory && <span className="text-red-500">*</span>}
    </label>
  </div>
);

function StudentView({ student, closeHandler }) {
  if (!student) return null;

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-950 rounded-3xl shadow-2xl w-full max-h-[95vh] overflow-hidden flex flex-col border border-white dark:border-gray-800">
      {/* --- MODAL HEADER --- */}
      <div className="p-6 md:p-8 flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Student Profile Details
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400 font-medium">
            Applicant ID:{" "}
            <span className="text-teal-600 dark:text-teal-400">
              #{student.id}
            </span>
          </p>
        </div>
        <button
          onClick={closeHandler}
          className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 active:scale-90"
          aria-label="Close modal"
        >
          <HiXMark className="text-2xl" />
        </button>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
        {/* --- APPLICANT PROFILE CARD --- */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <SectionHeader
            icon={HiUser}
            title="Applicant Profile"
            subtitle="Personal and academic identification details"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
            <DetailField
              label="Applicant Name"
              value={student.name}
              mandatory
            />
            <DetailField
              label="Guardian Name"
              value={student.guardian}
              mandatory
            />
            <DetailField
              label="Relationship"
              value={student.relationship}
              mandatory
            />
            <DetailField label="Date of Birth" value={student.dob} mandatory />
            <DetailField label="Gender" value={student.gender} mandatory />
            <DetailField label="Caste" value={student.caste} mandatory />
            <DetailField label="Religion" value={student.religion} mandatory />
            <DetailField
              label="Board/Council"
              value={student.board}
              mandatory
            />
            <DetailField label="Section" value={student.section} mandatory />
            <DetailField label="Roll No." value={student.roll} mandatory />
            <DetailField
              label="Registration No."
              value={student.regNo}
              mandatory
            />
          </div>
        </div>

        {/* --- CONTACT INFORMATION CARD --- */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <SectionHeader
            icon={HiMapPin}
            title="Contact Information"
            subtitle="Residential and communication addresses"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
            <div className="lg:col-span-2">
              <DetailField
                label="Premises No. & Locality"
                value={student.premisis}
              />
            </div>
            <DetailField
              label="City/Town/Village"
              value={student.cityVillage}
              mandatory
            />
            <DetailField label="Post Office" value={student.po} mandatory />
            <DetailField
              label="District"
              value={student.stuDistrict}
              mandatory
            />
            <DetailField
              label="Block/Municipality"
              value={student.stuBlock}
              mandatory
            />
            <DetailField label="Police Station" value={student.ps} mandatory />
            <DetailField label="Pincode" value={student.pin} mandatory />
            <DetailField label="Mobile No." value={student.mobile} mandatory />
          </div>
        </div>

        {/* --- DECLARATION CARD --- */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <SectionHeader
            icon={HiDocumentCheck}
            title="Benefit Declaration"
            subtitle="Verification of previous cycle distribution"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-center ${
                student.cycleRecived === "Yes"
                  ? "bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
              }`}
            >
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Cycle Received?
              </span>
              <span
                className={`text-lg font-bold ${
                  student.cycleRecived === "Yes"
                    ? "text-teal-700 dark:text-teal-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {student.cycleRecived}
              </span>
            </div>
            {student.cycleRecived === "Yes" && (
              <DetailField
                label="Scheme Name"
                value={student.cycleRecivedScheme}
                mandatory
              />
            )}
          </div>
        </div>
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-center md:justify-end gap-4">
        <button
          onClick={closeHandler}
          className="w-full md:w-48 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-teal-200 dark:shadow-none transition-all active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default StudentView;
