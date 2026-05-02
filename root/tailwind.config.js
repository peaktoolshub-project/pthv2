/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          green: "#22c55e",
          blue: "#3b82f6",
          purple: "#a855f7",
          amber: "#f59e0b",
          red: "#ef4444",
          cyan: "#06b6d4",
        },
        surface: {
          DEFAULT: "#0a0a14",
          elevated: "#111122",
          card: "rgba(255,255,255,0.03)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease",
        "slide-up": "slideUp 0.3s ease",
        "count-up": "countUp 0.5s ease",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0, transform: "translateY(8px)" }, "100%": { opacity: 1, transform: "none" } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "none" } },
      },
    },
  },
  plugins: [],
};
