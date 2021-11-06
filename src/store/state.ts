import { State as AuthState } from "./modules/auth";

export interface RootState {
    auth: AuthState;
}
