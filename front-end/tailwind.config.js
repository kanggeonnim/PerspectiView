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
    colors: {
      border: "var(--border)",
      google: { DEFAULT: "var(--google)", accent: "var(--google-accent)" },
      kakao: { DEFAULT: "var(--kakao)", accent: "var(--kakao-accent)" },
      naver: { DEFAULT: "var(--naver)", accent: "var(--naver-accent)" },
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      progress: { DEFAULT: "var(--progress)", foreground: "var(--progress-foreground)" },
      unused: { DEFAULT: "var(--unused)", foreground: "var(--unused-foreground)" },
      completed: { DEFAULT: "var(--completed)", foreground: "var(--completed-foreground)" },
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
        accent: "var(--primary-accent)",
        light: "var(--primary-light)",
        "accent-light": "var(--primary-accent-light)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
        accent: "var(--secondary-accent)",
      },
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      badge: {
        DEFAULT: "var(--badge)",
        accent: "var(--badge-accent)",
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
    dropShadow: {
      custom: "0 24px 60px rgba(0, 0, 0, 0.3)",
      "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
      "4xl": ["0 35px 35px rgba(0, 0, 0, 0.25)", "0 45px 65px rgba(0, 0, 0, 0.15)"],
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
