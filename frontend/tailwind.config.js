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
        },
        borderRadius: {
          'eight': '8px',
        }
      },
    },
    plugins: [],
  }

  