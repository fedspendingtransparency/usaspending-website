import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { vi as formatMoneyWithPrecision, wi as init_moneyFormatter } from "./index.js-CgeUxZJy.js";
//#region src/js/dataMapping/award/awardAmountsSection.js
var orderedTableTitles, spendingCategoriesByAwardType, infrastructureSpendingCategoriesByAwardType, caresActSpendingCategories, formattedSpendingCategoriesByAwardType, awardTableClassMap, tableTitlesBySpendingCategoryAndAwardType, asstAwardTypesWithSimilarAwardAmountData, outlayColor, obligatedColor, currentColor, potentialColor, subsidyColor, faceValueColor, nonFederalFundingColor, infrastructureOutlayColor, infrastructureObligatedColor, infrastructureCurrentColor, infrastructurePotentialColor, defaultPadding, lineOffsetsBySpendingCategory, defcTypes;
var init_awardAmountsSection = __esmMin((() => {
	orderedTableTitles = [
		"Outlayed Amount",
		"Obligated Amount",
		"Infrastructure Outlayed Amount",
		"Infrastructure Obligated Amount",
		"COVID-19 Outlayed Amount",
		"COVID-19 Obligated Amount",
		"Current Award Amount",
		"Potential Award Amount",
		"Combined Outlayed Amounts",
		"Combined Obligated Amounts",
		"Combined Current Award Amounts",
		"Combined Potential Award Amounts",
		"Non-Federal Funding",
		"Total Funding",
		"Original Subsidy Cost",
		"Face Value of Direct Loan"
	];
	spendingCategoriesByAwardType = {
		loan: ["_subsidy", "_faceValue"],
		contract: [
			"_totalObligation",
			"_baseExercisedOptions",
			"_baseAndAllOptions",
			"_totalOutlay"
		],
		idv: [
			"_totalObligation",
			"_baseExercisedOptions",
			"_baseAndAllOptions",
			"_totalOutlay"
		],
		idv_aggregated: [
			"_totalObligation",
			"_baseExercisedOptions",
			"_baseAndAllOptions",
			"_combinedOutlay"
		]
	};
	infrastructureSpendingCategoriesByAwardType = {
		contract: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"],
		idv: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"],
		idv_aggregated: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"],
		asst: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"],
		loan: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"],
		grant: ["_fileCOutlayInfrastructure", "_fileCObligatedInfrastructure"]
	};
	caresActSpendingCategories = ["fileCObligatedFormatted", "fileCOutlayFormatted"];
	formattedSpendingCategoriesByAwardType = {
		contract: [
			"fileCOutlayFormatted",
			"fileCObligatedFormatted",
			"totalObligationFormatted",
			"baseExercisedOptionsFormatted",
			"baseAndAllOptionsFormatted",
			"totalOutlayFormatted",
			"infrastructureOutlayFormatted",
			"infrastructureObligationFormatted"
		],
		idv: [
			"fileCOutlayFormatted",
			"fileCObligatedFormatted",
			"totalObligationFormatted",
			"baseExercisedOptionsFormatted",
			"baseAndAllOptionsFormatted",
			"totalOutlayFormatted",
			"infrastructureOutlayFormatted",
			"infrastructureObligationFormatted"
		],
		idv_aggregated: [
			"fileCOutlayFormatted",
			"fileCObligatedFormatted",
			"totalObligationFormatted",
			"baseExercisedOptionsFormatted",
			"baseAndAllOptionsFormatted",
			"combinedOutlayFormatted",
			"infrastructureOutlayFormatted",
			"infrastructureObligationFormatted"
		],
		asst: [
			"fileCObligatedFormatted",
			"fileCOutlayFormatted",
			"totalObligationFormatted",
			"nonFederalFundingFormatted",
			"totalFundingFormatted",
			"totalOutlayFormatted",
			"infrastructureOutlayFormatted",
			"infrastructureObligationFormatted"
		],
		loan: ["subsidyFormatted", "faceValueFormatted"]
	};
	awardTableClassMap = {
		"Combined Obligated Amounts": "award-amounts__obligated",
		"Combined Outlayed Amounts": "award-amounts__data-icon-dark-blue",
		"Combined Current Award Amounts": "award-amounts__current",
		"Combined Potential Award Amounts": "award-amounts__potential",
		"Obligated Amount": "award-amounts__obligated",
		"Current Award Amount": "award-amounts__current",
		"Potential Award Amount": "award-amounts__potential",
		"Non-Federal Funding": "award-amounts__data-icon_transparent-green",
		"Total Funding": "award-amounts__data-icon_gray",
		"Face Value of Direct Loan": "award-amounts__data-icon_face-value",
		"Original Subsidy Cost": "award-amounts__data-icon_subsidy",
		"COVID-19 Obligated Amount": "award-amounts__file-c-obligations",
		"COVID-19 Outlayed Amount": "award-amounts__file-c-outlays",
		"Outlayed Amount": "award-amounts__data-icon-dark-blue",
		"Combined Infrastructure Obligated Amounts": "award-amounts__infrastructure-obligated",
		"Combined Infrastructure Outlayed Amounts": "award-amounts__infrastructure-outlays",
		"Infrastructure Obligated Amount": "award-amounts__infrastructure-obligated",
		"Infrastructure Outlayed Amount": "award-amounts__infrastructure-outlays",
		"Infrastructure Obligated Amounts": "award-amounts__infrastructure-obligated",
		"Infrastructure Outlayed Amounts": "award-amounts__infrastructure-outlays"
	};
	tableTitlesBySpendingCategoryAndAwardType = {
		asst: {
			totalFundingFormatted: "Total Funding",
			nonFederalFundingFormatted: "Non-Federal Funding",
			totalObligationFormatted: "Obligated Amount",
			fileCOutlayFormatted: "COVID-19 Outlayed Amount",
			fileCObligatedFormatted: "COVID-19 Obligated Amount",
			totalOutlayFormatted: "Outlayed Amount",
			infrastructureOutlayFormatted: "Infrastructure Outlayed Amount",
			infrastructureObligationFormatted: "Infrastructure Obligated Amount"
		},
		idv_aggregated: {
			baseExercisedOptionsFormatted: "Combined Current Award Amounts",
			baseAndAllOptionsFormatted: "Combined Potential Award Amounts",
			totalObligationFormatted: "Combined Obligated Amounts",
			combinedOutlayFormatted: "Combined Outlayed Amounts",
			fileCOutlayFormatted: "COVID-19 Outlayed Amount",
			fileCObligatedFormatted: "COVID-19 Obligated Amount",
			infrastructureOutlayFormatted: "Combined Infrastructure Outlayed Amounts",
			infrastructureObligationFormatted: "Combined Infrastructure Obligated Amounts"
		},
		contract: {
			totalOutlayFormatted: "Outlayed Amount",
			totalObligationFormatted: "Obligated Amount",
			baseExercisedOptionsFormatted: "Current Award Amount",
			baseAndAllOptionsFormatted: "Potential Award Amount",
			fileCOutlayFormatted: "COVID-19 Outlayed Amount",
			fileCObligatedFormatted: "COVID-19 Obligated Amount",
			infrastructureOutlayFormatted: "Infrastructure Outlayed Amount",
			infrastructureObligationFormatted: "Infrastructure Obligated Amount"
		},
		idv: {
			baseExercisedOptionsFormatted: "Current Award Amount",
			baseAndAllOptionsFormatted: "Potential Award Amount",
			totalObligationFormatted: "Obligated Amount",
			fileCOutlayFormatted: "COVID-19 Outlayed Amount",
			fileCObligatedFormatted: "COVID-19 Obligated Amount",
			totalOutlayFormatted: "Outlayed Amount",
			infrastructureOutlayFormatted: "Infrastructure Outlayed Amounts",
			infrastructureObligationFormatted: "Infrastructure Obligated Amounts"
		},
		loan: {
			subsidyFormatted: "Original Subsidy Cost",
			faceValueFormatted: "Face Value of Direct Loan"
		}
	};
	asstAwardTypesWithSimilarAwardAmountData = [
		"grant",
		"other",
		"insurance",
		"direct payment"
	];
	outlayColor = "#0b2e5a";
	obligatedColor = "#4773aa";
	currentColor = "#8aa6c9";
	potentialColor = "#dce4ee";
	subsidyColor = "#8c6e86";
	faceValueColor = "#ded5db";
	nonFederalFundingColor = "#47AAA7";
	infrastructureOutlayColor = "#2d6878";
	infrastructureObligatedColor = "#afcdd5";
	infrastructureCurrentColor = "#8ba6c9";
	infrastructurePotentialColor = "#dce4ee";
	defaultPadding = 6;
	lineOffsetsBySpendingCategory = {
		obligationProcurement: 10,
		obligationAsst: defaultPadding,
		subsidy: 3,
		totalFunding: defaultPadding,
		nonFederalFunding: defaultPadding,
		faceValue: 0,
		current: defaultPadding,
		potential: 0,
		fileCProcurementObligated: 14 / 2,
		fileCProcurementOutlay: 18 / 2,
		fileCAsstObligation: 10,
		fileCAsstOutlay: 14,
		loanFileCObligated: 7,
		loanFileCOutlay: 9
	};
	defcTypes = [{
		codeType: "covid",
		keys: {
			outlay: "_fileCOutlay",
			obligated: "_fileCObligated",
			outlayAbbreviated: "fileCOutlayAbbreviated",
			obligationAbbreviation: "fileCObligatedAbbreviated"
		},
		label: "COVID-19 Spending",
		preText: "COVID-19"
	}, {
		codeType: "infrastructure",
		keys: {
			outlay: "_fileCOutlayInfrastructure",
			obligated: "_fileCObligatedInfrastructure",
			outlayAbbreviated: "infrastructureOutlayAbbreviated",
			obligationAbbreviation: "infrastructureObligationAbbreviated"
		},
		label: "Infrastructure Spending",
		preText: "Infrastructure"
	}];
}));
//#endregion
//#region src/js/helpers/awardAmountHelper.js
var formatAwardAmountRange, getAscendingSpendingCategoriesByAwardType, getInfrastructureAscendingSpendingCategoriesByAwardType, determineSpendingScenarioAsstAwards, determineSpendingScenario, determineFileCSpendingScenario, determineLoanSpendingScenario, determineInfrastructureSpendingScenario, determineSpendingScenarioByAwardType, generateDefcTabs;
var init_awardAmountHelper = __esmMin((() => {
	init_moneyFormatter();
	init_awardAmountsSection();
	formatAwardAmountRange = (range, options = 2) => {
		const minLabel = formatMoneyWithPrecision(range[0], options);
		const maxLabel = formatMoneyWithPrecision(range[1], options);
		let label = `${minLabel} - ${maxLabel}`;
		if (!range[0] && range[0] !== 0) label = `${maxLabel} and below`;
		if (!range[1] && range[1] !== 0) label = `${minLabel} and above`;
		return label;
	};
	getAscendingSpendingCategoriesByAwardType = (awardType, awardAmountObj) => {
		if (Object.keys(spendingCategoriesByAwardType).includes(awardType)) return spendingCategoriesByAwardType[awardType].map((category) => awardAmountObj[category]);
		return [];
	};
	getInfrastructureAscendingSpendingCategoriesByAwardType = (awardType, awardAmountObj) => {
		if (Object.keys(infrastructureSpendingCategoriesByAwardType).includes(awardType)) return infrastructureSpendingCategoriesByAwardType[awardType].map((category) => awardAmountObj[category]);
		return [];
	};
	determineSpendingScenarioAsstAwards = (awardAmountObj) => {
		const { _totalOutlay, _totalObligation, _nonFederalFunding, _totalFunding } = awardAmountObj;
		if (_totalOutlay < 0 || _totalObligation < 0 || _nonFederalFunding < 0 || _totalFunding < 0) return "insufficientData";
		else if (_totalObligation === 0 && _nonFederalFunding === 0 && _totalFunding === 0) return "insufficientData";
		else if (_totalOutlay > _totalObligation || _totalOutlay > _totalFunding || _totalObligation > _totalFunding || _nonFederalFunding > _totalFunding) return "insufficientData";
		else if (_totalObligation + _nonFederalFunding === _totalFunding || Math.round((_totalObligation + _nonFederalFunding) * 100) / 100) return "normal";
		else if (_totalObligation <= _totalFunding && !_nonFederalFunding) return "normal";
		return "insufficientData";
	};
	determineSpendingScenario = (small = 0, bigger = 0, biggest = null) => {
		const allCategoriesAreInPlay = small && bigger && biggest;
		if (small === 0 && bigger === 0 && biggest === 0) return "insufficientData";
		else if (small < 0 || bigger < 0 || biggest < 0) return "insufficientData";
		else if (allCategoriesAreInPlay) {
			if (small <= bigger && bigger <= biggest) return "normal";
			else if (bigger <= small && small <= biggest) return "exceedsBigger";
			else if (bigger <= biggest && biggest <= small) return "exceedsBiggest";
		} else if (small >= 0) {
			if (small <= bigger && bigger > 0) return "normal";
		}
		return "insufficientData";
	};
	determineFileCSpendingScenario = (awardType, awardAmountObj) => {
		const { _fileCOutlay, _fileCObligated } = awardAmountObj;
		if (_fileCObligated === 0 && _fileCOutlay === 0) return "normal";
		return getAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj).reduce((scenario, spendingCategory) => {
			if (scenario !== "normal") return scenario;
			return determineSpendingScenario(_fileCOutlay, _fileCObligated, spendingCategory);
		}, "normal") === "normal" ? "normal" : "insufficientData";
	};
	determineLoanSpendingScenario = (awardAmountObj) => {
		const { _totalOutlay, _totalObligation, _subsidy, _faceValue } = awardAmountObj;
		if (_subsidy === 0 && _faceValue === 0) return "insufficientData";
		if (_subsidy < 0 || _faceValue < 0) return "insufficientData";
		if (_totalOutlay > _totalObligation || _totalOutlay > _subsidy || _totalOutlay > _faceValue || _totalObligation > _subsidy || _totalObligation > _faceValue || _subsidy > _faceValue) return "insufficientData";
		if (_totalObligation === 0 && _totalOutlay === 0) {
			if (_subsidy <= _faceValue) return "normal";
			return "insufficientData";
		}
		if (_totalOutlay <= _totalObligation <= _subsidy <= _faceValue) return "normal";
		return "insufficientData";
	};
	determineInfrastructureSpendingScenario = (awardType, awardAmountObj) => {
		const { _fileCOutlayInfrastructure, _fileCObligatedInfrastructure } = awardAmountObj;
		if (_fileCObligatedInfrastructure === 0 && _fileCOutlayInfrastructure === 0) return "normal";
		return getInfrastructureAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj).reduce((scenario) => {
			if (scenario !== "normal") return scenario;
			return determineSpendingScenario(_fileCOutlayInfrastructure, _fileCObligatedInfrastructure);
		}, "normal") === "normal" ? "normal" : "insufficientData";
	};
	determineSpendingScenarioByAwardType = (awardType, awardAmountObj, infrastructure) => {
		if (infrastructure) {
			if (determineInfrastructureSpendingScenario(awardType, awardAmountObj) !== "normal") return "insufficientData";
		}
		if (determineFileCSpendingScenario(awardType, awardAmountObj) !== "normal") return "insufficientData";
		if (asstAwardTypesWithSimilarAwardAmountData.includes(awardType)) return determineSpendingScenarioAsstAwards(awardAmountObj);
		if (awardType === "loan") return determineLoanSpendingScenario(awardAmountObj);
		const [small, bigger, biggest] = getAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj);
		return determineSpendingScenario(small, bigger, biggest);
	};
	generateDefcTabs = (awardData) => {
		const keysInData = [];
		defcTypes.forEach((item) => {
			if (awardData[item.keys.outlay] > 0 || awardData[item.keys.obligated] > 0) keysInData.push(item.codeType);
		});
		if (keysInData.length === 0) return [];
		const tabs = [{
			internal: "overall",
			label: "Overall Spending"
		}];
		defcTypes.forEach((item) => {
			if (keysInData.indexOf(item.codeType) > -1) tabs.push({
				internal: item.codeType,
				label: item.label
			});
		});
		return tabs;
	};
}));
//#endregion
//#region src/js/redux/actions/search/searchSubAwardTableActions.js
var subAwardIdClicked;
var init_searchSubAwardTableActions = __esmMin((() => {
	subAwardIdClicked = (clicked) => ({
		type: "SUBAWARD_ID_CLICKED",
		value: clicked
	});
}));
//#endregion
export { outlayColor as C, tableTitlesBySpendingCategoryAndAwardType as E, orderedTableTitles as S, subsidyColor as T, infrastructurePotentialColor as _, generateDefcTabs as a, nonFederalFundingColor as b, awardTableClassMap as c, defcTypes as d, faceValueColor as f, infrastructureOutlayColor as g, infrastructureObligatedColor as h, formatAwardAmountRange as i, caresActSpendingCategories as l, infrastructureCurrentColor as m, subAwardIdClicked as n, init_awardAmountHelper as o, formattedSpendingCategoriesByAwardType as p, determineSpendingScenarioByAwardType as r, asstAwardTypesWithSimilarAwardAmountData as s, init_searchSubAwardTableActions as t, currentColor as u, init_awardAmountsSection as v, potentialColor as w, obligatedColor as x, lineOffsetsBySpendingCategory as y };
