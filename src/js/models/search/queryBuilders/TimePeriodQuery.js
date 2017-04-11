/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateFieldAwards = 'period_of_performance_start_date';
const endDateFieldAward = 'period_of_performance_current_end_date';

const startDateFieldCategories = 'reporting_period_start';
const endDateFieldCategories = 'reporting_period_end';

const buildFYRangeQuery = (fyRange, endpoint) => {
    const fyFilters = [];
    let startField = startDateFieldAwards;
    let endField = endDateFieldAward;

    if (endpoint === 'categories') {
        startField = startDateFieldCategories;
        endField = endDateFieldCategories;
    }

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
    let startField = startDateFieldAwards;
    let endField = endDateFieldAward;

    if (endpoint === 'categories') {
        startField = startDateFieldCategories;
        endField = endDateFieldCategories;
    }

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
    endpoint: ''
}) => {
    if (params.type === 'fy' && params.fyRange.length > 0) {
        return buildFYRangeQuery(params.fyRange, params.endpoint);
    }
    else if (params.type === 'dr' && params.dateRange.length === 2) {
        return buildDateRangeQuery(params.dateRange, params.endpoint);
    }
    return null;
};
