import AppNav from "../molecules/AppNav.tsx";
import ChatProvider from "../../utils/hooks/ChatProvider.tsx";
import { AppContext } from "../../fullstate.tsx";
import Chat from "./Chat.tsx";

function App() {
    const session = AppContext.useSelector( state => state.context.user_data );
    const state = AppContext.useSelector( state => state );
    return (
        <>
            <ChatProvider employee_id={session.user_id}>
                <div className={"w-full h-full flex flex-col"}>
                    <AppNav image={session.photo} name={session.name} position={session.role}/>
                    <div className={"grow overflow-y-scroll"}>
                        {
                            state.matches( "fillgaps-app" ) ?
                                <></> :
                                <Chat/>
                        }
                    </div>
                </div>
            </ChatProvider>
        </>
    );
}

export default App;