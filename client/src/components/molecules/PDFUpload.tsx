import React, { useState } from 'react';

interface PDFUploadProps {
    onPDFSelect: ( pdf: string | ArrayBuffer | null ) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ( { onPDFSelect } ) => {
    const handlePDFUpload = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onPDFSelect( reader.result );
            };
            reader.readAsDataURL( file );
        }
    };

    return (
        <input type='file' accept='application/pdf' onChange={handlePDFUpload}/>
    );
};

export default PDFUpload;