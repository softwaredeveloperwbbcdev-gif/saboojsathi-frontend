import React, { useState } from "react";
import { useForm } from "react-hook-form";

// import InputLabel from "../../../Components/InputLabel";
import InputLabel from "../Components/InputLabel";
import TextInput from "../Components/TextInput";
import PrimaryButton from "../Components/PrimaryButton";
import AdminAuthenticatedLayout from "../Layouts/AdminLayout/AdminAuthenticatedLayout";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import useApi from "../Hooks/useApi";

function ChangePassword() {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("error"); // ✅ added
  // const token = JSON.parse(localStorage.getItem("token")).token;
  // alert(token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchedNewPassword = watch("newpassword"); // ✅ get value for validation

  const formSubmit = async (data) => {
    console.log("Form Data:", data);
    //////////////////////////////////
    setLoading(true);
    try {
      const response = await callApi("POST", `change-password`, data); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        // alert(JSON.stringify(response));
        toast(response.message);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthenticatedLayout>
      {loading && <Loader />} {/* 👈 show the loader component */}
      <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div>
          <h2>Change Password</h2>

          {message && (
            <div
              style={{
                padding: "10px",
                color: messageType === "success" ? "green" : "red",
                marginBottom: "10px",
                border: `1px solid ${
                  messageType === "success" ? "green" : "red"
                }`,
              }}
            >
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div>
            <InputLabel htmlFor="currentPaswrd" value="Old Password" />
            <TextInput
              id="currentpassword"
              type="password"
              autoComplete="off"
              {...register("currentpassword", {
                required: "Old password is required",
              })}
            />
            {/* {errors.currentPassword && <p>{errors.currentPassword.message}</p>} */}
          </div>

          <div>
            <InputLabel htmlFor="newPassword" value="New Password" />
            <TextInput
              type="password"
              autoComplete="off"
              {...register("newpassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {/* {errors.newPassword && <p>{errors.newPassword.message}</p>} */}
          </div>

          <div>
            <InputLabel
              htmlFor="confirmnewpassword"
              value="Confirm New Password"
            />
            <TextInput
              type="password"
              autoComplete="off"
              {...register("confirmnewpassword", {
                validate: (value) =>
                  value === watchedNewPassword || "Passwords do not match",
              })}
            />
            {/* {errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p>} */}
          </div>

          <br />

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save New Password"}
          </PrimaryButton>
        </form>
      </section>
    </AdminAuthenticatedLayout>
  );
}

export default ChangePassword;
