import { FC, ChangeEvent, useRef } from 'react';
import { DocumentArrowUpIcon, DocumentCheckIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface PDFUploadProps {
    onPDFSelect: ( pdf: string | ArrayBuffer | null ) => void;
    value: string | ArrayBuffer | null;
    label: string;
}

const PDFUpload: FC<PDFUploadProps> = ( { onPDFSelect, value, label } ) => {
    const inputRef = useRef<HTMLInputElement>( null );
    const handlePDFUpload = ( event: ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onPDFSelect( reader.result );
            };
            reader.readAsDataURL( file );
        }
    };

    return (
        <div
            className={`py-2 px-4 w-40 h-fit flex flex-row items-center justify-between ${value ? "bg-violet-800 text-violet-50 font-semibold" : "bg-violet-50 text-violet-800"} rounded-lg cursor-pointer`}>
            <label className={"flex flex-row items-center capitalize text-sm select-none"}>
                <div className={"w-6 h-6 mr-1"}>
                    {
                        value ?

                            <DocumentCheckIcon/> :
                            <DocumentArrowUpIcon/>
                    }
                </div>
                <span>{value ? `Change ${label}` : `Upload ${label}`}</span>
                < input
                    ref={inputRef}
                    className={"hidden"}
                    type='file' accept='application/pdf' onChange={handlePDFUpload}/>
            </label>
            {
                value ?
                    <XCircleIcon className={"w-6 h-6 text-white cursor-pointer"}
                                 onClick={() => {
                                     onPDFSelect( null )
                                     if ( inputRef.current ) {
                                         inputRef.current.value = "";
                                     }
                                 }}/> :
                    <></>
            }
        </div>
    );
};

export default PDFUpload;