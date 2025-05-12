/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#F3F4F6",
        input: "#F3F4F6",
        ring: "#FFD580",
        background: "#FAFAFA",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#FFB347",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#FFD580",
          foreground: "#0F172A",
        },
        accent: {
          DEFAULT: "#FFD580",
          foreground: "#0F172A",
        },
        success: {
          DEFAULT: "#4ADE80",
          foreground: "#fff",
        },
        error: {
          DEFAULT: "#F87171",
          foreground: "#fff",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#0F172A",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#0F172A",
        },
        popover: {
          DEFAULT: "#fff",
          foreground: "#0F172A",
        },
        nightblue: "#0F172A",
        gold: "#FFD580",
        orange: "#FFB347",
        pearl: "#F3F4F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}