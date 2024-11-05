/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                adminModal: '#f0ba7d',
                primary: '#cf740e',
                trColor: '#e6a65e',
                tdColor: '#edd7be',
                hoverColor: '#9e5809',
			}
        }
    },
    plugins: [require("tailwindcss-animate")],
}
