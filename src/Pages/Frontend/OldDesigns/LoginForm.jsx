import LoginBg from "../../assets/images/login_bg.jpg";
import InputError from "../../Components/InputError";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MD5 from "crypto-js/md5";
import axios from "axios";
import { toast } from "react-toastify";

import { useContext } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const stake_cd = searchParams.get("stake_cd");
  const stake_name = searchParams.get("stake_name");
  const navigate = useNavigate();

  const handleHash = (password) => {
    const hash = MD5(password).toString();
    return hash;
  };

  const { login } = useContext(TokenContext); // ⬅️ get the login function

  const {
    register,
    handleSubmit,
    setError, //Helps catch validation error
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      stake_cd, // 👈 Add query param to the submitted data
    };

    finalData.password = handleHash(finalData.password);

    try {
      const host = window.location.hostname;
      const response = await axios.post(
        `http://${host}:8000/api/login`,
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
              message: backendErrors[field][0], // Get the first error message
            });
          }
        }
      } else {
        // Handle other errors (e.g., 401 Unauthorized, 500 Server Error)
        toast("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div
      className="absolute w-full h-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="md:absolute relative md:top-1/4 md:right-[10%] mx-auto mt-9 bg-white dark:bg-gray-800 w-[27.5rem] shadow-2xl rounded py-11 px-9">
        <div className="py-6 text-center">
          <div className="w-[360px]">
            {/* Text container */}
            <div className="text-center font-sans text-green-600 dark:text-green-500">
              {/* Large text */}
              <div className="text-5xl font-semibold tracking-widest mb-1">
                SABOOJSATHI
              </div>

              {/* Smaller text */}
              <div className="text-xl font-sans font-bold tracking-wide text-black dark:text-gray-300">
                Government of West Bengal
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold mt-2 dark:text-gray-400">
            {stake_name}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {/* Username */}
            <div className="relative mb-6">
              <TextInput
                id="user_id"
                type="text"
                placeholder="Username"
                {...register("user_id", {
                  required: "Username is required",
                  minLength: {
                    value: 1,
                    message: "Minimum 3 characters required",
                  },
                })}
                className="mt-1 block w-full"
                autoComplete="username"
              />
              <InputLabel htmlFor="username" value="Username" />
              <InputError
                message={errors.user_id?.message}
                className="text-left mt-1"
              />
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                className="mt-1 block w-full"
                autoComplete="current-password"
              />
              <InputLabel htmlFor="password" value="Password" />
              <InputError
                message={errors.password?.message}
                className="text-left mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-center">
              <Link
                to="/LoginList"
                className="bg-[#e69f11] border-none w-[140px] text-white py-[10px] text-[14px] rounded-md mx-[2px] inline-block"
              >
                <IoArrowBackCircleSharp className="inline-block text-lg pb-1" />{" "}
                Back
              </Link>
              <button
                type="submit"
                className="bg-[#4d8a30] border-none w-[140px] text-white py-[10px] text-[14px] rounded-md mx-[2px] inline-block"
              >
                <FaRegCheckCircle className="inline-block text-lg pb-1" /> Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
