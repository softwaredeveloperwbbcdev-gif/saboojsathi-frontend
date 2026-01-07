import { useForm } from "react-hook-form";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

const DistributionLocationAdd = ({ addLocation, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (formData) => {
    const addLocationData = {
      ...formData,
    };

    const result = await addLocation(addLocationData);

    if (result?.validationErrors) {
      // Set validation errors on specific fields
      Object.entries(result.validationErrors).forEach(([field, messages]) => {
        setError(field, {
          type: "manual",
          message: messages[0], // Laravel returns array of messages per field
        });
      });
    }
    // sending back to parent -->check it later what is happening
  };

  return (
    //     <div className="bg-white rounded-lg w-full flex flex-col">
    //       <div className="flex min-h-[16.43px] p-[15px] border-b border-[#f4f4f4]">
    //         <h4
    //           className="text-lg
    // "
    //         >
    //           Kindly Fill up the Delivery Centre Information.
    //         </h4>
    //       </div>
    //       <div className="p-8 flex w-full justify-center">
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //           {/* Delivery Point Location Name */}
    //           <div className="flex flex-row">
    //             <div className="mb-4 flex w-1/2 mt-2 mr-3 justify-end">
    //               <InputLabel htmlFor="locName">
    //                 Delivery Point Location *
    //               </InputLabel>
    //             </div>
    //             <div className="mb-4 flex flex-col w-1/2">
    //               <TextInput
    //                 id="locName"
    //                 {...register("locName", { required: true })}
    //                 className="mt-1 p-2 border rounded w-full"
    //               />
    //               {errors.locName && (
    //                 <p className="text-red-500 text-sm">This field is required</p>
    //               )}
    //             </div>
    //           </div>
    //           {/* Delivery Point Location Addresss */}
    //           <div className="flex flex-row">
    //             <div className="mb-4 flex w-1/2 mt-2 mr-3 justify-end">
    //               <InputLabel htmlFor="locAddress">Address *</InputLabel>
    //             </div>
    //             <div className="mb-4 flex flex-col w-1/2">
    //               <TextInput
    //                 type="text"
    //                 id="locAddress"
    //                 {...register("locAddress", { required: true })}
    //                 className="mt-1 p-2 border rounded w-full"
    //               />
    //               {errors.locAddress && (
    //                 <p className="text-red-500 text-sm">This field is required</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Tagged Official Name */}
    //           <div className="flex flex-row">
    //             <div className="mb-4 flex w-1/2 mt-2 mr-3 justify-end">
    //               <InputLabel htmlFor="taggedOfficial">
    //                 Tagged Official *
    //               </InputLabel>
    //             </div>
    //             <div className="mb-4">
    //               <TextInput
    //                 id="taggedOfficial"
    //                 {...register("taggedOfficial", { required: true })}
    //                 className="mt-1 p-2 border rounded w-full"
    //               />
    //               {errors.taggedOfficial && (
    //                 <p className="text-red-500 text-sm">This field is required</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Tagged Officer Contact Number */}
    //           <div className="flex flex-row">
    //             <div className="mb-4 flex w-1/2 mt-2 mr-3 justify-end">
    //               <InputLabel htmlFor="toContact">Contact No. *</InputLabel>
    //             </div>
    //             <div className="mb-4">
    //               <TextInput
    //                 id="toContact"
    //                 maxLength={10}
    //                 {...register("toContact", { required: true })}
    //                 className="mt-1 p-2 border rounded w-full"
    //               />
    //               {errors.toContact && (
    //                 <p className="text-red-500 text-sm">This field is required</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Tagged Officer Contact Number */}
    //           <div className="flex flex-row">
    //             <div className="mb-4 flex w-1/2 mt-2 mr-3 justify-end">
    //               <InputLabel htmlFor="bdoContact">BDO's Contact No. *</InputLabel>
    //             </div>
    //             <div className="mb-4">
    //               <TextInput
    //                 id="bdoContact"
    //                 maxLength={10}
    //                 {...register("bdoContact", { required: true })}
    //                 className="mt-1 p-2 border rounded w-full"
    //               />
    //               {errors.bdoContact && (
    //                 <p className="text-red-500 text-sm">This field is required</p>
    //               )}
    //             </div>
    //           </div>

    //           {/* Buttons */}
    //           <div className="flex justify-center">
    //             <button
    //               type="submit"
    //               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 text-center"
    //             >
    //               ✔ SAVE
    //             </button>
    //             <button
    //               type="button"
    //               onClick={onClose}
    //               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
    //             >
    //               ✖ CANCEL
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden dark:bg-gray-800 transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Kindly Fill up the Delivery Centre Information.
        </h4>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Delivery Point Location Name */}
            <div className="flex flex-col">
              <div className="relative">
                <TextInput
                  id="locName"
                  placeholder="Delivery Point Location"
                  {...register("locName", {
                    required: "Delivery Point Location name is required",
                  })}
                />
                <InputLabel
                  htmlFor="locName"
                  value="Delivery Point Location"
                  mandatory={true}
                />
                {errors.locName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.locName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Point Location Address */}
            <div className="flex flex-col">
              <div className="relative">
                <TextInput
                  type="text"
                  name="locAddress"
                  id="locAddress"
                  placeholder="Address"
                  {...register("locAddress", {
                    required: "Delivery Point Location address is required",
                  })}
                />
                <InputLabel
                  htmlFor="locAddress"
                  value="Address"
                  mandatory={true}
                />
                {errors.locAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.locAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tagged Official Name */}
            <div className="flex flex-col">
              <div className="relative">
                <TextInput
                  id="taggedOfficial"
                  name="taggedOfficial"
                  placeholder="Tagged Official"
                  {...register("taggedOfficial", {
                    required: "Tagged Official name is required",
                  })}
                />
                <InputLabel
                  htmlFor="taggedOfficial"
                  value="Tagged Official"
                  mandatory={true}
                />
                {errors.taggedOfficial && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.taggedOfficial.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tagged Officer Contact Number */}
            <div className="flex flex-col">
              <div className="relative">
                <TextInput
                  id="toContact"
                  name="toContact"
                  placeholder="Contact No."
                  maxLength={10}
                  {...register("toContact", {
                    required: "Contact No. is required",
                  })}
                />
                <InputLabel
                  htmlFor="toContact"
                  value="Contact No."
                  mandatory={true}
                />
                {errors.toContact && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.toContact.message}
                  </p>
                )}
              </div>
            </div>

            {/* BDO's Contact Number */}
            <div className="flex flex-col">
              <div className="relative">
                <TextInput
                  id="bdoContact"
                  name="bdoContact"
                  placeholder="BDO's Contact No."
                  maxLength={10}
                  {...register("bdoContact", {
                    required: "BDO's Contact No. is required",
                  })}
                />
                <InputLabel
                  htmlFor="bdoContact"
                  value="BDO's Contact No."
                  mandatory={true}
                />
                {errors.bdoContact && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bdoContact.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-square"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
              <span>CANCEL</span>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-8.5"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <span>SAVE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributionLocationAdd;
