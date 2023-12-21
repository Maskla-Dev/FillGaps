import { ChatBubbleLeftRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import SessionStatus from "./SessionStatus.tsx";
import { SessionInfoProps } from "./SessionInfoProps.tsx";

const image = 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'

function AppNav( props: SessionInfoProps ) {

    return (
        <nav className={"w-full h-fit bg-blue-900 flex px-4 items-center justify-between shadow-black shadow-sm py-2"}>
            <SessionStatus image={image}/>
            <div className={"flex flex-row w-fit"}>
                <button className={"flex flex-col items-center justify-between mx-4 h-full"}>
                    <HomeIcon className={"w-6 h-6 text-white"}/>
                </button>
                <button className={"flex flex-col items-center justify-between mx-2.5 h-full"}>
                    <ChatBubbleLeftRightIcon className={"w-6 h-6 text-white"}/>
                </button>
            </div>
        </nav>
    );
}

export default AppNav;