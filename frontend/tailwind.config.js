/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#2D3748',
          light: '#4A5568',
          dark: '#1A202C',
        },
        background: {
          DEFAULT: '#F9F7F4',
          warm: '#FBF9F7',
          surface: '#FFFFFF',
        },
        text: {
          primary: '#2D3748',
          secondary: '#718096',
          muted: '#A0AEC0',
        },
      },
      fontFamily: {
        sans: ['Heebo', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Frank Ruhl Libre', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
