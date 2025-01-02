// tailwind.config.js
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeBg: "var(--theme-bg)",
        themeSecondary: "var(--theme-secondary)",
        textGray: "var(--text-gray)",
      },
      width: {
        themeContainer: "var(--theme-container)"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
