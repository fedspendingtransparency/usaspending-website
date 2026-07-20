import { n as __esmMin, o as __toESM, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { An as isCancel, Ar as tc, Ba as init_GlobalConstants, C as getFiscalYearsWithLatestAndAll, Cr as lo, Fr as init_dist, Ga as useSelector, Jn as getBaseUrl, Mn as getQueryParamString, Mr as ws, Na as useMatch, Nn as init_queryParams, Oa as init_development, Oi as init_searchFiltersReducer, On as init_Icons, Pa as useNavigate, Pr as FontAwesomeIcon, Qa as init_modern, S as earliestFiscalYear, Si as formatNumberWithPrecision, Sn as InfoCircle, Sr as lc, T as init_fiscalYearHelper, Ta as useQueryParams, Ti as unitValues, Tr as rc, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, _n as ExclamationTriangle, _r as ac, ai as init_BaseStateProfile, ar as Cs, bi as formatMoneyWithUnitsShortLabel, br as fo, da as init_awardType, en as init_modalActions, eo as useQuery, fr as Qs, ga as init_IsMobileContext, ha as IsMobileContext, hi as calculateUnitForSingleValue, ii as BaseStateProfile, ir as $s, jn as combineQueryParams, jr as vs, ka as Link, ki as initialState, kn as init_axios, mi as calculatePercentage, mr as Wo, n as init_Loading, oa as awardTypeGroups, pr as Vs, qa as useDispatch, ro as require_jsx_runtime, sr as Go, t as LoadingWrapper, tn as showModal, tr as init_stickyHeader, v as convertFYToDateRange, vi as formatMoneyWithPrecision, w as getTrailingTwelveMonths, wa as init_useQueryParams, wi as init_moneyFormatter, xr as init_index_es, y as currentFiscalYear, yr as fc, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { D as init_metaTagHelper, F as statePageMetaTags, L as HelmetExport, R as init_Helmet } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_Accordion, t as Accordion } from "./Accordion-DxniQozb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-jDBlqvPj.js";
import { n as init_ResultsTableErrorMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-CPlw0IGY.js";
import { t as require_commonjs } from "./commonjs-CBrKYqL5.js";
import { n as useAgencySlugs, t as init_useAgencySlugs } from "./useAgencySlugs-CKoWB5QX.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-Dzf78LU9.js";
import { c as init_mapHelper, d as pluralize, f as stateCenterFromFips, i as calculateRange, l as mapboxSources, m as visualizationColors, n as useDefCodes, o as firstSymbolId, t as init_WithDefCodes } from "./WithDefCodes-rdyZ-NLw.js";
import { _ as MapBox, g as init_MapFiltersToggle, h as MapFiltersToggle, i as init_covid19Helper, m as init_MapMessage, p as MapMessage, r as handleSort, v as init_MapBox, x as require_mapbox_gl } from "./covid19Helper-BCNoljBR.js";
import { D as performSpendingOverTimeSearch, S as performSpendingByAwardSearch, T as performSpendingByGeographySearch, _ as generateUrlHash, l as fetchAwardingAgencies, p as fetchProgramActivity, u as fetchCFDA, w as performSpendingByCategorySearch, y as init_searchHelper } from "./searchHelper-D0TEuy-H.js";
import { a as tabTypes, c as fetchStateOverview, i as parseStateDataFromUrl, l as init_state, n as createApiParams, o as fetchAwardBreakdown, r as init_stateHelper } from "./stateHelper-QsP7VDva.js";
import { n as init_ProfileBackLink, t as ProfileBackLink } from "./ProfileBackLink-Bi5rIoQ4.js";
import { n as init_BarChartLegend, t as BarChartLegend } from "./BarChartLegend-ChLsfTE4.js";
import { b as Legend, c as ReferenceLine, g as ResponsiveContainer, i as YAxis, n as BarChart, o as XAxis, t as init_es6, u as Bar, v as Tooltip } from "./es6-BbXcNfhx.js";
import { n as init_Error, t as Error } from "./Error-NjAxAGy3.js";
import { a as treemap_default, c as hierarchy, n as binary_default, s as slice_default, t as init_src } from "./src-D8Obn9VZ.js";
import { n as init_RoundedToggle, t as RoundedToggle } from "./RoundedToggle-Det_QYnO.js";
import { i as init_monthHelper, n as convertNumToShortMonth, t as convertMonthToFY } from "./monthHelper-CZs7ZP4t.js";
import { a as categories, i as init_BaseStateCategoryResult, n as init_TopFive, o as init_topCategories, r as BaseStateCategoryResult, t as TopFive } from "./TopFive-BiXljc5_.js";
import { a as MapFiltersTitle, c as init_MapLegend, i as init_GeoVisualizationTooltip, n as init_Autocomplete, o as init_MapFiltersTitle, r as GeoVisualizationTooltip, s as MapLegend, t as Autocomplete } from "./Autocomplete-CSeQ1q9R.js";
import React, { createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, concat, filter, find, reduce, remove, slice, sortBy, truncate, uniqueId } from "lodash-es";
//#region src/js/redux/actions/state/stateActions.js
var setStateOverview, setStateFiscalYear, setStateCenter, resetState;
var init_stateActions = __esmMin((() => {
	setStateOverview = (state) => ({
		type: "SET_STATE_OVERVIEW",
		overview: state
	});
	setStateFiscalYear = (state) => ({
		type: "SET_STATE_FY",
		fy: state
	});
	setStateCenter = (state) => ({
		type: "SET_STATE_CENTER",
		center: state
	});
	resetState = () => ({ type: "RESET_STATE" });
}));
//#endregion
//#region src/js/features/state/containers/useFetchOverview.jsx
/**
* useFetchOverview.jsx
* Created by Andrea Blackwell 02/15/26
*/
var useFetchOverview;
var init_useFetchOverview = __esmMin((() => {
	init_modern();
	init_state();
	init_BaseStateProfile();
	useFetchOverview = (stateId, fy) => {
		const loadStateOverview = useCallback((d) => {
			if (Object.keys(d?.data).length === 0) return;
			const newStateProfile = Object.create(BaseStateProfile);
			newStateProfile.populate(d.data);
			return newStateProfile;
		}, []);
		const { data, isSuccess, isLoading, error } = useQuery({
			queryKey: [`stateProfileData${stateId}${fy}`],
			queryFn: () => fetchStateOverview(stateId, fy).promise,
			select: loadStateOverview,
			enabled: !!stateId && !!fy,
			staleTime: Infinity,
			refetchOnWindowRefocus: false
		});
		return {
			stateProfileData: data,
			isSuccess,
			isLoading,
			error
		};
	};
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/StateAgencyList.jsx
/**
* StateAgencyList.jsx
* Created by Nick Torres 8/12/2024
**/
var import_commonjs, import_jsx_runtime$43, propTypes$26, StateAgencyList;
var init_StateAgencyList = __esmMin((() => {
	init_axios();
	import_commonjs = require_commonjs();
	init_searchHelper();
	init_Autocomplete();
	import_jsx_runtime$43 = require_jsx_runtime();
	propTypes$26 = {
		searchParams: PropTypes.string,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		selectedItemsDisplayNames: PropTypes.object
	};
	StateAgencyList = ({ searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames }) => {
		const [agencySearchString, setAgencySearchString] = useState("");
		const [autocompleteAgencies, setAutocompleteAgencies] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const timeout = useRef(null);
		const request = useRef(null);
		const clearAutocompleteSuggestions = useCallback(() => {
			setAutocompleteAgencies([]);
		}, []);
		useEffect(() => {
			const el = document.getElementById("state__agency-id");
			const onFocus = (e) => {
				if (e.target.value !== "") el.current.select();
			};
			const onBlur = (e) => {
				if (e.target.value === "") {
					clearAutocompleteSuggestions();
					clearSearchFilters("agency");
					setAgencySearchString("");
				}
			};
			el.addEventListener("focus", onFocus);
			el.addEventListener("blur", onBlur);
			return () => {
				el.removeEventListener("focus", onFocus);
				el.removeEventListener("blur", onBlur);
			};
		}, [clearAutocompleteSuggestions, clearSearchFilters]);
		const parseAutocompleteAgencies = useCallback((results) => {
			let agencies = [];
			setNoResults(false);
			if (results) {
				results.forEach((item) => {
					let subAbbreviation = "";
					let topAbbreviation = "";
					if (item.subtier_agency.abbreviation) subAbbreviation = `(${item.subtier_agency.abbreviation})`;
					if (item.toptier_agency.abbreviation) topAbbreviation = `(${item.toptier_agency.abbreviation})`;
					if (item.toptier_flag) agencies.push({
						title: `${item.subtier_agency.name} ${topAbbreviation}`,
						data: Object.assign({}, item, { agencyType: "toptier" })
					});
					else agencies.push({
						title: `${item.subtier_agency.name} ${subAbbreviation}`,
						subtitle: `Sub-Agency of ${item.toptier_agency.name} ${topAbbreviation}`,
						data: Object.assign({}, item, { agencyType: "subtier" })
					});
				});
				if (agencies.length === 0) setNoResults(true);
			}
			if (agencySearchString.toLowerCase() !== "fem" && agencySearchString.toLowerCase() !== "fema") {
				let toptierAgencies = filter(agencies, ["data.agencyType", "toptier"]);
				let subtierAgencies = filter(agencies, ["data.agencyType", "subtier"]);
				toptierAgencies = sortBy(toptierAgencies, "title");
				subtierAgencies = sortBy(subtierAgencies, "title");
				agencies = slice(concat(toptierAgencies, subtierAgencies), 0, 10);
			}
			if (agencies.length > 0) setNoResults(false);
			setAutocompleteAgencies(agencies);
		}, [agencySearchString]);
		const performSecondarySearch = useCallback((data, inputVal) => {
			if (inputVal.toLowerCase() === "fem" || inputVal.toLowerCase() === "fema") parseAutocompleteAgencies(slice(data, 0, 10));
			else {
				const search = new import_commonjs.Search("id");
				search.addIndex(["toptier_agency", "name"]);
				search.addIndex(["subtier_agency", "name"]);
				search.addIndex(["toptier_agency", "abbreviation"]);
				search.addIndex(["subtier_agency", "abbreviation"]);
				search.addDocuments(data);
				const results = search.search(inputVal);
				const toptier = [];
				const subtier = [];
				results.forEach((item) => {
					if (item.toptier_flag) toptier.push(item);
					else subtier.push(item);
				});
				const improvedResults = slice(concat(toptier, subtier), 0, 10);
				if (improvedResults.length > 0) setNoResults(false);
				parseAutocompleteAgencies(improvedResults);
			}
		}, [parseAutocompleteAgencies]);
		const queryAutocompleteAgencies = useCallback((inputVal) => {
			setNoResults(false);
			if (inputVal.length >= 3) {
				setAgencySearchString(inputVal);
				if (request.current) request.current.cancel();
				request.current = fetchAwardingAgencies({
					search_text: inputVal,
					limit: 20
				});
				request.current.promise.then((res) => {
					performSecondarySearch(res.data.results, inputVal);
				}).catch((err) => {
					if (!isCancel(err)) setNoResults(true);
				});
			} else if (request.current) request.current.cancel();
		}, [performSecondarySearch]);
		return /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(Autocomplete, {
			values: autocompleteAgencies,
			handleTextInput: useCallback((inputEvent) => {
				if (autocompleteAgencies.length > 0) setAutocompleteAgencies([]);
				const inputVal = inputEvent.target.value;
				window.clearTimeout(timeout.current);
				timeout.current = window.setTimeout(() => {
					queryAutocompleteAgencies(inputVal);
				}, 300);
				return () => window.clearTimeout(timeout.current);
			}, [autocompleteAgencies.length, queryAutocompleteAgencies]),
			onSelect: useCallback((agency, valid) => {
				const newSearch = { filters: {} };
				newSearch.filters.agencies = [];
				newSearch.filters.agencies.push({
					name: valid.data.toptier_agency.name,
					tier: valid.data.agencyType,
					type: "awarding"
				});
				setAutocompleteAgencies([]);
				if (Object.keys(searchParams).length > 0) changeScope(newSearch, "agency");
			}, [searchParams, changeScope]),
			clearAutocompleteSuggestions,
			noResults,
			selectedItemsDisplayNames,
			label: "Awarding Agency",
			placeholder: "Search for an awarding agency...",
			id: "state__agency-id",
			type: "agency",
			retainValue: true
		});
	};
	StateAgencyList.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/ProgramActivityList.jsx
/**
* ProgramActivityList.jsx
* Created by Andrea Blackwell 09/05/2024
**/
var import_jsx_runtime$42, propTypes$25, ProgramActivityList;
var init_ProgramActivityList = __esmMin((() => {
	init_axios();
	init_searchHelper();
	init_Autocomplete();
	import_jsx_runtime$42 = require_jsx_runtime();
	propTypes$25 = {
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		searchParams: PropTypes.string,
		selectedItemsDisplayNames: PropTypes.object
	};
	ProgramActivityList = ({ searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames }) => {
		const [autocompleteList, setAutocompleteList] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const request = useRef(null);
		const timeout = useRef(null);
		const clearAutocompleteSuggestions = useCallback(() => {
			setAutocompleteList([]);
		}, []);
		useEffect(() => {
			const el = document.getElementById("state__program-activity-id");
			const onFocus = (e) => {
				if (e.target.value !== "") el.current.select();
			};
			const onBlur = (e) => {
				if (e.target.value === "") {
					clearAutocompleteSuggestions();
					clearSearchFilters("program_activity");
				}
			};
			el.addEventListener("focus", onFocus);
			el.addEventListener("blur", onBlur);
			return () => {
				el.removeEventListener("focus", onFocus);
				el.removeEventListener("blur", onBlur);
			};
		}, [clearAutocompleteSuggestions, clearSearchFilters]);
		const parseAutocompleteProgramActivity = (programActivity) => {
			const values = [];
			if (programActivity && programActivity.length > 0) programActivity.forEach((item) => {
				const title = item.program_activity_name;
				values.push({
					title,
					data: item
				});
			});
			setAutocompleteList(values);
		};
		const queryAutocompleteProgramActivity = useCallback((input) => {
			setNoResults(false);
			if (input.length >= 3) {
				if (request.current) request.current.cancel();
				request.current = fetchProgramActivity({
					search_text: input,
					limit: 1e3
				});
				request.current.promise.then((res) => {
					const autocompleteData = res.data.results;
					setNoResults(autocompleteData.length === 0);
					parseAutocompleteProgramActivity(autocompleteData);
				}).catch((err) => {
					if (!isCancel(err)) setNoResults(true);
				});
			} else if (request.current) request.current.cancel();
		}, []);
		const onSelect = useCallback((programActivity) => {
			const newSearch = searchParams;
			newSearch.filters.program_activities = [];
			newSearch.filters.program_activities.push({ name: programActivity.program_activity_name });
			setAutocompleteList([]);
			if (Object.keys(newSearch).length > 0) changeScope(newSearch, "program_activity", programActivity.program_activity_name);
		}, [searchParams, changeScope]);
		return /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(Autocomplete, {
			values: autocompleteList,
			handleTextInput: useCallback((inputVal) => {
				setAutocompleteList([]);
				const input = inputVal.target?.value;
				window.clearTimeout(timeout.current);
				timeout.current = window.setTimeout(() => {
					queryAutocompleteProgramActivity(input);
				}, 300);
				return () => window.clearTimeout(timeout.current);
			}, [queryAutocompleteProgramActivity]),
			onSelect,
			clearAutocompleteSuggestions,
			noResults,
			selectedItemsDisplayNames,
			label: "Program Activity",
			placeholder: "Search for a program activity...",
			id: "state__program-activity-id",
			type: "program_activity",
			retainValue: true
		});
	};
	ProgramActivityList.propTypes = propTypes$25;
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/StateCFDAList.jsx
/**
* StateCFDAList.jsx
* Created by Nick Torres 8/13/2024
**/
var import_jsx_runtime$41, propTypes$24, StateCFDAList;
var init_StateCFDAList = __esmMin((() => {
	init_axios();
	init_Autocomplete();
	init_searchHelper();
	import_jsx_runtime$41 = require_jsx_runtime();
	propTypes$24 = {
		searchParams: PropTypes.string,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		selectedItemsDisplayNames: PropTypes.object
	};
	StateCFDAList = ({ searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames }) => {
		const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
		const [noResults, setNoResults] = useState(false);
		const requestRef = useRef(null);
		const timeoutRef = useRef(null);
		const clearAutocompleteSuggestions = useCallback(() => {
			setAutocompleteCFDA([]);
		}, []);
		useEffect(() => {
			const el = document.getElementById("state__cfda-id");
			const onFocus = (e) => {
				if (e.target.value !== "") el?.select();
			};
			const onBlur = (e) => {
				if (e.target.value === "") {
					clearAutocompleteSuggestions();
					clearSearchFilters("program_number");
				}
			};
			el.addEventListener("focus", onFocus);
			el.addEventListener("blur", onBlur);
			return () => {
				el.removeEventListener("focus", onFocus);
				el.removeEventListener("blur", onBlur);
			};
		}, [clearAutocompleteSuggestions, clearSearchFilters]);
		const onSelect = useCallback((cfda) => {
			const newTitle = `${cfda.program_number} - ${cfda.program_title}`;
			const newSearch = searchParams;
			newSearch.filters.program_numbers = [];
			newSearch.filters.program_numbers.push(cfda.program_number);
			setAutocompleteCFDA([]);
			if (Object.keys(newSearch).length > 0) changeScope(newSearch, "program_number", newTitle);
		}, [searchParams, changeScope]);
		const parseAutocompleteCFDA = (cfda) => {
			const values = [];
			if (cfda && cfda.length > 0) cfda.forEach((item) => {
				const title = `${item.program_number} - ${item.program_title}`;
				values.push({
					title,
					subtitle: "",
					data: item
				});
			});
			setAutocompleteCFDA(values);
		};
		const queryAutocompleteCFDA = useCallback((input) => {
			setNoResults(false);
			if (input.length >= 3) {
				if (requestRef.current) requestRef.current.cancel();
				requestRef.current = fetchCFDA({
					search_text: input,
					limit: 1e3
				});
				requestRef.current.promise.then((res) => {
					const autocompleteData = res.data.results;
					setNoResults(autocompleteData.length === 0);
					parseAutocompleteCFDA(autocompleteData);
				}).catch((err) => {
					if (!isCancel(err)) setNoResults(true);
				});
			} else if (requestRef.current) requestRef.current.cancel();
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(Autocomplete, {
			values: autocompleteCFDA,
			handleTextInput: useCallback((cfdaInput) => {
				setAutocompleteCFDA([]);
				const input = cfdaInput.target?.value;
				window.clearTimeout(timeoutRef.current);
				timeoutRef.current = window.setTimeout(() => {
					queryAutocompleteCFDA(input);
				}, 300);
				return () => window.clearTimeout(timeoutRef.current);
			}, [queryAutocompleteCFDA]),
			onSelect,
			clearAutocompleteSuggestions,
			noResults,
			selectedItemsDisplayNames,
			label: "Assistance Listing",
			placeholder: "Search for an assistance listing...",
			id: "state__cfda-id",
			type: "program_number",
			retainValue: true
		});
	};
	StateCFDAList.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/StateMapFiltersAutocomplete.jsx
var import_jsx_runtime$40, propTypes$23, StateMapFiltersAutocomplete;
var init_StateMapFiltersAutocomplete = __esmMin((() => {
	init_StateAgencyList();
	init_ProgramActivityList();
	init_StateCFDAList();
	import_jsx_runtime$40 = require_jsx_runtime();
	propTypes$23 = {
		searchParams: PropTypes.string,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		selectedItemsDisplayNames: PropTypes.object
	};
	StateMapFiltersAutocomplete = ({ searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames }) => /* @__PURE__ */ (0, import_jsx_runtime$40.jsxs)("div", {
		className: "map__filters-filter__container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
				className: "map__filters-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
					className: "filter-item-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(StateAgencyList, {
						searchParams,
						changeScope,
						clearSearchFilters,
						selectedItemsDisplayNames
					})
				}, "holder-awarding")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
				className: "map__filters-filter__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
					className: "map__filters-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(ProgramActivityList, {
						searchParams,
						changeScope,
						clearSearchFilters,
						selectedItemsDisplayNames
					})
				})
			}, uniqueId()),
			/* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
				className: "map__filters-filter__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
					className: "map__filters-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(StateCFDAList, {
						searchParams,
						changeScope,
						clearSearchFilters,
						selectedItemsDisplayNames
					})
				})
			}, uniqueId())
		]
	}, uniqueId());
	StateMapFiltersAutocomplete.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/dataMapping/state/stateMap.js
var stateFilters, mapFilterSortOrderByValue, filtersOnClickHandler;
var init_stateMap = __esmMin((() => {
	stateFilters = {
		territory: {
			label: "AREA TYPE",
			enabled: true,
			options: [{
				value: "county",
				label: "Counties"
			}, {
				value: "congressionalDistrict",
				label: "Congressional Districts"
			}]
		},
		def_codes: {
			label: "Disaster Emergency Fund Code (DEFC)",
			enabled: true,
			options: [{
				value: "all",
				label: "All Disaster Emergency Fund Codes (DEFCs)"
			}]
		}
	};
	mapFilterSortOrderByValue = {
		states: 0,
		congressionalDistricts: 1,
		counties: 2,
		obligations: 0,
		faceValueOfLoans: 2,
		outlays: 1,
		totalSpending: 0,
		perCapita: 1
	};
	filtersOnClickHandler = {
		territory: "updateTerritoryFilter",
		defc: "updateDefcFilter"
	};
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/StateMapFiltersDropdown.jsx
var import_jsx_runtime$39, propTypes$22, StateMapFiltersDropdown;
var init_StateMapFiltersDropdown = __esmMin((() => {
	init_index_es();
	init_covid19Helper();
	init_stateMap();
	init_WithDefCodes();
	import_jsx_runtime$39 = require_jsx_runtime();
	propTypes$22 = {
		activeFilters: PropTypes.object,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		changeMapLayer: PropTypes.func
	};
	StateMapFiltersDropdown = ({ activeFilters, changeScope, clearSearchFilters, changeMapLayer }) => {
		const [, , defCodes] = useDefCodes();
		const updateDefcFilter = (value) => {
			if (value === "all") clearSearchFilters("def_code");
			else changeScope({ filters: { def_codes: [value] } }, "def_code", [value]);
		};
		const mapFilters = Object.keys(stateFilters).reduce((acc, filter) => {
			acc[filter] = {
				...stateFilters[filter],
				onClick: filtersOnClickHandler[filter] === "updateTerritoryFilter" ? changeMapLayer : updateDefcFilter
			};
			return acc;
		}, {});
		if (mapFilters.def_codes.options.length === 1) {
			const defCodeOptionsList = defCodes.map((code) => ({
				label: `${code.code} - ${code.title}`,
				value: code.code
			}));
			mapFilters.def_codes.options.push(...defCodeOptionsList);
		}
		if (!activeFilters) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(import_jsx_runtime$39.Fragment, { children: Object.keys(mapFilters).map((filter) => {
			const filterType = mapFilters[filter].label.includes("DEFC") ? "defc" : null;
			const selectedOption = mapFilters[filter].options?.find((option) => option.value === activeFilters[filter])?.label;
			const options = mapFilters[filter].options?.map((option) => ({
				name: option.label,
				value: option.value,
				onClick: mapFilters[filter].onClick,
				sortOrder: mapFilterSortOrderByValue[option.value]
			}));
			return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(import_jsx_runtime$39.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("div", {
				className: "map__filters-filter__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
					className: "map__filters-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
						className: "map__filters-label",
						children: mapFilters[filter].label
					}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(fc, {
						enabled: mapFilters[filter].enabled,
						size: "sm",
						classname: `map__filters-button ${filterType}`,
						dropdownClassname: "map__filters-dropdown",
						sortFn: handleSort,
						selectedOption,
						options
					})]
				})
			}, uniqueId()) });
		}) });
	};
	StateMapFiltersDropdown.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/features/state/overview/geo/filters/StateProfileMapFilters.jsx
/**
* StateProfileMapFilters.jsx
* Created by Nick Torres 8/9/2024
*/
var import_jsx_runtime$38, propTypes$21, StateProfileMapFilters;
var init_StateProfileMapFilters = __esmMin((() => {
	init_MapFiltersTitle();
	init_StateMapFiltersAutocomplete();
	init_StateMapFiltersDropdown();
	import_jsx_runtime$38 = require_jsx_runtime();
	propTypes$21 = {
		activeFilters: PropTypes.object,
		isFiltersOpen: PropTypes.bool,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		searchParams: PropTypes.string,
		selectedItemsDisplayNames: PropTypes.object,
		changeMapLayer: PropTypes.func
	};
	StateProfileMapFilters = React.memo(function StateProfileMapFilters({ activeFilters, isFiltersOpen, changeScope, clearSearchFilters, searchParams, selectedItemsDisplayNames, changeMapLayer }) {
		return /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
			className: isFiltersOpen ? "map__filters-container open" : "map__filters-container closed",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
				className: "map__filters-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(MapFiltersTitle, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
				className: "map__filters-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(StateMapFiltersDropdown, {
					activeFilters,
					changeScope,
					clearSearchFilters,
					changeMapLayer
				}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(StateMapFiltersAutocomplete, {
					searchParams,
					changeScope,
					clearSearchFilters,
					selectedItemsDisplayNames
				})]
			})]
		});
	});
	StateProfileMapFilters.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/features/state/overview/geo/StateGeoTooltip.jsx
var import_jsx_runtime$37, propTypes$20, StateGeoTooltip;
var init_StateGeoTooltip = __esmMin((() => {
	init_GeoVisualizationTooltip();
	import_jsx_runtime$37 = require_jsx_runtime();
	propTypes$20 = {
		selectedItem: PropTypes.string,
		showHover: PropTypes.bool
	};
	StateGeoTooltip = ({ selectedItem, showHover }) => {
		if (!showHover) return null;
		const { label, value, y, x, visualization, total } = selectedItem;
		return /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(GeoVisualizationTooltip, {
			label,
			value,
			y,
			x,
			visualization,
			total,
			description: "Awarded Amount"
		});
	};
	StateGeoTooltip.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/features/state/overview/geo/StateProfileMapWrapper.jsx
/**
* StateProfileMapWrapper.jsx
* Created by Kevin Li 2/14/17
*/
var import_jsx_runtime$36, propTypes$19, StateProfileMapWrapper;
var init_StateProfileMapWrapper = __esmMin((() => {
	init_GlobalConstants();
	init_mapHelper();
	init_MapBox();
	init_MapLegend();
	init_MapFiltersToggle();
	init_StateProfileMapFilters();
	init_StateGeoTooltip();
	import_jsx_runtime$36 = require_jsx_runtime();
	propTypes$19 = {
		activeFilters: PropTypes.object,
		data: PropTypes.object,
		scope: PropTypes.string,
		showHover: PropTypes.bool,
		selectedItem: PropTypes.object,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		changeMapLayer: PropTypes.func,
		stateInfo: PropTypes.object,
		searchParams: PropTypes.object,
		changeScope: PropTypes.func,
		clearSearchFilters: PropTypes.func,
		selectedItemsDisplayNames: PropTypes.object,
		center: PropTypes.array,
		loadingTilesReady: PropTypes.func,
		children: PropTypes.node
	};
	StateProfileMapWrapper = React.memo(function StateProfileMapWrapper({ activeFilters, data = {
		locations: [],
		values: []
	}, scope = "state", showHover, selectedItem, showTooltip, hideTooltip, changeMapLayer, stateInfo, searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames, center, loadingTilesReady, children = null }) {
		const mapRef = useRef(null);
		const mapOperationQueue = useRef(null);
		const [mapLayers, setMapLayers] = useState({});
		const [mapReady, setMapReady] = useState(false);
		const [spendingScale, setSpendingScale] = useState({
			scale: null,
			segments: [],
			units: {}
		});
		const [isFiltersOpen, setIsFiltersOpen] = useState(true);
		const mouseOverLayer = useCallback((e) => {
			const source = mapboxSources[scope];
			const entityId = e.features[0].properties[source.filterKey];
			showTooltip(entityId, {
				x: e.originalEvent.offsetX,
				y: e.originalEvent.offsetY
			});
		}, [scope, showTooltip]);
		const mouseExitLayer = useCallback(() => {
			hideTooltip();
		}, [hideTooltip]);
		const loadSource = useCallback((type) => {
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
				mapRef.current.on("mousemove", layerName, mouseOverLayer.bind(this));
				mapRef.current.on("mouseleave", layerName, mouseExitLayer.bind(this));
				sourceRef.highlights.push(layerName);
			});
			setMapLayers((prevLayers) => ({
				...prevLayers,
				[type]: sourceRef
			}));
		}, [mouseExitLayer, mouseOverLayer]);
		const showSource = useCallback((layers, type) => {
			if (!layers) {
				loadSource(type);
				return;
			}
			mapRef.current.setLayoutProperty(layers.base, "visibility", "visible");
			layers.highlights.forEach((highlight) => {
				mapRef.current.setLayoutProperty(highlight, "visibility", "visible");
			});
		}, [loadSource]);
		const hideSource = useCallback((layers) => {
			if (!layers) return;
			mapRef.current.setLayoutProperty(layers.base, "visibility", "none");
			layers.highlights.forEach((highlight) => {
				mapRef.current.setLayoutProperty(highlight, "visibility", "none");
			});
		}, []);
		const prepareLayers = useCallback((ready) => new Promise((resolve, reject) => {
			if (!ready) reject();
			const source = mapboxSources[scope];
			if (!source) reject();
			Object.keys(mapboxSources).forEach((type) => {
				if (type !== scope) hideSource(mapLayers[type]);
			});
			showSource(mapLayers[scope], scope);
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
		}), [
			hideSource,
			showSource,
			scope,
			mapLayers
		]);
		const runMapOperationQueue = useCallback(() => {
			Object.keys(mapOperationQueue.current).forEach((key) => {
				mapOperationQueue.current[key].call(this);
			});
			mapOperationQueue.current = {};
		}, []);
		const prepareMap = useCallback((ready) => {
			prepareLayers(ready).then(() => {
				runMapOperationQueue();
				loadingTilesReady();
			});
		}, [
			prepareLayers,
			runMapOperationQueue,
			loadingTilesReady
		]);
		const queueMapOperation = (name, operation) => {
			mapOperationQueue.current = { [name]: operation };
		};
		const displayData = useCallback((locations, values, ready, layer) => {
			if (!ready || !locations) {
				queueMapOperation("displayData", displayData);
				return;
			}
			const source = mapboxSources[layer];
			const scale = calculateRange(values);
			const filterValues = visualizationColors.map(() => []);
			locations.forEach((location, index) => {
				let value = values[index];
				if (isNaN(value)) value = 0;
				const group = scale.scale(value);
				filterValues[group].push(location);
			});
			filterValues.forEach((valueSet, index) => {
				const layerName = `highlight_${layer}_group_${index}`;
				let filter = [
					"in",
					source.filterKey,
					""
				];
				if (valueSet.length > 0) filter = ["in", source.filterKey].concat(valueSet);
				if (!Object.hasOwn(mapRef.current.style._layers, layerName)) return;
				mapRef.current.setFilter(layerName, filter);
			});
			setSpendingScale(scale);
		}, []);
		useEffect(() => {
			displayData(data?.locations, data.values, mapReady, scope);
		}, [
			data.locations,
			data.values,
			displayData,
			mapReady,
			scope
		]);
		useEffect(() => {
			if (mapReady) prepareMap(mapReady);
		}, [mapReady, prepareMap]);
		return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
			className: "map-container",
			children: [
				globalConstants.MAPBOX_TOKEN && /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(MapBox, {
					setMapReady,
					center,
					mapType: scope,
					stateInfo,
					stateProfile: true,
					ref: mapRef
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(MapFiltersToggle, {
					isFiltersOpen,
					setIsFiltersOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(StateProfileMapFilters, {
					activeFilters,
					isFiltersOpen,
					changeScope,
					clearSearchFilters,
					searchParams,
					selectedItemsDisplayNames,
					changeMapLayer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(MapLegend, {
					segments: spendingScale.segments,
					units: spendingScale.units
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(StateGeoTooltip, {
					selectedItem,
					showHover
				}),
				children
			]
		});
	});
	StateProfileMapWrapper.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/features/state/overview/geo/GeoVisualizationSection.jsx
/**
* GeoVisualizationSection.jsx
* Created by Lizzie Salita 5/14/18
*/
var import_mapbox_gl, import_jsx_runtime$35, propTypes$18, GeoVisualizationSection;
var init_GeoVisualizationSection = __esmMin((() => {
	import_mapbox_gl = /* @__PURE__ */ __toESM(require_mapbox_gl(), 1);
	init_LoadingSpinner();
	init_Icons();
	init_MapMessage();
	init_ResultsTableErrorMessage();
	init_StateProfileMapWrapper();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$18 = {
		mapLayer: PropTypes.string,
		changeScope: PropTypes.func,
		changeMapLayer: PropTypes.func,
		data: PropTypes.object,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		noResults: PropTypes.bool,
		center: PropTypes.array,
		stateInfo: PropTypes.object,
		searchParams: PropTypes.object,
		activeFilters: PropTypes.object,
		clearSearchFilters: PropTypes.func,
		selectedItemsDisplayNames: PropTypes.object,
		loadingTilesReady: PropTypes.func
	};
	GeoVisualizationSection = React.memo(function GeoVisualizationSection({ mapLayer, changeScope, changeMapLayer, data, loading, error, noResults, center, stateInfo, searchParams, activeFilters, clearSearchFilters, selectedItemsDisplayNames, loadingTilesReady }) {
		const [showHover, setShowHover] = useState(false);
		const [selectedItem, setSelectedItem] = useState({});
		const dataRef = useRef(data);
		useEffect(() => {
			dataRef.current = data;
		}, [data]);
		const showTooltip = useCallback((geoId, position) => {
			const label = dataRef.current.labels[geoId];
			setShowHover(true);
			setSelectedItem({
				label: label?.label,
				value: label.value,
				x: position.x,
				y: position.y
			});
		}, []);
		const hideTooltip = useCallback(() => {
			setShowHover(false);
			setSelectedItem({});
		}, []);
		let message = null;
		if (!import_mapbox_gl.default.supported()) return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
			className: "results-table-message-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ResultsTableErrorMessage, {
				title: "WebGL Required for this map.",
				description: "Please enable WebGL in your browser settings to view this map visualization."
			})
		});
		else if (loading) message = /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
			className: "map-loading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(LoadingSpinner, {}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
				className: "loading-message",
				children: "Gathering your data..."
			})]
		}) });
		else if (error || center.length === 0) message = /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
			className: "map-no-results",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: "error-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ExclamationTriangle, { alt: "An error occurred" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: "title",
					children: "An error occurred."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: "description",
					children: "Something went wrong while gathering your data."
				})
			]
		}) });
		else if (noResults) message = /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(MapMessage, { children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
			className: "map-no-results",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", { className: "no-results-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
				className: "title",
				children: "No results found in the current map area."
			})]
		}) });
		return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
			className: "geo__map-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(StateProfileMapWrapper, {
				activeFilters,
				data,
				scope: mapLayer,
				showHover,
				selectedItem,
				showTooltip,
				hideTooltip,
				changeMapLayer,
				stateInfo,
				searchParams,
				changeScope,
				clearSearchFilters,
				selectedItemsDisplayNames,
				center,
				loadingTilesReady,
				children: message
			})
		});
	});
	GeoVisualizationSection.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/features/state/overview/geo/containers/GeoVisualizationSectionContainer.jsx
