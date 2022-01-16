module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                header: "3rem",
                footer: "3.5rem",
            },
            minHeight: theme => ({
                main: `calc(100vh - ${theme("height.header")} - ${theme("height.footer")})`,
                48: "12rem",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
