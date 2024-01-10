import WorkAreas from "../../../organisms/WorkAreas.tsx";
import { EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import Loader from "../../../atoms/Loader.tsx";
import EmployeeList from "./EmployeeList.tsx";

const EmployeeManagementHome = () => {
    const state = EmployeeManagementContext.useSelector( state => state.value );
    return (
        <div className={"h-full flex flex-row"}>
            <div className={"w-96 h-full bg-zinc-800 flex flex-col justify-center overflow-y-auto shadow"}>
                <WorkAreas/>
            </div>
            <div className={"w-full h-full"}>
                {
                    state.match( "Get Employees List" ) ?
                        <Loader/> : <EmployeeList/>
                }
            </div>
        </div>
        
    )
}

export default EmployeeManagementHome;