/**
* GeoVisualizationSectionContainer.jsx
* Created by Lizzie Salita 5/15/18
*/
var import_jsx_runtime$34, apiScopes, GeoVisualizationSectionContainer;
var init_GeoVisualizationSectionContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_fiscalYearHelper();
	init_searchHelper();
	init_mapHelper();
	init_GeoVisualizationSection();
	import_jsx_runtime$34 = require_jsx_runtime();
	apiScopes = {
		county: "county",
		congressionalDistrict: "district"
	};
	GeoVisualizationSectionContainer = () => {
		const { fy, overview: stateInfo, center } = useSelector((state) => state.stateProfile);
		const { code } = stateInfo;
		const [mapLayer, setMapLayer] = useState("county");
		const [data, setData] = useState({
			values: [],
			locations: []
		});
		const [loading, setLoading] = useState(true);
		const [loadingTiles, setLoadingTiles] = useState(true);
		const [error, setError] = useState(false);
		const [searchParams, setSearchParams] = useState({});
		const [selectedItemsDisplayNames, setSelectedItemsDisplayNames] = useState({
			agency: "",
			def_code: "",
			program_number: "",
			program_activity: ""
		});
		const [activeFilters, setActiveFilters] = useState({
			territory: "county",
			def_codes: "all"
		});
		const request = useRef(null);
		const paramsRef = useRef({});
		const noResults = data.values.length === 0;
		const loadingTilesReady = useCallback(() => {
			setLoadingTiles(false);
		}, []);
		const getInitialApiParams = useCallback((params, year, state) => {
			let timePeriod = null;
			let dateRange = [];
			let newParams;
			if (year !== "all") {
				if (year === "latest") dateRange = getTrailingTwelveMonths();
				else dateRange = convertFYToDateRange(parseInt(year, 10));
				timePeriod = [{
					start_date: dateRange[0],
					end_date: dateRange[1]
				}];
			}
			if (params?.scope === "place_of_performance" && params?.geo_layer.length > 0 && year !== "all") newParams = params.filters;
			else newParams = { place_of_performance_locations: [{
				country: "USA",
				state
			}] };
			if (timePeriod) newParams.time_period = timePeriod;
			setSearchParams({
				scope: "place_of_performance",
				geo_layer: "county",
				filters: newParams
			});
		}, []);
		useEffect(() => {
			getInitialApiParams(paramsRef.current, fy, code);
		}, [
			code,
			fy,
			getInitialApiParams
		]);
		const parseData = useCallback((d) => {
			const spendingValues = [];
			const spendingShapes = [];
			const spendingLabels = {};
			d.results.forEach((item) => {
				if (item.shape_code && item.shape_code !== "") {
					spendingShapes.push(item.shape_code);
					spendingValues.push(parseFloat(item.aggregated_amount));
					spendingLabels[item.shape_code] = {
						label: item.display_name,
						value: parseFloat(item.aggregated_amount)
					};
				}
			});
			setData({
				values: spendingValues,
				locations: spendingShapes,
				labels: spendingLabels
			});
			setLoading(false);
			setError(false);
		}, []);
		const fetchData = useCallback((params = null) => {
			if (request.current) request.current.cancel();
			setLoading(true);
			setError(false);
			request.current = performSpendingByGeographySearch(params);
			request.current.promise.then((res) => {
				parseData(res.data);
				request.current = null;
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					request.current = null;
					setLoading(false);
					setError(true);
				}
			});
		}, [parseData]);
		useEffect(() => {
			if (loadingTiles) return;
			fetchData(searchParams);
			paramsRef.current = searchParams;
		}, [
			searchParams,
			loadingTiles,
			fetchData
		]);
		const changeMapLayer = useCallback((layer) => {
			setMapLayer(layer);
			setLoadingTiles(true);
			setActiveFilters((prevState) => ({
				def_codes: prevState.def_codes,
				territory: layer
			}));
			setSearchParams((prevState) => ({
				...prevState,
				geo_layer: apiScopes[layer]
			}));
		}, []);
		const changeScope = useCallback((newSearch, filterType, displayName) => {
			const tempSearchData = cloneDeep(paramsRef.current);
			const filterTypePlural = pluralize(filterType);
			if (Object.prototype.hasOwnProperty.call(tempSearchData.filters, filterTypePlural)) tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
			else {
				tempSearchData.filters[filterTypePlural] = [];
				tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
			}
			setSearchParams(tempSearchData);
			setActiveFilters((prev) => ({
				...prev,
				[filterTypePlural]: filterType === "agency" ? tempSearchData.filters[filterTypePlural][0].name : displayName[0]
			}));
			setSelectedItemsDisplayNames((prev) => ({
				...prev,
				[filterType]: filterType === "agency" ? tempSearchData.filters[filterTypePlural][0].name : displayName
			}));
		}, []);
		const clearSearchFilters = useCallback((filterType) => {
			const tempSearchData = cloneDeep(paramsRef.current);
			const filterTypePlural = pluralize(filterType);
			if (!tempSearchData.filters[filterTypePlural]) return;
			delete tempSearchData.filters[filterTypePlural];
			setSearchParams(tempSearchData);
			setSelectedItemsDisplayNames((prevState) => ({
				...prevState,
				[filterType]: ""
			}));
			if (filterType === "def_code") setActiveFilters((prevState) => ({
				territory: prevState.territory,
				def_codes: "all"
			}));
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
			className: "state-section__viz geo",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("h3", {
				className: "state-overview__heading",
				children: "Primary Place of Performance"
			}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(GeoVisualizationSection, {
				mapLayer,
				changeScope,
				changeMapLayer,
				data,
				loading,
				error,
				noResults,
				center,
				stateInfo,
				searchParams,
				activeFilters,
				clearSearchFilters,
				selectedItemsDisplayNames,
				loadingTilesReady
			})]
		});
	};
}));
//#endregion
//#region src/js/features/state/overview/SummaryStats.jsx
var import_jsx_runtime$33, propTypes$17, SummaryStats;
var init_SummaryStats = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$17 = { overview: PropTypes.object };
	SummaryStats = ({ overview }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
			className: "state-section__row",
			children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				className: "state-section__viz totals-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Cs, { boxes: [
					{
						title: "Obligations",
						type: "obligatedAmount",
						amount: overview.totalAmount,
						isMonetary: true,
						isString: true,
						subtitleBottom: `from ${overview.totalAwards} prime awards`
					},
					{
						title: "Outlayed Amount",
						type: "outlayedAmount",
						amount: overview.totalOutlays,
						isMonetary: true,
						isString: true,
						subtitleBottom: `from ${overview.totalAwards} prime awards`
					},
					{
						title: "Face Value of Loans",
						type: "faceValueOfLoans",
						amount: overview.totalFaceValueLoanAmount,
						isMonetary: true,
						isString: true,
						subtitleBottom: `from ${overview.totalFaceValueLoanPrimeAwards} prime awards`
					}
				] })
			})
		});
	};
	SummaryStats.propTypes = propTypes$17;
}));
//#endregion
//#region src/js/dataMapping/state/awardTypes.js
var awardTypeLabels;
var init_awardTypes = __esmMin((() => {
	awardTypeLabels = {
		contracts: "Contracts",
		grants: "Grants",
		direct_payments: "Direct Payments",
		loans: "Loans",
		other_financial_assistance: "Other Financial Assistance",
		idvs: "IDVs"
	};
}));
//#endregion
//#region src/js/models/v2/state/BaseAwardBreakdownRow.js
var BaseAwardBreakdownRow;
var init_BaseAwardBreakdownRow = __esmMin((() => {
	init_moneyFormatter();
	init_awardTypes();
	BaseAwardBreakdownRow = {
		populate(data) {
			this.type = data.type || null;
			this.name = awardTypeLabels[data.type] || "";
			this._amount = data.amount || 0;
			this._count = data.count || 0;
			this._totalOutlays = data.total_outlays || 0;
		},
		get amount() {
			if (Math.abs(this._amount) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._amount);
				return `${formatMoneyWithPrecision(this._amount / units.unit, 1)}${units.unitLabel}`;
			}
			return formatMoneyWithPrecision(this._amount, 0);
		},
		get totalOutlays() {
			if (Math.abs(this._totalOutlays) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalOutlays);
				return `${formatMoneyWithPrecision(this._totalOutlays / units.unit, 1)}${units.unitLabel}`;
			}
			return formatMoneyWithPrecision(this._totalOutlays, 0);
		},
		get count() {
			return formatNumberWithPrecision(this._count, 0);
		}
	};
}));
//#endregion
//#region src/js/helpers/treemapHelper.js
var stateTreemapColorsNoToggle, stateTreemapColorsWithToggle, stateTooltipStyles;
var init_treemapHelper = __esmMin((() => {
	stateTreemapColorsNoToggle = [
		"#0e4f5c",
		"#00687d",
		"#0081a1",
		"#009ec1",
		"#00BDE3"
	];
	stateTreemapColorsWithToggle = [
		"#0f6460",
		"#008480",
		"#00a398",
		"#1dc2ae",
		"#29e1cb"
	];
	stateTooltipStyles = {
		defaultStyle: { textColor: "#FFFFFF" },
		highlightedStyle: {
			color: "#F2B733",
			textColor: "#212121"
		}
	};
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/treemap/AwardTypeCell.jsx
/**
* AwardTypeCell.jsx
* Created by Lizzie Salita 5/16/18
*/
var import_jsx_runtime$32, propTypes$16, AwardTypeCell;
var init_AwardTypeCell = __esmMin((() => {
	import_jsx_runtime$32 = require_jsx_runtime();
	propTypes$16 = {
		label: PropTypes.string,
		x0: PropTypes.number,
		x1: PropTypes.number,
		y0: PropTypes.number,
		awardType: PropTypes.string,
		color: PropTypes.string,
		strokeColor: PropTypes.string,
		strokeOpacity: PropTypes.number,
		toggleTooltipIn: PropTypes.func,
		toggleTooltipOut: PropTypes.func,
		opacity: PropTypes.number,
		textColor: PropTypes.string,
		textClass: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
		labelView: PropTypes.string
	};
	AwardTypeCell = ({ label: initialLabel, x0, x1, y0, awardType, color, strokeColor, strokeOpacity, toggleTooltipIn, toggleTooltipOut, opacity, textColor, textClass, height, width, labelView }) => {
		const svgRef = useRef(null);
		const onMouseEnter = () => {
			toggleTooltipIn(awardType);
		};
		const labelWidth = x1 - x0;
		let fullWidth = 0;
		try {
			fullWidth = svgRef.current.getBBox().width;
		} catch (e) {}
		const maxWidth = labelWidth / 1.5;
		let maxChars = 0;
		let truncatedLabel = initialLabel;
		if (fullWidth > maxWidth && maxWidth > 0) {
			const avgCharWidth = fullWidth / initialLabel.length;
			maxChars = Math.floor(maxWidth / avgCharWidth);
			truncatedLabel = truncate(initialLabel, { length: maxChars });
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("g", {
			transform: `translate(${x0},${y0})`,
			onMouseEnter,
			onMouseLeave: toggleTooltipOut,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("rect", {
				className: "tile",
				width,
				height,
				style: {
					fill: color,
					stroke: strokeColor,
					strokeOpacity,
					strokeWidth: "2px",
					padding: "10px"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("text", {
				className: `category ${textClass}`,
				x: width / 2,
				y: height / 2,
				width,
				textAnchor: "middle",
				ref: svgRef,
				style: {
					display: labelView,
					fill: textColor,
					opacity
				},
				children: truncatedLabel
			})]
		});
	};
	AwardTypeCell.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/treemap/AwardBreakdownTreeMapCells.jsx
/**
* AwardBreakdownTreeMap.jsx
* Created on 12/15/2025 by Josue Aguilar
*/
var import_jsx_runtime$31, propTypes$15, AwardBreakdownTreeMapCells;
var init_AwardBreakdownTreeMapCells = __esmMin((() => {
	init_AwardTypeCell();
	import_jsx_runtime$31 = require_jsx_runtime();
	propTypes$15 = {
		virtualChart: PropTypes.object,
		setHoveredAwardType: PropTypes.func,
		sectionWrapper: PropTypes.shape({ current: PropTypes.object }),
		visualizationWidth: PropTypes.number,
		visualizationHeight: PropTypes.number
	};
	AwardBreakdownTreeMapCells = ({ virtualChart, setHoveredAwardType, sectionWrapper, visualizationWidth, visualizationHeight }) => {
		const toggleTooltipIn = useCallback((awardTypeId) => {
			setHoveredAwardType(awardTypeId);
		}, [setHoveredAwardType]);
		const toggleTooltipOut = useCallback(() => {
			setHoveredAwardType("");
		}, [setHoveredAwardType]);
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
			className: "tree-wrapper",
			ref: sectionWrapper,
			children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("svg", {
				width: visualizationWidth,
				height: visualizationHeight,
				className: "treemap-svg overlay",
				children: virtualChart.map((cell) => /* @__PURE__ */ createElement(AwardTypeCell, {
					...cell,
					strokeColor: "white",
					strokeOpacity: .5,
					toggleTooltipIn,
					toggleTooltipOut,
					opacity: 1,
					key: cell.awardType
				}))
			})
		});
	};
	AwardBreakdownTreeMapCells.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/treemap/AwardTypeTooltip.jsx
/**
* AwardTypeTooltip.jsx
* Created by Lizzie Salita 5/16/18
*/
var import_jsx_runtime$30, propTypes$14, AwardTypeTooltip;
var init_AwardTypeTooltip = __esmMin((() => {
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$14 = {
		value: PropTypes.string,
		description: PropTypes.string,
		height: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		percentage: PropTypes.string,
		arrow: PropTypes.bool,
		toggleState: PropTypes.bool
	};
	AwardTypeTooltip = ({ value, description, height, x, y, width, percentage, arrow, toggleState }) => {
		const divRef = useRef(null);
		const pointerDivRef = useRef(null);
		const containerDivRef = useRef(null);
		const positionTooltip = useCallback(() => {
			const tooltipWidth = divRef.current.offsetWidth;
			const tooltipHeight = divRef.current.offsetHeight;
			const containerPadding = containerDivRef.current.getBoundingClientRect().left;
			const windowWidth = window.innerWidth;
			const offset = 13;
			const heightOffset = 25;
			const xPosition = width * .5;
			const yPosition = height * .5;
			let leftRightDirection = "left";
			const topBottomDirection = "bottom";
			let leftOffset = `${x + xPosition + offset}px`;
			let topOffset = `${height / 2 + heightOffset}px`;
			if (x + xPosition + tooltipWidth >= windowWidth - containerPadding) leftRightDirection = "right";
			if (leftRightDirection === "left" && true) topOffset = `${y + yPosition - (tooltipHeight + heightOffset)}px`;
			else if (leftRightDirection === "right" && true) {
				leftOffset = `${x + width / 2 - (tooltipWidth + offset)}px`;
				topOffset = `${y + yPosition - (tooltipHeight + heightOffset)}px`;
			}
			let size = "";
			if (arrow) size = " small";
			pointerDivRef.current.className = `tooltip-pointer ${topBottomDirection}-${leftRightDirection}`;
			divRef.current.style.top = topOffset;
			divRef.current.style.left = leftOffset;
			divRef.current.className = `tooltip ${topBottomDirection}${size}`;
		}, [
			arrow,
			height,
			width,
			x,
			y
		]);
		useEffect(() => {
			positionTooltip();
		}, [positionTooltip]);
		let desc = /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "tooltip-body-row bottom-spacing",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "tooltip-label",
				children: toggleState ? "Outlays" : "Obligations"
			}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "tooltip-value",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "tooltip-body-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "tooltip-label",
				children: "Percent of total"
			}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "tooltip-value",
				children: percentage
			})]
		})] });
		let smallValue = "";
		if (arrow) {
			desc = "";
			smallValue = " small";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
			className: "visualization-tooltip",
			ref: containerDivRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
				className: `tooltip${smallValue}`,
				ref: divRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "tooltip-pointer",
						ref: pointerDivRef
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "tooltip-title",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
						className: "tooltip-body",
						children: desc
					})
				]
			})
		});
	};
	AwardTypeTooltip.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/treemap/CreateAwardTypeTooltip.jsx
