interface NavLinkProps {
    title: string;
}

const NavLink = ( { title }: NavLinkProps ) => {
    return (
        <li className={"mr-2 hover:underline hover:cursor-pointer hover:text-emerald-500"}>
            {title}
        </li>
    )
}

export default NavLink;