const colors = require("tailwindcss/colors");

module.exports = {
    purge: {
        content: [
            "./index.html",
            "./src/**/*.{vue,js,ts,jsx,tsx}",
            "./src/**/*.scss",
        ],
        options: {
            safelist: [/^bg-/, /^text-/, ~/^border-/],
        },
    },
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--theme-primary)",
            },
            transitionProperty: {
                width: "width",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
