import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2874f0",
          dark: "#1c54ba",
          light: "#e7f0ff",
        },
        secondary: {
          DEFAULT: "#ff9f00",
          dark: "#f39400",
        },
      },
    },
  },
  plugins: [],
};
export default config;
