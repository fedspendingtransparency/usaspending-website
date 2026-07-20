import { n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ai as formatMoneyWithPrecision, Ar as ds, Bn as init_Icons, Ca as init_awardType, Cn as AwardLoop, Ct as AWARD_TYPE_PROPS, D as nearestQuarterDate, Di as calculateUnitForSingleValue, Dn as Close, Dr as Xa, Ei as calculatePercentage, Et as init_propTypes, G as init_bulkDownloadActions, Ha as Link, Hn as isCancel, Ii as init_moneyFormatter, J as setDownloadExpectedFile, Ka as useMatch, Kr as FontAwesomeIcon, Li as unitValues, Ni as formatNumber, Nr as init_index_es, O as require_dayjs_min, Oi as calculateUnits, Pi as formatNumberWithPrecision, Pn as InfoCircle, Sa as glossaryLinks, St as AWARD_SECTION_PROPS, T as init_fiscalYearHelper, Ti as init_CoreLocation, Ur as vs, Va as init_development, Vn as init_axios, Vr as ss, X as setDownloadPending, Xn as covidColor, Y as setDownloadExpectedUrl, Zn as covidObligatedColor, _ as convertDateToFY, _r as Cs, _t as AWARD_COUNTS_PROPS, a as fetchAssistanceDownloadFile, bt as AWARD_PAGE_WRAPPER_PROPS, cr as init_socialShare, dn as init_apiRequest, dr as Analytics, fn as init_modalActions, fr as init_Analytics, ga as awardTypeCodes, go as require_jsx_runtime, gr as $s, gt as AWARD_AMOUNT_TYPE_PROPS, ht as AWARD_AGGREGATED_AMOUNTS_PROPS, jr as fc, ki as formatMoney, kn as ExclamationTriangle, l as init_downloadHelper, lo as bindActionCreators, n as init_Loading, ni as emptyHierarchy, no as init_es, nr as init_covid19, o as fetchContractDownloadFile, oo as useDispatch, or as getBaseUrl, pn as showModal, q as setDownloadCollapsed, qr as init_dist, s as fetchIdvDownloadFile, si as init_pscHelper, so as connect_default, sr as handleShareOptionClick, t as LoadingWrapper, ti as deducePscType, un as apiRequest, uo as init_redux, vt as AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, wi as CoreLocation, wr as Qs, xr as Ka, xt as AWARD_SECTION_HEADER_PROPS, yr as Go, yt as AWARD_OVERVIEW_PROPS, zn as SpeechBubble } from "./index.js-Dk2VDaPz.js";
import { n as useEventListener, t as init_useEventListener } from "./useEventListener-BdhWESDk.js";
import { D as init_metaTagHelper, f as awardPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { i as init_ResultsTableLoadingMessage, n as init_ResultsTableErrorMessage, r as ResultsTableLoadingMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-Cv27hSfO.js";
import { r as init_Note, t as Note } from "./Note-B_ZkRToa.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-CffoixM2.js";
import { n as init_DownloadButton508, t as DownloadIconButton508 } from "./DownloadButton508-CiKrpRMy.js";
import { _ as setDEFCodes, h as init_covid19Actions, n as useDefCodes, r as withDefCodes, t as init_WithDefCodes } from "./WithDefCodes-BotSvVWk.js";
import { C as init_PaginatedTooltipContainer, S as PaginatedTooltipContainer, c as CFDAOpportunityTotals, l as init_CFDAOpportunityTotals } from "./covid19Helper-B5EnUrHl.js";
import { B as linear, t as init_src } from "./src-BVb2vAbu.js";
import { i as init_Tooltip, n as init_ResultsTableNoResults, r as Tooltip, t as ResultsTableNoResults } from "./ResultsTableNoResults-zrflH2Pz.js";
import { A as federalAccountsInfoContract, B as summaryRelatedAwardsInfo, C as datesInfo, D as descriptionInfoAsst, E as descriptionInfo, F as loanSubsidyCost, H as transactionDescription, I as modificationNumber, L as recipientName, M as idvActivityInfo, N as init_InfoTooltipContent, O as descriptionInfoContract, P as loanFaceValue, R as relatedAwardsInfo, S as contractActivityInfoContracts, T as datesInfoIdv, V as summaryRelatedAwardsInfoIdv, _ as awardHistoryContract, a as ContractAwardAmountsInfo, b as awardHistoryIdv, c as LoanAwardAmountsInfo, d as actionDateSub, f as actionType, g as awardAmountsInfo, h as amountSub, i as CondensedCDTooltip, j as federalAccountsInfoIdv, k as descriptionSub, l as UnlinkedTooltip, m as amount, n as CFDAOverviewInfo, o as CovidFlagTooltip, p as actionTypeFA, r as CFDASectionInfo, t as AsstAwardAmountsInfo, u as actionDate, v as awardHistoryFinancialAssistanceGeneric, w as datesInfoAsst, x as contractActivityGrants, y as awardHistoryFinancialAssistanceLoan, z as subawardID } from "./InfoTooltipContent-BmV8PlBe.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-BnLVane6.js";
import { O as performSubawardSearch, c as fetchAwardV2, s as fetchAwardTransaction, y as init_searchHelper } from "./searchHelper-C3Qi4x1J.js";
import { n as init_StateLandingTableSorter, t as StateLandingTableSorter } from "./StateLandingTableSorter-bWot3PUJ.js";
import { i as measureTreemapValue, r as measureTreemapHeader, t as init_textMeasurement } from "./textMeasurement-Bf9kYCr1.js";
import { n as init_Error, t as Error } from "./Error-BWX5SVVE.js";
import { a as select_default, t as init_src$1 } from "./src-BcV_Sh12.js";
import { a as treemap_default, c as hierarchy, n as binary_default, t as init_src$2 } from "./src-D8Obn9VZ.js";
import { n as init_ViewTypeButton, t as ViewTypeButton } from "./ViewTypeButton-pGhfUL12.js";
import { i as init_recipientIdentifiers, n as init_ChartError, r as idList, t as ChartError } from "./ChartError-fd2PB0_C.js";
import { i as init_keyboardEventsHelper, n as init_ResultsTableTabs, r as createOnKeyDownHandler, t as ResultsTableTabs } from "./ResultsTableTabs-BmFNcVkp.js";
import { n as init_TreemapCell, t as TreemapCell } from "./TreemapCell-DFYP1r-l.js";
import { C as outlayColor, E as tableTitlesBySpendingCategoryAndAwardType, S as orderedTableTitles, T as subsidyColor, _ as infrastructurePotentialColor, a as generateDefcTabs, b as nonFederalFundingColor, c as awardTableClassMap, d as defcTypes, f as faceValueColor, g as infrastructureOutlayColor, h as infrastructureObligatedColor, l as caresActSpendingCategories, m as infrastructureCurrentColor, n as subAwardIdClicked, o as init_awardAmountHelper, p as formattedSpendingCategoriesByAwardType, r as determineSpendingScenarioByAwardType, s as asstAwardTypesWithSimilarAwardAmountData, t as init_searchSubAwardTableActions, u as currentColor, v as init_awardAmountsSection, w as potentialColor, x as obligatedColor, y as lineOffsetsBySpendingCategory } from "./searchSubAwardTableActions-C9jZIZnB.js";
import React, { Component, createElement, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, compact, endsWith, find, findKey, flowRight, isEmpty, isEqual, isNumber, map, max, min, pick, pull, remove, startCase, sum, throttle, truncate, uniqueId, upperFirst } from "lodash-es";
//#region src/js/models/v2/award/BaseAwardAmounts.js
var getCovid19Totals, getInfrastructureTotals, BaseAwardAmounts;
var init_BaseAwardAmounts = __esmMin((() => {
	init_moneyFormatter();
	getCovid19Totals = (arr, defCodes = []) => arr.filter((obj) => defCodes.filter((d) => d?.disaster === "covid_19")?.map((defc) => defc.code).includes(obj?.code)).reduce((acc, obj) => acc + obj?.amount || 0, 0);
	getInfrastructureTotals = (arr, defCodes = []) => arr.filter((obj) => defCodes.filter((d) => d?.disaster === "infrastructure")?.map((defc) => defc.code).includes(obj?.code)).reduce((acc, obj) => acc + obj?.amount || 0, 0);
	BaseAwardAmounts = {
		populateBase(data) {
			this.id = data.award_id && `${data.award_id}` || "";
			if (data.generatedId) this.generatedId = encodeURIComponent(`${data.generatedId}`);
			this.generatedId = data.generated_unique_award_id ? encodeURIComponent(`${data.generated_unique_award_id}`) : "";
		},
		populateAggIdv(data, defCodes) {
			this.childIDVCount = data.child_idv_count || 0;
			this.childAwardCount = data.child_award_count || 0;
			this.grandchildAwardCount = data.grandchild_award_count || 0;
			this._baseAndAllOptions = parseFloat(data.child_award_base_and_all_options_value + data.grandchild_award_base_and_all_options_value) || 0;
			this._totalObligation = parseFloat(data.child_award_total_obligation + data.grandchild_award_total_obligation) || 0;
			this._combinedOutlay = parseFloat(data.child_award_total_outlay + data.grandchild_award_total_outlay) || 0;
			this._baseExercisedOptions = parseFloat(data.child_award_base_exercised_options_val + data.grandchild_award_base_exercised_options_val) || 0;
			this._fileCOutlay = getCovid19Totals(data.child_account_outlays_by_defc.concat(data.grandchild_account_outlays_by_defc), defCodes);
			this._fileCObligated = getCovid19Totals(data.child_account_obligations_by_defc.concat(data.grandchild_account_obligations_by_defc), defCodes);
			this._fileCObligatedInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc.concat(data.grandchild_account_obligations_by_defc), defCodes);
			this._fileCOutlayInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc.concat(data.grandchild_account_obligations_by_defc), defCodes);
		},
		populateIdv(data, defCodes) {
			this._totalObligation = data._totalObligation;
			this._totalOutlay = data._totalOutlay;
			this._childAwardTotalOutlay = data._childAwardTotalOutlay;
			this._grandchildAwardTotalOutlay = data._grandchildAwardTotalOutlay;
			this._baseExercisedOptions = data._baseExercisedOptions;
			this._baseAndAllOptions = data._baseAndAllOptions;
			this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
			this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
			this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays, defCodes);
			this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations, defCodes);
		},
		populateLoan(data, defCodes) {
			this._subsidy = data._subsidy;
			this._faceValue = data._faceValue;
			this._totalOutlay = data._totalOutlay;
			this._totalObligation = data._totalObligation;
			this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
			this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
			this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays, defCodes);
			this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations, defCodes);
		},
		populateAsst(data, defCodes) {
			this._totalObligation = data._totalObligation;
			this._totalOutlay = data._totalOutlay;
			this._totalFunding = data._totalFunding;
			this._nonFederalFunding = data._nonFederalFunding;
			this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
			this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
			this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays, defCodes);
			this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations, defCodes);
		},
		populateContract(data, defCodes) {
			this._totalObligation = data._totalObligation;
			this._totalOutlay = data._totalOutlay;
			this._baseExercisedOptions = data._baseExercisedOptions;
			this._baseAndAllOptions = data._baseAndAllOptions;
			this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
			this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
			this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays, defCodes);
			this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations, defCodes);
		},
		populate(data, awardAmountType, defCodes) {
			this.populateBase(data, awardAmountType);
			if (awardAmountType === "idv_aggregated") this.populateAggIdv(data, defCodes);
			else if (awardAmountType === "idv") this.populateIdv(data, defCodes);
			else if (awardAmountType === "contract") this.populateContract(data, defCodes);
			else if (awardAmountType === "loan") this.populateLoan(data, defCodes);
			else this.populateAsst(data, defCodes);
		},
		get baseAndAllOptionsFormatted() {
			return formatMoneyWithPrecision(this._baseAndAllOptions, 2);
		},
		get baseAndAllOptionsAbbreviated() {
			if (Math.abs(this._baseAndAllOptions) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._baseAndAllOptions);
				if (this._baseAndAllOptions < 0) return `(${formatMoneyWithPrecision(Math.abs(this._baseAndAllOptions) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._baseAndAllOptions < 0) return `(${Math.abs(formatMoney(this._baseAndAllOptions))})`;
			return formatMoney(this._baseAndAllOptions);
		},
		get totalObligationFormatted() {
			return formatMoneyWithPrecision(this._totalObligation, 2);
		},
		get combinedOutlayFormatted() {
			return formatMoneyWithPrecision(this._combinedOutlay, 2);
		},
		get combinedOutlayAbbreviated() {
			if (Math.abs(this._combinedOutlay) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._combinedOutlay);
				if (this._combinedOutlay < 0) return `(${formatMoneyWithPrecision(Math.abs(this._combinedOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._combinedOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._combinedOutlay < 0) return `(${Math.abs(formatMoney(this._combinedOutlay))})`;
			return formatMoney(this._combinedOutlay);
		},
		get totalOutlayFormatted() {
			return formatMoneyWithPrecision(this._totalOutlay, 2);
		},
		get totalOutlayAbbreviated() {
			if (Math.abs(this._totalOutlay) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalOutlay);
				if (this._totalOutlay < 0) return `(${formatMoneyWithPrecision(Math.abs(this._totalOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._totalOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._totalOutlay < 0) return `(${Math.abs(formatMoney(this._totalOutlay))})`;
			return formatMoney(this._totalOutlay);
		},
		get totalObligationAbbreviated() {
			if (Math.abs(this._totalObligation) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalObligation);
				if (this._totalObligation < 0) return `(${formatMoneyWithPrecision(Math.abs(this._totalObligation) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._totalObligation / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._totalObligation < 0) return `(${Math.abs(formatMoney(this._totalObligation))})`;
			return formatMoney(this._totalObligation);
		},
		get infrastructureOutlayFormatted() {
			return formatMoneyWithPrecision(this._fileCOutlayInfrastructure, 2);
		},
		get infrastructureOutlayAbbreviated() {
			if (Math.abs(this._fileCOutlayInfrastructure) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._fileCOutlayInfrastructure);
				if (this._fileCOutlayInfrastructure < 0) return `(${formatMoneyWithPrecision(Math.abs(this._fileCOutlayInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._fileCOutlayInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._fileCOutlayInfrastructure < 0) return `(${Math.abs(formatMoney(this._fileCOutlayInfrastructure))})`;
			return formatMoney(this._fileCOutlayInfrastructure);
		},
		get infrastructureObligationFormatted() {
			return formatMoneyWithPrecision(this._fileCObligatedInfrastructure, 2);
		},
		get infrastructureObligationAbbreviated() {
			if (Math.abs(this._fileCObligatedInfrastructure) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._fileCObligatedInfrastructure);
				if (this._fileCObligatedInfrastructure < 0) return `(${formatMoneyWithPrecision(Math.abs(this._fileCObligatedInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._fileCObligatedInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._fileCObligatedInfrastructure < 0) return `(${Math.abs(formatMoney(this._fileCObligatedInfrastructure))})`;
			return formatMoney(this._fileCObligatedInfrastructure);
		},
		get baseExercisedOptionsFormatted() {
			return formatMoneyWithPrecision(this._baseExercisedOptions, 2);
		},
		get baseExercisedOptionsAbbreviated() {
			if (this._baseExercisedOptions >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._baseExercisedOptions);
				return `${formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			}
			return formatMoney(this._baseExercisedOptions);
		},
		get overspendingFormatted() {
			return formatMoneyWithPrecision(this._totalObligation - this._baseExercisedOptions, 2);
		},
		get overspendingAbbreviated() {
			if (this._totalObligation - this._baseExercisedOptions >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalObligation - this._baseExercisedOptions);
				return `${formatMoneyWithPrecision((this._totalObligation - this._baseExercisedOptions) / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._totalObligation - this._baseExercisedOptions);
		},
		get extremeOverspendingFormatted() {
			return formatMoneyWithPrecision(this._totalObligation - this._baseAndAllOptions, 2);
		},
		get extremeOverspendingAbbreviated() {
			if (this._totalObligation - this._baseAndAllOptions >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalObligation - this._baseAndAllOptions);
				return `${formatMoneyWithPrecision((this._totalObligation - this._baseAndAllOptions) / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._totalObligation - this._baseAndAllOptions);
		},
		get fileCOutlayFormatted() {
			return formatMoneyWithPrecision(this._fileCOutlay, 2);
		},
		get fileCOutlayAbbreviated() {
			if (this._fileCOutlay >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._fileCOutlay);
				return `${formatMoneyWithPrecision(this._fileCOutlay / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._fileCOutlay);
		},
		get fileCObligatedFormatted() {
			return formatMoneyWithPrecision(this._fileCObligated, 2);
		},
		get fileCObligatedAbbreviated() {
			if (this._fileCObligated >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._fileCObligated);
				return `${formatMoneyWithPrecision(this._fileCObligated / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._fileCObligated);
		},
		get totalFundingAbbreviated() {
			if (Math.abs(this._totalFunding) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalFunding);
				if (this._totalFunding < 0) return `(${formatMoneyWithPrecision(Math.abs(this._totalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._totalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._totalFunding < 0) return `(${Math.abs(formatMoney(this._totalFunding))})`;
			return formatMoney(this._totalFunding);
		},
		get totalFundingFormatted() {
			return formatMoneyWithPrecision(this._totalFunding, 2);
		},
		get nonFederalFundingFormatted() {
			return formatMoneyWithPrecision(this._nonFederalFunding, 2);
		},
		get nonFederalFundingAbbreviated() {
			if (Math.abs(this._nonFederalFunding) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._nonFederalFunding);
				if (this._nonFederalFunding < 0) return `(${formatMoneyWithPrecision(Math.abs(this._nonFederalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._nonFederalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._nonFederalFunding < 0) return `(${Math.abs(formatMoney(this._nonFederalFunding))})`;
			return formatMoney(this._nonFederalFunding);
		},
		get faceValueAbbreviated() {
			if (Math.abs(this._faceValue) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._faceValue);
				if (this._faceValue < 0) return `(${formatMoneyWithPrecision(Math.abs(this._faceValue) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._faceValue / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._faceValue < 0) return `(${Math.abs(formatMoney(this._faceValue))})`;
			return formatMoney(this._faceValue);
		},
		get faceValueFormatted() {
			return formatMoneyWithPrecision(this._faceValue, 2);
		},
		get subsidyAbbreviated() {
			if (Math.abs(this._subsidy) >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._subsidy);
				if (this._subsidy < 0) return `(${formatMoneyWithPrecision(Math.abs(this._subsidy) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
				return `${formatMoneyWithPrecision(this._subsidy / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
			} else if (this._subsidy < 0) return `(${Math.abs(formatMoney(this._subsidy))})`;
			return formatMoney(this._subsidy);
		},
		get subsidyFormatted() {
			return formatMoneyWithPrecision(this._subsidy, 2);
		}
	};
}));
//#endregion
//#region src/js/helpers/awardSummaryHelper.js
var dayjs$14, getSubmittingAgencyId, fetchAwardFundingSummary, fetchAwardFederalAccounts, isAwardAggregate, isAwardFinancialAssistance, isContract, isUSAAward, getAwardTypeByRecordtypeCountyAndState, datesByDateType, isBadDates;
var init_awardSummaryHelper = __esmMin((() => {
	init_apiRequest();
	dayjs$14 = require_dayjs_min();
	getSubmittingAgencyId = (awardId) => {
		if (awardId) {
			if (awardId.split("_").length >= 4) return awardId.split("_")[3];
			return "--";
		}
		return "--";
	};
	fetchAwardFundingSummary = (awardId) => apiRequest({
		url: "v2/awards/funding_rollup/",
		method: "post",
		data: { award_id: awardId }
	});
	fetchAwardFederalAccounts = (data) => apiRequest({
		url: "v2/awards/accounts/",
		method: "post",
		data
	});
	isAwardAggregate = (generatedAwardId = "") => generatedAwardId.includes("ASST_AGG");
	isAwardFinancialAssistance = (awardType) => [
		"grant",
		"insurance",
		"direct payment",
		"loan",
		"other"
	].includes(awardType);
	isContract = (awardType) => ["contract", "definitive contract"].includes(awardType);
	isUSAAward = (placeOfPerformance) => {
		const countryCode = placeOfPerformance._countryCode;
		const countryName = placeOfPerformance.countryName;
		if (countryCode === "USA" || countryCode === "UNITED STATES" || countryName === "UNITED STATES") return true;
		return false;
	};
	getAwardTypeByRecordtypeCountyAndState = (awardType, placeOfPerformance, recordType) => {
		const countyCode = placeOfPerformance._countyCode;
		const isUSA = isUSAAward(placeOfPerformance);
		if (isAwardFinancialAssistance(awardType)) {
			if (recordType === 3) {
				if (!isUSA) return "redactedDueToPIIForeign";
				return "redactedDueToPIIDomestic";
			}
			if (recordType === 2) return !isUSA ? "financialAssistanceForeign" : "financialAssistanceDomestic";
			if (recordType === 1) {
				if (isUSA && !countyCode) return "aggregatedByState";
				if (isUSA && countyCode) return "aggregatedByCounty";
				if (!isUSA) return "aggregatedByCountry";
			}
		}
		return isUSA ? "nonFinancialAssistanceDomestic" : "nonFinancialAssistanceForeign";
	};
	datesByDateType = (dates, awardType) => {
		const startDate = dayjs$14(dates._startDate.valueOf());
		let endDate = dayjs$14(dates._endDate.valueOf());
		let currentEndDate = null;
		if (isContract(awardType)) {
			endDate = dayjs$14(dates._potentialEndDate.valueOf());
			currentEndDate = dayjs$14(dates._endDate.valueOf());
		}
		return {
			startDate,
			endDate,
			currentEndDate
		};
	};
	isBadDates = (dates, awardType) => {
		const contract = isContract(awardType);
		const { startDate, endDate, currentEndDate } = dates;
		if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) return true;
		if (startDate.isAfter(endDate)) return true;
		if (contract) {
			if (isNaN(currentEndDate.valueOf())) return true;
			if (currentEndDate.isBefore(startDate) || endDate.isBefore(currentEndDate)) return true;
		}
		return false;
	};
}));
//#endregion
//#region src/js/dataMapping/award/tooltips.js
var tooltipsBySectionByAwardType, getToolTipBySectionAndAwardType, headerTooltipsByType, getHeaderTooltipsByTypeAndCol;
var init_tooltips = __esmMin((() => {
	init_InfoTooltipContent();
	init_awardSummaryHelper();
	tooltipsBySectionByAwardType = {
		description: {
			asst: descriptionInfoAsst,
			contract: descriptionInfoContract,
			idv: descriptionInfoContract,
			default: descriptionInfo
		},
		awardHistory: {
			idv: awardHistoryIdv,
			contract: awardHistoryContract,
			grant: awardHistoryContract,
			loan: awardHistoryFinancialAssistanceLoan,
			asst: awardHistoryFinancialAssistanceGeneric
		},
		transactionHistory: {
			idv: null,
			contract: null,
			asst: null
		},
		subAwards: {
			contract: null,
			grant: null
		},
		federalAccountFunding: {
			idv: null,
			default: null
		},
		awardAmounts: {
			contract: ContractAwardAmountsInfo,
			loan: LoanAwardAmountsInfo,
			asst: AsstAwardAmountsInfo
		},
		federalAccounts: {
			idv: federalAccountsInfoIdv,
			default: federalAccountsInfoContract
		},
		dates: {
			contract: datesInfo,
			idv: datesInfoIdv,
			asst: datesInfoAsst
		}
	};
	getToolTipBySectionAndAwardType = (section, type) => {
		const arrayOfSections = Object.keys(tooltipsBySectionByAwardType);
		const arrayOfAwardTypesForSection = Object.keys(tooltipsBySectionByAwardType[section]);
		if (arrayOfSections.includes(section) && arrayOfAwardTypesForSection.includes(type)) return tooltipsBySectionByAwardType[section][type];
		else if (isAwardFinancialAssistance(type) && arrayOfAwardTypesForSection.includes("asst")) return tooltipsBySectionByAwardType[section].asst;
		return tooltipsBySectionByAwardType[section].default;
	};
	headerTooltipsByType = {
		idv: {
			modificationNumber,
			actionDate,
			amount,
			actionType,
			transactionDescription
		},
		contract: {
			modificationNumber,
			actionDate,
			amount,
			actionType,
			transactionDescription
		},
		assistance: {
			modificationNumber,
			actionDate,
			amount,
			actionType: actionTypeFA,
			transactionDescription
		},
		loan: {
			modificationNumber,
			actionDate,
			amount,
			actionType: actionTypeFA,
			transactionDescription,
			loanFaceValue,
			loanSubsidyCost
		},
		default: {
			modificationNumber,
			actionDate,
			amount,
			actionType,
			transactionDescription
		}
	};
	getHeaderTooltipsByTypeAndCol = (type, col) => {
		const arrayOfSections = Object.keys(headerTooltipsByType);
		const arrayOfAwardTypesForSection = Object.keys(headerTooltipsByType[type]);
		if (arrayOfSections.includes(type) && arrayOfAwardTypesForSection.includes(col)) return headerTooltipsByType[type][col];
		else if (isAwardFinancialAssistance(type) && arrayOfAwardTypesForSection.includes("asst")) return headerTooltipsByType[type].asst;
		return headerTooltipsByType[type].default;
	};
}));
//#endregion
//#region src/js/dataMapping/award/awardHistorySection.js
var tabs, awardTypesWithSubawards;
var init_awardHistorySection = __esmMin((() => {
	init_tooltips();
	tabs = (awardType) => [
		{
			label: "Transaction History",
			internal: "transaction",
			enabled: true,
			tooltip: getToolTipBySectionAndAwardType("transactionHistory", awardType),
			tooltipProps: { wide: true }
		},
		{
			label: "Sub-Awards",
			internal: "subaward",
			enabled: true,
			tooltip: getToolTipBySectionAndAwardType("subAwards", awardType),
			tooltipProps: { wide: true }
		},
		{
			label: "Federal Account Funding",
			internal: "federal_account",
			enabled: true,
			tooltip: getToolTipBySectionAndAwardType("federalAccountFunding", awardType),
			tooltipProps: { wide: true }
		}
	];
	awardTypesWithSubawards = ["grant", "contract"];
}));
//#endregion
//#region src/js/components/award/shared/AwardSectionHeader.jsx
var import_jsx_runtime$74, AwardSectionHeader;
var init_AwardSectionHeader = __esmMin((() => {
	init_index_es();
	init_propTypes();
	import_jsx_runtime$74 = require_jsx_runtime();
	AwardSectionHeader = ({ icon, title, tooltip, tooltipWide = false, left = true }) => {
		const content = /* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)(import_jsx_runtime$74.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("p", { children: "This section displays the awards:" }),
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("span", { children: "Transaction History " }), "- Displays modification records for an award. Each modification appears as a row in the table below."] }),
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("span", { children: "Sub-Awards " }), "- Displays any sub-contracts reported by this contract's recipient (the 'prime recipient' in the sub-award context). Sub-contracts are contractual agreements that a prime recipient makes with another entity (sub-recipient) to furnish supplies or services for the prime contract. Above the Sub-Award table, we display the total number of reported sub-contract actions and their total value."] }),
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("span", { children: "Federal Account Funding " }), "- Each row in this table shows a transaction in the awarding agency's financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class."] })
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)(React.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsxs)("div", {
				className: "award-viz__heading",
				children: [
					icon && /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("div", {
						className: "award-viz__icon",
						children: icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("h3", {
						className: "award-viz__title",
						children: title
					}),
					tooltip && title !== "Award History" && /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)(ds, {
						className: "award-section-tt",
						icon: "info",
						tooltipPosition: left ? "left" : "right",
						wide: tooltipWide,
						tooltipComponent: tooltip
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("hr", { className: "award-viz__break" }),
			title === "Award History" && content
		] });
	};
	AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
}));
//#endregion
//#region src/js/helpers/awardHistoryHelper.js
var fetchFederalAccountFunding, getAwardHistoryFederalAccountsIdv, getAwardHistoryCounts;
var init_awardHistoryHelper = __esmMin((() => {
	init_apiRequest();
	fetchFederalAccountFunding = (params) => apiRequest({
		url: "v2/awards/funding/",
		method: "post",
		data: params
	});
	getAwardHistoryFederalAccountsIdv = (awardId) => apiRequest({ url: `v2/idvs/count/federal_account/${awardId}/` });
	getAwardHistoryCounts = (type, awardId, isIdv = false) => {
		if (type === "federal_account" && isIdv) return getAwardHistoryFederalAccountsIdv(awardId);
		return apiRequest({ url: `v2/awards/count/${type}/${awardId}/` });
	};
}));
//#endregion
//#region src/js/redux/actions/award/awardActions.js
var awardActions_exports = /* @__PURE__ */ __exportAll({
	resetAward: () => resetAward,
	setAward: () => setAward,
	setIdvDetails: () => setIdvDetails,
	setTotalTransactionObligatedAmount: () => setTotalTransactionObligatedAmount
});
var setAward, setIdvDetails, setTotalTransactionObligatedAmount, resetAward;
var init_awardActions = __esmMin((() => {
	setAward = (overview) => ({
		type: "SET_AWARD",
		overview
	});
	setIdvDetails = (details) => ({
		type: "SET_IDV_DETAILS",
		details
	});
	setTotalTransactionObligatedAmount = (total) => ({
		type: "SET_TOTAL_TRANSACTION_OBLIGATED_AMOUNT",
		total
	});
	resetAward = () => ({ type: "RESET_AWARD" });
}));
//#endregion
//#region src/js/dataMapping/award/transactionHistoryTable/tableMapping.jsx
var import_jsx_runtime$73, transactionsTableMapping, federalAccountsTableMapping, subawardTableMapping;
var init_tableMapping = __esmMin((() => {
	init_index_es();
	init_tooltips();
	init_InfoTooltipContent();
	import_jsx_runtime$73 = require_jsx_runtime();
	transactionsTableMapping = {
		idv: [
			{
				columnWidth: 150,
				displayName: "Modification Number",
				right: false,
				title: "modification_number",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("idv", "modificationNumber")
				})
			},
			{
				columnWidth: 150,
				displayName: "Action Date",
				right: false,
				title: "action_date",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("idv", "actionDate")
				})
			},
			{
				columnWidth: 150,
				displayName: "Amount",
				right: true,
				title: "federal_action_obligation",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("idv", "amount")
				})
			},
			{
				columnWidth: 250,
				displayName: "Action Type",
				right: false,
				title: "action_type",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("idv", "actionType")
				})
			},
			{
				columnWidth: 300,
				displayName: "Transaction Description",
				right: false,
				title: "description",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("idv", "transactionDescription")
				})
			}
		],
		loan: [
			{
				columnWidth: 150,
				displayName: "Modification Number",
				right: false,
				title: "modification_number",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "modificationNumber")
				})
			},
			{
				columnWidth: 150,
				displayName: "CFDA Number",
				right: false,
				title: "cfda_number"
			},
			{
				columnWidth: 150,
				displayName: "Action Date",
				right: false,
				title: "action_date",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "actionDate")
				})
			},
			{
				columnWidth: 150,
				displayName: "Loan Face Value",
				right: true,
				title: "face_value_loan_guarantee",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "loanFaceValue")
				})
			},
			{
				columnWidth: 250,
				displayName: "Loan Subsidy Cost (Total Obligations To Date)",
				right: true,
				title: "original_loan_subsidy_cost",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "loanSubsidyCost")
				})
			},
			{
				columnWidth: 250,
				displayName: "Action Type",
				right: false,
				title: "action_type",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "actionType")
				})
			},
			{
				columnWidth: 300,
				displayName: "Transaction Description",
				right: false,
				title: "description",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("loan", "transactionDescription")
				})
			}
		],
		contract: [
			{
				columnWidth: 150,
				displayName: "Modification Number",
				right: false,
				title: "modification_number",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("contract", "modificationNumber")
				})
			},
			{
				columnWidth: 150,
				displayName: "Action Date",
				right: false,
				title: "action_date",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("contract", "actionDate")
				})
			},
			{
				columnWidth: 150,
				displayName: "Amount",
				right: false,
				title: "federal_action_obligation",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("contract", "amount")
				})
			},
			{
				columnWidth: 250,
				displayName: "Action Type",
				right: false,
				title: "action_type",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("contract", "actionType")
				})
			},
			{
				columnWidth: 300,
				displayName: "Transaction Description",
				right: false,
				title: "description",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("contract", "transactionDescription")
				})
			}
		],
		assistance: [
			{
				columnWidth: 150,
				displayName: "Modification Number",
				right: false,
				title: "modification_number",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("assistance", "modificationNumber")
				})
			},
			{
				columnWidth: 150,
				displayName: "Assistance Listing",
				right: false,
				title: "cfda_number"
			},
			{
				columnWidth: 150,
				displayName: "Action Date",
				right: false,
				title: "action_date",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("assistance", "actionDate")
				})
			},
			{
				columnWidth: 150,
				displayName: "Amount",
				right: true,
				title: "federal_action_obligation",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("assistance", "amount")
				})
			},
			{
				columnWidth: 250,
				displayName: "Action Type",
				right: false,
				title: "action_type",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("assistance", "actionType")
				})
			},
			{
				columnWidth: 300,
				displayName: "Transaction Description",
				right: false,
				title: "description",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
					tooltipPosition: "left",
					icon: "info",
					className: "award-section-tt",
					tooltipComponent: getHeaderTooltipsByTypeAndCol("assistance", "transactionDescription")
				})
			}
		]
	};
	federalAccountsTableMapping = {
		idv: [
			{
				columnWidth: 150,
				displayName: "Submission Period",
				right: false,
				title: "reporting_fiscal_date"
			},
			{
				columnWidth: 150,
				displayName: "Award ID",
				right: false,
				title: "piid"
			},
			{
				columnWidth: 300,
				displayName: "Funding Agency",
				right: false,
				title: "funding_agency_name"
			},
			{
				columnWidth: 300,
				displayName: "Awarding Agency",
				right: false,
				title: "awarding_agency_name"
			},
			{
				columnWidth: 100,
				displayName: "DEFC",
				right: false,
				title: "disaster_emergency_fund_code"
			},
			{
				columnWidth: 500,
				displayName: "Federal Account Name",
				right: false,
				title: "account_title"
			},
			{
				columnWidth: 300,
				displayName: "Program Activity",
				right: false,
				title: "program_activity_name"
			},
			{
				columnWidth: 300,
				displayName: "Object Class",
				right: false,
				title: "object_class"
			},
			{
				columnWidth: 250,
				displayName: "Funding Obligated",
				right: true,
				title: "transaction_obligated_amount"
			},
			{
				columnWidth: 250,
				displayName: "Outlayed Amount (Beginning of FY to Period End)",
				right: true,
				title: "gross_outlay_amount"
			}
		],
		otherFunding: [
			{
				columnWidth: 150,
				displayName: "Submission Period",
				right: false,
				title: "reporting_fiscal_date"
			},
			{
				columnWidth: 500,
				displayName: "Federal Account",
				right: false,
				title: "account_title"
			},
			{
				columnWidth: 300,
				displayName: "Funding Agency",
				right: false,
				title: "funding_agency_name"
			},
			{
				columnWidth: 300,
				displayName: "Awarding Agency",
				right: false,
				title: "awarding_agency_name"
			},
			{
				columnWidth: 100,
				displayName: "DEFC",
				right: false,
				title: "disaster_emergency_fund_code"
			},
			{
				columnWidth: 300,
				displayName: "Program Activity",
				right: false,
				title: "program_activity_name"
			},
			{
				columnWidth: 300,
				displayName: "Object Class",
				right: false,
				title: "object_class"
			},
			{
				columnWidth: 250,
				displayName: "Funding Obligated",
				right: true,
				title: "transaction_obligated_amount"
			},
			{
				columnWidth: 250,
				displayName: "Outlayed Amount (Beginning of FY to Period End)",
				right: true,
				title: "gross_outlay_amount"
			}
		]
	};
	subawardTableMapping = [
		{
			columnWidth: 150,
			displayName: "Sub-Award ID",
			right: false,
			title: "subaward_number",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
				tooltipPosition: "left",
				icon: "info",
				className: "award-section-tt",
				tooltipComponent: subawardID
			})
		},
		{
			columnWidth: 300,
			displayName: "Recipient Name",
			right: false,
			title: "recipient_name",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
				tooltipPosition: "left",
				icon: "info",
				className: "award-section-tt",
				tooltipComponent: recipientName
			})
		},
		{
			columnWidth: 150,
			displayName: "Action Date",
			right: false,
			title: "action_date",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
				tooltipPosition: "left",
				icon: "info",
				className: "award-section-tt",
				tooltipComponent: actionDateSub
			})
		},
		{
			columnWidth: 150,
			displayName: "Amount",
			right: true,
			title: "amount",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
				tooltipPosition: "left",
				icon: "info",
				className: "award-section-tt",
				tooltipComponent: amountSub
			})
		},
		{
			columnWidth: 300,
			displayName: "Sub-Award Description",
			right: false,
			title: "description",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)(ds, {
				tooltipPosition: "left",
				icon: "info",
				className: "award-section-tt",
				tooltipComponent: descriptionSub
			})
		}
	];
}));
//#endregion
//#region src/js/models/v2/award/BaseFederalAccountFunding.js
var import_dayjs_min, monthToPeriod, AwardHistoryTransactionsTableRow, BaseFederalAccount$1;
var init_BaseFederalAccountFunding = __esmMin((() => {
	init_moneyFormatter();
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
	monthToPeriod = {
		1: "P01/P02",
		2: "P01/P02",
		3: "P03",
		4: "P04",
		5: "P05",
		6: "P06",
		7: "P07",
		8: "P08",
		9: "P09",
		10: "P10",
		11: "P11",
		12: "P12"
	};
	AwardHistoryTransactionsTableRow = {
		populateIdv(data) {
			this.modificationNumber = data.modification_number || null;
			this.actionDate = (0, import_dayjs_min.default)(data.action_date).format("MM/DD/YYYY") || null;
			this.federalActionObligation = formatMoney(data.federal_action_obligation) || null;
			this.actionTypeDescription = data.action_type ? `${data.action_type}: ${data.action_type_description}` : null;
			this.description = data.description || null;
		},
		populateLoan(data) {
			this.modificationNumber = data.modification_number || null;
			this.cfdaNumber = data.cfda_number || null;
			this.actionDate = (0, import_dayjs_min.default)(data.action_date).format("MM/DD/YYYY") || null;
			this.faceValue = formatMoney(data.face_value_loan_guarantee) || null;
			this.subsidy = formatMoney(data.original_loan_subsidy_cost) || null;
			this.actionTypeDescription = data.action_type ? `${data.action_type}: ${data.action_type_description}` : null;
			this.description = data.description || null;
		},
		populateContract(data) {
			this.modificationNumber = data.modification_number || null;
			this.actionDate = (0, import_dayjs_min.default)(data.action_date).format("MM/DD/YYYY") || null;
			this.federalActionObligation = formatMoney(data.federal_action_obligation) || null;
			this.actionTypeDescription = data.action_type ? `${data.action_type}: ${data.action_type_description}` : null;
			this.description = data.description || null;
		},
		populateAssistance(data) {
			this.modificationNumber = data.modification_number || null;
			this.cfdaNumber = data.cfda_number || null;
			this.actionDate = (0, import_dayjs_min.default)(data.action_date).format("MM/DD/YYYY") || null;
			this.federalActionObligation = formatMoney(data.federal_action_obligation) || null;
			this.actionTypeDescription = data.action_type ? `${data.action_type}: ${data.action_type_description}` : null;
			this.description = data.description || null;
		},
		populate(data, category) {
			switch (category) {
				case "idv":
					this.populateIdv(data);
					break;
				case "loan":
					this.populateLoan(data);
					break;
				case "contract":
					this.populateContract(data);
					break;
				default: this.populateAssistance(data);
			}
		}
	};
	BaseFederalAccount$1 = {
		populateBase(data) {
			this.reportingFiscalYear = data.reporting_fiscal_year || null;
			this.reportingFiscalQuarter = data.reporting_fiscal_quarter || null;
			this.id = data.piid || 0;
			this.awardId = data.award_id || "";
			this.generatedId = data.generated_unique_award_id ? encodeURIComponent(`${data.generated_unique_award_id}`) : "";
			this._mainAccountCode = data.main_account_code || 0;
			this.agency = data.funding_agency_name || "";
			this.fundingAgencyId = data.funding_agency_id || "";
			this.fundingAgencySlug = data.funding_agency_slug || "";
			this.awardingAgencyId = data.awarding_agency_id || "";
			this.awardingAgencySlug = data.awarding_agency_slug || "";
			this.awardingAgencyName = data.awarding_agency_name || "";
			this.fedAccount = data.account_title || "";
			this._programActivityCode = data.program_activity_code || "";
			this._programActivityName = data.program_activity_name || "";
			this._agencyId = data.agency_id || "";
			this._objectClassName = data.object_class_name || "";
			this._objectClass = data.object_class || "";
			this._fundingObligated = data.transaction_obligated_amount === null ? "" : parseFloat(data.transaction_obligated_amount);
			this._disasterEmergencyFundCode = data.disaster_emergency_fund_code || "";
			this._grossOutlayAmount = data.gross_outlay_amount || "";
			this._isQuarterlySubmission = data.is_quarterly_submission;
			this._reportingFiscalMonth = data.reporting_fiscal_month || null;
		},
		populate(data, category) {
			if (category === "idv") {
				this.populateBase(data);
				this.federalAccountCode = `${data.agency_id}-${data.main_account_code}`;
			} else {
				this.populateBase(data);
				/** TODO:
				* IMO we shouldn't have to do this.
				* The API should return consistent key/value pairs federal account code.
				* This was an oversight during API contract disucssions.
				*/
				this.federalAccountCode = data.federal_account;
			}
		}
	};
	Object.defineProperty(BaseFederalAccount$1, "fundingObligated", { get() {
		if (!this._fundingObligated && this._fundingObligated !== 0) return "--";
		return formatMoney(this._fundingObligated);
	} });
	Object.defineProperty(BaseFederalAccount$1, "submissionDate", { get() {
		if (this._isQuarterlySubmission) {
			if (this.reportingFiscalYear && this.reportingFiscalQuarter) return `FY ${this.reportingFiscalYear} Q${this.reportingFiscalQuarter}`;
			return "--";
		}
		if (this.reportingFiscalYear && this._reportingFiscalMonth) return `FY ${this.reportingFiscalYear} ${monthToPeriod[this._reportingFiscalMonth]}`;
		return "--";
	} });
	Object.defineProperty(BaseFederalAccount$1, "programActivity", { get() {
		if (this._programActivityCode && this._programActivityName) return `${this._programActivityCode} - ${this._programActivityName}`;
		else if (this._program_activityCode || this._programActivityName) return `${this._programActivityCode}${this._programActivityName}`;
		return "--";
	} });
	Object.defineProperty(BaseFederalAccount$1, "objectClass", { get() {
		if (this._objectClassName && this._objectClass) return `${this._objectClass} - ${this._objectClassName}`;
		else if (this._objectClassName || this._objectClass) return `${this._objectClassName}${this._objectClass}`;
		return "--";
	} });
	Object.defineProperty(BaseFederalAccount$1, "accountNumber", { get() {
		if (this._agencyId && this._mainAccountCode) return `${this._agencyId}-${this._mainAccountCode}`;
		return "";
	} });
	Object.defineProperty(BaseFederalAccount$1, "grossOutlayAmount", { get() {
		if (this._grossOutlayAmount) return formatMoney(this._grossOutlayAmount);
		return "--";
	} });
	Object.defineProperty(BaseFederalAccount$1, "disasterEmergencyFundCode", { get() {
		if (this._disasterEmergencyFundCode) return this._disasterEmergencyFundCode;
		return "--";
	} });
}));
//#endregion
//#region src/js/models/v2/award/subawards/BaseSubawardRow.js
var dayjs$12, parseDate$2, formatDate$1, BaseSubawardRow;
var init_BaseSubawardRow = __esmMin((() => {
	init_moneyFormatter();
	dayjs$12 = require_dayjs_min();
	parseDate$2 = (string) => dayjs$12(string, "YYYY-MM-DD");
	formatDate$1 = (date) => date.format("MM/DD/YYYY");
	BaseSubawardRow = {
		populate(data) {
			this.id = data.id || "";
			this.number = data.subaward_number || "";
			this.description = data.description || "--";
			this._actionDate = data.action_date && parseDate$2(data.action_date) || null;
			this.date = dayjs$12(data.action_date).format("MM/DD/YYYY") || null;
			this._amount = parseFloat(data.amount) || 0;
			this.recipient = data.recipient_name || "";
		},
		get actionDate() {
			if (this._actionDate) return formatDate$1(this._actionDate);
			return "";
		},
		get amount() {
			if (this._amount) return formatMoney(this._amount);
			return "";
		}
	};
}));
//#endregion
//#region src/js/helpers/idvHelper.js
var fetchReferencedAwards, fetchAwardAmounts, fetchAwardFedAccountFunding, fetchIdvFundingSummary, fetchIdvFederalAccounts, fetchIdvActivity, getAllNetPositiveIdvFileCDefCodes, getChildAwardFileCDetails;
var init_idvHelper = __esmMin((() => {
	init_apiRequest();
	fetchReferencedAwards = (params) => apiRequest({
		url: "v2/idvs/awards/",
		method: "post",
		data: params
	});
	fetchAwardAmounts = (awardId) => apiRequest({ url: `v2/idvs/amounts/${awardId}/` });
	fetchAwardFedAccountFunding = (params) => apiRequest({
		url: "v2/idvs/funding/",
		method: "post",
		data: params
	});
	fetchIdvFundingSummary = (awardId) => apiRequest({
		url: "v2/idvs/funding_rollup/",
		method: "post",
		data: { award_id: awardId }
	});
	fetchIdvFederalAccounts = (data) => apiRequest({
		url: "v2/idvs/accounts/",
		method: "post",
		data
	});
	fetchIdvActivity = (data) => apiRequest({
		url: "v2/idvs/activity/",
		method: "post",
		data
	});
	getAllNetPositiveIdvFileCDefCodes = (parentIdv, childIdv) => {
		if (childIdv) return childIdv.child_file_c.filter(({ amount }) => amount !== 0).map(({ code }) => code).reduce((arr, item) => [...new Set(arr.concat([item]))], [...parentIdv.defCodes]);
		return [];
	};
	getChildAwardFileCDetails = (data) => data.child_account_obligations_by_defc.concat(data.child_account_outlays_by_defc).concat(data.grandchild_account_obligations_by_defc).concat(data.grandchild_account_outlays_by_defc).reduce((arr, item) => [...new Set(arr.concat(item))], []);
}));
//#endregion
//#region src/js/containers/award/table/AwardHistoryTableContainer.jsx
var import_jsx_runtime$72, propTypes$65, AwardHistoryTableContainer, AwardHistoryTableContainer_default;
var init_AwardHistoryTableContainer = __esmMin((() => {
	init_es();
	init_redux();
	init_axios();
	init_index_es();
	init_ReadMore();
	init_awardActions();
	init_searchHelper();
	init_tableMapping();
	init_BaseFederalAccountFunding();
	init_BaseSubawardRow();
	init_awardHistoryHelper();
	init_idvHelper();
	init_moneyFormatter();
	import_jsx_runtime$72 = require_jsx_runtime();
	propTypes$65 = {
		award: PropTypes.object,
		category: PropTypes.string,
		activeTab: PropTypes.string,
		tabOptions: PropTypes.arrayOf(PropTypes.object)
	};
	AwardHistoryTableContainer = ({ award, category, activeTab, tabOptions }) => {
		const [inFlight, setInFlight] = useState(false);
		const [page, setPage] = useState(1);
		const [sort, setSort] = useState({
			field: "modification_number",
			direction: "asc"
		});
		const [error, setError] = useState(false);
		const [columns, setColumns] = useState([]);
		const [rows, setRows] = useState();
		const [totalItems, setTotalItems] = useState(0);
		const [pageLimit, setPageLimit] = useState(10);
		const tabCounts = useRef({});
		let request = null;
		const totalSubAwardLabel = "Number of Sub-Award Transactions";
		const totalSubAwardAmountLabel = "Sub-Award Obligations";
		const updateSort = (field, direction) => {
			setSort(Object.assign({
				field,
				direction
			}));
		};
		const parseTransactionsData = (data) => {
			if (category === "idv" || category === "loan" || category === "contract") setColumns(transactionsTableMapping[category]);
			else setColumns(transactionsTableMapping.assistance);
			const dtuiRows = data.map((item) => {
				const transaction = Object.create(AwardHistoryTransactionsTableRow);
				transaction.populate(item, category);
				return transaction;
			}).map((obj) => {
				const value = [];
				if (category === "idv" || category === "contract") value.push(obj.modificationNumber || "--", obj.actionDate || "--", obj.federalActionObligation || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.actionTypeDescription || "--",
					limit: 50
				}), /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.description || "--",
					limit: 50
				}));
				else if (category === "loan") value.push(obj.modificationNumber || "--", obj.cfdaNumber || "--", obj.actionDate || "--", obj.faceValue || "--", obj.subsidy || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.actionTypeDescription || "--",
					limit: 50
				}), /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.description || "--",
					limit: 50
				}));
				else value.push(obj.modificationNumber || "--", obj.cfdaNumber || "--", obj.actionDate || "--", obj.federalActionObligation || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.actionTypeDescription || "--",
					limit: 50
				}), /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.description || "--",
					limit: 50
				}));
				return value;
			});
			setRows(dtuiRows);
			setInFlight(false);
		};
		const parseFederalAccountData = (data) => {
			let dtuiRows;
			const federalAccounts = data.map((item) => {
				const account = Object.create(BaseFederalAccount$1);
				account.populate(item, category);
				return account;
			});
			if (award.category === "idv") {
				setColumns(federalAccountsTableMapping.idv);
				dtuiRows = federalAccounts.map((obj) => {
					const value = [];
					value.push(obj.submissionDate || "--", obj.id || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/agency/${obj.fundingAgencySlug}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.agency
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/agency/${obj.awardingAgencySlug}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.awardingAgencyName
					}) || "--", obj.disasterEmergencyFundCode || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/federal_account/${obj.federalAccountCode}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.fedAccount
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
						text: obj.programActivity || "--",
						limit: 50
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
						text: obj.objectClass || "--",
						limit: 50
					}) || "--", obj.fundingObligated || "--", obj.grossOutlayAmount || "--");
					return value;
				});
			} else {
				setColumns(federalAccountsTableMapping.otherFunding);
				dtuiRows = federalAccounts.map((obj) => {
					const value = [];
					value.push(obj.submissionDate || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/federal_account/${obj.federalAccountCode}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.fedAccount
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/agency/${obj.fundingAgencySlug}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.agency
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("a", {
						target: "_blank",
						rel: "noopener noreferrer",
						href: `/agency/${obj.awardingAgencySlug}`,
						onClick: () => {
							(void 0).clickHandler(obj["Prime Recipient Name"]);
						},
						children: obj.awardingAgencyName
					}) || "--", obj.disasterEmergencyFundCode || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
						text: obj.programActivity || "--",
						limit: 50
					}) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
						text: obj.objectClass || "--",
						limit: 50
					}) || "--", obj.fundingObligated || "--", obj.grossOutlayAmount || "--");
					return value;
				});
			}
			setRows(dtuiRows);
			setInFlight(false);
		};
		const parseSubawardData = (data) => {
			setColumns(subawardTableMapping);
			const dtuiRows = data.map((item) => {
				const fundingResult = Object.create(BaseSubawardRow);
				fundingResult.populate(item, category);
				return fundingResult;
			}).map((obj) => {
				const value = [];
				value.push(obj.number || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.recipient || "--",
					limit: 50
				}), obj.date || "--", formatMoney(obj._amount) || "--", /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ReadMore, {
					text: obj.description || "--",
					limit: 50
				}));
				return value;
			});
			setRows(dtuiRows);
			setInFlight(false);
		};
		const fetchData = (pageNumber = 1) => {
			if (!award.id) return;
			if (request) request.cancel();
			setInFlight(true);
			setError(false);
			const params = {
				award_id: award.id,
				page: pageNumber,
				sort: sort.field,
				order: sort.direction,
				limit: pageLimit
			};
			switch (activeTab) {
				case "transaction":
					request = fetchAwardTransaction(params);
					break;
				case "federal_account":
					request = award.category === "idv" ? fetchAwardFedAccountFunding(params) : fetchFederalAccountFunding(params);
					break;
				case "subaward":
					request = performSubawardSearch(params);
					break;
				default: break;
			}
			request.promise.then((res) => {
				if (activeTab === "transaction") parseTransactionsData(res.data.results);
				else if (activeTab === "federal_account") parseFederalAccountData(res.data.results);
				else parseSubawardData(res.data.results);
			}).catch((err) => {
				request = null;
				if (!isCancel(err)) {
					setInFlight(false);
					setError(true);
					console.log(err);
				}
			});
		};
		useEffect(() => {
			fetchData(1);
			return () => {
				if (request) request.cancel();
			};
		}, [request]);
		useEffect(() => {
			fetchData(1);
		}, [
			award.id,
			sort,
			pageLimit
		]);
		useEffect(() => {
			fetchData(page);
		}, [page]);
		useEffect(() => {
			setPage(1);
			if (activeTab === "transaction") setSort({
				field: "modification_number",
				direction: "asc"
			});
			else if (activeTab === "federal_account" && award.category === "idv") setSort({
				field: "piid",
				direction: "asc"
			});
			else if (activeTab === "federal_account" && award.category !== "idv") setSort({
				field: "reporting_fiscal_date",
				direction: "asc"
			});
			else setSort({
				field: "subaward_number",
				direction: "desc"
			});
			if (tabOptions[0]?.count) setTotalItems(tabCounts.current[activeTab]);
		}, [activeTab]);
		useEffect(() => {
			if (tabOptions[0]?.count) {
				setTotalItems(tabOptions[0].count);
				tabOptions.forEach((tab) => {
					tabCounts.current[tab.internal] = tab.count;
				});
			}
		}, [tabOptions]);
		return /* @__PURE__ */ (0, import_jsx_runtime$72.jsxs)(import_jsx_runtime$72.Fragment, { children: [
			activeTab === "subaward" && /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("div", {
				className: "subaward-totals",
				children: /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(Cs, { boxes: [
					{
						title: totalSubAwardLabel,
						type: "totalSubAward",
						amount: award.overview.subawardCount
					},
					{
						title: totalSubAwardAmountLabel,
						type: "totalSubAwardAmount",
						amount: `${award.overview._subawardTotal}`,
						isMonetary: true
					},
					{
						title: "Percent of Prime Award Obligations",
						type: "subAwardedPercent",
						isString: true,
						amount: `${award.overview.subAwardedPercent}`
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("div", {
				className: "search-results-table-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("div", {
					className: "results-table-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("div", {
						className: "advanced-search__table-wrapper",
						children: /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(ss, {
							columns,
							rows,
							currentSort: sort,
							updateSort,
							classNames: "table-for-new-search-page award-results-table-dtui",
							loading: inFlight,
							error,
							rowHeight: 58,
							headerRowHeight: 45
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$72.jsx)(Ka, {
				resultsText: true,
				limitSelector: true,
				currentPage: page,
				changePage: setPage,
				pageSize: pageLimit,
				changeLimit: setPageLimit,
				totalItems,
				hideLast: totalItems >= 5e4
			})
		] });
	};
	AwardHistoryTableContainer.propTypes = propTypes$65;
	AwardHistoryTableContainer_default = connect_default((state) => ({ award: state.award }), (dispatch) => bindActionCreators(awardActions_exports, dispatch))(AwardHistoryTableContainer);
}));
//#endregion
//#region src/js/containers/award/shared/AwardHistorySectionContainer.jsx
/**
* AwardHistory.jsx
* Created by David Trinh 12/10/2018
**/
var import_jsx_runtime$71, propTypes$64, AwardHistory;
var init_AwardHistorySectionContainer = __esmMin((() => {
	init_awardHistorySection();
	init_index_es();
	init_Icons();
	init_AwardSectionHeader();
	init_awardHistoryHelper();
	init_AwardHistoryTableContainer();
	import_jsx_runtime$71 = require_jsx_runtime();
	propTypes$64 = {
		overview: PropTypes.object,
		setActiveTab: PropTypes.func,
		activeTab: PropTypes.string
	};
	AwardHistory = ({ overview, setActiveTab, activeTab }) => {
		const [tabOptions, setTabOptions] = useState([]);
		const sectionTitle = overview.category === "idv" ? "Award History for this IDV" : "Award History";
		let countRequest = null;
		const setTableTabsAndGetCounts = (award = overview) => {
			if (countRequest) countRequest.cancel();
			const tabsWithCounts = tabs(award.category).filter((tab) => {
				if (tab.internal === "subaward" && !awardTypesWithSubawards.includes(award.category)) return false;
				return true;
			}).map(async (tab) => {
				const isIdv = award.category === "idv";
				countRequest = getAwardHistoryCounts(tab.internal, award.generatedId, isIdv);
				try {
					const { data } = await countRequest.promise;
					if (isIdv && tab.internal === "federal_account") return {
						...tab,
						count: data.count
					};
					return {
						...tab,
						count: data[`${tab.internal}s`]
					};
				} catch (error) {
					console.log(`Error fetching ${tab.internal} counts: ${error}`);
					return {
						...tab,
						count: "N/A"
					};
				}
			});
			return Promise.all(tabsWithCounts).then((result) => {
				setTabOptions(result);
				countRequest = null;
			});
		};
		useEffect(() => {
			setTableTabsAndGetCounts();
		}, [overview.generatedId]);
		return /* @__PURE__ */ (0, import_jsx_runtime$71.jsxs)("div", {
			id: "award-award-history",
			className: "award-viz award-history",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(AwardSectionHeader, {
				title: sectionTitle,
				icon: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(AwardLoop, { alt: "Award History" })
			}), /* @__PURE__ */ (0, import_jsx_runtime$71.jsxs)("div", {
				className: "tables-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(vs, {
					types: tabOptions,
					active: activeTab,
					switchTab: setActiveTab
				}), /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)("div", {
					className: "tables-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)(AwardHistoryTableContainer_default, {
						category: overview.category,
						activeTab,
						tabOptions
					})
				})]
			})]
		});
	};
	AwardHistory.propTypes = propTypes$64;
})), dayjs$11, badPotentialEndDate;
var init_mockContractGrantActivityHelper = __esmMin((() => {
	dayjs$11 = require_dayjs_min();
	dayjs$11("01/25/2011", "MM/DD/YYYY"), dayjs$11("05/25/2013", "MM/DD/YYYY"), dayjs$11("11/13/2015", "MM/DD/YYYY");
	dayjs$11(null), dayjs$11(null), dayjs$11(null);
	dayjs$11("01/25/2011", "MM/DD/YYYY"), dayjs$11(null), dayjs$11(null);
	dayjs$11(null), dayjs$11("05/25/2013", "MM/DD/YYYY"), dayjs$11("11/13/2015", "MM/DD/YYYY");
	dayjs$11("01/25/2011", "MM/DD/YYYY"), dayjs$11(null), dayjs$11("11/13/2015", "MM/DD/YYYY");
	badPotentialEndDate = {
		_startDate: dayjs$11("01/25/2011", "MM/DD/YYYY"),
		_endDate: dayjs$11("05/25/2013", "MM/DD/YYYY"),
		_potentialEndDate: dayjs$11(null)
	};
	dayjs$11(null), dayjs$11(null);
	dayjs$11("2012-10-28", "YYYY-MM-DD");
	dayjs$11("2012-10-28", "YYYY-MM-DD"), dayjs$11("2012-07-03", "YYYY-MM-DD"), dayjs$11("2012-03-25", "YYYY-MM-DD");
}));
//#endregion
//#region src/js/helpers/contractGrantActivityHelper.js
/**
* Created By Jonathan Hill 03/26/20
*/
var dayjs$10, filteredAndSortedLinesFirstToLast, dateMatchingFirstLineValue, shouldExtendAreaPathWhenLastDataPointYValueChange, createSteppedAreaPath, getLineValue, areTransactionDatesOrAwardAmountsInvalid, beforeDate, afterDate, getXDomain;
var init_contractGrantActivityHelper = __esmMin((() => {
	init_awardSummaryHelper();
	init_mockContractGrantActivityHelper();
	dayjs$10 = require_dayjs_min();
	filteredAndSortedLinesFirstToLast = (lines) => lines.filter((line) => line).sort();
	dateMatchingFirstLineValue = (lines, dates, todayLineValue, endLineValue) => {
		const firstEndLine = filteredAndSortedLinesFirstToLast(lines)[0];
		if (firstEndLine === todayLineValue) return dayjs$10(todayLineValue);
		if (firstEndLine === endLineValue) return dates._endDate;
		return dates._potentialEndDate;
	};
	shouldExtendAreaPathWhenLastDataPointYValueChange = (transactions, areaPathExtensionToTodayLine) => {
		if (transactions.length <= 1) return false;
		if (!(transactions[transactions.length - 1].running_obligation_total !== transactions[transactions.length - 2].running_obligation_total)) return false;
		if (areaPathExtensionToTodayLine) return false;
		return true;
	};
	createSteppedAreaPath = (data, xScale, yScale, height, padding, xProperty, yProperty) => data.reduce((acc, t, i, array) => {
		let pathString = acc;
		const xDirection = xScale(t[xProperty].valueOf()) + (padding || 0);
		const yDirection = height - yScale(t[yProperty]);
		if (i === 0) {
			pathString += `${xDirection},`;
			pathString += `${height}`;
			pathString += `V${yDirection}`;
			return pathString;
		}
		/**
		* add x direction
		* travel to next transaction x coordinate
		*/
		pathString += `H${xDirection}`;
		/**
		* add y direction
		* travel to next transaction y coordinate
		*/
		pathString += `V${yDirection}`;
		if (i + 1 === array.length) {
			pathString += `H${xDirection}`;
			/**
			* travel to bottom of graph
			*/
			pathString += `V${height}Z`;
		}
		return pathString;
	}, "M");
	getLineValue = (date, xDomain) => {
		if (!date || isNaN(date.valueOf())) return null;
		if (date.valueOf() < xDomain[0] || date.valueOf() > xDomain[1]) return null;
		return date.valueOf();
	};
	areTransactionDatesOrAwardAmountsInvalid = (dates, awardType, transactions) => {
		const { _startDate: startDate, _endDate: currentEndDate, _potentialEndDate: potentialEndDate } = dates;
		if (transactions.some((x) => {
			if (x.running_obligation_total) return x.running_obligation_total.toString().startsWith("-");
			return false;
		})) return true;
		/**
		* handles null, '', or 'random string' passed to dayjs
		*/
		const badStart = isNaN(startDate.valueOf()) || !startDate;
		const badCurrent = isNaN(currentEndDate.valueOf()) || !currentEndDate;
		const badEnd = isNaN(potentialEndDate.valueOf()) || !potentialEndDate;
		const noTransactionHasDates = transactions.every((t) => isNaN(t.action_date.valueOf()));
		const onlyOneTransaction = transactions.length === 1;
		if (isAwardFinancialAssistance(awardType)) {
			if (noTransactionHasDates) return true;
			if (badStart && badCurrent && onlyOneTransaction) return true;
			if (onlyOneTransaction) {
				if (badStart && !badCurrent) {
					if (transactions[0].action_date.valueOf() > currentEndDate.valueOf()) return true;
				}
				if (badCurrent && !badStart) {
					if (transactions[0].action_date.valueOf() === startDate.valueOf()) return true;
				}
			}
			return false;
		}
		if (noTransactionHasDates) return true;
		if (badStart && badCurrent && badEnd && onlyOneTransaction) return true;
		if (onlyOneTransaction) {
			if (badStart && (!badCurrent || !badEnd)) {
				if (potentialEndDate.valueOf() && transactions[0].action_date.valueOf() > potentialEndDate.valueOf()) return true;
				if (currentEndDate.valueOf() && transactions[0].action_date.valueOf() > currentEndDate.valueOf()) return true;
			}
			if (badCurrent && badEnd && !badStart) {
				if (transactions[0].action_date.valueOf() === startDate.valueOf()) return true;
			}
		}
		return false;
	};
	beforeDate = (start, end) => {
		if (start.isBefore(end)) return start;
		return end;
	};
	afterDate = (start, end) => {
		if (start.isAfter(end)) return start;
		return end;
	};
	getXDomain = (dates, awardType, transactions) => {
		const { _startDate: startDate, _endDate: currentEndDate, _potentialEndDate: potentialEndDate } = dates;
		const transactionData = cloneDeep(transactions);
		/**
		* handles null, '', or 'random string' passed to dayjs
		*/
		const badStart = isNaN(startDate.valueOf()) || !startDate;
		const badCurrent = isNaN(currentEndDate.valueOf()) || !currentEndDate;
		const badEnd = isNaN(potentialEndDate.valueOf()) || !potentialEndDate;
		if (transactions.length === 1) {
			if (isAwardFinancialAssistance(awardType)) {
				if (!badStart && badCurrent) return [beforeDate(startDate, transactions[0].action_date).valueOf(), afterDate(startDate, transactions[0].action_date).valueOf()];
				if (badStart && !badCurrent) return [transactions[0].action_date.valueOf(), currentEndDate.valueOf()];
				return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, currentEndDate).valueOf()];
			}
			if (!badStart && badCurrent && badEnd) return [beforeDate(startDate, transactions[0].action_date).valueOf(), afterDate(startDate, transactions[0].action_date).valueOf()];
			if (badStart && (!badCurrent || !badEnd)) {
				const date = !badEnd ? potentialEndDate : currentEndDate;
				return [transactions[0].action_date.valueOf(), date.valueOf()];
			}
			if (!badStart && (!badCurrent || !badEnd)) {
				const date = !badEnd ? potentialEndDate : currentEndDate;
				return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, date).valueOf()];
			}
			return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, potentialEndDate).valueOf()];
		}
		if (isAwardFinancialAssistance(awardType)) {
			if (badStart && badEnd) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
			if (badStart && !badCurrent) return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
			if (badCurrent && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
			return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
		}
		if (badStart && badCurrent && badPotentialEndDate) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
		if (badStart && (!badCurrent || !badEnd)) {
			const date = !badEnd ? potentialEndDate : currentEndDate;
			return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, date).valueOf()];
		}
		if (badCurrent && badEnd && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
		if (badEnd && !badStart && !badCurrent) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
		return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, potentialEndDate).valueOf()];
	};
}));
//#endregion
//#region src/js/components/sharedComponents/NoResultsMessage.jsx
var import_jsx_runtime$70, propTypes$63, NoResultsMessage;
var init_NoResultsMessage = __esmMin((() => {
	import_jsx_runtime$70 = require_jsx_runtime();
	propTypes$63 = {
		title: PropTypes.string,
		message: PropTypes.string
	};
	NoResultsMessage = ({ title = "Not Available", message = "No available data to display" }) => /* @__PURE__ */ (0, import_jsx_runtime$70.jsxs)("div", {
		className: "no-results-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("div", {
			className: "no-results-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("h4", { children: title })
		}), /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("div", {
			className: "no-results-message",
			children: /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("p", { children: message })
		})]
	});
	NoResultsMessage.propTypes = propTypes$63;
}));
//#endregion
//#region node_modules/dayjs/plugin/duration.js
var require_duration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, s) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = s() : "function" == typeof define && define.amd ? define(s) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_duration = s();
	})(exports, (function() {
		"use strict";
		var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, d = 2628e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h = {
			years: u,
			months: d,
			days: r,
			hours: e,
			minutes: i,
			seconds: n,
			milliseconds: 1,
			weeks: 6048e5
		}, c = function(t) {
			return t instanceof g;
		}, f = function(t, s, n) {
			return new g(t, n, s.$l);
		}, m = function(t) {
			return s.p(t) + "s";
		}, l = function(t) {
			return t < 0;
		}, $ = function(t) {
			return l(t) ? Math.ceil(t) : Math.floor(t);
		}, y = function(t) {
			return Math.abs(t);
		}, v = function(t, s) {
			return t ? l(t) ? {
				negative: !0,
				format: "" + y(t) + s
			} : {
				negative: !1,
				format: "" + t + s
			} : {
				negative: !1,
				format: ""
			};
		}, g = function() {
			function l(t, s, n) {
				var i = this;
				if (this.$d = {}, this.$l = n, void 0 === t && (this.$ms = 0, this.parseFromMilliseconds()), s) return f(t * h[m(s)], this);
				if ("number" == typeof t) return this.$ms = t, this.parseFromMilliseconds(), this;
				if ("object" == typeof t) return Object.keys(t).forEach((function(s) {
					i.$d[m(s)] = t[s];
				})), this.calMilliseconds(), this;
				if ("string" == typeof t) {
					var e = t.match(a);
					if (e) {
						var r = e.slice(2).map((function(t) {
							return null != t ? Number(t) : 0;
						}));
						return this.$d.years = r[0], this.$d.months = r[1], this.$d.weeks = r[2], this.$d.days = r[3], this.$d.hours = r[4], this.$d.minutes = r[5], this.$d.seconds = r[6], this.calMilliseconds(), this;
					}
				}
				return this;
			}
			var y = l.prototype;
			return y.calMilliseconds = function() {
				var t = this;
				this.$ms = Object.keys(this.$d).reduce((function(s, n) {
					return s + (t.$d[n] || 0) * h[n];
				}), 0);
			}, y.parseFromMilliseconds = function() {
				var t = this.$ms;
				this.$d.years = $(t / u), t %= u, this.$d.months = $(t / d), t %= d, this.$d.days = $(t / r), t %= r, this.$d.hours = $(t / e), t %= e, this.$d.minutes = $(t / i), t %= i, this.$d.seconds = $(t / n), t %= n, this.$d.milliseconds = t;
			}, y.toISOString = function() {
				var t = v(this.$d.years, "Y"), s = v(this.$d.months, "M"), n = +this.$d.days || 0;
				this.$d.weeks && (n += 7 * this.$d.weeks);
				var i = v(n, "D"), e = v(this.$d.hours, "H"), r = v(this.$d.minutes, "M"), o = this.$d.seconds || 0;
				this.$d.milliseconds && (o += this.$d.milliseconds / 1e3, o = Math.round(1e3 * o) / 1e3);
				var u = v(o, "S"), d = t.negative || s.negative || i.negative || e.negative || r.negative || u.negative, a = e.format || r.format || u.format ? "T" : "", h = (d ? "-" : "") + "P" + t.format + s.format + i.format + a + e.format + r.format + u.format;
				return "P" === h || "-P" === h ? "P0D" : h;
			}, y.toJSON = function() {
				return this.toISOString();
			}, y.format = function(t) {
				var n = t || "YYYY-MM-DDTHH:mm:ss", i = {
					Y: this.$d.years,
					YY: s.s(this.$d.years, 2, "0"),
					YYYY: s.s(this.$d.years, 4, "0"),
					M: this.$d.months,
					MM: s.s(this.$d.months, 2, "0"),
					D: this.$d.days,
					DD: s.s(this.$d.days, 2, "0"),
					H: this.$d.hours,
					HH: s.s(this.$d.hours, 2, "0"),
					m: this.$d.minutes,
					mm: s.s(this.$d.minutes, 2, "0"),
					s: this.$d.seconds,
					ss: s.s(this.$d.seconds, 2, "0"),
					SSS: s.s(this.$d.milliseconds, 3, "0")
				};
				return n.replace(o, (function(t, s) {
					return s || String(i[t]);
				}));
			}, y.as = function(t) {
				return this.$ms / h[m(t)];
			}, y.get = function(t) {
				var s = this.$ms, n = m(t);
				return "milliseconds" === n ? s %= 1e3 : s = "weeks" === n ? $(s / h[n]) : this.$d[n], s || 0;
			}, y.add = function(t, s, n) {
				var i;
				return i = s ? t * h[m(s)] : c(t) ? t.$ms : f(t, this).$ms, f(this.$ms + i * (n ? -1 : 1), this);
			}, y.subtract = function(t, s) {
				return this.add(t, s, !0);
			}, y.locale = function(t) {
				var s = this.clone();
				return s.$l = t, s;
			}, y.clone = function() {
				return f(this.$ms, this);
			}, y.humanize = function(s) {
				return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s);
			}, y.valueOf = function() {
				return this.asMilliseconds();
			}, y.milliseconds = function() {
				return this.get("milliseconds");
			}, y.asMilliseconds = function() {
				return this.as("milliseconds");
			}, y.seconds = function() {
				return this.get("seconds");
			}, y.asSeconds = function() {
				return this.as("seconds");
			}, y.minutes = function() {
				return this.get("minutes");
			}, y.asMinutes = function() {
				return this.as("minutes");
			}, y.hours = function() {
				return this.get("hours");
			}, y.asHours = function() {
				return this.as("hours");
			}, y.days = function() {
				return this.get("days");
			}, y.asDays = function() {
				return this.as("days");
			}, y.weeks = function() {
				return this.get("weeks");
			}, y.asWeeks = function() {
				return this.as("weeks");
			}, y.months = function() {
				return this.get("months");
			}, y.asMonths = function() {
				return this.as("months");
			}, y.years = function() {
				return this.get("years");
			}, y.asYears = function() {
				return this.as("years");
			}, l;
		}(), p = function(t, s, n) {
			return t.add(s.years() * n, "y").add(s.months() * n, "M").add(s.days() * n, "d").add(s.hours() * n, "h").add(s.minutes() * n, "m").add(s.seconds() * n, "s").add(s.milliseconds() * n, "ms");
		};
		return function(n, i, e) {
			t = e, s = e().$utils(), e.duration = function(t, s) {
				return f(t, { $l: e.locale() }, s);
			}, e.isDuration = c;
			var r = i.prototype.add, o = i.prototype.subtract;
			i.prototype.add = function(t, s) {
				return c(t) ? p(this, t, 1) : r.bind(this)(t, s);
			}, i.prototype.subtract = function(t, s) {
				return c(t) ? p(this, t, -1) : o.bind(this)(t, s);
			};
		};
	}));
}));
//#endregion
//#region src/js/helpers/timeRangeHelper.js
var dayjs$9, duration, convertDatesToRange;
var init_timeRangeHelper = __esmMin((() => {
	dayjs$9 = require_dayjs_min();
	duration = require_duration();
	dayjs$9.extend(duration);
	convertDatesToRange = (startDate, endDate) => {
		if (startDate && endDate && dayjs$9(startDate).isValid() && dayjs$9(endDate).isValid()) {
			const durationValue = dayjs$9.duration(endDate.diff(startDate));
			const years = durationValue.years();
			const months = durationValue.months();
			const days = durationValue.days();
			let yearString = "";
			let monthString = "";
			let dayString = "";
			if (months > 0) monthString = `${months} ${months === 1 ? "month" : "months"}`;
			if (years > 0) yearString = `${years} ${years === 1 ? "year" : "years"}`;
			if (days > 0 && !yearString && !monthString) dayString = `${days} ${days === 1 ? "day" : "days"}`;
			return `${yearString}${yearString !== "" && monthString !== "" ? ", " : ""}${monthString}${monthString !== "" && dayString !== "" ? ", " : ""}${dayString}`;
		}
		return "";
	};
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/RectanglePercentVizTooltip.jsx
var import_jsx_runtime$69, prop, RectanglePercentVizTooltip;
var init_RectanglePercentVizTooltip = __esmMin((() => {
	import_jsx_runtime$69 = require_jsx_runtime();
	prop = {
		amount: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string
	};
	RectanglePercentVizTooltip = ({ amount, title, description }) => /* @__PURE__ */ (0, import_jsx_runtime$69.jsxs)("div", {
		className: "award-amounts-tt",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("h4", {
				className: "tooltip__title",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("h5", {
				className: "tooltip__amount--loans",
				children: amount
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("div", {
				className: "tooltip__text",
				children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("p", { children: description })
			})
		]
	});
	RectanglePercentVizTooltip.propTypes = prop;
}));
//#endregion
//#region src/js/components/award/shared/activity/ActivityYAxisItem.jsx
/**
* ActivityYAxisItem.jsx
* Created by Lizzie Salita 5/16/19
*/
var import_jsx_runtime$68, propTypes$62, ActivityYAxisItem;
var init_ActivityYAxisItem = __esmMin((() => {
	import_jsx_runtime$68 = require_jsx_runtime();
	propTypes$62 = {
		x: PropTypes.number,
		y: PropTypes.number,
		label: PropTypes.string,
		textAnchor: PropTypes.string
	};
	ActivityYAxisItem = class extends React.Component {
		render() {
			const { x, y, label, textAnchor } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)("g", {
				className: "axis-item y-axis",
				children: /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)("text", {
					className: "y-axis__text",
					textAnchor,
					transform: `translate(${x},${y})`,
					children: label
				})
			});
		}
	};
	ActivityYAxisItem.propTypes = propTypes$62;
}));
//#endregion
//#region src/js/components/award/shared/activity/ActivityYAxis.jsx
/**
* ActivityYAxis.jsx
* Created by Lizzie Salita 5/16/19
*/
var import_jsx_runtime$67, propTypes$61, ActivityYAxis;
var init_ActivityYAxis = __esmMin((() => {
	init_moneyFormatter();
	init_ActivityYAxisItem();
	import_jsx_runtime$67 = require_jsx_runtime();
	propTypes$61 = {
		height: PropTypes.number,
		padding: PropTypes.object,
		extendLine: PropTypes.number,
		scale: PropTypes.func,
		ticks: PropTypes.array,
		textAnchor: PropTypes.string
	};
	ActivityYAxis = ({ height, padding, extendLine = -10, scale, ticks, textAnchor }) => {
		const [description, setDescription] = useState("");
		const [labels, setLabels] = useState([]);
		const drawAxis = useCallback(() => {
			if (!scale) return;
			const units = calculateUnits(ticks);
			const tickLabels = ticks.map((tick) => {
				let formattedValue = formatMoneyWithPrecision(tick / units.unit, units.precision);
				if (tick === 0) formattedValue = "$0";
				else formattedValue = `${formattedValue} ${units.unitLabel}`;
				return formattedValue;
			});
			const lineStart = -5;
			const lineEnd = 5;
			let newDescription = "";
			if (tickLabels.length > 0) {
				newDescription = "The Y-axis of the chart, showing a range of awarded amounts from ";
				newDescription += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
			}
			/**
			* Default (w/ padding left) : set all the labels 20px to the left of the Y axis
			* Optional (w/ padding labels) : when passing textAnchor it is helpful to keep
			* the vertical line in place and update where we place the labels with their x
			* position with padding.labels
			*/
			const xPos = (padding.labels || padding.left) - 20;
			const newLabels = ticks.map((tick, i) => {
				const yPos = height - scale(tick);
				return /* @__PURE__ */ (0, import_jsx_runtime$67.jsx)(ActivityYAxisItem, {
					x: xPos,
					y: yPos,
					label: `${tickLabels[i]}`,
					lineStart,
					lineEnd,
					textAnchor: textAnchor || "middle"
				}, `label-y-${tick}-${i}`);
			});
			setDescription(newDescription);
			setLabels(newLabels);
		}, [
			height,
			padding.labels,
			padding.left,
			scale,
			textAnchor,
			ticks
		]);
		useEffect(() => {
			drawAxis();
		}, [drawAxis]);
		/**
		* Note - When using nice we will always have a max tick at the top of the y-axis.
		* Bar height just extends the line for visual purposes to cover the max tick label.
		*/
		return /* @__PURE__ */ (0, import_jsx_runtime$67.jsxs)("g", {
			className: "bar-axis",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("title", { children: "Y-Axis" }),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("desc", { children: description }),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("line", {
					className: "axis y-axis",
					x1: padding.left,
					y1: extendLine,
					x2: padding.left,
					y2: height
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("g", {
					className: "axis-labels",
					children: labels
				})
			]
		});
	};
	ActivityYAxis.propTypes = propTypes$61;
}));
//#endregion
//#region src/js/components/award/shared/activity/ActivityXAxisItem.jsx
/**
* ActivityXAxisItem.jsx
* Created by Lizzie Salita 5/16/19
*/
var import_jsx_runtime$66, propTypes$60, ActivityXAxisItem;
var init_ActivityXAxisItem = __esmMin((() => {
	import_jsx_runtime$66 = require_jsx_runtime();
	propTypes$60 = {
		x: PropTypes.number,
		y: PropTypes.number,
		label: PropTypes.string,
		transform: PropTypes.string,
		line: PropTypes.bool
	};
	ActivityXAxisItem = class extends React.Component {
		render() {
			const { x, y, label, transform, line } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime$66.jsxs)("g", {
				className: "axis-item x-axis",
				children: [line && /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)("line", {
					className: "axis y-axis",
					x1: x,
					y1: y - 12,
					x2: x,
					y2: y - 20
				}), /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)("text", {
					className: "x-axis__text",
					textAnchor: "middle",
					transform: transform || `translate(${x},${y})`,
					children: label
				})]
			});
		}
	};
	ActivityXAxisItem.propTypes = propTypes$60;
}));
//#endregion
//#region src/js/components/award/shared/activity/ActivityXAxis.jsx
/**
* ActivityXAxis.jsx
* Created by Lizzie Salita 5/16/19
*/
var import_jsx_runtime$65, propTypes$59, ActivityXAxis;
var init_ActivityXAxis = __esmMin((() => {
	init_ActivityXAxisItem();
	import_jsx_runtime$65 = require_jsx_runtime();
	propTypes$59 = {
		width: PropTypes.number,
		height: PropTypes.number,
		padding: PropTypes.object,
		scale: PropTypes.func,
		ticks: PropTypes.array,
		line: PropTypes.bool,
		transformLabels: PropTypes.object,
		removeFirstLabel: PropTypes.bool,
		removeLastLabel: PropTypes.bool
	};
	ActivityXAxis = ({ width = 0, height, padding = {
		left: 0,
		bottom: 0,
		top: 0,
		right: 0
	}, scale, ticks, line, transformLabels, removeFirstLabel, removeLastLabel }) => {
		const [description, setDescription] = useState("");
		const [labels, setLabels] = useState([]);
		const yOffset = 20;
		const labelOffset = 15;
		const rotate = transformLabels?.rotate;
		const x = transformLabels?.x;
		const y = transformLabels?.y;
		const drawAxis = useCallback(() => {
			if (!scale) return;
			const tickLabels = ticks.map((tick) => tick.label);
			const lineStart = -5;
			const lineEnd = 5;
			let newDescription = "";
			if (tickLabels.length > 0) {
				newDescription = `The X-axis of the chart, showing a range of dates from `;
				newDescription += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
			}
			const yPos = height + yOffset;
			const newLabels = ticks.map((tick, i, array) => {
				const xPos = scale(tick.date);
				if (xPos >= width) return null;
				if (xPos < 0) return null;
				if (removeFirstLabel && i === 0) return null;
				if (removeLastLabel && i === array.length - 1) return null;
				const transform = `translate(${xPos - (x || x === 0 ? x : labelOffset)},${yPos + (y || y === 0 ? y : labelOffset)}) rotate(${rotate || rotate === 0 ? rotate : 325})`;
				return /* @__PURE__ */ (0, import_jsx_runtime$65.jsx)(ActivityXAxisItem, {
					x: xPos,
					y: yPos,
					label: `${tickLabels[i]}`,
					lineStart,
					lineEnd,
					transform,
					line: line || false
				}, `label-y-${tick}-${i}`);
			});
			setDescription(newDescription);
			setLabels(newLabels);
		}, [
			width,
			height,
			line,
			rotate,
			x,
			y,
			scale,
			ticks,
			removeFirstLabel,
			removeLastLabel
		]);
		useEffect(() => {
			drawAxis();
		}, [drawAxis]);
		return /* @__PURE__ */ (0, import_jsx_runtime$65.jsxs)("g", {
			className: "bar-axis",
			transform: `translate(${padding.left},0)`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$65.jsx)("title", { children: "X-Axis" }),
				/* @__PURE__ */ (0, import_jsx_runtime$65.jsx)("desc", { children: description }),
				/* @__PURE__ */ (0, import_jsx_runtime$65.jsx)("line", {
					className: "axis x-axis",
					x1: 0,
					y1: height,
					x2: width,
					y2: height
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$65.jsx)("g", {
					className: "axis-labels",
					children: labels
				})
			]
		});
	};
	ActivityXAxis.propTypes = propTypes$59;
}));
//#endregion
//#region src/js/components/sharedComponents/SVGLine.jsx
/**
* VerticalLine.jsx -> SVGLine.jsx
* Created by Jonathan Hill 07/05/19
**/
var import_jsx_runtime$64, propTypes$58, SVGLine;
var init_SVGLine = __esmMin((() => {
	import_jsx_runtime$64 = require_jsx_runtime();
	propTypes$58 = {
		scale: PropTypes.func,
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
		y1: PropTypes.number,
		y2: PropTypes.number,
		x1: PropTypes.number,
		x2: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
		position: PropTypes.number,
		showTextPosition: PropTypes.string,
		textY: PropTypes.number,
		description: PropTypes.string,
		adjustmentX: PropTypes.number,
		textClassname: PropTypes.string,
		lineClassname: PropTypes.string,
		noText: PropTypes.bool,
		isHorizontal: PropTypes.bool,
		graphHeight: PropTypes.number,
		onMouseMoveLine: PropTypes.func,
		onMouseLeaveLine: PropTypes.func,
		onMouseMoveText: PropTypes.func,
		onMouseLeaveText: PropTypes.func,
		verticalLineTextData: PropTypes.func
	};
	SVGLine = class extends Component {
		constructor(props) {
			super(props);
			this.state = { windowWidth: null };
			const textArray = Array.isArray(props.text) ? props.text : [props.text];
			/**
			* TODO - Do not use Variable Class Properties state, methods, refs?
			*/
			if (!props.noText) textArray.forEach((text) => {
				const stateName = text.replace(/\s/g, "").toLowerCase();
				this[`textDiv${stateName}`] = null;
				this[`setTextDiv${stateName}`] = (element) => {
					this[`textDiv${stateName}`] = element;
					this.positionText(stateName);
				};
			});
		}
		componentDidMount() {
			this.handleWindowResize();
			window.addEventListener("resize", this.handleWindowResize);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.textY !== this.props.textY && !this.props.noText) this.positionText(this.props.text);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.handleWindowResize);
		}
		onMouseMoveLine = throttle(() => {
			const { onMouseMoveLine, text, x1, x2, y1, y2, position } = this.props;
			const data = {
				position: this.getLinePosition(),
				value: position,
				x1,
				x2,
				y1,
				y2
			};
			if (onMouseMoveLine) this.props.onMouseMoveLine(data, text);
		});
		onMouseLeaveLine = throttle(() => {
			const { onMouseLeaveLine } = this.props;
			if (onMouseLeaveLine) this.props.onMouseLeaveLine();
		});
		onMouseMoveText = throttle(() => {
			const { onMouseMoveText, text, position } = this.props;
			const stateName = text.replace(/\s/g, "").toLowerCase();
			const textDiv = this[`textDiv${stateName}`];
			if (textDiv) {
				const data = textDiv.getBoundingClientRect();
				data.position = this.getLinePosition();
				data.value = position;
				if (onMouseMoveText) this.props.onMouseMoveText(data, text);
			}
		});
		onMouseLeaveText = throttle(() => {
			const { onMouseLeaveText } = this.props;
			if (onMouseLeaveText) this.props.onMouseLeaveText();
		});
		getLinePosition = () => {
			const { isHorizontal, graphHeight, position, adjustmentX, scale } = this.props;
			if (isHorizontal) return graphHeight - scale(position);
			return scale(position) + (adjustmentX || 0);
		};
		getMaximum = () => {
			const { isHorizontal, graphHeight, scale, max, adjustmentX } = this.props;
			if (isHorizontal) return graphHeight;
			return scale(max) + (adjustmentX || 0);
		};
		handleWindowResize = throttle(() => {
			const windowWidth = window.innerWidth;
			if (this.state.windowWidth !== windowWidth) {
				this.setState({ windowWidth });
				const { text } = this.props;
				(Array.isArray(text) ? text : [text]).forEach((data) => this.positionText(data));
			}
		});
		positionText = (text) => {
			const { scale, position, showTextPosition, textY, adjustmentX, noText, verticalLineTextData } = this.props;
			if (noText) return null;
			let positionX = scale(position || Date.now()) + (adjustmentX || 0);
			let modifiedTextY = textY;
			let width = 0;
			const stateName = text.replace(/\s/g, "").toLowerCase();
			const textDiv = this[`textDiv${stateName}`];
			if (textDiv) {
				const wordIndex = textDiv.getAttribute("data-wordindex");
				const textDivDimensions = textDiv.getBoundingClientRect();
				width = textDivDimensions.width;
				if (showTextPosition === "left") positionX -= width + 4;
				if (showTextPosition === "right") positionX += 4;
				if (showTextPosition === "top") {
					modifiedTextY -= 15;
					positionX -= width / 2;
				}
				if (wordIndex !== "0") modifiedTextY += textDivDimensions.height * parseInt(wordIndex, 10);
				if (verticalLineTextData) {
					const textData = {
						positionX,
						modifiedTextY,
						text,
						textY
					};
					for (const key in textDivDimensions) if (textDivDimensions[key]) textData[key] = textDivDimensions[key];
					verticalLineTextData(textData);
				}
			}
			return this.setState({
				[`${stateName}TextX`]: positionX,
				[`${stateName}TextY`]: modifiedTextY,
				[`${stateName}Width`]: width || 0
			});
		};
		line = () => {
			const { min, position, scale, x1, x2, y1, y2, lineClassname, isHorizontal } = this.props;
			if (!position) return null;
			const linePosition = this.getLinePosition();
			const minimum = scale(min);
			if (linePosition > this.getMaximum() || linePosition < minimum) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("line", {
				className: lineClassname ? `svg-line ${lineClassname}` : "svg-line",
				x1: isHorizontal ? x1 : linePosition,
				x2: isHorizontal ? x2 : linePosition,
				y1: isHorizontal ? linePosition : y1,
				y2: isHorizontal ? linePosition : y2,
				onMouseMove: this.onMouseMoveLine,
				onMouseLeave: this.onMouseLeaveLine
			});
		};
		text = (lineIsDisplayed) => {
			const { text, textClassname, noText } = this.props;
			if (!lineIsDisplayed || noText) return null;
			const textArray = Array.isArray(text) ? text : [text];
			const classname = textClassname ? `svg-line__text ${textClassname}` : "svg-line__text";
			/**
			* TODO - Do not use Variable Class Properties state, methods, refs?
			*/
			return textArray.map((data, i) => {
				const stateName = data.replace(/\s/g, "").toLowerCase();
				return /* @__PURE__ */ (0, import_jsx_runtime$64.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("rect", {
					className: "rectangle-background",
					width: this.state[`${stateName}Width`],
					height: 15.5,
					x: this.state[`${stateName}TextX`],
					y: this.props.textY - 11
				}), /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("text", {
					tabIndex: "0",
					className: classname,
					x: this.state[`${stateName}TextX`],
					y: this.state[`${stateName}TextY`],
					ref: this[`setTextDiv${stateName}`],
					"data-wordindex": i,
					onMouseMove: this.onMouseMoveText,
					onMouseLeave: this.onMouseLeaveText,
					children: data
				})] }, `containerForText${i}`);
			});
		};
		description = () => this.props.description || `A ${this.props.isHorizontal ? "horizontal" : "vertical"} line representing today's date`;
		render() {
			const line = this.line();
			const text = this.text(line);
			return /* @__PURE__ */ (0, import_jsx_runtime$64.jsxs)("g", {
				className: "svg-line__container",
				tabIndex: "0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("desc", { children: this.description() }),
					text,
					line
				]
			});
		}
	};
	SVGLine.propTypes = propTypes$58;
}));
//#endregion
//#region src/js/components/award/shared/activity/ContractGrantActivityChartVerticalLines.jsx
var import_jsx_runtime$63, dayjs$8, propTypes$57, ContractGrantActivityChartVerticalLines;
var init_ContractGrantActivityChartVerticalLines = __esmMin((() => {
	init_SVGLine();
	import_jsx_runtime$63 = require_jsx_runtime();
	dayjs$8 = require_dayjs_min();
	propTypes$57 = {
		xScale: PropTypes.func,
		height: PropTypes.number,
		xDomain: PropTypes.array,
		padding: PropTypes.object,
		startLineValue: PropTypes.number,
		todayLineValue: PropTypes.number,
		endLineValue: PropTypes.number,
		potentialEndLineValue: PropTypes.number,
		awardType: PropTypes.string,
		showHideTooltip: PropTypes.func,
		thisLineOrTextIsHovered: PropTypes.string,
		verticalLineTextData: PropTypes.func,
		startLineHeight: PropTypes.number,
		endLineHeight: PropTypes.number,
		potentialEndLineHeight: PropTypes.number,
		todayLineHeight: PropTypes.number
	};
	ContractGrantActivityChartVerticalLines = ({ xScale, height, xDomain, padding, startLineValue, todayLineValue, endLineValue, potentialEndLineValue, awardType, showHideTooltip, thisLineOrTextIsHovered, verticalLineTextData, startLineHeight, endLineHeight, potentialEndLineHeight, todayLineHeight }) => {
		const endLineText = awardType === "grant" ? "End" : "Current End";
		const endLineClassName = awardType === "grant" ? "grant-end" : "contract-end";
		const lineData = [
			{
				text: "Start Date",
				date: startLineValue,
				classname: thisLineOrTextIsHovered === "Start" ? "start noOpacity" : "start"
			},
			{
				text: "Todays Date",
				date: todayLineValue
			},
			{
				text: "End Date",
				date: endLineValue,
				classname: thisLineOrTextIsHovered === endLineText ? `${endLineClassName} noOpacity` : `${endLineClassName}`
			},
			{
				text: "Potential End Date",
				date: potentialEndLineValue,
				classname: thisLineOrTextIsHovered === "Potential End" ? "potential-end noOpacity" : "potential-end"
			}
		];
		const descriptions = [
			startLineValue,
			todayLineValue,
			endLineValue,
			potentialEndLineValue
		].map((line, i) => `A vertical line representing the ${lineData[i].text}, ${dayjs$8(lineData[i].date).format("dddd, MMMM Do YYYY") || ""}`);
		return /* @__PURE__ */ (0, import_jsx_runtime$63.jsxs)("g", {
			className: "contract-grant-activity-chart__vertical-lines",
			children: [
				xScale && /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(SVGLine, {
					scale: xScale,
					y1: startLineHeight - 10,
					y2: height,
					textY: startLineHeight,
					text: "Start",
					description: descriptions[0],
					max: xDomain[1],
					min: xDomain[0],
					position: startLineValue,
					showTextPosition: "right",
					adjustmentX: padding.left,
					textClassname: "start",
					lineClassname: lineData[0].classname,
					onMouseMoveLine: showHideTooltip,
					onMouseLeaveLine: showHideTooltip,
					onMouseMoveText: showHideTooltip,
					onMouseLeaveText: showHideTooltip,
					verticalLineTextData
				}),
				xScale && /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(SVGLine, {
					scale: xScale,
					y1: todayLineHeight - 10,
					y2: height,
					textY: todayLineHeight,
					text: "Today",
					description: descriptions[1],
					max: xDomain[1],
					min: xDomain[0],
					position: todayLineValue,
					showTextPosition: "left",
					adjustmentX: padding.left,
					textClassname: "today",
					lineClassname: "today",
					verticalLineTextData
				}),
				xScale && /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(SVGLine, {
					scale: xScale,
					y1: endLineHeight - 10,
					y2: height,
					textY: endLineHeight,
					text: endLineText,
					description: descriptions[2],
					max: xDomain[1],
					min: xDomain[0],
					position: endLineValue,
					showTextPosition: "left",
					adjustmentX: padding.left,
					textClassname: `${endLineClassName}`,
					lineClassname: lineData[2].classname,
					onMouseMoveLine: showHideTooltip,
					onMouseLeaveLine: showHideTooltip,
					onMouseMoveText: showHideTooltip,
					onMouseLeaveText: showHideTooltip,
					verticalLineTextData
				}),
				xScale && /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)(SVGLine, {
					scale: xScale,
					y1: potentialEndLineHeight - 10,
					y2: height,
					textY: potentialEndLineHeight,
					text: "Potential End",
					description: descriptions[3],
					max: xDomain[1],
					min: xDomain[0],
					position: potentialEndLineValue,
					showTextPosition: "left",
					adjustmentX: padding.left,
					textClassname: "potential-end",
					lineClassname: lineData[3].classname,
					onMouseMoveLine: showHideTooltip,
					onMouseLeaveLine: showHideTooltip,
					onMouseMoveText: showHideTooltip,
					onMouseLeaveText: showHideTooltip,
					verticalLineTextData
				})
			]
		});
	};
	ContractGrantActivityChartVerticalLines.propTypes = propTypes$57;
}));
//#endregion
//#region src/js/components/award/shared/activity/ContractGrantActivityChartCircles.jsx
/**
* ContractGrantActivityChartCircles.jsx
* Created by Jonathan Hill 04/23/2020
*/
var import_jsx_runtime$62, propTypes$56, ContractGrantActivityChartCircles;
var init_ContractGrantActivityChartCircles = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$62 = require_jsx_runtime();
	propTypes$56 = {
		transactions: PropTypes.array,
		padding: PropTypes.object,
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		xAxisSpacing: PropTypes.number,
		height: PropTypes.number,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		hideTransactionTooltipOnBlur: PropTypes.func
	};
	ContractGrantActivityChartCircles = ({ transactions, padding, xScale, yScale, xAxisSpacing, height, showTooltip, hideTooltip, hideTransactionTooltipOnBlur }) => {
		const [circleData, setCircleData] = useState([]);
		useEffect(() => {
			if (xScale && yScale) {
				const circles = transactions.map((data, i) => ({
					key: `${data.federal_action_obligation}${i}`,
					description: `A circle representing the transaction date, ${data.action_date.format("MM-DD-YYYY")} and running total obligation of ${formatMoney(data.running_obligation_total)}`,
					className: "transaction-date-circle",
					cx: xScale(data.action_date.valueOf()) + padding.left,
					cy: height - yScale(data.running_obligation_total),
					r: 2.5,
					data
				}));
				setCircleData(circles);
			}
		}, [
			transactions,
			padding,
			xScale,
			yScale,
			xAxisSpacing,
			height
		]);
		const onMouseMove = (e) => {
			showTooltip(circleData[e.target.getAttribute("data-index")], "Modification");
		};
		const onMouseLeave = () => hideTooltip();
		const onFocus = (e) => {
			e.preventDefault();
			showTooltip(circleData[e.target.getAttribute("data-index")], "Modification");
		};
		const onBlur = (e) => {
			e.preventDefault();
			hideTransactionTooltipOnBlur();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("g", {
			className: "contract-grant-activity-chart__circles",
			children: circleData.map((circle, i) => {
				const { key, description, className, cx, cy, r } = circle;
				return /* @__PURE__ */ (0, import_jsx_runtime$62.jsxs)("g", {
					"data-index": i,
					onFocus,
					onBlur,
					tabIndex: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("circle", {
						"data-index": i,
						className,
						cx,
						cy,
						r,
						onMouseMove,
						onMouseLeave
					})]
				}, key);
			})
		});
	};
	ContractGrantActivityChartCircles.propTypes = propTypes$56;
}));
//#endregion
//#region src/js/components/award/shared/activity/ContractGrantActivityChartAreaPaths.jsx
/**
* ContractGrantActivityChartAreaPaths.jsx
* Created by Jonathan Hill 04/23/2020
*/
var import_jsx_runtime$61, dayjs$7, propTypes$55, transactionPathDescription, areaPathToTodayLineDescription, areaPathPastEndLineDescription, ContractGrantActivityChartAreaPaths;
var init_ContractGrantActivityChartAreaPaths = __esmMin((() => {
	init_contractGrantActivityHelper();
	import_jsx_runtime$61 = require_jsx_runtime();
	dayjs$7 = require_dayjs_min();
	propTypes$55 = {
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		transactions: PropTypes.array,
		height: PropTypes.number,
		padding: PropTypes.object,
		todayLineValue: PropTypes.number,
		endLineValue: PropTypes.number,
		potentialEndLineValue: PropTypes.number,
		dates: PropTypes.object,
		xDomain: PropTypes.array,
		xAxisSpacing: PropTypes.number
	};
	transactionPathDescription = "A shaded light blue area moving horizontally between each transactions action date and vertically between each transactions federal action obligation difference";
	areaPathToTodayLineDescription = "An area path of color light blue representing an area path from the first transaction to the today line";
	areaPathPastEndLineDescription = "An area path of color grey representing an extension of the area path from the first end date line to the last transaction";
	ContractGrantActivityChartAreaPaths = ({ xScale, yScale, transactions, height, padding, todayLineValue, endLineValue, potentialEndLineValue, dates, xDomain, xAxisSpacing }) => {
		const [areaPath, setAreaPath] = useState("");
		const [areaPathExtensionToTodayLine, setAreaPathExtensionToToday] = useState(null);
		const [areaPathPastEndLine, setAreaPathPastEndLine] = useState(null);
		const [areaPathExtensionLastDataPointYValueChange, setAreaPathExtensionLastDataPointYValueChange] = useState({
			path: null,
			className: "",
			description: ""
		});
		useEffect(() => {
			if (xScale && yScale) setAreaPath(createSteppedAreaPath(transactions, xScale, yScale, height, padding.left, "action_date", "running_obligation_total"));
		}, [
			xScale,
			yScale,
			transactions,
			height,
			padding
		]);
		const shouldWeExtendAreaPathToTodayLineOrEndLines = useCallback(() => {
			const lastTransaction = transactions[transactions.length - 1];
			const verticalLines = filteredAndSortedLinesFirstToLast([
				todayLineValue,
				endLineValue,
				potentialEndLineValue
			]);
			if (!verticalLines?.length) return false;
			if (verticalLines.every((line) => lastTransaction.action_date.isBefore(dayjs$7(line)))) return true;
			return false;
		}, [
			transactions,
			todayLineValue,
			endLineValue,
			potentialEndLineValue
		]);
		const extendAreaPathToTodayLine = useCallback(() => {
			const lastTransaction = transactions[transactions.length - 1];
			if (shouldWeExtendAreaPathToTodayLineOrEndLines() && xScale && yScale) {
				setAreaPathExtensionToToday(createSteppedAreaPath([...transactions, {
					action_date: dateMatchingFirstLineValue([
						todayLineValue,
						endLineValue,
						potentialEndLineValue
					], dates, todayLineValue, endLineValue),
					running_obligation_total: lastTransaction.running_obligation_total
				}], xScale, yScale, height, padding.left, "action_date", "running_obligation_total"));
				setAreaPath(null);
			}
		}, [
			transactions,
			xScale,
			yScale,
			height,
			padding,
			shouldWeExtendAreaPathToTodayLineOrEndLines,
			todayLineValue,
			endLineValue,
			potentialEndLineValue,
			dates
		]);
		useEffect(() => {
			extendAreaPathToTodayLine();
		}, [extendAreaPathToTodayLine]);
		useEffect(() => {
			if (!areaPathExtensionToTodayLine && xScale && yScale) {
				const firstEndLine = filteredAndSortedLinesFirstToLast([endLineValue, potentialEndLineValue])[0];
				const firstTransactionAfterFirstEndLineIndex = transactions.findIndex((t) => {
					if (t.action_date.isAfter(dayjs$7(firstEndLine))) return true;
					return false;
				});
				if (firstTransactionAfterFirstEndLineIndex !== -1) {
					const transactionsBeforeFirstEndLine = transactions.slice(0, firstTransactionAfterFirstEndLineIndex);
					const transactionsAfterFirstEndLine = transactions.slice(firstTransactionAfterFirstEndLineIndex, transactions.length);
					const firstEndLineDate = dateMatchingFirstLineValue([endLineValue, potentialEndLineValue], dates, todayLineValue, endLineValue);
					if (transactionsBeforeFirstEndLine.length) setAreaPath(createSteppedAreaPath([...transactionsBeforeFirstEndLine, {
						action_date: firstEndLineDate,
						running_obligation_total: transactionsBeforeFirstEndLine[transactionsBeforeFirstEndLine.length - 1].running_obligation_total
					}], xScale, yScale, height, padding.left, "action_date", "running_obligation_total"));
					if (transactionsAfterFirstEndLine.length) {
						const startingYValueForGreyShading = transactionsBeforeFirstEndLine.length ? transactionsBeforeFirstEndLine[transactionsBeforeFirstEndLine.length - 1].running_obligation_total : transactionsAfterFirstEndLine[0].running_obligation_total;
						setAreaPathPastEndLine(createSteppedAreaPath([{
							action_date: firstEndLineDate,
							running_obligation_total: startingYValueForGreyShading
						}, ...transactionsAfterFirstEndLine], xScale, yScale, height - .5, padding.left, "action_date", "running_obligation_total"));
					}
				}
			}
		}, [
			todayLineValue,
			endLineValue,
			potentialEndLineValue,
			dates,
			xScale,
			yScale,
			height,
			padding,
			transactions,
			areaPathExtensionToTodayLine
		]);
		useEffect(() => {
			if (shouldExtendAreaPathWhenLastDataPointYValueChange(transactions, areaPathExtensionToTodayLine) && xScale && yScale) {
				const lastTransaction = transactions[transactions.length - 1];
				const className = areaPathPastEndLine ? "area-path__past-end-line darker" : "area-path";
				const description = `An area path of color ${className === "area-path" ? "light blue" : "grey"} representing an
            extension of 0.5 pixels to the area path when the y value of the last transaction is greater than
            the second to last transaction`;
				const xAdjustment = xScale.invert(xAxisSpacing + 3) - xDomain[0];
				const heightAdjustment = areaPathPastEndLine ? height - .5 : height;
				setAreaPathExtensionLastDataPointYValueChange({
					path: createSteppedAreaPath([{
						x: lastTransaction.action_date,
						y: lastTransaction.running_obligation_total
					}, {
						x: dayjs$7(lastTransaction.action_date.valueOf() + xAdjustment),
						y: lastTransaction.running_obligation_total
					}], xScale, yScale, heightAdjustment, padding.left, "x", "y"),
					className,
					description
				});
			} else setAreaPathExtensionLastDataPointYValueChange({
				path: null,
				className: "",
				description: ""
			});
		}, [
			xScale,
			yScale,
			height,
			padding,
			areaPathPastEndLine,
			transactions,
			xDomain,
			xAxisSpacing,
			areaPathExtensionToTodayLine
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$61.jsxs)("g", {
			className: "contract-grant-activity-chart__area-paths",
			children: [
				areaPath && /* @__PURE__ */ (0, import_jsx_runtime$61.jsxs)("g", {
					tabIndex: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("desc", { children: transactionPathDescription }), /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("path", {
						className: "area-path",
						d: areaPath
					})]
				}),
				areaPathExtensionToTodayLine && /* @__PURE__ */ (0, import_jsx_runtime$61.jsxs)("g", {
					tabIndex: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("desc", { children: areaPathToTodayLineDescription }), /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("path", {
						className: "area-path",
						d: areaPathExtensionToTodayLine
					})]
				}),
				areaPathPastEndLine && /* @__PURE__ */ (0, import_jsx_runtime$61.jsxs)("g", {
					tabIndex: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("desc", { children: areaPathPastEndLineDescription }), /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("path", {
						className: "area-path__past-end-line",
						d: areaPathPastEndLine
					})]
				}),
				areaPathExtensionLastDataPointYValueChange.path && /* @__PURE__ */ (0, import_jsx_runtime$61.jsxs)("g", {
					tabIndex: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("desc", { children: areaPathExtensionLastDataPointYValueChange.description }), /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)("path", {
						className: areaPathExtensionLastDataPointYValueChange.className,
						d: areaPathExtensionLastDataPointYValueChange.path
					})]
				})
			]
		});
	};
	ContractGrantActivityChartAreaPaths.propTypes = propTypes$55;
}));
//#endregion
//#region src/js/components/award/shared/activity/ContractGrantActivityChart.jsx
var import_jsx_runtime$60, dayjs$6, propTypes$54, xAxisSpacingPercentage, ContractGrantActivityChart;
var init_ContractGrantActivityChart = __esmMin((() => {
	init_src();
	init_ActivityYAxis();
	init_ActivityXAxis();
	init_SVGLine();
	init_contractGrantActivityHelper();
	init_fiscalYearHelper();
	init_moneyFormatter();
	init_ContractGrantActivityChartVerticalLines();
	init_ContractGrantActivityChartCircles();
	init_ContractGrantActivityChartAreaPaths();
	import_jsx_runtime$60 = require_jsx_runtime();
	dayjs$6 = require_dayjs_min();
	propTypes$54 = {
		height: PropTypes.number,
		padding: PropTypes.object,
		visualizationWidth: PropTypes.number,
		transactions: PropTypes.array,
		awardType: PropTypes.string,
		dates: PropTypes.object,
		totalObligation: PropTypes.number,
		showHideTooltipLine: PropTypes.func,
		showTooltipTransaction: PropTypes.func,
		hideTooltipTransaction: PropTypes.func,
		thisLineOrTextIsHovered: PropTypes.string,
		hideTransactionTooltipOnBlur: PropTypes.func
	};
	xAxisSpacingPercentage = .05;
	ContractGrantActivityChart = ({ height, padding, visualizationWidth, transactions, awardType, dates, totalObligation, showHideTooltipLine, showTooltipTransaction, hideTooltipTransaction, thisLineOrTextIsHovered, hideTransactionTooltipOnBlur }) => {
		const [xDomain, setXDomain] = useState([]);
		const [yDomain, setYDomain] = useState([]);
		const [xScale, setXScale] = useState(null);
		const [yScale, setYScale] = useState(null);
		const [xTicks, setXTicks] = useState([]);
		const [yTicks, setYTicks] = useState([]);
		const [startLineData, setStartLineData] = useState({
			value: 0,
			height: 0
		});
		const [todayLineData, setTodayLineData] = useState({
			value: 0,
			height: 0
		});
		const [endLineData, setEndLineData] = useState({
			value: 0,
			height: 0
		});
		const [potentialEndLineData, setPotentialEndLineData] = useState({
			value: 0,
			height: 0
		});
		const [xAxisSpacing, setXAxisSpacing] = useState(0);
		const [verticalLineTextHeight, setVerticalLineTextHeight] = useState(0);
		const [totalVerticalLineTextHeight, setTotalVerticalLineTextHeight] = useState(0);
		/**
		* createXSeries
		* - creates the x domain and updates state
		*/
		const createXDomain = useCallback(() => setXDomain(getXDomain(dates, awardType, transactions)), [
			awardType,
			dates,
			transactions,
			setXDomain
		]);
		/**
		* createYSeries
		* - creates the y domain and updates state
		* @returns {null}
		*/
		const createYDomain = useCallback(() => {
			const clonedTransactions = cloneDeep(transactions);
			clonedTransactions.sort((a, b) => a.running_obligation_total - b.running_obligation_total);
			const yZero = 0;
			let yOne = 0;
			if (clonedTransactions.length > 1) yOne = totalObligation > clonedTransactions[clonedTransactions.length - 1].running_obligation_total ? totalObligation : clonedTransactions[clonedTransactions.length - 1].running_obligation_total;
			else yOne = totalObligation || clonedTransactions[0].running_obligation_total;
			setYDomain([yZero, yOne]);
		}, [transactions, totalObligation]);
		useEffect(() => {
			createXDomain();
			createYDomain();
		}, [
			transactions,
			createXDomain,
			createYDomain
		]);
		/**
		* addLastTickForSpacing
		* - We want to add spacing to the top of the chart based off of the design.
		* To add this space we will add an additional tick to the y-axis by
		* finding the average difference between the ticks and add that to
		* the last tick.
		* @param {Number[]} - an array of numbers.
		* @returns {Number[]} - an array of numbers.
		*/
		const addTicksForSpacing = (ticks, scale) => {
			if (!ticks.length) return [];
			const updatedTicks = cloneDeep(ticks);
			const differences = compact(ticks.reverse().map((tick, i) => {
				if (ticks.length === i + 1) return null;
				return tick - ticks[i + 1];
			}));
			if (!differences.length) return [];
			const averageDifference = differences.reduce((acc, data) => acc + data, 0) / differences.length;
			updatedTicks.push(updatedTicks[updatedTicks.length - 1] + averageDifference);
			/**
			* Since we are adding fake spacing to the top of the chart so the vertical line text
			* never overlaps with the chart, and the lines will be descending in height to make
			* sure the text never overlaps with other text. We must make sure the average difference
			* is greater than the total height of the vertical line text. If it is not we will add
			* another tick.
			*/
			if (totalVerticalLineTextHeight > scale(averageDifference)) {
				/**
				* Now the question is how much space do we need to add? To determine this,
				* we will get the difference from the total text height and then divide that
				* by the average difference. If it is greater than 1, then we will add how ever
				* many extra tick we need. :)
				*/
				const difference = totalVerticalLineTextHeight - scale(averageDifference);
				const howManyTicksToAdd = [];
				for (let i = 0; i < Math.ceil(difference / averageDifference); i++) howManyTicksToAdd.push(i);
				howManyTicksToAdd.forEach(() => updatedTicks.push(updatedTicks[updatedTicks.length - 1] + averageDifference));
			}
			return updatedTicks;
		};
		/**
		* xTickDateAndLabel
		* - format the x-axis labels
		* @param {Number[]} - an array of dates in milliseconds
		* @returns {Object[]} - an array of objects with date and label properties
		*/
		const xTickDateAndLabel = (ticks) => ticks.map((date) => {
			const newDate = new Date(date);
			const shortYear = convertDateToFY(dayjs$6(date)).toString().slice(-2);
			return {
				date: newDate,
				label: `${newDate.toLocaleString("en-us", { month: "short" }).toUpperCase()} FY '${shortYear}`
			};
		});
		/**
		* createXScaleAndTicks
		* - creates the x scaling function and updates state
		* @returns {null}
		*/
		const createXScaleAndTicks = useCallback(() => {
			if (!xDomain.length) return null;
			/**
			* By design, we want to leave space between the start of the chart
			* and the end of the chart.
			*/
			const spacing = visualizationWidth * xAxisSpacingPercentage;
			const scale = linear().domain(xDomain).range([spacing, visualizationWidth - spacing - padding.left]);
			let theTicks = scale.ticks(6);
			theTicks.splice(0, 0, xDomain[0]);
			theTicks.push(xDomain[1]);
			const averageDifference = sum(theTicks.reverse().reduce((acc, tick, i, src) => {
				const nextTick = src[i + 1];
				if (!nextTick) return acc;
				acc.push(tick - nextTick);
				return acc;
			}, [])) / theTicks.length;
			theTicks.reverse();
			/**
			* evenlySpacedTicks
			* - Manually create the x ticks starting with the first tick and
			* adding the difference sequentially.
			*/
			const evenlySpacedTicks = (ticks, diff) => {
				const newTicks = cloneDeep(ticks);
				/**
				* Tthe ticks method for d3 does not include ticks for the very beginning
				* and the end of the domain. This leaves a gap between the last tick we create
				* and the last tick of the domain. Therefore we increase our array by two.
				* Since we ignore the first and last tick we cannot unshift or push :(.
				*/
				newTicks.splice(1, 0, 1);
				return newTicks.reduce((acc, tick, i) => {
					if (i === 0 || i + 1 === newTicks.length) acc.push(tick);
					else acc.push(acc[i - 1] + diff);
					return acc;
				}, []);
			};
			/**
			* removeOverlappingTicks
			* - Manually adding ticks could cause overlap since d3 is creating their own ticks.
			* This filters any ticks that might overlap.  The number 20 was derived
			* from visual evidence of overlap on this award ASST_NON_1905OH5MAP_7530.
			* @param {Number[]} - array of milliseconds
			* @param {function} - d3 scale function
			* @returns {Number[]} - array of milliseconds
			*/
			let skipNext = false;
			const removeOverlappingTicks = (ticks, scaleFunc) => ticks.filter((tick, i, src) => {
				if (skipNext) {
					skipNext = false;
					return false;
				}
				const currentTick = scaleFunc(tick);
				const nextTick = scaleFunc(src[i + 1]);
				if (nextTick) {
					if (nextTick - currentTick <= 20) {
						if (i + 2 === src.length) return false;
						skipNext = true;
					}
					return true;
				}
				return true;
			});
			theTicks = evenlySpacedTicks(theTicks, averageDifference);
			theTicks = removeOverlappingTicks(theTicks, scale);
			setXTicks(xTickDateAndLabel(theTicks));
			setXScale(() => scale);
			setXAxisSpacing(spacing);
			return null;
		}, [
			xDomain,
			visualizationWidth,
			padding.left
		]);
		/**
		* createYScale
		* - creates the y scaling function and ticks.
		* @returns {null}
		*/
		const createYScaleAndTicks = useCallback(() => {
			const scale = linear().domain(yDomain).range([0, height]).nice();
			const ticks = scale.ticks(6);
			const updatedTicksWithSpacing = addTicksForSpacing(ticks, scale);
			const updatedScale = linear().domain([yDomain[0], updatedTicksWithSpacing[updatedTicksWithSpacing.length - 1]]).range([0, height]).nice();
			setYTicks(updatedTicksWithSpacing);
			setYScale(() => updatedScale);
		}, [
			yDomain,
			height,
			totalVerticalLineTextHeight
		]);
		useEffect(() => {
			if (xDomain.length && yDomain.length) {
				createXScaleAndTicks();
				createYScaleAndTicks();
			}
		}, [
			transactions,
			createXScaleAndTicks,
			createYScaleAndTicks,
			xDomain,
			yDomain,
			visualizationWidth
		]);
		useEffect(() => {
			if (xDomain && xDomain.length > 0) {
				setStartLineData(Object.assign({}, startLineData, { value: getLineValue(dates._startDate, xDomain) }));
				setTodayLineData(Object.assign({}, todayLineData, { value: getLineValue(dayjs$6(Date.now()), xDomain) }));
				setEndLineData(Object.assign({}, endLineData, { value: getLineValue(dates._endDate, xDomain) }));
				setPotentialEndLineData(Object.assign({}, potentialEndLineData, { value: getLineValue(dates._potentialEndDate, xDomain) }));
			}
		}, [dates, xDomain]);
		const setVerticalLineHeight = (i, lineHeight) => {
			if (i === 0) return setStartLineData(Object.assign({}, startLineData, { height: lineHeight }));
			if (i === 1) return setEndLineData(Object.assign({}, endLineData, { height: lineHeight }));
			if (i === 2) return setPotentialEndLineData(Object.assign({}, potentialEndLineData, { height: lineHeight }));
			return setTodayLineData(Object.assign({}, todayLineData, { height: lineHeight }));
		};
		const allVerticalLines = useCallback(() => [
			startLineData,
			endLineData,
			potentialEndLineData,
			todayLineData
		], [
			startLineData,
			endLineData,
			potentialEndLineData,
			todayLineData
		]);
		const setVerticalLineHeights = useCallback(() => {
			let heightHasBeenInitialized = false;
			let currentHeight = 0;
			allVerticalLines().map((data) => data.value).forEach((data, i) => {
				if (data) {
					if (!heightHasBeenInitialized) {
						heightHasBeenInitialized = true;
						setVerticalLineHeight(i, currentHeight);
						currentHeight += verticalLineTextHeight;
						return null;
					}
					setVerticalLineHeight(i, currentHeight);
					currentHeight += verticalLineTextHeight;
					return null;
				}
				return null;
			});
		}, [
			verticalLineTextHeight,
			startLineData,
			endLineData,
			todayLineData,
			potentialEndLineData
		]);
		const updateTotalTextHeightAndVerticalLineHeights = useCallback(() => {
			if (!totalVerticalLineTextHeight) {
				setTotalVerticalLineTextHeight(allVerticalLines().map((data) => data.value).filter((data) => data).length * verticalLineTextHeight);
				setVerticalLineHeights(verticalLineTextHeight);
			}
		}, [
			verticalLineTextHeight,
			setVerticalLineHeights,
			allVerticalLines,
			totalVerticalLineTextHeight
		]);
		useEffect(() => {
			updateTotalTextHeightAndVerticalLineHeights();
		}, [verticalLineTextHeight, updateTotalTextHeightAndVerticalLineHeights]);
		useEffect(() => {
			createYScaleAndTicks();
		}, [totalVerticalLineTextHeight, createYScaleAndTicks]);
		const updateVerticalLineTextData = (data) => {
			if (data.height !== verticalLineTextHeight) setVerticalLineTextHeight(data.height);
		};
		const svgHeight = height + padding.bottom + 40;
		const paddingForYAxis = Object.assign(padding, { labels: 20 });
		const potentialAwardAmountLineDescription = `A horizontal line representing the total award obligation of ${formatMoney(totalObligation)}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("svg", {
			className: "contract-grant-activity-chart",
			width: visualizationWidth,
			height: svgHeight,
			children: /* @__PURE__ */ (0, import_jsx_runtime$60.jsxs)("g", {
				className: "contract-grant-activity-chart__body",
				transform: "translate(0,10)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(ActivityYAxis, {
						height,
						padding: paddingForYAxis,
						scale: yScale,
						ticks: yTicks,
						textAnchor: "left"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(ActivityXAxis, {
						width: visualizationWidth - padding.left,
						height,
						padding,
						scale: xScale,
						ticks: xTicks,
						line: true
					}),
					xScale && /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(ContractGrantActivityChartAreaPaths, {
						xScale,
						yScale,
						transactions,
						height,
						padding,
						todayLineValue: todayLineData.value,
						endLineValue: endLineData.value,
						potentialEndLineValue: potentialEndLineData.value,
						dates,
						xDomain,
						xAxisSpacing
					}),
					transactions.length && /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(ContractGrantActivityChartCircles, {
						transactions,
						padding,
						xScale,
						yScale,
						xAxisSpacing,
						height,
						showTooltip: showTooltipTransaction,
						hideTooltip: hideTooltipTransaction,
						hideTransactionTooltipOnBlur
					}),
					xScale && /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(ContractGrantActivityChartVerticalLines, {
						xScale,
						height,
						xDomain,
						padding,
						startLineValue: startLineData.value,
						todayLineValue: todayLineData.value,
						endLineValue: endLineData.value,
						potentialEndLineValue: potentialEndLineData.value,
						awardType,
						showHideTooltip: showHideTooltipLine,
						thisLineOrTextIsHovered,
						verticalLineTextData: updateVerticalLineTextData,
						startLineHeight: startLineData.height,
						endLineHeight: endLineData.height,
						potentialEndLineHeight: potentialEndLineData.height,
						todayLineHeight: todayLineData.height
					}),
					xScale && /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)(SVGLine, {
						lineClassname: "potential-award-amount-line",
						description: potentialAwardAmountLineDescription,
						scale: yScale,
						x1: padding.left,
						x2: visualizationWidth,
						max: yDomain[1],
						min: yDomain[0],
						position: totalObligation,
						graphHeight: height,
						isHorizontal: true,
						noText: true,
						onMouseMoveLine: showHideTooltipLine,
						onMouseLeaveLine: showHideTooltipLine,
						onMouseMoveText: showHideTooltipLine,
						onMouseLeaveText: showHideTooltipLine
					})
				]
			})
		});
	};
	ContractGrantActivityChart.propTypes = propTypes$54;
}));
//#endregion
//#region src/js/components/award/shared/activity/ContractGrantActivity.jsx
var import_jsx_runtime$59, dayjs$5, propTypes$53, defaultPadding, defaultTooltipWidth, height, ContractGrantActivity;
var init_ContractGrantActivity = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	init_timeRangeHelper();
	init_RectanglePercentVizTooltip();
	init_ContractGrantActivityChart();
	init_PaginatedTooltipContainer();
	init_Tooltip();
	import_jsx_runtime$59 = require_jsx_runtime();
	dayjs$5 = require_dayjs_min();
	propTypes$53 = {
		transactions: PropTypes.array,
		dates: PropTypes.object,
		awardType: PropTypes.string,
		totalObligation: PropTypes.number
	};
	defaultPadding = {
		left: 45,
		bottom: 30
	};
	defaultTooltipWidth = 375;
	height = 360;
	ContractGrantActivity = ({ transactions, dates, awardType, totalObligation }) => {
		const divReference = useRef(null);
		const [windowWidth, setWindowWidth] = useState(0);
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		const [showTooltipLine, setShowTooltipLine] = useState(false);
		const [showTooltipTransaction, setShowTooltipTransaction] = useState(false);
		const [thisLineOrTextIsHovered, setThisLineOrTextIsHovered] = useState("");
		const [isHoveringOverTransactionTooltip, setHoveringOverTransactionTooltip] = useState(false);
		/**
		* Line tooltip data e.g. { title: 'Start Date', amount: '04/24/2020' }
		* Circle tooltip data e.g. transaction object
		*/
		const [tooltipData, setTooltipData] = useState(null);
		/**
		* handleWindowResize
		* - updates window and visualization width based on current window width.
		* @returns {null}
		*/
		const handleWindowResize = throttle(() => {
			const wWidth = window.innerWidth;
			if (windowWidth !== wWidth) {
				setWindowWidth(windowWidth);
				setVisualizationWidth(divReference.current.offsetWidth);
			}
		}, 50);
		/**
		* hook - runs on mount and unmount.
		* Any updates to the width of the browser is handled by the
		* event listener.
		*/
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}, []);
		/**
		* X Translation
		* We are positioning the potential award amount line tooltip centered.
		* Therefore, we must halve the width to get the center of the graph and add 8
		* (since 8 is half the pointer for the tooltip that is auto adjusted in the tooltip
		* wrapper) and subtract half of the tooltip (since the tooltip position draws left to right)
		* Y Translation
		* We position with respect to the y position and add 8 for half the point and padding bottom.
		*/
		const potentialAwardAmountLineTooltipData = (data) => ({
			tooltipPosition: "bottom",
			styles: {
				transform: `translate(${data.x2 / 2 + 8 - defaultTooltipWidth / 2}px,${data.position + defaultPadding.bottom - 8}px)`,
				position: "absolute"
			},
			tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(RectanglePercentVizTooltip, {
				title: "Current Potential Award Amount",
				amount: formatMoney(totalObligation)
			})
		});
		const formatDateData = (date) => {
			const today = dayjs$5(Date.now());
			const dateFormatted = date.format("MM/DD/YYYY");
			return today.isAfter(date) ? `${dateFormatted} (${convertDatesToRange(date, today)} ago)` : `${dateFormatted} (${convertDatesToRange(today, date)} from today)`;
		};
		const verticalLinesTooltipData = (data, text) => {
			const date = dayjs$5(data.value);
			setThisLineOrTextIsHovered(text);
			return {
				styles: {
					position: "absolute",
					transform: `translate(${data.position + 16}px,${height / 2 - defaultPadding.bottom}px)`
				},
				tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(RectanglePercentVizTooltip, {
					title: `${text} Date`,
					amount: formatDateData(date)
				})
			};
		};
		const transactionTooltipInfo = (data) => data.allTransactionsOnTheSameDate.map((transaction) => {
			let actionTypeText;
			if (transaction.action_type && transaction.action_type_description) actionTypeText = `${transaction.action_type}: ${transaction.action_type_description}`;
			else if (transaction.action_type) actionTypeText = transaction.action_type;
			else if (transaction.action_type_description) actionTypeText = transaction.action_type_description;
			else actionTypeText = "--";
			return {
				title: `Modification ${transaction.modification_number || ""}`,
				sections: [
					{
						title: "Action Date",
						paragraphs: [`${formatDateData(transaction.action_date)}`]
					},
					{
						title: "Obligated Amount",
						paragraphs: [`${formatMoney(transaction.federal_action_obligation)}`]
					},
					{
						title: "Total Obligations to Date",
						paragraphs: [`${formatMoney(transaction.running_obligation_total_to_date)} 
                        ${totalObligation ? `(${calculatePercentage(transaction.running_obligation_total_to_date, totalObligation)} of Potential Award Amount)` : ""}`]
					},
					{
						title: "Action Type",
						paragraphs: [`${actionTypeText}`]
					},
					{
						title: "Description",
						paragraphs: [`${transaction.description || "--"}`]
					}
				]
			};
		});
		const transactionTooltipData = (data) => ({
			styles: {
				position: "absolute",
				transform: `translate(${data.cx + 11}px,${data.cy - 13}px)`
			},
			tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(PaginatedTooltipContainer, {
				data: transactionTooltipInfo(data.data, "Modification"),
				tooltipElement: /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(Tooltip, {})
			})
		});
		const handleTooltipDataLine = (data, text) => {
			let tooltipInfo = null;
			if (text) tooltipInfo = verticalLinesTooltipData(data, text);
			else tooltipInfo = potentialAwardAmountLineTooltipData(data);
			setTooltipData(tooltipInfo);
			setShowTooltipLine(true);
		};
		const handleTooltipDataTransaction = (data) => {
			setTooltipData(transactionTooltipData(data));
			setShowTooltipTransaction(true);
		};
		const onMouseMoveTooltip = () => {
			setHoveringOverTransactionTooltip(true);
		};
		const onMouseLeaveTooltip = () => {
			setHoveringOverTransactionTooltip(false);
		};
		const showTransactionTooltip = (data, text) => handleTooltipDataTransaction(data, text);
		const hideTooltipTransaction = () => setTimeout(() => setShowTooltipTransaction(false), 500);
		const hideTransactionTooltipOnBlur = () => setShowTooltipTransaction(false);
		const showHideTooltipLine = (data, text) => {
			if (!data && showTooltipLine) {
				setShowTooltipLine(false);
				setThisLineOrTextIsHovered("");
			} else handleTooltipDataLine(data, text);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$59.jsxs)("div", {
			ref: divReference,
			className: "award-amounts-viz contract-grant-activity-visualization",
			children: [(showTooltipLine || showTooltipTransaction || isHoveringOverTransactionTooltip) && /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(ds, {
				className: "award-section-tt",
				...tooltipData,
				wide: false,
				width: defaultTooltipWidth,
				onMouseMoveTooltip,
				onMouseLeaveTooltip,
				controlledProps: {
					isControlled: true,
					isVisible: showTooltipLine || showTooltipTransaction || isHoveringOverTransactionTooltip
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime$59.jsx)(ContractGrantActivityChart, {
				visualizationWidth,
				transactions,
				height,
				padding: defaultPadding,
				dates,
				awardType,
				totalObligation,
				showHideTooltipLine,
				showTooltipTransaction: showTransactionTooltip,
				hideTooltipTransaction,
				hideTransactionTooltipOnBlur,
				thisLineOrTextIsHovered
			})]
		});
	};
	ContractGrantActivity.propTypes = propTypes$53;
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/JumpToSectionButton.jsx
var import_jsx_runtime$58, propTypes$52, JumpToSectionButton;
var init_JumpToSectionButton = __esmMin((() => {
	init_dist();
	import_jsx_runtime$58 = require_jsx_runtime();
	propTypes$52 = {
		onClick: PropTypes.func,
		linkText: PropTypes.string,
		icon: PropTypes.string
	};
	JumpToSectionButton = ({ onClick, linkText, icon }) => /* @__PURE__ */ (0, import_jsx_runtime$58.jsxs)("button", {
		onClick,
		className: "award-viz__button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$58.jsx)("div", {
			className: "award-viz__link-icon",
			children: /* @__PURE__ */ (0, import_jsx_runtime$58.jsx)(FontAwesomeIcon, { icon })
		}), /* @__PURE__ */ (0, import_jsx_runtime$58.jsx)("div", {
			className: "award-viz__link-text",
			children: linkText
		})]
	});
	JumpToSectionButton.propTypes = propTypes$52;
}));
//#endregion
//#region src/js/containers/award/shared/ContractGrantActivityContainer.jsx
var import_jsx_runtime$57, dayjs$4, propTypes$51, ContractGrantActivityContainer;
var init_ContractGrantActivityContainer = __esmMin((() => {
	init_searchHelper();
	init_contractGrantActivityHelper();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_NoResultsMessage();
	init_ContractGrantActivity();
	init_dist();
	init_index_es();
	init_InfoTooltipContent();
	init_JumpToSectionButton();
	import_jsx_runtime$57 = require_jsx_runtime();
	dayjs$4 = require_dayjs_min();
	propTypes$51 = {
		awardId: PropTypes.string,
		awardType: PropTypes.string,
		dates: PropTypes.object,
		totalObligation: PropTypes.number,
		jumpToTransactionHistoryTable: PropTypes.func
	};
	ContractGrantActivityContainer = ({ awardId, awardType, dates, totalObligation, jumpToTransactionHistoryTable }) => {
		const [badDates, setBadDates] = useState(false);
		const [loading, setLoading] = useState(true);
		const [transactions, updateTransactions] = useState([]);
		const [error, updateError] = useState({
			error: false,
			message: ""
		});
		const request = useRef(null);
		const hasNext = useRef(true);
		let previousRunningObligationTotalToDate = 0;
		const createTransactionsRunningTotalObligationToDateAndSort = (data, runningObligationTotal) => {
			return data.sort((a, b) => parseInt(a.modification_number ? a.modification_number.replace(/\D/g, "") : "", 10) - parseInt(b.modification_number ? b.modification_number.replace(/\D/g, "") : "", 10)).map((transaction, i) => {
				if (i === 0) previousRunningObligationTotalToDate = runningObligationTotal;
				const t = transaction;
				t.running_obligation_total_to_date = previousRunningObligationTotalToDate + t.federal_action_obligation;
				previousRunningObligationTotalToDate = t.running_obligation_total_to_date;
				return t;
			});
		};
		/**
		* Since we have multiple transactions on the same day and we wont know the total for
		* a transaction until format transactions has run its course we run through all transactions
		* again to set every transaction on the same day to the total for the day
		*/
		const addRunningObligationTotalToChildren = (data) => data.map((info) => {
			const aTransaction = info;
			if (aTransaction.allTransactionsOnTheSameDate.length > 1) aTransaction.allTransactionsOnTheSameDate = info.allTransactionsOnTheSameDate.map((t) => {
				const newTransaction = t;
				newTransaction.running_obligation_total_to_date = info.running_obligation_total;
				return newTransaction;
			});
			return aTransaction;
		});
		/**
		* formatTransactions
		* - any transactions that have the same date must be summed into one amount.
		* We need to keep all transactions with the same date for the paginating tooltips.
		* @param {Object[]} - an array of all transaction objects for this award.
		* @returns {Object[]} - an array of all transaction objects for this award.
		*/
		const formatTransactions = (rawTransactions) => {
			let newData = rawTransactions.sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf()).reduce((acc, data) => {
				const updatedData = { ...data };
				updatedData.action_date = dayjs$4(updatedData.action_date, "YYYY-MM-DD");
				const currentTransactionIndex = acc.findIndex((x) => x.action_date.valueOf() === updatedData.action_date.valueOf());
				/**
				* When we have multiple transactions on the same day, we will sum their obligation and
				* we will keep track of all the transactions on the same date for the tooltips in the
				* allTransactions property.
				*/
				if (currentTransactionIndex !== -1) {
					acc[currentTransactionIndex].allTransactionsOnTheSameDate.push(updatedData);
					const sumOfObligations = acc[currentTransactionIndex].federal_action_obligation + updatedData.federal_action_obligation;
					acc[currentTransactionIndex].federal_action_obligation = sumOfObligations;
					return acc;
				}
				updatedData.allTransactionsOnTheSameDate = [cloneDeep(updatedData)];
				acc.push(updatedData);
				return acc;
			}, []);
			let previousRunningObligationTotal = 0;
			newData = newData.filter((data) => !isNaN(data.action_date.valueOf())).sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf()).map((data, i) => {
				const updatedData = data;
				if (!updatedData.federal_action_obligation) updatedData.federal_action_obligation = 0;
				if (i === 0) {
					updatedData.running_obligation_total = data.federal_action_obligation;
					previousRunningObligationTotal = data.federal_action_obligation;
					updatedData.allTransactionsOnTheSameDate = createTransactionsRunningTotalObligationToDateAndSort(updatedData.allTransactionsOnTheSameDate, 0);
					return updatedData;
				}
				const total = previousRunningObligationTotal + data.federal_action_obligation;
				updatedData.running_obligation_total = total;
				updatedData.allTransactionsOnTheSameDate = createTransactionsRunningTotalObligationToDateAndSort(updatedData.allTransactionsOnTheSameDate, previousRunningObligationTotal);
				previousRunningObligationTotal = total;
				return updatedData;
			});
			return addRunningObligationTotalToChildren(newData);
		};
		const getTransactions = useCallback(() => {
			const asyncFunc = async () => {
				if (request.current) request.current.cancel();
				setLoading(true);
				const params = {
					award_id: awardId,
					page: 1,
					sort: "federal_action_obligation",
					order: "asc",
					limit: 5e3
				};
				/**
				* paginateTransactions
				* - Generator function that fetches transactions
				* @returns {Object[]} - an array of one page of transactions
				*/
				async function* paginateTransactions() {
					while (hasNext.current) try {
						request.current = fetchAwardTransaction(params);
						const response = await request.current.promise;
						params.page++;
						hasNext.current = response.data.page_metadata.hasNext;
						yield response.data;
					} catch (e) {
						hasNext.current = false;
						updateError({
							error: true,
							message: e.message
						});
					}
					return null;
				}
				/**
				* getAllTransactions
				* - Iterator that iterates through all transactions
				* @returns {Object[]} - an array of all transactions
				*/
				const getAllTransactions = async () => {
					const data = [];
					const iterator = paginateTransactions();
					for await (const transaction of iterator) data.push(...transaction.results);
					return data;
				};
				/**
				* allTransactions
				* - executes getAllTransactions
				* @returns {Object[]} - an array of all transactions
				*/
				const allTransactions = await getAllTransactions();
				updateTransactions(formatTransactions(allTransactions));
				setLoading(false);
			};
			asyncFunc();
		}, [awardId]);
		useEffect(() => {
			getTransactions();
			return () => {
				if (request.current) request.current.cancel();
				if (hasNext.current) hasNext.current = false;
			};
		}, [getTransactions, awardId]);
		useEffect(() => {
			setBadDates(areTransactionDatesOrAwardAmountsInvalid(dates, awardType, transactions));
		}, [
			dates,
			awardType,
			transactions
		]);
		/**
		* title
		* - updates title based on award type
		* @returns {String} - '[Grants || Contract] Activity'
		*/
		const title = () => awardType === "grant" ? "Grant Activity" : "Contract Activity";
		/**
		* message
		* - updates the message displayed to users based on error, loading, and
		* transactions state properties
		* @returns {Component} - respective error, loading or no results component
		*/
		const message = () => {
			if (error.error) return /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(ResultsTableErrorMessage, {});
			if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(ResultsTableLoadingMessage, {});
			if (badDates || !transactions.length) return /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(NoResultsMessage, {
				title: "Chart Not Available",
				message: "Data in this instance is not suitable for charting"
			});
			return null;
		};
		/**
		* content
		* - displays content if there is data
		* @returns {Component} - ContractGrantsActivity
		*/
		const content = () => {
			if (!error.error && !loading && transactions.length > 0 && !badDates) return /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(ContractGrantActivity, {
				transactions,
				dates,
				awardType,
				totalObligation
			});
			return null;
		};
		/**
		* tooltip info
		* - updates the tooltip data based on award type
		* @return {Component} - respective tooltip data
		*/
		const tooltipInfo = () => {
			if (awardType === "grant") return contractActivityGrants;
			return contractActivityInfoContracts;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("div", {
			className: "award__col award-viz contract-grant-activity",
			children: /* @__PURE__ */ (0, import_jsx_runtime$57.jsxs)("div", {
				className: "award__col__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$57.jsxs)("div", {
						className: "award-viz__heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("div", {
								className: "award-viz__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(FontAwesomeIcon, {
									size: "lg",
									icon: "chart-area"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("h3", {
								className: "award-viz__title",
								children: title()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(ds, {
								className: "award-section-tt",
								icon: "info",
								wide: true,
								tooltipComponent: tooltipInfo(),
								tooltipPosition: "right"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("div", {
						className: "results-table-message-container",
						children: message()
					}),
					content(),
					/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)(JumpToSectionButton, {
						linkText: "View transactions table",
						icon: "table",
						onClick: jumpToTransactionHistoryTable
					})
				]
			})
		});
	};
	ContractGrantActivityContainer.propTypes = propTypes$51;
}));
//#endregion
//#region src/js/dataMapping/award/additionalDetailsContract.js
var additionalDetailsContracts;
var init_additionalDetailsContract = __esmMin((() => {
	init_awardSummaryHelper();
	init_recipientIdentifiers();
	additionalDetailsContracts = (awardData) => {
		const { awardingAgency, fundingAgency, parentAwardDetails, periodOfPerformance, placeOfPerformance, recipient } = awardData;
		return {
			uniqueAwardKey: {
				"Unique Award Key": awardData.generatedId,
				"Award or IDV Flag": "Contract Award",
				"Procurement Instrument Identifier (PIID)": awardData.piid,
				"Submitting Agency Identifier Code": getSubmittingAgencyId(awardData.generatedId),
				"Parent Award ID (Parent PIID)": parentAwardDetails.piid,
				"Parent Agency Identifier Code": awardData.additionalDetails.idvAgencyId
			},
			agencyDetails: {
				"Awarding Agency": {
					type: "link",
					data: {
						path: awardingAgency.agencySlug && awardingAgency.hasAgencyPage ? `/agency/${awardingAgency.agencySlug}` : null,
						title: awardingAgency.formattedToptier
					}
				},
				"Awarding Sub-Agency": {
					type: "link",
					data: {
						path: awardingAgency.subtierId ? `/agency/${awardingAgency.subtierId}` : null,
						title: awardingAgency.subtierName
					}
				},
				"Awarding Office": {
					type: "link",
					data: {
						path: awardingAgency.officeId ? `/agency/${awardingAgency.officeId}` : null,
						title: awardingAgency.officeName
					}
				},
				"Funding Agency": {
					type: "link",
					data: {
						path: fundingAgency.agencySlug && fundingAgency.hasAgencyPage ? `/agency/${fundingAgency.agencySlug}` : null,
						title: fundingAgency.formattedToptier
					}
				},
				"Funding Sub-Agency": {
					type: "link",
					data: {
						path: fundingAgency.subtierId ? `/agency/${fundingAgency.subtierId}` : null,
						title: fundingAgency.subtierName
					}
				},
				"Funding Office": {
					type: "link",
					data: {
						path: fundingAgency.officeId ? `/agency/${fundingAgency.officeId}` : null,
						title: fundingAgency.officeName
					}
				}
			},
			parentAwardDetails: {
				"Parent Award Unique Key": parentAwardDetails.awardId,
				"Parent Award ID (Parent PIID)": {
					type: "link",
					data: {
						path: parentAwardDetails.awardId ? `/award/${parentAwardDetails.awardId}` : null,
						title: parentAwardDetails.piid
					}
				},
				"Parent IDV Type": parentAwardDetails.idvType || "",
				"Parent IDV Agency Name": {
					type: "link",
					data: {
						path: parentAwardDetails.agencySlug ? `/agency/${parentAwardDetails.agencySlug}` : null,
						title: parentAwardDetails.agencyName
					}
				},
				"Parent IDV Sub-Agency Name": parentAwardDetails.subAgencyName,
				"Multiple Or Single Parent Award IDV": parentAwardDetails.multipleOrSingle || ""
			},
			placeOfPerformance: {
				Address: {
					type: "address",
					data: [`${placeOfPerformance.regionalAddress}`, `${placeOfPerformance._country}`]
				},
				"Congressional District": {
					type: "address",
					data: [`${placeOfPerformance.fullCongressionalDistrict}`]
				}
			},
			periodOfPerformance: {
				"Start Date": periodOfPerformance.startDate,
				"End Date": periodOfPerformance.endDate,
				"Potential End Date": periodOfPerformance.potentialEndDate
			},
			legislativeMandates: {
				"Clinger-Cohen Act Compliant": awardData.additionalDetails.clingerCohenAct,
				"Subject to Construction Wage Rate Requirements": awardData.additionalDetails.constructionWageRateReq,
				"Subject to Labor Standards": awardData.additionalDetails.laborStandards,
				"Subject to Materials, Supplies, Articles & Equipment": awardData.additionalDetails.materialSuppliesArticlesEquip
			},
			recipientDetails: {
				Recipient: {
					type: "link",
					data: {
						path: recipient.internalId ? `/recipient/${recipient.internalId}/latest` : null,
						title: recipient._name
					}
				},
				"Recipient Identifier": {
					type: "list",
					data: idList(recipient.duns, recipient.uei)
				},
				"Parent Recipient": {
					type: "link",
					data: {
						path: recipient.parentInternalId ? `/recipient/${recipient.parentInternalId}/latest` : null,
						title: recipient.parentName
					}
				},
				"Parent Recipient Identifier": {
					type: "list",
					data: idList(recipient.parentDuns, recipient.parentUei)
				},
				"Recipient Address": {
					type: "address",
					data: [
						`${recipient.location.streetAddress}`,
						`${recipient.location.regionalAddress}`,
						`${recipient.location._country}`
					]
				},
				"Congressional District": {
					type: "address",
					data: [`${recipient.location.fullCongressionalDistrict}`]
				},
				"Business Types": {
					type: "list",
					data: recipient.businessCategories || []
				}
			},
			acquisitionDetails: {
				"Product or Service Code (PSC)": awardData.additionalDetails.pscCode,
				"North American Industry Classification System (NAICS) Code": awardData.additionalDetails.naicsCode,
				"DoD Claimant Code": awardData.additionalDetails.dodClaimantProgram,
				"DOD Acquisition Program": awardData.additionalDetails.dodAcquisitionProgram,
				"Information Technology Commercial Item Category": awardData.additionalDetails._infoTechCommercialItemDescription,
				"Sea Transportation": awardData.additionalDetails.seaTransport
			},
			competitionDetails: {
				"Solicitation ID": awardData.additionalDetails.solicitationId,
				"Solicitation Procedures": awardData.additionalDetails.solicitationProcedures,
				"Number of Offers Received": awardData.additionalDetails.numberOffers,
				"Extent Competed": awardData.additionalDetails.extentCompeted,
				"Other Than Full and Open Competition": awardData.additionalDetails.notCompeted,
				"Set-Aside Type": awardData.additionalDetails.setAsideType,
				"Commercial Item Acquisition Procedures": awardData.additionalDetails.commercialAcquisitionProcedures,
				"Simplified Procedures for Certain Commercial Items": awardData.additionalDetails.commercialTestProgram,
				"Evaluated Preference": awardData.additionalDetails.evaluatedPreference,
				"Fed Biz Opps": awardData.additionalDetails.fedBizOpps,
				"Small Business Competitiveness Demonstration Program": awardData.additionalDetails.smallBusinessCompetitive
			},
			additionalDetails: {
				"Contract Type": awardData.typeDescription,
				"National Interest Action": awardData.additionalDetails.nationalInterestActionDesc,
				"Cost or Pricing Data": awardData.additionalDetails.costOrPricingData,
				"Domestic or Foreign Entity": awardData.additionalDetails.domesticForeign,
				"Fair Opportunity Limited Sources": awardData.additionalDetails.fairOpportunityLimitedSources,
				"Foreign Funding": awardData.additionalDetails.foreignFunding,
				"Interagency Contracting Authority": awardData.additionalDetails.interagencyContactingAuthority,
				"Major Program": awardData.additionalDetails.majorProgram,
				"Subcontracting Plan": awardData.additionalDetails.subcontractingPlan,
				"Multi Year Contract": awardData.additionalDetails.multiYearContract,
				"Consolidated Contract": awardData.additionalDetails.consolidated
			}
		};
	};
}));
//#endregion
//#region src/js/dataMapping/award/additionalDetailsFinancialAssistance.js
var getUriOrFain, additionalDetailsFinancialAssistance;
var init_additionalDetailsFinancialAssistance = __esmMin((() => {
	init_awardSummaryHelper();
	init_recipientIdentifiers();
	getUriOrFain = ({ generatedId, uri, fain }) => {
		if (isAwardAggregate(generatedId)) return { "Unique Record Identifier (URI)": uri };
		return { "Federal Award Identification Number (FAIN)": fain };
	};
	additionalDetailsFinancialAssistance = (awardData) => {
		const { awardingAgency, fundingAgency, periodOfPerformance, placeOfPerformance, recipient } = awardData;
		return {
			uniqueAwardKey: {
				"Unique Award Key": awardData.generatedId,
				"Record Type": isAwardAggregate(awardData.generatedId) ? "Financial Assistance, Aggregated" : "Financial Assistance, Non-Aggregated",
				...getUriOrFain(awardData),
				"Awarding Agency Code": getSubmittingAgencyId(awardData.generatedId)
			},
			agencyDetails: {
				"Awarding Agency": {
					type: "link",
					data: {
						path: awardingAgency.agencySlug && awardingAgency.hasAgencyPage ? `/agency/${awardingAgency.agencySlug}` : null,
						title: awardingAgency.formattedToptier
					}
				},
				"Awarding Sub-Agency": {
					type: "link",
					data: {
						path: awardingAgency.subtierId ? `/agency/${awardingAgency.subtierId}` : null,
						title: awardingAgency.subtierName
					}
				},
				"Awarding Office": {
					type: "link",
					data: {
						path: awardingAgency.officeId ? `/agency/${awardingAgency.officeId}` : null,
						title: awardingAgency.officeName
					}
				},
				"Funding Agency": {
					type: "link",
					data: {
						path: fundingAgency.agencySlug && fundingAgency.hasAgencyPage ? `/agency/${fundingAgency.agencySlug}` : null,
						title: fundingAgency.formattedToptier
					}
				},
				"Funding Sub-Agency": {
					type: "link",
					data: {
						path: fundingAgency.subtierId ? `/agency/${fundingAgency.subtierId}` : null,
						title: fundingAgency.subtierName
					}
				},
				"Funding Office": {
					type: "link",
					data: {
						path: fundingAgency.officeId ? `/agency/${fundingAgency.officeId}` : null,
						title: fundingAgency.officeName
					}
				}
			},
			placeOfPerformance: { Address: {
				type: "address",
				data: [
					`${placeOfPerformance.regionalAddress}`,
					`${placeOfPerformance._country}`,
					`${placeOfPerformance.fullCongressionalDistrict}`
				]
			} },
			periodOfPerformance: {
				"Start Date": periodOfPerformance.startDate,
				"End Date": periodOfPerformance.endDate
			},
			recipientDetails: {
				Recipient: {
					type: "link",
					data: {
						path: recipient.internalId ? `/recipient/${recipient.internalId}/latest` : null,
						title: recipient._name
					}
				},
				"Recipient Identifier": {
					type: "list",
					data: idList(recipient.duns, recipient.uei)
				},
				"Parent Recipient": {
					type: "link",
					data: {
						path: recipient.parentInternalId ? `/recipient/${recipient.parentInternalId}/latest` : null,
						title: recipient.parentName
					}
				},
				"Parent Recipient Identifier": {
					type: "list",
					data: idList(recipient.parentDuns, recipient.parentUei)
				},
				"Recipient Address": {
					type: "address",
					data: [
						`${recipient.location.streetAddress}`,
						`${recipient.location.regionalAddress}`,
						`${recipient.location._country}`
					]
				},
				"Congressional District": {
					type: "address",
					data: [`${recipient.location.fullCongressionalDistrict}`]
				},
				"Business Types": {
					type: "list",
					data: recipient.businessCategories || []
				}
			}
		};
	};
}));
//#endregion
//#region src/js/dataMapping/award/additionalDetailsIdv.js
var additionalDetails;
var init_additionalDetailsIdv = __esmMin((() => {
	init_awardSummaryHelper();
	init_recipientIdentifiers();
	additionalDetails = (awardData) => {
		const { awardingAgency, fundingAgency, recipient, dates, parentAwardDetails } = awardData;
		return {
			uniqueAwardKey: {
				"Unique Award Key": awardData.generatedId,
				"Award or IDV Flag": "Contract IDV",
				"Procurement Instrument Identifier (PIID)": awardData.piid,
				"Submitting Agency Identifier Code": getSubmittingAgencyId(awardData.generatedId)
			},
			agencyDetails: {
				"Awarding Agency": {
					type: "link",
					data: {
						path: awardingAgency.agencySlug && awardingAgency.hasAgencyPage ? `/agency/${awardingAgency.agencySlug}` : null,
						title: awardingAgency.formattedToptier
					}
				},
				"Awarding Sub-Agency": awardingAgency.subtierName,
				"Awarding Office": awardingAgency.officeName,
				"Funding Agency": {
					type: "link",
					data: {
						path: fundingAgency.agencySlug && fundingAgency.hasAgencyPage ? `/agency/${fundingAgency.agencySlug}` : null,
						title: fundingAgency.formattedToptier
					}
				},
				"Funding Sub-Agency": fundingAgency.subtierName,
				"Funding Office": fundingAgency.officeName
			},
			parentAwardDetails: {
				"Parent Award Unique Key": parentAwardDetails.awardId,
				"Parent Award ID (Parent PIID)": {
					type: "link",
					data: {
						path: parentAwardDetails.awardId ? `/award/${parentAwardDetails.awardId}` : null,
						title: parentAwardDetails.piid
					}
				},
				"Parent IDV Type": parentAwardDetails.idvType || "",
				"Parent IDV Agency Name": {
					type: "link",
					data: {
						path: parentAwardDetails.agencySlug ? `/agency/${parentAwardDetails.agencySlug}` : null,
						title: parentAwardDetails.agencyName
					}
				},
				"Parent IDV Sub-Agency Name": parentAwardDetails.subAgencyName,
				"Multiple Or Single Parent Award IDV": parentAwardDetails.multipleOrSingle || ""
			},
			periodOfPerformance: {
				"Start Date": dates.startDate,
				"Ordering Period End Date": dates.endDate
			},
			legislativeMandates: {
				"Clinger-Cohen Act Compliant": awardData.additionalDetails.clingerCohenAct,
				"Subject to Construction Wage Rate Requirements": awardData.additionalDetails.constructionWageRateReq,
				"Subject to Labor Standards": awardData.additionalDetails.laborStandards,
				"Subject to Materials, Supplies, Articles & Equipment": awardData.additionalDetails.materialSuppliesArticlesEquip
			},
			recipientDetails: {
				Recipient: {
					type: "link",
					data: {
						path: recipient.internalId ? `/recipient/${recipient.internalId}/latest` : null,
						title: recipient._name
					}
				},
				"Recipient Identifier": {
					type: "list",
					data: idList(recipient.duns, recipient.uei)
				},
				"Parent Recipient": {
					type: "link",
					data: {
						path: recipient.parentInternalId ? `/recipient/${recipient.parentInternalId}/latest` : null,
						title: recipient.parentName
					}
				},
				"Parent Recipient Identifier": {
					type: "list",
					data: idList(recipient.parentDuns, recipient.parentUei)
				},
				"Recipient Address": {
					type: "address",
					data: [
						`${recipient.location.streetAddress}`,
						`${recipient.location.regionalAddress}`,
						`${recipient.location._country}`
					]
				},
				"Congressional District": {
					type: "address",
					data: [`${recipient.location.fullCongressionalDistrict}`]
				},
				"Business Types": {
					type: "list",
					data: recipient.businessCategories || []
				}
			},
			acquisitionDetails: {
				"Product or Service Code (PSC)": awardData.additionalDetails.pscCode,
				"NAICS Code": awardData.additionalDetails.naicsCode,
				"DoD Claimant Code": awardData.additionalDetails.dodClaimantProgram,
				"Sea Transportation": awardData.additionalDetails.seaTransport
			},
			competitionDetails: {
				"Solicitation ID": awardData.additionalDetails.solicitationId,
				"Solicitation Procedures": awardData.additionalDetails.solicitationProcedures,
				"Number of Offers Received": awardData.additionalDetails.numberOffers,
				"Extent Competed": awardData.additionalDetails.extentCompeted,
				"Not Competed Reason": awardData.additionalDetails.notCompeted,
				"Set-Aside Type": awardData.additionalDetails.setAsideType,
				"Commercial Item Acquisition Procedures": awardData.additionalDetails.commercialAcquisitionProcedures,
				"Simplified Procedures for Certain Commercial Items": awardData.additionalDetails.commercialTestProgram,
				"Evaluated Preference": awardData.additionalDetails.evaluatedPreference,
				"Fed Biz Opps": awardData.additionalDetails.fedBizOpps,
				"Small Business Competitiveness Demonstration Program": awardData.additionalDetails.smallBusinessCompetitive
			},
			additionalDetails: {
				"IDV Type": awardData.additionalDetails.idvType,
				"IDC Type": awardData.additionalDetails.idcType,
				"National Interest Action": awardData.additionalDetails.nationalInterestActionDesc,
				"Multiple Or Single Award IDV": awardData.additionalDetails.multipleIdv,
				"Cost or Pricing Data": awardData.additionalDetails.costOrPricingData,
				"Domestic or Foreign Entity": awardData.additionalDetails.domesticForeign,
				"Fair Opportunity Limited Sources": awardData.additionalDetails.fairOpportunityLimitedSources,
				"Foreign Funding": awardData.additionalDetails.foreignFunding,
				"Interagency Contracting Authority": awardData.additionalDetails.interagencyContactingAuthority,
				"Major Program": awardData.additionalDetails.majorProgram,
				"Program Acronym": awardData.additionalDetails.programAcronym,
				"Subcontracting Plan": awardData.additionalDetails.subcontractingPlan,
				"Multi Year Contract": awardData.additionalDetails.multiYearContract,
				"Consolidated Contract": awardData.additionalDetails.consolidated
			}
		};
	};
}));
//#endregion
//#region src/js/components/award/shared/additionalInfo/Accordion.jsx
/**
* Accordion.jsx
* Created by Kwadwo Opoku-Debrah 10/13/2018
**/
var import_jsx_runtime$56, awardIdField, propTypes$50, Accordion;
var init_Accordion = __esmMin((() => {
	init_development();
	init_dist();
	init_keyboardEventsHelper();
	init_index_es();
	init_InfoTooltipContent();
	import_jsx_runtime$56 = require_jsx_runtime();
	awardIdField = "Unique Award Key";
	propTypes$50 = {
		accordionName: PropTypes.string,
		accordionIcon: PropTypes.string,
		iconClassName: PropTypes.string,
		accordionData: PropTypes.object,
		globalToggle: PropTypes.bool
	};
	Accordion = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				open: false,
				showCDTooltip: false
			};
			this.handleClick = this.handleClick.bind(this);
		}
		componentDidUpdate(prevProps) {
			if (this.props.globalToggle !== prevProps.globalToggle) this.globalOverride();
		}
		handleClick() {
			this.setState({ open: !this.state.open });
		}
		link(pathAndTitle) {
			const { path, title } = pathAndTitle;
			if (!path && !title) return "--";
			if (!path) return title;
			if (title && path) return /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(Link, {
				to: path,
				children: title
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(Link, {
				to: path,
				children: "Unknown"
			});
		}
		address(arrayOfRows) {
			if (compact(arrayOfRows).length === 0) return "--";
			return /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", { children: arrayOfRows.map((addressLine, index) => /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", { children: addressLine || "--" }, `addressline-${addressLine}-${index}`)) });
		}
		list(arrayOfData) {
			if (compact(arrayOfData).length === 0) return "--";
			return /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("ul", {
				className: "accordion-table__list",
				children: arrayOfData.map((type, index) => /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("li", { children: type }, `list-${type}-${index}`))
			});
		}
		globalOverride() {
			this.setState({ open: this.props.globalToggle });
		}
		accordionBody() {
			const { accordionData } = this.props;
			if (!accordionData) return null;
			return Object.keys(accordionData).map((key) => {
				this.state.showCDTooltip = false;
				let data = accordionData[key] || "--";
				if (accordionData[key]) {
					const awardInfo = accordionData[key];
					const specialType = accordionData[key].type;
					if (specialType) data = this[awardInfo.type](awardInfo.data);
					if (specialType === "address" || key === "Congressional District") this.state.showCDTooltip = true;
				}
				return /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("div", {
					className: "accordion-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", {
						className: "accordion-row__title",
						children: key
					}), /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("div", {
						className: `accordion-row__data${key === awardIdField ? " generated-id" : ""}${this.state.showCDTooltip ? " show-tooltip" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", {
							className: `${this.state.open ? "tab-enabled" : "tab-disabled"}`,
							children: data
						}), key === "Congressional District" && this.state.open && this.state.showCDTooltip && /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", {
							className: "accordion-row__data-tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(ds, {
								className: "homepage__covid-19-tt",
								icon: "info",
								tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(CondensedCDTooltip, { title: "Congressional District" })
							})
						})]
					})]
				}, key);
			});
		}
		render() {
			const { accordionName, accordionIcon, iconClassName } = this.props;
			const onKeyDownHandler = createOnKeyDownHandler(this.handleClick);
			const accordionBody = this.accordionBody();
			const open = this.state.open ? /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(FontAwesomeIcon, {
				className: "accordion-caret",
				size: "lg",
				icon: "angle-down"
			}) : /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(FontAwesomeIcon, {
				className: "accordion-caret",
				size: "lg",
				icon: "angle-right"
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("div", {
				className: this.state.open ? "accordion accordion_open" : "accordion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("div", {
					className: "accordion__bar",
					tabIndex: 0,
					role: "button",
					onKeyDown: onKeyDownHandler,
					onClick: this.handleClick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)(FontAwesomeIcon, {
						className: iconClassName,
						size: "lg",
						icon: accordionIcon
					}), accordionName] }), /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("span", { children: open })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("div", {
					className: "accordion__content",
					children: accordionBody
				})]
			});
		}
	};
	Accordion.propTypes = propTypes$50;
}));
//#endregion
//#region src/js/components/award/shared/additionalInfo/IdvPeriodOfPerformance.jsx
/**
* IdvPeriodOfPerformance.jsx
* Created by Lizzie Salita 6/25/19
**/
var import_jsx_runtime$55, propTypes$49, IdvPeriodOfPerformance;
var init_IdvPeriodOfPerformance = __esmMin((() => {
	init_dist();
	init_keyboardEventsHelper();
	import_jsx_runtime$55 = require_jsx_runtime();
	propTypes$49 = {
		accordionData: PropTypes.object,
		globalToggle: PropTypes.bool
	};
	IdvPeriodOfPerformance = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { open: false };
			this.handleClick = this.handleClick.bind(this);
		}
		componentDidUpdate(prevProps) {
			if (this.props.globalToggle !== prevProps.globalToggle) this.globalOverride();
		}
		handleClick() {
			this.setState({ open: !this.state.open });
		}
		globalOverride() {
			this.setState({ open: this.props.globalToggle });
		}
		render() {
			const onKeyDownHandler = createOnKeyDownHandler(this.handleClick);
			return /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("div", {
				className: this.state.open ? "accordion accordion_open" : "accordion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("div", {
					className: "accordion__bar",
					tabIndex: 0,
					role: "button",
					onKeyDown: onKeyDownHandler,
					onClick: this.handleClick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(FontAwesomeIcon, {
						className: "accordion-icon-calendar-alt",
						size: "lg",
						icon: "calendar-alt"
					}), "Period of Performance"] }), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("span", { children: this.state.open ? /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(FontAwesomeIcon, {
						className: "accordion-caret",
						size: "lg",
						icon: "angle-down"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(FontAwesomeIcon, {
						className: "accordion-caret",
						size: "lg",
						icon: "angle-right"
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("div", {
					className: "accordion__content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("table", {
						className: "accordion-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("tr", {
							className: "accordion-table__row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("td", {
								className: "accordion-table__data accordion-table__data_info-tooltip",
								children: ["Start Date", /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("div", {
									className: "tooltip-popover-container",
									tabIndex: this.state.open ? 0 : -1,
									"aria-hidden": !this.state.open,
									role: "button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(FontAwesomeIcon, { icon: "info-circle" }), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("span", {
										className: "tooltip-popover",
										children: "Selected based on the earliest Start Date across all transactions on this IDV"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("td", { children: this.props.accordionData["Start Date"] || "--" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("tr", {
							className: "accordion-table__row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("td", {
								className: "accordion-table__data accordion-table__data_info-tooltip",
								children: ["Ordering Period End Date", /* @__PURE__ */ (0, import_jsx_runtime$55.jsxs)("div", {
									className: "tooltip-popover-container",
									tabIndex: this.state.open ? 0 : -1,
									"aria-hidden": !this.state.open,
									role: "button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$55.jsx)(FontAwesomeIcon, { icon: "info-circle" }), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("span", {
										className: "tooltip-popover",
										children: "Selected based on the latest Ordering Period End Date across all transactions on this IDV"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("td", { children: this.props.accordionData["Ordering Period End Date"] || "--" })]
						})] })
					})
				})]
			});
		}
	};
	IdvPeriodOfPerformance.propTypes = propTypes$49;
}));
//#endregion
//#region src/js/components/award/shared/additionalInfo/AdditionalInfo.jsx
/**
* AdditionalInfo.jsx
* Created by Kwadwo Opoku-Debrah 10/11/2018
**/
var import_jsx_runtime$54, propTypes$48, AdditionalInfo;
var init_AdditionalInfo = __esmMin((() => {
	init_dist();
	init_additionalDetailsContract();
	init_additionalDetailsFinancialAssistance();
	init_additionalDetailsIdv();
	init_Accordion();
	init_IdvPeriodOfPerformance();
	import_jsx_runtime$54 = require_jsx_runtime();
	propTypes$48 = { overview: PropTypes.object };
	AdditionalInfo = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { globalToggle: false };
		}
		handleClick = () => {
			this.setState({ globalToggle: !this.state.globalToggle });
		};
		data() {
			const { overview } = this.props;
			const category = overview._category;
			if (category === "idv") return additionalDetails(overview);
			if (category === "contract") return additionalDetailsContracts(overview);
			if (category === "definitive contract") return additionalDetailsContracts(overview);
			if (category === "grant") return additionalDetailsFinancialAssistance(overview);
			if (category === "loans") return additionalDetailsFinancialAssistance(overview);
			if (category === "direct payment") return additionalDetailsFinancialAssistance(overview);
			if (category === "insurance") return additionalDetailsFinancialAssistance(overview);
			if (category === "other") return additionalDetailsFinancialAssistance(overview);
			return {};
		}
		columns() {
			const { overview } = this.props;
			const data = this.data();
			let placeOfPerformance = null;
			let cdPOP = null;
			let splitCDPOP = null;
			if (data.placeOfPerformance) {
				cdPOP = data.placeOfPerformance["Congressional District"]?.data.pop().trim();
				splitCDPOP = cdPOP?.split(": ");
				if (splitCDPOP?.length === 2) data.placeOfPerformance["Congressional District"] = splitCDPOP[1];
			}
			const splitCDRD = (data.recipientDetails["Congressional District"]?.data.pop().trim())?.split(": ");
			if (splitCDRD?.length === 2) data.recipientDetails["Congressional District"] = splitCDRD[1];
			let periodOfPerformance = /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(IdvPeriodOfPerformance, {
				accordionData: data.periodOfPerformance,
				globalToggle: this.state.globalToggle
			}, "IdvPeriodOfPerformance");
			if (this.props.overview._category !== "idv") {
				placeOfPerformance = /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Place Of Performance",
					accordionIcon: "map-marker-alt",
					accordionData: data.placeOfPerformance
				}, "PlaceOfPerformance");
				periodOfPerformance = /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Period Of Performance",
					accordionIcon: "calendar-alt",
					iconClassName: "accordion-icon-calendar-alt",
					accordionData: data.periodOfPerformance
				}, "PeriodOfPerformance");
			}
			return {
				columnOne: [
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Unique Award Key",
						accordionIcon: "fingerprint",
						accordionData: data.uniqueAwardKey
					}, "UniqueAwardKey"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Agency Details",
						accordionIcon: "landmark",
						accordionData: data.agencyDetails
					}, "AgencyDetails"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Parent Award Details",
						accordionIcon: "sitemap",
						accordionData: data.parentAwardDetails
					}, "ParentAwardDetails"),
					placeOfPerformance,
					periodOfPerformance,
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Legislative Mandates",
						accordionIcon: "pencil-alt",
						accordionData: data.legislativeMandates
					}, "LegislativeMandates")
				],
				columnTwo: [
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Recipient Details",
						accordionIcon: "building",
						accordionData: data.recipientDetails
					}, "RecipientDetails"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Acquisition Details",
						accordionIcon: "tag",
						accordionData: data.acquisitionDetails
					}, "AcquisitionDetails"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Competition Details",
						accordionIcon: "chart-bar",
						accordionData: data.competitionDetails
					}, "CompetitionDetails"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Additional Details",
						accordionIcon: "ellipsis-h",
						accordionData: data.additionalDetails
					}, "AdditionalDetails"),
					/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
						globalToggle: this.state.globalToggle,
						accordionName: "Executive Compensation",
						accordionIcon: "user-tie",
						accordionData: overview.executiveDetails.officers
					}, "ExecutiveCompensation")
				]
			};
		}
		faColumns() {
			const { overview } = this.props;
			const data = this.data();
			const splitCDPOP = (data.placeOfPerformance["Congressional District"]?.data.pop().trim())?.split(": ");
			if (splitCDPOP?.length === 2) data.placeOfPerformance["Congressional District"] = splitCDPOP[1];
			const splitCDRD = (data.recipientDetails["Congressional District"]?.data.pop().trim())?.split(": ");
			if (splitCDRD?.length === 2) data.recipientDetails["Congressional District"] = splitCDRD[1];
			const columnOne = [
				/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Unique Award Key",
					accordionIcon: "fingerprint",
					accordionData: data.uniqueAwardKey
				}, "UniqueAwardKey"),
				/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Agency Details",
					accordionIcon: "landmark",
					accordionData: data.agencyDetails
				}, "AgencyDetails"),
				/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Place Of Performance",
					accordionIcon: "map-marker-alt",
					accordionData: data.placeOfPerformance
				}, "PlaceOfPerformance"),
				/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
					globalToggle: this.state.globalToggle,
					accordionName: "Period Of Performance",
					accordionIcon: "calendar-alt",
					iconClassName: "accordion-icon-calendar-alt",
					accordionData: data.periodOfPerformance
				}, "PeriodOfPerformance")
			];
			const columnTwo = [/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
				globalToggle: this.state.globalToggle,
				accordionName: "Recipient Details",
				accordionIcon: "building",
				accordionData: data.recipientDetails
			}, "RecipientDetails"), /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
				globalToggle: this.state.globalToggle,
				accordionName: "Executive Compensation",
				accordionIcon: "user-tie",
				accordionData: overview.executiveDetails.officers
			}, "ExecutiveCompensation")];
			if (overview.category === "grant") columnTwo.push(/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(Accordion, {
				globalToggle: this.state.globalToggle,
				accordionName: "Pre-Award Details",
				accordionIcon: "clipboard-list",
				accordionData: overview?.preAwardDetails
			}, "PreAwardDetails"));
			return {
				columnOne,
				columnTwo
			};
		}
		render() {
			const category = this.props.overview._category;
			let firstColumn;
			let secondColumn;
			if (category === "grant" || category === "loans" || category === "direct payment" || category === "insurance" || category === "other") {
				const { columnOne, columnTwo } = this.faColumns();
				firstColumn = columnOne;
				secondColumn = columnTwo;
			} else {
				const { columnOne, columnTwo } = this.columns();
				firstColumn = columnOne;
				secondColumn = columnTwo;
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
				id: "award-additional-information",
				className: "additional-info",
				children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)("div", {
					className: "award-viz",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)("div", {
							className: "award-viz__heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
								className: "award-viz__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)(FontAwesomeIcon, {
									size: "lg",
									icon: "info"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("h3", {
								className: "award-viz__title",
								children: "Additional Information"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("button", {
							className: "award-viz__button",
							onClick: this.handleClick,
							children: this.state.globalToggle ? "Collapse All" : "Expand All"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)("div", {
							className: "award__row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
								className: "award__col",
								children: firstColumn
							}), /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("div", {
								className: "award__col",
								children: secondColumn
							})]
						})
					]
				})
			});
		}
	};
	AdditionalInfo.propTypes = propTypes$48;
}));
//#endregion
//#region src/js/components/award/shared/AwardSection.jsx
var import_jsx_runtime$53, classMap, AwardSection;
var init_AwardSection = __esmMin((() => {
	init_propTypes();
	import_jsx_runtime$53 = require_jsx_runtime();
	classMap = {
		row: "award__row",
		column: "award__col"
	};
	AwardSection = ({ id, type, className = "", children }) => /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("div", {
		id,
		className: `${classMap[type]} ${className}`,
		children
	});
	AwardSection.propTypes = AWARD_SECTION_PROPS;
}));
//#endregion
//#region src/js/components/award/shared/overview/AwardingAgency.jsx
var import_jsx_runtime$52, propTypes$47, AwardingAgency;
var init_AwardingAgency = __esmMin((() => {
	init_development();
	init_AwardSection();
	import_jsx_runtime$52 = require_jsx_runtime();
	propTypes$47 = { awardingAgency: PropTypes.object };
	AwardingAgency = ({ awardingAgency }) => {
		let innerComponent = awardingAgency.formattedToptier;
		if (awardingAgency.hasAgencyPage && awardingAgency.id) innerComponent = /* @__PURE__ */ (0, import_jsx_runtime$52.jsx)(Link, {
			to: `/agency/${awardingAgency.agencySlug}`,
			children: innerComponent
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$52.jsxs)(AwardSection, {
			className: "award-overview__left-section__awarding award-overview-column first award-overview-column__spacing",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("h6", {
				className: "award-overview-title",
				children: "Awarding Agency"
			}), /* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("h5", {
				className: "award-overview__left-section__agency-name",
				children: innerComponent
			})]
		});
	};
	AwardingAgency.propTypes = propTypes$47;
}));
//#endregion
//#region src/js/dataMapping/award/awardOverview.js
var AddresskeysByAwardType, aggregateTextRecipientSection, aggregateGlossaryText, aggregateGlossaryLinks;
var init_awardOverview = __esmMin((() => {
	AddresskeysByAwardType = {
		financialAssistanceDomestic: [
			"streetAddress1",
			"_address2",
			"recipientRegionalAddress",
			"countryName",
			"recipientCongressionalDistrict"
		],
		financialAssistanceForeign: [
			"streetAddress1",
			"_address2",
			"recipientRegionalAddress",
			"countryName"
		],
		nonFinancialAssistanceDomestic: [
			"streetAddress1",
			"_address2",
			"recipientRegionalAddress",
			"countryName",
			"recipientCongressionalDistrict"
		],
		nonFinancialAssistanceForeign: [
			"streetAddress1",
			"_address2",
			"recipientRegionalAddressContractsAndIDV",
			"countryName"
		],
		redactedDueToPIIDomestic: [
			"recipientRegionalAddress",
			"countryName",
			"recipientCongressionalDistrict"
		],
		redactedDueToPIIForeign: ["recipientRegionalAddress", "countryName"],
		aggregatedByState: [
			"stateName",
			"countryName",
			"recipientCongressionalDistrict"
		],
		aggregatedByCounty: [
			"countyAndState",
			"countryName",
			"recipientCongressionalDistrict"
		],
		aggregatedByCountry: ["countryName"]
	};
	aggregateTextRecipientSection = {
		redactedDueToPIIDomestic: `For more information on this special recipient type,
        click the glossary link above.`,
		redactedDueToPIIForeign: `For more information on this special recipient type,
        click the glossary link above.`,
		aggregatedByState: `This record has been aggregated by state.
        For more information on this special recipient type, click the glossary link above`,
		aggregatedByCounty: `This record has been aggregated by county.
        For more information on this special recipient type, click on the glossary link above.`,
		aggregatedByCountry: `This record has been aggregated by country.
        For more information on this special recipient type, click the glossary link above.`
	};
	aggregateGlossaryText = {
		redactedDueToPIIDomestic: `Redacted Due To PII`,
		redactedDueToPIIForeign: `Redacted Due To PII`,
		aggregatedByState: "Multiple Recipients",
		aggregatedByCounty: "Multiple Recipients",
		aggregatedByCountry: "Multiple Recipients"
	};
	aggregateGlossaryLinks = {
		redactedDueToPIIDomestic: `redacted-due-to-pii`,
		redactedDueToPIIForeign: `redacted-due-to-pii`,
		aggregatedByState: "multiple-recipients",
		aggregatedByCounty: "multiple-recipients",
		aggregatedByCountry: "multiple-recipients"
	};
}));
//#endregion
//#region src/js/components/award/shared/overview/RecipientAddress.jsx
var import_jsx_runtime$51, propTypes$46, regEx, regExTest, RecipientAddress;
var init_RecipientAddress = __esmMin((() => {
	init_awardOverview();
	init_index_es();
	init_InfoTooltipContent();
	import_jsx_runtime$51 = require_jsx_runtime();
	propTypes$46 = {
		aggregateRecordType: PropTypes.string,
		recipientLocation: PropTypes.object
	};
	regEx = /* @__PURE__ */ new RegExp("[A-Za-z0-9]");
	regExTest = (string) => regEx.test(string);
	RecipientAddress = ({ recipientLocation, aggregateRecordType }) => {
		const arrayOfAddressKeysByAwardType = AddresskeysByAwardType[aggregateRecordType];
		const recipientAddress = arrayOfAddressKeysByAwardType.map((addressKey) => /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
			className: "award-overview__left-section__recipient__recipient-address__address-line award-overview__left-section__aggregated-text",
			children: recipientLocation[addressKey] || null
		}, addressKey));
		return /* @__PURE__ */ (0, import_jsx_runtime$51.jsxs)("div", {
			className: "award-overview__left-section__recipient-address-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
				className: "award-overview__left-section__recipient__recipient-address",
				children: !arrayOfAddressKeysByAwardType.map((addressKey) => recipientLocation[addressKey] || "").some(regExTest) ? "--" : recipientAddress
			}), /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
				className: "award-overview__left-section__recipient-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(ds, {
					className: "homepage__covid-19-tt",
					icon: "info",
					tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(CondensedCDTooltip, { title: "Congressional District" })
				})
			})]
		});
	};
	RecipientAddress.propTypes = propTypes$46;
}));
//#endregion
//#region src/js/components/award/shared/overview/Recipient.jsx
var import_jsx_runtime$50, propTypes$45, Recipient;
var init_Recipient = __esmMin((() => {
	init_development();
	init_awardSummaryHelper();
	init_awardOverview();
	init_AwardSection();
	init_RecipientAddress();
	init_GlossaryLink();
	import_jsx_runtime$50 = require_jsx_runtime();
	propTypes$45 = {
		recipient: PropTypes.object,
		awardType: PropTypes.string,
		recordType: PropTypes.number,
		awardId: PropTypes.string
	};
	Recipient = ({ recipient, awardType, recordType }) => {
		const isFinancialAssistance = isAwardFinancialAssistance(awardType);
		const formatRecipientLink = (internalId, name) => {
			if (internalId && name) return /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(Link, {
				to: `/recipient/${internalId}/latest`,
				children: name
			});
			else if (internalId) return /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(Link, {
				to: `/recipient/${internalId}/latest`,
				children: "Unknown"
			});
			return name;
		};
		const aggregateRecordType = () => getAwardTypeByRecordtypeCountyAndState(awardType, recipient.location, recordType);
		const recipientComponent = () => {
			const glossaryLink = aggregateGlossaryLinks[aggregateRecordType()];
			const glossaryLinkText = `View glossary definition of ${aggregateGlossaryText[aggregateRecordType()]}`;
			if (isFinancialAssistance && recordType !== 2) {
				let recipientTitle = "";
				if (recordType === 1) recipientTitle = "MULTIPLE RECIPIENTS";
				if (recordType === 3) recipientTitle = "REDACTED DUE TO PII";
				return /* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)("h5", {
					className: "award-overview__left-section__agency-name award-overview__left-section__agency-name__recipient",
					children: [recipientTitle, /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("div", {
						className: "award__heading-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(GlossaryLink, {
							alt: glossaryLinkText,
							term: glossaryLink,
							showHoverText: true
						})
					})]
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("h5", {
				className: "award-overview__left-section__agency-name award-overview__left-section__agency-name__recipient",
				children: formatRecipientLink(recipient.internalId, recipient.name)
			});
		};
		const aggregateRecordText = () => {
			if (isFinancialAssistance) return aggregateTextRecipientSection[aggregateRecordType()];
			return "";
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)(AwardSection, {
			className: "award-overview__left-section__recipient award-overview-column award-overview-column__spacing",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("h6", {
					className: "award-overview-title",
					children: "Recipient"
				}),
				recipientComponent(),
				/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(RecipientAddress, {
					recipientLocation: recipient.location,
					aggregateRecordType: aggregateRecordType()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("div", {
					className: "award-overview__left-section__aggregated-text",
					children: isFinancialAssistance && aggregateRecordText()
				})
			]
		});
	};
	Recipient.propTypes = propTypes$45;
}));
//#endregion
//#region src/js/components/award/shared/overview/AwardOverviewLeftSection.jsx
var import_jsx_runtime$49, propTypes$44, AwardOverviewLeftSection;
var init_AwardOverviewLeftSection = __esmMin((() => {
	init_AwardSection();
	init_AwardingAgency();
	init_Recipient();
	import_jsx_runtime$49 = require_jsx_runtime();
	propTypes$44 = {
		awardingAgency: PropTypes.object,
		recipient: PropTypes.object,
		recordType: PropTypes.number,
		awardType: PropTypes.string,
		awardId: PropTypes.string
	};
	AwardOverviewLeftSection = ({ awardingAgency, recipient, recordType, awardType, awardId }) => /* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)(AwardSection, {
		type: "column",
		className: "award-overview__left-section award-overview-column",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(AwardingAgency, { awardingAgency }), /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(Recipient, {
			recipient,
			recordType,
			awardType,
			awardId
		})]
	});
	AwardOverviewLeftSection.propTypes = propTypes$44;
}));
//#endregion
//#region src/js/components/award/shared/overview/RelatedAwards.jsx
/**
* RelatedAwards.jsx
* Created by Lizzie Salita 12/11/18
**/
var import_jsx_runtime$48, propTypes$43, RelatedAwards;
var init_RelatedAwards = __esmMin((() => {
	init_index_es();
	init_development();
	init_moneyFormatter();
	init_InfoTooltipContent();
	import_jsx_runtime$48 = require_jsx_runtime();
	propTypes$43 = {
		overview: PropTypes.object,
		jumpToSection: PropTypes.func,
		setRelatedAwardsTab: PropTypes.func,
		jumpToSubAwardHistoryTable: PropTypes.func,
		details: PropTypes.object
	};
	RelatedAwards = class extends React.Component {
		constructor(props) {
			super(props);
			this.jumpToReferencedAwardsTableChildAwardsTab = this.jumpToReferencedAwardsTableChildAwardsTab.bind(this);
			this.jumpToReferencedAwardsTableChildIDVsTab = this.jumpToReferencedAwardsTableChildIDVsTab.bind(this);
			this.jumpToReferencedAwardsTableGrandchildAwardsTab = this.jumpToReferencedAwardsTableGrandchildAwardsTab.bind(this);
		}
		jumpToReferencedAwardsTableChildAwardsTab() {
			this.props.setRelatedAwardsTab("child_awards");
			this.props.jumpToSection("referenced-awards");
		}
		jumpToReferencedAwardsTableChildIDVsTab() {
			this.props.setRelatedAwardsTab("child_idvs");
			this.props.jumpToSection("referenced-awards");
		}
		jumpToReferencedAwardsTableGrandchildAwardsTab() {
			this.props.setRelatedAwardsTab("grandchild_awards");
			this.props.jumpToSection("referenced-awards");
		}
		jumpToAwardHistoryTableSubAwardsTab = () => {
			this.props.jumpToSubAwardHistoryTable("subaward");
			this.props.jumpToSection("award-history");
		};
		referencedAwardCounts() {
			const { details, overview } = this.props;
			if (!details) return null;
			let childData = [];
			if (overview.category === "idv") childData = [
				{
					count: formatNumber(details.child_awards),
					name: "Child Award",
					funcName: "jumpToReferencedAwardsTableChildAwardsTab",
					glossary: "contract",
					postText: details.child_awards === 1 ? "Order" : "Orders"
				},
				{
					count: formatNumber(details.child_idvs),
					name: "Child IDV",
					funcName: "jumpToReferencedAwardsTableChildIDVsTab",
					glossary: "IDV",
					postText: details.child_idvs === 1 ? "Order" : "Orders"
				},
				{
					count: formatNumber(details.grandchild_awards),
					name: "Grandchild Award",
					funcName: "jumpToReferencedAwardsTableGrandchildAwardsTab",
					glossary: "award",
					postText: details.grandchild_awards === 1 ? "Order" : "Orders"
				}
			];
			else childData = [{
				count: formatNumber(details.subawardCount),
				name: "Sub-Awards",
				funcName: "jumpToAwardHistoryTableSubAwardsTab",
				glossary: "contract",
				postText: ""
			}];
			return /* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("div", {
				className: "related-awards__label related-awards__label_count",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("div", {
					className: "related-awards__counts",
					children: map(childData, (data) => /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("button", {
						className: "award-viz__button",
						onClick: this[`${data.funcName}`],
						children: data.count
					}, `${data.glossary}count`))
				}), /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("div", {
					className: "related-awards__description",
					children: map(childData, (data) => /* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("div", {
						className: "related-awards__text",
						children: [
							data.name,
							" ",
							data.postText
						]
					}, `${data.glossary}text`))
				})]
			});
		}
		tooltipInfo() {
			const { overview } = this.props;
			const awardType = overview.category;
			if (awardType === "idv") return summaryRelatedAwardsInfoIdv;
			if (awardType === "contract") return summaryRelatedAwardsInfo;
			if (awardType === "definitive contract") return null;
			if (awardType === "grant") return null;
			if (awardType === "loan") return null;
			if (awardType === "direct payment") return null;
			if (awardType === "other") return null;
			return null;
		}
		render() {
			const { overview } = this.props;
			const tooltipInfo = this.tooltipInfo();
			const awardTitle = "Parent Award Unique Key";
			let parentLink = "N/A";
			if (overview.parentAwardDetails.piid && overview.parentAwardDetails.awardId) parentLink = /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)(Link, {
				className: "related-awards__link",
				to: `/award/${overview.parentAwardDetails.awardId}`,
				children: overview.parentAwardDetails.awardId
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("div", {
				className: "award-viz related-awards award-overview-column award-overview-column__spacing first",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("h6", {
						className: "award-overview-title related-awards__title",
						children: ["Related Awards", /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)(ds, {
							className: "award-section-tt",
							icon: "info",
							tooltipPosition: "left",
							tooltipComponent: tooltipInfo
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("div", {
						className: "related-awards__parent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("div", {
							className: "related-awards__label",
							children: awardTitle
						}), parentLink]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("div", {
						className: "related-awards__children",
						children: this.referencedAwardCounts()
					})
				]
			});
		}
	};
	RelatedAwards.propTypes = propTypes$43;
}));
//#endregion
//#region src/js/dataMapping/award/datesSection.js
var titles;
var init_datesSection = __esmMin((() => {
	titles = {
		idv: ["Start Date", "Ordering Period End Date"],
		contract: [
			"Start Date",
			"Current End Date",
			"Potential End Date"
		],
		grant: ["Start Date", "End Date"],
		loan: ["Start Date", "End Date"],
		"direct payment": ["Start Date", "End Date"],
		insurance: ["Start Date", "End Date"],
		other: ["Start Date", "End Date"]
	};
}));
//#endregion
//#region src/js/components/sharedComponents/patterns/RectanglePattern.jsx
var import_jsx_runtime$47, propTypes$42, RectanglePattern;
var init_RectanglePattern = __esmMin((() => {
	import_jsx_runtime$47 = require_jsx_runtime();
	propTypes$42 = {
		patternProps: PropTypes.object,
		rectangles: PropTypes.array
	};
	RectanglePattern = ({ patternProps, rectangles }) => {
		if (!patternProps || !rectangles) return null;
		const { id, width, height, patternTransform, patternUnits } = patternProps;
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("pattern", {
			id,
			width,
			height,
			patternTransform,
			patternUnits,
			children: rectangles.map((rectangle) => /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("rect", {
				width: rectangle.width,
				height: rectangle.height,
				fill: rectangle.fill
			}, rectangle.key))
		});
	};
	RectanglePattern.propTypes = propTypes$42;
}));
//#endregion
//#region src/js/components/award/shared/overview/ProgressBar.jsx
/**
* ProgressBar.jsx
* Created by Jonathan Hill 11/26/19
**/
var import_jsx_runtime$46, propTypes$41, ProgressBar;
var init_ProgressBar = __esmMin((() => {
	init_src();
	init_RectanglePattern();
	import_jsx_runtime$46 = require_jsx_runtime();
	propTypes$41 = {
		heightOfSVG: PropTypes.number,
		heightOfProgressBar: PropTypes.number,
		width: PropTypes.number,
		domain: PropTypes.array,
		milestones: PropTypes.array,
		currentProgress: PropTypes.number,
		awardType: PropTypes.string,
		progressText: PropTypes.string,
		textAdjustment: PropTypes.object,
		badDomainData: PropTypes.bool,
		descriptions: PropTypes.object
	};
	ProgressBar = class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				xScaleProgressBar: null,
				xScaleWithinCircles: null,
				thirdCircleData: 0,
				badDomainData: false,
				milestoneData: [],
				showMilestones: false,
				progressVerticalLineData: {},
				progressBarPatternData: {},
				progressTriangleData: "",
				progressTextData: {},
				progressTextPosition: null
			};
			this.textDiv = null;
			this.setTextDiv = (element) => {
				this.textDiv = element;
				this.positionText();
			};
		}
		componentDidUpdate(prevProps) {
			if (prevProps.width !== this.props.width || prevProps.domain !== this.props.domain || prevProps.milestones !== this.props.milestones) {
				this.validateDomainAndMilestones();
				this.positionText();
			}
		}
		badDomainData = () => {
			const { currentProgress, domain, badDomainData } = this.props;
			if (badDomainData) return true;
			pull(domain, null, void 0, "");
			if (domain.length !== 2) return true;
			if (domain[0] > domain[1]) return true;
			if (this.props.milestones.reduce((acc, milestone) => {
				if (milestone.data > domain[1]) {
					acc.badData++;
					return acc;
				}
				if (milestone.data < domain[0]) {
					acc.badData++;
					return acc;
				}
				return acc;
			}, { badData: 0 }).badData > 0) return true;
			if (!currentProgress) return true;
			return false;
		};
		validateDomainAndMilestones = () => {
			const badDomainData = this.badDomainData();
			this.setState({ badDomainData }, this.createXScales);
		};
		createXScales = () => {
			const { domain } = this.props;
			const { width } = this.props;
			const { heightOfProgressBar } = this.props;
			const xScaleProgressBar = linear().domain(domain).range([0, width]);
			const progressWithinCirclesStartPX = heightOfProgressBar;
			const progressWithinCirclesEndPX = width - heightOfProgressBar;
			const xScaleWithinCircles = linear().domain(domain).range([progressWithinCirclesStartPX, progressWithinCirclesEndPX]);
			this.setState({
				xScaleProgressBar,
				xScaleWithinCircles
			}, this.milestoneData);
		};
		milestoneData = () => {
			const { domain, milestones, width, heightOfProgressBar, descriptions } = this.props;
			const { xScaleProgressBar, xScaleWithinCircles } = this.state;
			const halfVisualizationHeight = heightOfProgressBar / 2;
			const progressMilestones = milestones || [];
			const startPosition = xScaleProgressBar(domain[0]);
			const endPosition = width;
			progressMilestones.unshift({
				data: domain[0],
				className: "progress-bar-shapes__starting-circle",
				description: descriptions.startDescription,
				cx: startPosition + halfVisualizationHeight,
				position: startPosition + halfVisualizationHeight,
				visualizationStart: startPosition,
				visualizationEnd: startPosition + heightOfProgressBar
			});
			progressMilestones.push({
				data: domain[1],
				className: "progress-bar-shapes__ending-circle",
				description: descriptions.endDescription,
				cx: endPosition - halfVisualizationHeight,
				position: endPosition - halfVisualizationHeight,
				visualizationStart: endPosition - heightOfProgressBar,
				visualizationEnd: endPosition
			});
			const milestoneData = progressMilestones.map((milestone) => {
				const position = xScaleWithinCircles(milestone.data);
				const circleStart = position - halfVisualizationHeight;
				const circleEnd = position + halfVisualizationHeight;
				return {
					key: `${uniqueId(milestone.data)}`,
					description: milestone.description,
					className: milestone.className,
					cx: milestone.cx || position,
					cy: halfVisualizationHeight,
					r: halfVisualizationHeight,
					visualizationStart: milestone.visualizationStart || circleStart,
					visualizationEnd: milestone.visualizationEnd || circleEnd,
					display: false
				};
			});
			this.setState({ milestoneData }, this.showMilestones);
		};
		showMilestones = () => {
			const { milestoneData } = this.state;
			const lastMilestoneIndex = milestoneData.length - 1;
			const displayMilestoneData = milestoneData.map((milestone, index, array) => {
				const milestoneObject = { ...milestone };
				if (index !== 0 && index !== lastMilestoneIndex) {
					const startMilestoneEndPosition = array[0].visualizationEnd;
					const endMilestoneStartPosition = array[lastMilestoneIndex].visualizationStart;
					if (milestone.visualizationStart > startMilestoneEndPosition && milestone.visualizationEnd < endMilestoneStartPosition) milestoneObject.display = true;
					return milestoneObject;
				}
				milestoneObject.display = true;
				return milestoneObject;
			});
			return this.setState({ milestoneData: displayMilestoneData }, this.progressVerticalLineData);
		};
		progressVerticalLineData = () => {
			const { milestoneData, xScaleWithinCircles } = this.state;
			const { currentProgress, domain, descriptions, heightOfProgressBar } = this.props;
			const position = xScaleWithinCircles(currentProgress);
			const progressVerticalLineData = {
				className: "progress-bar-shapes__progress-vertical-line",
				description: descriptions.progressVerticalLineDescription,
				key: `progress-line`,
				x1: position,
				x2: position,
				y1: 0,
				y2: heightOfProgressBar,
				visualizationStart: position,
				visualizationEnd: position,
				display: true
			};
			milestoneData.forEach((milestone, index, array) => {
				if (progressVerticalLineData.visualizationEnd > milestone.visualizationStart && progressVerticalLineData.visualizationStart < milestone.visualizationEnd) {
					if (array.length > 2 && array[1].display) progressVerticalLineData.display = false;
				}
				if (index + 1 === array.length && progressVerticalLineData.visualizationEnd > milestone.visualizationStart) progressVerticalLineData.display = false;
			});
			if (!(domain[0] < currentProgress && currentProgress < domain[1])) progressVerticalLineData.display = false;
			this.setState({ progressVerticalLineData }, this.progressTriangleData);
		};
		progressTriangleData = () => {
			const { xScaleWithinCircles } = this.state;
			const { currentProgress, heightOfProgressBar } = this.props;
			const position = xScaleWithinCircles(currentProgress);
			const adjustXPosition = heightOfProgressBar / 3;
			const adjustYPosition = heightOfProgressBar / 2;
			const points = [
				`${position},${heightOfProgressBar}`,
				`${position - adjustXPosition},${heightOfProgressBar + adjustYPosition}`,
				`${position + adjustXPosition},${heightOfProgressBar + adjustYPosition}`
			].join(" ");
			this.setState({ progressTriangleData: points }, this.progressBarPatternData);
		};
		progressBarPatternData = () => {
			const { awardType, heightOfProgressBar } = this.props;
			const { milestoneData, progressVerticalLineData } = this.state;
			const patternProps = {
				id: "progressBarPattern",
				height: `${heightOfProgressBar}`,
				width: "100%"
			};
			const rectangles = [];
			let currentToPotentialPattern = null;
			let progressPatternPosition = progressVerticalLineData.x1;
			let backgroundPatternRectangleWidth = "100%";
			if (awardType && (awardType === "contract" || awardType === "definitive contract")) {
				if (milestoneData[1].display) {
					currentToPotentialPattern = {
						key: "currentToPotentialPattern",
						height: `${heightOfProgressBar}`,
						width: "100%",
						fill: "#fff1d2"
					};
					const positionOfThirdCircle = milestoneData[1].cx;
					backgroundPatternRectangleWidth = positionOfThirdCircle;
					if (progressPatternPosition > positionOfThirdCircle) progressPatternPosition = positionOfThirdCircle;
				}
			}
			const backgroundPatternRectangleProps = {
				key: "BackgroundProgressBarRectPattern",
				height: `${heightOfProgressBar}`,
				width: backgroundPatternRectangleWidth,
				fill: "#f1f1f1"
			};
			const progressPattern = {
				key: "progressPattern",
				height: `${heightOfProgressBar}`,
				width: progressPatternPosition,
				fill: "#d6d7d9"
			};
			rectangles.push(currentToPotentialPattern, backgroundPatternRectangleProps, progressPattern);
			const progressBarPatternData = {
				patternProps,
				rectangles: compact(rectangles)
			};
			this.setState({ progressBarPatternData }, this.progressTextData);
		};
		progressTextData = () => {
			const { progressText, heightOfProgressBar, textAdjustment, currentProgress } = this.props;
			const { xScaleWithinCircles, badDomainData, progressTextPosition } = this.state;
			const textPosition = xScaleWithinCircles(currentProgress);
			const progressTextData = {
				className: "progress-bar-shapes__progress-text",
				x: (progressTextPosition || textPosition) - (textAdjustment.x || 0),
				y: heightOfProgressBar + textAdjustment.y,
				text: progressText,
				display: true
			};
			if (!currentProgress || badDomainData || currentProgress >= this.props.domain[1] || currentProgress <= this.props.domain[0]) progressTextData.display = false;
			this.setState({ progressTextData });
		};
		positionText = () => {
			const { progressTextData, xScaleWithinCircles } = this.state;
			const { currentProgress } = this.props;
			if (this.textDiv && progressTextData.x) {
				let textPosition = null;
				const width = this.textDiv.getBoundingClientRect().width;
				textPosition = xScaleWithinCircles(currentProgress) - width / 2;
				const pixelsAvailableToTheEndOfTheVis = xScaleWithinCircles(this.props.domain[1]) - xScaleWithinCircles(currentProgress) + this.props.heightOfProgressBar;
				const halfTheTextWidth = width / 2;
				if (pixelsAvailableToTheEndOfTheVis < halfTheTextWidth) {
					const widthOvershowing = halfTheTextWidth - pixelsAvailableToTheEndOfTheVis;
					textPosition -= widthOvershowing + 2;
				}
				if (textPosition < 0) textPosition = 0;
				if (textPosition) return this.setState({ progressTextPosition: textPosition }, this.progressTextData);
			}
			return null;
		};
		progressText = () => {
			const { progressTextData, badDomainData } = this.state;
			if (!progressTextData.display || badDomainData) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
				tabIndex: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("desc", { children: this.props.descriptions.progressTextDescription }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("text", {
					className: progressTextData.className,
					x: progressTextData.x,
					y: progressTextData.y,
					ref: this.setTextDiv,
					children: progressTextData.text
				})]
			});
		};
		progressBar = () => {
			const { width, heightOfProgressBar, descriptions } = this.props;
			const rectHeight = heightOfProgressBar / 2;
			const startPosition = 0;
			const endPosition = width;
			const style = { fill: "url(#progressBarPattern)" };
			const description = descriptions.progressDescription;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
				tabIndex: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("rect", {
					className: "progress-bar-shapes__base-rectangle",
					style,
					x: startPosition,
					y: 0,
					rx: rectHeight,
					ry: rectHeight,
					width: endPosition - startPosition,
					height: heightOfProgressBar
				})]
			});
		};
		createCircle = (circleData) => {
			if (!circleData) return null;
			const { description, key, className, cx, cy, r } = circleData;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
				tabIndex: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("circle", {
					className,
					cx,
					cy,
					r
				})]
			}, key);
		};
		createLine = (lineData) => {
			if (!lineData) return null;
			if (!lineData.display) return null;
			const { className, description, key, x1, x2, y1, y2 } = lineData;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
				tabIndex: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("line", {
					className,
					x1,
					x2,
					y1,
					y2
				})]
			}, key);
		};
		progressTriangle = () => /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
			tabIndex: "0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("desc", { children: this.props.descriptions.progressTriangleDescription }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("polygon", {
				points: this.state.progressTriangleData,
				className: "progress-bar-shapes__polygon"
			})]
		});
		milestones = () => compact(this.state.milestoneData.filter((milestone) => milestone.display)).map((milestone) => this.createCircle({
			key: `${uniqueId(milestone.data)}`,
			description: milestone.description,
			className: milestone.className,
			cx: milestone.cx,
			cy: milestone.cy,
			r: milestone.r
		}));
		progressVerticalLine = () => this.createLine(this.state.progressVerticalLineData);
		progressBarPattern = () => {
			const { progressBarPatternData } = this.state;
			if (isEmpty(progressBarPatternData)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(RectanglePattern, {
				patternProps: progressBarPatternData.patternProps,
				rectangles: progressBarPatternData.rectangles
			});
		};
		render() {
			const { xScaleProgressBar, xScaleWithinCircles, badDomainData } = this.state;
			const { heightOfSVG, width } = this.props;
			if (!xScaleProgressBar || !xScaleWithinCircles || badDomainData) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("svg", {
				className: "progress-bar",
				width,
				height: heightOfSVG,
				children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
					className: "progress-bar-shapes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("defs", { children: this.progressBarPattern() }), this.progressBar()] }),
						this.milestones(),
						this.progressVerticalLine(),
						this.progressText(),
						this.progressTriangle()
					]
				})
			});
		}
	};
	ProgressBar.propTypes = propTypes$41;
}));
//#endregion
//#region src/js/components/award/shared/overview/AwardDates.jsx
/**
* IdvDates.jsx now AwardDates
* Created by Lizzie Salita 12/10/18
**/
var import_jsx_runtime$45, dayjs$3, propTypes$40, progressDescriptions, AwardDates;
var init_AwardDates = __esmMin((() => {
	init_index_es();
	init_tooltips();
	init_datesSection();
	init_awardSummaryHelper();
	init_ProgressBar();
	import_jsx_runtime$45 = require_jsx_runtime();
	dayjs$3 = require_dayjs_min();
	propTypes$40 = {
		dates: PropTypes.object,
		awardType: PropTypes.string
	};
	progressDescriptions = () => {
		return {
			progressDescription: "A rectangle of color grey representing the period of progress",
			startDescription: "A circle of color green representing the start of progress",
			endDescription: "A circle of color red representing the end of progress",
			lineDescription: "A line of color gray representing current progress",
			progressVerticalLineDescription: "A vertical line of color gray representing current progress",
			progressTriangleDescription: "A triangle of color gray representing the current progress",
			progressTextDescription: "Text with value Today of color gray representing value of progress"
		};
	};
	AwardDates = class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				windowWidth: 0,
				visualizationWidth: 0
			};
		}
		componentDidMount = () => {
			this.handleWindowResize();
			window.addEventListener("resize", this.handleWindowResize);
		};
		componentWillUnmount() {
			window.removeEventListener("resize", this.handleWindowResize);
		}
		handleWindowResize = throttle(() => {
			const windowWidth = window.innerWidth;
			if (this.state.windowWidth !== windowWidth) this.setState({
				windowWidth,
				visualizationWidth: this.datesDivWidth.offsetWidth
			});
		}, 50);
		datesData = () => {
			const { dates, awardType } = this.props;
			const { startDate, endDate, currentEndDate } = datesByDateType(dates, awardType);
			return {
				start: startDate.valueOf(),
				end: endDate.valueOf(),
				currentEndDate: currentEndDate ? currentEndDate.valueOf() : null
			};
		};
		datesSection = () => {
			const { startDateLong, endDateLong, potentialEndDateLong } = this.props.dates;
			const datesTitles = this.titles();
			const readableDates = [
				startDateLong,
				endDateLong,
				potentialEndDateLong
			];
			return datesTitles.map((title, index) => {
				let circleClassName = "award-dates__circle-top";
				if (datesTitles[index] === "Current End Date") circleClassName = "award-dates__circle-middle";
				if (datesTitles[index] === "Ordering Period End Date" || datesTitles[index] === "End Date" || datesTitles[index] === "Potential End Date") circleClassName = "award-dates__circle-bottom";
				return /* @__PURE__ */ (0, import_jsx_runtime$45.jsxs)("div", {
					className: "award-dates__row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$45.jsxs)("div", {
						className: "award-dates__label-container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("div", { className: `award-dates__circle ${circleClassName}` }), /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("div", {
							className: "award-dates__label",
							children: datesTitles[index]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("div", {
						className: "award-dates__date",
						children: readableDates[index] || "not provided"
					})]
				}, title);
			});
		};
		titles() {
			const { awardType } = this.props;
			if (!awardType) return [
				"",
				"",
				""
			];
			return compact([
				titles[awardType][0],
				titles[awardType][1],
				titles[awardType][2]
			]);
		}
		render() {
			const { awardType, dates } = this.props;
			const thisIsAContract = isContract(awardType);
			const { start, end, currentEndDate } = this.datesData();
			const badDomainData = isBadDates(datesByDateType(dates, awardType), awardType);
			const endDate = dayjs$3(end).add(1, "d").valueOf();
			const currentEnd = dayjs$3(currentEndDate).add(1, "d").valueOf();
			const tooltipInfo = getToolTipBySectionAndAwardType("dates", awardType);
			const milestones = thisIsAContract ? [{
				data: currentEnd,
				className: "progress-bar-shapes__milestone-circle",
				description: "A circle of color gold representing the current end date"
			}] : [];
			return /* @__PURE__ */ (0, import_jsx_runtime$45.jsxs)("div", {
				className: "award-dates award-overview-column award-overview-column__spacing",
				ref: (widthRef) => {
					this.datesDivWidth = widthRef;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("div", {
						className: "award-dates__heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime$45.jsxs)("h6", {
							className: "award-overview-title award-dates__title",
							children: ["Dates", /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(ds, {
								className: "award-section-tt",
								icon: "info",
								pointerPostion: "left",
								tooltipComponent: tooltipInfo
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(ProgressBar, {
						domain: [start, endDate],
						heightOfSVG: 40,
						heightOfProgressBar: 10,
						width: this.state.visualizationWidth,
						currentProgress: dayjs$3().valueOf(),
						milestones,
						progressText: "Today",
						badDomainData,
						textAdjustment: {
							x: 0,
							y: 20
						},
						awardType: this.props.awardType,
						descriptions: progressDescriptions()
					}),
					this.datesSection()
				]
			});
		}
	};
	AwardDates.propTypes = propTypes$40;
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDAOverview.jsx
var import_jsx_runtime$44, propTypes$39, CFDAOverview;
var init_CFDAOverview = __esmMin((() => {
	init_index_es();
	init_InfoTooltipContent();
	import_jsx_runtime$44 = require_jsx_runtime();
	propTypes$39 = {
		cfdaProgram: PropTypes.string,
		cfdaCount: PropTypes.number,
		jumpToSection: PropTypes.func,
		updateCFDAOverviewLinkClicked: PropTypes.func
	};
	CFDAOverview = ({ cfdaProgram, cfdaCount, jumpToSection, updateCFDAOverviewLinkClicked }) => {
		const jumpToCFDASection = () => {
			updateCFDAOverviewLinkClicked(true);
			jumpToSection("cfda");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
			className: "award-overview__right-section__cfda award-overview-column first award-overview-column__spacing award-viz",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("h6", {
				className: "award-overview-title",
				children: [cfdaCount === 1 ? "Assistance Listings (CFDA Programs)" : "Primary Assistance Listings (CFDA Programs)", /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(ds, {
					className: "award-section-tt",
					icon: "info",
					tooltipPosition: "left",
					tooltipComponent: CFDAOverviewInfo
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
				className: "award-overview__body award-overview__cfda",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", { children: cfdaProgram }), /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("button", {
					className: "award-viz__button",
					onClick: jumpToCFDASection,
					children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
						className: "award-viz__link-text",
						children: cfdaCount === 1 ? "VIEW MORE INFO ABOUT THIS PROGRAM" : `VIEW ALL ${cfdaCount} CFDA PROGRAMS`
					})
				}, "cfda") })]
			})]
		});
	};
	CFDAOverview.propTypes = propTypes$39;
}));
//#endregion
//#region src/js/components/award/shared/overview/AwardOverviewRightSection.jsx
var import_jsx_runtime$43, propTypes$38, AwardOverviewRightSection;
var init_AwardOverviewRightSection = __esmMin((() => {
	init_AwardSection();
	init_RelatedAwards();
	init_AwardDates();
	init_CFDAOverview();
	import_jsx_runtime$43 = require_jsx_runtime();
	propTypes$38 = {
		jumpToSubAwardHistoryTable: PropTypes.func,
		setRelatedAwardsTab: PropTypes.func,
		jumpToSection: PropTypes.func,
		details: PropTypes.object,
		overview: PropTypes.object,
		updateCFDAOverviewLinkClicked: PropTypes.func
	};
	AwardOverviewRightSection = ({ jumpToSubAwardHistoryTable, setRelatedAwardsTab, jumpToSection, details, overview, updateCFDAOverviewLinkClicked }) => {
		const firstSection = overview.category !== "idv" && overview.category !== "contract" ? /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(CFDAOverview, {
			cfdaProgram: overview.cfdaProgram,
			cfdaCount: overview.cfdaList.length,
			jumpToSection,
			updateCFDAOverviewLinkClicked
		}) : /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(RelatedAwards, {
			jumpToSubAwardHistoryTable,
			setRelatedAwardsTab,
			jumpToSection,
			details,
			overview
		});
		const dates = overview.category === "idv" ? overview.dates : overview.periodOfPerformance;
		return /* @__PURE__ */ (0, import_jsx_runtime$43.jsxs)(AwardSection, {
			type: "column",
			className: "award-overview__right-section award-overview-column",
			children: [firstSection, /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(AwardDates, {
				awardType: overview.category,
				dates
			})]
		});
	};
	AwardOverviewRightSection.propTypes = propTypes$38;
}));
//#endregion
//#region src/js/models/v2/award/BaseFederalAccount.js
var BaseFederalAccount;
var init_BaseFederalAccount = __esmMin((() => {
	init_moneyFormatter();
	BaseFederalAccount = class {
		constructor(data, total) {
			this._federalAccountName = data.account_title || "";
			this._obligatedAmount = data.total_transaction_obligated_amount || 0;
			this._federalAccount = data.federal_account || "";
			this._percent = data.total_transaction_obligated_amount / total * 100;
			this._fundingAgencyName = data.funding_agency_name || "";
			this._fundingAgencyAbbreviation = data.funding_agency_abbreviation || "";
			this._fundingAgencyId = data.funding_agency_id || "";
			this._fundingAgencySlug = data.funding_agency_slug || "";
			this._total = total || 0;
			Object.defineProperties(this, {
				federalAccountName: {
					enumerable: true,
					get: () => {
						const maxChars = 36;
						const upperName = this._federalAccountName.toUpperCase();
						if (upperName.length <= maxChars) return upperName;
						return `${upperName.substring(0, 36)}...`;
					}
				},
				obligatedAmount: {
					enumerable: true,
					get: () => formatMoney(this._obligatedAmount)
				},
				federalAccount: {
					enumerable: true,
					get: () => this._federalAccount || ""
				},
				percent: {
					enumerable: true,
					get: () => {
						if (this._obligatedAmount < 0) return "N/A";
						if (this._obligatedAmount === 0) return "0%";
						const decimal = this._percent.toFixed(2);
						if (decimal === "0.00") return "Less than 0.01%";
						if (decimal[0] !== "0") {
							const end = decimal.length - 3;
							return `${decimal.slice(0, end)}%`;
						}
						return `${decimal}%`;
					}
				},
				fundingAgencyName: {
					enumerable: true,
					get: () => {
						const maxChars = 36;
						const upperName = this._fundingAgencyName.toUpperCase();
						if (upperName.length <= maxChars) return upperName;
						return `${upperName.substring(0, 36)}...`;
					}
				},
				fundingAgencyAbbreviation: {
					enumerable: true,
					get: () => this._fundingAgencyAbbreviation || ""
				},
				fundingAgencySlug: {
					enumerable: true,
					get: () => this._fundingAgencySlug || ""
				}
			});
		}
	};
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsTreeTooltip.jsx
/**
* FederalAccountsTreeTooltip.jsx
* Created by Jonathan Hill 5/2/19
*/
var import_jsx_runtime$42, propTypes$37, FederalAccountsTreeTooltip;
var init_FederalAccountsTreeTooltip = __esmMin((() => {
	import_jsx_runtime$42 = require_jsx_runtime();
	propTypes$37 = {
		y: PropTypes.number,
		x: PropTypes.number,
		_federalAccountName: PropTypes.string,
		_obligatedAmount: PropTypes.number,
		_percent: PropTypes.number,
		_fundingAgencyName: PropTypes.string,
		_fundingAgencyAbbreviation: PropTypes.string,
		_fundingAgencyId: PropTypes.number,
		federalAccountName: PropTypes.string,
		obligatedAmount: PropTypes.string,
		percent: PropTypes.string,
		fundingAgencyName: PropTypes.string,
		fundingAgencyAbbreviation: PropTypes.string,
		fundingAgencyId: PropTypes.number
	};
	FederalAccountsTreeTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				direction: "top",
				tooltipStyle: { transform: "" },
				windowWidth: 0,
				windowHeight: 0
			};
			this.measureWindow = this.measureWindow.bind(this);
		}
		componentDidMount() {
			this.measureWindow();
			window.addEventListener("resize", this.measureWindow);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) this.positionTooltip();
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWindow);
		}
		measureWindow() {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.setState({
				windowWidth,
				windowHeight
			}, () => {
				this.positionTooltip();
			});
		}
		positionTooltip() {
			const tooltipWidth = this.div.offsetWidth;
			let direction = "top";
			let adjustedX = this.props.x - tooltipWidth / 2;
			if (this.props.x + tooltipWidth >= this.state.windowWidth) {
				direction = "right";
				adjustedX = this.props.x - tooltipWidth - 20;
			}
			this.setState({
				direction,
				tooltipStyle: { transform: `translate(${adjustedX}px,${this.props.y}px)` }
			});
		}
		render() {
			const { percent, obligatedAmount, _federalAccountName } = this.props;
			const subtitle = `${this.props._fundingAgencyName} (${this.props._fundingAgencyAbbreviation})`;
			return /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
				className: "visualization-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
					className: `tooltip ${this.state.direction}`,
					style: this.state.tooltipStyle,
					ref: (div) => {
						this.div = div;
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", { className: `tooltip-pointer ${this.state.direction}` }),
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
							className: "tooltip-title",
							children: _federalAccountName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
							className: "tooltip-subtitle",
							children: ["FUNDING AGENCY: ", subtitle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
							className: "tooltip-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
								className: "tooltip-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
									className: "tooltip-value",
									children: obligatedAmount
								}), /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
									className: "tooltip-label",
									children: "Funded Amount"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
								className: "tooltip-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
									className: "tooltip-value",
									children: percent
								}), /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
									className: "tooltip-label",
									children: "Percent of Total"
								})]
							})]
						})
					]
				})
			});
		}
	};
	FederalAccountsTreeTooltip.propTypes = propTypes$37;
}));
//#endregion
//#region src/js/dataMapping/award/federalAccountSectionTable.js
var tableMapping$1;
var init_federalAccountSectionTable = __esmMin((() => {
	tableMapping$1 = {
		federalAccountName: {
			displayName: "Federal Account",
			field: "account_title",
			classname: "federal-accounts-table__body-cell",
			href: "/federal_account/"
		},
		obligatedAmount: {
			displayName: "Combined Obligated Amount",
			field: "total_transaction_obligated_amount",
			classname: "federal-accounts-table__body-cell right offset-right"
		},
		percent: {
			displayName: "Percent of Total",
			field: "total_transaction_obligated_amount",
			classname: "federal-accounts-table__body-cell right"
		},
		fundingAgencyName: {
			displayName: "Funding Agency",
			classname: "federal-accounts-table__body-cell offset-left",
			href: "/agency/"
		}
	};
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsTable.jsx
/**
* FederalAccountsTable.jsx
* Created by Jonathan Hill 3/25/19
**/
var import_jsx_runtime$41, FederalAccountsTable;
var init_FederalAccountsTable = __esmMin((() => {
	init_index_es();
	init_development();
	init_federalAccountSectionTable();
	init_StateLandingTableSorter();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_NoResultsMessage();
	import_jsx_runtime$41 = require_jsx_runtime();
	FederalAccountsTable = class extends React.Component {
		static propTypes = {
			page: PropTypes.number,
			limit: PropTypes.number,
			sort: PropTypes.string,
			order: PropTypes.string,
			total: PropTypes.number,
			federalAccounts: PropTypes.array,
			changePage: PropTypes.func,
			updateSort: PropTypes.func,
			inFlight: PropTypes.bool,
			error: PropTypes.bool
		};
		getHeaders() {
			const { sort, order, updateSort } = this.props;
			return map(tableMapping$1, (header) => /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("th", {
				className: "federal-accounts-table__head-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
					className: "header-cell",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
						className: "header-cell__text",
						children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
							className: "header-cell__title",
							children: header.displayName
						})
					}), header.field && /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(StateLandingTableSorter, {
						field: header.field,
						label: header.displayName,
						active: {
							field: sort,
							direction: order
						},
						setSort: updateSort
					})]
				})
			}, header.displayName));
		}
		getRows() {
			return this.props.federalAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("tr", {
				className: "federal-accounts-table__body-row",
				children: map(tableMapping$1, (header, key) => {
					let cellData = account[key];
					if (key === "federalAccountName") cellData = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(Link, {
						to: `/federal_account/${account.federalAccount}`,
						children: account[key]
					});
					else if (key === "fundingAgencyName") cellData = account._fundingAgencySlug ? /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(Link, {
						to: `/agency/${account._fundingAgencySlug}`,
						children: `(${account._fundingAgencyAbbreviation}) ${account[key]}`
					}) : "--";
					return /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("td", {
						className: header.classname,
						children: cellData
					}, `${uniqueId()}`);
				})
			}, `row-${uniqueId()}`));
		}
		renderTable() {
			if (this.props.federalAccounts.length > 0 && !this.props.error && !this.props.inFlight) return /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
				className: "federal-accounts-table-renderer",
				children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("table", {
					className: "federal-accounts-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("thead", {
						className: "federal-accounts-table__head",
						children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("tr", {
							className: "federal-accounts-table__head-row",
							children: this.getHeaders()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("tbody", { children: this.getRows() })]
				})
			});
			return null;
		}
		render() {
			const { inFlight, error, federalAccounts } = this.props;
			let loadingMessage = null;
			let errorMessage = null;
			let noResultsMessage = null;
			let pagination = null;
			if (inFlight) loadingMessage = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(ResultsTableLoadingMessage, {});
			if (error) errorMessage = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(ResultsTableErrorMessage, {});
			if (federalAccounts.length === 0 && !error && !inFlight) noResultsMessage = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(NoResultsMessage, {
				title: "Chart Not Available",
				message: "No available data to display."
			});
			if (federalAccounts.length > 0 && !error && !inFlight) pagination = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(Ka, {
				resultsText: true,
				totalItems: this.props.total,
				pageSize: this.props.limit,
				currentPage: this.props.page,
				changePage: this.props.changePage
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
				className: "federal-accounts-table-holder",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
						className: "results-table-message-container",
						children: [
							loadingMessage,
							errorMessage,
							noResultsMessage
						]
					}),
					this.renderTable(),
					pagination
				]
			});
		}
	};
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsTree.jsx
/**
* FederalAccountsTree.jsx
* Created by Jonathan Hill 5/1/19
*/
var import_jsx_runtime$40, truncateText, propTypes$36, FederalAccountsTree;
var init_FederalAccountsTree = __esmMin((() => {
	init_src$2();
	init_src();
	init_textMeasurement();
	init_moneyFormatter();
	init_TreemapCell();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_NoResultsMessage();
	import_jsx_runtime$40 = require_jsx_runtime();
	truncateText = (text, type, maxWidth) => {
		let label = text;
		let labelWidth = 0;
		if (type === "title") labelWidth = measureTreemapHeader(text);
		else if (type === "subtitle") labelWidth = measureTreemapValue(text);
		if (labelWidth > maxWidth) {
			const characterWidth = Math.ceil(labelWidth / text.length);
			const availableWidth = maxWidth - 30;
			let availableLength = Math.floor(availableWidth / characterWidth);
			if (availableLength < 1) availableLength = 1;
			if (availableLength < text.length) label = `${label.substring(0, availableLength)}...`;
		}
		return label;
	};
	propTypes$36 = {
		data: PropTypes.array,
		width: PropTypes.number,
		height: PropTypes.number,
		goDeeper: PropTypes.func,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		inFlight: PropTypes.bool,
		error: PropTypes.bool
	};
	FederalAccountsTree = ({ data, width, height = 294, goDeeper, showTooltip, hideTooltip, inFlight, error }) => {
		const [virtualChart, setVirtualChart] = useState([]);
		const buildVirtualCell = useCallback((item, scale, usableWidth) => {
			const itemHeight = item.y1 - item.y0;
			const itemWidth = item.x1 - item.x0;
			const amount = item.data._obligatedAmount;
			const units = calculateUnitForSingleValue(amount, 1);
			const formattedSubtitle = `${formatMoneyWithPrecision(amount / units.unit, 1)}${units.unitLabel}`;
			const name = item.data._federalAccountName;
			const title = truncateText(name, "title", usableWidth);
			const subtitle = truncateText(formattedSubtitle, "subtitle", usableWidth);
			const color = scale(amount);
			return {
				width: itemWidth,
				height: itemHeight,
				x: item.x0,
				y: item.y0,
				data: item.data,
				color,
				title: {
					text: title,
					x: itemWidth / 2,
					y: itemHeight / 2 - 5
				},
				subtitle: {
					text: subtitle,
					x: itemWidth / 2,
					y: itemHeight / 2 + 15
				}
			};
		}, []);
		const buildVirtualChart = useCallback(() => {
			remove(data, (account) => parseFloat(account._obligatedAmount) <= 0);
			const treemapData = hierarchy({ children: data }).sum((d) => d._obligatedAmount).sort((a, b) => b.value - a.value);
			const treeItems = treemap_default().size([width, height]).tile(binary_default).paddingInner(5).round(true)(treemapData).leaves();
			if (treeItems.length === 0 || data.length === 0) {
				setVirtualChart([]);
				return;
			}
			const maxValue = treeItems[0].data._obligatedAmount;
			const minValue = treeItems[treeItems.length - 1].data._obligatedAmount;
			let scale = linear().domain([minValue, maxValue]).range(["#f2f6f9", "#9bb1cf"]);
			if (treeItems.length === 1) scale = () => "#47BAD9";
			const cells = [];
			treeItems.forEach((item) => {
				const cell = buildVirtualCell(item, scale, width);
				cells.push(cell);
			});
			setVirtualChart(cells);
		}, [
			buildVirtualCell,
			data,
			height,
			width
		]);
		useEffect(() => {
			buildVirtualChart();
		}, [buildVirtualChart]);
		const selectedCell = (id, title) => {
			if (goDeeper) goDeeper(id, title);
		};
		if (width <= 0) return null;
		const noResults = virtualChart.length === 0;
		const naming = virtualChart.length === 1 ? "result" : "results";
		let loadingMessage = null;
		let errorMessage = null;
		let noResultsMessage = null;
		let resultsCount = null;
		let treeMap = null;
		const cells = virtualChart.map((cell) => /* @__PURE__ */ createElement(TreemapCell, {
			...cell,
			highlightColor: "#f49c20",
			key: `${cell.data.federalAccount}${cell.data.fundingAgencyId}`,
			selectedCell,
			showTooltip,
			hideTooltip
		}));
		if (inFlight) loadingMessage = /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(ResultsTableLoadingMessage, {});
		else if (error) errorMessage = /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(ResultsTableErrorMessage, {});
		else if (noResults) noResultsMessage = /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(NoResultsMessage, {
			title: "Chart Not Available",
			message: "No available data to display."
		});
		else {
			treeMap = /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("svg", {
				className: "treemap",
				width: "100%",
				height,
				children: cells
			});
			resultsCount = /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
				className: "federal-accounts-treemap-count",
				children: `${virtualChart.length} ${naming}`
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$40.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$40.jsxs)("div", {
				className: "results-table-message-container",
				children: [
					loadingMessage,
					errorMessage,
					noResultsMessage
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
				className: "federal-accounts-treemap",
				children: treeMap
			}),
			resultsCount
		] });
	};
	FederalAccountsTree.propTypes = propTypes$36;
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsViz.jsx
/**
* FederalAccountsViz.jsx
* Created by Lizzie Salita 8/19/19
**/
var import_jsx_runtime$39, propTypes$35, FederalAccountsViz;
var init_FederalAccountsViz = __esmMin((() => {
	init_ViewTypeButton();
	init_FederalAccountsTreeTooltip();
	init_FederalAccountsTable();
	init_FederalAccountsTree();
	import_jsx_runtime$39 = require_jsx_runtime();
	propTypes$35 = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		page: PropTypes.number,
		limit: PropTypes.number,
		sort: PropTypes.string,
		order: PropTypes.string,
		total: PropTypes.number,
		federalAccounts: PropTypes.array,
		view: PropTypes.string,
		changePage: PropTypes.func,
		updateSort: PropTypes.func,
		changeView: PropTypes.func
	};
	FederalAccountsViz = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				width: 0,
				showTooltip: false,
				tooltip: {
					x: 0,
					y: 0,
					_federalAccountName: "",
					_obligatedAmount: 0,
					_percent: 0,
					_fundingAgencyName: "",
					_fundingAgencyAbbreviation: "",
					_fundingAgencyId: 0,
					federalAccountName: "",
					obligatedAmount: 0,
					percent: 0,
					fundingAgencyName: "",
					fundingAgencyAbbreviation: "",
					fundingAgencyId: 0
				}
			};
			this.measureWidth = this.measureWidth.bind(this);
			this.showTooltip = this.showTooltip.bind(this);
			this.hideTooltip = this.hideTooltip.bind(this);
		}
		componentDidMount() {
			this.measureWidth();
			window.addEventListener("resize", this.measureWidth);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWidth);
		}
		measureWidth() {
			const width = this.widthRef.offsetWidth;
			this.setState({ width });
		}
		showTooltip(position, data) {
			this.setState({
				showTooltip: true,
				tooltip: {
					...position,
					...data
				}
			});
		}
		hideTooltip() {
			this.setState({ showTooltip: false });
		}
		render() {
			const isTreeView = this.props.view === "tree";
			return /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
				className: "federal-accounts__section",
				children: [this.state.showTooltip && /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(FederalAccountsTreeTooltip, { ...this.state.tooltip }), /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
					className: "federal-accounts-results",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
							className: "view-buttons",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(ViewTypeButton, {
								value: "table",
								label: "Table",
								icon: "table",
								changeView: this.props.changeView,
								active: !isTreeView
							}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(ViewTypeButton, {
								value: "tree",
								label: "Treemap",
								icon: "th-large",
								changeView: this.props.changeView,
								active: isTreeView
							})]
						}),
						!isTreeView && /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(FederalAccountsTable, { ...this.props }),
						/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("div", {
							className: "federal-accounts-vis__width-reference",
							ref: (div) => {
								this.widthRef = div;
							}
						}),
						isTreeView && /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(FederalAccountsTree, {
							error: this.props.error,
							inFlight: this.props.inFlight,
							width: this.state.width,
							data: this.props.federalAccounts,
							showTooltip: this.showTooltip,
							hideTooltip: this.hideTooltip
						})
					]
				})]
			});
		}
	};
	FederalAccountsViz.propTypes = propTypes$35;
}));
//#endregion
//#region src/js/containers/award/shared/FederalAccountsVizContainer.jsx
/**
* FederalAccountsVizContainer.jsx
* Created by Lizzie Salita 8/16/19
**/
var import_jsx_runtime$38, propTypes$34, FederalAccountsVizContainer, mapStateToProps$2, FederalAccountsVizContainer_default;
var init_FederalAccountsVizContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_idvHelper();
	init_awardSummaryHelper();
	init_BaseFederalAccount();
	init_FederalAccountsViz();
	import_jsx_runtime$38 = require_jsx_runtime();
	propTypes$34 = {
		awardId: PropTypes.string,
		category: PropTypes.string,
		totalTransactionObligatedAmount: PropTypes.number
	};
	FederalAccountsVizContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				limit: 10,
				sort: "total_transaction_obligated_amount",
				page: 1,
				order: "desc",
				total: 0,
				inFlight: false,
				error: false,
				federalAccounts: [],
				view: "table"
			};
			this.request = null;
			this.changePage = this.changePage.bind(this);
			this.updateSort = this.updateSort.bind(this);
			this.changeView = this.changeView.bind(this);
		}
		async componentDidMount() {
			if (this.props.totalTransactionObligatedAmount && this.props.awardId && this.props.category) await this.getFederalAccounts();
		}
		async componentDidUpdate(prevProps) {
			if (prevProps.totalTransactionObligatedAmount !== this.props.totalTransactionObligatedAmount && this.props.totalTransactionObligatedAmount) await this.getFederalAccounts();
		}
		componentWillUnmount() {
			if (this.request) this.request.cancel();
		}
		async getFederalAccounts() {
			if (this.request) this.request.cancel();
			const { limit, sort, page, order } = this.state;
			const params = {
				limit,
				sort,
				order,
				award_id: this.props.awardId
			};
			if (this.state.view === "table") params.page = page;
			this.setState({
				inFlight: true,
				error: false
			});
			if (this.props.category === "idv") this.request = fetchIdvFederalAccounts(params);
			else this.request = fetchAwardFederalAccounts(params);
			try {
				const res = await this.request.promise;
				this.setState({ total: res.data.page_metadata.count });
				this.parseFederalAccounts(res.data.results);
			} catch (e) {
				if (!isCancel(e)) this.setState({
					inFlight: false,
					error: true
				});
				console.log(" Error : ", e);
			}
		}
		parseFederalAccounts(results) {
			const federalAccounts = results.map((account) => {
				return new BaseFederalAccount(account, this.props.totalTransactionObligatedAmount);
			});
			this.setState({
				federalAccounts,
				inFlight: false,
				error: false
			});
		}
		updateSort(sort, order) {
			this.setState({
				sort,
				order
			}, () => this.getFederalAccounts());
		}
		changePage(page) {
			this.setState({ page }, () => this.getFederalAccounts());
		}
		changeView(view) {
			if (this.state.view !== view) {
				const limit = view === "tree" ? 100 : 10;
				this.setState({
					view,
					limit
				}, () => {
					this.getFederalAccounts();
				});
			}
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(FederalAccountsViz, {
				...this.state,
				changePage: this.changePage,
				updateSort: this.updateSort,
				changeView: this.changeView
			});
		}
	};
	FederalAccountsVizContainer.propTypes = propTypes$34;
	mapStateToProps$2 = (state) => ({
		awardId: state.award.id,
		category: state.award.category,
		totalTransactionObligatedAmount: state.award.totalTransactionObligatedAmount
	});
	FederalAccountsVizContainer_default = connect_default(mapStateToProps$2, null)(FederalAccountsVizContainer);
}));
//#endregion
//#region src/js/models/v2/award/BaseFundingRollup.js
var BaseFundingRollup;
var init_BaseFundingRollup = __esmMin((() => {
	init_moneyFormatter();
	BaseFundingRollup = {
		populate(data) {
			this._obligatedAmount = data.total_transaction_obligated_amount || 0;
			this.awardingAgencyCount = data.awarding_agency_count || "N/A";
			this.fundingAgencyCount = data.funding_agency_count || "N/A";
			this.federalAccountCount = data.federal_account_count || "N/A";
		},
		get obligatedAmount() {
			return this._obligatedAmount ? formatMoneyWithPrecision(this._obligatedAmount, 2) : "N/A";
		}
	};
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsSummary.jsx
var import_jsx_runtime$37, propTypes$33, FederalAccountsSummary;
var init_FederalAccountsSummary = __esmMin((() => {
	init_ResultsTableLoadingMessage();
	init_JumpToSectionButton();
	import_jsx_runtime$37 = require_jsx_runtime();
	propTypes$33 = {
		summary: PropTypes.object,
		inFlight: PropTypes.bool,
		jumpToFederalAccountsHistory: PropTypes.func
	};
	FederalAccountsSummary = ({ summary, inFlight, jumpToFederalAccountsHistory }) => {
		const generateTable = () => {
			let table;
			if (inFlight) table = /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("div", {
				className: "results-table-message-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(ResultsTableLoadingMessage, {})
			});
			else table = /* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
				className: "award-funding-summary__table",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
						className: "award-funding-summary__data",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: "Total Funding Obligated" }), /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: summary.obligatedAmount })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
						className: "award-funding-summary__data",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: "Total Count of Funding Agencies" }), /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: summary.fundingAgencyCount })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
						className: "award-funding-summary__data",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: "Total Count of Awarding Agencies" }), /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: summary.awardingAgencyCount })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
						className: "award-funding-summary__data",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: "Total Count of Federal Accounts" }), /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("span", { children: summary.federalAccountCount })]
					})
				]
			});
			return table;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("div", {
			className: "federal-accounts-summary__section",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("h4", { children: "Summary of All Federal Accounts used by this Award" }),
				generateTable(),
				/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(JumpToSectionButton, {
					linkText: "View federal funding submissions",
					icon: "table",
					onClick: jumpToFederalAccountsHistory
				})
			]
		});
	};
	FederalAccountsSummary.propTypes = propTypes$33;
}));
//#endregion
//#region src/js/containers/award/shared/FederalAccountsSummaryContainer.jsx
/**
* FederalAccountsSummaryContainer.jsx
* Created by Lizzie Salita 8/16/19
**/
var import_jsx_runtime$36, propTypes$32, FederalAccountsSummaryContainer, mapStateToProps$1, FederalAccountsSummaryContainer_default;
var init_FederalAccountsSummaryContainer = __esmMin((() => {
	init_es();
	init_redux();
	init_axios();
	init_idvHelper();
	init_awardSummaryHelper();
	init_awardActions();
	init_BaseFundingRollup();
	init_FederalAccountsSummary();
	import_jsx_runtime$36 = require_jsx_runtime();
	propTypes$32 = {
		awardId: PropTypes.string,
		category: PropTypes.string,
		jumpToFederalAccountsHistory: PropTypes.func,
		setTotalTransactionObligatedAmount: PropTypes.func
	};
	FederalAccountsSummaryContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				inFlight: true,
				summary: null
			};
			this.request = null;
		}
		async componentDidMount() {
			if (this.props.awardId && this.props.category) await this.getAwardMetaData();
		}
		async componentDidUpdate(prevProps) {
			if (prevProps.awardId !== this.props.awardId && this.props.awardId && this.props.category) await this.getAwardMetaData();
		}
		componentWillUnmount() {
			if (this.request) this.request.cancel();
		}
		async getAwardMetaData() {
			if (this.request) this.request.cancel();
			if (this.props.category === "idv") this.request = fetchIdvFundingSummary(this.props.awardId);
			else this.request = fetchAwardFundingSummary(this.props.awardId);
			try {
				const { data } = await this.request.promise;
				this.parseFundingRollup(data);
			} catch (error) {
				if (!isCancel(error)) {
					this.parseFundingRollup({});
					console.log(error);
				}
			}
		}
		parseFundingRollup(data) {
			const summary = Object.create(BaseFundingRollup);
			summary.populate(data);
			this.setState({
				inFlight: false,
				summary
			});
			this.props.setTotalTransactionObligatedAmount(summary._obligatedAmount);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(FederalAccountsSummary, {
				...this.state,
				jumpToFederalAccountsHistory: this.props.jumpToFederalAccountsHistory
			});
		}
	};
	FederalAccountsSummaryContainer.propTypes = propTypes$32;
	mapStateToProps$1 = (state) => ({
		awardId: state.award.id,
		category: state.award.category
	});
	FederalAccountsSummaryContainer_default = connect_default(mapStateToProps$1, (dispatch) => bindActionCreators({ setTotalTransactionObligatedAmount }, dispatch))(FederalAccountsSummaryContainer);
}));
//#endregion
//#region src/js/components/sharedComponents/UnlinkedAwardWarning.jsx
var import_jsx_runtime$35, propTypes$31, UnlinkedAwardWarning;
var init_UnlinkedAwardWarning = __esmMin((() => {
	init_index_es();
	init_Icons();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$31 = {
		topMargin: PropTypes.bool,
		widerLayout: PropTypes.bool
	};
	UnlinkedAwardWarning = ({ topMargin, widerLayout }) => /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("section", {
		className: `unlinked-award-warning__wrapper ${topMargin ? "top-margin" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(Qs, {
			className: "unlinked-award-warning__content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)($s, {
				className: `unlinked-award-warning__column-one ${widerLayout ? "wider-layout" : ""}`,
				width: 1,
				tablet: .5,
				children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ExclamationTriangle, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)($s, {
				className: "unlinked-award-warning__column-two",
				width: 11,
				children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: "unlinked-award-warning__heading",
					children: "This award has not been linked to any federal account."
				})
			})]
		})
	});
	UnlinkedAwardWarning.propTypes = propTypes$31;
}));
//#endregion
//#region src/js/components/award/shared/federalAccounts/FederalAccountsSection.jsx
var import_jsx_runtime$34, propTypes$30, message$1, FederalAccountsSection;
var init_FederalAccountsSection = __esmMin((() => {
	init_dist();
	init_FederalAccountsVizContainer();
	init_tooltips();
	init_FederalAccountsSummaryContainer();
	init_Note();
	init_AwardSection();
	init_AwardSectionHeader();
	init_propTypes();
	init_UnlinkedAwardWarning();
	import_jsx_runtime$34 = require_jsx_runtime();
	propTypes$30 = {
		jumpToFederalAccountsHistory: PropTypes.func,
		awardType: AWARD_TYPE_PROPS,
		unlinked: PropTypes.bool
	};
	message$1 = "Result count may differ between treemap view and table view. Treemap view only displays accounts with a positive combined obligated amount, while table view displays all accounts.";
	FederalAccountsSection = ({ jumpToFederalAccountsHistory, awardType, unlinked }) => {
		const infoTooltip = getToolTipBySectionAndAwardType("federalAccounts", awardType);
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)(AwardSection, {
			type: "column",
			className: "award-viz federal-accounts",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(AwardSectionHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(FontAwesomeIcon, {
					size: "lg",
					icon: "chart-pie"
				}),
				title: "Federal Accounts",
				tooltipWide: true,
				tooltip: infoTooltip
			}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
				className: "award__col__content",
				children: unlinked ? /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(UnlinkedAwardWarning, {}) : /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)(import_jsx_runtime$34.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(FederalAccountsVizContainer_default, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("span", {
						className: "federal-accounts__section--note",
						children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(Note, { message: message$1 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(FederalAccountsSummaryContainer_default, { jumpToFederalAccountsHistory })
				] })
			})]
		});
	};
	FederalAccountsSection.propTypes = propTypes$30;
}));
//#endregion
//#region src/js/components/award/shared/AwardStatus.jsx
var import_jsx_runtime$33, dayjs$2, propTypes$29, AwardStatus;
var init_AwardStatus = __esmMin((() => {
	init_timeRangeHelper();
	init_awardSummaryHelper();
	import_jsx_runtime$33 = require_jsx_runtime();
	dayjs$2 = require_dayjs_min();
	propTypes$29 = {
		dates: PropTypes.object,
		awardType: PropTypes.string
	};
	AwardStatus = ({ dates, awardType }) => {
		const { startDate, endDate, currentEndDate } = datesByDateType(dates, awardType);
		const badDates = isBadDates({
			startDate,
			endDate,
			currentEndDate
		}, awardType);
		const contract = isContract(awardType);
		const awardStatus = () => {
			if (badDates) return "";
			const today = dayjs$2();
			let end = endDate;
			if (contract) end = currentEndDate;
			end = end.add(1, "d");
			if (!startDate || !endDate) return "";
			let status = "";
			if (today.isBefore(startDate)) status = "Not Started";
			if (today.isAfter(startDate) && today.isBefore(end)) status = awardType === "idv" ? "Open" : "In Progress";
			if (today.isAfter(end)) status = awardType === "idv" ? "Closed" : "Completed";
			return status;
		};
		const timeRemaining = () => {
			if (badDates) return "";
			let dateToCompare = contract ? currentEndDate : endDate;
			if (!dateToCompare) return "";
			dateToCompare = dateToCompare.add(1, "d");
			const remainingTime = convertDatesToRange(dayjs$2(), dateToCompare);
			if (!remainingTime || dayjs$2().isBefore(startDate)) return null;
			return `(${remainingTime} ${endsWith(remainingTime, "s") ? "remain" : "remains"})`;
		};
		const time = timeRemaining();
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			className: "award-status-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("h5", {
				className: `award-status__text award-status-container__status ${time ? "award-status__text-space" : ""}`,
				children: awardStatus()
			}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("h5", {
				className: "award-status__text award-status-container__time-remaining",
				children: time
			})]
		});
	};
	AwardStatus.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/award/shared/AwardPageWrapper.jsx
var import_jsx_runtime$32, AwardPageWrapper;
var init_AwardPageWrapper = __esmMin((() => {
	init_index_es();
	init_awardType();
	init_WithDefCodes();
	init_propTypes();
	init_AwardStatus();
	init_InfoTooltipContent();
	init_GlossaryLink();
	import_jsx_runtime$32 = require_jsx_runtime();
	AwardPageWrapper = ({ allDefCodes, awardType, title, overviewType, identifier, idLabel = "PIID", children, dates, unlinked }) => {
		const glossaryTitleText = awardTypeCodes[overviewType] ? `View glossary definition of ${awardTypeCodes[overviewType]}` : "View glossary definition";
		const [, areDefCodesLoading, defCodes] = useDefCodes();
		const [covidDefCodes, setCovidDefCodes] = useState(null);
		const [showTooltip, setShowTooltip] = useState(false);
		useEffect(() => {
			if (!areDefCodesLoading) setCovidDefCodes(defCodes.filter((c) => c.disaster === "covid_19" && allDefCodes.indexOf(c.code) > -1).map((code) => code.code));
		}, [
			areDefCodesLoading,
			allDefCodes,
			defCodes
		]);
		const handleClick = (() => {
			setShowTooltip(true);
		});
		const handleKeyUp = ((e) => {
			if (e.key === "Enter") setShowTooltip(true);
		});
		const handleFocus = (() => {
			const spanFocus = document.getElementById("award-summary__unlinked-span");
			if (spanFocus) spanFocus.focus();
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
			className: `award award-${awardType}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
					className: "award__heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
						className: "award__info",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("h2", {
								className: "award__heading-text",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
								className: "award__heading-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(GlossaryLink, {
									alt: glossaryTitleText,
									term: glossaryLinks[overviewType],
									showHoverText: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
								className: "award__heading-id",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("h3", { children: idLabel }), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("p", { children: identifier })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(AwardStatus, {
						awardType,
						dates
					})]
				}),
				covidDefCodes && covidDefCodes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ds, {
					className: "award-summary__covid-19-flag",
					tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CovidFlagTooltip, { codes: covidDefCodes }),
					children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
						className: "covid-spending-flag",
						children: "Includes COVID-19 Spending"
					})
				}),
				unlinked && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ds, {
					tooltipPosition: "bottom",
					className: "award-summary__unlinked-flag",
					controlledProps: {
						isControlled: true,
						isVisible: !!showTooltip,
						showTooltip: () => {
							handleFocus();
						},
						closeTooltip: () => {}
					},
					tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(UnlinkedTooltip, { setShowTooltip }),
					children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
						id: "award-summary__unlinked-span",
						role: "button",
						onClick: handleClick,
						onKeyUp: handleKeyUp,
						tabIndex: -1,
						onFocus: handleKeyUp,
						className: "unlinked-flag",
						children: "Unlinked Award"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("hr", {}),
				children
			]
		});
	};
	AwardPageWrapper.propTypes = AWARD_PAGE_WRAPPER_PROPS;
}));
//#endregion
//#region src/js/helpers/awardAmountChartHelper.js
var getfileCInfo, getAwardTypeText, getAwardColor, getAwardOutlayRawValue, getAwardOutlayValue, getAwardObligatedRawValue, getAwardObligatedValue, buildContractIDVProps, buildGrantsDirectOtherProps, buildLoanProps;
var init_awardAmountChartHelper = __esmMin((() => {
	init_awardAmountsSection();
	init_covid19();
	getfileCInfo = (fileCType) => {
		let fileCInfo = null;
		defcTypes.forEach((item) => {
			if (item.codeType === fileCType) fileCInfo = item;
		});
		return fileCInfo;
	};
	getAwardTypeText = (awardType, amountType, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		const preText = fileCInfo && Object.keys(fileCInfo)?.length > 0 ? fileCInfo.preText : "";
		return awardType === "idv" ? `Combined ${preText} ${amountType} Amounts` : `${preText} ${amountType} Amount`;
	};
	getAwardColor = (overallColor, infrastructureColor, fileCColor, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		if (fileCInfo?.codeType === "infrastructure") return infrastructureColor;
		if (fileCInfo?.codeType === "covid") return fileCColor;
		return overallColor;
	};
	getAwardOutlayRawValue = (data, awardType, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		if (fileCInfo?.codeType === "covid") return data._fileCOutlay;
		if (fileCInfo?.codeType === "infrastructure") return data._fileCOutlayInfrastructure;
		return awardType === "idv" ? data._combinedOutlay : data._totalOutlay;
	};
	getAwardOutlayValue = (data, awardType, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		if (fileCInfo?.codeType === "covid") return data.fileCOutlayAbbreviated;
		if (fileCInfo?.codeType === "infrastructure") return data.infrastructureOutlayAbbreviated;
		return awardType === "idv" ? data.combinedOutlayAbbreviated : data.totalOutlayAbbreviated;
	};
	getAwardObligatedRawValue = (data, awardType, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		if (fileCInfo?.codeType === "covid") return data._fileCObligated;
		if (fileCInfo?.codeType === "infrastructure") return data._fileCObligatedInfrastructure;
		return data._totalObligation;
	};
	getAwardObligatedValue = (data, awardType, fileCType) => {
		const fileCInfo = getfileCInfo(fileCType);
		if (fileCInfo?.codeType === "covid") return data.fileCObligatedAbbreviated;
		if (fileCInfo?.codeType === "infrastructure") return data.infrastructureObligationAbbreviated;
		return data.totalObligationAbbreviated;
	};
	buildContractIDVProps = (awardType, data, hasfilecCovid, hasOutlays, fileCType) => {
		return {
			denominator: {
				labelSortOrder: 3,
				labelPosition: "bottom",
				className: `${awardType}-potential`,
				rawValue: data._baseAndAllOptions,
				value: data.baseAndAllOptionsAbbreviated,
				color: getAwardColor(potentialColor, infrastructurePotentialColor, covidColor, fileCType),
				lineOffset: lineOffsetsBySpendingCategory.potential,
				text: awardType === "idv" ? "Combined Potential Award Amounts" : "Potential Award Amount"
			},
			numerator2: {
				labelSortOrder: 0,
				labelPosition: "top",
				className: `${awardType}-outlayed`,
				rawValue: getAwardOutlayRawValue(data, awardType, fileCType),
				value: getAwardOutlayValue(data, awardType, fileCType),
				color: getAwardColor(outlayColor, infrastructureOutlayColor, covidColor, fileCType),
				lineOffset: lineOffsetsBySpendingCategory.potential,
				text: getAwardTypeText(awardType, "Outlayed", fileCType)
			},
			numerator: {
				labelSortOrder: 2,
				labelPosition: "bottom",
				className: `${awardType}-current`,
				rawValue: data._baseExercisedOptions,
				denominatorValue: data._baseAndAllOptions,
				value: data.baseExercisedOptionsAbbreviated,
				lineOffset: lineOffsetsBySpendingCategory.current,
				text: awardType === "idv" ? "Combined Current Award Amounts" : "Current Award Amount",
				color: getAwardColor(currentColor, infrastructureCurrentColor, covidColor, fileCType),
				children: [{
					labelSortOrder: 1,
					labelPosition: "top",
					className: `${awardType}-obligated`,
					rawValue: getAwardObligatedRawValue(data, awardType, fileCType),
					denominatorValue: data._baseExercisedOptions,
					value: getAwardObligatedValue(data, awardType, fileCType),
					text: getAwardTypeText(awardType, "Obligated", fileCType),
					color: getAwardColor(obligatedColor, infrastructureObligatedColor, covidObligatedColor, fileCType),
					lineOffset: lineOffsetsBySpendingCategory.obligationProcurement
				}]
			}
		};
	};
	buildGrantsDirectOtherProps = (awardType, awardAmounts, hasOutlays, showFilecCovid, fileCType) => {
		return {
			denominator: {
				labelPosition: "bottom",
				labelSortOrder: 3,
				className: `asst-total-funding`,
				rawValue: awardAmounts._totalFunding,
				value: awardAmounts.totalFundingAbbreviated,
				color: `#FFF`,
				lineOffset: 0,
				text: `Total Funding`
			},
			numerator: {
				className: `asst-non-federal-funding ${awardAmounts._nonFederalFunding > 0 ? `` : `asst-nff-zero`}`,
				labelSortOrder: 2,
				labelPosition: "bottom",
				rawValue: awardAmounts._nonFederalFunding + awardAmounts._totalObligation,
				lineOffset: lineOffsetsBySpendingCategory.nonFederalFunding,
				barWidthOverrides: {
					applyToLine: true,
					rawValue: awardAmounts._nonFederalFunding,
					denominatorValue: awardAmounts._totalFunding
				},
				value: awardAmounts.nonFederalFundingAbbreviated,
				color: nonFederalFundingColor,
				text: "Non-Federal Funding",
				children: [{
					className: `asst-obligation ${showFilecCovid ? `asst-file-c-obligated` : ``}`,
					labelSortOrder: 1,
					labelPosition: "top",
					rawValue: getAwardObligatedRawValue(awardAmounts, awardType, fileCType),
					denominatorValue: awardAmounts._totalFunding,
					value: getAwardObligatedValue(awardAmounts, awardType, fileCType),
					lineOffset: lineOffsetsBySpendingCategory.obligationAsst,
					text: getAwardTypeText(awardType, "Obligated", fileCType),
					color: getAwardColor(obligatedColor, infrastructureObligatedColor, covidObligatedColor, fileCType)
				}]
			},
			numerator2: {
				labelSortOrder: 0,
				labelPosition: "top",
				className: `${awardType}-outlayed ${awardAmounts._fileCOutlay > 0 ? `asst-file-c-outlay` : `asst-file-c-outlay--zero`}`,
				rawValue: getAwardOutlayRawValue(awardAmounts, awardType, fileCType),
				value: getAwardOutlayValue(awardAmounts, awardType, fileCType),
				color: getAwardColor(outlayColor, infrastructureOutlayColor, covidColor, fileCType),
				lineOffset: lineOffsetsBySpendingCategory.potential,
				text: getAwardTypeText(awardType, "Outlayed", fileCType)
			}
		};
	};
	buildLoanProps = (awardAmounts, awardType) => {
		return {
			numerator: {
				labelPosition: "bottom",
				labelSortOrder: 3,
				className: `${awardType}-subsidy`,
				rawValue: awardAmounts._subsidy,
				value: awardAmounts.subsidyAbbreviated,
				lineOffset: lineOffsetsBySpendingCategory.subsidy,
				text: "Original Subsidy Cost",
				color: subsidyColor,
				denominatorValue: awardAmounts.faceValueAbbreviated,
				children: [{}]
			},
			denominator: {
				labelPosition: "bottom",
				labelSortOrder: 2,
				className: `${awardType}-face-value`,
				rawValue: awardAmounts._faceValue,
				value: awardAmounts.faceValueAbbreviated,
				lineOffset: lineOffsetsBySpendingCategory.faceValue,
				color: faceValueColor,
				text: "Face Value of Direct Loan"
			},
			numerator2: {}
		};
	};
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/HorizontalSingleStackedBarViz.jsx
/**
* HorizontalSingleStackedBarViz.jsx
* Created by Afna Saifudeen
**/
var import_jsx_runtime$31, BarVizData, propTypes$28, HorizontalSingleStackedBarViz;
var init_HorizontalSingleStackedBarViz = __esmMin((() => {
	init_src$1();
	init_src();
	import_jsx_runtime$31 = require_jsx_runtime();
	BarVizData = PropTypes.shape({
		rawValue: PropTypes.number,
		value: PropTypes.string,
		text: PropTypes.string,
		color: PropTypes.string,
		improper: PropTypes.object,
		isImproper: PropTypes.bool,
		labelSortOrder: PropTypes.number,
		labelPosition: PropTypes.string,
		denominatorValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		barWidthOverrides: PropTypes.shape({
			rawValue: PropTypes.number,
			denominatorValue: PropTypes.number
		}),
		children: PropTypes.arrayOf(PropTypes.shape({
			rawValue: PropTypes.number,
			value: PropTypes.string,
			text: PropTypes.string,
			color: PropTypes.string
		}))
	});
	propTypes$28 = {
		numerator: BarVizData,
		numerator2: BarVizData,
		denominator: BarVizData
	};
	HorizontalSingleStackedBarViz = ({ numerator, numerator2, denominator }) => {
		const chartRef = useRef();
		const [windowWidth, setWindowWidth] = useState(0);
		const height = 400;
		const propsArr = [];
		const propValuesToArr = (num, num2, den) => {
			if (num?.children[0]?.rawValue) propsArr.push(den.rawValue, num.rawValue, num.children[0].rawValue, num2.rawValue);
			else propsArr.push(den.rawValue, num.rawValue, num2.rawValue);
		};
		propValuesToArr(numerator, numerator2, denominator);
		const currentAmountValue = numerator.value;
		const currentAmountLabel = numerator.text;
		const outlayedAmountValue = numerator2.value;
		const outlayedAmountLabel = numerator2.text;
		const outlayedAmountColor = numerator2.color;
		const obligatedAmountValue = numerator.children[0].value;
		const obligatedAmountLabel = numerator.children[0].text;
		const obligatedAmountColor = numerator.children[0].color;
		const potentialAmountValue = denominator.value;
		const potentialAmountLabel = denominator.text;
		const isNffZero = numerator.className.includes("asst-non-federal-funding") && numerator.value === "$0";
		useEffect(() => {
			const renderBarChart = () => {
				select_default("#aa_chart").selectAll("*").remove();
				const chartSvg = select_default("#aa_chart").append("svg").attr("height", height).attr("width", "100%");
				const x = linear().range([0, windowWidth]);
				x.domain([0, propsArr[0]]);
				chartSvg.append("g").attr("class", "parent-g").selectAll(".bar-group");
				chartSvg.append("rect").attr("x", 0).attr("y", height / 2.5).attr("width", x(propsArr[0])).attr("height", "50").attr("fill", numerator.className === "loan-subsidy" ? "#ded5db" : "#dce4ee");
				if (numerator.className.includes("asst-non-federal-funding")) {
					chartSvg.append("rect").attr("x", 0).attr("y", 165).attr("width", x(propsArr[2]) <= 100 ? x(propsArr[2]) + 4 : x(propsArr[2])).attr("height", "40").attr("fill", obligatedAmountColor);
					if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("rect").attr("x", 0).attr("y", 170).attr("width", x(propsArr[3]) <= 100 ? x(propsArr[3]) + 4 : x(propsArr[3])).attr("height", "30").attr("fill", outlayedAmountColor);
					if (!isNffZero) {
						chartSvg.append("rect").attr("x", x(propsArr[2]) + 2).attr("y", 167).attr("width", x(propsArr[0])).attr("height", "36").attr("fill", "none").attr("stroke", "#47AAA7").style("stroke-width", 4);
						chartSvg.append("foreignObject").attr("width", x(propsArr[1]) - 10).attr("height", 70).attr("x", 0).attr("y", 230).html(`<div className="award-amounts-viz-label__desc-text current"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`).select("div").style("float", "right").style("text-align", "right").style("background-color", "white").select("strong").style("font-size", "20px");
					}
					chartSvg.append("line").attr("x1", x(propsArr[0]) - 2).attr("y1", height / 2.5).attr("x2", x(propsArr[0]) - 2).attr("y2", height - 50).style("stroke-width", 4).style("stroke", "#dce4ee").style("fill", "none");
					if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("line").attr("x1", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2).attr("y1", 20).attr("x2", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2).attr("y2", 195).style("stroke-width", 4).style("stroke", outlayedAmountColor).style("fill", "none");
					if (obligatedAmountValue?.indexOf("$0") < 0) chartSvg.append("line").attr("x1", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2).attr("y1", 90).attr("x2", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2).attr("y2", 205).style("stroke-width", 4).style("stroke", obligatedAmountColor).style("fill", "none");
					if (!isNffZero) chartSvg.append("line").attr("x1", x(propsArr[1]) - 2).attr("y1", 165).attr("x2", x(propsArr[1]) - 2).attr("y2", 275).style("stroke-width", 4).style("stroke", numerator.className === "asst-non-federal-funding" ? "#47AAA7" : "#8aa6c9").style("fill", "none");
					chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[2]) <= 270 ? x(propsArr[0]) : x(propsArr[0]) - x(propsArr[2]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[2]) <= 270 ? "-8" : x(propsArr[2]) + 10).attr("y", 90).html(`<div className="award-amounts-viz-label__desc-text obligated"><strong>${obligatedAmountValue}</strong><br />${obligatedAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[2]) <= 270 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[2]) <= 270 ? "right" : "left").style("background-color", "white").select("strong").style("font-size", "20px");
				} else {
					chartSvg.append("rect").attr("x", 0).attr("y", 165).attr("width", x(propsArr[1])).attr("height", "40").attr("fill", numerator.className === "loan-subsidy" ? "#8c6e86" : "#8aa6c9");
					if (obligatedAmountValue?.indexOf("$0") < 0) chartSvg.append("rect").attr("x", 0).attr("y", 170).attr("width", x(propsArr[2]) <= 100 ? x(propsArr[2]) + 4 : x(propsArr[2])).attr("height", "30").attr("fill", obligatedAmountColor);
					if (outlayedAmountValue.indexOf("$0") < 0) chartSvg.append("rect").attr("x", 0).attr("y", 175).attr("width", x(propsArr[3]) <= 100 ? x(propsArr[3]) + 2 : x(propsArr[3])).attr("height", "20").attr("fill", outlayedAmountColor);
					chartSvg.append("line").attr("x1", x(propsArr[0]) - 2).attr("y1", height / 2.5).attr("x2", x(propsArr[0]) - 2).attr("y2", height - 50).style("stroke-width", 4).attr("stroke", numerator.className === "loan-subsidy" ? "#ded5db" : "#dce4ee").style("fill", "none");
					chartSvg.append("line").attr("x1", x(propsArr[1]) - 2).attr("y1", 165).attr("x2", x(propsArr[1]) - 2).attr("y2", 275).style("stroke-width", 4).style("stroke", numerator.className === "asst-non-federal-funding" ? "#47AAA7" : numerator.className === "loan-subsidy" ? "#8c6e86" : "#8aa6c9").style("fill", "none");
					if (obligatedAmountValue.indexOf("$0") < 0) chartSvg.append("line").attr("x1", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2).attr("y1", 90).attr("x2", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2).attr("y2", 200).style("stroke-width", 4).style("stroke", obligatedAmountColor).style("fill", "none");
					if (outlayedAmountValue.indexOf("$0") === -1) chartSvg.append("line").attr("x1", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2).attr("y1", 20).attr("x2", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2).attr("y2", 195).style("stroke-width", 4).style("stroke", outlayedAmountColor).style("fill", "none");
					chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[1]) <= 270 ? x(propsArr[1]) - 10 : x(propsArr[0]) - x(propsArr[1]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[1]) <= 270 ? 0 : x(propsArr[1]) + 10).attr("y", 230).html(`<div className="award-amounts-viz-label__desc-text"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[1]) <= 270 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[1]) <= 270 ? "right" : "left").style("background-color", "white").select("strong").style("font-size", "20px");
					if (obligatedAmountValue.indexOf("$0") < 0) chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[2]) <= 270 ? x(propsArr[2]) - 10 : x(propsArr[0]) - x(propsArr[2]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[2]) <= 270 ? 0 : x(propsArr[2]) + 10).attr("y", 90).html(`<div className="award-amounts-viz-label__desc-text"><strong>${obligatedAmountValue}</strong><br />${obligatedAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[2]) <= 270 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[2]) <= 270 ? "right" : "left").style("background-color", "white").select("strong").style("font-size", "20px");
				}
				chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - 10).attr("height", 60).attr("x", 0).attr("y", 300).html(`<div className="award-amounts-viz-label__desc-text"><strong>${potentialAmountValue}</strong><br />${potentialAmountLabel}</div>`).select("div").style("float", "right").style("text-align", "right").select("strong").style("font-size", "20px");
				if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[3]) <= 270 ? x(propsArr[3]) - 10 : x(propsArr[0]) - x(propsArr[3]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[3]) <= 270 ? 0 : x(propsArr[3]) + 10).attr("y", 20).html(`<div className="award-amounts-viz-label__desc-text"><strong>${outlayedAmountValue}</strong><br />${outlayedAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[3]) <= 270 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[3]) <= 270 ? "right" : "left").select("strong").style("font-size", "20px");
			};
			const renderBarChartLoans = () => {
				select_default("#aa_chart").selectAll("*").remove();
				const chartSvg = select_default("#aa_chart").append("svg").attr("height", height).attr("width", "100%");
				const x = linear().range([0, windowWidth]);
				x.domain([0, propsArr[0]]);
				chartSvg.append("g").attr("class", "parent-g").selectAll(".bar-group");
				chartSvg.append("rect").attr("x", 0).attr("y", height / 2.5).attr("width", x(propsArr[0])).attr("height", "50").attr("fill", "#ded5db");
				if (currentAmountValue?.indexOf("$0") < 0) chartSvg.append("rect").attr("x", 0).attr("y", 165).attr("width", x(propsArr[1])).attr("height", "40").attr("fill", "#8c6e86");
				chartSvg.append("rect").attr("x", 0).attr("y", 170).attr("width", x(propsArr[3])).attr("height", "50").attr("fill", obligatedAmountColor);
				if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("rect").attr("x", 0).attr("y", 170).attr("width", x(propsArr[2]) < 8 ? 8 + x(propsArr[2]) : x(propsArr[2])).attr("height", "30").attr("fill", outlayedAmountColor);
				if (!isNffZero) chartSvg.append("line").attr("x1", x(propsArr[0]) - 2).attr("y1", 165).attr("x2", x(propsArr[0]) - 2).attr("y2", 275).style("stroke-width", 4).style("stroke", "#ded5db").style("fill", "none");
				if (currentAmountValue?.indexOf("$0") < 0) chartSvg.append("line").attr("x1", x(propsArr[1]) - 2).attr("y1", 90).attr("x2", x(propsArr[1]) - 2).attr("y2", 205).style("stroke-width", 4).style("stroke", "#8c6e86").style("fill", "none");
				if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("line").attr("x1", x(propsArr[2]) - 2 < 8 ? 8 + (x(propsArr[2]) - 2) : x(propsArr[2]) - 2).attr("y1", 20).attr("x2", x(propsArr[2]) - 2 < 8 ? 8 + (x(propsArr[2]) - 2) : x(propsArr[2]) - 2).attr("y2", 200).style("stroke-width", 4).style("stroke", outlayedAmountColor).style("fill", "none");
				if (currentAmountValue?.indexOf("$0") < 0) chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[1]) <= 270 ? x(propsArr[1]) - 10 : x(propsArr[0]) - x(propsArr[1]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[1]) <= 270 ? 0 : x(propsArr[1]) + 10).attr("y", 90).html(`<div className="award-amounts-viz-outlays__desc-text subsidy"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[1]) <= 270 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[1]) <= 270 ? "right" : "left").select("strong").style("font-size", "20px");
				const outlayLabelMinXPos = (outlayScaled) => {
					if (outlayScaled <= 16) return 16;
					return outlayScaled + 10;
				};
				if (outlayedAmountValue?.indexOf("$0") < 0) chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - x(propsArr[2]) <= 100 ? x(propsArr[2]) - 10 : x(propsArr[0]) - x(propsArr[2]) - 10).attr("height", 70).attr("x", x(propsArr[0]) - x(propsArr[2]) <= 100 ? 0 : outlayLabelMinXPos(x(propsArr[2]))).attr("y", 20).html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${outlayedAmountValue}</strong><br />${outlayedAmountLabel}</div>`).select("div").style("float", x(propsArr[0]) - x(propsArr[2]) <= 100 ? "right" : "left").style("text-align", x(propsArr[0]) - x(propsArr[2]) <= 100 ? "right" : "left").select("strong").style("font-size", "20px");
				chartSvg.append("foreignObject").attr("width", x(propsArr[0]) - 10).attr("height", 70).attr("x", 0).attr("y", 230).html(`<div className="award-amounts-viz-outlays__desc-text facevalue"><strong>${potentialAmountValue}</strong><br />${potentialAmountLabel}</div>`).select("div").style("float", "right").style("text-align", "right").select("strong").style("font-size", "20px");
			};
			if (windowWidth === 0) {
				const newWidth = chartRef.current.getBoundingClientRect().width;
				setWindowWidth(newWidth);
			}
			if (propsArr.length > 3) renderBarChart();
			else renderBarChartLoans();
		}, [windowWidth, propsArr]);
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = chartRef.current.getBoundingClientRect().width;
				setWindowWidth(newWidth);
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
			className: "award-amounts-viz",
			children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
				id: "aa_chart",
				className: "award-amounts-viz-outlays",
				ref: chartRef
			})
		});
	};
	HorizontalSingleStackedBarViz.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/AwardAmountsChart.jsx
var import_jsx_runtime$30, propTypes$27, AwardAmountsChart;
var init_AwardAmountsChart = __esmMin((() => {
	init_awardAmountsSection();
	init_awardAmountChartHelper();
	init_NoResultsMessage();
	init_propTypes();
	init_HorizontalSingleStackedBarViz();
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$27 = {
		awardType: PropTypes.string,
		awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
		spendingScenario: PropTypes.string,
		infrastructureSpending: PropTypes.string,
		fileCType: PropTypes.string
	};
	AwardAmountsChart = ({ awardType, awardOverview, spendingScenario, fileCType }) => {
		const renderChartByAwardType = (awardAmounts = awardOverview, type = awardType, scenario = spendingScenario) => {
			const isNormal = scenario === "normal";
			const showFilecCovid = fileCType === "covid";
			const hasOutlays = awardAmounts._combinedOutlay > 0 || awardAmounts._totalOutlay > 0;
			if (asstAwardTypesWithSimilarAwardAmountData.includes(type) && isNormal) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(HorizontalSingleStackedBarViz, { ...buildGrantsDirectOtherProps(type, awardAmounts, hasOutlays, showFilecCovid, fileCType) });
			else if (type === "loan" && isNormal) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(HorizontalSingleStackedBarViz, { ...buildLoanProps(awardAmounts, type) });
			else if ((type === "idv" || type === "contract") && isNormal) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(HorizontalSingleStackedBarViz, { ...buildContractIDVProps(type, awardAmounts, showFilecCovid, hasOutlays, fileCType) });
			return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "results-table-message-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(NoResultsMessage, {
					title: "Chart Not Available",
					message: "Data in this instance is not suitable for charting"
				})
			});
		};
		return renderChartByAwardType(awardOverview, awardType, spendingScenario);
	};
	AwardAmountsChart.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/AwardAmountsTable.jsx
var import_jsx_runtime$29, propTypes$26, getSpendingCategoriesByAwardType, getTableTitleByAwardTypeByCategory, AwardAmountsTable;
var init_AwardAmountsTable = __esmMin((() => {
	init_awardAmountsSection();
	init_propTypes();
	init_GlossaryLink();
	import_jsx_runtime$29 = require_jsx_runtime();
	propTypes$26 = {
		showFileC: PropTypes.bool,
		children: PropTypes.node,
		awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
		awardData: PropTypes.shape({}),
		spendingScenario: PropTypes.string,
		fileCType: PropTypes.string
	};
	getSpendingCategoriesByAwardType = (awardAmountType) => {
		if (Object.keys(formattedSpendingCategoriesByAwardType).includes(awardAmountType)) return formattedSpendingCategoriesByAwardType[awardAmountType];
		return formattedSpendingCategoriesByAwardType.asst;
	};
	getTableTitleByAwardTypeByCategory = (type) => {
		if (Object.keys(tableTitlesBySpendingCategoryAndAwardType).includes(type)) return tableTitlesBySpendingCategoryAndAwardType[type];
		return tableTitlesBySpendingCategoryAndAwardType.asst;
	};
	AwardAmountsTable = ({ awardData, awardAmountType, spendingScenario, showFileC, fileCType }) => {
		const getOverSpendingRow = (awardAmounts = awardData, scenario = spendingScenario, type = awardAmountType) => {
			switch (scenario) {
				case "normal": return null;
				case "exceedsBigger": return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "award-amounts__data-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "remove-indent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { className: "award-amounts__data-icon award-amounts__data-icon_overspending" }), type === "idv" ? "Exceeds Combined Current Award Amounts" : "Exceeds Current Award Amount"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { children: awardAmounts.overspendingFormatted })]
				});
				case "exceedsBiggest": return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "award-amounts__data-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "remove-indent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { className: "award-amounts__data-icon award-amounts__data-icon_extreme-overspending" }), type === "idv" ? "Exceeds Combined Potential Award Amounts" : "Exceeds Potential Award Amount"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { children: awardAmounts.extremeOverspendingFormatted })]
				});
				default: return null;
			}
		};
		const buildAmountMapByCategoryTitle = (accumulator, category) => ({
			...accumulator,
			[getTableTitleByAwardTypeByCategory(awardAmountType)[category]]: awardData[category]
		});
		const amountMapByCategoryTitle = getSpendingCategoriesByAwardType(awardAmountType).filter((category) => {
			if (caresActSpendingCategories.includes(category)) return showFileC;
			return true;
		}).reduce((acc, category) => buildAmountMapByCategoryTitle(acc, category), {});
		const overspendingRow = getOverSpendingRow(awardData, spendingScenario);
		const sortTableTitles = (a, b) => orderedTableTitles.indexOf(a) - orderedTableTitles.indexOf(b);
		const hideRow = (title) => {
			const defcByType = defcTypes.map((item) => item.codeType);
			const hasDefCode = defcByType?.indexOf(fileCType) > -1;
			const allExclusions = [
				"Combined Outlayed Amounts",
				"Combined Obligated Amounts",
				"Outlayed Amount",
				"Obligated Amount"
			];
			let hide = false;
			if (fileCType && hasDefCode) defcByType.forEach((item) => {
				if (title.toLowerCase().includes(item) && fileCType !== item) hide = true;
			});
			if (!fileCType || fileCType === "overall") defcByType.forEach((item) => {
				if (title.toLowerCase().includes(item)) hide = true;
			});
			else allExclusions.forEach((item) => {
				if (title === item) hide = true;
			});
			return hide;
		};
		const includeGlossary = (title) => {
			const allInclusions = [{
				title: "Original Subsidy Cost",
				glossary: "loan-subsidy-cost"
			}, {
				title: "Face Value of Direct Loan",
				glossary: "face-value-of-loan"
			}];
			let include = null;
			allInclusions.forEach((item) => {
				if (title === item.title) include = item;
			});
			return include ? /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(GlossaryLink, { term: include.glossary }) : null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
			className: `award-amounts__data-wrapper ${awardAmountType}`,
			"data-testid": "award-amounts__data-wrapper",
			children: [Object.keys(amountMapByCategoryTitle).sort(sortTableTitles).map((title) => hideRow(title) ? null : /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
				className: "award-amounts__data-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "remove-indent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { className: `award-amounts__data-icon ${awardTableClassMap[title]}` }),
						title,
						includeGlossary(title)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { children: amountMapByCategoryTitle[title] === null ? "--" : amountMapByCategoryTitle[title] })]
			}, uniqueId(title))), overspendingRow]
		});
	};
	AwardAmountsTable.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/award/shared/awardAmounts/AwardAmountsSection.jsx
var import_jsx_runtime$28, propTypes$25, AwardAmountsSection;
var init_AwardAmountsSection = __esmMin((() => {
	init_index_es();
	init_awardAmountHelper();
	init_tooltips();
	init_AwardSection();
	init_AwardSectionHeader();
	init_AwardAmountsChart();
	init_AwardAmountsTable();
	init_JumpToSectionButton();
	init_propTypes();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$25 = {
		awardType: AWARD_TYPE_PROPS,
		awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
		jumpToTransactionHistoryTable: PropTypes.func
	};
	AwardAmountsSection = ({ awardOverview, awardType, jumpToTransactionHistoryTable }) => {
		const [active, setActive] = useState("overall");
		const spendingScenario = determineSpendingScenarioByAwardType(awardType, awardOverview, active === "infrastructure");
		const tooltip = getToolTipBySectionAndAwardType("awardAmounts", awardType);
		const switchTab = (tab) => {
			setActive(tab);
		};
		const tabTypes = generateDefcTabs(awardOverview);
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(AwardSection, {
			type: "column",
			className: "award-viz award-amounts",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
				className: "award__col__content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(AwardSectionHeader, {
					title: "$ Award Amounts",
					tooltip
				}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
					className: "award-amounts__content",
					children: [
						tabTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
							style: { paddingBottom: "20px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(vs, {
								active,
								switchTab,
								types: tabTypes
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(AwardAmountsChart, {
							awardOverview,
							awardType,
							spendingScenario,
							fileCType: active
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(AwardAmountsTable, {
							showFileC: awardOverview._fileCObligated !== 0 || awardOverview._fileCOutlay !== 0,
							awardData: awardOverview,
							awardAmountType: awardType,
							spendingScenario,
							fileCType: active
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(JumpToSectionButton, {
				icon: "table",
				linkText: "View Transaction History",
				onClick: jumpToTransactionHistoryTable
			})]
		});
	};
	AwardAmountsSection.propTypes = propTypes$25;
}));
//#endregion
//#region src/js/components/award/shared/ExpandableAwardSection.jsx
var import_jsx_runtime$27, propTypes$24, buttonValueByButtonTypeAndState, maxChars, ExpandableAwardSection;
var init_ExpandableAwardSection = __esmMin((() => {
	import_jsx_runtime$27 = require_jsx_runtime();
	propTypes$24 = {
		type: PropTypes.oneOf(["primary", "secondary"]),
		buttonClass: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		secondaryContainerClass: PropTypes.string,
		primaryContainerClass: PropTypes.string,
		children: PropTypes.node
	};
	buttonValueByButtonTypeAndState = {
		primary: {
			expanded: "SHOW LESS",
			contracted: "SHOW MORE"
		},
		secondary: {
			expanded: "read less",
			contracted: "read more"
		}
	};
	maxChars = 210;
	ExpandableAwardSection = ({ type = "primary", buttonClass = "award-expandable-btn", content, secondaryContainerClass = "award-expandable-section__secondary", primaryContainerClass = "award-expandable-section__primary", children }) => {
		const [buttonValue, setButtonValue] = useState(buttonValueByButtonTypeAndState[type].contracted);
		const [isExpanded, setExpanded] = useState(false);
		const toggleButton = (e, prevButtonValue = buttonValue, prevIsExpanded = isExpanded) => {
			const newButtonValue = prevButtonValue === buttonValueByButtonTypeAndState[type].expanded ? buttonValueByButtonTypeAndState[type].contracted : buttonValueByButtonTypeAndState[type].expanded;
			setExpanded(!prevIsExpanded);
			setButtonValue(newButtonValue);
		};
		const button = /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("button", {
			onClick: toggleButton,
			className: `${buttonClass} ${type}-btn`,
			children: buttonValue
		});
		if (type === "secondary") {
			const isContentTruncated = content.length > maxChars;
			const truncatedContent = `${content.substring(0, maxChars)}...`;
			return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("p", {
				className: secondaryContainerClass,
				children: [isContentTruncated && !isExpanded ? truncatedContent : content, isContentTruncated && button]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
			className: primaryContainerClass,
			children: [
				children,
				isExpanded && content,
				button
			]
		});
	};
	ExpandableAwardSection.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/components/award/shared/description/LineTree.jsx
var import_jsx_runtime$26, propTypes$23, LineTree;
var init_LineTree = __esmMin((() => {
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$23 = {
		type: PropTypes.oneOf(["naics", "psc"]),
		data: PropTypes.shape({})
	};
	LineTree = ({ type, data }) => {
		const parsedData = Object.keys(data).filter((tierType) => !isEmpty(data[tierType])).sort((tierType1, tierType2) => {
			const first = data[tierType1].code;
			const second = data[tierType2].code;
			if (first === "--") return -1;
			if (second === "--") return 1;
			if (first.length < second.length) return -1;
			if (second.length < first.length) return 1;
			return 0;
		}).reduce((acc, tierType) => ({
			...acc,
			[tierType]: data[tierType]
		}), {});
		const tiersInHierarchialOrder = Object.keys(parsedData);
		const numberOfSections = tiersInHierarchialOrder.length;
		const getTierData = (index) => {
			if (tiersInHierarchialOrder.length - 1 >= index) return parsedData[tiersInHierarchialOrder[index]];
			return false;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
			className: `line-tree-${type}`,
			children: getTierData(0) && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
				className: "tier--1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: type === "psc" ? getTierData(0).description : `${getTierData(0).code} : ${getTierData(0).description}` }), getTierData(1) && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: `tier--2 ${numberOfSections <= 2 ? "tier--last" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: `${getTierData(1).code}: ${getTierData(1).description}` }), getTierData(2) && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
						className: `tier--3 ${numberOfSections <= 3 ? "tier--last" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: `${getTierData(2).code}: ${getTierData(2).description}` }), getTierData(3) && /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
							className: `tier--4 ${numberOfSections <= 4 ? "tier--last" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: `${getTierData(3).code}: ${getTierData(3).description}` })
						})]
					})]
				})]
			})
		});
	};
	LineTree.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/award/shared/description/AwardDescription.jsx
var import_jsx_runtime$25, propTypes$22, AwardDescription;
var init_AwardDescription = __esmMin((() => {
	init_index_es();
	init_Icons();
	init_GlossaryLink();
	init_AwardSection();
	init_AwardSectionHeader();
	init_ExpandableAwardSection();
	init_LineTree();
	init_tooltips();
	init_propTypes();
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$22 = {
		description: PropTypes.string,
		naics: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		psc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		awardType: AWARD_TYPE_PROPS
	};
	AwardDescription = ({ description, naics = null, psc = null, awardType }) => {
		const tooltip = getToolTipBySectionAndAwardType("description", awardType);
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)(AwardSection, {
			type: "column",
			className: "award-viz award-description",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(AwardSectionHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(SpeechBubble, {}),
				tooltip,
				title: "Description",
				tooltipWide: awardType === "contract" || awardType === "idv"
			}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "award-description__content",
				children: [description === "--" ? /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Go, {}) : /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(ExpandableAwardSection, {
					contentClassName: "award-description__description",
					type: "secondary",
					content: description
				}), naics && psc && /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)(Qs, {
					hasGutter: true,
					className: "award-description__naics-psc",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)($s, {
						tablet: 6,
						className: "naics-psc__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
							className: "naics-psc__heading",
							children: ["North American Industry Classification System (NAICS)", /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("span", { children: ["Code", /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(GlossaryLink, {
								alt: "View glossary definition of NAICS",
								showHoverText: true,
								term: "naics"
							})] })]
						}), Object.keys(naics).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Go, {}) : /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(LineTree, {
							type: "naics",
							data: naics
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)($s, {
						tablet: 6,
						className: "naics-psc__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
							className: "naics-psc__heading psc__extra-margin",
							children: ["Product or Service Code", /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("span", { children: ["(PSC)", /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(GlossaryLink, {
								showHoverText: true,
								alt: "View glossary definition of Product or Service Code (PSC)",
								term: "product-or-service-code-psc"
							})] })]
						}), Object.keys(psc).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Go, {}) : /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(LineTree, {
							type: "psc",
							data: psc
						})]
					})]
				})]
			})]
		});
	};
	AwardDescription.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/components/award/contract/ContractContent.jsx
/**
* ContractContent.jsx
* Created by David Trinh 10/9/2018
**/
var import_jsx_runtime$24, propTypes$21, ContractContent;
var init_ContractContent = __esmMin((() => {
	init_awardType();
	init_BaseAwardAmounts();
	init_AwardHistorySectionContainer();
	init_awardHistorySection();
	init_ContractGrantActivityContainer();
	init_AdditionalInfo();
	init_AwardOverviewLeftSection();
	init_AwardOverviewRightSection();
	init_FederalAccountsSection();
	init_AwardPageWrapper();
	init_AwardSection();
	init_AwardAmountsSection();
	init_AwardDescription();
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$21 = {
		awardId: PropTypes.string,
		overview: PropTypes.object,
		jumpToSection: PropTypes.func,
		counts: PropTypes.object,
		isSubAwardIdClicked: PropTypes.bool,
		subAwardIdClicked: PropTypes.func,
		defCodes: PropTypes.array,
		unlinked: PropTypes.bool
	};
	ContractContent = ({ awardId, overview, jumpToSection, counts, isSubAwardIdClicked, subAwardIdClicked, defCodes, unlinked }) => {
		const [activeTab, setActiveTab] = useState("transaction");
		const glossarySlug = glossaryLinks[overview.type];
		const glossaryLink = glossarySlug ? `/award/${awardId}?glossary=${glossarySlug}` : null;
		const jumpToFederalAccountsHistory = () => {
			setActiveTab("federal_account");
			jumpToSection("award-history");
		};
		const awardAmountData = Object.create(BaseAwardAmounts);
		awardAmountData.populate(overview, overview.category, defCodes);
		const jumpToTransactionHistoryTable = () => {
			setActiveTab("transaction");
			jumpToSection("award-history");
		};
		const jumpToSubAwardHistoryTable = () => {
			setActiveTab("subaward");
			jumpToSection("award-history");
		};
		useEffect(() => {
			if (isSubAwardIdClicked && awardTypesWithSubawards.includes(overview.category)) {
				jumpToSubAwardHistoryTable();
				subAwardIdClicked(false);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(AwardPageWrapper, {
			allDefCodes: overview.defCodes,
			glossaryLink,
			overviewType: overview.type,
			identifier: overview.piid,
			title: overview.title,
			lastModifiedDateLong: overview.periodOfPerformance.lastModifiedDateLong,
			awardType: "contract",
			dates: overview.periodOfPerformance,
			parentId: overview.parentAwardDetails.awardId,
			unlinked,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(AwardSection, {
					type: "row",
					className: "award-overview",
					id: "award-overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardOverviewLeftSection, {
						awardingAgency: overview.awardingAgency,
						recipient: overview.recipient
					}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardOverviewRightSection, {
						jumpToSubAwardHistoryTable,
						jumpToSection,
						counts,
						overview
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(AwardSection, {
					type: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardAmountsSection, {
						awardType: overview.category,
						jumpToTransactionHistoryTable,
						awardOverview: awardAmountData
					}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardDescription, {
						awardId,
						awardType: overview.category,
						description: overview.description,
						naics: overview.naics,
						psc: overview.psc
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(AwardSection, {
					className: "award-contract-activity-section",
					type: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(ContractGrantActivityContainer, {
						awardId,
						awardType: overview.category,
						dates: overview.periodOfPerformance,
						totalObligation: overview._baseAndAllOptions,
						jumpToTransactionHistoryTable
					}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(FederalAccountsSection, {
						jumpToFederalAccountsHistory,
						awardType: overview.category,
						unlinked
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardSection, {
					className: "award-history-section",
					type: "row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AwardHistory, {
						overview,
						setActiveTab,
						activeTab
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(AdditionalInfo, { overview })
			]
		});
	};
	ContractContent.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/models/v2/utils.js
var dayjs$1, parseDate$1;
var init_utils = __esmMin((() => {
	dayjs$1 = require_dayjs_min();
	parseDate$1 = (dateString, format = "YYYY-MM-DD") => {
		if (dateString) {
			const date = dayjs$1(dateString, format);
			if (date.isValid()) return date;
		}
		return null;
	};
}));
//#endregion
//#region src/js/models/v2/award/BaseReferencedAwardResult.js
var BaseReferencedAwardResult;
var init_BaseReferencedAwardResult = __esmMin((() => {
	init_moneyFormatter();
	init_utils();
	BaseReferencedAwardResult = {
		populate(data) {
			this.id = data.award_id || "";
			this.internalId = data.generated_unique_award_id ? encodeURIComponent(`${data.generated_unique_award_id}`) : "";
			this.piid = data.piid || "";
			this.awardType = data.award_type || "";
			this.awardingAgency = data.awarding_agency || "";
			this.awardingAgencyId = data.awarding_agency_id || "";
			this.awardingAgencySlug = data.awarding_agency_slug;
			this._description = data.description || "";
			this.agency = data.funding_agency || "";
			this.agencyId = data.funding_agency_id || "";
			this.agencySlug = data.agency_slug;
			this._obligatedAmount = data.obligated_amount || 0;
			this._lastDateToOrder = parseDate$1(data.last_date_to_order || null);
			this._endDate = parseDate$1(data.period_of_performance_current_end_date || null);
			this._startDate = parseDate$1(data.period_of_performance_start_date || null);
		},
		get startDate() {
			if (!this._startDate) return "";
			return this._startDate.format("MM/DD/YYYY");
		},
		get endDate() {
			if (!this._endDate) return "";
			return this._endDate.format("MM/DD/YYYY");
		},
		get lastDateToOrder() {
			if (!this._lastDateToOrder) return "";
			return this._lastDateToOrder.format("MM/DD/YYYY");
		},
		get obligatedAmount() {
			return formatMoney(this._obligatedAmount);
		},
		get description() {
			const maxChars = 200;
			if (this._description.length > maxChars) return `${this._description.substring(0, maxChars)}...`;
			return this._description;
		}
	};
}));
//#endregion
//#region src/js/dataMapping/award/referencedAwards.js
var referencedAwardsColumns;
var init_referencedAwards = __esmMin((() => {
	referencedAwardsColumns = {
		child_idvs: [
			{
				name: "piid",
				label: "Award ID",
				field: "piid"
			},
			{
				name: "awardingAgency",
				label: "Awarding Agency",
				field: "awarding_agency"
			},
			{
				name: "awardType",
				label: "Award Type",
				field: "award_type"
			},
			{
				name: "obligatedAmount",
				label: "Combined Obligated Amount",
				field: "obligated_amount"
			},
			{
				name: "startDate",
				label: "Start Date",
				field: "period_of_performance_start_date"
			},
			{
				name: "lastDateToOrder",
				label: "Ordering Period End Date",
				field: "last_date_to_order"
			},
			{
				name: "description",
				label: "Description",
				field: "description"
			}
		],
		child_awards: [
			{
				name: "piid",
				label: "Award ID",
				field: "piid"
			},
			{
				name: "awardingAgency",
				label: "Awarding Agency",
				field: "awarding_agency"
			},
			{
				name: "awardType",
				label: "Award Type",
				field: "award_type"
			},
			{
				name: "obligatedAmount",
				label: "Obligated Amount",
				field: "obligated_amount"
			},
			{
				name: "startDate",
				label: "Start Date",
				field: "period_of_performance_start_date"
			},
			{
				name: "endDate",
				label: "End Date",
				field: "period_of_performance_current_end_date"
			},
			{
				name: "description",
				label: "Base Transaction Description",
				field: "description"
			}
		],
		grandchild_awards: [
			{
				name: "piid",
				label: "Award ID",
				field: "piid"
			},
			{
				name: "awardingAgency",
				label: "Awarding Agency",
				field: "awarding_agency"
			},
			{
				name: "awardType",
				label: "Award Type",
				field: "award_type"
			},
			{
				name: "obligatedAmount",
				label: "Obligated Amount",
				field: "obligated_amount"
			},
			{
				name: "startDate",
				label: "Start Date",
				field: "period_of_performance_start_date"
			},
			{
				name: "endDate",
				label: "End Date",
				field: "period_of_performance_current_end_date"
			},
			{
				name: "description",
				label: "Description",
				field: "description"
			}
		]
	};
}));
//#endregion
//#region src/js/components/award/idv/referencedAwards/ReferencedAwardsTable.jsx
/**
* ReferencedAwardsTable.jsx
* Created by Lizzie Salita 2/19/19
**/
var import_jsx_runtime$23, ReferencedAwardsTable;
var init_ReferencedAwardsTable = __esmMin((() => {
	init_index_es();
	init_development();
	init_referencedAwards();
	init_StateLandingTableSorter();
	init_ResultsTableNoResults();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	import_jsx_runtime$23 = require_jsx_runtime();
	ReferencedAwardsTable = class extends React.Component {
		static propTypes = {
			tableType: PropTypes.string,
			results: PropTypes.array,
			counts: PropTypes.object,
			inFlight: PropTypes.bool,
			error: PropTypes.bool,
			page: PropTypes.object,
			limit: PropTypes.number,
			sort: PropTypes.object,
			order: PropTypes.object,
			changePage: PropTypes.func,
			updateSort: PropTypes.func
		};
		generateHeaderCells() {
			const { tableType, sort, order } = this.props;
			return referencedAwardsColumns[this.props.tableType].map((col) => /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("th", {
				className: "referenced-awards-table__head-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: col.name === "obligatedAmount" ? "header-cell header-cell_right" : "header-cell",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "header-cell__text",
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
							className: "header-cell__title",
							children: col.label
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(StateLandingTableSorter, {
						field: col.field,
						label: col.label,
						active: {
							field: sort[tableType],
							direction: order[tableType]
						},
						setSort: this.props.updateSort
					})]
				})
			}, col.field));
		}
		generateRows() {
			return this.props.results.map((row) => {
				const columns = referencedAwardsColumns[this.props.tableType];
				return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("tr", {
					className: "referenced-awards-table__body-row",
					children: columns.map((col) => {
						let data = row[col.name];
						if (col.name === "piid") data = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Link, {
							to: `/award/${row.internalId}`,
							children: row[col.name]
						});
						if (col.name === "awardingAgency" && row.awardingAgencySlug) data = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Link, {
							to: `/agency/${row.awardingAgencySlug}`,
							children: row[col.name]
						});
						return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("td", {
							className: `referenced-awards-table__body-cell ${col.name === "obligatedAmount" ? "recipient-list__body-cell_right" : ""}`,
							children: data || "--"
						}, `${row.internalId}-${col.name}`);
					})
				}, `row-${row.internalId}`);
			});
		}
		render() {
			let message = null;
			let content = null;
			if (this.props.inFlight) {
				message = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ResultsTableLoadingMessage, {});
				content = null;
			} else if (this.props.error) {
				message = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ResultsTableErrorMessage, {});
				content = null;
			} else if (this.props.results.length > 0) {
				message = null;
				content = /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("table", {
					className: "referenced-awards-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("thead", {
						className: "referenced-awards-table__head",
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("tr", {
							className: "referenced-awards-table__head-row",
							children: this.generateHeaderCells()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("tbody", { children: this.generateRows() })]
				});
			} else {
				message = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ResultsTableNoResults, {});
				content = null;
			}
			const totalItems = this.props.counts && this.props.counts[this.props.tableType] || 0;
			const { page, tableType } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
				className: "referenced-awards-results",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Ka, {
						resultsText: true,
						totalItems,
						pageSize: this.props.limit,
						currentPage: page[tableType],
						changePage: this.props.changePage
					}),
					content,
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "results-table-message-container",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Ka, {
						resultsText: true,
						totalItems,
						pageSize: this.props.limit,
						currentPage: page[tableType],
						changePage: this.props.changePage
					})
				]
			});
		}
	};
}));
//#endregion
//#region src/js/components/award/idv/referencedAwards/ReferencedAwardsSection.jsx
/**
* ReferencedAwardsSection.jsx
* Created by Lizzie Salita 2/14/19
**/
var import_jsx_runtime$22, propTypes$20, ReferencedAwardsSection;
var init_ReferencedAwardsSection = __esmMin((() => {
	init_index_es();
	init_ResultsTableTabs();
	init_ReferencedAwardsTable();
	init_InfoTooltipContent();
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$20 = {
		results: PropTypes.array,
		counts: PropTypes.object,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		page: PropTypes.object,
		limit: PropTypes.number,
		sort: PropTypes.object,
		order: PropTypes.object,
		tableType: PropTypes.string,
		tableTypes: PropTypes.array,
		switchTab: PropTypes.func,
		changePage: PropTypes.func,
		updateSort: PropTypes.func
	};
	ReferencedAwardsSection = class extends React.Component {
		render() {
			let tabs = null;
			if (this.props.counts) tabs = /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(ResultsTableTabs, {
				active: this.props.tableType,
				switchTab: this.props.switchTab,
				types: this.props.tableTypes,
				counts: this.props.counts
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
				id: "award-referenced-awards",
				className: "referenced-awards",
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					className: "award-viz",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
							className: "award-viz__heading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
									className: "award-viz__icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("img", {
										src: "img/icon-hierarchy.png",
										alt: "pedigree chart"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h3", {
									className: "award-viz__title",
									children: "Orders Made Under this IDV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(ds, {
									className: "award-section-tt",
									icon: "info",
									tooltipPosition: "left",
									wide: true,
									tooltipComponent: relatedAwardsInfo
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("hr", {}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
							className: "referenced-awards__content",
							children: [tabs, /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(ReferencedAwardsTable, { ...this.props })]
						})
					]
				})
			});
		}
	};
	ReferencedAwardsSection.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/containers/award/idv/ReferencedAwardsContainer.jsx
/**
* ReferencedAwardsContainer.jsx
* Created by Lizzie Salita 2/14/19
**/
var import_jsx_runtime$21, propTypes$19, defaultProps, tableTypes, ReferencedAwardsContainer, ReferencedAwardsContainer_default;
var init_ReferencedAwardsContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_idvHelper();
	init_BaseReferencedAwardResult();
	init_ReferencedAwardsSection();
	import_jsx_runtime$21 = require_jsx_runtime();
	propTypes$19 = {
		award: PropTypes.object,
		tableType: PropTypes.string,
		switchTab: PropTypes.func
	};
	defaultProps = { tableType: "child_awards" };
	tableTypes = [
		{
			label: "Child Award Orders",
			internal: "child_awards",
			enabled: true
		},
		{
			label: "Child IDV Orders",
			internal: "child_idvs",
			enabled: true
		},
		{
			label: "Grandchild Award Orders",
			internal: "grandchild_awards",
			enabled: true
		}
	];
	ReferencedAwardsContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				limit: 10,
				sort: {
					child_idvs: "period_of_performance_start_date",
					child_awards: "period_of_performance_start_date",
					grandchild_awards: "period_of_performance_start_date"
				},
				page: {
					child_idvs: 1,
					child_awards: 1,
					grandchild_awards: 1
				},
				order: {
					child_idvs: "desc",
					child_awards: "desc",
					grandchild_awards: "desc"
				},
				tableTypes,
				inFlight: false,
				error: false,
				results: []
			};
			this.request = null;
			this.switchTab = this.switchTab.bind(this);
			this.changePage = this.changePage.bind(this);
			this.updateSort = this.updateSort.bind(this);
		}
		componentDidMount() {
			if (this.props.award.id && this.props.award.idvDetails) this.pickDefaultTab();
		}
		componentDidUpdate(prevProps) {
			if ((this.props.award.id !== prevProps.award.id || !isEqual(this.props.award.idvDetails, prevProps.award.idvDetails)) && this.props.award.idvDetails) this.pickDefaultTab();
			if (this.props.tableType !== prevProps.tableType && this.props.award.idvDetails) this.loadResults();
		}
		componentWillUnmount() {
			if (this.request) this.request.cancel();
		}
		loadResults() {
			if (this.request) this.request.cancel();
			const { page, sort, order } = this.state;
			const { tableType } = this.props;
			const params = {
				award_id: this.props.award.id,
				type: tableType,
				limit: this.state.limit,
				page: page[tableType],
				sort: sort[tableType],
				order: order[tableType]
			};
			this.setState({
				inFlight: true,
				error: false
			});
			this.request = fetchReferencedAwards(params);
			this.request.promise.then((res) => {
				this.parseAwards(res.data.results);
			}).catch((err) => {
				if (!isCancel(err)) {
					this.setState({
						inFlight: false,
						error: true
					});
					console.log(err);
				}
			});
		}
		pickDefaultTab() {
			const { idvDetails: counts } = this.props.award;
			const defaultTab = findKey(pick(counts, tableTypes.map((type) => type.internal)), (count) => count !== 0);
			if (counts.child_awards === 0 && defaultTab) this.switchTab(defaultTab);
			else this.loadResults();
		}
		parseAwards(data) {
			const results = data.map((result) => {
				const referencedAward = Object.create(BaseReferencedAwardResult);
				referencedAward.populate(result);
				return referencedAward;
			});
			this.setState({
				inFlight: false,
				error: false,
				results
			});
		}
		updateSort(newSort, newOrder) {
			const { sort, order } = this.state;
			const { tableType } = this.props;
			const updatedSort = Object.assign({}, sort, { [tableType]: newSort });
			const updatedOrder = Object.assign({}, order, { [tableType]: newOrder });
			this.setState({
				sort: updatedSort,
				order: updatedOrder
			}, () => {
				this.loadResults();
			});
		}
		changePage(newPage) {
			const { page } = this.state;
			const updatedPage = Object.assign({}, page, { [this.props.tableType]: newPage });
			this.setState({ page: updatedPage }, () => {
				this.loadResults();
			});
		}
		switchTab(tableType) {
			this.props.switchTab(tableType);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ReferencedAwardsSection, {
				...this.state,
				counts: this.props.award.idvDetails,
				switchTab: this.switchTab,
				changePage: this.changePage,
				updateSort: this.updateSort,
				tableType: this.props.tableType,
				tableTypes
			});
		}
	};
	ReferencedAwardsContainer.propTypes = propTypes$19;
	ReferencedAwardsContainer.defaultProps = defaultProps;
	ReferencedAwardsContainer_default = connect_default((state) => ({ award: state.award }))(ReferencedAwardsContainer);
}));
//#endregion
//#region src/js/helpers/paginationHelper.js
var calculatePageRange;
var init_paginationHelper = __esmMin((() => {
	calculatePageRange = (page, limit, count) => {
		const start = (page - 1) * limit + 1;
		let end = page * limit;
		if (page === Math.ceil(count / limit)) end = count;
		return {
			start,
			end
		};
	};
}));
//#endregion
//#region src/js/components/award/idv/activity/chart/ActivityChartBar.jsx
/**
* ActivityChartBar.jsx
* Created by Lizzie Salita 5/14/19
*/
var import_jsx_runtime$20, propTypes$18, ActivityChartBar;
var init_ActivityChartBar = __esmMin((() => {
	import_jsx_runtime$20 = require_jsx_runtime();
	propTypes$18 = {
		start: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
		yPosition: PropTypes.number,
		description: PropTypes.string,
		data: PropTypes.object,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		style: PropTypes.object,
		pattern: PropTypes.object
	};
	ActivityChartBar = class extends React.Component {
		constructor(props) {
			super(props);
			this.enteredCell = this.enteredCell.bind(this);
			this.exitedCell = this.exitedCell.bind(this);
		}
		enteredCell() {
			this.props.showTooltip(this.props.data);
		}
		exitedCell() {
			this.props.hideTooltip(this.props.data);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("g", {
				className: "activity-chart-bar",
				"aria-label": this.props.description,
				onMouseMove: this.enteredCell,
				onMouseLeave: this.exitedCell,
				ref: (g) => {
					this.element = g;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("defs", { children: this.props.pattern }),
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("desc", { children: this.props.description }),
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("rect", {
						style: this.props.style,
						x: this.props.start,
						y: this.props.yPosition,
						width: this.props.width,
						height: this.props.height
					})
				]
			});
		}
	};
	ActivityChartBar.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/components/award/idv/activity/chart/ActivityChart.jsx
/**
* ActivityChart.jsx
* Created by Lizzie Salita 5/14/19
**/
var import_jsx_runtime$19, propTypes$17, ActivityChart;
var init_ActivityChart = __esmMin((() => {
	init_src();
	init_moneyFormatter();
	init_fiscalYearHelper();
	init_RectanglePattern();
	init_SVGLine();
	init_ActivityXAxis();
	init_ActivityYAxis();
	init_ActivityChartBar();
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$17 = {
		awards: PropTypes.array,
		height: PropTypes.number,
		width: PropTypes.number,
		xSeries: PropTypes.array,
		ySeries: PropTypes.array,
		padding: PropTypes.object,
		barHeight: PropTypes.number,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		showTooltipStroke: PropTypes.bool,
		awardIndexForTooltip: PropTypes.number,
		setOverspent: PropTypes.func
	};
	ActivityChart = ({ awards, height, width, xSeries, ySeries, padding = {
		left: 45,
		bottom: 30
	}, barHeight = 10, showTooltip, hideTooltip, showTooltipStroke, awardIndexForTooltip, setOverspent }) => {
		const [xRange, setXRange] = useState([]);
		const [xTicks, setXTicks] = useState(null);
		const [yTicks, setYTicks] = useState(null);
		const [graphWidth, setGraphWidth] = useState(0);
		const [graphHeight, setGraphHeight] = useState(0);
		const [bars, setBars] = useState([]);
		const xScaleRef = useRef(null);
		const yScaleRef = useRef(null);
		const getXTickDateAndLabel = (date) => {
			const newDate = new Date(date);
			const month = newDate.getMonth();
			let year = newDate.getFullYear();
			if (month === 9) year += 1;
			const shortYear = year.toString().slice(-2);
			return {
				date: newDate,
				label: `${newDate.toLocaleString("en-us", { month: "short" }).toUpperCase()} FY '${shortYear}`
			};
		};
		const createBars = () => {
			if (!bars) return null;
			return bars.map((bar, index) => {
				const { barHeight: barHeightTemp, start, barWidth, yPosition, description } = bar;
				let style = { fill: `url(#normal${index})` };
				if (bar._obligatedAmount > bar._awardedAmount) style = { fill: "url(#diagonalHatch)" };
				style = {
					stroke: "white",
					strokeWidth: 1,
					...style
				};
				if (showTooltipStroke && awardIndexForTooltip === index) {
					style.stroke = "#3676b6";
					style.strokeWidth = 1;
				}
				const barHeightString = barHeightTemp.toString();
				const patternProps = {
					id: `normal${index}`,
					width: barHeightString,
					height: barHeightString
				};
				let pattern = /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(RectanglePattern, {
					patternProps,
					rectangles: [{
						key: `normal${index}`,
						width: "100%",
						height: barHeightString,
						fill: "#D8D8D8"
					}, {
						key: `normal2${index}`,
						width: `${bar.obligatedAmountWidth}`,
						height: barHeightString,
						fill: "#94BFA2"
					}]
				});
				if (bar._obligatedAmount > bar._awardedAmount) {
					patternProps.id = "diagonalHatch";
					patternProps.patternTransform = "rotate(135, 0, 0)";
					patternProps.patternUnits = "userSpaceOnUse";
					pattern = /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(RectanglePattern, {
						patternProperties: patternProps,
						rectangles: [{
							key: `overspending${index}`,
							width: "100%",
							height: barHeightString,
							fill: "#94BFA2"
						}, {
							key: `overspending2${index}`,
							width: "2",
							height: barHeightString,
							fill: "rgb(188,92,35)"
						}]
					});
				}
				return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("g", {
					tabIndex: "0",
					className: "activity-chart-bar-container",
					description,
					children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(ActivityChartBar, {
						style,
						pattern,
						index,
						height: barHeight,
						start,
						width: barWidth,
						yPosition,
						data: bar,
						showTooltip,
						hideTooltip
					})
				}, `bar-${bar._awardedAmount}-${index}`);
			});
		};
		const generateBarData = useCallback(() => {
			if (!xScaleRef.current) return;
			const newBars = awards.map((bar, index) => {
				const data = bar;
				const start = xScaleRef.current(bar._startDate.valueOf()) + padding.left;
				const end = xScaleRef.current(bar._endDate.valueOf()) + padding.left;
				data.barWidth = end - start;
				if (data.barWidth < 1.5) data.barWidth = 1.5;
				data.obligatedAmountWidth = linear().domain([0, bar._awardedAmount]).range([0, data.barWidth])(bar._obligatedAmount);
				data.yPosition = height - 30 - yScaleRef.current(bar._obligatedAmount) - barHeight - 1;
				data.index = index;
				data.graphWidth = graphWidth;
				data.graphHeight = graphHeight;
				data.start = start;
				data.end = end;
				data.x = start;
				data.y = 385 - data.yPosition - (barHeight - 4);
				const percentage = calculatePercentage(bar._obligatedAmount, bar._awardedAmount);
				data.description = `A ${bar.grandchild ? "grandchild" : "child"} award with a start date of ${bar.startDate},
                an end date of ${bar.endDate},
                an awarded amount of ${bar.awardedAmount} displayed in grey,
                and an obligated amount of ${bar.obligatedAmount},
                displayed in green. (${percentage})`;
				data.barHeight = barHeight;
				if (bar._obligatedAmount > bar._awardedAmount) setOverspent();
				return data;
			});
			setBars(newBars);
		}, [
			awards,
			barHeight,
			graphHeight,
			graphWidth,
			height,
			padding.left,
			setOverspent
		]);
		useEffect(() => {
			generateBarData();
		}, [generateBarData]);
		const xyRange = useCallback(() => {
			const newYRange = [];
			const newXRange = [];
			let minValueY = 0;
			let maxValueY = awards[0]._obligatedAmount;
			let minValueX = awards[0]._startDate.valueOf();
			let maxValueX = awards[0]._endDate.valueOf();
			if (awards.length > 1) {
				minValueY = min(ySeries);
				maxValueY = max(ySeries);
				minValueX = min(xSeries);
				maxValueX = max(xSeries);
			}
			newYRange.push(minValueY);
			newYRange.push(maxValueY);
			newXRange.push(minValueX);
			newXRange.push(maxValueX);
			return {
				newXRange,
				newYRange
			};
		}, [
			awards,
			xSeries,
			ySeries
		]);
		const graphWidthAndHeight = useCallback(() => {
			return {
				newGraphWidth: width - padding.left,
				newGraphHeight: height - padding.bottom
			};
		}, [
			height,
			padding.bottom,
			padding.left,
			width
		]);
		const createXTicks = useCallback((newXScale, newGraphWidth) => {
			const newXTicks = newXScale.ticks(5);
			const startOfGraphMillis = newXScale.invert(0);
			const endOfGraphMillis = newXScale.invert(newGraphWidth);
			return newXTicks.reduce((acc, tick) => {
				const quarterMillis = nearestQuarterDate(tick);
				if (startOfGraphMillis <= quarterMillis && quarterMillis <= endOfGraphMillis) {
					acc.push(getXTickDateAndLabel(quarterMillis));
					return acc;
				}
				return acc;
			}, []);
		}, []);
		const generateChartData = useCallback(() => {
			const { newXRange, newYRange } = xyRange();
			const { newGraphWidth, newGraphHeight } = graphWidthAndHeight();
			const newXScale = linear().domain(newXRange).range([0, newGraphWidth]).nice();
			const newYScale = linear().domain(newYRange).range([0, newGraphHeight]).nice();
			const newXTicks = createXTicks(newXScale, newGraphWidth);
			xScaleRef.current = newXScale;
			yScaleRef.current = newYScale;
			setXRange(newXRange);
			setGraphWidth(newGraphWidth);
			setGraphHeight(newGraphHeight);
			setYTicks(newYScale?.ticks(6));
			setXTicks(newXTicks);
		}, [
			createXTicks,
			graphWidthAndHeight,
			xyRange
		]);
		useEffect(() => {
			generateChartData();
		}, [
			awardIndexForTooltip,
			awards,
			width,
			generateChartData
		]);
		const currentDate = Date.now();
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("svg", {
			className: "activity-chart",
			width,
			height: height + 70,
			children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
				className: "activity-chart-body",
				transform: "translate(0,45)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(ActivityYAxis, {
						height: height - padding.bottom,
						padding,
						scale: yScaleRef.current,
						ticks: yTicks
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(ActivityXAxis, {
						width: graphWidth,
						height: height - padding.bottom,
						padding,
						scale: xScaleRef.current,
						ticks: xTicks,
						line: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
						className: "activity-chart-data",
						children: [createBars(), xScaleRef.current && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(SVGLine, {
							scale: xScaleRef.current,
							y1: -10,
							y2: height - padding.bottom,
							textY: 0,
							text: "Today",
							max: xRange[1],
							min: xRange[0],
							position: currentDate,
							showTextPosition: "top",
							adjustmentX: padding.left
						})]
					})
				]
			})
		});
	};
	ActivityChart.propTypes = propTypes$17;
}));
//#endregion
//#region src/js/components/award/idv/activity/ActivityChartTooltip.jsx
/**
* ActivityChartTooltip.jsx
* Created by Jonathan Hill 6/24/19
*/
var import_jsx_runtime$18, arrayOfProperties, ActivityChartTooltip;
var init_ActivityChartTooltip = __esmMin((() => {
	init_development();
	init_moneyFormatter();
	import_jsx_runtime$18 = require_jsx_runtime();
	arrayOfProperties = [
		"recipientName",
		"awardingAgencyName",
		"piid",
		"parentAwardPIID"
	];
	ActivityChartTooltip = class extends React.Component {
		static propTypes = {
			data: PropTypes.object,
			mouseIsInTooltipDiv: PropTypes.func,
			mouseOutOfTooltipDiv: PropTypes.func
		};
		constructor(props) {
			super(props);
			this.state = {
				direction: "top",
				tooltipStyle: { transform: "" },
				windowWidth: 0,
				windowHeight: 0,
				recipientName: props.data.recipientName,
				awardingAgencyName: props.data.awardingAgencyName,
				piid: props.data.piid,
				parentAwardPIID: props.data.parentAwardPIID,
				truncated: false
			};
			throttle(this.measureWindow = this.measureWindow.bind(this), 50);
			this.mouseEnter = this.mouseEnter.bind(this);
		}
		componentDidMount() {
			this.measureWindow();
			window.addEventListener("resize", this.measureWindow);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.data.x !== this.props.data.x || prevProps.data.y !== this.props.data.y) this.positionTooltip();
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWindow);
		}
		getLinks(path, slug, data, params) {
			if (data === "--" || !slug) return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { children: data });
			return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Link, {
				title: this.state.truncated ? params : "",
				to: `/${path}/${slug}`,
				children: data
			});
		}
		measureWindow() {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.setState({
				windowWidth,
				windowHeight
			}, () => {
				this.positionTooltip();
			});
		}
		truncatedWidth(tooltipWidth, divWidth) {
			return this.props.data.graphWidth * (divWidth / 2) / tooltipWidth;
		}
		truncatedCharacterLength(truncatedDivWidth, normalDivWidth, normalCharacterLength) {
			return Math.floor(truncatedDivWidth * normalCharacterLength / normalDivWidth);
		}
		truncateText(text, truncatedLength, propertyName) {
			if (truncatedLength < text.length) {
				const newLength = truncatedLength - 3;
				const truncatedText = `${text.substring(0, newLength).trim()}...`;
				return { [propertyName]: truncatedText };
			}
			return { [propertyName]: text };
		}
		decideOnTooltipWidth(arrayOfDivWidths, tooltipWidth) {
			const truncatedWidths = arrayOfDivWidths.map((divWidth) => this.truncatedWidth(this.props.data.graphWidth, tooltipWidth, divWidth));
			let firstRowWidth = truncatedWidths[0] + truncatedWidths[1];
			if (this.grandparentDiv) {
				const grandparentDiv = this.grandparentDiv.getBoundingClientRect().width;
				firstRowWidth = truncatedWidths[0] + truncatedWidths[1] + grandparentDiv;
			}
			const secondRowWidth = truncatedWidths[2] + truncatedWidths[3] + 50;
			if (firstRowWidth > tooltipWidth || secondRowWidth > tooltipWidth) {
				if (firstRowWidth > secondRowWidth) return firstRowWidth;
				return secondRowWidth;
			}
			return tooltipWidth;
		}
		truncateLogic(arrayOfDivWidths, theTooltipWidth) {
			return new Promise((resolve) => {
				const { recipientName, awardingAgencyName, piid, parentAwardPIID } = this.props.data;
				const arrayOfDivText = [
					recipientName,
					awardingAgencyName,
					piid,
					parentAwardPIID
				];
				const truncatedText = arrayOfDivWidths.map((divWidth) => this.truncatedWidth(theTooltipWidth, divWidth)).map((truncatedDivWidth, index) => this.truncatedCharacterLength(truncatedDivWidth, arrayOfDivWidths[index], arrayOfDivText[index].length)).reduce((acc, truncatedLength, index) => {
					const newText = this.truncateText(arrayOfDivText[index], truncatedLength, arrayOfProperties[index]);
					return {
						...acc,
						...newText
					};
				}, {});
				this.setState({
					...truncatedText,
					truncated: true
				}, () => resolve());
			});
		}
		async positionTooltip() {
			const { data } = this.props;
			const awardingAgencyNameDiv = this.awardAgencyDiv.getBoundingClientRect().width;
			const recipientNameDiv = this.recipientDiv.getBoundingClientRect().width;
			const tooltipDivHeight = this.div.getBoundingClientRect().height;
			let theTooltipWidth = awardingAgencyNameDiv + recipientNameDiv + 50;
			const piidDiv = this.piidDiv.getBoundingClientRect().width;
			const parentDiv = this.parentDiv.getBoundingClientRect().width;
			if (this.grandparentDiv) {
				const grandparentDiv = this.grandparentDiv.getBoundingClientRect().width;
				const totalFirstRowWidth = piidDiv + parentDiv + grandparentDiv + 90;
				if (totalFirstRowWidth > theTooltipWidth) theTooltipWidth = totalFirstRowWidth;
			}
			let xPosition = data.x;
			let distanceFromBottomOfGraphToBar = data.y;
			if (distanceFromBottomOfGraphToBar < tooltipDivHeight) distanceFromBottomOfGraphToBar += tooltipDivHeight + (data.barHeight - 2);
			const spacingFromStartToBar = data.graphWidth - (data.graphWidth - data.start);
			const totalAvailableWidthToTheLeft = spacingFromStartToBar + data.barWidth;
			const totalAvailableWidthToTheRight = data.graphWidth - spacingFromStartToBar;
			let left;
			if (totalAvailableWidthToTheRight < totalAvailableWidthToTheLeft) {
				const percentage = .9 * data.barWidth;
				xPosition -= theTooltipWidth - percentage;
				left = true;
			}
			if (!left && theTooltipWidth > totalAvailableWidthToTheRight) {
				const overshowing = theTooltipWidth - totalAvailableWidthToTheRight;
				xPosition -= overshowing;
			}
			if (xPosition.toString()[0] === "-") {
				const difference = 0 - xPosition;
				theTooltipWidth += difference;
				xPosition = 0;
			}
			if (data.graphWidth < theTooltipWidth) {
				const startDateDiv = this.startDateDiv.getBoundingClientRect().width;
				const endDateDiv = this.endDateDiv.getBoundingClientRect().width;
				const amountsDiv = this.amountsDiv.getBoundingClientRect().width;
				theTooltipWidth = startDateDiv + endDateDiv + amountsDiv + 80;
				let truncateTheseDivWidths = [
					awardingAgencyNameDiv,
					recipientNameDiv,
					piidDiv,
					parentDiv
				];
				if (!this.grandparentDiv) truncateTheseDivWidths = [recipientNameDiv, awardingAgencyNameDiv];
				await this.truncateLogic(truncateTheseDivWidths, theTooltipWidth);
				theTooltipWidth = this.decideOnTooltipWidth([
					piidDiv,
					parentDiv,
					awardingAgencyNameDiv,
					recipientNameDiv
				], theTooltipWidth) + 10;
			}
			this.setState({ tooltipStyle: {
				transform: `translate(${xPosition}px,-${distanceFromBottomOfGraphToBar}px)`,
				width: `${theTooltipWidth}px`
			} });
		}
		mouseEnter() {
			this.props.mouseIsInTooltipDiv(this.props.data);
		}
		render() {
			const { data } = this.props;
			const parentIDVData = data.grandchild ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { children: this.getLinks("award", data.parentGeneratedId, this.state.parentAwardPIID, data.parentAwardPIID) }) : "This IDV";
			const amountTitle = `${formatMoney(data._obligatedAmount)} of ${formatMoney(data._awardedAmount)}`;
			return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "visualization-tooltip",
				ref: (div) => {
					this.containerDiv = div;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "tooltip",
					onMouseEnter: this.mouseEnter,
					onMouseLeave: this.props.mouseOutOfTooltipDiv,
					style: this.state.tooltipStyle,
					ref: (div) => {
						this.div = div;
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("h5", {
						className: "tooltip-title",
						children: [data.grandchild ? "GRANDCHILD" : "CHILD", " AWARD"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "tooltip-body",
						ref: (div) => {
							this.tooltipBody = div;
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "tooltip-body__row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title first-titles",
											children: "PIID"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
											className: "tooltip-body__row-info-data",
											ref: (div) => {
												this.piidDiv = div;
											},
											children: this.getLinks("award", data.generatedId, this.state.piid, data.piid)
										})]
									}),
									data.grandchild && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info",
										id: "grandparentLabel",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title first-titles",
											children: "Grandparent IDV"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
											className: "tooltip-body__row-info-data",
											ref: (div) => {
												this.grandparentDiv = div;
											},
											children: "This IDV"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title first-titles",
											children: "Parent IDV"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
											className: "tooltip-body__row-info-data",
											ref: (div) => {
												this.parentDiv = div;
											},
											children: data.parentGeneratedId ? parentIDVData : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { children: "--" })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "tooltip-body__row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
									className: "tooltip-body__row-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
										className: "tooltip-body__row-info-title",
										children: "Awarding Agency"
									}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
										className: "tooltip-body__row-info-data\n                                    tooltip-body__row-info-data__awarding-agency-name",
										ref: (div) => {
											this.awardAgencyDiv = div;
										},
										children: this.getLinks("agency", data.awardingAgencySlug, this.state.awardingAgencyName, data.awardingAgencyName)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
									className: "tooltip-body__row-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
										className: "tooltip-body__row-info-title",
										children: "Recipient"
									}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
										className: "tooltip-body__row-info-data\n                                    tooltip-body__row-info-data__recipient-name",
										ref: (div) => {
											this.recipientDiv = div;
										},
										children: this.getLinks("recipient", data.recipientId, this.state.recipientName.toUpperCase(), data.recipientName)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "tooltip-body__row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title",
											children: "Start"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
											className: "tooltip-body__row-info-data",
											ref: (d) => {
												this.startDateDiv = d;
											},
											children: data.startDate
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info second-child",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title",
											children: "End"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
											className: "tooltip-body__row-info-data",
											ref: (d) => {
												this.endDateDiv = d;
											},
											children: data.endDate
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
										className: "tooltip-body__row-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h6", {
											className: "tooltip-body__row-info-title",
											children: "Obligated Amount"
										}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
											className: "tooltip-body__row-info-data",
											ref: (d) => {
												this.amountsDiv = d;
											},
											title: amountTitle,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("strong", { children: data._obligatedAmount !== 0 ? `${data.obligatedAmount} ` : "-- " }),
												"of ",
												data._awardedAmount !== 0 ? data.awardedAmount : "--"
											]
										})]
									})
								]
							})
						]
					})]
				})
			});
		}
	};
}));
//#endregion
//#region src/js/components/award/idv/activity/IdvActivityVisualization.jsx
/**
* IdvActivityVisualization.jsx
* Created by Lizzie Salita 5/14/19
**/
var import_jsx_runtime$17, IdvActivityVisualization;
var init_IdvActivityVisualization = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	init_paginationHelper();
	init_Note();
	init_ActivityChart();
	init_ActivityChartTooltip();
	import_jsx_runtime$17 = require_jsx_runtime();
	IdvActivityVisualization = class extends React.Component {
		static propTypes = {
			page: PropTypes.number,
			total: PropTypes.number,
			limit: PropTypes.number,
			changePage: PropTypes.func,
			awards: PropTypes.array,
			xSeries: PropTypes.array,
			ySeries: PropTypes.array,
			selectedItemFunc: PropTypes.func
		};
		constructor(props) {
			super(props);
			this.state = {
				windowWidth: 0,
				visualizationWidth: 0,
				isShowingTooltip: false,
				isHoveringInTooltip: false,
				toolTipData: null,
				awards: props.awards,
				showTooltipStroke: false,
				awardIndexForTooltip: null,
				isOverspent: false
			};
			this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
		}
		componentDidMount() {
			this.handleWindowResize();
			window.addEventListener("resize", this.handleWindowResize);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.handleWindowResize);
		}
		setOverspent = () => {
			this.setState({ isOverspent: true });
		};
		handleWindowResize() {
			const windowWidth = window.innerWidth;
			if (this.state.windowWidth !== windowWidth) this.setState({
				windowWidth,
				visualizationWidth: this.sectionRef.offsetWidth
			});
		}
		showTooltip = (data) => {
			if (!this.state.isShowingTooltip) this.setState({
				isShowingTooltip: true,
				toolTipData: data,
				showTooltipStroke: true,
				awardIndexForTooltip: data.index
			});
		};
		hideTooltip = () => {
			if (!this.state.isHoveringInTooltip) this.setState({
				isShowingTooltip: false,
				showTooltipStroke: false,
				awardIndexForTooltip: null
			});
		};
		mouseIsInTooltipDiv = (data) => {
			this.setState({
				isShowingTooltip: true,
				isHoveringInTooltip: true,
				showTooltipStroke: true,
				awardIndexForTooltip: data.index
			});
		};
		mouseOutOfTooltipDiv = () => {
			this.setState({
				isShowingTooltip: false,
				isHoveringInTooltip: false,
				showTooltipStroke: false,
				awardIndexForTooltip: null
			}, () => this.hideTooltip());
		};
		createMenuData = () => [
			{
				name: "10",
				value: 10,
				key: "10",
				onClick: this.props.selectedItemFunc
			},
			{
				name: "50",
				value: 50,
				key: "50",
				onClick: this.props.selectedItemFunc
			},
			{
				name: "100",
				value: 100,
				key: "100",
				onClick: this.props.selectedItemFunc
			}
		];
		render() {
			const height = 360;
			const message = `if an award has a zero or negative obligated amount,
        or is missing a start and/or end date, it is not displayed in this chart.`;
			const chart = /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ActivityChart, {
				awards: this.state.awards,
				showTooltipStroke: this.state.showTooltipStroke,
				awardIndexForTooltip: this.state.awardIndexForTooltip,
				xSeries: this.props.xSeries,
				ySeries: this.props.ySeries,
				height,
				width: this.state.visualizationWidth,
				showTooltip: this.showTooltip,
				hideTooltip: this.hideTooltip,
				setOverspent: this.setOverspent
			});
			let tt = null;
			if (this.state.isShowingTooltip) tt = /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ActivityChartTooltip, {
				data: this.state.toolTipData,
				mouseIsInTooltipDiv: this.mouseIsInTooltipDiv,
				mouseOutOfTooltipDiv: this.mouseOutOfTooltipDiv
			});
			const pageRange = calculatePageRange(this.props.page, this.props.limit, this.props.total);
			const start = formatNumberWithPrecision(pageRange.start, 0);
			const end = formatNumberWithPrecision(pageRange.end, 0);
			const menuData = this.createMenuData();
			const resultsText = /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "pagination__totals",
				children: [
					"Displaying award orders",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
						className: "current-page-numbers",
						children: [
							start,
							"-",
							end
						]
					}),
					" ",
					"of ",
					formatNumberWithPrecision(this.props.total, 0)
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				ref: (widthRef) => {
					this.sectionRef = widthRef;
				},
				className: "activity-visualization",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "activity-visualization-title",
						children: "Award Amounts and Periods of Performance of Award Orders"
					}),
					chart,
					tt,
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "activity-x-label",
						children: "Period of Performance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "visualization-legend",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "visualization-legend__item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "visualization-legend__circle\n                            visualization-legend__circle_obligated" }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
									className: "visualization-legend__label",
									children: "% Obligated of Potential Award Amount"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "visualization-legend__item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "visualization-legend__circle visualization-legend__circle" }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
									className: "visualization-legend__label",
									children: "% of Potential Funding Remaining"
								})]
							}),
							this.state.isOverspent && /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
								className: "visualization-legend__item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "visualization-legend__circle\n                                visualization-legend__circle_overspent" }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
									className: "visualization-legend__label",
									children: "Over Obligated"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Ka, {
						changePage: this.props.changePage,
						currentPage: this.props.page,
						totalItems: this.props.total,
						pageSize: this.props.limit,
						resultsText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "idv__picker-wrapper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(fc, {
							label: "Show",
							size: "sm",
							classname: "default-picker",
							dropdownClassname: "default-picker__list",
							buttonClassname: "default-picker__button",
							enabled: true,
							selectedOption: menuData.length ? menuData.find((option) => option.value === this.props.limit).name : this.props.limit,
							options: menuData,
							sortFn: (a, b) => a - b
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "default-picker__append",
							children: "per page"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "activity-visualization-note",
						children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Note, { message })
					})
				]
			});
		}
	};
}));
//#endregion
//#region src/js/components/award/idv/activity/IdvActivity.jsx
var import_jsx_runtime$16, propTypes$16, IdvActivity;
var init_IdvActivity = __esmMin((() => {
	init_index_es();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_NoResultsMessage();
	init_dist();
	init_InfoTooltipContent();
	init_IdvActivityVisualization();
	import_jsx_runtime$16 = require_jsx_runtime();
	propTypes$16 = {
		awards: PropTypes.array,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		page: PropTypes.number,
		total: PropTypes.number,
		limit: PropTypes.number,
		changePage: PropTypes.func,
		xSeries: PropTypes.array,
		ySeries: PropTypes.array,
		selectedItemFunc: PropTypes.func
	};
	IdvActivity = (props) => {
		let content;
		let message;
		if (props.inFlight) message = /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ResultsTableLoadingMessage, {});
		else if (props.error) message = /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ResultsTableErrorMessage, {});
		else if (!props.awards.length) message = /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(NoResultsMessage, {});
		else content = /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(IdvActivityVisualization, {
			page: props.page,
			total: props.total,
			limit: props.limit,
			awards: props.awards,
			changePage: props.changePage,
			xSeries: props.xSeries,
			ySeries: props.ySeries,
			selectedItemFunc: props.selectedItemFunc
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "award__col award-viz idv-activity",
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
				className: "award__col__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
						className: "award-viz__heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
								className: "award-viz__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(FontAwesomeIcon, {
									size: "lg",
									icon: "chart-area"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("h3", {
								className: "award-viz__title",
								children: "IDV Activity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ds, {
								className: "award-section-tt",
								icon: "info",
								wide: true,
								tooltipComponent: idvActivityInfo
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
						className: "results-table-message-container",
						children: message
					}),
					content
				]
			})
		});
	};
	IdvActivity.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/models/v2/award/CorePeriodOfPerformance.js
var dayjs, parseDate, formatDate, formatDateLong, CorePeriodOfPerformance;
var init_CorePeriodOfPerformance = __esmMin((() => {
	dayjs = require_dayjs_min();
	parseDate = (string) => dayjs(string, "YYYY-MM-DD");
	formatDate = (date) => date.format("MM/DD/YYYY");
	formatDateLong = (date) => date.format("MMM DD, YYYY");
	CorePeriodOfPerformance = {
		populateCore(data) {
			this._startDate = data.startDate && parseDate(data.startDate) || "";
			this._endDate = data.endDate && parseDate(data.endDate) || "";
			this._awardDate = data.awardDate && parseDate(data.awardDate) || "";
			this._lastModifiedDate = data.lastModifiedDate && parseDate(data.lastModifiedDate) || "";
			this._potentialEndDate = data.potentialEndDate && parseDate(data.potentialEndDate) || "";
		},
		get startDate() {
			if (this._startDate) return formatDate(this._startDate);
			return "";
		},
		get endDate() {
			if (this._endDate) return formatDate(this._endDate);
			return "";
		},
		get awardDate() {
			if (this._awardDate) return formatDate(this._awardDate);
			return "";
		},
		get lastModifiedDate() {
			if (this._lastModifiedDate) return formatDate(this._lastModifiedDate);
			return "";
		},
		get potentialEndDate() {
			if (this._potentialEndDate) return formatDate(this._potentialEndDate);
			return "";
		},
		get startDateLong() {
			if (this._startDate) return formatDateLong(this._startDate);
			return "";
		},
		get endDateLong() {
			if (this._endDate) return formatDateLong(this._endDate);
			return "";
		},
		get awardDateLong() {
			if (this._awardDate) return formatDateLong(this._awardDate);
			return "";
		},
		get lastModifiedDateLong() {
			if (this._lastModifiedDate) return formatDateLong(this._lastModifiedDate);
			return "";
		},
		get potentialEndDateLong() {
			if (this._potentialEndDate) return formatDateLong(this._potentialEndDate);
			return "";
		}
	};
}));
//#endregion
//#region src/js/models/v2/award/BaseIdvActivityBar.js
var BaseIdvActivityBar;
var init_BaseIdvActivityBar = __esmMin((() => {
	init_moneyFormatter();
	init_CorePeriodOfPerformance();
	BaseIdvActivityBar = {
		populate(data) {
			this.generatedId = data.generated_unique_award_id ? encodeURIComponent(`${data.generated_unique_award_id}`) : "--";
			this.awardingAgencyName = data.awarding_agency || "--";
			this.parentAwardId = data.parent_award_id || "--";
			this.parentGeneratedId = data.parent_generated_unique_award_id || "--";
			this.parentAwardPIID = data.parent_award_piid || "--";
			this.awardingAgencyId = data.awarding_agency_id && `${data.awarding_agency_id}` || "--";
			this.awardingAgencySlug = data.awarding_agency_slug;
			this._endDate = data.period_of_performance_potential_end_date ? parseDate(data.period_of_performance_potential_end_date) : null;
			this._awardedAmount = data.awarded_amount || 0;
			this._obligatedAmount = data.obligated_amount || 0;
			this._startDate = data.period_of_performance_start_date ? parseDate(data.period_of_performance_start_date) : null;
			this.piid = data.piid || "--";
			this.recipientName = data.recipient_name || "--";
			this.recipientId = data.recipient_id || "--";
			this.grandchild = data.grandchild;
		},
		get awardedAmount() {
			const units = calculateUnitForSingleValue(this._awardedAmount, 1);
			return `${formatMoneyWithPrecision(this._awardedAmount / units.unit, 1)}
         ${units.unitLabel}`;
		},
		get obligatedAmount() {
			const units = calculateUnitForSingleValue(this._obligatedAmount, 1);
			return `${formatMoneyWithPrecision(this._obligatedAmount / units.unit, 1)}
         ${units.unitLabel}`;
		},
		get startDate() {
			return this._startDate ? formatDate(this._startDate) : "--";
		},
		get endDate() {
			return this._endDate ? formatDate(this._endDate) : "--";
		}
	};
}));
//#endregion
//#region src/js/containers/award/idv/IdvActivityContainer.jsx
var import_jsx_runtime$15, propTypes$15, IdvActivityContainer, mapStateToProps, IdvActivityContainer_default;
var init_IdvActivityContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_idvHelper();
	init_IdvActivity();
	init_BaseIdvActivityBar();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$15 = { awardId: PropTypes.string };
	IdvActivityContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				hasNext: false,
				hasPrevious: null,
				limit: 50,
				next: 0,
				page: 1,
				previous: null,
				total: 0,
				awards: [],
				xSeries: [],
				ySeries: [],
				inFlight: true,
				error: false
			};
			this.idvActivityRequest = null;
			this.changePage = this.changePage.bind(this);
			this.selectedItemFunc = this.selectedItemFunc.bind(this);
		}
		async componentDidMount() {
			await this.loadAwards();
		}
		async componentDidUpdate(prevProps) {
			if (prevProps.awardId !== this.props.awardId) await this.loadAwards();
		}
		componentWillUnmount() {
			if (this.idvActivityRequest) this.idvActivityRequest.cancel();
		}
		async loadAwards() {
			if (this.idvActivityRequest) this.idvActivityRequest.cancel();
			const params = {
				award_id: this.props.awardId,
				page: this.state.page,
				hide_edge_cases: true,
				limit: this.state.limit
			};
			this.idvActivityRequest = fetchIdvActivity(params);
			try {
				const { data } = await this.idvActivityRequest.promise;
				this.setState({
					hasNext: data.page_metadata.hasNext,
					hasPrevious: data.page_metadata.hasPrevious,
					limit: data.page_metadata.limit,
					next: data.page_metadata.next,
					page: data.page_metadata.page,
					previous: data.page_metadata.previous,
					total: data.page_metadata.total,
					error: false
				}, () => this.parseAwards(data.results));
			} catch (error) {
				if (!isCancel(error)) {
					this.setState({
						error: true,
						inFlight: false
					});
					console.log(error);
				}
			}
		}
		parseAwards(results) {
			const awards = results.map((award) => {
				const idvActivityBar = Object.create(BaseIdvActivityBar);
				idvActivityBar.populate(award);
				return idvActivityBar;
			}).filter((award) => award._startDate && award._endDate);
			const startDates = awards.map((award) => award._startDate.valueOf());
			const endDates = awards.map((award) => award._endDate.valueOf());
			const xSeries = startDates.concat(endDates);
			const ySeries = awards.map((award) => award._obligatedAmount);
			this.setState({
				awards,
				xSeries,
				ySeries,
				inFlight: false
			});
		}
		changePage(page) {
			this.setState({
				inFlight: true,
				page
			}, () => this.loadAwards());
		}
		selectedItemFunc(limit) {
			this.setState({
				limit,
				inFlight: true,
				page: 1
			}, () => this.loadAwards());
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(IdvActivity, {
				...this.state,
				...this.props,
				changePage: this.changePage,
				selectedItemFunc: this.selectedItemFunc
			});
		}
	};
	IdvActivityContainer.propTypes = propTypes$15;
	mapStateToProps = (state) => ({ awardId: state.award.id });
	IdvActivityContainer_default = connect_default(mapStateToProps, null)(IdvActivityContainer);
}));
//#endregion
//#region src/js/components/award/idv/amounts/AwardsBanner.jsx
/**
* AwardsBanner.jsx
* Created by David Trinh 2/20/19
**/
var import_jsx_runtime$14, propTypes$14, AwardsBanner;
var init_AwardsBanner = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$14 = require_jsx_runtime();
	propTypes$14 = { jumpToReferencedAwardsTable: PropTypes.func };
	AwardsBanner = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { toggle: true };
			this.toggleBanner = this.toggleBanner.bind(this);
		}
		toggleBanner() {
			this.setState({ toggle: false });
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: `award-amounts__banner ${!this.state.toggle ? "award-amounts__banner_hidden" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "award-amounts__banner-info-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(InfoCircle, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("p", { children: [
						"The information in this tab is pulled from the combined data of awards that reference this IDV, not the IDV itself. To see those awards, scroll to the\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
							onClick: this.props.jumpToReferencedAwardsTable,
							className: "award-viz__button",
							children: "table of awards under this IDV"
						}),
						"\xA0on this page."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
						className: "award-amounts__banner-close-icon",
						title: "Dismiss message",
						"aria-label": "Dismiss message",
						onClick: this.toggleBanner,
						children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Close, { alt: "Dismiss message" })
					})
				]
			});
		}
	};
	AwardsBanner.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/award/idv/amounts/AggregatedAwardAmountsSection.jsx
/**
* AggregatedAwardAmounts.jsx
* Created by David Trinh 2/8/19
**/
var import_jsx_runtime$13, propTypes$13, AggregatedAwardAmounts;
var init_AggregatedAwardAmountsSection = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	init_ChartError();
	init_awardAmountHelper();
	init_AwardsBanner();
	init_propTypes();
	init_AwardAmountsTable();
	init_AwardAmountsChart();
	init_JumpToSectionButton();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$13 = {
		awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		showFileC: PropTypes.bool,
		jumpToSection: PropTypes.func
	};
	AggregatedAwardAmounts = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { active: "overall" };
			this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
			this.switchTab = this.switchTab.bind(this);
		}
		jumpToReferencedAwardsTable() {
			this.props.jumpToSection("referenced-awards");
		}
		switchTab(tab) {
			this.setState({ active: tab });
		}
		render() {
			if (this.props.inFlight) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
				className: "visualization-message-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
					className: "visualization-loading",
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "message",
						children: "Gathering your data..."
					})
				})
			});
			else if (this.props.error) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ChartError, {});
			const { awardAmounts } = this.props;
			const tabTypes = generateDefcTabs(awardAmounts);
			const spendingScenario = determineSpendingScenarioByAwardType("idv", awardAmounts, this.state.active === "infrastructure");
			return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "award-amounts__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardsBanner, { jumpToReferencedAwardsTable: this.jumpToReferencedAwardsTable }),
					tabTypes?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(vs, {
						tablessStyle: true,
						active: this.state.active,
						switchTab: this.switchTab,
						types: tabTypes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardAmountsChart, {
						showCaresActViz: this.props.showFileC,
						awardOverview: awardAmounts,
						awardType: "idv",
						spendingScenario,
						infrastructureSpending: this.state.active,
						fileCType: this.state.active
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AwardAmountsTable, {
						awardAmountType: "idv_aggregated",
						showFileC: this.props.showFileC,
						awardData: awardAmounts,
						spendingScenario,
						fileCType: this.state.active
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "award-amounts-children__data-wrapper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", {
								className: "title-and-link-span",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", {
									className: "count-of-awards-title-text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", { children: "Count of Awards Under this IDV" })
								}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(JumpToSectionButton, {
									linkText: "View table of awards under this IDV",
									onClick: this.jumpToReferencedAwardsTable,
									icon: "table"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "award-amounts-children__data-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: "Count of Child Contracts" }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: formatNumber(awardAmounts.childAwardCount) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "award-amounts-children__data-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: "Count of Child IDVs" }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: formatNumber(awardAmounts.childIDVCount) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "award-amounts-children__data-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: "Count of Grandchild Contracts" }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: formatNumber(awardAmounts.grandchildAwardCount) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("p", {
								className: "total-title-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", { children: "Total: " }), `${formatNumber(awardAmounts.grandchildAwardCount + awardAmounts.childAwardCount + awardAmounts.childIDVCount)}`]
							})
						]
					})
				]
			});
		}
	};
	AggregatedAwardAmounts.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/award/idv/amounts/AggregatedAwardAmountsTableWrapper.jsx
/**
* AggregatedAwardAmountsTableWrapper.jsx
* Created by Andrea Blackwell 07/08/2022
**/
var import_jsx_runtime$12, propTypes$12, AggregatedAwardAmountsTableWrapper;
var init_AggregatedAwardAmountsTableWrapper = __esmMin((() => {
	init_index_es();
	init_awardAmountHelper();
	init_AwardAmountsTable();
	init_propTypes();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$12 = {
		showFileC: PropTypes.bool,
		children: PropTypes.node,
		awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
		awardData: PropTypes.shape({}),
		spendingScenario: PropTypes.string
	};
	AggregatedAwardAmountsTableWrapper = (props) => {
		const [activeTab, setActiveTab] = useState("overall");
		const { awardData } = props;
		const switchTab = (tab) => {
			setActiveTab(tab);
		};
		const tabTypes = generateDefcTabs(awardData);
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "award-amounts__table-by-type",
			"data-testid": "award-amounts__table-by-type",
			children: [tabTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(vs, {
				tablessStyle: true,
				active: activeTab,
				switchTab,
				types: tabTypes
			}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AwardAmountsTable, {
				...props,
				fileCType: activeTab
			})]
		});
	};
	AggregatedAwardAmountsTableWrapper.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/containers/award/idv/IdvAwardAmountsSectionContainer.jsx
/**
* IdvAwardAmountsSectionContainer.jsx
* Created by David Trinh 2/8/2019
**/
var import_jsx_runtime$11, propTypes$11, tabTypes, IdvAmountsContainer, IdvAwardAmountsSectionContainer_default;
var init_IdvAwardAmountsSectionContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_index_es();
	init_idvHelper();
	init_awardAmountHelper();
	init_awardActions();
	init_BaseAwardAmounts();
	init_AggregatedAwardAmountsSection();
	init_InfoTooltipContent();
	init_WithDefCodes();
	init_AggregatedAwardAmountsTableWrapper();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$11 = {
		award: PropTypes.object,
		setIdvDetails: PropTypes.func,
		jumpToSection: PropTypes.func,
		defCodes: PropTypes.array,
		refDefCodes: PropTypes.array
	};
	tabTypes = [{
		enabled: true,
		internal: "awards",
		label: "Awards Under this IDV"
	}, {
		enabled: true,
		internal: "idv",
		label: "This IDV"
	}];
	IdvAmountsContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.awardRequest = null;
			this.state = {
				error: false,
				inFlight: true,
				awardAmounts: null,
				active: "awards"
			};
			this.switchTab = this.switchTab.bind(this);
		}
		componentDidMount() {
			return this.getIdvChildAwardAmounts(this.props.award.id);
		}
		componentDidUpdate(prevProps) {
			if (this.props.award.id !== prevProps.award.id) this.getIdvChildAwardAmounts(this.props.award.id);
		}
		componentWillUnmount() {
			if (this.awardRequest) this.awardRequest.cancel();
		}
		getIdvChildAwardAmounts(id) {
			if (this.awardRequest) this.awardRequest.cancel();
			this.awardRequest = fetchAwardAmounts(id);
			return this.awardRequest.promise.then((res) => {
				this.parseChildAwardAmounts(res.data);
				this.awardRequest = null;
			}).catch((error) => {
				console.log(error);
				if (isCancel(error)) {} else if (error.response) {
					this.awardRequest = null;
					this.setState({
						error: true,
						inFlight: false
					});
				} else {
					this.awardRequest = null;
					console.log(error);
				}
			});
		}
		parseChildAwardAmounts(data) {
			const awardAmounts = Object.create(BaseAwardAmounts);
			awardAmounts.populate(data, "idv_aggregated", this.props.refDefCodes);
			this.setState({
				awardAmounts,
				error: false,
				inFlight: false
			});
			this.props.setIdvDetails({
				child_file_c: getChildAwardFileCDetails(data),
				child_awards: data.child_award_count,
				child_idvs: data.child_idv_count,
				grandchild_awards: data.grandchild_award_count,
				total: data.child_idv_count + data.child_award_count + data.grandchild_award_count
			});
		}
		switchTab(tab) {
			this.setState({ active: tab });
		}
		render() {
			const thisIdv = Object.create(BaseAwardAmounts);
			thisIdv.populate(this.props.award.overview, "idv", this.props.refDefCodes);
			const tabsClassName = "idv-award-amounts-tabs";
			const thisIdvHasFileC = thisIdv._fileCObligated !== 0 || thisIdv._fileCOutlay !== 0;
			const childAwardsHaveFileC = this.state.awardAmounts?._fileCObligated !== 0 || this.state.awardAmounts?._fileCOutlay !== 0;
			const showFileC = thisIdvHasFileC || childAwardsHaveFileC;
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "award__col award-viz award-amounts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
						className: "award-viz__heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("h3", {
							className: "award-viz__title",
							children: "$ Award Amounts"
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ds, {
							className: "award-section-tt",
							icon: "info",
							wide: true,
							tooltipComponent: awardAmountsInfo
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "award-viz__tabs",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(vs, {
							types: tabTypes,
							active: this.state.active,
							switchTab: this.switchTab,
							tabsClassName
						})
					}),
					this.state.active === "awards" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AggregatedAwardAmounts, {
						...this.state,
						jumpToSection: this.props.jumpToSection,
						showFileC
					}),
					this.state.active !== "awards" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AggregatedAwardAmountsTableWrapper, {
						showFileC,
						awardData: thisIdv,
						awardAmountType: "idv",
						spendingScenario: determineSpendingScenarioByAwardType("idv", thisIdv)
					})
				]
			});
		}
	};
	IdvAmountsContainer.propTypes = propTypes$11;
	IdvAwardAmountsSectionContainer_default = flowRight(withDefCodes, connect_default((state) => ({
		award: state.award,
		refDefCodes: state?.covid19?.defCodes
	}), (dispatch) => bindActionCreators(awardActions_exports, dispatch)))(IdvAmountsContainer);
}));
//#endregion
//#region src/js/components/award/idv/IdvContent.jsx
/**
* IdvContent.jsx
* Created by Lizzie Salita 12/3/18
**/
var import_jsx_runtime$10, propTypes$10, IdvContent;
var init_IdvContent = __esmMin((() => {
	init_idvHelper();
	init_ReferencedAwardsContainer();
	init_IdvActivityContainer();
	init_awardType();
	init_AwardHistorySectionContainer();
	init_IdvAwardAmountsSectionContainer();
	init_AwardOverviewLeftSection();
	init_AwardOverviewRightSection();
	init_AwardDescription();
	init_AdditionalInfo();
	init_FederalAccountsSection();
	init_propTypes();
	init_AwardPageWrapper();
	init_AwardSection();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$10 = {
		awardId: PropTypes.string,
		details: AWARD_COUNTS_PROPS,
		overview: AWARD_OVERVIEW_PROPS,
		jumpToSection: PropTypes.func,
		unlinked: PropTypes.bool
	};
	IdvContent = ({ awardId, details, overview, jumpToSection, unlinked }) => {
		const [awardHistoryActiveTab, setAwardHistoryTab] = useState("transaction");
		const [relatedAwardsActiveTab, setRelatedAwardsTab] = useState("child_awards");
		const jumpToFederalAccountsHistory = () => {
			setAwardHistoryTab("federal_account");
			jumpToSection("award-history");
		};
		const glossarySlug = glossaryLinks[overview.type];
		const glossaryLink = glossarySlug ? `/award/${awardId}?glossary=${glossarySlug}` : null;
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(AwardPageWrapper, {
			awardType: "idv",
			allDefCodes: getAllNetPositiveIdvFileCDefCodes(overview, details),
			title: overview.title,
			lastModifiedDateLong: overview.dates.lastModifiedDateLong,
			glossaryLink,
			overviewType: overview.type,
			identifier: overview.piid,
			dates: overview.dates,
			unlinked,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(AwardSection, {
					type: "row",
					className: "award-overview",
					id: "award-overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AwardOverviewLeftSection, {
						awardingAgency: overview.awardingAgency,
						recipient: overview.recipient
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AwardOverviewRightSection, {
						jumpToSection,
						counts: details,
						overview,
						setRelatedAwardsTab
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(AwardSection, {
					type: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(IdvAwardAmountsSectionContainer_default, {
						jumpToSection,
						awardId,
						overview,
						defCodes: details?.child_file_c
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AwardDescription, {
						awardType: overview.category,
						awardId,
						description: overview.description,
						naics: overview.naics,
						psc: overview.psc
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(AwardSection, {
					type: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(IdvActivityContainer_default, {}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(FederalAccountsSection, {
						awardType: overview.category,
						jumpToFederalAccountsHistory,
						unlinked
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ReferencedAwardsContainer_default, {
					tableType: relatedAwardsActiveTab,
					switchTab: setRelatedAwardsTab
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AwardHistory, {
					activeTab: awardHistoryActiveTab,
					setActiveTab: setAwardHistoryTab,
					overview
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AdditionalInfo, { overview })
			]
		});
	};
	IdvContent.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/award/financialAssistance/SingleCFDA.jsx
var import_jsx_runtime$9, propTypes$9, SingleCFDA;
var init_SingleCFDA = __esmMin((() => {
	init_es();
	init_dist();
	init_modalActions();
	init_CFDAOpportunityTotals();
	init_AwardSection();
	init_ExpandableAwardSection();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$9 = { currentCfda: PropTypes.shape({
		cfda_number: PropTypes.string,
		cfda_title: PropTypes.string,
		applicant_eligibility: PropTypes.string,
		beneficiary_eligibility: PropTypes.string,
		federal_agency: PropTypes.string,
		objectives: PropTypes.string,
		obligations: PropTypes.string,
		popular_name: PropTypes.string,
		website: PropTypes.string,
		sam_website: PropTypes.string
	}) };
	SingleCFDA = ({ currentCfda }) => {
		const dispatch = useDispatch();
		const { samWebsite, cfdaWebsite, cfdaFederalAgency, applicantEligibility, beneficiaryEligibility, cfdaObjectives, cfdaNumber } = currentCfda;
		const displayRedirectModal = (e) => {
			e.persist();
			dispatch(showModal(e.target.value, "redirect"));
		};
		const grantsGovOppotunities = () => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "cfda-grants-gov-opportunities__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
				onClick: displayRedirectModal,
				value: `https://www.grants.gov/search-grants.html?cfda=${cfdaNumber}`,
				children: [
					`https://www.grants.gov/search-grants.html?cfda=${cfdaNumber}`,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FontAwesomeIcon, { icon: "external-link-alt" })
				]
			}), cfdaNumber && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CFDAOpportunityTotals, { code: cfdaNumber })]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(AwardSection, {
			type: "column",
			className: "cfda-section award-viz",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "award__col__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(ExpandableAwardSection, {
					content: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(React.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(ExpandableAwardSection, {
							primaryContainerClass: "cfda-grants-gov-opportunities__section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Opportunities on Grants.gov" }), grantsGovOppotunities()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Applicant Eligibility" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ExpandableAwardSection, {
							type: "secondary",
							content: applicantEligibility
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Beneficiary Eligibility" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ExpandableAwardSection, {
							type: "secondary",
							content: beneficiaryEligibility
						})
					] }),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Objectives" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ExpandableAwardSection, {
							type: "secondary",
							content: cfdaObjectives
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Administrative Agency" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", { children: cfdaFederalAgency }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "Website" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("a", {
							href: cfdaWebsite,
							children: cfdaWebsite
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("h5", { children: "SAM.gov Page" }),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("a", {
							href: samWebsite,
							children: samWebsite
						})
					]
				})
			})
		});
	};
	SingleCFDA.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDATree.jsx
/**
* CFDATree.jsx
* Created by Jonathan Hill 03/18/20
*/
var import_jsx_runtime$8, propTypes$8, message, CFDATree;
var init_CFDATree = __esmMin((() => {
	init_src$2();
	init_src();
	init_Note();
	init_textMeasurement();
	init_moneyFormatter();
	init_TreemapCell();
	init_NoResultsMessage();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$8 = {
		data: PropTypes.array,
		width: PropTypes.number,
		height: PropTypes.number,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		onTreeClick: PropTypes.func
	};
	message = "Results with federal action obligations of zero or less than zero for this award have been omitted in the treemap view. To view all results, click the table button above this chart.";
	CFDATree = ({ data, width, height = 294, showTooltip, hideTooltip, onTreeClick }) => {
		const [virtualChart, setVirtualChart] = useState([]);
		const [isPartialTree, setIsPartialTree] = useState(false);
		const truncateText = (text, type, maxWidth) => {
			let label = text;
			let labelWidth = 0;
			if (type === "title") labelWidth = measureTreemapHeader(text);
			else if (type === "subtitle") labelWidth = measureTreemapValue(text);
			if (labelWidth > maxWidth) {
				const characterWidth = Math.ceil(labelWidth / text.length);
				const availableWidth = maxWidth - 30;
				let availableLength = Math.floor(availableWidth / characterWidth);
				if (availableLength < 1) availableLength = 1;
				if (availableLength < text.length) label = `${label.substring(0, availableLength)}...`;
			}
			return label;
		};
		const buildVirtualCell = useCallback((item, scale) => {
			const itemHeight = item.y1 - item.y0;
			const itemWidth = item.x1 - item.x0;
			const amount = item.data._federalActionOblicationAmount;
			const units = calculateUnitForSingleValue(amount, 1);
			const formattedSubtitle = `${formatMoneyWithPrecision(amount / units.unit, 1)}${units.unitLabel}`;
			const usableWidth = itemWidth;
			const name = `${item.data.cfdaNumber} - ${item.data.cfdaTitle}`;
			const title = truncateText(name, "title", usableWidth);
			const subtitle = truncateText(formattedSubtitle, "subtitle", usableWidth);
			const color = scale(amount);
			return {
				width: itemWidth,
				height: itemHeight,
				x: item.x0,
				y: item.y0,
				data: {
					...item.data,
					id: item.data.cfdaNumber
				},
				color,
				title: {
					text: title,
					x: itemWidth / 2,
					y: itemHeight / 2 - 5
				},
				subtitle: {
					text: subtitle,
					x: itemWidth / 2,
					y: itemHeight / 2 + 15
				}
			};
		}, []);
		const buildVirtualChart = useCallback(() => {
			const removedCFDAs = remove(data, (account) => parseFloat(account._federalActionOblicationAmount) <= 0);
			const treemapData = hierarchy({ children: data }).sum((d) => d._federalActionOblicationAmount).sort((a, b) => b.value - a.value);
			const treeItems = treemap_default().size([width, height]).tile(binary_default).paddingInner(5).round(true)(treemapData).leaves();
			if (treeItems.length === 0 || data.length === 0) {
				setVirtualChart([]);
				return;
			}
			const maxValue = treeItems[0].data._federalActionOblicationAmount;
			const minValue = treeItems[treeItems.length - 1].data._federalActionOblicationAmount;
			let scale = linear().domain([minValue, maxValue]).range(["#f2f6f9", "#9bb1cf"]);
			if (treeItems.length === 1) scale = () => "#47BAD9";
			const cells = [];
			treeItems.forEach((item) => {
				const cell = buildVirtualCell(item, scale);
				cells.push(cell);
			});
			setVirtualChart(cells);
			setIsPartialTree(removedCFDAs.length > 0);
		}, [
			buildVirtualCell,
			data,
			height,
			width
		]);
		useEffect(() => {
			buildVirtualChart();
		}, [buildVirtualChart]);
		const messaging = () => {
			if (!virtualChart.length) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(NoResultsMessage, {
				title: "Chart Not Available",
				message: "No available data to display."
			});
			return null;
		};
		if (width <= 0) return null;
		const chartLength = virtualChart.length;
		const naming = chartLength === 1 ? "result" : "results";
		const cells = virtualChart.map((cell) => /* @__PURE__ */ createElement(TreemapCell, {
			...cell,
			highlightColor: "#f49c20",
			key: `${cell.data.cfdaNumber}`,
			selectedCell: onTreeClick,
			showTooltip,
			hideTooltip
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "results-table-message-container",
				children: messaging()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "cfda-section-treemap",
				children: chartLength !== 0 && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("svg", {
					className: "treemap",
					width: "100%",
					height,
					children: cells
				})
			}),
			chartLength !== 0 && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "cfda-section-treemap-count",
				children: `${virtualChart.length} ${naming}`
			}),
			isPartialTree && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
				className: "cfda-section__note",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Note, { message })
			})
		] });
	};
	CFDATree.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/dataMapping/award/cfdaSectionTable.js
var tableMapping;
var init_cfdaSectionTable = __esmMin((() => {
	tableMapping = {
		cfdaTitleShort: {
			displayName: "Assistance Listing (CFDA Program)",
			field: "cfdaTitle",
			classname: "cfda-section-table__body-cell",
			onClick: true
		},
		federalActionOblicationAmount: {
			displayName: "Funding Provided",
			field: "_federalActionOblicationAmount",
			classname: "cfda-section-table__body-cell offset-right-money"
		},
		percentOfTotal: {
			displayName: "Percent of Total",
			field: "_percentOfTotal",
			classname: "cfda-section-table__body-cell offset-right-percent"
		}
	};
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDATable.jsx
/**
* CFDATable.jsx
* Created by Jonathan Hill 03/17/20
**/
var import_jsx_runtime$7, propTypes$7, CFDATable;
var init_CFDATable = __esmMin((() => {
	init_index_es();
	init_cfdaSectionTable();
	init_StateLandingTableSorter();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_NoResultsMessage();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$7 = {
		page: PropTypes.number,
		limit: PropTypes.number,
		sort: PropTypes.string,
		order: PropTypes.string,
		total: PropTypes.number,
		currentPageCFDAs: PropTypes.array,
		changePage: PropTypes.func,
		onTableClick: PropTypes.func,
		updateSort: PropTypes.func,
		inFlight: PropTypes.bool,
		error: PropTypes.bool
	};
	CFDATable = class extends React.Component {
		getHeaders() {
			const { sort, order, updateSort } = this.props;
			return map(tableMapping, (header) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("th", {
				className: "cfda-section-table__head-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "header-cell",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "header-cell__text",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "header-cell__title",
							children: header.displayName
						})
					}), header.field && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(StateLandingTableSorter, {
						field: header.field,
						label: header.displayName,
						active: {
							field: sort,
							direction: order
						},
						setSort: updateSort
					})]
				})
			}, header.displayName));
		}
		getRows() {
			return this.props.currentPageCFDAs.map((cfda) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("tr", {
				className: "cfda-section-table__body-row",
				children: map(tableMapping, (header, key) => {
					let cellData = cfda[key];
					if (key === "cfdaTitleShort" && cfda.cfdaNumber) cellData = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						className: "award-viz__button",
						value: cfda.cfdaNumber,
						onClick: this.props.onTableClick,
						children: `${cfda.cfdaNumber} - ${cfda[key]}`
					});
					return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("td", {
						className: header.classname,
						children: cellData
					}, `${uniqueId()}`);
				})
			}, `row-${uniqueId()}`));
		}
		renderTable() {
			if (this.props.currentPageCFDAs.length > 0 && !this.props.error && !this.props.inFlight) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "cfda-section-table-renderer",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("table", {
					className: "cfda-section-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("thead", {
						className: "cfda-section-table__head",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("tr", {
							className: "cfda-section-table__head-row",
							children: this.getHeaders()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("tbody", { children: this.getRows() })]
				})
			});
			return null;
		}
		render() {
			const { inFlight, error, currentPageCFDAs } = this.props;
			let loadingMessage = null;
			let errorMessage = null;
			let noResultsMessage = null;
			let pagination = null;
			if (inFlight) loadingMessage = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ResultsTableLoadingMessage, {});
			if (error) errorMessage = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ResultsTableErrorMessage, {});
			if (currentPageCFDAs.length === 0 && !error && !inFlight) noResultsMessage = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(NoResultsMessage, {
				title: "Chart Not Available",
				message: "No available data to display."
			});
			if (currentPageCFDAs.length > 0 && !error && !inFlight) pagination = /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Ka, {
				resultsText: true,
				totalItems: this.props.total,
				pageSize: this.props.limit,
				currentPage: this.props.page,
				changePage: this.props.changePage
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "cfda-section-table-holder",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "results-table-message-container",
						children: [
							loadingMessage,
							errorMessage,
							noResultsMessage
						]
					}),
					this.renderTable(),
					pagination
				]
			});
		}
	};
	CFDATable.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDATreeTooltip.jsx
/**
* CFDATreeTooltip.jsx
* Created by Jonathan Hill 03/19/20
*/
var import_jsx_runtime$6, propTypes$6, CFDATreeTooltip;
var init_CFDATreeTooltip = __esmMin((() => {
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$6 = {
		y: PropTypes.number,
		x: PropTypes.number,
		cfdaNumber: PropTypes.string,
		cfdaTitle: PropTypes.string,
		federalActionOblicationAmount: PropTypes.string,
		percentOfTotal: PropTypes.string,
		cfdaFederalAgency: PropTypes.string
	};
	CFDATreeTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				direction: "top",
				tooltipStyle: { transform: "" },
				windowWidth: 0,
				windowHeight: 0
			};
			this.measureWindow = this.measureWindow.bind(this);
		}
		componentDidMount() {
			this.measureWindow();
			window.addEventListener("resize", this.measureWindow);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) this.positionTooltip();
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureWindow);
		}
		measureWindow() {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.setState({
				windowWidth,
				windowHeight
			}, () => {
				this.positionTooltip();
			});
		}
		positionTooltip() {
			const tooltipWidth = this.div.offsetWidth;
			let direction = "top";
			let adjustedX = this.props.x - tooltipWidth / 2;
			if (adjustedX.toString().startsWith("-")) {
				direction = "left";
				adjustedX = this.props.x - adjustedX;
			}
			this.setState({
				direction,
				tooltipStyle: { transform: `translate(${adjustedX}px,${this.props.y}px)` }
			});
		}
		render() {
			const { cfdaNumber, cfdaTitle, percentOfTotal, cfdaFederalAgency, federalActionOblicationAmount } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "visualization-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: `tooltip ${this.state.direction}`,
					style: this.state.tooltipStyle,
					ref: (div) => {
						this.div = div;
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: `tooltip-pointer ${this.state.direction}` }),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "tooltip-title",
							children: `${cfdaNumber} - ${cfdaTitle}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "tooltip-subtitle",
							children: ["FEDERAL AGENCY: ", cfdaFederalAgency]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "tooltip-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "tooltip-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
									className: "tooltip-value",
									children: federalActionOblicationAmount
								}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
									className: "tooltip-label",
									children: "Funded Amount"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "tooltip-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
									className: "tooltip-value",
									children: percentOfTotal
								}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
									className: "tooltip-label",
									children: "Percent of Total"
								})]
							})]
						})
					]
				})
			});
		}
	};
	CFDATreeTooltip.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDAViz.jsx
/**
* CFDAViz.jsx
* Created by Jonathan Hill 03/17/20
**/
var import_jsx_runtime$5, propTypes$5, sortFunction, CFDAViz;
var init_CFDAViz = __esmMin((() => {
	init_dist();
	init_index_es();
	init_ViewTypeButton();
	init_SingleCFDA();
	init_CFDATree();
	init_CFDATable();
	init_CFDATreeTooltip();
	init_useEventListener();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$5 = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		page: PropTypes.number,
		limit: PropTypes.number,
		sort: PropTypes.string,
		order: PropTypes.string,
		total: PropTypes.number,
		allCFDAs: PropTypes.array,
		currentPageCFDAs: PropTypes.array,
		cfda: PropTypes.object,
		view: PropTypes.string,
		changePage: PropTypes.func,
		updateSort: PropTypes.func,
		changeView: PropTypes.func,
		onTableClick: PropTypes.func,
		onBackClick: PropTypes.func,
		onTreeClick: PropTypes.func,
		onDropdownClick: PropTypes.func
	};
	sortFunction = (a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber);
	CFDAViz = ({ inFlight, error, page, limit, sort, order, total, allCFDAs, currentPageCFDAs, cfda, view, changePage, updateSort, changeView, onTableClick, onBackClick, onTreeClick, onDropdownClick }) => {
		const [width, setWidth] = useState(0);
		const [showTooltip, setShowTooltip] = useState(false);
		const [tooltip, setTooltip] = useState({
			x: 0,
			y: 0,
			cfdaNumber: 0,
			cfdaTitle: "",
			federalActionOblicationAmount: 0,
			percentOfTotal: 0,
			cfdaFederalAgency: ""
		});
		const widthRef = useRef(null);
		const measureWidth = () => {
			setWidth(widthRef.current.offsetWidth);
		};
		useEffect(() => {
			setWidth(widthRef.current.offsetWidth);
		}, []);
		useEventListener("resize", measureWidth);
		const showTooltipFunc = useCallback((position, data) => {
			setShowTooltip(true);
			if (data.id !== tooltip?.id) setTooltip({
				...position,
				...data
			});
		}, [tooltip.id]);
		const hideTooltip = useCallback(() => {
			setShowTooltip(false);
		}, []);
		const tree = () => {
			if (view === "tree") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CFDATree, {
				error,
				inFlight,
				width,
				data: allCFDAs,
				showTooltip: showTooltipFunc,
				hideTooltip,
				onTreeClick
			});
			return null;
		};
		const content = () => {
			if (view === "table") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CFDATable, {
				page,
				limit,
				sort,
				order,
				total,
				currentPageCFDAs,
				changePage,
				onTableClick,
				updateSort,
				inFlight,
				error
			});
			if (view === "single" || !view) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SingleCFDA, { currentCfda: cfda });
			return null;
		};
		const title = () => {
			if (view === "single" || !view) {
				if (allCFDAs.length > 1) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Xa, {
					options: cloneDeep(allCFDAs).sort((a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber)).map((x) => ({
						name: `${x.cfdaNumber} ${x.cfdaTitle}`,
						onClick: onDropdownClick
					})),
					dropdownDirection: "right",
					backgroundColor: "#215493",
					selectedOption: `${cfda.cfdaNumber} ${cfda.cfdaTitle}`,
					sortFn: sortFunction
				});
				return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h4", {
					className: "cfda-section-single-title",
					children: `${cfda.cfdaNumber}: ${cfda.cfdaTitle.toUpperCase()}`
				});
			}
			return null;
		};
		const buttons = () => {
			const isTreeView = view === "tree";
			if (view === "tree" || view === "table") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "view-buttons-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "view-buttons-section__text",
					children: `Click on a program ${isTreeView ? "tile" : "title"} to see its details.`
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "view-buttons-section__buttons",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ViewTypeButton, {
						value: "table",
						label: "Table",
						icon: "table",
						changeView,
						active: !isTreeView
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ViewTypeButton, {
						value: "tree",
						label: "Treemap",
						icon: "th-large",
						changeView,
						active: isTreeView
					})]
				})]
			});
			if (view === "single" && allCFDAs.length) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "view-buttons-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
					onClick: onBackClick,
					className: "view-buttons-section__back award-viz__button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "view-buttons-section__back-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, { icon: "arrow-circle-left" })
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "view-buttons-section__back-text",
						children: "Back to all CFDA programs"
					})]
				})
			});
			return null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "cfda-section__viz",
			children: [showTooltip && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CFDATreeTooltip, {
				y: tooltip.y,
				x: tooltip.x,
				cfdaNumber: tooltip.cfdaNumber,
				cfdaTitle: tooltip.cfdaTitle,
				federalActionOblicationAmount: tooltip.federalActionOblicationAmount,
				percentOfTotal: tooltip.percentOfTotal,
				cfdaFederalAgency: tooltip.cfdaFederalAgency
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "cfda-section-results",
				children: [
					buttons(),
					title(),
					content(),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "cfda-section-vis__width-reference",
						ref: widthRef
					}),
					tree()
				]
			})]
		});
	};
	CFDAViz.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/containers/award/financialAssistance/CFDAVizContainer.jsx
/**
* CFDAVizContainer.jsx
* Created by Jonathan Hill 03/17/20
**/
var import_jsx_runtime$4, propTypes$4, CFDAVizContainer;
var init_CFDAVizContainer = __esmMin((() => {
	init_CFDAViz();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = {
		cfdas: PropTypes.array,
		biggestCfda: PropTypes.object,
		CFDAOverviewLinkClicked: PropTypes.bool,
		updateCFDAOverviewLinkClicked: PropTypes.func,
		awardTotalObligation: PropTypes.number
	};
	CFDAVizContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				limit: 10,
				sort: "_federalActionOblicationAmount",
				page: 1,
				order: "desc",
				total: props.cfdas.length,
				inFlight: false,
				error: false,
				currentPageCFDAs: [],
				cfda: props.cfdas.length === 1 ? props.cfdas[0] : {},
				view: props.cfdas.length === 1 ? "" : "table",
				previousView: "table"
			};
		}
		componentDidMount = () => this.updateCFDAs();
		componentDidUpdate(prevProps) {
			if (this.props.CFDAOverviewLinkClicked) if (this.state.view !== "table" && this.props.cfdas.length > 1) this.updateViewFromCFDAOverviewClick("table");
			else this.props.updateCFDAOverviewLinkClicked(false);
			if (!isEqual(prevProps.cfdas, this.props.cfdas)) this.updateCFDAs();
		}
		onTableClick = (e) => {
			e.preventDefault();
			const cfda = this.props.cfdas.find((data) => data.cfdaNumber === e.target.value);
			this.setState({
				previousView: "table",
				view: "single",
				cfda
			});
		};
		onBackClick = (e) => {
			e.preventDefault();
			const { previousView } = this.state;
			this.setState({
				view: previousView,
				previousView
			});
		};
		onTreeClick = (id, cfda) => {
			this.setState({
				previousView: "tree",
				view: "single",
				cfda
			});
		};
		onDropdownClick = (title) => {
			const cfda = this.props.cfdas.find((x) => x.cfdaNumber.toString() === title.split(" ")[0].trim());
			this.setState({
				view: "single",
				cfda
			});
		};
		updateViewFromCFDAOverviewClick = (view) => {
			this.setState({ view });
			this.props.updateCFDAOverviewLinkClicked();
		};
		updateCFDAs = () => {
			const { sort, order, page, limit } = this.state;
			const { cfdas } = this.props;
			let sortedCFDAs = null;
			if (order === "desc") {
				const sortFunction = sort === "cfdaTitle" ? (a, b) => parseFloat(b.cfdaNumber) - parseFloat(a.cfdaNumber) : (a, b) => b[sort] - a[sort];
				sortedCFDAs = cfdas.sort(sortFunction);
			} else {
				const sortFunction = sort === "cfdaTitle" ? (a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber) : (a, b) => a[sort] - b[sort];
				sortedCFDAs = cfdas.sort(sortFunction);
			}
			const startIndex = (page - 1) * limit;
			const endIndex = (page - 1) * limit + limit;
			const currentPageCFDAs = sortedCFDAs.slice(startIndex, endIndex);
			return this.setState({ currentPageCFDAs });
		};
		updateSort = (sort, order) => {
			this.setState({
				sort,
				order,
				page: 1
			}, () => this.updateCFDAs());
		};
		changePage = (page) => {
			this.setState({ page }, () => this.updateCFDAs());
		};
		changeView = (view) => {
			if (view !== this.state.view) this.setState({
				view,
				previousView: view
			});
		};
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CFDAViz, {
				...this.state,
				changePage: this.changePage,
				updateSort: this.updateSort,
				changeView: this.changeView,
				onTableClick: this.onTableClick,
				onBackClick: this.onBackClick,
				allCFDAs: this.props.cfdas,
				awardTotalObligation: this.props.awardTotalObligation,
				onTreeClick: this.onTreeClick,
				onDropdownClick: this.onDropdownClick
			});
		}
	};
	CFDAVizContainer.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/award/financialAssistance/CFDASection.jsx
var import_jsx_runtime$3, propTypes$3, CFDASection;
var init_CFDASection = __esmMin((() => {
	init_dist();
	init_CFDAVizContainer();
	init_AwardSection();
	init_AwardSectionHeader();
	init_InfoTooltipContent();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		cfdas: PropTypes.array,
		CFDAOverviewLinkClicked: PropTypes.bool,
		updateCFDAOverviewLinkClicked: PropTypes.func,
		awardTotalObligation: PropTypes.number
	};
	CFDASection = ({ cfdas, CFDAOverviewLinkClicked, updateCFDAOverviewLinkClicked, awardTotalObligation }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(AwardSection, {
		id: "award-cfda",
		type: "column",
		className: "cfda-section award-viz",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AwardSectionHeader, {
			title: "Assistance Listing (CFDA Program) Information",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon: "hands-helping" }),
			tooltip: CFDASectionInfo,
			left: false,
			tooltipWide: true
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "award__col__content",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CFDAVizContainer, {
				cfdas,
				CFDAOverviewLinkClicked,
				updateCFDAOverviewLinkClicked,
				awardTotalObligation
			})
		})]
	});
	CFDASection.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/award/financialAssistance/FinancialAssistanceContent.jsx
/**
* FinancialAssistanceContent.jsx
* Created by David Trinh 10/9/2018
**/
var import_jsx_runtime$2, propTypes$2, FinancialAssistanceContent;
var init_FinancialAssistanceContent = __esmMin((() => {
	init_awardType();
	init_BaseAwardAmounts();
	init_AwardHistorySectionContainer();
	init_awardHistorySection();
	init_ContractGrantActivityContainer();
	init_AwardAmountsSection();
	init_AdditionalInfo();
	init_AwardOverviewLeftSection();
	init_AwardOverviewRightSection();
	init_FederalAccountsSection();
	init_AwardSection();
	init_AwardPageWrapper();
	init_awardSummaryHelper();
	init_AwardDescription();
	init_CFDASection();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		awardId: PropTypes.string,
		overview: PropTypes.object,
		jumpToSection: PropTypes.func,
		isSubAwardIdClicked: PropTypes.bool,
		subAwardIdClicked: PropTypes.func,
		defCodes: PropTypes.array,
		unlinked: PropTypes.bool
	};
	FinancialAssistanceContent = ({ awardId, overview = {
		generatedId: "",
		fileC: { obligations: [] }
	}, jumpToSection, isSubAwardIdClicked, subAwardIdClicked, defCodes, unlinked }) => {
		const [activeTab, setActiveTab] = useState("transaction");
		const [CFDAOverviewLinkClicked, setCFDAOverviewLinkClicked] = useState(false);
		const updateCFDAOverviewLinkClicked = (didClick) => {
			setCFDAOverviewLinkClicked(didClick);
		};
		const glossaryLink = glossaryLinks[overview.type] ? `/award/${awardId}?glossary=${glossaryLinks[overview.type]}` : null;
		const jumpToTransactionHistoryTable = () => {
			setActiveTab("transaction");
			jumpToSection("award-history");
		};
		const jumpToFederalAccountsHistory = () => {
			setActiveTab("federal_account");
			jumpToSection("award-history");
		};
		const jumpToSubAwardHistoryTable = () => {
			setActiveTab("subaward");
			jumpToSection("award-history");
		};
		useEffect(() => {
			if (isSubAwardIdClicked && awardTypesWithSubawards.includes(overview.category)) {
				jumpToSubAwardHistoryTable();
				subAwardIdClicked(false);
			}
		});
		const awardAmountData = Object.create(BaseAwardAmounts);
		awardAmountData.populate(overview, overview.category, defCodes);
		const [idLabel, identifier] = isAwardAggregate(overview.generatedId) ? ["URI", overview.uri] : ["FAIN", overview.fain];
		const isGrant = overview.category === "grant";
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(AwardPageWrapper, {
			allDefCodes: overview.defCodes,
			identifier,
			idLabel,
			awardType: overview.category,
			glossaryLink,
			overviewType: overview.type,
			title: overview.title,
			lastModifiedDateLong: overview.periodOfPerformance.lastModifiedDateLong,
			className: "award-financial-assistance",
			dates: overview.periodOfPerformance,
			unlinked,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(AwardSection, {
					type: "row",
					className: "award-overview",
					id: "award-overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardOverviewLeftSection, {
						awardingAgency: overview.awardingAgency,
						recipient: overview.recipient,
						recordType: overview.recordType,
						awardType: overview.category,
						awardId
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardOverviewRightSection, {
						updateCFDAOverviewLinkClicked,
						jumpToSection,
						overview
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(AwardSection, {
					type: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardAmountsSection, {
						awardType: overview.category,
						awardOverview: awardAmountData,
						jumpToTransactionHistoryTable
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardDescription, {
						description: overview.description,
						awardType: overview.category,
						awardId
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(AwardSection, {
					type: "row",
					children: [
						isGrant && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ContractGrantActivityContainer, {
							awardId,
							awardType: overview.category,
							dates: overview.periodOfPerformance,
							jumpToTransactionHistoryTable
						}),
						!isGrant && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CFDASection, {
							cfdas: overview.cfdas,
							CFDAOverviewLinkClicked,
							updateCFDAOverviewLinkClicked,
							awardTotalObligation: overview._totalObligation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FederalAccountsSection, {
							awardType: overview.category,
							jumpToFederalAccountsHistory,
							unlinked
						})
					]
				}),
				isGrant && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardSection, {
					type: "row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CFDASection, {
						cfdas: overview.cfdas,
						CFDAOverviewLinkClicked,
						updateCFDAOverviewLinkClicked,
						awardTotalObligation: overview._totalObligation
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardHistory, {
					overview,
					setActiveTab,
					activeTab
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AdditionalInfo, { overview })
			]
		});
	};
	FinancialAssistanceContent.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/award/Award.jsx
/**
* Award.jsx
* Created by David Trinh 10/5/2018
**/
var import_jsx_runtime$1, propTypes$1, awardSections, Award;
var init_Award = __esmMin((() => {
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_Error();
	init_PageWrapper();
	init_Loading();
	init_ShareIcon508();
	init_DownloadButton508();
	init_ContractContent();
	init_IdvContent();
	init_FinancialAssistanceContent();
	init_modalActions();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		awardId: PropTypes.string,
		award: PropTypes.object,
		noAward: PropTypes.bool,
		downloadData: PropTypes.func,
		downloadModalProps: PropTypes.shape({
			mounted: PropTypes.bool,
			hideModal: PropTypes.func
		}),
		isDownloadPending: PropTypes.bool,
		isSubAwardIdClicked: PropTypes.bool,
		subAwardIdClicked: PropTypes.func,
		isLoading: PropTypes.bool,
		defCodes: PropTypes.array,
		unlinked: PropTypes.bool
	};
	awardSections = [
		{
			section: "overview",
			label: "Overview"
		},
		{
			section: "additional-information",
			label: "Additional Information"
		},
		{
			section: "referenced-awards",
			label: "Referenced Awards"
		},
		{
			section: "award-history",
			label: "Award History"
		},
		{
			section: "cfda",
			label: "Assistance Listing (CFDA Program) Information"
		}
	];
	Award = (props) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleWindowResize = throttle(() => {
			const local = window.innerWidth;
			if (windowWidth !== local) setWindowWidth(local);
		}, 50);
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}, []);
		const onShareClick = (name) => {
			const { awardId, award } = props;
			const slug = `award/${awardId}`;
			handleShareOptionClick(name, slug, {
				subject: `USAspending.gov Award Summary: ${`${award?.overview?.awardingAgency?.formattedToptier} to ${award.overview?.recipient?._name}`}`,
				body: `View the spending details of this federal award on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		const jumpToSection = (section = "") => {
			if (!find(awardSections, { section })) return;
			const sectionDom = document.querySelector(`#award-${section}`);
			if (!sectionDom) return;
			const sectionTop = sectionDom.offsetTop - 145;
			window.scrollTo({
				top: sectionTop,
				left: 0,
				behavior: "smooth"
			});
		};
		const renderContent = (overview, awardId) => {
			if (!overview) return null;
			if (overview.category === "contract") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ContractContent, {
				awardId,
				overview,
				counts: { subawardCount: overview.subawardCount },
				jumpToSection,
				isSubAwardIdClicked: props.isSubAwardIdClicked,
				subAwardIdClicked: props.subAwardIdClicked,
				defCodes: props.defCodes,
				unlinked: props.unlinked
			});
			else if (overview.category === "idv") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IdvContent, {
				awardId,
				overview,
				details: props.award.idvDetails,
				jumpToSection,
				defCodes: props.defCodes,
				unlinked: props.unlinked
			});
			else if (props.noAward) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Error, {
					title: "Invalid Award ID",
					message: "The award ID provided is invalid.\n                        Please check the ID and try again."
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FinancialAssistanceContent, {
				awardId,
				overview,
				jumpToSection,
				isSubAwardIdClicked: props.isSubAwardIdClicked,
				subAwardIdClicked: props.subAwardIdClicked,
				defCodes: props.defCodes,
				unlinked: props.unlinked
			});
		};
		const { overview } = props.award;
		const { awardId, isLoading } = props;
		const content = renderContent(overview, awardId);
		const slug = `award/${awardId}`;
		const title = overview?.category === "idv" ? "Indefinite Delivery Vehicle" : `${startCase(overview?.category)} Summary`;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "Award Profile",
			classNames: "usa-da-award-v2-page",
			metaTagProps: overview ? awardPageMetaTags(overview) : {},
			title: isLoading ? "--" : title,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadIconButton508, {
				isEnabled: !props.noAward,
				downloadInFlight: props.isDownloadPending,
				onClick: props.downloadData
			}, uniqueId()), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareIcon508, {
				url: getBaseUrl(slug),
				onShareOptionClick: onShareClick
			}, uniqueId())],
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingWrapper, {
				isLoading,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("main", {
					className: !props.noAward ? "award-content" : "",
					children: content
				})
			})
		});
	};
	Award.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/models/v2/award/BaseAwardRecipient.js
var BaseAwardRecipient;
var init_BaseAwardRecipient = __esmMin((() => {
	init_CoreLocation();
	BaseAwardRecipient = {
		populate(data) {
			this.internalId = data.recipient_hash || "";
			this._name = data.recipient_name || "";
			this.duns = data.recipient_unique_id;
			this.uei = data.recipient_uei;
			this.parentName = data.parent_recipient_name || "";
			this.parentDuns = data.parent_recipient_unique_id;
			this.parentUei = data.parent_recipient_uei;
			this.parentInternalId = data.parent_recipient_hash || "";
			this.businessCategories = data.business_categories;
			let locationData = {};
			if (data.location) locationData = {
				address1: data.location.address_line1,
				address2: data.location.address_line2,
				address3: data.location.address_line3,
				province: data.location.foreign_province,
				city: data.location.city_name,
				countyCode: data.location.county_code,
				county: data.location.county_name,
				stateCode: data.location.state_code,
				state: data.location.state_name,
				zip5: data.location.zip5,
				zip4: data.location.zip4,
				foreignPostalCode: data.location.foreign_postal_code,
				country: data.location.country_name || "",
				countryCode: data.location.location_country_code || data.location.country_code || "",
				congressionalDistrict: data.location.congressional_code
			};
			const location = Object.create(CoreLocation);
			location.populateCore(locationData);
			this.location = location;
		},
		get name() {
			return this._name || "Unknown";
		}
	};
}));
//#endregion
//#region src/js/models/v2/award/BaseParentAwardDetails.js
var parentAwardDetails;
var init_BaseParentAwardDetails = __esmMin((() => {
	parentAwardDetails = { populateCore(data) {
		this.awardId = data.generated_unique_award_id ? encodeURIComponent(`${data.generated_unique_award_id}`) : "";
		this.idvType = data.idv_type_description || "";
		this.idcType = data.type_of_idc_description || "";
		this.idvAgencyId = data.referenced_idv_agency_iden || "";
		this.agencyId = data.agency_id || "";
		this.agencyName = data.agency_name || "";
		this.agencySlug = data.agency_slug;
		this.subAgencyId = data.sub_agency_id || "";
		this.subAgencyName = data.sub_agency_name || "";
		this.multipleOrSingle = data.multiple_or_single_aw_desc || "";
		this.piid = data.piid || "";
	} };
}));
//#endregion
//#region src/js/models/v2/award/CoreAwardAgency.js
var CoreAwardAgency;
var init_CoreAwardAgency = __esmMin((() => {
	CoreAwardAgency = {
		toptierName: "--",
		populateCore(data) {
			this.id = data.id || "";
			this.hasAgencyPage = data.hasAgencyPage || false;
			this.toptierName = data.toptierName || "--";
			this.toptierAbbr = data.toptierAbbr || "";
			this.toptierId = data.toptierId || "";
			this.subtierName = data.subtierName || "";
			this.subtierAbbr = data.subtierAbbr || "";
			this.subtierId = data.subtierId || "";
			this.officeName = data.officeName || "";
			this.officeId = data.officeId || "";
			this.agencySlug = data.agencySlug;
		},
		get formattedToptier() {
			if (this.toptierAbbr) return `${this.toptierName} (${this.toptierAbbr})`;
			return this.toptierName;
		}
	};
}));
//#endregion
//#region src/js/models/v2/award/additionalDetails/BaseContractAdditionalDetails.js
var parseCodeAndDescription, handleBoolean, BaseContractAdditionalDetails;
var init_BaseContractAdditionalDetails = __esmMin((() => {
	parseCodeAndDescription = (code, description) => {
		if (code && description) return `${code}: ${description}`;
		else if (code || description) return `${code}${description}`;
		return "--";
	};
	handleBoolean = (value) => {
		if (value) return "TRUE";
		else if (value === false) return "FALSE";
		return "--";
	};
	BaseContractAdditionalDetails = {
		populate(data) {
			this.idvType = data.idv_type_description || "--";
			this.idcType = data.type_of_idc_description || "--";
			this.idvAgencyId = data.referenced_idv_agency_iden || "--";
			this.idvAgencyName = data.referenced_idv_agency_desc || "--";
			this.multipleIdv = data.multiple_or_single_award_description || "--";
			this.solicitationId = data.solicitation_identifier || "--";
			this._solicitationProcedures = data.solicitation_procedures || "";
			this._solicitationProceduresDescription = data.solicitation_procedures_description || "";
			this.numberOffers = data.number_of_offers_received || "--";
			this._extentCompeted = data.extent_competed || "";
			this._extentCompetedDescription = data.extent_competed_description || "";
			this.notCompeted = data.other_than_full_and_open_description || "--";
			this.setAsideType = data.type_set_aside_description || "--";
			this._commercialAcquisitionProcedures = data.commercial_item_acquisition || "";
			this._commercialAcquisitionProceduresDescription = data.commercial_item_acquisition_description || "";
			this.commercialTestProgram = data.commercial_item_test_program_description || "--";
			this.evaluatedPreference = data.evaluated_preference_description || "--";
			this.fedBizOpps = data.fed_biz_opps_description || "--";
			this._smallBusinessCompetitive = data.small_business_competitive;
			this.fairOpportunityLimitedSources = data.fair_opportunity_limited_description || "--";
			this._pscCode = data.product_or_service_code || "";
			this._pscDescription = data.product_or_service_description || "";
			this._naicsCode = data.naics || "";
			this._naicsDescription = data.naics_description || "";
			this._dodClaimantCode = data.dod_claimant_program || "";
			this._dodClaimantDescription = data.dod_claimant_program_description || "";
			this.itCommercialCategory = data.information_technology_commercial_item_category || "--";
			this.seaTransport = data.sea_transportation_description || "--";
			this.clingerCohenAct = data.clinger_cohen_act_planning_description || "--";
			this.constructionWageRateReq = data.construction_wage_rate_description || "--";
			this.laborStandards = data.labor_standards_description || "--";
			this.materialSuppliesArticlesEquip = data.materials_supplies_description || "--";
			this.costOrPricingData = data.cost_or_pricing_data_description || "--";
			this.domesticForeign = data.domestic_or_foreign_entity_description || "--";
			this.foreignFunding = data.foreign_funding_description || "--";
			this.interagencyContactingAuthority = data.interagency_contracting_authority_description || "--";
			this.majorProgram = data.major_program || "--";
			this.priceEvaluationAdjustmentPreference = data.price_evaluation_adjustment || "--";
			this.programAcronym = data.program_acronym || "--";
			this._subcontractingPlan = data.subcontracting_plan || "";
			this._subcontractingPlanDescription = data.subcontracting_plan_description || "";
			this.multiYearContract = data.multi_year_contract_description || "--";
			this.purchaseCardAsPaymentMethod = data.purchase_card_as_payment_method_description || "--";
			this.consolidated = data.consolidated_contract_description || "--";
			this.contractPriceDesc = data.type_of_contract_pricing_description || "--";
			this._dodAcquisitionProgramCode = data.dod_acquisition_program || "";
			this._dodAcquisitionProgramDescription = data.dod_acquisition_program_description || "";
			this._infoTechCommercialItem = data.information_technology_commercial_item_category || "";
			this._infoTechCommercialItemDescription = data.information_technology_commercial_item_category_description || "";
			this.nationalInterestActionDesc = data.national_interest_action_description || "--";
		},
		get pscCode() {
			return parseCodeAndDescription(this._pscCode, this._pscDescription);
		},
		get naicsCode() {
			return parseCodeAndDescription(this._naicsCode, this._naicsDescription);
		},
		get dodAcquisitionProgram() {
			return parseCodeAndDescription(this._dodAcquisitionProgramCode, this._dodAcquisitionProgramDescription);
		},
		get extentCompeted() {
			return parseCodeAndDescription(this._extentCompeted, this._extentCompetedDescription);
		},
		get solicitationProcedures() {
			return parseCodeAndDescription(this._solicitationProcedures, this._solicitationProceduresDescription);
		},
		get subcontractingPlan() {
			return parseCodeAndDescription(this._subcontractingPlan, this._subcontractingPlanDescription);
		},
		get commercialAcquisitionProcedures() {
			return parseCodeAndDescription(this._commercialAcquisitionProcedures, this._commercialAcquisitionProceduresDescription);
		},
		get dodClaimantProgram() {
			return parseCodeAndDescription(this._dodClaimantCode, this._dodClaimantDescription);
		},
		get smallBusinessCompetitive() {
			return handleBoolean(this._smallBusinessCompetitive);
		}
	};
}));
//#endregion
//#region src/js/dataMapping/award/descriptionsForAwardTypes.js
var descriptionsForAwardTypes;
var init_descriptionsForAwardTypes = __esmMin((() => {
	descriptionsForAwardTypes = {
		A: "Blanket Purchase Agreement (BPA) Call",
		B: "Purchase Order (PO)",
		C: "Delivery Order (DO)",
		D: "Definitive Contract",
		E: "Unknown Type",
		F: "Cooperative Agreement",
		G: "Grant for Research",
		S: "Funded Space Act Agreement",
		T: "Training Grant",
		IDV_A: "Government-Wide Acquisition Contract",
		IDV_B: "Indefinite Delivery Contract",
		IDV_B_A: "Indefinite Delivery / Requirements Contract",
		IDV_B_B: "Indefinite Delivery / Indefinite Quantity (IDIQ) Contract",
		IDV_B_C: "Indefinite Delivery / Definite Quantity Contract",
		IDV_C: "Federal Supply Schedule",
		IDV_D: "Basic Ordering Agreement",
		IDV_E: "Blanket Purchase Agreement",
		"02": "Block Grant",
		"03": "Formula Grant",
		"04": "Project Grant",
		"05": "Cooperative Agreement",
		10: "Direct Payment with Unrestricted Use",
		"06": "Direct Payment for Specified Use",
		"07": "Direct Loan",
		"08": "Guaranteed/Insured Loan",
		"09": "Insurance",
		11: "Other Financial Assistance"
	};
}));
/**
* NOTE:
*   These values are not a direct one to one map of award types and descriptions.
*   These descriptions have been edited to be displayed to the user on the
*   Award Pages.
*/
//#endregion
//#region src/js/models/v2/award/CoreAward.js
/**
* CoreAward.js
* Created by David Trinh 10/9/18
*/
var CoreAward;
var init_CoreAward = __esmMin((() => {
	init_moneyFormatter();
	init_descriptionsForAwardTypes();
	init_CorePeriodOfPerformance();
	CoreAward = {
		populateCore(data) {
			this._category = data.category;
			this.id = data.id || "";
			this.generatedId = data.generatedId ? encodeURIComponent(`${data.generatedId}`) : "";
			this.type = data.type || "";
			this.typeDescription = data.typeDescription || "--";
			this.description = data.description || "--";
			this._subawardTotal = parseFloat(data.subawardTotal) || 0;
			this.subawardCount = parseFloat(data.subawardCount) || 0;
			this._totalObligation = parseFloat(data.totalObligation) || 0;
			this._totalOutlay = parseFloat(data.totalOutlay) || 0;
			this._child_award_total_outlay = parseFloat(data.childAwardTotalOutlay) || 0;
			this._grandchild_award_total_outlay = parseFloat(data.grandchildAwardTotalOutlay) || 0;
			this._baseExercisedOptions = parseFloat(data.baseExercisedOptions) || 0;
			this._baseAndAllOptions = parseFloat(data.baseAndAllOptions) || 0;
			this._dateSigned = data.dateSigned && parseDate(data.dateSigned) || "";
			this.naics = data.naics || {};
			this.psc = data.psc || {};
			this.fileC = data.fileC || {
				obligations: [],
				outlays: []
			};
			this.defCodes = data.fileC ? data.fileC.obligations.concat(data.fileC.outlays).filter(({ amount }) => amount !== 0).reduce((acc, { code }) => [.../* @__PURE__ */ new Set([...acc, code])], []) : [];
		},
		get subawardTotal() {
			if (this._subawardTotal >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._subawardTotal);
				return `${formatMoneyWithPrecision(this._subawardTotal / units.unit, 2)} ${units.longLabel}`;
			}
			return formatMoneyWithPrecision(this._subawardTotal, 0);
		},
		get category() {
			if (this._category === "loans") return "loan";
			return this._category;
		},
		get dateSigned() {
			if (this._dateSigned) return formatDate(this._dateSigned);
			return "";
		},
		get overspendingFormatted() {
			return formatMoneyWithPrecision(this._totalObligation - this._baseExercisedOptions, 2);
		},
		get overspendingAbbreviated() {
			if (this._totalObligation - this._baseExercisedOptions >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalObligation - this._baseExercisedOptions);
				return `${formatMoneyWithPrecision((this._totalObligation - this._baseExercisedOptions) / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._totalObligation - this._baseExercisedOptions);
		},
		get extremeOverspendingFormatted() {
			return formatMoneyWithPrecision(this._totalObligation - this._baseAndAllOptions, 2);
		},
		get extremeOverspendingAbbreviated() {
			if (this._totalObligation - this._baseAndAllOptions >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._totalObligation - this._baseAndAllOptions);
				return `${formatMoneyWithPrecision((this._totalObligation - this._baseAndAllOptions) / units.unit, 1)} ${units.unitLabel}`;
			}
			return formatMoney(this._totalObligation - this._baseAndAllOptions);
		},
		get subAwardedPercent() {
			let percent = this._subawardTotal / this._totalObligation * 100;
			if (percent <= 0 || isNaN(percent)) return "0%";
			percent = formatNumberWithPrecision(percent, 1);
			return `${percent}%`;
		},
		get title() {
			if (descriptionsForAwardTypes[this.type]) return descriptionsForAwardTypes[this.type];
			if (this.category) {
				if (this.category === "idv") return "IDV";
				return upperFirst(this.category);
			}
			return "--";
		}
	};
}));
//#endregion
//#region src/js/models/v2/award/CoreExecutiveDetails.js
var emptyExecutiveCompensation, parseExecutiveCompensation, CoreExecutiveDetails;
var init_CoreExecutiveDetails = __esmMin((() => {
	init_moneyFormatter();
	emptyExecutiveCompensation = () => {
		const executiveCompensation = {};
		for (let i = 1; i < 6; i++) executiveCompensation[`Officer ${i}`] = "--";
		return executiveCompensation;
	};
	parseExecutiveCompensation = (data) => {
		const executiveCompensation = {};
		if (!data) return emptyExecutiveCompensation();
		const officers = data.officers;
		if (officers && officers.length > 0) officers.forEach((officer, index) => {
			const name = officer.name || "";
			const amount = formatMoney(officer.amount) || 0;
			if (name) executiveCompensation[`Officer ${index + 1}`] = `${name} - ${amount}`;
			else executiveCompensation[`Officer ${index + 1}`] = "--";
		});
		else return emptyExecutiveCompensation();
		return executiveCompensation;
	};
	CoreExecutiveDetails = { populateCore(data) {
		this.officers = parseExecutiveCompensation(data);
	} };
}));
//#endregion
//#region src/js/models/v2/award/BaseContract.js
var BaseContract;
var init_BaseContract = __esmMin((() => {
	init_moneyFormatter();
	init_pscHelper();
	init_CoreLocation();
	init_BaseAwardRecipient();
	init_BaseParentAwardDetails();
	init_CoreAwardAgency();
	init_BaseContractAdditionalDetails();
	init_CoreAward();
	init_CoreExecutiveDetails();
	init_CorePeriodOfPerformance();
	BaseContract = Object.create(CoreAward);
	BaseContract.populate = function populate(data) {
		const coreData = {
			id: data.id,
			generatedId: data.generated_unique_award_id,
			type: data.type,
			typeDescription: data.type_description,
			description: data.description,
			category: data.category,
			subawardTotal: data.total_subaward_amount,
			subawardCount: data.subaward_count,
			totalObligation: data.total_obligation,
			totalOutlay: data.total_outlay,
			baseExercisedOptions: data.base_exercised_options,
			dateSigned: data.date_signed,
			baseAndAllOptions: data.base_and_all_options,
			naics: data.naics_hierarchy,
			psc: data.psc_hierarchy ? Object.entries(data.psc_hierarchy).reduce(deducePscType, emptyHierarchy) : {},
			fileC: {
				obligations: data.account_obligations_by_defc,
				outlays: data.account_outlays_by_defc
			}
		};
		this.populateCore(coreData);
		if (data.recipient) {
			const recipient = Object.create(BaseAwardRecipient);
			recipient.populate(data.recipient);
			this.recipient = recipient;
		}
		if (data.place_of_performance) {
			const placeOfPerformanceData = {
				city: data.place_of_performance.city_name,
				county: data.place_of_performance.county_name,
				stateCode: data.place_of_performance.state_code,
				state: data.place_of_performance.state_code,
				province: data.place_of_performance.foreign_province,
				zip5: data.place_of_performance.zip5,
				zip4: data.place_of_performance.zip4,
				congressionalDistrict: data.place_of_performance.congressional_code,
				country: data.place_of_performance.country_name,
				countryCode: data.place_of_performance.location_country_code
			};
			const placeOfPerformance = Object.create(CoreLocation);
			placeOfPerformance.populateCore(placeOfPerformanceData);
			this.placeOfPerformance = placeOfPerformance;
		}
		if (data.period_of_performance) {
			const periodOfPerformanceData = {
				startDate: data.period_of_performance.start_date,
				endDate: data.period_of_performance.end_date,
				lastModifiedDate: data.period_of_performance.last_modified_date,
				potentialEndDate: data.period_of_performance.potential_end_date
			};
			const periodOfPerformance = Object.create(CorePeriodOfPerformance);
			periodOfPerformance.populateCore(periodOfPerformanceData);
			this.periodOfPerformance = periodOfPerformance;
		}
		if (data.awarding_agency) {
			const awardingAgencyData = {
				id: data.awarding_agency.id,
				hasAgencyPage: data.awarding_agency.has_agency_page,
				toptierName: data.awarding_agency.toptier_agency.name,
				toptierAbbr: data.awarding_agency.toptier_agency.abbreviation || "",
				subtierName: data.awarding_agency.subtier_agency.name,
				subtierAbbr: data.awarding_agency.subtier_agency.abbreviation || "",
				officeName: data.awarding_agency.office_agency_name,
				agencySlug: data.awarding_agency.toptier_agency.slug
			};
			const awardingAgency = Object.create(CoreAwardAgency);
			awardingAgency.populateCore(awardingAgencyData);
			this.awardingAgency = awardingAgency;
		} else this.awardingAgency = {};
		if (data.funding_agency) {
			const fundingAgencyData = {
				id: data.funding_agency.id,
				hasAgencyPage: data.funding_agency.has_agency_page,
				toptierName: data.funding_agency.toptier_agency.name,
				toptierAbbr: data.funding_agency.toptier_agency.abbreviation || "",
				subtierName: data.funding_agency.subtier_agency.name,
				subtierAbbr: data.funding_agency.subtier_agency.abbreviation || "",
				officeName: data.funding_agency.office_agency_name,
				agencySlug: data.funding_agency.toptier_agency.slug
			};
			const fundingAgency = Object.create(CoreAwardAgency);
			fundingAgency.populateCore(fundingAgencyData);
			this.fundingAgency = fundingAgency;
		} else this.fundingAgency = {};
		if (data.latest_transaction_contract_data) {
			const additionalDetails = Object.create(BaseContractAdditionalDetails);
			additionalDetails.populate(data.latest_transaction_contract_data);
			this.additionalDetails = additionalDetails;
		}
		const parentAwardDetails$2 = Object.create(parentAwardDetails);
		parentAwardDetails$2.populateCore(data.parent_award || {});
		this.parentAwardDetails = parentAwardDetails$2;
		const executiveDetails = Object.create(CoreExecutiveDetails);
		executiveDetails.populateCore(data.executive_details);
		this.executiveDetails = executiveDetails;
		this.pricing = data.latest_transaction_contract_data || "--";
		this._amount = parseFloat(data.base_and_all_options) || 0;
		this.piid = data.piid || "";
	};
	Object.defineProperty(BaseContract, "amount", { get() {
		if (this._obligation >= unitValues.MILLION) {
			const units = calculateUnitForSingleValue(this._amount);
			return `${formatMoneyWithPrecision(this._amount / units.unit, 2)} ${units.longLabel}`;
		}
		return formatMoneyWithPrecision(this._amount, 0);
	} });
	Object.defineProperty(BaseContract, "amountFormatted", { get() {
		return formatMoney(this._amount);
	} });
	Object.defineProperty(BaseContract, "remaining", { get() {
		const remaining = this._amount - this._obligation;
		if (remaining >= unitValues.MILLION) {
			const units = calculateUnitForSingleValue(remaining);
			return `${formatMoneyWithPrecision(remaining / units.unit, 2)} ${units.longLabel}`;
		}
		return formatMoneyWithPrecision(remaining, 0);
	} });
}));
//#endregion
//#region src/js/models/v2/award/BaseIdv.js
var BaseIdv;
var init_BaseIdv = __esmMin((() => {
	init_pscHelper();
	init_CoreLocation();
	init_CoreAward();
	init_CoreAwardAgency();
	init_CorePeriodOfPerformance();
	init_CoreExecutiveDetails();
	init_BaseContractAdditionalDetails();
	init_BaseAwardRecipient();
	init_BaseParentAwardDetails();
	BaseIdv = Object.create(CoreAward);
	BaseIdv.populate = function populate(data) {
		const coreData = {
			id: data.id,
			generatedId: data.generated_unique_award_id,
			type: data.type,
			typeDescription: data.type_description,
			description: data.description,
			category: data.category,
			subawardTotal: data.total_subaward_amount,
			subawardCount: data.subaward_count,
			totalObligation: data.total_obligation,
			totalOutlay: data.total_outlay,
			childAwardTotalOutlay: data.child_award_total_outlay,
			grandChildAwardTotalOutlay: data.grandchild_award_total_outlay,
			baseExercisedOptions: data.base_exercised_options,
			baseAndAllOptions: data.base_and_all_options,
			dateSigned: data.date_signed,
			naics: data.naics_hierarchy || emptyHierarchy,
			psc: Object.entries(data.psc_hierarchy).reduce(deducePscType, emptyHierarchy),
			fileC: {
				obligations: data.account_obligations_by_defc,
				outlays: data.account_outlays_by_defc
			}
		};
		this.populateCore(coreData);
		const parentAwardDetails$1 = Object.create(parentAwardDetails);
		if (data.parent_award) parentAwardDetails$1.populateCore(data.parent_award || {});
		this.parentAwardDetails = parentAwardDetails$1;
		const recipient = Object.create(BaseAwardRecipient);
		if (data.recipient) recipient.populate(data.recipient);
		this.recipient = recipient;
		const placeOfPerformance = Object.create(CoreLocation);
		if (data.place_of_performance) {
			const placeOfPerformanceData = {
				address1: data.place_of_performance.address_line1,
				address2: data.place_of_performance.address_line2,
				address3: data.place_of_performance.address_line3,
				province: data.place_of_performance.foreign_province,
				city: data.place_of_performance.city_name,
				county: data.place_of_performance.county_name,
				stateCode: data.place_of_performance.state_code,
				state: data.place_of_performance.state_code,
				zip5: data.place_of_performance.zip5,
				zip4: data.place_of_performance.zip4,
				foreignPostalCode: data.place_of_performance.foreign_postal_code,
				congressionalDistrict: data.place_of_performance.congressional_code,
				country: data.place_of_performance.country_name,
				countryCode: data.place_of_performance.location_country_code
			};
			placeOfPerformance.populateCore(placeOfPerformanceData);
		}
		this.placeOfPerformance = placeOfPerformance;
		const periodOfPerformance = Object.create(CorePeriodOfPerformance);
		if (data.period_of_performance) {
			const periodOfPerformanceData = {
				startDate: data.period_of_performance.start_date,
				endDate: data.period_of_performance.end_date,
				lastModifiedDate: data.period_of_performance.last_modified_date
			};
			periodOfPerformance.populateCore(periodOfPerformanceData);
		}
		this.dates = periodOfPerformance;
		const fundingAgency = Object.create(CoreAwardAgency);
		if (data.funding_agency) {
			const fundingAgencyData = {
				id: data.funding_agency.id,
				hasAgencyPage: data.funding_agency.has_agency_page,
				toptierName: data.funding_agency.toptier_agency.name,
				toptierAbbr: data.funding_agency.toptier_agency.abbreviation || "",
				subtierName: data.funding_agency.subtier_agency.name,
				subtierAbbr: data.funding_agency.subtier_agency.abbreviation || "",
				officeName: data.funding_agency.office_agency_name,
				agencySlug: data.funding_agency.toptier_agency.slug
			};
			fundingAgency.populateCore(fundingAgencyData);
		}
		this.fundingAgency = fundingAgency;
		const awardingAgency = Object.create(CoreAwardAgency);
		if (data.awarding_agency) {
			const awardingAgencyData = {
				id: data.awarding_agency.id,
				hasAgencyPage: data.awarding_agency.has_agency_page,
				toptierName: data.awarding_agency.toptier_agency.name,
				toptierAbbr: data.awarding_agency.toptier_agency.abbreviation || "",
				subtierName: data.awarding_agency.subtier_agency.name,
				subtierAbbr: data.awarding_agency.subtier_agency.abbreviation || "",
				officeName: data.awarding_agency.office_agency_name,
				agencySlug: data.awarding_agency.toptier_agency.slug
			};
			awardingAgency.populateCore(awardingAgencyData);
		}
		this.awardingAgency = awardingAgency;
		const additionalDetails = Object.create(BaseContractAdditionalDetails);
		if (data.latest_transaction_contract_data) additionalDetails.populate(data.latest_transaction_contract_data);
		this.additionalDetails = additionalDetails;
		const executiveDetails = Object.create(CoreExecutiveDetails);
		executiveDetails.populateCore(data.executive_details);
		this.executiveDetails = executiveDetails;
		this.piid = data.piid || "";
	};
}));
//#endregion
//#region src/js/models/v2/award/BaseCFDA.js
/**
* BaseCFDA.js
* Created by Jonathan Hill 03/17/20
*/
var BaseCFDA;
var init_BaseCFDA = __esmMin((() => {
	init_moneyFormatter();
	BaseCFDA = class {
		constructor(data, total) {
			this.samWebsite = data.sam_website || "";
			this.cfdaWebsite = data.cfda_website || "";
			this.cfdaFederalAgency = data.cfda_federal_agency || "";
			this.cfdaNumber = data.cfda_number || "";
			this.cfdaTitle = data.cfda_title || "--";
			this.applicantEligibility = data.applicant_eligibility || "";
			this.beneficiaryEligibility = data.beneficiary_eligibility || "";
			this.cfdaObjectives = data.cfda_objectives || "";
			this._totalAwardObligation = isNumber(total) ? total : "";
			this._federalActionOblicationAmount = isNumber(data.federal_action_obligation_amount) ? data.federal_action_obligation_amount : "";
			this._percentOfTotal = isNumber(this._totalAwardObligation) && this._totalAwardObligation !== 0 && isNumber(this._federalActionOblicationAmount) ? this._federalActionOblicationAmount / this._totalAwardObligation : null;
			Object.defineProperties(this, {
				federalActionOblicationAmount: {
					enumerable: true,
					get: () => isNumber(this._federalActionOblicationAmount) ? formatMoney(this._federalActionOblicationAmount) : "--"
				},
				federalActionOblicationAmountShort: {
					enumerable: true,
					get: () => {
						if (isNumber(this._federalActionOblicationAmount)) {
							const units = calculateUnitForSingleValue(this._federalActionOblicationAmount, 1);
							return `${formatMoneyWithPrecision(this._federalActionOblicationAmount / units.unit, 1)}${units.unitLabel}`;
						}
						return "--";
					}
				},
				percentOfTotal: {
					enumerable: true,
					get: () => isNumber(this._totalAwardObligation) && this._totalAwardObligation !== 0 && isNumber(this._federalActionOblicationAmount) ? calculatePercentage(this._federalActionOblicationAmount, this._totalAwardObligation) : "--"
				},
				cfdaTitleShort: {
					enumerable: true,
					get: () => this.cfdaTitle.length >= 42 ? truncate(this.cfdaTitle, { length: 42 }) : this.cfdaTitle
				}
			});
		}
	};
}));
//#endregion
//#region src/js/models/v2/award/CorePreAwardDetails.js
var emptyPreAwardDetails, parsePreAwardDetails, CorePreAwardDetails;
var init_CorePreAwardDetails = __esmMin((() => {
	emptyPreAwardDetails = () => {
		return {
			"Funding Opportunity Number": "--",
			Description: "--"
		};
	};
	parsePreAwardDetails = (data) => {
		const preAwardDetails = {};
		if (!data) return emptyPreAwardDetails();
		preAwardDetails["Funding Opportunity Number"] = data.number;
		preAwardDetails.Description = data.goals;
		return preAwardDetails;
	};
	CorePreAwardDetails = { populateCore(data) {
		this.preAwardDetails = parsePreAwardDetails(data);
	} };
}));
//#endregion
//#region src/js/models/v2/award/BaseFinancialAssistance.js
var BaseFinancialAssistance, emptyCfda, getLargestCfda;
var init_BaseFinancialAssistance = __esmMin((() => {
	init_CoreLocation();
	init_BaseAwardRecipient();
	init_CoreAwardAgency();
	init_CoreAward();
	init_BaseCFDA();
	init_CorePeriodOfPerformance();
	init_CoreExecutiveDetails();
	init_CorePreAwardDetails();
	BaseFinancialAssistance = Object.create(CoreAward);
	emptyCfda = {
		total_funding_amount: -Infinity,
		cfdaTitle: "",
		cfdaNumber: ""
	};
	getLargestCfda = (acc, cfdaItem) => {
		if (cfdaItem.total_funding_amount > acc.total_funding_amount) return new BaseCFDA(cfdaItem);
		return acc;
	};
	BaseFinancialAssistance.populate = function populate(data) {
		const coreData = {
			id: data.id,
			generatedId: data.generated_unique_award_id,
			type: data.type,
			typeDescription: data.type_description,
			description: data.description,
			category: data.category,
			subawardTotal: data.total_subaward_amount,
			subawardCount: data.subaward_count,
			totalObligation: data.total_obligation,
			totalOutlay: data.total_outlay,
			baseExercisedOptions: data.base_exercised_options,
			dateSigned: data.date_signed,
			fileC: {
				obligations: data.account_obligations_by_defc,
				outlays: data.account_outlays_by_defc
			}
		};
		this.populateCore(coreData);
		if (data.cfda_info && data.cfda_info.length) this.cfdas = data.cfda_info.map((cfda) => {
			return new BaseCFDA(cfda, data.total_obligation);
		});
		if (data.recipient) {
			const recipient = Object.create(BaseAwardRecipient);
			recipient.populate(data.recipient);
			this.recipient = recipient;
		}
		if (data.place_of_performance) {
			const placeOfPerformanceData = {
				city: data.place_of_performance.city_name,
				countyCode: data.place_of_performance.county_code,
				county: data.place_of_performance.county_name,
				stateCode: data.place_of_performance.state_code,
				state: data.place_of_performance.state_name || data.place_of_performance.state_code,
				province: data.place_of_performance.foreign_province,
				foreignPostalCode: data.foreign_postal_code,
				zip5: data.place_of_performance.zip5,
				zip4: data.place_of_performance.zip4,
				congressionalDistrict: data.place_of_performance.congressional_code,
				country: data.place_of_performance.country_name,
				countryCode: data.place_of_performance.location_country_code
			};
			const placeOfPerformance = Object.create(CoreLocation);
			placeOfPerformance.populateCore(placeOfPerformanceData);
			this.placeOfPerformance = placeOfPerformance;
		}
		if (data.period_of_performance) {
			const periodOfPerformanceData = {
				startDate: data.period_of_performance.start_date,
				endDate: data.period_of_performance.end_date,
				lastModifiedDate: data.period_of_performance.last_modified_date
			};
			const periodOfPerformance = Object.create(CorePeriodOfPerformance);
			periodOfPerformance.populateCore(periodOfPerformanceData);
			this.periodOfPerformance = periodOfPerformance;
		}
		if (data.awarding_agency) {
			const awardingAgencyData = {
				id: data.awarding_agency.id,
				hasAgencyPage: data.awarding_agency.has_agency_page,
				toptierName: data.awarding_agency.toptier_agency.name,
				toptierAbbr: data.awarding_agency.toptier_agency.abbreviation || "",
				subtierName: data.awarding_agency.subtier_agency.name,
				subtierAbbr: data.awarding_agency.subtier_agency.abbreviation || "",
				officeName: data.awarding_agency.office_agency_name,
				agencySlug: data.awarding_agency.toptier_agency.slug
			};
			const awardingAgency = Object.create(CoreAwardAgency);
			awardingAgency.populateCore(awardingAgencyData);
			this.awardingAgency = awardingAgency;
		} else this.awardingAgency = {};
		if (data.funding_agency) {
			const fundingAgencyData = {
				id: data.funding_agency.id,
				hasAgencyPage: data.funding_agency.has_agency_page,
				toptierName: data.funding_agency.toptier_agency.name,
				toptierAbbr: data.funding_agency.toptier_agency.abbreviation || "",
				subtierName: data.funding_agency.subtier_agency.name,
				subtierAbbr: data.funding_agency.subtier_agency.abbreviation || "",
				officeName: data.funding_agency.office_agency_name,
				agencySlug: data.funding_agency.toptier_agency.slug
			};
			const fundingAgency = Object.create(CoreAwardAgency);
			fundingAgency.populateCore(fundingAgencyData);
			this.fundingAgency = fundingAgency;
		} else this.fundingAgency = {};
		const executiveDetails = Object.create(CoreExecutiveDetails);
		executiveDetails.populateCore(data.executive_details);
		this.executiveDetails = executiveDetails;
		this._faceValue = parseFloat(data.total_loan_value) || 0;
		this._subsidy = parseFloat(data.total_subsidy_cost) || 0;
		this._baseAllOptions = parseFloat(data.base_and_all_options) || 0;
		this._federalObligation = parseFloat(data.transaction_obligated_amount) || 0;
		this._nonFederalFunding = parseFloat(data.non_federal_funding) || 0;
		this._totalFunding = parseFloat(data.total_funding) || 0;
		this.fain = data.fain;
		this.uri = data.uri;
		this.biggestCfda = data.cfda_info.reduce(getLargestCfda, emptyCfda);
		this.cfdaList = data.cfda_info;
		this.recordType = data.record_type;
		if (this.category === "grant") {
			const preAwardDetails = Object.create(CorePreAwardDetails);
			preAwardDetails.populateCore(data.funding_opportunity);
			this.preAwardDetails = preAwardDetails.preAwardDetails;
		}
	};
	Object.defineProperty(BaseFinancialAssistance, "cfdaProgram", { get() {
		if (this.biggestCfda.cfdaNumber && this.biggestCfda.cfdaTitle) return `${this.biggestCfda.cfdaNumber} - ${this.biggestCfda.cfdaTitle}`;
		else if (this.biggestCfda.cfdaNumber || this.biggestCfda.cfdaTitle) return `${this.biggestCfda.cfdaNumber}${this.biggestCfda.cfdaTitle}`;
		return "--";
	} });
}));
//#endregion
//#region src/_scss/pages/award/awardPage.scss
var require_awardPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/award/AwardContainer.jsx
/**
* AwardContainer.jsx
* Created by David Trinh 10/5/2018
**/
var import_jsx_runtime, propTypes, AwardContainer, AwardContainer_default;
//#endregion
__esmMin((() => {
	init_es();
	init_redux();
	init_axios();
	init_development();
	init_Award();
	init_searchHelper();
	init_awardActions();
	init_bulkDownloadActions();
	init_searchSubAwardTableActions();
	init_covid19Actions();
	init_BaseContract();
	init_BaseIdv();
	init_BaseFinancialAssistance();
	init_downloadHelper();
	init_WithDefCodes();
	init_awardHistoryHelper();
	init_Analytics();
	import_jsx_runtime = require_jsx_runtime();
	require_awardPage();
	propTypes = {
		subAwardIdClicked: PropTypes.func,
		setAward: PropTypes.func,
		resetAward: PropTypes.func,
		handleDownloadRequest: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		setDownloadPending: PropTypes.func,
		setDownloadExpectedFile: PropTypes.func,
		setDownloadExpectedUrl: PropTypes.func,
		award: PropTypes.object,
		isDownloadPending: PropTypes.bool,
		isSubAwardIdClicked: PropTypes.bool,
		match: PropTypes.object,
		defCodes: PropTypes.array,
		setDEFCodes: PropTypes.func
	};
	AwardContainer = (props) => {
		let awardRequest = null;
		let downloadRequest = null;
		let countRequest = null;
		const [noAward, setNoAward] = useState(false);
		const [inFlight, setInFlight] = useState(true);
		const [unlinked, setUnlinked] = useState(false);
		const { awardId } = useMatch(`/award/:awardId`).params;
		const parseAward = (data) => {
			countRequest = getAwardHistoryCounts("federal_account", data.id, data.category === "idv");
			countRequest.promise.then((results) => {
				const countDataBool = results.data.federal_accounts === 0 || results.data.count === 0;
				setUnlinked(countDataBool);
			});
			setNoAward(false);
			if (data.category === "contract") {
				const contract = Object.create(BaseContract);
				contract.populate(data);
				props.setAward(contract);
			} else if (data.category === "idv") {
				const idv = Object.create(BaseIdv);
				idv.populate(data);
				props.setAward(idv);
			} else {
				const financialAssistance = Object.create(BaseFinancialAssistance);
				financialAssistance.populate(data);
				props.setAward(financialAssistance);
			}
		};
		const getSelectedAward = (id) => {
			if (awardRequest) awardRequest.cancel();
			setInFlight(true);
			awardRequest = fetchAwardV2(id);
			awardRequest.promise.then((results) => {
				const awardData = results.data;
				setInFlight(false);
				parseAward(awardData);
				awardRequest = null;
			}).catch((error) => {
				console.log(error);
				if (isCancel(error)) {} else if (error.response) {
					awardRequest = null;
					setNoAward(true);
					setInFlight(false);
				} else {
					awardRequest = null;
					console.log(error);
					setInFlight(false);
				}
			});
		};
		const fetchAwardDownloadFile = (awardCategory = props.award.category) => {
			Analytics.event({
				event: "award-profile-download-initiated",
				category: "Award Profile",
				action: "Download Initiated",
				label: `Award Id ${awardId}`
			});
			if (awardCategory === "idv") return fetchIdvDownloadFile(awardId);
			else if (awardCategory === "contract") return fetchContractDownloadFile(awardId);
			return fetchAssistanceDownloadFile(awardId);
		};
		const downloadData = async (awardCategory = props.award.category) => {
			props.setDownloadCollapsed(true);
			if (downloadRequest) downloadRequest.cancel();
			downloadRequest = fetchAwardDownloadFile(awardCategory);
			try {
				const { data } = await downloadRequest.promise;
				props.setDownloadExpectedUrl(data.file_url);
				props.setDownloadExpectedFile(data.file_name);
				props.setDownloadPending(true);
				downloadRequest = null;
			} catch (err) {
				console.log(err);
				downloadRequest = null;
			}
		};
		useEffect(() => {
			getSelectedAward(awardId);
		}, [awardId]);
		useEffect(() => {
			return () => {
				if (awardRequest) awardRequest.cancel();
				props.resetAward();
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
			subAwardIdClicked: props.subAwardIdClicked,
			isSubAwardIdClicked: props.isSubAwardIdClicked,
			isDownloadPending: props.isDownloadPending,
			downloadData,
			awardId,
			award: props.award,
			isLoading: inFlight,
			noAward,
			defCodes: props.defCodes,
			unlinked
		});
	};
	AwardContainer.propTypes = propTypes;
	AwardContainer_default = flowRight(withDefCodes, connect_default((state) => ({
		award: state.award,
		isDownloadPending: state.bulkDownload.download.pendingDownload,
		isSubAwardIdClicked: state.searchSubAwardTable.isSubAwardIdClicked,
		defCodes: state.covid19.defCodes
	}), (dispatch) => bindActionCreators({
		setDownloadExpectedUrl,
		setDownloadExpectedFile,
		setDownloadPending,
		setDownloadCollapsed,
		setAward,
		subAwardIdClicked,
		resetAward,
		setDEFCodes
	}, dispatch)))(AwardContainer);
}))();
export { AwardContainer_default as default };
