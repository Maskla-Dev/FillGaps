import { useEffect, useMemo } from "react";
import { EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import {
    CursorArrowRaysIcon,
} from "@heroicons/react/24/solid";

const EmployeeList = () => {
    const { employees, work_area } = EmployeeManagementContext.useSelector( state => {
        return {
            employees: state.context.employee_list,
            work_area: state.context.work_area
        }
    } );
    const actor = EmployeeManagementContext.useActorRef();
    const employees_cards = useMemo( () => {
        return employees.map( ( employee, index ) => {
            return (
                <div
                    className={"flex flex-col items-center justify-between px-2.5 m-2 py-2 bg-emerald-50 hover:bg-emerald-400 rounded cursor-pointer"}
                    key={`EmployeeCard${index}`}
                    onClick={() => {
                        console.log( "Want get Employee Brief", employee )
                        actor.send( {
                            type: "Go To Employee Brief",
                            employee_id: employee.employee_id
                        } )
                    }}>
                    <img
                        src={`${!employee.photo ? "https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg" : `http://127.0.0.1:8000${employee.photo}`}`}
                        alt={"Employee Photo"}
                        className={"w-12 h-12 rounded-full"}/>
                    <span className={"text-center text-green-900 text-sm font-bold"}>{employee.name}</span>
                    <span className={"text-center text-green-900 text-sm font-bold"}>{employee.role}</span>
                </div>
            );
        } );
    }, [] );

    useEffect( () => {
        console.log( "Employee List", employees, work_area );
    }, [] );

    if ( employees.length === 0 ) {
        return (
            <>
                <div className={"w-full h-full flex flex-col items-center justify-center"}>
                    <h1 className={"text-center text-4xl overflow-y-auto font-extrabold uppercase text-zinc-900/60"}>Choose
                        work
                        area</h1>
                    <CursorArrowRaysIcon className={"w-3/4 text-zinc-900/30"}/>
                </div>
            </>
        )
    } else {
        return (
            <div className={"w-full h-full overflow-y-auto grid auto-rows-min grid-cols-4"}>
                {employees_cards}
            </div>
        )
    }
}

export default EmployeeList;