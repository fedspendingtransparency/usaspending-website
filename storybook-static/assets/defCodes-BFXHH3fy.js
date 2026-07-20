import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Bn as init_Icons, Kr as FontAwesomeIcon, dr as Analytics, fr as init_Analytics, go as require_jsx_runtime, kn as ExclamationTriangle, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-BjdNP_oA.js";
import { F as init_disasterHelper, I as parseCodes } from "./WithDefCodes-BotSvVWk.js";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/components/sharedComponents/checkbox/CheckboxItem.jsx
var import_jsx_runtime$5, excludedSubFilters, propTypes$5, CheckboxItem;
var init_CheckboxItem = __esmMin((() => {
	init_replaceString();
	init_useEventListener();
	import_jsx_runtime$5 = require_jsx_runtime();
	excludedSubFilters = "IDV_B";
	propTypes$5 = {
		filter: PropTypes.string,
		selectedFilters: PropTypes.array,
		label: PropTypes.string,
		customLabel: PropTypes.string,
		searchString: PropTypes.string,
		singleFilterChange: PropTypes.func,
		isDisabled: PropTypes.bool
	};
	CheckboxItem = ({ filter, selectedFilters, label, customLabel, searchString, singleFilterChange, isDisabled = false }) => {
		const inputRef = useRef(null);
		const highlightText = (text) => replaceString(text, searchString, "highlight");
		const toggleFilter = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") singleFilterChange({ value: filter });
		};
		useEventListener("keydown", toggleFilter, inputRef);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", {
			className: `checkbox-filter__item ${filter === excludedSubFilters ? "hidden" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("label", {
				htmlFor: `primary-checkbox__${filter}`,
				className: "checkbox-filter__item-label-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("input", {
					type: "checkbox",
					id: `primary-checkbox-${filter}`,
					value: filter,
					checked: selectedFilters?.has(filter),
					onChange: toggleFilter,
					disabled: isDisabled,
					ref: inputRef
				}), customLabel ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "checkbox-filter__item-label",
					children: highlightText(customLabel)
				}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "checkbox-filter__item-label",
					children: highlightText(label)
				})]
			})
		});
	};
	CheckboxItem.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/AccordionCheckboxSecondary.jsx
var import_jsx_runtime$4, propTypes$4, AccordionCheckboxSecondary;
var init_AccordionCheckboxSecondary = __esmMin((() => {
	init_CheckboxItem();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = {
		category: PropTypes.object,
		selectedFilters: PropTypes.object,
		singleFilterChange: PropTypes.func,
		filters: PropTypes.object,
		customLabels: PropTypes.object,
		expanded: PropTypes.bool,
		searchString: PropTypes.string,
		isDisabled: PropTypes.bool
	};
	AccordionCheckboxSecondary = ({ category, selectedFilters, singleFilterChange, filters, customLabels, expanded, searchString, isDisabled = false }) => {
		const items = category.filters?.map((filter) => {
			const label = filters[filter];
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CheckboxItem, {
				filter,
				selectedFilters,
				label,
				customLabel: customLabels?.[filter] ?? false,
				searchString,
				singleFilterChange,
				isDisabled
			});
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ul", {
			className: "checkbox-filter__list accordion-checkbox",
			children: expanded && items
		});
	};
	AccordionCheckboxSecondary.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/CheckboxChevron.jsx
var import_jsx_runtime$3, propTypes$3, CheckboxChevron;
var init_CheckboxChevron = __esmMin((() => {
	init_dist();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		category: PropTypes.string,
		toggleExpanded: PropTypes.func,
		expanded: PropTypes.bool
	};
	CheckboxChevron = ({ category, toggleExpanded, expanded }) => {
		const icon = expanded ? "chevron-down" : "chevron-right";
		const buttonAriaLabel = expanded ? "Close toggle" : "Open toggle";
		const onClick = () => toggleExpanded(category);
		const onKeydown = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") onClick();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
			onClick,
			onKeyDown: onKeydown,
			className: "toggle",
			"aria-label": buttonAriaLabel,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon }, `${category}-${expanded ? "close" : "open"}`)
		});
	};
	CheckboxChevron.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/AccordionCheckboxPrimary.jsx
/**
* AccordionCheckboxPrimary.jsx
* Created by Josue Aguilar on 09/05/2024.
*/
var import_jsx_runtime$2, logPrimaryFilterEvent, logDeselectFilterEvent, propTypes$2, AccordionCheckboxPrimary;
var init_AccordionCheckboxPrimary = __esmMin((() => {
	init_Analytics();
	init_AccordionCheckboxSecondary();
	init_replaceString();
	init_useEventListener();
	init_CheckboxChevron();
	import_jsx_runtime$2 = require_jsx_runtime();
	logPrimaryFilterEvent = (type, filter) => {
		Analytics.event({
			event: "search_checkbox_selection",
			category: "Search Filter Interaction",
			action: `Selected ${filter} Type`,
			label: type,
			gtm: true
		});
	};
	logDeselectFilterEvent = (type, filter) => {
		Analytics.event({
			event: "search_checkbox_selection",
			category: "Search Filter Interaction",
			action: `Deselected ${filter} Type Children`,
			label: type,
			gtm: true
		});
	};
	propTypes$2 = {
		category: PropTypes.object,
		expanded: PropTypes.bool,
		toggleExpanded: PropTypes.func,
		selectedFilters: PropTypes.object,
		singleFilterChange: PropTypes.func,
		filters: PropTypes.object,
		bulkFilterChange: PropTypes.func,
		enableAnalytics: PropTypes.bool,
		customLabels: PropTypes.object,
		searchString: PropTypes.string,
		isDisabled: PropTypes.bool
	};
	AccordionCheckboxPrimary = ({ category, expanded, toggleExpanded, selectedFilters, singleFilterChange, filters, customLabels, bulkFilterChange, enableAnalytics = false, searchString, isDisabled = false }) => {
		const [allChildren, setAllChildren] = useState(false);
		const inputRef = useRef(null);
		const primaryCheckbox = document.getElementById(`primary-checkbox__${category.id}`);
		const count = category.id === "indefinite-delivery-vehicle" ? category.filters?.length - 1 : category.filters?.length;
		const toggleChildren = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") if (allChildren) {
				bulkFilterChange({
					lookupName: "",
					types: category.filters,
					direction: "remove"
				});
				if (enableAnalytics) logDeselectFilterEvent(category.id, category.name);
			} else {
				bulkFilterChange({
					lookupName: "",
					types: category.filters,
					direction: "add"
				});
				if (enableAnalytics) logPrimaryFilterEvent(category.id, category.name);
			}
		};
		useEventListener("keydown", toggleChildren, inputRef);
		const compareFiltersToChildren = useCallback(() => {
			let allSelected = true;
			let someSelected = false;
			for (const filter of category.filters) if (!selectedFilters.has(filter)) allSelected = false;
			else someSelected = true;
			if (primaryCheckbox) {
				if (!allSelected && someSelected) primaryCheckbox.indeterminate = true;
				else if (primaryCheckbox?.indeterminate) primaryCheckbox.indeterminate = false;
			}
			setAllChildren(allSelected);
		}, [
			category.filters,
			primaryCheckbox,
			selectedFilters
		]);
		useEffect(() => {
			compareFiltersToChildren();
		}, [compareFiltersToChildren, selectedFilters]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "checkbox-filter__wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "checkbox-filter__header accordion-checkbox",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "checkbox-filter__header-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckboxChevron, {
						category,
						toggleExpanded,
						expanded
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("label", {
					htmlFor: `primary-checkbox__${category.id}`,
					className: "checkbox-filter__header-label-container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
							type: "checkbox",
							onChange: toggleChildren,
							checked: allChildren,
							disabled: isDisabled,
							id: `primary-checkbox__${category.id}`,
							ref: inputRef
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "checkbox-filter__header-label accordion-checkbox",
							children: replaceString(category.name, searchString, "highlight")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", {
							className: "checkbox-filter__header-count",
							children: [
								count,
								" ",
								count === 1 ? "type" : "types"
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AccordionCheckboxSecondary, {
				expanded,
				selectedFilters,
				category,
				singleFilterChange,
				filters,
				customLabels,
				searchString,
				isDisabled
			})]
		});
	};
	AccordionCheckboxPrimary.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/sharedComponents/EntityDropdownAutocomplete.jsx
/**
* EntityDropdownAutocomplete.jsx
* Created by Lizzie Salita 5/6/19
*/
var import_jsx_runtime$1, propTypes$1, EntityDropdownAutocomplete;
var init_EntityDropdownAutocomplete = __esmMin((() => {
	init_dist();
	init_Icons();
	init_useEventListener();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		searchString: PropTypes.string,
		placeholder: PropTypes.string,
		openDropdown: PropTypes.func,
		handleTextInputChange: PropTypes.func,
		handleOnKeyDown: PropTypes.func,
		handleOnKeyUp: PropTypes.func,
		toggleDropdown: PropTypes.func,
		enabled: PropTypes.bool,
		loading: PropTypes.bool,
		showDisclaimer: PropTypes.bool,
		onClear: PropTypes.func,
		isClearable: PropTypes.bool,
		searchIcon: PropTypes.bool,
		id: PropTypes.bool
	};
	EntityDropdownAutocomplete = ({ searchString, enabled = true, openDropdown, handleTextInputChange, toggleDropdown, placeholder, loading, handleOnKeyDown, handleOnKeyUp, showDisclaimer, onClear, isClearable, searchIcon = false, id = "" }) => {
		const iconRef = useRef(null);
		const onKeydownClear = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") onClear();
		};
		useEventListener("keydown", onKeydownClear, iconRef);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "autocomplete__input",
			children: [
				searchIcon && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "search-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, { icon: "search" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
					id: id !== "" ? id : `geo-entity-dropdown-${uniqueId()}`,
					className: "geo-entity-dropdown__input",
					disabled: !enabled,
					type: "text",
					value: searchString,
					onClick: openDropdown,
					onKeyDown: handleOnKeyDown,
					onKeyUp: handleOnKeyUp,
					onChange: handleTextInputChange,
					placeholder
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "icon",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
							onClick: toggleDropdown,
							icon: "spinner",
							spin: true
						}),
						!loading && showDisclaimer && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExclamationTriangle, { alt: "warning" }),
						isClearable && searchString && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
							tabIndex: "0",
							onClick: onClear,
							icon: "times",
							ref: iconRef
						})
					]
				})
			]
		});
	};
	EntityDropdownAutocomplete.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/AccordionCheckbox.jsx
/**
* AccordionCheckbox.jsx
* Created by Josue Aguilar on 09/05/2024.
*/
var import_jsx_runtime, expandCheckboxCategoryAccordions, propTypes, AccordionCheckbox;
var init_AccordionCheckbox = __esmMin((() => {
	init_AccordionCheckboxPrimary();
	init_EntityDropdownAutocomplete();
	import_jsx_runtime = require_jsx_runtime();
	expandCheckboxCategoryAccordions = (filterCategoryMapping, selectedFilters) => {
		const toExpand = [];
		filterCategoryMapping?.forEach((category) => {
			category?.filters?.forEach((type) => {
				if (selectedFilters?.has(type)) toExpand.push(category.id);
			});
		});
		return toExpand;
	};
	propTypes = {
		filters: PropTypes.object,
		filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
		selectedFilters: PropTypes.object,
		singleFilterChange: PropTypes.func,
		bulkFilterChange: PropTypes.func,
		customLabels: PropTypes.object,
		selectedCategory: PropTypes.string,
		isExpanded: PropTypes.bool,
		setDefSearchString: PropTypes.func,
		showSearch: PropTypes.bool,
		isDisabled: PropTypes.bool,
		placeholder: PropTypes.string
	};
	AccordionCheckbox = ({ filters, customLabels, filterCategoryMapping = [], selectedFilters, singleFilterChange, bulkFilterChange, selectedCategory, isExpanded, setDefSearchString = () => {}, showSearch = true, isDisabled = false, placeholder = "Search filters..." }) => {
		const [searchString, setSearchString] = useState("");
		const [filterCategory, setFilterCategory] = useState(filterCategoryMapping);
		const [noResults, setNoResults] = useState(false);
		const [expandedCategories, setExpandedCategories] = useState(expandCheckboxCategoryAccordions(filterCategoryMapping, selectedFilters));
		const toggleExpanded = (category) => {
			if (expandedCategories?.indexOf(category.id) <= -1) setExpandedCategories([...expandedCategories, category.id]);
			else setExpandedCategories(expandedCategories.filter((item) => item !== category.id));
		};
		useEffect(() => {
			if (isDisabled && expandedCategories?.length) expandedCategories.forEach((ec) => toggleExpanded({ id: ec }));
			else if (isExpanded) {
				const category = filterCategoryMapping.find((item) => item.id === selectedCategory);
				toggleExpanded(category);
			}
		}, [
			filterCategoryMapping,
			isExpanded,
			selectedCategory,
			isDisabled
		]);
		const handleTextInputChange = (e) => {
			setSearchString(e.target.value);
			setDefSearchString(e.target.value);
		};
		const onClear = () => {
			setExpandedCategories([]);
			setSearchString("");
			setDefSearchString("");
		};
		const searchCategoryMapping = () => {
			const filteredDefinitions = Object.fromEntries(Object.entries(filters).filter(([, value]) => value.toLowerCase().includes(searchString.toLowerCase())));
			const filteredCategories = filterCategoryMapping.map((type) => ({
				...type,
				filters: type.filters.filter((v) => Object.keys(filteredDefinitions).includes(v))
			})).filter((type) => type.filters.length > 0);
			if (filteredCategories.length > 0) setNoResults(false);
			else setNoResults(true);
			setFilterCategory(filteredCategories);
		};
		useEffect(() => {
			searchCategoryMapping();
			if (searchString) {
				const categoryIds = filterCategory.map((category) => category.id);
				setExpandedCategories(categoryIds);
			}
		}, [searchString]);
		const checkboxCategories = filterCategory.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCheckboxPrimary, {
			category,
			singleFilterChange,
			filters,
			selectedFilters,
			customLabels,
			expanded: expandedCategories?.includes(category.id),
			toggleExpanded,
			bulkFilterChange,
			searchString,
			isDisabled
		}, category.id));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "filter-item-wrap",
			children: showSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityDropdownAutocomplete, {
				placeholder,
				searchString,
				enabled: true,
				handleTextInputChange,
				context: {},
				loading: false,
				isClearable: true,
				onClear,
				searchIcon: true
			}), noResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-results",
				children: "No results found."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "checkbox-categories-wrapper",
				children: checkboxCategories
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "checkbox-categories-wrapper",
				children: checkboxCategories
			})
		});
	};
	AccordionCheckbox.propTypes = propTypes;
}));
//#endregion
//#region src/js/dataMapping/search/defCodes.js
var defCodes, defCodeGroups, groupLabels, defcDataByType;
var init_defCodes = __esmMin((() => {
	init_disasterHelper();
	defCodes = {
		L: {
			title: "Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020",
			public_law: "Emergency P.L. 116-123"
		},
		M: {
			title: "Families First Coronavirus Response Act",
			public_law: "Emergency P.L. 116-127"
		},
		N: {
			title: "Coronavirus Aid, Relief, and Economic Security Act or the CARES Act",
			public_law: "Emergency P.L. 116-136"
		},
		O: {
			title: "Coronavirus Aid, Relief, and Economic Security Act or the CARES Act|Paycheck Protection Program and Health Care Enhancement Act|Consolidated Appropriations Act, 2021|American Rescue Plan Act of 2021",
			public_law: "Non-emergency P.L. 116-136|Non-emergency P.L. 116-139|Non-emergency P.L. 116-260|Non-emergency P.L. 117-2"
		},
		P: {
			title: "Paycheck Protection Program and Health Care Enhancement Act",
			public_law: "Emergency P.L. 116-139"
		},
		U: {
			title: "Consolidated Appropriations Act, 2021",
			public_law: "Emergency P.L. 116-260"
		},
		V: {
			title: "American Rescue Plan Act of 2021",
			public_law: "Non-emergency P.L. 117-2"
		},
		Z: {
			title: "Infrastructure Investment and Jobs Act (Z)",
			public_law: "Emergency P.L. 117-58"
		},
		1: {
			title: "Infrastructure Investment and Jobs Act (1)",
			public_law: "Non-emergency P.L. 117-58"
		}
	};
	defCodeGroups = {
		covid: [
			"L",
			"M",
			"N",
			"O",
			"P",
			"U",
			"V"
		],
		infrastructure: ["Z", "1"]
	};
	groupLabels = {
		covid: "COVID-19 Spending",
		infrastructure: "Infrastructure Spending"
	};
	defcDataByType = (codes) => [{
		id: "covid",
		name: "COVID-19 Spending",
		filters: parseCodes(codes, "covid_19")
	}, {
		id: "infrastructure",
		name: "Infrastructure Spending",
		filters: parseCodes(codes, "infrastructure")
	}];
}));
//#endregion
export { init_defCodes as a, EntityDropdownAutocomplete as c, init_CheckboxItem as d, groupLabels as i, init_EntityDropdownAutocomplete as l, defCodes as n, AccordionCheckbox as o, defcDataByType as r, init_AccordionCheckbox as s, defCodeGroups as t, CheckboxItem as u };
