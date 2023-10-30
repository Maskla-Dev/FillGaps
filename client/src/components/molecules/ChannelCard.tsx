import { ArrowRightCircleIcon} from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

export interface ChannelType {
    global: string;
    group: string;
    private: string;
}

export interface ChannelCardProps {
    channel_name: string;
    last_message: {
        message: string;
        is_read: boolean;
    };
    image_msg: string;
    channel_type: keyof ChannelType;
}

function ChannelCard( { channel_name, last_message, image_msg, channel_type, }: ChannelCardProps ) {
    function getChannelClass( type: keyof ChannelType ) {
        switch ( type ) {
            case 'private':
                return 'bg-teal-700';
            case 'group':
                return 'bg-cyan-700';
            case 'global':
                return 'bg-sky-700';
            default:
                return '';
        }
    }

    return (
        <>
            <div
                className={`flex flex-row items-center rounded-xl h-fit max-w-full pb-3 pt-3 pl-2 pr-1 m-1 ${getChannelClass( channel_type )}`}>
                <div className={"min-h-fit min-w-fit"}>
                    <img className={`h-12 w-12 bg-contain rounded-full object-cover object-center`} src={image_msg} alt="profile"/>
                </div>
                <div className="flex flex-col ml-3 w-full">
                    <h3 className={"font-bold text-zinc-200 truncate"}>{channel_name}</h3>
                    <div className={"flex flex-row items-center w-full h-fit"}>
                        <p className={`text-xs line-clamp-2${last_message.is_read ? "font-light text-stone-100" : "font-semibold text-orange-300"}`}>{last_message.message}</p>
                    </div>
                </div>
                <Link to={`channel/${channel_name}`}>
                    <ArrowRightCircleIcon className={"ml-3 h-8 w-8 text-amber-50 hover:text-amber-400"}/>
                </Link>
            </div>
        </>
    );
}

export default ChannelCard;