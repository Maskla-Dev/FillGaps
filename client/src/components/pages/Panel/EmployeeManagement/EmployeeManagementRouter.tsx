import { AppContext } from "../../../../logic/ActorContexts.ts";
import { useEffect } from "react";
import WorkAreas from "../../../organisms/WorkAreas.tsx";
import Loader from "../../../atoms/Loader.tsx";
import EmployeeList from "./EmployeeList.tsx";
import NewEmployee from "./New Employee/NewEmployee.tsx";
import MessageModal from "../../../organisms/ModalMessage.tsx";

const EmployeeManagementRouter = () => {
    const actor = AppContext.useActorRef();
    const state = AppContext.useSelector( state => {
        if ( typeof ( state.value ) == "object" ) {
            if ( state.value["FillGaps App"] ) {
                if ( state.value["FillGaps App"].Panel ) {
                    if ( typeof ( state.value["FillGaps App"]["Panel"] ) == "object" ) {
                        if ( typeof ( state.value["FillGaps App"]["Panel"]["Employees Management"] ) == "object" )
                            return state.value["FillGaps App"]["Panel"]["Employees Management"]["New Employee"] ? "New Employee" : ( state.value["FillGaps App"]["Panel"]["Employees Management"]["Employee Brief"] ? "Employee Brief" : "" );
                        return state.value["FillGaps App"]["Panel"]["Employees Management"];
                    }
                }
            }
        }
        return "";
    } );

    useEffect( () => {
        console.log( "Employee Management Router", state )
    }, [state] );

    switch ( state ) {
        case "Employees":
        case "Work Areas":
            return <WorkAreas/>;
        case "Get Employees List":
        case "Save Employee":
        case "Get Employee Brief":
            return <Loader/>
        case "Employees List":
            return <EmployeeList/>;
        case "New Employee":
            return <NewEmployee/>;
        case "Cancel New Employee":
            return <MessageModal message={"Are you sure you want to cancel?"} onConfirm={() => {
                actor.send( {
                    type: "Cancel"
                } )
            }} onCancel={() => {
                actor.send( {
                    type: "Ok"
                } )
            }}/>;
        case "Save New Employee":
            return <MessageModal message={"Are you sure you want to upload?"} onConfirm={() => {
                actor.send( {
                    type: "Cancel"
                } )
            }} onCancel={() => {
                actor.send( {
                    type: "Save"
                } )
            }}/>;
        case "Employee Brief":
            return <div>Employee Brief</div>;
        default:
            return <div>Not Found</div>;
    }
}

export default EmployeeManagementRouter;