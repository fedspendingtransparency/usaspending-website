/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateField = 'period_of_performance_start_date';
const endDateField = 'period_of_performance_current_end_date';

const buildFYRangeQuery = (fyRange, prefix) => {
    const fyFilters = [];
    const startField = `${prefix}${startDateField}`;
    const endField = `${prefix}${endDateField}`;
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
const buildDateRangeQuery = (dateRange, prefix) => ({
    field: [`${prefix}${startDateField}`, `${prefix}${endDateField}`],
    operation: 'range_intersect',
    value: dateRange
});

export const buildQuery = (params = {
    type: '',
    fyRange: null,
    dateRange: null,
    prefix: ''
}) => {
    if (params.type === 'fy' && params.fyRange.length > 0) {
        return buildFYRangeQuery(params.fyRange, params.prefix);
    }
    else if (params.type === 'dr' && params.dateRange.length === 2) {
        return buildDateRangeQuery(params.dateRange, params.prefix);
    }
    return null;
};
