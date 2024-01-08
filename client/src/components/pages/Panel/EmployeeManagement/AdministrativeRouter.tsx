import { AppContext, EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import { useEffect } from "react";
import AdministrativePanel from "../AdministrativePanel.tsx";
import EmployeesManagement from "./EmployeesManagement.tsx";

const AdministrativeRouter = () => {
    const state = AppContext.useSelector( state => {
        if ( typeof ( state.value ) == "object" ) {
            if ( state.value["FillGaps App"] ) {
                if ( state.value["FillGaps App"].Panel ) {
                    if ( typeof ( state.value["FillGaps App"]["Panel"] ) == "object" )
                        return "Employees Management";
                    return state.value["FillGaps App"]["Panel"];
                }
            }
        }
    } );

    useEffect( () => {
        console.log( "Administrative Router", state )
    }, [state] );

    switch ( state ) {
        case "Employees Management":
            return (
                <EmployeeManagementContext.Provider>
                    <EmployeesManagement/>
                </EmployeeManagementContext.Provider>
            );
        case "Main":
            return <AdministrativePanel/>;
    }
}

export default AdministrativeRouter;