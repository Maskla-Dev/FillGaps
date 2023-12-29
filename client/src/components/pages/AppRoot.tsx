import { useEffect } from "react";
import { AppContext } from "../../logic/ActorContexts.ts";
import LoadingApp from "./LoadingApp.tsx";
import FillGaps from "./FillGaps.tsx";
import Login from "./Login.tsx";

const AppRoot = () => {
    const state = AppContext.useSelector( state => state );

    useEffect( () => {
        console.log("App Router", state.value );
    }, [state.value] );

    switch ( state.value ) {
        case "App Init":
        case "Get User Data":
        case "Refresh Credentials":
        case "Validate Credentials":
            return ( <LoadingApp/> );
        case "Logged Out":
        case "Logging In":
        case "Logging Error":
        case "Get Photo":
        case "Wrong User Data":
            return ( <Login/> );
        default :
            return ( <FillGaps/> );
    }
}

export default AppRoot;