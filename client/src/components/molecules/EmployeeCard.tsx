import { Employee } from "../../utils/services/chat/Models.ts";

function EmployeeCard( {
                           is_selected,
                           department,
                           photo_link,
                           name,
                           role,
                           onClick
                       }: Employee & { is_selected?: boolean, onClick: MouseEvent } ) {
    return (
        <div
            onClick={onClick}
            id={name}
            className={"flex flex-row w-full h-fit items-center my-3 overflow-y-scroll rounded-xl bg-amber-500 px-2 py-3"}>
            {is_selected != undefined ? <input type="checkbox" checked={is_selected}/> : <></>}
            <img className={"w-12 h-12 rounded-full object-cover object-center ml-3"} src={photo_link} alt={name}/>
            <div className={"ml-3 w-full h-fit"}>
                <p className={"text-base text-white"}>{name}</p>
                <p className={"text-sm font-bold italic text-white line-clamp-1"}>{department} <span
                    className={"font-normal not-italic"}>-</span> {role}</p>
            </div>
        </div>
    )
}

export default EmployeeCard;