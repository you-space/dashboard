import { State as AuthState } from "./modules/auth";
import { State as AppState } from "./modules/app";

export interface RootState {
    auth: AuthState;
    app: AppState;
}
