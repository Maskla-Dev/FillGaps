import React, { useEffect, createContext, useState, useRef } from "react";
import * as ChatIO from "../services/chat/ChatIO.ts";
import DBChatService from "../../logic/services/DBChatService.ts";

export type ChatTask = "SYNC_MESSAGES" | "SYNC_CHANNELS" | "SYNC_DIRECTORY" | "NOTHING";

export interface ChatArgs {
    children: React.ReactNode[] | React.ReactNode;
    employee_id: number;
}

export interface ChatLogs {
    message_logs: string[];
    channel_logs: string[];
    directory_log: string;
    error_log: string;
}

export interface ChatState {
    is_online: boolean;
    current_task: ChatTask;
    error?: string;
    logs: ChatLogs;
}

type ChatContextType = [ChatState, any, SendFunction];

type SendFunction = () => void;

const initial_chat_state: ChatState = {
    is_online: false,
    current_task: "NOTHING",
    logs: {
        message_logs: [],
        channel_logs: [],
        error_log: "",
        directory_log: "",
    },
}

export const ChatContext = createContext<ChatContextType>( [
    initial_chat_state,
    null,
    () => {
    }] );


function ChatProvider( {
                           children,
                           employee_id
                       }: ChatArgs ) {
    const [chat_state, setChatState] = useState<ChatState>( initial_chat_state );
    const ws = useRef( null );
    const db = useRef( new DBChatService( employee_id ) );


    useEffect( () => {
        const socket = new WebSocket( `ws://127.0.0.1:8000/ws/chat/${employee_id}` );
        socket.onopen = ( event ) => {
            console.log( event )
            setChatState( current => ( {
                ...current,
                current_task: "SYNC_MESSAGES",
                is_online: true,
            } ) );
            console.log( "Websocket opened" )
            console.log( db.current )
            socket.send( JSON.stringify( {
                type: "SYNC_MESSAGES",
                employee_id: employee_id,
            } ) );
        }

        socket.onmessage = ( event ) => {
            const messageSentHandler = ( receipt: ChatIO.MessageSent ) => {
                console.log( receipt );
                db.current.messages.put( {
                    message_id: receipt.message_id,
                    sender: receipt.sender,
                    channel: receipt.channel,
                    content: receipt.content,
                    document: receipt.document,
                    date: receipt.date,
                } );
                setChatState( current => {
                    current.logs.message_logs.push( `Message ${receipt.message_id.toString()} added` );
                    return current;
                } );
            }
            const messageReadHandler = ( data: ChatIO.Messages ) => {
                console.log( data.messages );
                data.messages.forEach( ( message ) => {
                    db.current.messages.put( message )
                    console.log( "Added message to database", message.message_id )
                } );
                setChatState( current => ( {
                    ...current,
                    current_task: "SYNC_CHANNELS",
                } ) );
                socket.send( JSON.stringify( {
                    type: "SYNC_CHANNELS",
                    employee_id: employee_id,
                } ) );
            }
            const messageDeletedHandler = ( data: ChatIO.MessageDeleted ) => {
                console.log( data )
                db.current.messages.delete( data.message_id );
                setChatState( current => {
                    current.logs.message_logs.push( `Message ${data.message_id.toString()} deleted` );
                    return current;
                } );
            }
            const channelCreatedHandler = ( data: ChatIO.ChannelCreated ) => {
                console.log( data )
                db.current.channels.put( {
                    channel_id: data.channel_id,
                    channel_name: data.channel_name,
                    channel_type: data.channel_type,
                    description: data.description,
                } )
                setChatState( current => {
                    current.logs.channel_logs.push( `Channel ${data.channel_id.toString()} created` );
                    return current;
                } );
                socket.send( JSON.stringify( {
                    type: "JOIN_TO_CHANNEL",
                    employee_id: employee_id,
                    channel_id: data.channel_id,
                } ) )
            }
            const channelUpdatedHandler = ( data: ChatIO.ChannelUpdated ) => {
                console.log( data )
                db.current.channels.put( {
                    channel_id: data.channel_id,
                    channel_name: data.channel_name,
                    channel_type: data.channel_type,
                    description: data.description,
                } )
                setChatState( current => {
                    current.logs.channel_logs.push( `Channel ${data.channel_id.toString()} updated` );
                    return current;
                } );
            }
            const channelDeletedHandler = ( data: ChatIO.ChannelDeleted ) => {
                console.log( data )
                db.current.channels.delete( data.channel_id );
                setChatState( current => {
                    current.logs.channel_logs.push( `Channel ${data.channel_id.toString()} deleted` );
                    return current;
                } );
            }
            const channelReadHandler = ( data: ChatIO.Channels ) => {
                console.log( data.channels );
                data.channels.forEach( ( channel ) => {
                    db.current.channels.put( channel );
                    console.log( "Added channel to database", channel.channel_id )
                } );
                setChatState( current => ( {
                    ...current,
                    current_task: "SYNC_DIRECTORY",
                } ) );
                socket.send( JSON.stringify( {
                    type: "SYNC_DIRECTORY",
                    employee_id: employee_id,
                } ) );
            }
            const channelDirectoryHandler = ( data: ChatIO.Directory ) => {
                console.log( data.employees )
                data.employees.forEach( ( employee ) => {
                    db.current.employees.put( employee );
                    console.log( "Added employee to directory", employee.employee_id )
                } );
                setChatState( current => {
                let state = {...current}
                    state.logs.directory_log = `Directory synced with ${data.employees.length.toString()} employees`;
                    state.current_task = "NOTHING";
                    return state;
                } );
            }
            const channelErrorHandler = ( data: ChatIO.Error ) => {
                console.log( data )
                setChatState( current => ( {
                    ...current,
                    error: data.error,
                } ) );
            }
            const receipt = JSON.parse( event.data ) as ChatIO.ChatServiceReceive;
            switch ( receipt.type ) {
                case "MESSAGE_SENT":
                    messageSentHandler( receipt as ChatIO.MessageSent );
                    break;
                case "MESSAGES":
                    messageReadHandler( receipt as ChatIO.Messages );
                    break;
                case "MESSAGE_DELETED":
                    messageDeletedHandler( receipt as ChatIO.MessageDeleted );
                    break;
                case "CHANNEL_CREATED":
                    channelCreatedHandler( receipt as ChatIO.ChannelCreated );
                    break;
                case "CHANNEL_DELETED":
                    channelDeletedHandler( receipt as ChatIO.ChannelDeleted );
                    break;
                case "CHANNEL_UPDATED":
                    channelUpdatedHandler( receipt as ChatIO.ChannelUpdated );
                    break;
                case "CHANNELS":
                    channelReadHandler( receipt as ChatIO.Channels );
                    break;
                case "DIRECTORY":
                    channelDirectoryHandler( receipt as ChatIO.Directory );
                    break;
                case "ERROR":
                    channelErrorHandler( receipt as ChatIO.Error );
                    break;
                default:
                    throw new Error( "Invalid receipt type" );
            }
        }
        socket.onerror = ( event ) => {
            console.log( event )
            console.log( "Error in opening websocket" );
        }
        socket.onclose = ( event ) => {
            console.log( event );
            setChatState( initial_chat_state );
            console.log( "Websocket closed" )
        }

        // @ts-ignore
        ws.current = socket;
        return () => {
            socket.close();
        }
    }, [] );

    // @ts-ignore
    const ret: ChatContextType = [chat_state, db.current, ws.current?.send.bind( ws.current )];

    return (
        <ChatContext.Provider value={ret}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;