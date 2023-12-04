import { App, Login } from "./components/pages/Pages.ts";
import './index.css';
import { AppContext } from "./fullstate.tsx";
import { useEffect } from "react";


const MainStateFull = () => {
    const state = AppContext.useSelector( state => state );
    useEffect( () => {
        console.log( state.value );
    }, [state.value] );

    if ( !state.matches( "fillgaps-app" ) ) {
        return (
            <Login/>
        )
    } else {
        return ( <App/> );
    }
}

export default MainStateFull;