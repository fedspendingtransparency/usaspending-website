import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Aa as Navigate, An as isCancel, Ca as showSlideout, Cr as lo, Fa as useParams, Fr as init_dist, Ga as useSelector, Ir as BaseSubagencySpendingRow, Jn as getBaseUrl, Lr as init_BaseSubagencySpendingRow, Ma as useLocation, Mn as getQueryParamString, Nn as init_queryParams, Nr as ys, O as require_dayjs_min, Oa as init_development, Pa as useNavigate, Pr as FontAwesomeIcon, Rr as BaseAgencySubagencyCount, Sa as init_slideoutHelper, T as init_fiscalYearHelper, Ta as useQueryParams, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, _i as formatMoney, ar as Cs, ba as largeScreen, bi as formatMoneyWithUnitsShortLabel, br as fo, da as init_awardType, en as init_modalActions, fr as Qs, g as allFiscalYears, ga as init_IsMobileContext, ha as IsMobileContext, hr as Xa, ir as $s, jn as combineQueryParams, jr as vs, ka as Link, kn as init_axios, kr as ss, lr as Ka, mi as calculatePercentage, mr as Wo, oa as awardTypeGroups, or as Es, qa as useDispatch, ro as require_jsx_runtime, tn as showModal, tr as init_stickyHeader, ur as Os, vi as formatMoneyWithPrecision, vr as ds, wa as init_useQueryParams, wi as init_moneyFormatter, xi as formatNumber, xr as init_index_es, ya as init_mobileBreakpoints, yi as formatMoneyWithUnits, yr as fc, zr as init_BaseAgencySubagencyCount } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, l as agencyPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_Accordion, t as Accordion } from "./Accordion-DxniQozb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { C as getYear, S as init_esm, T as format } from "./aboutTheDataHelper-BhyHMJca.js";
import { n as useLatestAccountData, r as useValidTimeBasedQueryParams, t as init_WithLatestFy } from "./WithLatestFy-D_VFY3b6.js";
import { A as fetchSubcomponentsList, C as fetchFederalAccountsList, D as fetchSubagencyNewAwardsCount, E as fetchProgramActivityByTas, M as init_agency, O as fetchSubagencySpendingList, S as fetchBudgetaryResources, T as fetchObligationsByAwardType, _ as setSelectedTas, a as resetAwardObligations, c as setAwardObligations, d as setDataThroughDates, f as setIsSofChartLoaded, g as setSelectedSubcomponent, h as setSelectedPrgActivityOrObjectClass, i as resetAgency, j as fetchTasList, k as fetchSubagencySummary, l as setBudgetaryResources, m as setSelectedFederalAccount, n as useAgencySlugs, o as resetSubagencyTotals, p as setLevel4ApiResponse, r as init_agencyActions, s as setAgencyOverview, t as init_useAgencySlugs, u as setCurrentLevelNameAndId, v as setSubagencyTotals, w as fetchObjectClassByTas, x as fetchAgencyOverview } from "./useAgencySlugs-CKoWB5QX.js";
import { r as init_Note, t as Note } from "./Note-Bun-FT8t.js";
import { n as init_BaseAgencyOverview, t as BaseAgencyOverview } from "./BaseAgencyOverview-55ClLqcf.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-Dzf78LU9.js";
import { B as linear, W as format$1, at as band, t as init_src } from "./src-BVb2vAbu.js";
import { n as useStateWithPrevious, t as init_useStateWithPrevious } from "./useStateWithPrevious-Bl1KnVuU.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-ByF767MK.js";
import { n as init_ProfileBackLink, t as ProfileBackLink } from "./ProfileBackLink-Bi5rIoQ4.js";
import { Z as pie_default, it as arc_default } from "./src-BPBsVH6H.js";
import { a as select_default, c as axisTop, o as axisLeft, r as selectAll_default, s as axisRight, t as init_src$1 } from "./src-BcV_Sh12.js";
import { n as init_RoundedToggle, t as RoundedToggle } from "./RoundedToggle-Det_QYnO.js";
import { n as init_ChartTableToggle, t as ChartTableToggle } from "./ChartTableToggle-e1m8mXTt.js";
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { throttle } from "lodash-es";
//#region src/js/components/sharedComponents/dropdowns/NumericPickerWrapper.jsx
var import_jsx_runtime$36, propTypes$34, defaultSort, NumericPickerWrapper;
var init_NumericPickerWrapper = __esmMin((() => {
	init_index_es();
	init_fiscalYearHelper();
	import_jsx_runtime$36 = require_jsx_runtime();
	propTypes$34 = {
		size: PropTypes.string,
		enabled: PropTypes.bool,
		backgroundColor: PropTypes.string,
		selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		earliestValue: PropTypes.number,
		latestValue: PropTypes.number,
		options: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})),
		handleChange: PropTypes.func,
		sortFn: PropTypes.func
	};
	defaultSort = (a, b) => {
		if (Number.isInteger(a)) return b - a;
		return parseInt(b, 10) - parseInt(a, 10);
	};
	NumericPickerWrapper = ({ backgroundColor, size, latestValue, selectedValue = 2020, earliestValue = 2017, options = [], handleChange = () => {}, sortFn = defaultSort, enabled = true }) => {
		const renderOptions = () => {
			if (options.length) return options.map((obj) => ({
				...obj,
				onClick: handleChange
			}));
			if (latestValue) return allFiscalYears(earliestValue, latestValue).map((year) => ({
				name: `FY ${year}`,
				value: `${year}`,
				onClick: handleChange
			}));
			return [{
				name: "Loading fiscal years...",
				value: null,
				onClick: () => {}
			}];
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
			className: "numeric-picker__container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(fc, {
				backgroundColor,
				label: "Filter by:",
				size,
				classname: "numeric-picker__wrapper",
				dropdownClassname: "numeric-picker__dropdown",
				leftIcon: "calendar-alt",
				selectedOption: options.length ? options.find((obj) => obj.value === selectedValue || obj.value === parseInt(selectedValue, 10)).name || "--" : `FY ${selectedValue}`,
				sortFn,
				options: renderOptions(),
				enabled
			})
		});
	};
	NumericPickerWrapper.displayName = "Fiscal Year NewPicker";
	NumericPickerWrapper.propTypes = propTypes$34;
}));
//#endregion
//#region src/js/models/v2/agency/BaseAgencySubcomponentsList.js
var BaseAgencySubcomponentsList;
var init_BaseAgencySubcomponentsList = __esmMin((() => {
	init_moneyFormatter();
	BaseAgencySubcomponentsList = {
		populate(data, id) {
			this.id = id || data?.id || data?.code || "";
			this.name = data?.name ? data.name : "";
			this._budgetaryResources = data?.total_budgetary_resources || data?.budgetary_resources_amount || 0;
			this._obligations = data?.total_obligations || data?.obligated_amount || 0;
			this._outlays = data?.total_outlays || data?.gross_outlay_amount || 0;
		},
		get budgetaryResources() {
			return formatMoneyWithUnitsShortLabel(this._budgetaryResources, 2);
		},
		get obligations() {
			return formatMoneyWithUnitsShortLabel(this._obligations, 2);
		},
		get outlays() {
			return formatMoneyWithUnitsShortLabel(this._outlays, 2);
		}
	};
}));
//#endregion
//#region src/js/helpers/agency/StatusOfFundsVizHelper.js
var parseRows$1, getLevel5Data;
var init_StatusOfFundsVizHelper = __esmMin((() => {
	init_BaseAgencySubcomponentsList();
	parseRows$1 = (data, id) => {
		return data.map((d) => {
			let dataChildrenAndTotalObligation = [];
			if (d.children && d.children.length > 0) dataChildrenAndTotalObligation = d.children.map((child) => ({ ...child }));
			if (dataChildrenAndTotalObligation.length > 0) return {
				...d,
				children: dataChildrenAndTotalObligation
			};
			return { ...d };
		}).map((item) => {
			const agencySubcomponents = Object.create(BaseAgencySubcomponentsList);
			agencySubcomponents.populate(item, id);
			return agencySubcomponents;
		});
	};
	getLevel5Data = (name, level4ApiResponse) => {
		return level4ApiResponse.res.filter((item) => name === item.name)[0].children;
	};
}));
//#endregion
//#region src/js/components/agency/visualizations/StatusOfFundsChart.jsx
var import_jsx_runtime$35, propTypes$33, StatusOfFundsChart;
var init_StatusOfFundsChart = __esmMin((() => {
	init_src$1();
	init_src();
	init_mobileBreakpoints();
	init_index_es();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$33 = {
		fy: PropTypes.string,
		results: PropTypes.array,
		level: PropTypes.number.isRequired,
		setDrilldownLevel: PropTypes.func,
		toggle: PropTypes.bool,
		maxLevel: PropTypes.number
	};
	StatusOfFundsChart = ({ results, fy, setDrilldownLevel, level, toggle, maxLevel }) => {
		const chartRef = useRef();
		const [windowWidth, setWindowWidth] = useState(0);
		const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < largeScreen);
		const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < 992 && window.innerWidth > 320);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
		const [negativeTbr, setNegativeTbr] = useState(false);
		const [negativeObl, setNegativeObl] = useState(false);
		const [negativeOutlay, setNegativeOutlay] = useState(false);
		const [isHovered, setIsHovered] = useState(false);
		const [mouseValue, setMouseValue] = useState({
			x: 0,
			y: 0
		});
		const [sortedNums, setSortedNums] = useState(null);
		const [hoverData, setHoverData] = useState(null);
		const viewHeight = 760;
		const viewWidth = 1e3;
		const margins = {
			top: 40,
			right: 0,
			bottom: 10,
			left: isLargeScreen ? 180 : 245
		};
		const chartHeight = viewHeight - margins.top - margins.bottom;
		const chartWidth = viewWidth - margins.left - margins.right + 60;
		let resultNames = [];
		const [textScale, setTextScale] = useState(viewWidth / viewWidth);
		const handleClick = (data) => {
			setDrilldownLevel(level + 1, data);
		};
		const setMouseData = throttle((e) => {
			const browser = window.navigator.userAgent;
			if (browser.includes("Chrome")) setMouseValue({
				x: e.clientX - document.getElementById("sof_chart")?.getBoundingClientRect().left,
				y: e.clientY - document.getElementById("sof_chart")?.getBoundingClientRect().top + 5
			});
			else if (browser.includes("Firefox") || browser.includes("Safari")) setMouseValue({
				x: e.clientX - document.getElementById("sof_chart")?.getBoundingClientRect().left,
				y: e.clientY - document.getElementById("sof_chart")?.getBoundingClientRect().top
			});
			else setMouseValue({
				x: e.offsetX || e.clientX,
				y: e.offsetY || e.clientY
			});
		}, 100);
		useEffect(() => {
			document?.getElementById("sof_chart")?.addEventListener("mousemove", setMouseData);
			return () => document?.getElementById("sof_chart")?.removeEventListener("mousemove", setMouseData);
		}, [setMouseData]);
		useEffect(() => {
			setTextScale(viewWidth / chartRef.current?.getBoundingClientRect().width);
			const handleResize = throttle(() => {
				setTextScale(viewWidth / chartRef.current?.getBoundingClientRect().width);
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsLargeScreen(newWidth < largeScreen);
					setIsMobile(newWidth < 600);
					setIsMediumScreen(newWidth < 992 && newWidth > 320);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		function wrapText(text) {
			text.each(function w() {
				const textWidth = chartRef.current?.getBoundingClientRect().width * .3;
				const textNode = select_default(this);
				const words = textNode.text().split(/\s+/).reverse();
				let word;
				let line = [];
				const y = textNode.attr("y");
				let tspan = textNode.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", "1.1em");
				while (words.length) {
					word = words.pop();
					line.push(word);
					tspan.text(line.join(" "));
					if (tspan.node().getComputedTextLength() > textWidth) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = textNode.append("tspan").attr("x", 0).attr("y", y).attr("dy", "1.3em").text(word);
					}
				}
			});
		}
		const truncateTextLabel = (text) => {
			if (level >= 0 && text.length > 35) return `${text.substring(0, 30)}...`;
			return text;
		};
		function wrapTextMobile() {
			return "";
		}
		const chartHeightYScale = () => {
			if (isLargeScreen) {
				if (!toggle) {
					if (isMediumScreen) return chartHeight + 140;
					return chartHeight + 575;
				}
				return chartHeight + 550;
			}
			return chartHeight;
		};
		const chartHeightViewBox = () => {
			if (window.innerWidth >= 992 && window.innerWidth < 1200 && toggle) return viewHeight * 1.5;
			else if (isMobile) return 770 * 2.4;
			else if (isMediumScreen) return 800 + margins.top + margins.bottom;
			else if (isLargeScreen) return 1300 + margins.top + margins.bottom;
			return viewHeight * 1.06;
		};
		const chartLevelText = () => {
			if (level === 0) return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("hr", {}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
				className: "tooltip__text-note",
				children: [
					"Click a sub-component to view ",
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("br", {}),
					"Federal Accounts"
				]
			})] });
			else if (level === 1) return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("hr", {}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
				className: "tooltip__text-note",
				children: [
					"Click a Federal Account to view ",
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("br", {}),
					"Treasury Accounts"
				]
			})] });
			else if (level === 2) return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("hr", {}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
				className: "tooltip__text-note",
				children: [
					"Click a Treasury Account to view ",
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("br", {}),
					"Program Activities or Object Classes"
				]
			})] });
			else if (level === 3) return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("hr", {}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
				className: "tooltip__text-note",
				children: [
					"Click bar to view ",
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("br", {}),
					"Program Activity or Object Class"
				]
			})] });
			return null;
		};
		const paddingResize = () => {
			if (isLargeScreen) return .3;
			return 0;
		};
		const horizontalBorderYPos = () => {
			if (isLargeScreen) return chartHeight + 530;
			return chartHeight + 40;
		};
		const fontSizeScreenWidth = () => {
			if (isLargeScreen) return 26;
			return 18;
		};
		let tooltipName = null;
		const tooltip = (data) => {
			if (hoverData) {
				if (level < 3) if (data.name.length <= 33) tooltipName = data.name.length + 230;
				else if (data.name.length > 33 && data.name.length < 66) tooltipName = data.name.length + 215;
				else tooltipName = data.name.length + 200;
				else if (level === 3) tooltipName = data.name.length + 200;
				else tooltipName = data.name.length + 125;
				return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "sof-chart-tooltip",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
						className: "tooltip__title",
						children: data.name
					}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
						className: "tooltip__text",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
								className: "tooltip__item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
										className: "tooltip__circle",
										style: !toggle ? { backgroundColor: "#2B71B8" } : { backgroundColor: "#FFBE2E" }
									}),
									!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
										className: "tooltip__text-label",
										children: [
											"FY",
											fy[2],
											fy[3],
											" Obligations"
										]
									}),
									!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
										className: "tooltip__text-amount",
										children: data.obligations
									}),
									toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
										className: "tooltip__text-label",
										children: [
											"FY",
											fy[2],
											fy[3],
											" Outlays"
										]
									}),
									toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
										className: "tooltip__text-amount",
										children: data.outlays
									})
								]
							}),
							level < 3 && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
								className: "tooltip__item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
										className: "tooltip__circle",
										style: !toggle ? { backgroundColor: "#BBDFC7" } : { backgroundColor: "transparent" }
									}),
									!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
										className: "tooltip__text-label",
										children: [
											"FY",
											fy[2],
											fy[3],
											" Total Budgetary",
											/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("br", {}),
											"Resources"
										]
									}),
									!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
										className: "tooltip__text-amount",
										children: data.budgetaryResources
									})
								]
							}),
							chartLevelText()
						]
					})]
				});
			}
			return "";
		};
		const drawNegativeBudgetaryResources = (data, x) => {
			if (data._budgetaryResources < 0) return Math.abs(x(0) - x(data._budgetaryResources)) + 7;
			return Math.abs(x(0) - x(data._budgetaryResources)) + 2;
		};
		const renderChart = () => {
			if (!toggle) {
				const y = band().range([0, isMobile ? viewHeight * 2.3 : chartHeightYScale()]).padding(isMobile ? .5 : paddingResize());
				const x = linear().range([0, isLargeScreen ? chartWidth + 289 : chartWidth + 80]);
				const drawNegativeObligations = (data) => {
					if (data._obligations < 0) return Math.abs(x(0) - x(data._obligations)) + 7;
					return Math.abs(x(0) - x(data._obligations)) + 2;
				};
				select_default("#sof_chart").selectAll("*").remove();
				const svg = select_default("#sof_chart").append("svg").attr("class", "svg").on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				}).attr("xmlns:xlink", "http://www.w3.org/1999/xlink").attr("preserveAspectRatio", "none").attr("viewBox", [
					0,
					0,
					viewWidth + margins.left + margins.right,
					chartHeightViewBox()
				]).append("g").attr("transform", `translate(${isLargeScreen ? margins.left - 40 : margins.left}, ${margins.top})`).on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				const tickMobileXAxis = isLargeScreen ? "translate(-130,0)" : "translate(90, 0)";
				const tickMobileYAxis = () => {
					if (window.innerWidth >= 992 && window.innerWidth < 1200) return "translate(-150,-60)";
					else if (isLargeScreen) return "translate(-150,-35)";
					return "translate(60,0)";
				};
				const negativeTbrArray = [];
				const positiveTbrArray = [];
				const negativeObligationsArray = [];
				const positiveObligationsArray = [];
				sortedNums.forEach((item) => {
					if (item._obligations < 0) {
						negativeObligationsArray.push(item._obligations);
						setNegativeObl(true);
					}
					if (item._obligations >= 0) positiveObligationsArray.push(item._obligations);
					if (item._budgetaryResources < 0) {
						negativeTbrArray.push(item._budgetaryResources);
						setNegativeTbr(true);
					}
					if (item._budgetaryResources >= 0) positiveTbrArray.push(item._budgetaryResources);
				});
				const maxPosTbr = positiveTbrArray.length ? positiveTbrArray.reduce((a, b) => Math.max(a, b)) : null;
				const maxNegTbr = negativeTbrArray.length ? negativeTbrArray.reduce((a, b) => Math.max(Math.abs(a), Math.abs(b))) : null;
				const maxPosObl = positiveObligationsArray.length ? positiveObligationsArray.reduce((a, b) => Math.max(a, b)) : null;
				const maxNegObl = negativeObligationsArray.length ? negativeObligationsArray.reduce((a, b) => Math.max(Math.abs(a), Math.abs(b))) : null;
				const largestPosValue = Math.max(maxPosTbr, maxPosObl);
				const largestNegValue = Math.max(Math.abs(maxNegTbr), Math.abs(maxNegObl)) * -1;
				if (negativeTbr || negativeObl) x.domain([largestNegValue, largestPosValue]).nice(2);
				else x.domain([0, largestPosValue]).nice(2);
				for (let i = 0; i < sortedNums.length; i++) resultNames = resultNames.concat(sortedNums[i].name);
				if (sortedNums.length < 10) for (let i = sortedNums.length; i < 10; i++) resultNames.push(i);
				y.domain(resultNames);
				svg.append("g").attr("transform", tickMobileXAxis).attr("class", "tickLines-vertical").style("stroke-width", 2).call(axisTop(x).tickFormat((d) => `${format$1("$.2s")(d).replace("G", "B").replace("0.0", "0")}`).tickSize(isLargeScreen ? -chartHeight - 510 : -chartHeight - 4).ticks(isLargeScreen ? 2 : 5)).call((g) => g.select(".domain").remove()).selectAll(".tick text").attr("id", "tick-labels-axis").attr("tabindex", 0).attr("dy", "-0.16em").attr("dx", "0em").style("font-size", isMobile ? 36 : fontSizeScreenWidth()).style("font-family", "Source Sans Pro").style("fill", "#555").style("font-size", isMobile ? "1.3rem" : "1.45rem").attr("transform", `scale(${textScale} ${textScale})`).on("mouseenter", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				selectAll_default(".tick text").each(function mobileTextCount(d, i, n) {
					if (i === n.length - 1) select_default(this).attr("dx", "-1.2em");
					if (isMobile) {
						if (i === 0) select_default(this).attr("dx", "0.2em");
					}
				});
				svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#d6d7d9").style("stroke-width", 3).attr("x1", -10).attr("y1", 0).attr("x2", () => {
					if (sortedNums[0]._obligations < 0) return x(0);
					return isLargeScreen ? chartWidth + 330 : chartWidth + 81;
				}).attr("y2", 0);
				svg.append("g").attr("transform", tickMobileYAxis).style("stroke-width", 0).call(isLargeScreen ? axisRight(y) : axisLeft(y).tickSize(0)).selectAll(".tick text").attr("class", "y-axis-labels").attr("tabindex", 0).style("fill", "#555").style("font-family", "Source Sans Pro").style("font-size", "1.45rem").attr("transform", `scale(${textScale} ${textScale})`).text((d) => truncateTextLabel(d)).call(isLargeScreen ? wrapTextMobile : wrapText).on("mouseenter", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				selectAll_default(".y-axis-labels").each(function removeTicks(d) {
					if (isMobile) {
						select_default(this).attr("dx", "-0.25em");
						select_default(this).attr("dy", "-0.4em");
					}
					if (!isNaN(d)) select_default(this).remove();
				});
				const barGroups = svg.append("g").attr("class", () => {
					if (level !== maxLevel) return "parent-g";
					return "";
				}).on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				}).selectAll(".bar-group").data(sortedNums).enter().append("g").attr("class", "bar-group").attr("tabindex", 0).attr("transform", window.innerWidth > 1200 ? "translate(0, -10)" : "translate(0, 0)");
				barGroups.append("rect").attr("transform", tickMobileXAxis).attr("x", -8).attr("y", (d) => {
					if (isLargeScreen) {
						if (isMediumScreen) return y(d.name) + 10;
						return y(d.name);
					}
					return y(d.name) + 40;
				}).attr("width", isLargeScreen ? chartWidth + 340 : chartWidth + 90).attr("height", () => {
					if (!isMobile) {
						if (isMediumScreen) return "31.12";
						return "42.37";
					}
					return "63.63";
				}).attr("fill", "#fff").attr("stroke", "#f1f1f1").attr("class", "hbars").attr("id", "hlines");
				barGroups.append("rect").attr("transform", tickMobileXAxis).attr("x", (d) => {
					if (d._budgetaryResources < 0) return x(d._budgetaryResources) - 8;
					if (!negativeTbr && !negativeObl) return x(0) - 8;
					return x(0);
				}).attr("y", (d) => {
					if (isLargeScreen) {
						if (isMediumScreen) return y(d.name) + 10;
						return y(d.name);
					}
					return y(d.name) + 40;
				}).attr("width", (d) => {
					if (negativeTbr || negativeObl) return drawNegativeBudgetaryResources(d, x);
					if (d._budgetaryResources === 0) return 0;
					return x(d._budgetaryResources) + 11;
				}).attr("height", () => {
					if (!isMobile) {
						if (isMediumScreen) return "31.12";
						return "42.37";
					}
					return "63.63";
				}).attr("fill", "#BBDFC7").attr("class", "hbars").attr("id", "tbr-bar");
				barGroups.append("rect").attr("transform", tickMobileXAxis).attr("x", (d) => {
					if (d._obligations < 0) return x(d._obligations) - 8;
					if (!negativeTbr && !negativeObl) return x(0) - 8;
					return x(0);
				}).attr("y", (d) => {
					if (isLargeScreen) {
						if (isMediumScreen) return y(d.name) + 10;
						return y(d.name);
					}
					return y(d.name) + 40;
				}).attr("width", (d) => {
					if (negativeTbr || negativeObl) return drawNegativeObligations(d);
					if (d._obligations === 0) return 0;
					return x(d._obligations) + 11;
				}).attr("height", () => {
					if (!isMobile) {
						if (isMediumScreen) return "31.12";
						return "42.37";
					}
					return "63.63";
				}).attr("fill", "#2B71B8").attr("class", "hbars").attr("id", "obl-bar");
				svg.selectAll(".bar-group").on("click", (event, d) => {
					handleClick(d);
				});
				svg.selectAll(".bar-group").on("touchend", (event, d) => {
					handleClick(d);
				});
				svg.selectAll(".bar-group").on("keypress", (event, d) => {
					if (event.key === "Enter") handleClick(d);
				});
				svg.selectAll(".bar-group").on("mouseenter", (event, d) => {
					setIsHovered(true);
					setHoverData(d);
					tooltip(hoverData);
				});
				svg.selectAll(".bar-group").on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				svg.selectAll(".y-axis-labels").append("svg:title").text((d) => d);
				if (level >= maxLevel) {
					svg.selectAll(".bar-group").on("click", null);
					svg.selectAll(".bar-group").on("keypress", null);
					svg.selectAll(".bar-group").on("touchend", null);
				}
				svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#aeb0b5").style("stroke-width", 1).attr("x1", -320).attr("y1", isMobile ? chartHeight + 1020 : horizontalBorderYPos()).attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 85).attr("y2", isMobile ? chartHeight + 1020 : horizontalBorderYPos());
				if (negativeTbr || negativeObl) svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#aeb0b5").style("stroke-width", 3).attr("x1", x(0)).attr("y1", 0).attr("x2", x(0)).attr("y2", isLargeScreen ? chartHeight + 500 : chartHeight + 4);
			} else {
				const y = band().range([0, isMobile ? viewHeight * 2.5 : chartHeightYScale()]).padding(isMobile ? .7 : paddingResize());
				const x = linear().range([0, isLargeScreen ? chartWidth + 289 : chartWidth + 80]);
				const drawNegativeOutlays = (data) => {
					if (data._outlays < 0) return Math.abs(x(0) - x(data._outlays)) + 7;
					return Math.abs(x(0) - x(data._outlays)) + 2;
				};
				select_default("#sof_chart").selectAll("*").remove();
				const svg = select_default("#sof_chart").append("svg").attr("class", "svg").on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				}).attr("xmlns:xlink", "http://www.w3.org/1999/xlink").attr("preserveAspectRatio", "none").attr("viewBox", [
					0,
					0,
					viewWidth + margins.left + margins.right,
					chartHeightViewBox()
				]).append("g").attr("transform", `translate(${isLargeScreen ? margins.left - 40 : margins.left}, ${margins.top})`).on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				const tickMobileXAxis = isLargeScreen ? "translate(-130, 0)" : "translate(90, 0)";
				const transformBarGroup = () => {
					if (window.innerWidth >= 992 && window.innerWidth < 1200) return "translate(-130,10)";
					else if (isLargeScreen) return "translate(-130, 0)";
					return "translate(90, 0)";
				};
				const tickMobileYAxis = () => {
					if (window.innerWidth >= 600 && window.innerWidth < 1200) return "translate(-150,-60)";
					else if (isMobile) return "translate(-150,-40)";
					else if (!isLargeScreen) return "translate(60,0)";
					return "translate(-150,-135)";
				};
				const negativeTbrArray = [];
				const positiveTbrArray = [];
				const negativeOutlaysArray = [];
				const positiveOutlaysArray = [];
				sortedNums.forEach((item) => {
					if (item._outlays < 0) {
						negativeOutlaysArray.push(item._outlays);
						setNegativeOutlay(true);
					}
					if (item._outlays >= 0) positiveOutlaysArray.push(item._outlays);
					if (item._budgetaryResources < 0) {
						negativeTbrArray.push(item._budgetaryResources);
						setNegativeTbr(true);
					}
					if (item._budgetaryResources >= 0) positiveTbrArray.push(item._budgetaryResources);
				});
				const maxPosTbr = positiveTbrArray.length ? positiveTbrArray.reduce((a, b) => Math.max(a, b)) : null;
				const maxNegTbr = negativeTbrArray.length ? negativeTbrArray.reduce((a, b) => Math.max(Math.abs(a), Math.abs(b))) : null;
				const maxPosOutlay = positiveOutlaysArray.length ? positiveOutlaysArray.reduce((a, b) => Math.max(a, b)) : null;
				const maxNegOutlay = negativeOutlaysArray.length ? negativeOutlaysArray.reduce((a, b) => Math.max(Math.abs(a), Math.abs(b))) : null;
				const largestPosValue = Math.max(maxPosTbr, maxPosOutlay);
				const largestNegValue = Math.max(Math.abs(maxNegTbr), Math.abs(maxNegOutlay)) * -1;
				if (negativeTbr || negativeOutlay) x.domain([largestNegValue, largestPosValue]).nice(2);
				else x.domain([0, largestPosValue]).nice(2);
				for (let i = 0; i < sortedNums.length; i++) resultNames = resultNames.concat(sortedNums[i].name);
				if (sortedNums.length < 10) for (let i = sortedNums.length; i < 10; i++) resultNames.push(i);
				y.domain(resultNames);
				svg.append("g").attr("transform", tickMobileXAxis).attr("class", "tickLines-vertical").style("stroke-width", 2).call(axisTop(x).tickFormat((d) => `${format$1("$.2s")(d).replace("G", "B").replace("0.0", "0")}`).tickSize(isLargeScreen ? -chartHeight - 510 : -chartHeight - 4).ticks(isLargeScreen ? 2 : 5)).call((g) => g.select(".domain").remove()).selectAll(".tick text").attr("id", "tick-labels-axis").attr("tabindex", 0).attr("dy", "-0.16em").attr("dx", "0em").style("font-size", isMobile ? 36 : fontSizeScreenWidth()).style("font-family", "Source Sans Pro").style("fill", "#555").style("font-size", isMobile ? "1.3rem" : "1.45rem").attr("transform", `scale(${textScale} ${textScale})`).on("mouseenter", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				selectAll_default(".tick text").each(function mobileTextCount(d, i, n) {
					if (i === n.length - 1) select_default(this).attr("dx", "-1.2em");
					if (isMobile) {
						if (i === 0) select_default(this).attr("dx", "0.2em");
					}
				});
				svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#d6d7d9").style("stroke-width", 3).attr("x1", -10).attr("y1", 0).attr("x2", () => {
					if (sortedNums[0]._outlays < 0) return x(0);
					return isLargeScreen ? chartWidth + 330 : chartWidth + 81;
				}).attr("y2", 0);
				svg.append("g").attr("transform", tickMobileYAxis).style("stroke-width", 0).call(isLargeScreen ? axisRight(y) : axisLeft(y).tickSize(0)).selectAll(".tick text").attr("class", "y-axis-labels").attr("tabindex", 0).style("fill", "#555").style("font-family", "Source Sans Pro").style("font-size", "1.45rem").attr("transform", `scale(${textScale} ${textScale})`).text((d) => truncateTextLabel(d)).call(isLargeScreen ? wrapTextMobile : wrapText).on("mouseenter", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				selectAll_default(".y-axis-labels").each(function removeTicks(d) {
					if (isMobile) {
						select_default(this).attr("dx", "-0.25em");
						select_default(this).attr("dy", "-0.4em");
					}
					if (!isNaN(d)) select_default(this).remove();
				});
				const barGroups = svg.append("g").attr("class", () => {
					if (level !== maxLevel) return "parent-g";
					return "";
				}).on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				}).selectAll(".bar-group").data(sortedNums).enter().append("g").attr("class", "bar-group").attr("tabindex", 0).attr("transform", !isMobile ? "translate(0,-10)" : "translate(0,0)");
				barGroups.append("rect").attr("transform", transformBarGroup).attr("x", -8).attr("y", (d) => {
					if (isLargeScreen) {
						if (isMediumScreen) return y(d.name) + 10;
						return y(d.name);
					}
					return y(d.name) + 40;
				}).attr("width", isLargeScreen ? chartWidth + 340 : chartWidth + 90).attr("height", () => {
					if (!isMobile) {
						if (isMediumScreen) return "31.12";
						return "42.37";
					}
					return "63.63";
				}).attr("fill", "#fff").attr("stroke", "#f1f1f1").attr("class", "hbars").attr("id", "hlines");
				barGroups.append("rect").attr("transform", tickMobileXAxis).attr("x", (d) => {
					if (d._outlays < 0) return x(d._outlays) - 8;
					if (!negativeTbr && !negativeOutlay) return x(0) - 8;
					return x(0);
				}).attr("y", (d) => {
					if (isLargeScreen) {
						if (isMediumScreen) return y(d.name) + 10;
						return y(d.name) + 10;
					}
					return y(d.name) + 40;
				}).attr("width", (d) => {
					if (negativeTbr || negativeOutlay) return drawNegativeOutlays(d);
					if (d._outlays === 0) return 0;
					return x(d._outlays) + 11;
				}).attr("height", () => {
					if (!isMobile) {
						if (isMediumScreen) return "31.12";
						return "42.37";
					}
					return "63.63";
				}).attr("fill", "#FFBE2E").attr("class", "hbars").attr("id", "out-bar");
				svg.selectAll(".bar-group").on("click", (event, d) => {
					handleClick(d);
				});
				svg.selectAll(".bar-group").on("touchend", (event, d) => {
					handleClick(d);
				});
				svg.selectAll(".bar-group").on("keypress", (event, d) => {
					if (event.key === "Enter") handleClick(d);
				});
				svg.selectAll(".bar-group").on("mouseenter", (event, d) => {
					setIsHovered(true);
					setHoverData(d);
					tooltip(hoverData);
				});
				svg.selectAll(".out-bar").on("mouseleave", () => {
					setIsHovered(false);
					setHoverData(null);
				});
				svg.selectAll(".y-axis-labels").append("svg:title").text((d) => d);
				if (level >= maxLevel) {
					svg.selectAll(".bar-group").on("click", null);
					svg.selectAll(".bar-group").on("keypress", null);
					svg.selectAll(".bar-group").on("touchend", null);
					svg.selectAll("#out-bar").on("click", null);
					svg.selectAll("#out-bar").on("keypress", null);
					svg.selectAll("#out-bar").on("touchend", null);
				}
				svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#aeb0b5").style("stroke-width", 1).attr("x1", -320).attr("y1", isMobile ? chartHeight + 1740 : horizontalBorderYPos()).attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 85).attr("y2", isMobile ? chartHeight + 1740 : horizontalBorderYPos());
				if (negativeTbr || negativeOutlay) svg.append("line").attr("transform", tickMobileXAxis).style("stroke", "#aeb0b5").style("stroke-width", 3).attr("x1", x(0)).attr("y1", 0).attr("x2", x(0)).attr("y2", isLargeScreen ? chartHeight + 500 : chartHeight + 4);
				svg.append("defs").append("pattern").attr("x", "0").attr("y", "0").attr("id", "diagonalHatch").attr("patternUnits", "userSpaceOnUse").attr("width", 1).attr("height", 12).attr("patternTransform", "rotate(-130, 4, 4)").append("path").attr("d", "M -1,2 l 6,0").attr("stroke", "#d7d8d9").attr("stroke-width", 3);
			}
		};
		useEffect(() => {
			if (sortedNums?.length > 0) renderChart(toggle);
		}, [
			renderChart,
			sortedNums,
			textScale,
			hoverData,
			toggle
		]);
		useEffect(() => {
			if (results?.length > 0) setSortedNums(results.sort((a, b) => b._budgetaryResources - a._budgetaryResources));
		}, [results]);
		return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [
			isHovered && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ds, {
				className: "sof_chart-tt",
				width: 288,
				tooltipPosition: "bottom",
				tooltipComponent: tooltip(hoverData),
				styles: !toggle ? {
					position: "absolute",
					transform: `translate(${mouseValue.x - 144}px,${mouseValue.y - tooltipName}px)`
				} : {
					position: "absolute",
					transform: `translate(${mouseValue.x - 144}px,${mouseValue.y - (tooltipName - 10)}px)`
				},
				controlledProps: {
					isControlled: true,
					isVisible: isHovered,
					showTooltip: () => {},
					closeTooltip: () => {}
				}
			}),
			isMobile && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(Qs, {
				className: "legend",
				style: { flexDirection: isLargeScreen ? "column" : "row" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "legend__item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
							className: "legend__circle",
							style: !toggle ? { backgroundColor: "#2B71B8" } : { backgroundColor: "#FFBE2E" }
						}),
						!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "legend__text",
							children: [
								"FY",
								fy[2],
								fy[3],
								" Obligations"
							]
						}),
						toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "legend__text",
							children: [
								"FY",
								fy[2],
								fy[3],
								" Outlays"
							]
						}),
						"\xA0\xA0\xA0\xA0"
					]
				}), level < 3 && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "legend__item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
						className: "legend__circle",
						style: !toggle ? { backgroundColor: "#BBDFC7" } : { display: "transparent" }
					}), !toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
						className: "legend__text",
						children: [
							"FY",
							fy[2],
							fy[3],
							" Total Budgetary Resources"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
				id: "sof_chart",
				className: "status-of-funds__visualization",
				ref: chartRef
			}),
			!isMobile && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(Qs, {
				className: "legend",
				style: { flexDirection: isLargeScreen ? "column" : "row" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "legend__item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
							className: "legend__circle",
							style: !toggle ? { backgroundColor: "#2B71B8" } : { backgroundColor: "#FFBE2E" }
						}),
						!toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "legend__text",
							children: [
								"FY",
								fy[2],
								fy[3],
								" Obligations"
							]
						}),
						toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "legend__text",
							children: [
								"FY",
								fy[2],
								fy[3],
								" Outlays"
							]
						}),
						"\xA0\xA0\xA0\xA0"
					]
				}), level < 3 && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "legend__item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
						className: "legend__circle",
						style: !toggle ? { backgroundColor: "#BBDFC7" } : { display: "transparent" }
					}), !toggle && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
						className: "legend__text",
						children: [
							"FY",
							fy[2],
							fy[3],
							" Total Budgetary Resources"
						]
					})]
				})]
			})
		] });
	};
	StatusOfFundsChart.propTypes = propTypes$33;
}));
//#endregion
//#region src/js/components/agency/visualizations/StatusOfFundsTable.jsx
var import_jsx_runtime$34, propTypes$32, StatusOfFundsTable;
var init_StatusOfFundsTable = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	import_jsx_runtime$34 = require_jsx_runtime();
	propTypes$32 = {
		fy: PropTypes.string,
		results: PropTypes.array,
		level: PropTypes.number.isRequired,
		setDrilldownLevel: PropTypes.func,
		toggle: PropTypes.bool,
		isMobile: PropTypes.bool,
		maxLevel: PropTypes.number,
		dropdownSelection: PropTypes.string
	};
	StatusOfFundsTable = ({ results, fy, setDrilldownLevel, level, toggle, isMobile, maxLevel, dropdownSelection }) => {
		const [atMaxLevel, setAtMaxLevel] = useState(false);
		const fyString = `FY${fy.slice(2)}`;
		const levels = [
			"Sub-Component",
			"Federal Account",
			"Treasury Account Symbol",
			`${dropdownSelection}`,
			`${dropdownSelection === "Program Activity" ? "Object Class" : "Program Activity"}`
		];
		const columns = toggle ? [{
			title: "subComponent",
			displayName: levels[level]
		}, {
			title: "outlays",
			displayName: [`${fyString} Outlays`],
			right: true
		}] : [
			{
				title: "subComponent",
				displayName: levels[level]
			},
			{
				title: "totalBudgetaryResources",
				displayName: isMobile ? `${fyString} Total Budgetary Resources` : [
					`${fyString} Total Budgetary`,
					/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("br", {}),
					"Resources"
				],
				right: true
			},
			{
				title: "obligations",
				displayName: `${fyString} Obligations`,
				right: true
			}
		];
		const rows = results.map((data) => toggle ? [data.name, formatMoneyWithPrecision(data._outlays)] : [
			data.name,
			formatMoneyWithPrecision(data._budgetaryResources),
			formatMoneyWithPrecision(data._obligations)
		]);
		const onClickHandler = (item) => {
			const itemName = item[0] || "";
			const data = results.find(({ name }) => name === itemName);
			if (level < maxLevel) setDrilldownLevel(level + 1, data);
		};
		useEffect(() => {
			setAtMaxLevel(level === maxLevel);
		}, [level, maxLevel]);
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(ss, {
			classNames: "award-type-tooltip__table",
			columns,
			rows,
			onClickHandler,
			isMobile,
			atMaxLevel,
			isStacked: true,
			newMobileView: true
		});
	};
	StatusOfFundsTable.propTypes = propTypes$32;
}));
//#endregion
//#region src/js/components/agency/statusOfFunds/VisualizationSection.jsx
/**
* VisualizationSection.jsx
* Created by Lizzie Salita 10/29/21
*/
var import_jsx_runtime$33, propTypes$31, VisualizationSection$1;
var init_VisualizationSection$1 = __esmMin((() => {
	init_es();
	init_dist();
	init_index_es();
	init_StatusOfFundsChart();
	init_RoundedToggle();
	init_Accordion();
	init_GlossaryLink();
	init_ChartTableToggle();
	init_StatusOfFundsTable();
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$31 = {
		toggle: PropTypes.bool,
		onToggle: PropTypes.func,
		onKeyToggle: PropTypes.func,
		level: PropTypes.number.isRequired,
		setDrilldownLevel: PropTypes.func,
		fy: PropTypes.string,
		results: PropTypes.array,
		isMobile: PropTypes.bool,
		viewType: PropTypes.string,
		setViewType: PropTypes.func,
		maxLevel: PropTypes.number,
		dropdownSelection: PropTypes.string,
		setDropdownSelection: PropTypes.func
	};
	VisualizationSection$1 = ({ toggle, onKeyToggle, onToggle, level, setDrilldownLevel, fy, results, isMobile, viewType, setViewType, maxLevel, dropdownSelection, setDropdownSelection }) => {
		const [open, setOpen] = useState(false);
		const accordionTitle = /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", { children: "What\xA0is\xA0this?" });
		const levelsLabelArray = [
			"Sub-Component",
			"Federal Account",
			"Treasury Account Symbol",
			"",
			`${dropdownSelection === "Program Activity" ? "Object Class" : "Program Activity"}`
		];
		const currentLevelData = {
			name: useSelector((state) => state.agency.currentLevelNameAndId.name),
			id: useSelector((state) => state.agency.currentLevelNameAndId.id)
		};
		const currentTasData = {
			name: useSelector((state) => state.agency.selectedTas?.name),
			id: useSelector((state) => state.agency.selectedTas?.id),
			_obligations: useSelector((state) => state.agency.selectedTas?._obligations),
			_outlays: useSelector((state) => state.agency.selectedTas?._outlays)
		};
		const changeView = (label) => {
			setViewType(label);
		};
		const chartTableToggle = /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(ChartTableToggle, {
			activeType: viewType,
			changeView
		});
		const maxLevelClass = level !== maxLevel ? " not-max-level" : "";
		const dropdownClickFunction = (value) => {
			setDropdownSelection(value);
			if (value === "Object Class") setDrilldownLevel(level, currentTasData, true);
			else setDrilldownLevel(level, currentTasData);
		};
		const options = [{
			name: "Program Activity",
			value: "Program Activity",
			onClick: dropdownClickFunction
		}, {
			name: "Object Class",
			value: "Object Class",
			onClick: dropdownClickFunction
		}];
		const sortButNotReally = () => options;
		const chartHeadingWithDropdown = /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "status-of-funds__controls-heading-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__controls-heading",
					children: [currentLevelData.name, " by "]
				}),
				level === 3 ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Xa, {
					className: "status-of-funds__chart-picker",
					sortFn: sortButNotReally,
					options,
					dropdownDirection: "right",
					backgroundColor: "#ffffff",
					selectedOption: dropdownSelection
				}) : /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__controls-heading emphasis",
					children: [levelsLabelArray[level], " "]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__controls-heading",
					children: ["for FY ", fy]
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "status-of-funds__visualization",
			onMouseLeave: () => {
				const el = document.querySelector("div.tooltip-wrapper.sof_chart-tt");
				if (el) el.style.display = "none";
			},
			children: [
				isMobile ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)(import_jsx_runtime$33.Fragment, { children: [chartHeadingWithDropdown, /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__controls-mobile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
						className: "status-of-funds__controls-mobile-row-one",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(RoundedToggle, {
							toggle,
							onKeyToggle,
							onToggle,
							label: "View Outlays"
						}), chartTableToggle]
					}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Accordion, {
						setOpen,
						closedIcon: "chevron-down",
						openIcon: "chevron-up",
						title: accordionTitle
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(import_jsx_runtime$33.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
						className: "status-of-funds__controls-desktop-row-one",
						children: [chartHeadingWithDropdown, chartTableToggle]
					}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
						className: "status-of-funds__controls-desktop-row-two",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(RoundedToggle, {
								toggle,
								onKeyToggle,
								onToggle,
								label: "View Outlays"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", { className: "status-of-funds__line-div" }),
							/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Accordion, {
								setOpen,
								closedIcon: "chevron-down",
								openIcon: "chevron-up",
								title: "What is this?"
							})
						]
					})]
				}) }),
				open && /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "status-of-funds__what-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(FontAwesomeIcon, {
							icon: "info-circle",
							className: "status-of-funds__info-icon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("p", {
							className: "status-of-funds__what-heading",
							children: "What is an outlay?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("p", {
							className: "status-of-funds__what-text",
							children: [
								"An ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
									className: "status-of-funds__emphasis",
									children: "outlay"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(GlossaryLink, { term: "outlay" }),
								" is money that has been paid out from a federal account. This should not be confused with an ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("span", {
									className: "status-of-funds__emphasis",
									children: ["obligation\xA0", /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(GlossaryLink, { term: "obligation" })]
								}),
								" , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government's obligations."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("p", {
							className: "status-of-funds__what-second-heading",
							children: "Why are the obligation and budgetary resource amounts no longer visible on the chart?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("p", {
							className: "status-of-funds__what-text",
							children: [
								"Remember, the ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
									className: "status-of-funds__emphasis",
									children: "budgetary resources"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(GlossaryLink, { term: "budgetary-resources" }),
								" and obligations on this chart refer to available amounts and promised amounts for spending in your selected fiscal year. However, agencies may make outlays to pay off obligations made in your selected year or in previous years. This means outlays on this chart should ",
								/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
									className: "status-of-funds__emphasis",
									children: "not"
								}),
								" be compared to the obligations or budgetary resources within any single fiscal year."
							]
						})
					]
				}),
				viewType === "chart" ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
					className: "status-of-funds__visualization-chart",
					children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StatusOfFundsChart, {
						toggle,
						fy,
						results,
						level,
						setDrilldownLevel,
						maxLevel
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
					className: `status-of-funds__visualization-table-container${maxLevelClass}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StatusOfFundsTable, {
						fy,
						results,
						level,
						setDrilldownLevel,
						isMobile,
						toggle,
						dropdownSelection,
						maxLevel
					})
				})
			]
		});
	};
	VisualizationSection$1.propTypes = propTypes$31;
}));
//#endregion
//#region src/js/components/agency/statusOfFunds/StatusOfFunds.jsx
/**
* StatusOfFunds.jsx
* Created by Lizzie Salita 10/27/21
*/
var import_jsx_runtime$32, propTypes$30, StatusOfFunds;
var init_StatusOfFunds = __esmMin((() => {
	init_dist();
	init_index_es();
	init_IsMobileContext();
	init_VisualizationSection$1();
	import_jsx_runtime$32 = require_jsx_runtime();
	propTypes$30 = {
		toggle: PropTypes.bool,
		onToggle: PropTypes.func,
		onKeyToggle: PropTypes.func,
		level: PropTypes.number.isRequired,
		setDrilldownLevel: PropTypes.func,
		fy: PropTypes.string,
		results: PropTypes.array,
		isMobile: PropTypes.bool,
		viewType: PropTypes.string,
		setViewType: PropTypes.func,
		maxLevel: PropTypes.number,
		dropdownSelection: PropTypes.string,
		setDropdownSelection: PropTypes.func,
		changeCurrentPage: PropTypes.func,
		totalItems: PropTypes.number.isRequired,
		currentPage: PropTypes.number,
		pageSize: PropTypes.number,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool
	};
	StatusOfFunds = ({ goBack, toggle, onToggle, onKeyToggle, level, setDrilldownLevel, fy, results, maxLevel, dropdownSelection, setDropdownSelection, currentPage, changeCurrentPage, totalItems, isLoading, isError }) => {
		const { isMedium } = useContext(IsMobileContext);
		const [viewType, setViewType] = useState(isMedium ? "table" : "chart");
		useEffect(() => {
			if (isMedium) setViewType("table");
		}, [isMedium]);
		const getContent = () => {
			if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Wo, {});
			if (isError) return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(fo, {});
			return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(VisualizationSection$1, {
				toggle,
				onToggle,
				onKeyToggle,
				level,
				setDrilldownLevel,
				fy,
				results,
				isMobile: isMedium,
				viewType,
				setViewType,
				maxLevel,
				dropdownSelection,
				setDropdownSelection
			}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Ka, {
				currentPage,
				changePage: changeCurrentPage,
				resultsText: true,
				totalItems
			})] });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [level > 0 && !isMedium ? /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("button", {
			title: "Go up a level",
			className: "drilldown-back-button",
			onClick: goBack,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(FontAwesomeIcon, { icon: "arrow-left" }), "\xA0\xA0Back"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(import_jsx_runtime$32.Fragment, {}), getContent()] });
	};
	StatusOfFunds.propTypes = propTypes$30;
}));
//#endregion
//#region src/js/components/agency/statusOfFunds/IntroSection.jsx
var import_jsx_runtime$31, propTypes$29, IntroSection;
var init_IntroSection = __esmMin((() => {
	init_es();
	init_GlossaryLink();
	import_jsx_runtime$31 = require_jsx_runtime();
	propTypes$29 = {
		fy: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		totalItems: PropTypes.number
	};
	IntroSection = ({ fy, name, totalItems }) => {
		const agencyBudget = useSelector((state) => state.agency.budgetaryResources?.[fy]?.agencyBudget) || "--";
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
			className: "status-of-funds__intro-wrapper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					className: "status-of-funds__intro-section-title",
					children: [
						"How was funding distributed in FY ",
						fy,
						" for ",
						name,
						"?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					className: "status-of-funds__intro-section-text",
					"data-testid": "introCopy",
					children: [
						"Each year, federal agencies receive funding from Congress, known as ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("span", {
							className: "status-of-funds__glossary-term",
							children: "budgetary resources"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(GlossaryLink, { term: "budgetary-resources" }),
						". In FY ",
						fy,
						", the ",
						name,
						" had ",
						agencyBudget,
						" distributed among its ",
						totalItems,
						" subcomponents. Agencies spend available budgetary resources by making financial promises called ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("span", {
							className: "status-of-funds__glossary-term",
							children: "obligations"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(GlossaryLink, { term: "obligation" }),
						". In this section, we show the total budgetary resources broken out by agency sub-component and how much of that funding has been obligated for the fiscal year selected."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					className: "status-of-funds__intro-section-text",
					"data-testid": "introCopy",
					children: [
						"We also show ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("span", {
							className: "status-of-funds__glossary-term",
							children: "outlays"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(GlossaryLink, { term: "outlay" }),
						" for each agency sub-component, or the amount of money that has actually been paid out and not just promised (“obligated”). Note that outlays for any given year are not a subset of the agency’s obligations for that year since agencies can pay out funds related to obligations from previous years."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "status-of-funds__intro-section-italic-text",
					children: "Select a segment in the chart below to dive deeper into the data."
				})
			]
		});
	};
	IntroSection.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/agency/statusOfFunds/DrilldownSidebarLevel.jsx
var import_jsx_runtime$30, propTypes$28, DrilldownSidebarLevel;
var init_DrilldownSidebarLevel = __esmMin((() => {
	init_dist();
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$28 = {
		label: PropTypes.string,
		name: PropTypes.string,
		obligated: PropTypes.string,
		budgetaryResources: PropTypes.string,
		active: PropTypes.bool,
		goBack: PropTypes.func,
		toggle: PropTypes.bool,
		outlay: PropTypes.string,
		obligatedText: PropTypes.object
	};
	DrilldownSidebarLevel = ({ label, name, active, goBack, toggle, outlay, obligatedText }) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
		className: `drilldown-level${active ? " drilldown-level_active" : ""}`,
		children: [goBack ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("button", {
			title: "Go up a level",
			className: "drilldown-level__back",
			onClick: goBack,
			children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(FontAwesomeIcon, { icon: "chevron-left" })
		}) : "", /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "drilldown-level__wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "drilldown-level__label",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
				className: "drilldown-level__content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
					className: "drilldown-level__trail",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", { className: "drilldown-level__indicator" }), active ? null : /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "drilldown-level__line",
						"data-testid": "trailLine"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "drilldown-level__name",
						children: name
					}),
					!toggle && obligatedText,
					toggle && /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						className: "drilldown-level__description",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("strong", { children: outlay }), " has been paid out"]
					})
				] })]
			})]
		})]
	});
	DrilldownSidebarLevel.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/components/agency/statusOfFunds/DrilldownSidebar.jsx
var import_jsx_runtime$29, propTypes$27, DrilldownSidebar;
var init_DrilldownSidebar = __esmMin((() => {
	init_moneyFormatter();
	init_es();
	init_DrilldownSidebarLevel();
	import_jsx_runtime$29 = require_jsx_runtime();
	propTypes$27 = {
		toggle: PropTypes.bool.isRequired,
		level: PropTypes.number.isRequired,
		goBack: PropTypes.func,
		fy: PropTypes.string.isRequired,
		dropdownSelection: PropTypes.string
	};
	DrilldownSidebar = ({ toggle, level, goBack, fy, dropdownSelection }) => {
		const { agencyBudgetShort, agencyObligatedShort, agencyOutlayedShort } = useSelector((state) => state.agency.budgetaryResources?.[fy]) || "--";
		const agencyName = useSelector((state) => state.agency.overview.name);
		const subComponentName = useSelector((state) => state.agency.selectedSubcomponent?.name);
		const subComponentTbr = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._budgetaryResources), 2);
		useSelector((state) => state.agency.selectedSubcomponent?._budgetaryResources);
		const subComponentObligation = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._obligations), 2);
		const subComponentOutlays = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._outlays), 2);
		const federalAccountName = `${useSelector((state) => state.agency.selectedFederalAccount?.id)}: ${useSelector((state) => state.agency.selectedFederalAccount?.name)}`;
		const federalAccountTbr = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources), 2);
		useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources);
		const federalAccountObligation = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._obligations), 2);
		const federalAccountOutlays = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._outlays), 2);
		const tasName = useSelector((state) => state.agency.selectedTas?.name);
		useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources);
		const tasObligation = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedTas?._obligations), 2);
		const tasOutlays = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedTas?._outlays), 2);
		const prgActivityOrObjectClassName = useSelector((state) => state.agency.selectedPrgActivityOrObjectClass?.name);
		const prgActivityOrObjectClassObligation = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedPrgActivityOrObjectClass?._obligations), 2);
		const prgActivityOrObjectClassOutlays = formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedPrgActivityOrObjectClass?._outlays), 2);
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DrilldownSidebarLevel, {
				name: agencyName,
				label: "Parent Agency",
				active: level === 0,
				obligatedText: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "drilldown-level__description",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: agencyObligatedShort }),
						" committed of ",
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: agencyBudgetShort }),
						" Total Budgetary Resources"
					]
				}),
				toggle,
				outlay: agencyOutlayedShort
			}),
			level >= 1 && /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DrilldownSidebarLevel, {
				label: "Sub-Component",
				active: level === 1,
				name: subComponentName,
				obligatedText: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "drilldown-level__description",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: subComponentObligation }),
						" committed of ",
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: subComponentTbr }),
						" Total Budgetary Resources"
					]
				}),
				outlay: subComponentOutlays,
				goBack,
				toggle
			}, "Sub-Component"),
			level >= 2 && /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DrilldownSidebarLevel, {
				label: "Federal Account",
				active: level === 2,
				name: federalAccountName,
				obligatedText: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "drilldown-level__description",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: federalAccountObligation }),
						" committed of ",
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: federalAccountTbr }),
						" Total Budgetary Resources"
					]
				}),
				outlay: federalAccountOutlays,
				goBack,
				toggle
			}, "Federal Account"),
			level >= 3 && /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DrilldownSidebarLevel, {
				label: "Treasury Account Symbol",
				name: tasName,
				active: level === 3,
				obligatedText: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "drilldown-level__description",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: tasObligation }), " committed"]
				}),
				outlay: tasOutlays,
				goBack,
				toggle
			}, "Treasury Account Symbol"),
			level >= 4 && /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DrilldownSidebarLevel, {
				label: dropdownSelection,
				name: prgActivityOrObjectClassName,
				active: level === 4,
				obligatedText: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "drilldown-level__description",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: prgActivityOrObjectClassObligation }), " committed"]
				}),
				outlay: prgActivityOrObjectClassOutlays,
				goBack,
				toggle
			}, dropdownSelection)
		] });
	};
	DrilldownSidebar.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/containers/agency/statusOfFunds/StatusOfFundsContainer.jsx
/**
* StatusOfFundsContainer.jsx
* Created by JD House 02/05/2026
*/
var import_jsx_runtime$28, propTypes$26, StatusOfFundsContainer;
var init_StatusOfFundsContainer = __esmMin((() => {
	init_es();
	init_index_es();
	init_agencyActions();
	init_agency();
	init_StatusOfFundsVizHelper();
	init_WithLatestFy();
	init_Note();
	init_useStateWithPrevious();
	init_StatusOfFunds();
	init_IntroSection();
	init_DrilldownSidebar();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$26 = { fy: PropTypes.string };
	StatusOfFundsContainer = ({ fy }) => {
		const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
		const [level, setLevel] = useState(0);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [resetPageChange, setResetPageChange] = useState(false);
		const [totalItems, setTotalItems] = useState(0);
		const [results, setResults] = useState([]);
		const [toggle, setOnToggle] = useState(false);
		const [dropdownSelection, setDropdownSelection] = useState("Program Activity");
		const { overview } = useSelector((state) => state.agency);
		const dispatch = useDispatch();
		const request = useRef(null);
		const pageRef = useRef(1);
		const selectedSubComponentNameAndId = {
			id: useSelector((state) => state.agency.selectedSubcomponent?.id),
			name: useSelector((state) => state.agency.selectedSubcomponent?.name)
		};
		const selectedFederalAccountNameId = {
			id: useSelector((state) => state.agency.selectedFederalAccount?.id),
			name: useSelector((state) => state.agency.selectedFederalAccount?.name)
		};
		const selectedTasNameAndId = {
			id: useSelector((state) => state.agency.selectedTas?.id),
			name: useSelector((state) => state.agency.selectedTas?.name)
		};
		const level4ApiResponse = { res: useSelector((state) => state.agency.level4ApiResponse) };
		const maxLevel = 4;
		let statusDataThroughDate = useLatestAccountData()[1].toArray().filter((i) => i.submission_fiscal_year == fy)[0]?.period_end_date;
		const paginatedTasList = useCallback((list) => {
			const startIndex = 10 * ((currentPage || 1) - 1);
			const endIndex = startIndex + 10;
			list.slice(startIndex, endIndex);
			return list.slice(startIndex, endIndex);
		}, [currentPage]);
		const fetchAgencySubcomponents = useCallback(() => {
			if (request.current) request.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			request.current = fetchSubcomponentsList(overview.toptierCode, fy, pageRef.current);
			request.current.promise.then((res) => {
				const parsedData = parseRows$1(res.data.results);
				const nameAndId = {
					name: `${overview.name}`,
					id: `${overview.id}`
				};
				dispatch(setCurrentLevelNameAndId(nameAndId));
				setResults(parsedData);
				setTotalItems(res.data.page_metadata.total);
				if (parsedData.length === 0) statusDataThroughDate = "no data";
				dispatch(setDataThroughDates({ statusDataThroughDate }));
				setLoading(false);
			}).catch((err) => {
				setError(true);
				setLoading(false);
				console.error(err);
			});
		}, []);
		const fetchFederalAccounts = useCallback((agencyData) => {
			if (request.current) request.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			request.current = fetchFederalAccountsList(overview.toptierCode, agencyData.id, fy, pageRef.current);
			request.current.promise.then((res) => {
				const parsedData = parseRows$1(res.data.results);
				const nameAndId = {
					name: `${agencyData.name}`,
					id: `${agencyData.id}`
				};
				dispatch(setCurrentLevelNameAndId(nameAndId));
				setLevel(1);
				setResults(parsedData);
				setTotalItems(res.data.page_metadata.total);
				setLoading(false);
			}).catch((err) => {
				setError(true);
				setLoading(false);
				console.error(err);
			});
		}, [
			currentPage,
			error,
			fy,
			loading,
			overview.toptierCode
		]);
		const fetchTas = useCallback((federalAccountData) => {
			if (request.current) request.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			request.current = fetchTasList(federalAccountData.id, fy);
			request.current.promise.then((res) => {
				const parsedData = parseRows$1(res.data.children);
				const nameAndId = {
					name: `${federalAccountData.id}: ${federalAccountData.name}`,
					id: `${federalAccountData.id}`
				};
				dispatch(setCurrentLevelNameAndId(nameAndId));
				setLevel(2);
				setResults(paginatedTasList(parsedData));
				parsedData.map((item) => item.name = item.id);
				setTotalItems(parsedData.length);
				setLoading(false);
			}).catch((err) => {
				setError(true);
				setLoading(false);
				console.error(err);
			});
		}, [
			error,
			fy,
			loading,
			paginatedTasList
		]);
		const fetchDataByTas = useCallback((tas, objectClassFlag) => {
			if (request.current) request.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			if (objectClassFlag) request.current = fetchObjectClassByTas(tas.id, fy, pageRef.current);
			else request.current = fetchProgramActivityByTas(tas.id, fy, pageRef.current);
			request.current.promise.then((res) => {
				dispatch(setLevel4ApiResponse(res.data.results));
				const parsedData = parseRows$1(res.data.results, tas.id);
				const nameAndId = {
					name: `${tas.name}`,
					id: `${tas.id}`
				};
				dispatch(setCurrentLevelNameAndId(nameAndId));
				setLevel(3);
				setResults(parsedData);
				setTotalItems(res.data.page_metadata.total);
				setLoading(false);
			}).catch((err) => {
				setError(true);
				setLoading(false);
				console.error(err);
			});
		}, [
			currentPage,
			error,
			fy,
			loading
		]);
		const fetchLevel5Data = useCallback((prgActivityOrObjClass) => {
			const newData = getLevel5Data(prgActivityOrObjClass.name, level4ApiResponse);
			const parsedData = parseRows$1(newData, prgActivityOrObjClass.id);
			const nameAndId = {
				name: `${prgActivityOrObjClass.name}`,
				id: `${prgActivityOrObjClass.id}`
			};
			dispatch(setCurrentLevelNameAndId(nameAndId));
			setLevel(4);
			setResults(parsedData);
			setTotalItems(newData.length);
		});
		useEffect(() => {
			if (pageRef.current) pageRef.current = currentPage;
			if (resetPageChange) setResetPageChange(false);
			else {
				if (prevPage !== currentPage && level === 0) fetchAgencySubcomponents(currentPage);
				if (prevPage !== currentPage && level === 1) fetchFederalAccounts(selectedSubComponentNameAndId);
				if (prevPage !== currentPage && level === 2) fetchTas(selectedFederalAccountNameId);
				if (prevPage !== currentPage && level === 3) fetchDataByTas(selectedTasNameAndId, dropdownSelection === "Object Class");
				if (prevPage !== currentPage && level === 4) fetchLevel5Data(selectedTasNameAndId);
			}
		}, [currentPage]);
		useEffect(() => {
			if (resetPageChange) {
				setLoading(true);
				if (currentPage === 1) setResetPageChange(false);
				else changeCurrentPage(1);
			}
		}, [resetPageChange]);
		useEffect(() => {
			if (fy && overview.toptierCode) fetchAgencySubcomponents();
		}, [fy, overview.toptierCode]);
		useEffect(() => {
			if (!loading && !error) dispatch(setIsSofChartLoaded(true));
		}, [error, loading]);
		const setDrilldownLevel = useCallback((selectedLevel, parentData, objectClassFlag = false) => {
			if (selectedLevel === 1) {
				fetchFederalAccounts(parentData);
				dispatch(setSelectedSubcomponent(parentData));
			}
			if (selectedLevel === 2) {
				fetchTas(parentData);
				dispatch(setSelectedFederalAccount(parentData));
			}
			if (selectedLevel === 3) {
				fetchDataByTas(parentData, objectClassFlag);
				dispatch(setSelectedTas(parentData));
			}
			if (selectedLevel === 4) {
				fetchLevel5Data(parentData);
				dispatch(setSelectedPrgActivityOrObjectClass(parentData));
				return;
			}
			setResetPageChange(true);
		}, [
			dispatch,
			fetchDataByTas,
			fetchFederalAccounts,
			fetchLevel5Data,
			fetchTas
		]);
		const goBack = () => {
			if (overview.toptierCode) {
				if (level === 1) {
					setLevel(0);
					if (currentPage === 1) fetchAgencySubcomponents();
				}
				if (level === 2) {
					setLevel(1);
					if (currentPage === 1) fetchFederalAccounts(selectedSubComponentNameAndId);
				}
				if (level === 3) {
					setLevel(2);
					setDropdownSelection("Program Activity");
					if (currentPage === 1) fetchTas(selectedFederalAccountNameId);
				}
				if (level === 4) {
					setLevel(3);
					if (currentPage === 1) fetchDataByTas(selectedTasNameAndId, dropdownSelection === "Object Class");
				}
				changeCurrentPage(1);
			}
		};
		const onToggle = useCallback(() => {
			setOnToggle(!toggle);
		}, [toggle]);
		const onKeyToggle = useCallback((event) => {
			if (event.key === "Enter") setOnToggle(!toggle);
		}, [toggle]);
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
			className: "body__content status-of-funds",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(IntroSection, {
					name: overview.name,
					fy,
					totalItems
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(Qs, {
					hasGutter: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)($s, {
						className: "status-of-funds__drilldown-sidebar",
						desktop: 3,
						children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DrilldownSidebar, {
							toggle,
							level,
							goBack,
							dropdownSelection,
							fy
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)($s, {
						className: "status-of-funds__visualization",
						desktop: 9,
						children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(StatusOfFunds, {
							goBack,
							toggle,
							onToggle,
							onKeyToggle,
							level,
							setDrilldownLevel,
							fy,
							results,
							maxLevel,
							dropdownSelection,
							setDropdownSelection,
							currentPage,
							changeCurrentPage,
							totalItems,
							isLoading: loading,
							isError: error
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Note, { message: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [
					"The agency subcomponents displayed in this section were added to provide greater transparency into the organization of agencies’ account data. These subcomponents are based on the Bureau associated with a federal account in OMB’s Master Accounts Title file. Subcomponents are identified using Agency Identifier (AID) and MAIN Account codes. Where possible, Department of Defense (DoD) subcomponents correspond to the branches of the Armed Forces and accounts for the agency are attributed to the appropriate branch/sub-component based on the Agency Codes found at the bottom of",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("a", {
						href: "https://www.whitehouse.gov/wp-content/uploads/2018/06/app_c.pdf",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "OMB Circular A-11 Appendix C"
					}),
					"."
				] }) })
			]
		});
	};
	StatusOfFundsContainer.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/agency/AgencySection.jsx
var import_jsx_runtime$27, dayjs$2, propTypes$25, AgencySection;
var init_AgencySection = __esmMin((() => {
	init_dist();
	init_index_es();
	import_jsx_runtime$27 = require_jsx_runtime();
	dayjs$2 = require_dayjs_min();
	propTypes$25 = {
		section: PropTypes.shape({
			section: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		}),
		icon: PropTypes.string,
		children: PropTypes.element,
		isLoading: PropTypes.bool,
		dataThroughDate: PropTypes.string
	};
	AgencySection = ({ section, icon = "chart-area", children, isLoading, dataThroughDate }) => {
		let dataThroughNote;
		if (dataThroughDate) if (dataThroughDate === "no data") dataThroughNote = "No data available for the selected fiscal year";
		else dataThroughNote = `Data through ${dayjs$2(dataThroughDate).format("M/D/YYYY")}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(Es, {
			id: `agency-v2-${section.section}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(FontAwesomeIcon, {
				size: "2x",
				icon
			}),
			title: section.label,
			isCollapsible: true,
			children: [dataThroughNote ? /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
				className: "section__date-note",
				children: dataThroughNote
			}) : null, isLoading ? /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Wo, {}) : children]
		});
	};
	AgencySection.propTypes = propTypes$25;
}));
//#endregion
//#region src/js/models/v2/agency/BaseAgencyBudgetaryResources.js
var BaseAgencyBudgetaryResources;
var init_BaseAgencyBudgetaryResources = __esmMin((() => {
	init_moneyFormatter();
	BaseAgencyBudgetaryResources = { populate(data) {
		this._agencyBudget = data.agency_budgetary_resources || "--";
		this.agencyBudget = formatMoneyWithUnits(this._agencyBudget);
		this.agencyBudgetShort = formatMoneyWithUnitsShortLabel(this._agencyBudget, 2);
		this._agencyObligated = data.agency_total_obligated || "--";
		this.agencyObligated = formatMoneyWithUnits(this._agencyObligated);
		this.agencyObligatedShort = formatMoneyWithUnitsShortLabel(this._agencyObligated, 2);
		this._agencyOutlayed = data.agency_total_outlayed || "--";
		this.agencyOutlayed = formatMoneyWithUnits(this._agencyOutlayed);
		this.agencyOutlayedShort = formatMoneyWithUnitsShortLabel(this._agencyOutlayed, 2);
		this.percentOfAgencyBudget = calculatePercentage(this._agencyObligated, this._agencyBudget);
		this._federalBudget = data.total_budgetary_resources || 0;
		this.obligationsByPeriod = data.agency_obligation_by_period || [];
		this.percentOfFederalBudget = calculatePercentage(this._agencyBudget, this._federalBudget);
	} };
}));
//#endregion
//#region src/js/dataMapping/agency/visualizations/totalObligationsOverTime.js
var defaultPadding, pathStopColorRed, pathStopColorBlue, areaPathStopColorRed, areaPathStopColorBlue, normalStoppingPoints;
var init_totalObligationsOverTime = __esmMin((() => {
	defaultPadding = {
		top: 24,
		bottom: 24,
		right: 30,
		left: 30
	};
	pathStopColorRed = "#e31c3d";
	pathStopColorBlue = "#205493";
	areaPathStopColorRed = "#f9dede";
	areaPathStopColorBlue = "#dce4ef";
	normalStoppingPoints = [{
		offset: "0%",
		stopColor: "blue"
	}, {
		offset: "100%",
		stopColor: "blue"
	}];
}));
//#endregion
//#region src/js/helpers/agency/visualizations/TotalObligationsOverTimeVisualizationHelper.js
var getYDomain, getMilliseconds, converISODateToDate, addSubmissionEndDatesToBudgetaryResources, exceedsMaxPercentDifference, exceedsMinPercentDifference, exceedsMaxAndMinStoppingPoints, exceedsMaxStoppingPoints, exceedsMinStoppingPoints, stoppingPointsByScenario, determineScenario, stoppingPoints, pathDefinition;
var init_TotalObligationsOverTimeVisualizationHelper = __esmMin((() => {
	init_totalObligationsOverTime();
	getYDomain = (data, agencyBudget) => {
		const obligatedAmounts = data.map((x) => x.obligated);
		if (agencyBudget) obligatedAmounts.push(agencyBudget);
		return [Math.min(...obligatedAmounts), Math.max(...obligatedAmounts)];
	};
	getMilliseconds = (date) => date.getTime();
	converISODateToDate = (date) => {
		const dateString = date.split("T")[0].split("-");
		return new Date(parseInt(dateString[0], 10), parseInt(dateString[1], 10) - 1, parseInt(dateString[2], 10));
	};
	addSubmissionEndDatesToBudgetaryResources = (budgetaryResources, submissionPeriods, fy) => {
		const yearlySubmissions = submissionPeriods.filter((period) => `${period.submission_fiscal_year}` === fy);
		return budgetaryResources.map((budgetaryResource) => {
			const yearlySubmissionEndDateByPeriod = yearlySubmissions.find((submission) => submission.submission_fiscal_month === budgetaryResource.period)?.period_end_date;
			if (yearlySubmissionEndDateByPeriod) return {
				...budgetaryResource,
				endDate: getMilliseconds(new Date(converISODateToDate(yearlySubmissionEndDateByPeriod)))
			};
			return null;
		}).filter((budgetaryResource) => budgetaryResource);
	};
	exceedsMaxPercentDifference = (agencyBudget, data, maxAndMin) => {
		const maxObligation = Math.max(...data.map((x) => x.obligated));
		if (maxAndMin) {
			const minObligation = Math.min(...data.map((x) => x.obligated));
			/**
			* Exceeds max and min only
			* the percent difference between the agency budget and the max obligation
			* with the total being the sum of the max and min obligations.
			*/
			return `${(maxObligation - agencyBudget) / (maxObligation + Math.abs(minObligation)) * 100}%`;
		}
		/**
		* Exceeds max only
		* the percent difference between the agency budget and max obligation.
		*/
		return `${(maxObligation - agencyBudget) / maxObligation * 100}%`;
	};
	exceedsMinPercentDifference = (agencyBudget, data) => {
		const minObligation = Math.abs(Math.min(...data.map((x) => x.obligated)));
		const totalAmountOfMoney = minObligation + Math.max(...data.map((x) => x.obligated));
		/**
		* the stopping point between gradient colors equates to the percent difference between
		* the absolute total (from min - max) and agency budget
		*/
		return `${(totalAmountOfMoney - minObligation) / totalAmountOfMoney * 100}%`;
	};
	exceedsMaxAndMinStoppingPoints = (agencyBudget, data) => {
		const maxPercentDifference = exceedsMaxPercentDifference(agencyBudget, data, true);
		const minPercentDifference = exceedsMinPercentDifference(agencyBudget, data);
		return [
			{
				offset: "0%",
				stopColor: "red"
			},
			{
				offset: maxPercentDifference,
				stopColor: "red"
			},
			{
				offset: maxPercentDifference,
				stopColor: "blue"
			},
			{
				offset: minPercentDifference,
				stopColor: "blue"
			},
			{
				offset: minPercentDifference,
				stopColor: "red"
			},
			{
				offset: "100%",
				stopColor: "red"
			}
		];
	};
	exceedsMaxStoppingPoints = (agencyBudget, data) => {
		const percentDifference = exceedsMaxPercentDifference(agencyBudget, data);
		return [
			{
				offset: "0%",
				stopColor: "red"
			},
			{
				offset: percentDifference,
				stopColor: "red"
			},
			{
				offset: percentDifference,
				stopColor: "blue"
			},
			{
				offset: "100%",
				stopColor: "blue"
			}
		];
	};
	exceedsMinStoppingPoints = (agencyBudget, data) => {
		const percentDifference = exceedsMinPercentDifference(agencyBudget, data);
		return [
			{
				offset: "0%",
				stopColor: "blue"
			},
			{
				offset: percentDifference,
				stopColor: "blue"
			},
			{
				offset: percentDifference,
				stopColor: "red"
			},
			{
				offset: "100%",
				stopColor: "red"
			}
		];
	};
	stoppingPointsByScenario = (scenario, agencyBudget, data) => {
		if (scenario === "exceedsMaxAndMin") return exceedsMaxAndMinStoppingPoints(agencyBudget, data);
		if (scenario === "exceedsMax") return exceedsMaxStoppingPoints(agencyBudget, data);
		if (scenario === "exceedsMin") return exceedsMinStoppingPoints(agencyBudget, data);
		return normalStoppingPoints;
	};
	determineScenario = (agencyBudget, data) => {
		if (agencyBudget && data.length) {
			const obligations = data.map((x) => x.obligated);
			const exceedsMax = Math.max(...obligations) > agencyBudget;
			const exceedsMin = Math.min(...obligations) < 0;
			if (exceedsMax && exceedsMin) return "exceedsMaxAndMin";
			if (exceedsMax) return "exceedsMax";
			if (exceedsMin) return "exceedsMin";
			return "normal";
		}
		return "normal";
	};
	stoppingPoints = (agencyBudget, data) => stoppingPointsByScenario(determineScenario(agencyBudget, data), agencyBudget, data);
	pathDefinition = (data, xScale, xProperty, padding, yScale, yProperty, height, close, areaPath) => data.reduce((path, currentItem, i, originalArray) => {
		if (i === 0) return `M${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}`;
		/**
		* When adding an area path we must close at a certain height.
		* With a normal area path that is usually the height of the graph.
		* When using a negative scenario we want to close the graph at 0.
		*/
		if (originalArray.length === i + 1 && areaPath) return `${path}L${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}L${xScale(currentItem[xProperty]) + padding.left},${close === null ? height - padding.bottom : height - yScale(close) - padding.bottom}Z`;
		return `${path}L${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}`;
	}, "");
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/paths/Path.jsx
/**
* Path.jsx
* Created by Jonathan Hill 04/13/21
*/
var import_jsx_runtime$26, propTypes$24, Path;
var init_Path = __esmMin((() => {
	init_TotalObligationsOverTimeVisualizationHelper();
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$24 = {
		data: PropTypes.array,
		description: PropTypes.string,
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		xProperty: PropTypes.string,
		yProperty: PropTypes.string,
		height: PropTypes.number,
		padding: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			top: PropTypes.number
		})
	};
	Path = ({ data = [], description, xScale = () => {}, yScale = () => {}, xProperty = "endDate", yProperty = "obligated", height, padding }) => {
		const [d, setD] = useState("");
		useEffect(() => {
			if (xScale && yScale) setD(pathDefinition(data, xScale, xProperty, padding, yScale, yProperty, height, null, false));
		}, [
			data,
			xScale,
			yScale
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("g", {
			tabIndex: "0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("desc", { children: `The linear line representative of the following periods, dates, and obligations: ${description}` }), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("path", {
				className: "path",
				d,
				stroke: "url(#pathLinearGradient)"
			})]
		});
	};
	Path.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/paths/AreaPath.jsx
/**
* AreaPath.jsx
* Created by Jonathan Hill 04/12/21
*/
var import_jsx_runtime$25, propTypes$23, AreaPath;
var init_AreaPath = __esmMin((() => {
	init_TotalObligationsOverTimeVisualizationHelper();
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$23 = {
		classname: PropTypes.string,
		description: PropTypes.string,
		data: PropTypes.array,
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		xProperty: PropTypes.string,
		yProperty: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
		padding: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			top: PropTypes.number
		}),
		scenario: PropTypes.string
	};
	AreaPath = ({ classname = "", description, data = [], xScale = () => {}, yScale = () => {}, xProperty = "endDate", yProperty = "obligated", height = 0, padding = {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	}, scenario }) => {
		const [d, setD] = useState("");
		useEffect(() => {
			if (xScale && yScale) setD(pathDefinition(data, xScale, xProperty, padding, yScale, yProperty, height, scenario === "exceedsMin" || scenario === "exceedsMaxAndMin" ? 0 : null, true));
		}, [
			data,
			xScale,
			yScale,
			scenario
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("g", {
			tabIndex: "0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("desc", { children: `The area under the curve representative of the following periods, dates, and obligations: ${description}` }), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("path", {
				className: `area-path ${classname}`,
				d,
				fill: "url(#areaPathLinearGradient)"
			})]
		});
	};
	AreaPath.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/paths/Paths.jsx
var import_jsx_runtime$24, propTypes$22, Paths;
var init_Paths = __esmMin((() => {
	init_Path();
	init_AreaPath();
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$22 = {
		data: PropTypes.array,
		description: PropTypes.string,
		xScale: PropTypes.func,
		xScaleForPath: PropTypes.func,
		yScale: PropTypes.func,
		yScaleForPath: PropTypes.func,
		xProperty: PropTypes.string,
		yProperty: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
		padding: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			top: PropTypes.number
		}),
		scenario: PropTypes.string
	};
	Paths = ({ data = [], description, xScale = () => {}, xScaleForPath = () => {}, yScale = () => {}, yScaleForPath = () => {}, height, width, padding, scenario }) => /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("g", {
		className: "paths",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AreaPath, {
			data,
			description,
			xScale,
			yScale,
			height,
			width,
			padding,
			scenario
		}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Path, {
			data: data.sort((a, b) => a.endDate - b.endDate),
			description,
			xScale: xScaleForPath,
			yScale: yScaleForPath,
			height,
			padding
		})]
	});
	Paths.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/axis/AxisLabel.jsx
var import_jsx_runtime$23, propTypes$21, AxisLabel;
var init_AxisLabel = __esmMin((() => {
	import_jsx_runtime$23 = require_jsx_runtime();
	propTypes$21 = {
		axis: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		label: PropTypes.string,
		index: PropTypes.number
	};
	AxisLabel = ({ axis = "x", x = 0, y = 0, label = "" }) => /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("text", {
		className: `${axis}-axis-label`,
		tabIndex: "0",
		x,
		y,
		children: label
	});
	AxisLabel.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/axis/XAxis.jsx
var import_jsx_runtime$22, propTypes$20, XAxis;
var init_XAxis = __esmMin((() => {
	init_AxisLabel();
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$20 = {
		className: PropTypes.string,
		ticks: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			x: PropTypes.number,
			y: PropTypes.number
		})),
		x1: PropTypes.number,
		x2: PropTypes.number,
		y1: PropTypes.number,
		y2: PropTypes.number
	};
	XAxis = ({ className, ticks, x1, x2, y1, y2 }) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("g", {
		tabIndex: "0",
		className: `x-axis${className ? ` ${className}` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("title", { children: "The X-Axis" }),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("description", { children: "The X-Axis consisting of a horizontal line and labels" }),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("line", {
				tabIndex: "0",
				x1,
				x2,
				y1,
				y2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("g", {
				tabIndex: "0",
				className: "x-axis-labels",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("title", { children: "The X-Axis Labels" }), ticks.map((tick, i) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AxisLabel, {
					x: tick.x,
					y: tick.y,
					label: tick.label
				}, `Tick-${i}-${tick.label}`))]
			})
		]
	});
	XAxis.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/axis/YAxis.jsx
var import_jsx_runtime$21, propTypes$19, YAxis;
var init_YAxis = __esmMin((() => {
	init_AxisLabel();
	import_jsx_runtime$21 = require_jsx_runtime();
	propTypes$19 = {
		className: PropTypes.string,
		ticks: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			x: PropTypes.number,
			y: PropTypes.number
		})),
		x1: PropTypes.number,
		x2: PropTypes.number,
		y1: PropTypes.number,
		y2: PropTypes.number
	};
	YAxis = ({ className, ticks, x1, x2, y1, y2 }) => /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("g", {
		tabIndex: "0",
		className: `y-axis${className ? ` ${className}` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("title", { children: "The Y-Axis" }),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("description", { children: "The Y-Axis consisting of a vertical line and labels" }),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("line", {
				tabIndex: "0",
				x1,
				x2,
				y1,
				y2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("g", {
				className: "y-axis-labels",
				children: ticks.map((tick, i) => /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(AxisLabel, {
					axis: "y",
					x: tick.x,
					y: tick.y,
					label: tick.label
				}, `Tick-${i}-${tick.label}`))
			})
		]
	});
	YAxis.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/axis/Axis.jsx
var import_jsx_runtime$20, propTypes$18, Axis;
var init_Axis = __esmMin((() => {
	init_XAxis();
	init_YAxis();
	import_jsx_runtime$20 = require_jsx_runtime();
	propTypes$18 = {
		padding: PropTypes.shape({
			right: PropTypes.number,
			left: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		}),
		width: PropTypes.number,
		height: PropTypes.number,
		xTicks: PropTypes.array,
		yTicks: PropTypes.array
	};
	Axis = ({ padding = {
		right: 0,
		left: 0,
		top: 0,
		bottom: 0
	}, width = 0, height = 0, xTicks = [], yTicks = [] }) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("g", {
		className: "total-obligations-over-time-svg-axis",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(XAxis, {
			x1: padding.left,
			x2: width - padding.right,
			y1: height - padding.bottom,
			y2: height - padding.bottom,
			ticks: xTicks
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(YAxis, {
			x1: padding.left,
			x2: padding.left,
			y1: padding.top / 2,
			y2: height - padding.bottom,
			ticks: yTicks
		})]
	});
	Axis.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/TodayLineAndtext.jsx
/**
* TodayLineAndtext.jsx
* Created by Jonathan Hill 05/26/21
*/
var import_jsx_runtime$19, propTypes$17, TodayLineAndtext;
var init_TodayLineAndtext = __esmMin((() => {
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$17 = {
		xScale: PropTypes.func,
		height: PropTypes.number,
		todaysDate: PropTypes.number,
		padding: PropTypes.object,
		showTodayLineAndText: PropTypes.bool
	};
	TodayLineAndtext = ({ xScale, height, todaysDate, padding, showTodayLineAndText }) => {
		const [lineXValue, setLineXValue] = useState(0);
		useEffect(() => {
			if (xScale && showTodayLineAndText) setLineXValue(xScale(todaysDate) + padding.left);
		}, [
			xScale,
			showTodayLineAndText,
			todaysDate,
			padding.left
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("desc", { children: "A line representing todays date" }),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("line", {
				tabIndex: "0",
				className: "today-line",
				x1: lineXValue,
				x2: lineXValue,
				y1: 0,
				y2: height - padding.bottom
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("text", {
				tabIndex: "0",
				className: "today-text",
				x: lineXValue - 35,
				y: 10,
				children: "Today"
			})
		] });
	};
	TodayLineAndtext.propTypes = propTypes$17;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/AgencyBudgetLine.jsx
var import_jsx_runtime$18, propTypes$16, AgencyBudgetLine;
var init_AgencyBudgetLine = __esmMin((() => {
	import_jsx_runtime$18 = require_jsx_runtime();
	propTypes$16 = {
		data: PropTypes.array,
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		height: PropTypes.number,
		width: PropTypes.number,
		agencyBudget: PropTypes.number,
		todaysDate: PropTypes.number,
		padding: PropTypes.object,
		scenario: PropTypes.string,
		showTodayLineAndText: PropTypes.bool,
		toggleTooltipVisibility: PropTypes.func
	};
	AgencyBudgetLine = ({ data, xScale, yScale, height, agencyBudget, todaysDate, padding, width, scenario, showTodayLineAndText, toggleTooltipVisibility }) => {
		const [hoveredRectangle, setHoveredRectangle] = useState(false);
		const [lineData, setLineData] = useState({
			x1: 0,
			x2: 0,
			y1: 0
		});
		const [rectangleData, setRectangleData] = useState({
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			balance: 0,
			percentOfTotal: 0
		});
		useEffect(() => {
			if (xScale && yScale && agencyBudget) {
				const y = height - yScale(agencyBudget) - padding.bottom;
				setLineData({
					x1: padding.left,
					x2: showTodayLineAndText ? xScale(todaysDate) + padding.left : width - padding.left,
					y1: isNaN(y) ? 0 : y
				});
			}
		}, [
			xScale,
			yScale,
			showTodayLineAndText
		]);
		useEffect(() => {
			if (xScale && yScale && data.length) setRectangleData({
				x: padding.left,
				y: height - yScale(agencyBudget) - padding.bottom,
				width: showTodayLineAndText ? xScale(todaysDate) : width - padding.left - padding.right,
				height: height - yScale(Math.max(...data.map((x) => x.obligated))) - padding.bottom - padding.top
			});
		}, [
			xScale,
			yScale,
			showTodayLineAndText
		]);
		const rectangle = /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("rect", {
			className: `${hoveredRectangle ? "total-budget-difference-hover" : "total-budget-difference"}`,
			x: rectangleData.x,
			y: rectangleData.y,
			width: rectangleData.width,
			height: rectangleData.height,
			tabIndex: "0"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("g", {
			onMouseEnter: () => {
				setHoveredRectangle(true);
				toggleTooltipVisibility(true);
			},
			onMouseLeave: () => {
				setHoveredRectangle(false);
				toggleTooltipVisibility(false);
			},
			onFocus: () => {
				setHoveredRectangle(true);
				toggleTooltipVisibility(true);
			},
			onBlur: () => {
				setHoveredRectangle(false);
				toggleTooltipVisibility(false);
			},
			className: "bar-chart__item",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("line", {
				tabIndex: "0",
				className: "total-budget-line",
				x1: lineData.x1,
				x2: lineData.x2,
				y1: lineData.y1,
				y2: lineData.y1
			}), !(scenario === "exceedsMax" || scenario === "exceedsMaxAndMin") && rectangle]
		});
	};
	AgencyBudgetLine.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/ZeroLineAndTick.jsx
var import_jsx_runtime$17, propTypes$15, ZeroLineAndTick;
var init_ZeroLineAndTick = __esmMin((() => {
	import_jsx_runtime$17 = require_jsx_runtime();
	propTypes$15 = {
		yScale: PropTypes.func,
		xScale: PropTypes.func,
		height: PropTypes.number,
		padding: PropTypes.object,
		width: PropTypes.number,
		showTodayLineAndText: PropTypes.bool,
		todaysDate: PropTypes.number
	};
	ZeroLineAndTick = ({ yScale, xScale, height, padding, width, showTodayLineAndText, todaysDate }) => {
		const [lineData, setLineData] = useState({
			x1: 0,
			x2: 0,
			y: 0
		});
		const [textData, setTextData] = useState({
			x: 0,
			y: 0
		});
		useEffect(() => {
			if (xScale && yScale) {
				const y = height - yScale(0) - padding.bottom;
				const x2 = showTodayLineAndText ? padding.left + xScale(todaysDate) : width - padding.right;
				setLineData({
					x1: padding.left,
					x2,
					y
				});
				/**
				* text position
				/* x removes 12 due to the width of the text and removes 3 for spacing
				/* y adds 4 for height of the text
				*/
				setTextData({
					x: padding.left - 12 - 3,
					y: y + 4
				});
			}
		}, [
			xScale,
			yScale,
			height,
			padding,
			width,
			showTodayLineAndText
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("text", {
			tabIndex: "0",
			className: "zero-tick",
			x: textData.x,
			y: textData.y,
			children: "$0"
		}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
			tabIndex: "0",
			className: "zero-line",
			x1: lineData.x1,
			x2: lineData.x2,
			y1: lineData.y,
			y2: lineData.y
		})] });
	};
	ZeroLineAndTick.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/paths/PathAndAreaPathLinearGradients.jsx
var import_jsx_runtime$16, propTypes$14, PathAndAreaPathLinearGradients;
var init_PathAndAreaPathLinearGradients = __esmMin((() => {
	init_TotalObligationsOverTimeVisualizationHelper();
	init_totalObligationsOverTime();
	import_jsx_runtime$16 = require_jsx_runtime();
	propTypes$14 = {
		agencyBudget: PropTypes.number.isRequired,
		data: PropTypes.array.isRequired,
		width: PropTypes.number
	};
	PathAndAreaPathLinearGradients = ({ agencyBudget, data, width }) => {
		const [gradientStops, setGradientStops] = useState(normalStoppingPoints);
		useEffect(() => setGradientStops(stoppingPoints(agencyBudget, data)), [
			agencyBudget,
			data,
			width
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("linearGradient", {
			id: "pathLinearGradient",
			x1: "0%",
			y1: "0%",
			x2: "0%",
			y2: "100%",
			children: gradientStops.map((stop, i) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("stop", {
				offset: stop.offset,
				stopColor: stop.stopColor === "blue" ? pathStopColorBlue : pathStopColorRed,
				stopOpacity: "1"
			}, `${stop.offset}-${i}`))
		}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("linearGradient", {
			id: "areaPathLinearGradient",
			x1: "0%",
			y1: "0%",
			x2: "0%",
			y2: "100%",
			children: gradientStops.map((stop, i) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("stop", {
				offset: stop.offset,
				stopColor: stop.stopColor === "blue" ? areaPathStopColorBlue : areaPathStopColorRed,
				stopOpacity: "1"
			}, `${stop.offset}-${i}`))
		})] });
	};
	PathAndAreaPathLinearGradients.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/agency/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization.jsx
/**
* TotalObligationsOverTimeVisualization.jsx
* Created by Jonathan Hill 04/08/21
*/
var import_jsx_runtime$15, propTypes$13, TotalObligationsOverTimeVisualization;
var init_TotalObligationsOverTimeVisualization = __esmMin((() => {
	init_src();
	init_esm();
	init_index_es();
	init_moneyFormatter();
	init_TotalObligationsOverTimeVisualizationHelper();
	init_totalObligationsOverTime();
	init_Paths();
	init_Axis();
	init_TodayLineAndtext();
	init_AgencyBudgetLine();
	init_ZeroLineAndTick();
	init_PathAndAreaPathLinearGradients();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$13 = {
		height: PropTypes.number,
		width: PropTypes.number,
		padding: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			top: PropTypes.number
		}),
		agencyBudget: PropTypes.number,
		data: PropTypes.arrayOf(PropTypes.shape({
			period: PropTypes.number,
			obligated: PropTypes.number
		})),
		fy: PropTypes.string,
		todaysDate: PropTypes.number
	};
	TotalObligationsOverTimeVisualization = ({ height = 208, width = 0, padding = defaultPadding, agencyBudget, data = [], fy = getYear(new Date(Date.now())), todaysDate = Date.now() }) => {
		const [xDomain, setXDomain] = useState([]);
		const [yDomain, setYDomain] = useState([]);
		const [xScale, setXScale] = useState(null);
		const [xScaleForPath, setXScaleForPath] = useState(null);
		const [yScale, setYScale] = useState(null);
		const [yScaleForPath, setYScaleForPath] = useState(null);
		const [xTicks, setXTicks] = useState([]);
		const [dataWithFirstAndLastCoordinate, setDataWithFirstAndLastCoordinate] = useState([]);
		const [description, setDescription] = useState("");
		const [scenario, setScenario] = useState("normal");
		const [showTodayLineAndText, setShowTodayLineAndText] = useState(false);
		const [tooltipIsVisible, setTooltipIsVisible] = useState(false);
		useEffect(() => {
			const start = new Date(parseInt(fy, 10) - 1, 9, 1);
			const end = new Date(`${fy}`, 8, 30);
			setXDomain([getMilliseconds(start), getMilliseconds(end)]);
		}, [fy]);
		useEffect(() => {
			if (xDomain.length && data.length) {
				const dataWithFirstCoordinate = [{
					endDate: xDomain[0],
					obligated: 0
				}, ...data];
				if (todaysDate >= xDomain[0] && todaysDate <= xDomain[1]) {
					if (todaysDate > dataWithFirstCoordinate[dataWithFirstCoordinate.length - 1].endDate) dataWithFirstCoordinate.push({
						endDate: todaysDate,
						obligated: dataWithFirstCoordinate[dataWithFirstCoordinate.length - 1].obligated
					});
				}
				setDataWithFirstAndLastCoordinate(dataWithFirstCoordinate);
			}
		}, [xDomain, data]);
		useEffect(() => setYDomain(getYDomain(dataWithFirstAndLastCoordinate, agencyBudget)), [dataWithFirstAndLastCoordinate, agencyBudget]);
		/**
		* set x scale
		* - The range max value removes padding left and right since that is padding for the
		* x-axis labels overflowing outside of the graph based on the mock
		* and not going to be part of the graphable width.
		*/
		useEffect(() => {
			setXScale(() => linear().domain(xDomain).range([0, width - padding.left - padding.right]));
			setXScaleForPath(() => linear().domain(xDomain).range([0, width - padding.left - padding.right]));
		}, [xDomain, width]);
		/**
		* set y scale
		* - The range max value removes padding top and bottom since that is padding for the top based on the mock and
		* bottom x-axis labels and not going to be part of the graphable width.
		*/
		useEffect(() => {
			setYScale(() => linear().domain(yDomain).range([0, height - padding.top - padding.bottom]));
			setYScaleForPath(() => linear().domain(yDomain).range([1, height - padding.top - padding.bottom - 1]));
		}, [yDomain, data]);
		useEffect(() => {
			if (xScale) setXTicks([{
				x: isNaN(xScale(xDomain[0])) ? 0 : xScale(xDomain[0]) + padding.left,
				y: height - padding.bottom + 22,
				label: `Oct FY${fy.substring(2)}`
			}, {
				x: isNaN(xScale(xDomain[1])) ? 0 : xScale(xDomain[1]) + padding.left,
				y: height - padding.bottom + 22,
				label: `Sep FY${fy.substring(2)}`
			}]);
		}, [xScale, xDomain]);
		useEffect(() => {
			setDescription(dataWithFirstAndLastCoordinate.reduce((acc, val, i, array) => {
				let newDescription = acc;
				newDescription += `Period ${val?.period || "unknown"} with end date ${format(val.endDate, "MM/dd/yyyy")} and obligation $${formatNumber(val.obligated)}${i + 1 !== array.length ? "," : ""}`;
				return newDescription;
			}, ""));
		}, [dataWithFirstAndLastCoordinate]);
		useEffect(() => setScenario(determineScenario(agencyBudget, dataWithFirstAndLastCoordinate)), [agencyBudget, dataWithFirstAndLastCoordinate]);
		useEffect(() => {
			if (todaysDate >= xDomain[0] && todaysDate <= xDomain[1]) setShowTodayLineAndText(true);
			else setShowTodayLineAndText(false);
		}, [xDomain, todaysDate]);
		const toggleTooltipVisibility = (isVisible) => {
			setTooltipIsVisible(isVisible);
		};
		const balance = agencyBudget - data[data.length - 1].obligated;
		const percentOfTotal = calculatePercentage(agencyBudget - data[data.length - 1].obligated, agencyBudget);
		const tooltip = /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			className: "budgetary-resources-tooltip",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
				className: "tooltip__title",
				children: "Available Budgetary Resources"
			}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "tooltip__text",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "budgetary-resources-tooltip__desc",
						children: "Unobligated Balance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "budgetary-resources-tooltip__amount",
						children: formatMoney(balance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "budgetary-resources-tooltip__desc_percent",
						children: "Percent of Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "budgetary-resources-tooltip__amount_percent",
						children: percentOfTotal
					})
				]
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "tooltip-wrapper-overflow",
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ds, {
				controlledProps: {
					isControlled: true,
					isVisible: tooltipIsVisible,
					showTooltip: () => {},
					closeTooltip: () => {}
				},
				className: "budgetary-resources__tooltip-wrapper",
				offsetAdjustments: { top: -5 },
				tooltipComponent: tooltip,
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("svg", {
					className: "total-obligations-over-time-svg",
					height,
					width,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PathAndAreaPathLinearGradients, {
						agencyBudget,
						data: dataWithFirstAndLastCoordinate,
						padding,
						width
					}) }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("g", {
						className: "total-obligations-over-time-svg-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Paths, {
								data: dataWithFirstAndLastCoordinate,
								description,
								xScale,
								xScaleForPath,
								yScale,
								yScaleForPath,
								height,
								width,
								padding,
								agencyBudget,
								scenario
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Axis, {
								padding,
								width,
								height,
								xTicks
							}),
							showTodayLineAndText && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(TodayLineAndtext, {
								xScale,
								height,
								todaysDate,
								padding,
								showTodayLineAndText
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(AgencyBudgetLine, {
								data: dataWithFirstAndLastCoordinate,
								xScale,
								yScale,
								agencyBudget,
								height,
								width,
								todaysDate,
								padding,
								scenario,
								showTodayLineAndText,
								toggleTooltipVisibility
							}),
							(scenario === "exceedsMin" || scenario === "exceedsMaxAndMin") && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ZeroLineAndTick, {
								xScale,
								yScale,
								height,
								padding,
								width,
								showTodayLineAndText,
								todaysDate
							})
						]
					})]
				})
			})
		});
	};
	TotalObligationsOverTimeVisualization.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/containers/agency/visualizations/TotalObligationsOverTimeContainer.jsx
/**
* TotalObligationsOverTimeContainer.jsx
* Created by Jonathan Hill 04/08/21
*/
var import_jsx_runtime$14, propTypes$12, TotalObligationsOverTimeContainer;
var init_TotalObligationsOverTimeContainer = __esmMin((() => {
	init_es();
	init_index_es();
	init_TotalObligationsOverTimeVisualization();
	init_TotalObligationsOverTimeVisualizationHelper();
	init_useQueryParams();
	import_jsx_runtime$14 = require_jsx_runtime();
	propTypes$12 = {
		agencyBudget: PropTypes.number,
		obligationsByPeriod: PropTypes.array,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool
	};
	TotalObligationsOverTimeContainer = ({ agencyBudget, obligationsByPeriod, isLoading, isError }) => {
		const { fy } = useQueryParams(["fy"]);
		const [loading, setLoading] = useState(true);
		const [data, setData] = useState([]);
		const containerReference = useRef(null);
		const submissionPeriods = useSelector((state) => state.account.submissionPeriods);
		const [windowWidth, setWindowWidth] = useState(0);
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		useEffect(() => {
			setLoading(true);
			const javaScriptSubmissionPeriods = submissionPeriods.toJS();
			if (!isLoading && !isError) {
				if (javaScriptSubmissionPeriods.length && obligationsByPeriod.length) setData(addSubmissionEndDatesToBudgetaryResources(obligationsByPeriod, javaScriptSubmissionPeriods, fy).sort((a, b) => a.period - b.period));
				else setData([]);
				setLoading(false);
			}
		}, [
			submissionPeriods,
			obligationsByPeriod,
			isLoading,
			isError,
			fy
		]);
		useEffect(() => {
			if (isError) setLoading(false);
		}, [isError]);
		const handleWindowResize = throttle(() => {
			const wWidth = window.innerWidth;
			if (windowWidth !== wWidth) {
				setWindowWidth(wWidth);
				setVisualizationWidth(containerReference.current.offsetWidth);
			}
		}, 50);
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}, [handleWindowResize]);
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			ref: containerReference,
			className: "total-obligations-over-time-visualization-container",
			children: [
				isError && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(fo, {}),
				!isError && loading && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Wo, {}),
				!isError && !loading && !data.length && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(lo, {
					title: "Chart Not Available",
					description: "No available data to display.",
					className: "usda-message"
				}),
				!isError && !loading && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(TotalObligationsOverTimeVisualization, {
					width: visualizationWidth,
					agencyBudget,
					data,
					fy
				})
			]
		});
	};
	TotalObligationsOverTimeContainer.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/helpers/agency/visualizations/ObligationsByAwardTypeHelper.js
var mapToFullCategoryName, getCategoryNameByAwardType, getActiveCategoryType, getOuterCategoryId;
var init_ObligationsByAwardTypeHelper = __esmMin((() => {
	mapToFullCategoryName = (categoryType) => `All ${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1)}`;
	getCategoryNameByAwardType = (awardType, categoryMapping) => {
		const categoryNames = Object.keys(categoryMapping);
		return categoryMapping[categoryNames[0]].includes(awardType) ? categoryNames[0] : categoryNames[1];
	};
	getActiveCategoryType = (activeType, categoryMapping) => {
		if (activeType?.length > 0) {
			const categoryNames = Object.keys(categoryMapping);
			return (categoryMapping[categoryNames[0]].includes(activeType) ? categoryNames[0] : categoryNames[1]).replace(/(^All\s)/, "").toLowerCase();
		}
		return "";
	};
	getOuterCategoryId = (categoryName, outer) => {
		for (let i = 0; i < outer.length; i++) if (outer[i].label.includes(categoryName)) return i;
		return "";
	};
}));
//#endregion
//#region src/js/components/agency/visualizations/ObligationsByAwardTypeTooltip.jsx
var import_jsx_runtime$13, propTypes$11, columns, ObligationsByAwardTypeTooltip;
var init_ObligationsByAwardTypeTooltip = __esmMin((() => {
	init_es();
	init_index_es();
	init_moneyFormatter();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$11 = {
		awardTypes: PropTypes.array,
		fiscalYear: PropTypes.number,
		activeType: PropTypes.string,
		categoryType: PropTypes.string,
		isCategoryHover: PropTypes.bool
	};
	columns = [
		{
			title: "type",
			displayName: "Award Types"
		},
		{
			title: "obligations",
			displayName: [
				"Award",
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("br", {}),
				"Obligations"
			],
			right: true
		},
		{
			title: "percent",
			displayName: [
				"% of",
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("br", {}),
				"Total"
			],
			right: true
		}
	];
	ObligationsByAwardTypeTooltip = ({ awardTypes, fiscalYear, activeType, categoryType, isCategoryHover, labelTooltip }) => {
		const { _awardObligations } = useSelector((state) => state.agency);
		const awardTypesByCategory = awardTypes.filter((item) => item.type === categoryType);
		const totalByCategory = awardTypesByCategory.reduce((acc, item) => acc + item.value, 0);
		const titles = {
			contracts: "Total Contract Obligations",
			financial: "Total Financial Assistance Obligations"
		};
		const rows = awardTypesByCategory.map((type) => {
			let activeClass = `award-type-tooltip__table-data${!isCategoryHover && type.label === activeType ? " award-type-tooltip__table-data_active" : ""}`;
			if (labelTooltip) activeClass = "";
			return [
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: activeClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("svg", {
						height: "12",
						width: "18",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("circle", {
							cx: "6",
							cy: "6",
							r: "6",
							fill: type.color
						})
					}), type.label]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
					className: activeClass,
					children: formatMoney(type.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
					className: activeClass,
					children: type.value >= 0 ? calculatePercentage(type.value, _awardObligations, "--", 1) : "--"
				})
			];
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "award-type-tooltip",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "tooltip__title",
				children: [
					"FY",
					fiscalYear,
					" - ",
					titles[categoryType],
					": ",
					formatMoneyWithUnitsShortLabel(totalByCategory)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
				className: "tooltip__text",
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ss, {
					classNames: "award-type-tooltip__table",
					columns,
					rows
				})
			})]
		});
	};
	ObligationsByAwardTypeTooltip.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/hooks/useWindowWidth.jsx
var useWindowWidth;
var init_useWindowWidth = __esmMin((() => {
	useWindowWidth = (throttleWait = 50) => {
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);
		useEffect(() => {
			let isMounted = true;
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth && isMounted) setWindowWidth(newWidth);
			}, throttleWait);
			window.addEventListener("resize", handleResize);
			return () => {
				isMounted = false;
				window.removeEventListener("resize", handleResize);
			};
		}, [throttleWait, windowWidth]);
		return windowWidth;
	};
}));
//#endregion
//#region src/js/components/agency/visualizations/ObligationsByAwardType.jsx
/**
* ObligationsByAwardType.jsx
* Created by Brett Varney 4/08/21
*/
function ObligationsByAwardType({ outer, inner, fiscalYear, isMobile }) {
	const [chartHeight, setChartHeight] = useState(0);
	const [chartWidth, setChartWidth] = useState(0);
	const [activeType, setActiveType] = useState(null);
	const [categoryHover, setCategoryHover] = useState(null);
	const [labelTooltip, setLabelTooltip] = useState(false);
	const chartRef = useRef();
	const windowWidth = useWindowWidth();
	const renderChart = () => {
		const labelRadius = Math.min(chartHeight, chartWidth) / 2;
		const outerRadius = labelRadius * .7;
		const outerStrokeWidth = 3;
		const innerRadius = outerRadius - outerStrokeWidth * 2;
		select_default("#obl_chart").selectAll("*").remove();
		const svg = select_default("#obl_chart").append("svg").attr("height", chartHeight).attr("width", chartWidth).append("g").attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2 - 30})`);
		const pie = pie_default().value((d) => d.value).sortValues(null)(inner);
		const rotation = 357 - pie[0].endAngle / Math.PI * 90;
		const chart = svg.append("g").attr("transform", `rotate (${rotation})`).attr("class", "obligations-by-award-type__donut").attr("role", "list");
		chart.selectAll().data(pie).enter().append("path").attr("d", arc_default().outerRadius(outerRadius + 75).innerRadius(outerRadius + 1)).attr("fill", "white").style("cursor", "default").on("mouseenter", null).on("mouseenter", () => {
			setActiveType(null);
		}).on("mouseleave", () => {
			setActiveType(null);
		});
		chart.selectAll().data(pie).enter().append("path").attr("d", arc_default().outerRadius(outerRadius).innerRadius(outerRadius - outerStrokeWidth)).attr("fill", (d, i) => {
			const activeCategory = getCategoryNameByAwardType(activeType, categoryMapping);
			const currentCategory = getCategoryNameByAwardType(inner[i].label, categoryMapping);
			const currentCategoryId = getOuterCategoryId(currentCategory, outer);
			if (activeType && !isMobile && activeCategory !== currentCategory) return outer[currentCategoryId].fadedColor;
			return outer[currentCategoryId].color;
		}).style("cursor", "pointer").on("mouseenter", (event, d) => {
			setActiveType(d.data.label);
			setCategoryHover(mapToFullCategoryName(d.data.type));
		}).on("mouseleave", () => {
			setActiveType(null);
			setCategoryHover(null);
		}).attr("aria-label", (d) => `${d.data.label}: ${format$1("($,.2f")(d.value)}`).attr("role", "listitem");
		chart.selectAll().data(pie).enter().append("path").attr("d", arc_default().outerRadius(outerRadius - outerStrokeWidth).innerRadius(innerRadius)).attr("fill", "white").style("cursor", "pointer").on("mouseenter", (event, d) => {
			setActiveType(d.data.label);
		}).on("mouseleave", () => {
			setActiveType(null);
		}).attr("role", "listitem");
		chart.selectAll().data(pie).enter().append("path").attr("d", arc_default().outerRadius(innerRadius).innerRadius(innerRadius / 2)).attr("fill", (d, i) => {
			if (categoryHover && categoryHover === mapToFullCategoryName(d.data.type) && !isMobile) return inner[i].color;
			return activeType && activeType !== inner[i].label && !isMobile ? inner[i].fadedColor : inner[i].color;
		}).style("cursor", "pointer").on("mouseover", (event, d) => {
			setActiveType(d.data.label);
		}).on("mouseout", () => setActiveType(null)).on("focus", (event, d) => {
			setActiveType(d.data.label);
		}).on("blur", () => setActiveType(null)).attr("aria-label", (d) => `${d.data.label}: ${format$1("($,.2f")(d.value)}`).attr("role", "listitem").attr("tabIndex", 0);
		const labelPos = (i) => {
			if (i === 0) return [labelRadius - 188, chartHeight / 2 + 28];
			return [labelRadius - 188, chartHeight / 2 + 4];
		};
		const outerLabels = outer.map((d) => d.label.join(""));
		if (outer[0].value > 0) {
			svg.append("circle").attr("cx", labelRadius - 200).attr("cy", chartHeight / 2 + 24).attr("r", 4).style("fill", outer[0].color).style("cursor", "pointer").on("mouseover", () => {
				setActiveType("Direct Payments");
				setLabelTooltip(true);
			}).on("mouseout", () => {
				setActiveType(null);
				setLabelTooltip(false);
			}).on("focus", () => {
				setActiveType("Direct Payments");
				setLabelTooltip(true);
			}).on("blur", () => {
				setActiveType(null);
				setLabelTooltip(false);
			});
			svg.append("text").attr("transform", (d, i) => `translate(${labelPos(0, i * 12)})`).attr("class", "obligations-by-award-type__label").text(outerLabels[0]).style("cursor", "pointer").on("mouseover", () => {
				setActiveType("Direct Payments");
				setLabelTooltip(true);
			}).on("mouseout", () => {
				setActiveType(null);
				setLabelTooltip(false);
			}).on("focus", () => {
				setActiveType("Direct Payments");
				setLabelTooltip(true);
			}).on("blur", () => {
				setActiveType(null);
				setLabelTooltip(false);
			});
		}
		if (outer[1].value > 0) {
			svg.append("circle").attr("cx", labelRadius - 200).attr("cy", chartHeight / 2).attr("r", 4).style("fill", outer[1].color).style("cursor", "pointer").on("mouseover", () => {
				setActiveType("Contracts");
				setLabelTooltip(true);
			}).on("mouseout", () => {
				setActiveType(null);
				setLabelTooltip(false);
			}).on("focus", () => {
				setActiveType("Contracts");
				setLabelTooltip(true);
			}).on("blur", () => {
				setActiveType(null);
				setLabelTooltip(false);
			});
			svg.append("text").attr("transform", (d, i) => `translate(${labelPos(1, i * 12)})`).attr("class", "obligations-by-award-type__label").text(outerLabels[1]).style("cursor", "pointer").on("mouseover", () => {
				setActiveType("Contracts");
				setLabelTooltip(true);
			}).on("mouseout", () => {
				setActiveType(null);
				setLabelTooltip(false);
			}).on("focus", () => {
				setActiveType("Contracts");
				setLabelTooltip(true);
			}).on("blur", () => {
				setActiveType(null);
				setLabelTooltip(false);
			});
		}
	};
	useEffect(() => {
		if (chartWidth && chartHeight) renderChart();
	}, [chartWidth, chartHeight]);
	useEffect(() => {
		const rect = chartRef.current.parentElement.getBoundingClientRect();
		if (rect.height !== chartHeight || rect.width !== chartWidth) {
			setChartHeight(rect.height);
			setChartWidth(rect.width);
		}
	}, [windowWidth]);
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ds, {
		className: "obligations-by-award-type",
		tooltipPosition: "bottom",
		tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ObligationsByAwardTypeTooltip, {
			awardTypes: inner,
			fiscalYear,
			activeType,
			categoryType: getActiveCategoryType(activeType, categoryMapping),
			isCategoryHover: categoryHover?.length > 0,
			labelTooltip
		}),
		controlledProps: {
			isControlled: true,
			isVisible: activeType && !isMobile,
			showTooltip: () => {},
			closeTooltip: () => {}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			id: "obl_chart",
			className: "obligations-by-award-type__chart",
			ref: chartRef
		})
	});
}
var import_jsx_runtime$12, categoryMapping, propTypes$10;
var init_ObligationsByAwardType = __esmMin((() => {
	init_src$1();
	init_index_es();
	init_ObligationsByAwardTypeHelper();
	init_ObligationsByAwardTypeTooltip();
	init_useWindowWidth();
	import_jsx_runtime$12 = require_jsx_runtime();
	categoryMapping = {
		"All Contracts": ["Contracts", "IDVs"],
		"All Financial": [
			"Grants",
			"Loans",
			"Direct Payments",
			"Other Financial Assistance"
		]
	};
	propTypes$10 = {
		outer: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			value: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired
		})).isRequired,
		inner: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired
		})).isRequired,
		fiscalYear: PropTypes.number,
		isMobile: PropTypes.bool
	};
	ObligationsByAwardType.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/containers/agency/visualizations/ObligationsByAwardTypeContainer.jsx
