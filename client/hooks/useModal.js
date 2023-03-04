import { useState } from "react";

const useModal = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const showModal = ()=>{
        setIsOpen(!isOpen);
    }

    return {
        isOpen,
        showModal
    }
}

export default useModal;