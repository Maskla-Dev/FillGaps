/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                "grow-height": {
                    "0%": { height: "0" },
                    "100%": { height: "fit-content" },
                },
                "grow-width": {
                    "0%": { width: "0" },
                    "100%": { width: "fit-content" },
                },
                "decrease-height": {
                    "0%": { height: "fit-content" },
                    "100%": { height: "0" },
                },
                "decrease-width": {
                    "0%": { width: "fit-content" },
                    "100%": { width: "0" },
                }
            },
            animation: {
                "grow-height": "grow-height 0.5s ease-in-out",
                "grow-width": "grow-width 0.5s ease-in-out",
                "decrease-height": "decrease-height 0.5s ease-in-out",
                "decrease-width": "decrease-width 0.5s ease-in-out",
            },
        },
    },
    plugins: [
        require( 'tailwindcss-animated' )
    ],
}

