import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#FAF6FB",
          100: "#F4EBF7",
          200: "#E5D2EC",
          300: "#C9A8D8",
          400: "#B584C4",
          500: "#9B5BAE",
          600: "#824198",
          700: "#6A2B7E",
          800: "#4F2061",
          900: "#3D1849",
        },
        ink: {
          100: "#F2F0F4",
          300: "#C9C4CE",
          500: "#6E6776",
          700: "#3A3340",
          900: "#15101A",
        },
        success: "#1F8F5C",
        warning: "#C97A0E",
        danger: "#B3261E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(21, 16, 26, 0.06), 0 1px 2px rgba(21, 16, 26, 0.04)",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
