const ErrorMessage = ( { error, show }: {
    error: string,
    show: boolean
} ) => {
    return (
        <div
            className={`absolute z-20 w-3/4 min-h-22 left-0 right-0 mx-auto rounded-xl bg-red-600 flex flex-col items-center bottom-2 overflow-y-hidden ${show ? "animate-fade-up animate-duration-200 animate-ease-in" : "animate-fade-up animate-duration-200 animate-ease-in animate-reverse"}`}>
            <h1 className={"text-white text-lg text-center"}>{error}</h1>
        </div>
    )
}

export default ErrorMessage;