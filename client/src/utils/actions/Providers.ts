import axios, { AxiosInstance } from "axios";

const provider: AxiosInstance = axios.create( {
    baseURL: import.meta.env.VITE_SERVER_URL,
} );

export { provider };