import { configureStore } from "@reduxjs/toolkit";
import { SessionSlice } from "./features/Features.ts";

export const store = configureStore( {
    reducer: {
        session_state: SessionSlice,
    }
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;