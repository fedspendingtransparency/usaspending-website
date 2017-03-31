/**
 * AccountSearchOperation.js
 * Created by Kevin Li 3/24/17
 */

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

    toParams() {
        const filters = [];

        if (this.accountId) {
            filters.push({
                field: 'treasury_account__federal_account',
                operation: 'equals',
                value: this.accountId
            });
        }

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
}

export default AccountSearchOperation;
