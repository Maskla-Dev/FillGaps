import { provider } from "./Providers";
import { BasicEmployeeData, UserSessionData } from "../hooks/useSession.ts";
import { jwtDecode } from "jwt-decode";

export const doLogout = async () => {
    sessionStorage.removeItem( "user_session" );
}

export const doLogin = async ( username: string, password: string ): Promise<UserSessionData | null> => {
    let response = await provider.post( "common/login/", {
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
    let { user_id, name, role } = jwtDecode( access_key ) as BasicEmployeeData;
    if ( user_id && name && role ) {
        return {
            user_id: user_id,
            name: name,
            role: role,
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