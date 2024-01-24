/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
        100: "#e6e8f7",
        200: "#cdd2f0",
        300: "#b5bbe8",
        400: "#9ca5e1",
        500: "#838ed9",
        600: "#6972ae",
        700: "#4f5582",
        800: "#343957",
        900: "#1a1c2b",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
        100: "#fbfafa",
        200: "#f7f6f5",
        300: "#f4f1ef",
        400: "#f0edea",
        500: "#ece8e5",
        600: "#bdbab7",
        700: "#8e8b89",
        800: "#5e5d5c",
        900: "#2f2e2e",
      },
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
        100: "#fde9e9",
        200: "#fbd3d3",
        300: "#f9bebe",
        400: "#f7a8a8",
        500: "#f59292",
        600: "#c47575",
        700: "#935858",
        800: "#623a3a",
        900: "#311d1d",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
        100: "#fbfafa",
        200: "#f7f6f5",
        300: "#f4f1ef",
        400: "#f0edea",
        500: "#ece8e5",
        600: "#bdbab7",
        700: "#8e8b89",
        800: "#5e5d5c",
        900: "#2f2e2e",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
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
};
export const plugins = [require("tailwindcss-animate")];
