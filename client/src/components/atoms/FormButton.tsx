import { FormButtonProps } from "./AtomicComponentsProps.ts";

const FormButton = ( {
                         text,
                         onClick,
                         isDisabled
                     }: FormButtonProps ) => {
    return (
        <>
            <button
                onClick={onClick}
                className={
                    ` text-white rounded-lg py-2 px-3 h-fit w-fit self-center text-center my-2 bg-blue-600 disabled:bg-blue-900`
                }
                type="submit"
                disabled={isDisabled}>
                {text}
            </button>
        </>
    )
}

export default FormButton;