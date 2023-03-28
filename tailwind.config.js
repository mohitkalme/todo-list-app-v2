/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
        "very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "input-text-light": "hsl(235, 19%, 35%)",
        "light-border-b": "hsl(233, 11%, 84%)",
        "light-bottom-text": "hsl(236, 9%, 61%)",
        "very-dark-blue": "hsl(235, 21%, 11%)",
        "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "light-grayish-blue": "hsl(234, 39%, 85%)",
        "hover-light-grayish-blue": "hsl(236, 33%, 92%)",
        "dark-grayish-blue": "hsl(234, 11%, 52%)",
        "list-bottom-text": "hsl(233, 14%, 35%)",
        "very-dark-grayish-blue": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
