import ChannelsList from "../organisms/ChannelsList.tsx";

function Chat() {


    return (
        <div className={"w-full h-full overflow-y-scroll"}>
            <ChannelsList type_allowed={"global"}/>
            <ChannelsList type_allowed={"group"}/>
            <ChannelsList type_allowed={"private"}/>
        </div>
    )
}

export default Chat;