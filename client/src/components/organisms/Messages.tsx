import MessageCard, { MessageCardProps } from "../molecules/MessageCard.tsx";

function Messages() {
    const messages: MessageCardProps[] = [
        {
            sender: "Me",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: new Date(),
            my_message: true
        },
        {
            sender: "You",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: new Date(),
            my_message: false
        },
        {
            sender: "Me",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: new Date(),
            my_message: true
        },
        {
            sender: "Me",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: new Date(),
            my_message: true
        },
    ]

    return (
        <div className={"max-h-full grow my-2 overflow-y-scroll"}>
            {
                messages.map( ( message, index ) => (
                    <MessageCard key={index} {...message}/>
                ) )
            }
        </div>
    )
}

export default Messages;