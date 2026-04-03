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
        primary: "#d81d1d",
        "primary-dark": "#8c1415",
        neutral: "#555555",
        dark: "#1a1a1a",
        light: "#f5f5f5",
      },
      fontFamily: {
        heading: ["Oswald", "Arial Narrow", "sans-serif"],
        body: ["PT Sans", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
