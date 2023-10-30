import { useReducer } from "react";
import { chat_provider } from "../actions/Providers";

export interface ChatArgs{

}

function reducer(state, action){

}

function useChat(args: ChatArgs){
    const [state, dispatch] = useReducer(reducer, {});

    return [state. dispatch];
}

export default useChat;