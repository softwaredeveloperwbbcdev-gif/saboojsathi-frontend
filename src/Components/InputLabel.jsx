export default function InputLabel({
  value,
  className = "",
  children,
  mandatory = false,
  ...props
}) {
  return (
    <label
      {...props}
      className={
        `absolute -top-3 left-0 z-10 origin-[0] scale-75 transform text-base text-gray-500 dark:text-gray-400 duration-300 peer-placeholder-shown:translate-y-3.5 peer-placeholder-shown:scale-105 peer-placeholder-shown:text-black dark:peer-placeholder-shown:text-white peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-black dark:peer-focus:text-white text-nowrap` +
        className
      }
    >
      {value ? value : children}{" "}
      {mandatory && <span className="inline text-red-600">*</span>}
    </label>
  );
}
