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

// award overview recipient section - determines text and address to display to user
// data can be found in
export const getAwardTypeByRecordtypeCountyAndState = (
    awardType,
    placeOfPerformance,
    recordType
) => {
    if (isAwardFinancialAssistance(awardType)) {
        // redacted due to PII
        if (recordType === 3) return 'redactedDueToPII';
        if (recordType === 2) return 'financialAssistance';
        if (recordType === 1) {
            // aggregated by state
            if (placeOfPerformance._countryCode === 'USA' && !placeOfPerformance._countyCode) {
                return 'aggregatedByState';
            }
            // aggregated by county
            if (placeOfPerformance._countryCode === 'USA' && placeOfPerformance._countyCode) {
                return 'aggregatedByCounty';
            }
            // aggregated by country
            if (placeOfPerformance._countryCode !== 'USA') {
                return 'aggregatedByCountry';
            }
        }
    }
    // IDV or contract
    return 'nonFinancialAssistance';
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

export const recipientAddressByAwardType = (location, awardType) => {

};