var import_jsx_runtime$29, CreateAwardTypeTooltip;
var init_CreateAwardTypeTooltip = __esmMin((() => {
	init_awardTypes();
	init_moneyFormatter();
	init_AwardTypeTooltip();
	import_jsx_runtime$29 = require_jsx_runtime();
	CreateAwardTypeTooltip = ({ awardBreakdown, totalAmount, toggleState, sectionWrapper, hoveredAwardType, virtualChart }) => {
		const createTooltip = () => {
			let tooltip = null;
			let sectionHeight = 0;
			if (sectionWrapper.current) sectionHeight = sectionWrapper.current.getBoundingClientRect().height;
			if (hoveredAwardType) {
				const awardType = find(awardBreakdown, { type: `${hoveredAwardType}` });
				const awardTypeDefinition = awardTypeLabels[hoveredAwardType];
				const node = find(virtualChart, { awardType: `${hoveredAwardType}` });
				const amountType = toggleState ? "total_outlays" : "amount";
				tooltip = /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(AwardTypeTooltip, {
					value: formatMoneyWithUnitsShortLabel(awardType[amountType]),
					percentage: calculatePercentage(awardType[amountType], totalAmount),
					description: awardTypeDefinition,
					x: node.x0,
					y: node.y0,
					width: node.width,
					height: node.height,
					sectionHeight,
					toggleState
				});
			}
			return tooltip;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(import_jsx_runtime$29.Fragment, { children: createTooltip() });
	};
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/treemap/AwardBreakdownTreeMap.jsx
/**
* AwardBreakdownTreeMap.jsx
* Created by Lizzie Salita 5/16/18
*/
var import_jsx_runtime$28, propTypes$13, AwardBreakdownTreeMap;
var init_AwardBreakdownTreeMap = __esmMin((() => {
	init_src();
	init_treemapHelper();
	init_awardTypes();
	init_useEventListener();
	init_AwardBreakdownTreeMapCells();
	init_CreateAwardTypeTooltip();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$13 = {
		awardBreakdown: PropTypes.array,
		totalAmount: PropTypes.number,
		toggleState: PropTypes.bool
	};
	AwardBreakdownTreeMap = ({ awardBreakdown, totalAmount, toggleState }) => {
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		const [virtualChart, setVirtualChart] = useState([]);
		const [hoveredAwardType, setHoveredAwardType] = useState("");
		const sectionWrapper = useRef(null);
		const awardRef = useRef(awardBreakdown);
		const amountType = toggleState ? "total_outlays" : "amount";
		const visualizationHeight = 175;
		const buildVirtualCell = useCallback((data, i, type, hoveredType, total) => {
			let cellColor = type === "total_outlays" ? stateTreemapColorsWithToggle[i] : stateTreemapColorsNoToggle[i];
			let textColor = stateTooltipStyles.defaultStyle.textColor;
			let textClass = "";
			if (hoveredType === data.data.type) {
				cellColor = stateTooltipStyles.highlightedStyle.color;
				textColor = stateTooltipStyles.highlightedStyle.textColor;
				textClass = "chosen";
			}
			let labelView = "block";
			let percentView = "block";
			const width = data.x1 - data.x0;
			const height = data.y1 - data.y0;
			if (height < 26 || width < 50) labelView = "none";
			if (height < 40 || width < 60) percentView = "none";
			return {
				label: awardTypeLabels[data.data.type],
				value: data.value,
				x0: data.x0,
				x1: data.x1,
				y0: data.y0,
				y1: data.y1,
				total,
				awardType: data.data.type,
				color: cellColor,
				textColor,
				textClass,
				labelView,
				width,
				height,
				percentView
			};
		}, []);
		const buildVirtualTree = useCallback((data, type, hoveredType, total) => {
			remove(data, (v) => v[type] <= 0);
			const treemapData = hierarchy({ children: data }).sum((d) => d[type]).sort((a, b) => b[type] - a[type]);
			let tileStyle = binary_default;
			if (window.innerWidth < 768) tileStyle = slice_default;
			let offsetWidth = 0;
			if (sectionWrapper.current) offsetWidth = sectionWrapper.current.offsetWidth;
			const treeItems = treemap_default().size([offsetWidth, visualizationHeight]).tile(tileStyle).round(true)(treemapData).leaves();
			if (treeItems.length === 0 || data.length === 0) {
				setVirtualChart([]);
				return;
			}
			const cells = [];
			treeItems.forEach((item, index) => {
				const cell = buildVirtualCell(item, index, type, hoveredType, total);
				cells.push(cell);
			});
			setVirtualChart(cells);
		}, [buildVirtualCell]);
		const handleWindowResize = useCallback(() => {
			if (sectionWrapper.current) setVisualizationWidth(sectionWrapper.current.offsetWidth);
			if (awardRef.current.length > 0) buildVirtualTree(awardRef.current, amountType, hoveredAwardType, totalAmount);
		}, [
			buildVirtualTree,
			amountType,
			hoveredAwardType,
			totalAmount
		]);
		useEffect(() => {
			handleWindowResize();
		}, []);
		useEventListener("resize", handleWindowResize);
		useEffect(() => {
			awardRef.current = awardBreakdown;
			if (awardBreakdown.length > 0) buildVirtualTree(awardRef.current, amountType, hoveredAwardType, totalAmount);
		}, [
			awardBreakdown,
			buildVirtualTree,
			amountType,
			hoveredAwardType,
			totalAmount
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
			className: "award-breakdown__treemap",
			children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
				className: "usa-da-treemap-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
					className: "treemap-inner-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(CreateAwardTypeTooltip, {
						sectionWrapper,
						hoveredAwardType,
						awardBreakdown,
						virtualChart,
						totalAmount,
						toggleState
					}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(AwardBreakdownTreeMapCells, {
						virtualChart,
						setHoveredAwardType,
						sectionWrapper,
						visualizationWidth,
						visualizationHeight
					})]
				})
			})
		});
	};
	AwardBreakdownTreeMap.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/AwardBreakdownTable.jsx
var import_jsx_runtime$27, propTypes$12, AwardBreakdownTable;
var init_AwardBreakdownTable = __esmMin((() => {
	import_jsx_runtime$27 = require_jsx_runtime();
	propTypes$12 = {
		awardBreakdown: PropTypes.array,
		hasNegatives: PropTypes.bool
	};
	AwardBreakdownTable = ({ toggleState, awardBreakdown, hasNegatives }) => {
		const amountType = toggleState ? "totalOutlays" : "amount";
		const amountTypeHeader = toggleState ? "Outlays" : "Obligations";
		const generateRows = () => awardBreakdown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("tr", {
			className: "award-breakdown-table__row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("td", {
					className: "award-breakdown-table__data",
					children: row.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("td", {
					className: "award-breakdown-table__data",
					children: row[amountType]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("td", {
					className: "award-breakdown-table__data",
					children: row.count
				})
			]
		}, row.type));
		let greatThanOneHundredDescription = null;
		if (hasNegatives) greatThanOneHundredDescription = /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("strong", { children: "Note:" }), " The award types above add up to more than 100% due to negative values not shown here."] }) });
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("table", {
			className: "award-breakdown-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("thead", {
				className: "award-breakdown-table__head",
				children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("tr", {
					className: "award-breakdown-table__row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("th", {
							className: "award-breakdown-table__header-cell",
							children: "Award Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("th", {
							className: "award-breakdown-table__header-cell",
							children: amountTypeHeader
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("th", {
							className: "award-breakdown-table__header-cell",
							children: "Count"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("tbody", {
				className: "award-breakdown-table__body",
				children: generateRows()
			})]
		}), greatThanOneHundredDescription] });
	};
	AwardBreakdownTable.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/containers/useFetchAwardBreakdown.jsx
