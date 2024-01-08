import { useState } from "react";
import InputText from "../../../../atoms/InputText.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import { Departments, Roles } from "../../../../../logic/models/EmployeesManagementModels.ts";
import BoldText from "../../../../atoms/BoldText.tsx";
import InputDate from "../../../../organisms/InputDate.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import EditEmployeeNavigator from "../../../../organisms/EditEmployeeNavigator.tsx";

const EditEmployeeEmployeeData = () => {
    const [RFC, setRFC] = useState<string>( "" );
    const [salary, setSalary] = useState<string>( "" );
    const [workArea, setWorkArea] = useState<string | null>( null );
    const [position, setPosition] = useState<string | null>( null );
    const [contractEnd, setContractEnd] = useState<Date>();
    const [contractProof, setContractProof] = useState<string | ArrayBuffer | null>( null );
    const [data, setData] = useState<any>( {} );
    return (
        <div className={"h-full"}>
            <EditEmployeeNavigator data={data}/>
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
            <InputDate/>
            <PDFUpload onPDFSelect={setContractProof}/>
        </div>
    )
}

export default EditEmployeeEmployeeData;