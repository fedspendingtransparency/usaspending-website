import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, Nr as init_index_es, Rr as ro, T as init_fiscalYearHelper, b as earliestExplorerYear, c as getLatestSubmissionPeriodInFy, g as allFiscalYears, go as require_jsx_runtime, l as init_downloadHelper, qr as init_dist, y as currentFiscalYear } from "./index.js-Dk2VDaPz.js";
import { n as init_ComboBox, t as ComboBox } from "./ComboBox-DLdH1114.js";
import { n as useLatestAccountData, t as init_WithLatestFy } from "./WithLatestFy-BlSLn_6t.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/containers/explorer/detail/helpers/explorerQuarters.js
var handlePotentialStrings, periods, periodsPerQuarterPre2020, periodsPerQuarterPost2020, periodsPerQuarterDuring2020, getPeriodsPerQuarterByFy;
var init_explorerQuarters = __esmMin((() => {
	handlePotentialStrings = (input) => {
		if (typeof input === "string") return parseInt(input, 10);
		return input;
	};
	periods = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	];
	periodsPerQuarterPre2020 = [
		[{
			title: "1 - 3",
			id: "1",
			className: "triple-period"
		}],
		[{
			title: "4 - 6",
			id: "2",
			className: "triple-period"
		}],
		[{
			title: "7 - 9",
			id: "3",
			className: "triple-period"
		}],
		[{
			title: "10 - 12",
			id: "4",
			className: "triple-period--extra-wide"
		}]
	];
	periodsPerQuarterPost2020 = [
		[{
			title: "1 - 2",
			id: "2",
			className: "double-period"
		}, {
			title: "3",
			id: "3"
		}],
		[
			{
				title: "4",
				id: "4"
			},
			{
				title: "5",
				id: "5"
			},
			{
				title: "6",
				id: "6"
			}
		],
		[
			{
				title: "7",
				id: "7"
			},
			{
				title: "8",
				id: "8"
			},
			{
				title: "9",
				id: "9"
			}
		],
		[
			{
				title: "10",
				id: "10"
			},
			{
				title: "11",
				id: "11"
			},
			{
				title: "12",
				id: "12"
			}
		]
	];
	periodsPerQuarterDuring2020 = [
		[{
			title: "1 - 3",
			id: "3",
			className: "triple-period"
		}],
		[{
			title: "4 - 6",
			id: "6",
			className: "triple-period"
		}],
		[
			{
				title: "7",
				id: "7"
			},
			{
				title: "8",
				id: "8"
			},
			{
				title: "9",
				id: "9"
			}
		],
		[
			{
				title: "10",
				id: "10"
			},
			{
				title: "11",
				id: "11"
			},
			{
				title: "12",
				id: "12"
			}
		]
	];
	getPeriodsPerQuarterByFy = (fy) => {
		if (fy > 2020) return periodsPerQuarterPost2020;
		if (fy === 2020) return periodsPerQuarterDuring2020;
		return periodsPerQuarterPre2020;
	};
}));
//#endregion
//#region src/js/components/sharedComponents/pickers/NewQuarterButton.jsx
var import_jsx_runtime$4, propTypes$4, QuarterButton;
var init_NewQuarterButton = __esmMin((() => {
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = {
		disabled: PropTypes.bool,
		active: PropTypes.bool,
		quarter: PropTypes.string,
		handleSelection: PropTypes.func,
		title: PropTypes.string
	};
	QuarterButton = ({ disabled, active, quarter, handleSelection, title = "" }) => {
		const quarterTitle = title || `Q ${quarter}`;
		const handleClick = (e) => {
			e.preventDefault();
			if (!disabled) handleSelection(quarter);
		};
		let additionalClasses = disabled ? "quarter-picker__quarter_disabled " : "";
		if (quarter === "1") additionalClasses += "quarter-picker__quarter_first";
		else if (quarter === "4") additionalClasses += "quarter-picker__quarter_last";
		else if (title.includes("-")) additionalClasses += "quarter-picker__quarter_double";
		if (!disabled && active) additionalClasses += " quarter-picker__quarter_active";
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			className: `quarter-picker__quarter ${additionalClasses}`,
			onMouseDown: handleClick,
			onClick: handleClick,
			"aria-disabled": disabled,
			children: quarterTitle
		});
	};
	QuarterButton.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/helpers/shared/dateHelper.js
var getPeriodTitle;
var init_dateHelper = __esmMin((() => {
	getPeriodTitle = (title) => {
		switch (title) {
			case "1":
			case "2":
			case "1 - 2": return "Oct-Nov";
			case "3": return "Dec";
			case "4": return "Jan";
			case "5": return "Feb";
			case "6": return "Mar";
			case "7": return "Apr";
			case "8": return "May";
			case "9": return "Jun";
			case "10": return "Jul";
			case "11": return "Aug";
			case "12": return "Sep";
			case "1 - 3": return "Oct-Dec";
			case "4 - 6": return "Jan-Mar";
			case "7 - 9": return "Apr-Jun";
			case "10 - 12": return "Jul-Sep";
			default: return title;
		}
	};
}));
//#endregion
//#region src/js/components/sharedComponents/pickers/Quarters.jsx
var import_jsx_runtime$3, isIdOrGreaterInArray, propTypes$3, Quarters;
var init_Quarters = __esmMin((() => {
	init_NewQuarterButton();
	init_dateHelper();
	import_jsx_runtime$3 = require_jsx_runtime();
	isIdOrGreaterInArray = (idStr, arr) => arr.some((periodOrQuarter) => parseInt(periodOrQuarter, 10) >= parseInt(idStr, 10));
	propTypes$3 = {
		periodsPerQuarter: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string,
			id: PropTypes.string
		}))),
		handleSelection: PropTypes.func,
		selectedQuarters: PropTypes.arrayOf(PropTypes.string),
		disabledQuarters: PropTypes.arrayOf(PropTypes.string),
		selectedPeriods: PropTypes.arrayOf(PropTypes.string),
		disabledPeriods: PropTypes.arrayOf(PropTypes.string),
		showPeriods: PropTypes.bool,
		isCumulative: PropTypes.bool,
		index: PropTypes.number
	};
	Quarters = ({ periodsPerQuarter, handleSelection, selectedQuarters, disabledQuarters, selectedPeriods, disabledPeriods, showPeriods, isCumulative, index }) => {
		const quarterNumber = index + 1;
		const quarterNumberAsString = `${quarterNumber}`;
		if (showPeriods) {
			const periodsForQuarter = periodsPerQuarter[index];
			const isQuarterDisabled = periodsForQuarter.every((period) => disabledPeriods.includes(period.id));
			const className = (period) => Object.keys(period).includes("className") ? `${period.className} quarter-picker__list-item` : "quarter-picker__list-item";
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("li", {
				className: "quarter-picker__list-item quarter-picker__period-list-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
					className: isQuarterDisabled ? "disabled" : "",
					children: `Q${quarterNumber}`
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("ul", {
					className: "quarter-picker__period-list",
					children: periodsForQuarter.map((period) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("li", {
						className: className(period),
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(QuarterButton, {
							quarter: period.id,
							title: getPeriodTitle(period.title),
							disabled: disabledPeriods.includes(period.id),
							active: isIdOrGreaterInArray(period.id, selectedPeriods),
							handleSelection
						})
					}, uniqueId()))
				})]
			}, uniqueId());
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("li", {
			className: "quarter-picker__list-item",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(QuarterButton, {
				quarter: quarterNumberAsString,
				disabled: disabledQuarters.includes(quarterNumberAsString),
				active: isCumulative ? isIdOrGreaterInArray(quarterNumberAsString, selectedQuarters) : selectedQuarters.includes(quarterNumberAsString),
				handleSelection
			})
		}, uniqueId());
	};
	Quarters.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/sharedComponents/pickers/NewQuarterPicker.jsx
