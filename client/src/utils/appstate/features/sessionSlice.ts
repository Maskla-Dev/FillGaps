import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
    isLoggedIn: boolean;
    first_name: string;
    last_name: string;
}

const initialState: SessionState = {
    isLoggedIn: false,
    first_name: "",
    last_name: ""
}

export const sessionSlice = createSlice( {
    name: "session",
    initialState,
    reducers: {
        login: ( state, action: PayloadAction<SessionState> ) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
        },
        logout: ( state ) => {
            state.isLoggedIn = false;
            state.first_name = "";
            state.last_name = "";
        }
    }
} );

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;