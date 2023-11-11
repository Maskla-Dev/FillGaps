import { ReactElement } from "react";
import * as React from "react";

export interface MakeInputProps extends IdentityProps {
    label: string | ReactElement;
    id: string;
}

export interface StringInputProps extends MakeInputProps {
    placeholder: string;
    value: string;
    onInput: ( event: React.FormEvent<HTMLInputElement> ) => void;
}

export interface InputTextProps extends StringInputProps {
}

export interface InputPasswordProps extends StringInputProps {
    showPassword: boolean;
}

export interface IdentityProps {
    id: string;
}

export type InputProps = InputTextProps;

export type SVGIconProps = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string,
    titleId?: string
} & React.RefAttributes<SVGSVGElement>>;

export interface FormButtonProps {
    onClick: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
    text: string;
}