/**
* ObligationsByAwardTypeContainer.jsx
* Created by Brett Varney 4/30/21
*/
function ObligationsByAwardTypeContainer({ fiscalYear, isMobile }) {
	const [categoriesForGraph, setCategoriesForGraph] = React.useState([]);
	const [detailsForGraph, setDetailsForGraph] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);
	const [noData, setNoData] = React.useState(false);
	const obligationsByAwardTypeRequest = React.useRef(null);
	const { toptierCode } = useSelector((state) => state.agency.overview);
	const dispatch = useDispatch();
	useEffect(() => () => {
		if (obligationsByAwardTypeRequest.current) obligationsByAwardTypeRequest.current.cancel();
		dispatch(resetAwardObligations());
	}, [dispatch]);
	const getObligationsByAwardType = () => {
		if (obligationsByAwardTypeRequest.current) obligationsByAwardTypeRequest.current.cancel();
		if (error) setError(false);
		if (noData) setNoData(false);
		if (!loading) setLoading(true);
		obligationsByAwardTypeRequest.current = fetchObligationsByAwardType(toptierCode, fiscalYear);
		obligationsByAwardTypeRequest.current.promise.then((res) => {
			if (Object.keys(res.data).length === 0 || res.data.total_aggregated_amount === 0) {
				setNoData(true);
				setLoading(false);
				obligationsByAwardTypeRequest.current = null;
			} else {
				dispatch(setAwardObligations(res.data.total_aggregated_amount));
				const categories = [{
					label: ["All Financial", " Assistance"],
					value: 0,
					color: "rgb(192, 86, 0)",
					fadedColor: "rgb(192, 86, 0, 25%)"
				}, {
					label: ["All Contracts", ""],
					value: 0,
					color: "rgb(84, 91, 163)",
					fadedColor: "rgb(84, 91, 163, 25%)"
				}];
				const details = [
					{
						label: "Grants",
						color: "rgb(230, 111, 14)",
						fadedColor: "rgb(230, 111, 14, 25%)",
						type: "financial"
					},
					{
						label: "Loans",
						color: "rgb(255, 188, 120)",
						fadedColor: "rgb(255, 188, 120, 25%)",
						type: "financial"
					},
					{
						label: "Direct Payments",
						color: "rgb(250, 148, 65)",
						fadedColor: "rgb(250, 148, 65, 25%)",
						type: "financial"
					},
					{
						label: "Other Financial Assistance",
						color: "rgb(252, 226, 197)",
						fadedColor: "rgb(252, 226, 197, 25%)",
						type: "financial"
					},
					{
						label: "Contracts",
						color: "rgb(127, 132, 186)",
						fadedColor: "rgb(127, 132, 186, 25%)",
						type: "contracts"
					},
					{
						label: "IDVs",
						color: "rgb(169, 173, 209)",
						fadedColor: "rgb(169, 173, 209, 25%)",
						type: "contracts"
					}
				];
				res.data.results.forEach((d) => {
					switch (d.category) {
						case "grants":
							categories[0].value += d.aggregated_amount;
							details[0].value = d.aggregated_amount;
							break;
						case "loans":
							categories[0].value += d.aggregated_amount;
							details[1].value = d.aggregated_amount;
							break;
						case "direct_payments":
							categories[0].value += d.aggregated_amount;
							details[2].value = d.aggregated_amount;
							break;
						case "other":
							categories[0].value += d.aggregated_amount;
							details[3].value = d.aggregated_amount;
							break;
						case "contracts":
							categories[1].value += d.aggregated_amount;
							details[4].value = d.aggregated_amount;
							break;
						case "idvs":
							categories[1].value += d.aggregated_amount;
							details[5].value = d.aggregated_amount;
							break;
						default:
							console.error(`Category name from API not recognized: ${d.category}`);
							setError(true);
					}
				});
				categories[0].label[2] = ` ${calculatePercentage(categories[0].value, categories[0].value + categories[1].value)}`;
				categories[1].label[1] = ` ${calculatePercentage(categories[1].value, categories[0].value + categories[1].value)}`;
				setCategoriesForGraph(categories);
				setDetailsForGraph(details);
				setLoading(false);
				obligationsByAwardTypeRequest.current = null;
			}
		}).catch((e) => {
			if (!isCancel(e)) {
				console.error(e);
				setError(true);
				setLoading(false);
				obligationsByAwardTypeRequest.current = null;
			}
		});
	};
	useEffect(() => {
		dispatch(resetAwardObligations());
		if (toptierCode) getObligationsByAwardType();
	}, [fiscalYear, toptierCode]);
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
		loading && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Wo, {}),
		error && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(fo, {}),
		noData && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(lo, {
			title: "Chart Not Available",
			description: "No available data to display.",
			className: "usda-message"
		}),
		!loading && !error && !noData && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ObligationsByAwardType, {
			outer: categoriesForGraph,
			inner: detailsForGraph,
			fiscalYear,
			isMobile
		})
	] });
}
var import_jsx_runtime$11, propTypes$9;
var init_ObligationsByAwardTypeContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_ObligationsByAwardType();
	init_index_es();
	init_agency();
	init_agencyActions();
	init_moneyFormatter();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$9 = {
		fiscalYear: PropTypes.number.isRequired,
		isMobile: PropTypes.bool
	};
	ObligationsByAwardTypeContainer.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/agency/overview/VisualizationSection.jsx
