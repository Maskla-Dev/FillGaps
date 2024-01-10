import { useEffect, useState } from "react";
import ImageUpload from "../../../../molecules/ImageUpload.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import { EmployeeDocuments } from "../../../../../logic/models/EditEmployeeMachineModels.ts";
import InputText from "../../../../atoms/InputText.tsx";
import EditEmployeeWrapper from "../../../../organisms/EditEmployeeWrapper.tsx";

// const IDTypes = [
//     "DNI",
//     "Passport",
//     "Foreign ID",
//     "Other"
// ]

const EditEmployeeDocuments = () => {
    const context = EditEmployeeContext.useSelector( state => state.context );
    const actor = EditEmployeeContext.useActorRef();
    const [photo, setPhoto] = useState<string | ArrayBuffer | null>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.photo;
        }
        return null;
    } );
    const [CV, setCV] = useState<string | ArrayBuffer | null>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.CV;
        }
        return null;

    } );
    const [ID, setID] = useState<string | ArrayBuffer | null>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.ID;
        }
        return null;
    } );
    const [addressProof, setAddressProof] = useState<string | ArrayBuffer | null>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.addressProof;
        }
        return null;
    } );
    const [bachelorDegreeProof, setBachelorDegreeProof] = useState<string | ArrayBuffer | null>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.bachelorDegreeProof;
        }
        return null;
    } );
    const [bachelorDegree, setBachelorDegree] = useState<string>( () => {
        if ( context.employee_documents != null ) {
            return context.employee_documents.bachelor_degree;
        }
        return "";
    } );
    const [data, setData] = useState<EmployeeDocuments | null>( context.employee_documents );

    useEffect( () => {
        setData( () => {
            let to_update: EmployeeDocuments = {
                photo: photo,
                CV: CV,
                ID: ID,
                addressProof: addressProof,
                bachelorDegreeProof: bachelorDegreeProof,
                bachelor_degree: bachelorDegree
            };
            console.log( "Documents", to_update )
            return to_update;
        } )
    }, [photo, CV, ID, addressProof, bachelorDegreeProof, bachelorDegree] );

    useEffect( () => {
        console.log( "Documents Saved" )
        actor.send( { type: "Go Documents", data: data as EmployeeDocuments } );
    }, [data] );

    return (
        <EditEmployeeWrapper data={data}>
            <div className={"w-full flex items-center flex-col mt-8"}>
                <ImageUpload onImageSelect={( data: null | ArrayBuffer | string ) => {
                    setPhoto( current => {
                        current = data;
                        return current;
                    } )
                }} value={photo}/>
            </div>
            <div className={"w-full flex items-center justify-evenly my-12"}>
                <PDFUpload onPDFSelect={setCV} value={CV} label={"CV"}/>
                <PDFUpload onPDFSelect={setID} value={ID} label={"ID"}/>
                <PDFUpload onPDFSelect={setAddressProof} value={addressProof} label={"Address Proof"}/>
            </div>
            <div className={"flex items-center justify-evenly"}>
                <PDFUpload onPDFSelect={setBachelorDegreeProof} value={bachelorDegreeProof}
                           label={"Bachelor's Degree"}/>
                <div className={"ml-12"}>
                    <InputText
                        placeholder={"Bachelor's Degree"}
                        value={bachelorDegree}
                        onInput={( e ) => {
                            setBachelorDegree( e.currentTarget.value );
                        }} label={<span
                        className={"font-semibold text-blue-700 select-none w-fit"}>Bachelor's Degree</span>}
                        id={"BACHELOR_DEGREE"}/>
                </div>
            </div>
        </EditEmployeeWrapper>
    )
}

export default EditEmployeeDocuments;