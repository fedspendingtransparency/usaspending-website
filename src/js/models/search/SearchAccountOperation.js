/**
  * SearchAccountOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as BudgetCategoryQuery from './queryBuilders/BudgetCategoryQuery';

class SearchAccountOperation extends SearchOperation {
    constructor(requestType) {
        super();

        this.requestType = requestType;
    }

    uniqueParams() {
        // the parent class will handle all the common params, we just need to convert those
        // that are not shared with awards
        const filters = [];

        // Add Time Period queries
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            const timeQuery = TimePeriodQuery.buildQuery({
                type: this.timePeriodType,
                fyRange: this.timePeriodFY,
                dateRange: this.timePeriodRange,
                endpoint: 'categories'
            });
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        // Add Funding Agency query
        if (this.fundingAgencies.length > 0) {
            filters.push(AgencyQuery.buildFundingAgencyCGACQuery(
                this.fundingAgencies, this.requestType));
        }

        // Add Budget Category queries
        if (this.budgetFunctions.length > 0) {
            filters.push(BudgetCategoryQuery.buildBudgetFunctionQuery(
                this.budgetFunctions, this.requestType));
        }

        if (this.federalAccounts.length > 0) {
            filters.push(BudgetCategoryQuery.buildFederalAccountQuery(
                this.federalAccounts, this.requestType));
        }

        if (Object.keys(this.objectClasses).length > 0) {
            filters.push(BudgetCategoryQuery.buildObjectClassQuery(
                this.objectClasses, this.requestType));
        }

        return filters;
    }
}

export default SearchAccountOperation;
