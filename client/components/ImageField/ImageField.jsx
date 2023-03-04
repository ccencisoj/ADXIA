import React, {useState} from 'react';
import useCreateUrl from '~/hooks/useCreateUrl';
import View from './View';

function ImageField({alt, src, onImage, readOnly}) {
    const [fileInput, setFileInput] = useState('');
    const { image } = useCreateUrl(fileInput);

    const getFile = (e)=>{
        if(e.target.files.length != 0){
            const imageBlob = e.target.files[0];

            setFileInput(imageBlob);

            onImage(imageBlob);
        }
    }
    
    return (
        <View onChange={getFile} src={image||src} alt={alt} readOnly={readOnly}/>
    )
}

export default ImageField