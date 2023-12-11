/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#22355E',
        'second-color': '#F1F2E8',
        'green-color': '#28D582',
        'orange-color': '#FD7D55',
        'holiday-color': '#DE7665',
        'offline-color': '#F3CCAC',
        'weekend-color': '#B9C0E0',
        'border-color': '#22355EB2',
      },
      boxShadow: {
        '3xl': '0px 3px 5px 0px rgba(0, 0, 0, 0.10);',
      },
    },
  },
  plugins: [],
};
