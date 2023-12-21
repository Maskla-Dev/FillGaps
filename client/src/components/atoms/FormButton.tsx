import { FormButtonProps } from "./AtomicComponentsProps.ts";

const FormButton = ( {
                         text,
                         onClick
                     }: FormButtonProps ) => {
    return (
        <>
            <button
                onClick={onClick}
                className={
                    "bg-blue-600 text-white rounded-lg py-2 px-3 w-24 h-fit self-center text-center my-2"
                }
                type="submit">
                {text}
            </button>
        </>
    )
}

export default FormButton;