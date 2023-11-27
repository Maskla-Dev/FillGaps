import ChannelsList from "../organisms/ChannelsList.tsx";
import NewChannelButton from "../atoms/NewChannelButton.tsx";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";


function Chat() {
    const [chat_state, db] = useContext( ChatContext );
    useEffect( () => {
        console.log( chat_state.is_online, db );
    }, [chat_state.is_online] );

    if ( chat_state.is_online ) {
        switch ( chat_state.current_task ) {
            case "SYNC_MESSAGES":
                return (
                    <div className={"w-full h-full flex flex-col justify-center items-center"}>
                        <h1 className={"text-2xl font-semibold text-gray-600"}>Syncing messages...</h1>
                    </div>
                )
            case "SYNC_CHANNELS":
                return (
                    <div className={"w-full h-full flex flex-col justify-center items-center"}>
                        <h1 className={"text-2xl font-semibold text-gray-600"}>Syncing channels...</h1>
                    </div>
                )
            case "SYNC_DIRECTORY":
                return (
                    <div className={"w-full h-full flex flex-col justify-center items-center"}>
                        <h1 className={"text-2xl font-semibold text-gray-600"}>Syncing employees...</h1>
                    </div>
                )
            default:
                return (
                    <div className={"w-full h-full relative"}>
                        <ChannelsList type_allowed={"PUBLIC"}/>
                        <ChannelsList type_allowed={"GROUP"}/>
                        <ChannelsList type_allowed={"PRIVATE"}/>
                        <NewChannelButton/>
                    </div>
                )
        }
    } else {
        return (
            <div className={"w-full h-full flex flex-col justify-center items-center"}>
                <h1 className={"text-2xl font-semibold text-gray-600"}>Connecting...</h1>
            </div>
        )
    }
}

export default Chat;