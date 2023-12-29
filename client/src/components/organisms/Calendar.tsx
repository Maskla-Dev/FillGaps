import Days from "../atoms/Days.tsx";
import { forwardRef, Ref, useMemo } from "react";
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
    calendar_date: Date;
    onDayChange: ( Event: any ) => void;
    onMonthChange: ( Event: any ) => void;
    onYearChange: ( Event: any ) => void;
}

const Calendar = forwardRef<Ref<any>, CalendarProps>( ( {
                                                            calendar_date, onMonthChange,
                                                            onDayChange, onYearChange
                                                        }, ref ) => {

    const DAYS_HEADERS = useMemo( () => {
        return DAYS.map( ( day, index ) => {
            return (
                <Days key={`DayHeader${index}`} day={day} isHeader={true} isSelected={false} isCurrentMonth={false}/>
            );
        } );
    }, [] );


    const DAYS_CALENDAR = useMemo( () => {
        const days = [];
        let days_counter = 0;
        const tmp_month = new Date( calendar_date.getFullYear(), calendar_date.getMonth(), 1 );
        const prev_month = new Date( calendar_date.getFullYear(), calendar_date.getMonth() - 1, 1 );
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
                             isSelected={i == calendar_date.getDate()}
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
        <div className={"w-fit bg-zinc-600 absolute top-full"} ref={ref}>
            <div className={"flex flex-row items-center justify-evenly"}>
                <div className={"flex flex-row items-center"}>
                    <SelectRoulette options={MONTHS} placeholder={"Month"} value={MONTHS[calendar_date.getMonth()]}
                                    onChange={onMonthChange} default_value={MONTHS[new Date().getMonth()]}/>
                    <NumberRoulette value={calendar_date.getFullYear()} onChange={onYearChange} min={2000}
                                    max={2023}/>
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
} );

export default Calendar;