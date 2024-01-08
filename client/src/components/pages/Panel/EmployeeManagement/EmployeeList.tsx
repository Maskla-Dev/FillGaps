import { useEffect, useMemo, useState } from "react";
import { AppContext, EmployeeManagementContext } from "../../../../logic/ActorContexts.ts";
import {
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import SelectInput from "../../../molecules/SelectInput.tsx";
import ToggleButton from "../../../atoms/ToggleButton.tsx";
import InputDate from "../../../organisms/InputDate.tsx";
import { EmployeeState, EmployeeStates } from "../../../../logic/models/EmployeeBriefModels.ts";

const EmployeeList = () => {
    const { employees, work_area } = EmployeeManagementContext.useSelector( state => {
        return {
            employees: state.context.employee_list,
            work_area: state.context.work_area
        }
    } );
    const actor = EmployeeManagementContext.useActorRef();
    const [upperSort, setUpperSort] = useState( false );
    const [matchFilter, setMatchFilter] = useState( "" );
    const [dateFilter, setDateFilter] = useState<Date | null>( null );
    const [stateFilter, setStateFilter] = useState<null | EmployeeState>( null );
    const employees_cards = useMemo( () => {
        return employees.map( ( employee, index ) => {
            return (
                <div
                    className={"flex flex-row items-center justify-between w-full h-12 px-2.5 py-1.5 bg-zinc-800 rounded-lg"}
                    key={`EmployeeCard${index}`}
                    onClick={() => {
                        console.log( "Want get Employee Brief", employee )
                        actor.send( {
                            type: "Go To Employee Brief",
                            employee_id: employee.employee_id
                        } )
                    }}>
                    <div className={"flex flex-row items-center"}>
                        <img src={employee.photo} alt={"Employee Photo"}
                             className={"w-8 h-8 rounded-full mr-2.5"}/>
                        <span className={"text-white text-sm font-bold"}>{employee.name}</span>
                    </div>
                    <div className={"flex flex-row items-center"}>
                        <span className={"text-white text-sm font-bold"}>{employee.date}</span>
                        <span className={"text-white text-sm font-bold ml-2"}>{employee.state}</span>
                    </div>
                </div>
            );
        } );
    }, [upperSort, matchFilter, dateFilter, stateFilter] );

    useEffect( () => {
        console.log( "Employee List", employees, work_area );
    }, [] );

    if ( employees.length === 0 ) {
        return (
            <>
                <div>Choose a work area</div>
            </>
        )
    } else {
        return (
            <div>
                <div className={"flex flex-row items-center w-full justify-evenly"}>
                    <InputDate/>
                    <SelectInput options={EmployeeStates} placeholder={"State"} value={stateFilter}
                                 onChange={( option: string | null ) => setStateFilter( option )}/>
                    <div className={"flex flex-row items-center justify-evenly"}>
                        <ToggleButton first={<BarsArrowDownIcon className={"w-6 h-6 text-white mx-2 cursor-pointer"}/>}
                                      second={<BarsArrowUpIcon className={"w-6 h-6 text-white mx-2 cursor-pointer"}/>}/>
                        <MagnifyingGlassIcon className={"w-6 h-6 text-white mx-2 cursor-pointer"}/>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    {employees_cards}
                </div>
            </div>
        )
    }
}

export default EmployeeList;