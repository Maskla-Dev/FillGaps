import { useEffect, createContext, useState, useRef } from "react";
import * as ChatIO from "../services/chat/ChatIO.ts";
import DBChatService from "../services/chat/DBChatService.ts";
import { ChatChannel, ChatMessage } from "../services/chat/Models.ts";

export interface ChatArgs {
    children: React.ReactNode[] | React.ReactNode;
    employee_id: number;
}

export interface ChatContextValues {
    is_online: boolean;
    db: any;
    send: any;
}

export const ChatContext = createContext<[boolean, any, any, () => void]>( [false, null, null, () => {
}] );

function ChatProvider( {
                           children,
                           employee_id
                       }: ChatArgs ) {
    const [is_online, setIsOnline] = useState( false );
    const ws = useRef( null );
    const db = useRef( new DBChatService( employee_id ) );
    const log = useRef( [] as string[] );


    const connect = () => {
        const socket = new WebSocket( `ws://127.0.0.1:8000/ws/chat/${employee_id}` );
        socket.onopen = ( event ) => {
            console.log( event )
            setIsOnline( true );
            console.log( "Websocket opened" )
            console.log( db.current )
            // Attempt to reconnect after 1 second
        }
        socket.onmessage = ( event ) => {
            const messageSentHandler = ( receipt: ChatMessage ) => {
                console.log( receipt );
                db.current.messages.put( {
                    message_id: receipt.message_id,
                    sender: receipt.sender,
                    channel: receipt.channel,
                    content: receipt.content,
                    document: receipt.document,
                    date: receipt.date,
                } );
                log.current.push( `Message sent: ${receipt}` );
            }
            const messageReadHandler = ( data: ChatIO.Messages ) => {
                console.log( data.messages );
                data.messages.forEach( ( message ) => {
                    db.current.messages.put( message )
                    console.log( "Added message to database", message.message_id )
                } );
            }
            const messageDeletedHandler = ( data: ChatIO.MessageDeleted ) => {
                console.log( data )
            }
            const channelCreatedHandler = ( data: ChatChannel ) => {
                console.log( data )
                db.current.channels.put( {
                    channel_id: data.channel_id,
                    channel_name: data.channel_name,
                    channel_type: data.channel_type,
                    description: data.description,
                } )
                socket.send( JSON.stringify( {
                    type: "JOIN_TO_CHANNEL",
                    employee_id: employee_id,
                    channel_id: data.channel_id,
                } ) )
            }
            const channelUpdatedHandler = ( data: ChatIO.ChannelUpdated ) => {
                console.log( data )
            }
            const channelDeletedHandler = ( data: ChatIO.ChannelDeleted ) => {
                console.log( data )
            }
            const channelReadHandler = ( data: ChatIO.Channels ) => {
                console.log( data.channels );
                data.channels.forEach( ( channel ) => {
                    db.current.channels.put( channel );
                    console.log( "Added channel to database", channel.channel_id )
                } );
            }
            const channelDirectoryHandler = ( data: ChatIO.Directory ) => {
                console.log( data.employees )
                data.employees.forEach( ( employee ) => {
                    db.current.employees.put( employee );
                    console.log( "Added employee to directory", employee.employee_id )
                } );
            }
            const channelErrorHandler = ( data: ChatIO.Error ) => {
                console.log( data )
            }
            const receipt = JSON.parse( event.data ) as ChatIO.ChatServiceReceive;
            switch ( receipt.type ) {
                case "MESSAGE_SENT":
                    messageSentHandler( receipt as ChatMessage );
                    break;
                case "MESSAGES":
                    messageReadHandler( receipt as ChatIO.Messages );
                    break;
                case "MESSAGE_DELETED":
                    messageDeletedHandler( receipt as ChatIO.MessageDeleted );
                    break;
                case "CHANNEL_CREATED":
                    channelCreatedHandler( receipt as ChatChannel );
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
            setIsOnline( false )
            console.log( "Websocket closed" )
            setTimeout( connect, 1000 );
        }

        // @ts-ignore
        ws.current = socket;
        return () => {
            socket.close();
        }
    }

    useEffect( () => {
        if ( !is_online ) {
            connect();
        }
        return () => {
            // @ts-ignore
            ws.current?.close();
        };
    }, [] );

    // @ts-ignore
    const ret: [boolean, any, any, () => void] = [is_online, db.current, log.current, ws.current?.send.bind( ws.current )];

    return (
        <ChatContext.Provider value={ret}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;