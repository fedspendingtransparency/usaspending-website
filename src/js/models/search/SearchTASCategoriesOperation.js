/**
  * SearchTASCategoriesOperation.js
  * Created by Kevin Li 4/21/17
  **/

import SearchOperation from './SearchOperation';

import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';

class SearchTASCategoriesOperation extends SearchOperation {
    constructor() {
        super();

        this.searchContext = 'tasCategories';
    }

    uniqueParams() {
        // the parent class will handle all the common params, we just need to convert those
        // that are not shared with awards
        const filters = [];

        // add time period queries
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            const timeQuery = TimePeriodQuery.buildQuery({
                type: this.timePeriodType,
                fyRange: this.timePeriodFY,
                dateRange: this.timePeriodRange,
                endpoint: this.searchContext
            });
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        // Add funding agency query
        if (this.fundingAgencies.length > 0) {
            const frecFilters = [];
            frecFilters.push(AgencyQuery.buildFundingAgencyTASQuery(
                this.fundingAgencies, this.searchContext));
            frecFilters.push(AgencyQuery.buildFundingAgencyTASFRECQuery(
                this.fundingAgencies, this.searchContext));
            filters.push({
                combine_method: 'OR',
                filters: frecFilters
            });
        }

        return filters;
    }
}

export default SearchTASCategoriesOperation;
