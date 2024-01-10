import { WorkAreasList } from "../../logic/models/EmployeesManagementModels.ts";
import { useMemo } from "react";
import WorkAreaCard from "./WorkAreaCard.tsx";
import { EmployeeManagementContext } from "../../logic/ActorContexts.ts";

const WorkAreas = () => {
    const current_work_area = EmployeeManagementContext.useSelector( state => state.context.work_area );
    const cards = useMemo( () => {
        return WorkAreasList.map( ( workArea, index ) => {
            return (
                <WorkAreaCard {...workArea} key={`WorkAreaCard${index}`}
                              is_current={current_work_area == workArea.name}/>
            );
        } );
    }, [current_work_area] );

    return (
        <>
            {cards}
        </>
    );
}

export default WorkAreas;