var import_jsx_runtime$10, propTypes$8, VisualizationSection;
var init_VisualizationSection = __esmMin((() => {
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$8 = {
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
		subtitle: oneOfType([PropTypes.string, PropTypes.element]),
		data: PropTypes.object || PropTypes.string,
		secondaryData: PropTypes.string,
		label: PropTypes.string
	};
	VisualizationSection = ({ children, subtitle, data, secondaryData, label }) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: "visualization-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualization-section__subtitle",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualization-section__data",
				children: data
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualization-section__secondary-data",
				children: secondaryData
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualization-section__viz-wrapper",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualization-section__label",
				children: label
			})
		]
	});
	VisualizationSection.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/agency/overview/BarChart.jsx
/**
* BarChart.jsx
* Created by Max Kendall 4/13/21
*/
var import_jsx_runtime$9, getLastFourYears, calculateOffsetTop, BarChart;
var init_BarChart = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	import_jsx_runtime$9 = require_jsx_runtime();
	getLastFourYears = ({ year }, selectedFy) => {
		const fy = parseInt(selectedFy, 10);
		if (fy <= 2021 && year <= 2021 || fy > 2021 && year >= parseInt(selectedFy, 10) - 4 && year <= fy) return true;
		return false;
	};
	calculateOffsetTop = (percentOfGreatestBudget) => 187 - 187 * percentOfGreatestBudget * .5 - 15;
	BarChart = ({ isLoading, isError, agencyBudgetByYear, selectedFy }) => {
		const [hoveredFy, setHoveredFy] = useState(false);
		const renderBars = () => {
			const greatestAgencyBudget = agencyBudgetByYear.filter((o) => getLastFourYears(o, selectedFy)).reduce((acc, obj) => obj.budget > acc ? obj.budget : acc, 0);
			return agencyBudgetByYear.filter((o) => getLastFourYears(o, selectedFy)).sort((a, b) => a.year - b.year).map(({ year: fy, budget }) => {
				const fyStr = String(fy);
				const tooltip = /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "bar-chart-tooltip",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "tooltip__title",
						children: ["FY ", fy]
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "tooltip__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "bar-chart-tooltip__desc",
							children: "Total Budgetary Resources"
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "bar-chart-tooltip__amount",
							children: formatMoney(budget)
						})]
					})]
				});
				return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "bar-chart__item",
					onMouseEnter: () => setHoveredFy(true),
					onMouseLeave: () => setHoveredFy(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ds, {
						className: `bar-chart__tooltip-wrapper${!hoveredFy && fyStr === selectedFy ? " bar-chart__tooltip-wrapper_active" : ""}`,
						tooltipComponent: tooltip,
						offsetAdjustments: {
							top: calculateOffsetTop(budget / greatestAgencyBudget),
							left: 0,
							right: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							role: "img",
							className: `bar-chart__bar${fyStr === selectedFy ? " bar-chart__bar_selected" : ""}`,
							style: {
								height: `${budget / greatestAgencyBudget * 100}%`,
								minHeight: "0.5%"
							},
							"aria-label": `FY ${fyStr[2]}${fyStr[3]} total budgetary resources are ${formatMoney(budget)};
                                    a ${(budget / greatestAgencyBudget).toFixed(2)} to 1 ratio compared to the largest total budgetary resources
                                    in 5 consecutive years (${formatMoney(greatestAgencyBudget)}).`,
							alt: `FY ${fyStr[2]}${fyStr[3]} total budgetary resources are ${formatMoney(budget)};
                                    a ${(budget / greatestAgencyBudget).toFixed(2)} to 1 ratio compared to the largest total budgetary resources
                                    in 5 consecutive years (${formatMoney(greatestAgencyBudget)}).`
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: `bar-chart__label${fyStr === selectedFy ? " bar-chart__label_selected" : ""}`,
						children: `FY ${fyStr[2]}${fyStr[3]}`
					})]
				}, fy);
			});
		};
		if (!isLoading && isError) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(fo, {});
		if (isLoading && !isError) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Wo, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "viz-container bar-chart",
			alt: "Bar chart of total budgetary resources over five consecutive years",
			children: renderBars()
		});
	};
	BarChart.propTypes = {
		selectedFy: PropTypes.string.isRequired,
		agencyBudgetByYear: PropTypes.arrayOf(PropTypes.shape({
			year: PropTypes.string.isRequired,
			budget: PropTypes.number.isRequired
		})),
		isLoading: PropTypes.bool.isRequired,
		isError: PropTypes.bool.isRequired
	};
}));
//#endregion
//#region src/js/components/agency/overview/FySummary.jsx
/**
* FySummary.jsx
* Created by Lizzie Salita 4/7/21
*/
var import_jsx_runtime$8, dayjs$1, propTypes$7, FySummary;
var init_FySummary = __esmMin((() => {
	init_es();
	init_index_es();
	init_agency();
	init_BaseAgencyBudgetaryResources();
	init_agencyActions();
	init_moneyFormatter();
	init_WithLatestFy();
	init_TotalObligationsOverTimeContainer();
	init_ObligationsByAwardTypeContainer();
	init_VisualizationSection();
	init_BarChart();
	import_jsx_runtime$8 = require_jsx_runtime();
	dayjs$1 = require_dayjs_min();
	propTypes$7 = {
		fy: PropTypes.string,
		dataThroughDate: PropTypes.string,
		isMobile: PropTypes.bool
	};
	FySummary = ({ fy, dataThroughDate, isMobile }) => {
		const dispatch = useDispatch();
		const [isLoading, setIsLoading] = useState(true);
		const [isError, setIsError] = useState(true);
		const { budgetaryResources, _awardObligations, overview } = useSelector((state) => state.agency);
		const { toptierCode } = overview;
		const budgetaryResourcesRequest = useRef(null);
		useEffect(() => () => {
			if (budgetaryResourcesRequest.current) budgetaryResourcesRequest.current.cancel();
		}, []);
		let overviewDataThroughDate = useLatestAccountData()[1].toArray().filter((i) => i.submission_fiscal_year == fy)[0]?.period_end_date;
		useEffect(() => {
			if (toptierCode) {
				setIsLoading(true);
				setIsError(false);
				budgetaryResourcesRequest.current = fetchBudgetaryResources(toptierCode);
				budgetaryResourcesRequest.current.promise.then(({ data }) => {
					budgetaryResourcesRequest.current = null;
					const dataByYear = {};
					data.agency_data_by_year.forEach((year) => {
						const fyBudgetaryResources = Object.create(BaseAgencyBudgetaryResources);
						fyBudgetaryResources.populate(year);
						dataByYear[year.fiscal_year] = fyBudgetaryResources;
					});
					dispatch(setBudgetaryResources(dataByYear));
					if (dataByYear[fy].agencyBudget === "--") overviewDataThroughDate = "no data";
					dispatch(setDataThroughDates({ overviewDataThroughDate }));
					setIsLoading(false);
				}).catch((e) => {
					console.error("Error fetching budgetary resources", e);
					budgetaryResourcesRequest.current = null;
					setIsLoading(false);
					setIsError(true);
					throw e;
				});
			}
		}, [toptierCode]);
		const totalBudgetaryResources = budgetaryResources[fy]?.agencyBudget || "--";
		const percentOfFederalBudget = budgetaryResources[fy]?.percentOfFederalBudget || "--";
		const totalObligations = budgetaryResources[fy]?.agencyObligated;
		const percentOfBudgetaryResources = budgetaryResources[fy]?.percentOfAgencyBudget || "--";
		const awardObligations = formatMoneyWithUnits(_awardObligations);
		const percentOfTotalObligations = calculatePercentage(_awardObligations, budgetaryResources[fy]?._agencyObligated);
		let dataThroughNote;
		if (dataThroughDate) if (dataThroughDate === "no data") dataThroughNote = "No data available for the selected fiscal year";
		else dataThroughNote = `Data through ${dayjs$1(dataThroughDate).format("M/D/YYYY")}`;
		const sections = [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VisualizationSection, {
				subtitle: isMobile ? "How much funding is available to this agency?" : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "How much funding is available to this agency?" }),
				data: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
					totalBudgetaryResources,
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"in budgetary resources"
				] }),
				secondaryData: `${percentOfFederalBudget} of the FY ${fy} U.S. federal budget`,
				label: "Total Budgetary Resources Over Time",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(BarChart, {
					isLoading,
					isError,
					selectedFy: fy,
					agencyBudgetByYear: Object.entries(budgetaryResources).map(([key, value]) => ({
						year: key,
						budget: value._agencyBudget
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VisualizationSection, {
				subtitle: isMobile ? "How much has this agency planned to spend?" : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "How much has this agency planned to spend?" }),
				data: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
					totalObligations,
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"in total obligations"
				] }),
				secondaryData: `${percentOfBudgetaryResources} of total budgetary resources`,
				label: "Total Obligations Over Time",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(TotalObligationsOverTimeContainer, {
					isLoading,
					isError,
					agencyBudget: budgetaryResources[fy]?._agencyBudget,
					obligationsByPeriod: budgetaryResources[fy]?.obligationsByPeriod || []
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VisualizationSection, {
				subtitle: isMobile ? "How much has this agency planned to spend on awards?" : /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
					"How much has this agency",
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"planned to spend on awards?"
				] }),
				data: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
					awardObligations,
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					" in award obligations"
				] }),
				secondaryData: `${percentOfTotalObligations} of total obligations`,
				label: "Award Obligations by Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ObligationsByAwardTypeContainer, {
					fiscalYear: +fy,
					isMobile
				})
			})
		];
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "fy-summary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("h4", {
					className: "fy-summary__heading",
					children: [
						"FY ",
						fy,
						" Summary"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("hr", {}),
				dataThroughNote ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "section__date-note",
					children: dataThroughNote
				}) : null,
				isMobile ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Os, { items: sections }) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Qs, {
					hasGutter: true,
					className: "fy-summary__row",
					children: sections.map((viz, i) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)($s, {
						tablet: 6,
						className: "fy-summary__col",
						children: viz
					}, `FY-Summary-${i}`))
				})
			]
		});
	};
	FySummary.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/agency/overview/AgencyOverview.jsx
