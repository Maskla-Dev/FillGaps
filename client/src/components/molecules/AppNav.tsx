import { ChatBubbleLeftRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import SessionStatus from "./SessionStatus.tsx";
import NavElement from "./NavElement.tsx";
import { SessionInfoProps } from "./SessionInfoProps.tsx";

function AppNav( props: SessionInfoProps ) {

    return (
        <nav className={"w-full h-fit bg-blue-900 flex px-4 items-center justify-between shadow-black shadow-sm py-2"}>
            <SessionStatus {...props}/>
            <div className={"flex flex-row w-fit"}>
                <NavElement
                    base={"flex flex-col items-center justify-between mx-4 h-full"}
                    Icon={HomeIcon}
                    path={"/"}/>
                <NavElement
                    base={"flex flex-col items-center justify-between mx-2.5 h-full"}
                    Icon={ChatBubbleLeftRightIcon}
                    path={"chat"}/>
            </div>
        </nav>
    );
}

export default AppNav;