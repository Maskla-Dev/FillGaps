interface InputNumberProps {
    placeholder: string;
    value: string;
    onChange: ( value: string ) => void
}

const InputNumber = ( props: InputNumberProps ) => {
    return (
        <input type={"number"} placeholder={props.placeholder} value={props.value}
               onChange={( e ) => props.onChange( e.target.value )}
               className={"w-full h-10 px-2.5 py-1.5 bg-zinc-800 rounded-lg my-2 "}/>
    )
}

export default InputNumber;