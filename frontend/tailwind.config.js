/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#46812F',
        brandGreen: '#46812F',
        brandDark: '#1a1a1a',
        dimelco: {
          primary: '#46812F',
          secondary: '#366324',
          light: '#eef6ec',
        },
      },
      borderRadius: {
        'eight': '8px',
        'custom': '8px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
