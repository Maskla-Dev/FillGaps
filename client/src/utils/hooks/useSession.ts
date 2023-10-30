import { useState, useEffect } from 'react';
import { getSession } from "../actions/UserSession.ts";
import { useNavigate, useLocation } from "react-router-dom";

export interface BasicEmployeeData {
    user_id: number;
    name: string;
    role: string;
}

export interface UserSessionData extends BasicEmployeeData {
    tokens: {
        access: string;
        refresh: string;
    };
}

const useSession = () => {
    const [session, setSession] = useState<UserSessionData | null>( getSession() );
    const navigate = useNavigate();
    const location = useLocation();
    useEffect( () => {
        if ( session && location.pathname === '/login' ) {
            navigate( '/' );
        }
        if ( !session && location.pathname !== '/login' ) {
            navigate( '/login' );
        }
    }, [session] );
    return [session, setSession];
};

export default useSession;