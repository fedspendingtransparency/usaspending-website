/**
  * SearchOperation.js
  * Created by Kevin Li 11/4/16
  **/

import * as AwardTypeQuery from './queryBuilders/AwardTypeQuery';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';

class SearchOperation {
    constructor() {
        this.awardType = [];
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        // special filter for filtering results to only display those that match certain award types
        // this is used by the search results table "award type" tabs
        this.resultAwardType = [];
    }

    fromState(state) {
        this.awardType = state.awardType.toArray();
        this.timePeriodFY = state.timePeriodFY.toArray();
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
            filters.push(AwardTypeQuery.buildQuery(this.awardType));
        }

        if (this.resultAwardType.length > 0) {
            // an award type subfilter is being applied to the search results (usually from
            // a results table tab)
            // treat this as an AND query for another set of award filters
            filters.push(AwardTypeQuery.buildQuery(this.resultAwardType));
        }

        // add time period queries
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            filters.push(TimePeriodQuery.buildQuery(this.timePeriodFY, this.timePeriodRange));
        }

        return filters;
    }
}

export default SearchOperation;
