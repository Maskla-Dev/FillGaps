import ProfilePhoto from "../atoms/ProfilePhoto.tsx";
import BolderText from "../atoms/BolderText.tsx";
import BoldText from "../atoms/BoldText.tsx";

export interface SessionInfoProps {
    image: string;
    name: string;
    position: string;
}

function ProfileInfo( {
                          image,
                          name,
                          position
                      }: SessionInfoProps ) {
    return (
        <div className={"flex flex-col px-2 py-4 items-center min-w-fit min-h-fit select-none"}>
            <ProfilePhoto image={image}/>
            <div className={"flex flex-col text-center mt-3"}>
                <BolderText text={name != " " ? name : "No employee name"}/>
                <BoldText text={position ? position : "No employee position"}/>
            </div>
        </div>
    );
}

export default ProfileInfo;