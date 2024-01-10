import { EmployeeBriefContext } from "../../../../../logic/ActorContexts.ts";
import Loader from "../../../../atoms/Loader.tsx";
import EmployeeBriefInfo from "./EmployeeBriefInfo.tsx";

const EmployeeBriefRouter = () => {
    const state = EmployeeBriefContext.useSelector( state => state );

    switch ( state.value ) {
        case "Get Employee Brief":
        case "Save Status Change":
        case "Save Reinstate":
        case "Main Brief":
            return <Loader/>
        case "Active Employee":
            return <EmployeeBriefInfo/>
        case "Inactive Employee":
            return <EmployeeBriefInfo/>
        case "Status Change Error":
        case "Reinstate Success":
        case "Change Active Status":
            return <div>Change Active Status</div>
        case "Reinstate Error":
        case "Status Change Done":
        case "Reinstate Employee":
            return <div>Reinstate Employee</div>
        default:
            return ( <div>Not found</div> )
    }
}

export default EmployeeBriefRouter;