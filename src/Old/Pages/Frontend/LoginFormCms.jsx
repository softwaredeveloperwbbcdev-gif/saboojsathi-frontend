import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import InputLabel from "../../Components/InputLabel";
import PrimaryButton from "../../Components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useContext } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext";
import { toast } from "react-toastify";
import axios from "axios";
import MD5 from "crypto-js/md5";
import { User, Lock, Hash, RefreshCw, LogIn } from "lucide-react";

const LoginFormCms = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState("");
  const [captch, setCaptcha] = useState();
  const [captchaKey, setCaptchaKey] = useState();
  const navigate = useNavigate();

  const handleHash = (password) => {
    const hash = MD5(password).toString();
    return hash;
  };

  const { login } = useContext(TokenContext); // ⬅️ get the login function

  // 👇 Captcha reload function
  const handleReloadCaptcha = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      const response = await axios.get(`http://${host}:8000/api/captcha_`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Check and set captcha
      if (response.data) {
        console.log(JSON.stringify(response.data));
        setCaptcha(response.data.question);
        setCaptchaKey(response.data.key);
      } else {
        toast("Failed to fetch data: Empty response");
      }
    } catch (error) {
      toast(
        `Failed to fetch data: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  ////////////////////////////////////////////////

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      user_id: data.user_id,
      password: handleHash(data.password), // hash password before sending
      captcha: data.captcha,
      captcha_key: captchaKey, // 👈 must send this back
    };

    try {
      const host = window.location.hostname;
      const response = await axios.post(
        `http://${host}:8000/api/login_cms`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ If login successful
      if (response.data && response.data.status) {
        login(response.data.data.token, response.data.data.user);
        localStorage.setItem("cms_menu", response.data.data.cms_menu);
        navigate("/cmsdashboard");
      } else {
        toast(`Login failed: ${response.data?.message || "Unknown error"}`);
      }
    } catch (error) {
      // ❌ Validation error (422)
      if (error.response && error.response.status === 422) {
        setBackendErrors(error.response.data.errors);
        for (const field in backendErrors) {
          if (Object.prototype.hasOwnProperty.call(backendErrors, field)) {
            setError(field, {
              type: "server",
              message: backendErrors[field][0],
            });
          }
        }
      } else {
        // ❌ Other errors
        toast(
          `Login failed: ${error.response?.data?.message || error.message}`
        );
      }
    } finally {
      setLoading(false);
      fetchData(); // Refresh captcha after each attempt
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 bg-[linear-gradient(to_right_top,_#0f9dd1,_#00b4d4,_#00c9c7,_#00dcb0,_#0bdeb7)]">
      {loading && <Loader />}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <b className="text-4xl font-bold text-white drop-shadow-md">
            Sabooj Sathi
          </b>
          <p className="text-lg font-medium text-white/90 drop-shadow-sm">
            Consignment Management System
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <p className="text-center text-gray-600 dark:text-gray-300 font-medium mb-6">
            Sign in to start your session
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-6"
            noValidate
          >
            {/* Username */}
            <div className="relative">
              <TextInput
                type="text"
                id="user_id"
                name="user_id"
                placeholder="User ID"
                Icon={User}
                {...register("user_id", {
                  required: "Username is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters required",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9_-]+$/,
                    message: "Only letters, numbers, _ and - are allowed",
                  },
                })}
                error={errors.user_id}
              />
              <InputLabel htmlFor="user_id" value="User ID" mandatory={true} />
              <InputError message={errors.user_id?.message} />
            </div>

            {/* Password */}
            <div className="relative">
              <TextInput
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                Icon={Lock}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                error={errors.password}
              />
              <InputLabel
                htmlFor="password"
                value="Password"
                mandatory={true}
              />
              <InputError message={errors.password?.message} />
            </div>

            {/* CAPTCHA */}
            <div>
              <div className="flex items-start gap-3">
                <div className="relative flex-grow">
                  <TextInput
                    type="text"
                    id="captcha"
                    placeholder="Captcha"
                    Icon={Hash}
                    autoComplete="off"
                    {...register("captcha", {
                      required: "Answer is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers allowed",
                      },
                    })}
                    error={errors.captcha}
                  />
                  <InputLabel
                    htmlFor="captcha"
                    value="Captcha"
                    mandatory={true}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleReloadCaptcha}
                  title="Reload Captcha"
                  className="p-3 h-12 mt-1 flex-shrink-0 text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>

                <div className="flex-shrink-0 h-12 mt-1 bg-gray-700 dark:bg-gray-900 text-white text-lg font-mono flex items-center justify-center px-4 py-2 rounded-lg select-none">
                  {captch}
                </div>
              </div>
              <InputError message={errors.captcha?.message} className="mt-2" />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <PrimaryButton
                type="submit"
                disabled={loading}
                className="w-full justify-center"
              >
                <LogIn size={20} />
                <span>{loading ? "Signing In..." : "Sign In"}</span>
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginFormCms;
