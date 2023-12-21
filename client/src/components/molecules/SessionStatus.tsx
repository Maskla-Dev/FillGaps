import { useContext } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { SessionInfoProps } from "./SessionInfoProps.tsx";
import { AppContext } from "../../logic/ActorContexts.ts";
import ProfilePhoto from "../atoms/ProfilePhoto.tsx";
import { Bars2Icon } from "@heroicons/react/24/solid";

const SessionStatus = ( { image, name, position }: SessionInfoProps ) => {
    const [chat_state] = useContext( ChatContext );
    const state = AppContext.useSelector( state => state );
    const actorRef = AppContext.useActorRef();

    function onClick() {
        if ( state.matches( "profile-info" ) ) {
            actorRef.send( { type: "CLOSE_PROFILE" } );
        } else {
            actorRef.send( { type: "OPEN_PROFILE" } );
        }
    }

    return (
        <div
            className={`relative min-w-12 min-h-12 border-2 rounded-full`}
            onClick={onClick}>
            <ProfilePhoto image={image} is_online={chat_state.is_online} is_small={true}/>
            <Bars2Icon
                className={`shadow-2xl shadow-slate-800 w-5 h-5 absolute bottom-0 right-0 rounded-full bg-zinc-600 p-0.5 text-white rounded-full`}/>
        </div>
    )
}

export default SessionStatus;