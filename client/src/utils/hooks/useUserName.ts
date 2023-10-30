import { useState, useEffect } from 'react';

const useUserName = () => {
    const [userName, setUserFullName] = useState<[string, string]>( ['', ''] );
    useEffect( () => {
        const firstName = localStorage.getItem( 'first_name' );
        const lastName = localStorage.getItem( 'last_name' );
        if ( firstName && lastName ) {
            setUserFullName( [firstName, lastName] );
        }
    }, [] );
    return userName;
};

export default useUserName;