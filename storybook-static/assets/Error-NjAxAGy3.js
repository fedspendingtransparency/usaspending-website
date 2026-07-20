import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/Error.jsx
var import_jsx_runtime, propTypes, Error;
var init_Error = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		title: PropTypes.string,
		message: PropTypes.string
	};
	Error = ({ title = "Error", message = "We're sorry, there has been an unexpected error.  Please try again in a few moments." }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "main-content",
		id: "main-content",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "error-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message })]
		})
	});
	Error.propTypes = propTypes;
}));
//#endregion
export { init_Error as n, Error as t };
