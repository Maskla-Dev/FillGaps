import NavLink from "../atoms/NavLink.tsx";
import WorkAreas from "../organisms/WorkAreas.tsx";
import { EmployeesManagementContext } from "../../logic/ActorContexts.ts";
import { useEffect } from "react";

const EmployeesManagement = () => {
    const state = EmployeesManagementContext.useSelector( state => state );
    useEffect( () => {
        console.log( state.value );
    }, [] );

    return (
        <div className={"flex flex-col w-full h-full rounded-lg bg-zinc-600 bg-opacity-40 overflow-hidden"}>
            <nav className={"w-full h-fit py-2 px-2 bg-violet-900 text-white"}>
                <ul className={"flex flex-row w-full overflow-x-auto"}>
                    <NavLink title={"Panel"}/>
                    <NavLink title={"Employees"}/>
                </ul>
            </nav>
            <h1 className={"text-white font-bold text-center leading-10 my-2"}>Work Areas</h1>
            <WorkAreas/>
        </div>
    )
}

export default EmployeesManagement;