import card from '@material-tailwind/react/theme/components/card';

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
            screens: {
                laptop: '1366px',
            },
            colors: {
                hoverColor: '#9e5809',
                profileContainer: '#efe7da',
                cardPrice: '#faf9f5',
                primary: '#C7622B',
                aboutColor: '#1d402f',
			}
        }
    },
    plugins: [require("tailwindcss-animate")],
}
