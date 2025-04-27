/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "color(from var(--color-primary) srgb r g b / <alpha-value>)",
        onPrimary: "color(from var(--color-on-primary) srgb r g b / <alpha-value>)",

        secondary: "color(from var(--color-secondary) srgb r g b / <alpha-value>)",
        onSecondary: "color(from var(--color-on-secondary) srgb r g b / <alpha-value>)",

        third: "color(from var(--color-third) srgb r g b / <alpha-value>)",
        onThird: "color(from var(--color-on-third) srgb r g b / <alpha-value>)",

        colorOther: "color(from var(--color-other) srgb r g b / <alpha-value>)",
        colorOther2: "color(from var(--color-other-2) srgb r g b / <alpha-value>)",
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}
