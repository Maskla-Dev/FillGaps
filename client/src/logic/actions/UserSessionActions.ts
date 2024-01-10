import { RESTAPIProvider } from "../services/HTTPServices.ts";
import { jwtDecode } from "jwt-decode";

export interface BasicEmployeeData {
    user_id: number;
    name: string;
    role: string;
    photo: string;
}

export interface UserSessionData extends BasicEmployeeData {
    tokens: {
        access: string;
        refresh: string;
    }
}

export const doLogout = () => {
    sessionStorage.removeItem( "user_session" );
    return false
}

export const doLogin = async ( username: string, password: string ): Promise<UserSessionData | string> => {
    try {
        let response = await RESTAPIProvider.post( "common/login/", {
            username: username,
            password: password
        } );
        let { access, refresh } = response.data;
        let result = getUserDataFromJWT( access, refresh );
        if ( result ) {
            sessionStorage.setItem( "user_session", JSON.stringify( result ) );
            return result;
        }
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 401:
                throw "Invalid username or password";
            case 500:
                throw "Something went wrong in server side";
            default:
                throw "Error";
        }
    }
    throw "Error";
}

export const getUserDataFromJWT = ( access_key: string, refresh_key: string ): UserSessionData | null => {
    let { user_id, name, role, photo } = jwtDecode( access_key ) as BasicEmployeeData;
    if ( user_id && name && role ) {
        return {
            user_id: user_id,
            name: name,
            role: role,
            photo: photo,
            tokens: {
                access: access_key,
                refresh: refresh_key
            }
        }
    }
    return null;
}

export const getPhoto = async ( access_key: string ) => {
    console.log( access_key );
    let image_data;
    try {
        let response = await RESTAPIProvider.get( "common/users/employee_photo", {
            headers: {
                Authorization: `Bearer ${access_key}`
            }
        } );
        image_data = response.data.photo
        if ( image_data ) {
            return image_data;
        }
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 404:
                throw "No profile image for employee";
            case 500:
                throw "Something went wrong in server side";
            default:
                throw "Unknown error getting profile image";
        }
    }
    throw "No data image on response";
}

export const getUserDataFromCache = async () => {
    let raw_session_data: string | null = sessionStorage.getItem( 'user_session' );
    if ( raw_session_data ) {
        const user_session: UserSessionData = JSON.parse( raw_session_data );
        if ( user_session ) {
            return user_session;
        }
    }
    throw "No session data";
}

export const validateCredentials = async ( access_key: string ) => {
    try {
        let response = await RESTAPIProvider.post( "common/verify/", {
            token: access_key
        } );
        return response.data;
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 401:
                throw "Invalid credentials";
            case 500:
                throw "Something went wrong in server side";
            default:
                throw "Unknown error validating credentials";
        }
    }
}

export const refreshCredentials = async ( refresh_key: string ) => {
    try {
        let response = await RESTAPIProvider.post( "common/refresh/", {
            refresh: refresh_key
        } );
        return response.data;
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 401:
                throw "Invalid credentials";
            case 500:
                throw "Something went wrong in server side";
            default:
                throw "Unknown error validating credentials";
        }
    }
}