import { n as __esmMin, o as __toESM, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, On as init_Icons, er as init_Analytics, in as AngleDown, ma as require_immutable, on as AngleRight, ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.isSameOrAfter = function(e, t) {
				return this.isSame(e, t) || this.isAfter(e, t);
			};
		};
	}));
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/SecondaryCheckboxType.jsx
var import_jsx_runtime$4, propTypes$4, SecondaryCheckboxType;
var init_SecondaryCheckboxType = __esmMin((() => {
	init_Analytics();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = {
		id: PropTypes.string,
		code: PropTypes.string,
		name: PropTypes.string,
		lookupName: PropTypes.string,
		toggleCheckboxType: PropTypes.func,
		filterType: PropTypes.string,
		selectedCheckboxes: PropTypes.object,
		enableAnalytics: PropTypes.bool,
		restrictChildren: PropTypes.bool
	};
	SecondaryCheckboxType = ({ id = `checkbox-${uniqueId()}`, code, name, lookupName = "", toggleCheckboxType, filterType = "", selectedCheckboxes = /* @__PURE__ */ new Set(), enableAnalytics = false, restrictChildren = false }) => {
		const checked = selectedCheckboxes.includes(code);
		const elementId = `checkbox-${uniqueId()}`;
		const logSecondaryTypeFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Selected Secondary ${filter} Type`,
				label: type,
				gtm: true
			});
		};
		const logDeselectFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Deselected Secondary ${filter} Type`,
				label: type,
				gtm: true
			});
		};
		const toggleFilter = () => {
			toggleCheckboxType({
				value: code,
				lookupName
			});
			if (enableAnalytics) if (selectedCheckboxes.includes(code)) logDeselectFilterEvent(name, filterType);
			else logSecondaryTypeFilterEvent(name, filterType);
		};
		const onKeyDown = (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				toggleFilter();
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", {
			className: "secondary-checkbox-type",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("label", {
				className: "checkbox-item-wrapper",
				htmlFor: elementId,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("input", {
					type: "checkbox",
					id: elementId,
					value: code,
					checked,
					onKeyDown,
					onChange: toggleFilter,
					disabled: restrictChildren
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "checkbox-item-label",
					children: name
				})]
			})
		}, id);
	};
	SecondaryCheckboxType.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/CheckboxExpandButton.jsx
var import_jsx_runtime$3, propTypes$3, CheckboxExpandButton;
var init_CheckboxExpandButton = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		hidden: PropTypes.bool,
		toggleExpand: PropTypes.func,
		arrowState: PropTypes.string
	};
	CheckboxExpandButton = ({ hidden = false, toggleExpand, arrowState }) => {
		let hiddenClass = "";
		let icon = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AngleRight, {});
		if (hidden) hiddenClass = "hidden-button";
		if (arrowState === "expanded") icon = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AngleDown, {});
		const clickedButton = () => {
			if (hidden) return;
			toggleExpand();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
			className: `toggle ${hiddenClass}`,
			onClick: clickedButton,
			title: "child filters",
			disabled: hidden,
			"aria-expanded": arrowState === "expanded",
			children: icon
		});
	};
	CheckboxExpandButton.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/CollapsedCheckboxType.jsx
/**
* CollapsedCheckboxType.jsx
* Created by michaelbray on 5/18/17.
*/
var import_jsx_runtime$2, propTypes$2, CollapsedCheckboxType;
var init_CollapsedCheckboxType = __esmMin((() => {
	init_CheckboxExpandButton();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		toggleExpand: PropTypes.func,
		toggleChildren: PropTypes.func,
		name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		selected: PropTypes.bool,
		hideArrow: PropTypes.bool,
		arrowState: PropTypes.string,
		isCollapsable: PropTypes.bool,
		id: PropTypes.string,
		indeterminate: PropTypes.bool
	};
	CollapsedCheckboxType = ({ toggleExpand, toggleChildren, name = "", selected = false, hideArrow = true, arrowState = "collapsed", isCollapsable = true, id, indeterminate }) => {
		const ref = useRef(null);
		const inputId = `collapsed-checkbox__${id}`;
		if (ref.current) ref.current.indeterminate = indeterminate;
		const onKeyDown = (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				toggleChildren();
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "primary-checkbox-type",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "checkbox-type-item-wrapper",
				children: [isCollapsable && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckboxExpandButton, {
					hidden: hideArrow,
					toggleExpand,
					arrowState
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("label", {
					className: "checkbox-item-wrapper",
					htmlFor: inputId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
						type: "checkbox",
						id: inputId,
						value: name,
						checked: selected,
						onKeyDown,
						onChange: toggleChildren,
						ref
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "checkbox-item-label",
						children: name
					})]
				})]
			})
		});
	};
	CollapsedCheckboxType.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/SingleCheckboxType.jsx
