// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", // indigo-500
          dark: "#4F46E5",
          light: "#EEF2FF",
        },
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
