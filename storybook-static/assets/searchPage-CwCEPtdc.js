import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { memo, useRef } from "react";
import PropTypes from "prop-types";
//#region src/js/hooks/useOnKeydown.jsx
/**
* useOnKeydown.jsx
* Created on 12/10/2025 by Josue Aguilar
*/
var useOnKeydown;
var init_useOnKeydown = __esmMin((() => {
	init_useEventListener();
	useOnKeydown = (onKeydown) => {
		const ref = useRef(null);
		const onKeydownEvent = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") onKeydown();
		};
		useEventListener("keydown", onKeydownEvent, ref);
		return ref;
	};
}));
//#endregion
//#region src/js/components/sharedComponents/Alert.jsx
/**
* Alert.jsx
* Created by Nick Torres 4/11/23
**/
var import_jsx_runtime, propTypes, Alert;
var init_Alert = __esmMin((() => {
	init_dist();
	init_useOnKeydown();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		type: PropTypes.oneOf([
			"info",
			"success",
			"warning",
			"error"
		]),
		header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		onClose: PropTypes.func,
		closeIcon: PropTypes.string,
		className: PropTypes.string
	};
	Alert = memo(function Alert({ type = "info", header, body, icon, onClose = void 0, closeIcon, className }) {
		const closeRef = useOnKeydown(onClose);
		const getIconString = () => {
			switch (type) {
				case "info": return "info-circle";
				case "success": return "check-circle";
				case "warning": return "exclamation-triangle";
				case "error": return "exclamation-circle";
				default: return "share-alt";
			}
		};
		const iconString = typeof icon === "string" ? icon : getIconString();
		const closeIconString = closeIcon || "times";
		const hideCloseIcon = onClose ? {} : { display: "none" };
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `alert ${type}${className ? ` ${className}` : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "alert__message__container",
				children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "alert___message__icon-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
						className: "alert___message__icon",
						icon: iconString
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert__message",
					children: [header && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "alert__message__header",
						children: header
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "alert__message__body",
						children: body
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "alert__close-icon__container",
				style: hideCloseIcon,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
					className: "alert__close-icon__icon",
					icon: closeIconString,
					onClick: onClose,
					tabIndex: "0",
					"aria-hidden": false,
					ref: closeRef
				})
			})]
		});
	});
	Alert.propTypes = propTypes;
}));
//#endregion
//#region src/_scss/pages/search/searchPage.scss
var require_searchPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
export { Alert as n, init_Alert as r, require_searchPage as t };
