import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aep: {
          teal: "#00FFD1",
          indigo: "#3A0CA3",
          violet: "#8338EC",
          obsidian: "#0C0F13",
          pearl: "#F8F9FA",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        "aep-glow": "0 0 24px rgba(0, 255, 209, 0.35)",
      },
      backgroundImage: {
        "aep-gradient":
          "linear-gradient(135deg, #00FFD1 0%, #3A0CA3 40%, #8338EC 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
