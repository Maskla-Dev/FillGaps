import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChatServiceReceive, ChatServiceRequest } from "../../services/chat/ChatIO.ts";
import { ChatMessage, ChatChannel, Employee } from "../../services/chat/Models.ts";

export interface ChatState {
    messages: ChatMessage[];
    channels: ChatChannel[];
    directory: Employee[];
}

const initialState: ChatState = {
    messages: [],
    channels: [],
    directory: []
}

export const chatSlice = createSlice( {
    name: "chat",
    initialState,
    reducers: {
        loadMessages: ( state, action: PayloadAction<ChatMessage[]> ) => {
            state.messages = action.payload;
        },
        loadChannels: ( state, action: PayloadAction<ChatChannel[]> ) => {
            state.channels = action.payload;
        },
        loadDirectory: ( state, action: PayloadAction<Employee[]> ) => {
            state.directory = action.payload;
        }
    }
} );

export const { loadMessages, loadChannels, loadDirectory } = chatSlice.actions;
export default chatSlice.reducer;