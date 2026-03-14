/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#559A32',
          brandGreen: '#559A32',
          brandDark: '#1a1a1a',
        },
        borderRadius: {
          'eight': '8px',
        }
      },
    },
    plugins: [],
  }

  