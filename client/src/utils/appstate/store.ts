import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./features/sessionSlice.ts";

export const store = configureStore( {
    reducer: {
        session: sessionSlice.reducer
    }
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;