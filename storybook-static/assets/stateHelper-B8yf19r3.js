import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { S as earliestFiscalYear, T as init_fiscalYearHelper, dn as init_apiRequest, un as apiRequest, v as convertFYToDateRange, y as currentFiscalYear } from "./index.js-Dk2VDaPz.js";
import { a as stateNameByFipsId, n as init_stateNames, t as fipsIdByStateName } from "./stateNames-BSGQPQGh.js";
//#region src/js/apis/state.js
var fetchStateOverview, fetchAwardBreakdown, fetchStateList;
var init_state = __esmMin((() => {
	init_apiRequest();
	fetchStateOverview = (id, year) => apiRequest({
		url: `v2/recipient/state/${id}/`,
		params: { year }
	});
	fetchAwardBreakdown = (id, year) => apiRequest({
		url: `v2/recipient/state/awards/${id}/`,
		params: { year }
	});
	fetchStateList = () => apiRequest({ url: "v2/recipient/state/" });
}));
//#endregion
//#region src/js/features/state/stateHelper.js
var createApiParams, acceptableChars, URLifyStateName, parseStateDataFromUrl, tabTypes;
var init_stateHelper = __esmMin((() => {
	init_stateNames();
	init_fiscalYearHelper();
	createApiParams = (stateCode, period) => {
		const earliestYear = earliestFiscalYear;
		const thisYear = currentFiscalYear();
		return {
			group: period,
			filters: {
				place_of_performance_locations: [{
					country: "USA",
					state: stateCode
				}],
				time_period: [{
					start_date: convertFYToDateRange(earliestYear)[0],
					end_date: convertFYToDateRange(thisYear)[1]
				}]
			},
			spending_level: "transactions",
			auditTrail: "Spending Over Time Visualization"
		};
	};
	acceptableChars = "abcdefghijklmnopqrstuvwxyz";
	URLifyStateName = (str) => str.split(" ").map((s) => s.split("").filter((s2) => acceptableChars.includes(s2.toLowerCase())).join("").toLowerCase()).join("-");
	parseStateDataFromUrl = (state) => {
		const isName = Number.isNaN(parseInt(state, 10));
		if (isName) {
			const parsedName = state?.split("-").join(" ").toLowerCase();
			if (fipsIdByStateName[parsedName]) return [
				isName,
				state.toLowerCase(),
				fipsIdByStateName[parsedName]
			];
		}
		if (state.length === 1 && stateNameByFipsId[`0${state}`]) return [
			isName,
			URLifyStateName(stateNameByFipsId[`0${state}`]),
			`0${state}`
		];
		if (stateNameByFipsId[`${state}`]) return [
			isName,
			URLifyStateName(stateNameByFipsId[`${state}`]),
			`${state}`
		];
		return [null, null];
	};
	tabTypes = [
		{
			internal: "all",
			label: "All Awards"
		},
		{
			internal: "contracts",
			label: "Contracts"
		},
		{
			internal: "grants",
			label: "Grants"
		},
		{
			internal: "direct_payments",
			label: "Direct Payments"
		},
		{
			internal: "loans",
			label: "Loans"
		},
		{
			internal: "other",
			label: "Other Financial Assistance"
		}
	];
}));
//#endregion
export { tabTypes as a, fetchStateOverview as c, parseStateDataFromUrl as i, init_state as l, createApiParams as n, fetchAwardBreakdown as o, init_stateHelper as r, fetchStateList as s, URLifyStateName as t };
