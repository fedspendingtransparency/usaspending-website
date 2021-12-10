/**
  * TxnTimePeriodQuery.js
  * Created by Kevin Li 1/26/17
  **/

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const txnDateField = 'action_date';

const txnBuildDateRangeQuery = (dateRange) => {
    const filter = {
        combine_method: 'AND',
        filters: [
            {
                field: txnDateField,
                operation: 'greater_than_or_equal',
                value: dateRange[0]
            },
            {
                field: txnDateField,
                operation: 'less_than_or_equal',
                value: dateRange[1]
            }
        ]
    };

    return filter;
};

const txnBuildFYRangeQuery = (fyRange) => {
    const fyFilters = [];

    // determine the minimum year
    fyRange.forEach((fy) => {
        const dateRange = FiscalYearHelper.convertFYToDateRange(fy);
        const fyFilter = txnBuildDateRangeQuery(dateRange);

        fyFilters.push(fyFilter);
    });


    const filter = {
        combine_method: 'OR',
        filters: fyFilters
    };

    return filter;
};

// build a query to search the transaction model within range
// this needs to be its own function because we only have one field to search in, so we can't use
// range_intersect
export const buildTxnActionDateQuery = (params = {
    type: '',
    fyRange: null,
    dateRange: null
}) => {
    if (params.type === 'fy') {
        return txnBuildFYRangeQuery(params.fyRange);
    }
    else if (params.type === 'dr' && params.dateRange.length === 2) {
        return txnBuildDateRangeQuery(params.dateRange);
    }
    return null;
};