/**
* AgencyOverview.jsx
* Created by Lizzie Salita 3/16/21
*/
var import_jsx_runtime$7, propTypes$6, AgencyOverview;
var init_AgencyOverview = __esmMin((() => {
	init_es();
	init_development();
	init_index_es();
	init_ReadMore();
	init_slideoutHelper();
	init_IsMobileContext();
	init_FySummary();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$6 = {
		fy: PropTypes.string,
		dataThroughDate: PropTypes.string
	};
	AgencyOverview = memo(function AgencyOverview({ fy, dataThroughDate }) {
		const { isMedium } = useContext(IsMobileContext);
		const { website, mission, congressionalJustification, showAboutData } = useSelector((state) => state.agency.overview);
		const openAboutTheDataSidebar = (e, entry) => {
			showSlideout("atd", { url: entry });
			e.preventDefault();
		};
		const missionBlock = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "agency-overview__data",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h4", { children: "Agency Mission" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", { children: mission || "--" })]
		});
		const aboutBlock = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "agency-overview__data",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h4", { children: "About this Agency's Data" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("p", { children: [
				"There is a 90 day delay in displaying contract award data, subcontract data, and Account Breakdown by Award (File C) data for the Department of Defense (DOD). For more information, visit our\xA0",
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Link, {
					to: "",
					"aria-label": "Open the About the Data",
					onClick: (e) => openAboutTheDataSidebar(e, "delay-in-dod-procurement-data"),
					children: "About the Data"
				}),
				" module. To see a complete list of this agency's submissions, visit our\xA0",
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Link, {
					to: "/submission-statistics/agency/097",
					children: "Submission Statistics page"
				}),
				"."
			] })]
		});
		const websiteBlock = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "agency-overview__data",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h4", { children: "Website" }), website ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				className: "usa-bold-link",
				href: website,
				target: "_blank",
				children: website
			}) : "--"]
		});
		const cjBlock = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "agency-overview__data",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h4", { children: "Congressional Justification of Budget (CJ)" }), congressionalJustification ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("a", {
				className: "usa-bold-link",
				href: congressionalJustification,
				target: "_blank",
				children: congressionalJustification
			}) : "--"]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "body__content agency-overview",
			children: [isMedium ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [showAboutData ? aboutBlock : missionBlock, /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(ReadMore, { children: [
				showAboutData && missionBlock,
				websiteBlock,
				cjBlock
			] })] }) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(import_jsx_runtime$7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Qs, {
				className: "agency-overview__row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)($s, {
					width: 8,
					children: [showAboutData && aboutBlock, missionBlock]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)($s, {
					width: 4,
					children: [websiteBlock, cjBlock]
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FySummary, {
				fy,
				dataThroughDate,
				isMobile: isMedium
			})]
		});
	});
	AgencyOverview.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/containers/agency/awardSpending/SubAgencySummaryContainer.jsx
