import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import MD5 from "crypto-js/md5";
import {
  FaHome,
  FaSun,
  FaMoon,
  FaUser,
  FaLock,
  FaSignInAlt,
  FaSync,
  FaShieldAlt,
  FaBicycle,
  FaExclamationCircle,
} from "react-icons/fa";

// Context & Stores
import { TokenContext } from "../../ContextProvider/TokenContext";
import { useThemeStore } from "../../Store/themeStore";

// Assets & Components
import LoginBg from "../../assets/images/login_bg.jpg";
import Loader from "../../Components/Loader";

const LoginFormCms = () => {
  const [loading, setLoading] = useState(false);
  const [captch, setCaptcha] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(TokenContext);
  const { darkMode, toggleTheme } = useThemeStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // const handleHash = (password) => MD5(password).toString();

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      const response = await axios.post(`http://${host}:8000/api/captcha`, {
        type: "cms",
      });
      if (response.data) {
        setCaptcha(response.data.question);
        setCaptchaKey(response.data.key);
      }
    } catch (error) {
      toast.error("Security service connectivity issue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      user_id: data.user_id,
      password: data.password,
      captcha: data.captcha,
      captcha_key: captchaKey,
    };

    try {
      const host = window.location.hostname;
      const response = await axios.post(
        `http://${host}:8000/api/login_cms`,
        payload,
      );

      const resData = response.data;

      // 1. Check for the "update" status code first
      if (resData.status === "success" && resData.verification_type === "cms") {
        toast.info("Verification required. Please update your password.");

        // Redirect to Update Password page and pass the data via state
        navigate("/update-password", {
          state: {
            userData: resData.data,
            verificationType: resData.verification_type,
          },
        });
        return;
      }

      if (response.data?.status) {
        login(response.data.data.token, response.data.data.user);
        localStorage.setItem("cms_menu", response.data.data.cms_menu);
        toast.success("CMS Access Granted");
        navigate("/cmsdashboard");
      } else {
        toast.error(response.data?.message || "Access Denied");
        fetchData();
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field, { type: "server", message: serverErrors[field][0] });
        });
      }
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative transition-colors duration-300 font-sans"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"></div>

      {/* Navbar */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg text-gray-700 dark:text-gray-200 hover:bg-green-600 hover:text-white transition-all duration-300 font-medium"
        >
          <FaHome /> <span className="hidden sm:inline">Home</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 text-yellow-500 dark:text-blue-300 shadow-lg hover:scale-110 transition-transform"
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-8 border border-white/20 dark:border-gray-700 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl shadow-lg mb-4 text-white">
              <FaBicycle size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 mb-2">
              SABOOJSATHI
            </h1>
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-600 dark:text-gray-400 uppercase">
              CMS Login
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div className="relative group">
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 tracking-widest">
                Username
              </label>
              <div className="absolute left-3 top-[34px] text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaUser />
              </div>
              <input
                type="text"
                {...register("user_id", { required: "Username is required" })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-700 dark:text-gray-200 transition-all ${errors.user_id ? "border-red-500" : "border-gray-200 dark:border-gray-600"}`}
                placeholder="Enter CMS ID"
              />
              {errors.user_id && (
                <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold">
                  <FaExclamationCircle /> {errors.user_id.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 tracking-widest">
                Password
              </label>
              <div className="absolute left-3 top-[34px] text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaLock />
              </div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-700 dark:text-gray-200 transition-all ${errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-600"}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold">
                  <FaExclamationCircle /> {errors.password.message}
                </span>
              )}
            </div>

            {/* Captcha Block with Full Validation */}
            <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <FaShieldAlt className="text-green-500" /> Security Verification
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-11">
                  <span className="font-mono font-bold text-green-600 dark:text-green-400 italic">
                    {captch || "Loading..."}
                  </span>
                  <button
                    type="button"
                    onClick={fetchData}
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    <FaSync className={loading ? "animate-spin" : ""} />
                  </button>
                </div>
                <input
                  type="text"
                  {...register("captcha", {
                    required: "Required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Digits only",
                    },
                  })}
                  className={`w-20 text-center bg-white dark:bg-gray-800 border rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-green-500 outline-none ${errors.captcha ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
                  placeholder="Ans"
                />
              </div>
              {errors.captcha && (
                <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold justify-end">
                  <FaExclamationCircle /> {errors.captcha.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg transform active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <FaSignInAlt /> CMS Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              Not a Consignment Manager? Administrative Login
            </Link>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center z-50 backdrop-blur-sm rounded-2xl">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginFormCms;
