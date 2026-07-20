import { n as __esmMin, o as __toESM } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, An as isCancel, Ba as init_GlobalConstants, Dr as sc, Fr as init_dist, Ft as updateNewAwardsOnlySelected, Ga as useSelector, O as require_dayjs_min, Pr as FontAwesomeIcon, Tt as init_searchFilterActions, Ua as init_es, bi as formatMoneyWithUnitsShortLabel, br as fo, ct as usePrevious, da as init_awardType, er as init_Analytics, fa as subawardTypeGroups, ga as init_IsMobileContext, h as init_SearchAwardsOperation, ha as IsMobileContext, jr as vs, kn as init_axios, kr as ss, lr as Ka, m as SearchAwardsOperation, ma as require_immutable, mr as Wo, pa as transactionTypeGroups, qa as useDispatch, ro as require_jsx_runtime, sr as Go, st as init_usePrevious, vi as formatMoneyWithPrecision, wi as init_moneyFormatter, xr as init_index_es, ya as init_mobileBreakpoints, yr as fc, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-ByF767MK.js";
import { A as dateRangeDropdownTimePeriods, S as performSpendingByAwardSearch, a as convertToTitleCase, j as init_dateRangeDropdownHelper, o as dateRangeChipLabel, y as init_searchHelper } from "./searchHelper-D0TEuy-H.js";
import { r as require_isSameOrAfter } from "./PrimaryCheckboxType-DdkGKl1b.js";
import { f as LabelList, g as ResponsiveContainer, i as YAxis, m as Text, n as BarChart, o as XAxis, t as init_es6, u as Bar } from "./es6-BbXcNfhx.js";
import { n as init_keywordHelper, r as performKeywordSearch } from "./keywordHelper-uUDfJwFI.js";
import * as React$1 from "react";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes, { oneOf, shape } from "prop-types";
import { throttle, uniqueId } from "lodash-es";
//#region src/js/components/sharedComponents/filterSidebar/FilterTab.jsx
var import_jsx_runtime$20, propTypes$16, FilterTab;
var init_FilterTab = __esmMin((() => {
	import_jsx_runtime$20 = require_jsx_runtime();
	propTypes$16 = {
		label: PropTypes.object.isRequired,
		active: PropTypes.bool.isRequired,
		switchTab: PropTypes.func.isRequired,
		focusNextTab: PropTypes.func.isRequired,
		focusPrevTab: PropTypes.func.isRequired
	};
	FilterTab = ({ label, active, switchTab, focusNextTab, focusPrevTab }) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
		id: `filter-tab-${label.internal}`,
		className: `filter-tabs__tab ${active ? "active" : ""}`,
		onClick: switchTab,
		onKeyDown: (e) => {
			if (e.key === "Enter") switchTab(e);
			else if (e.key === "ArrowLeft") focusPrevTab(e);
			else if (e.key === "ArrowRight") focusNextTab(e);
		},
		title: `Show ${label.title}`,
		role: "tab",
		"aria-label": `Show ${label.title}`,
		"aria-selected": active,
		tabIndex: active ? 0 : -1,
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
			className: "filter-tabs__label",
			children: label.label
		})
	});
	FilterTab.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/components/sharedComponents/filterSidebar/FilterTabs.jsx
/**
* FilterTabs.jsx
* Created by Brian Petway 07/23/24
*/
var import_jsx_runtime$19, propTypes$15, FilterTabs;
var init_FilterTabs = __esmMin((() => {
	init_FilterTab();
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$15 = {
		labels: PropTypes.array.isRequired,
		active: PropTypes.string.isRequired,
		switchTab: PropTypes.func.isRequired
	};
	FilterTabs = ({ labels, active, switchTab }) => {
		const ref = useRef();
		const focusNextTab = (e) => {
			const tabsInDom = ref.current && Array.from(ref.current.querySelectorAll("[role=tab]"));
			const currentPositionInTabs = tabsInDom.findIndex((ele) => ele.id === e.target.id);
			tabsInDom[currentPositionInTabs >= tabsInDom.length - 1 ? 0 : currentPositionInTabs + 1].focus();
		};
		const focusPrevTab = (e) => {
			const tabsInDom = ref.current && Array.from(ref.current.querySelectorAll("[role=tab]"));
			const currentPositionInTabs = tabsInDom.findIndex((ele) => ele.id === e.target.id);
			tabsInDom[currentPositionInTabs === 0 ? tabsInDom.length - 1 : currentPositionInTabs - 1].focus();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: "filter-tabs__container",
			ref,
			role: "tablist",
			"aria-labelledby": "tablist-1",
			children: [labels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(FilterTab, {
				label,
				active: active === label.internal,
				switchTab,
				focusNextTab,
				focusPrevTab
			}, `filter-tab-${label.internal}`)), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", { className: "filter-tabs__spacer" })]
		});
	};
	FilterTabs.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/components/sharedComponents/DatePicker.jsx
/**
* DatePicker.jsx
* Created by Kevin Li 7/25/16
**/
var import_jsx_runtime$18, dayjs$2, propTypes$14, DatePicker;
var init_DatePicker = __esmMin((() => {
	import_jsx_runtime$18 = require_jsx_runtime();
	dayjs$2 = require_dayjs_min();
	propTypes$14 = {
		value: PropTypes.string,
		type: PropTypes.string,
		onDateChange: PropTypes.func,
		hideError: PropTypes.func,
		title: PropTypes.string,
		id: PropTypes.string,
		min: PropTypes.string
	};
	DatePicker = ({ value, type = "startDate", onDateChange, hideError, title, id, min }) => {
		const [inputValue, setInputValue] = useState("");
		const labelId = `picker-${uniqueId()}`;
		const clearValue = (e) => {
			setInputValue("");
			if (e.target.id.includes("startDate")) onDateChange(null, "startDate");
			else if (e.target.id.includes("endDate")) onDateChange(null, "endDate");
		};
		const handleDatePick = (day) => {
			onDateChange(day, type);
			hideError();
		};
		const handleTypedDate = (e) => {
			if (e.target.value === "") {
				clearValue(e);
				return;
			}
			setInputValue(e.target.value);
			const date = dayjs$2(e.target.value, "YYYY-MM-DD");
			if (date.isValid()) handleDatePick(date.toDate());
		};
		useEffect(() => {
			if (value === "" || value === null) clearValue({ target: { id: "" } });
		}, [value]);
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "generate-datepicker-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "generate-datepicker",
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("label", {
					htmlFor: labelId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
						className: "generate-datepicker__label",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("input", {
						className: "date-picker__input-field",
						id,
						type: "date",
						placeholder: "mm/dd/yyyy",
						"aria-label": title,
						value: inputValue,
						min,
						onChange: handleTypedDate,
						onBlur: handleTypedDate
					})]
				})
			})
		});
	};
	DatePicker.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/search/filters/ShownValue.jsx
var import_jsx_runtime$17, propTypes$13, ShownValue;
var init_ShownValue = __esmMin((() => {
	init_dist();
	init_index_es();
	import_jsx_runtime$17 = require_jsx_runtime();
	propTypes$13 = {
		removeValue: PropTypes.func,
		label: PropTypes.string
	};
	ShownValue = ({ removeValue, label }) => {
		const keyDownHandler = (e) => {
			e.stopPropagation();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(import_jsx_runtime$17.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			className: "shown-filter-button",
			value: label,
			"aria-label": `Applied filter: ${label}`,
			tabIndex: 0,
			onClick: keyDownHandler,
			onKeyDown: keyDownHandler,
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				title: "Click to remove filter",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(sc, {
					onClick: removeValue,
					buttonSize: "sm",
					buttonType: "icon",
					backgroundColor: "light",
					buttonTitle: "close",
					copy: "Click to remove filter.",
					additionalClassnames: "shown-filter-button__shown-filter-button-icon",
					image: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(FontAwesomeIcon, {
						icon: "times",
						style: { cursor: "pointer" }
					})
				})
			})]
		}) });
	};
	ShownValue.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/DateRange.jsx
/**
* DateRange.jsx
* Created by Emily Gullo 11/03/2016
**/
var import_jsx_runtime$16, dayjs$1, isSameOrAfter$1, propTypes$12, DateRange;
var init_DateRange = __esmMin((() => {
	init_es();
	init_index_es();
	init_Analytics();
	init_DatePicker();
	init_dateRangeDropdownHelper();
	init_ShownValue();
	init_searchHelper();
	init_usePrevious();
	import_jsx_runtime$16 = require_jsx_runtime();
	dayjs$1 = require_dayjs_min();
	isSameOrAfter$1 = require_isSameOrAfter();
	dayjs$1.extend(isSameOrAfter$1);
	propTypes$12 = {
		onDateChange: PropTypes.func,
		startDate: PropTypes.object,
		endDate: PropTypes.object,
		timePeriod: PropTypes.object,
		showError: PropTypes.func,
		hideError: PropTypes.func,
		removeDateRange: PropTypes.func,
		updateFilter: PropTypes.func,
		errorState: PropTypes.bool,
		header: PropTypes.string,
		errorMessage: PropTypes.string,
		setStartDate: PropTypes.func,
		setEndDate: PropTypes.func,
		startDateDropdown: PropTypes.object,
		endDateDropdown: PropTypes.object
	};
	DateRange = (props) => {
		const [startPicker, setStartPicker] = useState(null);
		const [endPicker, setEndPicker] = useState(null);
		const [dropdownDisabled, setDropdownDisabled] = useState(true);
		const [drDisabled, setDRDisabled] = useState(true);
		const [selectedDropdownOption, setSelectedDropdownOption] = useState("select");
		const [dropdownOptionSelected, setDropdownOptionSelected] = useState(false);
		const [noDatesDR, setNoDatesDR] = useState(false);
		const [noDatesDropdown, setNoDatesDropdown] = useState(false);
		const prevProps = usePrevious(props);
		const timePeriod = useSelector((state) => state.filters.time_period);
		const timePeriodApplied = useSelector((state) => state.appliedFilters.filters.time_period);
		const labelArray = [];
		const onClick = (e) => {
			setSelectedDropdownOption(e);
			if (e === "select") {
				setDropdownOptionSelected(false);
				setNoDatesDropdown(true);
				props.onDateChange(null, "startDateDropdown");
				props.onDateChange(null, "endDateDropdown");
			} else {
				setDropdownOptionSelected(true);
				setNoDatesDropdown(false);
				Analytics.event({
					category: "Date Range Dropdown",
					action: `View ${e}`
				});
				dateRangeDropdownTimePeriods.find((obj) => {
					if (obj.value === e) {
						props.onDateChange(obj.startDate, "startDateDropdown");
						props.onDateChange(obj.endDate, "endDateDropdown");
						return true;
					}
					return false;
				});
			}
		};
		const localRemoveDateRange = (startDate, endDate, e) => {
			e.stopPropagation();
			if (e?.type === "click" || e.type === "keyup" && e?.key === "Enter") {
				setSelectedDropdownOption("select");
				let newValue = timePeriod;
				timePeriod.forEach((date) => {
					if (date.start_date === startDate && date.end_date === endDate) newValue = newValue.delete(date);
				});
				props.removeDateRange(newValue);
			}
		};
		const dropdownOptions = [
			{
				name: "Select a date range",
				value: "select",
				onClick
			},
			{
				name: "Yesterday",
				value: "yesterday",
				onClick
			},
			{
				name: "Last 7 days",
				value: "last-seven-days",
				onClick
			},
			{
				name: "Last 15 days",
				value: "last-fifteen-days",
				onClick
			},
			{
				name: "Last 30 days",
				value: "last-thirty-days",
				onClick
			},
			{
				name: "Last 60 days",
				value: "last-sixty-days",
				onClick
			},
			{
				name: "This month",
				value: "current-month",
				onClick
			},
			{
				name: "Last 3 months",
				value: "last-three-months",
				onClick
			},
			{
				name: "Last 6 months",
				value: "last-six-months",
				onClick
			},
			{
				name: "Last 12 months",
				value: "last-twelve-months",
				onClick
			},
			{
				name: "Last year (Jan - Dec)",
				value: "last-calendar-year",
				onClick
			},
			{
				name: "Year-to-date (Jan - today)",
				value: "year-to-date",
				onClick
			}
		];
		const sortFn = () => dropdownOptions;
		const submitDates = () => {
			const start = props.startDate;
			const end = props.endDate;
			if (!props.errorState && (start || end)) {
				let startValue = null;
				let endValue = null;
				if (start) startValue = start.format("YYYY-MM-DD");
				if (end) endValue = end.format("YYYY-MM-DD");
				props.updateFilter({
					dateType: "dr",
					startDate: startValue,
					endDate: endValue
				});
			} else props.updateFilter({
				dateType: "dr",
				startDate: null,
				endDate: null
			});
			props.setStartDate(null);
			props.setEndDate(null);
		};
		const submitDatesDropdown = () => {
			const start = props.startDateDropdown;
			const end = props.endDateDropdown;
			if (!props.errorState && (start || end)) {
				let startValue = null;
				let endValue = null;
				if (start) startValue = start.format("YYYY-MM-DD");
				if (end) endValue = end.format("YYYY-MM-DD");
				let matchFound = false;
				let matchFoundApplied = false;
				timePeriod.forEach((item) => {
					if (item.start_date === startValue && item.end_date === endValue) {
						matchFound = true;
						setNoDatesDropdown(true);
					}
				});
				timePeriodApplied.forEach((item) => {
					if (item.start_date === startValue && item.end_date === endValue) {
						matchFoundApplied = true;
						setNoDatesDropdown(true);
					}
				});
				if (!matchFound && (timePeriodApplied?.size > 0 || !matchFoundApplied)) props.updateFilter({
					dateType: "dr",
					startDate: startValue,
					endDate: endValue
				});
			} else props.updateFilter({
				dateType: "dr",
				startDate: null,
				endDate: null
			});
			setSelectedDropdownOption("select");
		};
		const testDates = () => {
			if (props.startDate === null && props.endDate === null) {
				if (props.errorState) props.showError(props.header, props.errorMessage);
				return;
			}
			if (props.startDate !== null && props.endDate !== null && props.startDate.isValid() && props.endDate.isValid() && !props.endDate.isSameOrAfter(props.startDate)) {
				props.showError("Invalid Dates", "The end date cannot be earlier than the start date.");
				return;
			}
			if (props.startDate !== null && props.startDate.isBefore("2007-10-01")) {
				props.showError("Invalid Start Date", "Please select a date after 10/01/2007.");
				setNoDatesDR(true);
				return;
			}
			if (props.endDate !== null && props.endDate.isBefore("2007-10-01")) {
				props.showError("Invalid End Date", "Please select a date after 10/01/2007.");
				setNoDatesDR(true);
				return;
			}
			const format = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
			if (props.startDate !== null) {
				const newDateFormat = dayjs$1(props.startDate).format("YYYY-MM-DD");
				if (!format.test(newDateFormat)) {
					setNoDatesDR(true);
					props.showError("Invalid Dates", "Please enter a valid date in MM/DD/YYYY format.");
				}
			}
			if (props.endDate !== null) {
				const newDateFormat = dayjs$1(props.endDate).format("YYYY-MM-DD");
				if (!format.test(newDateFormat)) {
					setNoDatesDR(true);
					props.showError("Invalid Dates", "Please enter a valid date in MM/DD/YYYY format.");
				}
			}
		};
		useEffect(() => {
			if (!props.startDate && !props.endDate) {
				setNoDatesDR(true);
				props.hideError();
			} else setNoDatesDR(false);
		}, [props.endDate, props.startDate]);
		useEffect(() => {
			if (!props.startDateDropdown && !props.endDateDropdown) {
				setNoDatesDropdown(true);
				props.hideError();
			} else setNoDatesDropdown(false);
		}, [props.endDateDropdown, props.startDateDropdown]);
		useEffect(() => {
			if (prevProps?.startDate !== props?.startDate && !props?.startDate) startPicker?.clearValue();
		}, [props?.startDate]);
		useEffect(() => {
			if (prevProps?.endDate !== props?.endDate && !props?.endDate) endPicker?.clearValue();
		}, [props?.endDate]);
		useEffect(() => {
			if (!noDatesDR) {
				setDRDisabled(false);
				testDates();
			} else if (noDatesDR) setDRDisabled(true);
			if (!noDatesDropdown) setDropdownDisabled(false);
			else setDropdownDisabled(true);
		}, [
			props.errorState,
			noDatesDR,
			noDatesDropdown,
			props.startDate,
			props.endDate,
			props.startDateDropdown,
			props.endDateDropdown,
			props.onDateChange,
			dropdownOptionSelected
		]);
		if (props.timePeriod?.size > 0) for (const timeinput of props.timePeriod) {
			const dateLabel = dateRangeChipLabel(timeinput);
			if (dateLabel !== "") labelArray.push({
				dateLabel,
				startDate: timeinput.start_date,
				endDate: timeinput.end_date
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "date-range-option",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("form", {
					className: "date-range-wrapper",
					onSubmit: submitDates,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "date-range-column",
							children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(DatePicker, {
								value: props.startDate,
								type: "startDate",
								onDateChange: props.onDateChange,
								hideError: props.hideError,
								title: "start date",
								id: "date-range__startDate",
								min: "2007-10-01"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "date-range-column",
							children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(DatePicker, {
								value: props.endDate,
								type: "endDate",
								onDateChange: props.onDateChange,
								hideError: props.hideError,
								title: "end date",
								id: "date-range__endDate",
								min: "2007-10-01"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(sc, {
							copy: "Add",
							buttonTitle: "Add",
							buttonSize: "sm",
							buttonType: "primary",
							backgroundColor: "light",
							disabled: drDisabled,
							onClick: submitDates
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
					className: "date-range-option__dropdown-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
						className: "date-range-option__dropdown-section-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "date-range-option__dropdown-section-label",
							children: "Date Ranges"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
						className: "date-range-option__dropdown-section-bottom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "date-range-option__dropdown-section-picker-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(fc, {
								leftIcon: "",
								size: "sm",
								options: dropdownOptions,
								enabled: true,
								selectedOption: dropdownOptions?.length ? dropdownOptions?.find((obj) => obj.value === selectedDropdownOption)?.name : `${selectedDropdownOption}`,
								sortFn
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(sc, {
							copy: "Add",
							buttonTitle: "Add",
							buttonSize: "sm",
							buttonType: "primary",
							backgroundColor: "light",
							disabled: dropdownDisabled,
							onClick: submitDatesDropdown
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
					className: "selected-filters",
					id: "selected-date-range",
					role: "status",
					children: labelArray.map(({ dateLabel, startDate, endDate }, index) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ShownValue, {
						label: dateLabel,
						removeValue: (e) => localRemoveDateRange(startDate, endDate, e)
					}, index))
				})
			]
		});
	};
	DateRange.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/FiscalYearChip.jsx
var import_jsx_runtime$15, propTypes$11, FiscalYearChip;
var init_FiscalYearChip = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$11 = {
		year: PropTypes.string,
		saveSelectedYear: PropTypes.func,
		selectedFY: PropTypes.object
	};
	FiscalYearChip = ({ year, saveSelectedYear, selectedFY }) => {
		const saveYear = () => {
			saveSelectedYear(year);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "fy-chip-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(sc, {
				copy: `FY ${year.toString()}`,
				buttonTitle: `FY ${year.toString()}`,
				buttonSize: "sm",
				buttonType: "tertiary",
				backgroundColor: "light",
				additionalClassnames: selectedFY.has(year) ? "selected" : "",
				onClick: saveYear
			})
		});
	};
	FiscalYearChip.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/AllFiscalYearsWithChips.jsx
var import_jsx_runtime$14, propTypes$10, AllFiscalYearsWithChips;
var init_AllFiscalYearsWithChips = __esmMin((() => {
	init_FiscalYearChip();
	import_jsx_runtime$14 = require_jsx_runtime();
	propTypes$10 = {
		timePeriods: PropTypes.array,
		selectedFY: PropTypes.object,
		updateFilter: PropTypes.func
	};
	AllFiscalYearsWithChips = ({ timePeriods, selectedFY, updateFilter }) => {
		const saveSelectedYear = (year) => {
			let newYears;
			if (selectedFY.has(year)) newYears = selectedFY.delete(year);
			else newYears = selectedFY.add(year);
			updateFilter({ fy: newYears });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "fiscal-years-with-chips",
			children: timePeriods.map((year) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(FiscalYearChip, {
				selectedFY,
				year,
				saveSelectedYear
			}, `filter-fy-${year}`))
		});
	};
	AllFiscalYearsWithChips.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/DateRangeError.jsx
var import_jsx_runtime$13, propTypes$9, DateRangeError;
var init_DateRangeError = __esmMin((() => {
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$9 = {
		header: PropTypes.string,
		message: PropTypes.string
	};
	DateRangeError = ({ header = "", message = "" }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "date-range__warning",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
				className: "date-range__invalid",
				children: header || "Invalid search"
			}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("li", { children: message }) })]
		});
	};
	DateRangeError.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/search/filters/tooltips/AdvancedSearchTooltip.jsx
var import_jsx_runtime$12, NewAwardsTooltip, KeyWordTooltip;
var init_AdvancedSearchTooltip = __esmMin((() => {
	init_GlobalConstants();
	import_jsx_runtime$12 = require_jsx_runtime();
	NewAwardsTooltip = () => /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: "advanced-search-tt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h3", {
			className: "advanced-search-tt__header",
			children: "Show New Awards Only"
		}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "advanced-search-tt__body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Either a fiscal year has to be selected or a date range has to be specified in order for the “Show New Awards Only” checkbox to become available. Please note that combining the “All Fiscal Years” filter with the “Show New Awards Only” checkbox will return all new awards for all fiscal years." }),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
					"Selecting the “Show New Awards Only” checkbox will display any prime award whose ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "base transaction action date" }),
					" (the date of the first transaction of a prime award) falls within the selected time period."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
					"If not selected, search results in the Table tab will display prime awards whose ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "base transaction action date" }),
					" and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "latest transaction action date" }),
					" (the date of the latest transaction of a prime award) overlap in any way with the selected time period. For example, for the selected time period of Mar. 1-31, 2022, you would see results in the Table tab for an award with a ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "base transaction action date" }),
					" of Jan. 1, 2022 and a ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "latest transaction action date" }),
					" of Dec. 31, 2022, even if there is no transaction activity for that award within the period of Mar. 1-31, 2022."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Since there is no concept of “subaward modification” or “subaward summary level” in the FFATA Subaward Reporting System (FSRS) data model, all subawards are considered “new.” Therefore, the “Show New Awards Only” checkbox becomes disabled and has no effect on searches for subawards." })
			]
		})]
	});
	KeyWordTooltip = () => /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: "advanced-search-tt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h3", {
			className: "advanced-search-tt__header",
			children: "Keyword"
		}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "advanced-search-tt__body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
				"The ",
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "Keyword" }),
				" field currently matches against the following attributes:"
			] }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("ul", {
				className: "advanced-search-tt__list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "Recipient Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "Recipient UEI" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "Recipient Parent UEI" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("li", { children: [
						"Recipient ",
						globalConstants.DUNS_LABEL,
						"DUNS"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("li", { children: [
						"Recipient Parent ",
						globalConstants.DUNS_LABEL,
						"DUNS"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "NAICS code and description" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "PSC code and description" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "PIID (prime award only)" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "FAIN (prime award only)" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "URI" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("li", { children: "Award Description" })
				]
			})]
		})]
	});
}));
//#endregion
//#region src/js/context/TooltipContext.js
/**
* TooltipContext.js
* Created on 12/11/2025 by Josue Aguilar
*/
var TooltipContext;
var init_TooltipContext = __esmMin((() => {
	TooltipContext = createContext(null);
}));
//#endregion
//#region src/js/components/search/filters/ContextTooltip.jsx
/**
* ContextTooltip.jsx
* Created on 12/11/2025 by Josue Aguilar
*/
var import_jsx_runtime$11, propTypes$8, ContextTooltip;
var init_ContextTooltip = __esmMin((() => {
	init_dist();
	init_TooltipContext();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$8 = {
		tooltip: PropTypes.element,
		icon: PropTypes.string,
		offsetTop: PropTypes.string,
		offsetLeft: PropTypes.string
	};
	ContextTooltip = ({ tooltip, icon = "info-circle", offsetTop = -12, offsetLeft = 30 }) => {
		const setTooltipData = useContext(TooltipContext);
		const ref = useRef(null);
		const closeTooltip = () => {
			setTooltipData({
				top: 0,
				left: 0,
				display: "none",
				tooltip: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(import_jsx_runtime$11.Fragment, {})
			});
		};
		const openTooltip = () => {
			const { top, left } = ref.current.getBoundingClientRect();
			setTooltipData({
				top: top + offsetTop,
				left: left + offsetLeft,
				display: "unset",
				tooltip
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "new-tooltip-spacer",
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
				icon,
				tabIndex: "0",
				"aria-label": "Tooltip Hover Wrapper",
				"aria-hidden": false,
				className: "new-tooltip__icon",
				onBlur: closeTooltip,
				onFocus: openTooltip,
				onMouseEnter: openTooltip,
				onMouseLeave: closeTooltip,
				onClick: openTooltip,
				ref
			})
		});
	};
	ContextTooltip.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/NewAwardsFilter.jsx
var import_jsx_runtime$10, propTypes$7, NewAwardsFilter;
var init_NewAwardsFilter = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_AdvancedSearchTooltip();
	init_ContextTooltip();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$7 = { activeClassDR: PropTypes.string };
	NewAwardsFilter = ({ activeClassDR }) => {
		const { filterNewAwardsOnlySelected, filterNewAwardsOnlyActive } = useSelector((state) => state.filters);
		const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
		const dispatch = useDispatch();
		const newAwardsClick = (e) => {
			dispatch(updateNewAwardsOnlySelected(e.target.checked));
		};
		const enterKeyToggleHandler = (e) => {
			if (e.key === "Enter") dispatch(updateNewAwardsOnlySelected(!filterNewAwardsOnlySelected));
		};
		const isSubAward = spendingLevel === "subawards";
		const checkboxClassname = `new-awards-checkbox ${isSubAward || !filterNewAwardsOnlyActive ? "not-active" : ""}`;
		const spanClassname = `new-awards-label ${isSubAward || !filterNewAwardsOnlyActive ? "not-active" : ""}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: `new-awards-wrapper ${activeClassDR}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("label", {
				htmlFor: "new-awards-checkbox",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("input", {
					type: "checkbox",
					className: checkboxClassname,
					id: "new-awards-checkbox",
					value: "new-awards-checkbox",
					disabled: isSubAward || !filterNewAwardsOnlyActive,
					checked: filterNewAwardsOnlySelected && !isSubAward,
					onChange: newAwardsClick,
					onKeyUp: (e) => enterKeyToggleHandler(e)
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: spanClassname,
					children: "Show New Awards Only"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ContextTooltip, { tooltip: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(NewAwardsTooltip, {}) })]
		});
	};
	NewAwardsFilter.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/search/filters/timePeriod/TimePeriod.jsx
/**
* TimePeriod.jsx
* Created by Emily Gullo 11/03/2016
**/
var import_immutable, import_jsx_runtime$9, dayjs, isSameOrAfter, propTypes$6, TimePeriod;
var init_TimePeriod = __esmMin((() => {
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_FilterTabs();
	init_usePrevious();
	init_DateRange();
	init_AllFiscalYearsWithChips();
	init_DateRangeError();
	init_NewAwardsFilter();
	import_jsx_runtime$9 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	isSameOrAfter = require_isSameOrAfter();
	dayjs.extend(isSameOrAfter);
	propTypes$6 = {
		filterTimePeriodFY: PropTypes.instanceOf(import_immutable.Set),
		filterTimePeriodStart: PropTypes.string,
		filterTimePeriodEnd: PropTypes.string,
		filterTimePeriodType: PropTypes.string,
		filterTime_Period: PropTypes.object,
		label: PropTypes.string,
		timePeriods: PropTypes.array,
		activeTab: PropTypes.string,
		updateFilter: PropTypes.func,
		updateGenericFilter: PropTypes.func,
		updateNewAwardsOnlyActive: PropTypes.func,
		updateNaoActiveFromFyOrDateRange: PropTypes.func,
		changeTab: PropTypes.func,
		disableDateRange: PropTypes.bool,
		dirtyFilters: PropTypes.symbol,
		federalAccountPage: PropTypes.bool
	};
	TimePeriod = ({ filterTimePeriodFY, filterTimePeriodStart, filterTimePeriodEnd, filterTimePeriodType, filterTime_Period: filterTimePeriod, label, timePeriods, activeTab, updateFilter, updateGenericFilter, updateNewAwardsOnlyActive, updateNaoActiveFromFyOrDateRange, changeTab, disableDateRange = false, dirtyFilters, federalAccountPage }) => {
		const [startDateUI, setStartDateUI] = useState(null);
		const [endDateUI, setEndDateUI] = useState(null);
		const [startDateDropdown, setStartDateDropdown] = useState(null);
		const [endDateDropdown, setEndDateDropdown] = useState(null);
		const [showError, setShowError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [header, setHeader] = useState("");
		const [dateRangeChipRemoved, setDateRangeChipRemoved] = useState(false);
		const prevProps = usePrevious({
			filterTimePeriodFY,
			filterTimePeriod
		});
		const prevState = usePrevious({
			startDateUI,
			endDateUI,
			startDateDropdown,
			endDateDropdown
		});
		const prepopulateDatePickers = () => {
			if ((!filterTimePeriodStart || !filterTimePeriodEnd) && filterTimePeriodType !== "dr") return;
			const startDate = dayjs(null, "YYYY-MM-DD");
			const endDate = dayjs(null, "YYYY-MM-DD");
			if (startDate.isValid() && endDate.isValid()) {
				setStartDateUI(startDate);
				setEndDateUI(endDate);
			}
		};
		const synchronizeDatePickers = (nextProps) => {
			let datesChanged = false;
			const newState = {};
			if (nextProps.filterTimePeriodStart !== filterTimePeriodStart) {
				const startDate = dayjs(nextProps.filterTimePeriodStart, "YYYY-MM-DD");
				if (startDate.isValid()) {
					datesChanged = true;
					newState.startDateUI = startDate;
				} else {
					datesChanged = true;
					newState.startDateUI = null;
				}
			}
			if (nextProps.filterTimePeriodEnd !== filterTimePeriodEnd) {
				const endDate = dayjs(nextProps.filterTimePeriodEnd, "YYYY-MM-DD");
				if (endDate.isValid()) {
					datesChanged = true;
					newState.endDateUI = endDate;
				} else if (filterTimePeriodEnd) {
					datesChanged = true;
					newState.endDateUI = null;
				}
			}
			if (datesChanged && newState?.startDateUI) setStartDateUI(newState.startDateUI);
			else if (datesChanged && newState?.endDateUI) setEndDateUI(newState.endDateUI);
		};
		const handleDateChange = useCallback((date, dateType) => {
			let value = dayjs(date);
			if (!date) value = null;
			switch (dateType) {
				case "startDate":
					setStartDateUI(value);
					break;
				case "endDate":
					setEndDateUI(value);
					break;
				case "startDateDropdown":
					setStartDateDropdown(value);
					break;
				case "endDateDropdown":
					setEndDateDropdown(value);
					break;
			}
		}, []);
		const removeDateRange = useCallback((newValue) => {
			setDateRangeChipRemoved(true);
			setStartDateUI(null);
			setEndDateUI(null);
			setStartDateDropdown(null);
			setEndDateDropdown(null);
			updateGenericFilter({
				type: "time_period",
				value: newValue?.size ? newValue : new import_immutable.Set()
			});
			updateGenericFilter({
				type: "timePeriodType",
				value: activeTab
			});
		}, [activeTab, updateGenericFilter]);
		const showErrorFunc = useCallback((error, message) => {
			setShowError(true);
			setHeader(error);
			setErrorMessage(message);
		}, []);
		const hideError = useCallback(() => {
			setShowError(false);
			setHeader("");
		}, []);
		let errorDetails;
		let showFilter;
		let activeClassDR = "";
		if (showError && activeTab === "dr" && header !== "" && errorMessage !== "") {
			errorDetails = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DateRangeError, {
				header,
				message: errorMessage
			});
			activeClassDR = "inactive";
		}
		if (activeTab === "fy" && !dateRangeChipRemoved) showFilter = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(AllFiscalYearsWithChips, {
			updateFilter,
			timePeriods,
			selectedFY: filterTimePeriodFY
		});
		else {
			showFilter = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DateRange, {
				label,
				datePlaceholder: "",
				startingTab: 1,
				startDate: startDateUI,
				endDate: endDateUI,
				startDateDropdown,
				endDateDropdown,
				timePeriod: filterTimePeriod,
				onDateChange: handleDateChange,
				showError: showErrorFunc,
				errorState: showError,
				hideError,
				removeDateRange,
				updateFilter,
				header,
				setStartDate: setStartDateUI,
				setEndDate: setEndDateUI
			});
			activeClassDR = "";
		}
		if (disableDateRange) activeClassDR = "hidden";
		const tabLabels = [{
			internal: "fy",
			label: "Fiscal years",
			title: "Fiscal years"
		}, {
			internal: "dr",
			label: "Custom dates",
			title: "Custom dates"
		}];
		const toggleTab = (e) => {
			setDateRangeChipRemoved(false);
			if (activeTab === "fy" && e.target.textContent.trim() !== "Fiscal years" || activeTab === "dr" && e.target.textContent.trim() !== "Custom dates") changeTab(activeTab === "fy" ? "dr" : "fy");
		};
		const additonalText = activeTab === "fy" ? "Search by fiscal year (FY), a 12-month span from October 1 to September 30" : "Select a start/end date or choose from the pre-selected date ranges";
		useEffect(() => {
			prepopulateDatePickers();
		}, []);
		useEffect(() => {
			synchronizeDatePickers({
				filterTimePeriodStart,
				filterTimePeriodEnd
			});
		}, [filterTimePeriodStart, filterTimePeriodEnd]);
		useEffect(() => {
			if (prevProps?.filterTimePeriodFY !== filterTimePeriodFY) {
				updateNewAwardsOnlyActive(!!filterTimePeriodFY?.size);
				updateNaoActiveFromFyOrDateRange(!!filterTimePeriodFY?.size);
			} else if (prevProps?.filterTime_Period !== filterTimePeriod) {
				updateNewAwardsOnlyActive(false);
				updateNaoActiveFromFyOrDateRange(false);
			}
			if (dirtyFilters) {
				updateNewAwardsOnlyActive(true);
				updateNaoActiveFromFyOrDateRange(true);
			} else if ((prevState?.startDateUI !== startDateUI || prevState?.endDateUI !== endDateUI) && !startDateUI && !endDateUI) {
				updateNewAwardsOnlyActive(false);
				updateNaoActiveFromFyOrDateRange(false);
			} else if ((prevState?.startDateDropdown !== startDateDropdown || prevState?.endDateDropdown !== endDateDropdown) && !startDateDropdown && !endDateDropdown) {
				updateNewAwardsOnlyActive(false);
				updateNaoActiveFromFyOrDateRange(false);
			}
		}, [
			filterTimePeriodFY,
			filterTimePeriod,
			startDateUI,
			endDateUI,
			startDateDropdown,
			endDateDropdown
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "tab-filter-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "filter-item-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "filter-description",
						children: additonalText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FilterTabs, {
						labels: tabLabels,
						switchTab: toggleTab,
						active: activeTab
					}),
					showFilter,
					errorDetails,
					!federalAccountPage && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(NewAwardsFilter, { activeClassDR })
				]
			})
		});
	};
	TimePeriod.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/search/resultsView/categories/SpendingByCategoriesChart.jsx
