import SelectInput, { SelectInputProps } from "./SelectInput.tsx";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

interface SelectRouletteProps extends SelectInputProps {
}

const SelectRoulette = ( props: SelectRouletteProps ) => {
    const handleLeftClick = () => {
        if ( props.value === null ) {
            props.onChange( props.options[props.options.length - 1] );
            return;
        }
        const currentIndex = props.options.indexOf( props.value );
        if ( currentIndex > 0 ) {
            const newValue = props.options[currentIndex - 1];
            props.onChange( newValue );
        } else {
            props.onChange( props.options[props.options.length - 1] );
        }
    };

    const handleRightClick = () => {
        if ( props.value === null ) {
            props.onChange( props.options[0] );
            return;
        }
        const currentIndex = props.options.indexOf( props.value );
        if ( currentIndex < props.options.length - 1 ) {
            const newValue = props.options[currentIndex + 1];
            props.onChange( newValue );
        } else {
            props.onChange( props.options[0] );
        }
    };

    useEffect( () => {
        console.log( "Select Roulette", props.value );
    }, [props.value] );

    return (
        <div className={"flex flex-row items-center"}>
            <ArrowLeftCircleIcon className={"w-8 h-8 text-white"} onClick={handleLeftClick}/>
            <SelectInput {...props}/>
            <ArrowRightCircleIcon className={"w-8 h-8 text-white"} onClick={handleRightClick}/>
        </div>
    )
}

export default SelectRoulette;