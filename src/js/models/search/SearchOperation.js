class SearchOperation {
    constructor(data) {
        this.awardType = [];
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        if (data) {
            // populate the object
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });
        }
    }

    fromState(state) {
        this.awardType = state.awardType;
        this.timePeriodFY = state.timePeriodFY;

        this.timePeriodRange = [];
        if (state.timePeriodStart && state.timePeriodEnd) {
            this.timePeriodRange = [state.timePeriodStart, state.timePeriodEnd];
        }
    }

    toParams() {
        // converts the search operation into a JS object that can be POSTed to the endpoint
        const filters = [];

        // add award types
        if (this.awardType.length > 0) {
            const awardTypeFilter = {
                field: 'type',
                operation: 'in',
                value: this.awardType
            };

            filters.push(awardTypeFilter);
        }

        // add FY time periods
        if (this.timePeriodFY.length > 0) {
            const fyPeriods = [];

            // iterate through each period and create an OR query for start and end date
            this.timePeriodFY.forEach((period) => {
                const filter = {
                    combine_method: 'OR',
                    filters: [
                        {
                            field: 'period_of_performance_start_date',
                            operation: 'fy',
                            value: period
                        },
                        {
                            field: 'period_of_performance_current_end_date',
                            operation: 'fy',
                            value: period
                        }
                    ]
                };

                fyPeriods.push(filter);
            });

            const combinedFilter = {
                combine_method: 'OR',
                filters: fyPeriods
            };
            filters.push(combinedFilter);
        }
        else if (this.timePeriodRange.length === 2) {
            // add time period range as an OR filter
            const periodRange = {
                combine_method: 'OR',
                filters: [
                    {
                        field: 'period_of_performance_start_date',
                        operation: 'range',
                        value: this.timePeriodRange
                    },
                    {
                        field: 'period_of_performance_current_end_date',
                        operation: 'range',
                        value: this.timePeriodRange
                    }
                ]
            };

            filters.push(periodRange);
        }

        return filters;
    }
}

export default SearchOperation;
