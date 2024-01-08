import EditEmployeeRouter from "./EditEmployeeRouter.tsx";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import React, { useEffect } from "react";
import FormButton from "../../../../atoms/FormButton.tsx";
import { EditEmployeeMachineContext } from "../../../../../logic/models/EditEmployeeMachineModels.ts";

function isNavAllowed( state_value: string ) {
    return state_value != "Cancel Wall" &&
        state_value != "Save Wall" &&
        state_value != "Get Employee Data";
}

function canSave( context: EditEmployeeMachineContext ) {
    return context.employee_documents != undefined &&
        context.worker_data != undefined &&
        context.medical_file != undefined &&
        context.general_data != undefined;
}

const EditEmployee = () => {
    const state = EditEmployeeContext.useSelector( state => state.value );
    const [saveEnabled, setSaveEnabled] = React.useState<boolean>( false );
    const [navEnabled, setCancelEnabled] = React.useState<boolean>( isNavAllowed( state ) );
    const context = EditEmployeeContext.useSelector( state => {
        console.log( "Edit Employee", state.context )
        return state.context
    } );
    const actor = EditEmployeeContext.useActorRef();

    useEffect( () => {
        setCancelEnabled( isNavAllowed( state ) );
    }, [state] );

    useEffect( () => {
        setSaveEnabled( canSave( context ) );
    }, [context] );

    return (
        <div className={"h-full w-full flex flex-col"}>
            <h1 className={"text-white font-bold text-center leading-10 my-2"}>
                {context.employee_id ? "Edit Employee" : "New Employee"}
            </h1>
            <div>

            </div>
            <EditEmployeeRouter/>
            {
                navEnabled ? (
                    <div className={"h-fit flex flex-row justify-evenly"}>
                        <FormButton text={"Cancel"}
                                    onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                                        event.preventDefault();
                                        actor.send(
                                            { type: "Cancel" }
                                        )
                                    }}/>
                        <FormButton text={"Save"}
                                    onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                                        event.preventDefault();
                                        actor.send(
                                            { type: "Save" }
                                        )
                                    }} isDisabled={!saveEnabled}/>
                    </div>
                ) : ( <> </> )
            }
        </div>
    );
}

export default EditEmployee;