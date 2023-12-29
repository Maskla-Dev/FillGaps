import { useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../../logic/ActorContexts.ts";
import {
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import SelectInput from "../../../molecules/SelectInput.tsx";
import { EmployeeState, EmployeeStates } from "../../../../logic/models/EmployeesManagementModels.ts";
import ToggleButton from "../../../atoms/ToggleButton.tsx";
import DatePick from "../../../organisms/DatePick.tsx";

const EmployeeList = () => {
    const employees = AppContext.useSelector( state => state.context.data.panel.employee_list );
    const actor = AppContext.useActorRef();
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
                            type: "",
                            employee: employee.employee_id
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
        console.log( "Employee List", employees );
    }, [] );

    return (
        <div>
            <h1 className={"text-white font-bold text-center leading-10 my-2"}>Employee List</h1>
            <div className={"flex flex-row items-center w-full justify-evenly"}>
                <DatePick/>
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

export default EmployeeList;