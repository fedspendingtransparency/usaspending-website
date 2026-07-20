import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime, wi as init_moneyFormatter, xi as formatNumber } from "./index.js-CgeUxZJy.js";
import React, { createElement } from "react";
import PropTypes from "prop-types";
//#region src/js/helpers/keyboardEventsHelper.js
var createOnKeyDownHandler;
var init_keyboardEventsHelper = __esmMin((() => {
	createOnKeyDownHandler = (cb, args = [], keyCodes = [13, 32]) => (e) => {
		if (keyCodes.includes(e.keyCode)) cb(...args);
	};
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableTabItem.jsx
/**
* ResultsTableTabItem.jsx
* Created by Kevin Li 11/29/16
**/
var import_jsx_runtime$1, propTypes$1, ResultsTableTabItem;
var init_ResultsTableTabItem = __esmMin((() => {
	init_moneyFormatter();
	init_keyboardEventsHelper();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		label: PropTypes.string,
		internal: PropTypes.string,
		count: PropTypes.number,
		active: PropTypes.bool,
		enabled: PropTypes.bool,
		switchTab: PropTypes.func,
		hideCounts: PropTypes.bool,
		className: PropTypes.string,
		tooltip: PropTypes.element
	};
	ResultsTableTabItem = class extends React.Component {
		constructor(props) {
			super(props);
			this.clickedTab = this.clickedTab.bind(this);
		}
		clickedTab() {
			this.props.switchTab(this.props.internal);
		}
		render() {
			let activeClass = "";
			let disabledStatus = "";
			let disabledClass = "";
			if (this.props.active) activeClass = " active";
			if (this.props.enabled === false || !this.props.hideCounts && (!this.props.count || this.props.count === 0)) {
				disabledStatus = true;
				disabledClass = " disabled";
			} else {
				disabledStatus = false;
				disabledClass = "";
			}
			let resultString = "results";
			if (this.props.count === 1) resultString = "result";
			let count = null;
			if (!this.props.hideCounts) count = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: `count-badge ${activeClass}`,
				children: formatNumber(this.props.count)
			});
			const className = `table-type-toggle${activeClass} ${this.props.className}${disabledClass}`;
			const onKeyDownHandler = createOnKeyDownHandler(this.clickedTab);
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: `table-type-toggle__wrapper${disabledClass}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className,
					onClick: this.clickedTab,
					onKeyDown: onKeyDownHandler,
					role: "menuitemradio",
					"aria-checked": this.props.active,
					title: `Show ${this.props.label}`,
					"aria-label": `Show ${this.props.label} - ${this.props.count} ${resultString}`,
					tabIndex: 0,
					disabled: disabledStatus,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tab-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tab-label",
								children: this.props.label
							}),
							count,
							this.props.tooltip
						]
					})
				})
			});
		}
	};
	ResultsTableTabItem.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableTabs.jsx
var import_jsx_runtime, propTypes, ResultsTableTabs;
var init_ResultsTableTabs = __esmMin((() => {
	init_ResultsTableTabItem();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		types: PropTypes.array,
		counts: PropTypes.object,
		active: PropTypes.string,
		switchTab: PropTypes.func,
		disabled: PropTypes.bool,
		hideCounts: PropTypes.bool,
		tabsClassName: PropTypes.string
	};
	ResultsTableTabs = ({ types, counts, active, switchTab, disabled, hideCounts, tabsClassName }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-types",
			role: "menu",
			children: types.map((type) => {
				const count = hideCounts ? null : counts[type.internal];
				return /* @__PURE__ */ createElement(ResultsTableTabItem, {
					...type,
					count,
					active: active === type.internal,
					switchTab,
					key: `table-type-item-${type.internal}`,
					enabled: !disabled,
					hideCounts,
					className: tabsClassName
				});
			})
		});
	};
	ResultsTableTabs.propTypes = propTypes;
}));
//#endregion
export { init_keyboardEventsHelper as i, init_ResultsTableTabs as n, createOnKeyDownHandler as r, ResultsTableTabs as t };
