import { InputProps, MakeInputProps } from "../AtomicComponentsProps.ts";
import { FC, PropsWithChildren, ReactElement } from "react";

const MakeInput = <TargetInputProps, InputUnionProps = InputProps>( Component: FC<Extract<InputUnionProps, TargetInputProps>> ) => ( props: PropsWithChildren<Extract<InputUnionProps, TargetInputProps> & MakeInputProps> ): ReactElement => {
    return (
        <label htmlFor={props.id} className={"flex items-center my-2 w-full"}>
            {props.label}
            <Component {...props}/>
        </label>
    )
}

export default MakeInput;