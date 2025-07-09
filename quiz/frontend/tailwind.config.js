module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F8A8B", // soft teal
          light: "#CDE8E5",
          dark: "#395B64",
        },
        background: {
          DEFAULT: "#F9FAFB", // very light gray
          soft: "#F3F4F6",
        },
        accent: {
          DEFAULT: "#F9ED69", // soft yellow
          light: "#FFF9C4",
        },
      },
    },
  },
  plugins: [],
};
