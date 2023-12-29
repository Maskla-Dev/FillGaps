import { AppContext } from "../../../../../logic/ActorContexts.ts";
import React, { useState } from "react";
import FormButton from "../../../../atoms/FormButton.tsx";
import ImageUpload from "../../../../molecules/ImageUpload.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";

const IDTypes = [
    "DNI",
    "Passport",
    "Foreign ID",
    "Other"
]

export interface NewEmployeeChildProps {
    state: string;
}

const NewEmployeeDocuments = ( { state }: NewEmployeeChildProps ) => {
    const actor = AppContext.useActorRef();
    const [photo, setPhoto] = useState<string | ArrayBuffer | null>( null );
    const [CV, setCV] = useState<string | ArrayBuffer | null>( null );
    const [ID, setID] = useState<string | ArrayBuffer | null>( null );
    const [idType, setIdType] = useState<string | null>( "DNI" );
    const [idNumber, setIdNumber] = useState<string>( "" );
    const [addressProof, setAddressProof] = useState<string | ArrayBuffer | null>( null );
    const [bacherlorDegree, setBacherlorDegree] = useState<string | ArrayBuffer | null>( null );
    const [masterDegree, setMasterDegree] = useState<string | ArrayBuffer | null>( null );
    const [phdDegree, setPhdDegree] = useState<string | ArrayBuffer | null>( null );

    return (
        <div>
            <h2 className={"font-semibold text-center mt-2 text-white"}>Documents</h2>
            <ImageUpload onImageSelect={setPhoto}/>
            <PDFUpload onPDFSelect={setCV}/>
            <PDFUpload onPDFSelect={setID}/>
            <SelectInput options={IDTypes} value={idType} placeholder={"ID Type"} onChange={
                ( option: string | null ) => {
                    setIdType( option );
                }
            }/>
            <input type={"text"} placeholder={"ID Number"} value={idNumber}
                   onChange={( e ) => setIdNumber( e.target.value )}
                   className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2"}/>
            <PDFUpload onPDFSelect={setAddressProof}/>
            <PDFUpload onPDFSelect={setBacherlorDegree}/>
            <PDFUpload onPDFSelect={setMasterDegree}/>
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
    );
}

export default NewEmployeeDocuments;