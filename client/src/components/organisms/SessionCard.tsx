import ProfileInfo, { SessionInfoProps } from "../molecules/SessionInfoProps.tsx";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";
import { AppContext } from "../../logic/ActorContexts.ts";

const image = 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'

const SessionCard = ( session: SessionInfoProps ) => {
    const state = AppContext.useSelector( state => state );
    const actorRef = AppContext.useActorRef();
    const ref = useClickAway( () => {
        if ( state.matches( "profile-info" ) ) {
            actorRef.send( { type: "CLOSE_PROFILE" } );
        }
    } );

    function logout() {
        actorRef.send( { type: "LOGOUT" } );
    }

    return (
        // @ts-ignore
        <div ref={ref}
             className={`absolute bg-black bg-opacity-50 transition-all w-fit ${state.matches( "profile-info" ) ? "animate-grow-width" : "max-w-0"} overflow-x-hidden h-full`}>
            <div className={`bg-blue-600 h-fit flex flex-col px-6 py-3`}>
                <ProfileInfo image={image} name={session.name} position={session.position}/>
            </div>
            <ArrowLeftOnRectangleIcon
                onClick={logout}
                className={"absolute right-2.5 top-3.5 text-slate-200/70 w-8 h-8"}/>
        </div>
    );
}

export default SessionCard;