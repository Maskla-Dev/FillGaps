import Time from "./Time.tsx";
import CardActions from "./CardActions.tsx";

export interface MessageCardProps {
    sender?: string;
    message: string;
    time: Date;
    my_message: boolean;
}

function MessageCard( {
                          sender,
                          message,
                          time,
                          my_message = false
                      }: MessageCardProps ) {
    return (
        <div className={`flex flex-col w-full my-2 px-0.5`}>
            <div
                className={`w-7/12 bg-white pt-3 pb-2.5 px-2.5 border-2 border-teal-200 ${my_message ? "rounded-l-3xl rounded-tr-3xl self-end" : "rounded-tl-3xl rounded-r-3xl self-start"}`}>
                <div className={"flex flex-row items-center justify-end"}>
                    {sender ? <p className={"font-semibold"}>{sender}</p> : null}
                    <CardActions/>
                </div>
                <p className={"ml-3"}>
                    {message}
                </p>
                <Time time={time}/>
            </div>
        </div>
    );
}

export default MessageCard;