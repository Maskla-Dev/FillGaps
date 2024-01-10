interface ConfirmActionWallProps {
    text: string;
    confirm_text?: string;
    cancel_text?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmActionWall = ( { text, cancel_text, confirm_text, onConfirm, onCancel }: ConfirmActionWallProps ) => {
    return (
        <div className={"flex flex-col w-11/12 h-fit items-center rounded-2xl shadow-2xl mx-auto"}>
            <div className={"w-full py-6 bg-amber-600 rounded-t-2xl"}>
                <h1 className={"text-blue-50 text-xl text-center font-extrabold"}>{text}</h1>
            </div>
            <div className={"flex justify-evenly w-full py-8 bg-amber-50"}>
                <button
                    className={"uppercase hover:bg-red-600 font-bold hover:text-green-100 bg-red-100 text-red-900 px-8 py-4 rounded-2xl"}
                    onClick={() => {
                        onCancel();
                    }}>{cancel_text ? cancel_text : "No"}
                </button>
                <button
                    className={"uppercase hover:bg-green-600 font-bold hover:text-green-100 bg-green-100 text-green-900 px-8 py-4 rounded-2xl"}
                    onClick={() => {
                        onConfirm();
                    }}>{confirm_text ? confirm_text : "Yes"}
                </button>
            </div>
        </div>
    )
}

export default ConfirmActionWall;