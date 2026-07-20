import { n as __esmMin, o as __toESM } from "./rolldown-runtime-D1cXj70v.js";
import { $t as init_apiRequest, O as require_dayjs_min, Oi as init_searchFiltersReducer, Qt as apiRequest, ki as initialState, ma as require_immutable } from "./index.js-CgeUxZJy.js";
import { isEqual, sortBy } from "lodash-es";
//#region src/js/helpers/search/dateRangeDropdownHelper.js
var dayjs$1, dateRangeDropdownTimePeriods;
var init_dateRangeDropdownHelper = __esmMin((() => {
	dayjs$1 = require_dayjs_min();
	dateRangeDropdownTimePeriods = [
		{
			value: "yesterday",
			startDate: dayjs$1().subtract(1, "day").format("YYYY-MM-DD"),
			endDate: dayjs$1().subtract(1, "day").format("YYYY-MM-DD"),
			label: "Yesterday"
		},
		{
			value: "last-seven-days",
			startDate: dayjs$1().subtract(1, "week").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 7 days"
		},
		{
			value: "last-fifteen-days",
			startDate: dayjs$1().subtract(15, "day").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 15 days"
		},
		{
			value: "last-thirty-days",
			startDate: dayjs$1().subtract(30, "day").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 30 days"
		},
		{
			value: "last-sixty-days",
			startDate: dayjs$1().subtract(60, "day").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 60 days"
		},
		{
			value: "current-month",
			startDate: dayjs$1().startOf("month").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "This month"
		},
		{
			value: "last-three-months",
			startDate: dayjs$1().subtract(3, "month").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 3 months"
		},
		{
			value: "last-six-months",
			startDate: dayjs$1().subtract(6, "month").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 6 months"
		},
		{
			value: "last-twelve-months",
			startDate: dayjs$1().subtract(12, "month").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Last 12 months"
		},
		{
			value: "last-calendar-year",
			startDate: dayjs$1().subtract(1, "year").startOf("year").format("YYYY-MM-DD"),
			endDate: dayjs$1().subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
			label: "Last year (Jan - Dec)"
		},
		{
			value: "year-to-date",
			startDate: dayjs$1().startOf("year").format("YYYY-MM-DD"),
			endDate: dayjs$1().format("YYYY-MM-DD"),
			label: "Year-to-date (Jan - today)"
		}
	];
}));
//#endregion
//#region src/js/helpers/searchHelper.js
var import_immutable, import_dayjs_min, checkboxTreeFilters, fetchLocations, fetchAwardingAgencies, fetchFundingAgencies, fetchProgramActivity, fetchTas, fetchPsc, fetchCFDA, naicsRequest, fetchAwardV2, fetchRecipientsAutocomplete, fetchAwardTransaction, performSpendingOverTimeSearch, performSpendingByCategorySearch, performSpendingByGeographySearch, performSpendingByAwardTabCountSearch, performSpendingByAwardSearch, performSpendingBySubawardGrouped, performSubawardSearch, generateUrlHash, restoreUrlHash, areCheckboxSelectionsEqual, valuesAreEqual, areFiltersEqual, areFiltersEmpty, areFiltersSelected, areFiltersDifferent, getObjFromQueryParams, convertToTitleCase, locationChipLabel, dateRangeChipLabel;
var init_searchHelper = __esmMin((() => {
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
	init_searchFiltersReducer();
	init_apiRequest();
	init_dateRangeDropdownHelper();
	checkboxTreeFilters = [
		"defCodes",
		"pscCodes",
		"naicsCodes",
		"tasCodes"
	];
	fetchLocations = (req) => apiRequest({
		url: "v2/autocomplete/location/",
		method: "post",
		data: req
	});
	fetchAwardingAgencies = (req) => apiRequest({
		url: "v2/autocomplete/awarding_agency/",
		method: "post",
		data: req
	});
	fetchFundingAgencies = (req) => apiRequest({
		url: "v2/autocomplete/funding_agency/",
		method: "post",
		data: req
	});
	fetchProgramActivity = (req) => apiRequest({
		url: "v2/autocomplete/program_activity/",
		method: "post",
		data: req
	});
	fetchTas = (idString = "") => apiRequest({ url: idString.length === 0 ? `/v2/references/filter_tree/tas/` : `/v2/references/filter_tree/tas/${idString}` });
	fetchPsc = (paramString = "") => apiRequest({ url: paramString === "" ? `/v2/references/filter_tree/psc/` : `/v2/references/filter_tree/psc/${paramString}` });
	fetchCFDA = (req) => apiRequest({
		url: "v2/autocomplete/cfda/",
		method: "post",
		data: req
	});
	naicsRequest = (param) => apiRequest({ url: `v2/references/naics/${param || ""}` });
	fetchAwardV2 = (awardId) => apiRequest({ url: `v2/awards/${awardId}/` });
	fetchRecipientsAutocomplete = (req) => apiRequest({
		url: "v2/autocomplete/recipient/",
		method: "post",
		data: req
	});
	fetchAwardTransaction = (params) => apiRequest({
		url: "v2/transactions/",
		method: "post",
		data: params
	});
	performSpendingOverTimeSearch = (params) => apiRequest({
		url: "v2/search/spending_over_time/",
		method: "post",
		data: params
	});
	performSpendingByCategorySearch = (params) => apiRequest({
		url: `v2/search/spending_by_category/${params.category}`,
		method: "post",
		headers: { "Content-Type": "application/json" },
		data: params
	});
	performSpendingByGeographySearch = (params) => apiRequest({
		url: "v2/search/spending_by_geography/",
		method: "post",
		data: params
	});
	performSpendingByAwardTabCountSearch = (params) => apiRequest({
		url: "v2/search/spending_by_award_count/",
		method: "post",
		data: params
	});
	performSpendingByAwardSearch = (params) => apiRequest({
		url: "v2/search/spending_by_award/",
		method: "post",
		data: params
	});
	performSpendingBySubawardGrouped = (params) => apiRequest({
		url: "v2/search/spending_by_subaward_grouped/",
		method: "post",
		data: params
	});
	performSubawardSearch = (data) => apiRequest({
		url: "v2/subawards/",
		method: "post",
		data
	});
	generateUrlHash = (data) => apiRequest({
		url: "v2/references/filter/",
		method: "post",
		data
	});
	restoreUrlHash = (data) => apiRequest({
		url: "v2/references/hash/",
		method: "post",
		data
	});
	areCheckboxSelectionsEqual = ({ exclude: exclude1, require: require1 }, { exclude: exclude2, require: require2 }) => {
		if (!isEqual(sortBy(require1), sortBy(require2))) return false;
		if (!isEqual(sortBy(exclude1), sortBy(exclude2))) return false;
		return true;
	};
	valuesAreEqual = (a, b) => {
		if (import_immutable.Iterable.isIterable(a) || import_immutable.Iterable.isIterable(b)) return (0, import_immutable.is)(a, b);
		return isEqual(a, b);
	};
	areFiltersEqual = (filters = initialState, filterReference = initialState) => {
		if (!filterReference && filters) return false;
		const referenceObject = { ...filterReference };
		const comparisonObject = { ...filters };
		if (referenceObject.timePeriodType === "fy") {
			delete comparisonObject.time_period;
			delete referenceObject.time_period;
			delete comparisonObject.filterNewAwardsOnlyActive;
			delete referenceObject.filterNewAwardsOnlyActive;
			delete comparisonObject.filterNaoActiveFromFyOrDateRange;
			delete referenceObject.filterNaoActiveFromFyOrDateRange;
		} else if (referenceObject.timePeriodType === "dr") {
			delete comparisonObject.timePeriodFY;
			delete referenceObject.timePeriodFY;
			delete comparisonObject.filterNewAwardsOnlyActive;
			delete referenceObject.filterNewAwardsOnlyActive;
			delete comparisonObject.filterNaoActiveFromFyOrDateRange;
			delete referenceObject.filterNaoActiveFromFyOrDateRange;
		}
		const immutableFilterKeys = Object.keys(comparisonObject).filter((k) => !checkboxTreeFilters.includes(k));
		for (const key of immutableFilterKeys) {
			const unfilteredValue = comparisonObject[key];
			const currentValue = referenceObject[key];
			if (!valuesAreEqual(unfilteredValue, currentValue)) return false;
		}
		for (let i = 0; i < checkboxTreeFilters.length; i++) {
			const key = checkboxTreeFilters[i];
			const unfilteredValue = comparisonObject[key].toObject();
			const currentValue = referenceObject[key].toObject();
			if (!areCheckboxSelectionsEqual(unfilteredValue, currentValue)) return false;
		}
		return true;
	};
	areFiltersEmpty = (filters) => areFiltersEqual(filters);
	areFiltersSelected = (filters) => !areFiltersEqual(filters);
	areFiltersDifferent = (a, b) => !areFiltersEqual(a, b);
	getObjFromQueryParams = (str) => {
		const params = new URLSearchParams(str);
		const obj = {};
		for (const [key, value] of params.entries()) obj[key] = value;
		return obj;
	};
	convertToTitleCase = (str) => {
		if (!str) return "";
		return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
	};
	locationChipLabel = (label, location) => {
		switch (label) {
			case "County": {
				const countySplit = location.display.title.split(", ");
				if (countySplit[1]?.length === 2) return `${convertToTitleCase(countySplit[0])}, ${countySplit[1]}`;
				return convertToTitleCase(location?.display?.title);
			}
			case "City":
				if (location.filter?.state) return `${convertToTitleCase(location.filter.city)}, ${location.filter.state.length === 2 ? location.filter.state : convertToTitleCase(location.filter.state)}`;
				return `${convertToTitleCase(location.filter.city)}, ${location.filter.country}`;
			case "State": return convertToTitleCase(location.display.title);
			case "Country": return convertToTitleCase(location.display.title);
			case "Current congressional district": return `Current ${location.display.title}`;
			case "Original congressional district": return `Original ${location.display.title}`;
			default: return location.display.title;
		}
	};
	dateRangeChipLabel = (timeInput) => {
		let start = null;
		let end = null;
		let dateLabel;
		if (timeInput.start_date) start = (0, import_dayjs_min.default)(timeInput.start_date, "YYYY-MM-DD").format("MM/DD/YYYY");
		if (timeInput.end_date) end = (0, import_dayjs_min.default)(timeInput.end_date, "YYYY-MM-DD").format("MM/DD/YYYY");
		if ((0, import_dayjs_min.default)().isSame(timeInput.end_date, "day")) switch (timeInput.start_date) {
			case dateRangeDropdownTimePeriods[5].startDate:
				dateLabel = dateRangeDropdownTimePeriods[5].label;
				break;
			case dateRangeDropdownTimePeriods[6].startDate:
				dateLabel = dateRangeDropdownTimePeriods[6].label;
				break;
			case dateRangeDropdownTimePeriods[7].startDate:
				dateLabel = dateRangeDropdownTimePeriods[7].label;
				break;
			case dateRangeDropdownTimePeriods[8].startDate:
				dateLabel = dateRangeDropdownTimePeriods[8].label;
				break;
			case dateRangeDropdownTimePeriods[10].startDate:
				dateLabel = dateRangeDropdownTimePeriods[10].label;
				break;
			case dateRangeDropdownTimePeriods[1].startDate:
				dateLabel = dateRangeDropdownTimePeriods[1].label;
				break;
			case dateRangeDropdownTimePeriods[2].startDate:
				dateLabel = dateRangeDropdownTimePeriods[2].label;
				break;
			case dateRangeDropdownTimePeriods[3].startDate:
				dateLabel = dateRangeDropdownTimePeriods[3].label;
				break;
			case dateRangeDropdownTimePeriods[4].startDate:
				dateLabel = dateRangeDropdownTimePeriods[4].label;
				break;
			default: dateLabel = `${start} to ${end}`;
		}
		else if ((0, import_dayjs_min.default)().subtract(1, "day").isSame(timeInput.start_date, "day") && (0, import_dayjs_min.default)().subtract(1, "day").isSame(timeInput.end_date, "day")) dateLabel = dateRangeDropdownTimePeriods[0].label;
		else if ((0, import_dayjs_min.default)().subtract(1, "year").startOf("year").isSame(timeInput.start_date, "day") && (0, import_dayjs_min.default)().subtract(1, "year").endOf("year").isSame(timeInput.end_date, "day")) dateLabel = dateRangeDropdownTimePeriods[9].label;
		else if (start && end) dateLabel = `${start} - ${end}`;
		else if (start) dateLabel = `${start} - present`;
		else if (end) dateLabel = `Start of data - ${end}`;
		return dateLabel;
	};
}));
//#endregion
export { dateRangeDropdownTimePeriods as A, performSpendingByAwardTabCountSearch as C, performSpendingOverTimeSearch as D, performSpendingBySubawardGrouped as E, performSubawardSearch as O, performSpendingByAwardSearch as S, performSpendingByGeographySearch as T, generateUrlHash as _, convertToTitleCase as a, locationChipLabel as b, fetchAwardV2 as c, fetchFundingAgencies as d, fetchLocations as f, fetchTas as g, fetchRecipientsAutocomplete as h, areFiltersSelected as i, init_dateRangeDropdownHelper as j, restoreUrlHash as k, fetchAwardingAgencies as l, fetchPsc as m, areFiltersEmpty as n, dateRangeChipLabel as o, fetchProgramActivity as p, areFiltersEqual as r, fetchAwardTransaction as s, areFiltersDifferent as t, fetchCFDA as u, getObjFromQueryParams as v, performSpendingByCategorySearch as w, naicsRequest as x, init_searchHelper as y };
