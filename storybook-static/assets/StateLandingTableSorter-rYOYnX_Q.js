import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { On as init_Icons, cn as ArrowDown, ln as ArrowUp, ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/stateLanding/table/StateLandingTableSorter.jsx
var import_jsx_runtime, propTypes, StateLandingTableSorter;
var init_StateLandingTableSorter = __esmMin((() => {
	init_Icons();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		field: PropTypes.string,
		label: PropTypes.string,
		setSort: PropTypes.func,
		active: PropTypes.object
	};
	StateLandingTableSorter = (props) => {
		const sortDesc = () => {
			props.setSort(props.field, "desc");
		};
		const sortAsc = () => {
			props.setSort(props.field, "asc");
		};
		const activeAsc = props.active.field === props.field && props.active.direction === "asc" ? "header-sorter__button_active" : "";
		const activeDesc = props.active.field === props.field && props.active.direction === "desc" ? "header-sorter__button_active" : "";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "state-list__head-sorter header-sorter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `header-sorter__button ${activeAsc}`,
				onClick: sortAsc,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { alt: `Sort table by ascending ${props.label}` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `header-sorter__button ${activeDesc}`,
				onClick: sortDesc,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { alt: `Sort table by descending ${props.label}` })
			})]
		});
	};
	StateLandingTableSorter.propTypes = propTypes;
}));
//#endregion
export { init_StateLandingTableSorter as n, StateLandingTableSorter as t };
