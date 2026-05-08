import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const SearchBeneficiary = () => {
  // --- UI STATES ---
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- DATATABLE STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // --- DROPDOWN DATA STATES ---
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [blockLoading, setBlockLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolLoading, setSchoolLoading] = useState(false);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classLoading, setClassLoading] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState([]);

  // --- 1. FETCH INITIAL DATA ---
  useEffect(() => {
    const host = window.location.hostname;
    const fetchInitialData = async () => {
      try {
        const [distResponse, phaseResponse] = await Promise.all([
          axios.get(`http://${host}:8000/api/districts`),
          axios.get(`http://${host}:8000/api/phaseDetails`),
        ]);
        setDistricts(distResponse.data);
        setPhases(phaseResponse.data);
      } catch (error) {
        console.error("Error fetching initial dropdown data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // --- 2. FETCH BLOCKS ---
  useEffect(() => {
    const fetchBlocks = async () => {
      if (!selectedDistrict) {
        setBlocks([]);
        setSelectedBlock("");
        return;
      }
      setBlockLoading(true);
      try {
        const host = window.location.hostname;
        const encodedId = btoa(selectedDistrict);
        const response = await axios.get(
          `http://${host}:8000/api/getBlock/${encodedId}`,
        );
        setBlocks(response.data);
        setSelectedBlock("");
      } catch (error) {
        console.error("Error fetching blocks:", error);
      } finally {
        setBlockLoading(false);
      }
    };
    fetchBlocks();
  }, [selectedDistrict]);

  // --- 3. FETCH SCHOOLS ---
  useEffect(() => {
    const fetchSchools = async () => {
      if (!selectedBlock) {
        setSchools([]);
        setSelectedSchool("");
        return;
      }
      setSchoolLoading(true);
      try {
        const host = window.location.hostname;
        const encodedBlockId = btoa(selectedBlock);
        const response = await axios.post(
          `http://${host}:8000/api/schoolByBlock`,
          {
            blockId: encodedBlockId,
          },
        );
        setSchools(response.data);
        setSelectedSchool("");
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setSchoolLoading(false);
      }
    };
    fetchSchools();
  }, [selectedBlock]);

  // --- 4. FETCH CLASSES ---
  useEffect(() => {
    const fetchClasses = async () => {
      if (!selectedPhase) {
        setClasses([]);
        setSelectedClass("");
        return;
      }
      setClassLoading(true);
      try {
        const host = window.location.hostname;
        const encodedPhaseId = btoa(selectedPhase);
        const response = await axios.post(
          `http://${host}:8000/api/classByPhase`,
          {
            phaseId: encodedPhaseId,
          },
        );
        if (response.data.status === 200) {
          setClasses(response.data.class);
        }
        setSelectedClass("");
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setClassLoading(false);
      }
    };
    fetchClasses();
  }, [selectedPhase]);

  // --- 5. SEARCH LOGIC ---
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (
      !selectedDistrict ||
      !selectedBlock ||
      !selectedSchool ||
      !selectedPhase ||
      !selectedClass
    ) {
      alert("Please select all filters before searching.");
      return;
    }

    setSearchLoading(true);
    setCurrentPage(1); // Reset to first page on new search
    try {
      const payload = {
        distId: parseInt(selectedDistrict),
        blockId: parseInt(selectedBlock),
        schoolId: parseInt(selectedSchool),
        phaseId: parseInt(selectedPhase),
        class: selectedClass,
      };
      const host = window.location.hostname;
      const response = await axios.post(
        `http://${host}:8000/api/searchBenificiary`,
        payload,
      );
      setBeneficiaries(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Error fetching beneficiary data.");
    } finally {
      setSearchLoading(false);
    }
  };

  // --- 6. DATATABLES LOGIC (MEMOIZED) ---
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let items = [...beneficiaries];

    // Filtering
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      items = items.filter(
        (item) =>
          item.applicant_name?.toLowerCase().includes(query) ||
          item.applicant_id?.toString().includes(query) ||
          item.gurdian_name?.toLowerCase().includes(query),
      );
    }

    // Sorting
    if (sortConfig.key) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return items;
  }, [beneficiaries, searchTerm, sortConfig]);

  // Pagination Calc
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
      {/* HEADER */}
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
        {/* FILTERS FORM */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* ... Your Dropdown Selects (Dist, Block, School, Phase, Class) ... */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              >
                <option value="">Select District</option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.desc}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Block
              </label>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                disabled={!selectedDistrict || blockLoading}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              >
                <option value="">
                  {blockLoading ? "Loading..." : "Select Block"}
                </option>
                {blocks.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.desc}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                School
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                disabled={!selectedBlock || schoolLoading}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              >
                <option value="">
                  {schoolLoading ? "Loading..." : "Select School"}
                </option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.desc}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Phase
              </label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              >
                <option value="">Select Phase</option>
                {phases.map((phase) => (
                  <option key={phase.phase_id} value={phase.phase_id}>
                    {phase.phase_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                disabled={!selectedPhase || classLoading}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              >
                <option value="">
                  {classLoading ? "Loading..." : "Select Class"}
                </option>
                {classes.map((cls) => (
                  <option key={cls.code} value={cls.code}>
                    {cls.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={searchLoading}
              className="w-full md:w-auto px-16 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
            >
              {searchLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {searchLoading ? "Accessing Records..." : "Run Search Query"}
            </button>
          </div>
        </form>

        {/* DATATABLE SECTION */}
        {hasSearched && beneficiaries.length > 0 && (
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 mb-8">
            {/* DATATABLE HEADER CONTROLS */}
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Show
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {[5, 10, 25, 50].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Records
                </span>
              </div>

              <div className="relative w-full md:w-72">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Quick Search..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-5 font-black">Sl. No.</th>
                    <th
                      className="px-6 py-5 font-black cursor-pointer group"
                      onClick={() => requestSort("applicant_id")}
                    >
                      <div className="flex items-center gap-2">
                        Applicant ID{" "}
                        <ArrowUpDown
                          size={12}
                          className="opacity-40 group-hover:opacity-100"
                        />
                      </div>
                    </th>
                    <th
                      className="px-6 py-5 font-black cursor-pointer group"
                      onClick={() => requestSort("applicant_name")}
                    >
                      <div className="flex items-center gap-2">
                        Student Details{" "}
                        <ArrowUpDown
                          size={12}
                          className="opacity-40 group-hover:opacity-100"
                        />
                      </div>
                    </th>
                    <th className="px-6 py-5 font-black">Gender / Class</th>
                    <th className="px-6 py-5 font-black">Cycle Info</th>
                    <th className="px-6 py-5 text-right font-black">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map((item, index) => (
                    <tr
                      key={item.applicant_id}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      <td className="px-6 py-5 font-mono text-gray-400 text-xs">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-5 font-mono font-bold text-emerald-700 text-xs">
                        {item.applicant_id}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-black text-gray-900 text-sm">
                          {item.applicant_name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                          S/O: {item.gurdian_name}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black uppercase">
                            {item.gender}
                          </span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[9px] font-black uppercase">
                            Class {item.class}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-bold text-gray-700">
                          {item.cycle_brand}
                        </p>
                        <p className="text-[9px] text-gray-400 font-mono">
                          Frame: {item.cycle_frame}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setSelectedStudent(item)}
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-600 px-4 py-2 rounded-lg font-bold text-[10px] uppercase transition-all shadow-sm"
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Showing{" "}
                {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                {Math.min(totalItems, currentPage * itemsPerPage)} of{" "}
                {totalItems} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === page ? "bg-emerald-600 text-white" : "hover:bg-white text-gray-400"}`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY/LOADING STATES (Existing Logic) */}
        {!hasSearched && !searchLoading && (
          <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 flex flex-col items-center text-center">
            <Database size={40} className="text-emerald-600 mb-4" />
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Ready to Search?
            </h3>
          </div>
        )}
      </div>

      {/* MODAL (Existing Logic) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedStudent(null)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#065f46] p-8 text-white relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#065f46]">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    {selectedStudent.applicant_name}
                  </h2>
                  <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">
                    ID: {selectedStudent.applicant_id}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50">
              <DetailItem
                icon={<User size={16} />}
                label="Guardian"
                value={selectedStudent.gurdian_name}
              />
              <DetailItem
                icon={<Calendar size={16} />}
                label="Dist. Date"
                value={selectedStudent.distribution_date || "Not Distributed"}
              />
              <DetailItem
                icon={<School size={16} />}
                label="School"
                value={selectedStudent.school_name || "N/A"}
              />
              <DetailItem
                icon={<MapPin size={16} />}
                label="Cycle Details"
                value={`${selectedStudent.cycle_brand} - ${selectedStudent.cycle_frame}`}
              />
            </div>

            <div className="p-6 bg-white border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600"
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

export default SearchBeneficiary;
