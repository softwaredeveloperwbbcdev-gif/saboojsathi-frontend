import React, { useState } from "react";
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
} from "lucide-react";

const GrievancePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null); // 'student' or 'public'
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    type: "",
    description: "",
    file: null,
  });

  const handleUserTypeSelect = (type) => {
    if (type === "student") {
      // Redirect to student login page
      navigate("/student-login");
    } else {
      setUserType("public");
    }
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

      <div className="max-w-4xl mx-auto px-6 -mt-12">
        {/* --- IDENTITY SELECTION --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => handleUserTypeSelect("student")}
            className={`flex-1 flex items-center gap-4 p-6 rounded-[2rem] transition-all ${
              userType === "student"
                ? "bg-emerald-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-emerald-50"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${userType === "student" ? "bg-white/20" : "bg-white shadow-sm text-emerald-600"}`}
            >
              <User size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                I am a
              </p>
              <h3 className="font-black text-lg">STUDENT</h3>
            </div>
          </button>

          <button
            onClick={() => handleUserTypeSelect("public")}
            className={`flex-1 flex items-center gap-4 p-6 rounded-[2rem] transition-all ${
              userType === "public"
                ? "bg-emerald-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-emerald-50"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${userType === "public" ? "bg-white/20" : "bg-white shadow-sm text-emerald-600"}`}
            >
              <Users size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                I am a
              </p>
              <h3 className="font-black text-lg">PUBLIC USER</h3>
            </div>
          </button>
        </div>

        {/* --- PUBLIC GRIEVANCE FORM --- */}
        {userType === "public" && (
          <form className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-gray-900 px-10 py-6 text-white flex items-center gap-3">
              <AlertCircle className="text-yellow-400" size={20} />
              <h2 className="text-sm font-black uppercase tracking-widest">
                Public Complaint Form
              </h2>
            </div>

            <div className="p-10 space-y-8">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Name of Complainant"
                  icon={<User size={16} />}
                  placeholder="Enter your full name"
                />
                <FormInput
                  label="Mobile No"
                  icon={<Phone size={16} />}
                  placeholder="10-digit mobile number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Email ID"
                  icon={<Mail size={16} />}
                  placeholder="yourname@email.com"
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                    Grievance Type
                  </label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none transition-all cursor-pointer">
                      <option value="">Select Category</option>
                      <option>SCHOOL NAME NOT REGISTERED</option>
                      <option>STUDENT NOT REGISTERED</option>
                      <option>BI-CYCLE NOT DISTRIBUTED</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <MessageSquare size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                  Description of Grievance
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] px-6 py-5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Describe your issue in detail..."
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                  Supporting Document (If any)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer group">
                  <input type="file" id="file" className="hidden" />
                  <label htmlFor="file" className="cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs font-bold text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">
                      PDF, JPG or PNG (Max 2MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
                >
                  <Send size={18} /> Submit Grievance
                </button>
              </div>
            </div>
          </form>
        )}

        {/* --- PLACEHOLDER FOR INITIAL STATE --- */}
        {!userType && (
          <div className="bg-white rounded-[3rem] border-2 border-dashed border-gray-200 p-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase">
              Select User Type
            </h3>
            <p className="text-gray-400 text-sm max-w-xs font-medium mt-2">
              Please identify yourself as a Student or Public User to proceed
              with the complaint registration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Input Component
const FormInput = ({ label, icon, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600">
        {icon}
      </div>
      <input
        type={type}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-300"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default GrievancePage;
