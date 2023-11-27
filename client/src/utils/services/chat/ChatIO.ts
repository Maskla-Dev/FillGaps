import * as models from "./Models.ts";
import { ChatChannel, ChatMessage } from "./Models.ts";

// Types
export type RequestType = "SEND_MESSAGE" |
    "READ_MESSAGES" |
    "DELETE_MESSAGE" |
    "CREATE_CHANNEL" |
    "READ_CHANNELS" |
    "UPDATE_CHANNEL" |
    "DELETE_CHANNEL"
export type ReceiveType = "MESSAGE_SENT" |
    "MESSAGES" |
    "MESSAGE_DELETED" |
    "CHANNEL_CREATED" |
    "CHANNEL_UPDATED" |
    "CHANNEL_DELETED" |
    "CHANNELS" |
    "ERROR" |
    "DIRECTORY";

// Input
export interface ChatServiceReceive {
    type: ReceiveType;
    employee_id: number;
}

export interface MessageSent extends ChatServiceReceive, ChatMessage {
}

export interface Messages extends ChatServiceReceive {
    messages: models.ChatMessage[];
}

export interface MessageDeleted extends ChatServiceReceive {
    message_id: number;
}

export interface ChannelCreated extends ChatServiceReceive, ChatChannel {
}

export interface ChannelUpdated extends ChatServiceReceive, ChatChannel {
}

export interface ChannelDeleted extends ChatServiceReceive {
    channel_id: number;
}

export interface Channels extends ChatServiceReceive {
    channels: models.ChatChannel[];
}

export interface Error extends ChatServiceReceive {
    error: string;
}

export interface Directory extends ChatServiceReceive {
    employees: models.Employee[];
}

export interface Error extends ChatServiceReceive {
    error: string;
}

// Output
export interface ChatServiceRequest {
    type: RequestType;
    employee_id: number;
}

export interface SendMessageRequest extends ChatServiceRequest {
    message: models.ChatMessage;
}

export type ReadMessagesRequest = ChatServiceRequest;

export interface DeleteMessageRequest extends ChatServiceRequest {
    message_id: number;
}

export interface CreateChannelRequest extends ChatServiceRequest {
    channel: models.ChatChannel;
    employee_ids: number[];
}

export interface ReadChannelsRequest extends ChatServiceRequest {
    channel_type: models.ChannelType;
}

export interface UpdateChannelRequest extends ChatServiceRequest {
    channel: models.ChatChannel;
}

export interface DeleteChannelRequest extends ChatServiceRequest {
    channel_id: number;
}