var import_jsx_runtime$2, defaultPeriodsPerQuarter, propTypes$2, QuarterPicker;
var init_NewQuarterPicker = __esmMin((() => {
	init_Quarters();
	import_jsx_runtime$2 = require_jsx_runtime();
	defaultPeriodsPerQuarter = [
		[{
			title: "1 - 2",
			id: "2",
			className: "double-period"
		}, {
			title: "3",
			id: "3"
		}],
		[
			{
				title: "4",
				id: "4"
			},
			{
				title: "5",
				id: "5"
			},
			{
				title: "6",
				id: "6"
			}
		],
		[
			{
				title: "7",
				id: "7"
			},
			{
				title: "8",
				id: "8"
			},
			{
				title: "9",
				id: "9"
			}
		],
		[
			{
				title: "10",
				id: "10"
			},
			{
				title: "11",
				id: "11"
			},
			{
				title: "12",
				id: "12"
			}
		]
	];
	propTypes$2 = {
		handleSelection: PropTypes.func,
		selectedQuarters: PropTypes.arrayOf(PropTypes.string),
		disabledQuarters: PropTypes.arrayOf(PropTypes.string),
		selectedPeriods: PropTypes.arrayOf(PropTypes.string),
		disabledPeriods: PropTypes.arrayOf(PropTypes.string),
		periodsPerQuarter: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string,
			id: PropTypes.string,
			className: PropTypes.string
		}))),
		showPeriods: PropTypes.bool,
		isCumulative: PropTypes.bool
	};
	QuarterPicker = ({ handleSelection, disabledQuarters = [], disabledPeriods = [], periodsPerQuarter = defaultPeriodsPerQuarter, selectedQuarters = [], selectedPeriods = [], showPeriods = false, isCumulative = false }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "quarter-picker",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", {
				className: "quarter-picker__list",
				children: new Array(4).fill(0).map((_, quarterIndex) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Quarters, {
					periodsPerQuarter,
					handleSelection,
					selectedQuarters,
					disabledQuarters,
					selectedPeriods,
					disabledPeriods,
					showPeriods,
					isCumulative,
					index: quarterIndex
				}, uniqueId("quarter_")))
			})
		});
	};
	QuarterPicker.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/sharedComponents/pickers/FYPicker.jsx
