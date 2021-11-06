import { MutationTree } from "vuex";

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

export default {
    state,
    mutations,
};
