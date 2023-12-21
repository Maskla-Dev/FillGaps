import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoot from "./AppRoot.tsx";
import { AppContext } from "./logic/ActorContexts.ts";
import "./index.css"

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <AppContext.Provider>
            <AppRoot/>
        </AppContext.Provider>
    </React.StrictMode>,
)
