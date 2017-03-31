/**
 * AccountSearchBalanceOperation.js
 * Created by Kevin Li 3/24/17
 */

import kGlobalConstants from 'GlobalConstants';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';

class AccountSearchBalanceOperation {
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

        if (!window.foreignKeyError && {}.hasOwnProperty.call(window.console, 'warn')
            && kGlobalConstants.DEV) {
            console.warn("You promised to fix the foreign keys");
            window.foreignKeyError = true;
        }

        if (this.accountId) {
            filters.push({
                field: 'treasury_account_identifier__federal_account_id',
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

export default AccountSearchBalanceOperation;
