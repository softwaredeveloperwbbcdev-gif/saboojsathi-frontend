import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HiMapPin,
  HiUser,
  HiPhone,
  HiCheckCircle,
  HiXMark,
  HiPencilSquare,
} from "react-icons/hi2";

// --- INTERNAL SUB-COMPONENTS ---
const InputLabel = ({
  value,
  htmlFor,
  mandatory = false,
  className = "",
  children,
}) => (
  <label
    htmlFor={htmlFor}
    className={`block font-bold text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 ${className}`}
  >
    {value ? value : children}
    {mandatory && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const TextInput = forwardRef(
  ({ type = "text", className = "", ...props }, ref) => (
    <input
      {...props}
      type={type}
      ref={ref}
      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none ${className}`}
    />
  ),
);
TextInput.displayName = "TextInput";

// --- MAIN COMPONENT ---
const DistributionLocationUpdate = ({
  centerDetails,
  updateLocation,
  onClose,
}) => {
  console.log(centerDetails);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // Prefill the form with existing data
    defaultValues: {
      locName: centerDetails?.distribution_location_name || "",
      locAddress: centerDetails?.distribution_location_address || "",
      taggedOfficial: centerDetails?.officer_incharge_name || "",
      toContact: centerDetails?.officer_contact_no || "",
      bdoContact: centerDetails?.distribution_location_ph || "",
    },
  });

  // Effect to reset form if centerDetails changes while modal is open
  useEffect(() => {
    if (centerDetails) {
      reset({
        locName: centerDetails.distribution_location_name,
        locAddress: centerDetails.distribution_location_address,
        taggedOfficial: centerDetails.officer_incharge_name,
        toContact: centerDetails.officer_contact_no,
        bdoContact: centerDetails.distribution_location_ph,
      });
    }
  }, [centerDetails, reset]);

  const onSubmit = async (formData) => {
    const result = await updateLocation(formData);
    if (result?.validationErrors) {
      Object.entries(result.validationErrors).forEach(([field, messages]) => {
        setError(field, { type: "manual", message: messages[0] });
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all">
      {/* Header - Styled differently for Update (Indigo/Purple) */}
      <div className="relative p-8 bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-950">
        <div className="relative z-10 flex items-center gap-5">
          <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-xl">
            <HiPencilSquare className="text-3xl" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white tracking-tight">
              Update Center Details
            </h4>
            <p className="text-indigo-100/80 text-sm font-medium">
              Modifying information for:{" "}
              <span className="text-white underline">
                {centerDetails?.name}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Center Name */}
            <div className="space-y-1">
              <InputLabel
                htmlFor="locName"
                value="Center Name"
                mandatory={true}
              />
              <TextInput
                id="locName"
                {...register("locName", { required: "Name is required" })}
                className={errors.locName ? "border-red-500" : ""}
              />
              {errors.locName && (
                <p className="text-[10px] text-red-500 font-bold uppercase">
                  {errors.locName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <InputLabel
                htmlFor="locAddress"
                value="Full Address"
                mandatory={true}
              />
              <TextInput
                id="locAddress"
                {...register("locAddress", { required: "Address is required" })}
                className={errors.locAddress ? "border-red-500" : ""}
              />
              {errors.locAddress && (
                <p className="text-[10px] text-red-500 font-bold uppercase">
                  {errors.locAddress.message}
                </p>
              )}
            </div>

            {/* Official Name */}
            <div className="space-y-1">
              <InputLabel
                htmlFor="taggedOfficial"
                value="In-charge Official"
                mandatory={true}
              />
              <TextInput
                id="taggedOfficial"
                {...register("taggedOfficial", { required: "Required" })}
              />
              {errors.taggedOfficial && (
                <p className="text-[10px] text-red-500 font-bold uppercase">
                  {errors.taggedOfficial.message}
                </p>
              )}
            </div>

            {/* Contact No */}
            <div className="space-y-1">
              <InputLabel
                htmlFor="toContact"
                value="Official Contact No."
                mandatory={true}
              />
              <TextInput
                id="toContact"
                maxLength={10}
                {...register("toContact", { required: "Required" })}
              />
              {errors.toContact && (
                <p className="text-[10px] text-red-500 font-bold uppercase">
                  {errors.toContact.message}
                </p>
              )}
            </div>

            {/* BDO Contact */}
            <div className="space-y-1 md:col-span-2">
              <InputLabel
                htmlFor="bdoContact"
                value="BDO's Contact Number"
                mandatory={true}
              />
              <TextInput
                id="bdoContact"
                maxLength={10}
                {...register("bdoContact", {
                  required: "BDO contact required",
                })}
              />
              {errors.bdoContact && (
                <p className="text-[10px] text-red-500 font-bold uppercase">
                  {errors.bdoContact.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiCheckCircle className="text-xl" />
                  SAVE CHANGES
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributionLocationUpdate;
