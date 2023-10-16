import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokens, removeTokens, tokenStillAlive } from "../helpers/jwtHelpers.ts";

export const useTokenValidator = (): [string, string] | never => {
    const navigate = useNavigate();
    const [[access, refresh], updateTokens] = useState( getTokens() );

    useEffect( () => {
        console.log(access,  refresh);
        const checkTokenVitals = async () => {
            if ( ( access != null ) && ( refresh != null ) ) {
                return !( await tokenStillAlive( access ));
            }
            return true;
        };
        checkTokenVitals().then( ( willRedirect ) => {
            if ( willRedirect ) {
                removeTokens();
                updateTokens( [null, null] )
                navigate( "/login" );
            }
        } ).catch( ( error ) => {
            console.log( error );
        } );
    }, [] );

    return [access as string, refresh as string];
};