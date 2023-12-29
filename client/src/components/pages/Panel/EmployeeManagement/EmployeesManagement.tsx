import { AppContext } from "../../../../logic/ActorContexts.ts";
import ErrorMessage from "../../../molecules/ErrorMessage.tsx";
import { ArrowLeftCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import EmployeeManagementRouter from "./EmployeeManagementRouter.tsx";

const EmployeesManagement = () => {
    const { state, dialog_message } = AppContext.useSelector( state => {
        let state_value;
        if ( typeof ( state.value ) == "object" ) {
            if ( state.value["FillGaps App"] ) {
                if ( state.value["FillGaps App"].Panel ) {
                    if ( typeof ( state.value["FillGaps App"]["Panel"] ) == "object" )
                        state_value = state.value["FillGaps App"]["Panel"]["Employees Management"];
                }
            }
        }
        return {
            dialog_message: state.context.cache.dialog_message,
            state: state_value
        }
    } );
    const actor = AppContext.useActorRef();

    return (
        <div
            className={"flex flex-col w-full h-full rounded-lg bg-zinc-600 bg-opacity-40 overflow-hidden relative"}>
            <nav className={"w-full h-fit py-2 px-2 bg-violet-900 text-white flex flex-row justify-between"}>
                <ArrowLeftCircleIcon className={"w-8 h-8 text-white cursor-pointer"} onClick={() => {
                    if ( state !== "Work Areas" ) {
                        console.log( "Go Back", state )
                        actor.send( {
                            type: "Go Back"
                        } )
                    } else {
                        console.log( "Go Panel" )
                        actor.send( {
                            type: "Go Panel"
                        } )
                    }
                }}/>
                <div className={"flex flex-row items-center w-52 hover:text-amber-300 cursor-pointer"} onClick={() => {
                    console.log( "New Employee" )
                    actor.send( {
                        type: "New"
                    } )
                }}>
                    <UserPlusIcon className={"w-6 h-6 text-inherit mr-1.5"}/>
                    <span className={"text-inherit text-sm font-bold select-none"}>Add Employee</span>
                </div>
            </nav>
            <EmployeeManagementRouter/>
            {
                <ErrorMessage error={dialog_message}
                              show={state === "Employee List Error"}/>
            }
            <div className={"absolute"}>
            </div>
        </div>
    );
}

export default EmployeesManagement;