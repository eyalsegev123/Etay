module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind applies styles to your React components
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  };
  