var import_jsx_runtime$6, dayjs, propTypes$5, SubAgencySummaryContainer;
var init_SubAgencySummaryContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_index_es();
	init_awardType();
	init_agency();
	init_BaseAgencySubagencyCount();
	init_agencyActions();
	import_jsx_runtime$6 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	propTypes$5 = {
		fy: PropTypes.string,
		activeTab: PropTypes.string,
		summaryData: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string,
			title: PropTypes.string
		})),
		data: PropTypes.object
	};
	SubAgencySummaryContainer = ({ activeTab, fy, summaryData, data }) => {
		const numberOfAwardsRequest = useRef(null);
		const summaryRequest = useRef(null);
		const [loading, setLoading] = React.useState(true);
		const [error, setError] = React.useState(false);
		const request = React.useRef(null);
		const [numberOfAwards, setNumberOfAwards] = useState(null);
		const [numberOfTransactions, setNumberOfTransactions] = useState(null);
		const [awardObligations, setAwardObligations] = useState(null);
		const { toptierCode } = useSelector((state) => state.agency.overview);
		useEffect(() => {
			if (request.current) request.current.cancel();
			if (numberOfAwardsRequest.current) numberOfAwardsRequest.current.cancel();
			if (summaryRequest.current) summaryRequest.current.cancel();
		}, []);
		const getNewAwardsCount = async () => {
			if (numberOfAwardsRequest.current) numberOfAwardsRequest.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			if (activeTab !== "all") {
				const params = awardTypeGroups[activeTab];
				numberOfAwardsRequest.current = fetchSubagencyNewAwardsCount(toptierCode, fy, params);
			} else numberOfAwardsRequest.current = fetchSubagencyNewAwardsCount(toptierCode, fy);
			numberOfAwardsRequest.current.promise.then((res) => {
				const newAwards = Object.create(BaseAgencySubagencyCount);
				newAwards.populate(res.data);
				setNumberOfAwards(newAwards.newAwardCount);
				setLoading(false);
				numberOfAwardsRequest.current = null;
			}).catch((e) => {
				if (!isCancel(e)) {
					console.error(e);
					setError(true);
					setLoading(false);
					numberOfAwardsRequest.current = null;
				}
			});
		};
		const dispatch = useDispatch();
		const getSubagencySummary = async () => {
			if (summaryRequest.current) summaryRequest.current.cancel();
			if (error) setError(false);
			if (!loading) setLoading(true);
			if (activeTab !== "all") {
				const params = awardTypeGroups[activeTab];
				summaryRequest.current = fetchSubagencySummary(toptierCode, fy, params);
			} else summaryRequest.current = fetchSubagencySummary(toptierCode, fy);
			summaryRequest.current.promise.then((res) => {
				const subagencySummaryData = Object.create(BaseAgencySubagencyCount);
				subagencySummaryData.populate(res.data);
				let awardSpendingDataThroughDate = res.data.latest_action_date;
				if (awardSpendingDataThroughDate) awardSpendingDataThroughDate = dayjs(awardSpendingDataThroughDate).format("M/D/YYYY");
				else awardSpendingDataThroughDate = "no data";
				dispatch(setDataThroughDates({ awardSpendingDataThroughDate }));
				setNumberOfTransactions(subagencySummaryData.transactionCount);
				setAwardObligations(subagencySummaryData.obligations);
				setLoading(false);
				summaryRequest.current = null;
			}).catch((e) => {
				if (!isCancel(e)) {
					console.error(e);
					setError(true);
					setLoading(false);
					summaryRequest.current = null;
				}
			});
		};
		useEffect(() => {
			if (toptierCode && data) {
				getNewAwardsCount();
				getSubagencySummary();
			}
		}, [
			fy,
			toptierCode,
			activeTab
		]);
		const amounts = {
			awardObligations,
			numberOfTransactions,
			numberOfAwards
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "overview-data-group",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Cs, { boxes: summaryData.map((sdata) => ({
				...sdata,
				amount: amounts[sdata.type],
				isLoading: loading
			})) })
		});
	};
	SubAgencySummaryContainer.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/dataMapping/agency/tableColumns.js
