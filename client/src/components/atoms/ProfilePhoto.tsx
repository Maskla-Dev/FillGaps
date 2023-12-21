const ProfilePhoto = ( { image, is_online, is_small }: { image: string, is_online?: boolean, is_small?: boolean } ) => {
    return (
        <div className={`${is_online != undefined ? ( is_online ? "border-green-600 " : "border-rose-600" ) : ""}`}>
            <img src={image} alt={"Employee avatar"}
                 className={`${is_small ? "w-12 h-12" : "w-20 h-20"} rounded-full object-cover object-center`}/>
        </div>
    );
};

export default ProfilePhoto;