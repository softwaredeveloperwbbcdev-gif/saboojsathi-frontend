import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Calendar,
  ShieldCheck,
  RefreshCw,
  LogIn,
  Lock,
  Loader2,
} from "lucide-react";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    applicantId: "",
    dob: "",
    captchaInput: "",
  });

  const fetchCaptcha = async () => {
    try {
      setCaptcha("....");
      const response = await axios.post("/api/captcha", { type: "applicant" });
      if (response.data) {
        const fullQuestion = response.data.question;
        const codeOnly = fullQuestion.split(": ")[1] || fullQuestion;
        setCaptcha(codeOnly);
        setCaptchaKey(response.data.key);
        setUserInput((prev) => ({ ...prev, captchaInput: "" }));
      }
    } catch (err) {
      setCaptcha("ERR!");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/checkApplicantExist", {
        applicant_id: userInput.applicantId,
        date_of_birth: userInput.dob,
        captcha: userInput.captchaInput,
        captcha_key: captchaKey,
      });

      if (response.data.status) {
        navigate("/student-dashboard", {
          state: { id: response.data.applicant_id },
        });
      } else {
        setError(response.data.message || "Access Denied");
        fetchCaptcha();
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const serverErrors = err.response.data.errors;
        const firstErrorKey = Object.keys(serverErrors)[0];
        setError(serverErrors[firstErrorKey][0]);
      } else {
        setError("Network connection issue.");
      }
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans selection:bg-emerald-100">
      {/* --- PREMIUM HEADER --- */}
      <div className="bg-gradient-to-br from-[#064e3b] to-[#065f46] pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/"
            className="text-emerald-300/80 hover:text-white flex items-center gap-2 text-[10px] font-black mb-6 uppercase tracking-[0.3em] transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Portal <span className="text-yellow-400">Login</span>
          </h1>
          <div className="h-1 w-20 bg-yellow-400 rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700"
        >
          {/* Form Top Bar */}
          <div className="bg-gray-900 px-10 py-7 text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <Lock className="text-yellow-400" size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-300">
                Secure Beneficiary Area
              </h2>
            </div>
            {error && (
              <div className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="text-red-400 text-[9px] font-black uppercase tracking-widest animate-pulse">
                  {error}
                </span>
              </div>
            )}
          </div>

          <div className="p-10 md:p-14 space-y-10">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-[0.2em]">
                  Applicant Identity
                </label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 transition-transform group-focus-within:scale-110">
                    <User size={20} strokeWidth={2.5} />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={20}
                    placeholder="20-Digit Applicant ID"
                    value={userInput.applicantId}
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2rem] px-16 py-5 text-sm font-bold text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-gray-300"
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        applicantId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-[0.2em]">
                  Date of Birth
                </label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 transition-transform group-focus-within:scale-110">
                    <Calendar size={20} strokeWidth={2.5} />
                  </div>
                  <input
                    type="date"
                    required
                    value={userInput.dob}
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2rem] px-16 py-5 text-sm font-bold text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all uppercase"
                    onChange={(e) =>
                      setUserInput({ ...userInput, dob: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Captcha Section */}
            <div className="space-y-5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-[0.2em]">
                Human Verification
              </label>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* GLASS CAPTCHA BOX */}
                <div className="relative w-full md:w-56 group overflow-hidden rounded-2xl shadow-xl">
                  <div className="absolute inset-0 bg-gray-900" />
                  <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px]" />
                  <div className="relative z-10 text-white font-mono text-3xl tracking-[0.4em] flex items-center justify-center py-5 select-none italic font-black">
                    {captcha}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="p-5 bg-gray-100 text-gray-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all active:rotate-180 duration-500 shadow-sm"
                >
                  <RefreshCw size={24} strokeWidth={2.5} />
                </button>

                <div className="relative flex-1 w-full group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 transition-transform group-focus-within:scale-110">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={userInput.captchaInput}
                    placeholder="Enter Code Above"
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2rem] px-16 py-5 text-sm font-bold text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all uppercase tracking-widest placeholder:tracking-normal placeholder:text-gray-300"
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
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:to-emerald-400 disabled:from-gray-400 disabled:to-gray-500 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] uppercase text-[11px] tracking-[0.3em]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Authorize & Sign In <LogIn size={20} strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            Official Congress System 2026
          </p>
          <div className="flex gap-4 opacity-30">
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
