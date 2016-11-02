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

        }
        else if (this.timePeriodRange.length === 2) {
            // add time period range

            const timeRangeStart = {
                field: 'period_of_performance_start_date',
                operation: 'range',
                value: this.timePeriodRange
            };

            const timeRangeEnd = {
                field: 'period_of_performance_current_end_date',
                operation: 'range',
                value: this.timePeriodRange
            };

            filters.push(timeRangeStart);
            filters.push(timeRangeEnd);
        }

        return filters;
    }
}

export default SearchOperation;
