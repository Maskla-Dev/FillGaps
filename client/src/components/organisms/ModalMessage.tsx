function MessageModal( props: { onCancel: () => void, onConfirm: () => void, message: string } ) {
    return (
        <div
            className={"bg-black bg-opacity-50 absolute w-full h-full flex items-center justify-center px-5"}>
            <div className={"w-full h-fit bg-white rounded-3xl flex flex-col justify-center items-center py-4 px-3"}>
                <span className={"text-2xl text-red-600 font-extrabold"}>{props.message}</span>
                <button className={"bg-red-600 text-white rounded-2xl p-2 w-1/3"} onClick={props.onConfirm}>Keep Working
                </button>
                <button className={"bg-red-600 text-white rounded-2xl p-2 w-1/3"} onClick={props.onCancel}>Confirm
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default MessageModal;