var useFetchAwardBreakdown;
var init_useFetchAwardBreakdown = __esmMin((() => {
	init_modern();
	init_state();
	useFetchAwardBreakdown = (id, fy) => {
		const { data, isSuccess, isLoading, error } = useQuery({
			queryKey: [`awardBreakdownStateProfile${id}${fy}`],
			queryFn: () => fetchAwardBreakdown(id, fy).promise,
			enabled: !!id,
			staleTime: 6e4
		});
		return {
			data,
			isSuccess,
			isLoading,
			error
		};
	};
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/containers/AwardBreakdownContainer.jsx
/**
* AwardBreakdownContainer.jsx
* Created by Lizzie Salita 5/16/18
*/
var import_jsx_runtime$26, propTypes$11, AwardBreakdownContainer;
var init_AwardBreakdownContainer = __esmMin((() => {
	init_index_es();
	init_BaseAwardBreakdownRow();
	init_AwardBreakdownTreeMap();
	init_AwardBreakdownTable();
	init_useFetchAwardBreakdown();
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$11 = {
		fy: PropTypes.string,
		id: PropTypes.string,
		toggleState: PropTypes.bool
	};
	AwardBreakdownContainer = ({ fy, id, toggleState }) => {
		const [awardBreakdown, setAwardBreakdown] = useState([]);
		const [rows, setRows] = useState([]);
		const [totalAmount, setTotalAmount] = useState(0);
		const [hasNegatives, setHasNegatives] = useState(false);
		const { data, isSuccess, isLoading, error } = useFetchAwardBreakdown(id, fy);
		const dataByAwardType = useCallback((results, amountType) => {
			const newTotalAmount = reduce(results, (sum, awardType) => sum + parseFloat(awardType[amountType]), 0);
			const newHasNegatives = reduce(results, (sum, awardType) => {
				if (parseFloat(awardType.amount) >= 0) return sum + parseFloat(awardType[amountType]);
				return sum;
			}, 0) > newTotalAmount;
			const newRows = (results?.sort((rowA, rowB) => rowB[amountType] - rowA[amountType])).map((result) => {
				const row = Object.create(BaseAwardBreakdownRow);
				row.populate(result);
				return row;
			});
			setAwardBreakdown(results);
			setRows(newRows);
			setTotalAmount(newTotalAmount);
			setHasNegatives(newHasNegatives);
		});
		useEffect(() => {
			if (isSuccess && data) {
				const toggleType = toggleState ? "total_outlays" : "amount";
				dataByAwardType([...data.data], toggleType);
			}
		}, [
			isSuccess,
			data,
			toggleState
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)($s, {
			width: 8,
			desktop: 8,
			tablet: 12,
			mobile: 12,
			children: [
				isLoading && /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(Wo, {}),
				error && /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(fo, {}),
				!isLoading && (awardBreakdown.length === 0 || totalAmount === 0) && /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(lo, {
					title: "No Results",
					description: "This award doesn't contain outlay data.",
					className: "no-results"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
					className: "state-section__viz award-breakdown",
					id: "award",
					children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
						className: "award-breakdown__content",
						children: !isLoading && !error && awardBreakdown.length > 0 && totalAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)(import_jsx_runtime$26.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(AwardBreakdownTreeMap, {
							activeFY: fy,
							awardBreakdown,
							totalAmount,
							toggleState
						}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(AwardBreakdownTable, {
							awardBreakdown: rows,
							hasNegatives,
							toggleState
						})] })
					})
				})
			]
		});
	};
	AwardBreakdownContainer.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/AwardBreakdownHeader.jsx
/**
* AwardBreakdownHeader.jsx
* Created on 12/15/2025 by Josue Aguilar
*/
var import_jsx_runtime$25, propTypes$10, AwardBreakdownHeader;
var init_AwardBreakdownHeader = __esmMin((() => {
	init_index_es();
	init_dist();
	init_RoundedToggle();
	init_Accordion();
	init_GlossaryLink();
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$10 = {
		toggle: PropTypes.bool,
		setToggle: PropTypes.func
	};
	AwardBreakdownHeader = ({ toggle, setToggle }) => {
		const [open, setOpen] = useState(false);
		const onToggle = () => {
			setToggle(!toggle);
		};
		const onKeyToggle = (event) => {
			if (event.key === "Enter") setToggle(!toggle);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)($s, {
			width: 8,
			desktop: 8,
			tablet: 12,
			mobile: 12,
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "state-section__viz award-breakdown",
				id: "award",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
					className: "award-breakdown__heading-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("h3", {
						className: "state-overview__heading",
						children: "Award Breakdown"
					}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
						className: "state-overview__heading-right-side",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(RoundedToggle, {
								toggle,
								onKeyToggle,
								onToggle,
								label: "View Outlays"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", { className: "state-overview__line-div" }),
							/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Accordion, {
								setOpen,
								closedIcon: "chevron-down",
								openIcon: "chevron-up",
								title: "About Outlays"
							})
						]
					})]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
					className: "state-overview__what-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(FontAwesomeIcon, {
							icon: "info-circle",
							className: "state-overview__info-icon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("p", {
							className: "state-overview__what-heading",
							children: "What is an outlay?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("p", {
							className: "state-overview__what-text",
							children: [
								"An ",
								/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
									className: "state-overview__emphasis",
									children: "outlay"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(GlossaryLink, { term: "outlay" }),
								" is money that has been paid out from a federal account. This should not be confused with an ",
								/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("span", {
									className: "state-overview__emphasis",
									children: ["obligation\xA0", /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(GlossaryLink, { term: "obligation" })]
								}),
								" , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government's obligations."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("p", {
							className: "state-overview__what-second-heading",
							children: "How do outlays relate to the chart below?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("p", {
							className: "state-overview__what-text",
							children: "The chart below can be filtered to view outlayed amounts for each award type. Outlay amounts displayed below may have been paying off obligations that occurred in a prior year, which is why obligations and outlays from a single year are not comparable. The award types above add up to more than 100% due to negative values not shown here."
						})
					]
				})]
			})
		}) });
	};
	AwardBreakdownHeader.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/card/DetailsTooltip.jsx
