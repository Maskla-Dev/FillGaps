import { useMemo, FC, ChangeEvent, useRef } from 'react';
import Image from "./Image.tsx";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useHover } from "@uidotdev/usehooks";

interface ImageUploadProps {
    value: string | ArrayBuffer | null;
    onImageSelect: ( image: string | ArrayBuffer | null ) => void;
}

const ImageUpload: FC<ImageUploadProps> = ( { onImageSelect, value } ) => {
    const inputRef = useRef<HTMLInputElement>( null );
    const [ref, hovering] = useHover<HTMLDivElement>();
    const handleImageClick = () => {
        inputRef.current?.click();
    };

    const preview = useMemo( () => {
        if ( value === null )
            return <Image src={"https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg"}
                          alt={"Profile Placeholder"} onClick={handleImageClick}/>;
        if ( typeof value === "string" )
            return <Image src={value} alt={"Employee Photo"} onClick={handleImageClick}/>
        return <Image src={URL.createObjectURL( new Blob( [value] ) )} alt={"Value"} onClick={handleImageClick}/>;
    }, [value] );

    const handleImageUpload = ( event: ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageSelect( reader.result );
            };
            reader.readAsDataURL( file );
        } else {
            console.log( "No File Selected" )
            onImageSelect( null );
        }
    };

    return (
        <div className={"w-fit flex flex-col "}>
            <div className={"w-fit relative"} ref={ref}>
                {preview}
                {
                    value ?
                        hovering ?
                            <XCircleIcon className={"z-20 absolute top-2 right-2 w-8 h-8 cursor-pointer"}
                                         onClick={() => {
                                             onImageSelect( null )
                                             if ( inputRef.current ) {
                                                 inputRef.current.value = "";
                                             }
                                         }}/> :
                            <></> : <></>

                }
            </div>
            <label
                className={`py-2 px-4 capitalize mt-2 ${value ? "bg-violet-800 text-violet-50 font-semibold" : "bg-violet-50 text-violet-800"} text-sm rounded-lg text-center cursor-pointer`}>
                {value ? "Change Photo" : "Upload Photo"}
                < input
                    ref={inputRef}
                    className={"hidden"}
                    type='file' accept='image/*' onChange={handleImageUpload}/>
            </label>
        </div>
    );
};

export default ImageUpload;