import { RESTAPIProvider } from "../services/HTTPServices";
import { Employee } from "../models/EmployeesManagementModels.ts";
import { EmployeeData } from "../models/EditEmployeeMachineModels";
import {
    DisabilityLeave,
    EmployeeDismissal,
    EmployeeResignation,
    ParentalLeave,
    TemporalLeave
} from "../models/EmployeeBriefModels";

//import { EmployeeReinstate, EmployeeStatus } from "../models/EmployeesManagementModels.ts";

export async function getEmployeesList( work_area: string, key: string ) {
    console.log( key );
    try {
        const response = await RESTAPIProvider.get( `common/hr/employees/${work_area}`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        } );
        console.log( response.data )
        return response.data;
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 404:
                console.log( "Employees from work station not found" );
                throw "Employees from work station not found";
            case 500:
                console.log( "Internal server error" );
                throw "Internal server error, please try again later or contact the administrator";
            default:
                console.log( "Unknown error" );
                throw "Unknown error";
        }
    }
}

export async function getEmployeeData( key: string, employee_id: number ) {
    return { employee_id, key };
}

export async function saveEmployeeData( key: string, data: EmployeeData ) {
    // throw "Not implemented yet";
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            console.log( data );
            resolve( { key, data } );
        }, 1200 );
    } );
}

export async function getEmployeeBrief( key: string, employee_id: number ) {
    try {
        const response = await RESTAPIProvider.get( `common/hr/employee_brief/${employee_id}`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        } );
        console.log( response.data )
        return response.data;
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 404:
                console.log( "Employee not found" );
                throw "Employee not found";
            case 500:
                console.log( "Internal server error" );
                throw "Internal server error, please try again later or contact the administrator";
            default:
                console.log( "Unknown error" );
                throw "Unknown error";
        }
    }
}

export async function reinstateEmployee( key: string, employee_id: number ) {
    return { employee_id, key };
}

export async function updateEmployeeStatus( key: string, employee_data: Employee, additional_required: EmployeeResignation | EmployeeDismissal | TemporalLeave | ParentalLeave | DisabilityLeave ) {
    return { employee_data, key, aditional_required: additional_required };
}

