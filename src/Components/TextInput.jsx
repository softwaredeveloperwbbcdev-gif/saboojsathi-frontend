import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  const localRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      (ref?.current ?? localRef.current)?.focus();
    }
  }, [isFocused, ref]);

  return (
    <input
      {...props}
      type={type}
      className={
        `peer w-full border-0 border-b-2 placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-400 border-gray-300 dark:border-gray-600 bg-transparent px-0 py-1 text-base text-gray-900 dark:text-gray-100 focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none focus:ring-0 dark:autofill:text-gray-100 ` +
        className
      }
      ref={ref ?? localRef}
    />
  );
});
