import { ChatBubbleLeftRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import SessionStatus from "./SessionStatus.tsx";

interface AppNavProps {
    onButtonClick: ( isPanel: boolean ) => void;
    is_panel: boolean;
}


function AppNav( { is_panel, onButtonClick }: AppNavProps ) {

    return (
        <nav
            className={"w-full h-24 max-h-24 bg-blue-800 flex px-4 items-center justify-between shadow-black shadow-sm py-2"}>
            <SessionStatus/>
            <div className={"flex flex-row w-fit"}>
                <button className={"flex flex-col items-center justify-between mx-4 h-full"}
                        onClick={() => {
                            onButtonClick( true );
                        }}>
                    <HomeIcon className={`w-8 h-8 ${is_panel ? "text-white" : ""}`}/>
                </button>
                <button className={"flex flex-col items-center justify-between mx-2.5 h-full"}
                        onClick={() => {
                            onButtonClick( false );
                        }}>
                    <ChatBubbleLeftRightIcon className={`w-8 h-8  ${is_panel ? "" : "text-white"}`}/>
                </button>
            </div>
        </nav>
    );
}

export default AppNav;