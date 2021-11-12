const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
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
