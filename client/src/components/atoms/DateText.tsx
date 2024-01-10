import { useMemo } from "react";

const DateText = ( { text, isMonth }: { text: string, isMonth?: boolean } ) => {
    const month = useMemo( () => {
        let value = parseInt( text ) + 1;
        return value < 10 ? "0" + value.toString() : value.toString();
    }, [text] );

    return (
        <span
            className={"text-center bg-violet-50 px-1.5 py-0.5 select-none rounded-md text-sm text-purple-700 mx-1"}>{
            isMonth ? month : text
        }</span>
    )
}

export default DateText;