/**
* SingleCheckboxType.jsx
* Created by michaelbray on 5/18/17.
*/
var import_jsx_runtime$1, propTypes$1, SingleCheckboxType;
var init_SingleCheckboxType = __esmMin((() => {
	init_Analytics();
	init_useEventListener();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		code: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		toggleCheckboxType: PropTypes.func,
		filterType: PropTypes.string,
		selectedCheckboxes: PropTypes.object,
		enableAnalytics: PropTypes.bool
	};
	SingleCheckboxType = ({ code, value, name, toggleCheckboxType, filterType = "", selectedCheckboxes, enableAnalytics = false }) => {
		const inputRef = useRef(null);
		const checkboxValue = code || value;
		const logSingleTypeFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Selected ${filter} Type`,
				label: type,
				gtm: true
			});
		};
		const logDeselectSingleTypeFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Deselected ${filter} Type`,
				label: type,
				gtm: true
			});
		};
		const toggleFilter = (e) => {
			if (e.type === "change" || e?.key === "Enter") {
				if (enableAnalytics) if (selectedCheckboxes.has(checkboxValue)) logDeselectSingleTypeFilterEvent(name, filterType);
				else logSingleTypeFilterEvent(name, filterType);
				toggleCheckboxType({ value: checkboxValue });
			}
		};
		useEventListener("keydown", toggleFilter, inputRef);
		const elementId = `checkbox-${uniqueId()}`;
		let checked;
		if (typeof checkboxValue === "object" && (selectedCheckboxes.has(checkboxValue.name) || selectedCheckboxes.has(checkboxValue.duns) || selectedCheckboxes.has(checkboxValue.uei))) checked = true;
		else if (typeof checkboxValue === "object") checked = false;
		else checked = selectedCheckboxes.has(checkboxValue);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "primary-checkbox-type single-item",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "primary-checkbox-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
					className: "checkbox-item-wrapper",
					htmlFor: elementId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
						type: "checkbox",
						id: elementId,
						value: checkboxValue,
						checked,
						onChange: toggleFilter,
						ref: inputRef
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "checkbox-item-label",
						children: name
					})]
				})
			})
		});
	};
	SingleCheckboxType.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/PrimaryCheckboxType.jsx
/**
* PrimaryCheckboxType.jsx
* Created by michaelbray on 5/17/17.
*/
var import_immutable, import_jsx_runtime, propTypes, excludedSubFilters, PrimaryCheckboxType;
var init_PrimaryCheckboxType = __esmMin((() => {
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_Analytics();
	init_SecondaryCheckboxType();
	init_CollapsedCheckboxType();
	init_SingleCheckboxType();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		lookupName: PropTypes.string,
		filters: PropTypes.array,
		bulkTypeChange: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		filterType: PropTypes.string,
		types: PropTypes.object,
		selectedCheckboxes: PropTypes.object,
		enableAnalytics: PropTypes.bool,
		restrictChildren: PropTypes.bool,
		isCollapsable: PropTypes.bool,
		toggleCheckboxType: PropTypes.func
	};
	excludedSubFilters = ["IDV_B"];
	PrimaryCheckboxType = ({ id, name = "", lookupName = "", filters = [], value = "", filterType = "", types = {}, selectedCheckboxes = new import_immutable.Set(), enableAnalytics = false, restrictChildren = false, isCollapsable = true, bulkTypeChange, toggleCheckboxType }) => {
		const [showSubItems, setShowSubItems] = useState(false);
		const [arrowState, setArrowState] = useState("collapsed");
		const [selectedChildren, setSelectedChildren] = useState(false);
		const [allChildren, setAllChildren] = useState(false);
		const logPrimaryTypeFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Selected ${filter} Type`,
				label: type,
				gtm: true
			});
		};
		const logDeselectFilterEvent = (type, filter) => {
			Analytics.event({
				event: "search_checkbox_selection",
				category: "Search Filter Interaction",
				action: `Deselected ${filter} Type Children`,
				label: type,
				gtm: true
			});
		};
		const compareFiltersToChildren = () => {
			let allSelected = true;
			let someSelected = false;
			for (const code of filters) if (!selectedCheckboxes.has(code)) allSelected = false;
			else someSelected = true;
			let tempShowSubItems = showSubItems;
			if (!allSelected && someSelected) tempShowSubItems = true;
			setShowSubItems(tempShowSubItems);
			setAllChildren(allSelected);
			setSelectedChildren(someSelected);
		};
		const toggleSubItems = () => {
			const newShowState = !showSubItems;
			let newArrowState = "collapsed";
			if (newShowState) newArrowState = "expanded";
			setShowSubItems(newShowState);
			setArrowState(newArrowState);
		};
		const toggleChildren = () => {
			if (allChildren) {
				bulkTypeChange({
					lookupName,
					types: filters,
					direction: "remove"
				});
				if (enableAnalytics) logDeselectFilterEvent(name, filterType);
			} else {
				bulkTypeChange({
					lookupName,
					types: filters,
					direction: "add"
				});
				if (enableAnalytics) logPrimaryTypeFilterEvent(name, filterType);
			}
		};
		const indeterminate = filters.length !== selectedCheckboxes.size && selectedCheckboxes.size !== 0;
		let primaryTypes = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsedCheckboxType, {
			toggleExpand: toggleSubItems,
			toggleChildren,
			name,
			selected: allChildren,
			hideArrow: selectedChildren || restrictChildren,
			arrowState,
			isCollapsable,
			id,
			indeterminate
		});
		let secondaryTypes = null;
		if (showSubItems || !isCollapsable) secondaryTypes = filters.filter((subFilter) => !excludedSubFilters.includes(subFilter)).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryCheckboxType, {
			id: `secondary-checkbox-${uniqueId()}`,
			code,
			name: types[code],
			lookupName,
			toggleCheckboxType,
			filterType,
			selectedCheckboxes,
			enableAnalytics,
			restrictChildren
		}, `${id} - ${code}`));
		if (filters.length === 0) primaryTypes = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCheckboxType, {
			name,
			toggleCheckboxType,
			filterType,
			selectedCheckboxes,
			enableAnalytics,
			value,
			code: value,
			id: `primary-checkbox-${uniqueId()}`
		}, `${id} - ${value}`);
		useEffect(() => {
			compareFiltersToChildren();
		}, [selectedCheckboxes]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "checkbox-set",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "primary-checkbox",
				children: primaryTypes
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "secondary-checkbox-set",
				children: secondaryTypes
			})]
		});
	};
	PrimaryCheckboxType.propTypes = propTypes;
}));
//#endregion
export { init_PrimaryCheckboxType as n, require_isSameOrAfter as r, PrimaryCheckboxType as t };
