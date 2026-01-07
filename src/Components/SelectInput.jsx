import { forwardRef, useRef } from "react";

export default forwardRef(function SelectInput(
  { className = "", isFocused = false, children, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  return (
    <select
      {...props}
      className={
        `peer w-full appearance-none border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 py-1 text-base leading-6 text-gray-900 dark:text-gray-100 focus:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 ` +
        className
      }
      ref={input}
    >
      {children}
    </select>
  );
});