/**
* SpendingByCategoriesChart.jsx
* Created by Brian Petway 03/12/2024
**/
var import_jsx_runtime$8, propTypes$5, tickFormatter, SpendingByCategoriesChart;
var init_SpendingByCategoriesChart = __esmMin((() => {
	init_es6();
	init_moneyFormatter();
	init_Analytics();
	init_mobileBreakpoints();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$5 = {
		dataSeries: PropTypes.array,
		labelSeries: PropTypes.array,
		descriptions: PropTypes.array,
		linkSeries: PropTypes.array,
		hash: PropTypes.string,
		scope: PropTypes.string
	};
	tickFormatter = (value, isMobile) => {
		const limit = isMobile ? 34 : 36;
		if (value.length < limit) return {
			text: value,
			isOneLine: value === value.toUpperCase() ? value.length < 24 : value.length < 27
		};
		const newValue = value.replace("Department", "Dept");
		if (newValue.length <= limit) return {
			text: newValue,
			isOneLine: false
		};
		return {
			text: `${newValue.substring(0, limit)}...`,
			isOneLine: false
		};
	};
	SpendingByCategoriesChart = ({ dataSeries, labelSeries, descriptions, linkSeries, hash, scope }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
		const [isSmMobile, setIsSmMobile] = useState(window.innerWidth < 576);
		const labelWidthVar = isMobile ? 400 : 175;
		const dataStuff = [];
		if (dataSeries?.length === labelSeries?.length) for (let i = 0; i < dataSeries.length; i++) {
			const formattedValue = formatMoneyWithUnitsShortLabel(dataSeries[i], 2);
			dataStuff.push({
				value: dataSeries[i],
				label: labelSeries[i],
				desc: descriptions[i],
				link: linkSeries[i],
				barLabel: formattedValue
			});
		}
		const onClickHandler = (linkName) => {
			Analytics.event({
				category: `Section categories: ${scope}`,
				action: `Clicked ${linkName}`,
				label: hash
			});
		};
		const CustomTick = (args) => {
			const { x, y, payload, link } = args;
			const formattedText = tickFormatter(payload.value, isSmMobile);
			const translateY = () => {
				if (isMobile) return y - 20;
				if (formattedText.isOneLine) return y + 4;
				return y + 12;
			};
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("g", {
				transform: `translate(${x - 8},${translateY()})`,
				children: link[payload.index].link ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("a", {
					href: `${link[payload.index].link}`,
					onClick: () => onClickHandler(payload.value),
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Text, {
						textAnchor: isMobile ? "start" : "end",
						fontSize: 14,
						width: isMobile ? labelWidthVar : labelWidthVar + 16,
						fill: "#2378C3",
						lineHeight: 17.5,
						children: formattedText.text
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Text, {
					textAnchor: isMobile ? "start" : "end",
					fontSize: 14,
					width: isMobile ? labelWidthVar : labelWidthVar + 16,
					fill: "#5c5c5c",
					lineHeight: 17.5,
					children: formattedText.text
				})
			});
		};
		const CustomEndLabels = (args) => {
			const { x, y, value, width } = args;
			const translateX = isSmMobile ? 2 : 8;
			let anchorString = "start";
			let negativeOffset = 0;
			if (value[0] === "-") {
				anchorString = "end";
				negativeOffset = -16;
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("g", {
				transform: `translate(${x + width + translateX + negativeOffset}, ${y + 15})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Text, {
					textAnchor: anchorString,
					fontSize: 14,
					fontWeight: 600,
					fill: "#07648D",
					width: 20,
					children: value
				})
			});
		};
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsMobile(newWidth < 768);
					setIsSmMobile(newWidth < 576);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ResponsiveContainer, {
			width: "100%",
			height: isMobile ? 650 : 600,
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(BarChart, {
				data: dataStuff,
				layout: "vertical",
				barSize: 21,
				margin: {
					top: 10,
					right: 60,
					left: 8,
					bottom: 10
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(XAxis, {
						type: "number",
						domain: [(dataMin) => dataMin < 0 ? dataMin * 1.15 : dataMin, "auto"],
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(YAxis, {
						type: "category",
						dataKey: "label",
						stroke: "#dfe1e2",
						mirror: isMobile,
						width: labelWidthVar,
						tickLine: false,
						tick: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(CustomTick, { link: dataStuff })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Bar, {
						dataKey: "value",
						fill: "#07648d",
						activeBar: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(LabelList, {
							dataKey: "barLabel",
							content: CustomEndLabels
						})
					})
				]
			})
		}) });
	};
	SpendingByCategoriesChart.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/dataMapping/search/awardTableColumnTypes.js
var awardTableColumnTypes;
var init_awardTableColumnTypes = __esmMin((() => {
	awardTableColumnTypes = {
		"Award ID": "string",
		"Recipient Name": "string",
		"Start Date": "date",
		"End Date": "date",
		"Last Date to Order": "date",
		"Award Amount": "currency",
		"Total Outlays": "currency",
		"COVID-19 Outlays": "currency",
		"COVID-19 Obligations": "currency",
		"Infrastructure Obligations": "currency",
		"Infrastructure Outlays": "currency",
		"Funding Agency": "string",
		"Funding Sub Agency": "string",
		"Contract Award Type": "string",
		"Contract Description": "string",
		"Signed Date": "date",
		"Potential Award Amount": "currency",
		"Awarding Agency": "string",
		"Awarding Sub Agency": "string",
		"Awarding Office": "string",
		"Funding Office": "string",
		"Recipient Address Line 1": "string",
		"Recipient Address Line 2": "string",
		"Recipient Address Line 3": "string",
		"Recipient Country": "string",
		"Recipient State": "string",
		"Recipient Province": "string",
		"Recipient County": "string",
		"Recipient City": "string",
		"Recipient Zip Code": "string",
		"Place of Performance City": "string",
		"Place of Performance Zip Code": "string",
		"Place of Performance Country": "string",
		"Place of Performance State": "string",
		"Place of Performance Province": "string",
		"Contract Pricing Type": "string",
		"Recipient Congressional District": "string",
		"Recipient Phone Number": "string",
		"Recipient Fax Number": "string",
		"Place of Performance Congressional District": "string",
		"Place of Performance County": "string",
		"Parent Award ID": "string",
		"IDV Type": "string",
		"IDC Type": "string",
		"IDV Agency Identifier": "string",
		"Multiple or Single Award IDV": "string",
		"Solicitation ID": "string",
		"Solicitation Procedures": "string",
		"Number of Offers Received": "number",
		"Extent Competed": "string",
		"Set-Aside Type": "string",
		"Commercial Item Acquisition Procedures": "string",
		"Commercial Item Test Program": "string",
		"Evaluated Preference": "string",
		"FedBizOpps": "string",
		"Small Business Competitiveness Demonstration Program": "string",
		"PSC Code": "string",
		"NAICS Code": "string",
		"NAICS Description": "string",
		"DoD Claimant Program Code": "string",
		"Program, System, or Equipment Code": "string",
		"Information Technology Commercial Item Category": "string",
		"Sea Transportation": "string",
		"Clinger-Cohen Act Compliant": "string",
		"Subject To Construction Wage Rate Requirements": "string",
		"Subject To Labor Standards": "string",
		"Subject To Materials, Supplies, Articles & Equip": "string",
		"Consolidated Contract": "string",
		"Cost or Pricing Data": "string",
		"Fair Opportunity Limited Sources": "string",
		"Foreign Funding": "string",
		"Interagency Contracting Authority": "string",
		"Major program": "string",
		"Multi Year Contract": "string",
		"Price Evaluation Adjustment Preference Percent Difference": "string",
		"Program Acronym": "string",
		"Purchase Card as Payment Method": "string",
		"Subcontracting Plan": "string",
		"Issued Date": "date",
		"Loan Value": "currency",
		"Subsidy Cost": "currency",
		"Sub-Award ID": "string",
		"Sub-Award Type": "string",
		"Action Date": "date",
		"Sub-Awardee Name": "string",
		"Sub-Award Amount": "currency",
		"Prime Award ID": "string",
		"Prime Recipient Name": "string",
		"Transaction Amount": "currency"
	};
}));
//#endregion
//#region src/js/dataMapping/search/awardTableColumns.jsx
var defaultWidth20, customWidth25, customWidth30, customWidth40, covidColor, infrastructureColor, defaultContract, defaultIdvColumns, defaultGrant, defaultDirectPayment, defaultLoan, defaultOther, descriptionCol, recipientUEICol, recipientLocationCol, primaryPOPCol, covidDefCCol, covidObligationsCol, covidOutlaysCol, infrastructureObligationsCol, infrastructureOutlaysCol, defaultSub, additionalNaicsCol, additionalPscCol, additionalAssistanceListingCol, defaultSubContracts, defaultSubGrants, defaultTransactionContract, defaultTransactionFA, defaultColumns, defaultSort, apiFieldByTableColumnName;
var init_awardTableColumns = __esmMin((() => {
	defaultWidth20 = 200;
	customWidth25 = 250;
	customWidth30 = 300;
	customWidth40 = 400;
	covidColor = "#6E338E";
	infrastructureColor = "#2D6878";
	defaultContract = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Award Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Total Outlays",
			right: true,
			displayName: "Outlays",
			customWidth: defaultWidth20
		},
		{
			title: "Contract Award Type",
			displayName: "Award Type",
			customWidth: customWidth30
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Start Date",
			displayName: "Period of Performance Start",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "End Date",
			displayName: "Period of Performance End",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "NAICS",
			displayName: "North American Industry Classification System (NAICS)",
			customWidth: customWidth40
		},
		{
			title: "PSC",
			displayName: "Product and Service Code (PSC)",
			customWidth: customWidth40
		}
	];
	defaultIdvColumns = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Award Amount",
			right: true,
			displayName: "Total Obligations to Date",
			customWidth: customWidth25
		},
		{
			title: "Total Outlays",
			right: true,
			displayName: "Total Outlays to Date",
			customWidth: customWidth25
		},
		{
			title: "Contract Award Type",
			displayName: "Award Type",
			customWidth: customWidth30
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Start Date",
			displayName: "Period of Performance Start",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "Last Date to Order",
			displayName: "Ordering Period End Date",
			customWidth: customWidth25
		},
		{
			title: "NAICS",
			displayName: "North American Industry Classification System (NAICS)",
			customWidth: customWidth40
		},
		{
			title: "PSC",
			displayName: "Product and Service Code (PSC)",
			customWidth: customWidth40
		}
	];
	defaultGrant = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Award Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Total Outlays",
			right: true,
			displayName: "Outlays",
			customWidth: defaultWidth20
		},
		{
			title: "Award Type",
			displayName: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Start Date",
			displayName: "Period of Performance Start",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "End Date",
			displayName: "Period of Performance End",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "Assistance Listings",
			displayName: "Assistance Listing",
			customWidth: customWidth40
		}
	];
	defaultDirectPayment = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Award Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Total Outlays",
			right: true,
			displayName: "Outlays",
			customWidth: defaultWidth20
		},
		{
			title: "Award Type",
			displayName: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Start Date",
			displayName: "Period of Performance Start",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "End Date",
			displayName: "Period of Performance End",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "Assistance Listings",
			displayName: "Assistance Listing",
			customWidth: customWidth40
		}
	];
	defaultLoan = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Subsidy Cost",
			displayName: "Original Subsidy Cost",
			subtitle: "(Total Obligations To Date)",
			customWidth: defaultWidth20,
			right: true
		},
		{
			title: "Loan Value",
			right: true,
			displayName: "Face Value of Loan",
			customWidth: defaultWidth20
		},
		{
			title: "Award Type",
			displayName: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Issued Date",
			customWidth: defaultWidth20
		},
		{
			title: "Assistance Listings",
			displayName: "Assistance Listing",
			customWidth: customWidth40
		}
	];
	defaultOther = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Award Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Total Outlays",
			right: true,
			displayName: "Outlays",
			customWidth: defaultWidth20
		},
		{
			title: "Contract Award Type",
			displayName: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Start Date",
			displayName: "Period of Performance Start",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "End Date",
			displayName: "Period of Performance End",
			subtitle: "(Period of Performance)",
			customWidth: customWidth25
		},
		{
			title: "Assistance Listings",
			displayName: "Assistance Listing",
			customWidth: customWidth40
		}
	];
	descriptionCol = {
		title: "Description",
		displayName: "Award Description",
		customWidth: customWidth40
	};
	recipientUEICol = {
		title: "Recipient UEI",
		customWidth: defaultWidth20
	};
	recipientLocationCol = {
		title: "Recipient Location",
		customWidth: customWidth30
	};
	primaryPOPCol = {
		title: "Primary Place of Performance",
		customWidth: customWidth30
	};
	covidDefCCol = {
		title: "def_codes",
		displayName: "Disaster Emergency Fund Codes (DEFCs)",
		customWidth: customWidth30
	};
	covidObligationsCol = {
		title: "COVID-19 Obligations",
		background: covidColor,
		customWidth: customWidth25,
		right: true
	};
	covidOutlaysCol = {
		title: "COVID-19 Outlays",
		background: covidColor,
		customWidth: customWidth25,
		right: true
	};
	infrastructureObligationsCol = {
		title: "Infrastructure Obligations",
		background: infrastructureColor,
		customWidth: customWidth25,
		right: true
	};
	infrastructureOutlaysCol = {
		title: "Infrastructure Outlays",
		background: infrastructureColor,
		customWidth: customWidth25,
		right: true
	};
	[
		defaultContract,
		defaultGrant,
		defaultLoan,
		defaultDirectPayment,
		defaultOther,
		defaultIdvColumns
	].forEach((tab) => {
		tab.splice(4, 0, descriptionCol);
		tab.splice(6, 0, recipientUEICol);
		tab.splice(7, 0, recipientLocationCol);
		tab.splice(8, 0, primaryPOPCol);
		tab.splice(9, 0, covidDefCCol);
		tab.splice(10, 0, covidObligationsCol);
		tab.splice(11, 0, covidOutlaysCol);
		tab.splice(12, 0, infrastructureObligationsCol);
		tab.splice(13, 0, infrastructureOutlaysCol);
	});
	defaultSub = [
		{
			title: "Sub-Award ID",
			displayName: "Subaward ID",
			customWidth: defaultWidth20
		},
		{
			title: "Sub-Awardee Name",
			displayName: "Subrecipient Name",
			customWidth: customWidth30
		},
		{
			title: "Sub-Award Amount",
			right: true,
			displayName: "Subaward Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Action Date",
			displayName: "Subaward Action Date",
			customWidth: defaultWidth20
		},
		{
			title: "Sub-Award Description",
			displayName: "Subaward Description",
			customWidth: customWidth40
		},
		{
			title: "Sub-Recipient UEI",
			displayName: "Subrecipient UEI",
			customWidth: defaultWidth20
		},
		{
			title: "Sub-Recipient Location",
			displayName: "Subrecipient Location",
			customWidth: customWidth30
		},
		{
			title: "Sub-Award Primary Place of Performance",
			displayName: "Subaward Primary Place of Performance",
			customWidth: customWidth30
		},
		{
			title: "Sub-Award Type",
			displayName: "Subaward Type",
			customWidth: defaultWidth20
		},
		{
			title: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Prime Recipient Name",
			displayName: "Prime Award Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Prime Award Recipient UEI",
			customWidth: customWidth25
		},
		{
			title: "Awarding Agency",
			displayName: "Prime Award Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Prime Award Awarding Subagency",
			customWidth: customWidth30
		}
	];
	additionalNaicsCol = {
		title: "NAICS",
		displayName: "North American Industry Classification System (NAICS)",
		customWidth: customWidth40
	};
	additionalPscCol = {
		title: "PSC",
		displayName: "Product and Service Code (PSC)",
		customWidth: customWidth40
	};
	additionalAssistanceListingCol = {
		title: "Assistance Listing",
		customWidth: customWidth40
	};
	defaultSubContracts = defaultSub.concat([additionalNaicsCol, additionalPscCol]);
	defaultSubGrants = defaultSub.concat([additionalAssistanceListingCol]);
	defaultTransactionContract = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Mod",
			displayName: "Modification Number",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Transaction Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Action Date",
			customWidth: defaultWidth20
		},
		{
			title: "Transaction Description",
			customWidth: customWidth40
		},
		{
			title: "Action Type",
			customWidth: defaultWidth20
		},
		{
			title: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient UEI",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Location",
			customWidth: customWidth30
		},
		{
			title: "Primary Place of Performance",
			customWidth: customWidth30
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "NAICS",
			displayName: "North American Industry Classification System (NAICS)",
			customWidth: customWidth40
		},
		{
			title: "PSC",
			displayName: "Product and Service Code (PSC)",
			customWidth: customWidth40
		}
	];
	defaultTransactionFA = [
		{
			title: "Award ID",
			displayName: "Prime Award ID",
			customWidth: defaultWidth20
		},
		{
			title: "Mod",
			displayName: "Modification Number",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Name",
			customWidth: customWidth30
		},
		{
			title: "Transaction Amount",
			right: true,
			displayName: "Obligations",
			customWidth: defaultWidth20
		},
		{
			title: "Action Date",
			customWidth: defaultWidth20
		},
		{
			title: "Transaction Description",
			customWidth: customWidth40
		},
		{
			title: "Action Type",
			customWidth: defaultWidth20
		},
		{
			title: "Award Type",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient UEI",
			customWidth: defaultWidth20
		},
		{
			title: "Recipient Location",
			customWidth: customWidth30
		},
		{
			title: "Primary Place of Performance",
			customWidth: customWidth30
		},
		{
			title: "Awarding Agency",
			customWidth: customWidth30
		},
		{
			title: "Awarding Sub Agency",
			displayName: "Awarding Subagency",
			customWidth: customWidth30
		},
		{
			title: "Assistance Listing",
			customWidth: customWidth40
		}
	];
	defaultColumns = (type) => {
		return {
			contracts: defaultContract,
			grants: defaultGrant,
			direct_payments: defaultDirectPayment,
			loans: defaultLoan,
			other: defaultOther,
			idvs: defaultIdvColumns,
			subcontracts: defaultSubContracts,
			subgrants: defaultSubGrants,
			transaction_contracts: defaultTransactionContract,
			transaction_grants: defaultTransactionFA,
			transaction_direct_payments: defaultTransactionFA,
			transaction_loans: defaultTransactionFA,
			transaction_other: defaultTransactionFA,
			transaction_idvs: defaultTransactionContract
		}[type];
	};
	defaultSort = (type) => {
		return {
			contracts: "Award Amount",
			grants: "Award Amount",
			direct_payments: "Award Amount",
			loans: "Subsidy Cost",
			other: "Award Amount",
			idvs: "Award Amount",
			subcontracts: "Sub-Award Amount",
			subgrants: "Sub-Award Amount",
			transaction_contracts: "Transaction Amount",
			transaction_grants: "Transaction Amount",
			transaction_direct_payments: "Transaction Amount",
			transaction_loans: "Transaction Amount",
			transaction_other: "Transaction Amount",
			transaction_idvs: "Transaction Amount"
		}[type];
	};
	apiFieldByTableColumnName = {
		DEFC: "def_codes",
		Description: "Description"
	};
}));
//#endregion
//#region src/js/helpers/locationFormatter.js
var pickLocationFormat;
var init_locationFormatter = __esmMin((() => {
	init_searchHelper();
	pickLocationFormat = (location) => {
		if (location?.address_line1 && location?.city_name && location?.state_code && location?.zip5) return `${convertToTitleCase(location.address_line1)}, ${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
		else if (location?.city_name && location?.state_code && location?.zip5) return `${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
		else if (location?.city_name && location?.state_code) return `${convertToTitleCase(location.city_name)}, ${location.state_code}`;
		else if (location?.state_name) return `${location.state_name}, ${location.location_country_code}`;
		else if (location?.city_name && location?.location_country_code) return `${convertToTitleCase(location.city_name)}, ${location.location_country_code}`;
		else if (location?.country_name) return convertToTitleCase(location.country_name);
		else if (location?.location_country_code) return location.location_country_code;
		return "--";
	};
}));
//#endregion
//#region src/js/helpers/search/table/tableUtilsHelper.js
var twoVariableFormat, getSubawardDataByPrimeId, getTransactionDataByPrimeId, getNestedTableData;
var init_tableUtilsHelper = __esmMin((() => {
	init_searchHelper();
	init_keywordHelper();
	init_awardType();
	init_SearchAwardsOperation();
	twoVariableFormat = (object, key1, key2) => {
		if (object?.[key1] && object?.[key2]) return `${object[key1]} - ${object[key2]}`;
		return "--";
	};
	getSubawardDataByPrimeId = (awardId, filters, paramsOptions) => {
		const searchParamsTemp = new SearchAwardsOperation();
		searchParamsTemp.fromState(filters);
		const requestFields = [
			"Sub-Award ID",
			"Sub-Awardee Name",
			"Sub-Award Amount",
			"Sub-Award Date",
			"Sub-Award Description",
			"Sub-Recipient UEI",
			"Sub-Recipient Location",
			"Sub-Award Primary Place of Performance",
			"Sub-Award Type",
			"Prime Award ID",
			"Prime Recipient Name",
			"Prime Award Recipient UEI",
			"Awarding Agency",
			"Awarding Sub Agency",
			"NAICS",
			"PSC",
			"recipient_id",
			"prime_award_recipient_id"
		];
		searchParamsTemp.awardType = subawardTypeGroups.subcontracts;
		if (!Object.prototype.hasOwnProperty.call(searchParamsTemp, "selectedAwardIDs")) searchParamsTemp.selectedAwardIDs = [];
		searchParamsTemp.selectedAwardIDs.push(awardId);
		const subSort = paramsOptions.subSort || {
			field: "Sub-Award Amount",
			direction: "desc"
		};
		const params = {
			filters: searchParamsTemp.toParams(),
			fields: requestFields,
			page: paramsOptions?.subPage || 1,
			limit: paramsOptions.subResultsLimit || 100,
			sort: subSort.field,
			order: subSort.direction,
			spending_level: "subawards",
			auditTrail: "Results Table - Spending by award search"
		};
		if (!params.filters.award_type_codes) return null;
		return performSpendingByAwardSearch(params);
	};
	getTransactionDataByPrimeId = (awardId, filters, paramsOptions) => {
		const searchParamsTemp = new SearchAwardsOperation();
		searchParamsTemp.fromState(filters);
		const requestFields = [
			"Award ID",
			"Mod",
			"Recipient Name",
			"Transaction Amount",
			"Action Date",
			"Transaction Description",
			"Action Type",
			"Award Type",
			"Recipient UEI",
			"Recipient Location",
			"Primary Place of Performance",
			"Awarding Agency",
			"awarding_agency_id",
			"recipient_id",
			"Awarding Sub Agency",
			"NAICS",
			"PSC",
			"Assistance Listing"
		];
		searchParamsTemp.awardType = transactionTypeGroups.transaction_contracts;
		if (!Object.prototype.hasOwnProperty.call(searchParamsTemp, "selectedAwardIDs")) searchParamsTemp.selectedAwardIDs = [];
		searchParamsTemp.selectedAwardIDs.push(awardId);
		const subSort = paramsOptions.subSort || {
			field: "Transaction Amount",
			direction: "desc"
		};
		const params = {
			filters: searchParamsTemp.toParams(),
			fields: requestFields,
			page: paramsOptions?.subPage || 1,
			limit: paramsOptions.subResultsLimit || 100,
			sort: subSort.field,
			order: subSort.direction,
			spending_level: "subawards",
			auditTrail: "Results Table - Spending by award search"
		};
		if (!params.filters.award_type_codes) return null;
		return performKeywordSearch(params);
	};
	getNestedTableData = (type, awardId, filters, paramsOptions) => {
		switch (type) {
			case "subawards": return getSubawardDataByPrimeId(awardId, filters, paramsOptions);
			case "transactions": return getTransactionDataByPrimeId(awardId, filters, paramsOptions);
			default: return null;
		}
	};
}));
//#endregion
//#region src/js/models/v2/search/ResultsTableRow.jsx
var import_jsx_runtime$7, ResultsTableRow;
var init_ResultsTableRow = __esmMin((() => {
	init_Analytics();
	init_moneyFormatter();
	init_locationFormatter();
	init_ReadMore();
	init_tableUtilsHelper();
	init_searchHelper();
	import_jsx_runtime$7 = require_jsx_runtime();
	ResultsTableRow = {
		clickHandler(linkName) {
			Analytics.event({
				category: "Section table",
				action: `Clicked ${linkName}`
			});
		},
		assistanceListingFormat(assistanceListing) {
			if (assistanceListing?.length === 1) {
				const listing = assistanceListing[0];
				return `${listing.cfda_number} - ${listing.cfda_program_title}`;
			} else if (assistanceListing?.length > 1) {
				const listings = [];
				assistanceListing.forEach((listing) => {
					listings.push(`${listing.cfda_number} - ${listing.cfda_program_title}`);
				});
				return listings.join(", ");
			}
			return "--";
		},
		populateLoan(data) {
			this.awardId = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.recipientName = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Recipient Name"]);
				},
				children: data["Recipient Name"]
			}) || "--";
			this.subsidyCost = formatMoneyWithPrecision(data["Subsidy Cost"], 2, "--");
			this.loanValue = formatMoneyWithPrecision(data["Loan Value"], 2, "--");
			this.description = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data.Description || "--",
				limit: 90
			});
			this.awardType = data["Contract Award Type"] || data["Award Type"] || "--";
			this.uei = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.defc = data.def_codes?.toString() || "--";
			this.covid19obligations = formatMoneyWithPrecision(data["COVID-19 Obligations"], 2, "--");
			this.covid19outlays = formatMoneyWithPrecision(data["COVID-19 Outlays"], 2, "--");
			this.infObligations = formatMoneyWithPrecision(data["Infrastructure Obligations"], 2, "--");
			this.infOutlays = formatMoneyWithPrecision(data["Infrastructure Outlays"], 2, "--");
			this.awardingAgency = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/agency/${data.agency_slug}`,
				onClick: () => {
					this.clickHandler(data["Awarding Agency"]);
				},
				children: data["Awarding Agency"]
			}) || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.issuedDate = data["Issued Date"] || "--";
			this.assistanceListing = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: this.assistanceListingFormat(data["Assistance Listings"]),
				limit: 90
			});
		},
		populateDirectPayment(data) {
			this.generated_internal_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.recipient_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Recipient Name"]);
				},
				children: data["Recipient Name"]
			}) || "--";
			this.awardAmount = formatMoneyWithPrecision(data["Award Amount"], 2, "--");
			this.totalOutlays = formatMoneyWithPrecision(data["Total Outlays"], 2, "--");
			this.description = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data.Description || "--",
				limit: 90
			});
			this.awardType = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data["Contract Award Type"] || data["Award Type"] || "--",
				limit: 65
			});
			this.recipientUEI = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.defc = data.def_codes?.toString() || "--";
			this.covid19obligations = formatMoneyWithPrecision(data["COVID-19 Obligations"], 2, "--");
			this.covid19outlays = formatMoneyWithPrecision(data["COVID-19 Outlays"], 2, "--");
			this.infObligations = formatMoneyWithPrecision(data["Infrastructure Obligations"], 2, "--");
			this.infOutlays = formatMoneyWithPrecision(data["Infrastructure Outlays"], 2, "--");
			this.awardingAgency = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/agency/${data.agency_slug}`,
				onClick: () => {
					this.clickHandler(data["Awarding Agency"]);
				},
				children: data["Awarding Agency"]
			}) || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.startDate = data["Start Date"] || "--";
			this.endDate = data["End Date"] || "--";
			this.assistanceListing = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: this.assistanceListingFormat(data["Assistance Listings"]),
				limit: 90
			});
		},
		populateGrant(data) {
			this.generated_internal_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.recipient_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Recipient Name"]);
				},
				children: data["Recipient Name"]
			}) || "--";
			this.awardAmount = formatMoneyWithPrecision(data["Award Amount"], 2, "--");
			this.totalOutlays = formatMoneyWithPrecision(data["Total Outlays"], 2, "--");
			this.description = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data.Description || "--",
				limit: 90
			});
			this.awardType = data["Contract Award Type"] || data["Award Type"] || "--";
			this.recipientUEI = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.defc = data.def_codes?.toString() || "--";
			this.covid19obligations = formatMoneyWithPrecision(data["COVID-19 Obligations"], 2, "--");
			this.covid19outlays = formatMoneyWithPrecision(data["COVID-19 Outlays"], 2, "--");
			this.infObligations = formatMoneyWithPrecision(data["Infrastructure Obligations"], 2, "--");
			this.infOutlays = formatMoneyWithPrecision(data["Infrastructure Outlays"], 2, "--");
			this.awardingAgency = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/agency/${data.agency_slug}`,
				onClick: () => {
					this.clickHandler(data["Awarding Agency"]);
				},
				children: data["Awarding Agency"]
			}) || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.startDate = data["Start Date"] || "--";
			this.endDate = data["End Date"] || data["Last Date to Order"] || "--";
			this.assistanceListing = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: this.assistanceListingFormat(data["Assistance Listings"]),
				limit: 90
			});
		},
		populateContract(data) {
			this.awardId = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.recipient_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Recipient Name"]);
				},
				children: data["Recipient Name"]
			}) || "--";
			this.awardAmount = formatMoneyWithPrecision(data["Award Amount"], 2, "--");
			this.totalOutlays = formatMoneyWithPrecision(data["Total Outlays"], 2, "--");
			this.description = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data.Description || "--",
				limit: 90
			});
			this.awardType = data["Contract Award Type"] || data["Award Type"] || "--";
			this.recipientUEI = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.defc = data.def_codes?.toString() || "--";
			this.covid19obligations = formatMoneyWithPrecision(data["COVID-19 Obligations"], 2, "--");
			this.covid19outlays = formatMoneyWithPrecision(data["COVID-19 Outlays"], 2, "--");
			this.infObligations = formatMoneyWithPrecision(data["Infrastructure Obligations"], 2, "--");
			this.infOutlays = formatMoneyWithPrecision(data["Infrastructure Outlays"], 2, "--");
			this.awardingAgency = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/agency/${data.agency_slug}`,
				onClick: () => {
					this.clickHandler(data["Awarding Agency"]);
				},
				children: data["Awarding Agency"]
			}) || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.startDate = data["Start Date"] || "--";
			this.endDate = data["End Date"] || data["Last Date to Order"] || "--";
			this.naics = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.NAICS, "code", "description"),
				limit: 80
			});
			this.psc = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.PSC, "code", "description"),
				limit: 80
			});
		},
		populateTransactionContract(data) {
			this.awardId = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.mod = data.Mod || "--";
			this.recipientName = data["Recipient Name"] || "--";
			this.transactionAmount = formatMoneyWithPrecision(data["Transaction Amount"], 2, "--");
			this.actionDate = data["Action Date"] || "--";
			this.transactionDescription = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data["Transaction Description"] || "--",
				limit: 90
			});
			this.actionType = data["Action Type"] || "--";
			this.awardType = data["Award Type"] || "--";
			this.recipientUEI = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.awardingAgency = data["Awarding Agency"] || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.naics = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.NAICS, "code", "description"),
				limit: 80
			});
			this.psc = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.PSC, "code", "description"),
				limit: 80
			});
		},
		populateTransactionDefault(data) {
			this.generated_internal_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Award ID"]);
				},
				children: data["Award ID"]
			}) || "--";
			this.mod = data.Mod || "--";
			this.recipientName = data["Recipient Name"] || "--";
			this.transactionAmount = formatMoneyWithPrecision(data["Transaction Amount"], 2, "--");
			this.actionDate = data["Action Date"] || "--";
			this.transactionDescription = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data["Transaction Description"] || "--",
				limit: 90
			});
			this.actionType = data["Action Type"] || "--";
			this.awardType = data["Award Type"] || "--";
			this.recipientUEI = data["Recipient UEI"] || "UEI not provided";
			this.recipientLocation = pickLocationFormat(data["Recipient Location"]);
			this.primaryPlaceOfPerformance = pickLocationFormat(data["Primary Place of Performance"]);
			this.awardingAgency = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/agency/${data.agency_slug}`,
				onClick: () => {
					this.clickHandler(data["Awarding Agency"]);
				},
				children: data["Awarding Agency"]
			}) || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.cfda = twoVariableFormat(data["Assistance Listing"], "cfda_number", "cfda_title");
		},
		populateSubcontract(data) {
			this.subawardId = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.prime_award_generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Sub-Award ID"]);
				},
				children: data["Sub-Award ID"]
			}) || "--";
			this.subawardeeName = data["Sub-Awardee Name"] || "--";
			this.subawardAmount = formatMoneyWithPrecision(data["Sub-Award Amount"], 2, "--");
			this.subawardDate = data["Sub-Award Date"] || "--";
			this.subawardDesc = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data["Sub-Award Description"] || "--",
				limit: 90
			});
			this.subrecipientUEI = data["Sub-Recipient UEI"] || "UEI not provided";
			this.subrecipientLocation = pickLocationFormat(data["Sub-Recipient Location"]);
			this.subawardPPOP = pickLocationFormat(data["Sub-Award Primary Place of Performance"]);
			this.subawardType = convertToTitleCase(data["Sub-Award Type"]) || "--";
			this.prime_award_generated_internal_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.prime_award_generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Prime Award ID"]);
				},
				children: data["Prime Award ID"]
			}) || "--";
			this.prime_award_recipient_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.prime_award_recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Prime Recipient Name"]);
				},
				children: data["Prime Recipient Name"]
			}) || "--";
			this.primeUEI = data["Prime Award Recipient UEI"] || "UEI not provided";
			this.awardingAgency = data["Awarding Agency"] || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.naics = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.NAICS, "code", "description"),
				limit: 80
			});
			this.psc = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: twoVariableFormat(data.PSC, "code", "description"),
				limit: 80
			});
		},
		populateDefault(data) {
			this.subawardId = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.prime_award_generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Sub-Award ID"]);
				},
				children: data["Sub-Award ID"]
			}) || "--";
			this.subawardeeName = data["Sub-Awardee Name"] || "--";
			this.subawardAmount = formatMoneyWithPrecision(data["Sub-Award Amount"], 2, "--");
			this.subawardDate = data["Sub-Award Date"] || "--";
			this.subawardDesc = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReadMore, {
				text: data["Sub-Award Description"] || "--",
				limit: 90
			});
			this.subrecipientUEI = data["Sub-Recipient UEI"] || "UEI not provided";
			this.subrecipientLocation = pickLocationFormat(data["Sub-Recipient Location"]);
			this.subawardPPOP = pickLocationFormat(data["Sub-Award Primary Place of Performance"]);
			this.subawardType = convertToTitleCase(data["Sub-Award Type"]) || "--";
			this.prime_award_generated_internal_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/award/${data.prime_award_generated_internal_id}`,
				onClick: () => {
					this.clickHandler(data["Prime Award ID"]);
				},
				children: data["Prime Award ID"]
			}) || "--";
			this.prime_award_recipient_id = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: `/recipient/${data.prime_award_recipient_id}`,
				onClick: () => {
					this.clickHandler(data["Prime Recipient Name"]);
				},
				children: data["Prime Recipient Name"]
			}) || "--";
			this.prime_award_recipient_UEI = data["Prime Award Recipient UEI"] || "UEI not provided";
			this.awardingAgency = data["Awarding Agency"] || "--";
			this.awardingSubAgency = data["Awarding Sub Agency"] || "--";
			this.assistanceListing = twoVariableFormat(data["Assistance Listing"], "cfda_number", "cfda_program_title");
		}
	};
}));
//#endregion
//#region src/js/components/search/table/ResultsTable.jsx
/**
* ResultsTable.jsx
* Created by Kevin Li 11/8/16
**/
var import_jsx_runtime$6, propTypes$4, ResultsTable;
var init_ResultsTable = __esmMin((() => {
	init_index_es();
	init_ResultsTableRow();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$4 = {
		results: PropTypes.array,
		columns: PropTypes.object,
		visibleWidth: PropTypes.number,
		loadNextPage: PropTypes.func,
		spendingLevel: PropTypes.string,
		tableInstance: PropTypes.string,
		sort: PropTypes.object,
		updateSort: PropTypes.func,
		awardIdClick: PropTypes.func,
		subAwardIdClick: PropTypes.func,
		page: PropTypes.number,
		setPage: PropTypes.func,
		setResultLimit: PropTypes.func,
		total: PropTypes.number,
		isMobile: PropTypes.bool,
		federalAccountPage: PropTypes.bool,
		referenceData: PropTypes.array
	};
	ResultsTable = (props) => {
		const [windowHeight, setWindowHeight] = useState(0);
		const [tableHeight, setTableHeight] = useState(0);
		const [activateRightFade, setActivateRightFade] = useState(!props.isMobile);
		const measureHeight = () => {
			const tableHeightlocal = document.getElementById("advanced-search__table-wrapper").offsetHeight;
			setTableHeight(tableHeightlocal);
			setWindowHeight(window.innerHeight);
		};
		const prepareDTUIColumns = () => {
			return props.columns.visibleOrder.map((columnTitle) => {
				return props.columns.data[columnTitle];
			}).map((col) => ({
				title: col.columnName,
				displayName: col.displayName,
				columnWidth: col.width,
				right: col.right || false
			}));
		};
		const prepareDTUIRows = () => {
			const arrayOfObjects = props.results;
			let values = null;
			if (props.spendingLevel === "awards" || props.federalAccountPage === true) {
				if (props.currentType === "loans") {
					values = arrayOfObjects.map((obj) => {
						const loanrow = Object.create(ResultsTableRow);
						loanrow.populateLoan(obj);
						return Object.values(loanrow);
					});
					return values;
				} else if (props.currentType === "direct_payments") {
					values = arrayOfObjects.map((obj) => {
						const directPaymentRow = Object.create(ResultsTableRow);
						directPaymentRow.populateDirectPayment(obj);
						return Object.values(directPaymentRow);
					});
					return values;
				} else if (props.currentType === "grants" || props.currentType === "other") {
					values = arrayOfObjects.map((obj) => {
						const grantRow = Object.create(ResultsTableRow);
						grantRow.populateGrant(obj);
						return Object.values(grantRow);
					});
					return values;
				}
				values = arrayOfObjects.map((obj) => {
					const contractRow = Object.create(ResultsTableRow);
					contractRow.populateContract(obj);
					return Object.values(contractRow);
				});
				return values;
			} else if (props.spendingLevel === "transactions") {
				if (props.currentType === "transaction_contracts" || props.currentType === "transaction_idvs" || props.currentType === "contracts") values = arrayOfObjects.map((obj) => {
					const transactionContractRow = Object.create(ResultsTableRow);
					transactionContractRow.populateTransactionContract(obj);
					return Object.values(transactionContractRow);
				});
				else values = arrayOfObjects.map((obj) => {
					const transactionContractRow = Object.create(ResultsTableRow);
					transactionContractRow.populateTransactionDefault(obj);
					return Object.values(transactionContractRow);
				});
				return values;
			}
			if (props.currentType === "subcontracts" || props.columnType === "subawards" && (props.currentType === "contracts" || props.currentType === "idvs")) values = arrayOfObjects.map((obj) => {
				const subcontractRow = Object.create(ResultsTableRow);
				subcontractRow.populateSubcontract(obj);
				return Object.values(subcontractRow);
			});
			else values = arrayOfObjects.map((obj) => {
				const defaultRow = Object.create(ResultsTableRow);
				defaultRow.populateDefault(obj);
				return Object.values(defaultRow);
			});
			return values;
		};
		useEffect(() => {
			measureHeight();
			window.addEventListener("resize", measureHeight);
			return () => window.removeEventListener("resize", measureHeight);
		}, []);
		useEffect(() => {
			if (props.isMobile) setActivateRightFade(false);
			else setActivateRightFade(true);
		}, [props.isMobile]);
		const cols = useRef(prepareDTUIColumns());
		const limitedRows = prepareDTUIRows();
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "advanced-search__table-wrapper",
			id: "advanced-search__table-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ss, {
				classNames: "table-for-new-search-page award-results-table-dtui",
				stickyFirstColumn: !props.isMobile,
				columns: cols.current,
				rows: limitedRows,
				rowHeight: props.isMobile ? null : 58,
				headerRowHeight: 45,
				highlightedColumns: props.spendingLevel === "subawards" ? {
					standardColumns: 9,
					highlightedColumns: props.currentType === "subcontracts" ? 7 : 6
				} : null,
				currentSort: props.sort,
				updateSort: props.updateSort,
				isMobile: props.isMobile,
				isStacked: true,
				newMobileView: true
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Ka, {
			resultsText: true,
			limitSelector: true,
			hideLast: props.resultsCount >= 5e4,
			currentPage: props.page,
			pageSize: props.resultsLimit,
			changePage: props.setPage,
			changeLimit: props.setResultLimit,
			totalItems: props.resultsCount
		})] });
	};
	ResultsTable.propTypes = propTypes$4;
}));
//#endregion
//#region node_modules/@tanstack/table-core/build/lib/index.mjs
/**
* table-core
*
* Copyright (c) TanStack
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function createColumnHelper() {
	return {
		accessor: (accessor, column) => {
			return typeof accessor === "function" ? {
				...column,
				accessorFn: accessor
			} : {
				...column,
				accessorKey: accessor
			};
		},
		display: (column) => column,
		group: (column) => column
	};
}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
	return (updater) => {
		instance.setState((old) => {
			return {
				...old,
				[key]: functionalUpdate(updater, old[key])
			};
		});
	};
}
function isFunction(d) {
	return d instanceof Function;
}
function isNumberArray(d) {
	return Array.isArray(d) && d.every((val) => typeof val === "number");
}
function flattenBy(arr, getChildren) {
	const flat = [];
	const recurse = (subArr) => {
		subArr.forEach((item) => {
			flat.push(item);
			const children = getChildren(item);
			if (children != null && children.length) recurse(children);
		});
	};
	recurse(arr);
	return flat;
}
function memo$1(getDeps, fn, opts) {
	let deps = [];
	let result;
	return (depArgs) => {
		let depTime;
		if (opts.key && opts.debug) depTime = Date.now();
		const newDeps = getDeps(depArgs);
		if (!(newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep))) return result;
		deps = newDeps;
		let resultTime;
		if (opts.key && opts.debug) resultTime = Date.now();
		result = fn(...newDeps);
		opts == null || opts.onChange == null || opts.onChange(result);
		if (opts.key && opts.debug) {
			if (opts != null && opts.debug()) {
				const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
				const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
				const resultFpsPercentage = resultEndTime / 16;
				const pad = (str, num) => {
					str = String(str);
					while (str.length < num) str = " " + str;
					return str;
				};
				console.info(`%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
			}
		}
		return result;
	};
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
	return {
		debug: () => {
			var _tableOptions$debugAl;
			return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
		},
		key: false,
		onChange
	};
}
function createCell(table, row, column, columnId) {
	const getRenderValue = () => {
		var _cell$getValue;
		return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table.options.renderFallbackValue;
	};
	const cell = {
		id: `${row.id}_${column.id}`,
		row,
		column,
		getValue: () => row.getValue(columnId),
		renderValue: getRenderValue,
		getContext: memo$1(() => [
			table,
			column,
			row,
			cell
		], (table, column, row, cell) => ({
			table,
			column,
			row,
			cell,
			getValue: cell.getValue,
			renderValue: cell.renderValue
		}), getMemoOptions(table.options, "debugCells", "cell.getContext"))
	};
	table._features.forEach((feature) => {
		feature.createCell == null || feature.createCell(cell, column, row, table);
	}, {});
	return cell;
}
function createColumn(table, columnDef, depth, parent) {
	var _ref, _resolvedColumnDef$id;
	const resolvedColumnDef = {
		...table._getDefaultColumnDef(),
		...columnDef
	};
	const accessorKey = resolvedColumnDef.accessorKey;
	let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? typeof String.prototype.replaceAll === "function" ? accessorKey.replaceAll(".", "_") : accessorKey.replace(/\./g, "_") : void 0) != null ? _ref : typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0;
	let accessorFn;
	if (resolvedColumnDef.accessorFn) accessorFn = resolvedColumnDef.accessorFn;
	else if (accessorKey) if (accessorKey.includes(".")) accessorFn = (originalRow) => {
		let result = originalRow;
		for (const key of accessorKey.split(".")) {
			var _result;
			result = (_result = result) == null ? void 0 : _result[key];
		}
		return result;
	};
	else accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
	if (!id) throw new Error();
	let column = {
		id: `${String(id)}`,
		accessorFn,
		parent,
		depth,
		columnDef: resolvedColumnDef,
		columns: [],
		getFlatColumns: memo$1(() => [true], () => {
			var _column$columns;
			return [column, ...(_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap((d) => d.getFlatColumns())];
		}, getMemoOptions(table.options, "debugColumns", "column.getFlatColumns")),
		getLeafColumns: memo$1(() => [table._getOrderColumnsFn()], (orderColumns) => {
			var _column$columns2;
			if ((_column$columns2 = column.columns) != null && _column$columns2.length) return orderColumns(column.columns.flatMap((column) => column.getLeafColumns()));
			return [column];
		}, getMemoOptions(table.options, "debugColumns", "column.getLeafColumns"))
	};
	for (const feature of table._features) feature.createColumn == null || feature.createColumn(column, table);
	return column;
}
function createHeader(table, column, options) {
	var _options$id;
	let header = {
		id: (_options$id = options.id) != null ? _options$id : column.id,
		column,
		index: options.index,
		isPlaceholder: !!options.isPlaceholder,
		placeholderId: options.placeholderId,
		depth: options.depth,
		subHeaders: [],
		colSpan: 0,
		rowSpan: 0,
		headerGroup: null,
		getLeafHeaders: () => {
			const leafHeaders = [];
			const recurseHeader = (h) => {
				if (h.subHeaders && h.subHeaders.length) h.subHeaders.map(recurseHeader);
				leafHeaders.push(h);
			};
			recurseHeader(header);
			return leafHeaders;
		},
		getContext: () => ({
			table,
			header,
			column
		})
	};
	table._features.forEach((feature) => {
		feature.createHeader == null || feature.createHeader(header, table);
	});
	return header;
}
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
	var _headerGroups$0$heade, _headerGroups$;
	let maxDepth = 0;
	const findMaxDepth = function(columns, depth) {
		if (depth === void 0) depth = 1;
		maxDepth = Math.max(maxDepth, depth);
		columns.filter((column) => column.getIsVisible()).forEach((column) => {
			var _column$columns;
			if ((_column$columns = column.columns) != null && _column$columns.length) findMaxDepth(column.columns, depth + 1);
		}, 0);
	};
	findMaxDepth(allColumns);
	let headerGroups = [];
	const createHeaderGroup = (headersToGroup, depth) => {
		const headerGroup = {
			depth,
			id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
			headers: []
		};
		const pendingParentHeaders = [];
		headersToGroup.forEach((headerToGroup) => {
			const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
			const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
			let column;
			let isPlaceholder = false;
			if (isLeafHeader && headerToGroup.column.parent) column = headerToGroup.column.parent;
			else {
				column = headerToGroup.column;
				isPlaceholder = true;
			}
			if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) latestPendingParentHeader.subHeaders.push(headerToGroup);
			else {
				const header = createHeader(table, column, {
					id: [
						headerFamily,
						depth,
						column.id,
						headerToGroup == null ? void 0 : headerToGroup.id
					].filter(Boolean).join("_"),
					isPlaceholder,
					placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
					depth,
					index: pendingParentHeaders.length
				});
				header.subHeaders.push(headerToGroup);
				pendingParentHeaders.push(header);
			}
			headerGroup.headers.push(headerToGroup);
			headerToGroup.headerGroup = headerGroup;
		});
		headerGroups.push(headerGroup);
		if (depth > 0) createHeaderGroup(pendingParentHeaders, depth - 1);
	};
	createHeaderGroup(columnsToGroup.map((column, index) => createHeader(table, column, {
		depth: maxDepth,
		index
	})), maxDepth - 1);
	headerGroups.reverse();
	const recurseHeadersForSpans = (headers) => {
		return headers.filter((header) => header.column.getIsVisible()).map((header) => {
			let colSpan = 0;
			let rowSpan = 0;
			let childRowSpans = [0];
			if (header.subHeaders && header.subHeaders.length) {
				childRowSpans = [];
				recurseHeadersForSpans(header.subHeaders).forEach((_ref) => {
					let { colSpan: childColSpan, rowSpan: childRowSpan } = _ref;
					colSpan += childColSpan;
					childRowSpans.push(childRowSpan);
				});
			} else colSpan = 1;
			const minChildRowSpan = Math.min(...childRowSpans);
			rowSpan = rowSpan + minChildRowSpan;
			header.colSpan = colSpan;
			header.rowSpan = rowSpan;
			return {
				colSpan,
				rowSpan
			};
		});
	};
	recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
	return headerGroups;
}
function testFalsey(val) {
	return val === void 0 || val === null || val === "";
}
function shouldAutoRemoveFilter(filterFn, value, column) {
	return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
}
function orderColumns(leafColumns, grouping, groupedColumnMode) {
	if (!(grouping != null && grouping.length) || !groupedColumnMode) return leafColumns;
	const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id));
	if (groupedColumnMode === "remove") return nonGroupingColumns;
	return [...grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean), ...nonGroupingColumns];
}
function safelyAccessDocument(_document) {
	return _document || (typeof document !== "undefined" ? document : null);
}
function passiveEventSupported() {
	if (typeof passiveSupported === "boolean") return passiveSupported;
	let supported = false;
	try {
		const options = { get passive() {
			supported = true;
			return false;
		} };
		const noop = () => {};
		window.addEventListener("test", noop, options);
		window.removeEventListener("test", noop);
	} catch (err) {
		supported = false;
	}
	passiveSupported = supported;
	return passiveSupported;
}
function isTouchStartEvent(e) {
	return e.type === "touchstart";
}
function _getVisibleLeafColumns(table, position) {
	return !position ? table.getVisibleLeafColumns() : position === "center" ? table.getCenterVisibleLeafColumns() : position === "left" ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
}
function selectRowsFn(table, rowModel) {
	const rowSelection = table.getState().rowSelection;
	const newSelectedFlatRows = [];
	const newSelectedRowsById = {};
	const recurseRows = function(rows, depth) {
		return rows.map((row) => {
			var _row$subRows2;
			const isSelected = isRowSelected(row, rowSelection);
			if (isSelected) {
				newSelectedFlatRows.push(row);
				newSelectedRowsById[row.id] = row;
			}
			if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) row = {
				...row,
				subRows: recurseRows(row.subRows)
			};
			if (isSelected) return row;
		}).filter(Boolean);
	};
	return {
		rows: recurseRows(rowModel.rows),
		flatRows: newSelectedFlatRows,
		rowsById: newSelectedRowsById
	};
}
function isRowSelected(row, selection) {
	var _selection$row$id;
	return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
}
function isSubRowSelected(row, selection, table) {
	var _row$subRows3;
	if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length)) return false;
	let allChildrenSelected = true;
	let someSelected = false;
	row.subRows.forEach((subRow) => {
		if (someSelected && !allChildrenSelected) return;
		if (subRow.getCanSelect()) if (isRowSelected(subRow, selection)) someSelected = true;
		else allChildrenSelected = false;
		if (subRow.subRows && subRow.subRows.length) {
			const subRowChildrenSelected = isSubRowSelected(subRow, selection);
			if (subRowChildrenSelected === "all") someSelected = true;
			else if (subRowChildrenSelected === "some") {
				someSelected = true;
				allChildrenSelected = false;
			} else allChildrenSelected = false;
		}
	});
	return allChildrenSelected ? "all" : someSelected ? "some" : false;
}
function compareBasic(a, b) {
	return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
	if (typeof a === "number") {
		if (isNaN(a) || a === Infinity || a === -Infinity) return "";
		return String(a);
	}
	if (typeof a === "string") return a;
	return "";
}
function compareAlphanumeric(aStr, bStr) {
	const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
	const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
	while (a.length && b.length) {
		const aa = a.shift();
		const bb = b.shift();
		const an = parseInt(aa, 10);
		const bn = parseInt(bb, 10);
		const combo = [an, bn].sort();
		if (isNaN(combo[0])) {
			if (aa > bb) return 1;
			if (bb > aa) return -1;
			continue;
		}
		if (isNaN(combo[1])) return isNaN(an) ? -1 : 1;
		if (an > bn) return 1;
		if (bn > an) return -1;
	}
	return a.length - b.length;
}
function createTable(options) {
	var _options$_features, _options$initialState;
	const _features = [...builtInFeatures, ...(_options$_features = options._features) != null ? _options$_features : []];
	let table = { _features };
	const defaultOptions = table._features.reduce((obj, feature) => {
		return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table));
	}, {});
	const mergeOptions = (options) => {
		if (table.options.mergeOptions) return table.options.mergeOptions(defaultOptions, options);
		return {
			...defaultOptions,
			...options
		};
	};
	let initialState = { ...(_options$initialState = options.initialState) != null ? _options$initialState : {} };
	table._features.forEach((feature) => {
		var _feature$getInitialSt;
		initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
	});
	const queued = [];
	let queuedTimeout = false;
	const coreInstance = {
		_features,
		options: {
			...defaultOptions,
			...options
		},
		initialState,
		_queue: (cb) => {
			queued.push(cb);
			if (!queuedTimeout) {
				queuedTimeout = true;
				Promise.resolve().then(() => {
					while (queued.length) queued.shift()();
					queuedTimeout = false;
				}).catch((error) => setTimeout(() => {
					throw error;
				}));
			}
		},
		reset: () => {
			table.setState(table.initialState);
		},
		setOptions: (updater) => {
			const newOptions = functionalUpdate(updater, table.options);
			table.options = mergeOptions(newOptions);
		},
		getState: () => {
			return table.options.state;
		},
		setState: (updater) => {
			table.options.onStateChange == null || table.options.onStateChange(updater);
		},
		_getRowId: (row, index, parent) => {
			var _table$options$getRow;
			return (_table$options$getRow = table.options.getRowId == null ? void 0 : table.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join(".") : index}`;
		},
		getCoreRowModel: () => {
			if (!table._getCoreRowModel) table._getCoreRowModel = table.options.getCoreRowModel(table);
			return table._getCoreRowModel();
		},
		getRowModel: () => {
			return table.getPaginationRowModel();
		},
		getRow: (id, searchAll) => {
			let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
			if (!row) {
				row = table.getCoreRowModel().rowsById[id];
				if (!row) throw new Error();
			}
			return row;
		},
		_getDefaultColumnDef: memo$1(() => [table.options.defaultColumn], (defaultColumn) => {
			var _defaultColumn;
			defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
			return {
				header: (props) => {
					const resolvedColumnDef = props.header.column.columnDef;
					if (resolvedColumnDef.accessorKey) return resolvedColumnDef.accessorKey;
					if (resolvedColumnDef.accessorFn) return resolvedColumnDef.id;
					return null;
				},
				cell: (props) => {
					var _props$renderValue$to, _props$renderValue;
					return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
				},
				...table._features.reduce((obj, feature) => {
					return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
				}, {}),
				...defaultColumn
			};
		}, getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")),
		_getColumnDefs: () => table.options.columns,
		getAllColumns: memo$1(() => [table._getColumnDefs()], (columnDefs) => {
			const recurseColumns = function(columnDefs, parent, depth) {
				if (depth === void 0) depth = 0;
				return columnDefs.map((columnDef) => {
					const column = createColumn(table, columnDef, depth, parent);
					const groupingColumnDef = columnDef;
					column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
					return column;
				});
			};
			return recurseColumns(columnDefs);
		}, getMemoOptions(options, "debugColumns", "getAllColumns")),
		getAllFlatColumns: memo$1(() => [table.getAllColumns()], (allColumns) => {
			return allColumns.flatMap((column) => {
				return column.getFlatColumns();
			});
		}, getMemoOptions(options, "debugColumns", "getAllFlatColumns")),
		_getAllFlatColumnsById: memo$1(() => [table.getAllFlatColumns()], (flatColumns) => {
			return flatColumns.reduce((acc, column) => {
				acc[column.id] = column;
				return acc;
			}, {});
		}, getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")),
		getAllLeafColumns: memo$1(() => [table.getAllColumns(), table._getOrderColumnsFn()], (allColumns, orderColumns) => {
			return orderColumns(allColumns.flatMap((column) => column.getLeafColumns()));
		}, getMemoOptions(options, "debugColumns", "getAllLeafColumns")),
		getColumn: (columnId) => {
			return table._getAllFlatColumnsById()[columnId];
		}
	};
	Object.assign(table, coreInstance);
	for (let index = 0; index < table._features.length; index++) {
		const feature = table._features[index];
		feature == null || feature.createTable == null || feature.createTable(table);
	}
	return table;
}
function getCoreRowModel() {
	return (table) => memo$1(() => [table.options.data], (data) => {
		const rowModel = {
			rows: [],
			flatRows: [],
			rowsById: {}
		};
		const accessRows = function(originalRows, depth, parentRow) {
			if (depth === void 0) depth = 0;
			const rows = [];
			for (let i = 0; i < originalRows.length; i++) {
				const row = createRow(table, table._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, void 0, parentRow == null ? void 0 : parentRow.id);
				rowModel.flatRows.push(row);
				rowModel.rowsById[row.id] = row;
				rows.push(row);
				if (table.options.getSubRows) {
					var _row$originalSubRows;
					row.originalSubRows = table.options.getSubRows(originalRows[i], i);
					if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) row.subRows = accessRows(row.originalSubRows, depth + 1, row);
				}
			}
			return rows;
		};
		rowModel.rows = accessRows(data);
		return rowModel;
	}, getMemoOptions(table.options, "debugTable", "getRowModel", () => table._autoResetPageIndex()));
}
function filterRows(rows, filterRowImpl, table) {
	if (table.options.filterFromLeafRows) return filterRowModelFromLeafs(rows, filterRowImpl, table);
	return filterRowModelFromRoot(rows, filterRowImpl, table);
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table) {
	var _table$options$maxLea;
	const newFilteredFlatRows = [];
	const newFilteredRowsById = {};
	const maxDepth = (_table$options$maxLea = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea : 100;
	const recurseFilterRows = function(rowsToFilter, depth) {
		if (depth === void 0) depth = 0;
		const rows = [];
		for (let i = 0; i < rowsToFilter.length; i++) {
			var _row$subRows;
			let row = rowsToFilter[i];
			const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
			newRow.columnFilters = row.columnFilters;
			if ((_row$subRows = row.subRows) != null && _row$subRows.length && depth < maxDepth) {
				newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
				row = newRow;
				if (filterRow(row) && !newRow.subRows.length) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
					continue;
				}
				if (filterRow(row) || newRow.subRows.length) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
					continue;
				}
			} else {
				row = newRow;
				if (filterRow(row)) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
				}
			}
		}
		return rows;
	};
	return {
		rows: recurseFilterRows(rowsToFilter),
		flatRows: newFilteredFlatRows,
		rowsById: newFilteredRowsById
	};
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table) {
	var _table$options$maxLea2;
	const newFilteredFlatRows = [];
	const newFilteredRowsById = {};
	const maxDepth = (_table$options$maxLea2 = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea2 : 100;
	const recurseFilterRows = function(rowsToFilter, depth) {
		if (depth === void 0) depth = 0;
		const rows = [];
		for (let i = 0; i < rowsToFilter.length; i++) {
			let row = rowsToFilter[i];
			if (filterRow(row)) {
				var _row$subRows2;
				if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length && depth < maxDepth) {
					const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
					newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
					row = newRow;
				}
				rows.push(row);
				newFilteredFlatRows.push(row);
				newFilteredRowsById[row.id] = row;
			}
		}
		return rows;
	};
	return {
		rows: recurseFilterRows(rowsToFilter),
		flatRows: newFilteredFlatRows,
		rowsById: newFilteredRowsById
	};
}
function getFilteredRowModel() {
	return (table) => memo$1(() => [
		table.getPreFilteredRowModel(),
		table.getState().columnFilters,
		table.getState().globalFilter
	], (rowModel, columnFilters, globalFilter) => {
		if (!rowModel.rows.length || !(columnFilters != null && columnFilters.length) && !globalFilter) {
			for (let i = 0; i < rowModel.flatRows.length; i++) {
				rowModel.flatRows[i].columnFilters = {};
				rowModel.flatRows[i].columnFiltersMeta = {};
			}
			return rowModel;
		}
		const resolvedColumnFilters = [];
		const resolvedGlobalFilters = [];
		(columnFilters != null ? columnFilters : []).forEach((d) => {
			var _filterFn$resolveFilt;
			const column = table.getColumn(d.id);
			if (!column) return;
			const filterFn = column.getFilterFn();
			if (!filterFn) return;
			resolvedColumnFilters.push({
				id: d.id,
				filterFn,
				resolvedValue: (_filterFn$resolveFilt = filterFn.resolveFilterValue == null ? void 0 : filterFn.resolveFilterValue(d.value)) != null ? _filterFn$resolveFilt : d.value
			});
		});
		const filterableIds = (columnFilters != null ? columnFilters : []).map((d) => d.id);
		const globalFilterFn = table.getGlobalFilterFn();
		const globallyFilterableColumns = table.getAllLeafColumns().filter((column) => column.getCanGlobalFilter());
		if (globalFilter && globalFilterFn && globallyFilterableColumns.length) {
			filterableIds.push("__global__");
			globallyFilterableColumns.forEach((column) => {
				var _globalFilterFn$resol;
				resolvedGlobalFilters.push({
					id: column.id,
					filterFn: globalFilterFn,
					resolvedValue: (_globalFilterFn$resol = globalFilterFn.resolveFilterValue == null ? void 0 : globalFilterFn.resolveFilterValue(globalFilter)) != null ? _globalFilterFn$resol : globalFilter
				});
			});
		}
		let currentColumnFilter;
		let currentGlobalFilter;
		for (let j = 0; j < rowModel.flatRows.length; j++) {
			const row = rowModel.flatRows[j];
			row.columnFilters = {};
			if (resolvedColumnFilters.length) for (let i = 0; i < resolvedColumnFilters.length; i++) {
				currentColumnFilter = resolvedColumnFilters[i];
				const id = currentColumnFilter.id;
				row.columnFilters[id] = currentColumnFilter.filterFn(row, id, currentColumnFilter.resolvedValue, (filterMeta) => {
					row.columnFiltersMeta[id] = filterMeta;
				});
			}
			if (resolvedGlobalFilters.length) {
				for (let i = 0; i < resolvedGlobalFilters.length; i++) {
					currentGlobalFilter = resolvedGlobalFilters[i];
					const id = currentGlobalFilter.id;
					if (currentGlobalFilter.filterFn(row, id, currentGlobalFilter.resolvedValue, (filterMeta) => {
						row.columnFiltersMeta[id] = filterMeta;
					})) {
						row.columnFilters.__global__ = true;
						break;
					}
				}
				if (row.columnFilters.__global__ !== true) row.columnFilters.__global__ = false;
			}
		}
		const filterRowsImpl = (row) => {
			for (let i = 0; i < filterableIds.length; i++) if (row.columnFilters[filterableIds[i]] === false) return false;
			return true;
		};
		return filterRows(rowModel.rows, filterRowsImpl, table);
	}, getMemoOptions(table.options, "debugTable", "getFilteredRowModel", () => table._autoResetPageIndex()));
}
function getSortedRowModel() {
	return (table) => memo$1(() => [table.getState().sorting, table.getPreSortedRowModel()], (sorting, rowModel) => {
		if (!rowModel.rows.length || !(sorting != null && sorting.length)) return rowModel;
		const sortingState = table.getState().sorting;
		const sortedFlatRows = [];
		const availableSorting = sortingState.filter((sort) => {
			var _table$getColumn;
			return (_table$getColumn = table.getColumn(sort.id)) == null ? void 0 : _table$getColumn.getCanSort();
		});
		const columnInfoById = {};
		availableSorting.forEach((sortEntry) => {
			const column = table.getColumn(sortEntry.id);
			if (!column) return;
			columnInfoById[sortEntry.id] = {
				sortUndefined: column.columnDef.sortUndefined,
				invertSorting: column.columnDef.invertSorting,
				sortingFn: column.getSortingFn()
			};
		});
		const sortData = (rows) => {
			const sortedData = rows.map((row) => ({ ...row }));
			sortedData.sort((rowA, rowB) => {
				for (let i = 0; i < availableSorting.length; i += 1) {
					var _sortEntry$desc;
					const sortEntry = availableSorting[i];
					const columnInfo = columnInfoById[sortEntry.id];
					const sortUndefined = columnInfo.sortUndefined;
					const isDesc = (_sortEntry$desc = sortEntry == null ? void 0 : sortEntry.desc) != null ? _sortEntry$desc : false;
					let sortInt = 0;
					if (sortUndefined) {
						const aValue = rowA.getValue(sortEntry.id);
						const bValue = rowB.getValue(sortEntry.id);
						const aUndefined = aValue === void 0;
						const bUndefined = bValue === void 0;
						if (aUndefined || bUndefined) {
							if (sortUndefined === "first") return aUndefined ? -1 : 1;
							if (sortUndefined === "last") return aUndefined ? 1 : -1;
							sortInt = aUndefined && bUndefined ? 0 : aUndefined ? sortUndefined : -sortUndefined;
						}
					}
					if (sortInt === 0) sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
					if (sortInt !== 0) {
						if (isDesc) sortInt *= -1;
						if (columnInfo.invertSorting) sortInt *= -1;
						return sortInt;
					}
				}
				return rowA.index - rowB.index;
			});
			sortedData.forEach((row) => {
				var _row$subRows;
				sortedFlatRows.push(row);
				if ((_row$subRows = row.subRows) != null && _row$subRows.length) row.subRows = sortData(row.subRows);
			});
			return sortedData;
		};
		return {
			rows: sortData(rowModel.rows),
			flatRows: sortedFlatRows,
			rowsById: rowModel.rowsById
		};
	}, getMemoOptions(table.options, "debugTable", "getSortedRowModel", () => table._autoResetPageIndex()));
}
var debug, Headers, createRow, ColumnFaceting, includesString, includesStringSensitive, equalsString, arrIncludes, arrIncludesAll, arrIncludesSome, equals, weakEquals, inNumberRange, filterFns, ColumnFiltering, sum$1, min$1, max$1, extent, mean$1, median, unique, uniqueCount, count, aggregationFns, ColumnGrouping, ColumnOrdering, getDefaultColumnPinningState, ColumnPinning, defaultColumnSizing, getDefaultColumnSizingInfoState, ColumnSizing, passiveSupported, ColumnVisibility, GlobalFaceting, GlobalFiltering, RowExpanding, defaultPageIndex, defaultPageSize, getDefaultPaginationState, RowPagination, getDefaultRowPinningState, RowPinning, RowSelection, mutateRowIsSelected, reSplitAlphaNumeric, alphanumeric, alphanumericCaseSensitive, text, textCaseSensitive, datetime, basic, sortingFns, RowSorting, builtInFeatures;
var init_lib$1 = __esmMin((() => {
	debug = "debugHeaders";
	Headers = { createTable: (table) => {
		table.getHeaderGroups = memo$1(() => [
			table.getAllColumns(),
			table.getVisibleLeafColumns(),
			table.getState().columnPinning.left,
			table.getState().columnPinning.right
		], (allColumns, leafColumns, left, right) => {
			var _left$map$filter, _right$map$filter;
			const leftColumns = (_left$map$filter = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
			const rightColumns = (_right$map$filter = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
			const centerColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
			return buildHeaderGroups(allColumns, [
				...leftColumns,
				...centerColumns,
				...rightColumns
			], table);
		}, getMemoOptions(table.options, debug, "getHeaderGroups"));
		table.getCenterHeaderGroups = memo$1(() => [
			table.getAllColumns(),
			table.getVisibleLeafColumns(),
			table.getState().columnPinning.left,
			table.getState().columnPinning.right
		], (allColumns, leafColumns, left, right) => {
			leafColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
			return buildHeaderGroups(allColumns, leafColumns, table, "center");
		}, getMemoOptions(table.options, debug, "getCenterHeaderGroups"));
		table.getLeftHeaderGroups = memo$1(() => [
			table.getAllColumns(),
			table.getVisibleLeafColumns(),
			table.getState().columnPinning.left
		], (allColumns, leafColumns, left) => {
			var _left$map$filter2;
			return buildHeaderGroups(allColumns, (_left$map$filter2 = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [], table, "left");
		}, getMemoOptions(table.options, debug, "getLeftHeaderGroups"));
		table.getRightHeaderGroups = memo$1(() => [
			table.getAllColumns(),
			table.getVisibleLeafColumns(),
			table.getState().columnPinning.right
		], (allColumns, leafColumns, right) => {
			var _right$map$filter2;
			return buildHeaderGroups(allColumns, (_right$map$filter2 = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [], table, "right");
		}, getMemoOptions(table.options, debug, "getRightHeaderGroups"));
		table.getFooterGroups = memo$1(() => [table.getHeaderGroups()], (headerGroups) => {
			return [...headerGroups].reverse();
		}, getMemoOptions(table.options, debug, "getFooterGroups"));
		table.getLeftFooterGroups = memo$1(() => [table.getLeftHeaderGroups()], (headerGroups) => {
			return [...headerGroups].reverse();
		}, getMemoOptions(table.options, debug, "getLeftFooterGroups"));
		table.getCenterFooterGroups = memo$1(() => [table.getCenterHeaderGroups()], (headerGroups) => {
			return [...headerGroups].reverse();
		}, getMemoOptions(table.options, debug, "getCenterFooterGroups"));
		table.getRightFooterGroups = memo$1(() => [table.getRightHeaderGroups()], (headerGroups) => {
			return [...headerGroups].reverse();
		}, getMemoOptions(table.options, debug, "getRightFooterGroups"));
		table.getFlatHeaders = memo$1(() => [table.getHeaderGroups()], (headerGroups) => {
			return headerGroups.map((headerGroup) => {
				return headerGroup.headers;
			}).flat();
		}, getMemoOptions(table.options, debug, "getFlatHeaders"));
		table.getLeftFlatHeaders = memo$1(() => [table.getLeftHeaderGroups()], (left) => {
			return left.map((headerGroup) => {
				return headerGroup.headers;
			}).flat();
		}, getMemoOptions(table.options, debug, "getLeftFlatHeaders"));
		table.getCenterFlatHeaders = memo$1(() => [table.getCenterHeaderGroups()], (left) => {
			return left.map((headerGroup) => {
				return headerGroup.headers;
			}).flat();
		}, getMemoOptions(table.options, debug, "getCenterFlatHeaders"));
		table.getRightFlatHeaders = memo$1(() => [table.getRightHeaderGroups()], (left) => {
			return left.map((headerGroup) => {
				return headerGroup.headers;
			}).flat();
		}, getMemoOptions(table.options, debug, "getRightFlatHeaders"));
		table.getCenterLeafHeaders = memo$1(() => [table.getCenterFlatHeaders()], (flatHeaders) => {
			return flatHeaders.filter((header) => {
				var _header$subHeaders;
				return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
			});
		}, getMemoOptions(table.options, debug, "getCenterLeafHeaders"));
		table.getLeftLeafHeaders = memo$1(() => [table.getLeftFlatHeaders()], (flatHeaders) => {
			return flatHeaders.filter((header) => {
				var _header$subHeaders2;
				return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
			});
		}, getMemoOptions(table.options, debug, "getLeftLeafHeaders"));
		table.getRightLeafHeaders = memo$1(() => [table.getRightFlatHeaders()], (flatHeaders) => {
			return flatHeaders.filter((header) => {
				var _header$subHeaders3;
				return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
			});
		}, getMemoOptions(table.options, debug, "getRightLeafHeaders"));
		table.getLeafHeaders = memo$1(() => [
			table.getLeftHeaderGroups(),
			table.getCenterHeaderGroups(),
			table.getRightHeaderGroups()
		], (left, center, right) => {
			var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
			return [
				...(_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : [],
				...(_center$0$headers = (_center$ = center[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : [],
				...(_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : []
			].map((header) => {
				return header.getLeafHeaders();
			}).flat();
		}, getMemoOptions(table.options, debug, "getLeafHeaders"));
	} };
	createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
		let row = {
			id,
			index: rowIndex,
			original,
			depth,
			parentId,
			_valuesCache: {},
			_uniqueValuesCache: {},
			getValue: (columnId) => {
				if (row._valuesCache.hasOwnProperty(columnId)) return row._valuesCache[columnId];
				const column = table.getColumn(columnId);
				if (!(column != null && column.accessorFn)) return;
				row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
				return row._valuesCache[columnId];
			},
			getUniqueValues: (columnId) => {
				if (row._uniqueValuesCache.hasOwnProperty(columnId)) return row._uniqueValuesCache[columnId];
				const column = table.getColumn(columnId);
				if (!(column != null && column.accessorFn)) return;
				if (!column.columnDef.getUniqueValues) {
					row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
					return row._uniqueValuesCache[columnId];
				}
				row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
				return row._uniqueValuesCache[columnId];
			},
			renderValue: (columnId) => {
				var _row$getValue;
				return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table.options.renderFallbackValue;
			},
			subRows: subRows != null ? subRows : [],
			getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
			getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : void 0,
			getParentRows: () => {
				let parentRows = [];
				let currentRow = row;
				while (true) {
					const parentRow = currentRow.getParentRow();
					if (!parentRow) break;
					parentRows.push(parentRow);
					currentRow = parentRow;
				}
				return parentRows.reverse();
			},
			getAllCells: memo$1(() => [table.getAllLeafColumns()], (leafColumns) => {
				return leafColumns.map((column) => {
					return createCell(table, row, column, column.id);
				});
			}, getMemoOptions(table.options, "debugRows", "getAllCells")),
			_getAllCellsByColumnId: memo$1(() => [row.getAllCells()], (allCells) => {
				return allCells.reduce((acc, cell) => {
					acc[cell.column.id] = cell;
					return acc;
				}, {});
			}, getMemoOptions(table.options, "debugRows", "getAllCellsByColumnId"))
		};
		for (let i = 0; i < table._features.length; i++) {
			const feature = table._features[i];
			feature == null || feature.createRow == null || feature.createRow(row, table);
		}
		return row;
	};
	ColumnFaceting = { createColumn: (column, table) => {
		column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
		column.getFacetedRowModel = () => {
			if (!column._getFacetedRowModel) return table.getPreFilteredRowModel();
			return column._getFacetedRowModel();
		};
		column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
		column.getFacetedUniqueValues = () => {
			if (!column._getFacetedUniqueValues) return /* @__PURE__ */ new Map();
			return column._getFacetedUniqueValues();
		};
		column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
		column.getFacetedMinMaxValues = () => {
			if (!column._getFacetedMinMaxValues) return;
			return column._getFacetedMinMaxValues();
		};
	} };
	includesString = (row, columnId, filterValue) => {
		var _filterValue$toString, _row$getValue;
		const search = filterValue == null || (_filterValue$toString = filterValue.toString()) == null ? void 0 : _filterValue$toString.toLowerCase();
		return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
	};
	includesString.autoRemove = (val) => testFalsey(val);
	includesStringSensitive = (row, columnId, filterValue) => {
		var _row$getValue2;
		return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
	};
	includesStringSensitive.autoRemove = (val) => testFalsey(val);
	equalsString = (row, columnId, filterValue) => {
		var _row$getValue3;
		return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
	};
	equalsString.autoRemove = (val) => testFalsey(val);
	arrIncludes = (row, columnId, filterValue) => {
		var _row$getValue4;
		return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
	};
	arrIncludes.autoRemove = (val) => testFalsey(val);
	arrIncludesAll = (row, columnId, filterValue) => {
		return !filterValue.some((val) => {
			var _row$getValue5;
			return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
		});
	};
	arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
	arrIncludesSome = (row, columnId, filterValue) => {
		return filterValue.some((val) => {
			var _row$getValue6;
			return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
		});
	};
	arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
	equals = (row, columnId, filterValue) => {
		return row.getValue(columnId) === filterValue;
	};
	equals.autoRemove = (val) => testFalsey(val);
	weakEquals = (row, columnId, filterValue) => {
		return row.getValue(columnId) == filterValue;
	};
	weakEquals.autoRemove = (val) => testFalsey(val);
	inNumberRange = (row, columnId, filterValue) => {
		let [min, max] = filterValue;
		const rowValue = row.getValue(columnId);
		return rowValue >= min && rowValue <= max;
	};
	inNumberRange.resolveFilterValue = (val) => {
		let [unsafeMin, unsafeMax] = val;
		let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
		let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
		let min = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
		let max = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
		if (min > max) {
			const temp = min;
			min = max;
			max = temp;
		}
		return [min, max];
	};
	inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
	filterFns = {
		includesString,
		includesStringSensitive,
		equalsString,
		arrIncludes,
		arrIncludesAll,
		arrIncludesSome,
		equals,
		weakEquals,
		inNumberRange
	};
	ColumnFiltering = {
		getDefaultColumnDef: () => {
			return { filterFn: "auto" };
		},
		getInitialState: (state) => {
			return {
				columnFilters: [],
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				onColumnFiltersChange: makeStateUpdater("columnFilters", table),
				filterFromLeafRows: false,
				maxLeafRowFilterDepth: 100
			};
		},
		createColumn: (column, table) => {
			column.getAutoFilterFn = () => {
				const firstRow = table.getCoreRowModel().flatRows[0];
				const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
				if (typeof value === "string") return filterFns.includesString;
				if (typeof value === "number") return filterFns.inNumberRange;
				if (typeof value === "boolean") return filterFns.equals;
				if (value !== null && typeof value === "object") return filterFns.equals;
				if (Array.isArray(value)) return filterFns.arrIncludes;
				return filterFns.weakEquals;
			};
			column.getFilterFn = () => {
				var _table$options$filter, _table$options$filter2;
				return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn];
			};
			column.getCanFilter = () => {
				var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
				return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
			};
			column.getIsFiltered = () => column.getFilterIndex() > -1;
			column.getFilterValue = () => {
				var _table$getState$colum;
				return (_table$getState$colum = table.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find((d) => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
			};
			column.getFilterIndex = () => {
				var _table$getState$colum2, _table$getState$colum3;
				return (_table$getState$colum2 = (_table$getState$colum3 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex((d) => d.id === column.id)) != null ? _table$getState$colum2 : -1;
			};
			column.setFilterValue = (value) => {
				table.setColumnFilters((old) => {
					const filterFn = column.getFilterFn();
					const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
					const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0);
					if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
						var _old$filter;
						return (_old$filter = old == null ? void 0 : old.filter((d) => d.id !== column.id)) != null ? _old$filter : [];
					}
					const newFilterObj = {
						id: column.id,
						value: newFilter
					};
					if (previousFilter) {
						var _old$map;
						return (_old$map = old == null ? void 0 : old.map((d) => {
							if (d.id === column.id) return newFilterObj;
							return d;
						})) != null ? _old$map : [];
					}
					if (old != null && old.length) return [...old, newFilterObj];
					return [newFilterObj];
				});
			};
		},
		createRow: (row, _table) => {
			row.columnFilters = {};
			row.columnFiltersMeta = {};
		},
		createTable: (table) => {
			table.setColumnFilters = (updater) => {
				const leafColumns = table.getAllLeafColumns();
				const updateFn = (old) => {
					var _functionalUpdate;
					return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter((filter) => {
						const column = leafColumns.find((d) => d.id === filter.id);
						if (column) {
							if (shouldAutoRemoveFilter(column.getFilterFn(), filter.value, column)) return false;
						}
						return true;
					});
				};
				table.options.onColumnFiltersChange == null || table.options.onColumnFiltersChange(updateFn);
			};
			table.resetColumnFilters = (defaultState) => {
				var _table$initialState$c, _table$initialState;
				table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
			};
			table.getPreFilteredRowModel = () => table.getCoreRowModel();
			table.getFilteredRowModel = () => {
				if (!table._getFilteredRowModel && table.options.getFilteredRowModel) table._getFilteredRowModel = table.options.getFilteredRowModel(table);
				if (table.options.manualFiltering || !table._getFilteredRowModel) return table.getPreFilteredRowModel();
				return table._getFilteredRowModel();
			};
		}
	};
	sum$1 = (columnId, _leafRows, childRows) => {
		return childRows.reduce((sum, next) => {
			const nextValue = next.getValue(columnId);
			return sum + (typeof nextValue === "number" ? nextValue : 0);
		}, 0);
	};
	min$1 = (columnId, _leafRows, childRows) => {
		let min;
		childRows.forEach((row) => {
			const value = row.getValue(columnId);
			if (value != null && (min > value || min === void 0 && value >= value)) min = value;
		});
		return min;
	};
	max$1 = (columnId, _leafRows, childRows) => {
		let max;
		childRows.forEach((row) => {
			const value = row.getValue(columnId);
			if (value != null && (max < value || max === void 0 && value >= value)) max = value;
		});
		return max;
	};
	extent = (columnId, _leafRows, childRows) => {
		let min;
		let max;
		childRows.forEach((row) => {
			const value = row.getValue(columnId);
			if (value != null) if (min === void 0) {
				if (value >= value) min = max = value;
			} else {
				if (min > value) min = value;
				if (max < value) max = value;
			}
		});
		return [min, max];
	};
	mean$1 = (columnId, leafRows) => {
		let count = 0;
		let sum = 0;
		leafRows.forEach((row) => {
			let value = row.getValue(columnId);
			if (value != null && (value = +value) >= value) ++count, sum += value;
		});
		if (count) return sum / count;
	};
	median = (columnId, leafRows) => {
		if (!leafRows.length) return;
		const values = leafRows.map((row) => row.getValue(columnId));
		if (!isNumberArray(values)) return;
		if (values.length === 1) return values[0];
		const mid = Math.floor(values.length / 2);
		const nums = values.sort((a, b) => a - b);
		return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
	};
	unique = (columnId, leafRows) => {
		return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
	};
	uniqueCount = (columnId, leafRows) => {
		return new Set(leafRows.map((d) => d.getValue(columnId))).size;
	};
	count = (_columnId, leafRows) => {
		return leafRows.length;
	};
	aggregationFns = {
		sum: sum$1,
		min: min$1,
		max: max$1,
		extent,
		mean: mean$1,
		median,
		unique,
		uniqueCount,
		count
	};
	ColumnGrouping = {
		getDefaultColumnDef: () => {
			return {
				aggregatedCell: (props) => {
					var _toString, _props$getValue;
					return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
				},
				aggregationFn: "auto"
			};
		},
		getInitialState: (state) => {
			return {
				grouping: [],
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				onGroupingChange: makeStateUpdater("grouping", table),
				groupedColumnMode: "reorder"
			};
		},
		createColumn: (column, table) => {
			column.toggleGrouping = () => {
				table.setGrouping((old) => {
					if (old != null && old.includes(column.id)) return old.filter((d) => d !== column.id);
					return [...old != null ? old : [], column.id];
				});
			};
			column.getCanGroup = () => {
				var _column$columnDef$ena, _table$options$enable;
				return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
			};
			column.getIsGrouped = () => {
				var _table$getState$group;
				return (_table$getState$group = table.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
			};
			column.getGroupedIndex = () => {
				var _table$getState$group2;
				return (_table$getState$group2 = table.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
			};
			column.getToggleGroupingHandler = () => {
				const canGroup = column.getCanGroup();
				return () => {
					if (!canGroup) return;
					column.toggleGrouping();
				};
			};
			column.getAutoAggregationFn = () => {
				const firstRow = table.getCoreRowModel().flatRows[0];
				const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
				if (typeof value === "number") return aggregationFns.sum;
				if (Object.prototype.toString.call(value) === "[object Date]") return aggregationFns.extent;
			};
			column.getAggregationFn = () => {
				var _table$options$aggreg, _table$options$aggreg2;
				if (!column) throw new Error();
				return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
			};
		},
		createTable: (table) => {
			table.setGrouping = (updater) => table.options.onGroupingChange == null ? void 0 : table.options.onGroupingChange(updater);
			table.resetGrouping = (defaultState) => {
				var _table$initialState$g, _table$initialState;
				table.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
			};
			table.getPreGroupedRowModel = () => table.getFilteredRowModel();
			table.getGroupedRowModel = () => {
				if (!table._getGroupedRowModel && table.options.getGroupedRowModel) table._getGroupedRowModel = table.options.getGroupedRowModel(table);
				if (table.options.manualGrouping || !table._getGroupedRowModel) return table.getPreGroupedRowModel();
				return table._getGroupedRowModel();
			};
		},
		createRow: (row, table) => {
			row.getIsGrouped = () => !!row.groupingColumnId;
			row.getGroupingValue = (columnId) => {
				if (row._groupingValuesCache.hasOwnProperty(columnId)) return row._groupingValuesCache[columnId];
				const column = table.getColumn(columnId);
				if (!(column != null && column.columnDef.getGroupingValue)) return row.getValue(columnId);
				row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
				return row._groupingValuesCache[columnId];
			};
			row._groupingValuesCache = {};
		},
		createCell: (cell, column, row, table) => {
			cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
			cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
			cell.getIsAggregated = () => {
				var _row$subRows;
				return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
			};
		}
	};
	ColumnOrdering = {
		getInitialState: (state) => {
			return {
				columnOrder: [],
				...state
			};
		},
		getDefaultOptions: (table) => {
			return { onColumnOrderChange: makeStateUpdater("columnOrder", table) };
		},
		createColumn: (column, table) => {
			column.getIndex = memo$1((position) => [_getVisibleLeafColumns(table, position)], (columns) => columns.findIndex((d) => d.id === column.id), getMemoOptions(table.options, "debugColumns", "getIndex"));
			column.getIsFirstColumn = (position) => {
				var _columns$;
				return ((_columns$ = _getVisibleLeafColumns(table, position)[0]) == null ? void 0 : _columns$.id) === column.id;
			};
			column.getIsLastColumn = (position) => {
				var _columns;
				const columns = _getVisibleLeafColumns(table, position);
				return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
			};
		},
		createTable: (table) => {
			table.setColumnOrder = (updater) => table.options.onColumnOrderChange == null ? void 0 : table.options.onColumnOrderChange(updater);
			table.resetColumnOrder = (defaultState) => {
				var _table$initialState$c;
				table.setColumnOrder(defaultState ? [] : (_table$initialState$c = table.initialState.columnOrder) != null ? _table$initialState$c : []);
			};
			table._getOrderColumnsFn = memo$1(() => [
				table.getState().columnOrder,
				table.getState().grouping,
				table.options.groupedColumnMode
			], (columnOrder, grouping, groupedColumnMode) => (columns) => {
				let orderedColumns = [];
				if (!(columnOrder != null && columnOrder.length)) orderedColumns = columns;
				else {
					const columnOrderCopy = [...columnOrder];
					const columnsCopy = [...columns];
					while (columnsCopy.length && columnOrderCopy.length) {
						const targetColumnId = columnOrderCopy.shift();
						const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId);
						if (foundIndex > -1) orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
					}
					orderedColumns = [...orderedColumns, ...columnsCopy];
				}
				return orderColumns(orderedColumns, grouping, groupedColumnMode);
			}, getMemoOptions(table.options, "debugTable", "_getOrderColumnsFn"));
		}
	};
	getDefaultColumnPinningState = () => ({
		left: [],
		right: []
	});
	ColumnPinning = {
		getInitialState: (state) => {
			return {
				columnPinning: getDefaultColumnPinningState(),
				...state
			};
		},
		getDefaultOptions: (table) => {
			return { onColumnPinningChange: makeStateUpdater("columnPinning", table) };
		},
		createColumn: (column, table) => {
			column.pin = (position) => {
				const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
				table.setColumnPinning((old) => {
					var _old$left3, _old$right3;
					if (position === "right") {
						var _old$left, _old$right;
						return {
							left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
							right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds]
						};
					}
					if (position === "left") {
						var _old$left2, _old$right2;
						return {
							left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds],
							right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
						};
					}
					return {
						left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
						right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
					};
				});
			};
			column.getCanPin = () => {
				return column.getLeafColumns().some((d) => {
					var _d$columnDef$enablePi, _ref, _table$options$enable;
					return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table.options.enableColumnPinning) != null ? _table$options$enable : table.options.enablePinning) != null ? _ref : true);
				});
			};
			column.getIsPinned = () => {
				const leafColumnIds = column.getLeafColumns().map((d) => d.id);
				const { left, right } = table.getState().columnPinning;
				const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
				const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
				return isLeft ? "left" : isRight ? "right" : false;
			};
			column.getPinnedIndex = () => {
				var _table$getState$colum, _table$getState$colum2;
				const position = column.getIsPinned();
				return position ? (_table$getState$colum = (_table$getState$colum2 = table.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
			};
		},
		createRow: (row, table) => {
			row.getCenterVisibleCells = memo$1(() => [
				row._getAllVisibleCells(),
				table.getState().columnPinning.left,
				table.getState().columnPinning.right
			], (allCells, left, right) => {
				const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
				return allCells.filter((d) => !leftAndRight.includes(d.column.id));
			}, getMemoOptions(table.options, "debugRows", "getCenterVisibleCells"));
			row.getLeftVisibleCells = memo$1(() => [row._getAllVisibleCells(), table.getState().columnPinning.left], (allCells, left) => {
				return (left != null ? left : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
					...d,
					position: "left"
				}));
			}, getMemoOptions(table.options, "debugRows", "getLeftVisibleCells"));
			row.getRightVisibleCells = memo$1(() => [row._getAllVisibleCells(), table.getState().columnPinning.right], (allCells, right) => {
				return (right != null ? right : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
					...d,
					position: "right"
				}));
			}, getMemoOptions(table.options, "debugRows", "getRightVisibleCells"));
		},
		createTable: (table) => {
			table.setColumnPinning = (updater) => table.options.onColumnPinningChange == null ? void 0 : table.options.onColumnPinningChange(updater);
			table.resetColumnPinning = (defaultState) => {
				var _table$initialState$c, _table$initialState;
				return table.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
			};
			table.getIsSomeColumnsPinned = (position) => {
				var _pinningState$positio;
				const pinningState = table.getState().columnPinning;
				if (!position) {
					var _pinningState$left, _pinningState$right;
					return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
				}
				return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
			};
			table.getLeftLeafColumns = memo$1(() => [table.getAllLeafColumns(), table.getState().columnPinning.left], (allColumns, left) => {
				return (left != null ? left : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
			}, getMemoOptions(table.options, "debugColumns", "getLeftLeafColumns"));
			table.getRightLeafColumns = memo$1(() => [table.getAllLeafColumns(), table.getState().columnPinning.right], (allColumns, right) => {
				return (right != null ? right : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
			}, getMemoOptions(table.options, "debugColumns", "getRightLeafColumns"));
			table.getCenterLeafColumns = memo$1(() => [
				table.getAllLeafColumns(),
				table.getState().columnPinning.left,
				table.getState().columnPinning.right
			], (allColumns, left, right) => {
				const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
				return allColumns.filter((d) => !leftAndRight.includes(d.id));
			}, getMemoOptions(table.options, "debugColumns", "getCenterLeafColumns"));
		}
	};
	defaultColumnSizing = {
		size: 150,
		minSize: 20,
		maxSize: Number.MAX_SAFE_INTEGER
	};
	getDefaultColumnSizingInfoState = () => ({
		startOffset: null,
		startSize: null,
		deltaOffset: null,
		deltaPercentage: null,
		isResizingColumn: false,
		columnSizingStart: []
	});
	ColumnSizing = {
		getDefaultColumnDef: () => {
			return defaultColumnSizing;
		},
		getInitialState: (state) => {
			return {
				columnSizing: {},
				columnSizingInfo: getDefaultColumnSizingInfoState(),
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				columnResizeMode: "onEnd",
				columnResizeDirection: "ltr",
				onColumnSizingChange: makeStateUpdater("columnSizing", table),
				onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table)
			};
		},
		createColumn: (column, table) => {
			column.getSize = () => {
				var _column$columnDef$min, _ref, _column$columnDef$max;
				const columnSize = table.getState().columnSizing[column.id];
				return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
			};
			column.getStart = memo$1((position) => [
				position,
				_getVisibleLeafColumns(table, position),
				table.getState().columnSizing
			], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum, column) => sum + column.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getStart"));
			column.getAfter = memo$1((position) => [
				position,
				_getVisibleLeafColumns(table, position),
				table.getState().columnSizing
			], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum, column) => sum + column.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getAfter"));
			column.resetSize = () => {
				table.setColumnSizing((_ref2) => {
					let { [column.id]: _, ...rest } = _ref2;
					return rest;
				});
			};
			column.getCanResize = () => {
				var _column$columnDef$ena, _table$options$enable;
				return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnResizing) != null ? _table$options$enable : true);
			};
			column.getIsResizing = () => {
				return table.getState().columnSizingInfo.isResizingColumn === column.id;
			};
		},
		createHeader: (header, table) => {
			header.getSize = () => {
				let sum = 0;
				const recurse = (header) => {
					if (header.subHeaders.length) header.subHeaders.forEach(recurse);
					else {
						var _header$column$getSiz;
						sum += (_header$column$getSiz = header.column.getSize()) != null ? _header$column$getSiz : 0;
					}
				};
				recurse(header);
				return sum;
			};
			header.getStart = () => {
				if (header.index > 0) {
					const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
					return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
				}
				return 0;
			};
			header.getResizeHandler = (_contextDocument) => {
				const column = table.getColumn(header.column.id);
				const canResize = column == null ? void 0 : column.getCanResize();
				return (e) => {
					if (!column || !canResize) return;
					e.persist == null || e.persist();
					if (isTouchStartEvent(e)) {
						if (e.touches && e.touches.length > 1) return;
					}
					const startSize = header.getSize();
					const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
					const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
					const newColumnSizing = {};
					const updateOffset = (eventType, clientXPos) => {
						if (typeof clientXPos !== "number") return;
						table.setColumnSizingInfo((old) => {
							var _old$startOffset, _old$startSize;
							const deltaDirection = table.options.columnResizeDirection === "rtl" ? -1 : 1;
							const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
							const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -.999999);
							old.columnSizingStart.forEach((_ref3) => {
								let [columnId, headerSize] = _ref3;
								newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
							});
							return {
								...old,
								deltaOffset,
								deltaPercentage
							};
						});
						if (table.options.columnResizeMode === "onChange" || eventType === "end") table.setColumnSizing((old) => ({
							...old,
							...newColumnSizing
						}));
					};
					const onMove = (clientXPos) => updateOffset("move", clientXPos);
					const onEnd = (clientXPos) => {
						updateOffset("end", clientXPos);
						table.setColumnSizingInfo((old) => ({
							...old,
							isResizingColumn: false,
							startOffset: null,
							startSize: null,
							deltaOffset: null,
							deltaPercentage: null,
							columnSizingStart: []
						}));
					};
					const contextDocument = safelyAccessDocument(_contextDocument);
					const mouseEvents = {
						moveHandler: (e) => onMove(e.clientX),
						upHandler: (e) => {
							contextDocument?.removeEventListener("mousemove", mouseEvents.moveHandler);
							contextDocument?.removeEventListener("mouseup", mouseEvents.upHandler);
							onEnd(e.clientX);
						}
					};
					const touchEvents = {
						moveHandler: (e) => {
							if (e.cancelable) {
								e.preventDefault();
								e.stopPropagation();
							}
							onMove(e.touches[0].clientX);
							return false;
						},
						upHandler: (e) => {
							var _e$touches$;
							contextDocument?.removeEventListener("touchmove", touchEvents.moveHandler);
							contextDocument?.removeEventListener("touchend", touchEvents.upHandler);
							if (e.cancelable) {
								e.preventDefault();
								e.stopPropagation();
							}
							onEnd((_e$touches$ = e.touches[0]) == null ? void 0 : _e$touches$.clientX);
						}
					};
					const passiveIfSupported = passiveEventSupported() ? { passive: false } : false;
					if (isTouchStartEvent(e)) {
						contextDocument?.addEventListener("touchmove", touchEvents.moveHandler, passiveIfSupported);
						contextDocument?.addEventListener("touchend", touchEvents.upHandler, passiveIfSupported);
					} else {
						contextDocument?.addEventListener("mousemove", mouseEvents.moveHandler, passiveIfSupported);
						contextDocument?.addEventListener("mouseup", mouseEvents.upHandler, passiveIfSupported);
					}
					table.setColumnSizingInfo((old) => ({
						...old,
						startOffset: clientX,
						startSize,
						deltaOffset: 0,
						deltaPercentage: 0,
						columnSizingStart,
						isResizingColumn: column.id
					}));
				};
			};
		},
		createTable: (table) => {
			table.setColumnSizing = (updater) => table.options.onColumnSizingChange == null ? void 0 : table.options.onColumnSizingChange(updater);
			table.setColumnSizingInfo = (updater) => table.options.onColumnSizingInfoChange == null ? void 0 : table.options.onColumnSizingInfoChange(updater);
			table.resetColumnSizing = (defaultState) => {
				var _table$initialState$c;
				table.setColumnSizing(defaultState ? {} : (_table$initialState$c = table.initialState.columnSizing) != null ? _table$initialState$c : {});
			};
			table.resetHeaderSizeInfo = (defaultState) => {
				var _table$initialState$c2;
				table.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
			};
			table.getTotalSize = () => {
				var _table$getHeaderGroup, _table$getHeaderGroup2;
				return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum, header) => {
					return sum + header.getSize();
				}, 0)) != null ? _table$getHeaderGroup : 0;
			};
			table.getLeftTotalSize = () => {
				var _table$getLeftHeaderG, _table$getLeftHeaderG2;
				return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum, header) => {
					return sum + header.getSize();
				}, 0)) != null ? _table$getLeftHeaderG : 0;
			};
			table.getCenterTotalSize = () => {
				var _table$getCenterHeade, _table$getCenterHeade2;
				return (_table$getCenterHeade = (_table$getCenterHeade2 = table.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum, header) => {
					return sum + header.getSize();
				}, 0)) != null ? _table$getCenterHeade : 0;
			};
			table.getRightTotalSize = () => {
				var _table$getRightHeader, _table$getRightHeader2;
				return (_table$getRightHeader = (_table$getRightHeader2 = table.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum, header) => {
					return sum + header.getSize();
				}, 0)) != null ? _table$getRightHeader : 0;
			};
		}
	};
	passiveSupported = null;
	ColumnVisibility = {
		getInitialState: (state) => {
			return {
				columnVisibility: {},
				...state
			};
		},
		getDefaultOptions: (table) => {
			return { onColumnVisibilityChange: makeStateUpdater("columnVisibility", table) };
		},
		createColumn: (column, table) => {
			column.toggleVisibility = (value) => {
				if (column.getCanHide()) table.setColumnVisibility((old) => ({
					...old,
					[column.id]: value != null ? value : !column.getIsVisible()
				}));
			};
			column.getIsVisible = () => {
				var _ref, _table$getState$colum;
				const childColumns = column.columns;
				return (_ref = childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_table$getState$colum = table.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
			};
			column.getCanHide = () => {
				var _column$columnDef$ena, _table$options$enable;
				return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableHiding) != null ? _table$options$enable : true);
			};
			column.getToggleVisibilityHandler = () => {
				return (e) => {
					column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
				};
			};
		},
		createRow: (row, table) => {
			row._getAllVisibleCells = memo$1(() => [row.getAllCells(), table.getState().columnVisibility], (cells) => {
				return cells.filter((cell) => cell.column.getIsVisible());
			}, getMemoOptions(table.options, "debugRows", "_getAllVisibleCells"));
			row.getVisibleCells = memo$1(() => [
				row.getLeftVisibleCells(),
				row.getCenterVisibleCells(),
				row.getRightVisibleCells()
			], (left, center, right) => [
				...left,
				...center,
				...right
			], getMemoOptions(table.options, "debugRows", "getVisibleCells"));
		},
		createTable: (table) => {
			const makeVisibleColumnsMethod = (key, getColumns) => {
				return memo$1(() => [getColumns(), getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")], (columns) => {
					return columns.filter((d) => d.getIsVisible == null ? void 0 : d.getIsVisible());
				}, getMemoOptions(table.options, "debugColumns", key));
			};
			table.getVisibleFlatColumns = makeVisibleColumnsMethod("getVisibleFlatColumns", () => table.getAllFlatColumns());
			table.getVisibleLeafColumns = makeVisibleColumnsMethod("getVisibleLeafColumns", () => table.getAllLeafColumns());
			table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod("getLeftVisibleLeafColumns", () => table.getLeftLeafColumns());
			table.getRightVisibleLeafColumns = makeVisibleColumnsMethod("getRightVisibleLeafColumns", () => table.getRightLeafColumns());
			table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod("getCenterVisibleLeafColumns", () => table.getCenterLeafColumns());
			table.setColumnVisibility = (updater) => table.options.onColumnVisibilityChange == null ? void 0 : table.options.onColumnVisibilityChange(updater);
			table.resetColumnVisibility = (defaultState) => {
				var _table$initialState$c;
				table.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table.initialState.columnVisibility) != null ? _table$initialState$c : {});
			};
			table.toggleAllColumnsVisible = (value) => {
				var _value;
				value = (_value = value) != null ? _value : !table.getIsAllColumnsVisible();
				table.setColumnVisibility(table.getAllLeafColumns().reduce((obj, column) => ({
					...obj,
					[column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
				}), {}));
			};
			table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some((column) => !(column.getIsVisible != null && column.getIsVisible()));
			table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some((column) => column.getIsVisible == null ? void 0 : column.getIsVisible());
			table.getToggleAllColumnsVisibilityHandler = () => {
				return (e) => {
					var _target;
					table.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
				};
			};
		}
	};
	GlobalFaceting = { createTable: (table) => {
		table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, "__global__");
		table.getGlobalFacetedRowModel = () => {
			if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) return table.getPreFilteredRowModel();
			return table._getGlobalFacetedRowModel();
		};
		table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, "__global__");
		table.getGlobalFacetedUniqueValues = () => {
			if (!table._getGlobalFacetedUniqueValues) return /* @__PURE__ */ new Map();
			return table._getGlobalFacetedUniqueValues();
		};
		table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, "__global__");
		table.getGlobalFacetedMinMaxValues = () => {
			if (!table._getGlobalFacetedMinMaxValues) return;
			return table._getGlobalFacetedMinMaxValues();
		};
	} };
	GlobalFiltering = {
		getInitialState: (state) => {
			return {
				globalFilter: void 0,
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				onGlobalFilterChange: makeStateUpdater("globalFilter", table),
				globalFilterFn: "auto",
				getColumnCanGlobalFilter: (column) => {
					var _table$getCoreRowMode;
					const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
					return typeof value === "string" || typeof value === "number";
				}
			};
		},
		createColumn: (column, table) => {
			column.getCanGlobalFilter = () => {
				var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
				return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
			};
		},
		createTable: (table) => {
			table.getGlobalAutoFilterFn = () => {
				return filterFns.includesString;
			};
			table.getGlobalFilterFn = () => {
				var _table$options$filter, _table$options$filter2;
				const { globalFilterFn } = table.options;
				return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
			};
			table.setGlobalFilter = (updater) => {
				table.options.onGlobalFilterChange == null || table.options.onGlobalFilterChange(updater);
			};
			table.resetGlobalFilter = (defaultState) => {
				table.setGlobalFilter(defaultState ? void 0 : table.initialState.globalFilter);
			};
		}
	};
	RowExpanding = {
		getInitialState: (state) => {
			return {
				expanded: {},
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				onExpandedChange: makeStateUpdater("expanded", table),
				paginateExpandedRows: true
			};
		},
		createTable: (table) => {
			let registered = false;
			let queued = false;
			table._autoResetExpanded = () => {
				var _ref, _table$options$autoRe;
				if (!registered) {
					table._queue(() => {
						registered = true;
					});
					return;
				}
				if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetExpanded) != null ? _ref : !table.options.manualExpanding) {
					if (queued) return;
					queued = true;
					table._queue(() => {
						table.resetExpanded();
						queued = false;
					});
				}
			};
			table.setExpanded = (updater) => table.options.onExpandedChange == null ? void 0 : table.options.onExpandedChange(updater);
			table.toggleAllRowsExpanded = (expanded) => {
				if (expanded != null ? expanded : !table.getIsAllRowsExpanded()) table.setExpanded(true);
				else table.setExpanded({});
			};
			table.resetExpanded = (defaultState) => {
				var _table$initialState$e, _table$initialState;
				table.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
			};
			table.getCanSomeRowsExpand = () => {
				return table.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
			};
			table.getToggleAllRowsExpandedHandler = () => {
				return (e) => {
					e.persist == null || e.persist();
					table.toggleAllRowsExpanded();
				};
			};
			table.getIsSomeRowsExpanded = () => {
				const expanded = table.getState().expanded;
				return expanded === true || Object.values(expanded).some(Boolean);
			};
			table.getIsAllRowsExpanded = () => {
				const expanded = table.getState().expanded;
				if (typeof expanded === "boolean") return expanded === true;
				if (!Object.keys(expanded).length) return false;
				if (table.getRowModel().flatRows.some((row) => !row.getIsExpanded())) return false;
				return true;
			};
			table.getExpandedDepth = () => {
				let maxDepth = 0;
				(table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded)).forEach((id) => {
					const splitId = id.split(".");
					maxDepth = Math.max(maxDepth, splitId.length);
				});
				return maxDepth;
			};
			table.getPreExpandedRowModel = () => table.getSortedRowModel();
			table.getExpandedRowModel = () => {
				if (!table._getExpandedRowModel && table.options.getExpandedRowModel) table._getExpandedRowModel = table.options.getExpandedRowModel(table);
				if (table.options.manualExpanding || !table._getExpandedRowModel) return table.getPreExpandedRowModel();
				return table._getExpandedRowModel();
			};
		},
		createRow: (row, table) => {
			row.toggleExpanded = (expanded) => {
				table.setExpanded((old) => {
					var _expanded;
					const exists = old === true ? true : !!(old != null && old[row.id]);
					let oldExpanded = {};
					if (old === true) Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
						oldExpanded[rowId] = true;
					});
					else oldExpanded = old;
					expanded = (_expanded = expanded) != null ? _expanded : !exists;
					if (!exists && expanded) return {
						...oldExpanded,
						[row.id]: true
					};
					if (exists && !expanded) {
						const { [row.id]: _, ...rest } = oldExpanded;
						return rest;
					}
					return old;
				});
			};
			row.getIsExpanded = () => {
				var _table$options$getIsR;
				const expanded = table.getState().expanded;
				return !!((_table$options$getIsR = table.options.getIsRowExpanded == null ? void 0 : table.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
			};
			row.getCanExpand = () => {
				var _table$options$getRow, _table$options$enable, _row$subRows;
				return (_table$options$getRow = table.options.getRowCanExpand == null ? void 0 : table.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
			};
			row.getIsAllParentsExpanded = () => {
				let isFullyExpanded = true;
				let currentRow = row;
				while (isFullyExpanded && currentRow.parentId) {
					currentRow = table.getRow(currentRow.parentId, true);
					isFullyExpanded = currentRow.getIsExpanded();
				}
				return isFullyExpanded;
			};
			row.getToggleExpandedHandler = () => {
				const canExpand = row.getCanExpand();
				return () => {
					if (!canExpand) return;
					row.toggleExpanded();
				};
			};
		}
	};
	defaultPageIndex = 0;
	defaultPageSize = 10;
	getDefaultPaginationState = () => ({
		pageIndex: defaultPageIndex,
		pageSize: defaultPageSize
	});
	RowPagination = {
		getInitialState: (state) => {
			return {
				...state,
				pagination: {
					...getDefaultPaginationState(),
					...state == null ? void 0 : state.pagination
				}
			};
		},
		getDefaultOptions: (table) => {
			return { onPaginationChange: makeStateUpdater("pagination", table) };
		},
		createTable: (table) => {
			let registered = false;
			let queued = false;
			table._autoResetPageIndex = () => {
				var _ref, _table$options$autoRe;
				if (!registered) {
					table._queue(() => {
						registered = true;
					});
					return;
				}
				if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetPageIndex) != null ? _ref : !table.options.manualPagination) {
					if (queued) return;
					queued = true;
					table._queue(() => {
						table.resetPageIndex();
						queued = false;
					});
				}
			};
			table.setPagination = (updater) => {
				const safeUpdater = (old) => {
					return functionalUpdate(updater, old);
				};
				return table.options.onPaginationChange == null ? void 0 : table.options.onPaginationChange(safeUpdater);
			};
			table.resetPagination = (defaultState) => {
				var _table$initialState$p;
				table.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
			};
			table.setPageIndex = (updater) => {
				table.setPagination((old) => {
					let pageIndex = functionalUpdate(updater, old.pageIndex);
					const maxPageIndex = typeof table.options.pageCount === "undefined" || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
					pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
					return {
						...old,
						pageIndex
					};
				});
			};
			table.resetPageIndex = (defaultState) => {
				var _table$initialState$p2, _table$initialState;
				table.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
			};
			table.resetPageSize = (defaultState) => {
				var _table$initialState$p3, _table$initialState2;
				table.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
			};
			table.setPageSize = (updater) => {
				table.setPagination((old) => {
					const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
					const topRowIndex = old.pageSize * old.pageIndex;
					const pageIndex = Math.floor(topRowIndex / pageSize);
					return {
						...old,
						pageIndex,
						pageSize
					};
				});
			};
			table.setPageCount = (updater) => table.setPagination((old) => {
				var _table$options$pageCo;
				let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table.options.pageCount) != null ? _table$options$pageCo : -1);
				if (typeof newPageCount === "number") newPageCount = Math.max(-1, newPageCount);
				return {
					...old,
					pageCount: newPageCount
				};
			});
			table.getPageOptions = memo$1(() => [table.getPageCount()], (pageCount) => {
				let pageOptions = [];
				if (pageCount && pageCount > 0) pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
				return pageOptions;
			}, getMemoOptions(table.options, "debugTable", "getPageOptions"));
			table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
			table.getCanNextPage = () => {
				const { pageIndex } = table.getState().pagination;
				const pageCount = table.getPageCount();
				if (pageCount === -1) return true;
				if (pageCount === 0) return false;
				return pageIndex < pageCount - 1;
			};
			table.previousPage = () => {
				return table.setPageIndex((old) => old - 1);
			};
			table.nextPage = () => {
				return table.setPageIndex((old) => {
					return old + 1;
				});
			};
			table.firstPage = () => {
				return table.setPageIndex(0);
			};
			table.lastPage = () => {
				return table.setPageIndex(table.getPageCount() - 1);
			};
			table.getPrePaginationRowModel = () => table.getExpandedRowModel();
			table.getPaginationRowModel = () => {
				if (!table._getPaginationRowModel && table.options.getPaginationRowModel) table._getPaginationRowModel = table.options.getPaginationRowModel(table);
				if (table.options.manualPagination || !table._getPaginationRowModel) return table.getPrePaginationRowModel();
				return table._getPaginationRowModel();
			};
			table.getPageCount = () => {
				var _table$options$pageCo2;
				return (_table$options$pageCo2 = table.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
			};
			table.getRowCount = () => {
				var _table$options$rowCou;
				return (_table$options$rowCou = table.options.rowCount) != null ? _table$options$rowCou : table.getPrePaginationRowModel().rows.length;
			};
		}
	};
	getDefaultRowPinningState = () => ({
		top: [],
		bottom: []
	});
	RowPinning = {
		getInitialState: (state) => {
			return {
				rowPinning: getDefaultRowPinningState(),
				...state
			};
		},
		getDefaultOptions: (table) => {
			return { onRowPinningChange: makeStateUpdater("rowPinning", table) };
		},
		createRow: (row, table) => {
			row.pin = (position, includeLeafRows, includeParentRows) => {
				const leafRowIds = includeLeafRows ? row.getLeafRows().map((_ref) => {
					let { id } = _ref;
					return id;
				}) : [];
				const parentRowIds = includeParentRows ? row.getParentRows().map((_ref2) => {
					let { id } = _ref2;
					return id;
				}) : [];
				const rowIds = /* @__PURE__ */ new Set([
					...parentRowIds,
					row.id,
					...leafRowIds
				]);
				table.setRowPinning((old) => {
					var _old$top3, _old$bottom3;
					if (position === "bottom") {
						var _old$top, _old$bottom;
						return {
							top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter((d) => !(rowIds != null && rowIds.has(d))),
							bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
						};
					}
					if (position === "top") {
						var _old$top2, _old$bottom2;
						return {
							top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
							bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
						};
					}
					return {
						top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter((d) => !(rowIds != null && rowIds.has(d))),
						bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
					};
				});
			};
			row.getCanPin = () => {
				var _ref3;
				const { enableRowPinning, enablePinning } = table.options;
				if (typeof enableRowPinning === "function") return enableRowPinning(row);
				return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
			};
			row.getIsPinned = () => {
				const rowIds = [row.id];
				const { top, bottom } = table.getState().rowPinning;
				const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
				const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
				return isTop ? "top" : isBottom ? "bottom" : false;
			};
			row.getPinnedIndex = () => {
				var _ref4, _visiblePinnedRowIds$;
				const position = row.getIsPinned();
				if (!position) return -1;
				const visiblePinnedRowIds = (_ref4 = position === "top" ? table.getTopRows() : table.getBottomRows()) == null ? void 0 : _ref4.map((_ref5) => {
					let { id } = _ref5;
					return id;
				});
				return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
			};
		},
		createTable: (table) => {
			table.setRowPinning = (updater) => table.options.onRowPinningChange == null ? void 0 : table.options.onRowPinningChange(updater);
			table.resetRowPinning = (defaultState) => {
				var _table$initialState$r, _table$initialState;
				return table.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
			};
			table.getIsSomeRowsPinned = (position) => {
				var _pinningState$positio;
				const pinningState = table.getState().rowPinning;
				if (!position) {
					var _pinningState$top, _pinningState$bottom;
					return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
				}
				return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
			};
			table._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
				var _table$options$keepPi;
				return (((_table$options$keepPi = table.options.keepPinnedRows) != null ? _table$options$keepPi : true) ? (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => {
					const row = table.getRow(rowId, true);
					return row.getIsAllParentsExpanded() ? row : null;
				}) : (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => visibleRows.find((row) => row.id === rowId))).filter(Boolean).map((d) => ({
					...d,
					position
				}));
			};
			table.getTopRows = memo$1(() => [table.getRowModel().rows, table.getState().rowPinning.top], (allRows, topPinnedRowIds) => table._getPinnedRows(allRows, topPinnedRowIds, "top"), getMemoOptions(table.options, "debugRows", "getTopRows"));
			table.getBottomRows = memo$1(() => [table.getRowModel().rows, table.getState().rowPinning.bottom], (allRows, bottomPinnedRowIds) => table._getPinnedRows(allRows, bottomPinnedRowIds, "bottom"), getMemoOptions(table.options, "debugRows", "getBottomRows"));
			table.getCenterRows = memo$1(() => [
				table.getRowModel().rows,
				table.getState().rowPinning.top,
				table.getState().rowPinning.bottom
			], (allRows, top, bottom) => {
				const topAndBottom = /* @__PURE__ */ new Set([...top != null ? top : [], ...bottom != null ? bottom : []]);
				return allRows.filter((d) => !topAndBottom.has(d.id));
			}, getMemoOptions(table.options, "debugRows", "getCenterRows"));
		}
	};
	RowSelection = {
		getInitialState: (state) => {
			return {
				rowSelection: {},
				...state
			};
		},
		getDefaultOptions: (table) => {
			return {
				onRowSelectionChange: makeStateUpdater("rowSelection", table),
				enableRowSelection: true,
				enableMultiRowSelection: true,
				enableSubRowSelection: true
			};
		},
		createTable: (table) => {
			table.setRowSelection = (updater) => table.options.onRowSelectionChange == null ? void 0 : table.options.onRowSelectionChange(updater);
			table.resetRowSelection = (defaultState) => {
				var _table$initialState$r;
				return table.setRowSelection(defaultState ? {} : (_table$initialState$r = table.initialState.rowSelection) != null ? _table$initialState$r : {});
			};
			table.toggleAllRowsSelected = (value) => {
				table.setRowSelection((old) => {
					value = typeof value !== "undefined" ? value : !table.getIsAllRowsSelected();
					const rowSelection = { ...old };
					const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;
					if (value) preGroupedFlatRows.forEach((row) => {
						if (!row.getCanSelect()) return;
						rowSelection[row.id] = true;
					});
					else preGroupedFlatRows.forEach((row) => {
						delete rowSelection[row.id];
					});
					return rowSelection;
				});
			};
			table.toggleAllPageRowsSelected = (value) => table.setRowSelection((old) => {
				const resolvedValue = typeof value !== "undefined" ? value : !table.getIsAllPageRowsSelected();
				const rowSelection = { ...old };
				table.getRowModel().rows.forEach((row) => {
					mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
				});
				return rowSelection;
			});
			table.getPreSelectedRowModel = () => table.getCoreRowModel();
			table.getSelectedRowModel = memo$1(() => [table.getState().rowSelection, table.getCoreRowModel()], (rowSelection, rowModel) => {
				if (!Object.keys(rowSelection).length) return {
					rows: [],
					flatRows: [],
					rowsById: {}
				};
				return selectRowsFn(table, rowModel);
			}, getMemoOptions(table.options, "debugTable", "getSelectedRowModel"));
			table.getFilteredSelectedRowModel = memo$1(() => [table.getState().rowSelection, table.getFilteredRowModel()], (rowSelection, rowModel) => {
				if (!Object.keys(rowSelection).length) return {
					rows: [],
					flatRows: [],
					rowsById: {}
				};
				return selectRowsFn(table, rowModel);
			}, getMemoOptions(table.options, "debugTable", "getFilteredSelectedRowModel"));
			table.getGroupedSelectedRowModel = memo$1(() => [table.getState().rowSelection, table.getSortedRowModel()], (rowSelection, rowModel) => {
				if (!Object.keys(rowSelection).length) return {
					rows: [],
					flatRows: [],
					rowsById: {}
				};
				return selectRowsFn(table, rowModel);
			}, getMemoOptions(table.options, "debugTable", "getGroupedSelectedRowModel"));
			table.getIsAllRowsSelected = () => {
				const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
				const { rowSelection } = table.getState();
				let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
				if (isAllRowsSelected) {
					if (preGroupedFlatRows.some((row) => row.getCanSelect() && !rowSelection[row.id])) isAllRowsSelected = false;
				}
				return isAllRowsSelected;
			};
			table.getIsAllPageRowsSelected = () => {
				const paginationFlatRows = table.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
				const { rowSelection } = table.getState();
				let isAllPageRowsSelected = !!paginationFlatRows.length;
				if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) isAllPageRowsSelected = false;
				return isAllPageRowsSelected;
			};
			table.getIsSomeRowsSelected = () => {
				var _table$getState$rowSe;
				const totalSelected = Object.keys((_table$getState$rowSe = table.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
				return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
			};
			table.getIsSomePageRowsSelected = () => {
				const paginationFlatRows = table.getPaginationRowModel().flatRows;
				return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
			};
			table.getToggleAllRowsSelectedHandler = () => {
				return (e) => {
					table.toggleAllRowsSelected(e.target.checked);
				};
			};
			table.getToggleAllPageRowsSelectedHandler = () => {
				return (e) => {
					table.toggleAllPageRowsSelected(e.target.checked);
				};
			};
		},
		createRow: (row, table) => {
			row.toggleSelected = (value, opts) => {
				const isSelected = row.getIsSelected();
				table.setRowSelection((old) => {
					var _opts$selectChildren;
					value = typeof value !== "undefined" ? value : !isSelected;
					if (row.getCanSelect() && isSelected === value) return old;
					const selectedRowIds = { ...old };
					mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table);
					return selectedRowIds;
				});
			};
			row.getIsSelected = () => {
				const { rowSelection } = table.getState();
				return isRowSelected(row, rowSelection);
			};
			row.getIsSomeSelected = () => {
				const { rowSelection } = table.getState();
				return isSubRowSelected(row, rowSelection) === "some";
			};
			row.getIsAllSubRowsSelected = () => {
				const { rowSelection } = table.getState();
				return isSubRowSelected(row, rowSelection) === "all";
			};
			row.getCanSelect = () => {
				var _table$options$enable;
				if (typeof table.options.enableRowSelection === "function") return table.options.enableRowSelection(row);
				return (_table$options$enable = table.options.enableRowSelection) != null ? _table$options$enable : true;
			};
			row.getCanSelectSubRows = () => {
				var _table$options$enable2;
				if (typeof table.options.enableSubRowSelection === "function") return table.options.enableSubRowSelection(row);
				return (_table$options$enable2 = table.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
			};
			row.getCanMultiSelect = () => {
				var _table$options$enable3;
				if (typeof table.options.enableMultiRowSelection === "function") return table.options.enableMultiRowSelection(row);
				return (_table$options$enable3 = table.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
			};
			row.getToggleSelectedHandler = () => {
				const canSelect = row.getCanSelect();
				return (e) => {
					var _target;
					if (!canSelect) return;
					row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
				};
			};
		}
	};
	mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
		var _row$subRows;
		const row = table.getRow(id, true);
		if (value) {
			if (!row.getCanMultiSelect()) Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
			if (row.getCanSelect()) selectedRowIds[id] = true;
		} else delete selectedRowIds[id];
		if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) row.subRows.forEach((row) => mutateRowIsSelected(selectedRowIds, row.id, value, includeChildren, table));
	};
	reSplitAlphaNumeric = /([0-9]+)/gm;
	alphanumeric = (rowA, rowB, columnId) => {
		return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
	};
	alphanumericCaseSensitive = (rowA, rowB, columnId) => {
		return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
	};
	text = (rowA, rowB, columnId) => {
		return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
	};
	textCaseSensitive = (rowA, rowB, columnId) => {
		return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
	};
	datetime = (rowA, rowB, columnId) => {
		const a = rowA.getValue(columnId);
		const b = rowB.getValue(columnId);
		return a > b ? 1 : a < b ? -1 : 0;
	};
	basic = (rowA, rowB, columnId) => {
		return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
	};
	sortingFns = {
		alphanumeric,
		alphanumericCaseSensitive,
		text,
		textCaseSensitive,
		datetime,
		basic
	};
	RowSorting = {
		getInitialState: (state) => {
			return {
				sorting: [],
				...state
			};
		},
		getDefaultColumnDef: () => {
			return {
				sortingFn: "auto",
				sortUndefined: 1
			};
		},
		getDefaultOptions: (table) => {
			return {
				onSortingChange: makeStateUpdater("sorting", table),
				isMultiSortEvent: (e) => {
					return e.shiftKey;
				}
			};
		},
		createColumn: (column, table) => {
			column.getAutoSortingFn = () => {
				const firstRows = table.getFilteredRowModel().flatRows.slice(10);
				let isString = false;
				for (const row of firstRows) {
					const value = row == null ? void 0 : row.getValue(column.id);
					if (Object.prototype.toString.call(value) === "[object Date]") return sortingFns.datetime;
					if (typeof value === "string") {
						isString = true;
						if (value.split(reSplitAlphaNumeric).length > 1) return sortingFns.alphanumeric;
					}
				}
				if (isString) return sortingFns.text;
				return sortingFns.basic;
			};
			column.getAutoSortDir = () => {
				const firstRow = table.getFilteredRowModel().flatRows[0];
				if (typeof (firstRow == null ? void 0 : firstRow.getValue(column.id)) === "string") return "asc";
				return "desc";
			};
			column.getSortingFn = () => {
				var _table$options$sortin, _table$options$sortin2;
				if (!column) throw new Error();
				return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
			};
			column.toggleSorting = (desc, multi) => {
				const nextSortingOrder = column.getNextSortingOrder();
				const hasManualValue = typeof desc !== "undefined" && desc !== null;
				table.setSorting((old) => {
					const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
					const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
					let newSorting = [];
					let sortAction;
					let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
					if (old != null && old.length && column.getCanMultiSort() && multi) if (existingSorting) sortAction = "toggle";
					else sortAction = "add";
					else if (old != null && old.length && existingIndex !== old.length - 1) sortAction = "replace";
					else if (existingSorting) sortAction = "toggle";
					else sortAction = "replace";
					if (sortAction === "toggle") {
						if (!hasManualValue) {
							if (!nextSortingOrder) sortAction = "remove";
						}
					}
					if (sortAction === "add") {
						var _table$options$maxMul;
						newSorting = [...old, {
							id: column.id,
							desc: nextDesc
						}];
						newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
					} else if (sortAction === "toggle") newSorting = old.map((d) => {
						if (d.id === column.id) return {
							...d,
							desc: nextDesc
						};
						return d;
					});
					else if (sortAction === "remove") newSorting = old.filter((d) => d.id !== column.id);
					else newSorting = [{
						id: column.id,
						desc: nextDesc
					}];
					return newSorting;
				});
			};
			column.getFirstSortDir = () => {
				var _ref, _column$columnDef$sor;
				return ((_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === "desc") ? "desc" : "asc";
			};
			column.getNextSortingOrder = (multi) => {
				var _table$options$enable, _table$options$enable2;
				const firstSortDirection = column.getFirstSortDir();
				const isSorted = column.getIsSorted();
				if (!isSorted) return firstSortDirection;
				if (isSorted !== firstSortDirection && ((_table$options$enable = table.options.enableSortingRemoval) != null ? _table$options$enable : true) && (multi ? (_table$options$enable2 = table.options.enableMultiRemove) != null ? _table$options$enable2 : true : true)) return false;
				return isSorted === "desc" ? "asc" : "desc";
			};
			column.getCanSort = () => {
				var _column$columnDef$ena, _table$options$enable3;
				return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
			};
			column.getCanMultiSort = () => {
				var _ref2, _column$columnDef$ena2;
				return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
			};
			column.getIsSorted = () => {
				var _table$getState$sorti;
				const columnSort = (_table$getState$sorti = table.getState().sorting) == null ? void 0 : _table$getState$sorti.find((d) => d.id === column.id);
				return !columnSort ? false : columnSort.desc ? "desc" : "asc";
			};
			column.getSortIndex = () => {
				var _table$getState$sorti2, _table$getState$sorti3;
				return (_table$getState$sorti2 = (_table$getState$sorti3 = table.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex((d) => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
			};
			column.clearSorting = () => {
				table.setSorting((old) => old != null && old.length ? old.filter((d) => d.id !== column.id) : []);
			};
			column.getToggleSortingHandler = () => {
				const canSort = column.getCanSort();
				return (e) => {
					if (!canSort) return;
					e.persist == null || e.persist();
					column.toggleSorting == null || column.toggleSorting(void 0, column.getCanMultiSort() ? table.options.isMultiSortEvent == null ? void 0 : table.options.isMultiSortEvent(e) : false);
				};
			};
		},
		createTable: (table) => {
			table.setSorting = (updater) => table.options.onSortingChange == null ? void 0 : table.options.onSortingChange(updater);
			table.resetSorting = (defaultState) => {
				var _table$initialState$s, _table$initialState;
				table.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
			};
			table.getPreSortedRowModel = () => table.getGroupedRowModel();
			table.getSortedRowModel = () => {
				if (!table._getSortedRowModel && table.options.getSortedRowModel) table._getSortedRowModel = table.options.getSortedRowModel(table);
				if (table.options.manualSorting || !table._getSortedRowModel) return table.getPreSortedRowModel();
				return table._getSortedRowModel();
			};
		}
	};
	builtInFeatures = [
		Headers,
		ColumnVisibility,
		ColumnOrdering,
		ColumnPinning,
		ColumnFaceting,
		ColumnFiltering,
		GlobalFaceting,
		GlobalFiltering,
		RowSorting,
		ColumnGrouping,
		RowExpanding,
		RowPagination,
		RowPinning,
		RowSelection,
		ColumnSizing
	];
}));
//#endregion
//#region node_modules/@tanstack/react-table/build/lib/index.mjs
/**
* react-table
*
* Copyright (c) TanStack
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
/**
* If rendering headers, cells, or footers with custom markup, use flexRender instead of `cell.getValue()` or `cell.renderValue()`.
*/
function flexRender(Comp, props) {
	return !Comp ? null : isReactComponent(Comp) ? /*#__PURE__*/ React$1.createElement(Comp, props) : Comp;
}
function isReactComponent(component) {
	return isClassComponent(component) || typeof component === "function" || isExoticComponent(component);
}
function isClassComponent(component) {
	return typeof component === "function" && (() => {
		const proto = Object.getPrototypeOf(component);
		return proto.prototype && proto.prototype.isReactComponent;
	})();
}
function isExoticComponent(component) {
	return typeof component === "object" && typeof component.$$typeof === "symbol" && ["react.memo", "react.forward_ref"].includes(component.$$typeof.description);
}
function useReactTable(options) {
	const resolvedOptions = {
		state: {},
		onStateChange: () => {},
		renderFallbackValue: null,
		...options
	};
	const [tableRef] = React$1.useState(() => ({ current: createTable(resolvedOptions) }));
	const [state, setState] = React$1.useState(() => tableRef.current.initialState);
	tableRef.current.setOptions((prev) => ({
		...prev,
		...options,
		state: {
			...state,
			...options.state
		},
		onStateChange: (updater) => {
			setState(updater);
			options.onStateChange == null || options.onStateChange(updater);
		}
	}));
	return tableRef.current;
}
var init_lib = __esmMin((() => {
	init_lib$1();
	init_lib$1();
}));
//#endregion
//#region src/js/dataMapping/search/groupedAwardTableColumns.jsx
var import_jsx_runtime$5, subAwardDefaultColumns, transactionsDefaultColumns, expandedTransactionColumns, expandedSubawardColumns;
var init_groupedAwardTableColumns = __esmMin((() => {
	init_moneyFormatter();
	init_locationFormatter();
	init_tableUtilsHelper();
	init_searchHelper();
	init_ReadMore();
	import_jsx_runtime$5 = require_jsx_runtime();
	subAwardDefaultColumns = [
		{
			header: "Prime Award Id",
			key: "award_id",
			type: "expandableButton",
			element: null
		},
		{
			header: "Count of Subwards that Match Search Criteria",
			key: "subaward_count",
			type: "alphaNumeric",
			element: null
		},
		{
			header: "Obligations that Match Search Criteria",
			key: "subaward_obligation",
			type: "formatted",
			element: (info) => formatMoneyWithPrecision(info.getValue(), 2, "--")
		}
	];
	transactionsDefaultColumns = [
		{
			header: "Prime Award Id",
			key: "award_id",
			type: "expandableButton",
			element: null
		},
		{
			header: "Count of Transactions that Match Search Criteria",
			key: "transaction_count",
			type: "alphaNumeric",
			element: null
		},
		{
			header: "Obligations that Match Search Criteria",
			key: "transaction_obligation",
			type: "formatted",
			element: (info) => formatMoneyWithPrecision(info.getValue(), 2, "--")
		}
	];
	expandedTransactionColumns = [
		{
			key: "Award ID",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Prime Award ID"
				})
			}),
			type: "link",
			link: (row) => `/award/${row.generated_internal_id}`
		},
		{
			key: "Mod",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Modification Number"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Recipient Name",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Recipient Name"
				})
			}),
			type: "link",
			element: (row) => `/recipient/${row.recipient_id}`
		},
		{
			key: "Transaction Amount",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Obligations"
				})
			}),
			type: "formatted",
			element: (info) => formatMoneyWithPrecision(info.getValue(), 2, "--")
		},
		{
			key: "Action Date",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Action Date"
				})
			}),
			type: "date",
			element: null
		},
		{
			key: "Transaction Description",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Transaction Description"
				})
			}),
			type: "formatted",
			element: (info) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ReadMore, {
				openPrompt: "read more",
				closePrompt: "read less",
				openIcon: "",
				closeIcon: "",
				text: info.getValue() || "--",
				limit: 90
			})
		},
		{
			key: "Action Type",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Action Type"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Award Type",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Award Type"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Recipient Location",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Recipient Location"
				})
			}),
			type: "formatted",
			element: (info) => pickLocationFormat(info.getValue())
		},
		{
			key: "Primary Place of Performance",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Primary Place of Performance"
				})
			}),
			type: "formatted",
			element: (info) => pickLocationFormat(info.getValue())
		},
		{
			key: "Awarding Agency",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Awarding Agency"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Awarding Sub Agency",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Awarding Sub Agency"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "NAICS",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "North American Industry Classification System (NAICS)"
				})
			}),
			type: "formatted",
			element: (info) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ReadMore, {
				openPrompt: "read more",
				closePrompt: "read less",
				openIcon: "",
				closeIcon: "",
				text: twoVariableFormat(info.getValue(), "code", "description"),
				limit: 80
			})
		},
		{
			key: "PSC",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Product and Service Code (PSC)"
				})
			}),
			type: "formatted",
			element: (info) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ReadMore, {
				openPrompt: "read more",
				closePrompt: "read less",
				openIcon: "",
				closeIcon: "",
				text: twoVariableFormat(info.getValue(), "code", "description"),
				limit: 90
			})
		}
	];
	expandedSubawardColumns = [
		{
			key: "Sub-Award ID",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward ID"
				})
			}),
			type: "link",
			link: (row) => `/award/${row.generated_internal_id}`
		},
		{
			key: "Sub-Awardee Name",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subrecipient Name"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Sub-Award Amount",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward Obligations"
				})
			}),
			type: "formatted",
			element: (info) => formatMoneyWithPrecision(info.getValue(), 2, "--")
		},
		{
			key: "Sub-Award Date",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward Action Date"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Sub-Award Description",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward Description"
				})
			}),
			type: "formatted",
			element: (info) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ReadMore, {
				openPrompt: "read more",
				closePrompt: "read less",
				openIcon: "",
				closeIcon: "",
				text: info.getValue() || "--",
				limit: 90
			})
		},
		{
			key: "Sub-Recipient UEI",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subrecipient UEI"
				})
			}),
			type: "alphaNumeric",
			element: null
		},
		{
			key: "Sub-Recipient Location",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subrecipient Location"
				})
			}),
			type: "formatted",
			element: (info) => pickLocationFormat(info.getValue())
		},
		{
			key: "Sub-Award Primary Place of Performance",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content table-header__content_right",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward Primary Place of Performance"
				})
			}),
			type: "formatted",
			element: (info) => pickLocationFormat(info.getValue())
		},
		{
			key: "Sub-Award Type",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "table-header__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "table-header__label",
					children: "Subaward Type"
				})
			}),
			type: "formatted",
			element: (info) => convertToTitleCase(info.getValue())
		}
	];
}));
//#endregion
//#region src/js/models/v2/search/table/groupedTable/ColumnBuilder.jsx
var import_jsx_runtime$4, getColumnArray, ColumnBuilder;
var init_ColumnBuilder = __esmMin((() => {
	init_dist();
	init_lib();
	init_groupedAwardTableColumns();
	import_jsx_runtime$4 = require_jsx_runtime();
	getColumnArray = (type) => {
		switch (type) {
			case "subawards": return subAwardDefaultColumns;
			case "transactions": return transactionsDefaultColumns;
			case "expanded-subawards": return expandedSubawardColumns;
			case "expanded-transactions": return expandedTransactionColumns;
			default: return null;
		}
	};
	ColumnBuilder = (columnType, onButtonClick, expanded) => {
		if (!columnType) return null;
		const columnHelper = createColumnHelper();
		const columnArray = getColumnArray(columnType);
		if (!columnArray) return null;
		return columnArray.map((col) => {
			switch (col.type) {
				case "expandableButton": return columnHelper.accessor(col.key, {
					header: col.header,
					id: uniqueId(),
					cell: ({ row, getValue }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
						onClick: () => onButtonClick(getValue(), row.id),
						onKeyDown: () => onButtonClick(getValue(), row.id),
						role: "link",
						className: `usa-button-link ${col.className ? col.className : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, { icon: `${expanded[row.id] ? "chevron-down" : "chevron-right"}` }),
							" ",
							getValue()
						]
					})
				});
				case "formatted": return columnHelper.accessor(col.key, {
					header: col.header,
					id: uniqueId(),
					cell: col.element
				});
				case "link": return columnHelper.accessor(col.key, {
					header: col.header,
					id: uniqueId(),
					cell: ({ getValue }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: col.link,
						onClick: col.onClick || (() => {}),
						children: getValue()
					})
				});
				default: return columnHelper.accessor(col.key, {
					header: col.header,
					id: uniqueId(),
					cell: (info) => info.getValue()
				});
			}
		});
	};
}));
//#endregion
//#region src/js/components/search/table/groupedTable/GroupedTableHeader.jsx
var import_jsx_runtime$3, propTypes$3, GroupedTableHeader;
var init_GroupedTableHeader = __esmMin((() => {
	init_dist();
	init_lib();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		index: PropTypes.number,
		updateSort: PropTypes.func,
		currentSort: PropTypes.object,
		header: PropTypes.object
	};
	GroupedTableHeader = ({ index, updateSort, currentSort, header }) => {
		const title = header.column.columnDef.header;
		const handleClickedSort = (e, sortOn = title) => {
			updateSort(sortOn, e.target.value);
		};
		const SortIcon = () => {
			const activeAsc = currentSort?.field === title && currentSort?.direction === "asc" ? " table-header__icon_active" : "";
			const activeDesc = currentSort?.field === title && currentSort?.direction === "desc" ? " table-header__icon_active" : "";
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "table-header__sort",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					onClick: handleClickedSort,
					className: `table-header__icon${activeAsc}`,
					value: "asc",
					title: `Sort table by ascending ${title}`,
					"aria-label": `Sort table by ascending ${title}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
						size: "2x",
						icon: "caret-up"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					onClick: handleClickedSort,
					className: `table-header__icon${activeDesc}`,
					value: "desc",
					title: `Sort table by descending ${title}`,
					"aria-label": `Sort table by descending ${title}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
						size: "2x",
						icon: "caret-down"
					})
				})]
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: `table-header__content${index > 0 ? " table-header__content_right" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "table-header__label",
				children: [
					flexRender(header.column.columnDef.header, header.getContext()),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, {}),
					updateSort && title && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SortIcon, {})
				]
			})
		});
	};
	GroupedTableHeader.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/search/table/groupedTable/NestedAwardTable.jsx
/**
* NestedTanStackTable.jsx
* Created by JD House July 2, 2025
*/
var import_jsx_runtime$2, propTypes$2, NestedAwardTable;
var init_NestedAwardTable = __esmMin((() => {
	init_axios();
	init_index_es();
	init_ResultsTable();
	init_tableUtilsHelper();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		columnType: PropTypes.string,
		awardId: PropTypes.string,
		filters: PropTypes.object,
		screenReaderCaption: PropTypes.string,
		highlightedColumns: PropTypes.object
	};
	NestedAwardTable = (props) => {
		const [subData, setSubData] = useState([]);
		const [subColumns, setSubColumns] = useState([]);
		const [isLoading, setIsLoading] = useState(false);
		const [error, setError] = useState(false);
		const [subSort, setSubSort] = useState({
			field: props.columnType === "subawards" ? "Sub-Award Amount" : "Transaction Amount",
			direction: "desc"
		});
		const [subPage, setSubPage] = useState(props.page);
		const [subResultsLimit, setSubResultsLimit] = useState(props.resultsLimit);
		let columnSubType = props.currentType;
		let searchRequest = null;
		const getSubData = async () => {
			if (searchRequest) searchRequest.cancel();
			setIsLoading(true);
			setError(false);
			const paramsOptions = {
				subSort,
				subPage,
				subResultsLimit
			};
			searchRequest = await getNestedTableData(props.columnType, props.awardId, props.filters, paramsOptions);
			return searchRequest.promise.then((res) => {
				const parsedResults = res.data.results.map((result) => ({
					...result,
					generated_internal_id: encodeURIComponent(result.generated_internal_id)
				}));
				searchRequest = null;
				setSubPage(res.data.page_metadata.page);
				setSubData(parsedResults);
				setIsLoading(false);
			}).catch((err) => {
				if (!isCancel(err)) {
					setError(true);
					setIsLoading(false);
					console.log(err);
				}
			});
		};
		const updateSort = (field, direction) => {
			if (field === "Action Date" && props.columnType !== "transactions") setSubSort(Object.assign({
				field: "Sub-Award Date",
				direction
			}));
			else setSubSort(Object.assign({
				field,
				direction
			}));
		};
		const formattedSubSort = () => {
			const formattedSort = subSort;
			if (formattedSort?.field === "Sub-Award Date") formattedSort.field = "Action Date";
			return formattedSort;
		};
		useEffect(throttle(() => {
			if (props.columnType === "subawards") {
				if (props.currentType === "grants") columnSubType = "subgrants";
				columnSubType = "subcontracts";
			} else columnSubType = [`transaction_${props.currentType}`];
			setSubColumns(props.subColumnOptions[columnSubType]);
			getSubData();
			return () => {
				if (searchRequest) searchRequest.cancel();
			};
		}, 400), [
			props.awardId,
			subSort,
			subPage,
			subResultsLimit
		]);
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Wo, {});
		else if (error) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(fo, {});
		else if (subData.length <= 0) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Go, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "table-title",
				children: props.awardId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "table-subTitle",
				children: `${props.columnType === "subawards" ? "Subawards" : "Transacitions"} that match search criteria`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ResultsTable, {
				...props,
				results: subData,
				currentType: columnSubType,
				spendingLevel: props.columnType,
				columns: subColumns,
				isLoading,
				error,
				resultsCount: props.resultsCount,
				updateSort,
				sort: formattedSubSort(),
				page: subPage,
				setPage: setSubPage,
				resultsLimit: subResultsLimit,
				setResultLimit: setSubResultsLimit
			})
		] });
	};
	NestedAwardTable.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/search/table/groupedTable/GroupedAwardTable.jsx
/**
* TanStackTable.jsx
* Created by JD House July 2, 2025
*/
var import_jsx_runtime$1, propTypes$1, GroupedAwardTable;
var init_GroupedAwardTable = __esmMin((() => {
	init_lib();
	init_index_es();
	init_ColumnBuilder();
	init_GroupedTableHeader();
	init_NestedAwardTable();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		columnType: PropTypes.string,
		expandableData: PropTypes.array,
		subCols: PropTypes.object,
		sort: shape({
			direction: oneOf(["asc", "desc"]),
			field: PropTypes.string
		}),
		updateSort: PropTypes.func,
		isMobile: PropTypes.bool,
		newMobileView: PropTypes.bool,
		subaward: PropTypes.bool,
		currentType: PropTypes.string
	};
	GroupedAwardTable = (props) => {
		const [awardId, setAwardId] = useState(null);
		const [expanded, setExpanded] = useState({});
		let resultsCount = props.resultsCount;
		let top = 45;
		const toggleSubData = (id, rowId) => {
			if (props.toggleSubData) props.toggleSubData(id);
			if (Object.hasOwn(expanded, rowId)) {
				const newExpanded = { ...expanded };
				delete newExpanded[rowId];
				setAwardId(id);
				setExpanded(newExpanded);
				return null;
			}
			setAwardId(id);
			setExpanded((prevState) => ({
				...prevState,
				[rowId]: true
			}));
			return true;
		};
		const columns = useMemo(() => ColumnBuilder(props.columnType, toggleSubData, expanded), [
			expanded,
			props.columnType,
			toggleSubData
		]);
		const table = useReactTable({
			data: props.expandableData,
			columns,
			state: { expanded },
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			getSortedRowModel: getSortedRowModel(),
			manualPagination: true,
			rowCount: props.resultsLimit,
			filterFromLeafRows: true,
			maxLeafRowFilterDepth: 1
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "advanced-search__table-wrapper",
			id: "advanced-search__table-wrapper",
			style: props.resultsCount >= props.resultsLimit ? { height: "638px" } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("table", {
				className: `usda-table table-for-new-search-page award-results-table-dtui expandable ${Object.keys(expanded).length ? " expandable-table__show-expanded" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("thead", {
					className: "usda-table__head",
					style: { maxWidth: "100%" },
					children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("tr", {
						className: "usda-table__row",
						style: { height: 45 },
						children: headerGroup.headers.map((header, h) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("th", {
							className: "table-header stickyColumn",
							children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GroupedTableHeader, {
								index: h,
								updateSort: props.updateSort,
								currentSort: props.sort,
								header
							})
						}, header.id))
					}, headerGroup.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("tbody", {
					className: "usda-table__body",
					children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(React.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("tr", {
						className: `usda-table__row-item usda-table__row ${row.getIsExpanded() ? "expaned-table-parent__sticky" : ""}`,
						children: row.getVisibleCells().map((cell, c) => {
							if (row.getIsExpanded()) {
								const countKey = Object.keys(row.original).find((key) => key.endsWith("count"));
								resultsCount = row.original[countKey];
								const addTo = 45 * c;
								top += addTo;
							}
							return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("td", {
								className: "usda-table__cell",
								children: flexRender(cell.column.columnDef.cell, cell.getContext())
							}, cell.id);
						})
					}, row.id), row.getIsExpanded() && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("tr", {
						className: "expaned-table-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("td", {
							colSpan: row.getVisibleCells().length,
							className: "expaned-table-container__outer-cell",
							style: { top: `${top}px` },
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NestedAwardTable, {
								...props,
								awardId,
								resultsCount
							})
						})
					})] }, uniqueId()))
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Ka, {
			resultsText: true,
			limitSelector: true,
			hideLast: props.expandableData.length >= 5e4,
			currentPage: props.page,
			pageSize: props.resultsLimit,
			changePage: props.setPage,
			changeLimit: props.setResultLimit,
			totalItems: props.expandableData.length
		})] });
	};
	GroupedAwardTable.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/search/resultsView/table/ResultsTableSection.jsx
