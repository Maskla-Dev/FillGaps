import Logo from '../../assets/Logo.svg';
import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { loginAsync } from "../../utils/appstate/features/sessionSlice.ts";
import InputText from "../atoms/InputText.tsx";
import PasswordInput from "../atoms/InputPassword.tsx";
import FormButton from "../atoms/FormButton.tsx";
import { AppContext } from "../../fullstate.tsx";
import Loader from "../atoms/Loader.tsx";

const Login = () => {
    const state = AppContext.useSelector( state => state );
    const actorRef = AppContext.useActorRef();
    const [username, setUsername] = useState( "" );
    const [password, setPassword] = useState( "" );

    const handleLogin = ( e: React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        actorRef.send( { type: "LOGIN", username: username, password: password } );
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
                {
                    state.matches( 'logging-error' ) ?
                        <div className={"w-full h-12 rounded-2xl bg-red-600 flex justify-center items-center"}>
                            <h1 className={"text-white text-lg"}>{state.context.error}</h1>
                        </div> :
                        <></>
                }
                <form className={"flex flex-col w-full"}>
                    <h2 className={"hidden sm:inline-block text-3xl text-blue-600 m-3 text-center"}>Iniciar Sesión</h2>
                    <div className={"flex flex-col mb-2 w-full px-4"}>
                        <InputText label={<UserIcon className={"w-6 h-6 stroke-blue-600 mr-3.5"}/>}
                                   placeholder={"Username"} id={"username"}
                                   onInput={( e ) => setUsername( e.currentTarget.value )}
                                   value={username}/>
                        <PasswordInput label={<KeyIcon className={"w-6 h-6 stroke-blue-600 mr-3.5"}/>}
                                       placeholder={"Password"} id={"password"}
                                       value={password}
                                       onInput={e => setPassword( e.currentTarget.value )}
                                       showPassword={false}/>
                    </div>
                    {
                        state.matches( "logging-in" ) ?
                            <Loader/> :
                            <FormButton onClick={handleLogin} text={"Login"}/>
                    }
                </form>
            </div>
        </div>
    );
}

export default Login;