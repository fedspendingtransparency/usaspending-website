/**
  * TimePeriodQuery.js
  * Created by Kevin Li
  **/

const startDateField = 'period_of_performance_start_date';
const endDateField = 'period_of_performance_current_end_date';

const buildFYRangeQuery = (fyRange) => {
    const fyFilters = [];
    fyRange.forEach((fy) => {
        // iterate through each FY and generate a pair of OR queries for start and end date
        // that matches the FY period
        const fyQuery = {
            combine_method: 'OR',
            filters: [
                {
                    field: startDateField,
                    operation: 'fy',
                    value: fy
                },
                {
                    field: endDateField,
                    operation: 'fy',
                    value: fy
                }
            ]
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
const buildDateRangeQuery = (dateRange) => ({
    combine_method: 'OR',
    filters: [
        {
            field: startDateField,
            operation: 'greater_than_or_equal',
            value: dateRange[0]
        },
        {
            field: endDateField,
            operation: 'less_than_or_equal',
            value: dateRange[1]
        }
    ]
});

export const buildQuery = (fyRange, dateRange) => {
    if (fyRange.length > 0) {
        return buildFYRangeQuery(fyRange);
    }
    else if (dateRange.length === 2) {
        return buildDateRangeQuery(dateRange);
    }
    return {};
};
