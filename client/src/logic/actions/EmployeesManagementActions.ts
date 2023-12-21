import RESTAPIProvider from "../services/HTTPServices";
import { EmployeeReinstate, EmployeeStatus } from "../models/EmployeesManagementModels.ts";

async function getEmployeesList( work_area: string ) {
    try {
        const response = await RESTAPIProvider.get( `/employees/${work_area}` );
    }
}

async function getEmployeeBrief( employee_id: number ) {
    try {
        const response = await RESTAPIProvider.get( `/employee/brief/${employee_id}` );
    }
}

async function reinstateEmployee( data: EmployeeReinstate ) {
    try {
        const response = await RESTAPIProvider.put( `/employee/reinstate/${employee_id}` );
    }
}

async function updateEmployeeStatus( data: EmployeeStatus ) {
    try {
        const response = await RESTAPIProvider.put( `/employee/status/${employee_id}` );
    }
}

