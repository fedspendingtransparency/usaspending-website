import { n as __esmMin, o as __toESM } from "./rolldown-runtime-D1cXj70v.js";
import { $a as init_GlobalConstants, $i as getAllDescendants, $r as cleanPscData, $t as updateSelectedFundingAgencies, A as init_downloadActions, Aa as useIsMobile, Ai as formatMoneyWithPrecision, Ar as ds, At as setAppliedFilterCompletion, Bi as init_searchFiltersReducer, Bn as init_Icons, Bt as toggleDefCode, Ca as init_awardType, Ci as recipientTypes, Da as IsMobileContext, Dn as Close, Dt as applyStagedFilters, Ea as require_immutable, Er as Wo, Fa as init_slideoutHelper, Ft as bulkDefCodeChange, Ga as useLocation, Gi as cleanNaicsData, Gn as init_queryParams, Gt as updateGenericFilter, H as require_lib, Ha as Link, Hi as initialStateDR, Hn as isCancel, Hr as tc, Ht as updateAwardAmounts, Ia as showSlideout, Ii as init_moneyFormatter, It as clearAllFilters, Ji as getAllUniqueAncestors, Jt as updatePSC, Ki as decrementNaicsCountAndUpdateUnchecked, Kr as FontAwesomeIcon, Kt as updateNaics, La as init_useQueryParams, Lr as rc, Lt as init_searchFilterActions, M as setDownloadPending, Mi as formatMoneyWithUnitsShortLabel, Mr as fo, Mt as addPOPLocationObject, Nr as init_index_es, Nt as addRecipientLocationObject, O as require_dayjs_min, Oa as init_IsMobileContext, Ot as init_appliedFilterActions, Pa as closeAllSlideouts, Pt as bulkAwardTypeChange, Qa as globalConstants, Qi as init_naicsHelper, Qr as autoCheckPscAfterExpand, Qt as updateSelectedCFDA, Ra as useQueryParams, Rt as searchFilterActions_exports, S as earliestFiscalYear, Si as recipientTypeGroups, T as init_fiscalYearHelper, Tn as CheckCircle, Ui as requiredTypes, Un as combineQueryParams, Ut as updateDomesticForeignSelection, Va as init_development, Vi as initialState, Vn as init_axios, Vr as ss, Vt as toggleRecipientType, Wi as autoCheckNaicsAfterExpand, Wn as getQueryParamString, Wt as updateExtentCompeted, Xi as getNaicsNodeFromTree, Xt as updateRecipientDomesticForeignSelection, Ya as useSearchParams, Yi as getFormatedNaicsDataForCheckboxTree, Yn as awardTypeTabs, Yt as updatePricingType, Zi as incrementNaicsCountAndUpdateUnchecked, Zt as updateSelectedAwardingAgencies, _n as AngleLeft, aa as setCounts, ai as getPscNodeFromTree, at as init_index_esm, ba as awardTypesData$1, bi as groupLabels, ca as setSearchedNodes, ci as autoCheckTasAfterExpand, cr as init_socialShare, ct as usePrevious, da as stateEqualityCheck, di as expandTasNodeAndAllDescendantParents, dn as init_apiRequest, do as init_modern, dr as Analytics, dt as AboutTheDataLink, ea as getUniqueAncestorPaths, ei as decrementPscCountAndUpdateUnchecked, en as updateSelectedRecipients, fa as trimCheckedToCommonAncestors, fi as getTasAncestryPathForChecked, fn as init_modalActions, fr as init_Analytics, ft as init_AboutTheDataLink, ga as awardTypeCodes, go as require_jsx_runtime, gr as $s, h as init_SearchAwardsOperation, ha as analyticsAwardTypeGroupLabels, hi as init_tasHelper, ho as useQueries, hr as init_js_cookie, ia as setChecked, ii as getPscAncestryPathForChecked, in as updateTimePeriod, io as useSelector, it as Q, j as setDownloadColumns, ja as init_mobileBreakpoints, jr as fc, jt as setAppliedFilterEmptiness, k as downloadActions_exports, ka as init_useIsMobile, kn as ExclamationTriangle, kt as resetAppliedFilters, l as init_downloadHelper, la as setUnchecked, li as cleanTasData, lo as bindActionCreators, lt as getAtdDefcText, m as SearchAwardsOperation, ma as init_awardAmount, mi as incrementTasCountAndUpdateUnchecked, mr as api, na as init_checkboxTreeHelper, nn as updateTAS, no as init_es, nr as init_covid19, oa as setExpanded, oi as incrementPscCountAndUpdateUnchecked, oo as useDispatch, or as getBaseUrl, ot as le, pa as awardRanges, pi as getTasNodeFromTree, pn as showModal, po as useQuery, qa as useNavigate, qi as expandNaicsAndAllDescendantParents, qr as init_dist, qt as updateNewAwardsOnlySelected, ra as removePlaceholderString, ri as expandPscNodeAndAllDescendantParents, rn as updateTextSearchInput, rr as mapFilterSortOrderByValue, sa as setNodes, si as init_pscHelper, sn as require_react_aria_modal, so as connect_default, sr as handleShareOptionClick, st as init_usePrevious, ta as handleNewCheckedIds, tn as updateSetAside, u as requestDownloadCount, ua as showTree, ui as decrementTasCountAndUpdateUnchecked, un as apiRequest, uo as init_redux, ut as init_aboutTheDataSidebarHelper, va as awardTypeGroups, vn as AngleRight, wa as subawardTypeGroups, wr as Qs, xi as init_recipientType, xr as Ka, y as currentFiscalYear, ya as awardTypeNewFCodes, yr as Go, zi as filterStoreVersion, zr as sc, zt as toggleAwardType } from "./index.js-Dk2VDaPz.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { n as Alert, r as init_Alert, t as require_searchPage } from "./searchPage-CwCEPtdc.js";
import { D as init_metaTagHelper, L as HelmetExport, R as init_Helmet, T as getSearchPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_Accordion, t as Accordion } from "./Accordion-C5PrszdX.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-g_gblR0b.js";
import { n as init_ResultsTableErrorMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-Cv27hSfO.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-BjdNP_oA.js";
import { t as require_commonjs } from "./commonjs-CBrKYqL5.js";
import { r as init_Note, t as Note } from "./Note-B_ZkRToa.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-CffoixM2.js";
import { n as init_DownloadButton508, t as DownloadIconButton508 } from "./DownloadButton508-CiKrpRMy.js";
import { a as fetchLocationList, c as init_mapHelper, f as stateCenterFromFips, i as calculateRange, l as mapboxSources, m as visualizationColors, n as useDefCodes, o as firstSymbolId, p as stateNameFromCode, t as init_WithDefCodes, u as performCountryGeocode } from "./WithDefCodes-BotSvVWk.js";
import { _ as MapBox, b as singleton, d as filtersOnClickHandler, f as init_map, g as init_MapFiltersToggle, h as MapFiltersToggle, i as init_covid19Helper, m as init_MapMessage, p as MapMessage, r as handleSort, u as advancedSearchFilters, v as init_MapBox, x as require_mapbox_gl, y as init_mapBroadcaster } from "./covid19Helper-B5EnUrHl.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-BnLVane6.js";
import { C as performSpendingByAwardTabCountSearch, D as performSpendingOverTimeSearch, E as performSpendingBySubawardGrouped, S as performSpendingByAwardSearch, _ as generateUrlHash, b as locationChipLabel, d as fetchFundingAgencies, f as fetchLocations, g as fetchTas, h as fetchRecipientsAutocomplete, i as areFiltersSelected, k as restoreUrlHash, l as fetchAwardingAgencies, m as fetchPsc, n as areFiltersEmpty, o as dateRangeChipLabel, r as areFiltersEqual, t as areFiltersDifferent, u as fetchCFDA, v as getObjFromQueryParams, w as performSpendingByCategorySearch, x as naicsRequest, y as init_searchHelper } from "./searchHelper-C3Qi4x1J.js";
import { i as stateFIPSByAbbreviation, n as init_stateNames, o as stateNameFromFips, r as stateAbbreviationFromFips, t as fipsIdByStateName } from "./stateNames-BSGQPQGh.js";
import { C as ShownValue, E as init_FilterTabs, S as init_AdvancedSearchTooltip, T as FilterTabs, _ as ContextTooltip, a as ResultsTableSection, b as init_TooltipContext, c as defaultColumns, d as awardTableColumnTypes, f as init_awardTableColumnTypes, g as init_TimePeriod, h as TimePeriod, i as transactionTypes, l as defaultSort, m as init_SpendingByCategoriesChart, n as subTypes, o as init_ResultsTableSection, p as SpendingByCategoriesChart, r as tableTypes, s as apiFieldByTableColumnName, t as init_table, u as init_awardTableColumns, v as init_ContextTooltip, w as init_ShownValue, x as KeyWordTooltip, y as TooltipContext } from "./table-Dh7qbSPz.js";
import { n as init_PrimaryCheckboxType, t as PrimaryCheckboxType } from "./PrimaryCheckboxType-BCayu9Ef.js";
import { c as ReferenceLine, g as ResponsiveContainer, i as YAxis, n as BarChart, o as XAxis, t as init_es6, u as Bar, v as Tooltip } from "./es6-BW27ShS6.js";
import { n as measureTableHeader, t as init_textMeasurement } from "./textMeasurement-Bf9kYCr1.js";
import { n as init_ViewTypeButton, t as ViewTypeButton } from "./ViewTypeButton-pGhfUL12.js";
import { n as init_ChartTableToggle, t as ChartTableToggle } from "./ChartTableToggle-C-JYfYia.js";
import { i as formatAwardAmountRange, n as subAwardIdClicked, o as init_awardAmountHelper, t as init_searchSubAwardTableActions } from "./searchSubAwardTableActions-C9jZIZnB.js";
import { a as init_defCodes, c as EntityDropdownAutocomplete, d as init_CheckboxItem, i as groupLabels$1, l as init_EntityDropdownAutocomplete, n as defCodes, o as AccordionCheckbox, r as defcDataByType, s as init_AccordionCheckbox, t as defCodeGroups, u as CheckboxItem } from "./defCodes-BFXHH3fy.js";
import { n as init_NoDownloadHover, t as NoDownloadHover } from "./NoDownloadHover-qhnAF3sM.js";
import { i as init_monthHelper, n as convertNumToShortMonth, r as convertPeriodToDate, t as convertMonthToFY } from "./monthHelper-D3-vpxXv.js";
import { a as MapFiltersTitle, c as init_MapLegend, i as init_GeoVisualizationTooltip, n as init_Autocomplete, o as init_MapFiltersTitle, r as GeoVisualizationTooltip, s as MapLegend, t as Autocomplete } from "./Autocomplete-BBz0yvae.js";
import React, { cloneElement, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { cloneDeep, concat, debounce, difference, filter, get, indexOf, intersection, keyBy, max, orderBy, reduce, slice, sortBy, throttle, toLower, uniq, uniqueId, upperFirst, words } from "lodash-es";
//#region src/js/redux/actions/search/searchHashActions.js
var restoreHashedFilters;
var init_searchHashActions = __esmMin((() => {
	restoreHashedFilters = (filters) => ({
		filters,
		type: "RESTORE_HASHED_FILTERS"
	});
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/newScreens/DownloadOption.jsx
var import_jsx_runtime$125, propTypes$93, DownloadOption;
var init_DownloadOption = __esmMin((() => {
	import_jsx_runtime$125 = require_jsx_runtime();
	propTypes$93 = {
		title: PropTypes.string,
		copy: PropTypes.string,
		count: PropTypes.string,
		checkboxId: PropTypes.string,
		toggleOption: PropTypes.func
	};
	DownloadOption = ({ title, copy, count, checkboxId, toggleOption }) => {
		const isEnabled = count <= 5e5 && count !== 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$125.jsxs)("div", {
			className: `download-item ${!isEnabled ? "disabled" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$125.jsxs)("div", {
				className: `download-item-top ${!isEnabled ? "disabled" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$125.jsxs)("label", {
					htmlFor: checkboxId,
					className: `download-item-title ${!isEnabled ? "disabled" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$125.jsx)("input", {
						type: "checkbox",
						id: checkboxId,
						disabled: !isEnabled,
						onKeyDown: (e) => e.key === "Enter" ? toggleOption() : "",
						onChange: () => toggleOption()
					}), title]
				}), /* @__PURE__ */ (0, import_jsx_runtime$125.jsx)("div", {
					className: `download-record-count ${!isEnabled ? "disabled" : ""}`,
					children: `${count?.toLocaleString()} ${count === "1" ? "record" : "records"}`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$125.jsx)("div", {
				className: `download-item-body ${!isEnabled ? "disabled" : ""}`,
				children: copy
			})]
		});
	};
	DownloadOption.propTypes = propTypes$93;
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/newScreens/DownloadWarning.jsx
var import_jsx_runtime$124, propTypes$92, DownloadWarning;
var init_DownloadWarning = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$124 = require_jsx_runtime();
	propTypes$92 = { message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]) };
	DownloadWarning = (props) => /* @__PURE__ */ (0, import_jsx_runtime$124.jsxs)("div", {
		className: "download-warning-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$124.jsx)(ExclamationTriangle, {}), props.message]
	});
	DownloadWarning.propTypes = propTypes$92;
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/newScreens/NewDownloadLevel.jsx
var import_jsx_runtime$123, propTypes$91, ITEM_MAX, NewDownloadLevel;
var init_NewDownloadLevel = __esmMin((() => {
	init_development();
	init_index_es();
	init_DownloadOption();
	init_DownloadWarning();
	import_jsx_runtime$123 = require_jsx_runtime();
	propTypes$91 = {
		goToStep: PropTypes.func,
		toggleDownloadType: PropTypes.func,
		hideModal: PropTypes.func,
		setDownloadType: PropTypes.func,
		awardsCount: PropTypes.number,
		transactionsCount: PropTypes.number,
		subawardsCount: PropTypes.number,
		downloadType: PropTypes.array
	};
	ITEM_MAX = 5e5;
	NewDownloadLevel = ({ goToStep, toggleDownloadType, hideModal, awardsCount, transactionsCount, subawardsCount, downloadType }) => {
		const clickedAward = () => {
			toggleDownloadType("awards");
		};
		const clickedTransaction = () => {
			toggleDownloadType("transactions");
		};
		const clickedSubawards = () => {
			toggleDownloadType("subawards");
		};
		let message = null;
		if (awardsCount > ITEM_MAX || transactionsCount > ITEM_MAX || subawardsCount > ITEM_MAX) message = /* @__PURE__ */ (0, import_jsx_runtime$123.jsxs)("span", {
			className: "download-warning-text",
			children: [
				"One or more options is not available for download because it exceeds the 500,000 record download limit. Please return to your search results and narrow them down by selecting additional filters; or try downloading the data by selecting new options from our ",
				/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(Link, {
					target: "_blank",
					rel: "noopener noreferrer",
					to: "/download_center/custom_award_data",
					children: "Custom Award Data"
				}),
				" page."
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$123.jsxs)("div", {
			className: "download-level-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)("div", {
					className: "main-title",
					children: /* @__PURE__ */ (0, import_jsx_runtime$123.jsx)("h3", { children: "Select one or more of the options below; each option needs to be under 500,000 records." })
				}),
				message && /* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(DownloadWarning, { message }),
				/* @__PURE__ */ (0, import_jsx_runtime$123.jsxs)("div", {
					className: "level-options-container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(DownloadOption, {
							title: "Awards",
							copy: "An award is money the federal government has promised to pay a recipient. This data provides summary-level information about the current status of an award in a single point in time.",
							count: awardsCount,
							toggleOption: clickedAward
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(DownloadOption, {
							title: "Transactions",
							copy: "A transaction can be the initial contract, grant, loan, or insurance award or any amendment or modification to that award. This data provides a time-based analysis that captures all monetary exchanges.",
							count: transactionsCount,
							toggleOption: clickedTransaction
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(DownloadOption, {
							title: "Sub-awards",
							copy: "A subaward refers to records of an agreement that a prime recipient makes with another entity to perform a portion of their award. This data provides a view of how money is exchanged between entities.\xA0",
							count: subawardsCount,
							toggleOption: clickedSubawards
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$123.jsxs)("div", {
					className: "level-options-note",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)("span", {
							className: "level-options-bold",
							children: "Note:"
						}),
						" The ",
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(Link, {
							target: "_blank",
							rel: "noopener noreferrer",
							to: "https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/transactions.md",
							children: "Transaction"
						}),
						" and ",
						/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(Link, {
							target: "_blank",
							rel: "noopener noreferrer",
							to: "https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/download/awards.md",
							children: "Award"
						}),
						" downloads endpoints both support the columns attribute which allow API users to select columns to include in their download package."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$123.jsxs)("div", {
					className: "download-button-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(sc, {
						className: "button-option",
						backgroundColor: "light",
						buttonSize: "sm",
						buttonTitle: "Cancel",
						onClick: hideModal,
						onKeyUp: (e) => {
							if (e.key === "Enter") hideModal();
						},
						buttonType: "text",
						copy: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime$123.jsx)(sc, {
						backgroundColor: "light",
						buttonSize: "sm",
						buttonTitle: "Next",
						buttonType: "primary",
						disabled: !downloadType?.length,
						copy: "Next",
						onClick: () => goToStep(2, true),
						onKeyUp: (e) => {
							if (e.key === "Enter") goToStep(2, true);
						}
					})]
				})
			]
		});
	};
	NewDownloadLevel.propTypes = propTypes$91;
}));
//#endregion
//#region src/js/dataMapping/search/contractFields.js
var pricingTypeDefinitions, setAsideDefinitions, extentCompetedDefinitions, extentCompetedTypeMapping, setAsideTypeMapping, pricingTypeMapping;
var init_contractFields = __esmMin((() => {
	pricingTypeDefinitions = {
		"2": "Combination",
		"S": "Cost No Fee",
		"R": "Cost Plus Award Fee",
		"U": "Cost Plus Fixed Fee",
		"V": "Cost Plus Incentive Fee",
		"T": "Cost Sharing",
		"J": "Firm Fixed Price",
		"M": "Fixed Price Award Fee",
		"L": "Fixed Price Incentive",
		"B": "Fixed Price Level of Effort",
		"A": "Fixed Price Redetermination",
		"K": "Fixed Price with Economic Price Adjustment",
		"Z": "Labor Hours",
		"1": "Order Dependent",
		"3": "Other",
		"Y": "Time and Materials"
	};
	setAsideDefinitions = {
		"8AN": "8(a) Sole Source",
		"HS3": "8(a) with HUBZone Preference",
		"8A": "8(a) Competed",
		"BI": "Buy Indian",
		"HS2Civ": "Combination HUBZone and 8(a)",
		"EDWOSB": "Economically-Disadvantaged Women-Owned Small Business",
		"EDWOSBSS": "Economically Disadvantaged Women Owned Small Business Sole Source",
		"ESB": "Emerging Small Business Set Aside",
		"HMP": "HBCU or MI Set Aside - Partial",
		"HMT": "HBCU or MI Set Aside - Total",
		"HZC": "HUBZone Set Aside",
		"HZS": "HUBZone Sole Source",
		"ISEE": "Indian Economic Enterprise",
		"ISBEE": "Indian Small Business Economic Enterprise",
		"NONE": "No Set Aside Used",
		"RSBCiv": "Reserved for Small Business $2,501 to $100K",
		"8ACCiv": "SDB Set Aside 8(a)",
		"SDVOSBS": "SDVOSB Sole Source",
		"SDVOSBC": "Service-Disabled Veteran-Owned Small Business Set Aside",
		"SBP": "Small Business Set Aside - Partial",
		"SBA": "Small Business Set Aside - Total",
		"VSBCiv": "Very Small Business Set Aside",
		"VSA": "Veteran Set Aside",
		"VSS": "Veteran Sole Source",
		"WOSB": "Women-Owned Small Business",
		"WOSBSS": "Women Owned Small Business Sole Source"
	};
	extentCompetedDefinitions = {
		"F": "Competed under SAP",
		"CDOCiv": "Competitive Delivery Order",
		"E Civ": "Follow On to Competed Action",
		"A": "Full and Open Competition",
		"D": "Full and Open Competition after exclusion of sources",
		"NDOCiv": "Non-Competitive Delivery Order",
		"B": "Not Available for Competition",
		"C": "Not Competed",
		"G": "Not Competed under SAP"
	};
	extentCompetedTypeMapping = [{
		id: "available-for-competition",
		name: "Available for Competition",
		filters: [
			"F",
			"CDOCiv",
			"E Civ",
			"A",
			"D"
		]
	}, {
		id: "not-available-for-competition",
		name: "Not Available for Competition",
		filters: [
			"NDOCiv",
			"B",
			"C",
			"G"
		]
	}];
	setAsideTypeMapping = [
		{
			id: "hbcu-mi",
			name: "Historically Black College/University (HBCU) or Minority Institution (MI)",
			filters: ["HMP", "HMT"]
		},
		{
			id: "hub-zone",
			name: "Historically Underutilized Business Zone Small Businesses (HUBZone)",
			filters: ["HZC", "HZS"]
		},
		{
			id: "naob",
			name: "Native American-Owned Businesses",
			filters: [
				"BI",
				"ISEE",
				"ISBEE"
			]
		},
		{
			id: "no-set-aside",
			name: "No Set Aside",
			filters: ["NONE"]
		},
		{
			id: "small-disadvantaged",
			name: "Small Disadvantaged Business and 8(a) Small Businesses",
			filters: [
				"8AN",
				"HS3",
				"8A",
				"HS2Civ",
				"ESB",
				"RSBCiv",
				"8ACCiv",
				"SBP",
				"SBA",
				"VSBCiv"
			]
		},
		{
			id: "vosb",
			name: "Veteran-Owned Businesses",
			filters: [
				"SDVOSBC",
				"SDVOSBS",
				"VSA",
				"VSS"
			]
		},
		{
			id: "wosb",
			name: "Women-Owned Small Businesses (WOSB)",
			filters: [
				"EDWOSBSS",
				"EDWOSB",
				"WOSBSS",
				"WOSB"
			]
		}
	];
	pricingTypeMapping = [
		{
			id: "combination",
			name: "Combination",
			filters: ["2"]
		},
		{
			id: "cost-reimbursement-contracts",
			name: "Cost Reimbursement Contracts",
			filters: [
				"S",
				"R",
				"U",
				"V",
				"T"
			]
		},
		{
			id: "fixed-price-contracts",
			name: "Fixed Price Contracts",
			filters: [
				"J",
				"M",
				"L",
				"B",
				"A",
				"K"
			]
		},
		{
			id: "labor-hours",
			name: "Labor Hours",
			filters: ["Z"]
		},
		{
			id: "order-dependent",
			name: "Order Dependent",
			filters: ["1"]
		},
		{
			id: "other",
			name: "Other",
			filters: ["3"]
		},
		{
			id: "time-and-materials",
			name: "Time and Materials",
			filters: ["Y"]
		}
	];
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/newScreens/DownloadFilterRow.jsx
/**
* DownloadFilterRow.jsx
* Created by JD House 3/20/26
*/
var import_jsx_runtime$122, propTypes$90, DownloadFilterRow;
var init_DownloadFilterRow = __esmMin((() => {
	init_ReadMore();
	init_awardType();
	init_recipientType();
	init_contractFields();
	init_defCodes();
	init_moneyFormatter();
	import_jsx_runtime$122 = require_jsx_runtime();
	propTypes$90 = { filter: PropTypes.object };
	DownloadFilterRow = ({ filter }) => {
		const [limit, setLimit] = useState(115);
		let formatted = null;
		const tdRef = useRef(null);
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);
		const handleResize = () => {
			const newWidth = window.innerWidth;
			if (windowWidth !== newWidth) setWindowWidth(newWidth);
		};
		useEffect(() => {
			handleResize();
			const checkOverflow = () => {
				const td = tdRef.current;
				if (td) {
					const clientWidth = td.clientWidth - 32;
					const strWidth = formatted.length;
					const maxWidth = Math.floor(clientWidth / 7.5);
					if (strWidth > maxWidth) setLimit(maxWidth);
				}
			};
			checkOverflow();
			window.addEventListener("resize", checkOverflow);
			return () => window.removeEventListener("resize", checkOverflow);
		}, [
			filter,
			windowWidth,
			formatted
		]);
		if (filter.name === "Award Description") formatted = filter.values;
		else if (filter.name === "Recipient Type") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${recipientTypes[filterTemp]}`;
				return `${recipientTypes[filterTemp]},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Place of Performance" || filter.name === "Recipient Location") {
			if (filter.scope === "foreign") formatted = "ALL FOREIGN LOCATIONS";
			else if (filter.scope === "all") {
				formatted = filter.values.map((filterTemp, i, row) => {
					if (i + 1 === row.length) return `${filterTemp.display.entity}:  ${filterTemp.display.title}`;
					return `${filterTemp.display.entity}:  ${filterTemp.display.title},`;
				});
				formatted = formatted.join(" ");
			}
		} else if (filter.name === "Disaster Emergency Fund Code (DEFC)") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${defCodes[filterTemp].title}`;
				return `${defCodes[filterTemp].title},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Award Type") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${awardTypeCodes[filterTemp]}`;
				return `${awardTypeCodes[filterTemp]},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Awarding Agency" || filter.name === "Funding Agency") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${filterTemp.toptier_agency.name}`;
				return `${filterTemp.toptier_agency.name},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Award Amount") {
			formatted = Object.entries(filter.values).map((filterTemp, i, row) => {
				if (i + 1 === row.length) {
					if (filterTemp[1][0] === null) return `${formatMoneyWithPrecision(filterTemp[1][1])} and below`;
					else if (filterTemp[1][1] === null) return `${formatMoneyWithPrecision(filterTemp[1][0])} and above`;
					return `${formatMoneyWithPrecision(filterTemp[1][0])} - ${formatMoneyWithPrecision(filterTemp[1][1])}`;
				}
				if (filterTemp[1][0] === null) return `${formatMoneyWithPrecision(filterTemp[1][1])} and below,`;
				else if (filterTemp[1][1] === null) return `${formatMoneyWithPrecision(filterTemp[1][0])} and above,`;
				return `${formatMoneyWithPrecision(filterTemp[1][0])} - ${formatMoneyWithPrecision(filterTemp[1][1])},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "NAICS") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${filterTemp.identifier} - ${filterTemp.naics_description} `;
				return `${filterTemp.identifier} - ${filterTemp.naics_description},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Treasury Account") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${filterTemp.tas_description} `;
				return `${filterTemp.tas_description},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "PSC") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${filterTemp.psc_description} `;
				return `${filterTemp.psc_description},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Type of Contract Pricing") {
			formatted = Object.values(filter.values).map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${pricingTypeDefinitions[filterTemp]}`;
				return `${pricingTypeDefinitions[filterTemp]},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Type of Set Aside") {
			formatted = Object.values(filter.values).map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${setAsideDefinitions[filterTemp]}`;
				return `${setAsideDefinitions[filterTemp]},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Extent Competed") {
			formatted = Object.values(filter.values).map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${extentCompetedDefinitions[filterTemp]}`;
				return `${extentCompetedDefinitions[filterTemp]},`;
			});
			formatted = formatted.join(" ");
		} else if (filter.name === "Assistance Listing") {
			formatted = filter.values.map((filterTemp, i, row) => {
				if (i + 1 === row.length) return `${filterTemp.identifier} | ${filterTemp.program_title}`;
				return `${filterTemp.identifier} | ${filterTemp.program_title},`;
			});
			formatted = formatted.join(" ");
		} else formatted = filter.values.join(", ");
		return /* @__PURE__ */ (0, import_jsx_runtime$122.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$122.jsxs)("th", { children: [filter.name, ":"] }), /* @__PURE__ */ (0, import_jsx_runtime$122.jsx)("td", {
			ref: tdRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$122.jsx)(ReadMore, {
				text: formatted,
				limit,
				openPrompt: "Show all",
				closePrompt: "Show less"
			})
		})] });
	};
	DownloadFilterRow.propTypes = propTypes$90;
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/newScreens/NewDownloadSummary.jsx
var import_jsx_runtime$121, propTypes$89, NewDownloadSummary;
var init_NewDownloadSummary = __esmMin((() => {
	init_index_es();
	init_DownloadFilterRow();
	import_jsx_runtime$121 = require_jsx_runtime();
	propTypes$89 = {
		beginDownload: PropTypes.func,
		hideModal: PropTypes.func,
		downloadData: PropTypes.object
	};
	NewDownloadSummary = ({ beginDownload = () => {}, hideModal, downloadData }) => {
		const startDownload = () => {
			if (beginDownload) beginDownload();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("div", {
			className: "download-level-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("div", {
					className: "main-title",
					children: /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("h3", { children: "Below is a summary of the file(s) based on your selections:" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("div", {
					className: "download-summary-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("p", {
						className: "download-summary__heading",
						children: "Download Summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("table", {
						className: "download-summary__details-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("th", { children: "Data Selections:" }), /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("td", { children: downloadData.selections.map(upperFirst).join(", ") })] }), downloadData.filters && downloadData.filters.map((filterGroup) => /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)(DownloadFilterRow, { filter: filterGroup }))] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("div", {
					className: "download-button-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)(sc, {
						className: "button-option",
						backgroundColor: "light",
						buttonSize: "sm",
						buttonTitle: "Cancel",
						onClick: hideModal,
						onKeyUp: (e) => {
							if (e.key === "Enter") hideModal();
						},
						buttonType: "text",
						copy: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)(sc, {
						backgroundColor: "light",
						buttonSize: "sm",
						buttonTitle: "Begin download",
						buttonType: "primary",
						copy: "Begin Download",
						onClick: () => startDownload(false),
						onKeyUp: (e) => {
							if (e.key === "Enter") startDownload(false);
						}
					})]
				})
			]
		});
	};
	NewDownloadSummary.propTypes = propTypes$89;
}));
//#endregion
//#region src/js/containers/search/modals/fullDownload/screens/newScreens/NewDownloadContainer.jsx
var import_jsx_runtime$120, propTypes$88, NewDownloadContainer, NewDownloadContainer_default;
var init_NewDownloadContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_downloadActions();
	init_NewDownloadLevel();
	init_NewDownloadSummary();
	import_jsx_runtime$120 = require_jsx_runtime();
	propTypes$88 = {
		download: PropTypes.object,
		step: PropTypes.number,
		goToStep: PropTypes.func,
		toggleDownloadType: PropTypes.func,
		beginDownload: PropTypes.func,
		downloadData: PropTypes.object,
		awardsCount: PropTypes.number,
		transactionsCount: PropTypes.number,
		subawardsCount: PropTypes.number,
		content: PropTypes.element,
		downloadType: PropTypes.array
	};
	NewDownloadContainer = (props) => {
		if (props.step === 2) return /* @__PURE__ */ (0, import_jsx_runtime$120.jsx)(NewDownloadSummary, { ...props });
		else if (props.step === 3) return props.content;
		return /* @__PURE__ */ (0, import_jsx_runtime$120.jsx)(NewDownloadLevel, { ...props });
	};
	NewDownloadContainer.propTypes = propTypes$88;
	NewDownloadContainer_default = connect_default((state) => ({ download: state.download }), (dispatch) => bindActionCreators(downloadActions_exports, dispatch))(NewDownloadContainer);
}));
//#endregion
//#region src/js/containers/search/topFilterBar/getFilters.js
var import_dayjs_min, getFilters;
var init_getFilters = __esmMin((() => {
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
	init_fiscalYearHelper();
	init_awardType();
	getFilters = (filters) => {
		const prepareSelectedDefCodes = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.defCode?.count() > 0) {
				selected = true;
				filter.code = "defCodes";
				filter.name = "Disaster Emergency Fund Code (DEFC)";
				filter.values = filters.defCode?.toArray();
			}
			if (selected) return filter;
			return null;
		};
		/**
		* Logic for parsing the current Redux time filter into a JS object that can be parsed by the
		* top filter bar
		*/
		const prepareTimeFilter = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.timePeriodType === "fy") {
				if (filters.timePeriodFY?.size > 0) {
					selected = true;
					filter.code = "timePeriodFY";
					filter.name = "Time Period";
					filter.values = orderBy(filters.timePeriodFY.toArray(), [], ["desc"]);
				}
			} else if (filters?.timePeriodType === "dr") {
				if (filters.time_period.size > 0) {
					selected = true;
					filter.code = "timePeriodDR";
					filter.name = "Time Period";
					for (const period of filters.time_period) {
						let startString;
						let endString;
						if (period.start_date) startString = (0, import_dayjs_min.default)(period.start_date, "YYYY-MM-DD").format("MM/DD/YYYY");
						if (period.end_date) endString = (0, import_dayjs_min.default)(period.end_date, "YYYY-MM-DD").format("MM/DD/YYYY");
						if (period.start_date && period.end_date) filter.values.push([`${startString} to ${endString}`]);
						else if (period.start_date) filter.values.push([`${startString} to present`]);
						else if (period.end_date) filter.values.push([`... to ${endString}`]);
					}
				}
			}
			if (selected) return filter;
			return null;
		};
		/**
		* Logic for parsing the current Redux newAwardsOnly filter into a
		* JS object that can be parsed by the top filter bar
		*/
		const prepareNewAwardsOnly = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.newAwardsOnly) {
				selected = true;
				filter.values = true;
			}
			if (selected) {
				filter.code = "newAwardsOnly";
				filter.name = null;
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux keyword filter into a JS object that can be parsed by the
		* top filter bar
		*/
		const prepareKeywords = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.keyword && filters.keyword?.size > 0) {
				selected = true;
				filter.values = filters.keyword?.toArray();
			}
			if (selected) {
				filter.code = "keyword";
				filter.name = "Keyword";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux award type filter into a JS object that can be parsed by
		* the top filter bar
		*/
		const prepareAwardTypes = () => {
			let selected = false;
			const filter = {};
			if (filters?.awardType?.count() > 0) {
				selected = true;
				filter.code = "awardType";
				filter.name = "Award Type";
				const awardTypeFilters = filters.awardType?.toArray();
				let cleanedFilters = [];
				if (awardTypeFilters?.length) cleanedFilters = awardTypeFilters.filter((key) => key.indexOf("F0") !== 0);
				filter.values = cleanedFilters;
			}
			if (selected) return filter;
			return null;
		};
		/**
		* Logic for parsing the current Redux selected locations and location scope into a JS object
		* that can be parsed by the top filter bar
		*/
		const prepareSelectedLocations = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.selectedLocations?.count() > 0) {
				selected = true;
				filter.values = filters.selectedLocations.toArray();
				filter.scope = filters.locationDomesticForeign;
			}
			if (filters?.locationDomesticForeign && filters.locationDomesticForeign !== "all") {
				selected = true;
				filter.scope = filters.locationDomesticForeign;
				filter.values.push({ isScope: true });
			}
			if (selected) {
				filter.code = "selectedLocations";
				filter.name = "Place of Performance";
				return filter;
			}
			return null;
		};
		const prepareTreasuryAccounts = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.treasuryAccounts && filters.treasuryAccounts?.count() > 0) {
				selected = true;
				filter.values = Object.keys(filters.treasuryAccounts?.toObject());
			}
			if (filters?.tasCodes?.require.length > 0) {
				selected = true;
				filter.values = [...filter.values, ...filters.tasCodes?.counts.map((tas) => ({
					...tas,
					isCheckbox: true,
					tas_description: `${tas.label} (${tas?.count})`
				}))];
			}
			if (selected) {
				filter.code = "treasuryAccounts";
				filter.name = "Treasury Account";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected Awarding and Funding Agencies into a JS object
		* that can be parsed by the top filter bar
		*/
		const prepareAgencies = (type) => {
			let selected = false;
			const filter = { values: [] };
			if (type === "funding") {
				if (filters?.selectedFundingAgencies?.count() > 0) {
					selected = true;
					filter.values = filters.selectedFundingAgencies.toArray();
				}
				if (selected) {
					filter.code = "selectedFundingAgencies";
					filter.name = "Funding Agency";
					return filter;
				}
			} else if (filters?.selectedAwardingAgencies?.count() > 0) {
				selected = true;
				filter.values = filters.selectedAwardingAgencies.toArray();
				if (selected) {
					filter.code = "selectedAwardingAgencies";
					filter.name = "Awarding Agency";
					return filter;
				}
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected Recipients into a JS object
		* that can be parsed by the top filter bar
		*/
		const prepareRecipients = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.selectedRecipients?.count() > 0) {
				selected = true;
				filter.values = filters.selectedRecipients.toArray();
			}
			if (selected) {
				filter.code = "selectedRecipients";
				filter.name = "Recipient";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected Recipient Locations and Recipient Location
		* Scope into a JS object that can be parsed by the top filter bar
		*/
		const prepareRecipientLocations = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.selectedRecipientLocations?.count() > 0) {
				selected = true;
				filter.values = filters.selectedRecipientLocations.toArray();
				filter.scope = filters.recipientDomesticForeign;
			}
			if (filters?.recipientDomesticForeign && filters.recipientDomesticForeign !== "all") {
				selected = true;
				filter.scope = filters.recipientDomesticForeign;
				filter.values.push({ isScope: true });
			}
			if (selected) {
				filter.code = "selectedRecipientLocations";
				filter.name = "Recipient Location";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux recipient type filter into a JS object that can
		* be parsed by the top filter bar
		*/
		const prepareRecipientTypes = () => {
			let selected = false;
			const filter = {};
			if (filters?.recipientType?.count() > 0) {
				selected = true;
				filter.code = "recipientType";
				filter.name = "Recipient Type";
				filter.values = filters.recipientType.toArray();
			}
			if (selected) return filter;
			return null;
		};
		/**
		* Logic for parsing the current Redux selected Award IDs
		* Scope into a JS object that can be parsed by the top filter bar
		*/
		const prepareAwardIDs = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.selectedAwardIDs?.count() > 0) {
				selected = true;
				filter.values = filters.selectedAwardIDs.toArray();
			}
			if (selected) {
				filter.code = "selectedAwardIDs";
				filter.name = "Award ID";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected Award Amounts
		* Scope into a JS object that can be parsed by the top filter bar
		*/
		const prepareAwardAmounts = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.awardAmounts?.count() > 0) {
				selected = true;
				filter.values = filters.awardAmounts?.toObject();
			}
			if (selected) {
				filter.code = "awardAmounts";
				filter.name = "Award Amount";
				return filter;
			}
			return null;
		};
		const preparePricingType = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.pricingType?.count() > 0) {
				selected = true;
				filter.values = filters.pricingType?.toObject();
			}
			if (selected) {
				filter.code = "pricingType";
				filter.name = "Type of Contract Pricing";
				return filter;
			}
			return null;
		};
		const prepareSetAside = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.setAside?.count() > 0) {
				selected = true;
				filter.values = filters.setAside?.toObject();
			}
			if (selected) {
				filter.code = "setAside";
				filter.name = "Type of Set Aside";
				return filter;
			}
			return null;
		};
		const preparedExtentCompeted = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.extentCompeted?.count() > 0) {
				selected = true;
				filter.values = filters.extentCompeted?.toObject();
			}
			if (selected) {
				filter.code = "extentCompeted";
				filter.name = "Extent Competed";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected CFDA into a JS object
		* that can be parsed by the top filter bar
		*/
		const prepareCFDA = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.selectedCFDA?.count() > 0) {
				selected = true;
				filter.values = filters.selectedCFDA.toArray();
			}
			if (selected) {
				filter.code = "selectedCFDA";
				filter.name = "Assistance Listing";
				return filter;
			}
			return null;
		};
		/**
		* Logic for parsing the current Redux selected NAICS into a JS object
		* that can be parsed by the top filter bar
		*/
		const prepareNAICS = () => {
			if (filters?.naicsCodes?.require.length > 0) return {
				code: "selectedNAICS",
				name: "NAICS",
				values: filters.naicsCodes?.counts.map((naics) => ({
					...naics,
					identifier: naics.value,
					naics_description: `${naics.label} (${naics?.count})`
				}))
			};
			return null;
		};
		/**
		* Logic for parsing the current Redux selected PSC into a JS object
		* that can be parsed by the top filter bar
		*/
		const preparePSC = () => {
			let selected = false;
			const filter = { values: [] };
			if (filters?.pscCodes?.require.length > 0) {
				selected = true;
				filter.values = [...filter.values, ...filters.pscCodes?.counts.map((psc) => ({
					...psc,
					psc_description: `${psc.value} (${psc?.count})`
				}))];
			}
			if (selected) {
				filter.code = "selectedPSC";
				filter.name = "PSC";
				return filter;
			}
			return null;
		};
		const determineFYCount = (count) => {
			if (count === currentFiscalYear() - 2008 + 1) return 1;
			return count;
		};
		const determineAwardTypeCount = (values) => {
			const fullGroups = [];
			[
				"contracts",
				"grants",
				"direct_payments",
				"loans",
				"idvs",
				"other"
			].forEach((key) => {
				if (difference(awardTypeGroups[key].filter((code) => code.indexOf("F0") !== 0), values).length === 0) fullGroups.push(key);
			});
			let awardTypeCount = 0;
			let excludedValues = [];
			fullGroups.forEach((group) => {
				awardTypeCount += 1;
				excludedValues = concat(excludedValues, awardTypeGroups[group]);
			});
			values.forEach((value) => {
				if (indexOf(excludedValues, value) < 0) awardTypeCount += 1;
			});
			return awardTypeCount;
		};
		/**
		* Determine the current number of filters that have been applied
		*/
		const determineFilterCount = (filterObj) => {
			let filterCount = 0;
			filterObj.forEach((filter) => {
				if (filter.code === "timePeriodFY") filterCount += determineFYCount(filter.values.length);
				else if (filter.code === "awardType") filterCount += determineAwardTypeCount(filter.values);
				else if (typeof filter.values === "string") filterCount += 1;
				else if (filter.values instanceof Array) filterCount += filter.values.length;
				else filterCount += Object.keys(filter.values).length;
			});
			return filterCount;
		};
		/**
		* Convert the Redux filter data into JS objects
		*/
		const prepareFilters = () => {
			const filterArray = [];
			if (filters?.awardDescription) filterArray.push({
				code: "description",
				name: "Award Description",
				values: filters.awardDescription
			});
			const keywordFilters = prepareKeywords();
			if (keywordFilters) filterArray.push(keywordFilters);
			const timeFilters = prepareTimeFilter();
			if (timeFilters) filterArray.push(timeFilters);
			const newAwardOnlyFilters = prepareNewAwardsOnly();
			if (newAwardOnlyFilters) filterArray.push(newAwardOnlyFilters);
			const awardFilters = prepareAwardTypes();
			if (awardFilters) filterArray.push(awardFilters);
			const selectedLocationFilters = prepareSelectedLocations();
			if (selectedLocationFilters) filterArray.push(selectedLocationFilters);
			const selectedFundingAgencyFilters = prepareAgencies("funding");
			if (selectedFundingAgencyFilters) filterArray.push(selectedFundingAgencyFilters);
			const selectedAwardingAgencyFilters = prepareAgencies("awarding");
			if (selectedAwardingAgencyFilters) filterArray.push(selectedAwardingAgencyFilters);
			const selectedRecipientFilters = prepareRecipients();
			if (selectedRecipientFilters) filterArray.push(selectedRecipientFilters);
			const selectedRecipientLocationFilters = prepareRecipientLocations();
			if (selectedRecipientLocationFilters) filterArray.push(selectedRecipientLocationFilters);
			const recipientTypeFilters = prepareRecipientTypes();
			if (recipientTypeFilters) filterArray.push(recipientTypeFilters);
			const selectedTreasuryAccountFilters = prepareTreasuryAccounts();
			if (selectedTreasuryAccountFilters) filterArray.push(selectedTreasuryAccountFilters);
			const selectedAwardIDFilters = prepareAwardIDs();
			if (selectedAwardIDFilters) filterArray.push(selectedAwardIDFilters);
			const awardAmounts = prepareAwardAmounts();
			if (awardAmounts) filterArray.push(awardAmounts);
			const selectedCFDA = prepareCFDA();
			if (selectedCFDA) filterArray.push(selectedCFDA);
			const selectedNAICS = prepareNAICS();
			if (selectedNAICS) filterArray.push(selectedNAICS);
			const selectedPSC = preparePSC();
			if (selectedPSC) filterArray.push(selectedPSC);
			const pricingTypes = preparePricingType();
			if (pricingTypes) filterArray.push(pricingTypes);
			const setAside = prepareSetAside();
			if (setAside) filterArray.push(setAside);
			const extentCompeted = preparedExtentCompeted();
			if (extentCompeted) filterArray.push(extentCompeted);
			const selectedDefCodes = prepareSelectedDefCodes();
			if (selectedDefCodes) filterArray.push(selectedDefCodes);
			return {
				filters: filterArray,
				filterCount: determineFilterCount(filterArray)
			};
		};
		return prepareFilters();
	};
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/screens/NewDownloadProgress.jsx
/**
* NewDownloadProgress.jsx
* Created by Nick Torres 5/8/2026
*/
var import_lib, import_jsx_runtime$119, propTypes$87, NewDownloadProgress;
var init_NewDownloadProgress = __esmMin((() => {
	import_lib = require_lib();
	init_Icons();
	import_jsx_runtime$119 = require_jsx_runtime();
	propTypes$87 = {
		setDownloadCollapsed: PropTypes.func,
		expectedUrl: PropTypes.string
	};
	NewDownloadProgress = ({ expectedUrl, setDownloadCollapsed }) => {
		const [copied, setCopied] = useState(false);
		useEffect(() => {
			setDownloadCollapsed(true);
		}, [setDownloadCollapsed]);
		const onCopy = useCallback(() => {
			setCopied(true);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("div", {
			className: "download-progress-screen",
			children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsxs)("div", {
				className: "main-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("div", {
						className: "details",
						children: "This may take a little while — wait times vary based on site traffic and file size."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$119.jsxs)("div", {
						className: "link-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("p", { children: "Action Required: Once your download is ready, the link below is required to access your file. Be sure to copy your link; this download link is temporary and will expire." }),
							/* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("div", {
								className: "link",
								children: expectedUrl
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$119.jsx)(import_lib.CopyToClipboard, {
								text: expectedUrl,
								onCopy,
								children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsxs)("button", { children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("div", {
									className: "icon valid",
									children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)(CheckCircle, {})
								}) }) : null, copied ? "Copied" : "Copy Link"] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("div", {
						className: "sub-details",
						children: "To keep browsing, copy the download link and close this window; your download status will appear at the bottom of the screen."
					})
				]
			})
		});
	};
	NewDownloadProgress.propTypes = propTypes$87;
}));
//#endregion
//#region src/js/redux/actions/search/spendingLevelActions.js
var setSpendingLevelDownload;
var init_spendingLevelActions = __esmMin((() => {
	setSpendingLevelDownload = (state) => ({
		type: "SET_SPENDING",
		value: state
	});
}));
//#endregion
//#region src/js/components/search/modals/fullDownload/NewDownloadModal.jsx
/**
* NewDownloadModal.jsx
* Created by Nick Torres 2/27/26
*/
var import_react_aria_modal, import_jsx_runtime$118, propTypes$86, NewDownloadModal;
var init_NewDownloadModal = __esmMin((() => {
	import_react_aria_modal = /* @__PURE__ */ __toESM(require_react_aria_modal(), 1);
	init_es();
	init_dist();
	init_downloadActions();
	init_NewDownloadContainer();
	init_usePrevious();
	init_getFilters();
	init_NewDownloadProgress();
	init_spendingLevelActions();
	import_jsx_runtime$118 = require_jsx_runtime();
	propTypes$86 = {
		mounted: PropTypes.bool,
		download: PropTypes.object,
		hideModal: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		pendingDownload: PropTypes.bool,
		awardsCount: PropTypes.number,
		transactionsCount: PropTypes.number,
		subawardsCount: PropTypes.number
	};
	NewDownloadModal = (props) => {
		const [downloadStep, setDownloadStep] = useState(1);
		const [downloadType, setDownloadType] = useState([]);
		const prevProps = usePrevious(props);
		const dispatch = useDispatch();
		const resetModal = useCallback(() => {
			setDownloadStep(1);
			setDownloadType([]);
			props.hideModal();
		}, [props]);
		let content = null;
		const reduxFilters = useSelector((state) => state.appliedFilters.filters);
		const { filters } = useMemo(() => getFilters(reduxFilters), [reduxFilters]);
		useEffect(() => {
			if (!props?.pendingDownload && prevProps?.pendingDownload) resetModal();
		}, [
			prevProps?.pendingDownload,
			props?.pendingDownload,
			resetModal
		]);
		const hideModal = useCallback(() => {
			if (downloadStep === 3 || props.pendingDownload) {
				props.setDownloadCollapsed(true);
				props.hideModal();
				return;
			}
			resetModal(1);
		}, [
			downloadStep,
			props,
			resetModal
		]);
		const goToStep = useCallback((step, override = false) => {
			if (step >= downloadStep && !override) return;
			setDownloadStep(step);
		}, [downloadStep]);
		const toggleDownloadType = (type) => {
			setDownloadType((prevState) => {
				if (downloadType.includes(type)) return prevState.filter((str) => str !== type);
				return [...prevState, type];
			});
		};
		const beginDownload = useCallback(() => {
			dispatch(setSpendingLevelDownload(downloadType));
			dispatch(setDownloadColumns([]));
			dispatch(setDownloadPending(true));
			goToStep(3, true);
		}, [dispatch, goToStep]);
		let headerContent = "Step 1 of 2: Select which data you'd like to download";
		let downloadData = {};
		if (downloadStep === 2) {
			headerContent = "Step 2 of 2: Review and begin download";
			downloadData = {
				selections: downloadType,
				filters
			};
			if (downloadType.includes("subawards")) downloadData = {
				...downloadData,
				filters
			};
		} else if (downloadStep === 3) {
			headerContent = "We're preparing your download.";
			content = /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)(NewDownloadProgress, {
				hideModal,
				download: props.download,
				setDownloadCollapsed: props.setDownloadCollapsed,
				expectedUrl: props.download.expectedUrl
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)(import_react_aria_modal.default, {
			mounted: props.mounted,
			onExit: hideModal,
			titleText: "Additional Options",
			dialogClass: "search-section-new-download-modal",
			verticallyCenter: true,
			escapeExits: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$118.jsxs)("div", {
				className: "new-full-download-modal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("div", {
					className: "download-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime$118.jsxs)("div", {
						className: "header-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("h1", {
							className: "modal__header",
							children: headerContent
						}), /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("div", {
							className: "close-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)(FontAwesomeIcon, {
								tabIndex: 0,
								className: "close-button",
								onClick: hideModal,
								"aria-label": "Close",
								icon: "xmark"
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("div", {
					className: "download-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)(NewDownloadContainer_default, {
						goToStep,
						hideModal,
						step: downloadStep,
						awardsCount: props.awardsCount,
						transactionsCount: props.transactionsCount,
						subawardsCount: props.subawardsCount,
						downloadData,
						toggleDownloadType,
						beginDownload,
						downloadType,
						content
					})
				})]
			})
		});
	};
	NewDownloadModal.propTypes = propTypes$86;
}));
//#endregion
//#region src/js/containers/search/modals/fullDownload/FullDownloadModalContainer.jsx
/**
* FullDownloadModalContainer.jsx
* Created by Kevin Li 8/4/17
*/
var import_jsx_runtime$117, propTypes$85, FullDownloadModalContainer, FullDownloadModalContainer_default;
var init_FullDownloadModalContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_downloadActions();
	init_NewDownloadModal();
	import_jsx_runtime$117 = require_jsx_runtime();
	propTypes$85 = {
		mounted: PropTypes.bool,
		hideModal: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		pendingDownload: PropTypes.bool,
		download: PropTypes.object,
		awardsCount: PropTypes.number,
		transactionsCount: PropTypes.number,
		subawardsCount: PropTypes.number
	};
	FullDownloadModalContainer = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$117.jsx)(NewDownloadModal, {
				setDownloadCollapsed: this.props.setDownloadCollapsed,
				pendingDownload: this.props.pendingDownload,
				download: this.props.download,
				mounted: this.props.mounted,
				hideModal: this.props.hideModal,
				awardsCount: this.props.awardsCount,
				subawardsCount: this.props.subawardsCount,
				transactionsCount: this.props.transactionsCount
			});
		}
	};
	FullDownloadModalContainer.propTypes = propTypes$85;
	FullDownloadModalContainer_default = connect_default((state) => ({
		pendingDownload: state.download.pendingDownload,
		download: state.download
	}), (dispatch) => bindActionCreators(downloadActions_exports, dispatch))(FullDownloadModalContainer);
}));
//#endregion
//#region src/js/components/search/topFilterBar/TopFilterItem.jsx
var import_jsx_runtime$116, propTypes$84, TopFilterItem;
var init_TopFilterItem = __esmMin((() => {
	init_dist();
	import_jsx_runtime$116 = require_jsx_runtime();
	propTypes$84 = {
		title: PropTypes.string.isRequired,
		toggleFilter: PropTypes.func,
		staged: PropTypes.bool,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		resultsView: PropTypes.bool
	};
	TopFilterItem = ({ title = "Filter", toggleFilter, staged, value, resultsView }) => {
		const onClick = () => {
			if (resultsView) if (value) toggleFilter(value, staged);
			else toggleFilter();
		};
		const onKeyUp = (e) => {
			e.persist();
			if (e.key === "Enter") onClick();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$116.jsx)("div", {
			className: "filter-item-container",
			role: "listitem",
			children: /* @__PURE__ */ (0, import_jsx_runtime$116.jsx)("button", {
				onClick,
				onKeyUp,
				type: "button",
				"aria-label": title,
				className: `filter-item${staged ? "" : " unstaged"}`,
				value: title,
				tabIndex: "0",
				children: /* @__PURE__ */ (0, import_jsx_runtime$116.jsxs)("div", {
					className: "filter-item-title",
					children: [title, resultsView && /* @__PURE__ */ (0, import_jsx_runtime$116.jsx)(FontAwesomeIcon, {
						icon: staged ? "times" : "plus",
						className: "filter-item-icon"
					})]
				})
			})
		});
	};
	TopFilterItem.propTypes = propTypes$84;
}));
//#endregion
//#region src/js/components/search/topFilterBar/BaseTopFilterGroup.jsx
var import_jsx_runtime$115, propTypes$83, BaseTopFilterGroup;
var init_BaseTopFilterGroup = __esmMin((() => {
	init_TopFilterItem();
	import_jsx_runtime$115 = require_jsx_runtime();
	propTypes$83 = {
		name: PropTypes.string,
		tags: PropTypes.array,
		resultsView: PropTypes.bool
	};
	BaseTopFilterGroup = ({ name, tags = [], resultsView }) => {
		const tagsArray = tags.map(({ title, toggleFilter, staged, value }) => /* @__PURE__ */ (0, import_jsx_runtime$115.jsx)(TopFilterItem, {
			resultsView,
			title,
			toggleFilter,
			staged,
			value
		}, `top-tag-${title}-${uniqueId()}`));
		return /* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("div", {
			className: "filter-group-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$115.jsxs)("div", {
				className: "filter-group",
				role: "group",
				"aria-label": name,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("div", {
					className: "filter-group-top",
					children: /* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("div", {
						className: "filter-name",
						children: name
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("div", {
					className: "filter-group-bottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("div", {
						className: "filter-values",
						role: "list",
						children: tagsArray
					})
				})]
			})
		});
	};
	BaseTopFilterGroup.propTypes = propTypes$83;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/useNewAwardsOnly.jsx
var propTypes$82, useNewAwardsOnly;
var init_useNewAwardsOnly = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	propTypes$82 = { name: PropTypes.string };
	useNewAwardsOnly = () => {
		const dispatch = useDispatch();
		const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
		const newAwards = useSelector((state) => state.filters.filterNewAwardsOnlySelected);
		const newAwardsApplied = useSelector((state) => state.appliedFilters.filters.filterNewAwardsOnlySelected);
		const toggleFilter = (value) => {
			dispatch(updateNewAwardsOnlySelected(!value));
		};
		if (spendingLevel === "subawards") return null;
		return newAwardsApplied && {
			value: newAwards,
			title: "Show New Awards Only",
			toggleFilter,
			staged: newAwards
		};
	};
	useNewAwardsOnly.propTypes = propTypes$82;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/TimePeriodFYFilterGroup.jsx
/**
* TimePeriodFYGroup.jsx
* Created by Kevin Li 1/24/17
*/
var import_immutable$4, import_jsx_runtime$114, propTypes$81, TimePeriodFYFilterGroup;
var init_TimePeriodFYFilterGroup = __esmMin((() => {
	init_es();
	import_immutable$4 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	init_useNewAwardsOnly();
	import_jsx_runtime$114 = require_jsx_runtime();
	propTypes$81 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	TimePeriodFYFilterGroup = ({ name, resultsView }) => {
		const timePeriodFY = useSelector((state) => state.filters.timePeriodFY);
		const appliedTimePeriodFY = useSelector((state) => state.appliedFilters.filters.timePeriodFY);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? timePeriodFY.delete(value) : timePeriodFY.add(value);
			const newStateValue = newValue?.size ? newValue : new import_immutable$4.Set();
			dispatch(updateTimePeriod({
				fy: newStateValue,
				dateType: "fy"
			}));
		};
		const tags = [];
		appliedTimePeriodFY.forEach((value) => {
			tags.push({
				value,
				title: `FY ${value}`,
				toggleFilter,
				staged: timePeriodFY.has(value)
			});
		});
		const newAwards = useNewAwardsOnly();
		if (newAwards) tags.push(newAwards);
		const fyCount = timePeriodFY.size;
		useEffect(() => {
			if (fyCount === 0 && newAwards) newAwards.toggleFilter(true);
		}, [fyCount, newAwards]);
		return /* @__PURE__ */ (0, import_jsx_runtime$114.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	TimePeriodFYFilterGroup.propTypes = propTypes$81;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/TimePeriodDRFilterGroup.jsx
/**
* TimePeriodDRFilterGroup.jsx
* Created by Kevin Li 1/24/17
*/
var import_immutable$3, import_jsx_runtime$113, propTypes$80, TimePeriodDRFilterGroup;
var init_TimePeriodDRFilterGroup = __esmMin((() => {
	init_es();
	import_immutable$3 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_searchFilterActions();
	init_searchHelper();
	init_BaseTopFilterGroup();
	init_useNewAwardsOnly();
	import_jsx_runtime$113 = require_jsx_runtime();
	propTypes$80 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	TimePeriodDRFilterGroup = ({ name, resultsView }) => {
		const timePeriod = useSelector((state) => state.filters.time_period);
		const appliedTimePeriod = useSelector((state) => state.appliedFilters.filters.time_period);
		const dispatch = useDispatch();
		const toggleFilter = ({ startDate, endDate }, staged) => {
			let newValue = timePeriod;
			timePeriod.forEach((date) => {
				if (staged && date.start_date === startDate && date.end_date === endDate) newValue = newValue.delete(date);
				else newValue = newValue.add(date);
			});
			if (!staged) newValue = newValue.add({
				end_date: endDate,
				start_date: startDate
			});
			const newDRValue = newValue?.size >= 1 ? newValue : new import_immutable$3.Set();
			dispatch(updateGenericFilter({
				type: "time_period",
				value: newDRValue
			}));
			dispatch(updateGenericFilter({
				type: "timePeriodType",
				value: "dr"
			}));
		};
		const filters = { values: appliedTimePeriod.map((value) => ({
			startDate: value.start_date,
			endDate: value.end_date,
			title: dateRangeChipLabel(value),
			key: `${value.start_date}-${value.end_date}`
		})) };
		const keys = timePeriod.map(({ start_date, end_date }) => `${start_date}-${end_date}`);
		const tags = [];
		filters.values.forEach(({ startDate, endDate, title, key }) => {
			tags.push({
				value: {
					startDate,
					endDate
				},
				title,
				toggleFilter,
				staged: keys.has(key)
			});
		});
		const newAwards = useNewAwardsOnly();
		if (newAwards) tags.push(newAwards);
		const drCount = timePeriod.size;
		useEffect(() => {
			if (drCount === 0 && newAwards) newAwards.toggleFilter(true);
		}, [drCount, newAwards]);
		return /* @__PURE__ */ (0, import_jsx_runtime$113.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	TimePeriodDRFilterGroup.propTypes = propTypes$80;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/AwardTypeFilterGroup.jsx
var import_jsx_runtime$112, propTypes$79, AwardTypeFilterGroup;
var init_AwardTypeFilterGroup = __esmMin((() => {
	init_es();
	init_awardType();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$112 = require_jsx_runtime();
	propTypes$79 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	AwardTypeFilterGroup = ({ name, resultsView }) => {
		const awardType = useSelector((state) => state.filters.awardType);
		const appliedAwardType = useSelector((state) => state.appliedFilters.filters.awardType);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? awardType.delete(value) : awardType.add(value);
			dispatch(updateGenericFilter({
				type: "awardType",
				value: newValue
			}));
		};
		const toggleGroup = (value, staged) => {
			const awardValues = awardTypeGroups[value];
			let updatedValues = awardType;
			if (staged) updatedValues = updatedValues.filter((x) => !(indexOf(awardValues, x) > -1));
			else awardValues.forEach((x) => {
				updatedValues = updatedValues.add(x);
			});
			dispatch(updateGenericFilter({
				type: "awardType",
				value: updatedValues
			}));
		};
		const tags = [];
		const fullGroups = [];
		const unstagedGroups = [];
		Object.keys(analyticsAwardTypeGroupLabels).forEach((key) => {
			const fullMembership = awardTypeGroups[key].filter((code) => code.indexOf("F0") !== 0);
			const missingValues = difference(fullMembership, appliedAwardType.toArray());
			const unstaged = difference(fullMembership, awardType.toArray());
			if (missingValues.length === 0) fullGroups.push(key);
			if (unstaged.length > 0) unstagedGroups.push(key);
		});
		let excludedValues = [];
		fullGroups.forEach((group) => {
			const tag = {
				value: group,
				title: `All ${analyticsAwardTypeGroupLabels[group]}`,
				toggleFilter: toggleGroup,
				staged: !unstagedGroups.includes(group)
			};
			tags.push(tag);
			excludedValues = [...excludedValues, ...awardTypeGroups[group]];
		});
		appliedAwardType.forEach((value) => {
			if (value.indexOf("F0") === 0) return;
			const tag = {
				value,
				title: awardTypeCodes[value],
				toggleFilter,
				staged: awardType.includes(value)
			};
			if (indexOf(excludedValues, value) < 0) tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$112.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	AwardTypeFilterGroup.propTypes = propTypes$79;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/LocationFilterGroup.jsx
var import_jsx_runtime$111, propTypes$78, LocationFilterGroup;
var init_LocationFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$111 = require_jsx_runtime();
	propTypes$78 = {
		name: PropTypes.string,
		code: PropTypes.string
	};
	LocationFilterGroup = ({ name, code, resultsView }) => {
		const foreignLocationsCode = code === "selectedLocations" ? "locationDomesticForeign" : "recipientDomesticForeign";
		const stagedLocations = useSelector((state) => state.filters[code]);
		const stagedForeignLocations = useSelector((state) => state.filters[foreignLocationsCode]);
		const appliedLocations = useSelector((state) => state.appliedFilters.filters[code]);
		const appliedForeignLocations = useSelector((state) => state.appliedFilters.filters[foreignLocationsCode]);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? stagedLocations.delete(value.identifier) : stagedLocations.set(value.identifier, value);
			dispatch(updateGenericFilter({
				type: code,
				value: newValue
			}));
		};
		const toggleDomestic = (value, staged) => {
			dispatch(updateGenericFilter({
				type: foreignLocationsCode,
				value: staged ? "all" : "foreign"
			}));
		};
		const tags = [];
		appliedLocations.forEach((value) => {
			const tag = {
				value,
				title: `${value?.display?.entity?.toUpperCase()} | ${value?.display?.standalone}`,
				toggleFilter,
				staged: stagedLocations.includes(value)
			};
			tags.push(tag);
		});
		if (appliedForeignLocations !== "all") {
			const tag = {
				value: stagedForeignLocations,
				title: "ALL FOREIGN LOCATIONS",
				toggleFilter: toggleDomestic,
				staged: stagedForeignLocations === "foreign"
			};
			tags.push(tag);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$111.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	LocationFilterGroup.propTypes = propTypes$78;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/AgencyFilterGroup.jsx
var import_jsx_runtime$110, propTypes$77, AgencyFilterGroup;
var init_AgencyFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$110 = require_jsx_runtime();
	propTypes$77 = {
		name: PropTypes.string,
		code: PropTypes.string
	};
	AgencyFilterGroup = ({ name, code, resultsView }) => {
		const selectedAgencies = useSelector((state) => state.filters[code]);
		const appliedAgencies = useSelector((state) => state.appliedFilters.filters[code]);
		const dispatch = useDispatch();
		const toggleFilter = ({ key, value }, staged) => {
			const newValue = staged ? selectedAgencies.delete(key) : selectedAgencies.set(key, value);
			dispatch(updateGenericFilter({
				type: code,
				value: newValue
			}));
		};
		const tags = [];
		appliedAgencies.forEach((value) => {
			let agencyTitle = value.subtier_agency.name;
			if (value.agencyType === "subtier" && value.subtier_agency.abbreviation) agencyTitle += ` (${value.subtier_agency.abbreviation})`;
			else if (value.agencyType === "toptier" && value.toptier_agency.abbreviation) agencyTitle += ` (${value.toptier_agency.abbreviation})`;
			if (value.agencyType === "subtier" && value.toptier_flag === false) agencyTitle += ` | Sub-Agency of ${value.toptier_agency.abbreviation || value.toptier_agency.name}`;
			const key = `${value.id}_${value.agencyType}`;
			const tag = {
				value: {
					key,
					value
				},
				title: agencyTitle,
				toggleFilter,
				staged: selectedAgencies.has(key)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$110.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	AgencyFilterGroup.propTypes = propTypes$77;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/RecipientFilterGroup.jsx
var import_jsx_runtime$109, propTypes$76, RecipientFilterGroup;
var init_RecipientFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$109 = require_jsx_runtime();
	propTypes$76 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	RecipientFilterGroup = ({ name, resultsView }) => {
		const selectedRecipients = useSelector((state) => state.filters.selectedRecipients);
		const appliedRecipientType = useSelector((state) => state.appliedFilters.filters.selectedRecipients);
		const dispatch = useDispatch();
		const removeFilter = (value, staged) => {
			const newValue = staged ? selectedRecipients.delete(value) : selectedRecipients.add(value);
			dispatch(updateGenericFilter({
				type: "selectedRecipients",
				value: newValue
			}));
		};
		const tags = [];
		appliedRecipientType.forEach((value) => {
			const tag = {
				value,
				title: value,
				toggleFilter: removeFilter,
				staged: selectedRecipients.has(value)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$109.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	RecipientFilterGroup.propTypes = propTypes$76;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/RecipientTypeFilterGroup.jsx
var import_jsx_runtime$108, propTypes$75, RecipientTypeFilterGroup;
var init_RecipientTypeFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_recipientType();
	init_BaseTopFilterGroup();
	import_jsx_runtime$108 = require_jsx_runtime();
	propTypes$75 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	RecipientTypeFilterGroup = ({ name, resultsView }) => {
		const recipientType = useSelector((state) => state.filters.recipientType);
		const appliedRecipientType = useSelector((state) => state.appliedFilters.filters.recipientType);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? recipientType.delete(value) : recipientType.add(value);
			dispatch(updateGenericFilter({
				type: "recipientType",
				value: newValue
			}));
		};
		const tags = [];
		appliedRecipientType.forEach((value) => {
			const tag = {
				value,
				title: recipientTypes[value],
				toggleFilter,
				staged: recipientType.has(value)
			};
			if (groupLabels[value]) tag.title = `All ${groupLabels[value]}`;
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$108.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	RecipientTypeFilterGroup.propTypes = propTypes$75;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/KeywordFilterGroup.jsx
var import_jsx_runtime$107, propTypes$74, KeywordFilterGroup;
var init_KeywordFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$107 = require_jsx_runtime();
	propTypes$74 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	KeywordFilterGroup = ({ name, resultsView }) => {
		const keyword = useSelector((state) => state.filters.keyword);
		const appliedKeyword = useSelector((state) => state.appliedFilters.filters.keyword);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? keyword.delete(value) : keyword.set(value, value);
			dispatch(updateGenericFilter({
				type: "keyword",
				value: newValue
			}));
		};
		const tags = [];
		appliedKeyword.forEach((value) => {
			tags.push({
				value,
				title: value,
				toggleFilter,
				staged: keyword.get(value)
			});
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$107.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	KeywordFilterGroup.propTypes = propTypes$74;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/AwardIDFilterGroup.jsx
var import_jsx_runtime$106, propTypes$73, AwardIDFilterGroup;
var init_AwardIDFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$106 = require_jsx_runtime();
	propTypes$73 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	AwardIDFilterGroup = ({ name, resultsView }) => {
		const selectedAwardIDs = useSelector((state) => state.filters.selectedAwardIDs);
		const appliedAwardIDs = useSelector((state) => state.appliedFilters.filters.selectedAwardIDs);
		const dispatch = useDispatch();
		const removeFilter = (value, staged) => {
			const newValue = staged ? selectedAwardIDs.delete(value) : selectedAwardIDs.set(value, value);
			dispatch(updateGenericFilter({
				type: "selectedAwardIDs",
				value: newValue
			}));
		};
		const tags = [];
		appliedAwardIDs.forEach((value) => {
			const tag = {
				value,
				title: `${value} | Award ID`,
				toggleFilter: removeFilter,
				staged: selectedAwardIDs.has(value)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$106.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	AwardIDFilterGroup.propTypes = propTypes$73;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/AwardAmountFilterGroup.jsx
var import_jsx_runtime$105, propTypes$72, AwardAmountFilterGroup;
var init_AwardAmountFilterGroup = __esmMin((() => {
	init_es();
	init_awardAmountHelper();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$105 = require_jsx_runtime();
	propTypes$72 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	AwardAmountFilterGroup = ({ name, resultsView }) => {
		const awardAmounts = useSelector((state) => state.filters.awardAmounts);
		const appliedAwardAmounts = useSelector((state) => state.appliedFilters.filters.awardAmounts);
		const dispatch = useDispatch();
		const toggleFilter = ({ key, value }, staged) => {
			const newValue = staged ? awardAmounts.delete(key) : awardAmounts.set(key, value);
			dispatch(updateGenericFilter({
				type: "awardAmounts",
				value: newValue
			}));
		};
		const tags = [];
		appliedAwardAmounts.forEach((value, key) => {
			const tag = {
				value: {
					key,
					value
				},
				title: formatAwardAmountRange(value),
				toggleFilter,
				staged: awardAmounts.has(key)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$105.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	AwardAmountFilterGroup.propTypes = propTypes$72;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/CFDAFilterGroup.jsx
var import_jsx_runtime$104, propTypes$71, CFDAFilterGroup;
var init_CFDAFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$104 = require_jsx_runtime();
	propTypes$71 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	CFDAFilterGroup = ({ name, resultsView }) => {
		const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);
		const appliedCFDA = useSelector((state) => state.appliedFilters.filters.selectedCFDA);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? selectedCFDA.delete(value.identifier) : selectedCFDA.set(value.identifier, value);
			dispatch(updateGenericFilter({
				type: "selectedCFDA",
				value: newValue
			}));
		};
		const tags = [];
		appliedCFDA.forEach((value) => {
			const tag = {
				value,
				title: `${value.program_number} | ${value.program_title}`,
				toggleFilter,
				staged: selectedCFDA.has(value.identifier)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$104.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	CFDAFilterGroup.propTypes = propTypes$71;
}));
//#endregion
//#region src/js/redux/actions/search/naicsActions.js
var treeName$2, setNaicsNodes, showNaicsTree, setExpandedNaics, setCheckedNaics, setUncheckedNaics, setSearchedNaics, setNaicsCounts;
var init_naicsActions = __esmMin((() => {
	init_naicsHelper();
	init_checkboxTreeHelper();
	treeName$2 = "NAICS";
	setNaicsNodes = (key, nodes) => setNodes(key, nodes, treeName$2, cleanNaicsData);
	showNaicsTree = () => showTree(treeName$2);
	setExpandedNaics = (expanded, type = "SET_EXPANDED") => setExpanded(expanded, type, treeName$2);
	setCheckedNaics = (nodes) => setChecked(nodes, treeName$2);
	setUncheckedNaics = (nodes) => setUnchecked(nodes, treeName$2);
	setSearchedNaics = (nodes) => setSearchedNodes(nodes, treeName$2, cleanNaicsData);
	setNaicsCounts = (newCounts) => setCounts(newCounts, treeName$2);
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/NAICSFilterGroup.jsx
var import_jsx_runtime$103, propTypes$70, getUniqueValues$2, NAICSFilterGroup;
var init_NAICSFilterGroup = __esmMin((() => {
	init_es();
	init_checkboxTreeHelper();
	init_naicsActions();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$103 = require_jsx_runtime();
	propTypes$70 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	getUniqueValues$2 = (value, index, array) => array.indexOf(value) === index;
	NAICSFilterGroup = ({ name, resultsView }) => {
		const { require, counts } = useSelector((state) => state.filters.naicsCodes);
		const { require: appliedRequire, counts: appliedCounts } = useSelector((state) => state.appliedFilters.filters.naicsCodes);
		const nodes = useSelector((state) => state.naics.naics.toJS());
		const checked = useSelector((state) => state.naics.checked.toJS());
		const unchecked = useSelector((state) => state.naics.unchecked.toJS());
		const dispatch = useDispatch();
		const toggleFilter = ({ value, array }, staged) => {
			const newNAICS = staged ? {
				require: require.filter((v) => !array.includes(v)),
				counts: counts.filter((v) => v.value !== value.value)
			} : {
				require: [...require, ...array],
				counts: [...counts, value]
			};
			dispatch(updateNaics(newNAICS.require, [], newNAICS.counts));
			if (nodes.length !== 0) {
				const { newChecked, newUnchecked } = handleNewCheckedIds(nodes, value.value, [...checked, ...array], unchecked, staged);
				const toExpand = newChecked.filter((c) => !c.includes("children_of_") || array.includes(c)).flatMap((f) => {
					if (f.length === 6) return [
						f,
						f.substring(0, 2),
						f.substring(0, 4)
					];
					if (f.length === 4) return [f, f.substring(0, 2)];
					return [f];
				});
				dispatch(setCheckedNaics(newChecked));
				dispatch(setUncheckedNaics(newUnchecked));
				dispatch(setExpandedNaics(toExpand));
			}
		};
		const keys = counts.map((t) => `${t.value}-${t.count}`);
		const uniqueNAICS = appliedRequire.filter(getUniqueValues$2);
		return /* @__PURE__ */ (0, import_jsx_runtime$103.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags: appliedCounts.map((value) => {
				return {
					value: {
						value,
						array: uniqueNAICS.filter((v) => v.indexOf(value.value) === 0)
					},
					title: `${value.value} - ${value.label} (${value.count})`,
					toggleFilter,
					staged: keys.includes(`${value.value}-${value.count}`)
				};
			}),
			name
		});
	};
	NAICSFilterGroup.propTypes = propTypes$70;
}));
//#endregion
//#region src/js/redux/actions/search/pscActions.js
var treeName$1, setPscNodes, showPscTree, setExpandedPsc, setCheckedPsc, setUncheckedPsc, setSearchedPsc, setPscCounts;
var init_pscActions = __esmMin((() => {
	init_pscHelper();
	init_checkboxTreeHelper();
	treeName$1 = "PSC";
	setPscNodes = (key, nodes) => setNodes(key, nodes, treeName$1, cleanPscData);
	showPscTree = () => showTree(treeName$1);
	setExpandedPsc = (expanded, type = "SET_EXPANDED") => setExpanded(expanded, type, treeName$1);
	setCheckedPsc = (nodes) => setChecked(nodes, treeName$1);
	setUncheckedPsc = (nodes) => setUnchecked(nodes, treeName$1);
	setSearchedPsc = (nodes) => setSearchedNodes(nodes, treeName$1, cleanPscData);
	setPscCounts = (newCounts) => setCounts(newCounts, treeName$1);
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/PSCFilterGroup.jsx
var import_jsx_runtime$102, propTypes$69, getUniqueValues$1, PSCFilterGroup;
var init_PSCFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_pscActions();
	init_checkboxTreeHelper();
	init_BaseTopFilterGroup();
	import_jsx_runtime$102 = require_jsx_runtime();
	propTypes$69 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	getUniqueValues$1 = (value, index, array) => array.indexOf(value) === index;
	PSCFilterGroup = ({ name, resultsView }) => {
		const { require, exclude, counts } = useSelector((state) => state.filters.pscCodes);
		const { require: appliedRequire, exclude: appliedExclude, counts: appliedCounts } = useSelector((state) => state.appliedFilters.filters.pscCodes);
		const nodes = useSelector((state) => state.psc.psc.toJS());
		const checked = useSelector((state) => state.psc.checked.toJS());
		const unchecked = useSelector((state) => state.psc.unchecked.toJS());
		const dispatch = useDispatch();
		const toggleFilter = ({ value, array }, staged) => {
			let newRequire;
			let newExclude;
			let newCounts;
			if (staged) {
				newRequire = require.filter((v) => !array.includes(v));
				newExclude = exclude.filter((v) => !array.includes(v));
				newCounts = counts.filter((v) => v.value !== value.value);
			} else {
				newRequire = [...require, ...array];
				newExclude = [...exclude, ...appliedExclude.filter((v) => !array.includes(v))];
				newCounts = [...counts, value];
			}
			dispatch(updatePSC(newRequire, newExclude, newCounts));
			if (nodes.length !== 0) {
				const filteredArray = array.map((ancestryPath) => ancestryPath[ancestryPath.length - 1]);
				const { newChecked, newUnchecked } = handleNewCheckedIds(nodes, value.value, [...checked, ...filteredArray], unchecked, staged);
				const toExpand = newRequire.flatMap((subArray) => subArray.slice(0, -1));
				dispatch(setCheckedPsc(newChecked));
				dispatch(setUncheckedPsc(newUnchecked));
				dispatch(setExpandedPsc([...new Set(toExpand)]));
			}
		};
		const keys = counts.map((t) => `${t.value}-${t.count}`);
		const uniquePSC = appliedRequire.filter(getUniqueValues$1);
		return /* @__PURE__ */ (0, import_jsx_runtime$102.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags: appliedCounts.map((value) => {
				return {
					value: {
						value,
						array: uniquePSC.filter((v) => v.indexOf(value.value) === 0)
					},
					title: `${value.value} (${value.count})`,
					toggleFilter,
					staged: keys.includes(`${value.value}-${value.count}`)
				};
			}),
			name
		});
	};
	PSCFilterGroup.propTypes = propTypes$69;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/PricingTypeFilterGroup.jsx
var import_jsx_runtime$101, propTypes$68, PricingTypeFilterGroup;
var init_PricingTypeFilterGroup = __esmMin((() => {
	init_es();
	init_contractFields();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$101 = require_jsx_runtime();
	propTypes$68 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	PricingTypeFilterGroup = ({ name, resultsView }) => {
		const pricingType = useSelector((state) => state.filters.pricingType);
		const appliedPricingType = useSelector((state) => state.appliedFilters.filters.pricingType);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? pricingType.delete(value) : pricingType.add(value);
			dispatch(updateGenericFilter({
				type: "pricingType",
				value: newValue
			}));
		};
		const tags = [];
		appliedPricingType.forEach((value) => {
			const tag = {
				value,
				title: pricingTypeDefinitions[value],
				toggleFilter,
				staged: pricingType.has(value)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$101.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	PricingTypeFilterGroup.propTypes = propTypes$68;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/SetAsideFilterGroup.jsx
var import_jsx_runtime$100, propTypes$67, SetAsideFilterGroup;
var init_SetAsideFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_contractFields();
	init_BaseTopFilterGroup();
	import_jsx_runtime$100 = require_jsx_runtime();
	propTypes$67 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	SetAsideFilterGroup = ({ name, resultsView }) => {
		const setAside = useSelector((state) => state.filters.setAside);
		const appliedSetAside = useSelector((state) => state.appliedFilters.filters.setAside);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? setAside.delete(value) : setAside.add(value);
			dispatch(updateGenericFilter({
				type: "setAside",
				value: newValue
			}));
		};
		const tags = [];
		appliedSetAside.forEach((value) => {
			const tag = {
				value,
				title: setAsideDefinitions[value],
				toggleFilter,
				staged: setAside.has(value)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$100.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	SetAsideFilterGroup.propTypes = propTypes$67;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/ExtentCompetedFilterGroup.jsx
var import_jsx_runtime$99, propTypes$66, ExtentCompetedFilterGroup;
var init_ExtentCompetedFilterGroup = __esmMin((() => {
	init_es();
	init_contractFields();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$99 = require_jsx_runtime();
	propTypes$66 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	ExtentCompetedFilterGroup = ({ name, resultsView }) => {
		const extentCompeted = useSelector((state) => state.filters.extentCompeted);
		const appliedExtentCompeted = useSelector((state) => state.appliedFilters.filters.extentCompeted);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? extentCompeted.delete(value) : extentCompeted.add(value);
			dispatch(updateGenericFilter({
				type: "extentCompeted",
				value: newValue
			}));
		};
		const tags = [];
		appliedExtentCompeted.forEach((value) => {
			const tag = {
				value,
				title: extentCompetedDefinitions[value],
				toggleFilter,
				staged: extentCompeted.has(value)
			};
			tags.push(tag);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$99.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	ExtentCompetedFilterGroup.propTypes = propTypes$66;
}));
//#endregion
//#region src/js/redux/actions/search/tasActions.js
var treeName, setTasNodes, showTasTree, setExpandedTas, setCheckedTas, setUncheckedTas, setSearchedTas, setTasCounts;
var init_tasActions = __esmMin((() => {
	init_tasHelper();
	init_checkboxTreeHelper();
	treeName = "TAS";
	setTasNodes = (key, nodes) => setNodes(key, nodes, treeName, cleanTasData);
	showTasTree = () => showTree(treeName);
	setExpandedTas = (expanded, type = "SET_EXPANDED") => setExpanded(expanded, type, treeName);
	setCheckedTas = (nodes) => setChecked(nodes, treeName);
	setUncheckedTas = (nodes) => setUnchecked(nodes, treeName);
	setSearchedTas = (nodes) => setSearchedNodes(nodes, treeName, cleanTasData);
	setTasCounts = (newCounts) => setCounts(newCounts, treeName);
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/TASFilterGroup.jsx
var import_jsx_runtime$98, propTypes$65, getUniqueValues, TASFilterGroup;
var init_TASFilterGroup = __esmMin((() => {
	init_es();
	init_tasActions();
	init_searchFilterActions();
	init_checkboxTreeHelper();
	init_BaseTopFilterGroup();
	import_jsx_runtime$98 = require_jsx_runtime();
	propTypes$65 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	getUniqueValues = (value, index, array) => array.indexOf(value) === index;
	TASFilterGroup = ({ name, resultsView }) => {
		const { require, exclude, counts } = useSelector((state) => state.filters.tasCodes);
		const { require: appliedRequire, exclude: appliedExclude, counts: appliedCounts } = useSelector((state) => state.appliedFilters.filters.tasCodes);
		const nodes = useSelector((state) => state.tas.tas.toJS());
		const checked = useSelector((state) => state.tas.checked.toJS());
		const unchecked = useSelector((state) => state.tas.unchecked.toJS());
		const dispatch = useDispatch();
		const toggleFilter = ({ value, array }, staged) => {
			let newRequire;
			let newExclude;
			let newCounts;
			if (staged) {
				newRequire = require.filter((v) => !array.includes(v));
				newExclude = exclude.filter((v) => !array.includes(v));
				newCounts = counts.filter((v) => v.value !== value.value);
			} else {
				newRequire = [...require, ...array];
				newExclude = [...exclude, ...appliedExclude.filter((v) => !array.includes(v))];
				newCounts = [...counts, value];
			}
			dispatch(updateTAS(newRequire, newExclude, newCounts));
			if (nodes.length !== 0) {
				const filteredArray = array.map((ancestryPath) => ancestryPath[ancestryPath.length - 1]);
				const { newChecked, newUnchecked } = handleNewCheckedIds(nodes, value.value, [...checked, ...filteredArray], unchecked, staged);
				const toExpand = newRequire.flatMap((subArray) => subArray.slice(0, -1));
				dispatch(setCheckedTas(newChecked));
				dispatch(setUncheckedTas(newUnchecked));
				dispatch(setExpandedTas([...new Set(toExpand)]));
			}
		};
		const keys = counts.map((t) => `${t.value}-${t.count}`);
		const uniqueTAS = appliedRequire.filter(getUniqueValues);
		return /* @__PURE__ */ (0, import_jsx_runtime$98.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags: appliedCounts.map((value) => {
				return {
					value: {
						value,
						array: uniqueTAS.filter((v) => v.indexOf(value.value) === 0)
					},
					title: `${value.label} (${value.count})`,
					toggleFilter,
					staged: keys.includes(`${value.value}-${value.count}`)
				};
			}),
			name
		});
	};
	TASFilterGroup.propTypes = propTypes$65;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/DefCodesFilterGroup.jsx
var import_jsx_runtime$97, propTypes$64, DefCodesFilterGroup;
var init_DefCodesFilterGroup = __esmMin((() => {
	init_es();
	init_defCodes();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$97 = require_jsx_runtime();
	propTypes$64 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	DefCodesFilterGroup = ({ name, resultsView }) => {
		const defCode = useSelector((state) => state.filters.defCode);
		const appliedDefCode = useSelector((state) => state.appliedFilters.filters.defCode);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			const newValue = staged ? defCode.delete(value) : defCode.add(value);
			dispatch(updateGenericFilter({
				type: "defCode",
				value: newValue
			}));
		};
		const toggleGroups = (value, staged) => {
			const defCodes = defCodeGroups[value];
			let newValue = defCode;
			if (staged) newValue = newValue.filter((x) => !(indexOf(defCodes, x) > -1));
			else defCodes.forEach((x) => {
				newValue = newValue.add(x);
			});
			dispatch(updateGenericFilter({
				type: "defCode",
				value: newValue
			}));
		};
		const tags = [];
		const fullGroups = [];
		const unstagedGroups = [];
		let excludedValues = [];
		Object.keys(defCodeGroups).forEach((key) => {
			const fullMembership = defCodeGroups[key];
			const missingValues = difference(fullMembership, appliedDefCode.toArray());
			const unstaged = difference(fullMembership, defCode.toArray());
			if (missingValues.length === 0) fullGroups.push(key);
			if (unstaged.length > 0) unstagedGroups.push(key);
		});
		fullGroups.forEach((value) => {
			const tag = {
				value,
				title: `All ${groupLabels$1[value]}`,
				toggleFilter: toggleGroups,
				staged: !unstagedGroups.includes(value)
			};
			tags.push(tag);
			excludedValues = [...excludedValues, ...defCodeGroups[value]];
		});
		appliedDefCode.forEach((value) => {
			if (!excludedValues.includes(value)) {
				const tag = {
					value,
					title: defCodes[value].title,
					toggleFilter,
					staged: defCode.has(value)
				};
				if (indexOf(excludedValues, value) < 0) tags.push(tag);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$97.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags,
			name
		});
	};
	DefCodesFilterGroup.propTypes = propTypes$64;
}));
//#endregion
//#region src/js/components/search/topFilterBar/filterGroups/AwardDescriptionFilterGroup.jsx
var import_jsx_runtime$96, propTypes$63, AwardDescriptionFilterGroup;
var init_AwardDescriptionFilterGroup = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_BaseTopFilterGroup();
	import_jsx_runtime$96 = require_jsx_runtime();
	propTypes$63 = {
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	AwardDescriptionFilterGroup = ({ name, resultsView }) => {
		const awardDescription = useSelector((state) => state.filters.awardDescription);
		const appliedAwardDescription = useSelector((state) => state.appliedFilters.filters.awardDescription);
		const dispatch = useDispatch();
		const toggleFilter = (value, staged) => {
			dispatch(updateGenericFilter({
				type: "awardDescription",
				value: staged ? "" : value
			}));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$96.jsx)(BaseTopFilterGroup, {
			resultsView,
			tags: [{
				value: appliedAwardDescription,
				title: appliedAwardDescription,
				toggleFilter,
				staged: awardDescription === appliedAwardDescription
			}],
			name
		});
	};
	AwardDescriptionFilterGroup.propTypes = propTypes$63;
}));
//#endregion
//#region src/js/components/search/topFilterBar/TopFilterGroupGenerator.jsx
/**
* TopFilterGroupGenerator.jsx
* Created by Kevin Li 1/24/17
*/
var import_jsx_runtime$95, propTypes$62, TopFilterGroupGenerator;
var init_TopFilterGroupGenerator = __esmMin((() => {
	init_TimePeriodFYFilterGroup();
	init_TimePeriodDRFilterGroup();
	init_AwardTypeFilterGroup();
	init_LocationFilterGroup();
	init_AgencyFilterGroup();
	init_RecipientFilterGroup();
	init_RecipientTypeFilterGroup();
	init_KeywordFilterGroup();
	init_AwardIDFilterGroup();
	init_AwardAmountFilterGroup();
	init_CFDAFilterGroup();
	init_NAICSFilterGroup();
	init_PSCFilterGroup();
	init_PricingTypeFilterGroup();
	init_SetAsideFilterGroup();
	init_ExtentCompetedFilterGroup();
	init_TASFilterGroup();
	init_DefCodesFilterGroup();
	init_AwardDescriptionFilterGroup();
	import_jsx_runtime$95 = require_jsx_runtime();
	propTypes$62 = {
		code: PropTypes.string,
		name: PropTypes.string,
		resultsView: PropTypes.bool
	};
	TopFilterGroupGenerator = memo(function TopFilterGroupGenerator({ code = "", name, resultsView }) {
		const groupKey = `top-filter-group-${code}`;
		switch (code) {
			case "keyword": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(KeywordFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "timePeriodFY": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(TimePeriodFYFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "timePeriodDR": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(TimePeriodDRFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "awardType": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AwardTypeFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedLocations": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(LocationFilterGroup, {
				resultsView,
				name,
				code
			}, groupKey);
			case "selectedFundingAgencies": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AgencyFilterGroup, {
				resultsView,
				name,
				code
			}, groupKey);
			case "selectedAwardingAgencies": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AgencyFilterGroup, {
				resultsView,
				name,
				code
			}, groupKey);
			case "selectedRecipients": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(RecipientFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedRecipientLocations": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(LocationFilterGroup, {
				resultsView,
				name,
				code
			}, groupKey);
			case "treasuryAccounts": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(TASFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "recipientType": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(RecipientTypeFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "description": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AwardDescriptionFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedAwardIDs": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AwardIDFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "awardAmounts": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(AwardAmountFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedCFDA": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(CFDAFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedNAICS": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(NAICSFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "selectedPSC": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(PSCFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "pricingType": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(PricingTypeFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "setAside": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(SetAsideFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "extentCompeted": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(ExtentCompetedFilterGroup, {
				resultsView,
				name
			}, groupKey);
			case "defCodes": return /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)(DefCodesFilterGroup, {
				resultsView,
				name
			}, groupKey);
			default: return null;
		}
	});
	TopFilterGroupGenerator.propTypes = propTypes$62;
}));
//#endregion
//#region src/js/components/search/topFilterBar/header/BarHeaderAbove.jsx
var import_jsx_runtime$94, propTypes$61, BarHeaderAbove;
var init_BarHeaderAbove = __esmMin((() => {
	init_dist();
	init_index_es();
	init_es();
	init_modalActions();
	import_jsx_runtime$94 = require_jsx_runtime();
	propTypes$61 = { resultsView: PropTypes.bool };
	BarHeaderAbove = memo(function BarHeaderAbove({ resultsView }) {
		const dispatch = useDispatch();
		const onClick = useCallback((e) => {
			e.persist();
			dispatch(showModal(window.location.href, "filter"));
		}, [dispatch]);
		const onKeyUp = useCallback((e) => {
			e.persist();
			if (e.key === "Enter") dispatch(showModal(window.location.href, "filter"));
		}, [dispatch]);
		const image = useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime$94.jsx)(FontAwesomeIcon, { icon: "window-restore" }), []);
		return /* @__PURE__ */ (0, import_jsx_runtime$94.jsxs)("div", {
			className: "above-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$94.jsxs)("div", {
				className: "title-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$94.jsx)("h1", {
					className: "title",
					children: "Search Results"
				}), /* @__PURE__ */ (0, import_jsx_runtime$94.jsx)(sc, {
					onClick,
					onKeyUp,
					copy: "Learn how active filters work",
					buttonTitle: "filter modal",
					buttonSize: "sm",
					buttonType: "text",
					backgroundColor: "light",
					imageAlignment: "right",
					image
				})]
			}), resultsView && /* @__PURE__ */ (0, import_jsx_runtime$94.jsxs)("h2", {
				className: "subtitle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$94.jsx)(FontAwesomeIcon, { icon: ["far", "lightbulb"] }),
					"To ",
					/* @__PURE__ */ (0, import_jsx_runtime$94.jsx)("span", { children: "remove active filters" }),
					", select the individual filter labels. Then, once the button appears, click \"Update selected filters\"."
				]
			})]
		});
	});
	BarHeaderAbove.propTypes = propTypes$61;
}));
//#endregion
//#region src/js/redux/actions/search/mapLegendToggleActions.js
var resetMapLegendToggle, updateMapLegendToggle;
var init_mapLegendToggleActions = __esmMin((() => {
	resetMapLegendToggle = () => ({ type: "RESET_MAP_LEGEND_TOGGLE" });
	updateMapLegendToggle = (value) => ({
		type: "UPDATE_MAP_LEGEND_TOGGLE",
		value
	});
}));
//#endregion
//#region src/js/containers/search/helpers/searchAnalytics.js
var import_immutable$2, eventCategory, getStringFromArray, convertDateRange, parseAgency, convertReducibleValue, convertTimePeriod, convertAgency, convertLocation, combineAwardTypeGroups, handleCheckboxTreeSelection, convertFilter, unifyDateFields, convertFiltersToAnalyticEvents, sendAnalyticEvents, sendFieldCombinations, sendFieldCombinationsOnUpdate;
var init_searchAnalytics = __esmMin((() => {
	import_immutable$2 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_awardType();
	init_recipientType();
	init_contractFields();
	init_Analytics();
	eventCategory = "Advanced Search - Search Filter";
	getStringFromArray = (arrOfStr) => arrOfStr.sort().reduce((acc, code, i, array) => {
		if (array.length - 1 === i) return `${acc}${code}`;
		return `${acc}${code}, `;
	}, "");
	convertDateRange = (range) => {
		if (range.length !== 2 || !range[0] && !range[1]) return null;
		return [{
			action: "Time Period - Date Range",
			label: `${range[0] || "..."} to ${range[1] || "present"}`
		}];
	};
	parseAgency = (agency) => {
		const toptier = agency.toptier_agency;
		const subtier = agency.subtier_agency;
		if (agency.agencyType === "toptier") {
			if (toptier.abbreviation) return `${toptier.name} (${toptier.abbreviation})/${toptier.toptier_code}`;
			return `${toptier.name}/${toptier.toptier_code}`;
		} else if (agency.agencyType === "subtier") {
			if (subtier.abbreviation) return `${subtier.name} (${subtier.abbreviation})/${subtier.subtier_code} -
            ${toptier.name}/${toptier.toptier_code}`;
			return `${subtier.name}/${subtier.subtier_code} - ${toptier.name}/${toptier.toptier_code}`;
		}
		return null;
	};
	convertReducibleValue = (value, type, parser) => value.reduce((events, item) => {
		events.push({
			action: type,
			label: parser && parser(item) || item
		});
		return events;
	}, []);
	convertTimePeriod = (value) => {
		if (import_immutable$2.Set.isSet(value)) {
			if (value.type === "fy") return convertReducibleValue(value, "Time Period - Fiscal Year");
			return convertReducibleValue(value, "Time Period - Date Range", (date) => `${date.start_date || "..."} - ${date.end_date || "present"}`);
		} else if (Array.isArray(value)) return convertDateRange(value);
		return null;
	};
	convertAgency = (agencies, type) => convertReducibleValue(agencies, type, parseAgency);
	convertLocation = (locations, type) => convertReducibleValue(locations, type, (location) => `${location.display.entity} - ${location.display.standalone}`);
	combineAwardTypeGroups = (filters) => {
		let groupedFilters = [];
		const fullTypes = Object.keys(awardTypeGroups).reduce((groups, key) => {
			const groupValues = awardTypeGroups[key];
			if (groupValues.every((value) => filters.includes(value))) {
				groups.push(`All ${analyticsAwardTypeGroupLabels[key]}`);
				groupedFilters = groupedFilters.concat(groupValues);
			}
			return groups;
		}, []);
		const remainingFilters = filters.reduce((parsed, value) => {
			if (groupedFilters.indexOf(value) === -1) parsed.push(value);
			return parsed;
		}, []);
		return fullTypes.concat(remainingFilters);
	};
	handleCheckboxTreeSelection = (value, label) => {
		const selectedValues = value.get("require");
		if (selectedValues.length) return convertReducibleValue([selectedValues], label, getStringFromArray);
		return null;
	};
	convertFilter = (type, value) => {
		switch (type) {
			case "keyword": return convertReducibleValue(value, "Keyword");
			case "timePeriod": return convertTimePeriod(value);
			case "awardType": return convertReducibleValue(combineAwardTypeGroups(value), "Award Type", (item) => awardTypeCodes[item] || item);
			case "selectedAwardingAgencies": return convertAgency(value, "Awarding Agency");
			case "selectedFundingAgencies": return convertAgency(value, "Funding Agency");
			case "selectedLocations": return convertLocation(value, "Place of Performance");
			case "selectedRecipientLocations": return convertLocation(value, "Recipient Location");
			case "selectedRecipients": return convertReducibleValue(value, "Recipient");
			case "recipientType": return convertReducibleValue(value, "Recipient Type", (item) => recipientTypes[item] || groupLabels[item] || item);
			case "awardAmounts": return convertReducibleValue(value, "Award Amount", (amount) => `${amount[0]} - ${amount[1]}`);
			case "selectedAwardIDs": return convertReducibleValue(value, "Award ID");
			case "selectedCFDA": return convertReducibleValue(value, "Assistance Listing", (cfda) => `${cfda.program_number} - ${cfda.program_title}`);
			case "defCodes": return handleCheckboxTreeSelection(value, "DEFC Filter");
			case "naicsCodes": return handleCheckboxTreeSelection(value, "NAICS Codes");
			case "pscCodes": return handleCheckboxTreeSelection(value, "Product or Service Code (PSC)");
			case "tasCodes": return handleCheckboxTreeSelection(value, "Treasury Account Symbol (TAS)");
			case "pricingType": return convertReducibleValue(value, "Type of Contract Pricing", (pricing) => pricingTypeDefinitions[pricing]);
			case "setAside": return convertReducibleValue(value, "Type of Set Aside", (sa) => setAsideDefinitions[sa]);
			case "extentCompeted": return convertReducibleValue(value, "Extent Competed", (extent) => extentCompetedDefinitions[extent]);
			default: return null;
		}
	};
	unifyDateFields = (redux) => {
		const clonedRedux = Object.assign({}, redux);
		if (clonedRedux.timePeriodType === "fy") clonedRedux.timePeriod = clonedRedux.timePeriodFY;
		else clonedRedux.timePeriod = clonedRedux.time_period;
		clonedRedux.timePeriod.type = clonedRedux.timePeriodType;
		return clonedRedux;
	};
	convertFiltersToAnalyticEvents = (redux) => {
		const filters = unifyDateFields(redux);
		return Object.keys(filters).reduce((converted, type) => {
			const value = filters[type];
			const analyticEvent = convertFilter(type, value);
			if (analyticEvent) return converted.concat(analyticEvent);
			return converted;
		}, []);
	};
	sendAnalyticEvents = (events) => {
		events.forEach((event) => {
			Analytics.event(Object.assign({}, event, { category: eventCategory }));
		});
	};
	sendFieldCombinations = (events, category = "Advanced Search - Search Fields") => {
		const fields = uniq(events.reduce((parsed, event) => {
			if (event.action) parsed.push(event.action);
			return parsed;
		}, []));
		Analytics.event({
			event: "search_send_all_fields",
			category,
			action: fields.sort().join("|"),
			gtm: true
		});
	};
	sendFieldCombinationsOnUpdate = (events, category, action) => {
		const fields = uniq(events.reduce((parsed, event) => {
			if (event.action) parsed.push(event.action);
			return parsed;
		}, []));
		Analytics.event({
			event: "search_send_all_fields_on_update",
			category,
			action,
			label: fields.sort().join("|"),
			gtm: true
		});
	};
}));
//#endregion
//#region src/js/components/search/topFilterBar/header/UpdateFiltersButton.jsx
var import_jsx_runtime$93, propTypes$60, UpdateFiltersButton;
var init_UpdateFiltersButton = __esmMin((() => {
	init_index_es();
	init_es();
	init_dist();
	init_searchHelper();
	init_appliedFilterActions();
	init_searchFilterActions();
	init_mapLegendToggleActions();
	init_searchAnalytics();
	init_searchFiltersReducer();
	import_jsx_runtime$93 = require_jsx_runtime();
	propTypes$60 = { appliedFilters: PropTypes.object };
	UpdateFiltersButton = ({ appliedFilters }) => {
		const dispatch = useDispatch();
		const stagedFilters = useSelector((state) => state.filters);
		const closeIcon = useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime$93.jsx)(FontAwesomeIcon, { icon: "times" }), []);
		const emptyFilters = areFiltersEqual(stagedFilters, initialState) || areFiltersEqual(stagedFilters, initialStateDR);
		const equalFilters = areFiltersEqual(stagedFilters, appliedFilters);
		const onClick = useCallback(() => {
			dispatch(setAppliedFilterCompletion(false));
			if (emptyFilters) {
				dispatch(clearAllFilters());
				dispatch(resetAppliedFilters());
				dispatch(resetMapLegendToggle());
			} else if (!equalFilters) {
				dispatch(applyStagedFilters(stagedFilters));
				dispatch(setAppliedFilterCompletion(true));
			}
			sendFieldCombinationsOnUpdate(convertFiltersToAnalyticEvents(stagedFilters), "Advanced Search - Active Filters", "Update Filters");
		}, [
			dispatch,
			emptyFilters,
			equalFilters,
			stagedFilters
		]);
		const onKeyUp = useCallback((e) => {
			e.persist();
			if (e.key === "Enter") onClick();
		}, [onClick]);
		if (equalFilters || emptyFilters) return /* @__PURE__ */ (0, import_jsx_runtime$93.jsx)(import_jsx_runtime$93.Fragment, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$93.jsx)(sc, {
			onClick,
			onKeyUp,
			copy: "Update selected filters",
			buttonTitle: "filter modal",
			buttonSize: "sm",
			buttonType: "text",
			backgroundColor: "light",
			imageAlignment: "right",
			image: closeIcon
		});
	};
	UpdateFiltersButton.propTypes = propTypes$60;
}));
//#endregion
//#region src/js/components/search/topFilterBar/header/ExpandFiltersButton.jsx
var import_jsx_runtime$92, logExpandEvent, propTypes$59, ExpandFiltersButton;
var init_ExpandFiltersButton = __esmMin((() => {
	init_index_es();
	init_dist();
	init_Analytics();
	import_jsx_runtime$92 = require_jsx_runtime();
	logExpandEvent = (type) => {
		Analytics.event({
			category: "Advanced Search - Active Filters",
			action: `${type} Filters`
		});
	};
	propTypes$59 = {
		appliedFilters: PropTypes.object,
		expandedFilters: PropTypes.bool,
		setExpandedFilters: PropTypes.func
	};
	ExpandFiltersButton = ({ appliedFilters, expandedFilters, setExpandedFilters }) => {
		const [needExpandButton, setNeedExpandButton] = useState(false);
		const chevronIcon = useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime$92.jsx)(FontAwesomeIcon, { icon: expandedFilters ? "chevron-up" : "chevron-down" }), [expandedFilters]);
		const onClick = useCallback(() => setExpandedFilters((prevState) => {
			logExpandEvent(!prevState ? "Expand" : "Collapse");
			return !prevState;
		}), [setExpandedFilters]);
		const onKeyUp = useCallback((e) => {
			e.persist();
			if (e.key === "Enter") onClick();
		}, [onClick]);
		useEffect(() => {
			setNeedExpandButton(document.querySelector(".search-top-filters-content")?.offsetHeight > 124);
		}, [appliedFilters]);
		if (!needExpandButton) return /* @__PURE__ */ (0, import_jsx_runtime$92.jsx)(import_jsx_runtime$92.Fragment, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$92.jsx)(sc, {
			onClick,
			onKeyUp,
			copy: `${expandedFilters ? "Collapse" : "Expand"} active filters`,
			buttonTitle: "filter modal",
			buttonSize: "sm",
			buttonType: "text",
			backgroundColor: "light",
			imageAlignment: "right",
			image: chevronIcon
		});
	};
	ExpandFiltersButton.propTypes = propTypes$59;
}));
//#endregion
//#region src/js/components/search/topFilterBar/header/BarHeaderBelow.jsx
var import_jsx_runtime$91, propTypes$58, BarHeaderBelow;
var init_BarHeaderBelow = __esmMin((() => {
	init_es();
	init_UpdateFiltersButton();
	init_ExpandFiltersButton();
	import_jsx_runtime$91 = require_jsx_runtime();
	propTypes$58 = {
		filterCount: PropTypes.number,
		expandedFilters: PropTypes.bool,
		setExpandedFilters: PropTypes.func
	};
	BarHeaderBelow = ({ filterCount, expandedFilters, setExpandedFilters, resultsView }) => {
		const appliedFilters = useSelector((state) => state.appliedFilters.filters);
		return /* @__PURE__ */ (0, import_jsx_runtime$91.jsxs)("div", {
			className: "below-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$91.jsx)("h2", {
				className: "header-title",
				id: "top-filter-bar-title",
				children: `${filterCount} Active Filter${filterCount !== 1 ? "s" : ""}:`
			}), resultsView && /* @__PURE__ */ (0, import_jsx_runtime$91.jsxs)("div", {
				className: "filter-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$91.jsx)(UpdateFiltersButton, { appliedFilters }), /* @__PURE__ */ (0, import_jsx_runtime$91.jsx)(ExpandFiltersButton, {
					appliedFilters,
					expandedFilters,
					setExpandedFilters
				})]
			})]
		});
	};
	BarHeaderBelow.propTypes = propTypes$58;
}));
//#endregion
//#region src/js/components/search/topFilterBar/header/BarHeader.jsx
var import_jsx_runtime$90, propTypes$57, BarHeader;
var init_BarHeader = __esmMin((() => {
	init_BarHeaderAbove();
	init_BarHeaderBelow();
	import_jsx_runtime$90 = require_jsx_runtime();
	propTypes$57 = {
		filterCount: PropTypes.number,
		expandedFilters: PropTypes.bool,
		setExpandedFilters: PropTypes.func,
		resultsView: PropTypes.bool
	};
	BarHeader = ({ filterCount, expandedFilters, setExpandedFilters, resultsView }) => /* @__PURE__ */ (0, import_jsx_runtime$90.jsxs)("div", {
		className: "search-top-filter-header advanced-search",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$90.jsx)(BarHeaderAbove, { resultsView }), /* @__PURE__ */ (0, import_jsx_runtime$90.jsx)(BarHeaderBelow, {
			resultsView,
			filterCount,
			expandedFilters,
			setExpandedFilters
		})]
	});
	BarHeader.propTypes = propTypes$57;
}));
//#endregion
//#region src/js/components/search/topFilterBar/TopFilterBar.jsx
/**
* TopFilterBar.jsx
* Created by Kevin Li 12/13/16
*
* TopFilterBar is a React component that creates the sticky filter bar at the top of the search
* results page. It receives parsed filter groups from its parent Redux container.
*
* @extends React.Component
**/
var import_jsx_runtime$89, propTypes$56, TopFilterBar;
var init_TopFilterBar = __esmMin((() => {
	init_TopFilterGroupGenerator();
	init_BarHeader();
	import_jsx_runtime$89 = require_jsx_runtime();
	propTypes$56 = {
		filters: PropTypes.array,
		filterCount: PropTypes.number,
		resultsView: PropTypes.bool
	};
	TopFilterBar = memo(function TopFilterBar({ filters, filterCount, resultsView }) {
		const [expandedFilters, setExpandedFilters] = useState(false);
		const [fadeClass, setFadeClass] = useState("");
		const [bottom, setBottom] = useState(false);
		const contentRef = useRef(null);
		const newAwardsOnlyPresent = filters.find(({ code }) => code === "newAwardsOnly");
		useEffect(() => {
			const atMaxHeight = (expandedFilters ? 280 : 150) <= contentRef.current?.offsetHeight;
			let newClass = "";
			if (expandedFilters && atMaxHeight && !bottom || !expandedFilters && atMaxHeight) newClass = " fade";
			setFadeClass(newClass);
		}, [
			bottom,
			expandedFilters,
			filters
		]);
		/**
		*   useEffect for adding an eventListener that detects when the user has
		*   scrolled to the bottom of .search-top-filters-content
		* */
		useEffect(() => {
			const ref = contentRef.current;
			const onscroll = () => {
				if (contentRef.current?.scrollTop === contentRef.current?.scrollHeight - contentRef.current?.clientHeight) setBottom(true);
				else setBottom(false);
			};
			contentRef.current.addEventListener("scroll", onscroll);
			return () => {
				ref.removeEventListener("scroll", onscroll);
			};
		}, []);
		const groups = filters.map(({ code, name }) => /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)(TopFilterGroupGenerator, {
			resultsView,
			code,
			name
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$89.jsxs)("div", {
			className: "search-top-filter-bar",
			role: "complementary",
			"aria-label": "Currently applied search filters",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$89.jsx)(BarHeader, {
				resultsView,
				filterCount,
				expandedFilters,
				setExpandedFilters
			}), /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)("div", {
				className: "search-top-filters",
				children: /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)("div", {
					className: `search-top-filters-content${newAwardsOnlyPresent ? " newAwardsOnlyPresent" : ""}${expandedFilters ? " expanded" : " collapsed"}${fadeClass}`,
					ref: contentRef,
					children: groups
				})
			})]
		}) });
	});
	TopFilterBar.propTypes = propTypes$56;
}));
//#endregion
//#region src/js/containers/search/topFilterBar/TopFilterBarContainer.jsx
/**
* TopFilterBarContainer.jsx
* Created by Kevin Li 12/13/16
**/
var import_jsx_runtime$88, propTypes$55, TopFilterBarContainer;
var init_TopFilterBarContainer = __esmMin((() => {
	init_es();
	init_TopFilterBar();
	init_getFilters();
	import_jsx_runtime$88 = require_jsx_runtime();
	propTypes$55 = {
		setFilterCount: PropTypes.func,
		compressed: PropTypes.bool,
		resultsView: PropTypes.bool
	};
	TopFilterBarContainer = ({ setFilterCount, compressed = false, resultsView = false }) => {
		const reduxFilters = useSelector((state) => state.appliedFilters.filters);
		const { filters, filterCount } = useMemo(() => getFilters(reduxFilters), [reduxFilters]);
		useEffect(() => {
			if (!compressed) setFilterCount(filterCount);
		}, [
			compressed,
			filterCount,
			setFilterCount
		]);
		if (filters && filters?.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime$88.jsx)(TopFilterBar, {
			resultsView,
			filters,
			filterCount
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$88.jsx)(import_jsx_runtime$88.Fragment, {});
	};
	TopFilterBarContainer.propTypes = propTypes$55;
}));
//#endregion
//#region src/js/containers/search/resultsView/useResultsCount.jsx
var useResultsCount;
var init_useResultsCount = __esmMin((() => {
	init_modern();
	init_searchHelper();
	init_SearchAwardsOperation();
	useResultsCount = (filters, spendingLevel, hash) => {
		const filtersParamsTemp = new SearchAwardsOperation();
		filtersParamsTemp.fromState(filters);
		if (spendingLevel === "subawards") delete filtersParamsTemp.dateType;
		const filtersParams = filtersParamsTemp.toParams();
		const { data, error } = useQuery({
			queryKey: [
				"performSpendingByAwardTabCountSearch",
				filtersParams,
				spendingLevel
			],
			queryFn: () => performSpendingByAwardTabCountSearch({
				filters: filtersParams,
				spending_level: spendingLevel,
				auditTrail: "Results View - Tab Counts"
			}).promise,
			staleTime: 6e4,
			refetchOnWindowFocus: false,
			enabled: !areFiltersEqual(filters) || !hash
		});
		return {
			data,
			error
		};
	};
}));
//#endregion
//#region src/js/components/search/resultsView/NoDataScreen.jsx
var import_jsx_runtime$87, NoDataScreen;
var init_NoDataScreen = __esmMin((() => {
	import_jsx_runtime$87 = require_jsx_runtime();
	NoDataScreen = () => /* @__PURE__ */ (0, import_jsx_runtime$87.jsxs)("div", {
		className: "new-search-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$87.jsx)("img", {
			className: "no-results-icon",
			src: "graphics/No-results.svg",
			alt: "No results found. Please adjust your search filters and try again."
		}), /* @__PURE__ */ (0, import_jsx_runtime$87.jsx)("p", {
			className: "new-search__no-results-text",
			children: "No results found. Please adjust your search filters and try again."
		})]
	});
}));
//#endregion
//#region src/js/components/search/resultsView/SearchSectionWrapper/SearchSectionWrapperHeader.jsx
var import_jsx_runtime$86, propTypes$54, SearchSectionWrapperHeader;
var init_SearchSectionWrapperHeader = __esmMin((() => {
	init_index_es();
	init_ChartTableToggle();
	import_jsx_runtime$86 = require_jsx_runtime();
	propTypes$54 = {
		selectedDropdownOption: PropTypes.string,
		sectionTitle: PropTypes.string,
		dropdownOptions: PropTypes.array,
		viewType: PropTypes.string,
		changeView: PropTypes.func
	};
	SearchSectionWrapperHeader = ({ selectedDropdownOption, sectionTitle, dropdownOptions, viewType, changeView }) => {
		const wrapperWidth = document.querySelector(".search__section-wrapper-content")?.clientWidth;
		const sortFn = () => dropdownOptions;
		return /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)(import_jsx_runtime$86.Fragment, { children: selectedDropdownOption ? /* @__PURE__ */ (0, import_jsx_runtime$86.jsxs)("div", {
			className: "search__section-wrapper-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$86.jsx)("span", {
					className: "filter__dropdown-label",
					children: sectionTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$86.jsx)(fc, {
					leftIcon: "",
					size: "md",
					options: dropdownOptions,
					enabled: true,
					selectedOption: dropdownOptions?.length ? dropdownOptions?.find((obj) => obj.value === selectedDropdownOption)?.name : `${selectedDropdownOption}`,
					sortFn,
					classname: "advanced-search-dropdown__wrapper",
					buttonClassname: "advanced-search-dropdown__button",
					parentWidth: wrapperWidth
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$86.jsx)(ChartTableToggle, {
					activeType: viewType,
					changeView,
					classname: "search__chart-table-toggle"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)(import_jsx_runtime$86.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)("div", {
			className: "search__section-wrapper-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)("span", {
				className: "filter__dropdown-label",
				children: sectionTitle
			})
		}) }) });
	};
	SearchSectionWrapperHeader.propTypes = propTypes$54;
}));
//#endregion
//#region src/js/components/search/resultsView/SearchSectionWrapper/SearchSectionWrapperAccordion.jsx
var import_jsx_runtime$85, propTypes$53, SearchSectionWrapperAccordion;
var init_SearchSectionWrapperAccordion = __esmMin((() => {
	init_development();
	init_Accordion();
	init_queryParams();
	init_useQueryParams();
	import_jsx_runtime$85 = require_jsx_runtime();
	propTypes$53 = {
		openAccordion: PropTypes.bool,
		setOpenAccordion: PropTypes.func,
		dropdownOptions: PropTypes.array,
		selectedDropdownOption: PropTypes.string,
		dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
		sectionName: PropTypes.string
	};
	SearchSectionWrapperAccordion = ({ openAccordion, setOpenAccordion, dropdownOptions, selectedDropdownOption, dsmContent, sectionName }) => {
		const [contentHeight, setContentHeight] = useState(document.querySelector(".search__section-wrapper-content")?.clientHeight);
		const query = useQueryParams();
		const history = useNavigate();
		const params = useLocation().search?.split("&");
		params?.shift();
		const content = document.querySelector(`.search__${sectionName}`)?.clientHeight;
		const sectionValue = params?.length > 0 ? params[0]?.substring(8) : null;
		const jumpToSection = (section) => {
			const matchedSection = [
				"map",
				"time",
				"categories",
				"awards"
			].find((sec) => sec === section);
			if (!matchedSection) return;
			if (!document.querySelector(`.${matchedSection}`)) return;
			if (!window.location.href.includes(`section=${section}`)) {
				const newQueryParams = combineQueryParams(query, { section: `${section}` });
				history(getQueryParamString(newQueryParams));
			}
			let rectTopOffset = 0;
			if (matchedSection === "categories") rectTopOffset = 820;
			else if (matchedSection === "time") rectTopOffset = 1680;
			else if (matchedSection === "map") rectTopOffset = 2240;
			if (section && sectionValue && section === sectionValue) window.scrollTo({
				top: rectTopOffset,
				behavior: "smooth"
			});
		};
		const parseSection = () => {
			if ((params?.length === 1 || params?.length === 2) && params[0].substring(0, 8) === "section=" && sectionValue) jumpToSection(sectionValue);
		};
		useEffect(throttle(() => {
			setContentHeight(content);
			parseSection();
		}, 100), [content, sectionName]);
		return /* @__PURE__ */ (0, import_jsx_runtime$85.jsx)(Accordion, {
			setOpen: setOpenAccordion,
			closedIcon: "chevron-down",
			openIcon: "chevron-up",
			title: "Data sources and methodology",
			children: openAccordion ? /* @__PURE__ */ (0, import_jsx_runtime$85.jsxs)("div", {
				className: "search__section-wrapper-dsm",
				style: { height: `${contentHeight - 16}px` },
				children: [dropdownOptions && selectedDropdownOption && dropdownOptions.find((obj) => obj.value === selectedDropdownOption).dsmContent, dsmContent || ""]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$85.jsx)(import_jsx_runtime$85.Fragment, {})
		});
	};
	SearchSectionWrapperAccordion.propTypes = propTypes$53;
}));
//#endregion
//#region src/js/components/search/mobile/MobileSortDirectionToggle.jsx
var import_jsx_runtime$84, propTypes$52, MobileSortDirectionToggle;
var init_MobileSortDirectionToggle = __esmMin((() => {
	init_ViewTypeButton();
	import_jsx_runtime$84 = require_jsx_runtime();
	propTypes$52 = {
		sortBy: PropTypes.func,
		sort: PropTypes.object,
		setSort: PropTypes.func,
		sortDirection: PropTypes.string,
		setSortDirection: PropTypes.func,
		activeField: PropTypes.string
	};
	MobileSortDirectionToggle = ({ sortDirection, setSortDirection, activeField, sortBy, sort, setSort }) => {
		const onClick = (e) => {
			if (sortBy && setSortDirection) {
				sortBy(activeField, e);
				setSortDirection(e);
			} else if (sort && setSort) setSort(Object.assign({
				field: sort?.field,
				direction: e
			}));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$84.jsxs)("div", {
			className: "mobile-sort-direction-toggle mobile-sort-toggle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$84.jsx)(ViewTypeButton, {
				value: "desc",
				label: "descending order",
				changeView: onClick,
				active: sortDirection === "desc" || sort?.direction === "desc",
				icon: "long-arrow-alt-down"
			}), /* @__PURE__ */ (0, import_jsx_runtime$84.jsx)(ViewTypeButton, {
				value: "asc",
				label: "ascending order",
				active: sortDirection === "asc" || sort?.direction === "asc",
				changeView: onClick,
				icon: "long-arrow-alt-up"
			})]
		});
	};
	MobileSortDirectionToggle.propTypes = propTypes$52;
}));
//#endregion
//#region src/js/components/search/mobile/MobileSort.jsx
var import_jsx_runtime$83, propTypes$51, MobileSort;
var init_MobileSort = __esmMin((() => {
	init_index_es();
	init_MobileSortDirectionToggle();
	import_jsx_runtime$83 = require_jsx_runtime();
	propTypes$51 = {
		setActiveField: PropTypes.func,
		sortBy: PropTypes.func,
		sort: PropTypes.object,
		setSort: PropTypes.func,
		columns: PropTypes.array,
		sortDirection: PropTypes.string,
		tableColumns: PropTypes.object,
		setSortDirection: PropTypes.func,
		activeField: PropTypes.string
	};
	MobileSort = (props) => {
		const mobileDropdownOptions = [];
		const onClick = (e) => {
			if (props?.setActiveField && props?.sortBy) {
				props.setActiveField(e);
				props.sortBy(e, props.sortDirection);
			} else if (props?.sort && props?.setSort) props.setSort({
				field: e,
				direction: props?.sort?.direction
			});
		};
		if (props.columns) props.columns.map((column) => {
			const option = {
				name: column.displayName[0],
				value: column.title,
				onClick
			};
			mobileDropdownOptions.push(option);
		});
		else if (props.tableColumns) Object.values(props.tableColumns).map((value) => value).map((column) => {
			const option = {
				name: column.displayName,
				value: column.columnName,
				onClick
			};
			mobileDropdownOptions.push(option);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$83.jsxs)("div", {
			className: "mobile__sort",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$83.jsx)(fc, {
				options: mobileDropdownOptions,
				leftIcon: "",
				selectedOption: mobileDropdownOptions?.length ? mobileDropdownOptions?.find((obj) => obj.value === props?.activeField || obj.value === props?.sort?.field)?.name : `${props?.activeField || props.sort?.field}`,
				size: "sm",
				label: "Sort by:",
				enabled: true,
				sortFn: () => mobileDropdownOptions,
				classname: "mobile-sort__picker"
			}), /* @__PURE__ */ (0, import_jsx_runtime$83.jsx)(MobileSortDirectionToggle, {
				sortDirection: props.sortDirection,
				setSortDirection: props.setSortDirection,
				sortBy: props.sortBy,
				activeField: props?.activeField,
				sort: props?.sort,
				setSort: props?.setSort
			})]
		});
	};
	MobileSort.propTypes = propTypes$51;
}));
//#endregion
//#region src/js/components/search/resultsView/categories/CategoriesPagination.jsx
var import_jsx_runtime$82, propTypes$50, CategoriesPagination;
var init_CategoriesPagination = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$82 = require_jsx_runtime();
	propTypes$50 = {
		nextPage: PropTypes.func,
		previousPage: PropTypes.func,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		hasNextPage: PropTypes.bool,
		hasPreviousPage: PropTypes.bool,
		children: PropTypes.node,
		recipientError: PropTypes.bool
	};
	CategoriesPagination = (props) => {
		const clickPrevious = () => {
			props.previousPage();
		};
		const clickNext = () => {
			props.nextPage();
		};
		const disableNext = !props.hasNextPage || props.recipientError;
		const disablePrev = !props.hasPreviousPage;
		let hidePager = "";
		if (disableNext && disablePrev || props.loading || props.error) hidePager = "hide";
		if (props.recipientError) hidePager = "";
		return /* @__PURE__ */ (0, import_jsx_runtime$82.jsxs)("div", {
			className: `visualization-pager-container ${hidePager}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("button", {
				className: "visualization-pager",
				title: "Show previous ten",
				"aria-label": "Show previous ten",
				disabled: disablePrev,
				onClick: clickPrevious,
				children: /* @__PURE__ */ (0, import_jsx_runtime$82.jsxs)("div", {
					className: "pager-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("div", {
						className: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)(AngleLeft, { alt: "Show previous ten" })
					}), /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("div", {
						className: "pager-label",
						children: "Show previous ten"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("button", {
				className: "visualization-pager",
				title: "Show next ten",
				"aria-label": "Show next ten",
				disabled: disableNext,
				onClick: clickNext,
				children: /* @__PURE__ */ (0, import_jsx_runtime$82.jsxs)("div", {
					className: "pager-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("div", {
						className: "pager-label next",
						children: "Show next ten"
					}), /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("div", {
						className: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)(AngleRight, { alt: "Show next ten" })
					})]
				})
			})]
		});
	};
	CategoriesPagination.propTypes = propTypes$50;
}));
//#endregion
//#region src/js/components/search/resultsView/SearchSectionWrapper/SectionDataTable.jsx
/**
* SectionDataTable.jsx
*  Created by Andrea Blackwell 04/29/2024
*  */
var import_jsx_runtime$81, SectionDataTable;
var init_SectionDataTable = __esmMin((() => {
	init_index_es();
	init_mobileBreakpoints();
	init_CategoriesPagination();
	import_jsx_runtime$81 = require_jsx_runtime();
	SectionDataTable = (props) => {
		const { sortDirection, activeField } = props;
		const [rows, setRows] = useState([]);
		const [currentPage, setCurrentPage] = useState(1);
		const [windowWidth, setWindowWidth] = useState(0);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
		const pageSize = 10;
		const maxRows = props.rows;
		const columns = props.columns;
		const changePage = (page) => {
			if (props.manualSort) {
				setRows(maxRows.slice((page - 1) * pageSize, page * pageSize));
				setCurrentPage(page);
			}
		};
		const updateSort = (field, direction) => {
			setCurrentPage(1);
			props.sortBy(field, direction);
		};
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsMobile(newWidth < 992);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		useEffect(() => {
			if (props.manualSort) setRows(maxRows.slice(currentPage - 1, pageSize));
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$81.jsxs)(import_jsx_runtime$81.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$81.jsx)(ss, {
			classNames: "table-for-new-search-page award-results-table-dtui",
			currentSort: {
				direction: sortDirection,
				field: activeField
			},
			updateSort,
			columns,
			isMobile,
			isStacked: true,
			newResultsView: true,
			rows
		}), props.sectionName === "categories" ? /* @__PURE__ */ (0, import_jsx_runtime$81.jsx)(CategoriesPagination, {
			nextPage: props.nextPage,
			previousPage: props.previousPage,
			hasNextPage: props.hasNextPage,
			hasPreviousPage: props.hasPreviousPage
		}) : /* @__PURE__ */ (0, import_jsx_runtime$81.jsx)(Ka, {
			resultsText: true,
			totalItems: maxRows.length,
			pageSize,
			currentPage,
			changePage
		})] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/SearchSectionWrapper/SearchSectionWrapperContent.jsx
var import_jsx_runtime$80, propTypes$49, SearchSectionWrapperContent;
var init_SearchSectionWrapperContent = __esmMin((() => {
	init_index_es();
	init_IsMobileContext();
	init_MobileSort();
	init_SectionDataTable();
	import_jsx_runtime$80 = require_jsx_runtime();
	propTypes$49 = {
		openAccordion: PropTypes.bool,
		sectionName: PropTypes.string,
		isError: PropTypes.bool,
		isLoading: PropTypes.bool,
		hasNoData: PropTypes.bool,
		viewType: PropTypes.string,
		table: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
		columns: PropTypes.array,
		rows: PropTypes.array,
		nextPage: PropTypes.func,
		previousPage: PropTypes.func,
		hasNextPage: PropTypes.bool,
		hasPreviousPage: PropTypes.bool,
		mobileDropdownOptions: PropTypes.array,
		sortDirection: PropTypes.string,
		setSortDirection: PropTypes.func,
		activeField: PropTypes.string,
		setActiveField: PropTypes.func,
		sort: PropTypes.object,
		setSort: PropTypes.func,
		sortBy: PropTypes.func,
		tableColumns: PropTypes.object,
		downloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
		children: PropTypes.element
	};
	SearchSectionWrapperContent = ({ openAccordion, sectionName, isError, isLoading, hasNoData, viewType, table, columns, rows, nextPage, previousPage, hasNextPage, hasPreviousPage, mobileDropdownOptions, sortDirection, setSortDirection, activeField, setActiveField, sort, setSort, sortBy, tableColumns, downloadComponent, children }) => {
		const { isTablet } = useContext(IsMobileContext);
		const Message = () => {
			if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(Wo, {});
			else if (isError) return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(fo, {});
			else if (hasNoData) return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(Go, {});
			return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(import_jsx_runtime$80.Fragment, {});
		};
		const Content = () => {
			if (table) return table;
			return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(SectionDataTable, {
				columns,
				rows,
				sortBy,
				activeField,
				sortDirection,
				manualSort: true,
				sectionName,
				nextPage,
				previousPage,
				hasNextPage,
				hasPreviousPage
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(import_jsx_runtime$80.Fragment, { children: !openAccordion && /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)("div", {
			className: `search__section-wrapper-content new-results-view search__${sectionName}`,
			children: isError || isLoading || hasNoData ? /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(Message, {}) : /* @__PURE__ */ (0, import_jsx_runtime$80.jsxs)(import_jsx_runtime$80.Fragment, { children: [
				(viewType === "table" || sectionName === "table") && isTablet ? /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(MobileSort, {
					columns,
					options: mobileDropdownOptions,
					sortDirection,
					setSortDirection,
					activeField,
					field: sort?.field,
					setActiveField,
					sortBy,
					sort,
					tableColumns: tableColumns?.data,
					setSort
				}) : null,
				downloadComponent,
				viewType === "table" ? /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)(Content, {}) : children
			] })
		}) });
	};
	SearchSectionWrapperContent.propTypes = propTypes$49;
}));
//#endregion
//#region src/js/components/search/resultsView/SearchSectionWrapper/SearchSectionWrapper.jsx
/**
* SearchSectionWrapper.jsx
* Created by Josue Aguilar 3/19/2024
*/
var import_jsx_runtime$79, propTypes$48, SearchSectionWrapper;
var init_SearchSectionWrapper = __esmMin((() => {
	init_Analytics();
	init_SearchSectionWrapperHeader();
	init_SearchSectionWrapperAccordion();
	init_SearchSectionWrapperContent();
	import_jsx_runtime$79 = require_jsx_runtime();
	propTypes$48 = {
		sectionTitle: PropTypes.string,
		dropdownOptions: PropTypes.array,
		selectedDropdownOption: PropTypes.string,
		dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
		isLoading: PropTypes.bool,
		isError: PropTypes.bool,
		hasNoData: PropTypes.bool,
		columns: PropTypes.array,
		rows: PropTypes.array,
		sortBy: PropTypes.func,
		sortDirection: PropTypes.string,
		setSortDirection: PropTypes.func,
		sort: PropTypes.object,
		setSort: PropTypes.func,
		activeField: PropTypes.string,
		setActiveField: PropTypes.func,
		downloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
		mapViewType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		setMapViewType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
		children: PropTypes.element,
		table: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
		sectionName: PropTypes.string,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string,
		onToggle: PropTypes.func,
		showToggle: PropTypes.bool,
		tableColumns: PropTypes.object,
		hasNextPage: PropTypes.bool,
		hasPreviousPage: PropTypes.bool,
		nextPage: PropTypes.func,
		previousPage: PropTypes.func
	};
	SearchSectionWrapper = ({ sectionTitle, dropdownOptions, selectedDropdownOption, children, dsmContent, isLoading, hasNoData, isError, columns, tableColumns, rows, table, sortBy, sortDirection, activeField, setActiveField, downloadComponent, sectionName, mapViewType = false, setMapViewType = false, hash, spendingLevel, onToggle, showToggle, setSortDirection, sort, setSort, hasNextPage, hasPreviousPage, nextPage, previousPage }) => {
		const [openAccordion, setOpenAccordion] = useState(false);
		const [trackDSMEvent, setTrackDSMEvent] = useState(false);
		const [viewType, setViewType] = useState("chart");
		const gaRef = useRef(false);
		const mobileDropdownOptions = [];
		const changeView = (label) => {
			setViewType(label);
			if (mapViewType) setMapViewType(label);
		};
		useEffect(() => {
			if (gaRef.current) Analytics.event({
				category: `Section ${sectionName}: ${selectedDropdownOption}`,
				action: `Viewed ${selectedDropdownOption} ${viewType}`,
				label: hash
			});
			else gaRef.current = true;
		}, [viewType]);
		useEffect(() => {
			const action = openAccordion ? "open DS&M" : "close DS&M";
			let prefix = "Prime Awards Table";
			switch (sectionName) {
				case "categories":
					prefix = `Categories ${selectedDropdownOption}`;
					break;
				case "time":
					prefix = `Time ${selectedDropdownOption}`;
					break;
				case "map":
					prefix = `Map ${selectedDropdownOption}`;
					break;
				default:
					if (spendingLevel === "subawards") {
						prefix = "Subawards Table";
						break;
					} else if (spendingLevel === "transactions") {
						prefix = "Transactions Table ";
						break;
					}
					break;
			}
			if (trackDSMEvent) Analytics.event({
				category: "Advanced Search - Results View DSM",
				action,
				label: `${prefix} DS&M`
			});
			setTrackDSMEvent(true);
		}, [openAccordion]);
		return /* @__PURE__ */ (0, import_jsx_runtime$79.jsxs)("div", {
			className: "search__section-wrapper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$79.jsx)(SearchSectionWrapperHeader, {
					selectedDropdownOption,
					sectionTitle,
					dropdownOptions,
					viewType,
					showToggle,
					onToggle,
					changeView
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$79.jsx)(SearchSectionWrapperContent, {
					openAccordion,
					sectionName,
					isError,
					isLoading,
					hasNoData,
					viewType,
					table,
					columns,
					rows,
					nextPage,
					previousPage,
					hasNextPage,
					hasPreviousPage,
					mobileDropdownOptions,
					sortDirection,
					setSortDirection,
					activeField,
					setActiveField,
					sort,
					setSort,
					sortBy,
					tableColumns,
					downloadComponent,
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$79.jsx)(SearchSectionWrapperAccordion, {
					openAccordion,
					setOpenAccordion,
					dropdownOptions,
					selectedDropdownOption,
					dsmContent,
					sectionName
				})
			]
		});
	};
	SearchSectionWrapper.propTypes = propTypes$48;
}));
//#endregion
//#region src/js/containers/search/resultsView/useResultsTableSearch.jsx
var getAwardTypeGroup, getFields, getSortOrder, useResultsTableSearch;
var init_useResultsTableSearch = __esmMin((() => {
	init_modern();
	init_searchHelper();
	init_SearchAwardsOperation();
	init_awardType();
	init_awardTableColumns();
	getAwardTypeGroup = (spendingLevel, tableType, awardType) => {
		const awardTypeGroup = spendingLevel === "subawards" ? subawardTypeGroups[tableType] : awardTypeGroups[tableType];
		if (awardType.size === 0) return awardTypeGroup;
		let intersectingTypes = intersection(awardTypeGroup, [...awardType]);
		if (!intersectingTypes || intersectingTypes.length === 0) intersectingTypes = ["no intersection"];
		return intersectingTypes;
	};
	getFields = (tableType, columns) => {
		const fields = [];
		const columnVisibility = columns[tableType]?.visibleOrder;
		if (!columnVisibility) return null;
		columnVisibility.forEach((field) => {
			if (!fields.includes(field) && field !== "Action Date") if (Object.keys(apiFieldByTableColumnName).includes(field)) fields.push(apiFieldByTableColumnName[field]);
			else fields.push(field);
			else if (field === "Action Date") fields.push("Sub-Award Date");
		});
		fields.push("recipient_id", "prime_award_recipient_id");
		return fields;
	};
	getSortOrder = (searchOrder, grouped) => {
		let sort = searchOrder?.field;
		let order = searchOrder?.direction;
		if (!order) order = "desc";
		if (sort === "Action Date") sort = "Sub-Award Date";
		if (grouped) sort = "award_id";
		return {
			sort,
			order
		};
	};
	useResultsTableSearch = (searchFilters, tableType, spendingLevel, limit, searchOrder, grouped, page, columns) => {
		const fields = getFields(tableType, columns);
		const { sort, order } = getSortOrder(searchOrder, grouped);
		const filtersTemp = new SearchAwardsOperation();
		filtersTemp.fromState(searchFilters);
		if (spendingLevel === "subawards" && filtersTemp.dateType) delete filtersTemp.dateType;
		filtersTemp.awardType = getAwardTypeGroup(spendingLevel, tableType, searchFilters.awardType);
		const params = {
			auditTrail: "Results Table - Spending by award search",
			filters: filtersTemp.toParams(),
			limit,
			order,
			page,
			sort
		};
		const { isPending, error, data } = useQuery({
			queryKey: [
				grouped ? "performSpendingBySubawardGrouped" : "performSpendingByAwardSearch",
				limit,
				page,
				sort,
				order,
				spendingLevel,
				grouped,
				tableType,
				searchFilters
			],
			queryFn: () => {
				if (grouped) return performSpendingBySubawardGrouped(params).promise;
				return performSpendingByAwardSearch({
					...params,
					fields,
					spending_level: spendingLevel
				}).promise;
			},
			staleTime: 6e4,
			refetchOnWindowFocus: false,
			enabled: !!filtersTemp.awardType
		});
		const results = data?.data ? data?.data.results.map((result) => ({
			...result,
			generated_internal_id: encodeURIComponent(result.generated_internal_id)
		})) : [];
		return {
			isLoading: isPending,
			error,
			results,
			total: results?.length,
			tableInstance: uniqueId(),
			page: data?.data?.page_metadata.page,
			lastPage: !data?.data?.page_metadata.hasNext
		};
	};
}));
//#endregion
//#region src/js/containers/search/resultsView/ResultsTableContainer.jsx
/**
* ResultsTableContainer.jsx
* Created by Kevin Li 11/8/16
**/
var import_jsx_runtime$78, createColumn, columns$2, propTypes$47, ResultsTableContainer;
var init_ResultsTableContainer = __esmMin((() => {
	init_development();
	init_es();
	init_searchSubAwardTableActions();
	init_textMeasurement();
	init_Analytics();
	init_table();
	init_awardTableColumns();
	init_awardTableColumnTypes();
	init_ResultsTableSection();
	init_SearchSectionWrapper();
	init_useResultsTableSearch();
	import_jsx_runtime$78 = require_jsx_runtime();
	createColumn = (col) => {
		const direction = "desc";
		const width = col.customWidth || measureTableHeader(col.displayName || col.title);
		return {
			columnName: col.title,
			displayName: col.displayName || col.title,
			subtitle: col.subtitle || "",
			width,
			background: col.background || "",
			defaultDirection: direction,
			right: col.right || false
		};
	};
	columns$2 = tableTypes.concat(subTypes).concat(transactionTypes).reduce((cols, type) => {
		const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
		const parsedColumns = defaultColumns(type.internal).reduce((parsedCols, data) => Object.assign({}, parsedCols, { [data.title]: createColumn(data) }), {});
		return Object.assign(cols, { [type.internal]: {
			visibleOrder: visibleColumns,
			data: parsedColumns
		} });
	}, {});
	propTypes$47 = {
		tabData: PropTypes.object,
		spendingLevel: PropTypes.string,
		hash: PropTypes.string,
		sectionTitle: PropTypes.string,
		dsmContent: PropTypes.element,
		sectionName: PropTypes.string
	};
	ResultsTableContainer = memo(function ResultsTableContainer({ tabData, spendingLevel, hash, sectionTitle, dsmContent, sectionName }) {
		const location = useLocation();
		const dispatch = useDispatch();
		const filters = useSelector((state) => state.appliedFilters.filters);
		const [page, setPage] = useState(1);
		const [tableType, setTableType] = useState(spendingLevel === "subawards" ? "subcontracts" : "contracts");
		const [sort, setSort] = useState({
			field: spendingLevel === "subawards" ? "Sub-Award Amount" : "Award Amount",
			direction: "desc"
		});
		const [resultLimit, setResultLimit] = useState(100);
		const [isLoadingNextPage, setLoadNextPage] = useState(false);
		const [isMobile, setIsMobile] = useState(false);
		const isSubaward = spendingLevel === "subawards";
		const loadExpandableData = isSubaward && spendingLevel === "awards" && !isMobile;
		const counts = tabData.results;
		const { isLoading, error, results, total, tableInstance, lastPage } = useResultsTableSearch(filters, tableType, spendingLevel, resultLimit, sort, loadExpandableData, page, columns$2);
		const updateFilters = throttle(() => setPage(1), 350);
		const switchTab = (tab) => {
			const newState = { tableType: tab };
			const currentSortField = sort.field;
			const availableFields = columns$2[tab].data;
			if (!Object.prototype.hasOwnProperty.call(availableFields, currentSortField)) {
				const field = defaultSort(tab);
				const fieldType = awardTableColumnTypes[field];
				let direction = "desc";
				if (fieldType === "number") direction = "asc";
				newState.sort = {
					field,
					direction
				};
			}
			setTableType(tab);
			if (newState.sort) setSort(Object.assign(newState.sort));
			setPage(1);
			Analytics.event({
				event: "search_table_tab",
				category: "Advanced Search - Table Tab",
				action: tab,
				gtm: true
			});
		};
		const parseTabCounts = () => {
			let firstAvailable = "";
			let i = 0;
			let availableTabs = tableTypes;
			if (isSubaward) availableTabs = subTypes;
			while (firstAvailable === "" && i < availableTabs.length) {
				const tableTypeTemp = availableTabs[i].internal;
				if (counts[tableTypeTemp] > 0) firstAvailable = tableTypeTemp;
				i += 1;
			}
			if (firstAvailable === "") firstAvailable = availableTabs[0].internal;
			switchTab(firstAvailable);
			updateFilters();
		};
		const loadNextPage = () => {
			if (isLoading) return;
			if (!lastPage) {
				setPage((prevState) => prevState + 1);
				setLoadNextPage(true);
			}
		};
		const updateSort = (field, direction) => setSort({
			field,
			direction
		});
		const awardIdClick = (id) => {
			Analytics.event({
				event: "search_award_click",
				category: "Advanced Search - Spending by Prime Award",
				action: `Clicked ${id}`,
				label: new URLSearchParams(location.search).get("hash"),
				gtm: true
			});
		};
		const subAwardIdClick = (id) => {
			Analytics.event({
				event: "search_subaward_click",
				category: "Advanced Search - Link",
				action: "Subaward ID Clicked",
				label: id,
				gtm: true
			});
			dispatch(subAwardIdClicked(true));
		};
		const tabsWithCounts = (isSubaward ? subTypes : tableTypes).map((type) => ({
			...type,
			count: counts[type.internal],
			disabled: counts[type.internal] === 0
		}));
		const formattedSubSort = () => {
			const formattedSort = sort;
			if (formattedSort?.field === "Sub-Award Date") formattedSort.field = "Action Date";
			return formattedSort;
		};
		const onToggleSpendingLevel = () => {};
		useEffect(() => {
			parseTabCounts(tabData);
		}, [tabData]);
		useEffect(throttle(() => {
			if (isLoadingNextPage) setLoadNextPage(false);
		}, 400), [isLoadingNextPage]);
		if (!columns$2[tableType]) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)(SearchSectionWrapper, {
			isError: error,
			isLoading,
			noData: total === 0,
			hash,
			spendingLevel,
			sort,
			setSort,
			onToggle: onToggleSpendingLevel,
			showToggle: true,
			tableColumns: columns$2[tableType],
			sectionTitle,
			dsmContent,
			sectionName,
			manualSort: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)(ResultsTableSection, {
				error,
				inFlight: isLoading,
				results: loadExpandableData ? [] : results,
				columns: columns$2[tableType],
				sort: spendingLevel !== "transactions" ? formattedSubSort() : sort,
				tableTypes: tabsWithCounts,
				currentType: tableType,
				tableInstance,
				switchTab,
				updateSort,
				loadNextPage,
				spendingLevel,
				awardIdClick,
				subAwardIdClick,
				page,
				setPage,
				total,
				resultsLimit: resultLimit,
				setResultLimit,
				resultsCount: counts[tableType],
				showToggle: true,
				expandableData: loadExpandableData ? results : [],
				filters,
				checkMobile: (isMobileState) => setIsMobile(isMobileState),
				columnType: spendingLevel,
				subColumnOptions: columns$2
			})
		});
	});
	ResultsTableContainer.propTypes = propTypes$47;
}));
//#endregion
//#region src/js/components/search/resultsView/table/TableDsm.jsx
var import_jsx_runtime$77, TableDsm;
var init_TableDsm = __esmMin((() => {
	init_development();
	init_slideoutHelper();
	init_GlossaryLink();
	import_jsx_runtime$77 = require_jsx_runtime();
	TableDsm = ({ spendingLevel }) => {
		const openAboutTheDataSidebar = (e, entry) => {
			showSlideout("atd", { url: entry });
			e.preventDefault();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)(import_jsx_runtime$77.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("h4", { children: "What's included in this view of the data?" }), spendingLevel === "subawards" ? /* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)(import_jsx_runtime$77.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("p", {
				style: { marginBottom: "8px" },
				children: "View a list of sub-award transactions based on your selected filters. Click the Sub-Award ID or Prime Award ID for additional details on the prime award. You can also learn more about the prime award’s recipient by clicking the Prime Recipient Name."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)("p", {
				className: "award-search__body-text",
				children: [
					"The rows in the table represent",
					/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("span", {
						className: "award-search__glossary-term",
						children: " sub-awards "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(GlossaryLink, { term: "sub-award" }),
					" ",
					"that meet the selected filter criteria. The results do not reflect sub-awards whose",
					/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("span", {
						className: "award-search__glossary-term",
						children: " prime awards "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(GlossaryLink, { term: "prime-award" }),
					" ",
					"meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)("p", {
				className: "award-search__body-text",
				children: [
					"Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)("span", {
						className: "award-search__subaward-note",
						children: [
							"Note that there are several documented issues related to\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(Link, {
								to: "",
								"aria-label": "Open the About the Data",
								onClick: (e) => openAboutTheDataSidebar(e, "subaward-data-quality"),
								children: "subaward data quality"
							}),
							" in our About the Data module."
						]
					})
				]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)(import_jsx_runtime$77.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("p", {
			style: { marginBottom: "8px" },
			children: "View a list of award summaries based on your selected filters. Click the Award ID, Recipient Name, or Awarding Agency to find more detailed information on individual awards including transaction history, subawards, and more."
		}), spendingLevel === "awards" && /* @__PURE__ */ (0, import_jsx_runtime$77.jsxs)("p", {
			className: "award-search__body-text",
			children: [
				"The rows in the table represent award summaries for",
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("span", {
					className: "award-search__glossary-term",
					children: " prime awards "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(GlossaryLink, { term: "prime-award" }),
				". Award summaries contain all the individual transactions and modifications that share the same unique award ID. If you selected any Time Period filter, your results will include prime awards where the",
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("span", {
					className: "award-search__glossary-term",
					children: " earliest "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(GlossaryLink, { term: "base-transaction-action-date" }),
				" ",
				"and",
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("span", {
					className: "award-search__glossary-term",
					children: " latest "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$77.jsx)(GlossaryLink, { term: "latest-transaction-action-date" }),
				" ",
				"transactions overlap with your selected time period (regardless of whether any transactions occur within that period)."
			]
		})] })] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/table/TableSection.jsx
/**
* TableSection.jsx
*/
var import_jsx_runtime$76, propTypes$46, TableSection;
var init_TableSection = __esmMin((() => {
	init_ResultsTableContainer();
	init_TableDsm();
	import_jsx_runtime$76 = require_jsx_runtime();
	propTypes$46 = {
		tabData: PropTypes.object,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string
	};
	TableSection = ({ tabData, hash, spendingLevel }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)("div", {
			id: "search-page-component",
			className: "awards",
			children: /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)(ResultsTableContainer, {
				tabData,
				hash,
				spendingLevel,
				sectionTitle: spendingLevel === "awards" ? "Prime Award Results" : "Subaward Results",
				dsmContent: useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)(TableDsm, { spendingLevel }), [spendingLevel]),
				sectionName: "table"
			})
		});
	};
	TableSection.propTypes = propTypes$46;
}));
//#endregion
//#region src/js/models/v2/search/visualizations/rank/BaseSpendingByCategoryResult.js
var defaultNameTemplate, BaseSpendingByCategoryResult;
var init_BaseSpendingByCategoryResult = __esmMin((() => {
	init_moneyFormatter();
	defaultNameTemplate = (code, name) => {
		if (code) return `${code} - ${name}`;
		return name;
	};
	BaseSpendingByCategoryResult = {
		populate(data) {
			this.id = data.id;
			this._name = data.name || "--";
			this._code = data.code || "";
			this._amount = data.amount || 0;
			this.recipientId = data.recipient_id || "";
			this._agencySlug = data.agency_slug || "";
			this._nameTemplate = defaultNameTemplate;
		},
		set nameTemplate(template) {
			this._nameTemplate = template;
		},
		get amount() {
			return formatMoneyWithPrecision(this._amount, 0);
		},
		get name() {
			return this._nameTemplate(this._code, this._name);
		}
	};
}));
//#endregion
//#region src/js/dataMapping/search/spendingByCategory.js
var categoryNames;
var init_spendingByCategory = __esmMin((() => {
	categoryNames = {
		awardingAgency: "Awarding Agency",
		cfda: "Assistance Listing (CFDA Program)",
		industryCode: "Industry Code",
		recipient: "Recipient"
	};
}));
//#endregion
//#region src/js/components/search/resultsView/categories/CategoriesSectionWrapper.jsx
var import_jsx_runtime$75, propTypes$45, CategoriesSectionWrapper;
var init_CategoriesSectionWrapper = __esmMin((() => {
	init_CategoriesPagination();
	import_jsx_runtime$75 = require_jsx_runtime();
	propTypes$45 = {
		nextPage: PropTypes.func,
		previousPage: PropTypes.func,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		hasNextPage: PropTypes.bool,
		hasPreviousPage: PropTypes.bool,
		children: PropTypes.node,
		recipientError: PropTypes.bool
	};
	CategoriesSectionWrapper = ({ nextPage, previousPage, loading, error, hasNextPage, hasPreviousPage, children, recipientError }) => /* @__PURE__ */ (0, import_jsx_runtime$75.jsxs)(import_jsx_runtime$75.Fragment, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime$75.jsx)(CategoriesPagination, {
		nextPage,
		previousPage,
		loading,
		error,
		hasNextPage,
		hasPreviousPage,
		recipientError
	})] });
	CategoriesSectionWrapper.propTypes = propTypes$45;
}));
//#endregion
//#region src/js/containers/search/resultsView/CategoriesVisualizationWrapperContainer.jsx
/**
* CategoriesVisualizationWrapperContainer.jsx (previously RankVisualizationWrapperContainer.jsx)
* Created by michaelbray on 4/3/17.
*/
var import_jsx_runtime$74, combinedActions$1, propTypes$44, columns$1, CategoriesVisualizationWrapperContainer, CategoriesVisualizationWrapperContainer_default;
var init_CategoriesVisualizationWrapperContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_development();
	init_searchFilterActions();
	init_appliedFilterActions();
	init_Analytics();
	init_searchHelper();
	init_SearchAwardsOperation();
	init_BaseSpendingByCategoryResult();
	init_spendingByCategory();
	init_SearchSectionWrapper();
	init_SpendingByCategoriesChart();
	init_CategoriesSectionWrapper();
	init_moneyFormatter();
	import_jsx_runtime$74 = require_jsx_runtime();
	combinedActions$1 = Object.assign({}, searchFilterActions_exports, { setAppliedFilterCompletion });
	propTypes$44 = {
		reduxFilters: PropTypes.object,
		setAppliedFilterCompletion: PropTypes.func,
		noApplied: PropTypes.bool,
		agencyIds: oneOfType([PropTypes.array, PropTypes.object]),
		error: PropTypes.bool,
		wrapperProps: PropTypes.object,
		setSelectedDropdown: PropTypes.func,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string,
		selectedDropdown: PropTypes.string
	};
	columns$1 = {
		recipient: [{
			title: "name",
			displayName: ["Recipient Name"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}],
		awarding_agency: [{
			title: "awarding_agency",
			displayName: ["Awarding Agency"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}],
		awarding_subagency: [{
			title: "awarding_subagency",
			displayName: ["Awarding Subagency"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}],
		cfda: [{
			title: "cfda",
			displayName: ["Assistance Listing"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}],
		naics: [{
			title: "naics",
			displayName: ["North American Industry Classification System (NAICS)"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}],
		psc: [{
			title: "psc",
			displayName: ["Product and Service Code (PSC)"],
			right: false
		}, {
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}]
	};
	CategoriesVisualizationWrapperContainer = (props) => {
		const [sortDirection, setSortDirection] = useState("desc");
		const [activeField, setActiveField] = useState("obligations");
		const [spendingBy, setSpendingBy] = useState("awardingAgency");
		const [labeledtableData, setlabeledTableData] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [recipientError, setRecipientError] = useState(false);
		const [labelSeries, setLabelSeries] = useState([]);
		const [dataSeries, setDataSeries] = useState([]);
		const [descriptions, setDescriptions] = useState([]);
		const [linkSeries, setLinkSeries] = useState([]);
		const [page, setPage] = useState(1);
		const [scope, setScope] = useState(props.selectedDropdown);
		const [next, setNext] = useState("");
		const [previous, setPrevious] = useState("");
		const [hasNextPage, setHasNextPage] = useState(false);
		const [hasPreviousPage, setHasPreviousPage] = useState(false);
		const [tableRows, setTableRows] = useState([]);
		const [searchParams] = useSearchParams();
		let apiRequest;
		const childProps = {
			spendingBy,
			loading,
			error,
			labelSeries,
			dataSeries,
			descriptions,
			linkSeries,
			page,
			scope,
			next,
			previous,
			hasNextPage,
			hasPreviousPage,
			recipientError
		};
		const createTableRows = (rows) => {
			const rowsArray = [];
			rows.forEach((row) => {
				const rowArray = [];
				Object.keys(row).forEach((key) => {
					if (key === "obligations") rowArray.push(formatMoneyWithPrecision(row[key], 0));
					else if (row[key].value === void 0) rowArray.push(row[key]);
					else rowArray.push(row[key]?.value);
				});
				rowsArray.push(rowArray);
			});
			setTableRows(rowsArray);
		};
		const sortBy = useCallback((field, direction) => {
			const updatedTable = [...labeledtableData];
			if (direction === "asc") updatedTable.sort((a, b) => {
				if (field === "obligations") return a[field] - b[field];
				return a.name.title.localeCompare(b.name.title);
			});
			if (direction === "desc") updatedTable.sort((a, b) => {
				if (field === "obligations") return b[field] - a[field];
				return b.name.title.localeCompare(a.name.title);
			});
			setSortDirection(direction);
			setActiveField(field);
			createTableRows(updatedTable);
		}, [labeledtableData]);
		const parseRank = () => {
			const section = searchParams.get("section");
			const type = searchParams.get("type");
			if (section && type) {
				const rankVal = type;
				if (rankVal === "naics" || rankVal === "psc") props.setSelectedDropdown(rankVal);
			}
		};
		const nextPage = useCallback(() => {
			if (hasNextPage) setPage((prevState) => prevState + 1);
		}, [hasNextPage]);
		const previousPage = useCallback(() => {
			const prevPage = max([1, page - 1]);
			setPage(prevPage);
		}, [page]);
		const onClickHandler = (linkName) => {
			Analytics.event({
				category: `Section ${props.wrapperProps.sectionName}: ${props.wrapperProps.selectedDropdownOption}`,
				action: `Clicked ${linkName}`
			});
		};
		const parseData = (data) => {
			const tempLabelSeries = [];
			const tempDataSeries = [];
			const tempDescriptions = [];
			const tempLinkSeries = [];
			const tableData = [];
			data.results.forEach((item) => {
				const tableDataRow = [];
				const result = Object.create(BaseSpendingByCategoryResult);
				result.populate(item);
				if (scope === "awarding_agency" || scope === "awarding_subagency") result.nameTemplate = (code, name) => {
					if (code) return `${name} (${code})`;
					return name;
				};
				if (scope === "recipient") result.nameTemplate = (code, name) => name;
				tempLabelSeries.push(result.name);
				tempDataSeries.push(result._amount);
				if (scope === "recipient" && props.spendingLevel !== "subawards") {
					const recipientLink = result.recipientId ? `recipient/${result.recipientId}/latest` : "";
					tempLinkSeries.push(recipientLink);
					if (recipientLink !== "") tableDataRow.name = {
						value: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("a", {
							href: recipientLink,
							onClick: () => {
								onClickHandler(result.name);
							},
							children: result.name
						}),
						title: result.name
					};
					else tableDataRow.name = result.name;
				} else if (scope === "awarding_agency" && props.spendingLevel !== "subawards") {
					const awardingLink = `agency/${result._agencySlug}`;
					tempLinkSeries.push(awardingLink);
					tableDataRow.name = {
						value: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("a", {
							href: awardingLink,
							onClick: () => {
								onClickHandler(result.name);
							},
							children: result.name
						}),
						title: result.name
					};
				} else if (scope === "awarding_agency" && props.spendingLevel === "subawards" && props.agencyIds) {
					const awardingLink = `agency/${!props.error ? props.agencyIds[item.id] : ""}`;
					tempLinkSeries.push(awardingLink);
					tableDataRow.name = {
						value: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("a", {
							href: awardingLink,
							onClick: () => {
								onClickHandler(result.name);
							},
							children: result.name
						}),
						title: result.name
					};
				} else tableDataRow.name = {
					value: result.name,
					title: result.name
				};
				tableDataRow.obligations = result._amount;
				const description = `Spending by ${result.name}: ${result.amount}`;
				tempDescriptions.push(description);
				tableData.push(tableDataRow);
			});
			setlabeledTableData(tableData);
			setLabelSeries(tempLabelSeries);
			setDataSeries(tempDataSeries);
			setDescriptions(tempDescriptions);
			setLinkSeries(tempLinkSeries);
			setNext(data.page_metadata.next);
			setPrevious(data.page_metadata.previous);
			setHasNextPage(data.page_metadata.hasNext);
			setHasPreviousPage(data.page_metadata.hasPrevious);
			setLoading(false);
			setError(false);
		};
		const getSpendingLevel = (spendingLevel) => {
			if (spendingLevel === "subawards") return spendingLevel;
			return "transactions";
		};
		const fetchData = () => {
			props.setAppliedFilterCompletion(false);
			setLoading(true);
			setError(false);
			setRecipientError(false);
			if (apiRequest) apiRequest.cancel();
			const auditTrail = `${categoryNames[spendingBy]} Rank Visualization`;
			const operation = new SearchAwardsOperation();
			operation.fromState(props.reduxFilters);
			if (props.spendingLevel === "subawards" && operation.dateType) delete operation.dateType;
			const apiSearchParams = operation.toParams();
			apiRequest = performSpendingByCategorySearch({
				category: scope,
				filters: apiSearchParams,
				limit: 10,
				page,
				auditTrail,
				spending_level: getSpendingLevel(props.spendingLevel)
			});
			apiRequest.promise.then((res) => {
				parseData(res.data);
				apiRequest = null;
			}).catch((err) => {
				if (isCancel(err)) return;
				const responseDetail = get(err, "response.data.detail", "");
				props.setAppliedFilterCompletion(true);
				apiRequest = null;
				console.log(err);
				setLoading(false);
				setError(true);
				setRecipientError(responseDetail === "Current filters return too many unique items. Narrow filters to return results.");
			});
		};
		const newSearch = () => {
			setPage(1);
			setHasNextPage(true);
			fetchData();
		};
		useEffect(() => {
			sortBy("obligations", "desc");
		}, [labeledtableData, scope]);
		useEffect(() => {
			fetchData();
		}, [page]);
		useEffect(() => {
			props.setAppliedFilterCompletion(true);
		}, [
			labelSeries,
			dataSeries,
			descriptions,
			linkSeries,
			loading,
			error,
			next,
			previous,
			hasNextPage,
			hasPreviousPage
		]);
		useEffect(() => {
			parseRank();
		}, []);
		useEffect(() => {
			newSearch();
		}, [scope]);
		useEffect(() => {
			setScope(props.selectedDropdown);
		}, [props.selectedDropdown]);
		useEffect(() => {
			if (!props.noApplied) newSearch();
		}, [
			props.reduxFilters,
			scope,
			props.spendingLevel
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("div", {
			className: "results-visualization-rank-section",
			id: "results-section-rank",
			children: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)(SearchSectionWrapper, {
				...props.wrapperProps,
				...childProps,
				page,
				setPage,
				columns: columns$1[scope],
				sortBy,
				setSortDirection,
				rows: tableRows,
				sortDirection,
				activeField,
				setActiveField,
				isLoading: childProps?.loading,
				isError: childProps?.error,
				hasNoData: childProps?.labelSeries?.length === 0,
				hash: props.hash,
				hasNextPage,
				hasPreviousPage,
				nextPage,
				previousPage,
				children: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)(CategoriesSectionWrapper, {
					...childProps,
					nextPage,
					previousPage,
					children: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)(SpendingByCategoriesChart, {
						...childProps,
						hash: props.hash
					})
				})
			})
		});
	};
	CategoriesVisualizationWrapperContainer.propTypes = propTypes$44;
	CategoriesVisualizationWrapperContainer_default = connect_default((state) => ({
		reduxFilters: state.appliedFilters.filters,
		noApplied: state.appliedFilters._empty,
		spendingLevel: state.searchView.spendingLevel
	}), (dispatch) => bindActionCreators(combinedActions$1, dispatch))(CategoriesVisualizationWrapperContainer);
}));
//#endregion
//#region src/js/components/search/resultsView/PlaceholderComponent.jsx
var import_jsx_runtime$73, PlaceholderComponent;
var init_PlaceholderComponent = __esmMin((() => {
	import_jsx_runtime$73 = require_jsx_runtime();
	PlaceholderComponent = () => /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)("div", {
		className: "search__placeholder",
		children: "PLACEHOLDER"
	});
}));
//#endregion
//#region src/js/components/search/resultsView/categories/CategoriesDsm.jsx
var import_jsx_runtime$72, CategoriesDsm;
var init_CategoriesDsm = __esmMin((() => {
	init_es();
	init_development();
	init_aboutTheDataSidebarHelper();
	init_slideoutHelper();
	init_GlossaryLink();
	import_jsx_runtime$72 = require_jsx_runtime();
	CategoriesDsm = ({ spendingLevel }) => {
		const isDefCodeInFilter = useSelector((state) => state.appliedFilters.filters)?.defCodes?.counts;
		const openAboutTheDataSidebar = (e, entry) => {
			showSlideout("atd", { url: entry });
			e.preventDefault();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)(import_jsx_runtime$72.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("h4", { children: "What's included in this view of the data?" }),
			spendingLevel === "subawards" ? /* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)(import_jsx_runtime$72.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("p", {
					style: { marginBottom: "8px" },
					children: "View a list of sub-award transactions based on your selected filters. Click the Sub-Award ID or Prime Award ID for additional details on the prime award. You can also learn more about the prime award’s recipient by clicking the Prime Recipient Name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"The rows in the table represent",
						/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
							className: "award-search__glossary-term",
							children: " sub-awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "sub-award" }),
						" ",
						"that meet the selected filter criteria. The results do not reflect sub-awards whose",
						/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
							className: "award-search__glossary-term",
							children: " prime awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "prime-award" }),
						" ",
						"meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("span", {
							className: "award-search__subaward-note",
							children: [
								"Note that there are several documented issues related to\xA0",
								/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(Link, {
									to: "",
									"aria-label": "Open the About the Data",
									onClick: (e) => openAboutTheDataSidebar(e, "subaward-data-quality"),
									children: "subaward data quality"
								}),
								" ",
								"in our About the Data module."
							]
						})
					]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)(import_jsx_runtime$72.Fragment, { children: [getAtdDefcText(isDefCodeInFilter?.length > 0, true), /* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("p", { children: [
				"The data in the chart represent",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " federal action "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "federal-action-obligation" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " obligation "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "obligation" }),
				" ",
				"amounts for prime award",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " transactions "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "transaction" }),
				" ",
				"within the selected filters. Loan awards use the",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " subsidy cost "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "loan-subsidy-cost" }),
				" ",
				"rather than the obligated amount to sum up",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " value of the loan "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "face-value-of-loan" }),
				".",
				" ",
				"Prime award transactions with the same unique award ID are grouped under a single prime award summary."
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("h4", { children: "Awarding Agency and Awarding Subagency" }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("p", { children: "View a list of the top Agencies from highest to lowest. View your results by Awarding Agency or Sub Agency." }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("h4", { children: "Recipient" }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("p", { children: "View a list of the top Recipients from highest to lowest. View your results by Parent Recipient or Recipient." }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("h4", { children: "North American Industry Classification System (NAICS) and Product or Service Code (PSC)" }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("p", { children: [
				"View a list of the top Industry Codes from highest to lowest. View your results by",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " NAICS Code "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "naics" }),
				" ",
				"or",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " PSC Code "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "product-or-service-code-psc" }),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("h4", { children: "Assistance Listing" }),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)("p", { children: [
				"View a list of the top",
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("span", {
					className: "award-search__glossary-term",
					children: " CFDA Programs "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(GlossaryLink, { term: "assistance-listings-cfda-program" }),
				" ",
				"from highest to lowest."
			] })
		] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/categories/CategoriesSection.jsx
var import_jsx_runtime$71, propTypes$43, CategoriesSection;
var init_CategoriesSection = __esmMin((() => {
	init_Analytics();
	init_CategoriesVisualizationWrapperContainer();
	init_PlaceholderComponent();
	init_CategoriesDsm();
	import_jsx_runtime$71 = require_jsx_runtime();
	propTypes$43 = {
		categoriesHasLoaded: PropTypes.bool,
		spendingLevel: PropTypes.string,
		setSelectedDropdown: PropTypes.func,
		selectedDropdown: PropTypes.string,
		hash: PropTypes.string
	};
	CategoriesSection = ({ categoriesHasLoaded, spendingLevel, setSelectedDropdown, selectedDropdown, hash }) => {
		const onClick = (e) => {
			setSelectedDropdown(e);
			Analytics.event({
				category: "Section Categories",
				action: `View ${e}`,
				label: hash
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)("div", {
			id: "search-page-component",
			className: "categories",
			children: categoriesHasLoaded ? /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesVisualizationWrapperContainer_default, {
				wrapperProps: {
					sectionTitle: "Results by Category",
					dropdownOptions: [
						{
							name: "Awarding Agency",
							value: "awarding_agency",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						},
						{
							name: "Awarding Subagency",
							value: "awarding_subagency",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						},
						{
							name: "Recipient",
							value: "recipient",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						},
						{
							name: "North American Industry Classification System (NAICS)",
							value: "naics",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						},
						{
							name: "Product and Service Code (PSC)",
							value: "psc",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						},
						{
							name: "Assistance Listing",
							value: "cfda",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(CategoriesDsm, { spendingLevel })
						}
					],
					selectedDropdownOption: selectedDropdown,
					sectionName: "categories"
				},
				categoriesHasLoaded,
				selectedDropdown,
				setSelectedDropdown,
				hash
			}) : /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(PlaceholderComponent, { className: "categories" })
		});
	};
	CategoriesSection.propTypes = propTypes$43;
}));
//#endregion
//#region src/js/models/v2/search/visualizations/time/BaseSpendingOverTimeRow.js
var BaseSpendingOverTimeRow;
var init_BaseSpendingOverTimeRow = __esmMin((() => {
	init_monthHelper();
	BaseSpendingOverTimeRow = {
		populate(data) {
			this.month = Object.prototype.hasOwnProperty.call(data.time_period, "month") ? data.time_period.month : false;
			this.quarter = Object.prototype.hasOwnProperty.call(data.time_period, "quarter") ? data.time_period.quarter : false;
			this.fiscal_year = data.time_period?.fiscal_year;
			this.aggregated_amount = data.aggregated_amount;
		},
		get month_year() {
			return /* @__PURE__ */ new Date(`${this.month}/01/${this.fiscal_year}`);
		},
		get quarter_year() {
			return /* @__PURE__ */ new Date(`${convertPeriodToDate(this.quarter, this.fiscal_year)}`);
		}
	};
}));
//#endregion
//#region src/js/components/search/resultsView/time/TimeFileDownload.jsx
var import_jsx_runtime$70, propTypes$42, TimeFileDownload;
var init_TimeFileDownload = __esmMin((() => {
	init_index_es();
	init_dist();
	import_jsx_runtime$70 = require_jsx_runtime();
	propTypes$42 = {
		downloadData: PropTypes.arrayOf(PropTypes.string),
		visualizationPeriod: PropTypes.string
	};
	TimeFileDownload = ({ downloadData, visualizationPeriod }) => {
		const getDownloadData = () => {
			const headers = [];
			headers.fiscal_year = "fiscal_year,total_obligations\n";
			headers.quarter = "fiscal_quarter,total_obligations\n";
			headers.month = "month,total_obligations\n";
			return headers[visualizationPeriod].concat(downloadData.join("\n"));
		};
		const downloadBlob = () => new Blob([getDownloadData()], { type: "text/csv;charset=utf-8;" });
		const getPeriod = () => {
			if (visualizationPeriod === "fiscal_year") return "year";
			else if (visualizationPeriod === "quarter") return "fiscal quarter";
			return "month";
		};
		const renderDownloadLink = () => /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("a", {
			href: URL.createObjectURL(downloadBlob()),
			download: `results-over-time-by-${visualizationPeriod}-${Date.now()}.csv`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$70.jsx)(FontAwesomeIcon, {
				icon: "download",
				size: "lg"
			}), /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("span", {
				className: "text",
				children: ["Download data by ", words(getPeriod()).map(upperFirst).join(" ")]
			})]
		});
		const downloadTooltip = () => /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)(import_jsx_runtime$70.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("div", {
			className: "tooltip__title",
			children: ["Download data by ", words(getPeriod()).map(upperFirst).join(" ")]
		}), /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("div", {
			className: "tooltip__text",
			children: [
				"Download a CSV of award spending data that matches your search criteria, broken down by ",
				getPeriod(),
				". For complete download results, click on the \"Download\" button on the top right of this page."
			]
		})] });
		return /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("div", {
			className: "download",
			children: [downloadData && renderDownloadLink(), downloadData && /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)(ds, {
				className: "tooltip-wrapper",
				icon: "info",
				tooltipPosition: "left",
				tooltipComponent: downloadTooltip()
			})]
		});
	};
	TimeFileDownload.propTypes = propTypes$42;
}));
//#endregion
//#region src/js/components/search/resultsView/time/TimeVisualizationChart.jsx
/**
* TimeVisualizationChart.jsx
* Created by Andrea Blackwell 02/28/2024
**/
var import_jsx_runtime$69, timeJumpIcon, CustomShape, CustomXTick, CustomYTick, TimeVisualizationChart;
var init_TimeVisualizationChart = __esmMin((() => {
	init_es6();
	init_index_es();
	init_moneyFormatter();
	import_jsx_runtime$69 = require_jsx_runtime();
	timeJumpIcon = (x, y) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$69.jsxs)("g", {
			transform: `translate(${x - 6},${y + 3})`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("line", {
				x1: "1.06699",
				y1: "8.49805",
				x2: "5.54067",
				y2: "0.749398",
				stroke: "#5C5C5C"
			}), /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("line", {
				x1: "5.09335",
				y1: "9.39258",
				x2: "9.56704",
				y2: "1.64393",
				stroke: "#5C5C5C"
			})]
		});
	};
	CustomShape = ({ x, y, width, height, focusBar, label, ...props }) => {
		const fill = "#1B2B85";
		let fillOpacity = "1";
		if (focusBar && !props?.isActive && label !== "jump") fillOpacity = "0.5";
		const maxWidth = width > 120 ? 120 : width;
		const translateX = x + (width / 2 - maxWidth / 2);
		const lineHeight = 315;
		if (label === "jump") return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("line", {
			x1: x + width / 2,
			x2: x + width / 2 + 1,
			y1: lineHeight,
			y2: "6",
			stroke: "#dfe1e2",
			strokeDasharray: "5 3"
		}) });
		return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("rect", {
			x: translateX,
			y: height < 0 ? y - Math.abs(height) : y,
			width: maxWidth,
			height: Math.abs(height),
			fill,
			fillOpacity,
			className: "recharts-bars"
		});
	};
	CustomXTick = ({ x, y, payload, width, label }) => {
		if (payload?.value === "jump" || label === "jump") return timeJumpIcon(x, y, width);
		return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("g", {
			transform: `translate(${x},${y})`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("text", {
				x: 0,
				y: 0,
				dx: 12,
				dy: 12,
				textAnchor: "end",
				fill: "#5C5C5C",
				fontSize: 12,
				width: "40px",
				children: payload.value
			})
		});
	};
	CustomYTick = ({ x, y, payload }) => /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("g", {
		transform: `translate(${x},${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("text", {
			x: 0,
			y: 0,
			dy: 0,
			textAnchor: "end",
			fill: "#5C5C5C",
			fontSize: 12,
			width: "48px",
			children: formatMoneyWithUnitsShortLabel(payload.value)
		})
	});
	TimeVisualizationChart = (props) => {
		const [focusBar, setFocusBar] = useState(null);
		const transformedData = [];
		let label;
		let value;
		if (props.visualizationPeriod === "fiscal_year") props.combined.sort((a, b) => a.x > b.x ? 1 : b.x > a.x ? -1 : 0);
		for (let i = 0; i < props?.combined.length; i++) {
			if (props?.combined[i].y !== 0) {
				label = props?.combined[i].x;
				value = props?.combined[i].y;
			} else if (transformedData[transformedData?.length - 1]?.value !== "jump") {
				label = "jump";
				value = null;
			}
			if (!(transformedData[transformedData?.length - 1]?.value === null && label === "jump")) transformedData.push({
				label,
				value
			});
		}
		if (transformedData[transformedData?.length - 1]?.label === "jump") transformedData.pop();
		const onMouseLeave = () => {
			if (focusBar) setFocusBar(null);
		};
		const CustomTooltip = (args) => {
			const { active, payload, label } = args;
			if (active && payload && payload.length && payload[0].label !== "jump") return /* @__PURE__ */ (0, import_jsx_runtime$69.jsxs)("div", {
				className: "custom-tooltip",
				role: "status",
				"aria-live": "assertive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("div", {
					className: "tooltip__title",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime$69.jsxs)("div", {
					className: "tooltip__text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("div", {
						className: "tooltip__text-label",
						children: "Obligations"
					}), /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("div", {
						className: "tooltip__text-amount",
						children: formatMoneyWithUnitsShortLabel(payload[0].value)
					})]
				})]
			});
			onMouseLeave();
			return null;
		};
		const onMouseMove = (state) => {
			setFocusBar(state.label);
		};
		const Message = () => {
			if (props.loading) return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(Wo, {});
			else if (props.error) return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(fo, {});
			else if (transformedData.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(Go, {});
			return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(import_jsx_runtime$69.Fragment, {});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("div", {
			className: "recharts-time-visualization-container",
			children: props?.loading || props?.error || transformedData?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(import_jsx_runtime$69.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(Message, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsxs)(BarChart, {
				height: 350,
				data: transformedData,
				accessibilityLayer: true,
				margin: {
					top: 5,
					right: 30,
					bottom: 5
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(XAxis, {
						dataKey: "label",
						tick: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(CustomXTick, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(YAxis, {
						dataKey: "value",
						tick: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(CustomYTick, {}),
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(Tooltip, {
						cursor: { fill: "#fff" },
						filterNull: true,
						content: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(CustomTooltip, {}),
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(ReferenceLine, {
						y: 0,
						stroke: "#dfe1e2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(Bar, {
						dataKey: "value",
						shape: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(CustomShape, { focusBar }),
						activeBar: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)(CustomShape, {
							isActive: true,
							focusBar
						}),
						onMouseEnter: onMouseMove,
						onMouseOut: onMouseLeave,
						onMouseLeave
					})
				]
			}) })
		});
	};
}));
//#endregion
//#region src/js/containers/search/resultsView/TimeVisualizationSectionContainer.jsx
/**
* TimeVisualizationSectionContainer.jsx
*/
var import_jsx_runtime$68, combinedActions, propTypes$41, columns, TimeVisualizationSectionContainer, TimeVisualizationSectionContainer_default;
var init_TimeVisualizationSectionContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_searchFilterActions();
	init_appliedFilterActions();
	init_searchHelper();
	init_monthHelper();
	init_SearchAwardsOperation();
	init_SearchSectionWrapper();
	init_BaseSpendingOverTimeRow();
	init_moneyFormatter();
	init_TimeFileDownload();
	init_TimeVisualizationChart();
	import_jsx_runtime$68 = require_jsx_runtime();
	combinedActions = Object.assign({}, searchFilterActions_exports, { setAppliedFilterCompletion });
	propTypes$41 = {
		reduxFilters: PropTypes.object,
		setAppliedFilterCompletion: PropTypes.func,
		noApplied: PropTypes.bool,
		visualizationPeriod: PropTypes.string,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string,
		wrapperProps: PropTypes.object
	};
	columns = {
		month: [{
			title: "month_year",
			displayName: ["Month"],
			right: false
		}, {
			title: "aggregated_amount",
			displayName: ["Obligations"],
			right: true
		}],
		quarter: [{
			title: "quarter_year",
			displayName: ["Fiscal Quarter"],
			right: false
		}, {
			title: "aggregated_amount",
			displayName: ["Obligations"],
			right: true
		}],
		fiscal_year: [{
			title: "fiscal_year",
			displayName: ["Fiscal Year"],
			right: false
		}, {
			title: "aggregated_amount",
			displayName: ["Obligations"],
			right: true
		}]
	};
	TimeVisualizationSectionContainer = (props) => {
		const [sortDirection, setSortDirection] = useState("asc");
		const [activeField, setActiveField] = useState("aggregated_amount");
		const [parsedData, setParsedData] = useState({
			loading: true,
			error: false,
			groups: [],
			xSeries: [],
			ySeries: [],
			combined: [],
			rawLabels: []
		});
		const [tableRows, setTableRows] = useState([]);
		const [tableData, setTableData] = useState([]);
		const [downloadData, setDownloadDataRows] = useState([]);
		let apiRequest = null;
		const generateTimeLabel = (group, timePeriod) => {
			if (group === "fiscal_year") return timePeriod.fiscal_year;
			else if (group === "quarter") return `Q${timePeriod.quarter} ${timePeriod.fiscal_year}`;
			return `${convertNumToShortMonth(timePeriod.month)} ${convertMonthToFY(timePeriod.month, timePeriod.fiscal_year)}`;
		};
		const generateTimeRaw = (group, timePeriod) => {
			if (group === "fiscal_year") return {
				period: null,
				year: timePeriod.fiscal_year
			};
			else if (group === "quarter") return {
				period: `Q${timePeriod.quarter}`,
				year: `${timePeriod.fiscal_year}`
			};
			const month = convertNumToShortMonth(timePeriod.month);
			const year = convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);
			return {
				period: `${month}`,
				year: `${year}`
			};
		};
		const parseData = (data, group) => {
			const tempGroups = [];
			const tempXSeries = [];
			const tempYSeries = [];
			const tempCombined = [];
			const tempRawLabels = [];
			data.results.forEach((item) => {
				tempGroups.push(generateTimeLabel(group, item.time_period));
				tempRawLabels.push(generateTimeRaw(group, item.time_period));
				tempXSeries.push([generateTimeLabel(group, item.time_period)]);
				tempYSeries.push([parseFloat(item.aggregated_amount)]);
				tempCombined.push({
					x: generateTimeLabel(group, item.time_period),
					y: parseFloat(item.aggregated_amount)
				});
			});
			setParsedData({
				groups: tempGroups,
				xSeries: tempXSeries,
				ySeries: tempYSeries,
				combined: tempCombined,
				rawLabels: tempRawLabels,
				loading: false,
				error: false
			});
		};
		const sortBy = useCallback((field, direction) => {
			const createTableRows = (rows) => {
				const rowsArray = [];
				const selectedTimeFrame = props.wrapperProps.selectedDropdownOption;
				rows.forEach((row) => {
					const rowArray = [];
					Object.keys(row).forEach((key) => {
						if (row[key] !== false && !key.includes("raw")) {
							if (key === "month") rowArray.push(`${convertNumToShortMonth(row[key])} ${convertMonthToFY(row[key], row.fiscal_year)}`);
							else if (key === "quarter") rowArray.push(`Q${row[key]} ${row.fiscal_year}`);
							else if (key.includes("amount")) rowArray.push(formatMoneyWithPrecision(row[key], 0));
							else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") rowArray.push(row[key]);
						}
					});
					rowsArray.push(rowArray);
				});
				setTableRows(rowsArray);
				const downloadDataRows = [];
				rows.forEach((row) => {
					const downloadDataRow = [];
					Object.keys(row).forEach((key) => {
						if (row[key] !== false && !key.includes("raw")) {
							if (key === "month") downloadDataRow.push(`${convertNumToShortMonth(row[key])} ${convertMonthToFY(row[key], row.fiscal_year)}`);
							else if (key === "quarter") downloadDataRow.push(`Q${row[key]} ${row.fiscal_year}`);
							else if (key.includes("amount")) downloadDataRow.push(row[key]);
							else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") downloadDataRow.push(row[key]);
						}
					});
					downloadDataRows.push(downloadDataRow);
				});
				setDownloadDataRows(downloadDataRows);
			};
			const updatedTable = [...tableData];
			if (direction === "asc") updatedTable.sort((a, b) => a[field] - b[field]);
			if (direction === "desc") updatedTable.sort((a, b) => b[field] - a[field]);
			setSortDirection(direction);
			setActiveField(field);
			createTableRows(updatedTable);
		}, [props.wrapperProps.selectedDropdownOption, tableData]);
		const getSpendingLevel = (spendingLevel) => {
			if (spendingLevel === "subawards") return spendingLevel;
			return "transactions";
		};
		const fetchAwards = (auditTrail = null) => {
			const operation = new SearchAwardsOperation();
			operation.fromState(props.reduxFilters);
			if (props.spendingLevel === "subawards" && operation.dateType) delete operation.dateType;
			const searchParams = operation.toParams();
			const apiParams = {
				group: props.visualizationPeriod,
				filters: searchParams,
				spending_level: getSpendingLevel(props.spendingLevel)
			};
			if (auditTrail) apiParams.auditTrail = auditTrail;
			apiRequest = performSpendingOverTimeSearch(apiParams);
			apiRequest.promise.then((res) => {
				const data = res.data;
				parseData(data, props.visualizationPeriod);
				const tempTableData = [];
				data.results.map((d) => {
					const row = Object.create(BaseSpendingOverTimeRow);
					row.populate(d);
					tempTableData.push(row);
					return row;
				});
				setTableData(tempTableData);
				apiRequest = null;
			}).catch((err) => {
				if (isCancel(err)) return;
				props.setAppliedFilterCompletion(true);
				apiRequest = null;
				console.log(err);
				setParsedData({
					...parseData,
					loading: false,
					error: true
				});
			});
		};
		const fetchData = () => {
			props.setAppliedFilterCompletion(false);
			setParsedData({
				...parseData,
				loading: true,
				error: false
			});
			if (apiRequest) apiRequest.cancel();
			fetchAwards("Spending Over Time Visualization");
		};
		useEffect(() => {
			sortBy("aggregated_amount", "desc");
		}, [sortBy]);
		useEffect(() => {
			if (!props.noApplied) fetchData();
		}, [
			props.reduxFilters,
			props.visualizationPeriod,
			props.spendingLevel
		]);
		useEffect(() => {
			if (parsedData.loading !== true && parsedData.error !== true) props.setAppliedFilterCompletion(true);
		}, [parsedData]);
		return /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)(SearchSectionWrapper, {
			...props.wrapperProps,
			data: parsedData,
			sortBy,
			sortDirection,
			setSortDirection,
			activeField,
			rows: tableRows,
			columns: columns[props.visualizationPeriod],
			isLoading: parsedData?.loading,
			isError: parsedData?.error,
			hasNoData: parsedData?.ySeries?.flat()?.reduce((partialSum, a) => partialSum + a, 0) === 0,
			downloadComponent: /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)(TimeFileDownload, {
				downloadData,
				visualizationPeriod: props.visualizationPeriod
			}),
			manualSort: true,
			hash: props.hash,
			setActiveField,
			children: /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)(TimeVisualizationChart, {
				...parsedData,
				visualizationPeriod: props.visualizationPeriod
			})
		});
	};
	TimeVisualizationSectionContainer.propTypes = propTypes$41;
	TimeVisualizationSectionContainer_default = connect_default((state) => ({
		reduxFilters: state.appliedFilters.filters,
		noApplied: state.appliedFilters._empty,
		spendingLevel: state.searchView.spendingLevel
	}), (dispatch) => bindActionCreators(combinedActions, dispatch))(TimeVisualizationSectionContainer);
}));
//#endregion
//#region src/js/components/search/resultsView/time/TimeDsm.jsx
var import_jsx_runtime$67, TimeDsm;
var init_TimeDsm = __esmMin((() => {
	init_es();
	init_development();
	init_aboutTheDataSidebarHelper();
	init_slideoutHelper();
	init_GlossaryLink();
	import_jsx_runtime$67 = require_jsx_runtime();
	TimeDsm = ({ spendingLevel }) => {
		const isDefCodeInFilter = useSelector((state) => state.appliedFilters.filters)?.defCodes?.counts;
		const openAboutTheDataSidebar = (e, entry) => {
			showSlideout("atd", { url: entry });
			e.preventDefault();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)(import_jsx_runtime$67.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("h4", { children: "What's included in this view of the data?" }),
			/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("p", {
				style: { marginBottom: "8px" },
				children: "Spot trends in spending over your chosen time period. Break down your results by years, quarters, or months."
			}),
			spendingLevel === "subawards" && /* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)(import_jsx_runtime$67.Fragment, { children: [
				getAtdDefcText(isDefCodeInFilter?.length > 0, true),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"The data represent",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " sub-awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "sub-award" }),
						" ",
						"that meet the selected filter criteria. The results do not reflect sub-awards whose",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " prime awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "prime-award" }),
						" ",
						"meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("span", {
							className: "award-search__subaward-note",
							children: [
								"Note that there are several documented issues related to\xA0",
								/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(Link, {
									to: "",
									"aria-label": "Open the About the Data",
									onClick: (e) => openAboutTheDataSidebar(e, "subaward-data-quality"),
									children: "subaward data quality"
								}),
								" ",
								"in our About the Data module."
							]
						})
					]
				})
			] }),
			spendingLevel === "awards" && /* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)(import_jsx_runtime$67.Fragment, { children: [
				getAtdDefcText(isDefCodeInFilter?.length > 0, true),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"The data in the chart represent",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " federal action "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "federal-action-obligation" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " obligation "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "obligation" }),
						" ",
						"amounts for prime award",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " transactions "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "transaction" }),
						" ",
						"within the selected filters. Loan awards use the",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " subsidy cost "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "loan-subsidy-cost" }),
						" ",
						"rather than the obligated amount to sum up the",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " value of the loan "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "face-value-of-loan" }),
						". Prime award transactions with the same unique award ID are grouped under a single prime award summary."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("p", {
					className: "award-search__body-text",
					children: "Obligations across the life of the award are aggregated and displayed under the latest month, quarter, or year of the latest transaction action date for each award. For example, an award with obligations in FY 2023, 2024, and 2025 will aggregate all its obligations under FY 2025, the year that the award’s latest transaction action date falls under. (Note: These obligations will appear under FY 2025 even if the selected filtered time period does not include FY 2025.) To examine spending over time based on transaction dates, adjust your page-wide filter to the \"Transactions\" view."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"Loan awards use the",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " subsidy cost "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "loan-subsidy-cost" }),
						" ",
						"rather than the obligated amount to sum up the",
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("span", {
							className: "award-search__glossary-term",
							children: " value of the loan "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(GlossaryLink, { term: "face-value-of-loan" }),
						"."
					]
				})
			] })
		] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/time/TimeSection.jsx
/**
* TimeSection.jsx
* Created by Andrea Blackwell 04/14/2024
**/
var import_jsx_runtime$66, propTypes$40, TimeSection;
var init_TimeSection = __esmMin((() => {
	init_Analytics();
	init_TimeVisualizationSectionContainer();
	init_PlaceholderComponent();
	init_TimeDsm();
	init_useQueryParams();
	import_jsx_runtime$66 = require_jsx_runtime();
	propTypes$40 = {
		timeHasLoaded: PropTypes.bool,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string
	};
	TimeSection = ({ timeHasLoaded, hash, spendingLevel }) => {
		const [visualizationPeriod, setVisualizationPeriod] = useState(useQueryParams().by || "month");
		const onClick = useCallback((e) => {
			setVisualizationPeriod(e);
			Analytics.event({
				category: "Section Time",
				action: `View ${e}`,
				label: hash
			});
		}, [hash]);
		return /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)("div", {
			id: "search-page-component",
			className: "time",
			children: timeHasLoaded ? /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)(TimeVisualizationSectionContainer_default, {
				wrapperProps: {
					sectionTitle: "Results Over Time",
					dropdownOptions: [
						{
							name: "By Month",
							value: "month",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)(TimeDsm, { spendingLevel })
						},
						{
							name: "By Fiscal Quarter",
							value: "quarter",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)(TimeDsm, { spendingLevel })
						},
						{
							name: "By Year",
							value: "fiscal_year",
							onClick,
							dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)(TimeDsm, { spendingLevel })
						}
					],
					selectedDropdownOption: visualizationPeriod,
					sectionName: "time"
				},
				visualizationPeriod,
				hash
			}) : /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)(PlaceholderComponent, { className: "time" })
		});
	};
	TimeSection.propTypes = propTypes$40;
}));
//#endregion
//#region src/js/dataMapping/search/geoTable.js
var countries, congressionalDistricts, counties;
var init_geoTable = __esmMin((() => {
	countries = [
		"AFG",
		"XQZ",
		"ALB",
		"DZA",
		"ASM",
		"AND",
		"AGO",
		"AIA",
		"ATA",
		"ATG",
		"ARG",
		"ARM",
		"ABW",
		"XAC",
		"AUS",
		"AUT",
		"AZE",
		"BHS",
		"BHR",
		"XBK",
		"BGD",
		"BRB",
		"XBI",
		"BLR",
		"BEL",
		"BLZ",
		"BEN",
		"BMU",
		"BTN",
		"BOL",
		"BES",
		"BIH",
		"BWA",
		"BVT",
		"BRA",
		"IOT",
		"BRN",
		"BGR",
		"BFA",
		"MMR",
		"BDI",
		"CPV",
		"KHM",
		"CMR",
		"CAN",
		"CYM",
		"CAF",
		"TCD",
		"CHL",
		"CHN",
		"CXR",
		"CPT",
		"CCK",
		"COL",
		"COM",
		"COG",
		"COD",
		"COK",
		"XCS",
		"CRI",
		"CIV",
		"HRV",
		"CUB",
		"CUW",
		"CYP",
		"CZE",
		"DNK",
		"XXD",
		"DGA",
		"DJI",
		"DMA",
		"DOM",
		"ECU",
		"EGY",
		"SLV",
		"XAZ",
		"XCR",
		"XCY",
		"XKM",
		"XKN",
		"AX3",
		"GNQ",
		"ERI",
		"EST",
		"SWZ",
		"ETH",
		"XEU",
		"FLK",
		"FRO",
		"FJI",
		"FIN",
		"FRA",
		"GUF",
		"PYF",
		"ATF",
		"GAB",
		"GMB",
		"XGZ",
		"GEO",
		"DEU",
		"GHA",
		"GIB",
		"XGL",
		"GRC",
		"GRL",
		"GRD",
		"GLP",
		"GUM",
		"AX2",
		"GTM",
		"GGY",
		"GIN",
		"GNB",
		"GUY",
		"HTI",
		"HMD",
		"HND",
		"HKG",
		"XHO",
		"HUN",
		"ISL",
		"IND",
		"IDN",
		"IRN",
		"IRQ",
		"IRL",
		"IMN",
		"ISR",
		"ITA",
		"JAM",
		"XJM",
		"JPN",
		"XJV",
		"JEY",
		"XJA",
		"JOR",
		"XJN",
		"KAZ",
		"KEN",
		"XKR",
		"KIR",
		"PRK",
		"KOR",
		"XKS",
		"KWT",
		"KGZ",
		"LAO",
		"LVA",
		"LBN",
		"LSO",
		"LBR",
		"LBY",
		"LIE",
		"LTU",
		"LUX",
		"MAC",
		"MDG",
		"MWI",
		"MYS",
		"MDV",
		"MLI",
		"MLT",
		"MHL",
		"MTQ",
		"MRT",
		"MUS",
		"MYT",
		"MEX",
		"FSM",
		"XMW",
		"MDA",
		"MCO",
		"MNG",
		"MNE",
		"MSR",
		"MAR",
		"MOZ",
		"NAM",
		"NRU",
		"XNV",
		"NPL",
		"NLD",
		"NCL",
		"NZL",
		"NIC",
		"NER",
		"NGA",
		"NIU",
		"NFK",
		"MKD",
		"MNP",
		"NOR",
		"OMN",
		"PAK",
		"PLW",
		"XPL",
		"PAN",
		"PNG",
		"XPR",
		"PRY",
		"PER",
		"PHL",
		"PCN",
		"POL",
		"PRT",
		"PRI",
		"QAT",
		"REU",
		"ROU",
		"RUS",
		"RWA",
		"BLM",
		"SHN",
		"KNA",
		"LCA",
		"MAF",
		"SPM",
		"VCT",
		"WSM",
		"SMR",
		"STP",
		"SAU",
		"SEN",
		"SRB",
		"SYC",
		"SLE",
		"SGP",
		"SXM",
		"SVK",
		"SVN",
		"SLB",
		"SOM",
		"ZAF",
		"SGS",
		"SSD",
		"ESP",
		"XSP",
		"LKA",
		"SDN",
		"SUR",
		"XSV",
		"SWE",
		"CHE",
		"SYR",
		"TWN",
		"TJK",
		"TZA",
		"THA",
		"TLS",
		"TGO",
		"TKL",
		"TON",
		"TTO",
		"XTR",
		"TUN",
		"TUR",
		"TKM",
		"TCA",
		"TUV",
		"UGA",
		"UKR",
		"ARE",
		"GBR",
		"USA",
		"AX1",
		"URY",
		"UZB",
		"VUT",
		"VAT",
		"VEN",
		"VNM",
		"VGB",
		"VIR",
		"XWK",
		"WLF",
		"XWB",
		"ESH",
		"YEM",
		"ZMB",
		"ZWE"
	];
	congressionalDistricts = [
		"0101",
		"0102",
		"0103",
		"0104",
		"0105",
		"0106",
		"0107",
		"0190",
		"0200",
		"0401",
		"0402",
		"0403",
		"0404",
		"0405",
		"0406",
		"0407",
		"0408",
		"0409",
		"0490",
		"0501",
		"0502",
		"0503",
		"0504",
		"0590",
		"0601",
		"0602",
		"0603",
		"0604",
		"0605",
		"0606",
		"0607",
		"0608",
		"0609",
		"0610",
		"0611",
		"0612",
		"0613",
		"0614",
		"0615",
		"0616",
		"0617",
		"0618",
		"0619",
		"0620",
		"0621",
		"0622",
		"0623",
		"0624",
		"0625",
		"0626",
		"0627",
		"0628",
		"0629",
		"0630",
		"0631",
		"0632",
		"0633",
		"0634",
		"0635",
		"0636",
		"0637",
		"0638",
		"0639",
		"0640",
		"0641",
		"0642",
		"0643",
		"0644",
		"0645",
		"0646",
		"0647",
		"0648",
		"0649",
		"0650",
		"0651",
		"0652",
		"0690",
		"0801",
		"0802",
		"0803",
		"0804",
		"0805",
		"0806",
		"0807",
		"0808",
		"0890",
		"0901",
		"0902",
		"0903",
		"0904",
		"0905",
		"0990",
		"1000",
		"1198",
		"1201",
		"1202",
		"1203",
		"1204",
		"1205",
		"1206",
		"1207",
		"1208",
		"1209",
		"1210",
		"1211",
		"1212",
		"1213",
		"1214",
		"1215",
		"1216",
		"1217",
		"1218",
		"1219",
		"1220",
		"1221",
		"1222",
		"1223",
		"1224",
		"1225",
		"1226",
		"1227",
		"1228",
		"1290",
		"1301",
		"1302",
		"1303",
		"1304",
		"1305",
		"1306",
		"1307",
		"1308",
		"1309",
		"1310",
		"1311",
		"1312",
		"1313",
		"1314",
		"1390",
		"1501",
		"1502",
		"1590",
		"1601",
		"1602",
		"1690",
		"1701",
		"1702",
		"1703",
		"1704",
		"1705",
		"1706",
		"1707",
		"1708",
		"1709",
		"1710",
		"1711",
		"1712",
		"1713",
		"1714",
		"1715",
		"1716",
		"1717",
		"1790",
		"1801",
		"1802",
		"1803",
		"1804",
		"1805",
		"1806",
		"1807",
		"1808",
		"1809",
		"1890",
		"1901",
		"1902",
		"1903",
		"1904",
		"1990",
		"2001",
		"2002",
		"2003",
		"2004",
		"2090",
		"2101",
		"2102",
		"2103",
		"2104",
		"2105",
		"2106",
		"2190",
		"2201",
		"2202",
		"2203",
		"2204",
		"2205",
		"2206",
		"2290",
		"2301",
		"2302",
		"2390",
		"2401",
		"2402",
		"2403",
		"2404",
		"2405",
		"2406",
		"2407",
		"2408",
		"2490",
		"2501",
		"2502",
		"2503",
		"2504",
		"2505",
		"2506",
		"2507",
		"2508",
		"2509",
		"2590",
		"2601",
		"2602",
		"2603",
		"2604",
		"2605",
		"2606",
		"2607",
		"2608",
		"2609",
		"2610",
		"2611",
		"2612",
		"2613",
		"2614",
		"2690",
		"2701",
		"2702",
		"2703",
		"2704",
		"2705",
		"2706",
		"2707",
		"2708",
		"2790",
		"2801",
		"2802",
		"2803",
		"2804",
		"2890",
		"2901",
		"2902",
		"2903",
		"2904",
		"2905",
		"2906",
		"2907",
		"2908",
		"2990",
		"3001",
		"3002",
		"3090",
		"3101",
		"3102",
		"3103",
		"3190",
		"3201",
		"3202",
		"3203",
		"3204",
		"3290",
		"3301",
		"3302",
		"3390",
		"3401",
		"3402",
		"3403",
		"3404",
		"3405",
		"3406",
		"3407",
		"3408",
		"3409",
		"3410",
		"3411",
		"3412",
		"3490",
		"3501",
		"3502",
		"3503",
		"3590",
		"3601",
		"3602",
		"3603",
		"3604",
		"3605",
		"3606",
		"3607",
		"3608",
		"3609",
		"3610",
		"3611",
		"3612",
		"3613",
		"3614",
		"3615",
		"3616",
		"3617",
		"3618",
		"3619",
		"3620",
		"3621",
		"3622",
		"3623",
		"3624",
		"3625",
		"3626",
		"3690",
		"3701",
		"3702",
		"3703",
		"3704",
		"3705",
		"3706",
		"3707",
		"3708",
		"3709",
		"3710",
		"3711",
		"3712",
		"3713",
		"3714",
		"3790",
		"3800",
		"3901",
		"3902",
		"3903",
		"3904",
		"3905",
		"3906",
		"3907",
		"3908",
		"3909",
		"3910",
		"3911",
		"3912",
		"3913",
		"3914",
		"3915",
		"3990",
		"4001",
		"4002",
		"4003",
		"4004",
		"4005",
		"4090",
		"4101",
		"4102",
		"4103",
		"4104",
		"4105",
		"4106",
		"4190",
		"4201",
		"4202",
		"4203",
		"4204",
		"4205",
		"4206",
		"4207",
		"4208",
		"4209",
		"4210",
		"4211",
		"4212",
		"4213",
		"4214",
		"4215",
		"4216",
		"4217",
		"4290",
		"4401",
		"4402",
		"4490",
		"4501",
		"4502",
		"4503",
		"4504",
		"4505",
		"4506",
		"4507",
		"4590",
		"4600",
		"4701",
		"4702",
		"4703",
		"4704",
		"4705",
		"4706",
		"4707",
		"4708",
		"4709",
		"4790",
		"4801",
		"4802",
		"4803",
		"4804",
		"4805",
		"4806",
		"4807",
		"4808",
		"4809",
		"4810",
		"4811",
		"4812",
		"4813",
		"4814",
		"4815",
		"4816",
		"4817",
		"4818",
		"4819",
		"4820",
		"4821",
		"4822",
		"4823",
		"4824",
		"4825",
		"4826",
		"4827",
		"4828",
		"4829",
		"4830",
		"4831",
		"4832",
		"4833",
		"4834",
		"4835",
		"4836",
		"4837",
		"4838",
		"4890",
		"4901",
		"4902",
		"4903",
		"4904",
		"4990",
		"5000",
		"5101",
		"5102",
		"5103",
		"5104",
		"5105",
		"5106",
		"5107",
		"5108",
		"5109",
		"5110",
		"5111",
		"5190",
		"5301",
		"5302",
		"5303",
		"5304",
		"5305",
		"5306",
		"5307",
		"5308",
		"5309",
		"5310",
		"5390",
		"5401",
		"5402",
		"5402",
		"5490",
		"5501",
		"5502",
		"5503",
		"5504",
		"5505",
		"5506",
		"5507",
		"5508",
		"5590",
		"5600",
		"6098",
		"6499",
		"6698",
		"6899",
		"6998",
		"7099",
		"7298",
		"7499",
		"7898"
	];
	counties = [
		"01000",
		"01001",
		"01003",
		"01005",
		"01007",
		"01009",
		"01011",
		"01013",
		"01015",
		"01017",
		"01019",
		"01021",
		"01023",
		"01025",
		"01027",
		"01029",
		"01031",
		"01033",
		"01035",
		"01037",
		"01039",
		"01041",
		"01043",
		"01045",
		"01047",
		"01049",
		"01051",
		"01053",
		"01055",
		"01057",
		"01059",
		"01061",
		"01063",
		"01065",
		"01067",
		"01069",
		"01071",
		"01073",
		"01075",
		"01077",
		"01079",
		"01081",
		"01083",
		"01085",
		"01087",
		"01089",
		"01091",
		"01093",
		"01095",
		"01097",
		"01099",
		"01101",
		"01103",
		"01105",
		"01107",
		"01109",
		"01111",
		"01113",
		"01115",
		"01117",
		"01119",
		"01121",
		"01123",
		"01125",
		"01127",
		"01129",
		"01131",
		"01133",
		"02000",
		"02013",
		"02016",
		"02020",
		"02050",
		"02060",
		"02068",
		"02070",
		"02090",
		"02100",
		"02110",
		"02122",
		"02130",
		"02150",
		"02164",
		"02170",
		"02180",
		"02185",
		"02188",
		"02201",
		"02220",
		"02231",
		"02232",
		"02240",
		"02261",
		"02270",
		"02280",
		"02282",
		"02290",
		"04000",
		"04001",
		"04003",
		"04005",
		"04007",
		"04009",
		"04011",
		"04012",
		"04013",
		"04015",
		"04017",
		"04019",
		"04021",
		"04023",
		"04025",
		"04027",
		"05000",
		"05001",
		"05003",
		"05005",
		"05007",
		"05009",
		"05011",
		"05013",
		"05015",
		"05017",
		"05019",
		"05021",
		"05023",
		"05025",
		"05027",
		"05029",
		"05031",
		"05033",
		"05035",
		"05037",
		"05039",
		"05041",
		"05043",
		"05045",
		"05047",
		"05049",
		"05051",
		"05053",
		"05055",
		"05057",
		"05059",
		"05061",
		"05063",
		"05065",
		"05067",
		"05069",
		"05071",
		"05073",
		"05075",
		"05077",
		"05079",
		"05081",
		"05083",
		"05085",
		"05087",
		"05089",
		"05091",
		"05093",
		"05095",
		"05097",
		"05099",
		"05101",
		"05103",
		"05105",
		"05107",
		"05109",
		"05111",
		"05113",
		"05115",
		"05117",
		"05119",
		"05121",
		"05123",
		"05125",
		"05127",
		"05129",
		"05131",
		"05133",
		"05135",
		"05137",
		"05139",
		"05141",
		"05143",
		"05145",
		"05147",
		"05149",
		"06000",
		"06001",
		"06003",
		"06005",
		"06007",
		"06009",
		"06011",
		"06013",
		"06015",
		"06017",
		"06019",
		"06021",
		"06023",
		"06025",
		"06027",
		"06029",
		"06031",
		"06033",
		"06035",
		"06037",
		"06039",
		"06041",
		"06043",
		"06045",
		"06047",
		"06049",
		"06051",
		"06053",
		"06055",
		"06057",
		"06059",
		"06061",
		"06063",
		"06065",
		"06067",
		"06069",
		"06071",
		"06073",
		"06075",
		"06077",
		"06079",
		"06081",
		"06083",
		"06085",
		"06087",
		"06089",
		"06091",
		"06093",
		"06095",
		"06097",
		"06099",
		"06101",
		"06103",
		"06105",
		"06107",
		"06109",
		"06111",
		"06113",
		"06115",
		"08000",
		"08001",
		"08003",
		"08005",
		"08007",
		"08009",
		"08011",
		"08013",
		"08015",
		"08017",
		"08019",
		"08021",
		"08023",
		"08025",
		"08027",
		"08029",
		"08031",
		"08033",
		"08035",
		"08037",
		"08039",
		"08041",
		"08043",
		"08045",
		"08047",
		"08049",
		"08051",
		"08053",
		"08055",
		"08057",
		"08059",
		"08061",
		"08063",
		"08065",
		"08067",
		"08069",
		"08071",
		"08073",
		"08075",
		"08077",
		"08079",
		"08081",
		"08083",
		"08085",
		"08087",
		"08089",
		"08091",
		"08093",
		"08095",
		"08097",
		"08099",
		"08101",
		"08103",
		"08105",
		"08107",
		"08109",
		"08111",
		"08113",
		"08115",
		"08117",
		"08119",
		"08121",
		"08123",
		"08125",
		"09000",
		"09001",
		"09003",
		"09005",
		"09007",
		"09009",
		"09011",
		"09013",
		"09015",
		"10000",
		"10001",
		"10003",
		"10005",
		"11000",
		"11001",
		"12000",
		"12001",
		"12003",
		"12005",
		"12007",
		"12009",
		"12011",
		"12013",
		"12015",
		"12017",
		"12019",
		"12021",
		"12023",
		"12025",
		"12027",
		"12029",
		"12031",
		"12033",
		"12035",
		"12037",
		"12039",
		"12041",
		"12043",
		"12045",
		"12047",
		"12049",
		"12051",
		"12053",
		"12055",
		"12057",
		"12059",
		"12061",
		"12063",
		"12065",
		"12067",
		"12069",
		"12071",
		"12073",
		"12075",
		"12077",
		"12079",
		"12081",
		"12083",
		"12085",
		"12087",
		"12089",
		"12091",
		"12093",
		"12095",
		"12097",
		"12099",
		"12101",
		"12103",
		"12105",
		"12107",
		"12109",
		"12111",
		"12113",
		"12115",
		"12117",
		"12119",
		"12121",
		"12123",
		"12125",
		"12127",
		"12129",
		"12131",
		"12133",
		"13000",
		"13001",
		"13003",
		"13005",
		"13007",
		"13009",
		"13011",
		"13013",
		"13015",
		"13017",
		"13019",
		"13021",
		"13023",
		"13025",
		"13027",
		"13029",
		"13031",
		"13033",
		"13035",
		"13037",
		"13039",
		"13043",
		"13045",
		"13047",
		"13049",
		"13051",
		"13053",
		"13055",
		"13057",
		"13059",
		"13061",
		"13063",
		"13065",
		"13067",
		"13069",
		"13071",
		"13073",
		"13075",
		"13077",
		"13079",
		"13081",
		"13083",
		"13085",
		"13087",
		"13089",
		"13091",
		"13093",
		"13095",
		"13097",
		"13099",
		"13101",
		"13103",
		"13105",
		"13107",
		"13109",
		"13111",
		"13113",
		"13115",
		"13117",
		"13119",
		"13121",
		"13123",
		"13125",
		"13127",
		"13129",
		"13131",
		"13133",
		"13135",
		"13137",
		"13139",
		"13141",
		"13143",
		"13145",
		"13147",
		"13149",
		"13151",
		"13153",
		"13155",
		"13157",
		"13159",
		"13161",
		"13163",
		"13165",
		"13167",
		"13169",
		"13171",
		"13173",
		"13175",
		"13177",
		"13179",
		"13181",
		"13183",
		"13185",
		"13187",
		"13189",
		"13191",
		"13193",
		"13195",
		"13197",
		"13199",
		"13201",
		"13205",
		"13207",
		"13209",
		"13211",
		"13213",
		"13215",
		"13217",
		"13219",
		"13221",
		"13223",
		"13225",
		"13227",
		"13229",
		"13231",
		"13233",
		"13235",
		"13237",
		"13239",
		"13241",
		"13243",
		"13245",
		"13247",
		"13249",
		"13251",
		"13253",
		"13255",
		"13257",
		"13259",
		"13261",
		"13263",
		"13265",
		"13267",
		"13269",
		"13271",
		"13273",
		"13275",
		"13277",
		"13279",
		"13281",
		"13283",
		"13285",
		"13287",
		"13289",
		"13291",
		"13293",
		"13295",
		"13297",
		"13299",
		"13301",
		"13303",
		"13305",
		"13307",
		"13309",
		"13311",
		"13313",
		"13315",
		"13317",
		"13319",
		"13321",
		"15000",
		"15001",
		"15003",
		"15005",
		"15007",
		"15009",
		"16000",
		"16001",
		"16003",
		"16005",
		"16007",
		"16009",
		"16011",
		"16013",
		"16015",
		"16017",
		"16019",
		"16021",
		"16023",
		"16025",
		"16027",
		"16029",
		"16031",
		"16033",
		"16035",
		"16037",
		"16039",
		"16041",
		"16043",
		"16045",
		"16047",
		"16049",
		"16051",
		"16053",
		"16055",
		"16057",
		"16059",
		"16061",
		"16063",
		"16065",
		"16067",
		"16069",
		"16071",
		"16073",
		"16075",
		"16077",
		"16079",
		"16081",
		"16083",
		"16085",
		"16087",
		"17000",
		"17001",
		"17003",
		"17005",
		"17007",
		"17009",
		"17011",
		"17013",
		"17015",
		"17017",
		"17019",
		"17021",
		"17023",
		"17025",
		"17027",
		"17029",
		"17031",
		"17033",
		"17035",
		"17037",
		"17039",
		"17041",
		"17043",
		"17045",
		"17047",
		"17049",
		"17051",
		"17053",
		"17055",
		"17057",
		"17059",
		"17061",
		"17063",
		"17065",
		"17067",
		"17069",
		"17071",
		"17073",
		"17075",
		"17077",
		"17079",
		"17081",
		"17083",
		"17085",
		"17087",
		"17089",
		"17091",
		"17093",
		"17095",
		"17097",
		"17099",
		"17101",
		"17103",
		"17105",
		"17107",
		"17109",
		"17111",
		"17113",
		"17115",
		"17117",
		"17119",
		"17121",
		"17123",
		"17125",
		"17127",
		"17129",
		"17131",
		"17133",
		"17135",
		"17137",
		"17139",
		"17141",
		"17143",
		"17145",
		"17147",
		"17149",
		"17151",
		"17153",
		"17155",
		"17157",
		"17159",
		"17161",
		"17163",
		"17165",
		"17167",
		"17169",
		"17171",
		"17173",
		"17175",
		"17177",
		"17179",
		"17181",
		"17183",
		"17185",
		"17187",
		"17189",
		"17191",
		"17193",
		"17195",
		"17197",
		"17199",
		"17201",
		"17203",
		"18000",
		"18001",
		"18003",
		"18005",
		"18007",
		"18009",
		"18011",
		"18013",
		"18015",
		"18017",
		"18019",
		"18021",
		"18023",
		"18025",
		"18027",
		"18029",
		"18031",
		"18033",
		"18035",
		"18037",
		"18039",
		"18041",
		"18043",
		"18045",
		"18047",
		"18049",
		"18051",
		"18053",
		"18055",
		"18057",
		"18059",
		"18061",
		"18063",
		"18065",
		"18067",
		"18069",
		"18071",
		"18073",
		"18075",
		"18077",
		"18079",
		"18081",
		"18083",
		"18085",
		"18087",
		"18089",
		"18091",
		"18093",
		"18095",
		"18097",
		"18099",
		"18101",
		"18103",
		"18105",
		"18107",
		"18109",
		"18111",
		"18113",
		"18115",
		"18117",
		"18119",
		"18121",
		"18123",
		"18125",
		"18127",
		"18129",
		"18131",
		"18133",
		"18135",
		"18137",
		"18139",
		"18141",
		"18143",
		"18145",
		"18147",
		"18149",
		"18151",
		"18153",
		"18155",
		"18157",
		"18159",
		"18161",
		"18163",
		"18165",
		"18167",
		"18169",
		"18171",
		"18173",
		"18175",
		"18177",
		"18179",
		"18181",
		"18183",
		"19000",
		"19001",
		"19003",
		"19005",
		"19007",
		"19009",
		"19011",
		"19013",
		"19015",
		"19017",
		"19019",
		"19021",
		"19023",
		"19025",
		"19027",
		"19029",
		"19031",
		"19033",
		"19035",
		"19037",
		"19039",
		"19041",
		"19043",
		"19045",
		"19047",
		"19049",
		"19051",
		"19053",
		"19055",
		"19057",
		"19059",
		"19061",
		"19063",
		"19065",
		"19067",
		"19069",
		"19071",
		"19073",
		"19075",
		"19077",
		"19079",
		"19081",
		"19083",
		"19085",
		"19087",
		"19089",
		"19091",
		"19093",
		"19095",
		"19097",
		"19099",
		"19101",
		"19103",
		"19105",
		"19107",
		"19109",
		"19111",
		"19113",
		"19115",
		"19117",
		"19119",
		"19121",
		"19123",
		"19125",
		"19127",
		"19129",
		"19131",
		"19133",
		"19135",
		"19137",
		"19139",
		"19141",
		"19143",
		"19145",
		"19147",
		"19149",
		"19151",
		"19153",
		"19155",
		"19157",
		"19159",
		"19161",
		"19163",
		"19165",
		"19167",
		"19169",
		"19171",
		"19173",
		"19175",
		"19177",
		"19179",
		"19181",
		"19183",
		"19185",
		"19187",
		"19189",
		"19191",
		"19193",
		"19195",
		"19197",
		"20000",
		"20001",
		"20003",
		"20005",
		"20007",
		"20009",
		"20011",
		"20013",
		"20015",
		"20017",
		"20019",
		"20021",
		"20023",
		"20025",
		"20027",
		"20029",
		"20031",
		"20033",
		"20035",
		"20037",
		"20039",
		"20041",
		"20043",
		"20045",
		"20047",
		"20049",
		"20051",
		"20053",
		"20055",
		"20057",
		"20059",
		"20061",
		"20063",
		"20065",
		"20067",
		"20069",
		"20071",
		"20073",
		"20075",
		"20077",
		"20079",
		"20081",
		"20083",
		"20085",
		"20087",
		"20089",
		"20091",
		"20093",
		"20095",
		"20097",
		"20099",
		"20101",
		"20103",
		"20105",
		"20107",
		"20109",
		"20111",
		"20113",
		"20115",
		"20117",
		"20119",
		"20121",
		"20123",
		"20125",
		"20127",
		"20129",
		"20131",
		"20133",
		"20135",
		"20137",
		"20139",
		"20141",
		"20143",
		"20145",
		"20147",
		"20149",
		"20151",
		"20153",
		"20155",
		"20157",
		"20159",
		"20161",
		"20163",
		"20165",
		"20167",
		"20169",
		"20171",
		"20173",
		"20175",
		"20177",
		"20179",
		"20181",
		"20183",
		"20185",
		"20187",
		"20189",
		"20191",
		"20193",
		"20195",
		"20197",
		"20199",
		"20201",
		"20203",
		"20205",
		"20207",
		"20209",
		"21000",
		"21001",
		"21003",
		"21005",
		"21007",
		"21009",
		"21011",
		"21013",
		"21015",
		"21017",
		"21019",
		"21021",
		"21023",
		"21025",
		"21027",
		"21029",
		"21031",
		"21033",
		"21035",
		"21037",
		"21039",
		"21041",
		"21043",
		"21045",
		"21047",
		"21049",
		"21051",
		"21053",
		"21055",
		"21057",
		"21059",
		"21061",
		"21063",
		"21065",
		"21067",
		"21069",
		"21071",
		"21073",
		"21075",
		"21077",
		"21079",
		"21081",
		"21083",
		"21085",
		"21087",
		"21089",
		"21091",
		"21093",
		"21095",
		"21097",
		"21099",
		"21101",
		"21103",
		"21105",
		"21107",
		"21109",
		"21111",
		"21113",
		"21115",
		"21117",
		"21119",
		"21121",
		"21123",
		"21125",
		"21127",
		"21129",
		"21131",
		"21133",
		"21135",
		"21137",
		"21139",
		"21141",
		"21143",
		"21145",
		"21147",
		"21149",
		"21151",
		"21153",
		"21155",
		"21157",
		"21159",
		"21161",
		"21163",
		"21165",
		"21167",
		"21169",
		"21171",
		"21173",
		"21175",
		"21177",
		"21179",
		"21181",
		"21183",
		"21185",
		"21187",
		"21189",
		"21191",
		"21193",
		"21195",
		"21197",
		"21199",
		"21201",
		"21203",
		"21205",
		"21207",
		"21209",
		"21211",
		"21213",
		"21215",
		"21217",
		"21219",
		"21221",
		"21223",
		"21225",
		"21227",
		"21229",
		"21231",
		"21233",
		"21235",
		"21237",
		"21239",
		"22000",
		"22001",
		"22003",
		"22005",
		"22007",
		"22009",
		"22011",
		"22013",
		"22015",
		"22017",
		"22019",
		"22021",
		"22023",
		"22025",
		"22027",
		"22029",
		"22031",
		"22033",
		"22035",
		"22037",
		"22039",
		"22041",
		"22043",
		"22045",
		"22047",
		"22049",
		"22051",
		"22053",
		"22055",
		"22057",
		"22059",
		"22061",
		"22063",
		"22065",
		"22067",
		"22069",
		"22071",
		"22073",
		"22075",
		"22077",
		"22079",
		"22081",
		"22083",
		"22085",
		"22087",
		"22089",
		"22091",
		"22093",
		"22095",
		"22097",
		"22099",
		"22101",
		"22103",
		"22105",
		"22107",
		"22109",
		"22111",
		"22113",
		"22115",
		"22117",
		"22119",
		"22121",
		"22123",
		"22125",
		"22127",
		"23000",
		"23001",
		"23003",
		"23005",
		"23007",
		"23009",
		"23011",
		"23013",
		"23015",
		"23017",
		"23019",
		"23021",
		"23023",
		"23025",
		"23027",
		"23029",
		"23031",
		"24000",
		"24001",
		"24003",
		"24005",
		"24009",
		"24011",
		"24013",
		"24015",
		"24017",
		"24019",
		"24021",
		"24023",
		"24025",
		"24027",
		"24029",
		"24031",
		"24033",
		"24035",
		"24037",
		"24039",
		"24041",
		"24043",
		"24045",
		"24047",
		"24510",
		"25000",
		"25001",
		"25003",
		"25005",
		"25007",
		"25009",
		"25011",
		"25013",
		"25015",
		"25017",
		"25019",
		"25021",
		"25023",
		"25025",
		"25027",
		"26000",
		"26001",
		"26003",
		"26005",
		"26007",
		"26009",
		"26011",
		"26013",
		"26015",
		"26017",
		"26019",
		"26021",
		"26023",
		"26025",
		"26027",
		"26029",
		"26031",
		"26033",
		"26035",
		"26037",
		"26039",
		"26041",
		"26043",
		"26045",
		"26047",
		"26049",
		"26051",
		"26053",
		"26055",
		"26057",
		"26059",
		"26061",
		"26063",
		"26065",
		"26067",
		"26069",
		"26071",
		"26073",
		"26075",
		"26077",
		"26079",
		"26081",
		"26083",
		"26085",
		"26087",
		"26089",
		"26091",
		"26093",
		"26095",
		"26097",
		"26099",
		"26101",
		"26103",
		"26105",
		"26107",
		"26109",
		"26111",
		"26113",
		"26115",
		"26117",
		"26119",
		"26121",
		"26123",
		"26125",
		"26127",
		"26129",
		"26131",
		"26133",
		"26135",
		"26137",
		"26139",
		"26141",
		"26143",
		"26145",
		"26147",
		"26149",
		"26151",
		"26153",
		"26155",
		"26157",
		"26159",
		"26161",
		"26163",
		"26165",
		"27000",
		"27001",
		"27003",
		"27005",
		"27007",
		"27009",
		"27011",
		"27013",
		"27015",
		"27017",
		"27019",
		"27021",
		"27023",
		"27025",
		"27027",
		"27029",
		"27031",
		"27033",
		"27035",
		"27037",
		"27039",
		"27041",
		"27043",
		"27045",
		"27047",
		"27049",
		"27051",
		"27053",
		"27055",
		"27057",
		"27059",
		"27061",
		"27063",
		"27065",
		"27067",
		"27069",
		"27071",
		"27073",
		"27075",
		"27077",
		"27079",
		"27081",
		"27083",
		"27085",
		"27087",
		"27089",
		"27091",
		"27093",
		"27095",
		"27097",
		"27099",
		"27101",
		"27103",
		"27105",
		"27107",
		"27109",
		"27111",
		"27113",
		"27115",
		"27117",
		"27119",
		"27121",
		"27123",
		"27125",
		"27127",
		"27129",
		"27131",
		"27133",
		"27135",
		"27137",
		"27139",
		"27141",
		"27143",
		"27145",
		"27147",
		"27149",
		"27151",
		"27153",
		"27155",
		"27157",
		"27159",
		"27161",
		"27163",
		"27165",
		"27167",
		"27169",
		"27171",
		"27173",
		"28000",
		"28001",
		"28003",
		"28005",
		"28007",
		"28009",
		"28011",
		"28013",
		"28015",
		"28017",
		"28019",
		"28021",
		"28023",
		"28025",
		"28027",
		"28029",
		"28031",
		"28033",
		"28035",
		"28037",
		"28039",
		"28041",
		"28043",
		"28045",
		"28047",
		"28049",
		"28051",
		"28053",
		"28055",
		"28057",
		"28059",
		"28061",
		"28063",
		"28065",
		"28067",
		"28069",
		"28071",
		"28073",
		"28075",
		"28077",
		"28079",
		"28081",
		"28083",
		"28085",
		"28087",
		"28089",
		"28091",
		"28093",
		"28095",
		"28097",
		"28099",
		"28101",
		"28103",
		"28105",
		"28107",
		"28109",
		"28111",
		"28113",
		"28115",
		"28117",
		"28119",
		"28121",
		"28123",
		"28125",
		"28127",
		"28129",
		"28131",
		"28133",
		"28135",
		"28137",
		"28139",
		"28141",
		"28143",
		"28145",
		"28147",
		"28149",
		"28151",
		"28153",
		"28155",
		"28157",
		"28159",
		"28161",
		"28163",
		"29000",
		"29001",
		"29003",
		"29005",
		"29007",
		"29009",
		"29011",
		"29013",
		"29015",
		"29017",
		"29019",
		"29021",
		"29023",
		"29025",
		"29027",
		"29029",
		"29031",
		"29033",
		"29035",
		"29037",
		"29039",
		"29041",
		"29043",
		"29045",
		"29047",
		"29049",
		"29051",
		"29053",
		"29055",
		"29057",
		"29059",
		"29061",
		"29063",
		"29065",
		"29067",
		"29069",
		"29071",
		"29073",
		"29075",
		"29077",
		"29079",
		"29081",
		"29083",
		"29085",
		"29087",
		"29089",
		"29091",
		"29093",
		"29095",
		"29097",
		"29099",
		"29101",
		"29103",
		"29105",
		"29107",
		"29109",
		"29111",
		"29113",
		"29115",
		"29117",
		"29119",
		"29121",
		"29123",
		"29125",
		"29127",
		"29129",
		"29131",
		"29133",
		"29135",
		"29137",
		"29139",
		"29141",
		"29143",
		"29145",
		"29147",
		"29149",
		"29151",
		"29153",
		"29155",
		"29157",
		"29159",
		"29161",
		"29163",
		"29165",
		"29167",
		"29169",
		"29171",
		"29173",
		"29175",
		"29177",
		"29179",
		"29181",
		"29183",
		"29185",
		"29186",
		"29187",
		"29189",
		"29195",
		"29197",
		"29199",
		"29201",
		"29203",
		"29205",
		"29207",
		"29209",
		"29211",
		"29213",
		"29215",
		"29217",
		"29219",
		"29221",
		"29223",
		"29225",
		"29227",
		"29229",
		"29510",
		"30000",
		"30001",
		"30003",
		"30005",
		"30007",
		"30009",
		"30011",
		"30013",
		"30015",
		"30017",
		"30019",
		"30021",
		"30023",
		"30025",
		"30027",
		"30029",
		"30031",
		"30033",
		"30035",
		"30037",
		"30039",
		"30041",
		"30043",
		"30045",
		"30047",
		"30049",
		"30051",
		"30053",
		"30055",
		"30057",
		"30059",
		"30061",
		"30063",
		"30065",
		"30067",
		"30069",
		"30071",
		"30073",
		"30075",
		"30077",
		"30079",
		"30081",
		"30083",
		"30085",
		"30087",
		"30089",
		"30091",
		"30093",
		"30095",
		"30097",
		"30099",
		"30101",
		"30103",
		"30105",
		"30107",
		"30109",
		"30111",
		"30113",
		"31000",
		"31001",
		"31003",
		"31005",
		"31007",
		"31009",
		"31011",
		"31013",
		"31015",
		"31017",
		"31019",
		"31021",
		"31023",
		"31025",
		"31027",
		"31029",
		"31031",
		"31033",
		"31035",
		"31037",
		"31039",
		"31041",
		"31043",
		"31045",
		"31047",
		"31049",
		"31051",
		"31053",
		"31055",
		"31057",
		"31059",
		"31061",
		"31063",
		"31065",
		"31067",
		"31069",
		"31071",
		"31073",
		"31075",
		"31077",
		"31079",
		"31081",
		"31083",
		"31085",
		"31087",
		"31089",
		"31091",
		"31093",
		"31095",
		"31097",
		"31099",
		"31101",
		"31103",
		"31105",
		"31107",
		"31109",
		"31111",
		"31113",
		"31115",
		"31117",
		"31119",
		"31121",
		"31123",
		"31125",
		"31127",
		"31129",
		"31131",
		"31133",
		"31135",
		"31137",
		"31139",
		"31141",
		"31143",
		"31145",
		"31147",
		"31149",
		"31151",
		"31153",
		"31155",
		"31157",
		"31159",
		"31161",
		"31163",
		"31165",
		"31167",
		"31169",
		"31171",
		"31173",
		"31175",
		"31177",
		"31179",
		"31181",
		"31183",
		"31185",
		"32000",
		"32001",
		"32003",
		"32005",
		"32007",
		"32009",
		"32011",
		"32013",
		"32015",
		"32017",
		"32019",
		"32021",
		"32023",
		"32027",
		"32029",
		"32031",
		"32033",
		"32510",
		"33000",
		"33001",
		"33003",
		"33005",
		"33007",
		"33009",
		"33011",
		"33013",
		"33015",
		"33017",
		"33019",
		"34000",
		"34001",
		"34003",
		"34005",
		"34007",
		"34009",
		"34011",
		"34013",
		"34015",
		"34017",
		"34019",
		"34021",
		"34023",
		"34025",
		"34027",
		"34029",
		"34031",
		"34033",
		"34035",
		"34037",
		"34039",
		"34041",
		"35000",
		"35001",
		"35003",
		"35005",
		"35006",
		"35007",
		"35009",
		"35011",
		"35013",
		"35015",
		"35017",
		"35019",
		"35021",
		"35023",
		"35025",
		"35027",
		"35028",
		"35029",
		"35031",
		"35033",
		"35035",
		"35037",
		"35039",
		"35041",
		"35043",
		"35045",
		"35047",
		"35049",
		"35051",
		"35053",
		"35055",
		"35057",
		"35059",
		"35061",
		"36000",
		"36001",
		"36003",
		"36005",
		"36007",
		"36009",
		"36011",
		"36013",
		"36015",
		"36017",
		"36019",
		"36021",
		"36023",
		"36025",
		"36027",
		"36029",
		"36031",
		"36033",
		"36035",
		"36037",
		"36039",
		"36041",
		"36043",
		"36045",
		"36047",
		"36049",
		"36051",
		"36053",
		"36055",
		"36057",
		"36059",
		"36061",
		"36063",
		"36065",
		"36067",
		"36069",
		"36071",
		"36073",
		"36075",
		"36077",
		"36079",
		"36081",
		"36083",
		"36085",
		"36087",
		"36089",
		"36091",
		"36093",
		"36095",
		"36097",
		"36099",
		"36101",
		"36103",
		"36105",
		"36107",
		"36109",
		"36111",
		"36113",
		"36115",
		"36117",
		"36119",
		"36121",
		"36123",
		"37000",
		"37001",
		"37003",
		"37005",
		"37007",
		"37009",
		"37011",
		"37013",
		"37015",
		"37017",
		"37019",
		"37021",
		"37023",
		"37025",
		"37027",
		"37029",
		"37031",
		"37033",
		"37035",
		"37037",
		"37039",
		"37041",
		"37043",
		"37045",
		"37047",
		"37049",
		"37051",
		"37053",
		"37055",
		"37057",
		"37059",
		"37061",
		"37063",
		"37065",
		"37067",
		"37069",
		"37071",
		"37073",
		"37075",
		"37077",
		"37079",
		"37081",
		"37083",
		"37085",
		"37087",
		"37089",
		"37091",
		"37093",
		"37095",
		"37097",
		"37099",
		"37101",
		"37103",
		"37105",
		"37107",
		"37109",
		"37111",
		"37113",
		"37115",
		"37117",
		"37119",
		"37121",
		"37123",
		"37125",
		"37127",
		"37129",
		"37131",
		"37133",
		"37135",
		"37137",
		"37139",
		"37141",
		"37143",
		"37145",
		"37147",
		"37149",
		"37151",
		"37153",
		"37155",
		"37157",
		"37159",
		"37161",
		"37163",
		"37165",
		"37167",
		"37169",
		"37171",
		"37173",
		"37175",
		"37177",
		"37179",
		"37181",
		"37183",
		"37185",
		"37187",
		"37189",
		"37191",
		"37193",
		"37195",
		"37197",
		"37199",
		"38000",
		"38001",
		"38003",
		"38005",
		"38007",
		"38009",
		"38011",
		"38013",
		"38015",
		"38017",
		"38019",
		"38021",
		"38023",
		"38025",
		"38027",
		"38029",
		"38031",
		"38033",
		"38035",
		"38037",
		"38039",
		"38041",
		"38043",
		"38045",
		"38047",
		"38049",
		"38051",
		"38053",
		"38055",
		"38057",
		"38059",
		"38061",
		"38063",
		"38065",
		"38067",
		"38069",
		"38071",
		"38073",
		"38075",
		"38077",
		"38079",
		"38081",
		"38083",
		"38085",
		"38087",
		"38089",
		"38091",
		"38093",
		"38095",
		"38097",
		"38099",
		"38101",
		"38103",
		"38105",
		"39000",
		"39001",
		"39003",
		"39005",
		"39007",
		"39009",
		"39011",
		"39013",
		"39015",
		"39017",
		"39019",
		"39021",
		"39023",
		"39025",
		"39027",
		"39029",
		"39031",
		"39033",
		"39035",
		"39037",
		"39039",
		"39041",
		"39043",
		"39045",
		"39047",
		"39049",
		"39051",
		"39053",
		"39055",
		"39057",
		"39059",
		"39061",
		"39063",
		"39065",
		"39067",
		"39069",
		"39071",
		"39073",
		"39075",
		"39077",
		"39079",
		"39081",
		"39083",
		"39085",
		"39087",
		"39089",
		"39091",
		"39093",
		"39095",
		"39097",
		"39099",
		"39101",
		"39103",
		"39105",
		"39107",
		"39109",
		"39111",
		"39113",
		"39115",
		"39117",
		"39119",
		"39121",
		"39123",
		"39125",
		"39127",
		"39129",
		"39131",
		"39133",
		"39135",
		"39137",
		"39139",
		"39141",
		"39143",
		"39145",
		"39147",
		"39149",
		"39151",
		"39153",
		"39155",
		"39157",
		"39159",
		"39161",
		"39163",
		"39165",
		"39167",
		"39169",
		"39171",
		"39173",
		"39175",
		"40000",
		"40001",
		"40003",
		"40005",
		"40007",
		"40009",
		"40011",
		"40013",
		"40015",
		"40017",
		"40019",
		"40021",
		"40023",
		"40025",
		"40027",
		"40029",
		"40031",
		"40033",
		"40035",
		"40037",
		"40039",
		"40041",
		"40043",
		"40045",
		"40047",
		"40049",
		"40051",
		"40053",
		"40055",
		"40057",
		"40059",
		"40061",
		"40063",
		"40065",
		"40067",
		"40069",
		"40071",
		"40073",
		"40075",
		"40077",
		"40079",
		"40081",
		"40083",
		"40085",
		"40087",
		"40089",
		"40091",
		"40093",
		"40095",
		"40097",
		"40099",
		"40101",
		"40103",
		"40105",
		"40107",
		"40109",
		"40111",
		"40113",
		"40115",
		"40117",
		"40119",
		"40121",
		"40123",
		"40125",
		"40127",
		"40129",
		"40131",
		"40133",
		"40135",
		"40137",
		"40139",
		"40141",
		"40143",
		"40145",
		"40147",
		"40149",
		"40151",
		"40153",
		"41000",
		"41001",
		"41003",
		"41005",
		"41007",
		"41009",
		"41011",
		"41013",
		"41015",
		"41017",
		"41019",
		"41021",
		"41023",
		"41025",
		"41027",
		"41029",
		"41031",
		"41033",
		"41035",
		"41037",
		"41039",
		"41041",
		"41043",
		"41045",
		"41047",
		"41049",
		"41051",
		"41053",
		"41055",
		"41057",
		"41059",
		"41061",
		"41063",
		"41065",
		"41067",
		"41069",
		"41071",
		"42000",
		"42001",
		"42003",
		"42005",
		"42007",
		"42009",
		"42011",
		"42013",
		"42015",
		"42017",
		"42019",
		"42021",
		"42023",
		"42025",
		"42027",
		"42029",
		"42031",
		"42033",
		"42035",
		"42037",
		"42039",
		"42041",
		"42043",
		"42045",
		"42047",
		"42049",
		"42051",
		"42053",
		"42055",
		"42057",
		"42059",
		"42061",
		"42063",
		"42065",
		"42067",
		"42069",
		"42071",
		"42073",
		"42075",
		"42077",
		"42079",
		"42081",
		"42083",
		"42085",
		"42087",
		"42089",
		"42091",
		"42093",
		"42095",
		"42097",
		"42099",
		"42101",
		"42103",
		"42105",
		"42107",
		"42109",
		"42111",
		"42113",
		"42115",
		"42117",
		"42119",
		"42121",
		"42123",
		"42125",
		"42127",
		"42129",
		"42131",
		"42133",
		"44000",
		"44001",
		"44003",
		"44005",
		"44007",
		"44009",
		"45000",
		"45001",
		"45003",
		"45005",
		"45007",
		"45009",
		"45011",
		"45013",
		"45015",
		"45017",
		"45019",
		"45021",
		"45023",
		"45025",
		"45027",
		"45029",
		"45031",
		"45033",
		"45035",
		"45037",
		"45039",
		"45041",
		"45043",
		"45045",
		"45047",
		"45049",
		"45051",
		"45053",
		"45055",
		"45057",
		"45059",
		"45061",
		"45063",
		"45065",
		"45067",
		"45069",
		"45071",
		"45073",
		"45075",
		"45077",
		"45079",
		"45081",
		"45083",
		"45085",
		"45087",
		"45089",
		"45091",
		"46000",
		"46003",
		"46005",
		"46007",
		"46009",
		"46011",
		"46013",
		"46015",
		"46017",
		"46019",
		"46021",
		"46023",
		"46025",
		"46027",
		"46029",
		"46031",
		"46033",
		"46035",
		"46037",
		"46039",
		"46041",
		"46043",
		"46045",
		"46047",
		"46049",
		"46051",
		"46053",
		"46055",
		"46057",
		"46059",
		"46061",
		"46063",
		"46065",
		"46067",
		"46069",
		"46071",
		"46073",
		"46075",
		"46077",
		"46079",
		"46081",
		"46083",
		"46085",
		"46087",
		"46089",
		"46091",
		"46093",
		"46095",
		"46097",
		"46099",
		"46101",
		"46103",
		"46105",
		"46107",
		"46109",
		"46111",
		"46113",
		"46115",
		"46117",
		"46119",
		"46121",
		"46123",
		"46125",
		"46127",
		"46129",
		"46135",
		"46137",
		"47000",
		"47001",
		"47003",
		"47005",
		"47007",
		"47009",
		"47011",
		"47013",
		"47015",
		"47017",
		"47019",
		"47021",
		"47023",
		"47025",
		"47027",
		"47029",
		"47031",
		"47033",
		"47035",
		"47037",
		"47039",
		"47041",
		"47043",
		"47045",
		"47047",
		"47049",
		"47051",
		"47053",
		"47055",
		"47057",
		"47059",
		"47061",
		"47063",
		"47065",
		"47067",
		"47069",
		"47071",
		"47073",
		"47075",
		"47077",
		"47079",
		"47081",
		"47083",
		"47085",
		"47087",
		"47089",
		"47091",
		"47093",
		"47095",
		"47097",
		"47099",
		"47101",
		"47103",
		"47105",
		"47107",
		"47109",
		"47111",
		"47113",
		"47115",
		"47117",
		"47119",
		"47121",
		"47123",
		"47125",
		"47127",
		"47129",
		"47131",
		"47133",
		"47135",
		"47137",
		"47139",
		"47141",
		"47143",
		"47145",
		"47147",
		"47149",
		"47151",
		"47153",
		"47155",
		"47157",
		"47159",
		"47161",
		"47163",
		"47165",
		"47167",
		"47169",
		"47171",
		"47173",
		"47175",
		"47177",
		"47179",
		"47181",
		"47183",
		"47185",
		"47187",
		"47189",
		"48000",
		"48001",
		"48003",
		"48005",
		"48007",
		"48009",
		"48011",
		"48013",
		"48015",
		"48017",
		"48019",
		"48021",
		"48023",
		"48025",
		"48027",
		"48029",
		"48031",
		"48033",
		"48035",
		"48037",
		"48039",
		"48041",
		"48043",
		"48045",
		"48047",
		"48049",
		"48051",
		"48053",
		"48055",
		"48057",
		"48059",
		"48061",
		"48063",
		"48065",
		"48067",
		"48069",
		"48071",
		"48073",
		"48075",
		"48077",
		"48079",
		"48081",
		"48083",
		"48085",
		"48087",
		"48089",
		"48091",
		"48093",
		"48095",
		"48097",
		"48099",
		"48101",
		"48103",
		"48105",
		"48107",
		"48109",
		"48111",
		"48113",
		"48115",
		"48117",
		"48119",
		"48121",
		"48123",
		"48125",
		"48127",
		"48129",
		"48131",
		"48133",
		"48135",
		"48137",
		"48139",
		"48141",
		"48143",
		"48145",
		"48147",
		"48149",
		"48151",
		"48153",
		"48155",
		"48157",
		"48159",
		"48161",
		"48163",
		"48165",
		"48167",
		"48169",
		"48171",
		"48173",
		"48175",
		"48177",
		"48179",
		"48181",
		"48183",
		"48185",
		"48187",
		"48189",
		"48191",
		"48193",
		"48195",
		"48197",
		"48199",
		"48201",
		"48203",
		"48205",
		"48207",
		"48209",
		"48211",
		"48213",
		"48215",
		"48217",
		"48219",
		"48221",
		"48223",
		"48225",
		"48227",
		"48229",
		"48231",
		"48233",
		"48235",
		"48237",
		"48239",
		"48241",
		"48243",
		"48245",
		"48247",
		"48249",
		"48251",
		"48253",
		"48255",
		"48257",
		"48259",
		"48261",
		"48263",
		"48265",
		"48267",
		"48269",
		"48271",
		"48273",
		"48275",
		"48277",
		"48279",
		"48281",
		"48283",
		"48285",
		"48287",
		"48289",
		"48291",
		"48293",
		"48295",
		"48297",
		"48299",
		"48301",
		"48303",
		"48305",
		"48307",
		"48309",
		"48311",
		"48313",
		"48315",
		"48317",
		"48319",
		"48321",
		"48323",
		"48325",
		"48327",
		"48329",
		"48331",
		"48333",
		"48335",
		"48337",
		"48339",
		"48341",
		"48343",
		"48345",
		"48347",
		"48349",
		"48351",
		"48353",
		"48355",
		"48357",
		"48359",
		"48361",
		"48363",
		"48365",
		"48367",
		"48369",
		"48371",
		"48373",
		"48375",
		"48377",
		"48379",
		"48381",
		"48383",
		"48385",
		"48387",
		"48389",
		"48391",
		"48393",
		"48395",
		"48397",
		"48399",
		"48401",
		"48403",
		"48405",
		"48407",
		"48409",
		"48411",
		"48413",
		"48415",
		"48417",
		"48419",
		"48421",
		"48423",
		"48425",
		"48427",
		"48429",
		"48431",
		"48433",
		"48435",
		"48437",
		"48439",
		"48441",
		"48443",
		"48445",
		"48447",
		"48449",
		"48451",
		"48453",
		"48455",
		"48457",
		"48459",
		"48461",
		"48463",
		"48465",
		"48467",
		"48469",
		"48471",
		"48473",
		"48475",
		"48477",
		"48479",
		"48481",
		"48483",
		"48485",
		"48487",
		"48489",
		"48491",
		"48493",
		"48495",
		"48497",
		"48499",
		"48501",
		"48503",
		"48505",
		"48507",
		"49000",
		"49001",
		"49003",
		"49005",
		"49007",
		"49009",
		"49011",
		"49013",
		"49015",
		"49017",
		"49019",
		"49021",
		"49023",
		"49025",
		"49027",
		"49029",
		"49031",
		"49033",
		"49035",
		"49037",
		"49039",
		"49041",
		"49043",
		"49045",
		"49047",
		"49049",
		"49051",
		"49053",
		"49055",
		"49057",
		"50000",
		"50001",
		"50003",
		"50005",
		"50007",
		"50009",
		"50011",
		"50013",
		"50015",
		"50017",
		"50019",
		"50021",
		"50023",
		"50025",
		"50027",
		"51000",
		"51001",
		"51003",
		"51005",
		"51007",
		"51009",
		"51011",
		"51013",
		"51015",
		"51017",
		"51019",
		"51021",
		"51023",
		"51025",
		"51027",
		"51029",
		"51031",
		"51033",
		"51035",
		"51036",
		"51037",
		"51041",
		"51043",
		"51045",
		"51047",
		"51049",
		"51051",
		"51053",
		"51057",
		"51059",
		"51061",
		"51063",
		"51065",
		"51067",
		"51069",
		"51071",
		"51073",
		"51075",
		"51077",
		"51079",
		"51081",
		"51083",
		"51085",
		"51087",
		"51089",
		"51091",
		"51093",
		"51095",
		"51097",
		"51099",
		"51101",
		"51103",
		"51105",
		"51107",
		"51109",
		"51111",
		"51113",
		"51115",
		"51117",
		"51119",
		"51121",
		"51125",
		"51127",
		"51131",
		"51133",
		"51135",
		"51137",
		"51139",
		"51141",
		"51143",
		"51145",
		"51147",
		"51149",
		"51153",
		"51155",
		"51157",
		"51159",
		"51161",
		"51163",
		"51165",
		"51167",
		"51169",
		"51171",
		"51173",
		"51175",
		"51177",
		"51179",
		"51181",
		"51183",
		"51185",
		"51187",
		"51191",
		"51193",
		"51195",
		"51197",
		"51199",
		"51510",
		"51515",
		"51520",
		"51530",
		"51540",
		"51550",
		"51560",
		"51570",
		"51580",
		"51590",
		"51595",
		"51600",
		"51610",
		"51620",
		"51630",
		"51640",
		"51650",
		"51660",
		"51670",
		"51678",
		"51680",
		"51683",
		"51685",
		"51690",
		"51700",
		"51710",
		"51720",
		"51730",
		"51735",
		"51740",
		"51750",
		"51760",
		"51770",
		"51775",
		"51780",
		"51790",
		"51800",
		"51810",
		"51820",
		"51830",
		"51840",
		"53000",
		"53001",
		"53003",
		"53005",
		"53007",
		"53009",
		"53011",
		"53013",
		"53015",
		"53017",
		"53019",
		"53021",
		"53023",
		"53025",
		"53027",
		"53029",
		"53031",
		"53033",
		"53035",
		"53037",
		"53039",
		"53041",
		"53043",
		"53045",
		"53047",
		"53049",
		"53051",
		"53053",
		"53055",
		"53057",
		"53059",
		"53061",
		"53063",
		"53065",
		"53067",
		"53069",
		"53071",
		"53073",
		"53075",
		"53077",
		"54000",
		"54001",
		"54003",
		"54005",
		"54007",
		"54009",
		"54011",
		"54013",
		"54015",
		"54017",
		"54019",
		"54021",
		"54023",
		"54025",
		"54027",
		"54029",
		"54031",
		"54033",
		"54035",
		"54037",
		"54039",
		"54041",
		"54043",
		"54045",
		"54047",
		"54049",
		"54051",
		"54053",
		"54055",
		"54057",
		"54059",
		"54061",
		"54063",
		"54065",
		"54067",
		"54069",
		"54071",
		"54073",
		"54075",
		"54077",
		"54079",
		"54081",
		"54083",
		"54085",
		"54087",
		"54089",
		"54091",
		"54093",
		"54095",
		"54097",
		"54099",
		"54101",
		"54103",
		"54105",
		"54107",
		"54109",
		"55000",
		"55001",
		"55003",
		"55005",
		"55007",
		"55009",
		"55011",
		"55013",
		"55015",
		"55017",
		"55019",
		"55021",
		"55023",
		"55025",
		"55027",
		"55029",
		"55031",
		"55033",
		"55035",
		"55037",
		"55039",
		"55041",
		"55043",
		"55045",
		"55047",
		"55049",
		"55051",
		"55053",
		"55055",
		"55057",
		"55059",
		"55061",
		"55063",
		"55065",
		"55067",
		"55069",
		"55071",
		"55073",
		"55075",
		"55077",
		"55078",
		"55079",
		"55081",
		"55083",
		"55085",
		"55087",
		"55089",
		"55091",
		"55093",
		"55095",
		"55097",
		"55099",
		"55101",
		"55103",
		"55105",
		"55107",
		"55109",
		"55111",
		"55113",
		"55115",
		"55117",
		"55119",
		"55121",
		"55123",
		"55125",
		"55127",
		"55129",
		"55131",
		"55133",
		"55135",
		"55137",
		"55139",
		"55141",
		"56000",
		"56001",
		"56003",
		"56005",
		"56007",
		"56009",
		"56011",
		"56013",
		"56015",
		"56017",
		"56019",
		"56021",
		"56023",
		"56025",
		"56027",
		"56029",
		"56031",
		"56033",
		"56035",
		"56037",
		"56039",
		"56041",
		"56043",
		"56045"
	];
}));
//#endregion
//#region src/js/apis/search.js
var performSpendingByGeographySearch;
var init_search = __esmMin((() => {
	init_apiRequest();
	performSpendingByGeographySearch = (params) => apiRequest({
		url: "v2/search/spending_by_geography/",
		method: "post",
		data: params
	});
}));
//#endregion
//#region src/js/dataMapping/search/geoVisualizationSection.jsx
var import_jsx_runtime$65, noteMessage;
var init_geoVisualizationSection = __esmMin((() => {
	init_development();
	import_jsx_runtime$65 = require_jsx_runtime();
	noteMessage = /* @__PURE__ */ (0, import_jsx_runtime$65.jsxs)(import_jsx_runtime$65.Fragment, { children: [
		"Data reported by the Department of Health and Human Services (HHS) related to Medicare payments does not reflect the place where \"the majority of the work\" occurs, as required by USAspending's data model specifications. For more information, visit our\xA0",
		/* @__PURE__ */ (0, import_jsx_runtime$65.jsx)(Link, {
			target: "_blank",
			rel: "noopener noreferrer",
			to: "/about?section=data-quality",
			children: "About Page"
		}),
		"."
	] });
}));
//#endregion
//#region src/js/redux/actions/search/searchViewActions.js
var setSearchViewSubaward, setMapHasLoaded, setSpendingLevel;
var init_searchViewActions = __esmMin((() => {
	setSearchViewSubaward = (state) => ({
		type: "SET_SEARCH_VIEW_SUBAWARD",
		value: state
	});
	setMapHasLoaded = (state) => ({
		type: "SET_MAP_HAS_LOADED",
		value: state
	});
	setSpendingLevel = (state) => ({
		type: "SET_SPENDING_LEVEL",
		value: state
	});
}));
//#endregion
//#region src/js/helpers/search/visualizations/geoHelper.js
var prohibitedCountryCodes;
var init_geoHelper = __esmMin((() => {
	prohibitedCountryCodes = [
		"ASM",
		"FSM",
		"GUM",
		"MHL",
		"MNP",
		"PLW",
		"PRI",
		"VIR",
		"XBK",
		"XHO",
		"XJA",
		"XJV",
		"XKR",
		"XMW",
		"XNV",
		"XPL",
		"XWK"
	];
}));
//#endregion
//#region src/js/components/search/visualizations/geo/AdvancedSearchMapFilters.jsx
var import_jsx_runtime$64, propTypes$39, AdvancedSearchMapFilters;
var init_AdvancedSearchMapFilters = __esmMin((() => {
	init_index_es();
	init_covid19();
	init_covid19Helper();
	init_MapFiltersTitle();
	import_jsx_runtime$64 = require_jsx_runtime();
	propTypes$39 = {
		filters: PropTypes.object,
		activeFilters: PropTypes.object,
		isOpen: PropTypes.bool
	};
	AdvancedSearchMapFilters = ({ filters, activeFilters, isOpen }) => /* @__PURE__ */ (0, import_jsx_runtime$64.jsxs)("div", {
		className: isOpen ? "map__filters-container open" : "map__filters-container closed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("div", {
			className: "map__filters-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)(MapFiltersTitle, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("div", {
			className: "map__filters-body",
			children: Object.keys(filters).map((filter) => /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("div", {
				className: "map__filters-filter__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$64.jsxs)("div", {
					className: "map__filters-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("span", {
						className: "map__filters-label",
						children: filters[filter].label
					}), /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)(fc, {
						enabled: filters[filter].enabled,
						size: "sm",
						classname: "map__filters-button",
						dropdownClassname: "map__filters-dropdown",
						sortFn: handleSort,
						selectedOption: filters[filter].options?.find((option) => option.value === activeFilters[filter]).label,
						options: filters[filter].options?.map((option) => ({
							name: option.label,
							value: option.value,
							onClick: filters[filter].onClick,
							sortOrder: mapFilterSortOrderByValue[option.value]
						}))
					})]
				})
			}, uniqueId()))
		})]
	});
	AdvancedSearchMapFilters.propTypes = propTypes$39;
}));
//#endregion
//#region src/js/components/search/visualizations/geo/MapWrapper.jsx
/**
* MapWrapper.jsx
* Created by Kevin Li 2/14/17
*/
var import_jsx_runtime$63, propTypes$38, mapLegendToggleData, MapWrapper, MapWrapper_default;
var init_MapWrapper = __esmMin((() => {
	init_es();
	init_GlobalConstants();
	init_searchViewActions();
	init_stateNames();
	init_mapHelper();
	init_geoHelper();
	init_mapBroadcaster();
	init_MapBox();
	init_MapLegend();
	init_MapFiltersToggle();
	init_AdvancedSearchMapFilters();
	import_jsx_runtime$63 = require_jsx_runtime();
	propTypes$38 = {
		filters: PropTypes.object,
		activeFilters: PropTypes.object,
		awardTypeFilters: PropTypes.array,
		data: PropTypes.object,
		scope: PropTypes.string,
		renderHash: PropTypes.string,
		showHover: PropTypes.bool,
		selectedItem: PropTypes.object,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		children: PropTypes.node,
		center: PropTypes.array,
		stateProfile: PropTypes.bool,
		mapLegendToggle: PropTypes.string,
		updateMapLegendToggle: PropTypes.func,
		stateInfo: PropTypes.object,
		amountTypeEnabled: PropTypes.bool,
		singleLocationSelected: PropTypes.object,
		tooltip: PropTypes.object
	};
	mapLegendToggleData = [{
		title: "Total Spending",
		value: "totalSpending"
	}, {
		title: "Per Capita Spending",
		value: "perCapita"
	}];
	MapWrapper = ({ filters, activeFilters, awardTypeFilters, data = {
		locations: [],
		values: []
	}, scope = "state", renderHash, showHover, selectedItem, showTooltip, hideTooltip, children = null, center: centerProp, stateProfile, mapLegendToggle, updateMapLegendToggle, stateInfo, amountTypeEnabled = true, singleLocationSelected, tooltip: TooltipComponent }) => {
		const [mapLayers, setMapLayers] = useState({});
		const [mapReady, setMapReady] = useState(false);
		const [spendingScale, setSpendingScale] = useState({
			scale: null,
			segments: [],
			units: {}
		});
		const [center, setCenter] = useState(centerProp);
		const [isFiltersOpen, setIsFiltersOpen] = useState(true);
		const mapRef = useRef();
		const scopeRef = useRef(scope);
		const broadcastReceivers = [];
		let renderCallback = null;
		let mapOperationQueue = {};
		const hideSource = (type) => {
			const layers = mapLayers[type];
			if (!layers) return;
			mapRef.current.setLayoutProperty(layers.base, "visibility", "none");
			layers.highlights.forEach((highlight) => {
				mapRef.current.setLayoutProperty(highlight, "visibility", "none");
			});
		};
		const mouseOverLayer = (e) => {
			const source = mapboxSources[scope];
			const entityId = e.features[0].properties[source.filterKey];
			showTooltip(entityId, {
				x: e.originalEvent.offsetX,
				y: e.originalEvent.offsetY
			});
		};
		const mouseExitLayer = () => {
			hideTooltip();
		};
		const loadSource = (type) => {
			const baseLayer = `base_${type}`;
			const sourceRef = {
				base: baseLayer,
				highlights: []
			};
			const source = mapboxSources[type];
			mapRef.current.addSource(type, {
				type: "vector",
				url: source.url
			});
			mapRef.current.addLayer({
				id: baseLayer,
				type: "fill",
				source: type,
				"source-layer": source.layer,
				paint: {
					"fill-outline-color": "rgba(0,0,0,0.3)",
					"fill-color": "rgba(0,0,0,0)"
				}
			});
			visualizationColors.forEach((color, index) => {
				const layerName = `highlight_${type}_group_${index}`;
				mapRef.current.addLayer({
					id: layerName,
					type: "fill",
					source: type,
					"source-layer": source.layer,
					paint: {
						"fill-outline-color": "rgba(0,0,0,0.3)",
						"fill-color": color
					},
					filter: [
						"in",
						source.filterKey,
						""
					]
				}, firstSymbolId(mapRef));
				mapRef.current.on("mousemove", layerName, mouseOverLayer.bind(void 0));
				mapRef.current.on("mouseleave", layerName, mouseExitLayer.bind(void 0));
				sourceRef.highlights.push(layerName);
			});
			setMapLayers((prevLayers) => ({
				...prevLayers,
				[type]: sourceRef
			}));
		};
		const showSource = (type) => {
			const layers = mapLayers[type];
			if (!layers) {
				loadSource(type);
				return;
			}
			mapRef.current.setLayoutProperty(layers.base, "visibility", "visible");
			layers.highlights.forEach((highlight) => {
				mapRef.current.setLayoutProperty(highlight, "visibility", "visible");
			});
		};
		const prepareLayers = () => new Promise((resolve, reject) => {
			if (!mapReady) reject();
			const source = mapboxSources[scope];
			if (!source) reject();
			Object.keys(mapboxSources).forEach((type) => {
				if (type !== scope) hideSource(type);
			});
			showSource(scope);
			if (source.minZoom) {
				if (mapRef.current.getZoom() < source.minZoom) mapRef.current.setMinZoom(source.minZoom);
			} else mapRef.current.setMinZoom(0);
			const parentMap = mapRef.current;
			function renderResolver() {
				parentMap.off("render", renderResolver);
				resolve();
			}
			function loadResolver(e) {
				if (e.isSourceLoaded && e.tile) {
					parentMap.off("sourcedata", loadResolver);
					parentMap.on("render", renderResolver);
				}
			}
			mapRef.current.on("sourcedata", loadResolver);
		});
		const runMapOperationQueue = () => {
			Object.keys(mapOperationQueue).forEach((key) => {
				mapOperationQueue[key].call(void 0);
			});
			mapOperationQueue = {};
		};
		const prepareChangeListeners = () => {
			const parentMap = mapRef.current;
			const mapMovedCallback = () => {
				if (parentMap.loaded()) {
					parentMap.off("render", mapMovedCallback);
					singleton.emit("mapMoved");
				}
			};
			renderCallback = () => {
				mapRef?.current?.map?.current?.on("render", mapMovedCallback);
			};
			mapRef?.current?.map?.current?.on("moveend", renderCallback);
			mapRef?.current?.map?.current?.on("resize", renderCallback);
		};
		const prepareMap = () => {
			prepareLayers().then(() => {
				runMapOperationQueue();
				if (!stateProfile) prepareChangeListeners();
				singleton.emit("mapReady");
			});
		};
		const measureMap = (forced = false) => {
			if (!mapRef.current.loaded()) {
				window.requestAnimationFrame(() => {
					measureMap();
				});
				return;
			}
			const entities = mapRef.current.queryRenderedFeatures({ layers: [`base_${scopeRef.current}`] });
			const source = mapboxSources[scopeRef.current];
			const visibleEntities = entities.map((entity) => entity.properties[source.filterKey]);
			if (scopeRef.current === "country") {
				if (visibleEntities.filter((value) => prohibitedCountryCodes?.includes(value))?.length > 0) visibleEntities.push("USA");
			}
			const uniqueEntities = uniq(visibleEntities).filter((n) => n);
			singleton.emit("mapMeasureDone", uniqueEntities, forced);
		};
		const prepareBroadcastReceivers = () => {
			const listenerRef = singleton.on("measureMap", measureMap);
			broadcastReceivers.push(listenerRef);
		};
		const removeChangeListeners = () => {
			if (mapRef.current) {
				mapRef.current.off("moveend", renderCallback);
				mapRef.current.off("resize", renderCallback);
			}
		};
		const queueMapOperation = (name, operation) => {
			mapOperationQueue[name] = operation;
		};
		const setCenterFromMapTiles = (value, filterKey, lat, long) => {
			const found = mapRef.current.queryRenderedFeatures({ layers: [`base_${scope}`] }).find((element) => element.properties[filterKey] === value);
			if (found) {
				if (![parseFloat(found.properties[long]), parseFloat(found.properties[lat])].every((v, index) => v === center[index])) {
					setCenter([parseFloat(found.properties[long]), parseFloat(found.properties[lat])]);
					removeChangeListeners();
				}
			}
		};
		const reCenterMap = () => {
			if (mapReady && singleLocationSelected && Object.keys(singleLocationSelected).length > 0 && (scope === "county" || scope === "congressionalDistrict")) {
				let value;
				let filterKey;
				let lat = "INTPTLAT";
				let long = "INTPTLON";
				const district = singleLocationSelected.district_original || singleLocationSelected.district_current;
				if (scope === "congressionalDistrict" && district && stateFIPSByAbbreviation[singleLocationSelected?.state]) {
					filterKey = "GEOID20";
					lat += "20";
					long += "20";
					value = `${stateFIPSByAbbreviation[singleLocationSelected.state]}${district}`;
					setCenterFromMapTiles(value, filterKey, lat, long);
				} else if (scope === "county" && stateFIPSByAbbreviation[singleLocationSelected?.state?.toUpperCase()] && singleLocationSelected?.county) {
					filterKey = "GEOID";
					value = `${stateFIPSByAbbreviation[singleLocationSelected.state.toUpperCase()]}${singleLocationSelected.county}`;
					setCenterFromMapTiles(value, filterKey, lat, long);
				}
			}
		};
		const displayData = () => {
			if (!mapReady) {
				queueMapOperation("displayData", displayData);
				return;
			}
			const source = mapboxSources[scope];
			const scale = calculateRange(data.values);
			const filterValues = visualizationColors.map(() => []);
			data.locations.forEach((location, index) => {
				let value = data.values[index];
				if (isNaN(value)) value = 0;
				const group = scale.scale(value);
				filterValues[group].push(location);
			});
			filterValues.forEach((valueSet, index) => {
				const layerName = `highlight_${scope}_group_${index}`;
				let filter = [
					"in",
					source.filterKey,
					""
				];
				if (valueSet.length > 0) filter = ["in", source.filterKey].concat(valueSet);
				mapRef.current.setFilter(layerName, filter);
			});
			reCenterMap();
			setSpendingScale(scale);
		};
		/**
		* tooltipDescription
		* - description for tooltip based on page and toggle
		* @returns {string}
		*/
		const tooltipDescription = () => {
			if (stateProfile) return "Obligations";
			return mapLegendToggle === "totalSpending" ? "Obligations" : "Per Capita";
		};
		const tooltipFunc = () => {
			const selectedItemObj = selectedItem;
			if (scope === "country" && selectedItem.label === "United States") selectedItemObj.label = `${selectedItem.label} and Territories`;
			if (showHover) return /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(TooltipComponent, {
				description: tooltipDescription(),
				...selectedItemObj
			});
			return null;
		};
		const legend = () => {
			if (stateProfile) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(MapLegend, {
				segments: spendingScale.segments,
				units: spendingScale.units,
				mapLegendToggleData,
				updateMapLegendToggle,
				mapLegendToggle,
				scope
			});
		};
		const filtersFunc = () => {
			let mapFilters = cloneDeep(filters);
			let active = cloneDeep(activeFilters);
			if (!mapFilters || !activeFilters) return null;
			if ((awardTypeFilters?.map((filter) => filter.internal).filter((filter) => filter !== "all").filter((filter) => filter !== "loans"))?.includes(activeFilters.awardType)) mapFilters.spendingType.options.pop();
			if (activeFilters?.territory === "country") {
				mapFilters = Object.assign({}, {
					territory: mapFilters.territory,
					amountType: {
						...mapFilters.amountType,
						enabled: false
					}
				});
				active = Object.assign({}, {
					...active,
					amountType: "totalSpending"
				});
			} else if (amountTypeEnabled === false) mapFilters = Object.assign({}, { territory: mapFilters.territory });
			else mapFilters = Object.assign({}, {
				territory: mapFilters.territory,
				amountType: {
					...mapFilters.amountType,
					enabled: true
				}
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(AdvancedSearchMapFilters, {
				filters: mapFilters,
				activeFilters: active,
				isOpen: isFiltersOpen
			});
		};
		useEffect(() => {
			displayData();
			if (!stateProfile) prepareBroadcastReceivers();
			return () => {
				removeChangeListeners();
				broadcastReceivers.forEach((listenerRef) => {
					singleton.off(listenerRef.event, listenerRef.id);
				});
			};
		}, []);
		useEffect(() => {
			if (scopeRef.current !== scope) {
				queueMapOperation("displayData", displayData);
				prepareMap();
				scopeRef.current = scope;
			} else displayData();
		}, [renderHash, data]);
		useEffect(() => {
			if (mapReady) prepareMap();
		}, [mapReady]);
		useEffect(() => {
			setCenter(centerProp);
		}, [centerProp]);
		return /* @__PURE__ */ (0, import_jsx_runtime$63.jsxs)("div", {
			className: "map-container",
			children: [
				globalConstants.MAPBOX_TOKEN && /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(MapBox, {
					setMapReady,
					center,
					mapType: scope,
					stateInfo,
					stateProfile,
					ref: mapRef,
					singleLocationSelected
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(MapFiltersToggle, {
					isFiltersOpen,
					setIsFiltersOpen
				}),
				filtersFunc(),
				legend(),
				tooltipFunc(),
				children
			]
		});
	};
	MapWrapper.propTypes = propTypes$38;
	MapWrapper_default = connect_default((state) => ({ isMapLoaded: state.searchView.mapHasLoaded }), (dispatch) => ({ onMapLoaded: (bool) => dispatch(setMapHasLoaded(bool)) }))(MapWrapper);
}));
//#endregion
//#region src/js/components/search/visualizations/geo/GeoVisualizationSection.jsx
/**
* GeoVisualizationSection.jsx
* Created by Kevin Li 2/13/17
*/
var import_mapbox_gl, import_jsx_runtime$62, propTypes$37, availableLayers, GeoVisualizationSection;
var init_GeoVisualizationSection = __esmMin((() => {
	import_mapbox_gl = /* @__PURE__ */ __toESM(require_mapbox_gl(), 1);
	init_ResultsTableErrorMessage();
	init_LoadingSpinner();
	init_Icons();
	init_Note();
	init_geoVisualizationSection();
	init_map();
	init_covid19();
	init_MapWrapper();
	init_GeoVisualizationTooltip();
	init_MapMessage();
	import_jsx_runtime$62 = require_jsx_runtime();
	propTypes$37 = {
		scope: PropTypes.string,
		mapLayer: PropTypes.string,
		changeScope: PropTypes.func,
		changeMapLayer: PropTypes.func,
		mapMoved: PropTypes.func,
		renderHash: PropTypes.string,
		data: PropTypes.object,
		total: PropTypes.number,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		noResults: PropTypes.bool,
		mapLegendToggle: PropTypes.string,
		updateMapLegendToggle: PropTypes.func,
		spendingLevel: PropTypes.string,
		className: PropTypes.string,
		center: PropTypes.array,
		singleLocationSelected: PropTypes.object,
		newAdvancedSearch: PropTypes.bool
	};
	availableLayers = [
		"country",
		"state",
		"county",
		"congressionalDistrict"
	];
	GeoVisualizationSection = (props) => {
		const [showHover, setShowHover] = useState(false);
		const [selectedItem, setSelectedItem] = useState({});
		const [activeFilters, setActiveFilters] = useState({
			territory: props.mapLayer,
			spendingType: "obligation",
			amountType: "totalSpending",
			recipientType: "all",
			awardType: "all"
		});
		const dataRef = useRef(props.data);
		const updateAmountTypeFilter = (value) => {
			setActiveFilters({
				...activeFilters,
				amountType: value
			});
			props.updateMapLegendToggle(value);
		};
		const updateTerritoryFilter = (value) => {
			props.changeMapLayer(value);
			setActiveFilters({
				...activeFilters,
				territory: value
			});
		};
		const addOnClickToFilters = () => Object.keys(advancedSearchFilters).reduce((acc, filter) => {
			acc[filter] = {
				...advancedSearchFilters[filter],
				onClick: filtersOnClickHandler[filter] === "updateAmountTypeFilter" ? updateAmountTypeFilter : updateTerritoryFilter
			};
			return acc;
		}, {});
		const showTooltip = (geoId, position) => {
			const label = dataRef.current.labels[geoId];
			setShowHover(true);
			setSelectedItem({
				label: label.label,
				total: props.total,
				value: label.value,
				x: position.x,
				y: position.y
			});
		};
		const hideTooltip = () => {
			setShowHover(false);
			setSelectedItem({});
		};
		useEffect(() => {
			dataRef.current = props.data;
		}, [props.data]);
		useEffect(() => {
			updateTerritoryFilter(props.mapLayer);
		}, [props.mapLayer]);
		const getMessage = () => {
			if (!import_mapbox_gl.default.supported()) return /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
				className: "results-table-message-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(ResultsTableErrorMessage, {
					title: "WebGL Required for this map.",
					description: "Please enable WebGL in your browser settings to view this map visualization."
				})
			});
			let message = null;
			if (props.loading) message = /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsxs)("div", {
				className: "map-loading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(LoadingSpinner, {}), /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
					className: "loading-message",
					children: "Gathering your data..."
				})]
			}) });
			else if (props.error) message = /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsxs)("div", {
				className: "map-no-results",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
						className: "error-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(ExclamationTriangle, { alt: "An error occurred" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
						className: "title",
						children: "An error occurred."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
						className: "description",
						children: "Something went wrong while gathering your data."
					})
				]
			}) });
			else if (props.noResults) message = /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsxs)("div", {
				className: "map-no-results",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", { className: "no-results-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("div", {
					className: "title",
					children: "No results found in the current map area."
				})]
			}) });
			return message;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$62.jsxs)("section", {
			className: "results-visualization-geo-section",
			id: "results-section-geo",
			"aria-label": "Spending by Geography",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(MapWrapper_default, {
				filters: addOnClickToFilters(),
				activeFilters,
				setActiveFilters,
				awardTypeFilters: awardTypeTabs,
				data: props.data,
				renderHash: props.renderHash,
				scope: props.mapLayer,
				changeMapLayer: props.changeMapLayer,
				showHover,
				selectedItem,
				showTooltip,
				hideTooltip,
				tooltip: GeoVisualizationTooltip,
				availableLayers,
				showLayerToggle: true,
				center: props.center,
				className: props.className,
				mapLegendToggle: props.mapLegendToggle,
				updateMapLegendToggle: props.updateMapLegendToggle,
				singleLocationSelected: props.singleLocationSelected,
				children: getMessage()
			}), props.newAdvancedSearch ? /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(import_jsx_runtime$62.Fragment, {}) : /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)(Note, { message: noteMessage })]
		});
	};
	GeoVisualizationSection.propTypes = propTypes$37;
}));
//#endregion
//#region src/js/containers/search/resultsView/MapWrapperContainer.jsx
var import_jsx_runtime$61, propTypes$36, apiScopes, logMapLayerEvent, logMapScopeEvent, MapWrapperContainer, MapWrapperContainer_default;
var init_MapWrapperContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_geoTable();
	init_searchFilterActions();
	init_appliedFilterActions();
	init_mapLegendToggleActions();
	init_stateNames();
	init_mapHelper();
	init_mapBroadcaster();
	init_Analytics();
	init_search();
	init_SearchAwardsOperation();
	init_GeoVisualizationSection();
	init_SearchSectionWrapper();
	init_moneyFormatter();
	import_jsx_runtime$61 = require_jsx_runtime();
	propTypes$36 = {
		reduxFilters: PropTypes.object,
		setAppliedFilterCompletion: PropTypes.func,
		noApplied: PropTypes.bool,
		mapLegendToggle: PropTypes.string,
		updateMapLegendToggle: PropTypes.func,
		className: PropTypes.string,
		scope: PropTypes.string,
		setScope: PropTypes.func,
		wrapperProps: PropTypes.object,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string
	};
	apiScopes = {
		country: "country",
		state: "state",
		county: "county",
		congressionalDistrict: "district"
	};
	logMapLayerEvent = (layer) => {
		Analytics.event({
			event: "search_map_layer_event",
			category: "Advanced Search - Map - Map Layer",
			action: layer,
			gtm: true
		});
	};
	logMapScopeEvent = (scope) => {
		Analytics.event({
			event: "search_map_location_type_event",
			category: "Advanced Search - Map - Location Type",
			action: scope,
			gtm: true
		});
	};
	MapWrapperContainer = React.memo((props) => {
		const USACenterPoint = [-95.56943, 38.852892];
		const [mapLayer, setMapLayer] = useState("state");
		const [rawAPIData, setRawAPIData] = useState([]);
		const [data, setData] = useState({
			values: [],
			locations: []
		});
		const [visibleEntities, setVisibleEntities] = useState([]);
		const [renderHash, setRenderHash] = useState(null);
		const [loading, setLoading] = useState(true);
		const [loadingTiles, setLoadingTiles] = useState(true);
		const [error, setError] = useState(false);
		const [noData, setNoData] = useState(false);
		const [center, setCenter] = useState(USACenterPoint);
		const [singleLocationSelected, setSingleLocationSelected] = useState({});
		const [tableData, setTableData] = useState([]);
		const [tableRows, setTableRows] = useState([]);
		const [sortDirection, setSortDirection] = useState("asc");
		const [activeField, setActiveField] = useState("aggregated_amount");
		const [wrapperScreens, setWrapperScreens] = useState({
			wrapperLoading: false,
			wrapperError: false,
			wrapperNoData: false
		});
		const [mapViewType, setMapViewType] = useState("chart");
		let apiRequest = null;
		const mapListeners = [];
		const useEffectRef = React.useRef({
			visibleEntities: false,
			allEntities: false,
			rawAPIData: false,
			loadingTiles: true
		});
		const completeDataSet = {
			country: countries,
			state: Object.keys(stateFIPSByAbbreviation),
			county: counties,
			congressionalDistrict: congressionalDistricts
		};
		const selectDataSet = () => completeDataSet[mapLayer];
		const calculateCenterPoint = (location) => {
			if (location) {
				let locationRequest = performCountryGeocode(location);
				locationRequest.promise.then((res) => {
					setCenter(res.data?.features[0]?.center ? res.data?.features[0]?.center : USACenterPoint);
				}).catch((err) => {
					if (!isCancel(err)) {
						console.log(err);
						locationRequest = null;
					}
				});
			} else setCenter(USACenterPoint);
		};
		const mapToggleDataKey = () => props.mapLegendToggle === "totalSpending" ? "aggregated_amount" : "per_capita";
		const findMapCenterPointByLocation = (locationAbbrev) => {
			if (apiScopes[mapLayer] !== "country") setCenter(stateCenterFromFips(stateFIPSByAbbreviation[locationAbbrev]));
			else if (locationAbbrev !== "USA") calculateCenterPoint(locationAbbrev);
			else setCenter(USACenterPoint);
		};
		const areFirstTwoCharsEqual = (arr) => {
			if (!arr || arr.length === 0) return true;
			const firstTwoCharsOfFirstElement = arr[0].substring(0, 2);
			return arr.every((element) => {
				if (typeof element !== "string" || element.length < 2) return false;
				return element.substring(0, 2) === firstTwoCharsOfFirstElement;
			});
		};
		/**
		* valuesLocationsLabelsFromAPIData
		* - creates locations, values, and labels for the map visualization from api data
		* @returns {Object} - object with locations, values and labels properties
		*/
		const valuesLocationsLabelsFromAPIData = () => {
			const values = [];
			const locations = [];
			const labels = {};
			const rows = [];
			rawAPIData.forEach((item) => {
				if (item.shape_code && item.shape_code !== "") {
					locations.push(item.shape_code);
					values.push(parseFloat(item[mapToggleDataKey()]));
					labels[item.shape_code] = {
						label: item.display_name,
						value: parseFloat(item[mapToggleDataKey()])
					};
					const row = [];
					const stateCheck = item.shape_code.length < 3;
					const congressionalDistrictCheck = item.display_name.substring(2, 3) === "-";
					const countyCheck = parseInt(item.shape_code, 10);
					if (stateCheck) row.state_territory = item.display_name;
					else if (congressionalDistrictCheck) {
						row.d_district = item.display_name;
						row.state_territory = stateNameFromCode(item.display_name.substring(0, 2));
					} else if (countyCheck) {
						row.county = item.display_name;
						row.state_territory = stateNameFromFips(item.shape_code.substring(0, 2));
					} else row.country = item.display_name;
					row.obligations = item.aggregated_amount;
					row.per_capita = item.per_capita;
					rows.push(row);
				}
			});
			if ((mapLayer === "county" || mapLayer === "congressionalDistrict") && areFirstTwoCharsEqual(locations)) {
				const stateAbbreviation = stateAbbreviationFromFips(locations[0].substring(0, 2));
				findMapCenterPointByLocation(stateAbbreviation);
			} else if ((mapLayer === "country" || mapLayer === "state") && locations?.length === 1) findMapCenterPointByLocation(locations[0]);
			setTableData(rows);
			return {
				values,
				locations,
				labels
			};
		};
		const setParsedData = () => {
			props.setAppliedFilterCompletion(true);
			setData(valuesLocationsLabelsFromAPIData());
			setRenderHash(`geo-${uniqueId()}`);
			setLoading(false);
			setError(false);
		};
		const prepareFetch = (forced = false) => {
			if (useEffectRef.current?.loadingTiles) return;
			singleton.emit("measureMap", forced);
		};
		const mapLoaded = () => {
			setLoadingTiles(false);
			useEffectRef.current.loadingTiles = false;
		};
		const compareEntities = (entities) => {
			const current = keyBy(visibleEntities);
			const inbound = keyBy(entities);
			for (const entity of entities) if (!current[entity]) return true;
			for (const entity of visibleEntities) if (!inbound[entity]) return true;
			return false;
		};
		const getSpendingLevel = (spendingLevel) => {
			if (spendingLevel === "subawards") return spendingLevel;
			return "transactions";
		};
		const fetchData = () => {
			const operation = new SearchAwardsOperation();
			operation.fromState(props.reduxFilters);
			if (visibleEntities.length === 0) {
				setLoading(false);
				setError(false);
				setData({
					values: [],
					locations: []
				});
				setNoData(true);
				return;
			}
			if (props.spendingLevel === "subawards" && operation.dateType) delete operation.dateType;
			const searchParams = operation.toParams();
			const apiParams = {
				scope: props.scope,
				geo_layer: apiScopes[mapLayer],
				geo_layer_filters: selectDataSet(),
				filters: searchParams,
				auditTrail: "Map Visualization",
				spending_level: getSpendingLevel(props.spendingLevel)
			};
			if (apiRequest) apiRequest.cancel();
			setLoading(true);
			setError(false);
			props.setAppliedFilterCompletion(false);
			apiRequest = performSpendingByGeographySearch(apiParams);
			apiRequest.promise.then((res) => {
				apiRequest = null;
				useEffectRef.current.rawAPIData = true;
				setRawAPIData(res.data.results);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					apiRequest = null;
					setLoading(false);
					setError(true);
					props.setAppliedFilterCompletion(true);
				}
			});
		};
		const receivedEntities = (entities, forced) => {
			if (!forced) {
				if (!compareEntities(entities)) return;
			}
			useEffectRef.current.visibleEntities = true;
			setVisibleEntities(entities);
		};
		/**
		* handleMapLegendToggleChange
		* - updates data values property and label value properties to respective spending total
		* @returns {null}
		*/
		const handleMapLegendToggleChange = () => {
			setData(Object.assign({}, valuesLocationsLabelsFromAPIData()));
			setRenderHash(`geo-${uniqueId()}`);
		};
		const changeScope = (newScope) => {
			if (newScope === props.scope) return;
			props.setScope(newScope);
		};
		const changeMapLayer = (layer) => {
			setMapLayer(layer);
			setRenderHash(`geo-${uniqueId()}`);
			setLoadingTiles(true);
			useEffectRef.current.loadingTiles = true;
			logMapLayerEvent(layer);
		};
		const mapScopeLogic = (type) => {
			const selectedLocationByType = type === "pop" ? "selectedLocations" : "selectedRecipientLocations";
			if (props.reduxFilters[selectedLocationByType].size === 1) {
				const onlyObject = props.reduxFilters[selectedLocationByType].first().filter;
				setSingleLocationSelected(onlyObject);
				if (onlyObject.district_current || onlyObject.district_original) {
					changeMapLayer("congressionalDistrict");
					setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
				} else if (onlyObject.county) {
					changeMapLayer("county");
					setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
				} else if (onlyObject.state) setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
				else if (onlyObject.country !== "USA") {
					changeMapLayer("country");
					calculateCenterPoint(onlyObject.country);
				}
			} else if (props.reduxFilters[selectedLocationByType].size > 1) {
				const onlyObject = props.reduxFilters[selectedLocationByType];
				let numStates = 0;
				let numCountries = 0;
				let numCounties = 0;
				let numCDs = 0;
				let international = false;
				for (const entry of onlyObject.entries()) if (entry.length === 2) {
					if (entry[0].length === 3) if (entry[0] === "USA") numCountries++;
					else {
						numCountries++;
						international = true;
					}
					else if (entry[0].length === 6) numStates++;
					else if (entry[0].length === 9 || entry[0].length === 10) {
						if (entry[1].display.entity === "County") numCounties++;
						else if (entry[1].display.entity.includes("congressional district")) numCDs++;
					}
				}
				if (numCountries === onlyObject.size) changeMapLayer("country");
				else if (numStates === onlyObject.size) changeMapLayer("state");
				else if (numCounties === onlyObject.size) changeMapLayer("county");
				else if (numCDs === onlyObject.size) changeMapLayer("congressionalDistrict");
				else if (numCDs + numCounties === onlyObject.size || numStates + numCDs === onlyObject.size || numStates + numCounties === onlyObject.size) changeMapLayer("state");
				else if (international === true) changeMapLayer("country");
			} else if (props.reduxFilters[selectedLocationByType].size === 0 && (props.reduxFilters.recipientDomesticForeign === "foreign" || props.reduxFilters.locationDomesticForeign === "foreign")) changeMapLayer("country");
			else if (props.reduxFilters[selectedLocationByType].size === 0) changeMapLayer("state");
		};
		const updateMapScope = () => {
			if (props.reduxFilters.selectedLocations.size > 0 || props.reduxFilters.locationDomesticForeign === "foreign") mapScopeLogic("pop");
			if (props.reduxFilters.selectedRecipientLocations.size > 0 || props.reduxFilters.recipientDomesticForeign === "foreign") mapScopeLogic("recipient");
			if (props.reduxFilters.selectedLocations.size === 0 && props.reduxFilters.selectedRecipientLocations.size > 0) changeScope("recipient_location");
		};
		const standardColumns = [{
			title: "obligations",
			displayName: ["Obligations"],
			right: true
		}, {
			title: "per_capita",
			displayName: ["Per Capita Obligations"],
			right: true
		}];
		const columns = {
			state: [{
				title: "state_territory",
				displayName: ["State or Territory"],
				right: false
			}, ...standardColumns],
			country: [{
				title: "country",
				displayName: ["Country"],
				right: false
			}, ...standardColumns],
			county: [
				{
					title: "county",
					displayName: ["County"],
					right: false
				},
				{
					title: "state_territory",
					displayName: ["State or Territory"],
					right: false
				},
				...standardColumns
			],
			congressionalDistrict: [
				{
					title: "congressional_district",
					displayName: ["Congressional District"],
					right: false
				},
				{
					title: "state_territory",
					displayName: ["State or Territory"],
					right: false
				},
				...standardColumns
			]
		};
		const createTableRows = (rows) => {
			const rowsArray = [];
			rows.forEach((row) => {
				const rowArray = [];
				Object.keys(row).forEach((key) => {
					if (key === "obligations" || key === "per_capita") rowArray.push(formatMoneyWithPrecision(row[key], 0));
					else rowArray.push(row[key]);
				});
				rowsArray.push(rowArray);
			});
			setTableRows(rowsArray);
		};
		const sortBy = (field, direction) => {
			const updatedTable = [...tableData];
			if (direction === "asc") updatedTable.sort((a, b) => {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			});
			else if (direction === "desc") updatedTable.sort((a, b) => {
				if (a[field] < b[field]) return 1;
				if (a[field] > b[field]) return -1;
				return 0;
			});
			setSortDirection(direction);
			setActiveField(field);
			createTableRows(updatedTable);
		};
		useEffect(() => {
			const doneListener = singleton.on("mapMeasureDone", receivedEntities);
			mapListeners.push(doneListener);
			const measureListener = singleton.on("mapReady", mapLoaded);
			mapListeners.push(measureListener);
			const movedListener = singleton.on("mapMoved", prepareFetch);
			mapListeners.push(movedListener);
			updateMapScope();
			logMapScopeEvent(props.scope);
			logMapLayerEvent(mapLayer);
			return () => {
				mapListeners.forEach((listenerRef) => {
					singleton.off(listenerRef.event, listenerRef.id);
				});
			};
		}, []);
		useEffect(() => {
			if (!props.noApplied && mapViewType === "chart") {
				prepareFetch(true);
				updateMapScope();
			} else if (!props.noApplied && mapViewType === "table") fetchData();
		}, [
			props.reduxFilters,
			mapViewType,
			props.wrapperProps.selectedDropdownOption,
			props.spendingLevel
		]);
		useEffect(() => {
			handleMapLegendToggleChange();
		}, [props.mapLegendToggle]);
		useEffect(() => {
			if (useEffectRef.current.visibleEntities) fetchData();
		}, [visibleEntities]);
		useEffect(() => {
			if (useEffectRef.current.rawAPIData) setParsedData();
		}, [rawAPIData]);
		useEffect(() => {
			prepareFetch(true);
			logMapScopeEvent(props.scope);
		}, [props.scope]);
		useEffect(() => {
			prepareFetch(true);
		}, [mapLayer, loadingTiles]);
		useEffect(() => {
			sortBy("obligations", "desc");
		}, [tableData]);
		useEffect(() => {
			if (mapViewType === "chart") setWrapperScreens({
				wrapperLoading: false,
				wrapperError: false,
				wrapperNoData: false
			});
			else if (mapViewType === "table") setWrapperScreens({
				wrapperLoading: true,
				wrapperError: true,
				wrapperNoData: true
			});
		}, [mapViewType]);
		return /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)(SearchSectionWrapper, {
			...props.wrapperProps,
			isLoading: wrapperScreens.wrapperLoading ? loading : false,
			isError: wrapperScreens.wrapperError ? error : false,
			hasNoData: wrapperScreens.wrapperNoData ? noData : false,
			rows: tableRows,
			columns: columns[mapLayer],
			sectionName: "map",
			sortBy,
			sortDirection,
			setSortDirection,
			activeField,
			mapViewType,
			setMapViewType,
			hash: props.hash,
			setActiveField,
			manualSort: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)(GeoVisualizationSection, {
				scope: props.scope,
				mapLayer,
				changeScope,
				changeMapLayer,
				renderHash,
				data,
				center,
				noResults: data.values.length === 0,
				mapLegendToggle: props.mapLegendToggle,
				updateMapLegendToggle: props.updateMapLegendToggle,
				spendingLevel: props.spendingLevel,
				className: props.className,
				isDefCodeInFilter: props.reduxFilters?.defCodes?.counts,
				singleLocationSelected,
				newAdvancedSearch: true
			})
		});
	});
	MapWrapperContainer.propTypes = propTypes$36;
	MapWrapperContainer_default = connect_default((state) => ({
		reduxFilters: state.appliedFilters.filters,
		noApplied: state.appliedFilters._empty,
		mapLegendToggle: state.searchMapLegendToggle,
		spendingLevel: state.searchView.spendingLevel
	}), (dispatch) => ({ ...bindActionCreators(Object.assign({}, searchFilterActions_exports, { setAppliedFilterCompletion }, { updateMapLegendToggle }), dispatch) }))(MapWrapperContainer);
}));
//#endregion
//#region src/js/components/search/resultsView/map/MapDsm.jsx
var import_jsx_runtime$60, MapDsm;
var init_MapDsm = __esmMin((() => {
	init_es();
	init_aboutTheDataSidebarHelper();
	init_GlossaryLink();
	init_AboutTheDataLink();
	import_jsx_runtime$60 = require_jsx_runtime();
	MapDsm = ({ spendingLevel }) => {
		const isDefCodeInFilter = useSelector((state) => state.appliedFilters.filters)?.defCodes?.counts;
		return /* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)(import_jsx_runtime$60.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("h4", { children: "What's included in this view of the data?" }),
			/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("p", {
				style: { marginBottom: "8px" },
				children: "Use the map to break down spending by state, county, or congressional district."
			}),
			spendingLevel === "subawards" ? /* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)(import_jsx_runtime$60.Fragment, { children: [
				getAtdDefcText(isDefCodeInFilter?.length > 0, true),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"The data represent",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " sub-awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "sub-award" }),
						" ",
						"that meet the selected filter criteria. The results do not reflect sub-awards whose",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " prime awards "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "prime-award" }),
						" ",
						"meet the selected filter criteria. For example, if you filter by Place of Performance in your county, you will see only sub-awards with Place of Performance in your county, but you will not see all sub-awards whose prime award lists Place of Performance in your county."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("span", {
							className: "award-search__subaward-note",
							children: ["Note that there are several documented issues related to\xA0", /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(AboutTheDataLink, {
								slug: "subaward-data-quality",
								children: "subaward data quality"
							})]
						}),
						" ",
						"in our About the Data module."
					]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)(import_jsx_runtime$60.Fragment, { children: [
				getAtdDefcText(isDefCodeInFilter?.length > 0, true),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("p", {
					className: "award-search__body-text",
					children: [
						"The data in the map represent",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " federal action "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "federal-action-obligation" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " obligation "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "obligation" }),
						" ",
						"amounts for non-loan prime award summaries within the selected filters. Loan awards use the",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " subsidy cost "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "loan-subsidy-cost" }),
						" ",
						"rather than the obligated amount to sum up the",
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
							className: "award-search__glossary-term",
							children: " value of the loan "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(GlossaryLink, { term: "face-value-of-loan" }),
						".",
						" ",
						"Prime award transactions with the same unique award ID are grouped under a single prime award summary."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("h4", { children: "Geographical Amount Types" }),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("p", {
					className: "award-search__body-text",
					children: "There are two different ways to display spending amounts on the map: Total Spending and Per Capita Spending."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("h4", { children: "Total Spending" }),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("p", {
					className: "award-search__body-text",
					children: "Total Spending shows the full amount of dollars spent in each geographical unit (state/territory/county/country/congressional district)."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("h4", { children: "Per Capita Spending" }),
				/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("p", {
					className: "award-search__body-text",
					children: "Per Capita Spending shows the total amount spent in each geographical unit (state/territory/county/congressional district) divided by the population of that unit. This number makes it easier to compare numbers across geographic units, since spending usually scales by the population of a region."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("p", {
				style: { marginTop: "8px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("span", {
						className: "award-search__glossary-term",
						children: "NOTE: "
					}),
					"Data reported by the Department of Health and Human Services (HHS) related to Medicare payments does not reflect the place where \"the majority of the work\" occurs, as required by USAspending's data model specifications. \xA0",
					/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(AboutTheDataLink, {
						slug: "medicare-location-data",
						children: "Learn about Medicare Location Data."
					})
				]
			})
		] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/map/MapSection.jsx
/**
* MapSection.jsx
* Created by Andrea Blackwell 04/14/2024
**/
var import_jsx_runtime$59, propTypes$35, MapSection;
var init_MapSection = __esmMin((() => {
	init_Analytics();
	init_MapWrapperContainer();
	init_MapDsm();
	init_PlaceholderComponent();
	import_jsx_runtime$59 = require_jsx_runtime();
	propTypes$35 = {
		spendingLevel: PropTypes.string,
		mapHasLoaded: PropTypes.bool,
		hash: PropTypes.string
	};
	MapSection = ({ spendingLevel, mapHasLoaded, hash }) => {
		const [selectedDropdown, setSelectedDropdown] = useState("place_of_performance");
		const onClick = (e) => {
			setSelectedDropdown(e);
			Analytics.event({
				category: "Section Map",
				action: `View ${e}`,
				label: hash
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)("div", {
			id: "search-page-component",
			className: "map",
			children: mapHasLoaded ? /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(MapWrapperContainer_default, {
				scope: selectedDropdown,
				setScope: setSelectedDropdown,
				wrapperProps: {
					sectionTitle: "Results by Geography",
					dropdownOptions: [{
						name: "Place of Performance",
						value: "place_of_performance",
						onClick,
						dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(MapDsm, { spendingLevel })
					}, {
						name: "Recipient Location",
						value: "recipient_location",
						onClick,
						dsmContent: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(MapDsm, { spendingLevel })
					}],
					selectedDropdownOption: selectedDropdown,
					sectionName: "map"
				},
				hash
			}) : /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(PlaceholderComponent, { classname: "map" })
		});
	};
	MapSection.propTypes = propTypes$35;
}));
//#endregion
//#region src/js/components/search/resultsView/SectionsContent.jsx
/**
* SectionsContent.jsx
* Created by Brian Petway
**/
var import_jsx_runtime$58, logVisualizationViewEvent, propTypes$34, SectionsContent;
var init_SectionsContent = __esmMin((() => {
	init_Analytics();
	init_TableSection();
	init_CategoriesSection();
	init_TimeSection();
	init_MapSection();
	import_jsx_runtime$58 = require_jsx_runtime();
	require_searchPage();
	logVisualizationViewEvent = (action, label) => window.setTimeout(() => Analytics.event({
		event: "search_visualization_type",
		category: "Advanced Search - Visualization Type",
		action,
		gtm: true,
		label
	}), 15 * 1e3);
	propTypes$34 = {
		tabData: PropTypes.object,
		hash: PropTypes.string,
		spendingLevel: PropTypes.string
	};
	SectionsContent = ({ tabData, hash, spendingLevel }) => {
		const [observerSupported, setObserverSupported] = useState(false);
		const [timeHasLoaded, setTimeHasLoaded] = useState(false);
		const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
		const [mapHasLoaded, setMapHasLoaded] = useState(false);
		const [selectedDropdown, setSelectedDropdown] = useState("awarding_agency");
		const observerOptions = { threshold: .1 };
		const callbackFunction = (entries) => {
			entries.forEach((entry) => {
				const section = entry.target.className;
				if (entry.isIntersecting) {
					if (section === "awards") logVisualizationViewEvent("awards", hash);
					else if (section === "time") {
						setTimeHasLoaded(true);
						logVisualizationViewEvent("time", hash);
					} else if (section === "categories") {
						setCategoriesHasLoaded(true);
						logVisualizationViewEvent("categories", hash);
					} else if (section === "map") {
						setMapHasLoaded(true);
						logVisualizationViewEvent("map", hash);
					}
				}
			});
		};
		useEffect(() => {
			setObserverSupported("IntersectionObserver" in window);
		}, []);
		useEffect(() => {
			if (observerSupported) {
				const targets = document.querySelectorAll("#search-page-component");
				const observer = new IntersectionObserver(callbackFunction, observerOptions);
				targets.forEach((i) => {
					if (i.className) observer.observe(i);
				});
				return () => observer.disconnect();
			}
		}, [observerSupported, hash]);
		return /* @__PURE__ */ (0, import_jsx_runtime$58.jsxs)(import_jsx_runtime$58.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$58.jsx)(TableSection, {
				tabData,
				hash,
				spendingLevel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$58.jsx)(CategoriesSection, {
				spendingLevel,
				categoriesHasLoaded,
				setSelectedDropdown,
				selectedDropdown,
				hash
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$58.jsx)(TimeSection, {
				timeHasLoaded,
				hash,
				spendingLevel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$58.jsx)(MapSection, {
				spendingLevel,
				mapHasLoaded,
				hash
			})
		] });
	};
	SectionsContent.propTypes = propTypes$34;
}));
//#endregion
//#region src/js/components/naturalLanguage/NLSearchSuggestionsIcon.jsx
var import_jsx_runtime$57, propTypes$33, NLSearchSuggestionsIcon;
var init_NLSearchSuggestionsIcon = __esmMin((() => {
	init_dist();
	import_jsx_runtime$57 = require_jsx_runtime();
	propTypes$33 = {
		variant: PropTypes.string,
		label: PropTypes.string,
		icon: PropTypes.string
	};
	NLSearchSuggestionsIcon = ({ variant, label, icon }) => /* @__PURE__ */ (0, import_jsx_runtime$57.jsxs)("div", {
		className: `icon-row icon-row--${variant}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("div", {
			className: `icon-container icon-container--${variant}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(FontAwesomeIcon, {
				className: `icon icon--${variant}`,
				icon
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("span", {
			className: `icon-label icon-label--${variant}`,
			children: label
		})]
	});
	NLSearchSuggestionsIcon.propTypes = propTypes$33;
}));
//#endregion
//#region src/js/components/naturalLanguage/NLData.jsx
var import_jsx_runtime$56, overline, filterByHeader, id, searchCardData, moreResourcesBtnData;
var init_NLData = __esmMin((() => {
	init_NLSearchSuggestionsIcon();
	init_Analytics();
	init_slideoutHelper();
	import_jsx_runtime$56 = require_jsx_runtime();
	overline = "IF YOU WANT TO KNOW:";
	filterByHeader = "FILTER BY:";
	id = crypto.randomUUID();
	searchCardData = [
		{
			id: id + 1,
			overline,
			headline: /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)(import_jsx_runtime$56.Fragment, { children: [
				"How much federal funding did ",
				/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("strong", { children: "my state" }),
				" receive last year?"
			] }),
			filterByHeader,
			icons: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "time-period",
				label: "Time Period",
				labelVariant: "search-suggestions",
				icon: "calendar"
			}, `time-period-${id}`), /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "location",
				label: "Location",
				labelVariant: "search-suggestions",
				icon: "location-dot"
			}, `location-${id}`)]
		},
		{
			id: id + 2,
			overline,
			headline: /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)(import_jsx_runtime$56.Fragment, { children: [
				"How much federal funding are ",
				/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("strong", { children: "national defense corporations" }),
				" receiving?"
			] }),
			filterByHeader,
			icons: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "keyword",
				label: "Keyword",
				labelVariant: "search-suggestions",
				icon: "search"
			}, `keyword-${id}`), /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "recipient",
				label: "Recipient",
				labelVariant: "search-suggestions",
				icon: "user"
			}, `recipient-${id}`)]
		},
		{
			id: id + 3,
			overline,
			headline: /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)(import_jsx_runtime$56.Fragment, { children: [
				"What federal ",
				/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("strong", { children: "grants" }),
				" have been awarded for ",
				/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("strong", { children: "health care" }),
				"?"
			] }),
			filterByHeader,
			icons: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "award-type",
				label: "Award Type",
				labelVariant: "search-suggestions",
				icon: "file-certificate"
			}, `award-type-${id}`), /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "award-description",
				label: "Award Description",
				labelVariant: "search-suggestions",
				icon: "building"
			}, `award-description-${id}`)]
		}
	];
	moreResourcesBtnData = [
		{
			id: id + 1,
			action: () => {
				Analytics.event({
					event: "natural-language_glossary",
					category: "Natural Language More Resources",
					action: "Link",
					label: "glossary button"
				});
				showSlideout("glossary", { clear: true });
			},
			image: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "glossary",
				label: "Glossary",
				icon: "book"
			})
		},
		{
			id: id + 2,
			action: () => {
				Analytics.event({
					event: "natural-language_about-the-data",
					category: "Natural Language More Resources",
					action: "Link",
					label: "about the data button"
				});
				showSlideout("atd");
			},
			image: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "about-the-data",
				label: "About the Data",
				icon: "database"
			})
		},
		{
			id: id + 3,
			action: (navigate) => {
				Analytics.event({
					event: "natural-language_data-dictionary",
					category: "Natural Language More Resources",
					action: "Link",
					label: "data dictionary button"
				});
				closeAllSlideouts();
				navigate("/data-dictionary");
			},
			image: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "data-dictionary",
				label: "Data Dictionary",
				icon: "book-open"
			})
		},
		{
			id: id + 4,
			action: (navigate) => {
				Analytics.event({
					event: "natural-language_fed-spending-guide",
					category: "Natural Language More Resources",
					action: "Link",
					label: "federal spending guide button"
				});
				closeAllSlideouts();
				navigate("/federal-spending-guide");
			},
			image: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(NLSearchSuggestionsIcon, {
				variant: "federal-spending-guide",
				label: "Federal Spending Guide",
				icon: "money-check-dollar"
			})
		}
	];
}));
//#endregion
//#region src/js/components/naturalLanguage/NLMoreResources.jsx
var import_jsx_runtime$55, NLMoreResources;
var init_NLMoreResources = __esmMin((() => {
	init_development();
	init_index_es();
	init_NLData();
	import_jsx_runtime$55 = require_jsx_runtime();
	NLMoreResources = () => {
		const navigate = useNavigate();
		return /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("section", {
			className: "more-resources__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)(Qs, {
				className: "more-resources__row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsx)($s, {
					className: "more-resources__label",
					children: "MORE RESOURCES:"
				}), moreResourcesBtnData.map((btn) => /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)($s, {
					className: "more-resources__col",
					onClick: () => btn.action(navigate),
					mobile: 12,
					tablet: 6,
					desktop: 4,
					children: /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(sc, {
						copy: "",
						buttonTitle: "",
						buttonSize: "md",
						buttonType: "text",
						backgroundColor: "light",
						textAlignment: "left",
						imageAlignment: "right",
						image: btn.image
					})
				}, `more-resources-${btn.id}`))]
			})
		});
	};
}));
//#endregion
//#region src/js/components/naturalLanguage/NLSearchSuggestions.jsx
var import_jsx_runtime$54, NLSearchSuggestions;
var init_NLSearchSuggestions = __esmMin((() => {
	init_development();
	init_dist();
	init_index_es();
	init_Analytics();
	init_NLData();
	init_NLMoreResources();
	import_jsx_runtime$54 = require_jsx_runtime();
	NLSearchSuggestions = () => {
		const navigate = useNavigate();
		const handleWatchVideosClick = () => {
			Analytics.event({
				event: "watch-training-videos",
				category: "Natural Language Search Page",
				action: "Link",
				label: "search suggestions"
			});
			navigate("/training-videos");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)(import_jsx_runtime$54.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("section", {
			className: "search-suggestions__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)(Qs, {
				className: "search-suggestions__row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
						className: "search-suggestions__title",
						children: "Learn how to build your USAspending search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
						className: "search-suggestions__link",
						children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(sc, {
							copy: "Watch training videos",
							onClick: handleWatchVideosClick,
							buttonTitle: "Watch training videos",
							buttonSize: "md",
							buttonType: "text",
							backgroundColor: "light",
							textAlignment: "left",
							imageAlignment: "right",
							image: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
								className: "button-icon-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(FontAwesomeIcon, {
									className: "button-icon",
									icon: "arrow-up-right"
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Qs, {
						className: "search-suggestions__card-row",
						children: searchCardData.map((card) => /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)($s, {
							className: "search-suggestions__card",
							mobile: 12,
							tablet: 12,
							desktop: 4,
							children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(tc, {
								variant: "outline",
								size: "md",
								children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(rc, {
									customClassName: "search-suggestions__card-body",
									overline: card.overline,
									headline: card.headline,
									text: card.filterByHeader,
									children: card.icons.map((icon) => icon)
								})
							})
						}, `search-suggestions-card-${card.id}`))
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(NLMoreResources, {})] });
	};
}));
//#endregion
//#region src/js/components/search/resultsView/ResultsView.jsx
/**
* ResultsView.jsx
* Created by Andrea Blackwell
**/
var import_jsx_runtime$53, propTypes$32, ResultsView;
var init_ResultsView = __esmMin((() => {
	init_es();
	init_TopFilterBarContainer();
	init_useResultsCount();
	init_NoDataScreen();
	init_SectionsContent();
	init_NLSearchSuggestions();
	import_jsx_runtime$53 = require_jsx_runtime();
	require_searchPage();
	propTypes$32 = {
		showMobileFilters: PropTypes.bool,
		isMobile: PropTypes.bool,
		noFiltersApplied: PropTypes.bool,
		hash: PropTypes.string,
		setFilterCount: PropTypes.func
	};
	ResultsView = React.memo(function ResultsView({ showMobileFilters, isMobile, noFiltersApplied, hash, setFilterCount }) {
		const filters = useSelector((state) => state.appliedFilters.filters);
		const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
		const { data, error } = useResultsCount(filters, spendingLevel, hash);
		let content = null;
		if (!error && data) {
			const { contracts, direct_payments, grants, idvs, loans, other, subgrants, subcontracts } = data.data.results;
			let resCount = contracts + direct_payments + grants + idvs + loans + other;
			if (spendingLevel === "subawards") resCount = subgrants + subcontracts;
			const hasResults = resCount > 0;
			if (!hash && noFiltersApplied) content = /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)(NLSearchSuggestions, {});
			if (!noFiltersApplied) if (hasResults) content = /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)(SectionsContent, {
				tabData: data.data,
				hash,
				spendingLevel
			});
			else content = /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)(NoDataScreen, {});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("div", {
			className: "search-results-view-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$53.jsxs)("div", {
				className: "search-results-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)(TopFilterBarContainer, {
					resultsView: true,
					filters,
					setFilterCount
				}), /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("div", {
					className: `search-results ${showMobileFilters && isMobile ? "behind-filters" : ""}`,
					children: content
				})]
			})
		});
	});
	ResultsView.propTypes = propTypes$32;
}));
//#endregion
//#region src/js/components/search/SearchSidebarSubmit.jsx
/**
* SearchSidebarSubmit.jsx
* Created by Kevin Li 12/19/17
*/
var import_jsx_runtime$52, propTypes$31, SearchSidebarSubmit;
var init_SearchSidebarSubmit = __esmMin((() => {
	init_development();
	init_index_es();
	init_js_cookie();
	init_searchHelper();
	init_Analytics();
	import_jsx_runtime$52 = require_jsx_runtime();
	propTypes$31 = {
		stagedFiltersAreEmpty: PropTypes.bool,
		requestsComplete: PropTypes.bool,
		filtersChanged: PropTypes.bool,
		applyStagedFilters: PropTypes.func,
		resetFilters: PropTypes.func,
		setShowMobileFilters: PropTypes.func
	};
	SearchSidebarSubmit = ({ stagedFiltersAreEmpty, requestsComplete, filtersChanged, setShowMobileFilters, applyStagedFilters, resetFilters }) => {
		let disabled = false;
		let title = "Click to submit your search.";
		const { hash: urlHash } = getObjFromQueryParams(useLocation().search);
		if (stagedFiltersAreEmpty || !filtersChanged) {
			title = "Add or update a filter to submit.";
			disabled = true;
		} else if (!requestsComplete) {
			title = "Add or update a filter to submit.";
			disabled = true;
		}
		const fireSearchEvent = () => {
			if (!urlHash) {
				const now = (/* @__PURE__ */ new Date()).getTime();
				if (api.get("advanced_search_to_query_time") && !api.get("has_logged_query_timer")) {
					const timer = now - api.get("advanced_search_to_query_time");
					const timerInSeconds = Math.floor(timer / 1e3);
					if (timerInSeconds < 3600) Analytics.event({
						category: "Advanced Search - Time to First Query",
						action: "query_submit",
						label: `${timerInSeconds} seconds`,
						time_to_query: timerInSeconds
					});
					api.remove("advanced_search_to_query_time");
				}
				if (api.get("homepage_to_query_time") && !api.get("has_logged_query_timer")) {
					const timerHomePage = now - api.get("homepage_to_query_time");
					const timerHomePageInSeconds = Math.floor(timerHomePage / 1e3);
					if (timerHomePageInSeconds < 3600) Analytics.event({
						category: "Homepage - Time to First Query",
						action: "homepage_query_submit",
						label: `${timerHomePageInSeconds} seconds`,
						time_to_query: timerHomePageInSeconds
					});
					api.remove("homepage_to_query_time");
				}
			}
			api.set("has_logged_query_timer", true, { expires: 14 });
		};
		useEffect(() => {
			api.set("advanced_search_to_query_time", (/* @__PURE__ */ new Date()).getTime(), { expires: 14 });
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$52.jsxs)("div", {
			className: "sidebar-submit",
			role: "region",
			"aria-label": "Submit",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)(sc, {
				additionalClassnames: "submit-button",
				copy: "Submit",
				buttonTitle: title,
				buttonSize: "md",
				buttonType: "primary",
				backgroundColor: "light",
				disabled,
				onClick: () => {
					if (setShowMobileFilters) setShowMobileFilters();
					fireSearchEvent();
					applyStagedFilters();
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime$52.jsx)(sc, {
				additionalClassnames: "reset-button",
				copy: "Reset filters",
				buttonTitle: "Reset filters",
				buttonSize: "md",
				buttonType: "text",
				backgroundColor: "light",
				disabled: !requestsComplete,
				onClick: resetFilters
			})]
		});
	};
	SearchSidebarSubmit.propTypes = propTypes$31;
}));
//#endregion
//#region src/js/containers/search/SearchSidebarSubmitContainer.jsx
/**
* SearchSidebarSubmitContainer.jsx
* Created by Kevin Li 12/21/17
*/
var import_jsx_runtime$51, propTypes$30, SearchSidebarSubmitContainer;
var init_SearchSidebarSubmitContainer = __esmMin((() => {
	init_es();
	init_searchHelper();
	init_SearchSidebarSubmit();
	init_searchFiltersReducer();
	init_searchFilterActions();
	init_mapLegendToggleActions();
	init_appliedFilterActions();
	init_usePrevious();
	init_searchAnalytics();
	import_jsx_runtime$51 = require_jsx_runtime();
	propTypes$30 = { setShowMobileFilters: PropTypes.func };
	SearchSidebarSubmitContainer = ({ setShowMobileFilters }) => {
		const { _complete: requestsComplete, filters: appliedFilters } = useSelector((state) => state.appliedFilters);
		const stagedFilters = useSelector((state) => state.filters);
		const dispatch = useDispatch();
		const filtersChanged = !areFiltersEqual(stagedFilters, appliedFilters);
		const areStagedFiltersEmpty = areFiltersEqual(stagedFilters, initialState) || areFiltersEqual(stagedFilters, initialStateDR);
		const resetFilters = useCallback(() => {
			dispatch(clearAllFilters());
			dispatch(resetAppliedFilters());
			dispatch(resetMapLegendToggle());
		}, [dispatch]);
		return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(SearchSidebarSubmit, {
			stagedFiltersAreEmpty: areStagedFiltersEmpty,
			filtersChanged,
			requestsComplete,
			applyStagedFilters: useCallback(() => {
				dispatch(setAppliedFilterCompletion(false));
				if (areFiltersEqual(stagedFilters)) resetFilters();
				else {
					dispatch(applyStagedFilters(stagedFilters));
					dispatch(setAppliedFilterCompletion(true));
				}
				const events = convertFiltersToAnalyticEvents(stagedFilters);
				sendAnalyticEvents(events);
				sendFieldCombinations(events);
			}, [
				dispatch,
				resetFilters,
				stagedFilters
			]),
			resetFilters,
			setShowMobileFilters
		});
	};
	SearchSidebarSubmitContainer.propTypes = propTypes$30;
}));
//#endregion
//#region src/js/components/search/filters/awardType/AwardType.jsx
var import_jsx_runtime$50, AwardType;
var init_AwardType = __esmMin((() => {
	init_es();
	init_awardType();
	init_AccordionCheckbox();
	init_searchFilterActions();
	import_jsx_runtime$50 = require_jsx_runtime();
	AwardType = () => {
		const awardType = useSelector((state) => state.filters.awardType);
		const dispatch = useDispatch();
		const singleFilterChange = (selection) => {
			dispatch(toggleAwardType(selection));
		};
		const bulkFilterChange = (selection) => {
			dispatch(bulkAwardTypeChange(selection));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("div", {
			className: "award-type-filter search-filter checkbox-type-filter",
			children: /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(AccordionCheckbox, {
				filterCategoryMapping: awardTypesData$1,
				filters: awardTypeCodes,
				selectedFilters: awardType,
				singleFilterChange,
				bulkFilterChange
			})
		});
	};
})), recipientTypeMapping, generateCount, excludeIDVBandNewFCodes, getFilterCount, autocompletePlaceholder;
var init_filterCheckboxHelper = __esmMin((() => {
	init_recipientType();
	init_awardType();
	awardTypeGroups.contracts, awardTypeGroups.idvs, awardTypeGroups.grants, awardTypeGroups.direct_payments, awardTypeGroups.loans, awardTypeGroups.other;
	recipientTypeMapping = [
		{
			id: "recipient-business",
			name: "General Business",
			filters: recipientTypeGroups.category_business
		},
		{
			id: "recipient-minority-owned-business",
			name: "Minority Owned Business",
			filters: recipientTypeGroups.category_minority_owned_business
		},
		{
			id: "recipient-women-owned-business",
			name: "Women Owned Business",
			filters: recipientTypeGroups.category_woman_owned_business
		},
		{
			id: "recipient-veteran-owned-business",
			name: "Veteran Owned Business",
			filters: recipientTypeGroups.category_veteran_owned_business
		},
		{
			id: "recipient-special-designations",
			name: "Special Designations",
			filters: recipientTypeGroups.category_special_designations
		},
		{
			id: "recipient-nonprofit",
			name: "Nonprofit",
			filters: recipientTypeGroups.category_nonprofit
		},
		{
			id: "recipient-higher-education",
			name: "Higher Education",
			filters: recipientTypeGroups.category_higher_education
		},
		{
			id: "recipient-government",
			name: "Government",
			filters: recipientTypeGroups.category_government
		},
		{
			id: "recipient-individuals",
			name: "Individuals",
			filters: recipientTypeGroups.category_individuals
		}
	];
	generateCount = (data) => {
		let count = 0;
		data.get("counts").forEach((item) => {
			count += item.count;
		});
		return count;
	};
	excludeIDVBandNewFCodes = (awardTypes) => {
		let count = awardTypes.size;
		const newFCodeCount = Object.keys(awardTypeNewFCodes).filter((key) => awardTypes.has(key)).length;
		if (awardTypes.has("IDV_B")) count -= 1;
		if (newFCodeCount) count -= newFCodeCount;
		return count;
	};
	getFilterCount = (filters) => ({
		Location: filters.selectedLocations.size + (filters.locationDomesticForeign === "foreign" ? 1 : 0) + filters.selectedRecipientLocations.size + (filters.recipientDomesticForeign === "foreign" ? 1 : 0),
		"Time Period": filters.timePeriodType === "dr" ? filters.time_period.size : filters.timePeriodFY.size,
		"Award Description": filters.awardDescription ? 1 : 0,
		"Award ID": filters.selectedAwardIDs.size,
		"Spending Amount": filters.awardAmounts.size,
		"Award Type": excludeIDVBandNewFCodes(filters.awardType),
		"North American Industry Classification System (NAICS)": generateCount(filters.naicsCodes),
		"Product and Service Code (PSC)": generateCount(filters.pscCodes),
		"Type of Contract Pricing": filters.pricingType.size,
		"Type of Set Aside": filters.setAside.size,
		"Extent Competed": filters.extentCompeted.size,
		"Assistance Listing": filters.selectedCFDA.size,
		Recipient: filters.selectedRecipients.size,
		"Recipient Type": filters.recipientType.size,
		Agency: filters.selectedAwardingAgencies.size + filters.selectedFundingAgencies.size,
		"Treasury Account Symbol (TAS)": generateCount(filters.tasCodes),
		"Disaster Emergency Fund Code (DEFC)": filters.defCode.size
	});
	autocompletePlaceholder = "Type at least 3 letters...";
}));
//#endregion
//#region src/js/containers/search/filters/AgencyListContainer.jsx
/**
* AgencyListContainer.jsx
* Created by Emily Gullo 12/23/2016
**/
var import_commonjs, import_jsx_runtime$49, propTypes$29, AgencyListContainer;
var init_AgencyListContainer = __esmMin((() => {
	init_axios();
	import_commonjs = require_commonjs();
	init_Autocomplete();
	init_filterCheckboxHelper();
	import_jsx_runtime$49 = require_jsx_runtime();
	propTypes$29 = {
		toggleAgency: PropTypes.func,
		selectedAgencies: PropTypes.object,
		agencyType: PropTypes.string,
		fetchAgencies: PropTypes.func
	};
	AgencyListContainer = ({ toggleAgency, selectedAgencies, agencyType, fetchAgencies }) => {
		const [autocompleteAgencies, setAutocompleteAgencies] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const request = useRef(null);
		let agencySearchString;
		let timeout = null;
		const parseAutocompleteAgencies = (results) => {
			let agencies = [];
			let localNoResults = false;
			if (results) {
				results.forEach((item) => {
					let subAbbreviation = "";
					let topAbbreviation = "";
					if (item.subtier_agency.abbreviation) subAbbreviation = `(${item.subtier_agency.abbreviation})`;
					if (item.toptier_agency.abbreviation) topAbbreviation = `(${item.toptier_agency.abbreviation})`;
					if (item.toptier_flag) {
						if (selectedAgencies.size === 0 || !selectedAgencies.has(`${item.id}_toptier`)) agencies.push({
							title: `${item.subtier_agency.name} ${topAbbreviation}`,
							data: Object.assign({}, item, { agencyType: "toptier" })
						});
					} else if (selectedAgencies.size === 0 || !selectedAgencies.has(`${item.id}_subtier`)) agencies.push({
						title: `${item.subtier_agency.name} ${subAbbreviation}`,
						subtitle: `Sub-Agency of ${item.toptier_agency.name} ${topAbbreviation}`,
						data: Object.assign({}, item, { agencyType: "subtier" })
					});
				});
				if (agencies.length === 0) localNoResults = true;
			}
			if (agencySearchString.toLowerCase() !== "fem" && agencySearchString.toLowerCase() !== "fema") {
				let toptierAgencies = filter(agencies, ["data.agencyType", "toptier"]);
				let subtierAgencies = filter(agencies, ["data.agencyType", "subtier"]);
				toptierAgencies = sortBy(toptierAgencies, "title");
				subtierAgencies = sortBy(subtierAgencies, "title");
				agencies = slice(concat(toptierAgencies, subtierAgencies), 0, 10);
			}
			setNoResults(localNoResults);
			setAutocompleteAgencies(agencies);
		};
		const performSecondarySearch = (data) => {
			if (agencySearchString.toLowerCase() === "fem" || agencySearchString.toLowerCase() === "fema") parseAutocompleteAgencies(slice(data, 0, 10));
			else {
				const search = new import_commonjs.Search("id");
				search.addIndex(["toptier_agency", "name"]);
				search.addIndex(["subtier_agency", "name"]);
				search.addIndex(["toptier_agency", "abbreviation"]);
				search.addIndex(["subtier_agency", "abbreviation"]);
				search.addDocuments(data);
				const results = search.search(agencySearchString);
				const toptier = [];
				const subtier = [];
				results.forEach((item) => {
					if (item.toptier_flag) toptier.push(item);
					else subtier.push(item);
				});
				const improvedResults = slice(concat(toptier, subtier), 0, 10);
				parseAutocompleteAgencies(improvedResults);
			}
		};
		const queryAutocompleteAgencies = (input) => {
			setNoResults(false);
			if (input.length >= 3) {
				agencySearchString = input;
				if (request.current) request.current.cancel();
				request.current = fetchAgencies({
					search_text: input,
					limit: 20
				});
				request.current.promise.then((res) => {
					performSecondarySearch(res.data.results);
				}).catch((err) => {
					if (!isCancel(err)) setNoResults(true);
				});
			} else if (request.current) request.current.cancel();
		};
		const clearAutocompleteSuggestions = () => {
			setAutocompleteAgencies([]);
		};
		const handleTextInput = (agencyInput) => {
			if (autocompleteAgencies.length > 0) setAutocompleteAgencies([]);
			const input = agencyInput.target.value;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => {
				queryAutocompleteAgencies(input);
			}, 300);
		};
		const onSelect = (agency, valid) => {
			toggleAgency(agency, valid);
			setAutocompleteAgencies([]);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(Autocomplete, {
			values: autocompleteAgencies,
			handleTextInput,
			onSelect,
			placeholder: autocompletePlaceholder,
			label: `${agencyType} Agency`,
			clearAutocompleteSuggestions,
			noResults
		});
	};
	AgencyListContainer.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/search/filters/agency/SelectedAgencies.jsx
var import_jsx_runtime$48, propTypes$28, SelectedAgencies;
var init_SelectedAgencies = __esmMin((() => {
	init_ShownValue();
	import_jsx_runtime$48 = require_jsx_runtime();
	propTypes$28 = {
		selectedAgencies: PropTypes.object,
		toggleAgency: PropTypes.func,
		agencyType: PropTypes.string
	};
	SelectedAgencies = ({ selectedAgencies, toggleAgency, agencyType }) => {
		const shownAgencies = [];
		selectedAgencies.entrySeq().forEach((entry) => {
			const key = entry[0];
			const agency = entry[1];
			let label = agency.subtier_agency?.name;
			if (agency.agencyType !== "" && agency.agencyType !== null) {
				if (agency.agencyType === "subtier" && agency.subtier_agency?.abbreviation) label += ` (${agency.subtier_agency.abbreviation})`;
				else if (agency.agencyType === "toptier" && agency.toptier_agency?.abbreviation) label += ` (${agency.toptier_agency.abbreviation})`;
				if (agency.agencyType === "subtier" && agency.toptier_flag === false) label += ` | Sub-Agency of ${agency.toptier_agency.abbreviation || agency.toptier_agency.name}`;
			}
			const removeValue = () => {
				toggleAgency(agency, true, agencyType);
			};
			const value = /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)(ShownValue, {
				label,
				removeValue
			}, key);
			shownAgencies.push(value);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("div", {
			className: `selected-filters ${toLower(agencyType)}`,
			role: "status",
			children: shownAgencies
		});
	};
	SelectedAgencies.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/components/search/filters/agency/Agency.jsx
var import_jsx_runtime$47, Agency;
var init_Agency = __esmMin((() => {
	init_es();
	init_AgencyListContainer();
	init_searchHelper();
	init_searchFilterActions();
	init_SelectedAgencies();
	import_jsx_runtime$47 = require_jsx_runtime();
	Agency = () => {
		const { selectedAwardingAgencies, selectedFundingAgencies } = useSelector((state) => state.filters);
		const dispatch = useDispatch();
		const toggleFundingAgency = (agency, isValid) => {
			if (Object.keys(agency).length !== 0 && isValid) {
				const updateParams = {};
				updateParams.agency = agency;
				dispatch(updateSelectedFundingAgencies(updateParams));
			}
		};
		const toggleAwardingAgency = (agency, isValid) => {
			if (Object.keys(agency).length !== 0 && isValid) {
				const updateParams = {};
				updateParams.agency = agency;
				dispatch(updateSelectedAwardingAgencies(updateParams));
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
			className: "agency-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
				className: "filter-item-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(AgencyListContainer, {
					agencyType: "Awarding",
					fetchAgencies: fetchAwardingAgencies,
					toggleAgency: toggleAwardingAgency,
					selectedAgencies: selectedAwardingAgencies
				}), /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(SelectedAgencies, {
					agencyType: "Awarding",
					selectedAgencies: selectedAwardingAgencies,
					toggleAgency: toggleAwardingAgency
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
				className: "filter-item-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(AgencyListContainer, {
					agencyType: "Funding",
					fetchAgencies: fetchFundingAgencies,
					toggleAgency: toggleFundingAgency,
					selectedAgencies: selectedFundingAgencies
				}), /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(SelectedAgencies, {
					agencyType: "Funding",
					selectedAgencies: selectedFundingAgencies,
					toggleAgency: toggleFundingAgency
				})]
			})]
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/location/ShownLocation.jsx
var import_jsx_runtime$46, propTypes$27, ShownLocation;
var init_ShownLocation = __esmMin((() => {
	init_es();
	init_ShownValue();
	init_searchFilterActions();
	init_searchHelper();
	import_jsx_runtime$46 = require_jsx_runtime();
	propTypes$27 = {
		id: PropTypes.string,
		location: PropTypes.shape({
			display: PropTypes.object,
			filter: PropTypes.object,
			identifier: PropTypes.string
		}),
		activeTab: PropTypes.string
	};
	ShownLocation = ({ id, location, activeTab }) => {
		const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
		const dispatch = useDispatch();
		const label = `${activeTab === "recipient" ? "Recipient Location" : "Place of Performance"}: ${locationChipLabel(location.display.entity, location)}`;
		const removeLocation = () => {
			const newValue = activeTab === "recipient" ? {
				type: "selectedRecipientLocations",
				value: selectedRecipientLocations.delete(id)
			} : {
				type: "selectedLocations",
				value: selectedLocations.delete(id)
			};
			dispatch(updateGenericFilter(newValue));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ShownValue, {
			label,
			removeValue: removeLocation
		});
	};
	ShownLocation.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/components/search/filters/location/SelectedLocations.jsx
var import_jsx_runtime$45, propTypes$26, SelectedLocations;
var init_SelectedLocations = __esmMin((() => {
	init_es();
	init_ShownLocation();
	import_jsx_runtime$45 = require_jsx_runtime();
	propTypes$26 = { activeTab: PropTypes.string };
	SelectedLocations = ({ activeTab }) => {
		const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
		const shownLocations = [];
		const selectedLocationsObj = activeTab === "recipient" ? selectedRecipientLocations : selectedLocations;
		if (selectedLocationsObj?.size !== 0) selectedLocationsObj?.entrySeq().forEach((entry) => {
			const key = entry[0];
			const location = entry[1];
			const value = /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(ShownLocation, {
				id: key,
				location,
				activeTab
			}, key);
			shownLocations.push(value);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("div", {
			id: "award-search-selected-locations",
			className: "selected-filters",
			role: "status",
			children: shownLocations
		});
	};
	SelectedLocations.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/search/filters/location/AllForeignLocationsCheckbox.jsx
/**
* AllForeignLocationsCheckbox.jsx
* Created on 11/24/2025 by Josue Aguilar
*/
var import_jsx_runtime$44, propTypes$25, AllForeignLocationsCheckbox;
var init_AllForeignLocationsCheckbox = __esmMin((() => {
	init_useEventListener();
	import_jsx_runtime$44 = require_jsx_runtime();
	propTypes$25 = {
		filter: PropTypes.string,
		isForeign: PropTypes.bool,
		setIsForeign: PropTypes.func,
		disabled: PropTypes.bool
	};
	AllForeignLocationsCheckbox = ({ filter, isForeign, setIsForeign, disabled }) => {
		const labelClass = disabled ? "disabled" : "";
		const inputRef = useRef(null);
		const toggleFilter = (e) => {
			e.stopPropagation();
			if (e.type === "change" || e?.key === "Enter") setIsForeign();
		};
		useEventListener("keydown", toggleFilter, inputRef);
		return /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
			className: "location-checkbox",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("input", {
				type: "checkbox",
				id: "location-checkbox__checkbox",
				value: filter,
				checked: isForeign,
				onChange: toggleFilter,
				ref: inputRef,
				disabled
			}), /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
				className: `location-checkbox__label ${labelClass}`,
				children: "All foreign locations"
			})]
		});
	};
	AllForeignLocationsCheckbox.propTypes = propTypes$25;
}));
//#endregion
//#region src/js/components/search/filters/location/LocationAutocomplete.jsx
var import_jsx_runtime$43, propTypes$24, LocationAutocomplete;
var init_LocationAutocomplete = __esmMin((() => {
	init_index_es();
	init_es();
	init_filterCheckboxHelper();
	init_Autocomplete();
	init_SelectedLocations();
	init_AllForeignLocationsCheckbox();
	import_jsx_runtime$43 = require_jsx_runtime();
	propTypes$24 = {
		activeTab: PropTypes.string,
		locations: PropTypes.arrayOf(PropTypes.object),
		handleTextInput: PropTypes.func,
		selectItem: PropTypes.func,
		clearAutocompleteSuggestions: PropTypes.func,
		noResults: PropTypes.bool,
		readyToStage: PropTypes.bool,
		addLocation: PropTypes.func,
		isLoading: PropTypes.bool,
		setIsForeign: PropTypes.func
	};
	LocationAutocomplete = ({ activeTab, locations, handleTextInput, selectItem, clearAutocompleteSuggestions, noResults, readyToStage, addLocation, isLoading, setIsForeign }) => {
		const { recipientDomesticForeign, locationDomesticForeign, selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
		const isForeign = (activeTab === "recipient" ? recipientDomesticForeign : locationDomesticForeign) === "foreign";
		const locationButtonDisabled = (activeTab === "recipient" ? selectedRecipientLocations.count() : selectedLocations.count()) > 0;
		const onClick = (e) => {
			e.preventDefault();
			addLocation();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$43.jsxs)("div", {
			id: activeTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$43.jsxs)("div", {
					className: `location-autocomplete ${activeTab}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(Autocomplete, {
						values: locations,
						handleTextInput,
						onSelect: selectItem,
						clearAutocompleteSuggestions,
						noResults,
						placeholder: autocompletePlaceholder,
						isLoading,
						retainValue: true,
						disabled: isForeign
					}), /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(sc, {
						additionalClassnames: "submit-button",
						copy: "Add",
						buttonTitle: "Add",
						buttonSize: "sm",
						buttonType: "primary",
						backgroundColor: "light",
						disabled: !readyToStage,
						onClick
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(AllForeignLocationsCheckbox, {
					filter: "location",
					isForeign,
					setIsForeign,
					disabled: locationButtonDisabled
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(SelectedLocations, { activeTab }, `selected-location-${activeTab}`)
			]
		});
	};
	LocationAutocomplete.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/models/v2/search/LocationEntity.js
var formatTitle, LocationEntity;
var init_LocationEntity = __esmMin((() => {
	formatTitle = (category, item) => {
		if (category === "country") return item.country_name;
		else if (category === "county") return `${item.county_name}, ${item.state_name}`;
		else if (category === "city") {
			if (item.state_name) return `${item.city_name}, ${item.state_name}`;
			return `${item.city_name}, ${item.country_name}`;
		} else if (category === "state") return item.state_name;
		else if (category === "zip_code") return item.zip_code;
		else if (category === "current_cd") return item.current_cd;
		else if (category === "original_cd") return item.original_cd;
		return "--";
	};
	LocationEntity = { populate(item) {
		this.category = item.category || "--";
		this.title = formatTitle(this.category, item);
		this.data = {
			county_name: item.county_name || "--",
			country_name: item.country_name || "--",
			state_name: item.state_name || "--",
			city_name: item.city_name || "--",
			zip_code: item.zip_code || "--",
			original_cd: item.original_cd || "--",
			current_cd: item.current_cd || "--",
			state_fips: item.county_fips?.slice(0, 2) || "--",
			county_fips: item.county_fips?.slice(2) || "--",
			city_name_update: item.city_name_update || "--"
		};
	} };
}));
//#endregion
//#region src/js/helpers/search/locationAutocompleteHelper.js
var getKeyByValue, loadCounties, addZip, addCity, addState, addCountry, addDistrict, locationSort, citySort, getParsedLocations, getLocationObject;
var init_locationAutocompleteHelper = __esmMin((() => {
	init_stateNames();
	init_LocationEntity();
	getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);
	loadCounties = (county, state, countryAbbreviation, stateFips, countyFips, createLocationObjectByType) => {
		const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, stateFips)?.toLowerCase();
		createLocationObjectByType({
			identifier: `${countryAbbreviation}_${stateAbbreviation}_${countyFips}`,
			display: {
				title: `${county}, ${state}`,
				entity: "County",
				standalone: county
			},
			filter: {
				country: countryAbbreviation,
				county: countyFips,
				state: stateAbbreviation
			}
		});
	};
	addZip = (zipCode) => ({
		identifier: `USA_${zipCode}`,
		display: {
			title: zipCode,
			entity: "ZIP Code",
			standalone: zipCode
		},
		filter: {
			country: "USA",
			zip: zipCode
		}
	});
	addCity = (city, state, countryAbbreviation) => {
		const fipsCode = fipsIdByStateName[state.toLowerCase()];
		const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
		return {
			identifier: `${countryAbbreviation}_${stateAbbreviation}_${city}`,
			display: {
				title: `${city}, ${state}`,
				entity: "City",
				standalone: city
			},
			filter: {
				country: countryAbbreviation,
				city,
				state: stateAbbreviation
			}
		};
	};
	addState = (state, countryAbbreviation) => {
		const fipsCode = fipsIdByStateName[state.replace(/[^\w\s]|_/g, "")?.toLowerCase()];
		const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
		return {
			identifier: `${countryAbbreviation}_${stateAbbreviation}`,
			display: {
				title: state,
				entity: "State",
				standalone: state
			},
			filter: {
				country: countryAbbreviation,
				state: stateAbbreviation
			}
		};
	};
	addCountry = (country, countryAbbreviation) => {
		return {
			identifier: countryAbbreviation,
			display: {
				title: country,
				entity: "Country/Entity",
				standalone: country
			},
			filter: { country: countryAbbreviation }
		};
	};
	addDistrict = (district, category, type) => {
		const districtArray = district.split("-");
		const stateAbbreviation = districtArray[0];
		const districtNumber = districtArray[1];
		const districtType = category || "district_current";
		return {
			identifier: `USA_${stateAbbreviation}_${districtNumber}`,
			filter: {
				country: "USA",
				state: stateAbbreviation,
				[districtType]: districtNumber
			},
			display: {
				entity: type,
				standalone: district,
				title: district
			}
		};
	};
	locationSort = (array, key) => array.sort((a, b) => a[key].localeCompare(b[key]));
	citySort = (cityArray) => {
		const newCityArray = cityArray.map((city) => {
			if (city.country_name === "UNITED STATES") return {
				...city,
				city_name_update: `${city.city_name}, ${city.state_name}`
			};
			return {
				...city,
				city_name_update: `${city.city_name}, ${city.country_name}`
			};
		});
		return locationSort(newCityArray, "city_name_update");
	};
	getParsedLocations = (countries, states, counties, cities, zipCodes, districtsCurrent, districtsOriginal) => {
		const locationsList = [];
		if (countries) {
			locationSort(countries, "country_name");
			countries.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "country"
				});
				return locationsList.push(locationItem);
			});
		}
		if (states) {
			locationSort(states, "state_name");
			states.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "state"
				});
				return locationsList.push(locationItem);
			});
		}
		if (counties) {
			locationSort(counties, "county_name");
			counties.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "county"
				});
				return locationsList.push(locationItem);
			});
		}
		if (cities) citySort(cities).map((item) => {
			const locationItem = Object.create(LocationEntity);
			locationItem.populate({
				...item,
				category: "city"
			});
			return locationsList.push(locationItem);
		});
		if (zipCodes) {
			locationSort(zipCodes, "zip_code");
			zipCodes.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "zip_code"
				});
				return locationsList.push(locationItem);
			});
		}
		if (districtsCurrent) {
			locationSort(districtsCurrent, "current_cd");
			districtsCurrent.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "current_cd"
				});
				return locationsList.push(locationItem);
			});
		}
		if (districtsOriginal) {
			locationSort(districtsOriginal, "original_cd");
			districtsOriginal.map((item) => {
				const locationItem = Object.create(LocationEntity);
				locationItem.populate({
					...item,
					category: "original_cd"
				});
				return locationsList.push(locationItem);
			});
		}
		return locationsList;
	};
	getLocationObject = (selectedItem, countriesList, createLocationObjectByType) => {
		const item = selectedItem;
		let location = {};
		const countryAbbreviation = item.data.country_name === "UNITED STATES" ? "USA" : countriesList?.find((country) => {
			return country.name === item.data.country_name;
		})?.code;
		if (item.category === "zip_code") location = addZip(item.data.zip_code);
		else if (item.category === "city") location = addCity(item.data.city_name, item.data.state_name, countryAbbreviation);
		else if (item.category === "county") loadCounties(item.data.county_name, item.data.state_name, countryAbbreviation, item.data.state_fips, item.data.county_fips, createLocationObjectByType);
		else if (item.category === "state") location = addState(item.data.state_name, countryAbbreviation);
		else if (item.category === "country") location = addCountry(item.data.country_name, countryAbbreviation);
		else if (item.category === "current_cd") location = addDistrict(item.data.current_cd, "district_current", "Current congressional district");
		else if (item.category === "original_cd") location = addDistrict(item.data.original_cd, "district_original", "Original congressional district");
		if (item.category !== "county") createLocationObjectByType(location);
		return location;
	};
}));
//#endregion
//#region src/js/containers/search/filters/location/LocationAutocompleteContainer.jsx
/**
* LocationAutocompleteContainer.jsx
* Created by Josue Aguilar 8/15/2024
*/
var import_jsx_runtime$42, propTypes$23, LocationAutocompleteContainer;
var init_LocationAutocompleteContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_searchHelper();
	init_LocationAutocomplete();
	init_mapHelper();
	init_searchFilterActions();
	init_locationAutocompleteHelper();
	import_jsx_runtime$42 = require_jsx_runtime();
	propTypes$23 = { activeTab: PropTypes.string };
	LocationAutocompleteContainer = ({ activeTab }) => {
		const [locations, setLocations] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const [selectedItem, setSelectedItem] = useState(null);
		const [readyToStage, setReadyToStage] = useState(false);
		const [countriesList, setCountriesList] = useState([]);
		const { recipientDomesticForeign, locationDomesticForeign } = useSelector((state) => state.filters);
		const [isLoading, setIsLoading] = useState(false);
		const dispatch = useDispatch();
		const listRequest = useRef(null);
		let timeout;
		const createLocationObjectByType = (location) => {
			if (activeTab === "recipient") dispatch(addRecipientLocationObject(location));
			else dispatch(addPOPLocationObject(location));
		};
		const loadCountries = () => {
			if (listRequest.current) {
				listRequest.current.cancel();
				setIsLoading(false);
			}
			listRequest.current = fetchLocationList("countries");
			listRequest.current.promise.then((res) => {
				listRequest.current = null;
				setCountriesList(res?.data?.countries);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					setIsLoading(false);
				}
			});
		};
		useEffect(() => {
			loadCountries();
		}, []);
		const clearAutocompleteSuggestions = useCallback(() => {
			setLocations([]);
			setReadyToStage(false);
			setIsLoading(false);
		}, []);
		const setIsForeign = useCallback(() => {
			clearAutocompleteSuggestions();
			const scope = (activeTab === "recipient" ? recipientDomesticForeign : locationDomesticForeign) === "foreign" ? "all" : "foreign";
			if (activeTab === "recipient") dispatch(updateRecipientDomesticForeignSelection(scope));
			else dispatch(updateDomesticForeignSelection(scope));
		}, [
			clearAutocompleteSuggestions,
			activeTab,
			recipientDomesticForeign,
			locationDomesticForeign,
			dispatch
		]);
		const addLocation = () => {
			getLocationObject(selectedItem, countriesList, createLocationObjectByType);
			clearAutocompleteSuggestions();
		};
		const parseLocations = ({ countries, states, counties, cities, zip_codes: zipCodes, districts_current: districtsCurrent, districts_original: districtsOriginal }, count) => {
			setNoResults(false);
			clearAutocompleteSuggestions();
			if (count === 0) {
				setNoResults(true);
				setIsLoading(false);
				return;
			}
			const locationsList = getParsedLocations(countries, states, counties, cities, zipCodes, districtsCurrent, districtsOriginal);
			if (count > 5) setLocations(locationsList.splice(0, 5));
			else setLocations(locationsList);
		};
		const queryAutocompleteLocations = (input) => {
			let locationSearchRequests;
			if (input.length >= 3) {
				locationSearchRequests = fetchLocations({
					search_text: input,
					limit: 5
				});
				setIsLoading(true);
				locationSearchRequests.promise.then((res) => {
					parseLocations(res.data.results, res.data.count);
				}).catch((err) => {
					console.log("error: ", err);
					setIsLoading(false);
				});
			} else if (locationSearchRequests) {
				locationSearchRequests.cancel();
				setIsLoading(false);
			}
		};
		const handleTextInput = (locationInput) => {
			const input = locationInput.target.value;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => {
				queryAutocompleteLocations(input);
			}, 1e3);
		};
		const selectItem = (item, valid, obj) => {
			setSelectedItem(obj);
			setReadyToStage(true);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(LocationAutocomplete, {
			activeTab,
			locations,
			handleTextInput,
			selectItem,
			clearAutocompleteSuggestions,
			noResults,
			readyToStage,
			addLocation,
			isLoading,
			setIsForeign
		});
	};
	LocationAutocompleteContainer.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/search/filters/location/LocationSection.jsx
/**
* LocationSection.jsx
* Created by Kevin Li 11/1/17
*/
var import_jsx_runtime$41, tabLabels, LocationSection;
var init_LocationSection = __esmMin((() => {
	init_es();
	init_FilterTabs();
	init_LocationAutocompleteContainer();
	import_jsx_runtime$41 = require_jsx_runtime();
	tabLabels = [{
		internal: "pop",
		label: "Place of Performance",
		title: "Place of Performance"
	}, {
		internal: "recipient",
		label: "Recipient Location",
		title: "Recipient Location"
	}];
	LocationSection = () => {
		const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
		const [activeTab, setActiveTab] = useState(selectedRecipientLocations?.count() > 0 && selectedLocations.count() === 0 ? "recipient" : "pop");
		const toggleTab = (e) => {
			if (activeTab === "recipient" && e.target.textContent !== "Recipient Location" || activeTab === "pop" && e.target.textContent !== "Place of Performance") setActiveTab(activeTab === "pop" ? "recipient" : "pop");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
			className: "filter-item-wrap location-filter search-filter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
					className: "location-description",
					children: "Search for a country, state, county, city, congressional district, or zip code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(FilterTabs, {
					labels: tabLabels,
					switchTab: toggleTab,
					active: activeTab
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(LocationAutocompleteContainer, { activeTab })
			]
		});
	};
}));
//#endregion
//#region src/js/containers/search/filters/TimePeriodContainer.jsx
/**
* TimePeriodContainer.jsx
* Created by Kevin Li 11/21/16
**/
var import_immutable$1, import_jsx_runtime$40, startYear, propTypes$22, TimePeriodContainer, TimePeriodContainer_default;
var init_TimePeriodContainer = __esmMin((() => {
	init_redux();
	init_es();
	import_immutable$1 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_searchFilterActions();
	init_fiscalYearHelper();
	init_TimePeriod();
	import_jsx_runtime$40 = require_jsx_runtime();
	startYear = earliestFiscalYear;
	propTypes$22 = {
		updateTimePeriodArray: PropTypes.func,
		setTimePeriodArray: PropTypes.func,
		filterTimePeriodType: PropTypes.string,
		filterTimePeriodFY: PropTypes.instanceOf(import_immutable$1.Set),
		filterTimePeriodStart: PropTypes.string,
		filterTimePeriodEnd: PropTypes.string,
		filterTime_Period: PropTypes.object,
		appliedFilters: PropTypes.object,
		newAwardsOnlySelected: PropTypes.bool,
		newAwardsOnlyActive: PropTypes.bool,
		naoActiveFromFyOrDateRange: PropTypes.bool
	};
	TimePeriodContainer = (props) => {
		const [timePeriods, setTimePeriods] = useState([]);
		const [activeTab, setActiveTab] = useState("fy");
		const setUpdateState = (prop) => {
			setActiveTab(prop.filterTimePeriodType);
		};
		const generateTimePeriods = () => {
			const timePeriodArr = [];
			const currentFY = currentFiscalYear();
			for (let i = currentFY; i >= startYear; i--) timePeriodArr.push(i.toString());
			setTimePeriods(timePeriodArr);
		};
		const changeTab = useCallback((tab) => {
			setActiveTab(tab);
		}, []);
		const updateFilter = useCallback((params) => {
			const newFilters = Object.assign({}, params);
			if (activeTab === "fy") {
				newFilters.dateType = "fy";
				props.updateTimePeriod(newFilters);
			} else {
				newFilters.fy = [];
				props.updateTimePeriodArray(newFilters);
			}
		}, [activeTab]);
		const dirtyFilters = () => {
			const appliedFields = ["timePeriodFY", "time_period"];
			const activeFields = ["filterTimePeriodFY", "filterTime_Period"];
			if (!appliedFields.every((appliedField, index) => {
				const activeField = activeFields[index];
				const appliedValue = props.appliedFilters[appliedField];
				const activeValue = props[activeField];
				if (activeValue && activeValue.size === 0 && appliedValue && appliedValue.size >= 1) return true;
				if (!(0, import_immutable$1.is)(appliedValue, activeValue)) return false;
				return true;
			})) return Symbol("dirty time filter");
			return null;
		};
		useEffect(() => {
			if (props.appliedFilters.timePeriodType === "fy") changeTab("fy");
			else changeTab("dr");
			generateTimePeriods();
		}, []);
		useEffect(() => {
			setUpdateState(props);
		}, [props.filterTimePeriodType]);
		return /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(TimePeriod, {
			...props,
			dirtyFilters: dirtyFilters(),
			naoActiveFromFyOrDateRange: props.naoActiveFromFyOrDateRange,
			activeTab,
			timePeriods,
			updateFilter,
			changeTab
		});
	};
	TimePeriodContainer.propTypes = propTypes$22;
	TimePeriodContainer_default = connect_default((state) => ({
		filterTimePeriodType: state.filters.timePeriodType,
		filterTimePeriodFY: state.filters.timePeriodFY,
		filterTime_Period: state.filters.time_period,
		naoActiveFromFyOrDateRange: state.filters.filterNaoActiveFromFyOrDateRange,
		appliedFilters: state.appliedFilters.filters
	}), (dispatch) => bindActionCreators(searchFilterActions_exports, dispatch))(TimePeriodContainer);
}));
//#endregion
//#region src/js/components/search/filters/awardID/SelectedAwardIDs.jsx
var import_jsx_runtime$39, propTypes$21, SelectedAwardIDs;
var init_SelectedAwardIDs = __esmMin((() => {
	init_ShownValue();
	import_jsx_runtime$39 = require_jsx_runtime();
	propTypes$21 = {
		toggleAwardID: PropTypes.func,
		selectedAwardIDs: PropTypes.object
	};
	SelectedAwardIDs = (props) => {
		const { selectedAwardIDs, toggleAwardID } = props;
		const shownAwardIDs = [];
		selectedAwardIDs.entrySeq().forEach((entry) => {
			const key = entry[0];
			const awardID = entry[1];
			const removeValue = () => toggleAwardID(awardID);
			const value = /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(ShownValue, {
				label: awardID,
				removeValue
			}, key);
			shownAwardIDs.push(value);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("div", {
			className: "selected-filters",
			role: "status",
			children: shownAwardIDs
		});
	};
	SelectedAwardIDs.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/components/search/filters/awardID/AwardIDSearch.jsx
/**
* AwardIDSearch.jsx
* Created by michaelbray on 3/2/17.
*/
var import_jsx_runtime$38, propTypes$20, AwardIDSearch;
var init_AwardIDSearch = __esmMin((() => {
	init_index_es();
	init_SelectedAwardIDs();
	import_jsx_runtime$38 = require_jsx_runtime();
	propTypes$20 = {
		toggleAwardID: PropTypes.func,
		selectedAwardIDs: PropTypes.object
	};
	AwardIDSearch = ({ toggleAwardID, selectedAwardIDs }) => {
		const [awardID, setAwardID] = useState("");
		const inputChangeHandler = (e) => {
			setAwardID(e.target.value);
		};
		const applyAwardID = (e) => {
			e.preventDefault();
			toggleAwardID(awardID.toUpperCase());
			setAwardID("");
		};
		const renderSelectedAwardIDs = () => {
			if (selectedAwardIDs.size > 0) return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(SelectedAwardIDs, {
				selectedAwardIDs,
				toggleAwardID
			});
			return null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
			className: "award-id-filter",
			children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
				className: "filter-item-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
						className: "award-id-filter-description",
						children: "Search for an individual ID or a comma-separated list of multiple IDs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("form", {
						className: "award-id-filter__form",
						onSubmit: applyAwardID,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
							className: "award-id-filter__text-field-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("input", {
								id: "search",
								type: "text",
								className: "award-id-filter__text-field",
								placeholder: "Search for an ID...",
								value: awardID,
								onChange: inputChangeHandler
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(sc, {
							additionalClassnames: "award-id-filter__add-button",
							copy: "Add",
							buttonTitle: "Filter by award ID",
							buttonSize: "sm",
							buttonType: "primary",
							backgroundColor: "light",
							onClick: applyAwardID
						})]
					}),
					renderSelectedAwardIDs()
				]
			})
		});
	};
	AwardIDSearch.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/containers/search/filters/awardID/AwardIDSearchContainer.jsx
var import_immutable, import_jsx_runtime$37, AwardIDSearchContainer;
var init_AwardIDSearchContainer = __esmMin((() => {
	init_es();
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_searchFilterActions();
	init_AwardIDSearch();
	import_jsx_runtime$37 = require_jsx_runtime();
	AwardIDSearchContainer = () => {
		const dispatch = useDispatch();
		const { selectedAwardIDs } = useSelector((state) => state.filters);
		const addAwardID = (inputStr) => {
			let awardId = "";
			if (inputStr.includes(",")) {
				const awardIdArray = inputStr.split(",").map((v) => {
					const id = v.trim();
					return { [id]: id };
				});
				selectedAwardIDs.forEach((value, key) => {
					awardIdArray.push({ [key]: value });
				});
				awardId = (0, import_immutable.OrderedMap)(Object.assign({}, ...awardIdArray));
			} else awardId = selectedAwardIDs.set(inputStr, inputStr);
			dispatch(updateGenericFilter({
				type: "selectedAwardIDs",
				value: awardId
			}));
		};
		const removeAwardID = (id) => {
			const awardId = selectedAwardIDs.delete(id);
			dispatch(updateGenericFilter({
				type: "selectedAwardIDs",
				value: awardId
			}));
		};
		const toggleAwardID = (awardID) => {
			if (selectedAwardIDs.has(awardID)) removeAwardID(awardID);
			else addAwardID(awardID);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(AwardIDSearch, {
			selectedAwardIDs,
			toggleAwardID
		});
	};
}));
//#endregion
//#region src/js/components/sharedComponents/CheckboxTreeLabel.jsx
var import_jsx_runtime$36, propTypes$19, CheckboxTreeLabel;
var init_CheckboxTreeLabel = __esmMin((() => {
	init_replaceString();
	import_jsx_runtime$36 = require_jsx_runtime();
	propTypes$19 = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
		count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		displayId: PropTypes.bool,
		countLabel: PropTypes.string,
		labelClassName: PropTypes.string,
		subLabel: PropTypes.string,
		searchString: PropTypes.string
	};
	CheckboxTreeLabel = ({ value, label, count, displayId = true, countLabel = "", labelClassName = "", subLabel = null, searchString }) => {
		const countDisplay = countLabel === "" ? count > 1 ? "codes" : "code" : countLabel;
		const className = labelClassName ? ` ${labelClassName}` : "";
		const highlightText = (text) => replaceString(text, searchString, "highlight");
		return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
			className: `checkbox-tree-label${className}`,
			children: [displayId && /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
				className: "checkbox-tree-label__value-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
					className: "checkbox-tree-label__value-container-value",
					children: highlightText(value)
				}), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
					className: "checkbox-tree-label__value-container-count",
					children: count ? `${count} ${countDisplay}` : ""
				})]
			}), label && /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
				className: "checkbox-tree-label__label",
				children: [highlightText(label), subLabel && /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)(import_jsx_runtime$36.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("br", {}), highlightText(subLabel)] })]
			})]
		});
	};
	CheckboxTreeLabel.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/components/sharedComponents/checkboxTree/TreeNodes.jsx
var import_jsx_runtime$35, propTypes$18, TreeNodes;
var init_TreeNodes = __esmMin((() => {
	init_dist();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$18 = {
		localNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
		localExpanded: PropTypes.array,
		localChecked: PropTypes.array,
		toggleExpand: PropTypes.func,
		disabled: PropTypes.bool,
		handleCheck: PropTypes.func,
		checkboxRefs: PropTypes.object
	};
	TreeNodes = ({ localNodes, localExpanded, localChecked, toggleExpand, disabled, handleCheck, checkboxRefs }) => {
		const renderNodes = (nodes, depth) => /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("ul", {
			className: "level",
			children: nodes?.map((node) => {
				const isOpen = localExpanded.includes(node.id);
				const isChecked = localChecked.includes(node.id) || localChecked.includes(`children_of_${node.id}`);
				const hasAnyChildren = node.children?.length > 0;
				const showCheckbox = node.label && node.showCheckbox !== false;
				if (node.value.includes("children_of_") || node.className === "hide") return null;
				return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "checkbox-tree-label__container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
						className: "checkbox-tree-label__controls",
						children: [hasAnyChildren && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("button", {
							type: "button",
							onClick: () => toggleExpand(node.id, true),
							title: isOpen ? "Collapse" : "Expand",
							"aria-label": isOpen ? "Collapse" : "Expand",
							children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(FontAwesomeIcon, {
								icon: isOpen ? "chevron-down" : "chevron-right",
								style: { cursor: "pointer" }
							})
						}), showCheckbox && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("input", {
							type: "checkbox",
							name: `checkbox-${node.id}`,
							disabled,
							checked: isChecked,
							ref: (el) => {
								if (el) checkboxRefs.current[node.id] = el;
								else delete checkboxRefs.current[node.id];
							},
							onKeyDown: (e) => e.key === "Enter" ? handleCheck(node.id, node.children || []) : "",
							onChange: () => handleCheck(node.id, node.children || [])
						})]
					}), node.label]
				}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: `checkbox-tree-label__description ${isOpen ? "open" : ""}`,
					children: isOpen && renderNodes(node.children || [], depth)
				})] }, node.id);
			})
		});
		return renderNodes(localNodes, 0);
	};
	TreeNodes.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/components/sharedComponents/checkboxTree/TreeNodesWrapper.jsx
/**
* TreeNodesWrapper.jsx
* Created by Andrea Blackwell June 2025
**/
var import_jsx_runtime$34, propTypes$17, TreeNodesWrapper;
var init_TreeNodesWrapper = __esmMin((() => {
	init_checkboxTreeHelper();
	init_TreeNodes();
	import_jsx_runtime$34 = require_jsx_runtime();
	propTypes$17 = {
		nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
		disabled: PropTypes.bool,
		checked: PropTypes.arrayOf(PropTypes.string),
		expanded: PropTypes.arrayOf(PropTypes.string),
		onCheck: PropTypes.func,
		onExpand: PropTypes.func
	};
	TreeNodesWrapper = ({ nodes, disabled = false, checked = [], expanded = [], onCheck, onExpand }) => {
		const [localChecked, setLocalChecked] = useState(checked);
		const [localExpanded, setLocalExpanded] = useState(expanded);
		const [localNodes, setLocalNodes] = useState(nodes);
		const checkboxRefs = useRef({});
		useEffect(() => {
			setLocalNodes(nodes);
		}, [nodes]);
		useEffect(() => {
			setLocalExpanded(expanded);
		}, [expanded]);
		useEffect(() => {
			setLocalChecked(checked);
		}, [checked]);
		const getIdOrValue = (node) => node.id || node.value;
		const findNodeById = (id) => {
			const stack = [...nodes];
			while (stack.length) {
				const current = stack.pop();
				if (getIdOrValue(current) === id) return current;
				if (current.children) stack.push(...current.children);
			}
			return null;
		};
		const getDescendantIds = (children) => {
			const ids = [];
			const stack = [...children];
			while (stack.length) {
				const current = stack.pop();
				ids.push(current.value);
				if (current.children) stack.push(...current.children);
			}
			return ids;
		};
		const handleIndeterminateChildren = (node) => {
			if (node.children) for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (checkboxRefs.current) {
					if (checkboxRefs.current[getIdOrValue(child)]) checkboxRefs.current[getIdOrValue(child)].indeterminate = false;
				}
				if (child.children?.length) handleIndeterminateChildren(child);
			}
		};
		const hasCheckedDescendants = (node, checkedArray) => {
			if (checkedArray.includes(getIdOrValue(node))) return true;
			if (node.children?.length) return node.children.some((childNode) => hasCheckedDescendants(childNode, checkedArray));
			return false;
		};
		const handleIndeterminateAncestors = (node, newChecked) => {
			if (node.ancestors) {
				const ancestorNodes = node.ancestors.map((ancestor) => findNodeById(ancestor));
				if (ancestorNodes.length) ancestorNodes.forEach((parent) => {
					if (newChecked?.length) {
						let allChecked = [...newChecked];
						let nodePriorChecked = false;
						if (localChecked?.length) {
							allChecked = [...localChecked, ...newChecked];
							nodePriorChecked = localChecked.includes(getIdOrValue(node));
						}
						const hasAnyChildrenChecked = parent.children.filter((child) => allChecked.includes(getIdOrValue(child)) || getIdOrValue(node) === getIdOrValue(child));
						const allChildrenChecked = hasAnyChildrenChecked?.length === parent.children?.length;
						if (allChildrenChecked) return;
						const parentHasCheckedDescendants = hasCheckedDescendants(parent, newChecked);
						let setIndeterminate = !allChildrenChecked ? hasAnyChildrenChecked.length > 0 || parentHasCheckedDescendants : false;
						if (checkboxRefs.current) {
							if (nodePriorChecked) {
								if (localChecked?.includes(getIdOrValue(parent)) && hasAnyChildrenChecked?.length > 0) setIndeterminate = checkboxRefs.current[getIdOrValue(parent)]?.checked;
							}
							if (checkboxRefs.current[getIdOrValue(parent)]) checkboxRefs.current[getIdOrValue(parent)].indeterminate = setIndeterminate;
						}
					} else if (checkboxRefs.current) checkboxRefs.current[getIdOrValue(parent)].indeterminate = false;
				});
			}
		};
		const handleIndeterminate = (node, newChecked = []) => {
			handleIndeterminateChildren(node);
			handleIndeterminateAncestors(node, newChecked);
		};
		const handleAutoCheckAncestors = (node, newChecked, isChecked) => {
			let updatedChecked = newChecked;
			if (isChecked && updatedChecked.length <= 1) updatedChecked = [];
			else if (node.ancestors) {
				const ancestorNodes = node.ancestors.map((ancestor) => findNodeById(ancestor));
				if (ancestorNodes.length) ancestorNodes.forEach((parent) => {
					if (parent.children.every((child) => newChecked.includes(removePlaceholderString(getIdOrValue(child))) || getIdOrValue(node) === getIdOrValue(child)) && !isChecked) updatedChecked = [.../* @__PURE__ */ new Set([...updatedChecked, getIdOrValue(parent)])];
					else updatedChecked = updatedChecked.filter((c) => c !== getIdOrValue(parent));
				});
			}
			return updatedChecked;
		};
		const handleCheck = (id, children = []) => {
			const isChecked = localChecked.includes(id);
			const descendantIds = getDescendantIds(children);
			const modifiedNode = findNodeById(id);
			let newChecked;
			if (isChecked) {
				const excludeSet = [...descendantIds, id];
				newChecked = localChecked.filter((cid) => !excludeSet.includes(cid));
				newChecked = handleAutoCheckAncestors(modifiedNode, newChecked, true);
				handleIndeterminate(modifiedNode, newChecked);
				setLocalChecked([.../* @__PURE__ */ new Set([...newChecked])]);
				if (onCheck) onCheck(newChecked, modifiedNode);
			} else {
				if (descendantIds.length > 0) newChecked = [.../* @__PURE__ */ new Set([
					...localChecked,
					id,
					...descendantIds
				])];
				else newChecked = [.../* @__PURE__ */ new Set([...localChecked, id])];
				newChecked = handleAutoCheckAncestors(modifiedNode, newChecked, false);
				handleIndeterminate(modifiedNode, newChecked);
				setLocalChecked([.../* @__PURE__ */ new Set([...newChecked])]);
				if (onCheck) onCheck(newChecked, modifiedNode);
			}
		};
		const handleToggle = (id, hasChildren) => {
			const isExpanded = localExpanded.includes(id);
			const node = findNodeById(id);
			if (!isExpanded && hasChildren) onExpand([...localExpanded, id], node);
			else onExpand(localExpanded.filter((eid) => eid !== id), node);
		};
		useEffect(() => {
			if (localChecked.length > 0) localChecked.forEach((value) => {
				const currentNode = findNodeById(value);
				if (currentNode) handleIndeterminate(currentNode, localChecked);
			});
			if (checkboxRefs.current) {
				let indeterminateRefs = [];
				for (const [key, value] of Object.entries(checkboxRefs.current)) if (value.indeterminate) indeterminateRefs = [...indeterminateRefs, key];
				indeterminateRefs.forEach((ref) => {
					const refNode = findNodeById(ref);
					if (!hasCheckedDescendants(refNode, localChecked)) checkboxRefs.current[ref].indeterminate = false;
				});
			}
		}, [localChecked]);
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(TreeNodes, {
			localNodes,
			localChecked,
			localExpanded,
			toggleExpand: handleToggle,
			disabled,
			handleCheck,
			checkboxRefs
		}) });
	};
	TreeNodesWrapper.propTypes = propTypes$17;
}));
//#endregion
//#region src/js/components/sharedComponents/checkboxTree/CheckboxTree.jsx
/**
* CheckboxTree.jsx
* Created by Jonathan Hill 09/27/2019
**/
var import_jsx_runtime$33, propTypes$16, CheckboxTree;
var init_CheckboxTree = __esmMin((() => {
	init_dist();
	init_replaceString();
	init_CheckboxTreeLabel();
	init_TreeNodesWrapper();
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$16 = {
		data: PropTypes.array,
		className: PropTypes.string,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool,
		isDisabled: PropTypes.bool,
		errorMessage: PropTypes.string,
		isSearch: PropTypes.bool,
		searchString: PropTypes.string,
		modifyLabelTextClassname: PropTypes.string,
		labelComponent: PropTypes.element,
		onExpand: PropTypes.func,
		onCheck: PropTypes.func,
		onUncheck: PropTypes.func,
		onCollapse: PropTypes.func,
		expanded: PropTypes.array,
		checked: PropTypes.array,
		noResults: PropTypes.bool,
		countLabel: PropTypes.string
	};
	CheckboxTree = ({ data, className, isLoading, isError, isDisabled = false, errorMessage, isSearch, searchString, modifyLabelTextClassname, labelComponent, onExpand: onExpandProp, onCheck: onCheckProp, onUncheck, onCollapse, expanded, checked, noResults, countLabel = "" }) => {
		const checkboxTreeClass = className ? ` ${className}` : "";
		/**
		* collapseNode
		* updates state with the new expanded array and calls onCollapse if passed in
		*/
		const collapseNode = (newExpandedArray) => {
			onCollapse(newExpandedArray);
		};
		/**
		* expandNodeAndFetchChildren
		* updates state with the new expanded array and updates the newly expanded children
		* with a loading object if we have no child data for that node.
		* @param {array} newExpandedArray - array with the newly expanded value
		* @param {object} selectedNode - the checked node
		*/
		const expandNodeAndFetchChildren = async (newExpandedArray, selectedNode) => {
			const expandedValue = difference(newExpandedArray, expanded)[0];
			return onExpandProp(expandedValue, newExpandedArray, (!selectedNode?.children || selectedNode?.children?.some((child) => child.value.includes("children_of_"))) && !isSearch, selectedNode);
		};
		/**
		* onExpand
		* (react-checkbox-tree calls this function when a user expands a node)
		* Decides whether we are expanding or collapsing the node.
		*/
		const onExpand = (newExpandedArray, node) => {
			if (newExpandedArray.length < expanded.length) return collapseNode(newExpandedArray);
			return expandNodeAndFetchChildren(newExpandedArray, node);
		};
		/**
		* checkedNode
		* - updates state and calls prop onCheck
		* @param {*[]} checkedLocal - array of checked values
		* @param {object} node - the checked node
		* @returns {null}
		*/
		const checkedNode = (checkedLocal, node) => {
			onCheckProp(checkedLocal, node);
		};
		/**
		* unCheckedNode
		* - updates state and calls prop onCheck
		* @param {*[]} checkedLocal - array of checked values
		* @param {object} node - the checked node
		* @returns {null}
		*/
		const unCheckedNode = (checkedLocal, node) => {
			onUncheck(checkedLocal, node);
		};
		/**
		* onCheck
		* - (react-checkbox-tree calls this function when a user selects a node)
		* @param {*[]} checkedLocal - array of checked values
		* @param {object} node - the checked node
		* @returns {null}
		*/
		const onCheck = (checkedLocal, node) => {
			if (!isLoading) if (checked.length < checkedLocal.length) checkedNode(checkedLocal, node);
			else unCheckedNode(checkedLocal, node);
		};
		/**
		* setChildrenToLoading
		* update a node's children property to a loading div.
		* @returns {Array.<object>} - new array of nodes
		*/
		const setChildrenToLoading = () => /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "children-are-loading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(FontAwesomeIcon, {
				icon: "spinner",
				spin: true
			}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				className: "children-are-loading__text",
				children: "Loading your data..."
			})]
		});
		/**
		* highlightText
		* adds a <span> tag with a highlight class around matching text
		* @param {string} text - text to match
		* @returns {element|string} - returns a span element with a highlight class
		* or string if no match is found.
		*/
		const highlightText = (text) => replaceString(text, searchString, modifyLabelTextClassname || "highlight");
		/**
		** createLabels
		* maps data labels from strings to html
		* @param {Array.<object>} nodes - an array of objects
		* @returns {Array.<object>} An array of objects
		**/
		const createLabels = (nodes) => nodes.map((node) => {
			if (typeof node.label !== "string") return node;
			if (node.isPlaceHolder && node.className !== "hide") return {
				value: node.value,
				showCheckbox: false,
				label: setChildrenToLoading(node)
			};
			const displayId = Object.keys(node).includes("displayId") ? node.displayId : true;
			return {
				...node,
				label: labelComponent ? cloneElement(labelComponent, { ...node }) : /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(CheckboxTreeLabel, {
					className: node?.labelClassName,
					count: node.count,
					displayId,
					subLabel: node.subLabel,
					value: node?.isSearchable === false ? node.value : highlightText(node.value),
					label: node?.isSearchable === false ? node.label : highlightText(node.label),
					countLabel,
					searchString
				}),
				children: node.children ? createLabels(node.children) : null
			};
		});
		const labeledNodes = createLabels(data);
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "checkbox-tree-filter-message-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(FontAwesomeIcon, {
				icon: "spinner",
				spin: true
			}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				className: "checkbox-tree-filter-message-container__text",
				children: "Loading your data..."
			})]
		});
		else if (isError && errorMessage) return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
			className: "checkbox-tree-filter-message-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				className: "checkbox-tree-filter-message-container__text",
				children: errorMessage
			})
		});
		else if (noResults) return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "checkbox-tree-filter-message-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(FontAwesomeIcon, { icon: "ban" }), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				className: "checkbox-tree-filter-message-container__text",
				children: "No Results"
			})]
		});
		else if (!data.length) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
			className: `checkbox-tree${checkboxTreeClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(TreeNodesWrapper, {
				nodes: labeledNodes,
				disabled: isDisabled,
				checked,
				expanded,
				onCheck,
				onExpand
			})
		});
	};
	CheckboxTree.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/containers/search/filters/programSource/TASCheckboxTreeContainer.jsx
var import_jsx_runtime$32, TASCheckboxTree;
var init_TASCheckboxTreeContainer = __esmMin((() => {
	init_axios();
	init_es();
	init_tasHelper();
	init_searchHelper();
	init_checkboxTreeHelper();
	init_tasActions();
	init_searchFilterActions();
	init_CheckboxTree();
	init_EntityDropdownAutocomplete();
	init_filterCheckboxHelper();
	import_jsx_runtime$32 = require_jsx_runtime();
	TASCheckboxTree = () => {
		const [searchString, setSearchString] = useState("");
		const [isSearch, setIsSearch] = useState(false);
		const [isLoading, setIsLoading] = useState(false);
		const [isError, setIsError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [showNoResults, setShowNoResults] = useState(false);
		const nodes = useSelector((state) => state.tas.tas.toJS());
		const expanded = useSelector((state) => state.tas.expanded.toJS());
		const searchExpanded = useSelector((state) => state.tas.searchExpanded.toJS());
		const checked = useSelector((state) => state.tas.checked.toJS());
		const unchecked = useSelector((state) => state.tas.unchecked.toJS());
		const counts = useSelector((state) => state.tas.counts.toJS());
		const { require: checkedFromHash, exclude: uncheckedFromHash, counts: countsFromHash } = useSelector((state) => state.appliedFilters.filters.tasCodes);
		const { require: checkedStaged, exclude: uncheckedStaged, counts: countsStaged } = useSelector((state) => state.filters.tasCodes);
		const request = useRef(null);
		const dispatch = useDispatch();
		const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
			const newChecked = expandedLocal.filter((expandedNode) => {
				if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
				return !!checkedLocal.includes(expandedNode);
			}).map((node) => removePlaceholderString(node)).reduce((acc, expandedAndChecked) => {
				const node = getTasNodeFromTree(nodesLocal, expandedAndChecked);
				return [...acc, ...getAllDescendants(node)];
			}, []);
			return /* @__PURE__ */ new Set([...checkedLocal.flat(), ...newChecked.flat()]);
		};
		const fetchTasLocal = (id = "", searchStr = "", resolveLoadingIndicator = true) => {
			if (request.current) request.current.cancel();
			if (showNoResults) setShowNoResults(false);
			setIsLoading(true);
			const queryParam = isSearch ? `?depth=2&filter=${searchStr}` : id;
			request.current = fetchTas(queryParam);
			const isPartialTree = id !== "" || isSearch;
			return request.current.promise.then(({ data }) => {
				const tasNodes = cleanTasData(data.results);
				if (isPartialTree) {
					const key = id.includes("/") ? id.split("/")[1] : id;
					if (isSearch) {
						const searchExpandedNodes = expandTasNodeAndAllDescendantParents(tasNodes);
						dispatch(setSearchedTas(tasNodes));
						dispatch(setExpandedTas(searchExpandedNodes, "SET_SEARCHED_EXPANDED"));
						if (tasNodes.length === 0) setShowNoResults(true);
					} else dispatch(setTasNodes(key, tasNodes));
					let modChecked = [];
					if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
						modChecked = [...checked.filter((ch) => ch !== `children_of_${key}`), ...tasNodes.map((child) => child.value)];
						if (!checked.includes(key)) modChecked = [...modChecked, key];
					}
					const newChecked = modChecked?.length ? autoCheckTasAfterExpand({
						children: tasNodes,
						value: key
					}, modChecked, unchecked) : checked;
					dispatch(setCheckedTas(newChecked));
				} else dispatch(setTasNodes("", tasNodes));
				setIsLoading(resolveLoadingIndicator ? false : isLoading);
				request.current = null;
			}).catch((e) => {
				if (!isCancel(e)) {
					console.log("error fetching TAS", e);
					setIsError(true);
					setIsLoading(false);
					setErrorMessage(get(e, "message", "Error fetching TAS."));
				}
				request.current = null;
			});
		};
		const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
			const treeDepth = selectedNode.ancestors?.length;
			if (shouldFetchChildren && !isSearch) if (treeDepth >= 1) if (treeDepth === 2) fetchTasLocal(`${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`);
			else fetchTasLocal(`${selectedNode.ancestors[0]}/${expandedValue}`);
			else fetchTasLocal(expandedValue);
			if (isSearch) dispatch(setExpandedTas(newExpandedArray, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedTas(newExpandedArray));
		};
		const onClear = () => {
			if (request.current) request.current.cancel();
			dispatch(setExpandedTas([], "SET_SEARCHED_EXPANDED"));
			dispatch(showTasTree());
			setIsSearch(false);
			setSearchString("");
			setIsLoading(false);
			setIsError(false);
			setErrorMessage("");
			setShowNoResults(false);
		};
		const onSearchChange = debounce(() => {
			if (!searchString) onClear();
			fetchTasLocal("", searchString);
		}, 500);
		const onUncheck = (newChecked, uncheckedNode) => {
			const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(uncheckedNode, unchecked, checked, counts, nodes);
			dispatch(setCheckedTas(newChecked));
			dispatch(setTasCounts(newCounts));
			dispatch(setUncheckedTas(newUnchecked));
			dispatch(updateTAS(trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)), getTasAncestryPathForChecked(newUnchecked, nodes), newCounts));
		};
		const onCheck = (newChecked) => {
			const [newCounts, newUnchecked] = incrementTasCountAndUpdateUnchecked(newChecked?.length > 1 ? newChecked.filter((id) => !id.includes("children_of_")) : newChecked, checked, unchecked, nodes, counts);
			dispatch(setCheckedTas(newChecked));
			dispatch(setTasCounts(newCounts));
			dispatch(setUncheckedTas(newUnchecked));
			dispatch(updateTAS(trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)), getTasAncestryPathForChecked(newUnchecked, nodes), newCounts));
		};
		const onCollapse = (newExpandedArray) => {
			if (isSearch) dispatch(setExpandedTas(newExpandedArray, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedTas(newExpandedArray));
		};
		const handleTextInputChange = (e) => {
			e.persist();
			const text = e.target.value;
			if (!text) onClear();
			setSearchString(text);
			if (text.length >= 3) {
				setIsSearch(true);
				setIsLoading(true);
			}
		};
		useEffect(() => {
			if (nodes.length !== 0) dispatch(showTasTree());
			else fetchTasLocal().then(() => {
				if (checkedFromHash.length || checkedStaged.length) {
					const useHash = stateEqualityCheck(checkedFromHash, checkedStaged);
					const checkedArray = useHash ? checkedFromHash : checkedStaged;
					const uncheckedArray = useHash ? uncheckedFromHash : uncheckedStaged;
					dispatch(setTasCounts(useHash ? countsFromHash : countsStaged));
					return getUniqueAncestorPaths(checkedArray, uncheckedArray).reduce((prevPromise, param) => prevPromise.then(() => fetchTasLocal(param, null, false)), Promise.resolve([])).catch((e) => {
						setIsLoading(false);
						setIsError(true);
						setErrorMessage(get(e, "message", "Error fetching TAS."));
					});
				}
				return Promise.resolve();
			});
			return () => {
				if (request.current) request.current.cancel();
				dispatch(showTasTree());
			};
		}, []);
		useEffect(() => {
			if (isSearch && isLoading) onSearchChange();
		}, [isSearch, searchString]);
		useEffect(() => {
			if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
				let checkedArray = checkedFromHash;
				let uncheckedArray = uncheckedFromHash;
				if (!checked.length && checkedStaged.length) {
					if (!stateEqualityCheck(checkedFromHash, checkedStaged)) {
						checkedArray = checkedStaged;
						uncheckedArray = uncheckedStaged;
					}
					const autoChecked = autoCheckResultDescendants(checkedArray.map((ancestryPath) => ancestryPath[ancestryPath.length - 1]), expanded, nodes);
					dispatch(setCheckedTas(autoChecked));
					dispatch(setExpandedTas(getUniqueAncestorPaths([...checkedArray, ...uncheckedArray])));
				}
			}
		}, [
			nodes,
			checkedFromHash,
			checkedStaged,
			checked
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
			className: "tas-checkbox",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(EntityDropdownAutocomplete, {
				placeholder: autocompletePlaceholder,
				searchString,
				enabled: true,
				handleTextInputChange,
				isClearable: true,
				loading: false,
				onClear,
				searchIcon: true
			}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CheckboxTree, {
				isError,
				errorMessage,
				isLoading,
				data: nodes.sort((a, b) => a.label.localeCompare(b.label)),
				checked,
				searchString,
				noResults: showNoResults,
				expanded: isSearch ? searchExpanded : expanded,
				isSearch,
				onUncheck,
				onCheck,
				onExpand,
				onCollapse
			})]
		});
	};
}));
//#endregion
//#region src/js/components/sharedComponents/autocomplete/AutocompleteWithCheckboxList.jsx
/**
* AutocompleteWithCheckboxList.jsx
* Created by JD House on 11/21/25.
*/
var import_jsx_runtime$31, propTypes$15, AutocompleteWithCheckboxList;
var init_AutocompleteWithCheckboxList = __esmMin((() => {
	init_dist();
	init_EntityDropdownAutocomplete();
	init_PrimaryCheckboxType();
	init_Analytics();
	init_Alert();
	import_jsx_runtime$31 = require_jsx_runtime();
	propTypes$15 = {
		handleTextInputChange: PropTypes.func,
		onSearchClear: PropTypes.func,
		onClearAll: PropTypes.func,
		searchString: PropTypes.string,
		filterType: PropTypes.string,
		filters: PropTypes.array,
		selectedFilters: PropTypes.array,
		toggleSingleFilter: PropTypes.func,
		toggleAll: PropTypes.func,
		additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		isLoading: PropTypes.bool,
		errorMessage: PropTypes.string,
		noResults: PropTypes.bool,
		limit: PropTypes.number,
		placeholder: PropTypes.string,
		searchId: PropTypes.string
	};
	AutocompleteWithCheckboxList = React.memo(function AutocompleteWithCheckboxList({ handleTextInputChange, onSearchClear, onClearAll, searchString, filterType, filters, selectedFilters, toggleSingleFilter, toggleAll, additionalText = null, isLoading, errorMessage, noResults, limit = 500, placeholder = "Type at least 3 letters...", searchId }) {
		const [allSelected, setAllSelected] = useState(false);
		const [isOpen, setIsOpen] = useState(false);
		const [showClearAll, setShowClearAll] = useState(true);
		const additionalClassName = filters.length >= limit ? "bottom-fade" : "";
		const dropDownRef = useRef(null);
		const handleClear = () => {
			if (onSearchClear) onSearchClear();
		};
		const handleClearAll = () => {
			if (onClearAll) onClearAll();
			setShowClearAll(false);
		};
		const toggleDropdown = useCallback(() => {
			setIsOpen((prevState) => !prevState);
		}, []);
		const handleNoResultsLinkClick = () => {
			Analytics.event({
				category: "Advanced Search - Filter Feedback",
				action: "Submit Feeback",
				label: filterType
			});
		};
		useEffect(() => {
			if (selectedFilters?.size > 0) {
				setAllSelected(true);
				setShowClearAll(true);
			} else setShowClearAll(false);
		}, [selectedFilters.size]);
		useEffect(() => {
			const handleOutsideClick = (e) => {
				if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setIsOpen(false);
			};
			if (isOpen) document.addEventListener("click", handleOutsideClick);
			return () => {
				document.removeEventListener("click", handleOutsideClick);
			};
		}, [dropDownRef, isOpen]);
		const checkboxHeading = () => {
			if (!searchString) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("li", {
				className: "autocomplete-heading",
				children: [searchString, false]
			});
		};
		const handleTextInput = (e) => {
			if (handleTextInputChange) handleTextInputChange(e);
			setIsOpen(true);
		};
		const resultsContainer = () => {
			if (noResults) {
				const alertBody = /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("p", { children: [
					"Please check your spelling or try a broader search. Missing something?",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: "https://eex-survey.voc.ttecgov.us/se/0ADFD0F61A0367FE",
						onClick: handleNoResultsLinkClick,
						children: "Submit feedback on filters."
					})
				] });
				return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [showClearAll && /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "clear-all__container",
					children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("button", {
						type: "button",
						"aria-label": `Clear all ${filterType}`,
						className: "clear-all__button",
						tabIndex: "0",
						onClick: handleClearAll,
						children: `Clear all ${filterType}`
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Alert, {
					className: "autocomplete-no-results",
					header: "Sorry, no results found",
					body: alertBody,
					type: "warning",
					icon: true
				})] });
			}
			if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
				className: "loading-message-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(FontAwesomeIcon, {
					icon: "spinner",
					spin: true
				}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "loading-message-container__text",
					children: "Loading your data..."
				})]
			});
			if (errorMessage) return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
				className: "error-message",
				children: errorMessage
			});
			if (showClearAll && !isOpen) return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
				className: "clear-all__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("button", {
					type: "button",
					"aria-label": `Clear all ${filterType}`,
					className: "clear-all__button",
					tabIndex: "0",
					onClick: handleClearAll,
					children: `Clear all ${filterType}`
				})
			});
			if (isOpen && filters?.length) return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
				className: `checkbox-type-filter ${additionalClassName}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("ul", {
					className: "autocomplete-checkbox",
					children: [checkboxHeading(), filters?.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(PrimaryCheckboxType, {
						name: filter.name || filter.title,
						value: filter.value,
						toggleCheckboxType: toggleSingleFilter,
						selectedCheckboxes: selectedFilters
					}, filter.key) }))]
				}), additionalText && additionalText]
			});
			return null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
			className: `extent-competed-filter ${filterType}`,
			ref: dropDownRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(EntityDropdownAutocomplete, {
				placeholder,
				searchString,
				enabled: true,
				handleTextInputChange: handleTextInput,
				loading: false,
				isClearable: true,
				openDropdown: toggleDropdown,
				onClear: handleClear,
				searchIcon: true,
				id: searchId
			}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
				className: "filter-item-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "checkbox-filter__wrapper",
					children: resultsContainer()
				})
			})]
		});
	});
	AutocompleteWithCheckboxList.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/containers/search/filters/recipient/RecipientSearchContainer.jsx
/**
* RecipientSearchContainer.jsx
* Created by michaelbray on 2/16/17.
*/
var import_jsx_runtime$30, RecipientSearchContainer;
var init_RecipientSearchContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_searchFilterActions();
	init_searchHelper();
	init_replaceString();
	init_AutocompleteWithCheckboxList();
	init_ShownValue();
	import_jsx_runtime$30 = require_jsx_runtime();
	RecipientSearchContainer = () => {
		const [recipients, setRecipients] = useState([]);
		const [searchString, setSearchString] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const [maxRecipients, setMaxRecipients] = useState(false);
		const [noResults, setNoResults] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const selectedRecipients = useSelector((state) => state.filters.selectedRecipients);
		const recipientRequest = useRef(null);
		const dispatch = useDispatch();
		let timeout;
		const maxRecipientsAllowed = 500;
		const maxRecipientTitle = `Only ${maxRecipientsAllowed} recipients can be displayed at once`;
		const maxRecipientText = "Please use the search bar to narrow your search and find additional recipients.";
		const highlightText = (text) => replaceString(text, searchString, "bold-highlight");
		const toggleRecipient = ({ value }) => {
			let isUei = false;
			if (value.uei && searchString.length > 2 && value.uei?.includes(searchString.toUpperCase())) {
				dispatch(updateSelectedRecipients(value.uei));
				isUei = true;
			} else dispatch(updateSelectedRecipients(value.name));
			const updatedSelected = selectedRecipients.toArray();
			if (selectedRecipients?.size > 0 && selectedRecipients.includes(isUei ? value.uei : value.name)) updatedSelected.filter((rep) => rep === (isUei ? value.uei : value.name));
			else updatedSelected.push(isUei ? value.uei : value.name);
		};
		const sortResults = (data) => {
			data.sort((a, b) => {
				const nameA = a.name ? a.name : a.recipient_name;
				const nameB = b.name ? b.name : b.recipient_name;
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
			if (selectedRecipients.size > 0) {
				const recipientsArray = selectedRecipients.toArray();
				recipientsArray.sort((a, b) => {
					if (a > b) return -1;
					if (a < b) return 1;
					return 0;
				});
				recipientsArray.forEach((recipient) => {
					data.sort((a, b) => {
						const aValues = Object.values(a);
						const bValues = Object.values(b);
						if (aValues.includes(recipient) && !bValues.includes(recipient)) return -1;
						if (!aValues.includes(recipient) && bValues.includes(recipient)) return 1;
						return 0;
					});
				});
			}
		};
		const getRecipientsFromSearchString = (term) => {
			if (recipientRequest.current) recipientRequest.current.cancel();
			if (term.length >= 3) {
				recipientRequest.current = fetchRecipientsAutocomplete({
					search_text: term,
					limit: maxRecipientsAllowed
				});
				setIsLoading(true);
				recipientRequest.current.promise.then((res) => {
					sortResults(res.data.results);
					setRecipients(res.data.results);
					setErrorMessage("");
					setMaxRecipients(res.data.count === maxRecipientsAllowed);
					setNoResults(!res.data.count);
				}).catch((err) => {
					if (!isCancel(err)) {
						console.log(`Recipient Request Error: ${err}`);
						setErrorMessage(err.message);
					}
				});
			}
			setIsLoading(false);
		};
		const handleTextInputChange = (e) => {
			window.clearTimeout(timeout);
			setSearchString(e.target.value);
			timeout = window.setTimeout(() => {
				getRecipientsFromSearchString(e.target.value);
			}, 1e3);
		};
		const handleSearchClear = () => {
			setSearchString("");
			setMaxRecipients(false);
			setRecipients([]);
		};
		const handleClearAll = () => {
			selectedRecipients.forEach((recipient) => {
				dispatch(updateSelectedRecipients(recipient));
			});
			handleSearchClear();
		};
		const getMaxRecipientsText = () => {
			if (maxRecipients) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
				className: "recipient-filter-message-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
					className: "find-recipients-text label",
					children: maxRecipientTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
					className: "find-recipients-text content",
					children: maxRecipientText
				})]
			});
			return null;
		};
		const getFormatedName = (recipient) => {
			if (recipient.uei && recipient.uei?.includes(searchString.toUpperCase())) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
				className: "recipient-checkbox__uei",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", { children: "UEI: " }),
					highlightText(recipient.uei),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "secondary-label__name-container",
						children: highlightText(recipient.name ? recipient.name : recipient.recipient_name)
					})
				]
			});
			return highlightText(recipient.name ? recipient.name : recipient.recipient_name);
		};
		const formatedRecipientFilters = () => {
			let formatedRecipients = [];
			if (recipients) formatedRecipients = recipients.toSorted((a, b) => a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1).map((recipient) => ({
				name: getFormatedName(recipient),
				value: {
					name: recipient.name ? recipient.name : recipient.recipient_name,
					uei: recipient.uei
				},
				key: recipient.uei ? `UEI-${recipient.uei}` : `Name-${recipient.id}`
			}));
			return formatedRecipients;
		};
		const toggleAll = (selectAll) => {
			const selectedList = selectedRecipients.toArray();
			if (selectAll) {
				const currentlyChecked = selectedList;
				recipients.forEach((rep) => {
					if (!currentlyChecked.includes(rep.recipient_name)) {
						dispatch(updateSelectedRecipients(rep.recipient_name));
						currentlyChecked.push(rep.recipient_name);
					}
				});
			} else selectedRecipients.forEach((rep) => {
				dispatch(updateSelectedRecipients(rep));
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "recipient-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(AutocompleteWithCheckboxList, {
				filterType: "Recipients",
				limit: maxRecipientsAllowed,
				handleTextInputChange,
				onSearchClear: handleSearchClear,
				onClearAll: handleClearAll,
				searchString,
				filters: formatedRecipientFilters(),
				selectedFilters: selectedRecipients,
				toggleSingleFilter: toggleRecipient,
				toggleAll,
				noResults,
				additionalText: getMaxRecipientsText(),
				isLoading,
				errorMessage,
				searchId: "recipient-autocomplete-input"
			}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "selected-filters",
				role: "status",
				children: selectedRecipients.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(ShownValue, {
					label: rec,
					removeValue: () => dispatch(updateSelectedRecipients(rec))
				}, rec))
			})]
		});
	};
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/ListCheckboxPrimary.jsx
var import_jsx_runtime$29, propTypes$14, ListCheckboxPrimary;
var init_ListCheckboxPrimary = __esmMin((() => {
	init_CheckboxItem();
	import_jsx_runtime$29 = require_jsx_runtime();
	propTypes$14 = {
		category: PropTypes.object,
		selectedFilters: PropTypes.object,
		singleFilterChange: PropTypes.func,
		filters: PropTypes.object,
		searchString: PropTypes.string
	};
	ListCheckboxPrimary = ({ category, selectedFilters, singleFilterChange, filters, searchString }) => {
		const items = category.filters?.map((filter) => {
			const label = filters[filter];
			return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(CheckboxItem, {
				filter,
				filters,
				selectedFilters,
				singleFilterChange,
				label,
				searchString
			});
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("ul", {
			className: "checkbox-filter__list list-checkbox",
			children: items
		});
	};
	ListCheckboxPrimary.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/sharedComponents/checkbox/ListCheckbox.jsx
/**
* ListCheckbox.jsx
* Created by Josue Aguilar on 09/20/2024.
*/
var import_jsx_runtime$28, propTypes$13, ListCheckbox;
var init_ListCheckbox = __esmMin((() => {
	init_ListCheckboxPrimary();
	init_EntityDropdownAutocomplete();
	init_replaceString();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$13 = {
		filters: PropTypes.object,
		filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
		selectedFilters: PropTypes.object,
		singleFilterChange: PropTypes.func
	};
	ListCheckbox = ({ filters, filterCategoryMapping = [], selectedFilters, singleFilterChange }) => {
		const [searchString, setSearchString] = useState("");
		const [filterCategory, setFilterCategory] = useState(filterCategoryMapping);
		const [noResults, setNoResults] = useState(false);
		const handleTextInputChange = (e) => {
			setSearchString(e.target.value);
		};
		const onClear = () => {
			setSearchString("");
		};
		const highlightText = (text) => replaceString(text, searchString, "highlight");
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
		const checkboxCategories = filterCategory.map((category) => /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
			className: "checkbox-filter__wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
				className: "checkbox-filter__header list-checkbox",
				role: "button",
				tabIndex: "0",
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
					className: "checkbox-filter__header-label-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("span", {
						className: "checkbox-filter__header-label",
						children: highlightText(category.name)
					}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("span", {
						className: "checkbox-filter__header-count",
						children: [
							category.filters?.length,
							" ",
							category.filters?.length === 1 ? "type" : "types"
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(ListCheckboxPrimary, {
				selectedFilters,
				category,
				singleFilterChange,
				filters,
				searchString
			})]
		}, category.id));
		useEffect(() => {
			searchCategoryMapping();
		}, [searchString]);
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
			className: "extent-competed-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(EntityDropdownAutocomplete, {
				placeholder: "Search filters...",
				searchString,
				enabled: true,
				handleTextInputChange,
				context: {},
				loading: false,
				isClearable: true,
				onClear,
				searchIcon: true
			}), noResults ? /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
				className: "no-results",
				children: "No results found."
			}) : /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
				className: "filter-item-wrap",
				children: checkboxCategories
			})]
		});
	};
	ListCheckbox.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/search/filters/RecipientType.jsx
var import_jsx_runtime$27, RecipientType;
var init_RecipientType = __esmMin((() => {
	init_es();
	init_filterCheckboxHelper();
	init_recipientType();
	init_ListCheckbox();
	init_searchFilterActions();
	import_jsx_runtime$27 = require_jsx_runtime();
	RecipientType = () => {
		const recipientType = useSelector((state) => state.filters.recipientType);
		const dispatch = useDispatch();
		const toggleRecipientTypeFunc = (selection) => {
			dispatch(toggleRecipientType(selection));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(ListCheckbox, {
			filterCategoryMapping: recipientTypeMapping,
			filters: recipientTypes,
			selectedFilters: recipientType,
			singleFilterChange: toggleRecipientTypeFunc
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/awardAmount/SpecificAwardAmountItem.jsx
/**
* SpecificAwardAmountItem
* Created by michaelbray on 3/7/17.
*/
var import_jsx_runtime$26, propTypes$12, SpecificAwardAmountItem;
var init_SpecificAwardAmountItem = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$12 = { searchSpecificRange: PropTypes.func };
	SpecificAwardAmountItem = ({ searchSpecificRange }) => {
		const [min, setMin] = useState("");
		const [max, setMax] = useState("");
		const [showWarning, setShowWarning] = useState(false);
		const [warningMessage, setWarningMessage] = useState("");
		const maxInput = useRef(null);
		const minInput = useRef(null);
		const minChange = (e) => {
			setMin(e.target.value);
		};
		const maxChange = (e) => {
			setMax(e.target.value);
		};
		const searchRange = () => {
			searchSpecificRange([min, max]);
			setMin("");
			setMax("");
		};
		const verifyNumberLogic = () => {
			if (max === "" && min === "") {
				if (showWarning) {
					setShowWarning(false);
					setWarningMessage("");
				}
				return;
			}
			let tempShowWarning = false;
			const maxWarningMessage = "Maximum amount should be larger than or equal to the minimum amount";
			const minWarningMessage = "Minimum amount should be smaller than or equal to the maximum amount";
			const minIsNull = !min && min !== "0";
			const maxIsNull = !max && max !== "0";
			const numberMin = Number(min);
			const numberMax = Number(max);
			if (minIsNull || maxIsNull) tempShowWarning = false;
			else {
				if (numberMin < numberMax) tempShowWarning = false;
				if (numberMin > numberMax) tempShowWarning = true;
			}
			if (showWarning !== tempShowWarning) setShowWarning(tempShowWarning);
			if (numberMin > numberMax && document.activeElement.id === "award-amount_max") {
				setShowWarning(tempShowWarning);
				setWarningMessage(maxWarningMessage);
			} else if (numberMin > numberMax && document.activeElement.id === "award-amount_min") {
				setShowWarning(showWarning);
				setWarningMessage(minWarningMessage);
			}
		};
		useEffect(() => {
			verifyNumberLogic();
		}, [min, max]);
		let disabled = !min && min !== 0 && !max && max !== 0;
		if (showWarning) disabled = true;
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
			className: "specific-award-amount",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
				className: "specific-award-amount-wrapper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
						className: "specific-award-amount-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", {
							className: "award-amount-label",
							children: "MINIMUM AMOUNT"
						}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("input", {
							type: "number",
							placeholder: "No minimum",
							step: "none",
							className: showWarning ? "specific-amount-warning specific-award-min" : "specific-award-min",
							value: min,
							onChange: minChange,
							ref: minInput,
							onFocus: verifyNumberLogic,
							id: "award-amount_min"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
						className: "specific-award-amount-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", {
							className: "award-amount-label",
							children: "MAXIMUM AMOUNT"
						}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("input", {
							type: "number",
							placeholder: "No maximum",
							step: "none",
							className: showWarning ? "specific-amount-warning specific-award-max" : "specific-award-max",
							value: max,
							onChange: maxChange,
							ref: maxInput,
							onFocus: verifyNumberLogic,
							id: "award-amount_max"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(sc, {
						additionalClassnames: "award-amount-submit",
						copy: "Add",
						buttonTitle: "Filter by custom award amount range",
						buttonSize: "sm",
						buttonType: "primary",
						backgroundColor: "light",
						disabled,
						onClick: searchRange
					})
				]
			}), showWarning && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
				className: "award-amount-warning",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", {
					className: "award-amount__invalid",
					children: "Invalid search"
				}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("li", { children: warningMessage }) })]
			})]
		});
	};
	SpecificAwardAmountItem.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/components/search/filters/awardAmount/SelectedAwardAmountBound.jsx
var import_jsx_runtime$25, propTypes$11, SelectedAwardAmountBound;
var init_SelectedAwardAmountBound = __esmMin((() => {
	init_es();
	init_awardAmountHelper();
	init_searchFilterActions();
	init_ShownValue();
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$11 = {
		label: PropTypes.string,
		removeFilter: PropTypes.func,
		name: PropTypes.string
	};
	SelectedAwardAmountBound = ({ awardAmounts }) => {
		const dispatch = useDispatch();
		const stagedFilters = [];
		awardAmounts.forEach((value, key) => {
			const label = formatAwardAmountRange(value);
			const removeFilter = () => {
				const newValue = awardAmounts.delete(key);
				dispatch(updateGenericFilter({
					type: "awardAmounts",
					value: newValue
				}));
			};
			stagedFilters.push(/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(ShownValue, {
				label,
				removeValue: removeFilter
			}));
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(import_jsx_runtime$25.Fragment, { children: stagedFilters });
	};
	SelectedAwardAmountBound.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/components/search/filters/awardAmount/AwardAmountSearch.jsx
var import_jsx_runtime$24, AwardAmountSearch;
var init_AwardAmountSearch = __esmMin((() => {
	init_es();
	init_awardAmount();
	init_awardAmountHelper();
	init_PrimaryCheckboxType();
	init_searchFilterActions();
	init_SpecificAwardAmountItem();
	init_SelectedAwardAmountBound();
	import_jsx_runtime$24 = require_jsx_runtime();
	AwardAmountSearch = () => {
		const awardAmounts = useSelector((state) => state.filters.awardAmounts);
		const dispatch = useDispatch();
		const toggleSelection = ({ value: key }) => {
			let newValue = awardAmounts.has(key) ? awardAmounts.delete(key) : awardAmounts.set(key, awardRanges[key]);
			if (newValue.has("specific")) newValue = newValue.delete("specific");
			dispatch(updateGenericFilter({
				type: "awardAmounts",
				value: newValue
			}));
		};
		const searchSpecificRange = (selections) => {
			const min = selections[0];
			const max = selections[1];
			dispatch(updateAwardAmounts({ value: [min, max] }));
		};
		const awardAmountCheckboxes = () => reduce(awardRanges, (result, value, key) => {
			const name = formatAwardAmountRange(value, 0);
			result.push(/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(PrimaryCheckboxType, {
				id: `award-${key}`,
				name,
				value: key,
				filterType: "Award Amount",
				types: awardRanges,
				selectedCheckboxes: awardAmounts,
				toggleCheckboxType: toggleSelection
			}, key));
			return result;
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
			className: "award-amount-filter",
			children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "search-filter checkbox-type-filter",
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
					className: "filter-item-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("ul", {
						className: "award-amounts checkbox-types",
						children: [awardAmountCheckboxes(), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SpecificAwardAmountItem, { searchSpecificRange })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
						className: "selected-filters",
						role: "status",
						children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SelectedAwardAmountBound, { awardAmounts })
					})]
				})
			})
		});
	};
}));
//#endregion
//#region src/js/containers/search/filters/naics/NAICSCheckboxTree.jsx
var import_jsx_runtime$23, NAICSCheckboxTree;
var init_NAICSCheckboxTree = __esmMin((() => {
	init_es();
	init_axios();
	init_naicsHelper();
	init_checkboxTreeHelper();
	init_searchHelper();
	init_naicsActions();
	init_searchFilterActions();
	init_CheckboxTree();
	init_EntityDropdownAutocomplete();
	import_jsx_runtime$23 = require_jsx_runtime();
	NAICSCheckboxTree = () => {
		const [isError, setIsError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const [isSearch, setIsSearch] = useState(false);
		const [searchString, setSearchString] = useState("");
		const [showNoResults, setShowNoResults] = useState(false);
		const nodes = useSelector((state) => state.naics.naics.toJS());
		const expanded = useSelector((state) => state.naics.expanded.toJS());
		const searchExpanded = useSelector((state) => state.naics.searchExpanded.toJS());
		const checked = useSelector((state) => state.naics.checked.toJS());
		const unchecked = useSelector((state) => state.naics.unchecked.toJS());
		const counts = useSelector((state) => state.naics.counts.toJS());
		const { require: checkedFromHash, exclude: uncheckedFromHash, counts: countsFromHash } = useSelector((state) => state.appliedFilters.filters.naicsCodes);
		const { require: checkedStaged, exclude: uncheckedStaged } = useSelector((state) => state.filters.naicsCodes);
		const request = useRef(null);
		const dispatch = useDispatch();
		const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
			const newChecked = expandedLocal.filter((expandedNode) => {
				if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
				return !!checkedLocal.includes(expandedNode);
			}).map((node) => removePlaceholderString(node)).reduce((acc, expandedAndChecked) => {
				const node = getNaicsNodeFromTree(nodesLocal, expandedAndChecked);
				return [...acc, ...getAllDescendants(node)];
			}, []);
			return /* @__PURE__ */ new Set([...checkedLocal, ...newChecked]);
		};
		const fetchNAICS = (param = "", resolveLoading = true) => {
			if (request.current) request.current.cancel();
			if (showNoResults) setShowNoResults(false);
			setIsLoading(true);
			const queryParam = isSearch ? `?filter=${searchString}` : param;
			request.current = naicsRequest(queryParam);
			const isPartialTree = param !== "" || isSearch;
			return request.current.promise.then(({ data }) => {
				const naicsNodes = cleanNaicsData(data.results);
				if (isPartialTree) {
					const key = param.includes("/") ? param.split("/")[1] : param;
					if (isSearch) {
						const searchExpandedNodes = expandNaicsAndAllDescendantParents(naicsNodes, "naics");
						dispatch(setSearchedNaics(naicsNodes));
						dispatch(setExpandedNaics(searchExpandedNodes, "SET_SEARCHED_EXPANDED"));
						if (naicsNodes?.length === 0) setShowNoResults(true);
					} else dispatch(setNaicsNodes(key, naicsNodes));
					let modChecked = [];
					if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
						const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
						const filteredChildren = naicsNodes[0].children.filter((child) => !child.isPlaceholder).map((child) => child.value);
						modChecked = [...filteredChecked, ...filteredChildren];
						if (!checked.includes(key)) modChecked = [...modChecked, key];
					}
					const newChecked = modChecked?.length ? autoCheckNaicsAfterExpand(naicsNodes[0], modChecked, unchecked) : checked;
					dispatch(setCheckedNaics(newChecked));
				} else dispatch(setNaicsNodes(param, naicsNodes));
				setIsLoading(resolveLoading ? false : isLoading);
				setIsError(false);
				setErrorMessage("");
				request.current = null;
			}).catch((e) => {
				if (!isCancel(e)) {
					console.log("Error NAICS Reponse : ", e);
					setIsError(true);
					setErrorMessage(e.message);
					setIsLoading(false);
				}
				request.current = null;
			});
		};
		const onClear = () => {
			if (request.current) request.current.cancel();
			dispatch(setExpandedNaics([], "SET_SEARCHED_EXPANDED"));
			setIsSearch(false);
			setSearchString("");
			setIsLoading(false);
			setShowNoResults(false);
			dispatch(showNaicsTree());
		};
		const onSearchChange = debounce(() => {
			if (!searchString) onClear();
			fetchNAICS();
		}, 500);
		const onCheck = (newChecked) => {
			const stateNewChecked = newChecked?.length > 1 ? newChecked.filter((id) => !id.includes("children_of_")) : newChecked;
			const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(stateNewChecked, checked, unchecked, nodes, counts);
			dispatch(setNaicsCounts(newCounts));
			dispatch(setCheckedNaics(newChecked));
			dispatch(setUncheckedNaics(newUnchecked));
			dispatch(updateNaics(stateNewChecked, newUnchecked, newCounts));
		};
		const onUncheck = (newChecked, uncheckedNode) => {
			if (uncheckedNode.checked) onCheck(newChecked);
			else {
				const [newCounts, newUnchecked] = decrementNaicsCountAndUpdateUnchecked(uncheckedNode, unchecked, checked, counts, nodes);
				dispatch(setUncheckedNaics(newUnchecked));
				dispatch(updateNaics(newChecked, newUnchecked, newCounts));
				dispatch(setCheckedNaics(newChecked));
				dispatch(setNaicsCounts(newCounts));
			}
		};
		const onExpand = (value, expandedArr, fetch) => {
			if (fetch && !isSearch) fetchNAICS(value);
			if (isSearch) dispatch(setExpandedNaics(expandedArr, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedNaics(expandedArr));
		};
		const onCollapse = (expandedArr) => {
			if (isSearch) dispatch(setExpandedNaics(expandedArr, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedNaics(expandedArr));
		};
		const handleTextInputChange = (e) => {
			e.persist();
			const text = e.target.value;
			if (!text) onClear();
			setSearchString(text);
			if (text.length >= 2) {
				setIsSearch(true);
				setIsLoading(true);
			}
		};
		useEffect(() => {
			if (nodes.length !== 0) dispatch(showNaicsTree());
			else fetchNAICS().then(() => {
				if (checkedFromHash.length > 0 && checked.length === 0) {
					dispatch(setNaicsCounts(countsFromHash));
					return getAllUniqueAncestors([...checkedFromHash, ...uncheckedFromHash]).reduce((prevPromise, ancestor) => prevPromise.then(() => fetchNAICS(ancestor, false)), Promise.resolve()).catch((e) => {
						setIsLoading(false);
						setIsError(true);
						setErrorMessage(get(e, "message", "Error fetching NAICs."));
					});
				}
				return Promise.resolve();
			});
			return () => {
				if (request.current) request.current.cancel();
				dispatch(showNaicsTree());
			};
		}, []);
		useEffect(() => {
			if (isSearch && isLoading) onSearchChange();
		}, [searchString, isSearch]);
		useEffect(() => {
			if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
				let checkedArray = checkedFromHash;
				let uncheckedArray = uncheckedFromHash;
				if (!checked.length && checkedStaged.length) {
					if (!stateEqualityCheck(checkedFromHash, checkedStaged)) {
						checkedArray = checkedStaged;
						uncheckedArray = uncheckedStaged;
					}
					const autoChecked = autoCheckResultDescendants(checkedArray, expandNaicsAndAllDescendantParents(nodes, "naics"), nodes);
					dispatch(setCheckedNaics(autoChecked));
					dispatch(setExpandedNaics(getAllUniqueAncestors([...checkedArray, ...uncheckedArray])));
				}
			}
		}, [
			nodes,
			checkedFromHash,
			checkedStaged,
			checked
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
			className: "search-option",
			children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
				className: "naics-search-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(EntityDropdownAutocomplete, {
					placeholder: "Type at least 2 letters...",
					searchString,
					enabled: true,
					handleTextInputChange,
					context: {},
					loading: false,
					isClearable: true,
					onClear,
					searchIcon: true
				}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(CheckboxTree, {
					limit: 3,
					data: getFormatedNaicsDataForCheckboxTree(nodes),
					isError,
					errorMessage,
					isLoading,
					noResults: showNoResults,
					checked,
					expanded: isSearch ? searchExpanded : expanded,
					searchString,
					onExpand,
					onCollapse,
					onUncheck,
					onCheck
				})]
			})
		});
	};
}));
//#endregion
//#region src/js/containers/search/filters/psc/PSCCheckboxTreeContainer.jsx
var import_jsx_runtime$22, PSCCheckboxTreeContainer;
var init_PSCCheckboxTreeContainer = __esmMin((() => {
	init_axios();
	init_es();
	init_pscHelper();
	init_searchHelper();
	init_checkboxTreeHelper();
	init_searchFilterActions();
	init_CheckboxTree();
	init_EntityDropdownAutocomplete();
	init_pscActions();
	import_jsx_runtime$22 = require_jsx_runtime();
	PSCCheckboxTreeContainer = () => {
		const nodes = useSelector((state) => state.psc.psc.toJS());
		const expanded = useSelector((state) => state.psc.expanded.toJS());
		const searchExpanded = useSelector((state) => state.psc.searchExpanded.toJS());
		const checked = useSelector((state) => state.psc.checked.toJS());
		const unchecked = useSelector((state) => state.psc.unchecked.toJS());
		const counts = useSelector((state) => state.psc.counts.toJS());
		const { require: checkedFromHash, exclude: uncheckedFromHash, counts: countsFromHash } = useSelector((state) => state.appliedFilters.filters.pscCodes);
		const { require: checkedStaged, exclude: uncheckedStaged } = useSelector((state) => state.filters.pscCodes);
		const dispatch = useDispatch();
		const [isLoading, setIsLoading] = useState(false);
		const [isSearch, setIsSearch] = useState(false);
		const [searchString, setSearchString] = useState("");
		const [isError, setIsError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [showNoResults, setShowNoResults] = useState(false);
		const request = useRef(null);
		const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
			const newChecked = expandedLocal.filter((expandedNode) => {
				if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
				return !!checkedLocal.includes(expandedNode);
			}).map((node) => removePlaceholderString(node)).reduce((acc, expandedAndChecked) => {
				const node = getPscNodeFromTree(nodesLocal, expandedAndChecked);
				return [...acc, ...getAllDescendants(node)];
			}, []);
			return /* @__PURE__ */ new Set([...checkedLocal, ...newChecked]);
		};
		const fetchPscLocal = (id = "", searchStr = "", resolveLoadingIndicator = true) => {
			if (request.current) request.current.cancel();
			if (showNoResults) setShowNoResults(false);
			setIsLoading(true);
			const queryParam = isSearch && searchStr.length > 0 ? `?depth=-1&filter=${searchStr}` : id;
			request.current = fetchPsc(queryParam);
			const isPartialTree = id !== "" || isSearch;
			return request.current.promise.then(({ data }) => {
				const pscNodes = cleanPscData(data.results);
				if (isPartialTree) {
					const key = id.includes("/") ? id.split("/").pop() : id;
					if (isSearch) {
						const searchExpandedNodes = expandPscNodeAndAllDescendantParents(pscNodes);
						dispatch(setSearchedPsc(pscNodes));
						dispatch(setExpandedPsc(searchExpandedNodes, "SET_SEARCHED_EXPANDED"));
						if (pscNodes.length === 0) setShowNoResults(true);
					} else dispatch(setPscNodes(key, pscNodes));
					let modChecked = [];
					if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
						modChecked = [...checked.filter((ch) => ch !== `children_of_${key}`), ...pscNodes.map((child) => child.value)];
						if (!checked.includes(key)) modChecked = [...modChecked, key];
					}
					const newChecked = modChecked?.length ? autoCheckPscAfterExpand({
						children: pscNodes,
						value: key
					}, modChecked, unchecked) : checked;
					dispatch(setCheckedPsc(newChecked));
				} else dispatch(setPscNodes("", pscNodes));
				setIsLoading(resolveLoadingIndicator ? false : isLoading);
				request.current = null;
			}).catch((e) => {
				if (!isCancel(e)) {
					console.log("error fetching PSC", e);
					setIsError(true);
					setIsLoading(false);
					setErrorMessage(get(e, "message", "Error fetching PSC."));
				}
				request.current = null;
			});
		};
		const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
			const treeDepth = selectedNode.ancestors?.length;
			if (shouldFetchChildren && !isSearch) if (treeDepth >= 1) if (treeDepth === 2) fetchPscLocal(`${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`);
			else fetchPscLocal(`${selectedNode.ancestors[0]}/${expandedValue}`);
			else fetchPscLocal(expandedValue);
			if (isSearch) dispatch(setExpandedPsc(newExpandedArray, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedPsc(newExpandedArray));
		};
		const onCheck = (newChecked) => {
			const [newCounts, newUnchecked] = incrementPscCountAndUpdateUnchecked(newChecked?.length > 1 ? newChecked.filter((id) => !id.includes("children_of_")) : newChecked, checked, unchecked, nodes, counts);
			dispatch(setCheckedPsc(newChecked));
			dispatch(setPscCounts(newCounts));
			dispatch(setUncheckedPsc(newUnchecked));
			dispatch(updatePSC(trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)), getPscAncestryPathForChecked(newUnchecked, nodes), newCounts));
		};
		const onUncheck = (newChecked, uncheckedNode) => {
			const [newCounts, newUnchecked] = decrementPscCountAndUpdateUnchecked(uncheckedNode, unchecked, checked, counts, nodes);
			dispatch(setCheckedPsc(newChecked));
			dispatch(setPscCounts(newCounts));
			dispatch(setUncheckedPsc(newUnchecked));
			dispatch(updatePSC(trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)), getPscAncestryPathForChecked(newUnchecked, nodes), newCounts));
		};
		const onClear = () => {
			if (request.current) request.current.cancel();
			dispatch(setExpandedPsc([], "SET_SEARCHED_EXPANDED"));
			dispatch(showPscTree());
			setIsSearch(false);
			setSearchString("");
			setIsLoading(false);
			setIsError(false);
			setErrorMessage("");
			setShowNoResults(false);
		};
		const onSearchChange = debounce(() => {
			if (!searchString) onClear();
			fetchPscLocal("", searchString);
		}, 500);
		const onCollapse = (newExpandedArray) => {
			if (isSearch) dispatch(setExpandedPsc(newExpandedArray, "SET_SEARCHED_EXPANDED"));
			else dispatch(setExpandedPsc(newExpandedArray));
		};
		const handleTextInputChange = (e) => {
			e.persist();
			const text = e.target.value;
			if (!text) onClear();
			setSearchString(text);
			if (text.length >= 2) {
				setIsSearch(true);
				setIsLoading(true);
			}
		};
		useEffect(() => {
			if (nodes.length !== 0) dispatch(showPscTree());
			else fetchPscLocal().then(() => {
				if (checkedFromHash.length > 0) {
					dispatch(setPscCounts(countsFromHash));
					return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash).reduce((prevPromise, param) => prevPromise.then(() => fetchPscLocal(param, null, false)), Promise.resolve([])).catch((e) => {
						setIsLoading(false);
						setIsError(true);
						setErrorMessage(get(e, "message", "Error fetching PSC."));
					});
				}
				return Promise.resolve();
			});
			return () => {
				if (request.current) request.current.cancel();
				dispatch(showPscTree());
			};
		}, []);
		useEffect(() => {
			if (isSearch && isLoading) onSearchChange();
		}, [isSearch, searchString]);
		useEffect(() => {
			if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
				let checkedArray = checkedFromHash;
				let uncheckedArray = uncheckedFromHash;
				if (!checked.length && checkedStaged.length) {
					if (!stateEqualityCheck(checkedFromHash, checkedStaged)) {
						checkedArray = checkedStaged;
						uncheckedArray = uncheckedStaged;
					}
					let autoChecked = autoCheckResultDescendants(checkedArray.map((ancestor) => {
						if (ancestor.includes("/")) return ancestor.split("/")[1];
						return ancestor;
					}), expanded, nodes);
					const allUniqueAncestors = getUniqueAncestorPaths(checkedArray, uncheckedArray);
					autoChecked = Array.from(autoChecked, (check) => check.at(-1));
					const toExpand = allUniqueAncestors.map((ancestor) => {
						if (ancestor.includes("/")) return ancestor.split("/")[1];
						return ancestor;
					});
					dispatch(setCheckedPsc(autoChecked));
					dispatch(setExpandedPsc(toExpand));
				}
			}
		}, [
			nodes,
			checkedFromHash,
			checkedStaged,
			checked
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
			className: "search-option",
			children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "psc-search-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(EntityDropdownAutocomplete, {
					placeholder: "Type at least 2 letters...",
					searchString,
					enabled: true,
					handleTextInputChange,
					context: {},
					isClearable: true,
					loading: false,
					onClear,
					searchIcon: true
				}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CheckboxTree, {
					isError,
					errorMessage,
					isLoading,
					data: nodes,
					checked,
					searchString,
					noResults: showNoResults,
					expanded: isSearch ? searchExpanded : expanded,
					isSearch,
					onUncheck,
					onCheck,
					onExpand,
					onCollapse
				})]
			})
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/PricingType.jsx
/**
* PricingType.jsx
* Created by Emily Gullo on 6/22/17
*/
var import_jsx_runtime$21, PricingType;
var init_PricingType = __esmMin((() => {
	init_es();
	init_contractFields();
	init_ListCheckbox();
	init_searchFilterActions();
	import_jsx_runtime$21 = require_jsx_runtime();
	PricingType = () => {
		const pricingType = useSelector((state) => state.filters.pricingType);
		const dispatch = useDispatch();
		return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ListCheckbox, {
			filterCategoryMapping: pricingTypeMapping,
			filters: pricingTypeDefinitions,
			selectedFilters: pricingType,
			singleFilterChange: useCallback((selection) => {
				dispatch(updatePricingType(selection));
			}, [dispatch])
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/SetAside.jsx
/**
* SetAside.jsx
* Created by Emily Gullo on 6/22/17
*/
var import_jsx_runtime$20, SetAside;
var init_SetAside = __esmMin((() => {
	init_es();
	init_contractFields();
	init_ListCheckbox();
	init_searchFilterActions();
	import_jsx_runtime$20 = require_jsx_runtime();
	SetAside = () => {
		const setAside = useSelector((state) => state.filters.setAside);
		const dispatch = useDispatch();
		return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ListCheckbox, {
			filterCategoryMapping: setAsideTypeMapping,
			filters: setAsideDefinitions,
			selectedFilters: setAside,
			singleFilterChange: useCallback((selection) => {
				dispatch(updateSetAside(selection));
			}, [dispatch])
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/ExtentCompeted.jsx
/**
* ExtentCompeted.jsx
* Created by Emily Gullo on 6/22/17
*/
var import_jsx_runtime$19, ExtentCompeted;
var init_ExtentCompeted = __esmMin((() => {
	init_es();
	init_ListCheckbox();
	init_contractFields();
	init_searchFilterActions();
	import_jsx_runtime$19 = require_jsx_runtime();
	ExtentCompeted = () => {
		const extentCompeted = useSelector((state) => state.filters.extentCompeted);
		const dispatch = useDispatch();
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(ListCheckbox, {
			filterCategoryMapping: extentCompetedTypeMapping,
			filters: extentCompetedDefinitions,
			selectedFilters: extentCompeted,
			singleFilterChange: useCallback((selection) => {
				dispatch(updateExtentCompeted(selection));
			}, [dispatch])
		});
	};
}));
//#endregion
//#region src/js/containers/search/filters/cfda/CFDASearchContainer.jsx
/**
* CFDASearchContainer.jsx
* Created by Emily Gullo 07/10/2017
**/
var import_jsx_runtime$18, CFDASearchContainer;
var init_CFDASearchContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_searchHelper();
	init_replaceString();
	init_searchFilterActions();
	init_AutocompleteWithCheckboxList();
	init_ShownValue();
	import_jsx_runtime$18 = require_jsx_runtime();
	CFDASearchContainer = () => {
		const [cfdaSearchString, setCfdaSearchString] = useState("");
		const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);
		const cfdaSearchRequest = useRef(null);
		const dispatch = useDispatch();
		const highlightText = (text) => replaceString(text, cfdaSearchString, "bold-highlight");
		const toggleCFDA = ({ value }) => {
			const cfda = autocompleteCFDA.find((c) => c.data.program_number === value);
			if (cfda) dispatch(updateSelectedCFDA({ cfda: cfda.data }));
			const updatedSelected = [];
			if (selectedCFDA?.size > 0) selectedCFDA.forEach((scfda) => {
				if (scfda.program_number !== value.program_number) updatedSelected.push(scfda);
			});
			else updatedSelected.push(value);
		};
		const parseAutocompleteCFDA = (cfda) => {
			const values = [];
			if (cfda && cfda.length > 0) cfda.forEach((item) => {
				const title = `${item.program_number} - ${item.program_title}`;
				values.push({
					title: highlightText(title),
					subtitle: "",
					data: item,
					value: item.program_number,
					key: item.program_number
				});
			});
			setAutocompleteCFDA(values);
		};
		const queryAutocompleteCFDA = () => {
			setNoResults(false);
			if (cfdaSearchRequest.current) cfdaSearchRequest.current.cancel();
			const cfdaSearchParams = {
				search_text: cfdaSearchString,
				limit: 1e3
			};
			setIsLoading(true);
			cfdaSearchRequest.current = fetchCFDA(cfdaSearchParams);
			cfdaSearchRequest.current.promise.then((res) => {
				const autocompleteData = res.data.results;
				setErrorMessage("");
				setNoResults(autocompleteData.length === 0);
				parseAutocompleteCFDA(autocompleteData);
				setIsLoading(false);
			}).catch((err) => {
				if (!isCancel(err)) {
					setErrorMessage(err.message);
					setIsLoading(false);
				}
			});
		};
		const handleTextInputChange = useCallback((e) => {
			setCfdaSearchString(e.target.value);
		}, []);
		const handleSearchClear = () => {
			setCfdaSearchString("");
			setAutocompleteCFDA([]);
		};
		const handleClearAll = () => {
			selectedCFDA.forEach((cfda) => {
				dispatch(updateSelectedCFDA({ cfda }));
			});
			handleSearchClear();
		};
		const toggleAll = (selectAll) => {
			const selectedArray = selectedCFDA.toArray();
			if (selectAll) {
				let filteredList = autocompleteCFDA;
				if (selectedArray?.length) filteredList = autocompleteCFDA.filter((cfda) => !selectedArray.some((c) => c.program_number === cfda.data.program_number));
				filteredList.forEach((fcfda) => {
					dispatch(updateSelectedCFDA({ cfda: fcfda.data }));
				});
			} else selectedCFDA.forEach((cfda) => {
				dispatch(updateSelectedCFDA({ cfda }));
			});
		};
		useEffect(() => {
			if (cfdaSearchString?.length >= 3) queryAutocompleteCFDA();
			else if (cfdaSearchString?.length === 0) setNoResults(false);
		}, [cfdaSearchString]);
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "cfda-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(AutocompleteWithCheckboxList, {
				filterType: "Assistance Listings",
				handleTextInputChange,
				onSearchClear: handleSearchClear,
				onClearAll: handleClearAll,
				searchString: cfdaSearchString,
				filters: autocompleteCFDA,
				selectedFilters: selectedCFDA,
				toggleSingleFilter: toggleCFDA,
				toggleAll,
				noResults,
				errorMessage,
				isLoading,
				limit: 1e3
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "selected-filters",
				role: "status",
				children: Array.from(selectedCFDA).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ShownValue, {
					label: `${value.program_number} | ${value.program_title}`,
					removeValue: () => dispatch(updateSelectedCFDA({ cfda: value }))
				}, key))
			})]
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/defc/DEFCheckboxTreeLabelv2.jsx
var import_jsx_runtime$17, parseAcronym, DEFCheckboxTreeLabel;
var init_DEFCheckboxTreeLabelv2 = __esmMin((() => {
	init_replaceString();
	import_jsx_runtime$17 = require_jsx_runtime();
	parseAcronym = (str) => {
		const parsedStr = str.replace("P.L.", "Public Law");
		if (parsedStr.includes("P.L.")) return parseAcronym(parsedStr);
		return parsedStr;
	};
	DEFCheckboxTreeLabel = ({ label, subLabel, value, defSearchString }) => {
		const highlightText = (text) => replaceString(text, defSearchString, "highlight");
		if (label.includes("|")) {
			const labels = label.split("|");
			const subLabels = subLabel.split("|");
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "checkbox-tree-label",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "checkbox-tree-label__value-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "checkbox-tree-label__value-container-value",
						children: value
					})
				}), labels.map((lbl, i) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "checkbox-tree-label__label multiple-label",
					children: [highlightText(lbl), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: highlightText(parseAcronym(subLabels[i])) }),
						/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("br", {})
					] })]
				}, uniqueId(i)))]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			className: "checkbox-tree-label",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "checkbox-tree-label__value-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "checkbox-tree-label__value-container-value",
					children: value
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "checkbox-tree-label__label",
				children: [highlightText(label), subLabel && /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("br", {}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: highlightText(parseAcronym(subLabel)) })] })]
			})]
		});
	};
	DEFCheckboxTreeLabel.propTypes = {
		label: PropTypes.string,
		subLabel: PropTypes.string,
		value: PropTypes.string
	};
}));
//#endregion
//#region src/js/containers/search/filters/def/DEFCheckboxTreeContainer.jsx
/**
* DEFCheckboxTreeContainer.jsx
* Created by Andrea Blackwell 1/8/2025
*/
var import_jsx_runtime$16, DEFCheckboxTreeContainer;
var init_DEFCheckboxTreeContainer = __esmMin((() => {
	init_dist();
	init_es();
	init_searchFilterActions();
	init_WithDefCodes();
	init_AccordionCheckbox();
	init_DEFCheckboxTreeLabelv2();
	init_defCodes();
	import_jsx_runtime$16 = require_jsx_runtime();
	DEFCheckboxTreeContainer = () => {
		const [defSearchString, setDefSearchString] = useState("");
		const [errorMsg, isLoading, defCodes] = useDefCodes();
		const selectedDefCodes = useSelector((state) => state.filters.defCode);
		const dispatch = useDispatch();
		const titlesByCode = (codes) => codes.reduce((obj, item) => {
			obj[item.code] = item.title;
			return obj;
		}, {});
		const detailsDisplay = (codes) => codes.reduce((obj, item) => {
			obj[item.code] = /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(DEFCheckboxTreeLabel, {
				label: item.title,
				subLabel: item.public_law,
				value: item.code,
				defSearchString
			});
			return obj;
		}, {});
		const toggleDefc = (selection) => {
			dispatch(toggleDefCode(selection));
		};
		const bulkChangeDefc = (selection) => {
			dispatch(bulkDefCodeChange(selection));
		};
		const loadingIndicator = /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "defc-filter-message-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(FontAwesomeIcon, {
				icon: "spinner",
				spin: true
			}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "defc-filter-message-container__text",
				children: "Loading your data..."
			})]
		});
		useEffect(() => {
			detailsDisplay(defCodes);
		}, [defSearchString, defCodes]);
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "def-code-filter",
			children: [isLoading && loadingIndicator, defCodes?.length > 0 && !isLoading && !errorMsg && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(AccordionCheckbox, {
				filterCategoryMapping: defcDataByType(defCodes),
				filters: titlesByCode(defCodes),
				customLabels: detailsDisplay(defCodes),
				selectedFilters: selectedDefCodes,
				singleFilterChange: toggleDefc,
				bulkFilterChange: bulkChangeDefc,
				setDefSearchString
			})]
		});
	};
}));
//#endregion
//#region src/js/components/search/filters/description/AwardDescriptionFilter.jsx
var import_jsx_runtime$15, propTypes$10, AwardDescriptionFilter;
var init_AwardDescriptionFilter = __esmMin((() => {
	init_index_es();
	init_ShownValue();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$10 = {
		applyAwardDescription: PropTypes.func,
		awardDescription: PropTypes.string,
		inputChangeHandler: PropTypes.func,
		selectedAwardDescription: PropTypes.object,
		removeAwardDescription: PropTypes.func
	};
	AwardDescriptionFilter = ({ applyAwardDescription, awardDescription, inputChangeHandler, selectedAwardDescription, removeAwardDescription }) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
		className: "filter-item-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			className: "award-description-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("form", {
				onSubmit: applyAwardDescription,
				className: "award-description-filter__form",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
					className: "award-description-filter__text-field-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("input", {
						id: "search",
						type: "text",
						className: "award-description-filter__text-field",
						placeholder: "Search for a description...",
						value: awardDescription,
						onChange: inputChangeHandler
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(sc, {
					buttonSize: "sm",
					backgroundColor: "light",
					buttonType: "primary",
					copy: "Add",
					additionalClassnames: "award-desscription-filter__add-button",
					buttonTitle: "Filter by award description",
					onClick: applyAwardDescription
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
				className: "selected-filters",
				role: "status",
				children: selectedAwardDescription && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ShownValue, {
					label: selectedAwardDescription,
					removeValue: removeAwardDescription
				}, selectedAwardDescription)
			})]
		})
	});
	AwardDescriptionFilter.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/containers/search/filters/AwardDescriptionFilterContainer.jsx
/**
* AwardDescriptionFilterContainer.jsx
* Created by Josue Aguilar 01/28/2025
*/
var import_jsx_runtime$14, AwardDescriptionFilterContainer;
var init_AwardDescriptionFilterContainer = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_AwardDescriptionFilter();
	import_jsx_runtime$14 = require_jsx_runtime();
	AwardDescriptionFilterContainer = () => {
		const [awardDescription, setAwardDescription] = useState("");
		const dispatch = useDispatch();
		const { awardDescription: selectedAwardDescription } = useSelector((state) => state.filters);
		const applyAwardDescription = (e) => {
			e.preventDefault();
			if (awardDescription.length > 0) dispatch(updateGenericFilter({
				type: "awardDescription",
				value: awardDescription
			}));
			setAwardDescription("");
		};
		const removeAwardDescription = () => {
			dispatch(updateGenericFilter({
				type: "awardDescription",
				value: ""
			}));
		};
		const inputChangeHandler = (e) => {
			setAwardDescription(e.target.value);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(AwardDescriptionFilter, {
			applyAwardDescription,
			awardDescription,
			inputChangeHandler,
			selectedAwardDescription,
			removeAwardDescription
		});
	};
}));
//#endregion
//#region src/js/dataMapping/search/searchFilterCategories.jsx
var import_jsx_runtime$13, searchFilterCategoryTree;
var init_searchFilterCategories = __esmMin((() => {
	init_AwardType();
	init_Agency();
	init_LocationSection();
	init_TimePeriodContainer();
	init_AwardIDSearchContainer();
	init_TASCheckboxTreeContainer();
	init_RecipientSearchContainer();
	init_RecipientType();
	init_AwardAmountSearch();
	init_NAICSCheckboxTree();
	init_PSCCheckboxTreeContainer();
	init_PricingType();
	init_SetAside();
	init_ExtentCompeted();
	init_CFDASearchContainer();
	init_DEFCheckboxTreeContainer();
	init_AwardDescriptionFilterContainer();
	import_jsx_runtime$13 = require_jsx_runtime();
	searchFilterCategoryTree = [
		{
			title: "Recipient",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RecipientSearchContainer, {})
		},
		{
			title: "Award ID",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardIDSearchContainer, {})
		},
		{
			title: "Time Period",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(TimePeriodContainer_default, {})
		},
		{
			title: "Location",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(LocationSection, {})
		},
		{
			title: "Agency",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Agency, {})
		},
		{
			title: "Award Type",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardType, {})
		},
		{
			title: "Recipient Type",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RecipientType, {})
		},
		{
			title: "Award Description",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardDescriptionFilterContainer, {})
		},
		{
			title: "Award Amount",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardAmountSearch, {})
		},
		{
			title: "Assistance Listing",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(CFDASearchContainer, {})
		},
		{
			title: "North American Industry Classification System (NAICS)",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(NAICSCheckboxTree, {})
		},
		{
			title: "Disaster Emergency Fund Code (DEFC)",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DEFCheckboxTreeContainer, {})
		},
		{
			title: "Treasury Account Symbol (TAS)",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(TASCheckboxTree, {})
		},
		{
			title: "Product and Service Code (PSC)",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(PSCCheckboxTreeContainer, {})
		},
		{
			title: "Type of Contract Pricing",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(PricingType, {})
		},
		{
			title: "Type of Set Aside",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(SetAside, {})
		},
		{
			title: "Extent Competed",
			component: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ExtentCompeted, {})
		}
	];
}));
//#endregion
//#region src/js/components/search/filters/keyword/SelectedKeywords.jsx
var import_jsx_runtime$12, propTypes$9, SelectedKeywords;
var init_SelectedKeywords = __esmMin((() => {
	init_es();
	init_ShownValue();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$9 = { toggleKeyword: PropTypes.func };
	SelectedKeywords = ({ toggleKeyword }) => {
		const selectedKeywords = useSelector((state) => state.filters.keyword).toArray();
		let hideTags = "hide";
		if (selectedKeywords.length !== 0) hideTags = "";
		const shownKeywords = selectedKeywords.map((keyword) => {
			const removeValue = () => toggleKeyword(keyword);
			return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ShownValue, {
				label: keyword,
				removeValue
			}, keyword);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: `selected-filters ${hideTags}`,
			id: "selected-keyword-tags",
			role: "status",
			children: shownKeywords
		});
	};
	SelectedKeywords.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/search/filters/keyword/Keyword.jsx
/**
* Keyword.jsx
* Created by Emily Gullo 10/18/2016
**/
var import_jsx_runtime$11, Keyword;
var init_Keyword = __esmMin((() => {
	init_index_es();
	init_es();
	init_searchFilterActions();
	init_SelectedKeywords();
	init_AdvancedSearchTooltip();
	init_ContextTooltip();
	import_jsx_runtime$11 = require_jsx_runtime();
	Keyword = memo(function Keyword() {
		const [value, setValue] = useState("");
		const searchInputRef = useRef(null);
		const dispatch = useDispatch();
		const changedInput = (e) => {
			setValue(e.target.value);
		};
		const searchKeyword = (e) => {
			e.preventDefault();
			if (value !== "") dispatch(updateTextSearchInput(value));
			setValue("");
		};
		const toggleKeyword = (keyword) => {
			if (searchInputRef.current) searchInputRef.current.focus();
			dispatch(updateTextSearchInput(keyword));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "keyword-filter search-filter",
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("form", {
				onSubmit: searchKeyword,
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "filter-item-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							className: "category-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
								className: "category-header--title",
								children: "Filter by Keyword"
							}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ContextTooltip, { tooltip: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(KeyWordTooltip, {}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							className: "keyword-input-wrapper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("input", {
								id: "search",
								type: "text",
								className: "keyword-input",
								placeholder: "Search using keywords...",
								value,
								onChange: changedInput,
								ref: searchInputRef
							}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(sc, {
								copy: "Add",
								buttonTitle: "Add",
								buttonSize: "sm",
								buttonType: "primary",
								backgroundColor: "light",
								disabled: value.length === 0,
								onClick: searchKeyword
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SelectedKeywords, { toggleKeyword })
					]
				})
			})
		});
	});
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/SidebarContentFilterAccordion.jsx
var import_jsx_runtime$10, propTypes$8, SidebarContentFilterAccordion;
var init_SidebarContentFilterAccordion = __esmMin((() => {
	init_Analytics();
	init_Accordion();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$8 = {
		title: PropTypes.string,
		component: PropTypes.element,
		open: PropTypes.object,
		setOpen: PropTypes.func,
		count: PropTypes.number
	};
	SidebarContentFilterAccordion = memo(function SidebarContentFilterAccordion({ title, component, open, setOpen, count }) {
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "search-filters-list",
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Accordion, {
				title,
				setOpen: useCallback(() => {
					Analytics.event({
						event: "dap_event",
						category: "Advanced Search - Filter",
						action: open ? "Filter Close" : "Filter Open",
						label: title.concat(" ", open ? "close" : "open")
					});
					setOpen((prevState) => ({
						...prevState,
						[title]: !prevState[title]
					}));
				}, [
					open,
					setOpen,
					title
				]),
				openObject: open,
				closedIcon: "chevron-down",
				openIcon: "chevron-up",
				contentClassName: open ? "" : "hidden",
				selectedChipCount: count,
				children: open && component
			}, title)
		});
	});
	SidebarContentFilterAccordion.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/SidebarContentFilters.jsx
var import_jsx_runtime$9, propTypes$7, SidebarContentFilters;
var init_SidebarContentFilters = __esmMin((() => {
	init_es();
	init_searchFilterCategories();
	init_filterCheckboxHelper();
	init_Keyword();
	init_SidebarContentFilterAccordion();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$7 = { isMobile: PropTypes.bool };
	SidebarContentFilters = ({ isMobile }) => {
		const [open, setOpen] = useState({
			Location: false,
			"Time Period": true,
			"Award Description": false,
			"Award ID": false,
			"Spending Amount": false,
			"Award Type": false,
			"North American Industry Classification System (NAICS)": false,
			"Product and Service Code (PSC)": false,
			"Type of Contract Pricing": false,
			"Type of Set Aside": false,
			"Extent Competed": false,
			"Assistance Listing": false,
			Recipient: false,
			"Recipient Type": false,
			Agency: false,
			"Treasury Account Symbol (TAS)": false,
			"Disaster Emergency Fund Code (DEFC)": false
		});
		const filterCount = getFilterCount(useSelector((state) => state.filters));
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "collapsible-sidebar--search-filters-list",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Keyword, {}), searchFilterCategoryTree.map(({ title, component }) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SidebarContentFilterAccordion, {
				title,
				component,
				open: open[title],
				setOpen,
				count: filterCount[title],
				isMobile
			}, `toggle-${title}`))]
		});
	};
	SidebarContentFilters.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/SidebarContent.jsx
var import_jsx_runtime$8, propTypes$6, SidebarContent;
var init_SidebarContent = __esmMin((() => {
	init_dist();
	init_SearchSidebarSubmitContainer();
	init_AboutTheDataLink();
	init_SidebarContentFilters();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$6 = {
		sidebarContentHeight: PropTypes.number,
		setShowMobileFilters: PropTypes.func
	};
	SidebarContent = ({ sidebarContentHeight }) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "sidebar-top-submit",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "collapsible-sidebar-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(FontAwesomeIcon, { icon: "filter" }),
				"Filters",
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "link",
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(AboutTheDataLink, {
						slug: "data-elements",
						children: "Learn more about filters"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SearchSidebarSubmitContainer, {})]
	}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
		className: "collapsible-sidebar--main-menu search-filters-wrapper opened",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SidebarContentFilters, { sidebarContentHeight })
	})] });
	SidebarContent.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/MobileSidebarContent.jsx
var import_jsx_runtime$7, propTypes$5, MobileSidebarContent;
var init_MobileSidebarContent = __esmMin((() => {
	init_dist();
	init_index_esm();
	init_index_es();
	init_Icons();
	init_SearchSidebarSubmitContainer();
	init_AboutTheDataLink();
	init_SidebarContentFilters();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$5 = {
		sidebarContentHeight: PropTypes.number,
		setShowMobileFilters: PropTypes.func,
		showMobileFilters: PropTypes.bool
	};
	MobileSidebarContent = ({ sidebarContentHeight, setShowMobileFilters, showMobileFilters }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(import_jsx_runtime$7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)($s, {
			className: `mobile-search-sidebar-v2 ${showMobileFilters ? "sidebar-opened" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Q, {
				id: "mobile-filter-div",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(le, {
					classNames: "mobile-filter",
					timeout: 195,
					exit: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "mobile-filter-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "collapsible-sidebar--main-menu search-filters-wrapper opened",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "sidebar-top-submit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
									className: "collapsible-sidebar-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
										className: "collapsible-sidebar-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
											className: "collapsible-sidebar-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, { icon: "filter" }), "Filters"]
										}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
											className: "sub--header",
											children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
												className: "close-button",
												id: "collapsible-mobile-close-button",
												"aria-label": "Close Filters",
												onClick: () => {
													setShowMobileFilters(false);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Close, { alt: "Close Filters" })
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "link",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AboutTheDataLink, {
											slug: "data-elements",
											children: "Learn more about filters"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SearchSidebarSubmitContainer, { setShowMobileFilters })]
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SidebarContentFilters, { sidebarContentHeight })]
						})
					})
				})
			})
		}) });
	};
	MobileSidebarContent.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/SidebarConstants.js
var NATURAL_LANGUAGE, FILTERS;
var init_SidebarConstants = __esmMin((() => {
	NATURAL_LANGUAGE = "natural language";
	FILTERS = "filters";
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/NLSidebarButtons.jsx
var import_jsx_runtime$6, cyan50v, colorWhite, propTypes$4, NLSidebarButtons;
var init_NLSidebarButtons = __esmMin((() => {
	init_dist();
	init_SidebarConstants();
	init_GlobalConstants();
	import_jsx_runtime$6 = require_jsx_runtime();
	cyan50v = "#0081A1";
	colorWhite = "#FFF";
	propTypes$4 = {
		sidebarContent: PropTypes.string,
		setSidebarContent: PropTypes.func,
		isMedium: PropTypes.bool
	};
	NLSidebarButtons = ({ sidebarContent, setSidebarContent, isMedium }) => {
		if (isMedium || !globalConstants.QAT) return;
		const primaryColorNL = sidebarContent === "natural language" ? cyan50v : colorWhite;
		const secondaryColorNL = sidebarContent === "natural language" ? colorWhite : "transparent";
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "sidebar-nl-buttons-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: `color-overlay-element ${sidebarContent === "natural language" ? " gradient" : ""}` }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					style: { backgroundColor: sidebarContent === "filters" ? colorWhite : "transparent" },
					"aria-label": "Button to change the content of the sidebar to advanced search filters",
					className: `sidebar-nl-buttons ${sidebarContent === "filters" ? "selected" : ""}`,
					onClick: () => setSidebarContent(FILTERS),
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(FontAwesomeIcon, {
						icon: "filter-list",
						color: sidebarContent === "filters" ? cyan50v : colorWhite
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					style: { backgroundColor: secondaryColorNL },
					"aria-label": "Button to change the content of the sidebar to natural language search",
					className: `sidebar-nl-buttons ${sidebarContent === "natural language" ? "selected" : ""}`,
					onClick: () => setSidebarContent(NATURAL_LANGUAGE),
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: secondaryColorNL,
						xmlns: "http://www.w3.org/2000/svg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
								d: "M10.1331 3.06836C10.4348 3.06836 10.7252 3.08021 11.0149 3.11719L9.85571 5.62012C6.85045 5.76811 4.49648 8.17109 4.49634 11.3633C4.49634 14.5556 6.99524 17.1074 10.1213 17.1074C13.0784 17.1074 15.4804 14.8272 15.7219 11.8691L18.2083 10.6729C18.2444 10.8946 18.2444 11.1292 18.2444 11.3633C18.2444 13.1998 17.6654 14.8767 16.6877 16.2695L21.6487 21.2979V21.3105C22.1192 21.8282 22.1193 22.6299 21.6487 23.1475C21.1418 23.6281 20.3568 23.628 19.8499 23.1475L14.925 18.0811C13.5612 19.0671 11.9197 19.6709 10.1213 19.6709C5.63135 19.6709 1.99833 15.9735 1.99829 11.376C1.99829 6.77858 5.63114 3.06859 10.1331 3.06836Z",
								fill: primaryColorNL
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
								fillRule: "evenodd",
								clipRule: "evenodd",
								d: "M12.9221 2.98242C13.0909 2.98263 13.2596 3.09344 13.344 3.24121L13.6819 3.99316L14.8411 6.59375C17.1702 7.69059 17.2188 7.69069 18.0999 8.12207C18.2445 8.18374 18.3527 8.35595 18.3528 8.52832C18.3528 8.70082 18.2446 8.87365 18.0999 8.95996L14.8411 10.4883C13.7668 12.8672 13.7423 12.9166 13.344 13.8164C13.2596 13.9642 13.0909 14.075 12.9221 14.0752C12.7532 14.0752 12.5841 13.9643 12.5237 13.8164C12.3547 13.4343 12.2461 13.1751 12.1858 13.0889V13.0645L11.0022 10.4883L8.47974 9.28027C8.37097 9.21862 8.10527 9.10777 7.74341 8.95996C7.59866 8.87364 7.49048 8.70081 7.49048 8.52832C7.49061 8.35596 7.59878 8.18375 7.74341 8.12207C8.11758 7.94951 8.37111 7.838 8.47974 7.77637L11.0022 6.56836H10.9905C11.0069 6.53278 12.1282 4.09786 12.5237 3.24121C12.584 3.0933 12.7531 2.98242 12.9221 2.98242ZM12.2581 7.16016C12.1132 7.48063 11.8833 7.70268 11.6057 7.85059L10.1096 8.54102L11.5823 9.23145C11.8959 9.36706 12.1133 9.60155 12.2581 9.92188L12.9338 11.4248L13.6096 9.92188C13.7424 9.60148 13.9717 9.37936 14.2854 9.23145L15.7581 8.54102L14.2854 7.85059C13.9718 7.70273 13.7544 7.46884 13.6096 7.18555L12.9338 5.65625L12.2581 7.16016Z",
								fill: primaryColorNL
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
								d: "M18.3528 0.492188C18.4976 0.492188 18.6069 0.578521 18.6672 0.689453L19.2581 2.34082L20.8762 2.94531C20.9846 3.00699 21.0686 3.11792 21.0686 3.26562C21.0686 3.41331 20.9847 3.52429 20.8762 3.58594L19.2581 4.18945L18.6672 5.8418C18.6069 5.95271 18.4976 6.03906 18.3528 6.03906C18.2082 6.03892 18.0996 5.95257 18.0393 5.8418L17.4475 4.18945L15.8665 3.58594C15.7218 3.52431 15.637 3.41339 15.637 3.26562C15.637 3.11783 15.7218 3.00697 15.8665 2.94531L17.4475 2.34082L18.0393 0.689453C18.0996 0.578614 18.2081 0.492333 18.3528 0.492188Z",
								fill: primaryColorNL
							})
						]
					})
				})
			]
		});
	};
	NLSidebarButtons.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/search/collapsibleSidebar/SidebarWrapper.jsx
/**
* SidebarWrapper.jsx
* Created by Andrea Blackwell 11/05/2024
**/
var import_jsx_runtime$5, propTypes$3, SidebarWrapper;
var init_SidebarWrapper = __esmMin((() => {
	init_dist();
	init_useIsMobile();
	init_SidebarContent();
	init_MobileSidebarContent();
	init_NLSidebarButtons();
	init_SidebarConstants();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = { setShowMobileFilters: PropTypes.func };
	SidebarWrapper = React.memo(function SidebarWrapper({ showMobileFilters, setShowMobileFilters, sidebarIsOpen, setSidebarIsOpen }) {
		const { isMedium } = useIsMobile();
		const [sidebarContent, setSidebarContent] = useState(FILTERS);
		const toggleOpened = (e) => {
			e.preventDefault();
			setSidebarIsOpen((prevState) => !prevState);
		};
		const keyHandler = (e, func) => {
			if (e.key === "Enter") func(e);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(NLSidebarButtons, {
			sidebarContent,
			setSidebarContent,
			isMedium
		}), sidebarContent === "filters" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: `search-collapsible-sidebar-container search-sidebar sticky ${sidebarIsOpen ? "opened" : ""} ${showMobileFilters ? "mobile" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "collapsible-sidebar--toggle",
					onClick: (e) => {
						toggleOpened(e);
					},
					onKeyDown: (e) => {
						keyHandler(e, toggleOpened);
					},
					role: "button",
					"aria-label": sidebarIsOpen ? "Close" : "Open",
					focusable: "true",
					tabIndex: 0,
					children: sidebarIsOpen ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, {
						className: "chevron",
						icon: "chevron-left"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, {
						className: "chevron",
						icon: "chevron-right"
					})
				}),
				sidebarIsOpen && !isMedium && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SidebarContent, {}),
				sidebarIsOpen && showMobileFilters && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(MobileSidebarContent, { setShowMobileFilters }),
				!sidebarIsOpen && !isMedium && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					style: { margin: "18px 16px" },
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, {
						title: "Filters",
						icon: "filter"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: `search-collapsible-sidebar-container search-sidebar sticky ${sidebarIsOpen ? "opened" : ""} ${showMobileFilters ? "mobile" : ""}`,
			children: "natural language sidebar goes here"
		})] });
	});
	SidebarWrapper.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/search/mobile/MobileFilterButton.jsx
var import_jsx_runtime$4, pluralizeFilterLabel, propTypes$2, MobileFilterButton;
var init_MobileFilterButton = __esmMin((() => {
	import_jsx_runtime$4 = require_jsx_runtime();
	pluralizeFilterLabel = (count) => {
		if (count === 1) return "Filter";
		return "Filters";
	};
	propTypes$2 = {
		showMobileFilters: PropTypes.bool,
		sidebarOpen: PropTypes.bool,
		toggleMobileFilters: PropTypes.func,
		filterCount: PropTypes.number
	};
	MobileFilterButton = ({ showMobileFilters, sidebarOpen, toggleMobileFilters, filterCount }) => {
		let showCountBadge = "";
		if (filterCount === 0) showCountBadge = "hide";
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: `mobile-filter-button-wrapper ${showMobileFilters && sidebarOpen ? "hidden" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				className: "mobile-filter-button-v2",
				onClick: toggleMobileFilters,
				onKeyUp: (e) => {
					if (e.key === "Escape" && showMobileFilters) toggleMobileFilters();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "mobile-filter-button-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: `mobile-filter-button-count ${showCountBadge}`,
							children: filterCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "mobile-filter-button-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
								className: "usa-da-mobile-filter-icon",
								alt: "Toggle filters",
								"aria-label": "Toggle filters",
								src: "img/Add-search-filters-icon.svg"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "mobile-filter-button-label",
							children: pluralizeFilterLabel(filterCount)
						})
					]
				})
			})
		});
	};
	MobileFilterButton.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/search/FilterAwardToggle.jsx
/**
* SubawardToggle.jsx
* Created by JD House 01/2026
*/
var import_jsx_runtime$3, propTypes$1, FilterAwardToggle;
var init_FilterAwardToggle = __esmMin((() => {
	init_es();
	init_development();
	init_Analytics();
	init_searchViewActions();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		selectedValue: PropTypes.string,
		label: PropTypes.string,
		queryParam: PropTypes.object
	};
	FilterAwardToggle = memo(function FilterAwardToggle({ selectedValue = "awards", label = "View By", queryParam }) {
		const [selected, setSelected] = useState(selectedValue);
		const [searchParams, setSearchParams] = useSearchParams();
		const dispatch = useDispatch();
		useEffect(() => {
			if (window.location.href.includes("subawards") || queryParam) {
				setSelected("subawards");
				dispatch(setSearchViewSubaward("subawards"));
				dispatch(setSpendingLevel("subawards"));
				if (queryParam) setSearchParams(queryParam);
			} else if (!queryParam && selected === "subawards") {
				setSelected("awards");
				dispatch(setSearchViewSubaward("awards"));
				dispatch(setSpendingLevel("awards"));
			}
		}, [
			dispatch,
			queryParam,
			selected,
			setSearchParams
		]);
		const onToggle = useCallback((type) => {
			dispatch(setSpendingLevel(type));
			dispatch(setSearchViewSubaward(type === "subawards"));
			setSelected(type);
			if (type === "subawards") {
				if (!window.location.href.includes("subawards")) {
					searchParams.append("subawards", "true");
					setSearchParams(searchParams);
				}
				Analytics.event({
					event: "search_subaward_dropdown",
					category: "Advanced Search - Search Fields",
					action: "Subawards Search",
					gtm: true
				});
			} else if (window.location.href.includes("subawards")) {
				searchParams.delete("subawards");
				setSearchParams(searchParams);
			}
		}, [
			dispatch,
			searchParams,
			setSearchParams
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "filter-award-toggle__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				className: "filter-award-toggle__label",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "filter-award-toggle__wrapper",
				children: [{
					name: "Prime Awards and Transactions",
					value: "awards"
				}, {
					name: "Subawards",
					value: "subawards"
				}].map((type) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					id: type.name,
					className: `filter-award-toggle__button ${selected === type.value ? "active" : ""}`,
					tabIndex: "0",
					onClick: () => onToggle(type.value),
					onKeyDown: (e) => e.key === "Enter" ? onToggle(type.value) : "",
					children: type.name
				}))
			})]
		});
	});
	FilterAwardToggle.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/search/header/SearchPageToolBarComponents.jsx
var import_jsx_runtime$2, emailSubject, slug, searchPageToolBarComponents;
var init_SearchPageToolBarComponents = __esmMin((() => {
	init_socialShare();
	init_ShareIcon508();
	init_DownloadButton508();
	init_FilterAwardToggle();
	init_NoDownloadHover();
	import_jsx_runtime$2 = require_jsx_runtime();
	emailSubject = "Award Search results on USAspending.gov";
	slug = "search";
	searchPageToolBarComponents = (isMobile, downloadAvailable, downloadInFlight, hash, setShowFullDownload, handleShareDispatch, queryParam) => {
		const toolTipComponent = !downloadAvailable && hash ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(NoDownloadHover, {}) : null;
		/**
		* Shows the full download modal
		*/
		const showDownloadModal = () => {
			setShowFullDownload(true);
		};
		const getSlugWithHash = () => `${slug}${window.location.search}`;
		const handleShare = (name) => {
			handleShareOptionClick(name, getSlugWithHash(), {
				subject: emailSubject,
				body: `View search results for federal awards on USAspending.gov:  ${getBaseUrl(getSlugWithHash())}`
			}, handleShareDispatch);
		};
		return [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FilterAwardToggle, { queryParam }, "FilterAwardToggle"),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DownloadIconButton508, {
				tooltipComponent: toolTipComponent,
				isEnabled: downloadAvailable,
				downloadInFlight,
				onClick: showDownloadModal
			}, "DownloadIconButton"),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ShareIcon508, {
				isEnabled: true,
				url: getBaseUrl(getSlugWithHash()),
				onShareOptionClick: handleShare
			}, "ShareIcon")
		];
	};
}));
//#endregion
//#region src/js/components/search/SearchPage.jsx
/**
* SearchPage.jsx
* * Created by Andrea Blackwell November 4, 2024
* **/
var import_jsx_runtime$1, propTypes, SearchPage;
var init_SearchPage = __esmMin((() => {
	init_Helmet();
	init_es();
	init_useIsMobile();
	init_metaTagHelper();
	init_FullDownloadModalContainer();
	init_PageWrapper();
	init_modalActions();
	init_TooltipContext();
	init_ResultsView();
	init_SidebarWrapper();
	init_MobileFilterButton();
	init_SearchPageToolBarComponents();
	import_jsx_runtime$1 = require_jsx_runtime();
	require_searchPage();
	propTypes = {
		download: PropTypes.object,
		appliedFilters: PropTypes.object,
		downloadAvailable: PropTypes.bool,
		downloadInFlight: PropTypes.bool,
		noFiltersApplied: PropTypes.bool,
		hash: PropTypes.string,
		queryParam: PropTypes.object,
		awardsCount: PropTypes.number,
		transactionsCount: PropTypes.number,
		subawardsCount: PropTypes.number,
		spending_level: PropTypes.array
	};
	SearchPage = ({ download, appliedFilters, downloadAvailable, downloadInFlight, noFiltersApplied, hash, queryParam, awardsCount, transactionsCount, subawardsCount, spending_level }) => {
		const [tooltipData, setTooltipData] = useState({
			top: 0,
			left: 0,
			display: "none",
			tooltip: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, {})
		});
		const [showMobileFilters, setShowMobileFilters] = useState(false);
		const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
		const [filterCount, setFilterCount] = useState(0);
		const [showFullDownload, setShowFullDownload] = useState(false);
		const [stateHash, setStateHash] = useState(hash);
		const dispatch = useDispatch();
		const { isMedium } = useIsMobile();
		const searchContents = useRef(null);
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const toggleMobileFilters = () => {
			setShowMobileFilters((prevState) => !prevState);
		};
		const hideDownloadModal = () => {
			setShowFullDownload(false);
		};
		useEffect(() => {
			setStateHash(hash);
		}, [hash]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "Advanced Search",
			classNames: `usa-da-search-page v2 ${showMobileFilters && sidebarIsOpen ? "fixed-body" : ""}`,
			title: "Advanced Search",
			metaTagProps: getSearchPageMetaTags(stateHash),
			toolBarComponents: searchPageToolBarComponents(isMedium, downloadAvailable, downloadInFlight, hash, setShowFullDownload, handleShareDispatch, queryParam),
			filters: appliedFilters,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				id: "main-content",
				role: "main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "search-contents v2",
					ref: searchContents,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TooltipContext, {
							value: (tt) => setTooltipData(tt),
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarWrapper, {
								hash,
								showMobileFilters,
								setShowMobileFilters,
								sidebarIsOpen,
								setSidebarIsOpen
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "new-tooltip__tooltip-wrapper",
							style: {
								top: tooltipData.top,
								left: tooltipData.left,
								display: tooltipData.display
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "tooltip-wrapper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "tooltip-pointer" }), tooltipData.tooltip]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MobileFilterButton, {
							filterCount,
							showMobileFilters,
							sidebarOpen: sidebarIsOpen,
							toggleMobileFilters
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(HelmetExport, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("link", {
							href: "https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css",
							rel: "stylesheet",
							crossOrigin: "anonymous",
							integrity: "sha384-JnF4GvwrnLggHxx0ORCeHombtPxfqigY/GeEvbdv0Uy5qrCAuAyN3AulKRA+VAPr"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ResultsView, {
							showMobileFilters,
							isMobile: isMedium,
							noFiltersApplied,
							hash,
							setFilterCount
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FullDownloadModalContainer_default, {
					download,
					mounted: showFullDownload,
					hideModal: hideDownloadModal,
					awardsCount,
					transactionsCount,
					subawardsCount,
					spending_level
				})]
			})
		});
	};
	SearchPage.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/search/useRequestDownloadCount.jsx
var spendingLevels, combine, useRequestDownloadCount;
var init_useRequestDownloadCount = __esmMin((() => {
	init_modern();
	init_downloadHelper();
	init_searchHelper();
	init_SearchAwardsOperation();
	spendingLevels = [
		{
			level: "awards",
			auditText: "Awards"
		},
		{
			level: "subawards",
			auditText: "Subawards"
		},
		{
			level: "transactions",
			auditText: "Transactions"
		}
	];
	combine = (results) => ({
		data: results.map((result) => result?.data?.data?.calculated_count || 0),
		downloadInFlight: results.some((result) => result.isLoading)
	});
	useRequestDownloadCount = (filters, hash, areAppliedFiltersEmpty, spendingLevel) => {
		const operation = new SearchAwardsOperation();
		operation.fromState(filters);
		const { data, downloadInFlight } = useQueries({
			queries: spendingLevels.map(({ level, auditText }) => {
				if (level === "subawards") delete operation.dateType;
				const searchParams = operation.toParams();
				return {
					queryKey: [
						"requestDownloadCount",
						level,
						searchParams
					],
					queryFn: () => requestDownloadCount({
						filters: searchParams,
						spending_level: level,
						auditTrail: `Download Availability Count ${auditText}`
					}).promise,
					staleTime: Infinity,
					refetchOnWindowFocus: false,
					enabled: (!areFiltersEqual(filters) || !hash) && !areAppliedFiltersEmpty
				};
			}),
			combine
		});
		const [awardsCount, subawardsCount, transactionsCount] = data;
		const downloadAvailable = () => {
			if ((awardsCount === 0 || awardsCount >= 5e5) && (transactionsCount === 0 || transactionsCount >= 5e5) && (spendingLevel === "awards" || subawardsCount === 0 || subawardsCount >= 5e5)) return false;
			else if (awardsCount !== 0 || transactionsCount !== 0 || spendingLevel === "subawards" && subawardsCount !== 0) return true;
		};
		return {
			awardsCount,
			subawardsCount,
			transactionsCount,
			downloadInFlight,
			downloadAvailable: downloadAvailable()
		};
	};
}));
//#endregion
//#region src/js/containers/search/SearchContainer.jsx
/**
* SearchContainer.jsx
* Created by Kevin Li 5/30/17
*/
var import_jsx_runtime, parseRemoteFilters, SearchContainer, SearchContainerRedirectv2;
//#endregion
__esmMin((() => {
	init_es();
	init_axios();
	init_development();
	init_queryParams();
	init_searchFiltersReducer();
	init_searchHashActions();
	init_searchFilterActions();
	init_appliedFilterActions();
	init_searchHelper();
	init_useQueryParams();
	init_SearchPage();
	init_searchAnalytics();
	init_useRequestDownloadCount();
	import_jsx_runtime = require_jsx_runtime();
	require_searchPage();
	parseRemoteFilters = (data) => {
		const newFilters = data.filters;
		if (data.version !== "2020-06-01") {
			console.info("version mismatch");
			return null;
		}
		const reduxValues = {};
		Object.keys(newFilters).forEach((key) => {
			const value = newFilters[key];
			if (requiredTypes[key]) {
				const ObjType = requiredTypes[key];
				reduxValues[key] = new ObjType(value);
			} else reduxValues[key] = value;
		});
		const events = convertFiltersToAnalyticEvents(reduxValues);
		sendFieldCombinations(events);
		sendAnalyticEvents(events);
		return reduxValues;
	};
	SearchContainer = () => {
		const location = useLocation();
		const { hash: urlHash } = getObjFromQueryParams(location.search);
		const query = useQueryParams();
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const [searchURLParams, setSearchURLParams] = useSearchParams();
		const { filters: stagedFilters, download, appliedFilters: { filters: appliedFilters, _empty: areAppliedFiltersEmpty }, spending_level } = useSelector((state) => state);
		const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
		const [generateHashInFlight, setGenerateHashInFlight] = useState(false);
		const request = useRef(null);
		const areAppliedFiltersEmptyRef = useRef(null);
		const prevAppliedFiltersRef = useRef(null);
		const { awardsCount, subawardsCount, transactionsCount, downloadInFlight, downloadAvailable } = useRequestDownloadCount(appliedFilters, urlHash, areAppliedFiltersEmpty, spendingLevel);
		useEffect(() => {
			areAppliedFiltersEmptyRef.current = areAppliedFiltersEmpty;
			prevAppliedFiltersRef.current = appliedFilters;
		}, [areAppliedFiltersEmpty, appliedFilters]);
		const { current: prevAreAppliedFiltersEmpty } = areAppliedFiltersEmptyRef;
		const { current: prevAppliedFilters } = prevAppliedFiltersRef;
		useEffect(() => {
			if (urlHash && areFiltersEqual(stagedFilters, initialState)) {
				if (request.current) request.current.cancel();
				request.current = restoreUrlHash({ hash: urlHash });
				request.current.promise.then((res) => {
					const filtersInImmutableStructure = parseRemoteFilters(res.data.filter);
					if (filtersInImmutableStructure) {
						dispatch(restoreHashedFilters(filtersInImmutableStructure));
						dispatch(setAppliedFilterEmptiness(false));
					}
					request.current = null;
				}).catch((err) => {
					if (!isCancel(err)) {
						console.error("Error fetching filters from hash: ", err);
						searchURLParams.delete("hash");
						setSearchURLParams(searchURLParams);
						request.current = null;
					}
				});
			} else if (areFiltersSelected(appliedFilters) && areFiltersEmpty(stagedFilters)) dispatch(restoreHashedFilters(appliedFilters));
			else if (!urlHash) {
				dispatch(resetAppliedFilters());
				dispatch(clearAllFilters());
			}
			return () => {
				if (request.current) request.current.cancel();
				dispatch(resetAppliedFilters());
				dispatch(clearAllFilters());
			};
		}, []);
		useEffect(() => {
			if (areAppliedFiltersEmpty && prevAreAppliedFiltersEmpty === false) {
				searchURLParams.delete("hash");
				setSearchURLParams(searchURLParams);
				dispatch(resetAppliedFilters());
				dispatch(clearAllFilters());
			}
		}, [areAppliedFiltersEmpty, urlHash]);
		const generateHash = useCallback(() => {
			if (generateHashInFlight) return;
			setGenerateHashInFlight(true);
			dispatch(setAppliedFilterEmptiness(false));
			request.current = generateUrlHash({
				filters: appliedFilters,
				version: filterStoreVersion
			});
			request.current.promise.then((res) => {
				const newQueryParams = combineQueryParams(query, { hash: res.data.hash });
				navigate(`/search${getQueryParamString(newQueryParams)}`, { replace: true });
				setGenerateHashInFlight(false);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.error(err);
					setGenerateHashInFlight(false);
					request.current = null;
				}
			});
		}, [appliedFilters, generateHashInFlight]);
		useEffect(() => {
			/**
			* Conditions where we generate a new hash:
			* (1) First Search: applied filters have changed & are no longer empty
			* (2) Subsequent Searches: same as above except:
			*      (a) urlHash is present and
			*      (b) previous search was not empty
			* NOTE: additional logic is necessary to avoid
			*      false positive where we're loading a previous hash
			* */
			const filtersChangedAndAreSelected = areFiltersSelected(appliedFilters) && areFiltersDifferent(appliedFilters, prevAppliedFilters);
			if (!urlHash && filtersChangedAndAreSelected || urlHash && filtersChangedAndAreSelected && areFiltersSelected(prevAppliedFilters)) generateHash();
			else if (!urlHash) {
				dispatch(resetAppliedFilters());
				dispatch(clearAllFilters());
			}
		}, [appliedFilters, urlHash]);
		useEffect(() => {
			if (areFiltersDifferent(appliedFilters, stagedFilters) && areFiltersDifferent(prevAppliedFilters, appliedFilters)) dispatch(restoreHashedFilters(appliedFilters));
		}, [appliedFilters, stagedFilters]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPage, {
			download,
			appliedFilters,
			downloadAvailable,
			downloadInFlight,
			noFiltersApplied: areAppliedFiltersEmpty,
			hash: urlHash,
			awardsCount,
			transactionsCount,
			subawardsCount,
			queryParam: location.state,
			spending_level
		});
	};
	SearchContainerRedirectv2 = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
}))();
export { SearchContainerRedirectv2, SearchContainer as default, parseRemoteFilters };
