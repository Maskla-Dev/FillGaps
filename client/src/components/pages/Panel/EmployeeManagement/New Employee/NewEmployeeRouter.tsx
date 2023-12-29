import { AppContext } from "../../../../../logic/ActorContexts.ts";
import { useEffect } from "react";
import NewEmployeePersonalInfo from "./NewEmployeePersonalInfo.tsx";
import NewEmployeeDocuments from "./NewEmployeeDocuments.tsx";
import NewEmployeeEmployeeData from "./NewEmployeeEmployeeData.tsx";
import NewEmployeeMedicalFiles from "./NewEmployeeMedicalFiles.tsx";

const NewEmployeeRouter = () => {
    const state = AppContext.useSelector( state => {
        if ( typeof ( state.value ) == "object" ) {
            if ( state.value["FillGaps App"] ) {
                if ( state.value["FillGaps App"].Panel ) {
                    if ( typeof ( state.value["FillGaps App"]["Panel"] ) == "object" ) {
                        if ( typeof ( state.value["FillGaps App"]["Panel"]["Employees Management"] ) == "object" )
                            return state.value["FillGaps App"]["Panel"]["Employees Management"]["New Employee"];
                    }
                }
            }
        }
        return "";
    } );

    useEffect( () => {
        console.log( "New Employee Router", state )
    }, [state] );
    switch ( state ) {
        case "Personal Info":
            return <NewEmployeePersonalInfo state={state}/>;
        case "Documents":
            return <NewEmployeeDocuments state={state}/>;
        case "Employee Data":
            return <NewEmployeeEmployeeData state={state}/>;
        case "Medical File":
            return <NewEmployeeMedicalFiles state={state}/>;
        default:
            return <div>Not Found</div>;
    }
}

export default NewEmployeeRouter;