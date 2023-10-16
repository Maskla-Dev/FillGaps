import axios from "axios";

/**
 * Tokens type. [access, refresh] tuple.
 */
export type Tokens = [string | null, string | null];

/**
 * Save the tokens in local storage.
 * @param access
 * @param refresh
 */
export function saveTokens( [access, refresh]: Tokens ): boolean {
    if ( access && refresh ) {
        localStorage.setItem( "token-access", access );
        localStorage.setItem( "token-refresh", refresh );
        return true;
    }
    return false;
}

/**
 * Remove the tokens from local storage.
 */
export function removeTokens() {
    localStorage.removeItem( "token-access" );
    localStorage.removeItem( "token-refresh" );
}

/**
 * Get the tokens from local storage.
 * @returns Tokens - [access, refresh] if the tokens are found.
 * @returns [null, null] if the tokens are not found.
 */
export function getTokens(): Tokens {
    const tokenAccess = localStorage.getItem( 'token-access' );
    const tokenRefresh = localStorage.getItem( 'token-refresh' );
    return [tokenAccess, tokenRefresh];
}

/**
 * Get new tokens from the server using the username and password
 * @param username
 * @param password
 */
export async function getNewTokens( username: string, password: string ): Promise<Tokens> {
    let res = await axios.post( [import.meta.env.VITE_SERVER_URL, import.meta.env.VITE_TOKEN_PATH].join( "/" ), {
        username: username,
        password: password
    } );
    const status = res.status;
    if ( status == 200 ) {
        const { access, refresh } = res.data;
        console.log( res );
        return [access, refresh];
    }
    return [null, null];
}

/**
 * Check if the token is still alive.
 * @param access_token
 * @returns boolean - true if the token is still alive, false otherwise.
 */
export async function tokenStillAlive( access_token: string ): Promise<boolean> {
    let res = await axios.post( [import.meta.env.VITE_SERVER_URL, import.meta.env.VITE_TOKEN_VERIFY_PATH].join( "/" ), {
        token: access_token
    } );
    console.log( res );
    let status = res.status;
    if ( status == 200 ) {
        return true;
    }
    let { code, detail } = res.data;
    console.error( code, detail, status );
    return false;
}

/**
 * Refresh the token.
 * @param refresh_token
 * @returns boolean - true if the token is refreshed, false otherwise.
 */
//@TODO Auto refresh the token.
export async function refreshToken( refresh_token: string ): Promise<boolean> {
    let res = await axios.post( [import.meta.env.VITE_SERVER_URL, import.meta.env.VITE_TOKEN_REFRESH_PATH].join( "/" ), {
        token: refresh_token
    } );
    if ( res.status == 200 ) {
        const { access } = res.data;
        if ( access ) {
            localStorage.setItem( "token-access", access );
            return true;
        }
    }
    return false;
}