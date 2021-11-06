const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
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
