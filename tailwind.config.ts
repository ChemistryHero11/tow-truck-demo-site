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
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        safety: {
          orange: "#f97316",
          yellow: "#eab308",
        },
        asphalt: "#1e293b",
      },
      fontFamily: {
        heading: ["Oswald", "Barlow Condensed", "sans-serif"],
        body: ["Inter", "Roboto", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "radar-ping": "radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(249, 115, 22, 0.8)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "radar-ping": {
          "0%": {
            transform: "scale(0.5)",
            opacity: "1",
          },
          "75%, 100%": {
            transform: "scale(2.5)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
