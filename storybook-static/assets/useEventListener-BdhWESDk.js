import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { useEffect } from "react";
//#region src/js/hooks/useEventListener.jsx
var useEventListener;
var init_useEventListener = __esmMin((() => {
	useEventListener = (eventName, handler, element, options) => {
		useEffect(() => {
			const targetElement = element?.current ?? window;
			if (!(targetElement && targetElement.addEventListener)) return {};
			targetElement.addEventListener(eventName, handler, options);
			return () => {
				targetElement.removeEventListener(eventName, handler, options);
			};
		}, [
			handler,
			eventName,
			element,
			options
		]);
	};
}));
//#endregion
export { useEventListener as n, init_useEventListener as t };
