import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  User,
  Calendar,
  Eye,
  X,
  MapPin,
  School,
  Hash,
  Database,
  SearchX,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

const SearchBeneficiary = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock Data
  const results = [
    {
      id: "19132302206220000039",
      name: "AJAY GORAI",
      guardian: "PRASANTA GORAI",
      gender: "MALE",
      class: "IX",
      date: "13-03-2023",
      school: "MODEL HIGH SCHOOL",
      block: "BANKURA-I",
      phase: "PHASE-VIII",
    },
    {
      id: "19132302206220000085",
      name: "AKASH MISHRA",
      guardian: "AKHILESH MISHRA",
      gender: "MALE",
      class: "IX",
      date: "13-03-2023",
      school: "MODEL HIGH SCHOOL",
      block: "BANKURA-I",
      phase: "PHASE-VIII",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setHasSearched(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
      {/* --- HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Search <span className="text-yellow-400">Beneficiary</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16">
        {/* --- SEARCH FILTER CARD --- */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Using basic labels/selects to match your requested clean style */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                District
              </label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                <option>Select District</option>
                <option value="bankura">BANKURA</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Block
              </label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                <option>Select Block</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                School
              </label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                <option>Select School</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Phase
              </label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                <option>Select Phase</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Class
              </label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                <option>Select Class</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-16 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Accessing Records..." : "Run Search Query"}
            </button>
          </div>
        </form>

        {/* --- DYNAMIC CONTENT --- */}
        {!hasSearched && !loading ? (
          <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
              <Database size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Ready to Search?
            </h3>
            <p className="text-gray-400 text-sm max-w-sm font-medium">
              Select criteria above to fetch records.
            </p>
          </div>
        ) : loading ? (
          <div className="bg-white rounded-[2.5rem] p-32 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">
              Accessing Secure Database...
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-5 font-black">Sl. No.</th>
                    <th className="px-6 py-5 font-black">Applicant ID</th>
                    <th className="px-6 py-5 font-black">Student Details</th>
                    <th className="px-6 py-5 font-black">Gender</th>
                    <th className="px-6 py-5 text-right font-black">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      <td className="px-6 py-5 font-mono text-gray-400 text-xs">
                        {index + 1}
                      </td>
                      <td className="px-6 py-5 font-mono font-bold text-emerald-700 text-xs">
                        {item.id}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-black text-gray-900 text-sm">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                          S/O: {item.guardian}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-xs font-bold">
                        {item.gender}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setSelectedStudent(item)}
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-600 px-4 py-2 rounded-lg font-bold text-[10px] uppercase transition-all shadow-sm"
                        >
                          <Eye size={14} /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-red-50 p-20 flex flex-col items-center text-center space-y-4">
            <SearchX size={40} className="text-red-500" />
            <h3 className="text-xl font-black text-gray-900 uppercase">
              No Records Found
            </h3>
          </div>
        )}
      </div>

      {/* --- RESTORED VIEW DETAILS MODAL --- */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedStudent(null)}
          ></div>

          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#065f46] p-8 text-white relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#065f46]">
                  <User size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> {selectedStudent.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50">
              <div className="space-y-6">
                <DetailItem
                  icon={<User size={16} />}
                  label="Guardian Name"
                  value={selectedStudent.guardian}
                />
                <DetailItem
                  icon={<Calendar size={16} />}
                  label="Distribution Date"
                  value={selectedStudent.date}
                />
                <DetailItem
                  icon={<Hash size={16} />}
                  label="Class & Phase"
                  value={`${selectedStudent.class} (${selectedStudent.phase})`}
                />
              </div>
              <div className="space-y-6">
                <SchoolDetail
                  icon={<School size={16} />}
                  label="School Name"
                  value={selectedStudent.school}
                />
                <DetailItem
                  icon={<MapPin size={16} />}
                  label="Block / Municipality"
                  value={selectedStudent.block}
                />
                <div className="pt-2">
                  <span
                    className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${selectedStudent.gender === "MALE" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}
                  >
                    Gender: {selectedStudent.gender}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---
const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 text-emerald-600 bg-emerald-50 p-2 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
    </div>
  </div>
);

const SchoolDetail = ({ icon, label, value }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 text-emerald-600 bg-emerald-50 p-2 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
    </div>
  </div>
);

export default SearchBeneficiary;
