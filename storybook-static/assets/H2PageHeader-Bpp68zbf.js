import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Nr as init_index_es, go as require_jsx_runtime, gr as $s } from "./index.js-Dk2VDaPz.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/header/H2PageHeader.jsx
var import_jsx_runtime, propTypes, H2PageHeader;
var init_H2PageHeader = __esmMin((() => {
	init_index_es();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		className: PropTypes.string
	};
	H2PageHeader = ({ title, subtitle, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)($s, {
		width: 9,
		className: `h2-page-header ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "h2-page-header__title",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h2-page-header__subtitle",
			children: subtitle
		})]
	});
	H2PageHeader.propTypes = propTypes;
}));
//#endregion
export { init_H2PageHeader as n, H2PageHeader as t };
