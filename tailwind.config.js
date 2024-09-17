// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class", // Enable dark mode
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           light: "#3B82F6",
//           dark: "#1E40AF",
//         },
//         secondary: {
//           light: "#10B981",
//           dark: "#065F46",
//         },
//         accent: {
//           light: "#F59E0B",
//           dark: "#B45309",
//         },
//         background: {
//           light: "#F3F4F6",
//           dark: "#111827",
//         },
//         text: {
//           light: "#1F2937",
//           dark: "#F9FAFB",
//         },
//       },
//       fontFamily: {
//         sans: ["Inter", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          light: "#10B981",
          dark: "#065F46",
        },
        accent: {
          light: "#F59E0B",
          dark: "#B45309",
        },
        background: {
          light: "#F3F4F6",
          dark: "#111827",
        },
        text: {
          light: "#1F2937",
          dark: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
