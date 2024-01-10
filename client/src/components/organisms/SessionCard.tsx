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
             className={`absolute shadow-xl top-20 left-4 flex flex-row justify-center bg-zinc-800 rounded-lg transition-all w-fit z-20 ${state.match( "Profile Shown" ) ? "animate-jump-in animate-duration-100 animate-ease-in" : "animate-jump-out animate-duration-100 animate-ease-in"} h-28 overflow-hidden`}>
            <ProfileInfo/>
            <ArrowLeftOnRectangleIcon
                onClick={logout}
                className={"mt-auto mb-2 mx-2 text-slate-200/70 w-8 h-8 cursor-pointer"}/>
        </div>
    );
}

export default SessionCard;