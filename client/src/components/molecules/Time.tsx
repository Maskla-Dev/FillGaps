function Time( { time }: { time: Date } ) {
    return (
        <div className={"flex flex-row justify-evenly text-sm mt-1 font-light italic ml-auto w-3/5"}>
            <p>
                {
                    time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()
                }
            </p>
            <p>{
                time.getHours() + ":" + time.getMinutes()
            }</p>
        </div>
    )
}

export default Time;