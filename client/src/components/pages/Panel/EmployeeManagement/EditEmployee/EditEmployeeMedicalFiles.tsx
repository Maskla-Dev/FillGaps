import React, { useEffect } from "react";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import StackableInput from "../../../../molecules/StackableInput.tsx";
import BoldText from "../../../../atoms/BoldText.tsx";
import EditEmployeeNavigator from "../../../../organisms/EditEmployeeNavigator.tsx";

const EditEmployeeMedicalFiles = () => {
    const [Ailments, setAilments] = React.useState<string[]>( [] );
    const [allergies, setAllergies] = React.useState<string[]>( [] );
    const [SSN, setSSN] = React.useState<string>( "" );
    const [bloodType, setBloodType] = React.useState<string>( "" );
    const [emergencyContactName, setEmergencyContactName] = React.useState<string>( "" );
    const [emergencyContactNumber, setEmergencyContactNumber] = React.useState<string>( "" );
    const [emergencyContactRelationship, setEmergencyContactRelationship] = React.useState<string>( "" );
    const [hasExternalMedicalInsurance, setHasExternalMedicalInsurance] = React.useState<boolean>( false );
    const [externalMedicalInsuranceProof, setExternalMedicalInsuranceProof] = React.useState<string | ArrayBuffer | null>( null );
    const [externalMedicalInsuranceName, setExternalMedicalInsuranceName] = React.useState<string>( "" );
    const [externalMedicalInsuranceNumber, setExternalMedicalInsuranceNumber] = React.useState<string>( "" );
    const [data, setData] = React.useState<any>( {} );

    useEffect( () => {

    }, [
        Ailments, allergies, SSN, bloodType, emergencyContactName, emergencyContactNumber,
        emergencyContactRelationship, hasExternalMedicalInsurance, externalMedicalInsuranceName,
        setExternalMedicalInsuranceNumber
    ] );
    return (
        <div className={"h-full"}>
            <EditEmployeeNavigator data={data}/>
            <StackableInput onChange={
                ( value ) => {
                    if ( value ) {
                        setAilments( [...Ailments, value] );
                    }
                }
            } stack={Ailments} label={<BoldText text={"Ailment"}/>} placeholder={"Ailment name"}
                            title={"Ailments Section"}/>
            <StackableInput onChange={
                ( value ) => {
                    if ( value ) {
                        setAllergies( [...allergies, value] );
                    }
                }
            } stack={allergies} label={<BoldText text={"Allergies"}/>} placeholder={"Allergy Name"}
                            title={"Allergies Section"}/>
            <input type={"text"} placeholder={"SSN"} value={SSN}
                   onChange={( e ) => setSSN( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <input type={"text"} placeholder={"Blood Type"} value={bloodType}
                   onChange={( e ) => setBloodType( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <input type={"text"} placeholder={"Emergency Contact Name"} value={emergencyContactName}
                   onChange={( e ) => setEmergencyContactName( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <input type={"text"} placeholder={"Emergency Contact Number"} value={emergencyContactNumber}
                   onChange={( e ) => setEmergencyContactNumber( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <input type={"text"} placeholder={"Emergency Contact Relationship"} value={emergencyContactRelationship}
                   onChange={( e ) => setEmergencyContactRelationship( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <div className={"flex flex-row items-center"}>
                <input type={"checkbox"} checked={hasExternalMedicalInsurance} onChange={( e ) => {
                    setHasExternalMedicalInsurance( e.target.checked );
                }} className={"w-5 h-5 mr-2"}/>
                <label className={"text-white"}>Has External Medical Insurance</label>
            </div>
            {

                hasExternalMedicalInsurance ?
                    <>
                        <input type={"text"} placeholder={"External Medical Insurance Name"}
                               value={externalMedicalInsuranceName}
                               onChange={( e ) => setExternalMedicalInsuranceName( e.target.value )}
                               className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
                        <input type={"text"} placeholder={"External Medical Insurance Number"}
                               value={externalMedicalInsuranceNumber}
                               onChange={( e ) => setExternalMedicalInsuranceNumber( e.target.value )}
                               className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
                        {
                            externalMedicalInsuranceProof ? ( <div>
                                    <a href={URL.createObjectURL( ( new Blob( [externalMedicalInsuranceProof as ArrayBuffer], { type: 'application/pdf' } ) ) )}
                                       target={"_blank"}>PDF File</a>
                                </div> ) :
                                <PDFUpload onPDFSelect={( pdf ) => {
                                    setExternalMedicalInsuranceProof( pdf );
                                }}/>
                        }
                    </> :
                    <></>
            }
        </div>
    )
}

export default EditEmployeeMedicalFiles;