import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Users,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Upload,
  Send,
  AlertCircle,
  X,
  Search, // Added Search icon
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

const GrievancePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  // Dynamic Data States
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);

  // Form Logic States
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  useEffect(() => {
    if (userType === "public") {
      const fetchSettings = async () => {
        try {
          const response = await axios.get("/api/getGrievanceType");
          if (response.data.status) {
            setGrievanceTypes(response.data.types || []);
            setPriorities(response.data.priorities || []);
          }
        } catch (err) {
          console.error("Error fetching dropdowns:", err);
        }
      };
      fetchSettings();
    }
  }, [userType]);

  const handleUserTypeSelect = (type) => {
    if (type === "student") {
      navigate("/student-login");
    } else {
      setUserType("public");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      name: file.name,
      isPdf: file.type === "application/pdf",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.append("user_type", 1);
    files.forEach((fileObj) => {
      formData.append("documents[]", fileObj.file);
    });

    try {
      const response = await axios.post("/api/lodgeGrievance", formData);
      setSubmittedTicket(response.data.data.ticket_no);
      setFiles([]);
      e.target.reset();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const SuccessModal = ({ ticketNo, onClose }) => {
    const [copied, setCopied] = useState(false);
    if (!ticketNo) return null;

    const handleCopy = () => {
      navigator.clipboard.writeText(ticketNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
          <div className="bg-emerald-600 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
              <Send className="text-emerald-600" size={28} />
            </div>
            <h2 className="text-white text-xl font-black uppercase tracking-tight">
              Submitted!
            </h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
              Your Tracking Number
            </p>
            <button
              onClick={handleCopy}
              className="group relative w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 mb-6 transition-all hover:border-emerald-400 active:scale-[0.97] overflow-hidden"
            >
              <span
                className={`block text-2xl font-mono font-black tracking-tight leading-tight break-all transition-all ${copied ? "text-emerald-600 blur-sm" : "text-gray-800"}`}
              >
                {ticketNo}
              </span>
              {copied && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-50/80 backdrop-blur-[2px]">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest animate-in slide-in-from-bottom-2">
                    COPIED!
                  </span>
                </div>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- HEADER --- */}
      <div className="bg-[#065f46] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Grievance <span className="text-yellow-400">Redressal</span>
          </h1>
          <p className="text-emerald-100/60 mt-4 font-medium uppercase text-[10px] tracking-widest">
            Official Portal for Complaint Registration
          </p>
        </div>
      </div>

      {/* --- NEW SECTION: TRACKING QUICK-LINK --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-30 mb-8">
        <div
          onClick={() => navigate("/track-grievance")}
          className="group bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2.5rem] p-1 px-1 shadow-2xl cursor-pointer hover:scale-[1.01] transition-all duration-300"
        >
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-[2.3rem] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <Search size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white font-black text-lg tracking-tight">
                  Already filed a complaint?
                </h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Check your resolution progress instantly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 group-hover:bg-emerald-500 px-6 py-3 rounded-2xl transition-all duration-500">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
                Track Status
              </span>
              <ArrowLeft
                size={16}
                className="text-emerald-400 group-hover:text-white rotate-180 transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {" "}
        {/* Removed -mt-12 here to stack properly */}
        {/* --- IDENTITY SELECTION --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <SelectionButton
            active={userType === "student"}
            onClick={() => handleUserTypeSelect("student")}
            icon={<User size={24} />}
            label="STUDENT"
          />
          <SelectionButton
            active={userType === "public"}
            onClick={() => handleUserTypeSelect("public")}
            icon={<Users size={24} />}
            label="PUBLIC USER"
          />
        </div>
        {/* --- FORMS --- */}
        {userType === "public" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
          >
            <div className="bg-gray-900 px-10 py-6 text-white flex items-center gap-3">
              <AlertCircle className="text-yellow-400" size={20} />
              <h2 className="text-sm font-black uppercase tracking-widest">
                Public Complaint Form
              </h2>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  name="complainant_name"
                  label="Name"
                  icon={<User size={16} />}
                  placeholder="Full name"
                  error={errors.name}
                />
                <FormInput
                  name="contact_no"
                  label="Mobile"
                  icon={<Phone size={16} />}
                  placeholder="10-digit number"
                  error={errors.mobile}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  name="email_id"
                  label="Email"
                  icon={<Mail size={16} />}
                  placeholder="email@example.com"
                  error={errors.email}
                />
                <FormInput
                  name="subject"
                  label="Subject"
                  icon={<FileText size={16} />}
                  placeholder="Brief topic"
                  error={errors.subject}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Dropdown
                  name="grievance_type_id"
                  label="Type"
                  icon={<MessageSquare size={16} />}
                  options={grievanceTypes}
                  error={errors.grievance_type_id}
                />
                <Dropdown
                  name="priority_id"
                  label="Priority"
                  icon={<AlertTriangle size={16} />}
                  options={priorities}
                  error={errors.priority_id}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className={`w-full bg-gray-50 border ${errors.description ? "border-red-300" : "border-gray-100"} rounded-[2rem] px-6 py-5 text-sm font-medium outline-none transition-all resize-none`}
                  placeholder="Details..."
                />
                {errors.description && (
                  <p className="text-red-500 text-[10px] font-bold uppercase ml-4">
                    {errors.description[0]}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex justify-between">
                  Documents <span>{files.length} Selected</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-[2rem] p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    name="attachments[]"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,image/*"
                  />
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-500">
                    Upload documents or images
                  </p>
                </div>
                {files.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    {files.map((fileObj) => (
                      <div
                        key={fileObj.id}
                        className="relative bg-gray-50 rounded-2xl p-3 border border-gray-100 group"
                      >
                        <button
                          type="button"
                          onClick={() => removeFile(fileObj.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                        {fileObj.preview ? (
                          <img
                            src={fileObj.preview}
                            alt="preview"
                            className="w-full h-24 object-cover rounded-xl shadow-sm"
                          />
                        ) : (
                          <div className="w-full h-24 flex items-center justify-center text-emerald-600">
                            <FileText size={32} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all uppercase text-xs tracking-[0.2em]"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <Send size={18} /> Submit Grievance
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        {!userType && (
          <div className="bg-white rounded-[3rem] border-2 border-dashed border-gray-200 p-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase">
              Select User Type
            </h3>
            <p className="text-gray-400 text-sm max-w-xs font-medium mt-2">
              Identify yourself to proceed.
            </p>
          </div>
        )}
      </div>
      <SuccessModal
        ticketNo={submittedTicket}
        onClose={() => {
          setSubmittedTicket(null);
          setUserType(null);
        }}
      />
    </div>
  );
};

// Helper Components (SelectionButton, FormInput, Dropdown remain similar to your original code but kept clean)
const SelectionButton = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 flex items-center gap-4 p-6 rounded-[2rem] transition-all ${active ? "bg-emerald-600 text-white shadow-xl scale-[1.02]" : "bg-gray-50 text-gray-600 hover:bg-emerald-50"}`}
  >
    <div
      className={`p-3 rounded-xl ${active ? "bg-white/20" : "bg-white shadow-sm text-emerald-600"}`}
    >
      {icon}
    </div>
    <div className="text-left">
      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
        I am a
      </p>
      <h3 className="font-black text-lg">{label}</h3>
    </div>
  </button>
);

const FormInput = ({
  label,
  icon,
  placeholder,
  name,
  type = "text",
  error,
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600/50">
        {icon}
      </div>
      <input
        name={name}
        type={type}
        className={`w-full bg-gray-50 border ${error ? "border-red-300" : "border-gray-100"} rounded-2xl px-12 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="text-red-500 text-[10px] font-bold uppercase ml-4">
        {error[0]}
      </p>
    )}
  </div>
);

const Dropdown = ({ label, icon, name, options = [], error }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        className={`w-full bg-gray-50 border ${error ? "border-red-300" : "border-gray-100"} rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer`}
      >
        <option value="">Select {label}</option>
        {options?.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name || opt.type_name || opt.priority_name}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="text-red-500 text-[10px] font-bold uppercase ml-4">
        {error[0]}
      </p>
    )}
  </div>
);

export default GrievancePage;
