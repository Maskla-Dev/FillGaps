import { Link, Outlet, useNavigate } from "react-router-dom";
import SessionInfo from "../molecules/SessionInfo.tsx";
import AppNav from "../molecules/AppNav.tsx";
import { useEffect } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { logout } from "../../utils/appstate/features/sessionSlice.ts";
import ChatProvider from "../../utils/hooks/ChatProvider.tsx";

function App() {
    const session = useSelector( ( state: RootState ) => state.session_state.session );
    const dispatch = useDispatch();
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
                    <header
                        className={"w-full h-fit bg-blue-600 flex items-center justify-between pr-2 shadow-black shadow-sm"}>
                        <SessionInfo image={session.photo} name={session.name} position={session.role}/>
                        <ArrowLeftOnRectangleIcon className={"h-8 w-8 text-white"} onClick={() => {
                            dispatch( logout() );
                            navigate( "/login" );
                        }}/>
                    </header>
                    <AppNav/>
                    <Outlet/>
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