/**
* ResultsTableSection.jsx
* Created by Kevin Li 11/8/16
**/
var import_jsx_runtime, propTypes, ResultsTableSection;
var init_ResultsTableSection = __esmMin((() => {
	init_index_es();
	init_IsMobileContext();
	init_ResultsTable();
	init_GroupedAwardTable();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		tableTypes: PropTypes.array,
		currentType: PropTypes.string,
		switchTab: PropTypes.func,
		results: PropTypes.array,
		columns: PropTypes.object,
		toggleColumnVisibility: PropTypes.func,
		updateSort: PropTypes.func,
		reorderColumns: PropTypes.func,
		awardIdClick: PropTypes.func,
		subAwardIdClick: PropTypes.func,
		page: PropTypes.number,
		setPage: PropTypes.func,
		total: PropTypes.number,
		federalAccountPage: PropTypes.bool,
		showToggle: PropTypes.bool
	};
	ResultsTableSection = (props) => {
		const { isTablet } = useContext(IsMobileContext);
		const [tableWidth, setTableWidth] = useState(document.querySelector(".results-table-content"));
		const setTableWidthFn = useCallback(() => {
			if (document.querySelector(".results-table-content")) setTableWidth(document.querySelector(".results-table-content"));
		}, []);
		useEffect(() => {
			window.addEventListener("resize", setTableWidthFn);
			return () => {
				window.removeEventListener("resize", setTableWidthFn);
			};
		}, [setTableWidthFn]);
		useEffect(() => {
			if (isTablet && props.checkMobile && props.showToggle) props.checkMobile(isTablet);
		}, [isTablet, props]);
		const renderContent = () => {
			if (!props.results.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Go, {});
			if (props.expandableData?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedAwardTable, {
				...props,
				expandableData: props.expandableData,
				columnType: props.columnType,
				isMobile: isTablet,
				visibleWidth: tableWidth,
				newMobileView: true
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsTable, {
				...props,
				visibleWidth: tableWidth,
				awardIdClick: props.awardIdClick,
				subAwardIdClick: props.subAwardIdClick,
				isMobile: isTablet,
				newMobileView: true
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "search-results-table-section",
			id: "results-section-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(vs, {
				types: props.tableTypes,
				active: props.currentType,
				switchTab: props.switchTab
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "results-table-content",
				children: renderContent()
			})]
		});
	};
	ResultsTableSection.propTypes = propTypes;
}));
//#endregion
//#region src/js/dataMapping/search/resultsView/table.js
var tableTypes, subTypes, transactionTypes;
var init_table = __esmMin((() => {
	tableTypes = [
		{
			label: "Contracts",
			internal: "contracts"
		},
		{
			label: "Contract IDVs",
			internal: "idvs"
		},
		{
			label: "Grants",
			internal: "grants"
		},
		{
			label: "Direct Payments",
			internal: "direct_payments"
		},
		{
			label: "Loans",
			internal: "loans"
		},
		{
			label: "Other",
			internal: "other"
		}
	];
	subTypes = [{
		label: "Sub-Contracts",
		internal: "subcontracts"
	}, {
		label: "Sub-Grants",
		internal: "subgrants"
	}];
	transactionTypes = [
		{
			label: "Contracts",
			internal: "transaction_contracts"
		},
		{
			label: "Contract IDVs",
			internal: "transaction_idvs"
		},
		{
			label: "Grants",
			internal: "transaction_grants"
		},
		{
			label: "Direct Payments",
			internal: "transaction_direct_payments"
		},
		{
			label: "Loans",
			internal: "transaction_loans"
		},
		{
			label: "Other",
			internal: "transaction_other"
		}
	];
}));
//#endregion
export { ShownValue as C, init_FilterTabs as E, init_AdvancedSearchTooltip as S, FilterTabs as T, ContextTooltip as _, ResultsTableSection as a, init_TooltipContext as b, defaultColumns as c, awardTableColumnTypes as d, init_awardTableColumnTypes as f, init_TimePeriod as g, TimePeriod as h, transactionTypes as i, defaultSort as l, init_SpendingByCategoriesChart as m, subTypes as n, init_ResultsTableSection as o, SpendingByCategoriesChart as p, tableTypes as r, apiFieldByTableColumnName as s, init_table as t, init_awardTableColumns as u, init_ContextTooltip as v, init_ShownValue as w, KeyWordTooltip as x, TooltipContext as y };
