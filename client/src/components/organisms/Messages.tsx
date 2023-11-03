import MessageCard, { MessageCardProps } from "../molecules/MessageCard.tsx";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ChatContext } from "../../utils/hooks/ChatProvider.tsx";
import { ChatMessage, Employee } from "../../utils/services/chat/Models.ts";

function Messages( { channel_name }: { channel_name: string } ) {
    const [is_online, db, log] = useContext( ChatContext );
    const [messages, setMessages] = useState<ChatMessage[]>( [] );
    const [directory, setDirectory] = useState<Employee[]>( [] );

    const query = useLiveQuery( async () => {
        let messages = await db.messages.where( 'channel' ).equals( channel_name ).toArray();
        let directory = await db.employees.toArray();
        return { directory, messages };
    }, [db, log] );

    useEffect( () => {
        if ( query ) {
            setMessages( query.messages );
            setDirectory( query.directory );
        }
    }, [query] );

    useEffect( () => {
        ref.current?.scrollIntoView( {
            behavior: "smooth",
            block: "end",
        } );
    }, [messages] );

    const ref = useRef<HTMLDivElement>( null );

    const message_containers = useMemo( () => {
        return messages.map( ( message, index ) => {
            let employee = directory.find( employee => employee.employee_id == message.sender );
            console.log( message )
            return <MessageCard key={index} {...message} {...employee}/>
        } );
    }, [messages, directory] );

    return (
        <div className={"max-h-full grow my-2 overflow-y-scroll"}>
            {message_containers}
            <div ref={ref}></div>
        </div>
    )
}

export default Messages;