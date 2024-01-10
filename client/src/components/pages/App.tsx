import { Link, Outlet, useNavigate } from "react-router-dom";
import SessionInfo from "../molecules/SessionInfo.tsx";
import AppNav from "../molecules/AppNav.tsx";
import { useEffect, useState } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { logout } from "../../utils/appstate/features/sessionSlice.ts";
import ChatProvider from "../../utils/hooks/ChatProvider.tsx";

function App() {
    const session = useSelector( ( state: RootState ) => state.session_state.session );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPanel, setIsPanel] = useState( false );

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
                        <AppNav is_panel={isPanel} onButtonClick={( isPanel ) => {
                            setIsPanel( isPanel );
                        }}/>
                        <Outlet/>
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