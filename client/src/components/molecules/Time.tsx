function Time( { time }: { time: number } ) {
    console.log( time )
    const date = new Date( Math.floor( time ) );
    console.log( date )
    return (
        <div className={"flex flex-row justify-evenly text-sm mt-1 font-light italic ml-auto w-3/5"}>
            <p>
                {
                    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                }
            </p>
            <p>{
                date.getHours() + ":" + date.getMinutes()
            }</p>
        </div>
    )
}

export default Time;