/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

import * as FilterFields from 'dataMapping/search/filterFields';

const buildFYRangeQuery = (fyRange, endpoint) => {
    const fyFilters = [];

    const fields = FilterFields[`${endpoint}Fields`];
    const startField = fields.startDate;
    const endField = fields.endDate;

    fyRange.forEach((fy) => {
    // iterate through each FY and generate a range_intersect filter for the FY
        const fyQuery = {
            field: [startField, endField],
            operation: 'range_intersect',
            value: fy,
            value_format: 'fy'
        };
        fyFilters.push(fyQuery);
    });

    // each year is searched separately as an OR rather than compounded as an AND
    const filter = {
        combine_method: 'OR',
        filters: fyFilters
    };
    return filter;
};

// build an OR query to search for start dates on or after the start of the range
// or end dates before or on the end of the range
const buildDateRangeQuery = (dateRange, endpoint) => {
    const fields = FilterFields[`${endpoint}Fields`];
    const startField = fields.startDate;
    const endField = fields.endDate;

    const filter = {
        field: [startField, endField],
        operation: 'range_intersect',
        value: dateRange
    };

    return filter;
};

export const buildQuery = (params = {
    type: '',
    fyRange: null,
    dateRange: null,
    endpoint: 'award'
}) => {
    if (params.type === 'fy' && params.fyRange.length > 0) {
        return buildFYRangeQuery(params.fyRange, params.endpoint);
    }
    else if (params.type === 'dr' && params.dateRange.length === 2) {
        return buildDateRangeQuery(params.dateRange, params.endpoint);
    }
    return null;
};
