import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/components/award/shared/activity/Tooltip.jsx
var import_jsx_runtime$1, propTypes, Tooltip;
var init_Tooltip = __esmMin((() => {
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = { data: PropTypes.shape({
		title: PropTypes.string,
		sections: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string,
			paragraphs: PropTypes.arrayOf(PropTypes.string)
		}))
	}) };
	Tooltip = ({ data }) => {
		const createSections = () => {
			if (data.sections) return data.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "tooltip__text",
				children: [section.title && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", { children: section.title }), section.paragraphs && section.paragraphs.map((body) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "tooltip__text-section",
					children: body
				}, uniqueId("paragraph-")))]
			}, uniqueId("section-")));
			return null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "tooltip",
			children: [data.title && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tooltip__title",
				children: data.title
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tooltip-body",
				children: createSections()
			})]
		});
	};
	Tooltip.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableNoResults.jsx
var import_jsx_runtime, ResultsTableNoResults;
var init_ResultsTableNoResults = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	ResultsTableNoResults = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "results-table-no-results",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "no-results-icon" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "title",
				children: "No results found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "description",
				children: "Try again using different filters."
			})
		]
	});
}));
//#endregion
export { init_Tooltip as i, init_ResultsTableNoResults as n, Tooltip as r, ResultsTableNoResults as t };
