import { FeaturesContext, EmployeesManagementContext } from "../../logic/ActorContexts.ts";
import EmployeeFeatures from "./EmployeeFeatures.tsx";
import { useEffect } from "react";
import EmployeesManagement from "./EmployeesManagement.tsx";

const AppRouter = () => {
    const state = FeaturesContext.useSelector( state => state );
    useEffect( () => {
        console.log( state.value );
    }, [state.value] );

    switch ( state.value ) {
        case "chat":
            return <></>;
        case "panel":
            return <EmployeeFeatures/>;
        case "employees":
            return (
                <EmployeesManagementContext.Provider>
                    <EmployeesManagement/>
                </EmployeesManagementContext.Provider>
            );
    }
}

export default AppRouter;