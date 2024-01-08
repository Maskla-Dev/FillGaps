import { WorkAreaData } from "../../logic/models/EmployeesManagementModels.ts";
import { useHover } from "@uidotdev/usehooks";
import { AppContext, EmployeeManagementContext } from "../../logic/ActorContexts.ts";

const WorkAreaCard = ( { name, illustration, is_current }: WorkAreaData ) => {
    const [ref, hovering] = useHover<HTMLDivElement>();
    const key = AppContext.useSelector( state => {
        return state.context.user_data.tokens.access;
    } );
    const actor = EmployeeManagementContext.useActorRef();

    const onClick = () => {
        if ( is_current ) return;
        actor.send( {
            type: "Go Next",
            // @ts-ignore
            work_area: name,
            access: key
        } )
    }

    return (
        <div ref={ref}
             className={`w-full flex flex-row items-center ${hovering ? "bg-zinc-200 border-r-8 border-r-blue-600" : ( is_current ? "border-r-4 border-r-emerald-400" : "bg-zinc-900" )} cursor-pointer`}
             onClick={onClick}
        >
            <img
                className={`w-1/4 object-scale-down object-center transition-all duration-300 ${hovering ? "w-2/6" : ( is_current ? "" : "grayscale" )}`}
                alt={name}
                src={illustration}
            />
            <div
                className={`ml-10 bottom-0 w-full py-0.5`}>
                <h3 className={`font-semibold text-center ${hovering ? "text-black" : "text-white "}`}>{name}</h3>
            </div>
        </div>
    );
}

export default WorkAreaCard;