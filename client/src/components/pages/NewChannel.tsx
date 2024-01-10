import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function NewChannel() {
    const role = useSelector( ( state: RootState ) => state.session_state.session?.role )
    const navigate = useNavigate();

    useEffect( () => {
        if ( ( role as string ).includes( "Manager" ) ) {
            navigate( "/chat/new/manager" );
        }
    }, [] );

    return (
        <>
            <Outlet/>
        </>
    )

}

export default NewChannel;