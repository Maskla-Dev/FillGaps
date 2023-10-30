export interface SessionInfo {
    image: string;
    name: string;
    position: string;
}

function SessionInfo( {
                             image,
                             name,
                             position
                         }: SessionInfo ) {
    return (
        <div className={"flex p-2 items-center min-w-fit min-h-fit select-none"}>
            <div className={`min-w-14 min-h-14 mr-3`}>
                <img src={image} alt={"Employee avatar"} className={"w-12 h-12 rounded-full object-cover object-center"}/>
            </div>
            <div className={"flex flex-col"}>
                <span className={"text-base text-white"}>{name}</span>
                <span className={"text-sm font-bold italic text-white"}>{position}</span>
            </div>
        </div>
    );
}

export default SessionInfo;