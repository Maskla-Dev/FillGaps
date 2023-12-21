import { WorkAreaData } from "../../logic/models/EmployeesManagementModels.ts";
import { useHover } from "@uidotdev/usehooks";
import { FeaturesContext } from "../../logic/ActorContexts.ts";

interface WorkAreaCardProps {
    to_move: string;
}

const WorkAreaCard = ( { name, illustration }: WorkAreaData | WorkAreaCardProps ) => {
    const [ref, hovering] = useHover<HTMLDivElement>();
    const actor = FeaturesContext.useActorRef();

    const onClick = () => {
        actor.send({
            type: "Get Employee List"
        })
    }

    return (
        <div ref={ref}
             className={"border-l-8 hover:bg-zinc-900 py-3 hover:border-blue-600 md:p-0 md:border-0 md:m-0 md:relative w-full h-fit flex flex-row items-center md:w-52 md:h-52 md:rounded-xl md:overflow-hidden cursor-pointer"}
             onClick={onClick}
        >
            <img
                className={`ml-3 md:m-0 w-1/4 rounded-full md:rounded-none md:absolute md:w-full md:h-full md:object-scale-down md:object-center transition-all duration-300 ${hovering ? "md:transform scale-110" : "md:grayscale"}`}
                alt={name}
                src={illustration}
            />
            <div
                className={`ml-10 md:m-0 md:absolute bottom-0 w-full py-0.5 ${hovering ? "md:bg-blue-600" : "md:bg-green-900"}`}>
                <h3 className={"text-white font-semibold md:text-center"}>{name}</h3>
            </div>
        </div>
    );
}

export default WorkAreaCard;