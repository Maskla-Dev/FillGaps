import AppNav from "../molecules/AppNav.tsx";
import SessionCard from "../organisms/SessionCard.tsx";
import { AppContext, FeaturesContext } from "../../logic/ActorContexts.ts";
import AppRouter from "./AppRouter.tsx";

function App() {
    const session = AppContext.useSelector( state => state.context.user_data );

    return (
        <>
            <FeaturesContext.Provider options={{
                input: {
                    role: session.role,
                    access_token: session.tokens.access,
                }
            }}>
                <div className={"w-full h-full flex flex-col"}>
                    <AppNav image={session.photo} name={session.name} position={session.role}/>
                    <SessionCard image={session.photo} name={session.name} position={session.role}/>
                    <div className={"p-2 h-full"}>
                        <AppRouter/>
                    </div>
                </div>
            </FeaturesContext.Provider>
        </>
    );
}

export default App;