import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/RoundedToggle.jsx
var import_jsx_runtime, propTypes, RoundedToggle;
var init_RoundedToggle = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		label: PropTypes.string,
		onToggle: PropTypes.func,
		onKeyToggle: PropTypes.func,
		toggle: PropTypes.bool,
		id: PropTypes.string
	};
	RoundedToggle = ({ label, onToggle, onKeyToggle, toggle, id = "outlays-toggle" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-toggle__wrapper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-toggle__label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "rounded-toggle__switch",
			htmlFor: id,
			"aria-label": "toggle to view outlays",
			children: [
				toggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					id,
					onKeyDown: onKeyToggle,
					onClick: onToggle,
					defaultChecked: true,
					tabIndex: "0"
				}),
				!toggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					id,
					onKeyDown: onKeyToggle,
					onClick: onToggle,
					tabIndex: "0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rounded-toggle__slider rounded-toggle__round" })
			]
		})]
	});
	RoundedToggle.propTypes = propTypes;
}));
//#endregion
export { init_RoundedToggle as n, RoundedToggle as t };
