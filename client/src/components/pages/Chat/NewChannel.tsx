import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { ChatContext } from "../../../utils/hooks/ChatProvider.tsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import EmployeeCard from "../../molecules/EmployeeCard.tsx";
import { Employee } from "../../../utils/services/chat/Models.ts";

function NewChannel() {
    const navigator = useNavigate();
    const session = useSelector( ( state: RootState ) => state.session_state.session );
    const [chat_state, db, send] = useContext( ChatContext );
    const [confirmation, setConfirm] = useState<boolean>( false );
    const directory = useLiveQuery( async () => {
        return await db.employees.toArray();
    }, [chat_state.logs.directory_log] );

    const employeeSelection = useCallback( ( e: MouseEvent ) => {
        const employee = directory?.find( ( employee: Employee ) => employee.name == e.currentTarget?.id );
        if ( employee ) {
            setConfirm( confirm!( "Are you sure you want to start a conversation with " + employee.name + " to the group?" ) );
        }
    }, [] );

    useEffect( () => {
        if ( confirmation ) {
            send({
                
            });
            navigator( "/chat" );
        }
    }, [confirmation] );

    const employees = useMemo( () => {
        if ( directory ) {
            return directory.map( ( employee: Employee ) => {
                return <EmployeeCard {...employee} key={employee.employee_id} onClick={employeeSelection}/>;
            } );
        }
        return [];
    }, [directory] );

    if ( session ) {
        return (
            <>
                <div>
                    {
                        session.role.endsWith( "Manager" ) ?
                            (
                                <NavLink
                                    className={"flex w-full items-center px-2 py-2.5 justify-center uppercase font-bold text-sm text-cyan-800 hover:text-cyan-100 bg-emerald-400"}
                                    to={"group"}>
                                    New Group
                                </NavLink>
                            ) :
                            ( <></> )
                    }
                    <div>
                        {employees}
                    </div>
                </div>
            </>
        )
    }

    return ( <> </> )
}

export default NewChannel;