var subagencyColumns, subagencyFields;
var init_tableColumns = __esmMin((() => {
	subagencyColumns = [
		{
			title: "name",
			displayName: "Sub-Agency Name"
		},
		{
			title: "totalObligations",
			displayName: "Award Obligations",
			right: true
		},
		{
			title: "transactionCount",
			displayName: "Number of Transactions",
			right: true
		},
		{
			title: "newAwardCount",
			displayName: "Number of New Awards",
			right: true
		}
	];
	subagencyFields = {
		name: "name",
		totalObligations: "total_obligations",
		transactionCount: "transaction_count",
		newAwardCount: "new_award_count"
	};
}));
//#endregion
//#region src/js/models/v2/agency/BaseSubagencySpendingRowChildren.js
var BaseSubagencySpendingRowChildren;
var init_BaseSubagencySpendingRowChildren = __esmMin((() => {
	init_BaseSubagencySpendingRow();
	BaseSubagencySpendingRowChildren = Object.create(BaseSubagencySpendingRow);
	BaseSubagencySpendingRowChildren.populate = function populate(data) {
		this.populateCore(data);
		this.name = `${data?.name} (${data?.code})`;
	};
}));
//#endregion
//#region src/js/helpers/agency/AwardSpendingSubagencyHelper.js
var parseRows;
var init_AwardSpendingSubagencyHelper = __esmMin((() => {
	init_BaseSubagencySpendingRow();
	init_BaseSubagencySpendingRowChildren();
	parseRows = (data) => {
		return data.map((d) => {
			let dataChildrenAndTotalObligation = [];
			if (d.children && d.children.length > 0) dataChildrenAndTotalObligation = d.children.map((child) => ({ ...child }));
			if (dataChildrenAndTotalObligation.length > 0) return {
				...d,
				children: dataChildrenAndTotalObligation
			};
			return { ...d };
		}).map((item) => {
			const subagencyTotalsRow = Object.create(BaseSubagencySpendingRow);
			subagencyTotalsRow.populateCore(item);
			let rowChildren = [];
			if (item.children && item.children.length > 0) rowChildren = item.children.map((childItem) => {
				const subagencyTotalsRowChild = Object.create(BaseSubagencySpendingRowChildren);
				subagencyTotalsRowChild.populate(childItem);
				return subagencyTotalsRowChild;
			});
			if (rowChildren && rowChildren.length > 0) Object.defineProperty(subagencyTotalsRow, "children", { value: rowChildren });
			return subagencyTotalsRow;
		});
	};
}));
//#endregion
//#region src/js/containers/agency/awardSpending/SubagencyTableContainer.jsx
/**
* SubagencyTableContainer.jsx
*/
var import_jsx_runtime$5, propTypes$4, SubagencyTableContainer;
var init_SubagencyTableContainer = __esmMin((() => {
	init_es();
	init_index_es();
	init_tableColumns();
	init_awardType();
	init_agencyActions();
	init_agency();
	init_AwardSpendingSubagencyHelper();
	init_useStateWithPrevious();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$4 = {
		fy: PropTypes.string,
		type: PropTypes.string.isRequired,
		prevType: PropTypes.string,
		subHeading: PropTypes.string
	};
	SubagencyTableContainer = ({ fy, type, prevType, subHeading }) => {
		const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
		const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
		const [totalItems, setTotalItems] = useState(0);
		const [prevSort, sort, setSort] = useStateWithPrevious("totalObligations");
		const [prevOrder, order, setOrder] = useStateWithPrevious("desc");
		const updateSort = (field, direction) => {
			setSort(field);
			setOrder(direction);
		};
		const [results, setResults] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const request = useRef(null);
		const dispatch = useDispatch();
		const { toptierCode } = useSelector((state) => state.agency.overview);
		useEffect(() => {
			if (request.current) request.current.cancel();
			dispatch(resetSubagencyTotals());
		}, []);
		const fetchSpendingBySubagencyCallback = useCallback(() => {
			if (request.current) request.current.cancel();
			setLoading(true);
			setError(false);
			const params = {
				limit: pageSize,
				page: currentPage,
				sort: subagencyFields[sort],
				order
			};
			const typeParam = awardTypeGroups[type];
			request.current = fetchSubagencySpendingList(toptierCode, fy, typeParam, params);
			request.current.promise.then((res) => {
				const parsedData = parseRows(res.data.results);
				setResults(parsedData);
				dispatch(setSubagencyTotals(parsedData));
				setTotalItems(res.data.page_metadata.total);
				setLoading(false);
			}).catch((err) => {
				setError(true);
				setLoading(false);
				console.error(err);
			});
		});
		useEffect(() => {
			if (currentPage !== 1) changeCurrentPage(1);
			else if (currentPage === 1) {
				if (prevSort !== sort || prevOrder !== order || prevPage !== currentPage || prevPageSize !== pageSize || prevType !== type && prevType) fetchSpendingBySubagencyCallback();
			}
		}, [
			type,
			fy,
			pageSize,
			sort,
			order
		]);
		useEffect(() => {
			if (fy && toptierCode) fetchSpendingBySubagencyCallback();
		}, [
			currentPage,
			fy,
			toptierCode
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "table-wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ss, {
				expandable: true,
				rows: results,
				columns: subagencyColumns,
				currentSort: {
					field: sort,
					direction: order
				},
				updateSort,
				divider: subHeading,
				loading,
				error
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Ka, {
				currentPage,
				changePage: changeCurrentPage,
				changeLimit: changePageSize,
				limitSelector: true,
				resultsText: true,
				pageSize,
				totalItems
			})]
		});
	};
	SubagencyTableContainer.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/agency/awardSpending/AwardSpendingIntro.jsx
var import_jsx_runtime$4, propTypes$3, AwardSpendingIntro;
var init_AwardSpendingIntro = __esmMin((() => {
	init_GlossaryLink();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$3 = { name: PropTypes.string.isRequired };
	AwardSpendingIntro = ({ name }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "status-of-funds__intro-wrapper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "status-of-funds__intro-section-title",
			children: [
				"How much is ",
				name,
				" spending on contracts and financial assistance?"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "status-of-funds__intro-section-text",
			"data-testid": "introCopy",
			children: [
				"Federal agencies use some portion of their ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "status-of-funds__glossary-term",
					children: "budgetary resources"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(GlossaryLink, { term: "budgetary-resources" }),
				" for awards to recipients in the form of contracts and financial assistance. Each award consists of a roll-up of individual ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "status-of-funds__glossary-term",
					children: "transactions"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(GlossaryLink, { term: "transaction" }),
				", including transactions that obligate money. In this section, we show which sub-agencies of ",
				name,
				" have issued awards through different types of contracts or financial assistance and how much each sub-agency has obligated (promised to spend)."
			]
		})]
	});
	AwardSpendingIntro.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/agency/awardSpending/AwardSpendingSubagency.jsx
/**
* AwardSpendingSubagency.jsx
* Created by Afna Saifudeen 8/4/21
*/
var import_jsx_runtime$3, propTypes$2, awardTabs, summaryData, initialActiveTabState, AwardSpendingSubagency;
var init_AwardSpendingSubagency = __esmMin((() => {
	init_es();
	init_index_es();
	init_SubAgencySummaryContainer();
	init_SubagencyTableContainer();
	init_Note();
	init_AwardSpendingIntro();
	init_useStateWithPrevious();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$2 = { fy: PropTypes.string };
	awardTabs = [
		{
			internal: "all",
			label: "All Awards"
		},
		{
			internal: "contracts",
			label: "Contracts"
		},
		{
			internal: "idvs",
			label: "Contract IDVs"
		},
		{
			internal: "grants",
			label: "Grants"
		},
		{
			internal: "loans",
			label: "Loans"
		},
		{
			internal: "direct_payments",
			label: "Direct Payments"
		},
		{
			internal: "other",
			label: "Other Financial Assistance"
		}
	];
	summaryData = [
		{
			type: "awardObligations",
			title: "Award Obligations",
			isMonetary: true
		},
		{
			type: "numberOfTransactions",
			title: "Number of Transactions"
		},
		{
			type: "numberOfAwards",
			title: "Number of New Awards"
		}
	];
	initialActiveTabState = {
		internal: awardTabs[0].internal,
		subtitle: awardTabs[0].label
	};
	AwardSpendingSubagency = ({ fy }) => {
		const { overview, subagencyCount } = useSelector((state) => state.agency);
		const [prevActiveTab, activeTab, setActiveTab] = useStateWithPrevious(initialActiveTabState);
		const moreOptionsTabsRef = useRef(null);
		const subagencyData = subagencyCount;
		const changeActiveTab = (tab) => {
			const tabSubtitle = awardTabs.find((item) => item.internal === tab).label;
			const tabInternal = awardTabs.find((item) => item.internal === tab).internal;
			setActiveTab({
				internal: tabInternal,
				subtitle: tabSubtitle
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "body__content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AwardSpendingIntro, { name: overview.name }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					ref: moreOptionsTabsRef,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(vs, {
						active: activeTab.internal,
						types: awardTabs,
						switchTab: changeActiveTab
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SubAgencySummaryContainer, {
					fy,
					summaryData,
					data: subagencyData,
					activeTab: activeTab.internal
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SubagencyTableContainer, {
					fy,
					type: activeTab.internal,
					prevType: prevActiveTab.internal,
					subHeading: "Offices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Note, { message: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"The sub-agencies presented in this section represent awarding organizations and were sourced from the General Services Administration (GSA) Federal Hierarchy (available at",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("a", {
						href: "https://sam.gov/content/hierarchy",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "https://sam.gov/content/hierarchy"
					}),
					"). This award hierarchy establishes the relationship between a department or independent agency’s sub-tiers and its offices and is used by federal agencies as the authoritative source for managing federal funding and awarding organizations."
				] }) })
			]
		});
	};
	AwardSpendingSubagency.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/agency/overview/PageTitle.jsx
