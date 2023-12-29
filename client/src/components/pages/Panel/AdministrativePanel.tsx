import PanelIcon from "../../molecules/PanelIcon.tsx";
import { UsersIcon } from "@heroicons/react/24/solid";
import { AppContext } from "../../../logic/ActorContexts.ts";

const AdministrativePanel = () => {
    const actorRef = AppContext.useActorRef();
    const onEmployeeClick = () => {
        actorRef.send( { type: "Go Employees Management" } );
    }

    return (
        <div className={"grid grid-cols-2 gap-3 px-3 py-3 md:grid-cols-4"}>
            <PanelIcon title={"Employees"} description={"Employees management"} onClick={onEmployeeClick}>
                <UsersIcon className={"w-1/2 h-1/2 text-white"}/>
            </PanelIcon>
        </div>
    );
}

export default AdministrativePanel;