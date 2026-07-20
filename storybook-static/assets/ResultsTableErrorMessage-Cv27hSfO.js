import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Bn as init_Icons, go as require_jsx_runtime, kn as ExclamationTriangle } from "./index.js-Dk2VDaPz.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-g_gblR0b.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/keyword/table/ResultsTableLoadingMessage.jsx
var import_jsx_runtime$1, ResultsTableLoadingMessage;
var init_ResultsTableLoadingMessage = __esmMin((() => {
	init_LoadingSpinner();
	import_jsx_runtime$1 = require_jsx_runtime();
	ResultsTableLoadingMessage = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "results-table-loading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingSpinner, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "loading-message",
			children: "Gathering your data..."
		})]
	});
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableErrorMessage.jsx
var import_jsx_runtime, propTypes, ResultsTableErrorMessage;
var init_ResultsTableErrorMessage = __esmMin((() => {
	init_Icons();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		title: PropTypes.string,
		description: PropTypes.string
	};
	ResultsTableErrorMessage = ({ title = "An error occurred.", description = "Something went wrong while gathering your data." }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "results-table-error",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExclamationTriangle, { alt: "An error occurred" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "title",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "description",
				children: description
			})
		]
	});
	ResultsTableErrorMessage.propTypes = propTypes;
}));
//#endregion
export { init_ResultsTableLoadingMessage as i, init_ResultsTableErrorMessage as n, ResultsTableLoadingMessage as r, ResultsTableErrorMessage as t };
