import React from "react";

interface ToggleButtonProps {
    onClick?: () => void;
    first: React.ReactNode;
    second: React.ReactNode;
}

const ToggleButton = ( { onClick, first, second }: ToggleButtonProps ) => {
    const [isOn, setIsOn] = React.useState( true );

    const handleClick = () => {
        setIsOn( !isOn );
        onClick?.();
    }

    return (
        <div className={"flex flex-row p-1"} onClick={handleClick}>
            {isOn ? first : second}
        </div>
    );
};

export default ToggleButton;