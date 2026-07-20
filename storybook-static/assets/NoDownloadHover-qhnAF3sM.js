import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Ir as ps, Nr as init_index_es, Va as init_development, go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import "react";
//#region src/js/components/search/header/NoDownloadHover.jsx
var import_jsx_runtime, NoDownloadHover;
var init_NoDownloadHover = __esmMin((() => {
	init_development();
	init_index_es();
	import_jsx_runtime = require_jsx_runtime();
	NoDownloadHover = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Advanced Search Download",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "message",
			children: [
				"Our Advanced Search limits downloads to 500,000 records. Narrow your search using additional filters, or grab larger files from our ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/download_center/custom_award_data",
					children: "Custom Award Data"
				}),
				"."
			]
		})
	});
}));
//#endregion
export { init_NoDownloadHover as n, NoDownloadHover as t };
