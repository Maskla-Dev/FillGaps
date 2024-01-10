import { AppContext, EditEmployeeContext, EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import { useEffect } from "react";
import EditEmployee from "./EditEmployee/EditEmployee.tsx";
import EmployeeBrief from "./EmployeeBrief/EmployeeBrief.tsx";
import EmployeeManagementHome from "./EmployeeManagementHome.tsx";

const EmployeeManagementRouter = () => {
    const state = EmployeeManagementContext.useSelector( state => state.value );
    const employee_id = EmployeeManagementContext.useSelector( state => state.context.current_employee );
    const key = AppContext.useSelector( state => state.context.user_data.tokens.access );

    useEffect( () => {
        console.log( "Employee Management Router", state, employee_id )
    }, [state] );

    switch ( state ) {
        case "Work Areas":
        case "Get Employees List":
        case "Edit Employee Error":
        case "Employee List Error":
        case "Employee Brief Error":
            return <EmployeeManagementHome/>
        case "Edit Employee":
            return <EditEmployeeContext.Provider options={{
                input: {
                    employee_id: employee_id,
                    key: key
                }
            }}>
                <EditEmployee/>;
            </EditEmployeeContext.Provider>
        case "Employee Brief":
            return <EmployeeBrief/>;
        default:
            return <div>Not Found</div>;
    }
}

export default EmployeeManagementRouter;