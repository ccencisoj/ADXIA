import { useEffect, useState } from "react";

const useCreateUrl = (fileInput)=>{
    const [imageLocal, setImageLocal] = useState('');
    useEffect(()=>{
        if(fileInput){
            let url = URL.createObjectURL(fileInput);
            return setImageLocal(url);
        }
    }, [fileInput])

    return {
        image:imageLocal
    }
}

export default useCreateUrl;