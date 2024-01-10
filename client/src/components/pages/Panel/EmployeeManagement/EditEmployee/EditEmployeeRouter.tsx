import { AppContext, EditEmployeeContext, EmployeeManagementContext } from "../../../../../logic/ActorContexts.ts";
import { useEffect } from "react";
import EditEmployeePersonalInfo from "./EditEmployeePersonalInfo.tsx";
import EditEmployeeDocuments from "./EditEmployeeDocuments.tsx";
import EditEmployeeEmployeeData from "./EditEmployeeEmployeeData.tsx";
import EditEmployeeMedicalFiles from "./EditEmployeeMedicalFiles.tsx";
import ConfirmActionWall from "./ConfirmActionWall.tsx";
import Loader from "../../../../atoms/Loader.tsx";

const EditEmployeeRouter = () => {
    const actor = EmployeeManagementContext.useActorRef();
    const state = EditEmployeeContext.useSelector( state => state.value );
    const access = AppContext.useSelector( state => state.context.user_data.tokens.access )
    const actorRef = EditEmployeeContext.useActorRef();

    useEffect( () => {
        console.log( "Edit Employee Router", state )
        switch ( true ) {
            case state == "End Edit":
                actor.send( { type: "Go Back" } );
                break;
            case state == "End Save":
                actor.send( { type: "Edit Success", access: access } );
                break;
            case state == "Error":
                actor.send( { type: "Edit Error" } );
                break;

        }
    }, [state] );

    switch ( state ) {
        case "Cancel Wall":
            return <ConfirmActionWall text={"Do you want to cancel?"} onCancel={() => {
                actorRef.send( {
                    type: "Go Back",
                    data: undefined
                } );
            }} onConfirm={() => {
                actorRef.send( {
                    type: "Go Next",
                    data: undefined
                } );
            }}/>;
        case "Save Wall":
            return <ConfirmActionWall text={"Do you want to save?"} onCancel={() => {
                actorRef.send( {
                    type: "Go Back",
                    data: undefined
                } );
            }} onConfirm={() => {
                actorRef.send( {
                    type: "Go Next",
                    data: undefined
                } );
            }}/>;
        case "Start Edit":
        case "Get Employee Data":
        case "Save Employee Data":
            return <Loader/>;
        case "Personal Info":
            return <EditEmployeePersonalInfo/>;
        case "Documents":
            return <EditEmployeeDocuments/>;
        case "Worker Data":
            return <EditEmployeeEmployeeData/>;
        case "Medical File":
            return <EditEmployeeMedicalFiles/>;
        default:
            return <div>Not Found</div>;
    }
}

export default EditEmployeeRouter;