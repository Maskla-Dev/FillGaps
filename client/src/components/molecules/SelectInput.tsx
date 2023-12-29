import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import SelectOption from "../atoms/SelectOption.tsx";
import { useClickAway } from "@uidotdev/usehooks"

export interface SelectInputProps {
    options: readonly string[];
    value: string | null;
    placeholder: string;
    onChange: ( option: string | null ) => void;
    default_value?: string;
}

const SelectInput = ( { options, placeholder, onChange, value, default_value }: SelectInputProps ) => {
    const [open, setOpen] = useState( false );
    const ref = useClickAway( () => setOpen( false ) );

    const onSelectOption = ( event: any ) => {
        onChange( event.currentTarget.id );
    }

    const options_list = useMemo( () => {
        return options.map( ( option, index ) => {
            return (
                <SelectOption value={option} onClick={onSelectOption} isSelected={option == value}
                              key={`SelectOption${index}`} id={option}/>
            );
        } );
    }, [options, value] );

    return (
        <div
            className={"flex flex-row items-center py-1.5 px-2.5 justify-center w-fit h-fit rounded-full bg-violet-800 cursor-pointer"}>
            <div
                ref={ref}
                className={"relative flex flex-row items-center justify-center w-full h-fit rounded-lg"}
                onClick={() => setOpen( !open )}>
                <ChevronDownIcon
                    className={`w-6 h-6 text-white mr-1 transition ease-in ${open ? "rotate-180" : "rotate-0"}`}/>
                <span
                    className={"text-white text-sm uppercase font-bold"}>{value ? value : placeholder}</span>
                <div
                    className={`max-h-52 overflow-y-auto absolute top-full ${open ? "w-fit h-fit" : "w-0 h-0"} overflow-y-auto flex flex-col bg-zinc-800 rounded-lg`}>
                    {options_list}
                </div>
            </div>
            {
                value ?
                    <XCircleIcon className={"w-8 h-8 text-white ml-1"} onClick={() => {
                        default_value ? onChange( default_value ) :
                            onChange( null )
                    }}/> :
                    <></>
            }
        </div>
    );
}

export default SelectInput;