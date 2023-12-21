const ErrorMessage = ( { error, show }: {
    error: string,
    show: boolean
} ) => {
    return (
        <div
            className={`w-4/5 h-12 rounded-xl bg-red-600 flex justify-center items-center absolute bottom-2 overflow-y-hidden ${show ? "animate-grow-height" : "max-h-0"}`}>
            <h1 className={"text-white text-lg"}>{error}</h1>
        </div>
    )
}

export default ErrorMessage;