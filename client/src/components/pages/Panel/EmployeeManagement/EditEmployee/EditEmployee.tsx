import EditEmployeeRouter from "./EditEmployeeRouter.tsx";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import React, { useEffect } from "react";
import FormButton from "../../../../atoms/FormButton.tsx";
import {
    EditEmployeeMachineContext,
    EmployeeDocuments,
    GeneralData, MedicalFile, WorkerData
} from "../../../../../logic/models/EditEmployeeMachineModels.ts";
import ErrorMessage from "../../../../molecules/ErrorMessage.tsx";

function isNavAllowed( state_value: string ) {
    return state_value != "Cancel Wall" &&
        state_value != "Save Wall" &&
        state_value != "Get Employee Data";
}

function canSave( context: EditEmployeeMachineContext ) {
    return isValidDocuments( context.employee_documents ) &&
        isValidWorkerData( context.worker_data ) &&
        isValidMedicalFile( context.medical_file ) &&
        isValidGeneralData( context.general_data );
}

function isValidMedicalFile( data: MedicalFile | null ): boolean {
    let result = false;
    if ( !data ) return result;

    result = data.SSN !== "";
    if ( data.hasExternalMedicalInsurance ) {
        result &&= data.externalMedicalInsuranceProof !== null &&
            data.externalMedicalInsuranceName !== "";
    }
    console.log( result ? "Valid Medical File" : "No Valid Medical File" );
    return result;
}

function isValidWorkerData( data: WorkerData | null ): boolean {
    let result = false;
    if ( !data )
        return result;
    result =
        data.department !== null &&
        data.role !== null &&
        data.salary !== "" &&
        data.contractEnd !== null &&
        data.contractProof !== null &&
        data.bank !== "" &&
        data.bank_account !== 0 &&
        data.clabe !== 0 &&
        data.end_journey !== null &&
        data.init_journey !== null &&
        data.since !== null;
    console.log( result ? "Valid Worker Data" : "No Valid Worker Data" )
    return result;
}


function isValidGeneralData( data: GeneralData | null ): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const zipRegex = /^[0-9]{5}$/;

    let result = false;
    if ( !data )
        return result;
    result = data.first_name != "" &&
        data.last_name !== "" &&
        data.nationality !== null &&
        data.birthday !== null &&
        data.country !== "" &&
        data.city !== "" &&
        data.street !== "" &&
        data.settlement !== "" &&
        data.ext !== 0 &&
        data.int !== 0 &&
        data.cellphone !== 0 &&
        data.province !== "" &&
        phoneRegex.test( data.phone ) &&
        emailRegex.test( data.email ) &&
        zipRegex.test( data.zip );
    console.log( result ? "Valid General Data" : "No Valid General Data" )
    return result;
}

function isValidDocuments( data: EmployeeDocuments | null ): boolean {
    let result = false;
    if ( !data )
        return result;
    result = data.photo != null &&
        data.CV != null &&
        data.ID != null &&
        data.addressProof != null &&
        data.bachelorDegreeProof != null &&
        data.bachelor_degree !== "";
    console.log( result ? "Valid Documents" : "No Valid Documents" )
    return result;
}

const EditEmployee = () => {
    const state = EditEmployeeContext.useSelector( state => state.value );
    const message = EditEmployeeContext.useSelector( state => state.context.message );
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
    }, [context.employee_documents, context.general_data, context.medical_file, context.worker_data] );

    return (
        <>
            <div className={"flex flex-col "}>
                <h1 className={"text-white font-bold text-center leading-10 my-2"}>
                    {context.employee_id ? "Edit Employee" : "New Employee"}
                </h1>
                <div>

                </div>
                <EditEmployeeRouter/>
                {
                    navEnabled ? (
                        <div className={"h-fit flex flex-row justify-evenly"}>
                            {
                                state != "Save Employee Data" ? ( <><FormButton text={"Cancel"}
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
                                                }} isDisabled={!saveEnabled}/></> ) : <></>
                            }

                        </div>
                    ) : ( <> </> )
                }
            </div>
            {
                <ErrorMessage error={message} show={message.length > 0}/>
            }
        </>
    );
}

export default EditEmployee;