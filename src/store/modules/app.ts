export type State = typeof state;

const state = {
    name: "You space",
    darkMode: false,
};

const mutations = {
    setDarkMode(state: State, value: boolean) {
        state.darkMode = value;

        if (value) {
            document.querySelector("html")?.classList.add("dark");
            localStorage.setItem("space:dashboard:theme:dark", "true");
        }

        if (!value) {
            document.querySelector("html")?.classList.remove("dark");
            localStorage.setItem("space:dashboard:theme:dark", "false");
        }
    },
};

export default {
    state,
    mutations,
};
