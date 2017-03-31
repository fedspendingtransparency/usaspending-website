/**
 * AccountSearchOperation.js
 * Created by Kevin Li 3/24/17
 */

import _ from 'lodash';

import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';

class AccountSearchOperation {
    constructor(id = null) {
        this.accountId = null;
        if (id) {
            this.accountId = id;
        }

        this.dateType = 'fy';
        this.fy = [];
        this.dateRange = [];
    }

    fromState(state) {
        this.dateType = state.dateType;
        if (this.dateType === 'fy') {
            this.fy = state.fy.toArray();
            this.dateRange = [];
        }
        else {
            if (state.startDate && state.endDate) {
                this.dateRange = [state.startDate, state.endDate];
            }
            this.fy = [];
        }
    }

    commonParams() {
        const filters = [];

        if (this.fy.length > 0 || this.dateRange.length === 2) {
            let range = this.fy;
            if (this.dateType === 'dr') {
                range = this.dateRange;
            }

            const timeFilter = TimePeriodQuery.buildTimePeriodQuery(this.dateType, range);
            filters.push(timeFilter);
        }

        return filters;
    }

    uniqueParams() {
        const filters = [];

        if (this.accountId) {
            filters.push({
                field: 'treasury_account__federal_account',
                operation: 'equals',
                value: this.accountId
            });
        }

        return filters;
    }

    toParams() {
         // converts the search operation into a JS object that can be POSTed to the endpoint

        // get the common filters that are shared with all models
        const commonFilters = this.commonParams();

        // now parse the remaining filters that are unique to this model
        const specificFilters = this.uniqueParams();

        // merge the two arrays together into the fully assembled filter parameters
        const filters = _.concat(commonFilters, specificFilters);

        return filters;
    }
}

export default AccountSearchOperation;
