import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function NewChannelButton() {
    const navigate = useNavigate();

    return (
        <button className={"sticky left-3.5 bottom-2.5 w-12 h-12 bg-cyan-400/60 p-2 rounded-full"}
                onClick={() => navigate("new")}>
            <ChatBubbleLeftEllipsisIcon className={"fill-lime-500"}/>
        </button>
    )
}

export default NewChannelButton;