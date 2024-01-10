import React, { useEffect } from "react";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import StackableInput from "../../../../molecules/StackableInput.tsx";
import { MedicalFile } from "../../../../../logic/models/EditEmployeeMachineModels.ts";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import EditEmployeeWrapper from "../../../../organisms/EditEmployeeWrapper.tsx";
import InputText from "../../../../atoms/InputText.tsx";

const EditEmployeeMedicalFiles = () => {
    const context = EditEmployeeContext.useSelector( state => state.context );
    const actor = EditEmployeeContext.useActorRef();
    const [Ailments, setAilments] = React.useState<string[]>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.Ailments;
        }
        return [];
    } );
    const [allergies, setAllergies] = React.useState<string[]>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.allergies;
        }
        return [];
    } );
    const [SSN, setSSN] = React.useState<string>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.SSN;
        }
        return "";
    } );
    const [hasExternalMedicalInsurance, setHasExternalMedicalInsurance] = React.useState<boolean>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.hasExternalMedicalInsurance;
        }
        return false;
    } );
    const [externalMedicalInsuranceProof, setExternalMedicalInsuranceProof] = React.useState<string | ArrayBuffer | null>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.externalMedicalInsuranceProof;
        }
        return null;
    } );
    const [externalMedicalInsuranceName, setExternalMedicalInsuranceName] = React.useState<string>( () => {
        if ( context.medical_file != null ) {
            return context.medical_file.externalMedicalInsuranceName;
        }
        return "";
    } );
    const [data, setData] = React.useState<MedicalFile | null>( context.medical_file );

    useEffect( () => {
        setData( {
            Ailments: Ailments,
            allergies: allergies,
            SSN: SSN,
            hasExternalMedicalInsurance: hasExternalMedicalInsurance,
            externalMedicalInsuranceProof: externalMedicalInsuranceProof,
            externalMedicalInsuranceName: externalMedicalInsuranceName,
        } );
    }, [Ailments, allergies, SSN, hasExternalMedicalInsurance, externalMedicalInsuranceName,] );

    useEffect( () => {
        console.log( "Medical File Saved" )
        actor.send( { type: "Go Medical File", data: data as MedicalFile } );
    }, [data] );

    return (
        <EditEmployeeWrapper data={data}>
            <div className={"w-3/4 mx-auto"}>
                <StackableInput onPush={
                    ( value ) => {
                        setAilments( current => {
                            current = [value, ...current];
                            return current;
                        } )
                    }
                } stack={Ailments}
                                label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Ailment</span>}
                                placeholder={"Ailment name"}
                                title={"Ailments Section"}/>
                <StackableInput onPush={
                    ( value ) => {
                        setAllergies( current => {
                            current = [value, ...current];
                            return current;
                        } );
                    }
                } stack={allergies}
                                label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Allergy</span>}
                                placeholder={"Allergy Name"}
                                title={"Allergies Section"}/>
            </div>
            <div className={"w-5/6 mx-auto my-4"}>
                <InputText placeholder={"SSN"} value={SSN} onInput={( e ) => setSSN( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mr-4"}>SSN</span>}
                           id={"SSN"}/>
            </div>
            <div className={"flex flex-row items-center my-8 mb-4 justify-center"}>
                <input type={"checkbox"} checked={hasExternalMedicalInsurance} onChange={( e ) => {
                    setHasExternalMedicalInsurance( e.target.checked );
                }} className={"w-5 h-5 mr-2"}/>
                <label className={"text-blue-700"}>Has External Medical Insurance</label>
            </div>
            {

                hasExternalMedicalInsurance ?
                    <>
                        <div className={"flex mr-4 items-center"}>
                            <InputText placeholder={"External Medical Insurance Name"}
                                       value={externalMedicalInsuranceName}
                                       onInput={( e ) => setExternalMedicalInsuranceName( e.currentTarget.value )}
                                       label={<span
                                           className={"font-semibold text-blue-700 select-none text-right mr-4"}>External Medical Insurance Name</span>}
                                       id={"External Medical Insurance Name"}/>
                            <div className={"mx-6"}>
                                <PDFUpload onPDFSelect={( pdf ) => {
                                    setExternalMedicalInsuranceProof( pdf );
                                }} label={"Medical Insurance Proof"} value={externalMedicalInsuranceProof}/>
                            </div>
                        </div>
                    </> : <></>
            }
        </EditEmployeeWrapper>
    )
}

export default EditEmployeeMedicalFiles;