import { App } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";
import { RootState } from "./store/state";

export interface AppContext {
    app: App;
    router: Router;
    store: Store<RootState>;
}

export interface YPlugin {
    (ctx: AppContext): void | Promise<void>;
}

export interface ServerPaginationMeta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
}

export interface ServerPagination<T = any> {
    meta: ServerPaginationMeta;
    data: T[];
}
