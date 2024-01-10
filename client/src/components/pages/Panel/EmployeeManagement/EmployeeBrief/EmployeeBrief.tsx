import EmployeeBriefRouter from "./EmployeeBriefRouter.tsx";
import { AppContext, EmployeeBriefContext, EmployeeManagementContext } from "../../../../../logic/ActorContexts.ts";
import { Employee } from "../../../../../logic/models/EmployeesManagementModels.ts";

const EmployeeBrief = () => {
    const key = AppContext.useSelector( state => state.context.user_data.tokens.access );
    const employee = EmployeeManagementContext.useSelector( state => {
        return state.context.employee_list.find( ( employee: any ) => employee.employee_id == state.context.current_employee )
    } );
    return (
        <div className={"w-full h-full"}>
            <EmployeeBriefContext.Provider options={{
                input: {
                    employee: {
                        ...( employee as Employee ),
                        key: key
                    }
                }
            }
            }>
                <EmployeeBriefRouter/>
            </EmployeeBriefContext.Provider>
        </div>
    )
}

export default EmployeeBrief;