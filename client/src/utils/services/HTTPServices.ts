import axios, { AxiosInstance } from "axios";

const RESTAPIProvider: AxiosInstance = axios.create( {
    baseURL: import.meta.env.VITE_SERVER_URL,
} );

export { RESTAPIProvider };