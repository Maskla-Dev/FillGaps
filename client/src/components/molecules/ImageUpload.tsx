import React, { useState } from 'react';

interface ImageUploadProps {
    onImageSelect: (image: string | ArrayBuffer | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageSelect(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <input type='file' accept='image/*' onChange={handleImageUpload} />
    );
};

export default ImageUpload;