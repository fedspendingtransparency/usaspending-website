import { useState } from "react";
import usePrevious from "./usePrevious";

const useStateWithPrevious = (initialValue) => {
    const [state, updateState] = useState(initialValue);
    const { current: prevState } = usePrevious(initialValue);

    return [
        prevState,
        state,
        updateState
    ];
};

export default useStateWithPrevious;
