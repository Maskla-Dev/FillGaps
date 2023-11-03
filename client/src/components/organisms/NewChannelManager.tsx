import { useLiveQuery } from "dexie-react-hooks";
import { ChatChannel, Employee } from "../../utils/services/chat/Models.ts";
import EmployeeCard from "../molecules/EmployeeCard.tsx";
import React, { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { send } from "vite";
import { CreateChannelRequest } from "../../utils/services/chat/ChatIO.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";

export interface SelectableEmployee extends Employee {
    is_selected: boolean;
}

function NewChannelManager() {
    const id = useSelector( ( state: RootState ) => state.session_state.session?.user_id )
    const [is_online, db, log, send] = useContext( ChatContext );
    const [employees, setEmployees] = useState<SelectableEmployee[]>( [] );
    const [channel_name, setChannelName] = useState<string>( "" );
    const [channel_description, setChannelDescription] = useState<string>( "" );

    const query = useLiveQuery( async () => {
        let _employees = await db.employees.toArray();
        return _employees.map( ( employee: Employee ) => {
            return ( { ...employee, is_selected: false } );
        } );
    }, [db, log] );

    useEffect( () => {
        setEmployees( query )
    }, [query] );


    const employee_cards = useMemo( () => {
        let cards: ReactNode[] = [];
        if ( employees ) {
            employees.forEach( ( employee: SelectableEmployee ) => {
                if ( employee ) {
                    cards.push( <EmployeeCard key={employee.name} {...employee} onClick={handleEmployeeSelection}/> );
                }
            } );
        }
        return cards;
    }, [employees] );

    function handleEmployeeSelection( event: MouseEvent ) {
        if ( employees ) {
            let employee = employees.find( ( employee: SelectableEmployee ) => employee.name === event.currentTarget.id );
            console.log( event.target.id, employee );
            if ( employee ) {
                employee.is_selected = !employee.is_selected;
                setEmployees( [...employees] );
            }
        }
    }

    function submit( event: React.MouseEvent<HTMLButtonElement> ) {
        event.preventDefault();
        let selected_employees = employees.filter( ( employee: SelectableEmployee ) => employee.is_selected );
        let request: CreateChannelRequest = {
            type: "CREATE_CHANNEL",
            employee_id: id,
            channel: {
                channel_name: channel_name,
                description: channel_description,
                channel_type: "GROUP",
            } as ChatChannel,
            employees: selected_employees.map( ( employee: SelectableEmployee ) => ( employee.employee_id ) )
        }
        console.log( request );
        send( JSON.stringify( request ) )
        setChannelDescription( "" )
        setChannelName( "" );
    }

    return (
        <div className={"w-full h-full overflow-y-scroll px-5"}>
            <h1 className={""}>New Channel in group</h1>
            <div className={"flex flex-col w-full h-fit flex-grow"}>
                <label className={"flex"} htmlFor="channel_name">
                    <p>Channel Name</p>
                    <input id={"channel_name"} value={channel_name} onChange={e => setChannelName( e.target.value )}/>
                </label>
                <label className={"flex items-start"} htmlFor={"chat_description"}>
                    <p>Description</p>
                    <textarea className={""} value={channel_description}
                              onChange={event => setChannelDescription( event.target.value )}/>
                </label>
                <button className={"text-white bg-emerald-500 rounded-2xl mt-2"} type={"submit"}
                        onClick={submit}>Create
                </button>
                <div className={"w-full h-fit px-0.5 overflow-y-scroll"}>
                    {employee_cards}
                </div>
            </div>
        </div>
    );
}

export default NewChannelManager;