/**
  * SearchTransactionOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as OtherFiltersQuery from './queryBuilders/OtherFiltersQuery';

class SearchTransactionOperation extends SearchOperation {
    constructor() {
        super();

        this.searchContext = 'transaction';
    }

    uniqueParams() {
        // the parent class will handle all the common params, we just need to convert those
        // that are not shared with awards
        const filters = [];

        // add time period queries
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            const timeQuery = TxnTimePeriodQuery.buildTxnActionDateQuery({
                type: this.timePeriodType,
                fyRange: this.timePeriodFY,
                dateRange: this.timePeriodRange
            });
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        // Add agency query
        if (this.fundingAgencies.length > 0 || this.awardingAgencies.length > 0) {
            filters.push(AgencyQuery.buildAgencyQuery(
                this.fundingAgencies, this.awardingAgencies, this.searchContext));
        }

        // Add cfda query
        if (this.selectedCFDA.length > 0) {
            filters.push(OtherFiltersQuery.buildCFDAQuery(
                this.selectedCFDA, this.searchContext));
        }

        // Add naics query
        if (this.selectedNAICS.length > 0) {
            filters.push(OtherFiltersQuery.buildNAICSQuery(
                this.selectedNAICS, this.searchContext));
        }

        // Add psc query
        if (this.selectedPSC.length > 0) {
            filters.push(OtherFiltersQuery.buildPSCQuery(
                this.selectedPSC, this.searchContext));
        }

        // Add Pricing Type Queries
        if (this.pricingType.length > 0) {
            filters.push(OtherFiltersQuery.buildPricingTypeQuery(
                this.pricingType, this.searchContext));
        }

        // Add Set Aside Queries
        if (this.setAside.length > 0) {
            filters.push(OtherFiltersQuery.buildSetAsideQuery(this.setAside, this.searchContext));
        }

        // Add Extent Competed Queries
        if (this.extentCompeted.length > 0) {
            filters.push(OtherFiltersQuery.buildExtentCompetedQuery(
                this.extentCompeted, this.searchContext));
        }


        return filters;
    }
}

export default SearchTransactionOperation;
