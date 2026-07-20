import { n as __esmMin, o as __toESM, r as __exportAll } from "./rolldown-runtime-D1cXj70v.js";
import { Ai as formatMoneyWithPrecision, Ar as ds, Bn as init_Icons, Da as IsMobileContext, Ea as require_immutable, Fi as formatTreemapValues, Ha as Link, Ii as init_moneyFormatter, Ka as useMatch, Kr as FontAwesomeIcon, Nn as Home, Nr as init_index_es, O as require_dayjs_min, Oa as init_IsMobileContext, Pn as InfoCircle, Va as init_development, Vr as ss, at as init_index_esm, ct as usePrevious, dr as Analytics, fr as init_Analytics, go as require_jsx_runtime, io as useSelector, it as Q, ki as formatMoney, lo as bindActionCreators, no as init_es, oo as useDispatch, ot as le, qa as useNavigate, qr as init_dist, so as connect_default, st as init_usePrevious, uo as init_redux, xr as Ka } from "./index.js-Dk2VDaPz.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-g_gblR0b.js";
import { b as withAgencySlugs, n as useAgencySlugs, t as init_useAgencySlugs, y as init_WithAgencySlugs } from "./useAgencySlugs-BEIzOo-6.js";
import { n as dodNote, r as init_Note, t as Note } from "./Note-B_ZkRToa.js";
import { B as linear, t as init_src } from "./src-BVb2vAbu.js";
import { N as init_InfoTooltipContent, s as ExplorerInfoToolTip } from "./InfoTooltipContent-BmV8PlBe.js";
import { a as ExplorerWrapperPage, i as rootScopes, n as icons, o as init_ExplorerWrapperPage, r as init_dropdownScopes, t as dropdownScopes } from "./dropdownScopes-CJjKNlsM.js";
import { a as truncateDataForTreemap, i as init_explorerHelper, n as useFetchBreakdown, r as appendCellForDataOutsideTree, t as init_useFetchBreakdown } from "./useFetchBreakdown-CJzJjw-U.js";
import { i as measureTreemapValue, r as measureTreemapHeader, t as init_textMeasurement } from "./textMeasurement-Bf9kYCr1.js";
import { a as treemap_default, c as hierarchy, n as binary_default, t as init_src$1 } from "./src-D8Obn9VZ.js";
import { n as init_ViewTypeButton, t as ViewTypeButton } from "./ViewTypeButton-pGhfUL12.js";
import { n as init_TreemapCell, t as TreemapCell } from "./TreemapCell-DFYP1r-l.js";
import { n as init_QuarterPickerWithFY, t as QuarterPickerWithFY } from "./QuarterPickerWithFY-8o9S5KZi.js";
import React, { createElement, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { orderBy, sortBy, startCase, truncate } from "lodash-es";
//#region src/js/redux/actions/explorer/explorerActions.js
var explorerActions_exports = /* @__PURE__ */ __exportAll({
	addExplorerTrail: () => addExplorerTrail,
	overwriteExplorerTrail: () => overwriteExplorerTrail,
	resetExplorer: () => resetExplorer,
	resetExplorerTable: () => resetExplorerTable,
	setExplorerActive: () => setExplorerActive,
	setExplorerPeriod: () => setExplorerPeriod,
	setExplorerRoot: () => setExplorerRoot,
	setExplorerTableOrder: () => setExplorerTableOrder,
	setExplorerTablePage: () => setExplorerTablePage
});
var setExplorerRoot, setExplorerPeriod, setExplorerActive, addExplorerTrail, overwriteExplorerTrail, setExplorerTableOrder, setExplorerTablePage, resetExplorerTable, resetExplorer;
var init_explorerActions = __esmMin((() => {
	setExplorerRoot = (state) => ({
		type: "SET_EXPLORER_ROOT",
		root: state
	});
	setExplorerPeriod = (state) => ({
		type: "SET_EXPLORER_TIME_PERIOD",
		fy: state.fy,
		quarter: state.quarter,
		period: state.period
	});
	setExplorerActive = (state) => ({
		type: "SET_EXPLORER_ACTIVE",
		active: state
	});
	addExplorerTrail = (state) => ({
		type: "ADD_EXPLORER_TRAIL",
		item: state
	});
	overwriteExplorerTrail = (state) => ({
		type: "OVERWRITE_EXPLORER_TRAIL",
		trail: state
	});
	setExplorerTableOrder = (state) => ({
		type: "SET_EXPLORER_TABLE_ORDER",
		order: state
	});
	setExplorerTablePage = (state) => ({
		type: "SET_EXPLORER_TABLE_PAGE",
		number: state
	});
	resetExplorerTable = () => ({ type: "RESET_EXPLORER_TABLE" });
	resetExplorer = () => ({ type: "RESET_EXPLORER" });
}));
//#endregion
//#region src/js/dataMapping/explorer/sidebarStrings.js
var rootTypes, sidebarTypes;
var init_sidebarStrings = __esmMin((() => {
	rootTypes = {
		agency: "All Agencies",
		budget_function: "All Budget Functions",
		object_class: "All Object Classes"
	};
	sidebarTypes = {
		budget_function: "Budget Function",
		budget_subfunction: "Budget Sub-Function",
		federal_account: "Federal Account",
		program_activity: "Program Activity",
		object_class: "Object Class",
		recipient: "Recipient",
		award: "Award",
		agency: "Agency"
	};
}));
//#endregion
//#region src/js/helpers/singularityHelper.js
var vowels, generateSingular;
var init_singularityHelper = __esmMin((() => {
	vowels = [
		"a",
		"e",
		"i",
		"o",
		"u"
	];
	generateSingular = (word, capitalization) => {
		const firstLetter = word.substring(0, 1).toLowerCase();
		let singular = "An";
		if (vowels.indexOf(firstLetter) === -1) singular = "A";
		if (capitalization) return singular;
		return singular.toLowerCase();
	};
}));
//#endregion
//#region src/js/components/explorer/detail/header/RootHeader.jsx
/**
* RootHeader.jsx
* Created by Kevin Li 8/21/17
*/
var import_jsx_runtime$20, dayjs$1, propTypes$16, RootHeader;
var init_RootHeader = __esmMin((() => {
	init_sidebarStrings();
	init_index_es();
	init_moneyFormatter();
	init_singularityHelper();
	init_InfoTooltipContent();
	import_jsx_runtime$20 = require_jsx_runtime();
	dayjs$1 = require_dayjs_min();
	propTypes$16 = {
		isLoading: PropTypes.bool,
		root: PropTypes.string,
		fy: PropTypes.string,
		total: PropTypes.number,
		lastUpdate: PropTypes.string
	};
	RootHeader = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { showInfoTooltip: false };
			this.showTooltip = this.showTooltip.bind(this);
			this.closeTooltip = this.closeTooltip.bind(this);
		}
		showTooltip() {
			this.setState({ showInfoTooltip: true });
		}
		closeTooltip() {
			this.setState({ showInfoTooltip: false });
		}
		render() {
			const type = sidebarTypes[this.props.root];
			return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				className: "detail-header",
				id: "detail-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "detail-header__labels",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("h2", {
						className: "detail-header__title",
						children: [
							"You are viewing FY ",
							this.props.fy,
							" spending by ",
							/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
								className: "detail-header__title detail-header__title_capitalize",
								children: type
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
						className: "detail-header__instructions",
						children: [
							"Choose ",
							generateSingular(type, false),
							" ",
							type.toLowerCase(),
							" below to start your exploration."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "detail-header__amounts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
							className: "detail-header__fy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
								"FY ",
								this.props.fy,
								" obligated amount"
							] }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ds, {
								className: "award-section-tt",
								icon: "info",
								tooltipPosition: "left",
								tooltipComponent: ExplorerInfoToolTip
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
							className: "detail-header__value",
							children: this.props.isLoading ? "--" : formatTreemapValues(this.props.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
							className: "detail-header__update",
							children: ["Data as of ", dayjs$1(this.props.lastUpdate, "YYYY-MM-DD").format("MMMM D, YYYY")]
						})
					]
				})]
			});
		}
	};
	RootHeader.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/components/explorer/detail/header/TruncationWarning.jsx
