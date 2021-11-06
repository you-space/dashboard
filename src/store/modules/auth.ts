import { ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/state";

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
    login({ commit }) {
        commit("setAuthenticated", true);
    },
};

export default {
    state,
    mutations,
    actions,
};
