/**
  * SearchTransactionFileCOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as AwardIDQuery from './queryBuilders/AwardIDQuery';
import * as AwardAmountQuery from './queryBuilders/AwardAmountQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as BudgetCategoryQuery from './queryBuilders/BudgetCategoryQuery';

class SearchTransactionFileCOperation extends SearchOperation {

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

        // Add Award ID Queries
        if (this.selectedAwardIDs.length > 0) {
            filters.push(AwardIDQuery.buildAwardIDQuery(
                this.selectedAwardIDs, 'total')
            );
        }

        // Add Award Amount queries
        if (this.awardAmounts.length > 0) {
            const awardAmountsQuery = AwardAmountQuery.buildAwardAmountQuery(
                this.awardAmounts, 'total');
            if (awardAmountsQuery) {
                filters.push(awardAmountsQuery);
            }
        }

        // Add Funding Agency query
        if (this.fundingAgencies.length > 0) {
            filters.push(AgencyQuery.buildFundingAgencyCGACQuery(
                this.fundingAgencies, 'fileC'));
        }

        // Add Budget Category queries
        if (this.budgetFunctions.length > 0) {
            filters.push(BudgetCategoryQuery.buildBudgetFunctionQuery(
                this.budgetFunctions, 'fileC'));
        }

        if (this.federalAccounts.length > 0) {
            filters.push(BudgetCategoryQuery.buildFederalAccountQuery(
                this.federalAccounts, 'fileC'));
        }

        if (Object.keys(this.objectClasses).length > 0) {
            filters.push(BudgetCategoryQuery.buildObjectClassQuery(
                this.objectClasses, 'fileC'));
        }

        return filters;
    }
}

export default SearchTransactionFileCOperation;
