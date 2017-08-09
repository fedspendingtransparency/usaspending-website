/**
 * SearchAwardsOperation.js
 * Created by michaelbray on 8/7/17.
 */

import { concat } from 'lodash';

import { rootKeys, timePeriodKeys, agencyKeys, awardAmountKeys }
    from 'dataMapping/search/awardsOperationKeys';

class SearchAwardsOperation {
    constructor() {
        this.keyword = '';

        this.timePeriodType = 'fy';
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        this.awardType = [];

        this.awardingAgencies = [];
        this.fundingAgencies = [];

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
        this.keyword = state.keyword;

        this.timePeriodFY = state.timePeriodFY.toArray();
        this.timePeriodRange = [];
        this.timePeriodType = state.timePeriodType;
        if (state.timePeriodType === 'dr' && state.timePeriodStart && state.timePeriodEnd) {
            this.timePeriodRange = [state.timePeriodStart, state.timePeriodEnd];
            this.timePeriodFY = [];
        }

        this.awardType = state.awardType.toArray();

        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();

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

        // TODO - Mike Bray - Enable these Other Award Filters when they're available
        // this.pricingType = state.pricingType.toArray();
        // this.setAside = state.setAside.toArray();
        // this.extentCompeted = state.extentCompeted.toArray();
    }

    params() {
        // Convert the search operation into JS objects
        const filters = {};

        // Add keyword
        if (this.keyword !== '') {
            filters[rootKeys.keyword] = this.keyword;
        }

        // Add Time Period
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            if (this.timePeriodType === 'fy' && this.timePeriodFY.length > 0) {
                filters[rootKeys.timePeriod] = this.timePeriodFY.map((fy) =>
                    ({
                        [timePeriodKeys.startDate]: `${fy - 1}-10-01`,
                        [timePeriodKeys.endDate]: `${fy}-09-30`
                    })
                );
            }
            else if (this.timePeriodType === 'dr' && this.timePeriodRange.length === 2) {
                filters[rootKeys.timePeriod] = {
                    [timePeriodKeys.startDate]: this.timePeriodRange[0],
                    [timePeriodKeys.endDate]: this.timePeriodRange[1]
                };
            }
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
                agencies.push({
                    [agencyKeys.type]: 'funding',
                    [agencyKeys.tier]: 'toptier',
                    [agencyKeys.name]: agencyArray.toptier_agency.name
                });
            });

            // Awarding Agencies can be both toptier and subtier
            this.awardingAgencies.forEach((agencyArray) => {
                const agencyName = agencyArray.agencyType === 'toptier'
                    ? agencyArray.toptier_agency.name
                    : agencyArray.subtier_agency.name;

                agencies.push({
                    [agencyKeys.type]: 'awarding',
                    [agencyKeys.tier]: agencyArray.agencyType,
                    [agencyKeys.name]: agencyName
                });
            });

            filters[rootKeys.agencies] = agencies;
        }

        // Add Recipients, Recipient Scope, Recipient Locations, and Recipient Types
        if (this.selectedRecipients.length > 0) {
            filters[rootKeys.recipients] = this.selectedRecipients.map(
                (recipient) => recipient.legal_entity_id);
        }

        if (this.recipientDomesticForeign !== '' && this.recipientDomesticForeign !== 'all') {
            filters[rootKeys.recipientLocationScope] = this.recipientDomesticForeign;
        }

        if (this.selectedRecipientLocations.length > 0) {
            let locationSet = [];
            this.selectedRecipientLocations.forEach((location) => {
                locationSet = concat(locationSet, location.matched_ids);
            });

            filters[rootKeys.recipientLocation] = locationSet;
        }

        if (this.recipientType.length > 0) {
            filters[rootKeys.recipientType] = this.recipientType;
        }

        // Add Locations
        if (this.selectedLocations.length > 0) {
            let locationSet = [];
            this.selectedLocations.forEach((location) => {
                locationSet = concat(locationSet, location.matched_ids);
            });

            filters[rootKeys.placeOfPerformance] = locationSet;
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters[rootKeys.placeOfPerformanceScope] = this.locationDomesticForeign;
        }

        // Add Award Amounts
        if (this.awardAmounts.length > 0) {
            const amounts = [];

            this.awardAmounts.forEach((awardAmount) => {
                const amount = {};

                if (awardAmount[0] !== 0) {
                    amount[awardAmountKeys.min] = awardAmount[0];
                }

                if (awardAmount[1] !== 0) {
                    amount[awardAmountKeys.max] = awardAmount[1];
                }

                amounts.push(amount);
            });

            filters[rootKeys.awardAmount] = amounts;
        }

        // Add Award IDs
        if (this.selectedAwardIDs.length > 0) {
            filters[rootKeys.awardID] = this.selectedAwardIDs.map(
                (awardID) => awardID.id);
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
