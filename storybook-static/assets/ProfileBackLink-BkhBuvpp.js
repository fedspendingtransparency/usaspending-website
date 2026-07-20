import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Kr as FontAwesomeIcon, Va as init_development, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/ProfileBackLink.jsx
var import_jsx_runtime, propTypes, ProfileBackLink;
var init_ProfileBackLink = __esmMin((() => {
	init_dist();
	init_development();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		label: PropTypes.string,
		url: PropTypes.string,
		className: PropTypes.string
	};
	ProfileBackLink = ({ label, url, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `usa-profile-back-link__container ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "usa-profile-back-link__wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: url,
				className: "usa-profile-back-link__item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
					icon: "arrow-left",
					alt: "Back",
					className: "bc-back-link"
				}), label]
			})
		})
	});
	ProfileBackLink.propTypes = propTypes;
}));
//#endregion
export { init_ProfileBackLink as n, ProfileBackLink as t };
