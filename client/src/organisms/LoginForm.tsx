import UserInput from "../molecules/UserInput.tsx";
import UserPassword from "../molecules/UserPassword.tsx";
import React, { FC } from "react";

export interface LoginFormProps {
    submitHandler: ( e: React.FormEvent ) => void;
}

export const LoginForm: FC<LoginFormProps> = ( {
                                                   submitHandler
                                               } ) => {

    return (
        <>
            <form id={"login"}>
                <UserInput/>
                <UserPassword/>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </>
    )
}