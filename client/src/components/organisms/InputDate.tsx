import { useClickAway } from '@uidotdev/usehooks'
import { CalendarIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Calendar from "./Calendar.tsx";
import DateDisplay from "../molecules/DateDisplay.tsx";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


interface InputDateProps {
    label: string;
    value: Date | null;
    onChange: ( date: Date | null ) => void;
    placeholder: string;
    options: {
        canBeEmpty?: boolean;
        max_year?: number;
        min_year?: number;
    };
}

function dateInitializer( date: Date | null, canBeEmpty?: boolean ) {
    if ( date === null ) {
        if ( canBeEmpty ) {
            return null;
        }
        return new Date();
    }
    return date;
}

const InputDate = ( { value, label, onChange, placeholder, options }: InputDateProps ) => {
    const [date, setDate] = useState( dateInitializer( value, options.canBeEmpty ) );
    const [open, setOpen] = useState( false )
    const ref = useClickAway<HTMLDivElement>( () => setOpen( false ) )

    useEffect( () => {
        setDate( dateInitializer( value, options.canBeEmpty ) );
    }, [value] );

    const handleDayClick = ( event: any ) => {
        let tmp_date = date == null ? new Date() : date;
        tmp_date.setDate( Number( event.target.innerHTML ) );
        onChange( tmp_date );
    }

    const handleYearChange = ( event: number ) => {
        let tmp_date = date == null ? new Date() : date;
        console.log( event, date, tmp_date )
        tmp_date.setFullYear( event );
        onChange( tmp_date );
        setDate( tmp_date )
    }


    const handleMonthChange = ( event: string ) => {
        let tmp_date = date == null ? new Date() : date;
        console.log( event, date, tmp_date )
        tmp_date.setMonth( MONTHS.indexOf( event ) );
        onChange( tmp_date );
        setDate( tmp_date )
    }

    return (
        <div
            ref={ref}
            className={"relative w-fit bg-violet-200 rounded-md py-1.5 px-2 flex flex-row items-center"}>
            <div className={"cursor-pointer"} onClick={() => setOpen( !open )}>
                <div
                    className={"flex flex-row items-center justify-center w-full h-fit mb-1"}>
                    <CalendarIcon className={"w-6 h-6 text-purple-950 mr-2"}/>
                    <span className={"text-sm font-bold text-purple-800 mr-2 select-none"}>
                        {label}
                    </span>
                </div>
                <DateDisplay date={date} placeholder={placeholder}/>
            </div>
            {
                options.canBeEmpty ?
                    date ?
                        <XCircleIcon className={"w-6 h-6 text-white cursor-pointer"}
                                     onClick={() => onChange( null )}/> :
                        <></> : <></>
            }
            {
                open ?
                    <Calendar calendar_date={date}
                              onMonthChange={handleMonthChange}
                              onDayChange={handleDayClick}
                              onYearChange={handleYearChange}
                              max_year={options.max_year}
                              min_year={options.min_year}
                    /> :
                    <></>
            }
        </div>
    )
}

export default InputDate;