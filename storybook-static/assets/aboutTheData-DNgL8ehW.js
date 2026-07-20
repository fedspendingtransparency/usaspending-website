import { n as __esmMin, o as __toESM, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $t as init_apiRequest, An as isCancel, Fr as init_dist, Ga as useSelector, Pr as FontAwesomeIcon, Qt as apiRequest, Ua as init_es, Yt as require_react_aria_modal, kn as init_axios, kr as ss, lr as Ka, qa as useDispatch, ro as require_jsx_runtime, vi as formatMoneyWithPrecision, vr as ds, wi as init_moneyFormatter, wr as ps, xi as formatNumber, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { O as init_accountActions, S as init_esm, T as format, a as formatUnlinkedDataRows, b as periodToQuarterMapping, d as init_aboutTheDataHelper, h as showQuarterText, i as formatReportingDifferencesData, k as setSubmissionPeriods, m as renderDeadline, n as formatMissingAccountBalancesData, r as formatPublicationDates, t as convertDatesToMilliseconds, v as init_timeFilters } from "./aboutTheDataHelper-BhyHMJca.js";
import { d as init_accountHelper, s as init_account, t as fetchAllSubmissionDates, u as getSubmissionDeadlines } from "./account-C0qUof-b.js";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes, { oneOf, oneOfType } from "prop-types";
import { isNull } from "lodash-es";
//#region src/js/dataMapping/agencySubmissionStats/modals.js
var modalTitles, modalClassNames, publicationDatesColumns, missingAccountBalanceColumns, reportingDifferencesColumns, unlinkedDataColumns;
var init_modals = __esmMin((() => {
	modalTitles = (type) => ({
		publicationDates: "Publication and Certification History",
		missingAccountBalance: "Number of TASs Missing from Account Balance Data",
		reportingDifferences: "Reporting Difference in Obligations",
		unlinkedData: `Number of Unlinked ${type} Awards`
	});
	modalClassNames = {
		publicationDates: "publication-dates-modal",
		missingAccountBalance: "missing-account-balance-modal",
		reportingDifferences: "reporting-differences-modal",
		unlinkedData: "unlinked-data-modal"
	};
	publicationDatesColumns = [{
		displayName: "Publication Dates",
		title: "publication_date"
	}, {
		displayName: "Certification Dates",
		title: "certification_date"
	}];
	missingAccountBalanceColumns = [
		{
			displayName: "Treasury Account Symbol (TAS)",
			title: "tas"
		},
		{
			displayName: "Obligated Amount",
			title: "amount"
		},
		{
			displayName: "% of Agency Total in GTAS",
			title: "amount"
		}
	];
	reportingDifferencesColumns = [
		{
			displayName: "Treasury Account Symbol (TAS)",
			title: "tas"
		},
		{
			displayName: "Account Balance Obligations",
			title: "file_a_obligation"
		},
		{
			displayName: "Account Spending Obligations",
			title: "file_b_obligation"
		},
		{
			displayName: "Difference",
			title: "difference"
		}
	];
	unlinkedDataColumns = (type) => [
		{
			displayName: "",
			title: "blank"
		},
		{ displayName: `Unlinked ${type} Awards in ${type === "Contract" ? type : "Financial Assistance"} Data` },
		{ displayName: `Unlinked ${type} Awards in Award Spending Breakdown Data` },
		{ displayName: "Total" }
	];
}));
//#endregion
//#region node_modules/querystring-es3/decode.js
var require_decode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function hasOwnProperty(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	module.exports = function(qs, sep, eq, options) {
		sep = sep || "&";
		eq = eq || "=";
		var obj = {};
		if (typeof qs !== "string" || qs.length === 0) return obj;
		var regexp = /\+/g;
		qs = qs.split(sep);
		var maxKeys = 1e3;
		if (options && typeof options.maxKeys === "number") maxKeys = options.maxKeys;
		var len = qs.length;
		if (maxKeys > 0 && len > maxKeys) len = maxKeys;
		for (var i = 0; i < len; ++i) {
			var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
			if (idx >= 0) {
				kstr = x.substr(0, idx);
				vstr = x.substr(idx + 1);
			} else {
				kstr = x;
				vstr = "";
			}
			k = decodeURIComponent(kstr);
			v = decodeURIComponent(vstr);
			if (!hasOwnProperty(obj, k)) obj[k] = v;
			else if (isArray(obj[k])) obj[k].push(v);
			else obj[k] = [obj[k], v];
		}
		return obj;
	};
	var isArray = Array.isArray || function(xs) {
		return Object.prototype.toString.call(xs) === "[object Array]";
	};
}));
//#endregion
//#region node_modules/querystring-es3/encode.js
var require_encode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var stringifyPrimitive = function(v) {
		switch (typeof v) {
			case "string": return v;
			case "boolean": return v ? "true" : "false";
			case "number": return isFinite(v) ? v : "";
			default: return "";
		}
	};
	module.exports = function(obj, sep, eq, name) {
		sep = sep || "&";
		eq = eq || "=";
		if (obj === null) obj = void 0;
		if (typeof obj === "object") return map(objectKeys(obj), function(k) {
			var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
			if (isArray(obj[k])) return map(obj[k], function(v) {
				return ks + encodeURIComponent(stringifyPrimitive(v));
			}).join(sep);
			else return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
		}).join(sep);
		if (!name) return "";
		return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};
	var isArray = Array.isArray || function(xs) {
		return Object.prototype.toString.call(xs) === "[object Array]";
	};
	function map(xs, f) {
		if (xs.map) return xs.map(f);
		var res = [];
		for (var i = 0; i < xs.length; i++) res.push(f(xs[i], i));
		return res;
	}
	var objectKeys = Object.keys || function(obj) {
		var res = [];
		for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
		return res;
	};
}));
//#endregion
//#region node_modules/querystring-es3/index.js
var require_querystring_es3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.decode = exports.parse = require_decode();
	exports.encode = exports.stringify = require_encode();
})), import_querystring_es3$1;
var init_querystring = __esmMin((() => {
	require_querystring_es3();
	import_querystring_es3$1 = require_querystring_es3();
}));
//#endregion
//#region src/js/apis/agencyReporting.js
var getTotalBudgetaryResources, getAgenciesReportingData, getSubmissionPublicationDates, fetchPublishDates, fetchMissingAccountBalances, fetchReportingDifferences, fetchAgency, fetchUnlinkedData;
var init_agencyReporting = __esmMin((() => {
	init_querystring();
	init_apiRequest();
	getTotalBudgetaryResources = (fy = "", period = "") => {
		if (fy && period) return apiRequest({ url: `v2/references/total_budgetary_resources/?${(0, import_querystring_es3$1.stringify)({
			fiscal_period: period,
			fiscal_year: fy
		})}` });
		return apiRequest({ url: `v2/references/total_budgetary_resources/` });
	};
	getAgenciesReportingData = (fy, period, sort, order, page, limit, filter = "") => apiRequest({ url: `v2/reporting/agencies/overview/?${(0, import_querystring_es3$1.stringify)({
		fiscal_year: fy,
		fiscal_period: period,
		page,
		limit,
		order,
		sort,
		filter
	})}` });
	getSubmissionPublicationDates = (fy, sort, order, page, limit, searchTerm) => apiRequest({ url: `v2/reporting/agencies/publish_dates?${(0, import_querystring_es3$1.stringify)({
		fiscal_year: fy,
		page,
		limit,
		order,
		sort,
		filter: searchTerm
	})}` });
	fetchPublishDates = (agencyCode, fiscalYear, fiscalPeriod, params) => apiRequest({ url: `v2/reporting/agencies/${agencyCode}/${fiscalYear}/${fiscalPeriod}/submission_history/?${(0, import_querystring_es3$1.stringify)(params)}` });
	fetchMissingAccountBalances = (agencyCode, params) => apiRequest({ url: `v2/reporting/agencies/${agencyCode}/discrepancies/?${(0, import_querystring_es3$1.stringify)(params)}` });
	fetchReportingDifferences = (agencyCode, params) => apiRequest({ url: `v2/reporting/agencies/${agencyCode}/differences/?${(0, import_querystring_es3$1.stringify)(params)}` });
	fetchAgency = (agencyCode, params) => apiRequest({ url: `v2/reporting/agencies/${agencyCode}/overview/?${(0, import_querystring_es3$1.stringify)(params)}` });
	fetchUnlinkedData = (agencyCode, fiscalYear, fiscalPeriod, type) => apiRequest({ url: `v2/reporting/agencies/${agencyCode}/${fiscalYear}/${fiscalPeriod}/unlinked_awards/${type}/` });
}));
//#endregion
//#region src/js/helpers/pageAndSortHelper.js
var pageAndSort;
var init_pageAndSortHelper = __esmMin((() => {
	pageAndSort = (data, sortFunction, page, limit, sortDirection, sortProperty) => {
		if (!data || !data.length || !page || !limit) return [];
		if (!sortFunction && !sortDirection && !sortProperty) return [];
		const defaultSortFunction = (a, b) => {
			if (sortDirection === "desc") return b[sortProperty] - a[sortProperty];
			return a[sortProperty] - b[sortProperty];
		};
		return data.sort(!sortFunction ? defaultSortFunction : sortFunction).slice((page - 1) * limit, page * limit);
	};
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/modals/PublicationDatesContainer.jsx
/**
* PublicationDatesContainer.jsx
* Created by Jonathan Hill 11/20/20
*/
var import_jsx_runtime$8, propTypes$5, PublicationDatesContainer;
var init_PublicationDatesContainer = __esmMin((() => {
	init_es();
	init_index_es();
	init_axios();
	init_modals();
	init_agencyReporting();
	init_aboutTheDataHelper();
	init_pageAndSortHelper();
	init_accountHelper();
	init_account();
	init_accountActions();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$5 = { agencyData: PropTypes.shape({
		agencyName: PropTypes.string,
		agencyCode: PropTypes.string,
		fiscalYear: PropTypes.number,
		fiscalPeriod: PropTypes.number
	}) };
	PublicationDatesContainer = ({ agencyData }) => {
		const [sort, setSort] = useState("publication_date");
		const [order, setOrder] = useState("desc");
		const [page, setPage] = useState(1);
		const [limit, setLimit] = useState(10);
		const [total, setTotal] = useState(0);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState({
			error: false,
			message: ""
		});
		const [rawData, setRawData] = useState([]);
		const [rows, setRows] = useState([]);
		const [submissionDeadlines, setSubmissionDeadlines] = useState(null);
		const { submissionPeriods } = useSelector((state) => state.account);
		const subPeriodsRequest = useRef(null);
		const pubDatesRequest = useRef(null);
		const dispatch = useDispatch();
		const updateSort = (field, direction) => {
			setSort(field);
			setOrder(direction);
		};
		const submissionPeriodsRequest = async () => {
			if (subPeriodsRequest.current) subPeriodsRequest.current.cancel();
			try {
				subPeriodsRequest.current = fetchAllSubmissionDates();
				const { data } = await subPeriodsRequest.current.promise;
				dispatch(setSubmissionPeriods(data.available_periods));
				subPeriodsRequest.current = null;
			} catch (e) {
				console.log(e);
				if (!isCancel(e)) console.error(e);
				subPeriodsRequest.current = null;
			}
		};
		const publicationDatesRequest = async () => {
			if (error.error) setError({
				error: false,
				message: ""
			});
			if (!loading) setLoading(true);
			if (pubDatesRequest.current) pubDatesRequest.current.cancel();
			try {
				pubDatesRequest.current = fetchPublishDates(agencyData.agencyCode, agencyData.fiscalYear, agencyData.fiscalPeriod, {
					page: 1,
					limit: 100
				});
				const { data } = await pubDatesRequest.current.promise;
				setTotal(data.page_metadata.total);
				setRawData(convertDatesToMilliseconds(data.results));
				setLoading(false);
				pubDatesRequest.current = null;
			} catch (e) {
				console.error(e);
				if (!isCancel(e)) {
					setLoading(false);
					setError({
						error: true,
						message: e.message
					});
				}
				pubDatesRequest.current = null;
			}
		};
		useEffect(() => {
			if (!submissionPeriods.size) submissionPeriodsRequest();
			else setSubmissionDeadlines(getSubmissionDeadlines(agencyData.fiscalYear, agencyData.fiscalPeriod, submissionPeriods.toJS()));
		}, [submissionPeriods]);
		useEffect(() => {
			publicationDatesRequest();
			return () => {
				if (pubDatesRequest.current) pubDatesRequest.current.cancel();
			};
		}, []);
		useEffect(() => setRows(formatPublicationDates(pageAndSort(rawData, null, page, limit, order, sort))), [rawData]);
		useEffect(() => {
			if (page !== 1) setPage(1);
			else setRows(formatPublicationDates(pageAndSort(rawData, null, page, limit, order, sort)));
		}, [
			sort,
			order,
			limit
		]);
		useEffect(() => {
			setRows(formatPublicationDates(pageAndSort(rawData, null, page, limit, order, sort)));
		}, [page]);
		const columns = publicationDatesColumns.map((column) => ({
			displayName: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "publication-dates__column-header-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "publication-dates__column-header-title",
					children: column.displayName
				}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "publication-dates__column-header-sub-title",
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("i", { children: ["Deadline: ", renderDeadline(column.title, submissionDeadlines)] })
				})]
			}),
			title: column.title
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ss, {
			loading,
			error: error.error,
			message: error.message,
			rows,
			columns,
			currentSort: {
				field: sort,
				direction: order
			},
			updateSort
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Ka, {
			currentPage: page,
			changePage: setPage,
			changeLimit: setLimit,
			limitSelector: true,
			resultsText: true,
			pageSize: limit,
			totalItems: total
		})] });
	};
	PublicationDatesContainer.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/modals/MissingAccountBalanceContainer.jsx
