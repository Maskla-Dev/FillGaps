import Days from "../atoms/Days.tsx";
import { forwardRef, Ref, useEffect, useMemo, useState } from "react";
import SelectRoulette from "../molecules/SelectRoulette.tsx";
import NumberRoulette from "../molecules/NumberRoulette.tsx";

const DAYS = [
    "SU",
    "MO",
    "TU",
    "WE",
    "TH",
    "FR",
    "SA"
];

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

interface CalendarProps {
    calendar_date: Date | null;
    onDayChange: ( Event: any ) => void;
    onMonthChange: ( Event: any ) => void;
    onYearChange: ( Event: any ) => void;
    max_year?: number;
    min_year?: number;
}

const Calendar = ( { calendar_date, onMonthChange, onDayChange, onYearChange, min_year, max_year }: CalendarProps ) => {

    const DAYS_HEADERS = useMemo( () => {
        return DAYS.map( ( day, index ) => {
            return (
                <Days key={`DayHeader${index}`} day={day} isHeader={true} isSelected={false} isCurrentMonth={false}/>
            );
        } );
    }, [] );


    const DAYS_CALENDAR = useMemo( () => {
        let date = calendar_date == null ? new Date() : calendar_date
        const days = [];
        let days_counter = 0;
        const tmp_month = new Date( date.getFullYear(), date.getMonth(), 1 );
        const prev_month = new Date( date.getFullYear(), date.getMonth() - 1, 1 );
        let day = tmp_month.getDay();
        prev_month.setDate( 0 );
        tmp_month.setDate( 0 );
        for ( let i = prev_month.getDate() - day + 1; i <= prev_month.getDate(); i++ ) {
            days.push( <Days key={`Day${days_counter++}`} day={i.toString()} isHeader={false} isSelected={false}
                             isCurrentMonth={false}/> );
        }
        tmp_month.setMonth( tmp_month.getMonth() + 2 );
        tmp_month.setDate( 0 );
        for ( let i = 1; i <= tmp_month.getDate(); ++i ) {
            days.push( <Days key={`Day${days_counter++}`} day={i.toString()} isHeader={false}
                             isSelected={i == date.getDate()}
                             isCurrentMonth={true}
                             onClick={onDayChange}
            /> );
        }
        let tmp = Math.ceil( days_counter / 7 ) * 7 - days_counter;
        for ( let i = 1; i <= tmp; i++ ) {
            days.push( <Days key={`Day${days_counter++}`} day={i.toString()} isHeader={false} isSelected={false}
                             isCurrentMonth={false}/> );
        }
        return days;
    }, [calendar_date] );

    return (
        <div className={"w-fit bg-zinc-600 absolute top-full -left-full z-30"}>
            <div className={"flex flex-row items-center justify-evenly"}>
                <div className={"flex flex-row items-center"}>
                    <SelectRoulette options={MONTHS} placeholder={"Month"}
                                    value={MONTHS[calendar_date ? calendar_date.getMonth() : new Date().getMonth()]}
                                    onChange={onMonthChange} default_value={MONTHS[new Date().getMonth()]}/>
                    <SelectRoulette
                        default_value={( calendar_date ? calendar_date.getFullYear() : new Date().getFullYear() ).toString()}
                        placeholder={"Year"}
                        options={new Array( ( max_year ? max_year : 2024 ) - ( min_year ? min_year : 1960 ) ).fill( 0 ).map( ( _, index ) => ( ( ( min_year ? min_year : 1960 ) ) + index + 1 ).toString() )}
                        value={( calendar_date ? calendar_date.getFullYear() : new Date().getFullYear() ).toString()}
                        onChange={onYearChange}/>
                </div>
            </div>
            <div className={"px-2 grid grid-cols-7"}>
                {DAYS_HEADERS}
            </div>
            <div className={"px-2 grid grid-cols-7"}>
                {DAYS_CALENDAR}
            </div>
        </div>
    );
};

export default Calendar;