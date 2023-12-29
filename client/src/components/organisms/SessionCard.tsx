import ProfileInfo from "../molecules/SessionInfoProps.tsx";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";
import { AppContext } from "../../logic/ActorContexts.ts";

const SessionCard = () => {
    const state = AppContext.useSelector( state => {
        if ( typeof ( state.value ) === "object" ) {
            if ( state.value["FillGaps App"] ) {
                return state.value["FillGaps App"]["Profile Info"];
            }
        }
        return "";
    } );
    const actorRef = AppContext.useActorRef();

    const ref = useClickAway( () => {
        if ( state.match( "Profile Shown" ) ) {
            actorRef.send( { type: "Hide Profile Info" } );
        }
    } );

    function logout() {
        actorRef.send( { type: "Log Out" } );
    }

    return (
        // @ts-ignore
        <div ref={ref}
             className={`absolute bg-black bg-opacity-50 transition-all w-fit z-20 ${state.match( "Profile Shown" ) ? "animate-grow-width" : "max-w-0"} overflow-x-hidden h-full`}>
            <div className={`bg-blue-600 h-fit flex flex-col px-6 py-3`}>
                <ProfileInfo/>
            </div>
            <ArrowLeftOnRectangleIcon
                onClick={logout}
                className={"absolute right-2.5 top-3.5 text-slate-200/70 w-8 h-8 cursor-pointer"}/>
        </div>
    );
}

export default SessionCard;