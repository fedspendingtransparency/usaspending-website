import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { dn as init_apiRequest, go as require_jsx_runtime, io as useSelector, no as init_es, oo as useDispatch, un as apiRequest } from "./index.js-Dk2VDaPz.js";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash-es";
//#region src/js/apis/agency.js
var fetchBudgetaryResources, fetchAgencyOverview, fetchObligationsByAwardType, fetchSubagencySpendingList, fetchSubagencyNewAwardsCount, fetchSubagencySummary, fetchAgencySlugs, fetchSubcomponentsList, fetchFederalAccountsList, fetchTasList, fetchProgramActivityByTas, fetchObjectClassByTas;
var init_agency = __esmMin((() => {
	init_apiRequest();
	fetchBudgetaryResources = (agencyId) => apiRequest({ url: `v2/agency/${agencyId}/budgetary_resources` });
	fetchAgencyOverview = (code, fy) => apiRequest({ url: `v2/agency/${code}/${fy ? `?fiscal_year=${fy}` : ""}` });
	fetchObligationsByAwardType = (code, fy) => apiRequest({ url: `v2/agency/${code}/obligations_by_award_category/${fy ? `?fiscal_year=${fy}` : ""}` });
	fetchSubagencySpendingList = (code, fy, type, params) => apiRequest({
		url: `v2/agency/${code}/sub_agency/${fy ? `?fiscal_year=${fy}` : ""}${type ? `&award_type_codes=[${type}]` : ""}`,
		params
	});
	fetchSubagencyNewAwardsCount = (code, fy, params) => apiRequest({ url: `v2/agency/${code}/awards/new/count/${fy ? `?fiscal_year=${fy}` : ""}${params ? `&award_type_codes=[${params}]` : ""}` });
	fetchSubagencySummary = (code, fy, params) => apiRequest({ url: `v2/agency/${code}/awards/${fy ? `?fiscal_year=${fy}` : ""}${params ? `&award_type_codes=[${params}]` : ""}` });
	fetchAgencySlugs = () => apiRequest({ url: "v2/references/toptier_agencies/" });
	fetchSubcomponentsList = (code, fy, page) => apiRequest({ url: `v2/agency/${code}/sub_components/${fy ? `?fiscal_year=${fy}` : ""}${page ? `&page=${page}` : ""}` });
	fetchFederalAccountsList = (code, slug, fy, page) => apiRequest({ url: `v2/agency/${code}/sub_components/${slug}/${fy ? `?fiscal_year=${fy}` : ""}${page ? `&page=${page}` : ""}` });
	fetchTasList = (code, fy) => apiRequest({ url: `v2/federal_accounts/${code}/${fy ? `?fiscal_year=${fy}` : ""}` });
	fetchProgramActivityByTas = (code, fy, page) => apiRequest({ url: `v2/agency/treasury_account/${code}/program_activity/${fy ? `?fiscal_year=${fy}` : ""}${page ? `&page=${page}` : ""}` });
	fetchObjectClassByTas = (code, fy, page) => apiRequest({ url: `v2/agency/treasury_account/${code}/object_class/${fy ? `?fiscal_year=${fy}` : ""}${page ? `&page=${page}` : ""}` });
}));
//#endregion
//#region src/js/containers/agency/WithAgencySlugs.jsx
var import_jsx_runtime, mapSlugToTopTierCode, mapTopTierCodeToOutlay, mapTopTierCodeToSlug, mapIdToSlug, withAgencySlugs;
var init_WithAgencySlugs = __esmMin((() => {
	init_useAgencySlugs();
	import_jsx_runtime = require_jsx_runtime();
	mapSlugToTopTierCode = (results) => results.reduce((acc, agency) => {
		const { agency_slug, toptier_code } = agency;
		return {
			...acc,
			[agency_slug]: toptier_code
		};
	}, {});
	mapTopTierCodeToOutlay = (results) => results.reduce((acc, agency) => {
		const { toptier_code, outlay_amount } = agency;
		return {
			...acc,
			[toptier_code]: outlay_amount
		};
	}, {});
	mapTopTierCodeToSlug = (results) => results.reduce((acc, agency) => {
		const { agency_slug, toptier_code } = agency;
		return {
			...acc,
			[toptier_code]: agency_slug
		};
	}, {});
	mapIdToSlug = (results) => results.reduce((acc, agency) => {
		const { agency_slug, agency_id } = agency;
		return {
			...acc,
			[`${agency_id}`]: agency_slug
		};
	}, {});
	withAgencySlugs = (WrappedComponent) => (props) => {
		const [agencySlugs, , agencyIds, loading, error] = useAgencySlugs();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, {
			...props,
			agencySlugs,
			agencyIds,
			loading,
			error
		});
	};
}));
//#endregion
//#region src/js/redux/actions/agency/agencyActions.js
var setAgencyOverview, setBudgetaryResources, setAwardObligations, resetAwardObligations, setSelectedSubcomponent, setSelectedFederalAccount, setSelectedTas, setSelectedPrgActivityOrObjectClass, setCurrentLevelNameAndId, setLevel4ApiResponse, setSubagencyTotals, resetSubagencyTotals, setAgencySlugs, setDataThroughDates, setIsSofChartLoaded, resetAgency;
var init_agencyActions = __esmMin((() => {
	setAgencyOverview = (overview) => ({
		type: "SET_AGENCY_OVERVIEW",
		overview
	});
	setBudgetaryResources = (budgetaryResources) => ({
		type: "SET_BUDGETARY_RESOURCES",
		budgetaryResources
	});
	setAwardObligations = (awardObligations) => ({
		type: "SET_AWARD_OBLIGATIONS",
		awardObligations
	});
	resetAwardObligations = () => ({ type: "RESET_AWARD_OBLIGATIONS" });
	setSelectedSubcomponent = (subcomponent) => ({
		type: "SET_SUBCOMPONENT",
		subcomponent
	});
	setSelectedFederalAccount = (federalAccount) => ({
		type: "SET_FEDERAL_ACCOUNT",
		federalAccount
	});
	setSelectedTas = (tas) => ({
		type: "SET_TAS",
		tas
	});
	setSelectedPrgActivityOrObjectClass = (prgActivityOrObjectClass) => ({
		type: "SET_PA_OR_OC",
		prgActivityOrObjectClass
	});
	setCurrentLevelNameAndId = (nameAndId) => ({
		type: "SET_CURRENT_LEVEL_NAME_AND_ID",
		nameAndId
	});
	setLevel4ApiResponse = (resObject) => ({
		type: "SET_LEVEL_4_API_RESPONSE",
		resObject
	});
	setSubagencyTotals = (spendingBySubagencyTotals) => ({
		type: "SET_SUBAGENCY_TOTALS",
		spendingBySubagencyTotals
	});
	resetSubagencyTotals = () => ({ type: "RESET_SUBAGENCY_TOTALS" });
	setAgencySlugs = (agencySlugs, topTierCodes, agencyIds, agencyOutlays) => ({
		type: "SET_AGENCY_SLUGS",
		agencySlugs,
		topTierCodes,
		agencyIds,
		agencyOutlays
	});
	setDataThroughDates = (dates) => ({
		type: "SET_DATA_THROUGH_DATES",
		dates
	});
	setIsSofChartLoaded = (bool) => ({
		type: "SET_IS_SOF_CHART_LOADED",
		payload: bool
	});
	resetAgency = () => ({ type: "RESET_AGENCY" });
}));
//#endregion
//#region src/js/hooks/useAgencySlugs.jsx
var useAgencySlugs;
var init_useAgencySlugs = __esmMin((() => {
	init_es();
	init_WithAgencySlugs();
	init_agency();
	init_agencyActions();
	useAgencySlugs = () => {
		const dispatch = useDispatch();
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const { agencySlugs, topTierCodes, agencyIds } = useSelector((state) => state.agency);
		const request = useRef(null);
		useEffect(() => {
			if (!isEmpty(agencySlugs) && loading) setLoading(false);
			if (isEmpty(agencySlugs)) {
				setLoading(true);
				setError(false);
				request.current = fetchAgencySlugs();
				request.current.promise.then(({ data }) => {
					const slugsMapping = mapSlugToTopTierCode(data.results);
					const outlayMapping = mapTopTierCodeToOutlay(data.results);
					const topTierCodesMapping = mapTopTierCodeToSlug(data.results);
					const idMapping = mapIdToSlug(data.results);
					dispatch(setAgencySlugs(slugsMapping, topTierCodesMapping, idMapping, outlayMapping));
					setLoading(false);
					setError(false);
					request.current = null;
				}).catch((e) => {
					if (e.code !== "ERR_CANCELED") {
						setLoading(false);
						setError(true);
						console.error(e);
						request.current = null;
					}
				});
			}
			return () => {
				if (request.current) request.current.cancel();
			};
		}, [
			agencySlugs,
			topTierCodes,
			agencyIds
		]);
		return [
			agencySlugs,
			topTierCodes,
			agencyIds,
			loading,
			error
		];
	};
}));
//#endregion
export { fetchSubcomponentsList as A, fetchFederalAccountsList as C, fetchSubagencyNewAwardsCount as D, fetchProgramActivityByTas as E, init_agency as M, fetchSubagencySpendingList as O, fetchBudgetaryResources as S, fetchObligationsByAwardType as T, setSelectedTas as _, resetAwardObligations as a, withAgencySlugs as b, setAwardObligations as c, setDataThroughDates as d, setIsSofChartLoaded as f, setSelectedSubcomponent as g, setSelectedPrgActivityOrObjectClass as h, resetAgency as i, fetchTasList as j, fetchSubagencySummary as k, setBudgetaryResources as l, setSelectedFederalAccount as m, useAgencySlugs as n, resetSubagencyTotals as o, setLevel4ApiResponse as p, init_agencyActions as r, setAgencyOverview as s, init_useAgencySlugs as t, setCurrentLevelNameAndId as u, setSubagencyTotals as v, fetchObjectClassByTas as w, fetchAgencyOverview as x, init_WithAgencySlugs as y };
