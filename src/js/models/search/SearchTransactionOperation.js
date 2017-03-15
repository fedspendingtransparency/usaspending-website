/**
  * SearchTransactionOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as AwardAmountQuery from './queryBuilders/AwardAmountQuery';

class SearchTransactionOperation extends SearchOperation {

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

        // Add Award Amount queries
        if (this.awardAmounts.length > 0) {
            const awardAmountsQuery = AwardAmountQuery.buildAwardAmountQuery(
                this.awardAmounts, 'total');
            if (awardAmountsQuery) {
                filters.push(awardAmountsQuery);
            }
        }

        return filters;
    }
}

export default SearchTransactionOperation;
