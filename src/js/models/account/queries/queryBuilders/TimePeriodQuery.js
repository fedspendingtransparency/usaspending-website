/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateField = 'reporting_period_start';
const endDateField = 'reporting_period_end';
const reportingYearField = 'submission__reporting_fiscal_year';

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

export const buildTimePeriodQuery = (type, range) => {
    if (type === 'fy') {
        return buildFYQuery(range);
    }
    return buildDateRangeQuery(range);
};
