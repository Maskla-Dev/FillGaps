import { Outlet, useNavigate } from "react-router-dom";
import SessionInfo from "../molecules/SessionInfo.tsx";
import AppNav from "../molecules/AppNav.tsx";
import { useSession } from "../../utils/hooks/hooks.ts";
import { useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Navigator from "../organisms/Navigator.tsx";

const image = "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png";
const name = "Carlo Nicoli";
const position = "Overseer";

function App() {
    const [session, setSession] = useSession();
    const navigate = useNavigate();

    return (
        <>
            <header
                className={"w-full h-fit bg-blue-600 flex items-center justify-between pr-2 shadow-black shadow-sm"}>
                <SessionInfo image={image} name={name} position={position}/>
                <Navigator/>
            </header>
            <AppNav/>
            <Outlet/>
        </>
    )
}

export default App;