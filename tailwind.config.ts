import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        light: ["var(--font-ralewayLight)", "sans-serif"],
        reg: ["var(--font-ralewayNormal)", "sans-serif"],
        med: ["var(--font-ralewayMedium)", "sans-serif"],
        sb: ["var(--font-ralewaySemiBold)", "sans-serif"],
        b: ["var(--font-ralewayBold)", "sans-serif"],
        deb: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};
export default config;
