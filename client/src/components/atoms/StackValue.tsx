const StackValue = ( { value }: { value: string } ) => {
    return (
        <span className={"px-2.5 py-1 bg-violet-100 rounded-full mx-1 text-purple-600 font-light italic"}>{value}</span>
    )
}

export default StackValue;