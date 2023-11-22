import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface NavElementProps {
    Icon: FC<any>;
    text?: string;
    path: string;
    base?: string;
}

const NavElement = ( { text, Icon, path, base }: NavElementProps ) => {
    return (
        <NavLink
            to={path}
            className={( { isTransitioning, isPending, isActive } ) => {
                let className = [base];
                if ( isTransitioning ) {
                    className.push( "animate-pulse" );
                } else if ( isPending ) {
                    className.push( "animate-pulse" );
                } else if ( isActive ) {
                    className.push( "text-white" );
                } else {
                    className.push( "text-gray-400" );
                }
                return className.join( " " );
            }}>
            <Icon className={"w-8 h-8"}/>
            {text}
        </NavLink>
    )
}

export default NavElement;