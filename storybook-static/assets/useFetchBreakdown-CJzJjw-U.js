import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { dn as init_apiRequest, do as init_modern, po as useQuery, un as apiRequest } from "./index.js-Dk2VDaPz.js";
import { useEffect, useState } from "react";
import { startCase } from "lodash-es";
//#region src/js/helpers/explorerHelper.js
/**
* explorerHelper.js
* Created by Kevin Li 8/16/17
*/
var fetchBreakdown, pluralizeSubdivision, appendCellForDataOutsideTree, truncateDataForTreemap;
var init_explorerHelper = __esmMin((() => {
	init_apiRequest();
	fetchBreakdown = (params) => apiRequest({
		url: "v2/spending/",
		method: "post",
		data: params
	});
	pluralizeSubdivision = (activeSubdivision) => {
		let pluralText = "";
		if (activeSubdivision === "program_activity") pluralText = "Program Activities";
		else if (activeSubdivision === "object_class") pluralText = "Object Classes";
		else pluralText = `${startCase(activeSubdivision)}s`;
		return pluralText;
	};
	appendCellForDataOutsideTree = (dataForTree, overallTotal, activeSubdivision) => {
		const totalNotShown = overallTotal - dataForTree.reduce((sum, item) => sum + item.amount, 0);
		return [{
			id: null,
			link: false,
			code: "N/A",
			type: "",
			name: `Sum of all ${pluralizeSubdivision(activeSubdivision)} after Top 500`,
			amount: totalNotShown
		}].concat(dataForTree);
	};
	truncateDataForTreemap = (data, limit = 500) => data.sort((a, b) => b.amount - a.amount).filter((item) => item.amount >= 0).slice(0, limit);
}));
//#endregion
//#region src/js/hooks/useFetchBreakdown.jsx
/**
* useFetchBreakdown.jsx
* Created by Josue Aguilar on 05/07/2026
*/
var selectRandomIndex, useFetchBreakdown;
var init_useFetchBreakdown = __esmMin((() => {
	init_explorerHelper();
	init_modern();
	selectRandomIndex = () => Math.floor(Math.random() * 10);
	useFetchBreakdown = (params) => {
		const [randomIndex, setRandomIndex] = useState(0);
		const fy = params.filters?.fy;
		const period = params.filters?.period;
		const { data: res, isLoading, error } = useQuery({
			queryKey: [
				"fetchBreakdown",
				fy,
				period,
				params
			],
			queryFn: () => fetchBreakdown(params).promise,
			enabled: !!fy && !!period,
			staleTime: 6e4,
			refetchOnWindowFocus: false
		});
		const data = res?.data || { results: [] };
		const total = data?.total || [];
		useEffect(() => {
			if (data) setRandomIndex(selectRandomIndex());
		}, [data]);
		return {
			data,
			total,
			randomIndex,
			error,
			loading: isLoading
		};
	};
}));
//#endregion
export { truncateDataForTreemap as a, init_explorerHelper as i, useFetchBreakdown as n, appendCellForDataOutsideTree as r, init_useFetchBreakdown as t };
