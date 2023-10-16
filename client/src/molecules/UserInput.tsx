import { TextInput } from "../atoms/TextInput.tsx";

const UserInput = () => {
    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <TextInput id="username" placeholder="Enter your username"/>
            </div>
        </>
    )
};

export default UserInput;