import { AppContext, EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import ErrorMessage from "../../../molecules/ErrorMessage.tsx";
import { ArrowLeftCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import EmployeeManagementRouter from "./EmployeeManagementRouter.tsx";
import { useEffect, useState } from "react";

function isEmployeeManagementMachineInDeep( state_value: string ) {
    return state_value == "Edit Employee" || state_value == "Employee Brief";
}

const EmployeesManagement = () => {
    const { state: app_state, dialog_message, current_employee } = AppContext.useSelector( state => {
        let state_value;
        if ( typeof ( state.value ) == "object" ) {
            if ( state.value["FillGaps App"] ) {
                if ( state.value["FillGaps App"].Panel ) {
                    if ( typeof ( state.value["FillGaps App"]["Panel"] ) == "object" )
                        state_value = state.value["FillGaps App"]["Panel"];
                }
            }
        }
        return {
            dialog_message: state.context.cache.dialog_message,
            current_employee: state.context.user_data.employee_id,
            state: state_value
        }
    } );
    const appActor = AppContext.useActorRef();
    const employeeManagementActor = EmployeeManagementContext.useActorRef();
    const employee_management_state = EmployeeManagementContext.useSelector( state => state.value );
    const [isBackButtonEnabled, setIsBackButtonEnabled] = useState( !isEmployeeManagementMachineInDeep( employee_management_state ) );

    useEffect( () => {
        setIsBackButtonEnabled( !isEmployeeManagementMachineInDeep( employee_management_state ) );
    }, [employee_management_state] );

    const changeState = () => {
        if ( isBackButtonEnabled ) {
            console.log( "Go Panel", app_state )
            appActor.send( {
                type: "Go Panel"
            } )
        } else {
            employeeManagementActor.send( {
                type: "Go Back"
            } )
        }
    }

    return (
        <div
            className={"flex flex-col w-full h-full bg-opacity-40 overflow-hidden relative"}>
            <ArrowLeftCircleIcon
                className={`absolute z-30 left-3 top-3 w-8 h-8 ${isBackButtonEnabled ? "hover:text-purple-600 text-purple-400 cursor-pointer" : "text-zinc-200 "}`}
                onClick={isBackButtonEnabled ? changeState : undefined}/>
            {
                isBackButtonEnabled ?
                    ( <div
                        className={"absolute z-10 shadow bottom-2 right-3 flex flex-col py-2 px-4 rounded-2xl items-center w-fit hover:text-zinc-300 hover:bg-violet-800 cursor-pointer bg-purple-100 justify-center"}
                        onClick={() => {
                            console.log( "New Employee", current_employee )
                            employeeManagementActor.send( {
                                type: "Edit Employee",
                                employee_id: -1
                            } )
                        }}>
                        <UserPlusIcon className={"w-6 h-6 text-inherit"}/>
                        <span className={"text-inherit text-sm font-bold select-none"}>Add Employee</span>
                    </div> ) :
                    ( <></> )
            }
            <EmployeeManagementRouter/>
            {
                <ErrorMessage error={dialog_message}
                              show={app_state === "Employee List Error"}/>
            }
            {
                app_state === "Edit Success" ?
                    <div
                        className={`absolute z-20 w-3/4 min-h-22 left-0 right-0 rounded-xl bg-green-500 flex flex-col items-center bottom-2 overflow-y-hidden ${show ? "animate-fade-up animate-duration-200 animate-ease-in" : "animate-fade-up animate-duration-200 animate-ease-in animate-reverse"}`}>
                        <h1 className={"text-white text-lg text-center"}>{error}</h1>
                    </div> :
                    <></>
            }
            <div className={"absolute"}>
            </div>
        </div>
    );
}

export default EmployeesManagement;