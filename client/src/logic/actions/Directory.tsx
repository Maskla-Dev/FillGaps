import { RESTAPIProvider } from "../services/HTTPServices.ts";

export async function getEmployees( work_area: string, access_key: string ) {
    try {
        let response = await RESTAPIProvider.get( `common/directory/${work_area}`, {
            headers: {
                Authorization: `Bearer ${access_key}`
            }
        } );
        return response.data;
    } catch ( error: any ) {
        switch ( error.response.status ) {
            case 401:
                throw "Unauthorized";
            case 403:
                throw "Forbidden";
            case 404:
                throw "Work area not found";
            case 500:
                throw "Internal Server Error";
            default:
                throw "Error getting employees";
        }
    }
}