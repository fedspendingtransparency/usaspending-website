/**
 * SearchAwardsOperation.js
 * Created by michaelbray on 8/7/17.
 */

import { rootKeys, timePeriodKeys, agencyKeys, awardAmountKeys }
    from 'dataMapping/search/awardsOperationKeys';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { pickBy } from 'lodash';

class SearchAwardsOperation {
    constructor() {
        this.keyword = [];

        this.timePeriodType = 'fy';
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        this.awardType = [];

        this.awardingAgencies = [];
        this.fundingAgencies = [];

        this.tasSources = [];
        this.accountSources = [];

        this.selectedRecipients = [];
        this.recipientDomesticForeign = 'all';
        this.selectedRecipientLocations = [];
        this.recipientType = [];

        this.selectedLocations = [];
        this.locationDomesticForeign = 'all';

        this.awardAmounts = [];

        this.selectedAwardIDs = [];

        this.selectedCFDA = [];
        this.selectedNAICS = [];
        this.selectedPSC = [];

        this.pricingType = [];
        this.setAside = [];
        this.extentCompeted = [];
    }

    fromState(state) {
        this.keyword = state.keyword.toArray();

        this.timePeriodFY = state.timePeriodFY.toArray();
        this.timePeriodRange = [];
        this.timePeriodType = state.timePeriodType;
        if (state.timePeriodType === 'dr' && (state.timePeriodStart || state.timePeriodEnd)) {
            this.timePeriodRange = [state.timePeriodStart, state.timePeriodEnd];
            this.timePeriodFY = [];
        }

        this.awardType = state.awardType.toArray();

        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();

        this.tasSources = state.treasuryAccounts.toArray();
        this.accountSources = state.federalAccounts.toArray();

        this.selectedRecipients = state.selectedRecipients.toArray();
        this.recipientDomesticForeign = state.recipientDomesticForeign;
        this.selectedRecipientLocations = state.selectedRecipientLocations.toArray();
        this.recipientType = state.recipientType.toArray();

        this.selectedLocations = state.selectedLocations.toArray();
        this.locationDomesticForeign = state.locationDomesticForeign;

        this.awardAmounts = state.awardAmounts.toArray();

        this.selectedAwardIDs = state.selectedAwardIDs.toArray();

        this.selectedCFDA = state.selectedCFDA.toArray();
        this.selectedNAICS = state.selectedNAICS.toArray();
        this.selectedPSC = state.selectedPSC.toArray();

        this.pricingType = state.pricingType.toArray();
        this.setAside = state.setAside.toArray();
        this.extentCompeted = state.extentCompeted.toArray();
    }

    toParams() {
        // Convert the search operation into JS objects
        const filters = {};
        // Add keyword
        if (this.keyword.length > 0) {
            filters[rootKeys.keywords] = this.keyword;
        }

        // Add Time Period
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            if (this.timePeriodType === 'fy' && this.timePeriodFY.length > 0) {
                filters[rootKeys.timePeriod] = this.timePeriodFY.map((fy) => {
                    const dates = FiscalYearHelper.convertFYToDateRange(fy);

                    return {
                        [timePeriodKeys.startDate]: dates[0],
                        [timePeriodKeys.endDate]: dates[1]
                    };
                });
            }
            else if (this.timePeriodType === 'dr' && this.timePeriodRange.length > 0) {
                let start = this.timePeriodRange[0];
                let end = this.timePeriodRange[1];

                // if no start or end date is provided, use the 2008-present date range to fill out
                // the missing dates
                const initialYear = FiscalYearHelper.earliestFiscalYear;
                const currentYear = FiscalYearHelper.currentFiscalYear();

                if (!start) {
                    start = FiscalYearHelper.convertFYToDateRange(initialYear)[0];
                }
                if (!end) {
                    end = FiscalYearHelper.convertFYToDateRange(currentYear)[1];
                }

                filters[rootKeys.timePeriod] = [
                    {
                        [timePeriodKeys.startDate]: start,
                        [timePeriodKeys.endDate]: end
                    }
                ];
            }
        }

        if ((this.timePeriodType === 'fy' && this.timePeriodFY.length === 0) ||
        (this.timePeriodType === 'dr' && this.timePeriodRange.length === 0)) {
            // the user selected fiscal years but did not specify any years OR
            // the user has selected the date range type but has not entered any dates yet
            // this should default to a period of time from FY 2008 to present
            const initialYear = FiscalYearHelper.earliestFiscalYear;
            const currentYear = FiscalYearHelper.currentFiscalYear();

            filters[rootKeys.timePeriod] = [{
                [timePeriodKeys.startDate]: FiscalYearHelper.convertFYToDateRange(initialYear)[0],
                [timePeriodKeys.endDate]: FiscalYearHelper.convertFYToDateRange(currentYear)[1]
            }];
        }

        // Add award types
        if (this.awardType.length > 0) {
            filters[rootKeys.awardType] = this.awardType;
        }

