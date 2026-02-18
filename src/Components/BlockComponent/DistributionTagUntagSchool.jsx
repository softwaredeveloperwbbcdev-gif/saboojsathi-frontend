import { useState, useEffect } from "react";
import {
  School,
  Users,
  Search,
  AlertCircle,
  Loader2,
  Check,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../../Hooks/useApi";
import { phaseYearId, defaultPhaseYear } from "../../Utils/Constants/Constants";

const DistributionTagUntagSchool = ({
  centerDetails,
  phaseId,
  location,
  onRefresh,
  onClose,
}) => {
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const id = user.internal_code;

  const { callApi } = useApi();

  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getBlockWiseSchoolList = async () => {
      const deliveryData = { phaseId, locationId: btoa(id) };
      setLoading(true);
      try {
        const response = await callApi(
          "POST",
          "/getUntaggedSchoolList",
          deliveryData,
        );
        if (!response.error && response.data?.schoolList) {
          setSchoolList(response.data.schoolList);
        }
      } catch (err) {
        toast.error("Failed to load school list");
      } finally {
        setLoading(false);
      }
    };

    getBlockWiseSchoolList();
  }, [phaseId, id, centerDetails]);

  const handleCheckboxChange = (schoolId) => {
    setSelectedIds((prev) =>
      prev.includes(schoolId)
        ? prev.filter((i) => i !== schoolId)
        : [...prev, schoolId],
    );
  };

  const handleSchoolTag = async () => {
    setIsSubmitting(true);
    const dataSet = {
      phaseId,
      schoolIds: [...selectedIds],
      locationId: location,
    };

    try {
      const response = await callApi(
        "POST",
        "/tagSchoolWithDeliveryPoint",
        dataSet,
      );
      if (!response.error) {
        toast.success(`Successfully tagged ${selectedIds.length} schools`);
        onRefresh?.();
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSchools = schoolList.filter(
    (s) =>
      s.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.schcd.includes(searchTerm),
  );

  return (
    <div className="flex flex-col h-[85vh] md:h-[70vh] bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg">
            <School size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Tag Schools to Delivery Point
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <MapPin size={14} className="text-orange-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {centerDetails?.location_name || "Selected Center"}
              </span>
              <span>• Phase {phaseDetails.phaseName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 bg-white dark:bg-slate-900">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by School Name or DISE code..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-teal-500 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 custom-scrollbar">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest">
              Loading Schools...
            </p>
          </div>
        ) : filteredSchools.length > 0 ? (
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 z-10">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 w-12">#</th>
                  <th className="px-4 py-3 w-12">Select</th>
                  <th className="px-4 py-3">School Info</th>
                  <th className="px-4 py-3 text-center">Enrollment</th>
                  <th className="px-4 py-3 text-center font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSchools.map((school, idx) => (
                  <tr
                    key={school.school_id}
                    className={`hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors ${
                      selectedIds.includes(school.school_id)
                        ? "bg-teal-50/30 dark:bg-teal-900/5"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                        checked={selectedIds.includes(school.school_id)}
                        onChange={() => handleCheckboxChange(school.school_id)}
                        disabled={!school.total}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs truncate max-w-[250px]">
                        {school.school_name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {school.schcd}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3 text-[10px] font-bold">
                        <span className="text-blue-600">B: {school.boys}</span>
                        <span className="text-pink-600">G: {school.girls}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                        {school.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 opacity-60">
            <AlertCircle size={40} />
            <p className="text-sm font-bold tracking-tight">
              No Schools Available to Tag
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900">
        <div className="text-sm">
          {selectedIds.length > 0 ? (
            <span className="text-teal-600 dark:text-teal-400 font-bold">
              {selectedIds.length} schools selected for tagging
            </span>
          ) : (
            <span className="text-slate-400">Select schools from the list</span>
          )}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onClose}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!selectedIds.length || isSubmitting}
            onClick={handleSchoolTag}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            Confirm Tagging
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistributionTagUntagSchool;
