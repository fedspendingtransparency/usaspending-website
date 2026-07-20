import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { $a as init_GlobalConstants, Hn as isCancel, Ii as init_moneyFormatter, Oi as calculateUnits, Qa as globalConstants, Vn as init_axios, dn as init_apiRequest, go as require_jsx_runtime, io as useSelector, no as init_es, oo as useDispatch, un as apiRequest } from "./index.js-Dk2VDaPz.js";
import { T as quantize, t as init_src } from "./src-BVb2vAbu.js";
import { useEffect, useRef, useState } from "react";
import { get, max, min } from "lodash-es";
//#region src/js/helpers/search/collapsiblesidebarHelper.js
var sortAlphaNumbersLast;
var init_collapsiblesidebarHelper = __esmMin((() => {
	sortAlphaNumbersLast = (arr) => arr.sort((a, b) => {
		const aIsNumber = !isNaN(parseInt(a, 10));
		const bIsNumber = !isNaN(parseInt(b, 10));
		if (aIsNumber && !bIsNumber) return 1;
		if (!aIsNumber && bIsNumber) return -1;
		if (aIsNumber && bIsNumber) return a.code - b.code;
		return String(a).localeCompare(String(b));
	});
}));
//#endregion
//#region src/js/helpers/disasterHelper.js
var defCodeQueryString, parseCodes;
var init_disasterHelper = __esmMin((() => {
	init_collapsiblesidebarHelper();
	defCodeQueryString = (defCodes) => defCodes.sort().reduce((acc, code, i, array) => {
		let currentString = acc;
		currentString += code;
		if (i + 1 !== array.length) currentString += ",";
		return currentString;
	}, "");
	parseCodes = (codes, type) => sortAlphaNumbersLast(codes.filter(((code) => code.disaster === type)).map((code) => code.code));
}));
//#endregion
//#region src/js/apis/disaster.js
var fetchDEFCodes, fetchOverview, fetchRecipientSpendingByGeography, fetchAgencyCount, fetchAwardSpendingByAgency, fetchLoansByAgency, fetchAwardAmounts, fetchCfdaCount, fetchSpendingByCfda, fetchCfdaLoans, fetchDisasterSpending, fetchDisasterSpendingCount, fetchLoanSpending;
var init_disaster = __esmMin((() => {
	init_apiRequest();
	init_disasterHelper();
	fetchDEFCodes = () => apiRequest({ url: "v2/references/def_codes/" });
	fetchOverview = (defCodes) => apiRequest({ url: defCodes ? `v2/disaster/overview/?def_codes=${defCodeQueryString(defCodes)}` : "v2/disaster/overview/" });
	fetchRecipientSpendingByGeography = (params) => apiRequest({
		url: "v2/disaster/spending_by_geography/",
		method: "post",
		data: params
	});
	fetchAgencyCount = (params) => apiRequest({
		url: "v2/disaster/agency/count/",
		method: "post",
		data: params
	});
	fetchAwardSpendingByAgency = (params) => apiRequest({
		url: "v2/disaster/agency/spending/",
		method: "post",
		data: params
	});
	fetchLoansByAgency = (params) => apiRequest({
		url: "v2/disaster/agency/loans/",
		method: "post",
		data: params
	});
	fetchAwardAmounts = (params) => apiRequest({
		url: "v2/disaster/award/amount/",
		method: "post",
		data: params
	});
	fetchCfdaCount = (params) => apiRequest({
		url: "v2/disaster/cfda/count/",
		method: "post",
		data: params
	});
	fetchSpendingByCfda = (params) => apiRequest({
		url: "v2/disaster/cfda/spending/",
		method: "post",
		data: params
	});
	fetchCfdaLoans = (params) => apiRequest({
		url: "v2/disaster/cfda/loans/",
		method: "post",
		data: params
	});
	fetchDisasterSpending = (type, params) => apiRequest({
		url: `v2/disaster/${type}/spending/`,
		method: "post",
		data: params
	});
	fetchDisasterSpendingCount = (type, params) => apiRequest({
		url: `v2/disaster/${type}/count/`,
		method: "post",
		data: params
	});
	fetchLoanSpending = (type, params) => apiRequest({
		url: `v2/disaster/${type}/loans/`,
		method: "post",
		data: params
	});
}));
//#endregion
//#region src/js/redux/actions/covid19/covid19Actions.js
var setDEFCodes, setOverview, resetOverview, setTotals, setIsMapLoaded, setDefcParams;
var init_covid19Actions = __esmMin((() => {
	setDEFCodes = (defCodes) => ({
		type: "SET_DEF_CODES",
		defCodes
	});
	setOverview = (overview) => ({
		type: "SET_COVID_OVERVIEW",
		overview
	});
	resetOverview = () => ({ type: "RESET_COVID_OVERVIEW" });
	setTotals = (awardType, totals) => ({
		type: `SET_COVID_AWARD_AMOUNTS${awardType && "_"}${awardType}`,
		totals
	});
	setIsMapLoaded = (bool) => ({
		type: "SET_IS_RECIPIENT_MAP_LOADED",
		payload: bool
	});
	setDefcParams = (defcParams) => ({
		type: "SET_DEFC_PARAMS",
		defcParams
	});
}));
//#endregion
//#region src/js/helpers/mapHelper.js
/**
* mapHelper.js
* Created by Kevin Li 2/15/17
*/
var stateNames, stateCenters, visualizationColors, stateNameFromCode, stateCenterFromFips, calculateRange, fetchLocationList, performCountryGeocode, firstSymbolId, mapboxSources, getColors, pluralize;
var init_mapHelper = __esmMin((() => {
	init_src();
	init_GlobalConstants();
	init_apiRequest();
	init_moneyFormatter();
	stateNames = {
		"AL": "Alabama",
		"AK": "Alaska",
		"AZ": "Arizona",
		"AR": "Arkansas",
		"CA": "California",
		"CO": "Colorado",
		"CT": "Connecticut",
		"DE": "Delaware",
		"FL": "Florida",
		"GA": "Georgia",
		"HI": "Hawaii",
		"ID": "Idaho",
		"IL": "Illinois",
		"IN": "Indiana",
		"IA": "Iowa",
		"KS": "Kansas",
		"KY": "Kentucky",
		"LA": "Louisiana",
		"ME": "Maine",
		"MD": "Maryland",
		"MA": "Massachusetts",
		"MI": "Michigan",
		"MN": "Minnesota",
		"MS": "Mississippi",
		"MP": "Northern Mariana Islands",
		"MO": "Missouri",
		"MT": "Montana",
		"NE": "Nebraska",
		"NV": "Nevada",
		"NH": "New Hampshire",
		"NJ": "New Jersey",
		"NM": "New Mexico",
		"NY": "New York",
		"NC": "North Carolina",
		"ND": "North Dakota",
		"OH": "Ohio",
		"OK": "Oklahoma",
		"OR": "Oregon",
		"PA": "Pennsylvania",
		"RI": "Rhode Island",
		"SC": "South Carolina",
		"SD": "South Dakota",
		"TN": "Tennessee",
		"TX": "Texas",
		"UT": "Utah",
		"VT": "Vermont",
		"VA": "Virginia",
		"WA": "Washington",
		"WV": "West Virginia",
		"WI": "Wisconsin",
		"WY": "Wyoming",
		"DC": "District of Columbia",
		"PR": "Puerto Rico",
		"VI": "U.S. Virgin Islands",
		"AS": "American Samoa",
		"GU": "Guam",
		"UM": "U.S. Minor Outlying Islands"
	};
	stateCenters = {
		"10": [-75.483307, 39.118973],
		"11": [-76.990513, 38.896391],
		"12": [-81.550255, 27.64891],
		"13": [-83.25066, 32.674684],
		"15": [-155.424133, 19.590615],
		"16": [-115.464968, 45.494716],
		"17": [-89.451439, 39.739182],
		"18": [-86.173619, 39.690617],
		"19": [-93.151539, 41.939465],
		"20": [-98.327818, 38.642763],
		"21": [-84.728711, 37.823816],
		"22": [-91.671577, 30.889313],
		"23": [-69.218322, 45.140009],
		"24": [-76.349402, 38.841629],
		"25": [-70.596297, 41.964569],
		"26": [-84.515887, 44.978718],
		"27": [-94.503809, 46.443226],
		"28": [-89.710361, 32.523309],
		"29": [-92.492359, 38.294958],
		"30": [-109.341455, 46.681628],
		"31": [-100.031645, 41.497066],
		"32": [-116.70843, 38.561397],
		"33": [-71.553859, 43.998463],
		"34": [-74.414532, 40.057347],
		"35": [-106.044864, 34.299865],
		"36": [-76.301667, 42.685498],
		"37": [-78.223586, 35.120196],
		"38": [-100.452392, 47.469409],
		"39": [-82.706838, 40.358615],
		"40": [-97.21683, 35.330506],
		"41": [-120.610402, 44.121231],
		"42": [-77.737766, 41.118899],
		"44": [-71.457454, 41.508372],
		"45": [-80.430781, 33.594233],
		"46": [-100.25396, 44.371852],
		"47": [-86.317786, 35.832308],
		"48": [-99.683617, 31.169621],
		"49": [-111.549668, 39.515509],
		"50": [-72.772265, 43.872754],
		"51": [-78.224935, 38.00234],
		"53": [-120.760049, 47.283049],
		"54": [-80.294105, 38.921511],
		"55": [-89.72133, 44.899726],
		"56": [-107.548667, 42.983286],
		"60": [-170.721449, -14.299185],
		"66": [144.756212, 13.447046],
		"69": [145.211236, 14.154977],
		"72": [-66.249745, 18.198465],
		"78": [-64.729564, 17.731458],
		"01": [-86.703052, 32.525772],
		"02": [-153.610133, 62.075829],
		"04": [-111.668128, 34.168451],
		"05": [-92.494942, 34.752088],
		"06": [-120.047533, 37.229564],
		"08": [-105.549558, 38.999983],
		"09": [-72.661742, 41.519813]
	};
	visualizationColors = [
		"#c7efe2",
		"#92d9bb",
		"#5abf95",
		"#34a37e",
		"#2e8367",
		"#286846"
	];
	stateNameFromCode = (code) => {
		if ({}.hasOwnProperty.call(stateNames, code)) return stateNames[code];
		return null;
	};
	stateCenterFromFips = (fips) => {
		if ({}.hasOwnProperty.call(stateCenters, fips)) return stateCenters[fips];
		return [];
	};
	calculateRange = (data) => {
		let dataRange = data;
		if (data.length < 1) dataRange = [0, 1e4];
		let minValue = min(dataRange);
		let maxValue = max(dataRange);
		const units = calculateUnits(dataRange);
		minValue = Math.floor(minValue / units.unit);
		maxValue = Math.ceil(maxValue / units.unit);
		const segments = [];
		const scale = quantize().domain([minValue * units.unit, maxValue * units.unit]).range([
			0,
			1,
			2,
			3,
			4,
			5
		]).nice();
		for (let i = 0; i <= 5; i++) segments.push(scale.invertExtent(i)[1]);
		return {
			scale,
			segments,
			units
		};
	};
	fetchLocationList = (fileName) => apiRequest({
		baseURL: null,
		url: `data/${fileName}.json`
	});
	performCountryGeocode = (location) => apiRequest({
		baseURL: "https://api.mapbox.com/",
		url: `geocoding/v5/mapbox.places/${location}.json`,
		params: {
			access_token: globalConstants.MAPBOX_TOKEN,
			types: "country"
		}
	});
	firstSymbolId = ({ current }) => {
		const layers = current.getStyle().layers;
		let symbolId = null;
		for (let i = 0; i < layers.length; i++) if (layers[i].type === "symbol") {
			symbolId = layers[i].id;
			break;
		}
		return symbolId;
	};
	mapboxSources = {
		country: {
			label: "country",
			url: "mapbox://usaspendingfrbkc.countries-tileset",
			layer: "genc-countries",
			filterKey: "GENC0",
			lat: "INTPTLAT",
			long: "INTPTLON"
		},
		state: {
			label: "state",
			url: "mapbox://usaspendingfrbkc.2kdrjq7z",
			layer: "cb_2023_us_state_500k-b3ar5z",
			filterKey: "STUSPS",
			lat: "INTPTLAT",
			long: "INTPTLON"
		},
		county: {
			label: "county",
			url: "mapbox://usaspendingfrbkc.county-tileset",
			layer: "tl_2024_us_county",
			filterKey: "GEOID",
			lat: "INTPTLAT",
			long: "INTPTLON"
		},
		congressionalDistrict: {
			label: "congressional district",
			url: "mapbox://usaspendingfrbkc.district-tileset",
			layer: "118-CD",
			filterKey: "GEOID20",
			lat: "INTPTLAT",
			long: "INTPTLON"
		},
		district: {
			label: "congressional district",
			url: "mapbox://usaspendingfrbkc.district-tileset",
			layer: "118-CD",
			filterKey: "GEOID20",
			lat: "INTPTLAT",
			long: "INTPTLON"
		}
	};
	getColors = (numQuantiles) => {
		const colors = [];
		for (let i = 0; i < numQuantiles; i++) colors.push(`rgba(1, 43, 58, ${i * (1 / numQuantiles)})`);
		return colors;
	};
	pluralize = (string) => {
		if (string[string.length - 1] === "y") return `${string.slice(0, -1)}ies`;
		return `${string}s`;
	};
}));
//#endregion
//#region src/js/hooks/WithDefCodes.jsx
var import_jsx_runtime, useDefCodes, withDefCodes;
var init_WithDefCodes = __esmMin((() => {
	init_axios();
	init_es();
	init_covid19Actions();
	init_disaster();
	import_jsx_runtime = require_jsx_runtime();
	useDefCodes = () => {
		const dispatch = useDispatch();
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState("");
		const { defCodes } = useSelector((state) => state.covid19);
		const request = useRef();
		useEffect(() => {
			if (loading && defCodes.length) setLoading(false);
			if (!defCodes.length) {
				setLoading(true);
				setError("");
				request.current = fetchDEFCodes();
				request.current.promise.then(({ data: { codes } }) => {
					dispatch(setDEFCodes(codes.filter((c) => c.disaster === "covid_19" || c.code === "1" || c.code === "Z")));
					setLoading(false);
					request.current = null;
				}).catch((e) => {
					if (!isCancel(e)) {
						console.error("Error fetching def codes: ", e);
						setLoading(false);
						setError(get(e, "message", "There was an error. Please try again!"));
						request.current = null;
					}
				});
			}
			return () => {
				if (request.current) request.current.cancel();
			};
		}, [dispatch, defCodes]);
		return [
			error,
			loading,
			defCodes
		];
	};
	withDefCodes = (WrappedComponent) => (props) => {
		const [errorMsg, isLoading, defCodes] = useDefCodes();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, {
			defCodeFetchError: errorMsg,
			areDefCodesLoading: isLoading,
			defCodes,
			...props
		});
	};
}));
//#endregion
export { fetchLoansByAgency as A, fetchAwardAmounts as C, fetchDisasterSpending as D, fetchCfdaLoans as E, init_disasterHelper as F, parseCodes as I, fetchRecipientSpendingByGeography as M, fetchSpendingByCfda as N, fetchDisasterSpendingCount as O, init_disaster as P, fetchAgencyCount as S, fetchCfdaCount as T, setDEFCodes as _, fetchLocationList as a, setOverview as b, init_mapHelper as c, pluralize as d, stateCenterFromFips as f, resetOverview as g, init_covid19Actions as h, calculateRange as i, fetchOverview as j, fetchLoanSpending as k, mapboxSources as l, visualizationColors as m, useDefCodes as n, firstSymbolId as o, stateNameFromCode as p, withDefCodes as r, getColors as s, init_WithDefCodes as t, performCountryGeocode as u, setDefcParams as v, fetchAwardSpendingByAgency as w, setTotals as x, setIsMapLoaded as y };
