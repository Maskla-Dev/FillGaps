import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

interface NumberRouletteProps {
    value: number;
    onChange: ( value: number ) => void;
    min: number;
    max: number;
}

const NumberRoulette = ( { value, min, max, onChange }: NumberRouletteProps ) => {
    const handleLeftClick = () => {
        if ( value >= min ) {
            onChange( value - 1 );
        }
    };

    const handleRightClick = () => {
        console.log( value, max, value < max )
        if ( value < max ) {
            onChange( value + 1 );
        }
    };

    return (
        <div className={"flex flex-row items-center"}>
            <ArrowLeftCircleIcon className={"w-8 h-8 text-white"} onClick={handleLeftClick}/>
            <div className={"flex flex-row items-center py-1.5 px-2.5 justify-center w-fit h-fit rounded-full bg-violet-800 text-white text-sm font-bold"}>{value}</div>
            <ArrowRightCircleIcon className={"w-8 h-8 text-white"} onClick={handleRightClick}/>
        </div>
    )
}

export default NumberRoulette;