/**
  * SearchTransactionOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as AwardTypeQuery from './queryBuilders/AwardTypeQuery';
import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as LocationQuery from './queryBuilders/LocationQuery';

class SearchTransactionOperation extends SearchOperation {

    toParams() {
        // converts the search operation into a JS object that can be POSTed to the endpoint
        const filters = [];

        // add award types
        if (this.awardType.length > 0) {
            filters.push(AwardTypeQuery.buildQuery(this.awardType));
        }

        if (this.resultAwardType.length > 0) {
            // an award type subfilter is being applied to the search results (usually from
            // a results table tab)
            // treat this as an AND query for another set of award filters
            // for aggregation queries, we won't apply the prefix to this field because this
            // is specific to the results table
            filters.push(AwardTypeQuery.buildQuery(this.resultAwardType));
        }

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

        // add location queries
        if (this.selectedLocations.length > 0) {
            filters.push(LocationQuery.buildLocationQuery(this.selectedLocations));
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters.push(LocationQuery.buildDomesticForeignQuery(this.locationDomesticForeign));
        }

        return filters;
    }
}

export default SearchTransactionOperation;
