import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import { n as init_ViewTypeButton, t as ViewTypeButton } from "./ViewTypeButton-BGPptUo_.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/buttons/ChartTableToggle.jsx
var import_jsx_runtime, propTypes, ChartTableToggle;
var init_ChartTableToggle = __esmMin((() => {
	init_ViewTypeButton();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		activeType: PropTypes.string,
		changeView: PropTypes.func,
		classname: PropTypes.string
	};
	ChartTableToggle = ({ activeType, changeView, classname }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `chart-table-toggle ${classname || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewTypeButton, {
			value: "chart",
			label: "chart",
			changeView,
			active: activeType === "chart",
			icon: "chart-bar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewTypeButton, {
			value: "table",
			label: "table",
			active: activeType === "table",
			changeView,
			icon: "table"
		})]
	});
	ChartTableToggle.propTypes = propTypes;
}));
//#endregion
export { init_ChartTableToggle as n, ChartTableToggle as t };
