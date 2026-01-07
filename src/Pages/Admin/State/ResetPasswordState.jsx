import { useEffect, useState, forwardRef, useRef } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import PrimaryButton from "../../../Components/PrimaryButton";
import LogoutPopup from "../../../Components/LogoutPopup";
import {
  ArrowPathIcon,
  KeyIcon, // Added an icon for the header
} from "@heroicons/react/24/outline";
import useApi from "../../../Hooks/useApi";
import Loader from "../../../Components/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const InputLabel = ({ value, className = "", children, ...props }) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {value ? value : children}
    </label>
  );
};

const InputError = ({ message, className = "", ...props }) => {
  return message ? (
    <p
      {...props}
      className={`text-sm text-red-600 dark:text-red-400 mt-1 ${className}`}
    >
      {message}
    </p>
  ) : null;
};

const TextInput = forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  const inputRef = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Base styling for modern, clean look (inherited from the main component's styling)
  const baseStyle =
    "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm " +
    "focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 " +
    "px-4 py-2 text-sm dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 " +
    "disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:opacity-90 disabled:cursor-not-allowed transition duration-150 ease-in-out";

  return (
    <input
      {...props}
      type={type}
      className={`${baseStyle} ${className}`}
      ref={inputRef}
    />
  );
});

const SelectInput = forwardRef(function SelectInput(
  { className = "", children, ...props },
  ref
) {
  // Base styling for modern, clean look (inherited from the main component's styling)
  const baseStyle =
    "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm " +
    "focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 " +
    "px-4 py-2 text-sm dark:text-gray-100 appearance-none transition duration-150 ease-in-out";

  // The appearance-none class removes the default browser arrow,
  // though the provided code relies on the browser/system for the dropdown arrow.
  // We maintain the look consistent with a typical Tailwind select.

  return (
    <select {...props} className={`${baseStyle} ${className}`} ref={ref}>
      {children}
    </select>
  );
});

