import { Link, Outlet, useNavigate } from "react-router-dom";
import AppNav from "../molecules/AppNav.tsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import ChatProvider from "../../utils/hooks/ChatProvider.tsx";

function App() {
    const session = useSelector( ( state: RootState ) => state.session_state.session );
    const navigate = useNavigate();

    useEffect( () => {
        if ( !session ) {
            console.log( session );
            navigate( "/login" );
        }
    }, [session] );

    if ( session ) {
        return (
            <>
                <ChatProvider employee_id={session.user_id}>
                    <div className={"w-full h-full flex flex-col"}>
                        <AppNav image={session.photo} name={session.name} position={session.role}/>
                        <div className={"grow overflow-y-scroll"}>
                            <Outlet/>
                        </div>
                    </div>
                </ChatProvider>
            </>
        )
    } else {
        return (
            <>
                <Link to={"/login"}>Go to Login</Link>
            </>
        );
    }

}

export default App;