var import_jsx_runtime$19, TruncationWarning;
var init_TruncationWarning = __esmMin((() => {
	init_Icons();
	init_development();
	import_jsx_runtime$19 = require_jsx_runtime();
	TruncationWarning = ({ activeSubdivision = "award" }) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "truncation-warning detail-header__truncation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
			className: "truncation-warning__icon",
			children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(InfoCircle, { alt: "Information" })
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: "truncation-warning__message",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
				className: "truncation-warning__title",
				children: [startCase(activeSubdivision), " Display Limit"]
			}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
				className: "truncation-warning__detail",
				children: [
					"Only the 500 ",
					startCase(activeSubdivision),
					"s with the highest amounts are shown.",
					activeSubdivision === "award" && /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_jsx_runtime$19.Fragment, { children: [
						"For further research on individual awards, visit our ",
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Link, {
							to: "/search",
							children: "Advanced Search"
						}),
						"."
					] })
				]
			})]
		})]
	});
	TruncationWarning.propTypes = { activeSubdivision: PropTypes.string };
}));
//#endregion
//#region src/js/components/explorer/detail/header/DetailHeader.jsx
var import_jsx_runtime$18, dayjs, propTypes$15, exitExplorer, dataType, heading, DetailHeader;
var init_DetailHeader = __esmMin((() => {
	init_development();
	init_Analytics();
	init_sidebarStrings();
	init_moneyFormatter();
	init_singularityHelper();
	init_TruncationWarning();
	init_useAgencySlugs();
	import_jsx_runtime$18 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	propTypes$15 = {
		within: PropTypes.string,
		activeSubdivision: PropTypes.string,
		fy: PropTypes.string,
		lastUpdate: PropTypes.string,
		total: PropTypes.number,
		title: PropTypes.string,
		id: PropTypes.string,
		link: PropTypes.bool,
		parent: PropTypes.string,
		isTruncated: PropTypes.bool,
		isLoading: PropTypes.bool
	};
	exitExplorer = (target) => {
		Analytics.event({
			event: "Spending Explorer - Award Click Exit",
			category: "Spending Explorer - Exit",
			action: target
		});
	};
	dataType = (type, parent) => {
		if (!type) return null;
		const singular = generateSingular(type, true);
		let parentRelation = null;
		if (parent) {
			let descriptor = "of";
			if (type === "Recipient") descriptor = "within";
			parentRelation = /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", { children: [
				descriptor,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
					className: "detail-header__type detail-header__type_bold",
					children: parent
				})
			] });
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "detail-header__type",
			children: [
				singular,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
					className: "detail-header__type detail-header__type_bold",
					children: type
				}),
				" ",
				parentRelation
			]
		});
	};
	heading = (type, title, id, link, agencyIds, slugError) => {
		if (type === "Federal Account") return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h2", {
			className: "detail-header__title",
			children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Link, {
				to: `/federal_account/${id}`,
				className: "detail-header__title-link",
				onClick: exitExplorer.bind(null, `/federal_account/${id}`),
				children: title
			})
		});
		else if (type === "Agency") {
			const agencyIdentifier = !slugError ? agencyIds[id] : "";
			let header = /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Link, {
				to: `/agency/${agencyIdentifier}`,
				className: "detail-header__title-link",
				onClick: exitExplorer.bind(null, `/agency/${agencyIdentifier}`),
				children: title
			});
			if (title === "Unreported Data" || link === false) header = /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
				className: "detail-header__title",
				children: title
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h2", {
				className: "detail-header__title",
				children: header
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h2", {
			className: "detail-header__title",
			children: title
		});
	};
	DetailHeader = (props) => {
		const [, , agencyIds, , slugsError] = useAgencySlugs();
		const type = sidebarTypes[props.within];
		let truncationWarning = null;
		if (props.isTruncated) truncationWarning = /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(TruncationWarning, { activeSubdivision: props.activeSubdivision });
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "detail-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "detail-header__labels",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "detail-header__subtitle",
						children: "You've chosen"
					}),
					heading(type, props.title, props.id, props.link, agencyIds, slugsError),
					dataType(type, props.parent)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "right-side",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "amount-header",
						children: [
							"FY ",
							props.fy,
							" obligated amount"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "amount-value",
						children: props.isLoading ? "--" : formatTreemapValues(props.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "update-date",
						children: ["Data as of ", dayjs(props.lastUpdate, "YYYY-MM-DD").format("MMMM D, YYYY")]
					})
				]
			})]
		}), truncationWarning] });
	};
	DetailHeader.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/components/explorer/detail/UnreportedErrorScreen.jsx
