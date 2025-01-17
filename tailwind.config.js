/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF8A00", // لون رئيسي (مثلاً أخضر)
        secondary: "#FF5722", // لون ثانوي (اختياري)
        accent: "#FFC107", // لون إضافي (اختياري)
        primary900: "#3D2500",
      },
      boxShadow: {
        'lw': '0 0px 20px -8px #3D2500',
        'hlw': '0 0px 18px -6px #3D2500',
      },
    },
  },
  plugins: [],
};
