import ChannelCard from "../molecules/ChannelCard.tsx";
import { ReactNode, useContext } from "react";
import { ChannelType, ChatChannel } from "../../utils/services/chat/Models.ts";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { useLiveQuery } from "dexie-react-hooks";

interface ChannelsListProps {
    type_allowed: ChannelType;
}

function ChannelsList( {
                           type_allowed,
                       }: ChannelsListProps ) {
    const [chat_state, db] = useContext( ChatContext );
    const channel_containers = useLiveQuery( async () => {
        let container: ReactNode[] = [];
        ( await db.channels.where( 'channel_type' ).equals( type_allowed ).toArray() ).forEach( ( channel: ChatChannel ) => {
            console.log( channel )
            container.push( <ChannelCard key={channel.channel_name} {...channel}/> )
        } );
        return container;
    }, [db, chat_state.logs.channel_logs] );

    return (
        <>
            <div className={"w-full px-1 flex flex-col justify-around "}>
                {channel_containers}
            </div>
        </>
    );
}

export default ChannelsList;