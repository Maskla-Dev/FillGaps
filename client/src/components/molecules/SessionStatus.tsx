import { AppContext } from "../../logic/ActorContexts.ts";
import ProfilePhoto from "../atoms/ProfilePhoto.tsx";
import { Bars2Icon } from "@heroicons/react/24/solid";

const SessionStatus = () => {
    const state = AppContext.useSelector( state => {
        if ( typeof ( state.value ) === "object" ) {
            if ( state.value["FillGaps App"] ) {
                return state.value["FillGaps App"]["Profile Info"];
            }
        }
        return "";
    } );
    const actorRef = AppContext.useActorRef();

    function onClick() {
        if ( state.match( "Profile Shown" ) ) {
            actorRef.send( { type: "Hide Profile Info" } );
        } else {
            actorRef.send( { type: "Show Profile Info" } );
        }
    }

    return (
        <div
            className={`relative min-w-12 min-h-12 border-2 rounded-full`}
            onClick={onClick}>
            <ProfilePhoto is_small={true}/>
            <Bars2Icon
                className={`shadow-2xl shadow-slate-800 w-5 h-5 absolute bottom-0 right-0 rounded-full bg-zinc-600 p-0.5 text-white rounded-full`}/>
        </div>
    )
}

export default SessionStatus;