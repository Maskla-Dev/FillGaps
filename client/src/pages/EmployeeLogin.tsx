import Login from "../templates/Login.tsx";
import { getNewTokens, refreshToken, saveTokens } from "../utils/helpers/jwtHelpers.ts";
import { useNavigate } from "react-router-dom";
import React from "react";

const EmployeeLogin = () => {
    const navigate = useNavigate();

    function submit( e: React.FormEvent ) {
        e.preventDefault();
        const login = async () => {
            //@ts-ignore
            const { elements } = document.forms.login;
            const username = elements.username?.value;
            const password = elements.password?.value;
            console.log( username, password );
            if ( username && password ) {
                let [access, refresh] = await getNewTokens( username, password );
                if ( saveTokens( [access, refresh] ) ) {
                    console.log( "Tokens saved" );
                    if ( refresh ) {
                        setInterval( () => {
                            console.log( "Refreshing tokens" )
                            refreshToken( refresh as string ).then( res => {
                                if ( res ) {
                                    console.log( "Tokens refreshed" );
                                }
                            } );
                        }, ( import.meta.env.VITE_TOKEN_REFRESH_TIME - 5 ) * 1000 * 60 );
                    }
                    navigate( "/" );
                } else
                    console.log( "Tokens not saved" );
            }
        }

        login().catch( err => console.log( err ) );
    }

    return (
        <>
            <Login submitHandler={submit} title={"Login"}/>
        </>
    )
}

export default EmployeeLogin;