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
        primary: {
          DEFAULT: "#103158",
          50:  "#F1F4F9",
          100: "#E4EAF3",
          200: "#C9D3E0",
          300: "#9FB0C5",
          400: "#6E849F",
          500: "#4A6485",
          600: "#2A5A94",
          700: "#1B4577",
          800: "#103158",
          900: "#0C2749",
          950: "#091B34",
        },
        accent: {
          DEFAULT: "#0B6E8F",
          light:   "#339BBA",
          50:  "#E8F4F8",
          100: "#D2E9F1",
          500: "#0B6E8F",
          600: "#339BBA",
        },
        crimson: {
          DEFAULT: "#B8324A",
          dark:    "#9C2A3F",
          50:      "#FBEFF1",
        },
        paper: "#F7F5F0",
        ink:   "#14213A",
        muted: "#55657A",
        line:  "#E3E7EE",
        tint:  "#EEF3F9",
        sand:  "#EFE9DC",
        "on-dark": {
          DEFAULT: "#C9D3E0",
          link:    "#8FD0E3",
        },
        brand: {
          navy: "#103158",
          "navy-secondary": "#0C2749",
          blue: "#0B6E8F",
          cyan: "#339BBA",
          crimson: "#B8324A",
          "light-bg": "#F7F5F0",
          text: "#14213A",
          "text-muted": "#55657A",
          border: "#E3E7EE",
        },
      },
      fontFamily: {
        sans:    ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg:      "10px",
        xl:      "14px",
        "2xl":   "20px",
        "3xl":   "28px",
      },
      boxShadow: {
        card:  "0 1px 2px rgba(12,39,73,.05), 0 12px 32px -16px rgba(12,39,73,.14)",
        lift:  "0 2px 4px rgba(12,39,73,.06), 0 24px 48px -20px rgba(12,39,73,.28)",
        float: "0 28px 64px -28px rgba(9,27,52,.50)",
      },
      maxWidth: { content: "1200px", prose: "65ch" },
      fontSize: {
        display: ["clamp(2.75rem, 1.5rem + 4.6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
