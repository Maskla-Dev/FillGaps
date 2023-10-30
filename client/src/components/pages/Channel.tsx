import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Messages from "../organisms/Messages.tsx";

function Channel() {
    const { channel_name } = useParams();
    const navigate = useNavigate();
    return (
        <div className={"flex flex-col w-full bg-teal-100 overflow-y-scroll"}>
            <header className={"flex flex-row justify-between w-full px-5 items-center bg-teal-300 py-2"}>
                <nav className={"flex p-0.5 h-7 w-7 rounded-full bg-teal-700"} onClick={() => navigate( -1 )}>
                    <ChevronLeftIcon className={"self-center w-full h-full stroke-white"}/>
                </nav>
                <div className={"basis-8/12 flex flex-row items-center justify-end"}>
                    <ExclamationCircleIcon className={"w-8 fill-indigo-400 mr-1"}/>
                    <h1 className={"text-md font-bold text-teal-700 truncate"}>{channel_name}</h1>
                </div>
            </header>
            <Messages/>
            <div className={"flex items-center py-3 bg-teal-300 px-2"}>
                <div className={"flex flex-row items-center"}>
                    <DocumentTextIcon className={"w-8 stroke-indigo-700"}/>
                    <PhotoIcon className={"w-8 stroke-indigo-700"}/>
                </div>
                <textarea
                    className={"w-full mx-3 resize-none py-3 px-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"}></textarea>
                <PaperAirplaneIcon className={"w-8 fill-indigo-700"}/>
            </div>
        </div>
    );
}

export default Channel;