/**
* DetailsTooltip.jsx
* Created by Lizzie Salita 5/8/18
*/
var import_jsx_runtime$24, propTypes$9, DetailsTooltip;
var init_DetailsTooltip = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$9 = { closeTooltip: PropTypes.func };
	DetailsTooltip = ({ closeTooltip }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
			ref: useRef(null),
			onBlur: closeTooltip,
			onMouseLeave: closeTooltip,
			className: "state-overview-tooltip",
			style: {
				top: 44,
				left: 100
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "state-overview-tooltip__info_icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(InfoCircle, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
				className: "state-overview-tooltip__text_holder",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
					className: "state-overview-tooltip__tooltip_title",
					children: "Data Sources"
				}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
					className: "state-overview-tooltip__tooltip_text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", { children: "The amounts used are based on U.S. Census data of specific years noted in parentheses." }), /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("strong", { children: "Awarded Amount Per Capita" }), " is calculated using the Total Award Amount of the selected time period, divided by the population amount shown in the table."] })]
				})]
			})]
		});
	};
	DetailsTooltip.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/card/AwardBreakdownCardHeadline.jsx
/**
* AwardBreakdownCardHeadline.jsx
* Created on 12/15/2025 by Josue Aguilar
*/
var import_jsx_runtime$23, AwardBreakdownCardHeadline;
var init_AwardBreakdownCardHeadline = __esmMin((() => {
	init_Icons();
	init_DetailsTooltip();
	import_jsx_runtime$23 = require_jsx_runtime();
	AwardBreakdownCardHeadline = () => {
		const [showInfoTooltip, setShowInfoTooltip] = useState(false);
		useEffect(() => {
			if (showInfoTooltip) {
				const closeButton = document.querySelector("#state-overview-tooltip__close_icon");
				if (closeButton) closeButton.focus();
			}
		}, [showInfoTooltip]);
		const showTooltip = () => {
			setShowInfoTooltip(true);
		};
		const closeTooltip = () => {
			setShowInfoTooltip(false);
		};
		let tooltip = null;
		if (showInfoTooltip) tooltip = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DetailsTooltip, { closeTooltip });
		return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
			className: "state-section__viz",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("h3", {
				className: "state-overview__heading",
				children: ["Details", /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
					className: "details__info_icon_holder",
					children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("button", {
						id: "details__info_icon",
						className: "details__info_icon",
						onFocus: showTooltip,
						onBlur: closeTooltip,
						onMouseEnter: showTooltip,
						onClick: showTooltip,
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(InfoCircle, {})
					})
				})]
			}), tooltip]
		});
	};
}));
//#endregion
//#region src/js/hooks/useQueryTemp.jsx
var useQueryTemp;
var init_useQueryTemp = __esmMin((() => {
	init_axios();
	useQueryTemp = (callbackFunc = () => {}) => {
		const [data, setData] = useState();
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const requestRef = useRef(null);
		const fetchData = useCallback((request, params = null) => {
			setLoading(true);
			setError(false);
			if (requestRef.current) requestRef.current.cancel();
			requestRef.current = request(params);
			requestRef.current.promise.then((res) => {
				setData(res.data);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.error("Query error:", err);
					setError(true);
					setData(void 0);
				}
			}).finally(() => {
				setLoading(false);
				requestRef.current = null;
			});
		}, []);
		useEffect(() => {
			if (data) callbackFunc(data);
		}, [data, callbackFunc]);
		return {
			loading,
			error,
			data,
			fetchData
		};
	};
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/card/AwardBreakdownCardButton.jsx
/**
* AwardBreakdownCardHeadline.jsx
* Created on 12/15/2025 by Josue Aguilar
*/
var import_jsx_runtime$22, propTypes$8, AwardBreakdownCardButton;
var init_AwardBreakdownCardButton = __esmMin((() => {
	init_dist();
	init_index_es();
	init_searchFiltersReducer();
	init_GlobalConstants();
	init_searchHelper();
	init_useQueryTemp();
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$8 = {
		code: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string
	};
	AwardBreakdownCardButton = ({ code, name, type }) => {
		const { fetchData } = useQueryTemp(useCallback(({ hash }) => {
			window.open(`/search/?hash=${hash}`, "_blank");
		}, []));
		const usaCode = `USA_${code}`;
		const handleGoToAdvancedSearch = (e) => {
			e?.preventDefault();
			const filterValue = {
				filters: {
					...initialState,
					selectedLocations: { usaCode: {
						filter: {
							state: code,
							country: "USA"
						},
						display: {
							title: name,
							entity: type.charAt(0).toUpperCase() + type.slice(1),
							standalone: name
						},
						identifier: usaCode
					} }
				},
				version: globalConstants.REQUEST_VERSION
			};
			fetchData(generateUrlHash, filterValue);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(lc, {
			customClassName: "details-button",
			onlyPerformAction: true,
			text: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", { children: ["View awards to this state ", /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] }),
			variant: "secondary",
			textAlignment: "center",
			action: handleGoToAdvancedSearch
		});
	};
	AwardBreakdownCardButton.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/features/state/overview/awardBreakdown/card/AwardBreakdownCard.jsx
var import_jsx_runtime$21, propTypes$7, AwardBreakdownCard;
var init_AwardBreakdownCard = __esmMin((() => {
	init_index_es();
	init_AwardBreakdownCardHeadline();
	init_AwardBreakdownCardButton();
	import_jsx_runtime$21 = require_jsx_runtime();
	propTypes$7 = { overview: PropTypes.object };
	AwardBreakdownCard = ({ overview }) => {
		let populationSourceYearLabel = "";
		let incomeSourceYearLabel = "";
		const { code, name, type, population, populationSourceYear, incomeSourceYear, awardAmountPerCapita, medianHouseholdIncome } = overview;
		if (population !== "--" && populationSourceYear) populationSourceYearLabel = `(${populationSourceYear} est.)`;
		if (medianHouseholdIncome !== "--" && incomeSourceYear) incomeSourceYearLabel = `(${incomeSourceYear} est.)`;
		return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)($s, {
			width: 4,
			desktop: 4,
			tablet: 12,
			mobile: 12,
			children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
				className: "state-section__viz details state-overview__heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(tc, {
					variant: "outline",
					size: "md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ac, { fill: "#005ea2" }), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(rc, {
						customClassName: "details-card-body",
						headline: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(AwardBreakdownCardHeadline, {}),
						text: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
							className: "details-info",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "details-header",
									children: "Count"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
									className: "details-text",
									children: [
										population,
										" ",
										populationSourceYearLabel
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "details-header",
									children: "Obligations Per Capita"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "details-text",
									children: awardAmountPerCapita
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "details-header",
									children: "Median Household Income"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
									className: "details-text",
									children: [
										medianHouseholdIncome,
										" ",
										incomeSourceYearLabel
									]
								})
							]
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(AwardBreakdownCardButton, {
							code,
							type,
							name
						})
					})]
				})
			})
		});
	};
	AwardBreakdownCard.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/features/state/overview/StateOverview.jsx
