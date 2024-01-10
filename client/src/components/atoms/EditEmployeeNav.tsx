interface EditEmployeeNavProps {
    onClick: () => void;
    disabled: boolean;
    text: string;
}

const EditEmployeeNav = ( props: EditEmployeeNavProps ) => {
    return (
        <button
            onClick={props.onClick}
            className={"w-full px-3 py-3 capitalize bg-blue-50 text-blue-700 disabled:bg-emerald-900 border-b-4 disabled:text-green-100 disabled:font-semibold disabled:border-emerald-400 hover:bg-blue-200 hover:text-blue-500 hover:border-blue-400"}
            disabled={props.disabled}>
            {props.text}
        </button>
    );
}

export default EditEmployeeNav;