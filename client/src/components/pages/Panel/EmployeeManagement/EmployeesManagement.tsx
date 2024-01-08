import { AppContext, EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import ErrorMessage from "../../../molecules/ErrorMessage.tsx";
import { ArrowLeftCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import EmployeeManagementRouter from "./EmployeeManagementRouter.tsx";
import { useEffect, useState } from "react";

function isEmployeeManagementMachineInDeep( state_value: string ) {
    return state_value == "Edit Employee" || state_value == "Employee Brief";
}

const EmployeesManagement = () => {
    const { state: app_state, dialog_message } = AppContext.useSelector( state => {
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
            className={"flex flex-col w-full h-full rounded-lg bg-zinc-600 bg-opacity-40 overflow-hidden relative"}>
            <nav className={"flex items-center bg-purple-600 py-2"}>
                <ArrowLeftCircleIcon
                    className={`ml-3 w-8 h-8 ${isBackButtonEnabled ? "text-white cursor-pointer" : "text-purple-800 "}`}
                    onClick={isBackButtonEnabled ? changeState : undefined}/>
                <div className={"w-full"}>
                    <h1 className={"text-center font-bold text-white text-xl"}>Employee Management</h1>
                </div>
            </nav>
            {
                isBackButtonEnabled ?
                    ( <div
                        className={"absolute bottom-2 right-3 flex flex-col py-2 px-4 rounded-2xl items-center w-fit hover:text-zinc-300 hover:bg-violet-800 cursor-pointer bg-zinc-900 justify-center"}
                        onClick={() => {
                            console.log( "New Employee" )
                            employeeManagementActor.send( {
                                type: "Edit Employee"
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
            <div className={"absolute"}>
            </div>
        </div>
    );
}

export default EmployeesManagement;