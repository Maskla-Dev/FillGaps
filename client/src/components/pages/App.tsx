import { Outlet } from "react-router-dom";
import SessionInfo from "../molecules/SessionInfo.tsx";
import AppNav from "../molecules/AppNav.tsx";

const image = "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png";
const name = "Carlo Nicoli";
const position = "Overseer";

function App() {
    return (
        <>
            <header
                className={"w-full h-fit bg-blue-600 flex items-center justify-between pr-2 shadow-black shadow-sm"}>
                <SessionInfo image={image} name={name} position={position}/>
            </header>
            <AppNav/>
            <Outlet/>
        </>
    )
}

export default App;