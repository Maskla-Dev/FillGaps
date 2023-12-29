import PanelRouter from "./Panel/PanelRouter.tsx";
import ChatRouter from "./Chat/ChatRouter.tsx";

interface FillGapsRouterProps {
    isPanel: boolean;
}

const FillGapsRouter = ( { isPanel }: FillGapsRouterProps ) => {
    return (
        <>
            {isPanel ?
                <PanelRouter/> :
                <ChatRouter/>}
        </>
    )
}

export default FillGapsRouter;