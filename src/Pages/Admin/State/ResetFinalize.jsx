// ResetFinalizeDesign.jsx
import React, { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
//import InputLabel from "../../../Components/InputLabel";
//import InputError from "../../../Components/InputError";
//import SelectInput from "../../../Components/SelectInput";
//import TextInput from "../../../Components/TextInput";
import useApi from "../../../Hooks/useApi";
import { toast } from "react-toastify";
import axios from "axios";

const MOCK_PHASES = ["X", "IX", "VIII"];

const InputLabel = ({ value, className = "", ...props }) => (
  <label
    className={`block text-sm font-medium text-gray-900 dark:text-gray-50 ${className}`}
    {...props}
  >
    {value}
  </label>
);

const InputError = ({ message, className = "", ...props }) => {
  if (!message) return null;
  return (
    <p
      className={`mt-0.5 text-sm text-red-500 dark:text-red-500 ${className}`}
      {...props}
    >
      {message}
    </p>
  );
};

const inputBaseStyles = `
  block w-full rounded-lg border border-gray-300 dark:border-gray-600 
  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 
  px-3 py-2.5 text-sm transition-colors duration-200
  placeholder-gray-400 dark:placeholder-gray-500
  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
`;

const SelectInput = forwardRef(({ className = "", ...props }, ref) => (
  <select ref={ref} {...props} className={`${inputBaseStyles} ${className}`} />
));

const TextInput = forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    type="text"
    className={`${inputBaseStyles} ${className}`}
  />
));