function ResetPasswordState() {
  const {
    register,
    watch,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  // UI state
  const [selectedStake, setSelectedStake] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [dropDownVal, setDropDownVal] = useState([]);
  const [levels, setLevels] = useState([]);
  const [backendErrors, setBackendErrors] = useState(""); // backend form errors
  const [loading, setLoading] = useState(false);

  // captcha
  const [captch, setCaptcha] = useState();
  const [captchaToken, setCaptchaToken] = useState();

  const password = watch("password");

  // Fetch initial data on mount (districts/levels + captcha)
  useEffect(() => {
    fetchData();
    fetchCaptchaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await callApi("GET", "getStakeDistrictList");

      if (response.error) {
        toast(`Failed to fetch data: ${response.message}`);
        return;
      }

      setDistricts(response.data.districts || []);
      setLevels(response.data.levels || []);
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptchaData = async () => {
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
        setCaptchaToken(response.data.key);
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

  // when district or stake changes
  useEffect(() => {
    // special case: stake 0304 uses district loginid directly
    if (selectedStake === "0304" && selectedDistrict) {
      const selectLoginID = districts.find(
        (val) => String(val.id) === String(selectedDistrict)
      );
      const loginId = selectLoginID?.loginid;
      setValue("loginId", loginId);
    }

    // for these stakes we need to fetch additional lists (block/circle/school)
    if (
      (selectedStake === "0501" ||
        selectedStake === "0601" ||
        selectedStake === "0701") &&
      selectedDistrict
    ) {
      fetchStakeInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, selectedStake]);

  const fetchStakeInfo = async () => {
    try {
      setLoading(true);
      const response = await callApi(
        "GET",
        `getStakeOtherList/${selectedStake}/${selectedDistrict}`
      );
      if (response.error) {
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        setDropDownVal(response.data || []);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const findIdForLogin = (id) => {
    const selectLoginID = dropDownVal.find(
      (val) => String(val.id) === String(id)
    );
    const loginId = selectLoginID?.loginid;
    setValue("loginId", loginId);
  };

  // main form submit
  const formSubmit = async (data) => {
    const stakeToLocationMap = {
      "0304": "district",
      "0501": "block",
      "0601": "circle",
      "0701": "school",
    };
    setBackendErrors({});
    const locationKey = stakeToLocationMap[data.stake];
    console.log("i am captcha " + captchaToken);
    const finalData = {
      ...data,
      captcha_token: captchaToken,
    };

    if (locationKey && data[locationKey]) {
      finalData.id = data[locationKey];
      delete finalData[locationKey];
    }

    try {
      setLoading(true);
      const response = await callApi("POST", `resetpassforstakes`, finalData);

      if (response.error) {
        if (response.message === "Validation Errors") {
          setBackendErrors(response.errors);
        } else {
          toast(`Failed to fetch data: ${response.message}`);
        }
      } else {
        toast(response.data.message);
        resetField("stake");
        resetField("loginId");
        resetField("district");
        resetField("password");
        resetField("confirmPassword");
        resetField("captcha");
        setSelectedStake("");
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      fetchCaptchaData();
      setLoading(false);
    }
  };

  // Responsive form layout helpers (Tailwind used heavily)
  const inputRow =
    "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3";
  const labelClass =
    "w-full sm:w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200";
  const controlWrapper = "w-full sm:w-2/3";
  const selectBaseClass =
    "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 transition duration-150 ease-in-out text-sm dark:text-gray-100";

  // Dynamic label based on selectedStake
  const getLocationLabel = () => {
    switch (selectedStake) {
      case "0501":
        return "Block";
      case "0601":
        return "Circle";
      case "0701":
        return "School";
      default:
        return "Location";
    }
  };

  const getLocationFieldName = () => {
    switch (selectedStake) {
      case "0501":
        return "block";
      case "0601":
        return "circle";
      case "0701":
        return "school";
      default:
        return "";
    }
  };
  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition duration-300">
            {/* Header */}
            <div className="px-6 py-6 sm:px-8 bg-indigo-600 dark:bg-indigo-700">
              <div className="flex items-center space-x-3">
                <KeyIcon className="h-8 w-8 text-white" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Password Reset for Stakeholders
                </h3>
              </div>
              <p className="text-sm mt-1 text-indigo-100">
                [ Password must be a minimum of 8 characters and contain
                uppercase, lowercase, number, and special character ]
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="p-6 sm:p-8 space-y-4"
              aria-label="Reset Password Form"
            >
              {/* Stake Group */}
              <div className={inputRow}>
                <InputLabel className={labelClass} htmlFor="stake">
                  Stake Group <span className="text-red-500">*</span>
                </InputLabel>
                <div className={controlWrapper}>
                  <SelectInput
                    id="stake"
                    aria-label="Stake Group"
                    className={selectBaseClass}
                    {...register("stake", {
                      required: "Please select a stake group",
                    })}
                    onChange={(e) => {
                      // Reset all dependent fields on stake change
                      [
                        "district",
                        "block",
                        "circle",
                        "school",
                        "loginId",
                        "password",
                        "confirmPassword",
                        "captcha",
                      ].forEach((field) => resetField(field));
                      setSelectedStake(e.target.value);
                      setSelectedDistrict("");
                      setDropDownVal([]);
                    }}
                  >
                    <option value="">Select Stake Group</option>
                    {levels.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError
                    message={errors.stake?.message || backendErrors.stake?.[0]}
                  />
                </div>
              </div>

              {/* District */}
              <div className={inputRow}>
                <InputLabel className={labelClass} htmlFor="district">
                  District <span className="text-red-500">*</span>
                </InputLabel>
                <div className={controlWrapper}>
                  <SelectInput
                    id="district"
                    aria-label="District"
                    className={selectBaseClass}
                    {...register("district", {
                      required: "Please select a district",
                    })}
                    onChange={(e) => {
                      // Reset location-specific fields on district change
                      [
                        "block",
                        "circle",
                        "school",
                        "loginId",
                        "password",
                        "confirmPassword",
                        "captcha",
                      ].forEach((field) => resetField(field));
                      setSelectedDistrict(e.target.value);
                    }}
                  >
                    <option value="">Select District</option>
                    {districts.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.desc}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError
                    message={
                      errors.district?.message || backendErrors.district?.[0]
                    }
                  />
                </div>
              </div>

              {/* Dynamic Location Field (Block/Circle/School) */}
              {(selectedStake === "0501" ||
                selectedStake === "0601" ||
                selectedStake === "0701") &&
                selectedDistrict && (
                  <div className={inputRow}>
                    <InputLabel
                      className={labelClass}
                      htmlFor={getLocationFieldName()}
                    >
                      {getLocationLabel()}{" "}
                      <span className="text-red-500">*</span>
                    </InputLabel>
                    <div className={controlWrapper}>
                      <SelectInput
                        id={getLocationFieldName()}
                        aria-label={getLocationLabel()}
                        className={selectBaseClass}
                        {...register(getLocationFieldName(), {
                          required: `Please select a ${getLocationLabel()}`,
                        })}
                        onChange={(e) => {
                          // Reset password fields and set loginId based on selection
                          [
                            "loginId",
                            "password",
                            "confirmPassword",
                            "captcha",
                          ].forEach((field) => resetField(field));
                          findIdForLogin(e.target.value);
                        }}
                      >
                        <option value="">Select {getLocationLabel()}</option>
                        {dropDownVal.map((cls) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.desc}
                          </option>
                        ))}
                      </SelectInput>
                      <InputError
                        message={
                          errors[getLocationFieldName()]?.message ||
                          backendErrors[getLocationFieldName()]?.[0]
                        }
                      />
                    </div>
                  </div>
                )}

              {/* Login ID (read-only) */}
              <div className={inputRow}>
                <InputLabel className={labelClass} htmlFor="loginId">
                  Login ID
                </InputLabel>
                <div className={controlWrapper}>
                  <TextInput
                    id="loginId"
                    type="text"
                    {...register("loginId")}
                    readOnly
                    disabled
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                    // Overrides default style with modern clean look and disables text input appearance
                  />
                </div>
              </div>

              {/* New Password */}
              <div className={inputRow}>
                <InputLabel className={labelClass} htmlFor="password">
                  New Password <span className="text-red-500">*</span>
                </InputLabel>
                <div className={controlWrapper}>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter new password (min 8 chars)"
                    className={selectBaseClass}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        // Regex: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                          "Password must contain uppercase, lowercase, number, and special character",
                      },
                    })}
                  />
                  <InputError
                    message={
                      errors.password?.message || backendErrors.password?.[0]
                    }
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className={inputRow}>
                <InputLabel className={labelClass} htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </InputLabel>
                <div className={controlWrapper}>
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className={selectBaseClass}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <InputError message={errors.confirmPassword?.message} />
                </div>
              </div>

              {/* Captcha */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <InputLabel className={labelClass} htmlFor="captcha">
                  Enter The Result <span className="text-red-500">*</span>
                </InputLabel>
                <div className="flex w-full sm:w-2/3 items-center space-x-3">
                  <div className="flex-1 max-w-xs">
                    <TextInput
                      id="captcha"
                      type="text"
                      placeholder="Result"
                      className={selectBaseClass}
                      {...register("captcha", {
                        required: "Captcha result is required",
                      })}
                    />
                    <InputError
                      message={
                        errors.captcha?.message || backendErrors.captcha?.[0]
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={fetchCaptchaData}
                      disabled={loading}
                      className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150"
                      title="Reload captcha"
                      aria-label="Reload captcha"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
                    <span className="text-lg font-bold px-4 py-2 bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 rounded-lg text-indigo-800 dark:text-indigo-200 min-w-[100px] text-center">
                      {captch || "..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-6 border-t dark:border-gray-700">
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:bg-indigo-600 dark:active:bg-indigo-700"
                >
                  {isSubmitting ? "Processing..." : "Save New Password"}
                </PrimaryButton>
              </div>
            </form>
          </div>
          {/* Loader and Session Popups */}
          {loading && <Loader />}
        </section>
      </AdminAuthenticatedLayout>
      {/* session popup (logout) */}
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
}

export default ResetPasswordState;
