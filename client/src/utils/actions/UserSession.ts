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

export const doLogin = async ( username: string, password: string ): Promise<UserSessionData | null> => {
    let response = await RESTAPIProvider.post( "common/login/", {
        username: username,
        password: password
    } );
    if ( response.status === 200 ) {
        let { access, refresh } = response.data;
        let result = getUserData( access, refresh );
        if ( result ) {
            sessionStorage.setItem( "user_session", JSON.stringify( result ) );
            return result;
        }
    }
    return null;
}

export const getUserData = ( access_key: string, refresh_key: string ): UserSessionData | null => {
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

export const getSession = (): UserSessionData | null => {
    let raw_session_data: string | null = sessionStorage.getItem( 'user_session' );
    if ( raw_session_data ) {
        const user_session: UserSessionData = JSON.parse( raw_session_data );
        if ( user_session ) {
            return user_session;
        }
    }
    return null;
}