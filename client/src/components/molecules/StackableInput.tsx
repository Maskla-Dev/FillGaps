import InputText from "../atoms/InputText.tsx";
import { ReactElement, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import StackValue from "../atoms/StackValue.tsx";

interface StackableInputProps {
    onPush: ( value: string ) => void;
    stack: string[]
    label: string | ReactElement;
    placeholder: string;
    title?: string;
}


function getStackElements( stack: string[], id: string ) {
    if ( !stack ) return ( <div></div> );
    return stack.map( ( value, index ) => {
        return (
            <StackValue value={value} key={`Stack${id}${index}`}/>
        )
    } );
}

function selectId( label: any, title?: string ) {
    return title ? title : typeof ( label ) == "string" ? label : "DefaultTitle";
}

const StackableInput = ( { onPush, stack, placeholder, label, title }: StackableInputProps ) => {
    const [currentValue, setCurrentValue] = useState<string>( "" );
    const [stack_elements, setStackElements] = useState( getStackElements( stack, selectId( label, title ) ) );

    useEffect( () => {
        setStackElements( getStackElements( stack, selectId( label, title ) ) );
    }, [stack] );

    const handleAdd = () => {
        if ( currentValue.length > 0 ) {
            onPush( currentValue );
            setCurrentValue( "" );
        }
    };

    return (
        <div>
            {title && <h3 className={"font-semibold text-center mt-2 text-white"}>{title}</h3>}
            <div className={"flex flex-wrap"}>
                {stack_elements}
            </div>
            <div className={"flex flex-row items-center"}>
                <InputText placeholder={placeholder} value={currentValue} onInput={( e ) => {
                    setCurrentValue( e.currentTarget.value );
                }} label={label} id={"StackableInput"}/>
                <PlusCircleIcon
                    className={`w-8 h-8 ${currentValue.length > 0 ? "text-amber-600 hover:text-amber-500 cursor-pointer" : "text-zinc-400"}`}
                    onClick={
                        currentValue ? ( currentValue.length > 0 ? handleAdd : undefined ) : undefined
                    }/>
            </div>
        </div>
    )
}

export default StackableInput;