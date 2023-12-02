import Time from "./Time.tsx";
import {useMemo} from 'react';
import CardActions from "./CardActions.tsx";
import { RootState } from "../../utils/appstate/store.ts";
import { useSelector } from "react-redux";
import { ChatMessage, Employee, ChannelType } from "../../utils/services/chat/Models.ts";

export interface MessageCardProps {
    sender?: number;
    message: string;
    time: number;
    my_message: boolean;
    type: ChannelType;
}

function MessageCard( {
                          employee_id,
                          name,
                          sender,
                          date,
                          content,
                          type
                      }: ChatMessage & Employee ) {
    const session_id = useSelector( ( state: RootState ) => state.session_state.session?.user_id );
    let border_color = useMemo(()=>{
        switch(type){
            case 'PUBLIC':
                return 'border-sky-300';
            case 'PRIVATE':
                return 'border-teal-300';
            case 'GROUP':
                return 'border-cyan-300';
            default:
                return ''
        }
    }, [type]);

    console.log( date, type )

    return (
        <div className={`flex flex-col w-full my-2 px-0.5`}>
            <div
                className={`w-7/12 bg-white pt-3 pb-2.5 px-2.5 border-2 ${border_color} ${employee_id === session_id ? "rounded-l-3xl rounded-tr-3xl self-end" : "rounded-tl-3xl rounded-r-3xl self-start"}`}>
                <div className={"flex flex-row items-center justify-end"}>
                    {sender ?
                        <p className={"font-semibold"}>{name}</p> : null}
                    <CardActions/>
                </div>
                <p className={"ml-3"}>
                    {content}
                </p>
                <Time time={date}/>
            </div>
        </div>
    );
}

export default MessageCard;