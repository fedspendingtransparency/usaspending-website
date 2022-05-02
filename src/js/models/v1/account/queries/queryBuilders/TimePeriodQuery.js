/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateField = 'reporting_period_start';
const endDateField = 'reporting_period_end';
const reportingYearField = 'submission__reporting_fiscal_year';

const startDateFieldAward = 'period_of_performance_start_date';
const endDateFieldAward = 'period_of_performance_current_end_date';

const buildFYQuery = (range) => {
    const filter = {
        field: reportingYearField,
        operation: "in",
        value: range
    };

    return filter;
};

const buildDateRangeQuery = (range) => ({
    field: [startDateField, endDateField],
    operation: 'range_intersect',
    value: range
});

const buildFYAwardQuery = (range) => {
    const fyFilters = [];

    range.forEach((fy) => {
    // iterate through each FY and generate a range_intersect filter for the FY
        const fyQuery = {
            field: [startDateFieldAward, endDateFieldAward],
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

export const buildTimePeriodQuery = (type, range) => {
    if (type === 'fy') {
        return buildFYQuery(range);
    }
    return buildDateRangeQuery(range);
};

export const buildAwardTimePeriodQuery = (type, range) => buildFYAwardQuery(range);
