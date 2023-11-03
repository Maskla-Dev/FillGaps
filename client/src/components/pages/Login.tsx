import Logo from '../../assets/Logo.svg';
import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { loginAsync } from "../../utils/appstate/features/sessionSlice.ts";

const Login = () => {    
    const session = useSelector( ( state: RootState ) => state.session_state.session );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState( "" );
    const [password, setPassword] = useState( "" );

    useEffect( () => {
        console.log( session )
        if ( session ) {
            navigate( "/" );
        }
    }, [session] );

    const handleLogin = ( e: MouseEvent ) => {
        e.preventDefault();
        // @ts-ignore
        dispatch( loginAsync( { username, password } ) )
    }

    return (
        <div className={"w-screen h-screen bg-blue-600 flex items-center"}>
            <div
                className={"w-10/12 flex flex-col items-center bg-white rounded-3xl m-auto p-3 sm:flex-row md:w-[620px] md:p-0 md:overflow-hidden"}>
                <header className={`md:w-4/5 md:h-72 md:bg-[url("/img/carlo_nicoli.jpg")] md:bg-cover`}>
                    <img
                        className={"h-44 w-44 m-2 md:hidden"}
                        src={Logo} alt="Logo"/>
                    <h1 className={"text-4xl text-blue-600 m-3 md:hidden"}>FRAGMent</h1>
                </header>
                <form className={"flex flex-col w-full"}>
                    <h2 className={"hidden sm:inline-block text-3xl text-blue-600 m-3 text-center"}>Iniciar Sesión</h2>
                    <div className={"flex flex-col mb-2 w-full px-4"}>
                        <label className={"flex items-center my-2 w-full"} htmlFor="username">
                            <UserIcon className={"w-6 h-6 stroke-blue-600 mr-3.5"}/>
                            <input
                                onInput={( e ) => setUsername( e.target.value )}
                                className={
                                    "w-full border-b-2 rounded-xl py-1 px-4 placeholder:opacity-50 placeholder-blue-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                }
                                type="text" id="username" placeholder="Username"/>
                        </label>
                        <label className={"flex items-center my-2 w-full"} htmlFor="password">
                            <KeyIcon className={"w-6 h-6 stroke-blue-600 mr-3.5"}/>
                            <input
                                onInput={( e ) => setPassword( e.target.value )}
                                className={
                                    "w-full border-b-2 rounded-xl py-1 px-4 placeholder:opacity-50 placeholder-blue-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                }
                                type="password" id="password" placeholder="Password"/>
                        </label>
                    </div>
                    <button
                        onClick={handleLogin}
                        className={
                            "bg-blue-600 text-white rounded-lg py-2 px-3 w-24 h-fit self-center text-center m-2"
                        }
                        type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;