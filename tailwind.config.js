/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "serif"], // Make sure it's in quotes
      },
      colors: {
        'lavender': '#945E34',
        'overlay': '#FDF8C0',
        'buttons': '#945E34',
        'textColor': '#FDD496'
      },
      spacing: {
        'touchscreenW': '1024px',
        'touchscreenH': '600px',
        'innerboxW': '972px',
        'innerboxH': '529px',
        'imageH': '590px'
      }
    },
  },
  plugins: [],
};


