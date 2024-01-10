import DateText from "../atoms/DateText.tsx";

const DateDisplay = ( { date, placeholder }: { date: Date | null, placeholder?: string } ) => {
    return (
        <div className={"w-full flex flex-row items-center justify-around"}>
            {
                date === null ? <DateText text={placeholder ? placeholder : "DATE"}/> :
                    <>
                        <DateText text={date.getDate().toString()}/>
                        <DateText text={date.getMonth().toString()} isMonth={true}/>
                        <DateText text={date.getFullYear().toString()}/>
                    </>
            }
        </div>
    )
};

export default DateDisplay;