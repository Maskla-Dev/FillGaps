import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/appstate/store.ts";

const ProfilePhoto = ( { is_small }: { is_small?: boolean } ) => {
    const session = useSelector( ( state: RootState ) => state.session_state.session );

    return (
        <div>
            <img src={session.photo} alt={"Employee avatar"}
                 className={`${is_small ? "w-16 h-16" : "w-20 h-20"} rounded-full object-cover object-center`}/>
        </div>
    );
};

export default ProfilePhoto;