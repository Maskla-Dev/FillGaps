import React from 'react'
import ReactDOM from 'react-dom/client'
import MainStateFull from "./MainStateFull.tsx";
import { createActorContext } from "@xstate/react";
import AppMachine from "./logic/AppMachine.ts";

export const AppContext = createActorContext( AppMachine );

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <AppContext.Provider>
            <MainStateFull/>
        </AppContext.Provider>
    </React.StrictMode>,
)