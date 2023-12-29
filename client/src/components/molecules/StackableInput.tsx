import InputText from "../atoms/InputText.tsx";
import { InputTextProps } from "../atoms/AtomicComponentsProps.ts";
import { ReactElement, useMemo, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import BoldText from "../atoms/BoldText.tsx";
import BolderText from "../atoms/BolderText.tsx";

interface StackableInputProps {
    onChange: ( value: string | null ) => void;
    stack: string[]
    label: string | ReactElement;
    placeholder: string;
    title?: string;
}

const StackableInput = ( { onChange, stack, placeholder, label, title }: StackableInputProps ) => {
    const [currentValue, setCurrentValue] = useState<string>( "" );

    const stack_elements = useMemo( () => {
        if ( !stack ) return ( <div></div> );
        return stack.map( ( value, index ) => {
            return (
                <div key={index} className={"flex flex-row items-center"}>
                    <BolderText text={`${index + 1}. `} className={"text-white"}/>
                    <BoldText text={value} className={"text-white"}/>
                </div>
            )
        } );
    }, [stack] );

    const handleAdd = () => {
        if ( currentValue.length > 0 ) {
            onChange( currentValue );
            setCurrentValue( "" );
        }
    };

    return (
        <div>
            {title && <h3 className={"font-semibold text-center mt-2 text-white"}>{title}</h3>}
            <div className={"flex flex-col"}>
                {stack_elements}
            </div>
            <div className={"flex flex-row items-center"}>
                <InputText placeholder={placeholder} value={currentValue} onInput={( e ) => {
                    setCurrentValue( e.target.value );
                }} label={label} id={"StackableInput"}/>
                <PlusCircleIcon
                    className={`w-8 h-8 ${currentValue.length > 0 ? "text-white cursor-pointer" : "text-zinc-800"}`}
                    onClick={
                        currentValue ? ( currentValue.length > 0 ? handleAdd : undefined ) : undefined
                    }/>
            </div>
        </div>
    )
}

export default StackableInput;