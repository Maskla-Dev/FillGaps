import { useClickAway } from "@uidotdev/usehooks";
import { useMemo } from "react";

export interface ErrorModalProps {
    error_header: string;
    error_body?: string[];
    onClose: () => void;
}

const ErrorModal = ( { error_header, error_body, onClose }: ErrorModalProps ) => {
    const ref = useClickAway<HTMLDivElement>( () => {
        onClose();
    } );

    const body = useMemo( () => {
        if ( error_body ) {
            return error_body.map( ( item, index ) => {
                if ( item === "" ) return;
                return (
                    <li key={index} className={"text-red-600"}>{item}</li>
                );
            } );
        }
    }, [error_body] );

    return (
        <div ref={ref}
             className={"bg-black bg-opacity-50 absolute w-full h-full flex items-center justify-center px-5"}>
            <div className={"w-full h-fit bg-white rounded-3xl flex flex-col justify-center items-center py-4 px-3"}>
                <h1 className={"text-2xl text-red-600 font-extrabold"}>Error</h1>
                <h2 className={"text-lg text-red-600 font-semibold"}>{error_header}</h2>
                <ul>
                    {body}
                </ul>
                <button className={"bg-red-600 text-white rounded-2xl p-2 w-1/3"} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default ErrorModal;