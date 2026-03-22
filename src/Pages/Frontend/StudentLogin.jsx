import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Calendar,
  ShieldCheck,
  RefreshCw,
  LogIn,
  Lock,
} from "lucide-react";

const StudentLogin = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState({
    applicantId: "",
    dob: "",
    captchaInput: "",
  });

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.captchaInput.toUpperCase() !== captcha) {
      alert("Invalid Captcha! Please try again.");
      generateCaptcha();
      return;
    }
    console.log("Logging in...", userInput);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- HEADER (Matches Grievance Design) --- */}
      <div className="bg-[#065f46] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Student <span className="text-yellow-400">Login</span>
          </h1>
          <p className="text-emerald-100/60 mt-4 font-medium uppercase text-[10px] tracking-widest">
            Secure Access for Beneficiaries
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12">
        {/* --- LOGIN FORM CARD --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
        >
          <div className="bg-gray-900 px-10 py-6 text-white flex items-center gap-3">
            <Lock className="text-yellow-400" size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">
              Authentication Required
            </h2>
          </div>

          <div className="p-10 space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                  Applicant ID
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter 19-digit ID"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        applicantId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all uppercase"
                    onChange={(e) =>
                      setUserInput({ ...userInput, dob: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Captcha Section */}
            <div className="space-y-4 pt-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                Security Verification
              </label>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Captcha Display */}
                <div className="w-full md:w-48 bg-gray-900 text-white font-mono text-2xl tracking-[0.3em] flex items-center justify-center py-4 rounded-2xl select-none italic border-b-4 border-yellow-400">
                  {captcha}
                </div>

                {/* Refresh Button */}
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all group"
                >
                  <RefreshCw
                    size={24}
                    className="group-active:rotate-180 transition-transform duration-500"
                  />
                </button>

                {/* Captcha Input */}
                <div className="relative flex-1 w-full">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Type Captcha"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all uppercase"
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        captchaInput: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
              >
                Sign In to Portal <LogIn size={18} />
              </button>
            </div>
          </div>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Unauthorized access is strictly prohibited
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