export default function ResetFinalizeDesign() {
  const {
    register,
    watch,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const { callApi } = useApi();

  const [district, setDistrict] = useState([]);
  const [school, setSchool] = useState([]);
  const [captcha, setCaptcha] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [restSchoolData, setResetSchoolData] = useState([]);
  const [processedVisible, setProcessedVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState(""); // backend form errors

  // track the answer typed by the user
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const phase = watch("phase");
  const [locked, setLocked] = useState("0");

  // load captcha
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

  // load districts
  const loadDistrict = async () => {
    try {
      setLoading(true);
      const response = await callApi("GET", "districts");
      setDistrict(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      console.error("load districts error:", err);
      toast.error("Error loading districts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptchaData();
    loadDistrict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch schools when district changes
  const handleOnChange = async (name, value) => {
    if (name === "district") {
      setSchool([]);
      const districtId = value;
      if (!districtId) return;

      try {
        setLoading(true);
        const response = await callApi("GET", `schools/${districtId}`);
        const list = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];
        setSchool(list);
      } catch (err) {
        console.error("load schools error:", err);
        toast.error("Error loading school");
      } finally {
        setLoading(false);
      }
    }
  };

  // main process action
  const onProcess = async (data) => {
    // client-side required captcha check
    if (!captchaAnswer || String(captchaAnswer).trim() === "") {
      toast.error("Please enter captcha result");
      return;
    }

    // IMPORTANT: send snake_case captcha_token to match backend expectation
    const payload = {
      ...data,
      // backend in other component expects `captcha_token` key
      captcha_token: captchaToken,
      // user's entered answer (field name 'captcha' matches registered form field)
      captcha: captchaAnswer,
    };

    setLoading(true);
    try {
      const response = await callApi("POST", "reset-finalize", payload);

      // Defensive checks for captcha failure / invalid response:
      // 1) response.error => treat as failure
      // 2) explicit captcha flag from backend (if it returns captcha_valid: false)
      // 3) missing expected school data => treat as failure
      const captchaValidExplicit = response?.data?.captcha_valid;
      const hasSchoolData =
        Array.isArray(response?.data?.school) &&
        response.data.school.length > 0;

      if (response?.error || captchaValidExplicit === false || !hasSchoolData) {
        // Show server message if available
        if (response.message === "Validation Errors") {
          setBackendErrors(response.errors);
          console.log(response.error);
        } else {
          const msg =
            response?.data?.message ||
            response?.message ||
            "Failed to process request";
          toast.error(msg);
        }

        // reload captcha for fresh challenge, clear captcha input
        await fetchCaptchaData();
        resetField("captcha");
        setCaptchaAnswer("");
        setProcessedVisible(false);
        setResetSchoolData([]);
        return;
      }

      // success path (existing handling)
      setResetSchoolData(response.data.school);
      setProcessedVisible(true);
      setLocked(response.data.school?.[0]?.lock_status == 1 ? "1" : "0");
      // clear captcha input and reload fresh captcha for next time
      resetField("captcha");
      setCaptchaAnswer("");
      await fetchCaptchaData();
    } catch (err) {
      toast.error("An unexpected error occurred: " + (err?.message || err));
      await fetchCaptchaData();
      resetField("captcha");
      setCaptchaAnswer("");
    } finally {
      setLoading(false);
    }
  };

  const reset_school = async (dise_code) => {
    const payload = {
      schcd: dise_code,
      phase: phase,
    };
    setLoading(true);
    try {
      const response = await callApi("POST", "reset-now", payload);

      if (response.error) {
        toast.error("Failed to reset: " + response.message);
      } else {
        if (response.data.affected == 1) {
          toast.success(response.data.message);
          setLocked("0");
        } else {
          // optional: show other messages
          if (response.data?.message) toast.info(response.data.message);
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Handle client-side form reset
  const handleFormReset = () => {
    resetField("district");
    resetField("school");
    resetField("phase");
    resetField("captcha");
    setProcessedVisible(false);
    setResetSchoolData([]);
    setSchool([]);
    setCaptchaAnswer("");
    fetchCaptchaData();
  };

  return (
    <>
      {/* <AdminAuthenticatedLayout>
      <div
        style={{
          fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        }}
      >
        <div style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
          <form
            onSubmit={handleSubmit(onProcess)}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 8,
              padding: 16,
              background: "#fff",
            }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >

                <div>
                  <InputLabel value="District" />
                  <SelectInput
                    {...register("district", {
                      required: "select District",
                      onChange: (e) =>
                        handleOnChange("district", e.target.value),
                    })}
                    className=""
                  >
                    <option value="">-- Select District --</option>
                    {district.map((d) => (
                      <option key={d.id} value={d.id}>
                        {String(d.desc ?? "").trim()}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.district?.message} />
                </div>

                <div>
                  <InputLabel value="School" />
                  <SelectInput
                    {...register("school", {
                      required: "Select School",
                    })}
                    className=""
                  >
                    <option value="">-- Select School --</option>
                    {school.map((s) => (
                      <option key={s.id} value={s.id}>
                        {String(s.desc ?? "").trim()}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.school?.message} />
                </div>
              </div>

              <div>
                <InputLabel value="Phase" />
                <SelectInput
                  {...register("phase", {
                    required: "select phase",
                  })}
                  className=""
                >
                  <option value="">-- Select Phase --</option>
                  {MOCK_PHASES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.phase?.message} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
                  gap: 12,
                  alignItems: "end",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel value="Captcha" />
                  <div style={{ display: "flex", gap: 8 }}>
                    <div
                      style={{
                        padding: "10px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        minWidth: 160,
                        justifyContent: "space-between",
                      }}
                    >
                      {captcha || "Loading..."}
                      <button
                        type="button"
                        onClick={fetchCaptchaData}
                        aria-label="Reload captcha"
                        title="Reload captcha"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#333",
                          paddingLeft: 8,
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 12A9 9 0 103 12"
                            stroke="#333"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 3v6h-6"
                            stroke="#333"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel value="Enter answer" />
                  <TextInput
                    placeholder="Type captcha"
                    {...register("captcha", {
                      required: "Captcha is required",
                      onChange: (e) => setCaptchaAnswer(e.target.value),
                    })}
                    className=""
                  />
                  <InputError
                    message={
                      errors.captcha?.message || backendErrors.captcha?.[0]
                    }
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: "#e11d48",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Process School"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetField("district");
                    resetField("school");
                    resetField("phase");
                    resetField("captcha");
                    setProcessedVisible(false);
                    setResetSchoolData([]);
                    setCaptchaAnswer("");
                    fetchCaptchaData();
                  }}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 6,
                    border: "1px solid #cfcfcf",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Reset Form
                </button>
              </div>
            </div>
          </form>


          {processedVisible && (
            <div
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 8,
                border: "1px solid #e6e6e6",
                background: "#fafafa",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>
                Processed School Details
              </h3>
              {restSchoolData && restSchoolData?.[0] && (
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 160 }}>
                      <div
                        style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                      >
                        Dice Code
                      </div>
                      <div
                        style={{
                          padding: "10px 12px",
                          borderRadius: 6,
                          border: "1px solid #ddd",
                        }}
                      >
                        {restSchoolData?.[0]?.schcd}
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div
                        style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                      >
                        School Name
                      </div>
                      <div
                        style={{
                          padding: "10px 12px",
                          borderRadius: 6,
                          border: "1px solid #ddd",
                        }}
                      >
                        {restSchoolData?.[0]?.school_name}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {locked == "1" ? (
                      <button
                        type="button"
                        onClick={() => {
                          reset_school(restSchoolData?.[0]?.schcd);
                        }}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 6,
                          border: "none",
                          background: "#e11d48",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Reset Finalize
                      </button>
                    ) : (
                      "School is Unlocked"
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {loading && <Loader />}
      </div>
    </AdminAuthenticatedLayout>*/}

      <AdminAuthenticatedLayout>
        <div className="mx-auto max-w-4xl p-4 py-8 md:p-6 md:py-12">
          {/* Page Header */}
          <header className="mb-6 flex items-center gap-4">
            <div className="flex-shrink-0 rounded-lg bg-rose-100 dark:bg-rose-900/50 p-3 text-rose-600 dark:text-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12a10 10 0 0 0 5.002 8.57"></path>
                <path d="M2 12h4"></path>
                <path d="m13 8-4 4 4 4"></path>
                <path d="M12 2a10 10 0 0 0-4.998 1.43"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reset Finalize School
              </h1>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                Admin tool to unlock a school's finalized data submission.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {/* --- Form Card --- */}
            <form
              onSubmit={handleSubmit(onProcess)}
              className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
            >
              {/* Card Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-5 py-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                  Select School to Process
                </h3>
              </div>

              {/* Card Body */}
              <div className="space-y-5 p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* District */}
                  <div className="space-y-1">
                    <InputLabel value="District" />
                    <SelectInput
                      {...register("district", {
                        required: "Please select a District",
                        onChange: (e) =>
                          handleOnChange("district", e.target.value),
                      })}
                    >
                      <option value="">-- Select District --</option>
                      {district.map((d) => (
                        <option key={d.id} value={d.id}>
                          {String(d.desc ?? "").trim()}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError message={errors.district?.message} />
                  </div>

                  {/* School */}
                  <div className="space-y-1">
                    <InputLabel value="School" />
                    <SelectInput
                      {...register("school", {
                        required: "Please select a School",
                      })}
                    >
                      <option value="">-- Select School --</option>
                      {school.map((s) => (
                        <option key={s.id} value={s.id}>
                          {String(s.desc ?? "").trim()}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError message={errors.school?.message} />
                  </div>
                </div>

                {/* Phase */}
                <div className="space-y-1">
                  <InputLabel value="Phase" />
                  <SelectInput
                    {...register("phase", {
                      required: "Please select a Phase",
                    })}
                  >
                    <option value="">-- Select Phase --</option>
                    {MOCK_PHASES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.phase?.message} />
                </div>

                {/* Captcha row */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1">
                    <InputLabel value="Captcha" />
                    <div className="flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-4 py-2.5">
                      <span className="font-medium tracking-wider text-gray-800 dark:text-gray-100">
                        {captcha || "Loading..."}
                      </span>
                      <button
                        type="button"
                        onClick={fetchCaptchaData}
                        aria-label="Reload captcha"
                        title="Reload captcha"
                        className="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M21 12A9 9 0 103 12"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 3v6h-6"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <InputLabel value="Enter Answer" />
                    <TextInput
                      placeholder="Type captcha answer"
                      {...register("captcha", {
                        required: "Captcha is required",
                        onChange: (e) => setCaptchaAnswer(e.target.value),
                      })}
                    />
                    <InputError
                      message={
                        errors.captcha?.message || backendErrors.captcha?.[0]
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-5 py-4">
                <button
                  type="button"
                  onClick={handleFormReset}
                  className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Process School"}
                </button>
              </div>
            </form>

            {/* --- Processed Results Card --- */}
            {processedVisible && (
              <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-5 py-4">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    Processed School Details
                  </h3>
                </div>

                <div className="p-5">
                  {restSchoolData && restSchoolData?.[0] && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,2fr]">
                      <div className="rounded-md bg-gray-100 dark:bg-gray-700/50 p-3">
                        <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                          Dice Code
                        </div>
                        <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {restSchoolData?.[0]?.schcd}
                        </div>
                      </div>
                      <div className="rounded-md bg-gray-100 dark:bg-gray-700/50 p-3">
                        <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                          School Name
                        </div>
                        <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {restSchoolData?.[0]?.school_name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-5 py-4">
                  {locked == "1" ? (
                    <button
                      type="button"
                      onClick={() => {
                        reset_school(restSchoolData?.[0]?.schcd);
                      }}
                      className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={loading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Reset Finalize
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                      </svg>
                      School is Unlocked
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {loading && <Loader />}
      </AdminAuthenticatedLayout>
    </>
  );
}
