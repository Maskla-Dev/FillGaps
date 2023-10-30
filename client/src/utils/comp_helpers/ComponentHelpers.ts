import React from "react";



function handleOnChange<UpdaterType, SourceType = HTMLInputElement>( e: React.ChangeEvent<SourceType>, updater: UpdaterType ) {
    // @ts-ignore
    updater( e.currentTarget.value )
}

export { handleOnChange }