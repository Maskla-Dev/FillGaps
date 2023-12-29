import AppNav from "../molecules/AppNav.tsx";
import SessionCard from "../organisms/SessionCard.tsx";
import FillGapsRouter from "./FillGapsRouter.tsx";
import { useState } from "react";

function FillGaps() {
    const [isPanel, setIsPanel] = useState( true );

    return (
        <>
            <div className={"w-full h-full flex flex-col"}>
                <AppNav is_panel={isPanel}
                        onButtonClick={( isPanel ) => {
                            setIsPanel( isPanel );
                        }}/>
                <SessionCard/>
                <div className={"p-2 h-full"}>
                    <FillGapsRouter isPanel={isPanel}/>
                </div>
            </div>
        </>
    );
}

export default FillGaps;