/**
* FYPicker.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime$1, propTypes$1, defaultSortFy, FYPicker;
var init_FYPicker = __esmMin((() => {
	init_dist();
	init_fiscalYearHelper();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		fy: PropTypes.string,
		onClick: PropTypes.func,
		earliestFY: PropTypes.number,
		icon: PropTypes.string,
		altText: PropTypes.string,
		iconColor: PropTypes.string,
		iconSize: PropTypes.string,
		sortFn: PropTypes.func,
		latestFy: PropTypes.number,
		isLoading: PropTypes.bool
	};
	defaultSortFy = (a, b) => {
		if (a > b) return -1;
		if (b > a) return 1;
		return 0;
	};
	FYPicker = ({ sortFn = defaultSortFy, latestFy = currentFiscalYear(), fy, onClick, earliestFY = earliestExplorerYear, icon = "calendar-alt", altText = "Fiscal Year", iconColor = "white", iconSize = "lg", isLoading }) => {
		const pickerRef = useRef(null);
		const [expanded, setExpanded] = useState(false);
		const toggleMenu = (e) => {
			e.preventDefault();
			setExpanded(!expanded);
		};
		useEffect(() => {
			const closeMenu = (e) => {
				if (pickerRef.current && !pickerRef.current.contains(e.target)) setExpanded(false);
			};
			document.addEventListener("click", closeMenu);
			return () => {
				document.removeEventListener("click", closeMenu);
			};
		}, []);
		const handleClick = (e) => {
			e.preventDefault();
			onClick(e.target.value);
			setExpanded(false);
		};
		const getActiveYears = () => {
			if (latestFy) return allFiscalYears(earliestFY, latestFy).sort(sortFn).map((year) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", {
				className: "fy-picker__list-item",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
					className: `fy-picker__item ${year === fy ? "active" : ""}`,
					value: `${year}`,
					onClick: handleClick,
					children: ["FY ", year]
				})
			}, year));
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", { children: "Loading..." });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "fy-picker",
			ref: pickerRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "fy-picker__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "fy-picker__icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
						icon,
						alt: altText,
						color: iconColor,
						size: iconSize
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "fy-picker__dropdown-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
						className: "fy-picker__button",
						onClick: toggleMenu,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
							className: "fy-picker__button-text",
							children: ["FY ", isLoading ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
								icon: "spinner",
								size: "sm",
								alt: "Toggle menu",
								spin: true
							}) : fy]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "fy-picker__button-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
								icon: "chevron-down",
								alt: "Toggle menu"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
						className: `fy-picker__list ${expanded ? "" : "hide"}`,
						children: getActiveYears()
					})]
				})]
			})
		});
	};
	FYPicker.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/sharedComponents/QuarterPickerWithFY.jsx
/**
* QuarterPickerWithFY
* Created by Max Kendall 10/25/2020
**/
var import_jsx_runtime, propTypes, QuarterPickerWithFY;
var init_QuarterPickerWithFY = __esmMin((() => {
	init_fiscalYearHelper();
	init_downloadHelper();
	init_WithLatestFy();
	init_explorerQuarters();
	init_NewQuarterPicker();
	init_ComboBox();
	init_index_es();
	init_FYPicker();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		handlePickedYear: PropTypes.func,
		handleQuarterPickerSelection: PropTypes.func,
		selectedFy: PropTypes.string,
		latestSelectedTimeInterval: PropTypes.string,
		updateFilter: PropTypes.func,
		newPicker: PropTypes.bool
	};
	QuarterPickerWithFY = ({ handlePickedYear, selectedFy, handleQuarterPickerSelection, latestSelectedTimeInterval, updateFilter, newPicker }) => {
		const [, allPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
		const onSelect = useCallback((e) => {
			const year = e.target.value;
			if (parseInt(year, 10) >= 2020) {
				const { period: latestSubmission } = getLatestSubmissionPeriodInFy(year, allPeriods);
				handlePickedYear(year, latestSubmission);
			} else handlePickedYear(year, 4);
		}, [allPeriods, handlePickedYear]);
		const onClearSelect = () => {
			updateFilter("fy", "");
			updateFilter("period", null);
			updateFilter("quarter", null);
		};
		const periodsPerQuarter = useMemo(() => getPeriodsPerQuarterByFy(parseInt(selectedFy, 10)), [selectedFy]);
		const disabledPeriodsInFy = useMemo(() => {
			if (parseInt(selectedFy, 10) === 2017) return ["1"];
			else if (selectedFy && allPeriods.size) {
				const latestAvailablePeriodInFy = getLatestSubmissionPeriodInFy(selectedFy, allPeriods);
				const allAvailablePeriodsInFy = periods.filter((period) => parseInt(period, 10) <= latestAvailablePeriodInFy.period);
				return periods.filter((period) => !allAvailablePeriodsInFy.includes(period));
			}
		}, [selectedFy, allPeriods]);
		useEffect(() => {
			if (latestFy && latestPeriod) handlePickedYear(`${latestFy}`, `${latestPeriod}`);
		}, [
			latestFy,
			latestPeriod,
			handlePickedYear
		]);
		const defaultFy = useMemo(() => latestFy || currentFiscalYear(), [latestFy]);
		const optionsArray = useMemo(() => {
			return allFiscalYears(earliestExplorerYear, defaultFy).map((fy) => ({
				text: `FY ${fy}`,
				value: fy
			}));
		}, [defaultFy]);
		if (newPicker) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "download-filter__fy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboBox, {
				optionsArray,
				onSelect,
				defaultValue: `FY ${defaultFy}`,
				label: "Fiscal Year",
				formName: "download-filter__fy",
				onClearSelect,
				disabled: !latestFy
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuarterPicker, {
				showPeriods: true,
				periodsPerQuarter,
				selectedPeriods: [latestSelectedTimeInterval],
				disabledPeriods: disabledPeriodsInFy,
				handleSelection: handleQuarterPickerSelection
			})]
		});
		const pickedYear = (year) => {
			if (parseInt(year, 10) >= 2020) {
				const { period: latestSubmission } = getLatestSubmissionPeriodInFy(year, allPeriods);
				handlePickedYear(year, latestSubmission);
			} else handlePickedYear(year, 4);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "quarter-picker",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "quarter-picker__fy",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FYPicker, {
					isLoading: !latestFy,
					latestFy,
					fy: selectedFy,
					onClick: pickedYear
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ro, {
				showPeriods: true,
				periodsPerQuarter,
				selectedPeriods: [latestSelectedTimeInterval],
				disabledPeriods: disabledPeriodsInFy,
				handleSelection: handleQuarterPickerSelection
			})]
		});
	};
	QuarterPickerWithFY.propTypes = propTypes;
}));
//#endregion
export { handlePotentialStrings as a, init_dateHelper as i, init_QuarterPickerWithFY as n, init_explorerQuarters as o, getPeriodTitle as r, QuarterPickerWithFY as t };
