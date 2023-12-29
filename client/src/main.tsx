import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoot from "./components/pages/AppRoot.tsx";
import { AppContext } from "./logic/ActorContexts.ts";
import "./index.css"
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <AppContext.Provider>
            <AppRoot/>
        </AppContext.Provider>
    </React.StrictMode>,
)
