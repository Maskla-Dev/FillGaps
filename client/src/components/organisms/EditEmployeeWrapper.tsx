import { PropsWithChildren, ReactNode } from "react";
import EditEmployeeNavigator from "./EditEmployeeNavigator.tsx";
import {
    EmployeeDocuments,
    GeneralData,
    MedicalFile,
    WorkerData
} from "../../logic/models/EditEmployeeMachineModels.ts";

interface EditEmployeeWrapperProps {
    children: ReactNode[];
    data: GeneralData | WorkerData | MedicalFile | EmployeeDocuments | null;
}

const EditEmployeeWrapper = ( props: PropsWithChildren<EditEmployeeWrapperProps> ) => {
    return (
        <div className={"h-full w-11/12 mx-auto mb-6 pb-8 shadow-xl rounded-2xl overflow-y-auto"}>
            <EditEmployeeNavigator data={props.data}/>
            {
                props.children
            }
        </div>
    );
}

export default EditEmployeeWrapper;