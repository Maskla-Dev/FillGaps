type ChannelType = "PUBLIC" | "GROUP" | "PRIVATE";

interface ChatMessage {
    message_id: number;
    content: string;
    date: number;
    document?: string;
    channel: number;
    sender: number;
}

interface ChatChannel {
    channel_id: number;
    channel_name: string;
    description: string;
    channel_type: ChannelType;
}

interface Employee {
    employee_id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    photo_link: string;
}

export type { ChatChannel, ChatMessage, ChannelType, Employee };