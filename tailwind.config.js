const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: "class",
    theme: {
        colors: {
            ...colors,
            primary: "var(--color-primary)",
        },
        extend: {
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
