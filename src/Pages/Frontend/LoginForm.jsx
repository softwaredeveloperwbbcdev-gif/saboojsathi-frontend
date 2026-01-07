import { useState, useEffect, useContext } from "react";
import LoginBg from "../../assets/images/login_bg.jpg";
import {
  FaHome,
  FaSun,
  FaMoon,
  FaUser,
  FaLock,
  FaBuilding,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import axios from "axios";
import MD5 from "crypto-js/md5"; // Import MD5
import { useForm } from "react-hook-form"; // Import Hook Form
import { TokenContext } from "../../ContextProvider/TokenContext"; // Import Context

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [loginLevels, setLoginLevels] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(TokenContext); // Access Login Context

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      //const response = await axios.get(`http://${host}:8000/api/login_list`);
      const response = await axios.get(
        `http://192.168.0.192:8000/api/login_list`
      );

      if (response.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        setLoginLevels(response.data);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Password Hashing Helper
  const handleHash = (password) => {
    const hash = MD5(password).toString();
    return hash;
  };

  // Submit Logic
  const onSubmit = async (data) => {
    setLoading(true);

    // Hash the password before sending
    const finalData = {
      ...data,
      password: handleHash(data.password),
    };

    try {
      const host = window.location.hostname;
      const response = await axios.post(
        `http://192.168.0.192:8000/api/login`,
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful login
      if (response.data.status) {
        login(response.data.data.token, response.data.data.user);
        toast.success("Login Successful!");
        navigate("/Dashboard");
      }
    } catch (error) {
      // Check if it's a validation error (HTTP 422)
      if (error.response && error.response.status === 422) {
        const backendErrors = error.response.data.errors;
        // Loop through the backend errors and set them for react-hook-form
        for (const field in backendErrors) {
          if (Object.prototype.hasOwnProperty.call(backendErrors, field)) {
            setError(field, {
              type: "server",
              message: backendErrors[field][0],
            });
          }
        }
        toast.error("Please correct the errors.");
      } else {
        // Handle other errors
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative transition-colors duration-300"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Dark Overlay */}
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
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 text-yellow-500 dark:text-blue-300 shadow-lg hover:scale-110 transition-transform"
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-8 border border-white/20 dark:border-gray-700 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 mb-2">
              SABOOJSATHI
            </h1>
            <p className="text-sm font-semibold tracking-wider text-gray-600 dark:text-gray-400 uppercase">
              Government of West Bengal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* 1. Stakeholder Dropdown */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-0 h-[50px]">
                <FaBuilding className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <select
                id="stake_cd"
                {...register("stake_cd", {
                  required: "Please select a stakeholder",
                })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200 appearance-none transition-all cursor-pointer ${
                  errors.stake_cd
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <option value="">Select Stakeholder Type</option>
                {loginLevels.map((level, index) => (
                  <optgroup
                    key={index}
                    label={level.user}
                    className="dark:bg-gray-800 font-semibold"
                  >
                    {level.user_details.map((detail) => (
                      <option key={detail.stake_cd} value={detail.stake_cd}>
                        {detail.ref_name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0 h-[50px]">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              {errors.stake_cd && (
                <span className="text-red-500 text-xs mt-1 block pl-1">
                  {errors.stake_cd.message}
                </span>
              )}
            </div>

            {/* 2. User ID Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-0 h-[50px]">
                <FaUser className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="text"
                id="user_id"
                placeholder="User ID / Username"
                {...register("user_id", {
                  required: "Username is required",
                  minLength: {
                    value: 1,
                    message: "Minimum 3 characters required",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200 transition-all placeholder-gray-400 ${
                  errors.user_id
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              {errors.user_id && (
                <span className="text-red-500 text-xs mt-1 block pl-1">
                  {errors.user_id.message}
                </span>
              )}
            </div>

            {/* 3. Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-0 h-[50px]">
                <FaLock className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200 transition-all placeholder-gray-400 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block pl-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg transform active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  Login <FaSignInAlt />
                </>
              )}
            </button>
          </form>

          {/* CMS Link */}
          <div className="mt-6 text-center">
            <Link
              to="/cms"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-500 transition-colors"
            >
              Are you an Admin? Go to CMS Login
            </Link>
          </div>

          {/* Loader Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center z-50 backdrop-blur-sm rounded-2xl">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
