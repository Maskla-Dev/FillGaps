import ChannelsList from "../organisms/ChannelsList.tsx";
import NewChannelButton from "../atoms/NewChannelButton.tsx";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";


function Chat() {
    const [is_online, db] = useContext( ChatContext );
    useEffect( () => {
        console.log( is_online, db );
    }, [is_online] );

    return (
        <>
            {
                is_online ? <>
                    <div className={"w-full h-full overflow-y-scroll relative"}>
                        <ChannelsList type_allowed={"PUBLIC"}/>
                        <ChannelsList type_allowed={"GROUP"}/>
                        <ChannelsList type_allowed={"PRIVATE"}/>
                        <NewChannelButton/>
                    </div>
                </> : <div>loading...</div>
            }
        </>
    );
}

export default Chat;