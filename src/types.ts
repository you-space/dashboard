import { App } from "vue";
import { Router } from "vue-router";
// import { Store } from 'vuex'
// import { RootState } from './store/state'

export interface AppContext {
    app: App;
    router: Router;
    //   store: Store<RootState>
}

export interface YPlugin {
    (ctx: AppContext): void | Promise<void>;
}
