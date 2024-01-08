import { useClickAway } from '@uidotdev/usehooks'
import { CalendarIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Calendar from "./Calendar.tsx";

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
    value: Date;
    onChange: ( date: Date ) => void;
    placeholder: string;
    options: {};
}

const InputDate = ( { value, label, onChange, placeholder, options }: InputDateProps ) => {
    const [date, setDate] = useState( new Date() )
    const [open, setOpen] = useState( false )
    const ref = useClickAway( () => setOpen( false ) )

    useEffect( () => {

    }, [date] );

    const handleDayClick = ( event: any ) => {
        setDate( current => {
            current.setDate( parseInt( event.target.innerHTML ) );
            return new Date( current.getFullYear(), current.getMonth(), current.getDate() );
        } );
    }

    const handleYearChange = ( event: number ) => {
        setDate( current => {
            if ( current === null ) {
                current = new Date();
            }
            current.setFullYear( event );
            return new Date( current?.getFullYear(), current?.getMonth(), current?.getDate() );
        } );
    }


    const handleMonthChange = ( event: string ) => {
        setDate( current => {
            if ( current === null ) {
                current = new Date();
            }
            // console.log( event )
            current.setMonth( MONTHS.indexOf( event ) );
            console.log( current )
            return new Date( current?.getFullYear(), current?.getMonth(), current?.getDate() );
        } );
    }

    return (
        <div className={"relative"}>
            <div

                className={"flex flex-row items-center py-1.5 px-2.5 justify-center w-fit h-fit rounded-full bg-violet-800 cursor-pointer"}
                onClick={() => setOpen( !open )}>
                <CalendarIcon className={"w-6 h-6 text-white mr-2"}/>
                <span className={"text-sm font-bold text-white mr-2"}>
                    {date ? date.toLocaleDateString() : "DATE"}
                </span>
                {
                    date ?
                        <XCircleIcon className={"w-6 h-6 text-white"} onClick={() => setDate( new Date() )}/> :
                        <></>
                }
            </div>
            {
                open ?
                    <Calendar ref={ref}
                              onDayChange={handleDayClick}
                              onMonthChange={handleMonthChange}
                              onYearChange={handleYearChange}
                              calendar_date={date}
                    /> :
                    <></>
            }
        </div>
    )
}

export default InputDate;