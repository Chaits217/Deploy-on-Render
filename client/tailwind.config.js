/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        surface: "#151E2E",
        border: "#243147",
        paper: "#F8FAFC",
        muted: "#8996AC",
        accent: {
          DEFAULT: "#3B82F6",
          soft: "#60A5FA",
        },
        good: "#22C55E",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
