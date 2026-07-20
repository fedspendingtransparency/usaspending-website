import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ba as init_GlobalConstants, On as init_Icons, _n as ExclamationTriangle, ro as require_jsx_runtime, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-Dzf78LU9.js";
import "react";
//#region src/js/dataMapping/shared/recipientIdentifiers.jsx
var import_jsx_runtime$1, idList;
var init_recipientIdentifiers = __esmMin((() => {
	init_GlossaryLink();
	init_GlobalConstants();
	import_jsx_runtime$1 = require_jsx_runtime();
	idList = (duns, uei) => {
		if (!duns && !uei) return ["Identifier not provided"];
		const ids = [];
		if (uei) ids.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			uei,
			" (UEI ",
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GlossaryLink, { term: "unique-entity-identifier-uei" }),
			") ",
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("br", {})
		] }, "overview__uei"));
		if (duns) ids.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
			duns,
			" (",
			globalConstants.DUNS_LABEL,
			"DUNS ",
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GlossaryLink, { term: "duns" }),
			")",
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("br", {})
		] }, "overview__duns"));
		return ids;
	};
}));
//#endregion
//#region src/js/components/sharedComponents/ChartError.jsx
var import_jsx_runtime, ChartError;
var init_ChartError = __esmMin((() => {
	init_Icons();
	import_jsx_runtime = require_jsx_runtime();
	ChartError = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "visualization-message-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "visualization-no-results",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "error-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExclamationTriangle, { alt: "An error occurred" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "title",
					children: "An error occurred."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "description",
					children: "Something went wrong while gathering your data."
				})
			]
		})
	});
}));
//#endregion
export { init_recipientIdentifiers as i, init_ChartError as n, idList as r, ChartError as t };
