import { WorkAreasList } from "../../logic/models/EmployeesManagementModels.ts";
import { useMemo } from "react";
import WorkAreaCard from "./WorkAreaCard.tsx";

const WorkAreas = () => {
    const cards = useMemo( () => {
        return WorkAreasList.map( ( workArea, index ) => {
            return (
                <WorkAreaCard {...workArea} key={`WorkAreaCard${index}`}/>
            );
        } );
    }, [] );

    return (
        <>
            <h1 className={"text-white font-bold text-center leading-10 my-2"}>Work Areas</h1>
            <div
                className={"w-full h-full overflow-y-auto flex flex-col md:flex-row md:flex-wrap md:justify-between md:px-3"}>
                {cards}
            </div>
        </>
    );
}

export default WorkAreas;