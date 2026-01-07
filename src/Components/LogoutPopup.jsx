// components/LogoutPopup.js

const LogoutPopup = ({ message, onConfirm }) => {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-2xl bg-white text-center font-sans max-w-sm w-11/12 z-[1000] border border-gray-200 animate-fade-in
        dark:bg-gray-800 dark:border-gray-700"
    >
      <p className="text-sm text-gray-800 mb-6 leading-6 dark:text-gray-200">
        {message}
      </p>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onConfirm}
          className="w-full text-green-600 font-semibold py-3 text-sm tracking-wide hover:bg-green-50 transition-colors duration-200 focus:outline-none
                    dark:text-green-500 dark:hover:bg-gray-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
