import ProfilePhoto from "../atoms/ProfilePhoto.tsx";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";

const SessionStatus = () => {
    const [is_online] = useContext( ChatContext );
    return (
        <div
            className={`relative min-w-12 min-h-12 border-4 rounded-full ${is_online != undefined ? ( is_online ? "border-green-600 " : "border-rose-600" ) : ""}`}
            onClick={undefined}>
            <ProfilePhoto is_small={true}/>
            <Bars2Icon
                className={`shadow-2xl shadow-slate-800 w-6 h-6 absolute bottom-0 right-0 rounded-full bg-zinc-600 p-0.5 text-white rounded-full`}/>
        </div>
    )
}

export default SessionStatus;