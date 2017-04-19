/**
 * AccountAwardSearchOperation.js
 * Created by Kevin Li 4/13/17
 */

import _ from 'lodash';

import * as AwardTypeQuery from 'models/search/queryBuilders/AwardTypeQuery';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as ObjectClassQuery from './queryBuilders/ObjectClassQuery';

class AccountAwardSearchOperation {
    constructor(id = null) {
        this.accountId = null;
        if (id) {
            this.accountId = id;
        }

        this.dateType = 'fy';
        this.fy = [];
        this.dateRange = [];

        this.objectClass = [];

        this.awardType = [];
    }

    fromState(state) {
        this.dateType = state.dateType;
        if (this.dateType === 'fy') {
            this.fy = state.fy.toArray();
            this.dateRange = [];
        }
        else {
            this.dateRange = [state.startDate, state.endDate];
            this.fy = [];
        }

        this.objectClass = state.objectClass.toArray();
    }

    commonParams() {
        const filters = [];

        // parse date range
        let dateRange = this.fy;
        if (this.dateType === 'dr') {
            dateRange = this.dateRange;
        }
        if (dateRange.length > 0) {
            filters.push(TimePeriodQuery.buildAwardTimePeriodQuery(this.dateType, dateRange));
        }

        // add object class to the filter
        if (this.objectClass.length > 0) {
            filters.push(ObjectClassQuery.buildAwardObjectClassQuery(this.objectClass));
        }

        // add award type to the filters
        if (this.awardType.length > 0) {
            const typeFilter = AwardTypeQuery.buildQuery(this.awardType);
            filters.push(typeFilter);
        }

        // add an account ID to the filter
        filters.push({
            field: 'financial_set__treasury_account__federal_account',
            operation: 'equals',
            value: this.accountId
        });

        return filters;
    }

    uniqueParams() {
        const filters = [];

        return filters;
    }

    toParams() {
        const common = this.commonParams();
        const unique = this.uniqueParams();

        return _.concat(common, unique);
    }

}

export default AccountAwardSearchOperation;
