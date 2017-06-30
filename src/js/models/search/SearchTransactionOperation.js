/**
  * SearchTransactionOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as ContractFilterQuery from './queryBuilders/ContractFilterQuery';

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

        // Add pricing type query
        if (this.pricingType.length > 0 || this.pricingType.length > 0) {
            filters.push(ContractFilterQuery.buildPricingTypeQuery(
                this.pricingType, this.searchContext));
        }

        // Add set aside query
        if (this.setAside.length > 0 || this.setAside.length > 0) {
            filters.push(ContractFilterQuery.buildSetAsideQuery(
                this.setAside, this.searchContext));
        }

        // Add extent competed query
        if (this.extentCompeted.length > 0 || this.extentCompeted.length > 0) {
            filters.push(ContractFilterQuery.buildExtentCompetedQuery(
                this.extentCompeted, this.searchContext));
        }

        return filters;
    }
}

export default SearchTransactionOperation;
