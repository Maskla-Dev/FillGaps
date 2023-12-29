import { AppContext } from "../../logic/ActorContexts.ts";

const ProfilePhoto = ( { is_small }: { is_small?: boolean } ) => {
    const { image, is_online } = AppContext.useSelector( state => {
        let image = state.context.user_data.photo;
        let is_online = state.context.data.chat.is_online;
        return { image, is_online };
    } );

    return (
        <div className={`${is_online != undefined ? ( is_online ? "border-green-600 " : "border-rose-600" ) : ""}`}>
            <img src={image} alt={"Employee avatar"}
                 className={`${is_small ? "w-12 h-12" : "w-20 h-20"} rounded-full object-cover object-center`}/>
        </div>
    );
};

export default ProfilePhoto;