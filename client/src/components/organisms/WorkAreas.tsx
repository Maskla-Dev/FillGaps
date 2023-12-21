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
        <div className={"w-full h-full overflow-y-auto flex flex-col md:flex-row md:flex-wrap md:justify-between md:px-3"}>
            {cards}
        </div>
    );
}

export default WorkAreas;