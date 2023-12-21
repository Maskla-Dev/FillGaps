import PanelIcon from "../molecules/PanelIcon.tsx";
import { UsersIcon } from "@heroicons/react/24/solid";
import { FeaturesContext } from "../../logic/ActorContexts.ts";

const AdministrativePanel = () => {
    const actorRef = FeaturesContext.useActorRef();
    const onEmployeeClick = () => {
        actorRef.send( { type: "GO-EMPLOYEES" } );
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