import { useRef } from "react";
import useEventListener from "./useEventListener";


const useOnKeydown = (onKeydown) => {
    const ref = useRef(null);
    const onKeydownClear = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            onKeydown();
        }
    };

    useEventListener('keydown', onKeydownClear, ref);

    return { ref };
};

export default useOnKeydown;
