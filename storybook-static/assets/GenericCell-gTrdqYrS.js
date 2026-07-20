import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Bn as init_Icons, bn as ArrowDown, go as require_jsx_runtime, xn as ArrowUp } from "./index.js-Dk2VDaPz.js";
import React from "react";
import PropTypes from "prop-types";
//#region src/js/components/account/awards/LegacyTableHeaderCell.jsx
var import_jsx_runtime$1, propTypes$1, TableHeaderCell;
var init_LegacyTableHeaderCell = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		isLast: PropTypes.bool,
		field: PropTypes.string,
		title: PropTypes.string,
		defaultDirection: PropTypes.string,
		currentSort: PropTypes.object,
		updateSort: PropTypes.func
	};
	TableHeaderCell = (props) => {
		const clickedSort = (e) => {
			props.updateSort(props.field, e.target.value);
		};
		const clickedDefault = () => {
			if (props.currentSort.field === props.field) {
				let opposite = "asc";
				if (props.currentSort.direction === "asc") opposite = "desc";
				props.updateSort(props.field, opposite);
			} else props.updateSort(props.field, props.defaultDirection);
		};
		const pressedKey = (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				clickedDefault();
			}
		};
		let lastClass = "";
		if (props.isLast) lastClass = " last-column";
		let activeAsc = "";
		let activeDesc = "";
		if (props.currentSort.field === props.field && props.currentSort.direction === "desc") activeDesc = " active";
		else if (props.currentSort.field === props.field && props.currentSort.direction === "asc") activeAsc = " active";
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: `award-result-header-cell ${lastClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "cell-content",
				onClick: clickedDefault,
				onKeyDown: pressedKey,
				role: "presentation",
				tabIndex: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "header-sort",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "header-label",
						children: props.title
					}), props.defaultDirection && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "header-icons",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							onClick: clickedSort,
							className: `sort-icon${activeAsc}`,
							value: "asc",
							title: `Sort table by ascending ${props.title}`,
							"aria-label": `Sort table by ascending ${props.title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArrowUp, { alt: `Sort table by ascending ${props.title}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							onClick: clickedSort,
							className: `sort-icon${activeDesc}`,
							value: "desc",
							title: `Sort table by descending ${props.title}`,
							"aria-label": `Sort table by descending ${props.title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArrowDown, { alt: `Sort table by descending ${props.title}` })
						})]
					})]
				})
			})
		});
	};
	TableHeaderCell.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/agencyLanding/table/cells/GenericCell.jsx
/**
* GenericCell.jsx
* Created by Lizzie Salita 08/01/17
**/
var import_jsx_runtime, propTypes, ResultsTableGenericCell;
var init_GenericCell = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		data: PropTypes.string,
		rowIndex: PropTypes.number,
		column: PropTypes.string
	};
	ResultsTableGenericCell = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `generic-cell column-${this.props.column}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cell-content",
					children: this.props.data
				})
			});
		}
	};
	ResultsTableGenericCell.propTypes = propTypes;
}));
//#endregion
export { init_LegacyTableHeaderCell as i, init_GenericCell as n, TableHeaderCell as r, ResultsTableGenericCell as t };
