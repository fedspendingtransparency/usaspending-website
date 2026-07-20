import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { dn as init_apiRequest, un as apiRequest } from "./index.js-Dk2VDaPz.js";
//#region src/js/helpers/keywordHelper.js
var fetchSummary, performKeywordSearch, performTabCountSearch;
var init_keywordHelper = __esmMin((() => {
	init_apiRequest();
	fetchSummary = (params) => apiRequest({
		url: "v2/search/transaction_spending_summary/",
		method: "post",
		data: params
	});
	performKeywordSearch = (params) => apiRequest({
		url: "v2/search/spending_by_transaction/",
		method: "post",
		data: params
	});
	performTabCountSearch = (params) => apiRequest({
		url: "v2/search/spending_by_transaction_count/",
		method: "post",
		data: params
	});
}));
//#endregion
export { performTabCountSearch as i, init_keywordHelper as n, performKeywordSearch as r, fetchSummary as t };
