import ProfilePhoto from "../atoms/ProfilePhoto.tsx";
import BolderText from "../atoms/BolderText.tsx";
import BoldText from "../atoms/BoldText.tsx";
import { AppContext } from "../../logic/ActorContexts.ts";

export interface SessionInfoProps {
    image: string;
    name: string;
    position: string;
}

function ProfileInfo() {
    const { name, role } = AppContext.useSelector( state => state.context.user_data );

    return (
        <div className={"flex flex-row items-center select-none px-4"}>
            <ProfilePhoto/>
            <div className={"flex flex-col ml-5"}>
                <BolderText text={name != " " ? name : "No employee name"}/>
                <BoldText text={role ? role : "No employee position"}/>
            </div>
        </div>
    );
}

export default ProfileInfo;