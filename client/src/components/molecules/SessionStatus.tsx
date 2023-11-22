import { useContext } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { SessionInfoProps } from "./SessionInfoProps.tsx";

const SessionStatus = ( { image }: SessionInfoProps ) => {
    const [is_online] = useContext( ChatContext );

    return (
        <div
            className={`relative min-w-12 min-h-12 border-2 rounded-full ${is_online ? "border-green-600 " : "border-rose-600"}`}>
            <img src={image}
                 alt={"Employee avatar"}
                 className={`w-12 h-12 rounded-full object-cover object-center`}/>
        </div>
    )
}

export default SessionStatus;