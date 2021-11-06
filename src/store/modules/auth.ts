import { ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/state";
import { api } from "@/compositions/axios";

export type State = typeof state;

const state = {
    authenticated: false,
    user: null as null | any,
};

const mutations: MutationTree<State> = {
    setAuthenticated(state, authenticated) {
        state.authenticated = authenticated;
    },
    setUser(state, user) {
        state.user = user;
    },
};

const actions: ActionTree<State, RootState> = {
    async login({ commit, dispatch }) {
        return api
            .get("/auth/user")
            .then((response) => {
                commit("setAuthenticated", true);
                commit("setUser", response.data);
            })
            .catch(() => dispatch("logout"));
    },
    async logout({ commit, dispatch }) {
        return api.post("/auth/logout").finally(() => {
            commit("setAuthenticated", true);
            commit("setUser", null);
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
