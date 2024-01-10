interface DaysProps {
    day: string;
    isSelected?: boolean;
    isHeader?: boolean;
    isCurrentMonth?: boolean;
    onClick?: ( event: any ) => void;
}

const Days = ( { day, isSelected, isHeader, isCurrentMonth, onClick }: DaysProps ) => {
    return (
        <span
            onClick={onClick}
            className={`text-sm text-center align-center select-none ${onClick ? "cursor-pointer" : ""} ${isHeader ? "text-rose-300 font-semibold" : ""} ${isSelected ? "rounded-full bg-rose-600" : ""} ${isCurrentMonth ? "text-white" : "text-zinc-400"}`}>
            {day}
        </span>
    )
}

export default Days;