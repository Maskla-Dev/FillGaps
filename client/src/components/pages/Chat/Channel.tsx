import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Messages from "../../organisms/Messages.tsx";
import React, { useContext, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { ChatMessage, ChannelType } from "../../../utils/services/chat/Models.ts";
import { useLiveQuery } from "dexie-react-hooks";
import { ChatContext } from "../../../utils/hooks/ChatProvider.tsx";
import { SendMessageRequest } from "../../../utils/services/chat/ChatIO.ts";

function getChannelColor(type: ChannelType){
    switch ( type ) {
            case 'PRIVATE':
                return {
                    main: 'bg-teal-100',
                    secondary: 'bg-teal-300',
                    background: 'bg-teal-700',
                    font: 'text-teal-700'
                };
            case 'GROUP':
                return {
                    main: 'bg-cyan-100',
                    secondary: 'bg-cyan-300',
                    background: 'bg-cyan-700',
                    font: 'text-cyan-700'
                };
            case 'PUBLIC':
                return {
                    main: 'bg-sky-100',
                    secondary: 'bg-sky-300',
                    background: 'bg-sky-700',
                    font: 'text-sky-700'
                };
            default:
                return '';
        }
}

function Channel() {
    const { channel_name } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState( "" );
    // @ts-ignore
    const [chat_state, db, send] = useContext( ChatContext );
    const user_id = useSelector( ( state: RootState ) => state.session_state.session?.user_id );

    const channel = useLiveQuery( async () => {
        return await db.channels.where( 'channel_name' ).equals( channel_name ).first();
    }, [chat_state.logs.channel_logs] );

    function sendButton( event: React.MouseEvent<SVGSVGElement> ) {
        event.preventDefault();
        if ( channel && user_id ) {
            let to_send: ChatMessage = {
                channel: channel.channel_id,
                sender: user_id,
                message_id: 0,
                content: message,
                date: 0,
            }
            let request: SendMessageRequest = {
                type: "SEND_MESSAGE",
                employee_id: user_id,
                message: to_send,
            }
            // @ts-ignore
            send( JSON.stringify( request ) );
            setMessage( "" )
        }
    }

    const colors = useMemo(()=>{
        if(channel)
            return getChannelColor(channel.channel_type);
        else
            return undefined;
    }, [channel]);

    if ( channel_name === undefined ) {
        return <div className={""}>Channel not found</div>
    }
    if( channel ){
        return (
            <div className={`flex flex-col w-full ${colors.main} h-full overflow-y-scroll`}>
                <header className={`flex flex-row justify-between w-full px-5 items-center ${colors.secondary} py-2`}>
                    <nav className={`flex p-0.5 h-7 w-7 rounded-full ${colors.background}`} onClick={() => navigate( -1 )}>
                        <ChevronLeftIcon className={"self-center w-full h-full stroke-white hover:cursor-pointer"}/>
                    </nav>
                    <div className={"basis-8/12 flex flex-row items-center justify-end"}>
                        <ExclamationCircleIcon className={"w-8 fill-indigo-400 mr-1 hover:cursor-help"}/>
                        <h1 className={`text-md font-bold ${colors.font} truncate`}>{channel_name}</h1>
                    </div>
                </header>
                <Messages channel_name={channel_name} channel_type={channel.channel_type}/>
                <div className={`flex items-center py-3 ${colors.secondary} px-2`}>
                    <div className={"flex flex-row items-center"}>
                        <DocumentTextIcon className={"w-8 stroke-indigo-700"}/>
                        <PhotoIcon className={"w-8 stroke-indigo-700"}/>
                    </div>
                    <textarea
                        className={"w-full mx-3 resize-none py-3 px-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"}
                        onChange={( e ) => {
                            setMessage( e.target.value );
                        }}
                        value={message}
                    ></textarea>
                    <PaperAirplaneIcon className={"w-8 fill-indigo-700"} onClick={sendButton}/>
                </div>
            </div>
        );
    }
}

export default Channel;