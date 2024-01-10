export interface ImageProps {
    src: string;
    alt: string;
    onClick?: () => void;
}

const Image = ( { alt, src, onClick }: ImageProps ) => {
    return <img
        className={"h-48 w-48 rounded-full object-cover object-center"}
        src={src}
        alt={alt}
        onClick={onClick}
    />
}

export default Image;