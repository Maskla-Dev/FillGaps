import { configureStore } from "@reduxjs/toolkit";
import { SessionSlice, ChatSlice } from "./features/Features.ts";

export const store = configureStore( {
    reducer: {
        session_state: SessionSlice,
        chat_state: ChatSlice
    }
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;