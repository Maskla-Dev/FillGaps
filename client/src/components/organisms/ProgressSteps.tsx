import React, { useMemo } from "react";
import { AppContext } from "../../logic/ActorContexts.ts";

interface ProgressStepsProps {
    steps: string[];
    currentStep: number;
}

const ProgressSteps = ( { steps, currentStep }: ProgressStepsProps ) => {
    const actor = AppContext.useActorRef();

    const handleStepClick = ( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
        let target_index = steps.findIndex( step => step == event.currentTarget.id );
        if ( target_index == currentStep ) return;
        let type;
        switch ( currentStep - 1 - target_index ) {
            case 1:
                type = "Go Back";
                break;
            case 2:
                type = "Go Back 2 Steps";
                break;
            case 3:
                type = "Go Back 3 Steps";
                break;
            default:
                type = "";
                break;
        }
        console.log( event.currentTarget.id, type, currentStep, target_index );
        if ( type != "" ) {
            actor.send( { type: type } );
        }
    }

    const stepsElements = useMemo( () => {
        const steps_list: JSX.Element[] = [];
        for ( let index = 0; index < steps.length; index++ ) {
            steps_list.push(
                <div
                    id={steps[index]}
                    className={`flex flex-row items-center justify-center w-full h-2 ${( index < ( currentStep - 1 ) ) ? "bg-blue-500 cursor-pointer" : ( index == currentStep - 1 ) ? "bg-emerald-500" : "bg-zinc-800"} text-white font-bold uppercase text-sm`}
                    key={`ProgressStep${index}`}
                    onClick={index < ( currentStep - 1 ) ? handleStepClick : undefined}>
                </div>
            );
        }
        return steps_list;
    }, [steps, currentStep] );
    return (
        <div className={"flex flex-row items-center justify-center w-full h-fit"}>
            {stepsElements}
        </div>
    );
}

export default ProgressSteps;