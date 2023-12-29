import React, { useState } from "react";
import FormButton from "../../../../atoms/FormButton.tsx";
import { AppContext } from "../../../../../logic/ActorContexts.ts";
import InputText from "../../../../atoms/InputText.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import { Departments, Roles } from "../../../../../logic/models/EmployeesManagementModels.ts";
import BoldText from "../../../../atoms/BoldText.tsx";
import DatePick from "../../../../organisms/DatePick.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import { NewEmployeeChildProps } from "./NewEmployeeDocuments.tsx";

const NewEmployeeEmployeeData = ( { state }: NewEmployeeChildProps ) => {
    const actor = AppContext.useActorRef();
    const [RFC, setRFC] = useState<string>( "" );
    const [salary, setSalary] = useState<string>( "" );
    const [workArea, setWorkArea] = useState<string | null>( null );
    const [position, setPosition] = useState<string | null>( null );
    const [contractEnd, setContractEnd] = useState<Date>();
    const [contractProof, setContractProof] = useState<string | ArrayBuffer | null>( null );

    return (
        <div>
            <h2 className={"font-semibold text-center mt-2 text-white"}>Employee Data</h2>
            <InputText placeholder={"AAAA929292B7A"} value={RFC} onInput={( e ) => {
                setRFC( e.target.value );
            }} label={<BoldText text={"RFC"}/>} id={"RFC"}/>
            <InputText placeholder={"$1000"} value={salary} onInput={( e ) => {
                setSalary( e.target.value );
            }} label={<BoldText text={"Salary"}/>} id={"SALARY"}/>
            <SelectInput options={Departments} value={workArea} placeholder={"Work Area"} onChange={
                ( option: string | null ) => {
                    setWorkArea( option );
                }
            }/>
            <SelectInput options={Roles} value={position} placeholder={"Role"} onChange={
                ( option: string | null ) => {
                    setPosition( option );
                }
            }/>
            <DatePick/>
            <PDFUpload onPDFSelect={setContractProof}/>
            <FormButton text={"Back"} onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                event.preventDefault();
                actor.send(
                    { type: "Go Back" }
                )
            }}/>
            <FormButton text={"Cancel"} onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                event.preventDefault();
                actor.send(
                    { type: "Cancel" }
                )
            }}/>
            <FormButton text={state == "Medical File" ? "Save" : "Next"}
                        onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                            event.preventDefault();
                            if ( state == "Medical File" ) {
                                actor.send(
                                    { type: "Save Employee" }
                                )
                            } else {
                                actor.send(
                                    { type: "Go Next" }
                                )
                            }
                        }}/>
        </div>
    )
}

export default NewEmployeeEmployeeData;