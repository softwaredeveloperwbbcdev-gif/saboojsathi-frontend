import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaHome,
  FaSun,
  FaMoon,
  FaLock,
  FaUser,
  FaKey,
  FaShieldAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import LoginBg from "../../assets/images/login_bg.jpg";
import Loader from "../../Components/Loader";
import { useThemeStore } from "../../Store/themeStore";

function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [fetchingCaptcha, setFetchingCaptcha] = useState(false);
  const [captchaData, setCaptchaData] = useState({ question: "", key: "" });

  const navigate = useNavigate();
  const location = useLocation();

  // Access theme store
  const { darkMode, toggleTheme } = useThemeStore();

  const userData = location.state?.userData;
  const host = window.location.hostname;

  // FETCH CAPTCHA
  const fetchCaptcha = useCallback(async () => {
    const host = window.location.hostname;
    setFetchingCaptcha(true);
    try {
      const response = await axios.post(`http://${host}:8000/api/captcha`, {
        type: "updatepassword",
      });
      if (response.data) {
        setCaptchaData({
          question: response.data.question,
          key: response.data.key,
        });
      }
    } catch (err) {
      setCaptchaData({ question: "Error: Failed to load", key: "" });
      toast.error("Failed to load captcha");
    } finally {
      setFetchingCaptcha(false);
    }
  }, [host]);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      fetchCaptcha();
    }
  }, [userData, navigate, fetchCaptcha]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      unique_id: userData?.unique_id || "",
      login_cd: userData?.login_cd || "",
      stake_cd: userData?.stake_cd || "",
      internal_code: userData?.internal_code || "",
    },
  });

  const password = watch("password", "");

  // Password Validation Logic
  const passwordRules = {
    length: password.length >= 8 && password.length <= 12,
    mixed: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Security Handler for Captcha
  const preventCopyPaste = (e) => {
    e.preventDefault();
    toast.warning("Manual typing required for verification");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const finalData = {
      ...data,
      captcha_key: captchaData.key,
      internal_code: data.internal_code.toString(),
    };

    try {
      const host = window.location.hostname;
      const response = await axios.post(
        `http://${host}:8000/api/resetPassword`,
        finalData,
      );
      if (response.data.status === "success" || response.data.status === true) {
        toast.success("Password Changed Successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Update failed");
        fetchCaptcha();
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors;
        for (const field in backendErrors) {
          setError(field, { type: "server", message: backendErrors[field][0] });
        }
      } else {
        toast.error("An error occurred.");
      }
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return null;

  return (
    <div
      className={`min-h-screen w-full bg-cover bg-center flex items-center justify-center relative transition-all duration-500 ${darkMode ? "dark" : ""}`}
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"></div>

      {/* Floating Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400" size={20} />
        ) : (
          <FaMoon className="text-blue-300" size={20} />
        )}
      </button>

      <div className="relative z-10 w-full max-w-md mx-4 my-10">
        <div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/20 dark:border-gray-700">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white uppercase">
              Update Password
            </h1>
            <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs font-bold text-green-700 dark:text-green-400">
              User: {userData.name} ({userData.login_cd})
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  maxLength: { value: 12, message: "Maximum 12 characters" },
                  validate: {
                    mixedCase: (v) =>
                      (/[a-z]/.test(v) && /[A-Z]/.test(v)) ||
                      "Must include Upper & Lower case",
                    number: (v) => /[0-9]/.test(v) || "Must include a number",
                    symbol: (v) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                      "Must include a symbol",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:text-white transition-colors ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
              />
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-2 text-[10px] bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <CheckItem label="8-12 Characters" met={passwordRules.length} />
              <CheckItem label="Upper & Lower Case" met={passwordRules.mixed} />
              <CheckItem
                label="At least one Number"
                met={passwordRules.number}
              />
              <CheckItem
                label="At least one Symbol"
                met={passwordRules.symbol}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaCheckCircle className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:text-white transition-colors ${errors.password_confirmation ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Captcha Visual Box */}
            <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-xl border border-gray-300 dark:border-gray-700 select-none">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500">
                  VERIFICATION CODE
                </span>
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="text-blue-500 hover:rotate-180 transition-all duration-500"
                >
                  <FaSyncAlt size={12} />
                </button>
              </div>
              <div className="bg-white dark:bg-black py-2 rounded text-center shadow-inner">
                <span className="text-2xl font-mono font-black tracking-[0.5em] text-blue-600 dark:text-green-400">
                  {fetchingCaptcha
                    ? "..."
                    : captchaData.question.split(": ")[1] || "????"}
                </span>
              </div>
            </div>

            {/* Captcha Input with Restrictions */}
            <div className="relative">
              <FaShieldAlt className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                autoComplete="off"
                onPaste={preventCopyPaste}
                onCopy={preventCopyPaste}
                onContextMenu={(e) => e.preventDefault()}
                placeholder="Type the code above"
                {...register("captcha", { required: "Captcha required" })}
                className={`w-full pl-10 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:text-white transition-colors ${errors.captcha ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
              />
              {errors.captcha && (
                <p className="text-red-500 text-[10px] mt-1 text-center font-bold">
                  {errors.captcha.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              {loading ? "SAVING..." : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

const CheckItem = ({ label, met }) => (
  <div
    className={`flex items-center gap-1 transition-colors duration-300 ${met ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
  >
    {met ? <FaCheckCircle /> : <FaTimesCircle />}
    <span>{label}</span>
  </div>
);

export default UpdatePasswordForm;
