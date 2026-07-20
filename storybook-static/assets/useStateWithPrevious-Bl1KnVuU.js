import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { useEffect, useRef, useState } from "react";
//#region src/js/hooks/useStateWithPrevious.jsx
var useStateWithPrevious;
var init_useStateWithPrevious = __esmMin((() => {
	useStateWithPrevious = (initialValue) => {
		const [state, updateState] = useState(initialValue);
		const stateRef = useRef(state);
		const { current: prevState } = stateRef;
		useEffect(() => {
			stateRef.current = state;
		}, [state]);
		return [
			prevState,
			state,
			updateState
		];
	};
}));
//#endregion
export { useStateWithPrevious as n, init_useStateWithPrevious as t };
