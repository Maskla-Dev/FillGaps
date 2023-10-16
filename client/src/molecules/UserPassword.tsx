import { TextInput } from "../atoms/TextInput.tsx";

const UserPassword = () => {
    return (
        <>
            <div>
                <label htmlFor="password">Password</label>
                <TextInput id="password" placeholder="Enter your password"/>
            </div>
        </>
    )
}

export default UserPassword;