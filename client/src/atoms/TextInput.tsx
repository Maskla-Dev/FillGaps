import { FC, useState } from 'react';

export interface TextInputProps {
    onChange?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    id?: string
}

export const TextInput: FC<TextInputProps> = ( {
                                                   id,
                                                   value,
                                                   onChange,
                                                   placeholder,
                                                   maxLength,
                                                   minLength,
                                               } ) => {
    const [inputValue, setInputValue] = useState( value );

    return (
        <>
            <input
                id={id}
                value={inputValue}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={e => {
                    if ( onChange ) {
                        onChange( e );
                    }
                    setInputValue( e.target.value )
                }}/>
        </>
    )
};