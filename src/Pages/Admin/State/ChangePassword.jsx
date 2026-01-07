import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import InputLabel from "../Components/InputLabel";
import TextInput from "../Components/TextInput";
import PrimaryButton from "../Components/PrimaryButton";
import AdminAuthenticatedLayout from "../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import useApi from "../Hooks/useApi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function ChangePassword() {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // message shown on top of form
  const [messageType, setMessageType] = useState("error"); // 'success' | 'error'

  // captcha state
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm();

  const watchedNewPassword = watch("newpassword");

  // fetch captcha on mount
  useEffect(() => {
    fetchCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCaptcha = async () => {
    try {
      setLoading(true);
      const captchaResponse = await callApi("GET", "captcha");
      if (captchaResponse?.error) {
        toast(`Failed to fetch captcha: ${captchaResponse.message}`);
      } else {
        setCaptchaQuestion(captchaResponse.data?.question || "");
        setCaptchaToken(captchaResponse.data?.captcha_token || "");
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReloadCaptcha = async () => {
    await fetchCaptcha();
    // clear the user entered captcha field so they re-enter for new question
    resetField("captcha");
  };

  const formSubmit = async (data) => {
    // include captcha_token in the payload (keeps original behavior otherwise)
    const payload = {
      ...data,
      captcha_token: captchaToken,
    };

    setLoading(true);
    setMessage(null);

    try {
      const response = await callApi("POST", `change-password`, payload);

      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
        setMessage(response.message || "Failed to change password");
        setMessageType("error");
        // optionally refresh captcha on failure so user gets a new one
        await fetchCaptcha();
      } else {
        toast(response.message);
        setMessage(response.message || "Password changed successfully");
        setMessageType("success");
        // clear captcha input after success and reload captcha for next time
        resetField("captcha");
        await fetchCaptcha();
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
      setMessage(`An unexpected error occurred: ${err}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      {/* Loader overlay */}
      {(loading || isSubmitting) && <Loader />}

      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
            <header className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Change Password
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Use a strong password. Do not share it with anyone.
              </p>
            </header>

            <form
              onSubmit={handleSubmit(formSubmit)}
              className="px-6 py-6 space-y-5"
              noValidate
            >
              {/* Message area */}
              {message && (
                <div
                  role="status"
                  className={`rounded-md px-4 py-3 text-sm ${
                    messageType === "success"
                      ? "bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/40 dark:border-green-700"
                      : "bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/40 dark:border-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Current / Old Password */}
              <div>
                <InputLabel htmlFor="currentpassword" value="Old Password" />
                <TextInput
                  id="currentpassword"
                  type="password"
                  autoComplete="off"
                  className="mt-2 w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  {...register("currentpassword", {
                    required: "Old password is required",
                  })}
                />
                {errors.currentpassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.currentpassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <InputLabel htmlFor="newpassword" value="New Password" />
                <TextInput
                  id="newpassword"
                  type="password"
                  autoComplete="off"
                  className="mt-2 w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  {...register("newpassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.newpassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.newpassword.message}
                  </p>
                )}

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Tip: Use a mix of uppercase, lowercase and numbers for a
                  stronger password.
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <InputLabel
                  htmlFor="confirmnewpassword"
                  value="Confirm New Password"
                />
                <TextInput
                  id="confirmnewpassword"
                  type="password"
                  autoComplete="off"
                  className="mt-2 w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  {...register("confirmnewpassword", {
                    validate: (value) =>
                      value === watchedNewPassword || "Passwords do not match",
                  })}
                />
                {errors.confirmnewpassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.confirmnewpassword.message}
                  </p>
                )}
              </div>

              {/* Captcha */}
              <div>
                <InputLabel htmlFor="captcha" value="Enter The Result" />
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <TextInput
                      id="captcha"
                      type="text"
                      autoComplete="off"
                      placeholder="please enter result"
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      {...register("captcha", {
                        required: "Captcha is required",
                      })}
                    />
                    {errors.captcha && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.captcha.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleReloadCaptcha}
                      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Reload captcha"
                      aria-label="Reload captcha"
                    >
                      <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <div className="text-sm text-gray-700 dark:text-gray-200 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                      {captchaQuestion
                        ? `[ ${captchaQuestion} ]`
                        : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="inline-flex items-center justify-center"
                >
                  {isSubmitting || loading ? "Saving..." : "Save New Password"}
                </PrimaryButton>
              </div>
            </form>
          </div>

          {/* optional session popup: reuses existing showPopup from useApi */}
          {showPopup && popupMessage && (
            <div className="fixed bottom-4 right-4 z-50">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {popupMessage}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowPopup(false);
                    }}
                    className="text-sm text-sky-600 hover:underline"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </AdminAuthenticatedLayout>
  );
}

export default ChangePassword;
