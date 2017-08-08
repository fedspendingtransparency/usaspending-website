/**
 * SearchAwardsOperation.js
 * Created by michaelbray on 8/7/17.
 */

const rootKeys = {
    keyword: 'keyword',
    timePeriod: 'time_period',
    awardType: 'award_type_codes',
    agencies: 'agencies',
    recipients: 'legal_entities',
    recipientLocationScope: 'recipient_location_scope',
    recipientLocation: 'recipient_location',
    recipientType: 'recipient_type_names',
    placeOfPerformanceScope: 'place_of_performance_scope',
    placeOfPerformance: 'place_of_performance',
    awardAmount: 'award_amount',
    awardID: 'award_ids',
    cfda: 'program_numbers',
    naics: 'naics_codes',
    psc: 'psc_codes',
    contractPricing: 'contract_pricing_type_codes',
    setAsideType: 'set_aside_type_codes',
    extentCompeted: 'extent_competed_type_codes'
};

const timePeriodKeys = {
    type: 'type',
    value: 'value',
    startDate: 'start_date',
    endDate: 'end_date'
};

const agencyKeys = {
    type: 'type',
    tier: 'tier',
    name: 'name'
};

const awardAmountKeys = {
    min: 'lower_bound',
    max: 'upper_bound'
};

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
                filters[rootKeys.timePeriod] = {
                    [timePeriodKeys.type]: this.timePeriodType,
                    [timePeriodKeys.value]: this.timePeriodFY
                };
            }
            else if (this.timePeriodType === 'dr' && this.timePeriodRange.length === 2) {
                filters[rootKeys.timePeriod] = {
                    [timePeriodKeys.type]: this.timePeriodType,
                    [timePeriodKeys.value]: {
                        [timePeriodKeys.startDate]: this.timePeriodRange[0],
                        [timePeriodKeys.endDate]: this.timePeriodRange[1]
                    }
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
            filters[rootKeys.recipientLocation] = this.selectedRecipientLocations.map(
                (recipient) => recipient.matched_ids);
        }

        if (this.recipientType.length > 0) {
            filters[rootKeys.recipientType] = this.recipientType;
        }

        // Add Locations
        if (this.selectedLocations.length > 0) {
            filters[rootKeys.placeOfPerformance] = this.selectedLocations.map(
                (location) => location.matched_ids);
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
