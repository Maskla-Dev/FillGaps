interface SelectOptionProps {
    value: string;
    onClick: ( event: any ) => void;
    isSelected: boolean;
    id: string
}

const SelectOption = ( { value, onClick, isSelected, id }: SelectOptionProps ) => {
    return (
        <div
            className={`flex flex-row items-center justify-center w-full h-fit px-2.5 py-1.5 ${isSelected ? "bg-amber-600" : "bg-zinc-800"} rounded-lg`}
            onClick={onClick}
            id={id}>
            <span className={"text-white text-sm font-bold"}>{value}</span>
        </div>
    );
}

export default SelectOption;