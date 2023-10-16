import { useEffect } from "react";
import { useTokenValidator } from "../utils/hooks/useTokenValidator.ts";

function App() {
    const [access_token, refresh_token] = useTokenValidator();

    useEffect( () => {
        console.log( access_token, refresh_token );
    }, [] );
    return (
        <>
            <h1>Home</h1>
        </>
    )
}

export default App
