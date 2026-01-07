// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: 0, transform: "translateX(-10px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      colors: {
        transparent: "transparent",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addVariant }) {
      addVariant("autofill", "&:-webkit-autofill");
    },
  ],
};
