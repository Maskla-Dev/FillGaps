import { useEffect } from "react";
import NoActivitiesPanel from "./NoActivitiesPanel.tsx";
import { AppContext } from "../../../logic/ActorContexts.ts";
import AdministrativeRouter from "./EmployeeManagement/AdministrativeRouter.tsx";

const PanelRouter = () => {
    const { role, state } = AppContext.useSelector( state => {
        let value;
        if ( typeof ( state.value ) == "object" ) {
            value = state.value["FillGaps App"];
        } else
            value = "";
        return {
            role: state.context.user_data.role,
            state: value
        }
    } );

    useEffect( () => {
        console.log( "Role", role );
        console.log( "Panel Router", state )
    }, [] );

    switch ( role ) {
        case 'Administrative Manager':
        case 'Administrative':
            return <AdministrativeRouter/>
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

export default PanelRouter;