        // Add Agencies
        if (this.fundingAgencies.length > 0 || this.awardingAgencies.length > 0) {
            const agencies = [];

            // Funding Agencies are toptier-only
            this.fundingAgencies.forEach((agencyArray) => {
                const fundingAgencyName = agencyArray[`${agencyArray.agencyType}_agency`].name;

                agencies.push({
                    [agencyKeys.type]: 'funding',
                    [agencyKeys.tier]: agencyArray.agencyType,
                    [agencyKeys.name]: fundingAgencyName
                });
            });

            // Awarding Agencies can be both toptier and subtier
            this.awardingAgencies.forEach((agencyArray) => {
                const awardingAgencyName = agencyArray[`${agencyArray.agencyType}_agency`].name;

                agencies.push({
                    [agencyKeys.type]: 'awarding',
                    [agencyKeys.tier]: agencyArray.agencyType,
                    [agencyKeys.name]: awardingAgencyName
                });
            });

            filters[rootKeys.agencies] = agencies;
        }

        // Add Program Sources
        if (this.tasSources.length > 0 || this.accountSources.length > 0) {
            const tasCodes = [];

            this.accountSources.forEach((accountObject) => {
                tasCodes.push(pickBy(accountObject));
            });

            this.tasSources.forEach((tasObject) => {
                tasCodes.push(pickBy(tasObject));
            });

            filters[rootKeys.tasSources] = tasCodes;
        }

        // Add Recipients, Recipient Scope, Recipient Locations, and Recipient Types
        if (this.selectedRecipients.length > 0) {
            filters[rootKeys.recipients] = this.selectedRecipients;
        }

        if (this.selectedRecipientLocations.length > 0) {
            const locationSet = this.selectedRecipientLocations.map((location) => {
                if (!location.filter.city && location.filter.country && location.filter.country.toLowerCase() === 'foreign') {
                    filters[rootKeys.recipientLocationScope] = 'foreign';
                }
                return location.filter;
            });

            if (locationSet.length > 0) {
                filters[rootKeys.recipientLocation] = locationSet;
            }
        }

        if (this.recipientType.length > 0) {
            filters[rootKeys.recipientType] = this.recipientType;
        }

        // Add Locations
        if (this.selectedLocations.length > 0) {
            const locationSet = this.selectedLocations.map((location) => {
                if (!location.filter.city && location.filter.country && location.filter.country.toLowerCase() === 'foreign') {
                    filters[rootKeys.placeOfPerformanceScope] = 'foreign';
                }
                return location.filter;
            });

            if (locationSet.length > 0) {
                filters[rootKeys.placeOfPerformance] = locationSet;
            }
        }

        // Add Award Amounts
        if (this.awardAmounts.length > 0) {
            const amounts = [];

            // The backend expects an object with a lower bound, an upper bound, or both.
            this.awardAmounts.forEach((awardAmount) => {
                const amount = {};
                amount[awardAmountKeys.min] = awardAmount[0];
                amount[awardAmountKeys.max] = awardAmount[1];
                // remove property if it is null
                if (amount[awardAmountKeys.min] === null) delete amount[awardAmountKeys.min];
                if (amount[awardAmountKeys.max] === null) delete amount[awardAmountKeys.max];
                // if both null return
                if ((!amount[awardAmountKeys.min] && amount[awardAmountKeys.min] !== 0)
                && (!amount[awardAmountKeys.max] && amount[awardAmountKeys.max] !== 0)) {
                    return;
                }
                amounts.push(amount);
            });

            // Only push the array to the filters element if at least
            // one award amount object is defined
            if (amounts.length > 0) {
                filters[rootKeys.awardAmount] = amounts;
            }
        }

        // Add Award IDs
        if (this.selectedAwardIDs.length > 0) {
            filters[rootKeys.awardID] = this.selectedAwardIDs;
        }

        // Add CFDA
        if (this.selectedCFDA.length > 0) {
            filters[rootKeys.cfda] = this.selectedCFDA.map((cfda) => cfda.program_number);
        }

        // Add NAICS
        if (this.selectedNAICS.length > 0) {
            filters[rootKeys.naics] = this.selectedNAICS.map((naics) => naics.naics);
        }

        // Add PSC
        if (this.selectedPSC.length > 0) {
            filters[rootKeys.psc] = this.selectedPSC.map((psc) => psc.product_or_service_code);
        }

        // Add Contract Pricing
        if (this.pricingType.length > 0) {
            filters[rootKeys.contractPricing] = this.pricingType;
        }

        // Add Set Aside Type
        if (this.setAside.length > 0) {
            filters[rootKeys.setAsideType] = this.setAside;
        }

        // Add Extent Competed
        if (this.extentCompeted.length > 0) {
            filters[rootKeys.extentCompeted] = this.extentCompeted;
        }

        return filters;
    }
}

export default SearchAwardsOperation;
