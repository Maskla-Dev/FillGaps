import ChannelCard, { ChannelCardProps, ChannelType } from "../molecules/ChannelCard.tsx";
import { useEffect } from "react";

interface ChannelsListProps {
    type_allowed: keyof ChannelType;
}

function ChannelsList( {
                           type_allowed,
                       }: ChannelsListProps ) {

    useEffect( () => {
    }, [type_allowed] );

    const channels: ChannelCardProps[] = [
        {
            channel_name: "Bugs",
            channel_type: type_allowed,
            image_msg: "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png",
            last_message: { message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", is_read: false }
        },
        {
            channel_name: "Not bugs allowed",
            channel_type: type_allowed,
            image_msg: "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png",
            last_message: { message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", is_read: true }
        }
    ]
    
    return (
        <>
            <div className={"w-full px-1 flex flex-col justify-around "}>
                {
                    channels.map( ( channel, index ) => (
                        <ChannelCard key={index} {...channel}/>
                    ) )
                }
            </div>
        </>
    );
}

export default ChannelsList;