var import_jsx_runtime$2, propTypes$1, PageTitle;
var init_PageTitle = __esmMin((() => {
	init_es();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = { fy: PropTypes.string };
	PageTitle = () => {
		const { name, logo } = useSelector((state) => state.agency.overview);
		const image = logo ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
			className: "page-title__image",
			src: `graphics/agency/${logo}`,
			alt: `${name} logo`
		}) : "";
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "page-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "page-title__wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("h2", {
					className: "page-title__name",
					children: [name, "\xA0\xA0"]
				})
			}), image]
		});
	};
	PageTitle.propTypes = propTypes$1;
}));
//#endregion
//#region src/_scss/pages/agency/index.scss
var require_agency = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/agency/AgencyPage.jsx
/**
* AgencyPage.jsx
* Created by Maxwell Kendall 01/31/2020
*/
var import_jsx_runtime$1, propTypes, AgencyProfileV2$1;
var init_AgencyPage = __esmMin((() => {
	init_index_es();
	init_es();
	init_development();
	init_queryParams();
	init_metaTagHelper();
	init_socialShare();
	init_stickyHeader();
	init_modalActions();
	init_useQueryParams();
	init_ShareIcon508();
	init_PageWrapper();
	init_ProfileBackLink();
	init_NumericPickerWrapper();
	init_StatusOfFundsContainer();
	init_AgencySection();
	init_AgencyOverview();
	init_AwardSpendingSubagency();
	init_PageTitle();
	import_jsx_runtime$1 = require_jsx_runtime();
	require_agency();
	propTypes = {
		selectedFy: PropTypes.string,
		latestFy: PropTypes.number,
		setSelectedFy: PropTypes.func,
		isError: PropTypes.bool,
		isLoading: PropTypes.bool,
		errorMessage: PropTypes.string,
		agencySlug: PropTypes.string
	};
	AgencyProfileV2$1 = ({ selectedFy, setSelectedFy, isError, errorMessage, isLoading, latestFy, agencySlug }) => {
		const history = useNavigate();
		const query = useQueryParams();
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const { pathname, search } = useLocation();
		const path = `${pathname.substring(1)}${search}`;
		const [activeSection, setActiveSection] = useState(query.section || "overview");
		const { name } = useSelector((state) => state.agency.overview);
		const { isStatusOfFundsChartLoaded } = useSelector((state) => state.agency);
		const dataThroughDates = useSelector((state) => state.agency.dataThroughDates);
		const overviewDataThroughDate = dataThroughDates?.overviewDataThroughDate;
		const statusDataThroughDate = dataThroughDates?.statusDataThroughDate;
		const awardSpendingDataThroughDate = dataThroughDates?.awardSpendingDataThroughDate;
		const handleShare = (optionName) => {
			handleShareOptionClick(optionName, path, {
				subject: `USAspending.gov Agency Profile: ${name}`,
				body: `View the spending activity for this Agency on USAspending.gov: ${getBaseUrl(path)}`
			}, handleShareDispatch);
		};
		const sections = [
			{
				section: "overview",
				label: "Overview",
				icon: "landmark",
				dataThroughDate: overviewDataThroughDate,
				component: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AgencyOverview, {
					fy: selectedFy,
					dataThroughDate: overviewDataThroughDate
				})
			},
			{
				section: "status-of-funds",
				label: "Status of Funds",
				icon: "money-check-alt",
				dataThroughDate: statusDataThroughDate,
				component: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusOfFundsContainer, { fy: selectedFy })
			},
			{
				section: "award-spending",
				label: "Award Spending",
				icon: "hand-holding-usd",
				dataThroughDate: awardSpendingDataThroughDate,
				component: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AwardSpendingSubagency, { fy: `${selectedFy}` })
			}
		];
		const jumpToSection = (section = "") => {
			const matchedSection = sections.find((obj) => obj.section === section);
			if (!matchedSection) return;
			const sectionDom = document.querySelector(`#agency-v2-${matchedSection.section}`);
			if (!sectionDom) return;
			if (!window.location.href.includes(`section=${section}`)) {
				const newQueryParams = combineQueryParams(query, { section: `${section}` });
				history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			}
			setActiveSection(section);
			const sectionTop = sectionDom.offsetTop - 66;
			window.scrollTo({
				top: sectionTop - 55,
				left: 0,
				behavior: "smooth"
			});
		};
		useEffect(() => {
			if (isStatusOfFundsChartLoaded && query.section) jumpToSection(query.section);
		}, [query.section, isStatusOfFundsChartLoaded]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "agency-v2",
			classNames: "usa-da-agency-page-v2",
			title: name,
			metaTagProps: isLoading ? {} : agencyPageMetaTags({
				id: agencySlug,
				name
			}),
			inPageNav: true,
			loading: isLoading,
			sections,
			jumpToSection,
			activeSection,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NumericPickerWrapper, {
				size: "sm",
				leftIcon: "calendar-alt",
				enabled: true,
				selectedValue: selectedFy,
				latestValue: latestFy,
				handleChange: (fy) => setSelectedFy({ fy })
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareIcon508, {
				url: getBaseUrl(path),
				onShareOptionClick: handleShare
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("main", {
				id: "main-content",
				className: "main-content usda__flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ProfileBackLink, {
					className: "agency-profile",
					label: "Back to Agency Profile Page",
					url: "/agency"
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "body usda__flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageTitle, {}), isError ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(fo, { description: errorMessage }) : sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AgencySection, {
						section,
						isLoading,
						icon: section.icon,
						dataThroughDate: section.dataThroughDate,
						children: section.component || /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ys, {})
					}, section.section))]
				})]
			})
		});
	};
	AgencyProfileV2$1.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/agency/AgencyContainer.jsx