/**
* UnreportedErrorScreen.jsx
* Created by David Trinh 5/31/18
*/
var import_jsx_runtime$17, UnreportedErrorScreen;
var init_UnreportedErrorScreen = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$17 = require_jsx_runtime();
	UnreportedErrorScreen = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "explorer-unreported",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "explorer-unreported__box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "explorer-unreported__top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
							className: "explorer-unreported__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(InfoCircle, { alt: "Information" })
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("h3", {
							className: "explorer-unreported__header",
							children: "Data has not been reported at this time."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "explorer-unreported__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "explorer-unreported__info",
							children: "This can happen when:"
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("ul", {
							className: "explorer-unreported__list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("li", { children: "An agency reports no data or incomplete data" }),
								/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("li", { children: "An agency is late with their submission for this period" }),
								/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("li", { children: "For FY20 [P07, P08, P10, and P11] and FY21 [P01/P02, P04, P05, P07, P08, P10, and P11], agencies that did not receive COVID-19 supplemental appropriations were not required to submit data on a monthly basis, but only at the end of the quarter. This does not apply in FY22 or later years; starting in FY22, all agencies must submit monthly." }),
								/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("li", { children: "New agency submission data updates may still be in progress" })
							]
						})]
					})]
				})
			});
		}
	};
}));
//#endregion
//#region src/js/dataMapping/explorer/explorerTableFields.js
var columns;
var init_explorerTableFields = __esmMin((() => {
	columns = [
		{
			title: "Name",
			displayName: "Name",
			defaultSortDirection: "asc"
		},
		{
			title: "Obligated Amount",
			displayName: "Obligated Amount",
			defaultSortDirection: "desc"
		},
		{
			title: "Percent of Total",
			displayName: "Percent of Total",
			defaultSortDirection: "desc"
		}
	];
}));
//#endregion
//#region src/js/containers/explorer/detail/helpers/parseResults.js
var parseResults;
var init_parseResults = __esmMin((() => {
	init_moneyFormatter();
	parseResults = (data, total, sort, goDeeper, goToUnreported) => {
		const resultsArray = [];
		data.forEach((item) => {
			const obligatedAmount = formatMoneyWithPrecision(item.amount, 0);
			let percent = `${(item.amount / total * 100).toFixed(2)}%`;
			if (percent === "0.00%") percent = "Less than 0.01%";
			const name = item.name !== "Unreported Data" ? item.name : "Unreported Data*";
			const link = item.name !== "Unreported Data" ? () => goDeeper(item.id, name) : () => goToUnreported(item);
			const result = {
				Name: name,
				"Obligated Amount": obligatedAmount,
				"Percent of Total": percent,
				link
			};
			resultsArray.push(result);
		});
		return orderBy(resultsArray, [sort.field], [sort.direction]);
	};
}));
//#endregion
//#region src/js/containers/explorer/detail/table/ExplorerTable.jsx
/**
* ExplorerTable.jsx
* Created by Lizzie Salita 10/16/17
*/
var import_jsx_runtime$16, propTypes$14, ExplorerTable;
var init_ExplorerTable = __esmMin((() => {
	init_index_es();
	init_IsMobileContext();
	init_explorerTableFields();
	init_parseResults();
	import_jsx_runtime$16 = require_jsx_runtime();
	propTypes$14 = {
		isLoading: PropTypes.bool,
		results: PropTypes.object,
		goDeeper: PropTypes.func,
		total: PropTypes.number,
		goToUnreported: PropTypes.func
	};
	ExplorerTable = memo(function ExplorerTableContainer({ isLoading, results, total, goDeeper, goToUnreported }) {
		const { isTablet } = useContext(IsMobileContext);
		const [sort, setSort] = useState({
			field: "Obligated Amount",
			direction: "desc"
		});
		const [pageNumber, setPageNumber] = useState(1);
		const pageSize = 20;
		const totalItems = results.size;
		const onChangePage = (p) => {
			const totalPages = Math.ceil(totalItems / pageSize);
			if (p > 0 && p <= totalPages) setPageNumber(p);
		};
		const rows = useMemo(() => {
			const parsedResults = parseResults(results, total, sort, goDeeper, goToUnreported);
			if (totalItems < pageSize) return parsedResults;
			const endingIndex = pageNumber * pageSize - 1;
			const startingIndex = (pageNumber - 1) * pageSize;
			return parsedResults.filter((v, i) => i <= endingIndex && startingIndex <= i);
		}, [
			results,
			total,
			sort,
			goDeeper,
			goToUnreported,
			totalItems,
			pageNumber
		]).map(({ Name: name, "Obligated Amount": obligatedAmount, "Percent of Total": percent, link }) => [
			/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "explorer-link-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
					className: "cell-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("button", {
						className: "go-deeper-link",
						onClick: link,
						children: name
					})
				})
			}),
			obligatedAmount,
			percent
		]);
		const updateSort = (field, direction) => setSort({
			field,
			direction
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: `explorer-table${results.length === 0 ? " no-results" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Ka, {
					resultsText: true,
					changePage: onChangePage,
					currentPage: pageNumber,
					totalItems,
					pageSize
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ss, {
					columns,
					rows,
					isMobile: isTablet,
					currentSort: sort,
					updateSort,
					loading: isLoading,
					atMaxLevel: true,
					isStacked: true,
					newMobileView: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Ka, {
					resultsText: true,
					changePage: onChangePage,
					currentPage: pageNumber,
					totalItems,
					pageSize
				})
			]
		});
	});
	ExplorerTable.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/toolbar/DropdownItem.jsx
/**
* DropdownItem.jsx
* Created by Kevin Li 8/17/17
*/
var import_jsx_runtime$15, propTypes$13, DropdownItem;
var init_DropdownItem = __esmMin((() => {
	init_dropdownScopes();
	init_sidebarStrings();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$13 = {
		value: PropTypes.string,
		pickItem: PropTypes.func
	};
	DropdownItem = class extends React.Component {
		constructor(props) {
			super(props);
			this.clickedButton = this.clickedButton.bind(this);
		}
		clickedButton() {
			this.props.pickItem(this.props.value);
		}
		render() {
			const IconType = icons[this.props.value];
			const icon = /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(IconType, {});
			const label = sidebarTypes[this.props.value];
			return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("button", {
				className: "dropdown-option",
				title: label,
				onClick: this.clickedButton,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
					className: "dropdown-option__icon",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
					className: "dropdown-option__label",
					children: label
				})]
			}) });
		}
	};
	DropdownItem.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/toolbar/BreakdownDropdown.jsx
/**
* BreakdownDropdown.jsx
* Created by Kevin Li 8/17/17
*/
var import_jsx_runtime$14, propTypes$12, BreakdownDropdown;
var init_BreakdownDropdown = __esmMin((() => {
	init_dist();
	init_development();
	init_dropdownScopes();
	init_sidebarStrings();
	init_ViewTypeButton();
	init_DropdownItem();
	init_usePrevious();
	import_jsx_runtime$14 = require_jsx_runtime();
	propTypes$12 = {
		isRoot: PropTypes.bool,
		active: PropTypes.object,
		trail: PropTypes.array,
		root: PropTypes.string,
		changeSubdivisionType: PropTypes.func,
		changeView: PropTypes.func,
		viewType: PropTypes.string
	};
	BreakdownDropdown = (props) => {
		const [expanded, setExpanded] = useState(false);
		const [options, setOptions] = useState([]);
		const [active, setActive] = useState(null);
		const history = useNavigate();
		const prevProps = usePrevious(props);
		const wrapperRef = useRef(null);
		const handleClickOutside = useCallback((event) => {
			if (expanded && wrapperRef?.current && !wrapperRef?.current.contains(event.target)) setExpanded(false);
		});
		const prepareOptions = () => {
			let tempOptions = [];
			let tempActive = props.root;
			if (props.isRoot) tempOptions = rootScopes;
			else {
				const optionTree = dropdownScopes[props.root];
				const lastFilter = props.trail[props.trail.length - 1].subdivision;
				const currentIndex = Math.min(optionTree.indexOf(lastFilter), optionTree.length - 1);
				const accountDepth = optionTree.indexOf("federal_account");
				const programActivityIndex = optionTree.indexOf("program_activity");
				if (currentIndex <= accountDepth) {
					if (programActivityIndex !== -1) optionTree.splice(programActivityIndex, 1);
				}
				tempOptions = optionTree.slice(currentIndex);
				tempActive = props.active.subdivision;
			}
			setOptions(tempOptions);
			setActive(tempActive);
		};
		useEffect(() => {
			prepareOptions(props);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, []);
		useEffect(() => {
			if (prevProps?.active !== props.active) prepareOptions(props);
			else if (prevProps?.root !== props.root) prepareOptions(props);
			else if (prevProps?.isRoot !== props.isRoot) prepareOptions(props);
		}, [
			props.active,
			props.root,
			props.isRoot,
			prevProps
		]);
		useEffect(() => {
			if (expanded) document.addEventListener("mousedown", handleClickOutside);
			else document.removeEventListener("mousedown", handleClickOutside);
		}, [expanded]);
		const toggleMenu = () => {
			setExpanded((prevState) => !prevState);
		};
		const pickItem = (item) => {
			setExpanded(false);
			if (props.isRoot && item !== props.root) history(`/explorer/${item}`);
			else if (!props.isRoot) props.changeSubdivisionType(item);
		};
		let dropdown = null;
		if (expanded) dropdown = /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("ul", {
			className: "dropdown__menu",
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DropdownItem, {
				value: option,
				pickItem
			}, option))
		});
		let icon = null;
		const IconType = icons[active];
		if (IconType) icon = /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(IconType, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "explorer-toolbar",
			ref: wrapperRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "explorer-toolbar__breakdown",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
					className: "breakdown__label",
					children: "See the breakdown by:"
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "breakdown__dropdown",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("button", {
						className: "dropdown__selection",
						onClick: toggleMenu,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
								className: "dropdown__icon",
								children: icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
								className: "dropdown__label",
								children: sidebarTypes[active]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
								className: "dropdown__arrow",
								children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(FontAwesomeIcon, { icon: "angle-down" })
							})
						]
					}), dropdown]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "view-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ViewTypeButton, {
					value: "treemap",
					label: "Treemap",
					icon: "th-large",
					active: props.viewType === "treemap",
					changeView: props.changeView
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ViewTypeButton, {
					value: "table",
					label: "Table",
					icon: "table",
					active: props.viewType === "table",
					changeView: props.changeView
				})]
			})]
		});
	};
	BreakdownDropdown.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/treemap/ExplorerTreemap.jsx
/**
* ExplorerTreemap.jsx
* Created by Kevin Li 8/17/17
*/
var import_jsx_runtime$13, propTypes$11, ExplorerTreemap;
var init_ExplorerTreemap = __esmMin((() => {
	init_src$1();
	init_src();
	init_textMeasurement();
	init_LoadingSpinner();
	init_TreemapCell();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$11 = {
		isLoading: PropTypes.bool,
		width: PropTypes.number,
		height: PropTypes.number,
		total: PropTypes.number,
		data: PropTypes.object,
		goDeeper: PropTypes.func,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		goToUnreported: PropTypes.func
	};
	ExplorerTreemap = ({ isLoading, width, height = 530, total, data, goDeeper, showTooltip, hideTooltip, goToUnreported }) => {
		const [virtualChart, setVirtualChart] = useState([]);
		const truncateText = (text, type, maxWidth) => {
			let label = text;
			let labelWidth = 0;
			if (type === "title") labelWidth = measureTreemapHeader(text);
			else if (type === "subtitle") labelWidth = measureTreemapValue(text);
			if (labelWidth > maxWidth) {
				const characterWidth = Math.ceil(labelWidth / text.length);
				const availableWidth = maxWidth - 30;
				let availableLength = Math.floor(availableWidth / characterWidth);
				if (availableLength < 1) availableLength = 1;
				if (availableLength < text.length) label = `${label.substring(0, availableLength)}...`;
			}
			return label;
		};
		const buildVirtualCell = useCallback((item, scale, localTotal) => {
			const localHeight = item.y1 - item.y0;
			const localWidth = item.x1 - item.x0;
			const amount = item.data.amount;
			const percent = amount / localTotal;
			const percentString = `${Math.round(percent * 1e3) / 10}%`;
			const usableWidth = localWidth - 40;
			let name = item.data.name;
			const isUnreported = item.data.name === "Unreported Data";
			if (isUnreported) name = "Unreported Data*";
			const title = truncateText(name, "title", usableWidth);
			const subtitle = truncateText(percentString, "subtitle", usableWidth);
			let color = scale(amount);
			if (isUnreported) color = "rgb(103,103,103)";
			return {
				width: localWidth,
				height: localHeight,
				x: item.x0,
				y: item.y0,
				data: Object.assign({}, item.data, {
					percent,
					percentString
				}),
				color,
				title: {
					text: title,
					x: localWidth / 2,
					y: localHeight / 2 - 5
				},
				subtitle: {
					text: subtitle,
					x: localWidth / 2,
					y: localHeight / 2 + 15
				}
			};
		}, []);
		const selectedCell = useCallback((id, title) => {
			goDeeper(id, title);
		}, [goDeeper]);
		const buildVirtualChart = useCallback(() => {
			const localData = data.toJS();
			const treemapData = hierarchy({ children: localData }).sum((d) => d.amount);
			const treeItems = treemap_default().size([width, height]).tile(binary_default).paddingInner(5).round(true)(treemapData).leaves();
			if (treeItems.length === 0 || localData.length === 0) {
				setVirtualChart([]);
				return;
			}
			const maxValue = treeItems[0].data.amount;
			const minValue = treeItems[treeItems.length - 1].data.amount;
			let scale = linear().domain([minValue, maxValue]).range(["#47BAD9", "#1C4956"]);
			if (treeItems.length === 1) scale = () => "#47BAD9";
			const cells = [];
			treeItems.forEach((item) => {
				const cell = buildVirtualCell(item, scale, total);
				cells.push(cell);
			});
			setVirtualChart(cells);
		}, [
			data,
			width,
			height,
			buildVirtualCell,
			total
		]);
		useEffect(() => {
			buildVirtualChart();
		}, [buildVirtualChart]);
		if (width <= 0) return null;
		const cells = virtualChart.map((cell) => /* @__PURE__ */ createElement(TreemapCell, {
			...cell,
			key: `${cell.data.name}-${cell.data.id}`,
			selectedCell,
			showTooltip,
			hideTooltip,
			goToUnreported
		}));
		let loadingMessage = null;
		if (isLoading) loadingMessage = /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "explorer-detail-content__loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "explorer-detail-content__loading-message",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(LoadingSpinner, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "explorer-detail-content__loading-title",
						children: "Gathering your data..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "explorer-detail-content__loading-subtitle",
						children: "Updating Spending Explorer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: "This should only take a few moments..." })
				]
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "explorer-treemap",
			children: [loadingMessage, /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("svg", {
				className: "treemap",
				width: "100%",
				height,
				children: cells
			})]
		});
	};
	ExplorerTreemap.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/ExplorerVisualization.jsx
/**
* ExplorerVisualization.jsx
* Created by Kevin Li 8/17/17
*/
var import_jsx_runtime$12, propTypes$10, ExplorerVisualization;
var init_ExplorerVisualization = __esmMin((() => {
	init_Analytics();
	init_UnreportedErrorScreen();
	init_ExplorerTable();
	init_Note();
	init_BreakdownDropdown();
	init_ExplorerTreemap();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$10 = {
		isRoot: PropTypes.bool,
		isLoading: PropTypes.bool,
		root: PropTypes.string,
		active: PropTypes.object,
		trail: PropTypes.array,
		data: PropTypes.object,
		total: PropTypes.number,
		goDeeper: PropTypes.func,
		changeSubdivisionType: PropTypes.func,
		showTooltip: PropTypes.bool,
		hideTooltip: PropTypes.func,
		goToUnreported: PropTypes.func
	};
	ExplorerVisualization = ({ isRoot, isLoading, root, active, trail, data, total, goDeeper, changeSubdivisionType, showTooltip, hideTooltip, goToUnreported }) => {
		const [width, setWidth] = useState(0);
		const [viewType, setViewType] = useState("treemap");
		const widthRef = useRef(null);
		const measureWidth = () => setWidth(widthRef.current.offsetWidth);
		const changeView = (type) => {
			setViewType(type);
			Analytics.event({
				event: "Spending Explorer - Visualization Type",
				category: "Spending Explorer - Visualization Type",
				action: type
			});
		};
		const loadingTreemapClass = isLoading ? "" : "explorer-vis__treemap-transition__loading";
		const loadingTableClass = isLoading ? "" : "explorer-vis__table-transition__loading";
		let visualization = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: `treemap-loading-transition ${loadingTreemapClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ExplorerTreemap, {
				activeSubdivision: active.subdivision,
				isLoading,
				width,
				data,
				total,
				goDeeper,
				showTooltip,
				hideTooltip,
				goToUnreported,
				changeView
			})
		});
		if (viewType === "table") visualization = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: `explorer-vis__table-transition ${loadingTableClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ExplorerTable, {
				isLoading,
				results: data,
				total,
				goDeeper,
				goToUnreported
			})
		});
		let dropDown;
		let disclaimer;
		if (data.get(0).name === "Unreported Data" && data.count() === 1) visualization = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(UnreportedErrorScreen, {}) });
		else {
			dropDown = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
				className: "explorer-vis__toolbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(BreakdownDropdown, {
					root,
					active,
					trail,
					isRoot,
					changeSubdivisionType,
					viewType,
					changeView
				})
			});
			disclaimer = /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "explorer-vis__disclaimer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "All dollar amounts shown here represent agency reported obligated amounts" }),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Note, {
						title: "Unreported Data*:",
						message: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
							"Unreported amounts are calculated using the difference in the total obligated amount from the\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("a", {
								className: "usa-bold-link",
								target: "_blank",
								rel: "noopener noreferrer",
								href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS%20II%20-%20SF%20133%20Report%20on%20Budget%20Execution%20and%20Budgetary%20Resources.html",
								children: "Report on Budget Execution and Budgetary Resources"
							}),
							"\xA0(excluding financing accounts) and the total obligated amount reported by agencies to USAspending.gov in 'Account Breakdown by Program Activity & Object Class' data (also called 'File B' data)."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Note, { message: dodNote })
				]
			});
		}
		useEffect(() => {
			measureWidth();
			window.addEventListener("resize", measureWidth);
			Analytics.event({
				event: "Spending Explorer - Visualization Type",
				category: "Spending Explorer - Visualization Type",
				action: viewType
			});
			return () => window.removeEventListener("resize", measureWidth);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "explorer-vis",
			children: [
				dropDown,
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "explorer-vis__width-reference",
					ref: widthRef
				}),
				visualization,
				disclaimer
			]
		});
	};
	ExplorerVisualization.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/explorer/detail/FakeScreens.jsx
var import_jsx_runtime$11, FakeScreen, propTypes$9, FakeScreens;
var init_FakeScreens = __esmMin((() => {
	init_DetailHeader();
	import_jsx_runtime$11 = require_jsx_runtime();
	FakeScreen = () => {
		const randomPercents = [Math.random(), Math.random()];
		const remaining = 1 - (randomPercents[0] + randomPercents[1]);
		randomPercents.push(remaining);
		const values = sortBy(randomPercents);
		const leftStyle = { width: `${values[2] * 100}%` };
		const middleStyle = { width: `${values[1] * 100}%` };
		const rightStyle = { width: `${values[0] * 100}%` };
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "fake-screen",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DetailHeader, {
				type: "agency",
				title: "Lorem Ipsum",
				fy: "1789",
				total: Math.random() * 1e7
			}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "explorer-visualization-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: "toolbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "breakdown-menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "breakdown-label",
							children: "See the breakdown by:"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: "explorer-treemap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
						className: "fake-treemap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
								style: leftStyle,
								className: "left-block"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
								style: middleStyle,
								className: "middle-block"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
								style: rightStyle,
								className: "right-block"
							})
						]
					})
				})]
			})]
		});
	};
	propTypes$9 = {
		position: PropTypes.string,
		transitionSteps: PropTypes.number
	};
	FakeScreens = (props) => {
		const fakes = [];
		for (let i = 0; i < Math.abs(props.transitionSteps); i++) fakes.push(/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FakeScreen, {}, i));
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: `fake-screens ${props.position}`,
			children: fakes
		});
	};
	FakeScreens.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/explorer/detail/NoAwardsScreen.jsx
/**
* NoAwardsScreen.jsx
* Created by Lizzie Salita 9/21/17
*/
var import_jsx_runtime$10, propTypes$8, NoAwardsScreen;
var init_NoAwardsScreen = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$8 = {
		rewindToFilter: PropTypes.func,
		currentIndex: PropTypes.number
	};
	NoAwardsScreen = class extends React.Component {
		constructor(props) {
			super(props);
			this.clickedLink = this.clickedLink.bind(this);
		}
		clickedLink() {
			const previousIndex = this.props.currentIndex - 1;
			this.props.rewindToFilter(previousIndex);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "explorer-no-awards",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "no-awards-message",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: "info-icon-circle",
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(InfoCircle, {})
					}), "You’ve reached a point with no associated awards."]
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					className: "go-back",
					onClick: this.clickedLink,
					children: "Click here to go back."
				})]
			});
		}
	};
	NoAwardsScreen.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/explorer/detail/DetailContent.jsx
/**
* DetailContent.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime$9, propTypes$7, DetailContent;
var init_DetailContent = __esmMin((() => {
	init_LoadingSpinner();
	init_RootHeader();
	init_DetailHeader();
	init_ExplorerVisualization();
	init_FakeScreens();
	init_NoAwardsScreen();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$7 = {
		isRoot: PropTypes.bool,
		isLoading: PropTypes.bool,
		isTruncated: PropTypes.bool,
		data: PropTypes.object,
		root: PropTypes.string,
		fy: PropTypes.string,
		lastUpdate: PropTypes.string,
		total: PropTypes.number,
		active: PropTypes.object,
		trail: PropTypes.array,
		transitionSteps: PropTypes.number,
		transition: PropTypes.string,
		goDeeper: PropTypes.func,
		changeSubdivisionType: PropTypes.func,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		rewindToFilter: PropTypes.func,
		goToUnreported: PropTypes.func
	};
	DetailContent = ({ isRoot, isLoading, isTruncated, data, root, fy, lastUpdate, total, active, trail, transitionSteps, transition, goDeeper, changeSubdivisionType, showTooltip, hideTooltip, rewindToFilter, goToUnreported }) => {
		const [showFakes, setShowFakes] = useState(false);
		const [fakeDirection, setFakeDirection] = useState("below");
		const divRef = useRef(null);
		const scrollDestinationRef = useRef(null);
		const startTransition = (steps) => {
			const wrapperHeight = divRef.current.offsetHeight;
			const absoluteSteps = Math.abs(steps);
			const direction = steps / absoluteSteps * -1;
			scrollDestinationRef.current = direction * absoluteSteps * wrapperHeight;
			if (absoluteSteps > 1) {
				setFakeDirection(steps < 0 ? "above" : "below");
				setShowFakes(true);
			} else {
				divRef.current.classList.add("detail-animate");
				divRef.current.style.transform = `translate(0px,${scrollDestinationRef.current}px)`;
			}
			setTimeout(() => {
				divRef.current.classList.remove("detail-animate");
				const secondScrollStart = -1 * direction * wrapperHeight;
				divRef.current.style.transform = `translate(0px,${secondScrollStart}px)`;
			}, 250);
		};
		const finishTransition = () => {
			setShowFakes(false);
			window.requestAnimationFrame(() => {
				divRef.current.classList.add("detail-animate");
				divRef.current.style.transform = `translate(0px,0px)`;
			});
		};
		useEffect(() => {
			if (transitionSteps !== 0) if (transition === "start") startTransition(transitionSteps);
			else if (transition === "end") finishTransition();
			else setShowFakes(false);
		}, [transition, transitionSteps]);
		useEffect(() => {
			if (showFakes) {
				divRef.current.classList.add("detail-animate");
				divRef.current.style.transform = `translate(0px,${scrollDestinationRef.current}px)`;
			}
		}, [showFakes]);
		if (isLoading && data.count() < 1) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "explorer-detail-content",
			ref: divRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "explorer-detail-content__loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "explorer-detail-content__loading-message",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(LoadingSpinner, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "explorer-detail-content__loading-title",
							children: "Gathering your data..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "explorer-detail-content__loading-subtitle",
							children: "Updating Spending Explorer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", { children: "This should only take a few moments..." })
					]
				})
			})
		});
		let header = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(RootHeader, {
			isLoading,
			root,
			fy,
			lastUpdate,
			total: active.total
		});
		let lastFilter = null;
		if (!isRoot) {
			lastFilter = trail[trail.length - 1];
			let parentFilter = null;
			if (trail.length > 2) parentFilter = trail[trail.length - 2].title;
			let id = `${lastFilter.id}`;
			if (lastFilter.within === "federal_account") id = lastFilter.accountNumber;
			header = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DetailHeader, {
				activeSubdivision: active.subdivision,
				isLoading,
				within: lastFilter.within,
				title: lastFilter.title,
				link: lastFilter.link,
				id,
				fy,
				lastUpdate,
				total: active.total,
				parent: parentFilter,
				isTruncated
			});
		}
		let fakeScreenAbove = null;
		let fakeScreenBelow = null;
		if (showFakes && fakeDirection === "below") fakeScreenBelow = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FakeScreens, {
			position: "below",
			transitionSteps
		});
		else if (showFakes && fakeDirection === "above") fakeScreenAbove = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FakeScreens, {
			position: "above",
			transitionSteps
		});
		const currentIndex = trail.length - 1;
		let visualizationSection = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(NoAwardsScreen, {
			rewindToFilter,
			currentIndex
		});
		if (data.count() > 0) visualizationSection = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ExplorerVisualization, {
			isRoot,
			isLoading,
			lastFilter,
			root,
			fy,
			active,
			trail,
			total,
			data,
			goDeeper,
			changeSubdivisionType,
			goToUnreported,
			showTooltip,
			hideTooltip,
			currentIndex,
			rewindToFilter
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "explorer-detail-content",
			ref: divRef,
			children: [
				fakeScreenAbove,
				header,
				visualizationSection,
				fakeScreenBelow
			]
		});
	};
	DetailContent.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/explorer/detail/sidebar/TrailDecorator.jsx
var import_jsx_runtime$8, TrailDecorator;
var init_TrailDecorator = __esmMin((() => {
	import_jsx_runtime$8 = require_jsx_runtime();
	TrailDecorator = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "dot-trail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "small-dot" })
		]
	});
}));
//#endregion
//#region src/js/components/explorer/detail/sidebar/TrailItem.jsx
var import_jsx_runtime$7, propTypes$6, TrailItem;
var init_TrailItem = __esmMin((() => {
	init_index_esm();
	init_sidebarStrings();
	init_moneyFormatter();
	init_TrailDecorator();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$6 = {
		isFirst: PropTypes.bool,
		isLast: PropTypes.bool,
		within: PropTypes.string,
		subdivision: PropTypes.string,
		title: PropTypes.string,
		total: PropTypes.number,
		index: PropTypes.number,
		rewindToFilter: PropTypes.func
	};
	TrailItem = (props) => {
		const clickedItem = () => {
			props.rewindToFilter(props.index);
		};
		let specialClass = "";
		if (props.isFirst && props.isLast) specialClass = "single";
		else if (props.isFirst) specialClass = "first";
		else if (props.isLast) specialClass = "last";
		const formattedAmount = formatTreemapValues(props.total);
		let filterName = "";
		let title = props.title;
		let showAmountClass = "";
		let titleIsAmount = "";
		if (props.within === "root") {
			filterName = rootTypes[props.subdivision];
			title = formattedAmount;
			titleIsAmount = "bold";
			showAmountClass = "hide";
		} else filterName = sidebarTypes[props.within];
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("button", {
			className: "item",
			title: `Return to ${filterName}`,
			onClick: clickedItem,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: `item-decorator ${specialClass}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", { className: "main-dot" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Q, { children: !props.isLast && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(le, {
					classNames: "explorer-dots-animation",
					timeout: {
						exit: 550,
						enter: 330
					},
					exit: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(TrailDecorator, {})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "item-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "type",
						children: filterName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: `title ${titleIsAmount}`,
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: `amount ${showAmountClass}`,
						children: formattedAmount
					})
				]
			})]
		});
	};
	TrailItem.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/explorer/detail/sidebar/VerticalTrail.jsx
