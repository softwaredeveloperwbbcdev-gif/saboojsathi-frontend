function StudentView({ student, closeHandler }) {
  const UserIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  return (
    student && (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full overflow-y-auto">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            Student Details for Applicant ID -{" "}
            <b className="text-teal-600 dark:text-teal-400">{student.id}</b>
          </h4>
          <button
            onClick={closeHandler}
            className="text-2xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-200"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <div className="text-white p-3 font-bold bg-teal-600 dark:bg-teal-500 rounded-lg shadow-md flex items-center mb-4">
            <UserIcon /> <span className="ml-2">Applicant's Details</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Applicant's Name
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Guardian Name
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.guardian}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Guardian Relationship
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.relationship}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Section
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.section}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Roll No.
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.roll}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Caste
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.caste}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Religion
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.religion}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Gender
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.gender}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Date of Birth
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.dob}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Reg. No.
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.regNo}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Board/Council
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.board}
              </span>
            </div>
          </div>

          <div className="text-white p-3 font-bold bg-teal-600 dark:bg-teal-500 rounded-lg shadow-md flex items-center mt-6 mb-4">
            <UserIcon /> <span className="ml-2">Contact Details</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Premisis No. & Locality/Road
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.premisis}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                City/Town/Village
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.cityVillage}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Post Office
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.po}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Pincode
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.pin}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                District
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.stuDistrict}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Block/Municipality
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.stuBlock}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Police Station
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.ps}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Mobile No.
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.mobile}
              </span>
            </div>
          </div>

          <div className="text-white p-3 font-bold bg-teal-600 dark:bg-teal-500 rounded-lg shadow-md flex items-center mt-6 mb-4">
            <UserIcon /> <span className="ml-2">Declaration</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Cycle Received
              </span>
              <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {student.cycleRecived}
              </span>
            </div>
            {student.cycleRecived === "Yes" && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Scheme Name
                </span>
                <span className="p-3 border-2 border-teal-400 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {student.cycleRecivedScheme}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default StudentView;
