import React from 'react';

interface InputProps {
    type: string;
    id: string;
    description?: string;
    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
    placeholder?: string;
    value?: string;
    icon?: React.ReactNode;
}

function Input( {
                    type,
                    id,
                    onChange,
                    placeholder,
                    value,
                    icon,
                    description
                }: InputProps ) {
    return (
        <label htmlFor={id}>
            {
                ( description || icon ) ?
                    <div>
                        {icon}
                        <span>{description}</span>
                    </div> : null
            }
            <input
                className={
                    ""
                }
                type={type}
                id={id}
                onChange={onChange}
                placeholder={placeholder}
                value={value}/>
        </label>
    );
}

