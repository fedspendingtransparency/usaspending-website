/**
 * AccountAwardSearchOperation.js
 * Created by Kevin Li 4/13/17
 */

import { concat, map } from 'lodash';

import * as AwardTypeQuery from 'models/v1/search/queryBuilders/AwardTypeQuery';
import { convertFYToDateRange } from 'helpers/fiscalYearHelper';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as ObjectClassQuery from './queryBuilders/ObjectClassQuery';
import * as ProgramActivityQuery from './queryBuilders/ProgramActivityQuery';

export default class AccountAwardSearchOperation {
    constructor(id = null) {
        this.accountId = null;
        if (id) {
            this.accountId = id;
        }

        this.dateType = 'fy';
        this.fy = [];
        this.dateRange = [];

        this.objectClass = [];
        this.programActivity = [];

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
        this.programActivity = state.programActivity.toArray();
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
            filters.push(ObjectClassQuery.buildAwardsObjectClassQuery(this.objectClass));
        }

        if (this.programActivity.length > 0) {
            filters.push(ProgramActivityQuery
                .buildAwardsProgramActivityQuery(this.programActivity));
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

        return concat(common, unique);
    }

    timePeriodFormatted(fiscalYears) {
        let timePeriod = fiscalYears.sort();
        if (!timePeriod.length) return null;
        // time period 0 start date
        const [startDate, endDate] = convertFYToDateRange(timePeriod[0]);
        // there are only three option 2017, 2018, 2019
        if (timePeriod.length === 3) { // case #1 2017-2019 fy
            timePeriod = [
                {
                    start_date: startDate,
                    end_date: convertFYToDateRange(timePeriod[2])[1]
                }
            ];
        }
        else if (timePeriod.length === 2) {
            // case #2 one date range spanning years e.g. 2017-2018 or multiple date ranges 2017, 2019
            const numberedTimePeriod = timePeriod.map((fy) => parseInt(fy, 10));
            // one date range
            if ((numberedTimePeriod[1] - numberedTimePeriod[0]) === 1) {
                timePeriod = [
                    {
                        start_date: startDate,
                        end_date: convertFYToDateRange(timePeriod[1])[1]
                    }
                ];
            }
            else { // multiple date ranges
                timePeriod = [
                    {
                        start_date: startDate,
                        end_date: endDate
                    },
                    {
                        start_date: convertFYToDateRange(timePeriod[1])[0],
                        end_date: convertFYToDateRange(timePeriod[1])[1]
                    }
                ];
            }
        }
        else { // one date range e.g. 2017
            timePeriod = [
                {
                    start_date: convertFYToDateRange(timePeriod[0])[0],
                    end_date: convertFYToDateRange(timePeriod[0])[1]
                }
            ];
        }
        return timePeriod;
    }

    spendingByAwardTableParams(state) {
        const { account, filters } = state;
        const tasCodes = [{ aid: account.agency_identifier, main: account.main_account_code }];
        // Time Period Param
        const timePeriod = this.timePeriodFormatted(filters.fy.toArray());
        // Object Class Param
        const objectClass = filters.objectClass.toArray();
        // Program Activity Param
        const programActivity = map(ProgramActivityQuery
            .buildAwardsProgramActivityQuery(this.programActivity).value, (pa) => parseInt(pa, 10));
        const awardTableParams = {
            filters: {
                tas_codes: tasCodes
            },
            subawards: false
        };
        // Add filters to query object?
        // add time_period?
        if (timePeriod) awardTableParams.filters.time_period = timePeriod;
        // add object_class?
        if (objectClass.length) awardTableParams.filters.object_class = objectClass;
        // add program_activity?
        if (programActivity.length) awardTableParams.filters.program_activity = programActivity;
        return awardTableParams;
    }
}
