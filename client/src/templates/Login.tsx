import { LoginForm, LoginFormProps } from "../organisms/LoginForm.tsx";
import { FC } from "react";

export interface LoginProps extends LoginFormProps {
    title: string;
}

const Login: FC<LoginProps> = ( {
                                           title,
                                           submitHandler
                                       } ) => {
    return (
        <div>
            <h1>{title}</h1>
            <LoginForm submitHandler={submitHandler}/>
        </div>
    )
};

export default Login;