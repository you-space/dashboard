import {
    createStore as baseCreateStore,
    useStore as baseUseStore,
    Store,
} from "vuex";
import { InjectionKey } from "vue";

import { RootState } from "./state";

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}

const modules = Object.entries(import.meta.globEager("./modules/*.ts"))
    .map(([key, value]) => ({
        name: key.replace(/^\.\/modules\/(.*)\.ts$/, "$1"),
        module: {
            namespaced: true,
            ...value.default,
        },
    }))
    .reduce((all, current) => ({ ...all, [current.name]: current.module }), {});

export function createStore() {
    const store = baseCreateStore<RootState>({
        modules,
    });

    return store;
}
