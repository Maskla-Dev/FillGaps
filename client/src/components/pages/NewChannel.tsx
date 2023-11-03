import { useSession } from "../../utils/hooks/hooks.ts";
import { UserSessionData } from "../../utils/hooks/useSession.ts";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function NewChannel() {
    const [session] = useSession();
    const navigation = useNavigate();
    useEffect( () => {
        if ( isManager() ) {
            navigation( "manager/" );
        } else {
            navigation( "employee/" );
        }
    }, [] );

    function isManager() {
        return ( session as UserSessionData ).role.toLocaleLowerCase().search( "manager" ) !== -1;
    }

    return (
        <>
            {isManager() ? <Link to={"employee/"}>New channel with employee</Link> : <></>}
            <Outlet/>
        </>
    );

}

export default NewChannel;