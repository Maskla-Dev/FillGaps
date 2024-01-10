import { EditEmployeeContext } from "../../logic/ActorContexts.ts";
import EditEmployeeNav from "../atoms/EditEmployeeNav.tsx";

interface EditEmployeeNavigatorProps {
    data: any;
}

const EditEmployeeNavigator = ( { data }: EditEmployeeNavigatorProps ) => {
    const actor = EditEmployeeContext.useActorRef();
    const state = EditEmployeeContext.useSelector( state => state.value );
    return (
        <div className={"flex flex-row w-full justify-center"}>
            <EditEmployeeNav onClick={() => {
                actor.send( {
                    type: "Go Personal Info",
                    data: data
                } )
            }} disabled={state == "Personal Info"} text={"Personal info"}/>
            <EditEmployeeNav
                onClick={() => {
                    actor.send( {
                        type: "Go Documents",
                        data: data
                    } )
                }}
                text={"Documents"}
                disabled={state == "Documents"}/>
            <EditEmployeeNav
                onClick={() => {
                    actor.send( {
                        type: "Go Worker Data",
                        data: data
                    } )
                }}
                text={"Worker Data"}
                disabled={state == "Worker Data"}/>
            <EditEmployeeNav
                onClick={() => {
                    actor.send( {
                        type: "Go Medical File",
                        data: data
                    } )
                }}
                text={"Medical File"}
                disabled={state == "Medical File"}/>
        </div>
    )
}

export default EditEmployeeNavigator;