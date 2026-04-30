import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "light",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 플바 디자인 토큰
        brand: {
          DEFAULT: "#5B5BD6",
          light: "#7B7BE8",
          dark: "#4646C0",
        },
        mint: {
          DEFAULT: "#00C896",
          light: "#00E0A8",
        },
        bg: {
          base: "#FFFFFF",
          card: "#F8F9FA",
          elevated: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#1A1A24",
          secondary: "#66667A",
          muted: "#9999AA",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        inter: ["Inter", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        app: "390px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      animation: {
        "count-up": "countUp 0.1s ease",
        "pulse-dot": "pulseDot 1.5s ease-in-out infinite",
        "slide-up": "slideUp 0.3s ease",
        "fade-in": "fadeIn 0.2s ease",
      },
      keyframes: {
        countUp: {
          from: { transform: "translateY(4px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        slideUp: {
          from: { transform: "translateY(12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
