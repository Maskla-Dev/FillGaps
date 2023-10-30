import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function AppNav() {
    const location = useLocation();
    const [is_panel, setIsPanel] = useState( !location.pathname.startsWith( "/chat" ) );


    return (
        <nav className={"flex justify-center w-full px-5 my-2"}>
            <Link to={""}
                  onClick={() => setIsPanel( true )}
                  className={`basis-2/4 rounded-l-full border-l-2 border-t-2 border-b-2  block px-3 py-2 text-center ${!is_panel ? "border-blue-300 text-blue-300" : "bg-blue-600 text-blue-50 border-blue-600"}`}>Panel</Link>
            <Link to={"/chat"}
                  onClick={() => setIsPanel( false )}
                  className={`basis-2/4 rounded-r-full border-r-2 border-t-2 border-b-2  block px-3 py-2 text-center ${is_panel ? "border-blue-300 text-blue-300" : "bg-blue-600 text-blue-50 border-blue-600"}`}>Chat</Link>
        </nav>
    );
}

export default AppNav;