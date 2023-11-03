// import db from "./DBChatService.ts";
// import DBChatService from "./DBChatService.ts";
import * as ChatIO from "./ChatIO.ts";
import { loadChannels, loadMessages } from "../../appstate/features/chatSlice.ts";
import { useDispatch } from "react-redux";


interface ChatServiceHandler {
    messageSentHandler: ( data: ChatIO.MessageSent ) => void;
    messageDeletedHandler: ( data: ChatIO.MessageDeleted ) => void;
    channelCreatedHandler: ( data: ChatIO.ChannelCreated ) => void;
    channelDeletedHandler: ( data: ChatIO.ChannelDeleted ) => void;
    channelUpdatedHandler: ( data: ChatIO.ChannelUpdated ) => void;
    channelReadHandler: ( data: ChatIO.Channels ) => void;
    messageReadHandler: ( data: ChatIO.Messages ) => void;
}

class ChatService implements ChatServiceHandler {
    //db_chat: IDBDatabase;
    socket: WebSocket;
    messageSentHandler: ( data: ChatIO.MessageSent ) => void;
    messageDeletedHandler: ( data: ChatIO.MessageDeleted ) => void;
    channelCreatedHandler: ( data: ChatIO.ChannelCreated ) => void;
    channelDeletedHandler: ( data: ChatIO.ChannelDeleted ) => void;
    channelUpdatedHandler: ( data: ChatIO.ChannelUpdated ) => void;
    channelReadHandler: ( data: ChatIO.Channels ) => void;
    messageReadHandler: ( data: ChatIO.Messages ) => void;

    constructor( employee_id: number, handlers: ChatServiceHandler ) {
        //this.db_chat = db_chat;
        this.socket = new WebSocket( "ws://" + "127.0.0.1:8000/" + "ws/chat/" + String( employee_id ) );
        this.messageSentHandler = handlers.messageSentHandler;
        this.messageDeletedHandler = handlers.messageDeletedHandler;
        this.channelCreatedHandler = handlers.channelCreatedHandler;
        this.channelDeletedHandler = handlers.channelDeletedHandler;
        this.channelUpdatedHandler = handlers.channelUpdatedHandler;
        this.channelReadHandler = handlers.channelReadHandler;
        this.messageReadHandler = handlers.messageReadHandler;
    }

    handleError( event: any ) {
        console.log( event )
        throw new Error( "Error in opening websocket" );
    }

    handleOpen( event: any ) {
        console.log( event )
        console.log( "Websocket opened" )
        this.socket.onmessage = this.receive;
        this.socket.onerror = this.handleError;
        this.socket.onclose = this.handleClose;
    }

    handleClose( event: any ) {
        console.log( event );
        console.log( "Websocket closed" )
    }

    send<T = ChatIO.ChatServiceRequest>( request: T ) {
        if ( this.socket.readyState !== WebSocket.OPEN ) {
            throw new Error( "Websocket is not open" );
        }
        this.socket.send( JSON.stringify( request ) );
    }

    receive( event: any ) {
        const receipt = JSON.parse( event.data ) as ChatIO.ChatServiceReceive;
        switch ( receipt.type ) {
            case "MESSAGE_SENT":
                this.messageSentHandler( receipt as ChatIO.MessageSent );
                break;
            case "MESSAGES":
                this.messageReadHandler( receipt as ChatIO.Messages );
                break;
            case "MESSAGE_DELETED":
                this.messageDeletedHandler( receipt as ChatIO.MessageDeleted );
                break;
            case "CHANNEL_CREATED":
                this.channelCreatedHandler( receipt as ChatIO.ChannelCreated );
                break;
            case "CHANNEL_DELETED":
                this.channelDeletedHandler( receipt as ChatIO.ChannelDeleted );
                break;
            case "CHANNEL_UPDATED":
                this.channelUpdatedHandler( receipt as ChatIO.ChannelUpdated );
                break;
            case "CHANNELS":
                this.channelReadHandler( receipt as ChatIO.Channels );
                break;
            default:
                throw new Error( "Invalid receipt type" );
        }
    }
}

export default ChatService;