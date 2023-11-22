import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";
import { ChannelType, ChatChannel, ChatMessage, Employee } from "../../utils/services/chat/Models.ts";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { useLiveQuery } from "dexie-react-hooks";

function ChannelCard( { channel_name, channel_type }: ChatChannel ) {
    const [is_online, db, log] = useContext( ChatContext );
    const [last_message, setLastMessage] = useState<ChatMessage>();
    const [employee_data, setEmployeeData] = useState<Employee>();
    const query = useLiveQuery( async () => {
        let last_message = await db.messages.get( { channel: channel_name } );
        console.log( last_message )
        if ( !last_message ) return ( { last_message: undefined, employee_data: undefined } );
        let employee_data = await db.employees.get( { employee_id: last_message?.sender } );
        return { last_message, employee_data };
    }, [db, log] );

    useEffect( () => {
        if ( query ) {
            console.log( query.last_message, query.employee_data )
            setLastMessage( query.last_message );
            setEmployeeData( query.employee_data );
        }
    }, [query] );

    function getChannelClass( type: ChannelType ) {
        switch ( type ) {
            case 'PRIVATE':
                return 'bg-teal-700';
            case 'GROUP':
                return 'bg-cyan-700';
            case 'PUBLIC':
                return 'bg-sky-700';
            default:
                return '';
        }
    }

    if ( !employee_data ) return ( <div>loading...</div> );
    return (
        <>
            <div
                className={`flex flex-row items-center rounded-xl h-fit max-w-full pb-3 pt-3 pl-2 pr-1 my-1.5 mx-1 ${getChannelClass( channel_type )}`}>
                <div className={"min-h-fit min-w-fit"}>
                    <img className={`h-12 w-12 bg-contain rounded-full object-cover object-center`}
                         src={employee_data.photo_link}
                         alt="profile"/>
                </div>
                <div className="flex flex-col ml-3 w-full">
                    <h3 className={"font-bold text-zinc-200 truncate"}>{channel_name}</h3>
                    {last_message ? ( <div className={"flex flex-row items-center w-full h-fit"}>
                        <p className={`text-xs line-clamp-2 font-semibold text-orange-300`}>{last_message.content}</p>
                    </div> ) : ( <></> )}
                </div>
                <Link to={`channel/${channel_name}`}>
                    <ArrowRightCircleIcon className={"ml-3 h-8 w-8 text-amber-50 hover:text-amber-400"}/>
                </Link>
            </div>
        </>
    );
}

export default ChannelCard;