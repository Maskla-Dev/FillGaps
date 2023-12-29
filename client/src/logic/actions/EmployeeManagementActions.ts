import { RESTAPIProvider } from "../services/HTTPServices";
import { EmployeeData, EmployeeStatus } from "../models/EmployeesManagementModels.ts";

//import { EmployeeReinstate, EmployeeStatus } from "../models/EmployeesManagementModels.ts";

export async function getEmployeesList( work_area: string, key: string ) {
    console.log( key );
    try {
        const response = await RESTAPIProvider.get( `common/hr/employees/${work_area}`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        } );
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
    return { key, data };
}

export async function getEmployeeBrief( key: string, employee_id: number ) {
    return { employee_id, key };
}

export async function reinstateEmployee( key: string, employee_id: number ) {
    return { employee_id, key };
}

export async function updateEmployeeStatus( key: string, data: EmployeeStatus ) {
    return { data, key };
}