var import_jsx_runtime$6, propTypes$5, VerticalTrail;
var init_VerticalTrail = __esmMin((() => {
	init_index_esm();
	init_TrailItem();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$5 = {
		trail: PropTypes.array,
		rewindToFilter: PropTypes.func
	};
	VerticalTrail = ({ trail, rewindToFilter }) => {
		const getTrailItem = () => trail.map((item, index) => /* @__PURE__ */ createElement(TrailItem, {
			...item,
			isFirst: index === 0,
			isLast: index + 1 === trail.length,
			rewindToFilter,
			index,
			key: item.within
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "vertical-trail-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("ul", {
				className: "vertical-trail",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Q, { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(le, {
					classNames: "explorer-item-animation",
					timeout: {
						exit: 750,
						enter: 200
					},
					exit: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("li", {
						className: "trail-item",
						children: getTrailItem()
					})
				}) })
			})
		});
	};
	VerticalTrail.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/explorer/detail/sidebar/ExplorerSidebar.jsx
/**
* ExplorerSidebar.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime$5, propTypes$4, ExplorerSidebar;
var init_ExplorerSidebar = __esmMin((() => {
	init_development();
	init_Analytics();
	init_Icons();
	init_QuarterPickerWithFY();
	init_VerticalTrail();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$4 = {
		fy: PropTypes.string,
		quarter: PropTypes.string,
		period: PropTypes.string,
		trail: PropTypes.object,
		setExplorerPeriod: PropTypes.func,
		rewindToFilter: PropTypes.func
	};
	ExplorerSidebar = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { showFYMenu: false };
			this._queuedAnalyticEvent = null;
			this.toggleFYMenu = this.toggleFYMenu.bind(this);
			this.logTimePeriodEvent = this.logTimePeriodEvent.bind(this);
			this.pickedYear = this.pickedYear.bind(this);
			this.pickedQuarter = this.pickedQuarter.bind(this);
		}
		toggleFYMenu() {
			this.setState({ showFYMenu: !this.state.showFYMenu });
		}
		logTimePeriodEvent(quarter, fiscalYear) {
			if (this._queuedAnalyticEvent) window.clearTimeout(this._queuedAnalyticEvent);
			this._queuedAnalyticEvent = window.setTimeout(() => {
				Analytics.event({
					event: "spending-explorer-time-period",
					category: "Spending Explorer - Time Period",
					action: `Q${quarter} FY${fiscalYear}`
				});
			}, 10 * 1e3);
		}
		pickedYear(year, period = null) {
			if (year >= 2020) {
				this.props.setExplorerPeriod({
					fy: `${year}`,
					period: `${period}`,
					quarter: null
				});
				this.logTimePeriodEvent(period, year);
			} else {
				this.props.setExplorerPeriod({
					fy: `${year}`,
					quarter: `4`,
					period: null
				});
				this.logTimePeriodEvent("4", year);
			}
			this.setState({ showFYMenu: false });
		}
		pickedQuarter(input) {
			let quarter = input;
			if (typeof input !== "string") quarter = `${input}`;
			this.logTimePeriodEvent(quarter, this.props.fy);
			if (this.props.fy >= 2020) this.props.setExplorerPeriod({
				period: quarter,
				fy: this.props.fy,
				quarter: null
			});
			else this.props.setExplorerPeriod({
				quarter,
				fy: this.props.fy,
				period: null
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "explorer-sidebar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "start-over",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Link, {
							className: "start-over-button",
							to: "/explorer",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
								className: "content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
									className: "icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Home, { alt: "Home" })
								}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
									className: "label",
									children: "Start Over"
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(QuarterPickerWithFY, {
						selectedFy: this.props.fy,
						handleQuarterPickerSelection: this.pickedQuarter,
						handlePickedYear: this.pickedYear,
						latestSelectedTimeInterval: this.props.period == null ? this.props.quarter : this.props.period
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(VerticalTrail, {
						trail: this.props.trail.toArray(),
						rewindToFilter: this.props.rewindToFilter
					})
				]
			});
		}
	};
	ExplorerSidebar.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/containers/explorer/detail/DetailContentContainer.jsx
/**
* DetailContentContainer.jsx
* Created by Kevin Li 8/16/17
*/
var import_immutable, import_jsx_runtime$4, trackSpendingEvent, propTypes$3, DetailContentContainer, DetailContentContainerWithSlugs;
var init_DetailContentContainer = __esmMin((() => {
	init_es();
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_dropdownScopes();
	init_explorerActions();
	init_Analytics();
	init_explorerHelper();
	init_useFetchBreakdown();
	init_DetailContent();
	init_ExplorerSidebar();
	init_WithAgencySlugs();
	import_jsx_runtime$4 = require_jsx_runtime();
	trackSpendingEvent = ({ event, category, action, label = false }) => Analytics.event({
		event: `Spending Explorer - ${event}`,
		category: `Spending Explorer - ${category || event}`,
		action,
		...label ? { label } : {}
	});
	propTypes$3 = {
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		error: PropTypes.bool
	};
	DetailContentContainer = ({ showTooltip, hideTooltip, error }) => {
		const { root, active, fy, period, quarter, trail } = useSelector((state) => state.explorer);
		const dispatch = useDispatch();
		const [data, setData] = useState(new import_immutable.List());
		const [lastUpdate, setLastUpdate] = useState("");
		const [transitionSteps, setTransitionSteps] = useState(0);
		const [isTruncated, setIsTruncated] = useState(false);
		const [transition, setTransition] = useState("");
		const [requestObj, setRequestObject] = useState({});
		const [rootLocal, setRootLocal] = useState(true);
		const [rewind, setRewind] = useState(false);
		const [params, setParams] = useState({});
		const { data: fetchData, loading } = useFetchBreakdown(params);
		const setActive = (state) => dispatch(setExplorerActive(state));
		const overwriteTrail = (state) => dispatch(overwriteExplorerTrail(state));
		const addTrail = (state) => dispatch(addExplorerTrail(state));
		const resetTable = () => dispatch(resetExplorerTable());
		const setPeriod = (state) => dispatch(setExplorerPeriod(state));
		const parseRootData = ({ total, results, end_date: endDate }) => {
			const activeScreen = {
				total,
				within: "root",
				subdivision: root
			};
			overwriteTrail([{
				total,
				within: "root",
				subdivision: root,
				title: "",
				id: ""
			}]);
			resetTable();
			const updateState = () => {
				setData(new import_immutable.List(results));
				setLastUpdate(endDate);
				setIsTruncated(false);
			};
			if (transitionSteps !== 0) {
				setTransition("start");
				setActive(activeScreen);
				updateState();
			} else {
				setActive(activeScreen);
				updateState();
				setTransition("");
			}
		};
		const parseData = ({ total, results, end_date: endDate }, request, isRewind) => {
			let truncated = false;
			let parsedResults = truncateDataForTreemap(results);
			if (request.subdivision === "award") parsedResults = parsedResults.map((obj) => ({
				...obj,
				id: encodeURIComponent(obj.generated_unique_award_id)
			}));
			if (request.subdivision === "award" || request.subdivision === "recipient") truncated = results.length > 500;
			if (truncated) parsedResults = appendCellForDataOutsideTree(parsedResults, total, request.subdivision).sort((a, b) => b.amount - a.amount);
			const trailItem = Object.assign({}, request, { total });
			if (request.within !== active.within && !isRewind) addTrail(trailItem);
			const activeScreen = {
				total,
				within: request.within,
				subdivision: request.subdivision,
				accountNumber: request.accountNumber || ""
			};
			const updateState = () => {
				setIsTruncated(truncated);
				setData(new import_immutable.List(parsedResults));
				setLastUpdate(endDate);
			};
			if (transitionSteps !== 0) {
				setTransition("start");
				setActive(activeScreen);
				updateState();
			} else {
				setActive(activeScreen);
				updateState();
				setTransition("");
			}
			trackSpendingEvent({
				event: "Data Type",
				action: request.subdivision
			});
		};
		useEffect(() => {
			if (fetchData?.results.length > 0) if (rootLocal) parseRootData(fetchData);
			else parseData(fetchData, requestObj, rewind);
		}, [
			rootLocal,
			fetchData,
			params,
			rewind,
			requestObj
		]);
		const prepareRootRequest = (rootType, newFy, newQuarter, newPeriod) => {
			const resetFilters = {
				fy: newFy,
				quarter: newQuarter,
				period: newPeriod
			};
			delete resetFilters.quarter;
			setRequestObject({
				within: "root",
				subdivision: rootType
			});
			setRootLocal(true);
			setRewind(false);
			setParams({
				type: rootType,
				filters: resetFilters
			});
			trackSpendingEvent({
				event: "Starting Point",
				action: rootType
			});
		};
		useEffect(() => {
			prepareRootRequest(root, fy, quarter, period);
		}, [
			root,
			fy,
			quarter,
			period
		]);
		const goDeeper = (id, { name, id: dataId, account_number: accountNumber, link }) => {
			if (loading) return;
			const filterBy = active.subdivision;
			if (filterBy === "award") {
				window.open(`/award/${id}`, "_blank");
				trackSpendingEvent({
					event: "Award Click Exit",
					category: "Exit",
					action: `/award/${id}`
				});
				return;
			}
			const newFilter = { [filterBy]: id };
			const path = dropdownScopes[root];
			const currentDepth = path.indexOf(active.subdivision);
			let nextSubdivision = path[currentDepth + 1];
			const accountDepth = path.indexOf("federal_account");
			const programActivityIndex = path.indexOf("program_activity");
			if (currentDepth >= accountDepth) {
				if (programActivityIndex === -1) {
					let index = 3;
					if (root === "agency") index = 2;
					path.splice(index, 0, "program_activity");
					if (currentDepth === index - 1) nextSubdivision = path[index];
				}
			}
			const request = {
				within: active.subdivision,
				subdivision: nextSubdivision,
				title: name,
				id: dataId,
				accountNumber: accountNumber || "",
				link
			};
			resetTable();
			setTransitionSteps(1);
			setRequestObject(request);
			setRootLocal(false);
			setRewind(false);
			setParams((prevState) => ({
				...prevState,
				type: request.subdivision,
				filters: Object.assign({}, prevState.filters, newFilter)
			}));
			trackSpendingEvent({
				event: "Drilldown",
				action: filterBy,
				label: `${name} - ${dataId}`
			});
		};
		const changeSubdivisionType = (type) => {
			const request = Object.assign({}, active.toJS(), { subdivision: type });
			resetTable();
			setTransitionSteps(0);
			setRequestObject(request);
			setRootLocal(false);
			setRewind(false);
			setParams((prevState) => ({
				...prevState,
				type
			}));
		};
		const rewindToFilter = (index) => {
			const trailJS = trail.toJS();
			const oldFilters = params.filters;
			if (index === trailJS.length - 1) return;
			const steps = index - (trailJS.length - 1);
			if (index === 0) {
				setTransitionSteps(steps);
				prepareRootRequest(root, fy, quarter, period);
				return;
			}
			const newFilters = {
				fy,
				quarter,
				period
			};
			const newTrail = [];
			for (let i = 0; i <= index; i++) {
				const filterType = trailJS[i].within;
				if (filterType !== "root") newFilters[filterType] = oldFilters[filterType];
				newTrail.push(trailJS[i]);
			}
			const isRoot = index === 0;
			const selectedTrailItem = trailJS[index];
			overwriteTrail(newTrail);
			resetTable();
			setTransitionSteps(steps);
			delete newFilters.quarter;
			setRequestObject(selectedTrailItem);
			setRootLocal(isRoot);
			setRewind(true);
			setParams({
				type: selectedTrailItem.subdivision,
				filters: newFilters
			});
		};
		const goToUnreported = (d) => {
			const dataArr = [d];
			const path = dropdownScopes[root];
			const currentSubdivision = path[path.indexOf(active.subdivision)];
			const trailDisplay = {
				within: active.subdivision,
				title: d.name,
				subdivision: currentSubdivision
			};
			let total;
			if (!d.obligated_amount) total = d.amount;
			else total = d.obligated_amount;
			const trailItem = Object.assign({}, trailDisplay, { total });
			addTrail(trailItem);
			const activeScreen = { total };
			setTransitionSteps(1);
			setTransition("start");
			setActive(activeScreen);
			setData(new import_immutable.List(dataArr));
			setLastUpdate((state) => state);
			resetTable();
		};
		useEffect(() => {
			if (transition === "start") window.setTimeout(() => setTransition("end"), 250);
		}, [transition]);
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "explorer-detail",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ExplorerSidebar, {
				fy,
				quarter,
				period,
				trail,
				setExplorerPeriod: setPeriod,
				rewindToFilter
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DetailContent, {
				isRoot: active.within === "root" || active.within === "",
				isLoading: loading || error,
				isTruncated,
				root,
				fy,
				active,
				trail: trail.toJS(),
				total: active.total,
				data,
				lastUpdate,
				transitionSteps,
				transition,
				goDeeper,
				changeSubdivisionType,
				showTooltip,
				hideTooltip,
				rewindToFilter,
				goToUnreported
			})]
		});
	};
	DetailContentContainer.propTypes = propTypes$3;
	DetailContentContainerWithSlugs = withAgencySlugs(DetailContentContainer);
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/ExplorerTooltip.jsx
/**
* ExplorerTooltip.jsx
* Created by Kevin Li 8/25/17
*/
var import_jsx_runtime$3, propTypes$2, ExplorerTooltip$1;
var init_ExplorerTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$2 = {
		y: PropTypes.number,
		x: PropTypes.number,
		name: PropTypes.string,
		amount: PropTypes.number,
		percent: PropTypes.number
	};
	ExplorerTooltip$1 = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				direction: "top",
				tooltipStyle: { transform: "" },
				windowWidth: 0,
				windowHeight: 0
			};
			this.measureWindow = this.measureWindow.bind(this);
		}
		componentDidMount() {
			this.measureWindow();
			window.addEventListener("resize", this.measureWindow);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) this.positionTooltip();
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWindow);
		}
		measureWindow() {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.setState({
				windowWidth,
				windowHeight
			}, () => {
				this.positionTooltip();
			});
		}
		positionTooltip() {
			const tooltipWidth = this.div.offsetWidth;
			let direction = "top";
			let adjustedX = this.props.x - tooltipWidth / 2;
			if (this.props.x + tooltipWidth >= this.state.windowWidth) {
				direction = "right";
				adjustedX = this.props.x - tooltipWidth - 20;
			}
			this.setState({
				direction,
				tooltipStyle: { transform: `translate(${adjustedX}px,${this.props.y}px)` }
			});
		}
		render() {
			const truncatedName = truncate(this.props.name, { length: 90 });
			const dollarValue = formatTreemapValues(this.props.amount);
			const percentString = `${Math.round(this.props.percent * 1e3) / 10}%`;
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "visualization-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: `tooltip ${this.state.direction}`,
					style: this.state.tooltipStyle,
					ref: (div) => {
						this.div = div;
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: `tooltip-pointer ${this.state.direction}` }),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "tooltip-title",
							children: truncatedName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "tooltip-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "tooltip-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "tooltip-value",
									children: dollarValue
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "tooltip-label",
									children: "Total Amount"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "tooltip-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "tooltip-value",
									children: percentString
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "tooltip-label",
									children: "Percent"
								})]
							})]
						})
					]
				})
			});
		}
	};
	ExplorerTooltip$1.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/explorer/detail/visualization/ExplorerAwardTooltip.jsx