/**
* AgencyContainer.jsx
* Created by Maxwell Kendall 01/31/2020
*/
var import_jsx_runtime, AgencyProfileV2;
//#endregion
__esmMin((() => {
	init_development();
	init_axios();
	init_es();
	init_agency();
	init_BaseAgencyOverview();
	init_agencyActions();
	init_WithLatestFy();
	init_AgencyPage();
	init_useQueryParams();
	init_useAgencySlugs();
	import_jsx_runtime = require_jsx_runtime();
	AgencyProfileV2 = () => {
		const { agencySlug } = useParams();
		const [, , { year: latestFy }] = useLatestAccountData();
		const { fy: currentUrlFy } = useQueryParams(["fy"]);
		const [selectedFy, setSelectedFy] = useValidTimeBasedQueryParams(currentUrlFy, null, ["fy"]);
		const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
		const [isLoading, setLoading] = useState(true);
		const [isError, setError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [redirect, setRedirect] = useState(false);
		const request = useRef(null);
		const dispatch = useDispatch();
		const [toptierCode, setToptierCode] = useState(agencySlugs[agencySlug]);
		useEffect(() => {
			if (selectedFy && toptierCode) {
				if (request.current) request.current.cancel();
				setLoading(true);
				setError(false);
				setErrorMessage("");
				request.current = fetchAgencyOverview(toptierCode, selectedFy);
				request.current.promise.then((res) => {
					setLoading(false);
					const agencyOverview = Object.create(BaseAgencyOverview);
					agencyOverview.populate(res.data);
					dispatch(setAgencyOverview(agencyOverview));
				}).catch((err) => {
					if (!isCancel(err)) {
						setError(true);
						setErrorMessage(err.message);
						setLoading(false);
						request.current = null;
						console.error(err);
					}
				});
			}
		}, [
			toptierCode,
			selectedFy,
			dispatch
		]);
		useEffect(() => {
			if (!slugsLoading && !slugsError) {
				const code = agencySlugs[agencySlug];
				if (code) setToptierCode(code);
				else setRedirect(true);
			} else if (slugsError) setError(true);
		}, [
			agencySlugs,
			slugsLoading,
			slugsError,
			agencySlug
		]);
		useEffect(() => () => {
			dispatch(resetAgency());
		}, [agencySlug, dispatch]);
		if (redirect) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/404" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgencyProfileV2$1, {
			setSelectedFy,
			latestFy,
			selectedFy,
			agencySlug,
			isLoading,
			isError,
			errorMessage
		});
	};
}))();
export { AgencyProfileV2, AgencyProfileV2 as default };
