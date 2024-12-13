import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
			"bg-000": "#ffffff",
			"bg-100": "#e6e6e6",
			"bg-200": "#cccccc",
			"bg-300": "#b3b3b3",
			"bg-400": "#999999",
			"bg-500": "#808080",
			"bg-600": "#666666",
			"bg-700": "#242424",
			"bg-800": "#000000",
			"primary-000": "#ffffff",
			"primary-100": "#f48fb1",
			"primary-200": "#ec407a",
			"primary-300": "#e91e63",
			"primary-400": "#d81b60",
			"primary-500": "#c2185b",
			"primary-600": "#a4144f",
			"primary-700": "#821140",
			"primary-800": "#67001f",
			"primary-900": "#000000",
			"secondary-000": "#ffffff",
			"secondary-100": "#b2ebf2",
			"secondary-200": "#80deea",
			"secondary-300": "#4dd0e1",
			"secondary-400": "#26c6da",
			"secondary-500": "#00acc1",
			"secondary-600": "#008ba3",
			"secondary-700": "#006978",
			"secondary-800": "#004d58",
			"secondary-900": "#000000",
		}
  	}
  },
  plugins: [animate],
}

