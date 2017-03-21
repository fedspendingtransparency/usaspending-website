/**
  * SearchAccountOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as BudgetCategoryQuery from './queryBuilders/BudgetCategoryQuery';

class SearchAccountOperation extends SearchOperation {

    uniqueParams() {
        // the parent class will handle all the common params, we just need to convert those
        // that are not shared with awards
        const filters = [];

        // Add Budget Category queries
        if (this.budgetFunctions.length > 0) {
            filters.push(BudgetCategoryQuery.buildBudgetFunctionQuery(this.budgetFunctions));
        }

        if (this.federalAccounts.length > 0) {
            filters.push(BudgetCategoryQuery.buildFederalAccountQuery(this.federalAccounts));
        }

        if (Object.keys(this.objectClasses).length > 0) {
            filters.push(BudgetCategoryQuery.buildObjectClassQuery(this.objectClasses));
        }

        return filters;
    }
}

export default SearchAccountOperation;