/**
* ExplorerTooltip.jsx
* Created by Kevin Li 8/25/17
*/
var import_jsx_runtime$2, propTypes$1, ExplorerTooltip;
var init_ExplorerAwardTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = {
		y: PropTypes.number,
		x: PropTypes.number,
		name: PropTypes.string,
		amount: PropTypes.number,
		percent: PropTypes.number,
		total: PropTypes.number
	};
	ExplorerTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				direction: "top",
				tooltipStyle: { transform: "" },
				windowWidth: 0,
				windowHeight: 0
			};
			this.measureWindow = this.measureWindow.bind(this);
		}
		componentDidMount() {
			this.measureWindow();
			window.addEventListener("resize", this.measureWindow);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) this.positionTooltip();
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWindow);
		}
		measureWindow() {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.setState({
				windowWidth,
				windowHeight
			}, () => {
				this.positionTooltip();
			});
		}
		positionTooltip() {
			const tooltipWidth = this.div.offsetWidth;
			let direction = "top";
			let adjustedX = this.props.x - tooltipWidth / 2;
			if (this.props.x + tooltipWidth >= this.state.windowWidth) {
				direction = "right";
				adjustedX = this.props.x - tooltipWidth - 20;
			}
			this.setState({
				direction,
				tooltipStyle: { transform: `translate(${adjustedX}px,${this.props.y}px)` }
			});
		}
		render() {
			const dollarValue = formatMoney(this.props.amount);
			const totalDollar = formatTreemapValues(this.props.total);
			const percentString = `${Math.round(this.props.percent * 1e3) / 10}%`;
			let hideDisclaimer = "hide";
			if (this.props.amount !== this.props.total && this.props.name !== "Non-Award Spending") hideDisclaimer = "";
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "visualization-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: `tooltip ${this.state.direction}`,
					style: this.state.tooltipStyle,
					ref: (div) => {
						this.div = div;
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: `tooltip-pointer ${this.state.direction}` }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "tooltip-title",
							children: ["Award ID: ", this.props.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "tooltip-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "tooltip-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "tooltip-value",
									children: dollarValue
								}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "tooltip-label",
									children: "Total Amount"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "tooltip-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "tooltip-value",
									children: percentString
								}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "tooltip-label",
									children: "Percent"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: `disclaimer-total ${hideDisclaimer}`,
							children: [
								"The amount shown above is a portion of a larger award that is ",
								totalDollar,
								"."
							]
						})
					]
				})
			});
		}
	};
	ExplorerTooltip.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/explorer/detail/ExplorerDetailPage.jsx
