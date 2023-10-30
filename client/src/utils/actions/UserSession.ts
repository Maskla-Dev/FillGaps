import { AxiosInstance } from "axios";

const provider_config = {
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withCredentials: true
}

export const doLogout = async ( service_provider: AxiosInstance ) => {
    let result = await service_provider.post(
        "api/logout/",
        { withCredentials: true } );
    if ( result.status === 200 ) {
        localStorage.removeItem( "first_name" );
        localStorage.removeItem( "last_name" );
        return true;
    }
    return false;
}

export const doLogin = async ( service_provider: AxiosInstance, username: string, password: string ) => {
    let response = await service_provider.post( "api/login/", {
        username: username,
        password: password
    }, provider_config );
    if ( response.status === 200 ) {
        let { first_name, last_name } = response.data;
        return { first_name, last_name };
    }
    return false;
}