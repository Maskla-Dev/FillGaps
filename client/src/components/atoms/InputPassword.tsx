import { InputPasswordProps } from "./AtomicComponentsProps.ts";
import MakeInput from "./Makers/MakeInput.tsx";

export function PasswordInput( {
                                   id,
                                   placeholder,
                                   value,
                                   onInput,
                                   showPassword
                               }: InputPasswordProps ) {
    return (
        <input
            id={id}
            type={showPassword ? "text" : "password"}
            value={value}
            placeholder={placeholder}
            className={"w-full border-b-2 rounded-xl py-1 px-4 placeholder:opacity-50 placeholder-blue-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"}
            onInput={onInput}
        />
    )
}

export default MakeInput( PasswordInput );