/**
* ExplorerDetailPage.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime$1, ExplorerDetailPage;
var init_ExplorerDetailPage = __esmMin((() => {
	init_DetailContentContainer();
	init_ExplorerWrapperPage();
	init_ExplorerTooltip();
	init_ExplorerAwardTooltip();
	import_jsx_runtime$1 = require_jsx_runtime();
	ExplorerDetailPage = () => {
		const [showTooltip, setShowTooltip] = useState(false);
		const [tooltip, setTooltip] = useState({
			x: 0,
			y: 0,
			name: "",
			code: "",
			amount: 0,
			percent: 0,
			total: 0,
			isAward: false
		});
		const showTooltipFn = useCallback((position, data) => {
			setShowTooltip(true);
			setTooltip(Object.assign({}, position, data));
		}, []);
		const hideTooltipFn = useCallback(() => {
			setShowTooltip(false);
		}, []);
		let tooltipUi = null;
		if (showTooltip) {
			tooltipUi = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExplorerTooltip$1, { ...tooltip });
			if (tooltip.isAward) tooltipUi = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExplorerTooltip, { ...tooltip });
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExplorerWrapperPage, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "explorer-detail-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DetailContentContainerWithSlugs, {
				showTooltip: showTooltipFn,
				hideTooltip: hideTooltipFn
			}), tooltipUi]
		}) });
	};
}));
//#endregion
//#region src/js/containers/explorer/detail/ExplorerDetailPageContainer.jsx
/**
* ExplorerDetailPageContainer.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime, propTypes, ExplorerDetailPageContainer, ExplorerDetailPageContainer_default;
//#endregion
__esmMin((() => {
	init_redux();
	init_es();
	init_development();
	init_explorerActions();
	init_ExplorerDetailPage();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = { setExplorerRoot: PropTypes.func };
	ExplorerDetailPageContainer = (props) => {
		const history = useNavigate();
		const { root } = useMatch("/explorer/:root").params;
		const validateRoot = (rootValue) => {
			if (!rootValue || [
				"budget_function",
				"agency",
				"object_class"
			].indexOf(rootValue) === -1) history("/explorer", { replace: true });
			else props.setExplorerRoot(rootValue);
		};
		useEffect(() => {
			validateRoot(root);
		}, [root]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerDetailPage, {});
	};
	ExplorerDetailPageContainer.propTypes = propTypes;
	ExplorerDetailPageContainer_default = connect_default(null, (dispatch) => bindActionCreators(explorerActions_exports, dispatch))(ExplorerDetailPageContainer);
}))();
export { ExplorerDetailPageContainer_default as default };
