// import { EmployeeRoles } from "../../utils/services/chat/Models.ts";
import AdministrativePanel from "./AdministrativePanel.tsx";
import NoActivitiesPanel from "./NoActivitiesPanel.tsx";
import { FeaturesContext } from "../../logic/ActorContexts.ts";
import { useEffect } from "react";

const EmployeeFeatures = () => {
    const context = FeaturesContext.useSelector( state => state.context );

    useEffect( () => {
        console.log( context )
    }, [] );

    switch ( context.role ) {
        case 'Administrative Manager':
        case 'Administrative':
            return <AdministrativePanel/>
        case 'IT Manager':
        case 'IT Technical':
        case 'Caretakers Manager':
        case 'Caretaker':
        case 'Operations Manager':
        case 'Cleaning':
        case 'Maintenance':
        case 'Salesman':
        case 'Ticket Taker':
        case 'Collection, Research & Education Manager':
        case 'Educator':
        case 'Tour Guide':
        case 'Researcher':
        case 'Preservation Manager':
        case 'Restorer':
        case 'Curator':
        default:
            return <NoActivitiesPanel/>;
    }
}

export default EmployeeFeatures;