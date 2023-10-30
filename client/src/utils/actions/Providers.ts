import axios, { AxiosInstance } from "axios";

const provider: AxiosInstance = axios.create( {
    baseURL: import.meta.env.VITE_SERVER_URL,
} );

const chat_provider = new WebSocket("ws://"+ "127.0.0.1:8000/" + import.meta.env.VITE_CHAT_ENDPOINT);

export {provider, chat_provider };