/**
* MissingAccountBalanceContainer.jsx
* Created by Jonathan Hill 11/21/20
*/
var import_jsx_runtime$7, propTypes$4, MissingAccountBalanceContainer;
var init_MissingAccountBalanceContainer = __esmMin((() => {
	init_index_es();
	init_axios();
	init_modals();
	init_agencyReporting();
	init_aboutTheDataHelper();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$4 = { agencyData: PropTypes.shape({
		gtasObligationTotal: PropTypes.number,
		agencyCode: PropTypes.string,
		fiscalYear: PropTypes.number,
		fiscalPeriod: PropTypes.number
	}) };
	MissingAccountBalanceContainer = ({ agencyData }) => {
		const [sort, setSort] = useState("amount");
		const [order, setOrder] = useState("desc");
		const [page, setPage] = useState(1);
		const [limit, setLimit] = useState(10);
		const [total, setTotal] = useState(0);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState({
			error: false,
			message: ""
		});
		const [rows, setRows] = useState([]);
		const missingAccBalancesRequest = useRef(null);
		const updateSort = (field, direction) => {
			setSort(field);
			setOrder(direction);
		};
		const missingAccountBalancesRequest = useCallback(async () => {
			if (error.error) setError({
				error: false,
				message: ""
			});
			if (!loading) setLoading(true);
			if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
			const params = {
				page,
				limit,
				sort,
				order,
				fiscal_year: agencyData.fiscalYear,
				fiscal_period: agencyData.fiscalPeriod
			};
			try {
				missingAccBalancesRequest.current = fetchMissingAccountBalances(agencyData.agencyCode, params);
				const { data } = await missingAccBalancesRequest.current.promise;
				setTotal(data.page_metadata.total);
				setRows(formatMissingAccountBalancesData({
					results: data.results,
					gtasObligationTotal: agencyData.gtasObligationTotal
				}));
				setLoading(false);
				missingAccBalancesRequest.current = null;
			} catch (e) {
				if (!isCancel(e)) {
					setLoading(false);
					setError({
						error: true,
						message: e.message
					});
					console.error(e);
				}
				missingAccBalancesRequest.current = null;
			}
		});
		useEffect(() => () => {
			if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
		}, []);
		useEffect(() => {
			if (page === 1) missingAccountBalancesRequest();
			else setPage(1);
		}, [
			sort,
			order,
			limit
		]);
		useEffect(() => {
			missingAccountBalancesRequest();
		}, [page]);
		const columns = missingAccountBalanceColumns.map((column, i) => ({
			displayName: column.displayName,
			title: column.title,
			right: i !== 0
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ss, {
			loading,
			error: error.error,
			message: error.message,
			rows,
			columns,
			currentSort: {
				field: sort,
				direction: order
			},
			updateSort
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Ka, {
			currentPage: page,
			changePage: setPage,
			changeLimit: setLimit,
			limitSelector: true,
			resultsText: true,
			pageSize: limit,
			totalItems: total
		})] });
	};
	MissingAccountBalanceContainer.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/modals/ReportingDifferencesContainer.jsx
/**
* ReportingDifferencesContainer.jsx
* Created by Jonathan Hill 12/02/20
*/
var import_jsx_runtime$6, propTypes$3, ReportingDifferencesContainer;
var init_ReportingDifferencesContainer = __esmMin((() => {
	init_index_es();
	init_axios();
	init_modals();
	init_aboutTheDataHelper();
	init_agencyReporting();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$3 = { agencyData: PropTypes.shape({
		agencyName: PropTypes.string,
		agencyCode: PropTypes.string,
		fiscalYear: PropTypes.number,
		fiscalPeriod: PropTypes.number
	}) };
	ReportingDifferencesContainer = ({ agencyData }) => {
		const [sort, setSort] = useState("tas");
		const [order, setOrder] = useState("desc");
		const [page, setPage] = useState(1);
		const [limit, setLimit] = useState(10);
		const [total, setTotal] = useState(0);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState({
			error: false,
			message: ""
		});
		const [rows, setRows] = useState([]);
		const reportingDiffRequest = useRef(null);
		const updateSort = (field, direction) => {
			setSort(field);
			setOrder(direction);
		};
		const reportingDifferenceRequest = useCallback(async () => {
			if (error.error) setError({
				error: false,
				message: ""
			});
			if (!loading) setLoading(true);
			if (reportingDiffRequest.current) reportingDiffRequest.current.cancel();
			const params = {
				page,
				limit,
				sort,
				order,
				fiscal_year: agencyData.fiscalYear,
				fiscal_period: agencyData.fiscalPeriod
			};
			try {
				reportingDiffRequest.current = fetchReportingDifferences(agencyData.agencyCode, params);
				const { data } = await reportingDiffRequest.current.promise;
				setTotal(data.page_metadata.total);
				setRows(formatReportingDifferencesData({ results: data.results }));
				setLoading(false);
				reportingDiffRequest.current = null;
			} catch (e) {
				if (!isCancel(e)) {
					setLoading(false);
					setError({
						error: true,
						message: e.message
					});
				}
				reportingDiffRequest.current = null;
			}
		});
		useEffect(() => () => {
			if (reportingDiffRequest.current) reportingDiffRequest.current.cancel();
		}, []);
		useEffect(() => {
			if (page === 1) reportingDifferenceRequest();
			else setPage(1);
		}, [
			sort,
			order,
			limit
		]);
		useEffect(() => {
			reportingDifferenceRequest();
		}, [page]);
		const columns = reportingDifferencesColumns.map((column, i) => ({
			displayName: column.displayName,
			title: column.title,
			right: i !== 0
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ss, {
			loading,
			error: error.error,
			message: error.message,
			rows,
			columns,
			currentSort: {
				field: sort,
				direction: order
			},
			updateSort
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Ka, {
			currentPage: page,
			changePage: setPage,
			changeLimit: setLimit,
			limitSelector: true,
			resultsText: true,
			pageSize: limit,
			totalItems: total
		})] });
	};
	ReportingDifferencesContainer.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/modals/UnlinkedDataContainer.jsx
/**
* UnlinkedDataContainer.jsx
* Created by Jonathan Hill 01/15/21
*/
var import_jsx_runtime$5, propTypes$2, UnlinkedDataContainer;
var init_UnlinkedDataContainer = __esmMin((() => {
	init_index_es();
	init_axios();
	init_modals();
	init_aboutTheDataHelper();
	init_agencyReporting();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$2 = { agencyData: PropTypes.shape({
		agencyName: PropTypes.string,
		agencyCode: PropTypes.string,
		fiscalYear: PropTypes.number,
		fiscalPeriod: PropTypes.number,
		type: PropTypes.string
	}) };
	UnlinkedDataContainer = ({ agencyData }) => {
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState({
			error: false,
			message: ""
		});
		const [rows, setRows] = useState([]);
		const unlinkedDataReq = useRef(null);
		const unlinkedDataRequest = async () => {
			if (error.error) setError({
				error: false,
				message: ""
			});
			if (!loading) setLoading(true);
			if (unlinkedDataReq.current) unlinkedDataReq.current.cancel();
			try {
				unlinkedDataReq.current = fetchUnlinkedData(agencyData.agencyCode, agencyData.fiscalYear, agencyData.fiscalPeriod, agencyData.type === "Contract" ? "procurement" : "assistance");
				const res = await unlinkedDataReq.current.promise;
				setRows(formatUnlinkedDataRows(res.data, agencyData.type));
				setLoading(false);
				unlinkedDataReq.current = null;
			} catch (e) {
				if (!isCancel(e)) {
					setLoading(false);
					setError({
						error: true,
						message: e.message
					});
					console.error(e);
				}
				unlinkedDataReq.current = null;
			}
		};
		useEffect(() => {
			unlinkedDataRequest();
			return () => {
				if (unlinkedDataReq.current) unlinkedDataReq.current.cancel();
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ss, {
			loading,
			error: error.error,
			message: error.message,
			rows,
			columns: unlinkedDataColumns(agencyData.type).map((column, i) => ({
				displayName: column.displayName,
				title: "",
				right: true,
				bodyHeader: i === 0
			}))
		});
	};
	UnlinkedDataContainer.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/agencySubmissionStats/componentMapping/modalContentMapping.jsx
var import_jsx_runtime$4, modalContentMapping;
var init_modalContentMapping = __esmMin((() => {
	init_PublicationDatesContainer();
	init_MissingAccountBalanceContainer();
	init_ReportingDifferencesContainer();
	init_UnlinkedDataContainer();
	import_jsx_runtime$4 = require_jsx_runtime();
	modalContentMapping = (data) => ({
		publicationDates: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PublicationDatesContainer, { ...data }),
		missingAccountBalance: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MissingAccountBalanceContainer, { ...data }),
		reportingDifferences: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ReportingDifferencesContainer, { ...data }),
		unlinkedData: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(UnlinkedDataContainer, { ...data })
	});
}));
//#endregion
//#region src/js/components/agencySubmissionStats/AboutTheDataModal.jsx
var import_react_aria_modal, import_jsx_runtime$3, propTypes$1, AboutTheDataModal;
var init_AboutTheDataModal = __esmMin((() => {
	import_react_aria_modal = /* @__PURE__ */ __toESM(require_react_aria_modal(), 1);
	init_dist();
	init_timeFilters();
	init_aboutTheDataHelper();
	init_modalContentMapping();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		mounted: PropTypes.bool,
		closeModal: PropTypes.func,
		type: PropTypes.string,
		title: PropTypes.string,
		className: PropTypes.string,
		agencyData: PropTypes.object,
		id: PropTypes.string
	};
	AboutTheDataModal = ({ mounted, closeModal, type, title, className, agencyData, id }) => {
		if (!agencyData) return null;
		const fiscalYearQuarterPeriodText = showQuarterText(agencyData.fiscalPeriod) ? `FY ${agencyData.fiscalYear} Q${periodToQuarterMapping[agencyData.fiscalPeriod]} / P${agencyData.fiscalPeriod}` : `FY ${agencyData.fiscalYear} P${agencyData.fiscalPeriod}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_react_aria_modal.default, {
			dialogId: id,
			mounted,
			onExit: closeModal,
			titleText: title,
			dialogClass: "usa-dt-modal",
			verticallyCenter: true,
			escapeExits: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: `usa-dt-modal about-the-data-modal ${className}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "usa-dt-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "about-the-data-modal__header-data",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "about-the-data-modal__agency-name",
								children: agencyData.agencyName ? agencyData.agencyName.toUpperCase() : ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h1", {
								title,
								className: "usa-dt-modal__title",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "about-the-data-modal__fiscal-year-quarter-period",
								children: fiscalYearQuarterPeriodText
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
						className: "usa-dt-modal__close-button",
						onClick: closeModal,
						title: "Close",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
							icon: "times",
							size: "lg"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "usa-dt-modal__section",
					children: modalContentMapping({ agencyData })[type]
				})]
			})
		});
	};
	AboutTheDataModal.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/agencySubmissionStats/CellWithModal.jsx
var import_jsx_runtime$2, propTypes, CellWithModal;
var init_CellWithModal = __esmMin((() => {
	init_dist();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		data: oneOfType([
			PropTypes.string,
			PropTypes.object,
			PropTypes.number
		]),
		openModal: PropTypes.func.isRequired,
		modalType: oneOf([
			"publicationDates",
			"missingAccountBalance",
			"reportingDifferences",
			"unlinkedData"
		]).isRequired,
		agencyData: PropTypes.object
	};
	CellWithModal = ({ data, openModal, modalType, agencyData }) => {
		const modalClick = () => openModal(modalType, agencyData);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "action-cell",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "action-cell__text",
				children: data
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				className: "action-cell__button",
				onClick: modalClick,
				title: "View details",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FontAwesomeIcon, { icon: "expand-alt" })
			})]
		});
	};
	CellWithModal.propTypes = propTypes;
}));
//#endregion
//#region src/js/models/v2/agencySubmissionStats/CoreReportingRow.js
var CoreReportingRow;
var init_CoreReportingRow = __esmMin((() => {
	init_moneyFormatter();
	init_esm();
	CoreReportingRow = {
		populateCore(data) {
			this._budgetAuthority = data.current_total_budget_authority_amount;
			this._mostRecentPublicationDate = data.recent_publication_date || null;
			this._gtasObligationTotal = data.tas_account_discrepancies_totals?.gtas_obligation_total;
			this._discrepancyCount = data.tas_account_discrepancies_totals?.missing_tas_accounts_count;
			this._obligationDifference = data.obligation_difference;
			this._unlinkedContracts = data.unlinked_contract_award_count;
			this._unlinkedAssistance = data.unlinked_assistance_award_count;
		},
		get budgetAuthority() {
			return formatMoneyWithPrecision(this._budgetAuthority, 2, "--");
		},
		get mostRecentPublicationDate() {
			return this._mostRecentPublicationDate ? format(new Date(this._mostRecentPublicationDate), "MM/dd/yyyy") : "--";
		},
		get obligationDifference() {
			return formatMoneyWithPrecision(this._obligationDifference, 2, "--");
		},
		get discrepancyCount() {
			return isNull(this._discrepancyCount) ? "--" : formatNumber(this._discrepancyCount);
		},
		get unlinkedContracts() {
			return isNull(this._unlinkedContracts) ? "--" : formatNumber(this._unlinkedContracts);
		},
		get unlinkedAssistance() {
			return isNull(this._unlinkedAssistance) ? "--" : formatNumber(this._unlinkedAssistance);
		}
	};
}));
//#endregion
//#region src/js/components/agencySubmissionStats/componentMapping/tooltipContentMapping.jsx
var import_jsx_runtime$1, columnTooltips;
var init_tooltipContentMapping = __esmMin((() => {
	import_jsx_runtime$1 = require_jsx_runtime();
	columnTooltips = {
		"Most Recent Update": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This column shows the most recent date on which the agency reported data from the selected submission period to USAspending.gov." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "If you are viewing the last period in a quarter, you may notice agencies that report quarterly do not show data, or have a later report date than the agencies reporting monthly. This is because the quarterly submission deadline is slightly later than the monthly deadline. Such timing differences will disappear in October 2021 when all agencies transition to monthly reporting." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "\"--\" indicates that an agency has not submitted data for this period." })
		] }),
		"Number of TASs Missing from Account Balance Data": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Agencies submit account balance data grouped by Treasury Account Symbols (TAS) in two ways: 1) to USAspending.gov in File A and 2) to GTAS, a separate system that is the authoritative source of governmentwide TAS account balances. This column shows the number of TAS that are in GTAS but missing in USAspending.gov data." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Note that financing TAS, while present in GTAS, are completely excluded from this calculation, as they do not involve budgetary spending and therefore are not appropriate for publication on USAspending." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "\"--\" indicates that an agency has not submitted data for this period." })
		] }),
		"Reporting Difference in Obligations": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Agencies report spending (i.e., obligations) to USAspending in two ways: 1) by showing a reduction in their reported account balances submitted in File A and 2) their reported spending amounts submitted in File B." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This column shows the differences in these two reported spending amounts." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "\"--\" indicates that an agency has not submitted data for this period." })
		] }),
		"Number of Unlinked Contract Awards": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Agencies submit contract information to USAspending.gov in two ways: 1) contract award spending data submitted in File C from their financial systems and 2) contract award and recipient data submitted in File D1 from their separate procurement systems." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Because these data originate from communities and systems subject to different policies and reporting requirements, there are sometimes gaps between awards captured in each data set." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This column shows how many awards were “unlinked”, or lack a common award ID that allows these two systems to match their records. When an award is linked, USAspending can include additional fields from the submitted datasets. When an award cannot be linked, it will only show up in some parts of the site and will be missing its full context." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Note that this column shows if an award was linked at any point in time to account for any timing delays." })
		] }),
		"Number of Unlinked Assistance Awards": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Agencies submit assistance award (e.g., loans, grants) information to USAspending.gov in two ways: 1) award spending data submitted in File C from their financial systems and 2) assistance award and recipient data submitted in File D2 from their separate financial assistance systems." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Because these data originate from communities and systems subject to different policies and reporting requirements, there are sometimes gaps between awards captured in each data set." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This column shows how many awards were “unlinked”, or lack a common award ID that allows these two systems to match their records. When an award is linked, USAspending can include additional fields from the submitted datasets. When an award cannot be linked, it will only show up in some parts of the site and will be missing its full context." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Note that this column shows if an award was linked at any point in time to account for any timing delays." })
		] }),
		"Agency Comments": /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: ["Agency Comments are optional and provided by agencies at the time they submit their data to USAspending.gov in the required dataset formats (File A, B, C, D1, and D2). For more information about the DATA Act reporting flow, visit ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
			target: "_blank",
			rel: "noopener noreferrer",
			href: "https://fiscal.treasury.gov/files/data-transparency/gsdm-information-flow-diagram.pdf",
			children: "https://fiscal.treasury.gov/files/data-transparency/gsdm-information-flow-diagram.pdf"
		})] }),
		percentOfBudgetSubmissions: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This is an agency's total budgetary resources for the fiscal year through the selected period as a portion of all agency budgetary resources to-date." }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "\"--\" indicates that an agency has not submitted data for this period." })] }),
		percentOfBudgetPublications: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "This is an agency's total budgetary resources for the most recent period of the selected fiscal year as a portion of all agency budgetary resources to-date." }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "\"--\" indicates that an agency has not submitted data for this period." })] })
	};
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/AgencyTableMapping.jsx
var import_jsx_runtime, Tooltip, publicationsSubColumnPeriodFilters, publicationsSubColumnFilterFunction, parsePeriods, agenciesTableColumns, agencyDetailsColumns;
var init_AgencyTableMapping = __esmMin((() => {
	init_index_es();
	init_tooltipContentMapping();
	import_jsx_runtime = require_jsx_runtime();
	Tooltip = ({ title, id = "", position = "right", className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds, {
		icon: "info",
		className,
		tooltipPosition: position,
		tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
			className: title,
			title,
			children: columnTooltips[id || title]
		})
	});
	Tooltip.propTypes = {
		title: PropTypes.string.isRequired,
		id: PropTypes.string,
		position: PropTypes.oneOf(["left", "right"]),
		className: PropTypes.string
	};
	publicationsSubColumnPeriodFilters = {
		2020: [
			"P01 - P02",
			"P04",
			"P05"
		],
		2019: [
			"P01 - P02",
			"P04",
			"P05",
			"P07",
			"P08",
			"P10",
			"P11"
		],
		2018: [
			"P01 - P02",
			"P04",
			"P05",
			"P07",
			"P08",
			"P10",
			"P11"
		],
		2017: [
			"P01 - P02",
			"P03",
			"P04",
			"P05",
			"P07",
			"P08",
			"P10",
			"P11"
		]
	};
	publicationsSubColumnFilterFunction = (fy) => (column) => {
		if (column?.subColumnNames) {
			const filteredPeriodColumns = column.subColumnNames.filter((subColumn) => !publicationsSubColumnPeriodFilters[fy].find((period) => period === subColumn.displayName));
			return {
				...column,
				columnSpan: `${filteredPeriodColumns.length}`,
				subColumnNames: filteredPeriodColumns
			};
		}
		return column;
	};
	parsePeriods = (periods) => periods.map(({ publicationDate }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "generic-cell-content",
		children: [publicationDate && publicationDate, !publicationDate && "--"]
	}));
	agenciesTableColumns = {
		publications: (fy) => {
			const columns = [
				{
					title: "agency_name",
					displayName: "Agency Name"
				},
				{
					title: "current_total_budget_authority_amount",
					right: true,
					displayName: "Percent of Total Federal Budget",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: "Percent of Total Federal Budget",
						id: "percentOfBudgetPublications"
					})
				},
				{
					title: "Q1",
					displayName: `FY ${fy} Q1`,
					columnSpan: "2",
					subColumnNames: [{
						displayName: "P01 - P02",
						title: "publication_date,2"
					}, {
						displayName: "P03",
						title: "publication_date,3"
					}]
				},
				{
					title: "Q2",
					displayName: `FY ${fy} Q2`,
					columnSpan: "3",
					subColumnNames: [
						{
							displayName: "P04",
							title: "publication_date,4"
						},
						{
							displayName: "P05",
							title: "publication_date,5"
						},
						{
							displayName: "P06",
							title: "publication_date,6"
						}
					]
				},
				{
					title: "Q3",
					displayName: `FY ${fy} Q3`,
					columnSpan: "3",
					subColumnNames: [
						{
							displayName: "P07",
							title: "publication_date,7"
						},
						{
							displayName: "P08",
							title: "publication_date,8"
						},
						{
							displayName: "P09",
							title: "publication_date,9"
						}
					]
				},
				{
					title: "Q4",
					displayName: `FY ${fy} Q4`,
					columnSpan: "3",
					subColumnNames: [
						{
							displayName: "P10",
							title: "publication_date,10"
						},
						{
							displayName: "P11",
							title: "publication_date,11"
						},
						{
							displayName: "P12",
							title: "publication_date,12"
						}
					]
				}
			];
			if (!fy || parseInt(fy, 10) >= 2021) return columns;
			if (fy === "2017") columns.splice(2, 1);
			return columns.map(publicationsSubColumnFilterFunction(fy));
		},
		submissions: [
			{
				title: "agency_name",
				displayName: "Agency Name"
			},
			{
				title: "current_total_budget_authority_amount",
				displayName: "Percent of Total Federal Budget",
				right: true,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					title: "Percent of Total Federal Budget",
					id: "percentOfBudgetSubmissions"
				})
			},
			{
				title: "recent_publication_date",
				displayName: "Most Recent Update",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { title: "Most Recent Update" })
			},
			{
				title: "missing_tas_accounts_count",
				displayName: "Number of TASs Missing from Account Balance Data",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					title: "Number of TASs Missing from Account Balance Data",
					position: "left"
				})
			},
			{
				title: "obligation_difference",
				displayName: "Reporting Difference in Obligations",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { title: "Reporting Difference in Obligations" }),
				right: true
			},
			{
				title: "unlinked_contract_award_count",
				displayName: "Number of Unlinked Contract Awards",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					title: "Number of Unlinked Contract Awards",
					className: "wide wide_right"
				}),
				right: true
			},
			{
				title: "unlinked_assistance_award_count",
				displayName: "Number of Unlinked Assistance Awards",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					title: "Number of Unlinked Assistance Awards",
					position: "left",
					className: "wide wide_left"
				})
			}
		]
	};
	agencyDetailsColumns = [
		{
			title: "fiscal_year",
			displayName: "Reporting Period"
		},
		{
			title: "percent_of_total_budgetary_resources",
			displayName: "Percent of Total Federal Budget",
			right: true
		},
		{
			title: "recent_publication_date",
			displayName: "Most Recent Update",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { title: "Most Recent Update" })
		},
		{
			title: "missing_tas_accounts_count",
			displayName: "Number of TASs Missing from Account Balance Data",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { title: "Number of TASs Missing from Account Balance Data" }),
			right: true
		},
		{
			title: "obligation_difference",
			displayName: "Reporting Difference in Obligations",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { title: "Reporting Difference in Obligations" }),
			right: true
		},
		{
			title: "unlinked_contract_award_count",
			displayName: "Number of Unlinked Contract Awards",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				title: "Number of Unlinked Contract Awards",
				className: "wide wide_right"
			}),
			right: true
		},
		{
			title: "unlinked_assistance_award_count",
			displayName: "Number of Unlinked Assistance Awards",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				title: "Number of Unlinked Assistance Awards",
				position: "left",
				className: "wide wide_left"
			})
		}
	];
}));
//#endregion
//#region src/_scss/pages/agencySubmissionStats/aboutTheData.scss
var require_aboutTheData = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
export { init_modals as _, parsePeriods as a, CellWithModal as c, init_AboutTheDataModal as d, fetchAgency as f, init_agencyReporting as g, getTotalBudgetaryResources as h, init_AgencyTableMapping as i, init_CellWithModal as l, getSubmissionPublicationDates as m, agenciesTableColumns as n, CoreReportingRow as o, getAgenciesReportingData as p, agencyDetailsColumns as r, init_CoreReportingRow as s, require_aboutTheData as t, AboutTheDataModal as u, modalClassNames as v, modalTitles as y };
