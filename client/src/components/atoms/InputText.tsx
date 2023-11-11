import { InputTextProps } from "./AtomicComponentsProps.ts";
import MakeInput from "./Makers/MakeInput.tsx";

export function InputText( {
                               id,
                               placeholder,
                               value,
                               onInput
                           }: InputTextProps ) {
    return (
        <input
            id={id}
            type="text"
            value={value}
            placeholder={placeholder}
            className={"w-full border-b-2 rounded-xl py-1 px-4 placeholder:opacity-50 placeholder-blue-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"}
            onInput={onInput}
        />
    )
}

export default MakeInput( InputText );