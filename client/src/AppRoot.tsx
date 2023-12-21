import { useEffect } from "react";
import { AppContext } from "./logic/ActorContexts.ts";
import { Login, App } from "./components/pages/Pages.ts";
import LoadingApp from "./components/pages/LoadingApp.tsx";

const AppRoot = () => {
    const state = AppContext.useSelector( state => state );

    useEffect( () => {
        console.log( state.value );
    }, [state.value] );

    switch ( state.value ) {
        case "App Init":
        case "Get user data":
        case "Refresh Credentials":
        case "Validate credentials":
            return ( <LoadingApp/> );
        case "logged-out":
        case "logging-in":
        case "logging-error":
        case "get-photo":
        case "wrong-user-data":
            return ( <Login/> );
        default :
            return ( <App/> );
    }
}

export default AppRoot;