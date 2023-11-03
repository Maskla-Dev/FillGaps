import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { doLogin, doLogout } from "../../actions/actions.ts";
import { getSession } from "../../actions/UserSession.ts";

export interface LoginData {
    username: string;
    password: string;
}

export interface BasicEmployeeData {
    user_id: number;
    name: string;
    role: string;
    photo: string;
}

export interface UserSessionData extends BasicEmployeeData {
    tokens: {
        access: string;
        refresh: string;
    };
}

export interface SessionState {
    session: UserSessionData | null;
}

const initialState: SessionState = {
    session: getSession()
};

// @ts-ignore
const loginAsync = createAsyncThunk( 'session/login', async ( loginData: LoginData, thunkAPI ) => {
    let res = await doLogin( loginData.username, loginData.password );
    console.log( res );
    return res;
} );

export const sessionSlice = createSlice( {
    name: "session",
    initialState,
    reducers: {
        logout: ( state ) => {
            doLogout();
            state.session = null;
        }
    },
    extraReducers: ( builder ) => {
        builder.addCase( loginAsync.fulfilled, ( state, action: PayloadAction<UserSessionData | null> ) => {
            state.session = action.payload;
        } );
    }
} );

export const { logout } = sessionSlice.actions;
export { loginAsync };
export default sessionSlice.reducer;