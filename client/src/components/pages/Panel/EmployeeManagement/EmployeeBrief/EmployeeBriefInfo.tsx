import { EmployeeBrief, EmployeeState, EmployeeStates } from "../../../../../logic/models/EmployeeBriefModels.ts";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import { useMemo, useState } from "react";
import { EmployeeBriefContext, EmployeeManagementContext } from "../../../../../logic/ActorContexts.ts";
import DateDisplay from "../../../../molecules/DateDisplay.tsx";
import FormButton from "../../../../atoms/FormButton.tsx";
import ConfirmActionWall from "../EditEmployee/ConfirmActionWall.tsx";

const getHHMM = ( date: Date ) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours.toString().padStart( 2, '0' )}:${minutes.toString().padStart( 2, '0' )}`;
}

const EmployeeBriefInfo = () => {
    const briefMachineActor = EmployeeBriefContext.useActorRef();
    const employeeManagementActor = EmployeeManagementContext.useActorRef();
    const employee_data: EmployeeBrief = EmployeeBriefContext.useSelector( state => state.context );
    const [status, setStatus] = useState( employee_data.state );
    const is_active = useMemo( () => employee_data.state == "Active", [] );
    const [cancelled, setCancelled] = useState( false );
    const [wall, setWall] = useState( {
        show: false,
        text: ""
    } );

    return (
        <div className={"w-full h-full p-8 flex flex-col items-center"}>
            <div className={"animate-fade animate-delay-200 animate-duration-100 animate-ease-in text-center"}>
                <h1 className={"text-violet-900 text-4xl font-bold my-4 capitalize"}>{employee_data.name}</h1>
                <h2 className={"text-violet-900/80 text-xl font-semibold capitalize"}>{employee_data.role}</h2>
            </div>
            <img
                className={"h-80 w-80 animate-jump-in animate-ease-in rounded-full object-cover object-center my-10"}
                src={`http://127.0.0.1:8000${employee_data.photo}`} alt={employee_data.name}/>
            <div className={"w-2/4 flex items-center justify-between my-2"}>
                <span className={"font-semibold text-right text-lg text-purple-600"}>Status: </span>
                <SelectInput options={EmployeeStates} placeholder={"Employee State"} value={status}
                             onChange={( option ) => {
                                 if ( option != null )
                                     setStatus( option as EmployeeState );
                             }}/>
            </div>
            <div className={"w-2/4 flex items-center justify-between my-2"}>
                <span className={"font-semibold text-right text-lg text-purple-600"}>Department:</span>
                <span className={"italic text-purple-600/80"}>{employee_data.department}</span>
            </div>
            <div className={"w-2/4 flex items-center justify-between my-2"}>
                <span className={"font-semibold text-right text-lg text-purple-600"}>Employee since: </span>
                <div>
                    <DateDisplay date={new Date( employee_data.end_journey )}/>
                </div>
            </div>
            <div className={"w-2/4 flex items-center justify-between my-2"}>
                <span className={"font-semibold text-right text-lg text-purple-600"}>Employee schedule</span>
                <span
                    className={"italic text-purple-600/80"}>{getHHMM( new Date( employee_data.init_journey ) )} - {getHHMM( new Date( employee_data.end_journey ) )}</span>
            </div>
            <div className={"w-full flex flex-row justify-evenly items-center "}>
                {
                    is_active ?
                        (
                            <FormButton onClick={() => {
                                setWall( {
                                    show: true,
                                    text: "Do you want to change the status?"
                                } );
                            }} text={"Change Status"} isDisabled={status == employee_data.state}/>
                        ) :
                        ( <></> )
                }
                <FormButton onClick={() => {
                    employeeManagementActor.send( { type: "Edit Employee" } );
                }} text={"Edit Info"}/>
            </div>
            <FormButton onClick={() => {
                setCancelled( true );
            }} text={"Cancel"}/>
            {
                cancelled ? (
                    <dialog
                        className={"w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-black bg-opacity-50 animate-fade-down animate-duration-100 animate-ease-in"}>
                        <ConfirmActionWall text={"Do you want to cancel the employee?"} onConfirm={() => {
                            employeeManagementActor.send( {
                                type: "Go Back"
                            } );
                            setCancelled( false );
                        }} onCancel={() => {
                            setCancelled( false );
                        }}/>
                    </dialog>
                ) : ( <></> )
            }
            {
                wall.show ? (
                    <dialog
                        className={"w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-black bg-opacity-50 animate-fade-down animate-duration-100 animate-ease-in"}>
                        <div
                            className={"w-3/4 h-1/2 bg-white rounded-md flex flex-col items-center justify-center text-center"}>
                            <h1 className={"text-2xl font-bold"}>{wall.text}</h1>
                            <div className={"w-full flex flex-row justify-evenly"}>
                                <button onClick={() => {
                                    setWall( {
                                        show: false,
                                        text: ""
                                    } );
                                }}>Cancel
                                </button>
                                <button onClick={() => {
                                    briefMachineActor.send( {
                                        type: "Change Active Status",
                                        payload: {
                                            state: status
                                        }
                                    } );
                                    setWall( {
                                        show: false,
                                        text: ""
                                    } );
                                }}>Confirm
                                </button>
                            </div>
                        </div>
                    </dialog>
                ) : ( <></> )
            }
        </div>
    )
}
export default EmployeeBriefInfo;