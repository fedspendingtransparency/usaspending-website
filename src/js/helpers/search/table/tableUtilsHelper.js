/**
 * tableUtilsHelper.js
 * Created by JD House on 7/17/2025.
 */

import * as SearchHelper from 'helpers/searchHelper';
import { performKeywordSearch } from '../../../helpers/keywordHelper';
import { subawardTypeGroups, transactionTypeGroups } from '../../../dataMapping/search/awardType';
import SearchAwardsOperation from '../../../models/v1/search/SearchAwardsOperation';

export const twoVariableFormat = (object, key1, key2) => {
    if (object?.[key1] && object?.[key2]) {
        return `${object[key1]} - ${object[key2]}`;
    }

    return "--";
};

export const assistanceListingFormat = (assistanceListing) => {
    // format for spending by award api
    if (assistanceListing?.length === 1) {
        const listing = assistanceListing[0];

        return `${listing.cfda_number} - ${listing.cfda_program_title}`;
    }
    else if (assistanceListing?.length > 1) {
        const listings = [];

        assistanceListing.forEach((listing) => {
            listings.push(`${listing.cfda_number} - ${listing.cfda_program_title}`);
        });

        return listings.join(', ');
    }

    return '--';
};

export const getSubawardDataByPrimeId = (awardId, filters, paramsOptions) => {
    // get searchParams from state
    const searchParamsTemp = new SearchAwardsOperation();
    searchParamsTemp.fromState(filters);

    const requestFields = [
        "Sub-Award ID",
        "Sub-Awardee Name",
        "Sub-Award Amount",
        "Sub-Award Date",
        "Sub-Award Description",
        "Sub-Recipient UEI",
        "Sub-Recipient Location",
        "Sub-Award Primary Place of Performance",
        "Sub-Award Type",
        "Prime Award ID",
        "Prime Recipient Name",
        "Prime Award Recipient UEI",
        "Awarding Agency",
        "Awarding Sub Agency",
        "NAICS",
        "PSC",
        "recipient_id",
        "prime_award_recipient_id"
    ];

    // needs to be dynamic but for now we will go with defaults
    searchParamsTemp.awardType = subawardTypeGroups.subcontracts;
    if (!Object.prototype.hasOwnProperty.call(searchParamsTemp, "selectedAwardIDs")) {
        searchParamsTemp.selectedAwardIDs = [];
    }

    searchParamsTemp.selectedAwardIDs.push(awardId);

    const subSort = paramsOptions.subSort || {
        field: "Sub-Award Amount",
        direction: "desc"
    };

    const params = {
        filters: searchParamsTemp.toParams(),
        fields: requestFields,
        page: paramsOptions?.subPage || 1,
        limit: paramsOptions.subResultsLimit || 100,
        sort: subSort.field,
        order: subSort.direction,
        spending_level: 'subawards',
        auditTrail: 'Results Table - Spending by award search'
    };

    // Set the params needed for download API call
    if (!params.filters.award_type_codes) {
        return null;
    }

    return SearchHelper.performSpendingByAwardSearch(params);
};


export const getTransactionDataByPrimeId = (awardId, filters, paramsOptions) => {
    // get searchParams from state
    const searchParamsTemp = new SearchAwardsOperation();
    searchParamsTemp.fromState(filters);

    const requestFields = [
        "Award ID",
        "Mod",
        "Recipient Name",
        "Transaction Amount",
        "Action Date",
        "Transaction Description",
        "Action Type",
        "Award Type",
        "Recipient UEI",
        "Recipient Location",
        "Primary Place of Performance",
        "Awarding Agency",
        "awarding_agency_id",
        "recipient_id",
        "Awarding Sub Agency",
        "NAICS",
        "PSC",
        "Assistance Listing"
    ];
    // needs to be dynamic but for now we will go with defaults
    searchParamsTemp.awardType = transactionTypeGroups.transaction_contracts;

    if (!Object.prototype.hasOwnProperty.call(searchParamsTemp, "selectedAwardIDs")) {
        searchParamsTemp.selectedAwardIDs = [];
    }
    searchParamsTemp.selectedAwardIDs.push(awardId);

    const subSort = paramsOptions.subSort || {
        field: "Transaction Amount",
        direction: "desc"
    };

    const params = {
        filters: searchParamsTemp.toParams(),
        fields: requestFields,
        page: paramsOptions?.subPage || 1,
        limit: paramsOptions.subResultsLimit || 100,
        sort: subSort.field,
        order: subSort.direction,
        spending_level: 'subawards',
        auditTrail: 'Results Table - Spending by award search'
    };

    // Set the params needed for download API call
    if (!params.filters.award_type_codes) {
        return null;
    }

    return performKeywordSearch(params);
};


export const getNestedTableData = (type, awardId, filters, paramsOptions) => {
    switch (type) {
        case "subawards":
            return getSubawardDataByPrimeId(awardId, filters, paramsOptions);

        case "transactions":
            return getTransactionDataByPrimeId(awardId, filters, paramsOptions);

        default:
            return null;
    }
};
