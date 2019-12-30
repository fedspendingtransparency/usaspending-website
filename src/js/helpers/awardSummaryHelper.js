import moment from "moment";
import { apiRequest } from "./apiRequest";

/**
 * awardSummaryHelper.js
 * Created by Lizzie Salita 8/16/19
**/

export const fetchAwardFundingSummary = (awardId) => apiRequest({
    url: 'v2/awards/funding_rollup/',
    method: 'post',
    data: { award_id: awardId }
});

export const fetchAwardFederalAccounts = (data) => apiRequest({
    url: 'v2/awards/accounts/',
    method: 'post',
    data
});

// The string ASST_AGG w/in a generatedUniqueId indicates an aggregated assistance type award
export const isAwardAggregate = (generatedAwardId = '') => generatedAwardId.includes("ASST_AGG");

export const isAwardFinancialAssistance = (awardType) => [
    'grant',
    'insurance',
    'direct payment',
    'loan',
    'other'
].includes(awardType);

export const isContract = (awardType) => [
    'contract',
    'definitive contract'
].includes(awardType);

// takes core location object
export const isUSAAward = (placeOfPerformance) => {
    const countryCode = placeOfPerformance._countryCode;
    const countryName = placeOfPerformance.countryName;
    if (
        countryCode === 'USA'
        || countryCode === 'UNITED STATES'
        || countryName === 'UNITED STATES'
    ) return true;
    return false;
};

// award overview recipient section - determines text and address to display to user
// data can be found in
export const getAwardTypeByRecordtypeCountyAndState = (
    awardType,
    placeOfPerformance,
    recordType
) => {
    const countyCode = placeOfPerformance._countyCode;
    const isUSA = isUSAAward(placeOfPerformance);
    if (isAwardFinancialAssistance(awardType)) {
        // redacted due to PII
        if (recordType === 3) {
            if (!isUSA) {
                return 'redactedDueToPIIForeign';
            }
            return 'redactedDueToPIIDomestic';
        }
        if (recordType === 2) {
            return !isUSA
                ? 'financialAssistanceForeign'
                : 'financialAssistanceDomestic';
        }
        if (recordType === 1) {
            // aggregated by state
            if (isUSA && !countyCode) {
                return 'aggregatedByState';
            }
            // aggregated by county
            if (isUSA && countyCode) {
                return 'aggregatedByCounty';
            }
            // aggregated by country
            if (!isUSA) {
                return 'aggregatedByCountry';
            }
        }
    }
    // IDV or contract
    return isUSA
        ? 'nonFinancialAssistanceDomestic'
        : 'nonFinancialAssistanceForeign';
};

export const datesByDateType = (dates, awardType) => {
    const startDate = moment(dates._startDate.valueOf());
    let endDate = moment(dates._endDate.valueOf());
    let currentEndDate = null;
    if (isContract(awardType)) {
        endDate = moment(dates._potentialEndDate.valueOf());
        currentEndDate = moment(dates._endDate.valueOf());
    }
    return { startDate, endDate, currentEndDate };
};

export const isBadDates = (dates, awardType) => {
    const contract = isContract(awardType);
    const { startDate, endDate, currentEndDate } = dates;
    if (contract) {
        if (startDate && endDate && currentEndDate) {
            if (endDate.isBefore(startDate)
                || currentEndDate.isBefore(startDate)
                || endDate.isBefore(currentEndDate)
            ) return true;
            return false;
        }
        return true;
    }
    if (startDate && endDate) {
        if (startDate.isAfter(endDate)) return true;
        return false;
    }
    return true;
};
