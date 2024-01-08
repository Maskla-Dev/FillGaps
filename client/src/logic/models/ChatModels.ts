import { Employee } from "./EmployeesManagementModels.ts";

export const ChannelTypes = ["PUBLIC", "GROUP", "PRIVATE"] as const;
export type ChannelType = typeof ChannelTypes[number];

export const ChatConnectionStates = ["CONNECTING", "SYNC", "OPEN", "CLOSING", "CLOSED"] as const;
export type ChatConnectionState = typeof ChatConnectionStates[number];

export interface ChatMessage {
    message_id: number;
    content: string;
    date: number;
    document?: string;
    channel: number;
    sender: number;
}

export interface ChatChannel {
    channel_id: number;
    channel_name: string;
    description: string;
    channel_type: ChannelType;
    messages: ChatMessage[];
    chat_members: Employee[];
}