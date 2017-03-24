/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateField = 'reporting_period_start';
const endDateField = 'reporting_period_end';

const buildFYQuery = (range) => {
    const fyFilters = [];

    range.forEach((fy) => {
        const fyFilter = {
            field: [startDateField, endDateField],
            operation: 'range_intersect',
            value: fy,
            value_format: 'fy'
        };
        fyFilters.push(fyFilter);
    });

    const filter = {
        combine_method: 'OR',
        filters: fyFilters
    };

    return filter;
};

const buildDateRangeQuery = (range) => ({
    field: [startDateField, endDateField],
    operation: 'range_intersect',
    value: [range]
});

export const buildTimePeriodQuery = (type, range) => {
    if (type === 'fy') {
        return buildFYQuery(range);
    }
    return buildDateRangeQuery(range);
};
