import { FC } from "react";

export interface PasswordInputProps {
    id?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ( {
                                                           id
                                                       } ) => {
    return (
        <>
            <input type={"password"}
                   id={id}/>
        </>
    )
}