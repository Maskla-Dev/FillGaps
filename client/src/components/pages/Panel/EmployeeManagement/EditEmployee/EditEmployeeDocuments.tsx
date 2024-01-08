import { useEffect, useState } from "react";
import ImageUpload from "../../../../molecules/ImageUpload.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import EditEmployeeNavigator from "../../../../organisms/EditEmployeeNavigator.tsx";

const IDTypes = [
    "DNI",
    "Passport",
    "Foreign ID",
    "Other"
]

export interface EditEmployeeChildProps {
    state: string;
    actor: any;
}

const EditEmployeeDocuments = () => {
    const [photo, setPhoto] = useState<string | ArrayBuffer | null>( null );
    const [CV, setCV] = useState<string | ArrayBuffer | null>( null );
    const [ID, setID] = useState<string | ArrayBuffer | null>( null );
    const [idType, setIdType] = useState<string | null>( "DNI" );
    const [idNumber, setIdNumber] = useState<string>( "" );
    const [addressProof, setAddressProof] = useState<string | ArrayBuffer | null>( null );
    const [bacherlorDegree, setBacherlorDegree] = useState<string | ArrayBuffer | null>( null );
    const [masterDegree, setMasterDegree] = useState<string | ArrayBuffer | null>( null );
    const [phdDegree, setPhdDegree] = useState<string | ArrayBuffer | null>( null );
    const [data, setData] = useState<any>( {} );

    useEffect( () => {

    }, [photo, CV, ID, idType, idNumber, addressProof, bacherlorDegree, masterDegree, phdDegree] );

    return (
        <div className={"h-full"}>
            <EditEmployeeNavigator data={data}/>
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
        </div>
    );
}

export default EditEmployeeDocuments;