/**
* StateOverview.jsx
* Created by Lizzie Salita 5/2/18
*/
var import_jsx_runtime$20, StateOverview;
var init_StateOverview = __esmMin((() => {
	init_dist();
	init_index_es();
	init_es();
	init_GeoVisualizationSectionContainer();
	init_SummaryStats();
	init_AwardBreakdownContainer();
	init_AwardBreakdownHeader();
	init_AwardBreakdownCard();
	import_jsx_runtime$20 = require_jsx_runtime();
	StateOverview = () => {
		const { overview, fy, id } = useSelector((state) => state.stateProfile);
		const [hideFlag, setHideFlag] = useState(true);
		const [flag, setFlag] = useState("");
		const [toggle, setToggle] = useState(false);
		useEffect(() => {
			let flagPrep = null;
			let hideFlagPrep = "hide";
			if (overview.flag !== "") {
				hideFlagPrep = "";
				flagPrep = /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("img", {
					src: overview.flag,
					alt: overview.name
				});
			}
			setFlag(flagPrep);
			setHideFlag(hideFlagPrep);
		}, [
			overview.flag,
			overview.name,
			overview.id
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			id: "state-overview",
			className: "state-section state-overview",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "state-overview__title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: `state-overview__flag ${hideFlag}`,
						children: flag
					}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", {
						className: "state-overview__title",
						children: overview.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ws, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(FontAwesomeIcon, {
						icon: "map-marker-alt",
						size: "2x"
					}),
					title: "Overview",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("hr", { className: "results-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "state-overview__content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
							className: "state-overview__note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("strong", { children: "Note: " }), "All data on this page is based on Primary Place of Performance."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(SummaryStats, { overview }),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(AwardBreakdownHeader, {
							toggle,
							setToggle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(Qs, { children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(AwardBreakdownContainer, {
							fy,
							id,
							toggleState: toggle
						}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(AwardBreakdownCard, { overview })] }),
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(GeoVisualizationSectionContainer, {})
					]
				})
			]
		});
	};
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/CustomShape.jsx
var import_jsx_runtime$19, customShapePropTypes, CustomShape;
var init_CustomShape = __esmMin((() => {
	import_jsx_runtime$19 = require_jsx_runtime();
	customShapePropTypes = {
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
		focusBar: PropTypes.bool,
		barColor: PropTypes.string,
		isActive: PropTypes.bool
	};
	CustomShape = ({ x, y, width, height, focusBar, barColor, isActive }) => {
		const fill = barColor;
		let fillOpacity = "1";
		if (focusBar && !isActive) fillOpacity = "0.5";
		const maxWidth = width > 120 ? 120 : width;
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("rect", {
			x: x + (width / 2 - maxWidth / 2),
			y: height < 0 ? y - Math.abs(height) : y,
			width: maxWidth,
			height: Math.abs(height),
			fill,
			fillOpacity,
			className: "recharts-bars"
		});
	};
	CustomShape.propTypes = customShapePropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/CustomXTick.jsx
var import_jsx_runtime$18, customXTickPropTypes, CustomXTick;
var init_CustomXTick = __esmMin((() => {
	import_jsx_runtime$18 = require_jsx_runtime();
	customXTickPropTypes = {
		x: PropTypes.number,
		y: PropTypes.number,
		payload: PropTypes.object
	};
	CustomXTick = ({ x, y, payload }) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("g", {
		transform: `translate(${x},${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("text", {
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
	CustomXTick.propTypes = customXTickPropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/CustomYTick.jsx
var import_jsx_runtime$17, customYTickPropTypes, CustomYTick;
var init_CustomYTick = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$17 = require_jsx_runtime();
	customYTickPropTypes = {
		x: PropTypes.number,
		y: PropTypes.number,
		payload: PropTypes.object
	};
	CustomYTick = ({ x, y, payload }) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("g", {
		transform: `translate(${x},${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("text", {
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
	CustomYTick.propTypes = customYTickPropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/CustomTooltip.jsx
var import_jsx_runtime$16, customTooltipPropTypes, CustomTooltip;
var init_CustomTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$16 = require_jsx_runtime();
	customTooltipPropTypes = {
		active: PropTypes.bool,
		payload: PropTypes.array,
		label: PropTypes.string,
		onMouseLeave: PropTypes.func,
		textLabel: PropTypes.string
	};
	CustomTooltip = ({ active, payload, label, onMouseLeave, textLabel }) => {
		if (active && payload && payload.length) return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "custom-tooltip",
			role: "status",
			"aria-live": "assertive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "tooltip__title",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
				className: "tooltip__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
					className: "tooltip__text-label",
					children: textLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
					className: "tooltip__text-amount",
					children: formatMoneyWithUnitsShortLabel(payload[0].value)
				})]
			})]
		});
		onMouseLeave();
		return null;
	};
	CustomTooltip.propTypes = customTooltipPropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/CustomLegend.jsx
var import_jsx_runtime$15, customLegendPropTypes, CustomLegend;
var init_CustomLegend = __esmMin((() => {
	init_BarChartLegend();
	import_jsx_runtime$15 = require_jsx_runtime();
	customLegendPropTypes = {
		barColor: PropTypes.string,
		label: PropTypes.string
	};
	CustomLegend = ({ barColor, label }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("svg", {
			className: "bar-graph",
			height: 20,
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("g", {
				className: "legend-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(BarChartLegend, { legend: [{
					color: barColor,
					label,
					offset: 0
				}] })
			})
		});
	};
	CustomLegend.propTypes = customLegendPropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/chart/StateTimeVisualizationChart.jsx
/**
* StateTimeVisualizationChart.jsx
* Created by Keith Didier 09/23/2024
**/
var import_jsx_runtime$14, stateTimeVisualizationChartPropTypes, StateTimeVisualizationChart;
var init_StateTimeVisualizationChart = __esmMin((() => {
	init_es6();
	init_index_es();
	init_CustomShape();
	init_CustomXTick();
	init_CustomYTick();
	init_CustomTooltip();
	init_CustomLegend();
	import_jsx_runtime$14 = require_jsx_runtime();
	stateTimeVisualizationChartPropTypes = {
		data: PropTypes.object,
		loading: PropTypes.bool,
		outlayToggle: PropTypes.bool,
		visualizationPeriod: PropTypes.string
	};
	StateTimeVisualizationChart = ({ data, loading, outlayToggle, visualizationPeriod }) => {
		const [focusBar, setFocusBar] = useState(null);
		const transformedData = [];
		const barColor = !outlayToggle ? "#0081a1" : "#008480";
		const legendLabel = !outlayToggle ? "Transactions" : "Outlays";
		let label;
		let value;
		if (visualizationPeriod === "fiscal_year") if (!outlayToggle) {
			data.combined.sort((a, b) => a.x > b.x ? 1 : b.x > a.x ? -1 : 0);
			for (let i = 0; i < data.combined.length; i++) {
				label = data.combined[i].x;
				value = data.combined[i].y;
				transformedData.push({
					label,
					value
				});
			}
		} else {
			data.combinedOutlay.sort((a, b) => a.x > b.x ? 1 : b.x > a.x ? -1 : 0);
			for (let i = 0; i < data.combinedOutlay.length; i++) {
				label = data.combinedOutlay[i].x;
				value = data.combinedOutlay[i].y;
				transformedData.push({
					label,
					value
				});
			}
		}
		else for (let i = 0; i < data?.xSeries?.length; i++) {
			if (data?.ySeries[i][0] !== 0) {
				label = data?.xSeries[i][0];
				if (!outlayToggle) value = data?.ySeries[i][0];
				else value = data?.ySeriesOutlay[i][0];
			}
			transformedData.push({
				label,
				value
			});
		}
		const onMouseLeave = useCallback(() => {
			if (focusBar) setFocusBar(null);
		}, [focusBar]);
		const onMouseMove = () => setFocusBar(true);
		const renderChart = () => {
			if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Wo, {});
			else if (transformedData.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Go, {});
			return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(BarChart, {
				height: 350,
				data: transformedData,
				accessibilityLayer: true,
				margin: {
					top: 5,
					right: 30,
					bottom: 5
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(XAxis, {
						dataKey: "label",
						tick: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomXTick, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(YAxis, {
						dataKey: "value",
						tick: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomYTick, {}),
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Tooltip, {
						cursor: { fill: "#fff" },
						filterNull: true,
						content: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomTooltip, { label: legendLabel }),
						isAnimationActive: false,
						onMouseLeave
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Legend, {
						align: "left",
						content: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomLegend, {
							barColor,
							label: legendLabel
						}),
						wrapperStyle: {
							left: 60,
							bottom: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ReferenceLine, {
						y: 0,
						stroke: "#dfe1e2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Bar, {
						dataKey: "value",
						shape: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomShape, {
							focusBar,
							barColor
						}),
						activeBar: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CustomShape, {
							isActive: true,
							focusBar,
							barColor
						}),
						onMouseEnter: onMouseMove,
						onMouseOut: onMouseLeave,
						onMouseLeave
					})
				]
			}) });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "state-visualization__time-wrapper",
			children: renderChart()
		});
	};
	StateTimeVisualizationChart.propTypes = stateTimeVisualizationChartPropTypes;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/header/OutlaysToggle.jsx
var import_jsx_runtime$13, propTypes$6, OutlaysToggle;
var init_OutlaysToggle = __esmMin((() => {
	init_RoundedToggle();
	init_Accordion();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$6 = {
		outlayToggle: PropTypes.bool,
		setOutlayToggle: PropTypes.func,
		outlayWhatOpen: PropTypes.bool,
		setOutlayWhatOpen: PropTypes.func
	};
	OutlaysToggle = ({ outlayToggle, setOutlayToggle, outlayWhatOpen, setOutlayWhatOpen }) => {
		const onOutlaysToggle = () => setOutlayToggle(!outlayToggle);
		const onKeyOutlaysToggle = (e) => {
			if (e.key === "Enter") setOutlayToggle(!outlayToggle);
		};
		const setWhatOpen = () => {
			setOutlayWhatOpen(!outlayWhatOpen);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "state__right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RoundedToggle, {
					toggle: outlayToggle,
					onKeyToggle: onKeyOutlaysToggle,
					onToggle: onOutlaysToggle,
					label: "View Outlays",
					id: "state__controls-toggle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { className: "state__line-div" }),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Accordion, {
					setOpen: setWhatOpen,
					closedIcon: "chevron-down",
					openIcon: "chevron-up",
					title: "What is this?"
				})
			]
		});
	};
	OutlaysToggle.propTypes = propTypes$6;
}));
var init_OutlaysExplanation = __esmMin((() => {
	init_dist();
	init_GlossaryLink();
	require_jsx_runtime();
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/header/StateTimeVisualizationHeader.jsx
/**
* StateTimeVisualizationHeader.jsx
* Created on 12/17/2025 by Josue Aguilar
*/
var import_jsx_runtime$11, StateTimeVisualizationHeader;
var init_StateTimeVisualizationHeader = __esmMin((() => {
	init_index_es();
	init_dist();
	init_OutlaysToggle();
	init_OutlaysExplanation();
	import_jsx_runtime$11 = require_jsx_runtime();
	StateTimeVisualizationHeader = ({ visualizationPeriod, updateVisualizationPeriod, outlayToggle, setOutlayToggle }) => {
		const [outlayWhatOpen, setOutlayWhatOpen] = useState(false);
		const onClick = (e) => {
			updateVisualizationPeriod(e);
		};
		const dropdownOptions = [
			{
				name: "Year",
				value: "fiscal_year",
				onClick
			},
			{
				name: "Quarter",
				value: "quarter",
				onClick
			},
			{
				name: "Month",
				value: "month",
				onClick
			}
		];
		const sortFn = () => dropdownOptions;
		const showOutlays = false;
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ws, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
					icon: "chart-bar",
					size: "2x"
				}),
				title: "Transactions Over Time",
				titleTooltip: { component: false },
				descTooltip: { component: false }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("hr", { className: "results-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "state-section__description",
				children: [
					"The graph below shows trends over time for transactions to this state.",
					" ",
					"Break down the amounts by years, quarters, or months,",
					" ",
					"and hover over the bars for more detailed information."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "state__controls-desktop",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(fc, {
					leftIcon: "",
					size: "md",
					options: dropdownOptions,
					label: "View by",
					enabled: true,
					classname: "state-dropdown__picker",
					selectedOption: dropdownOptions?.length ? dropdownOptions?.find((obj) => obj.value === visualizationPeriod)?.name : `${visualizationPeriod}`,
					sortFn
				}), showOutlays]
			}),
			showOutlays
		] });
	};
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/StateTimeVisualizationSection.jsx
/**
* StateTimeVisualizationSection.jsx
* Created by David Trinh 5/15/18
*/
var import_jsx_runtime$10, propTypes$5, StateTimeVisualizationSection;
var init_StateTimeVisualizationSection = __esmMin((() => {
	init_StateTimeVisualizationChart();
	init_StateTimeVisualizationHeader();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$5 = {
		data: PropTypes.object,
		loading: PropTypes.bool,
		visualizationPeriod: PropTypes.string,
		updateVisualizationPeriod: PropTypes.func
	};
	StateTimeVisualizationSection = ({ data, loading, visualizationPeriod, updateVisualizationPeriod }) => {
		const [outlayToggle, setOutlayToggle] = useState(false);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("section", {
			id: "state-transactions-over-time",
			className: "state-section transactions-over-time",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(StateTimeVisualizationHeader, {
				updateVisualizationPeriod,
				visualizationPeriod,
				outlayToggle,
				setOutlayToggle
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(StateTimeVisualizationChart, {
				visualizationPeriod,
				loading,
				data,
				outlayToggle
			})]
		});
	};
	StateTimeVisualizationSection.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/containers/useFetchSpendingOverTime.jsx
/**
* useFetchSpendingOverTime.jsx
* Created by Andrea Blackwell 02/26/26
*/
var useFetchSpendingOverTime;
var init_useFetchSpendingOverTime = __esmMin((() => {
	init_modern();
	init_searchHelper();
	init_monthHelper();
	init_stateHelper();
	useFetchSpendingOverTime = (visualizationPeriod, code) => {
		const [parsedData, setParsedData] = useState(null);
		const generateTime = useCallback((group, timePeriod, type) => {
			const month = convertNumToShortMonth(timePeriod.month);
			const year = convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);
			if (group === "fiscal_year") return type === "label" ? `${timePeriod.fiscal_year}` : {
				period: null,
				year: timePeriod.fiscal_year
			};
			else if (group === "quarter") return type === "label" ? `Q${timePeriod.quarter} ${timePeriod.fiscal_year}` : {
				period: `Q${timePeriod.quarter}`,
				year: `${timePeriod.fiscal_year}`
			};
			return type === "label" ? `${month} ${year}` : {
				period: `${month}`,
				year: `${year}`
			};
		});
		const parseData = useCallback((res) => {
			const groupsLocal = [];
			const xSeriesLocal = [];
			const ySeriesLocal = [];
			const combinedLocal = [];
			const combinedOutlayLocal = [];
			const ySeriesOutlayLocal = [];
			res.results.forEach((item) => {
				groupsLocal.push(generateTime(visualizationPeriod, item.time_period, "label"));
				xSeriesLocal.push([generateTime(visualizationPeriod, item.time_period, "label")]);
				ySeriesLocal.push([parseFloat(item.aggregated_amount)]);
				combinedLocal.push({
					x: generateTime(visualizationPeriod, item.time_period, "label"),
					y: parseFloat(item.aggregated_amount)
				});
				ySeriesOutlayLocal.push([parseFloat(item.total_outlays)]);
				combinedOutlayLocal.push({
					x: generateTime(visualizationPeriod, item.time_period, "label"),
					y: parseFloat(item.total_outlays)
				});
			});
			setParsedData({
				groupsLocal,
				xSeriesLocal,
				ySeriesLocal,
				combinedLocal,
				combinedOutlayLocal,
				ySeriesOutlayLocal
			});
		}, [generateTime, visualizationPeriod]);
		const { data, isSuccess, isLoading, error } = useQuery({
			queryKey: [`spendingOverTimeSearch${code}${visualizationPeriod}`],
			queryFn: () => performSpendingOverTimeSearch(createApiParams(code, visualizationPeriod)).promise,
			enabled: !!(code && visualizationPeriod),
			staleTime: 6e4
		});
		useEffect(() => {
			if (isSuccess && Object.keys(data?.data).length > 0) parseData(data?.data);
		}, [data, isSuccess]);
		return {
			parsedData,
			isSuccess,
			isLoading,
			error
		};
	};
}));
//#endregion
//#region src/js/features/state/transactionsOverTime/containers/StateTimeVisualizationSectionContainer.jsx
/**
* StateTimeVisualizationSectionContainer.jsx
* Created by David Trinh 5/15/18
*/
var import_jsx_runtime$9, StateTimeVisualizationSectionContainer;
var init_StateTimeVisualizationSectionContainer = __esmMin((() => {
	init_es();
	init_StateTimeVisualizationSection();
	init_useFetchSpendingOverTime();
	import_jsx_runtime$9 = require_jsx_runtime();
	StateTimeVisualizationSectionContainer = () => {
		const { code } = useSelector((state) => state.stateProfile.overview);
		const [visualizationPeriod, setVisualizationPeriod] = useState("fiscal_year");
		const [groups, setGroups] = useState([]);
		const [xSeries, setXSeries] = useState([]);
		const [ySeries, setYSeries] = useState([]);
		const [combined, setCombined] = useState([]);
		const [combinedOutlay, setCombinedOutlay] = useState();
		const [ySeriesOutlay, setYSeriesOutlay] = useState([]);
		const { parsedData, isSuccess, isLoading, error } = useFetchSpendingOverTime(visualizationPeriod, code);
		const updateVisualizationPeriod = (newVizPeriod) => {
			setVisualizationPeriod(newVizPeriod);
		};
		useEffect(() => {
			if (isSuccess && parsedData && Object.keys(parsedData).length > 0) {
				setGroups(parsedData.groupsLocal);
				setXSeries(parsedData.xSeriesLocal);
				setYSeries(parsedData.ySeriesLocal);
				setCombined(parsedData.combinedLocal);
				setCombinedOutlay(parsedData.combinedOutlayLocal);
				setYSeries(parsedData.ySeriesLocal);
				setYSeriesOutlay(parsedData.ySeriesOutlayLocal);
			}
		}, [isSuccess, parsedData]);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(StateTimeVisualizationSection, {
			data: {
				loading: isLoading,
				error,
				groups,
				xSeries,
				ySeries,
				combined,
				combinedOutlay,
				ySeriesOutlay
			},
			loading: isLoading,
			updateVisualizationPeriod,
			visualizationPeriod
		});
	};
}));
//#endregion
//#region src/js/features/state/StateFooter.jsx
var import_jsx_runtime$8, StateFooter;
var init_StateFooter = __esmMin((() => {
	init_development();
	import_jsx_runtime$8 = require_jsx_runtime();
	StateFooter = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
		className: "state-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "footer-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("h4", { children: "Looking for more insight?" }),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("p", { children: [
					"Check out the ",
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("strong", { children: "Advanced Search" }),
					" page ",
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"for more in-depth analysis on this state and more"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Link, {
					className: "state-search-button",
					to: "/search",
					children: "Let's go!"
				})
			]
		})
	});
}));
//#endregion
//#region src/js/features/state/statePageToolbarComponents.jsx
var import_jsx_runtime$7, statePageToolbarComponents;
var init_statePageToolbarComponents = __esmMin((() => {
	init_index_es();
	init_socialShare();
	init_fiscalYearHelper();
	init_ShareIcon508();
	import_jsx_runtime$7 = require_jsx_runtime();
	statePageToolbarComponents = (stateProfile, handleFyChange, handleShareDispatch) => {
		const backgroundColor = "#1a4480";
		const slug = `state/${stateProfile.id}/${stateProfile.fy}`;
		const emailArgs = {
			subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
			body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
		};
		return [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Vs, {
			backgroundColor,
			selectedFy: stateProfile?.fy,
			handleFyChange,
			options: getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())
		}, "state-page__fy-picker"), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ShareIcon508, {
			onShareOptionClick: handleShare,
			url: getBaseUrl(slug)
		}, "state-page__share-icon")];
	};
}));
//#endregion
//#region src/js/features/state/StatePageWrapper.jsx
var import_jsx_runtime$6, stateSections, propTypes$4, StatePageWrapper;
var init_StatePageWrapper = __esmMin((() => {
	init_development();
	init_es();
	init_metaTagHelper();
	init_queryParams();
	init_stickyHeader();
	init_useQueryParams();
	init_modalActions();
	init_IsMobileContext();
	init_PageWrapper();
	init_statePageToolbarComponents();
	import_jsx_runtime$6 = require_jsx_runtime();
	stateSections = [
		{
			section: "overview",
			label: "Overview"
		},
		{
			section: "transactions-over-time",
			label: "Transactions Over Time"
		},
		{
			section: "top-five",
			label: "Top 5"
		}
	];
	propTypes$4 = {
		stateProfile: PropTypes.object,
		handleFyChange: PropTypes.func,
		loading: PropTypes.bool,
		children: PropTypes.element
	};
	StatePageWrapper = ({ stateProfile, children, handleFyChange, loading }) => {
		const query = useQueryParams();
		const history = useNavigate();
		const { isMedium } = useContext(IsMobileContext);
		const [activeSection, setActiveSection] = useState(query.section || "overview");
		const dispatch = useDispatch();
		const { name, id } = stateProfile.overview;
		const metaTagProps = useMemo(() => name && id ? statePageMetaTags({
			name,
			id
		}) : {}, [name, id]);
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const jumpToSection = (section = "") => {
			const sectionObj = find(stateSections, ["section", section]);
			if (!sectionObj) return;
			const sectionDom = document.querySelector(`#state-${sectionObj.section}`);
			if (!sectionDom) return;
			const newQueryParams = combineQueryParams(query, { section: `${section}` });
			history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			const sectionTop = sectionDom.offsetTop - 66;
			window.scrollTo({
				top: sectionTop - 55,
				left: 0,
				behavior: "smooth"
			});
			setActiveSection(section);
		};
		useEffect(() => {
			if (!loading && query.section) jumpToSection(query.section);
		}, [
			query.section,
			loading,
			isMedium
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(PageWrapper, {
			pageName: "state",
			classNames: "usa-da-state-page",
			overLine: "state profile",
			title: name,
			metaTagProps,
			toolBarComponents: statePageToolbarComponents(stateProfile, handleFyChange, handleShareDispatch),
			sections: stateSections,
			activeSection,
			jumpToSection,
			loading,
			inPageNav: true,
			children
		});
	};
	StatePageWrapper.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/features/state/topFive/containers/useFetchSpendingBy.jsx
/**
* useFetchSpendingBy.jsx
* Created by Andrea Blackwell 03/19/26
*/
var useFetchSpendingBy;
var init_useFetchSpendingBy = __esmMin((() => {
	init_modern();
	init_searchHelper();
	init_BaseStateCategoryResult();
	init_fiscalYearHelper();
	init_awardType();
	useFetchSpendingBy = (category, code, fy, type) => {
		const [parsedData, setParsedData] = useState(null);
		const [noResults, setNoResults] = useState(false);
		const getDataParams = useCallback(() => {
			let timePeriod = null;
			if (fy === "latest") {
				const trailing = getTrailingTwelveMonths();
				timePeriod = {
					start_date: trailing[0],
					end_date: trailing[1]
				};
			} else if (fy !== "all" && fy) {
				const range = convertFYToDateRange(parseInt(fy, 10));
				timePeriod = {
					start_date: range[0],
					end_date: range[1]
				};
			}
			const filters = {
				place_of_performance_scope: "domestic",
				place_of_performance_locations: [{
					country: "USA",
					state: code
				}]
			};
			if (timePeriod) filters.time_period = [timePeriod];
			if (type !== "all" && awardTypeGroups[type]) filters.award_type_codes = awardTypeGroups[type];
			const params = {
				filters,
				category,
				limit: 5,
				page: 1
			};
			if (category === "awards") {
				filters.award_type_codes = [
					"A",
					"B",
					"C",
					"D"
				];
				params.fields = [
					"Award ID",
					"Award Amount",
					"generated_internal_id"
				];
				params.order = "desc";
				params.sort = "Award Amount";
				params.spending_level = "awards";
			}
			if (category === "defc") {
				params.spending_level = "award_financial";
				params.filters = {
					def_codes: [
						"L",
						"M",
						"N",
						"O",
						"P",
						"U",
						"V",
						"Z",
						"1"
					],
					...filters
				};
			}
			return params;
		}, [
			category,
			code,
			fy,
			type
		]);
		const dataParams = useMemo(() => getDataParams(), [getDataParams]);
		const parseData = (res) => {
			if (!res) setNoResults(true);
			const { results, categories: resCategory } = res;
			if (results.length < 1) setNoResults(true);
			const dataResults = results.map((item, index) => {
				const result = Object.create(BaseStateCategoryResult);
				if (category === "awards") result.populate({
					name: item["Award ID"],
					amount: item["Award Amount"],
					agency_slug: item.generated_internal_id,
					category
				}, index + 1);
				else result.populate({
					...item,
					category
				}, index + 1);
				if (resCategory === "awarding_agency" || resCategory === "awarding_subagency") result.nameTemplate = (resCode, name) => {
					if (resCode) return `${name} (${resCode})`;
					return name;
				};
				else if (resCategory === "recipient") result.nameTemplate = (resCode, name) => name;
				else if (resCategory === "county" || resCategory === "district") result.nameTemplate = (resCode, name) => name;
				return result;
			});
			setParsedData(dataResults);
		};
		const { data, isSuccess, isLoading, error } = useQuery({
			queryKey: [`spendingBy${category}${type}${code}${fy}`],
			queryFn: () => {
				if (category === "awards") return performSpendingByAwardSearch(dataParams).promise;
				return performSpendingByCategorySearch(dataParams).promise;
			},
			enabled: !!(dataParams && code && type && fy),
			staleTime: 6e4
		});
		useEffect(() => {
			if (isSuccess && Object.keys(data?.data).length > 0) parseData(data?.data);
		}, [data, isSuccess]);
		return {
			parsedData,
			noResults,
			isSuccess,
			isLoading,
			error,
			dataParams
		};
	};
}));
//#endregion
//#region src/js/features/state/topFive/containers/TopFiveContainer.jsx
/**
* TopFiveContainer.jsx
* Created by Kevin Li 5/15/18
*/
var import_jsx_runtime$5, propTypes$3, TopFiveContainer;
var init_TopFiveContainer = __esmMin((() => {
	init_es();
	init_TopFive();
	init_useFetchSpendingBy();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = {
		type: PropTypes.string,
		category: PropTypes.string,
		agencyData: PropTypes.object
	};
	TopFiveContainer = ({ category, type, agencyData }) => {
		const { overview, fy } = useSelector((state) => state.stateProfile);
		const [parsedResults, setParsedResults] = useState([]);
		const [noResultState, setNoResultState] = useState(false);
		const { code, _totalAmount: total } = overview;
		const { parsedData, noResults, isSuccess, isLoading, error, dataParams } = useFetchSpendingBy(category, code, fy, type);
		useEffect(() => {
			if (isSuccess && (noResults || parsedData?.length > 0)) {
				setParsedResults(parsedData);
				setNoResultState(noResults);
			}
		}, [
			isSuccess,
			noResults,
			parsedData
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_jsx_runtime$5.Fragment, { children: !noResultState && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TopFive, {
			category,
			results: parsedResults,
			total,
			loading: isLoading,
			error,
			dataParams,
			agencyData
		}) });
	};
	TopFiveContainer.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/features/state/topFive/TopFiveSection.jsx
/**
* TopFiveSection.jsx
* Created by Kevin Li 5/15/18
*/
var import_jsx_runtime$4, propTypes$2, TopFiveSection;
var init_TopFiveSection = __esmMin((() => {
	init_index_es();
	init_dist();
	init_development();
	init_topCategories();
	init_TopFiveContainer();
	init_stateHelper();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = { agencyData: PropTypes.object };
	TopFiveSection = ({ agencyData }) => {
		const [active, setActive] = useState("all");
		const content = categories[active].map((category) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TopFiveContainer, {
			agencyData,
			category,
			type: active
		}, category));
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "state-section topfive",
			id: "state-top-five",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ws, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, {
						icon: "table",
						size: "2x"
					}),
					title: "Top 5",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("hr", { className: "results-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "state-section__description",
					children: [
						"The tables below provide a summary of federal spending in this state through multiple angles. The initial view includes all award types, but you can also view individual award type amounts. To see more than the top 5, visit our ",
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
							className: "usa-bold-link",
							to: "/search",
							children: "Advanced Search"
						}),
						" page."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(vs, {
					types: tabTypes,
					active,
					switchTab: setActive
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "topfive__content",
					children: content
				})
			]
		});
	};
	TopFiveSection.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/features/state/topFive/containers/TopFiveSectionContainer.jsx
var import_jsx_runtime$3, TopFiveSectionContainer;
var init_TopFiveSectionContainer = __esmMin((() => {
	init_useAgencySlugs();
	init_TopFiveSection();
	import_jsx_runtime$3 = require_jsx_runtime();
	TopFiveSectionContainer = () => {
		const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(TopFiveSection, { agencyData: {
			agencySlugs,
			slugsLoading,
			slugsError
		} });
	};
}));
//#endregion
//#region src/js/features/state/StatePage.jsx
var import_jsx_runtime$2, propTypes$1, StatePage;
var init_StatePage = __esmMin((() => {
	init_Helmet();
	init_index_es();
	init_Error();
	init_Loading();
	init_ProfileBackLink();
	init_StateOverview();
	init_StateTimeVisualizationSectionContainer();
	init_StateFooter();
	init_StatePageWrapper();
	init_TopFiveSectionContainer();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = {
		loading: PropTypes.bool,
		error: PropTypes.bool,
		stateProfile: PropTypes.object,
		handleFyChange: PropTypes.func
	};
	StatePage = ({ error, loading, stateProfile = { fy: "" }, handleFyChange }) => {
		let content = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Qs, {
			className: "state-content-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
				className: "state-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StateOverview, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StateTimeVisualizationSectionContainer, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TopFiveSectionContainer, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StateFooter, {})
				]
			})
		});
		if (error) content = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Error, {
			title: "Invalid State",
			message: "The state ID provided is invalid. Please check the ID and try again."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StatePageWrapper, {
			stateProfile,
			handleFyChange,
			loading,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ProfileBackLink, {
						label: "Back to State Profile Page",
						url: "/state"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(HelmetExport, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("link", {
						href: "https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css",
						rel: "stylesheet",
						crossOrigin: "anonymous",
						integrity: "sha384-JnF4GvwrnLggHxx0ORCeHombtPxfqigY/GeEvbdv0Uy5qrCAuAyN3AulKRA+VAPr"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LoadingWrapper, {
						isLoading: loading,
						children: content
					})
				]
			})
		});
	};
	StatePage.propTypes = propTypes$1;
}));
//#endregion
//#region src/_scss/pages/state/statePage.scss
var require_statePage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/features/state/containers/StatePageContainer.jsx
/**
* StatePageContainer.jsx
* Created by Lizzie Salita 5/1/18
*/
var import_jsx_runtime$1, propTypes, StatePageContainer;
var init_StatePageContainer = __esmMin((() => {
	init_es();
	init_stateActions();
	init_mapHelper();
	init_useFetchOverview();
	init_StatePage();
	import_jsx_runtime$1 = require_jsx_runtime();
	require_statePage();
	propTypes = {
		handleFyChange: PropTypes.func,
		stateId: PropTypes.string,
		state: PropTypes.string,
		fy: PropTypes.string
	};
	StatePageContainer = ({ handleFyChange, stateId, state, fy }) => {
		const stateProfile = useSelector((s) => s.stateProfile);
		const dispatch = useDispatch();
		const { stateProfileData, isSuccess, isLoading, error } = useFetchOverview(stateId, fy);
		useEffect(() => {
			if (isSuccess && stateProfileData && Object.keys(stateProfileData).length > 0) dispatch(setStateOverview(stateProfileData));
		}, [isSuccess, stateProfileData]);
		useEffect(() => {
			dispatch(setStateFiscalYear(fy));
			const center = stateCenterFromFips(stateId);
			dispatch(setStateCenter(center));
		}, [
			state,
			stateProfile.fy,
			fy,
			stateId
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatePage, {
			loading: isLoading,
			error,
			id: stateProfile.id,
			stateProfile,
			handleFyChange
		});
	};
	StatePageContainer.propTypes = propTypes;
}));
//#endregion
//#region src/js/features/state/StatePageNavigation.jsx
/**
* StatePageNavigation.jsx
* Created on 12/12/2025 by Josue Aguilar
*/
var import_jsx_runtime, StatePageNavigation;
//#endregion
__esmMin((() => {
	init_es();
	init_development();
	init_stateActions();
	init_stateHelper();
	init_StatePageContainer();
	import_jsx_runtime = require_jsx_runtime();
	StatePageNavigation = () => {
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const { state, fyParam } = useMatch(`/state/:state/:fyParam?`).params;
		const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);
		const fy = fyParam;
		const handleFyChange = (newFy) => {
			navigate(`/state/${stateName}/${newFy}`);
			dispatch(setStateFiscalYear(newFy));
		};
		useEffect(() => {
			if (!fy) navigate(`/state/${stateName}/2026`, { replace: true });
			else if (!wasInputStateName) navigate(`/state/${stateName}/${fy}`, { replace: true });
			else dispatch(setStateFiscalYear(fy));
			return () => {
				dispatch(resetState());
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatePageContainer, {
			handleFyChange,
			stateId,
			state,
			fy
		});
	};
}))();
export { StatePageNavigation as default };
