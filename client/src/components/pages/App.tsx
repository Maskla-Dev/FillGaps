import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import SessionInfo from "../molecules/SessionInfoProps.tsx";
import AppNav from "../molecules/AppNav.tsx";
import { useEffect } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { logout } from "../../utils/appstate/features/sessionSlice.ts";
import ChatProvider from "../../utils/hooks/ChatProvider.tsx";
import SessionStatus from "../molecules/SessionStatus.tsx";
import { BuildingOfficeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

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
                    <div className={"w-full h-full flex flex-col"}>
                        <AppNav image={session.photo} name={session.name} position={session.role}/>
                        <div className={"grow overflow-y-scroll pt-1.5"}>
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