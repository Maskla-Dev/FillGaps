import Loader from "../atoms/Loader.tsx";
import { AppContext } from "../../logic/ActorContexts.ts";
import { useEffect, useState } from "react";
import { StateValue } from "xstate";

const MessageTracker = ( state: StateValue ) => {
    switch ( state ) {
        case "App Init":
            return "Initializing application...";
        case "Get User Data":
            return "Getting user data...";
        case "Refresh Credentials":
            return "Refreshing credentials...";
        case "Validate Credentials":
            return "Validating credentials...";
        default:
            return "Loading...";
    }
}

const LoadingApp = () => {
    const state = AppContext.useSelector( state => state );
    const [message, setMessage] = useState( MessageTracker( state.value ) );

    useEffect( () => {
        setMessage( MessageTracker( state.value ) );
    }, [state.value] );

    return (
        <div className={"w-full h-full flex flex-col items-center justify-center"}>
            <h1>{message}</h1>
            <Loader/>
        </div>
    )
}

export default LoadingApp;