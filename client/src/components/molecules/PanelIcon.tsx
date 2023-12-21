import React, { PropsWithChildren } from "react";

interface PanelIconProps {
    children: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

const PanelIcon = ( { children, title, description, onClick }: PropsWithChildren<PanelIconProps> ) => {
    return (
        <div
            className={"flex flex-col items-center justify-center bg-zinc-600 bg-opacity-40 rounded-xl w-full cursor-pointer p-2"}
            onClick={onClick}>
            {children}
            <div className={"flex flex-col items-center justify-center"}>
                <h1 className={"my-0.5 text-2xl text-blue-600"}>{title}</h1>
                <h2 className={"text-center text-sm text-gray-200"}>{description}</h2>
            </div>
        </div>
    );
};

export default PanelIcon;