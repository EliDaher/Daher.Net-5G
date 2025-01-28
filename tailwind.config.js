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
        secondary: "#005EFF", // لون ثانوي (اختياري)
        textColor: "1f2937",
        sectTextColor: "#6B7280",
        backColor: "f3f4f6",
        accent: "#00b8ff", // لون إضافي (اختياري)
        primary900: "#3D2500",

      },
      boxShadow: {
        'lw': '0 0px 14px -8px #3D2500',
        'hlw': '0 0px 12px -6px #3D2500',
      },
    },
  },
  plugins: [],
};
