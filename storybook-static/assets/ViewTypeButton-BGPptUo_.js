import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Fr as init_dist, Pr as FontAwesomeIcon, ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/buttons/ViewTypeButton.jsx
var import_jsx_runtime, propTypes, ViewTypeButton;
var init_ViewTypeButton = __esmMin((() => {
	init_dist();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		active: PropTypes.bool,
		value: PropTypes.string,
		label: PropTypes.string,
		icon: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		changeView: PropTypes.func
	};
	ViewTypeButton = ({ active, value, label, icon, disabled = false, changeView }) => {
		let activeClass = "";
		let description = `Show results in a ${label.toLowerCase()}`;
		if (active) activeClass = " active";
		if (active) description += " (currently selected)";
		const clickedButton = () => {
			changeView(value);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: `view-button${activeClass}`,
			value,
			title: description,
			"aria-label": description,
			onClick: clickedButton,
			disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon })
		});
	};
	ViewTypeButton.propTypes = propTypes;
}));
//#endregion
export { init_ViewTypeButton as n, ViewTypeButton as t };
