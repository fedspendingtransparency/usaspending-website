/**
  * SearchOperation.js
  * Created by Kevin Li 11/4/16
  **/

import _ from 'lodash';

import * as AwardTypeQuery from './queryBuilders/AwardTypeQuery';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as LocationQuery from './queryBuilders/LocationQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';

class SearchOperation {
    constructor() {
        this.awardType = [];
        this.timePeriodType = 'fy';
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        // special filter for filtering results to only display those that match certain award types
        // this is used by the search results table "award type" tabs
        this.resultAwardType = [];

        this.awardingAgencies = [];
        this.fundingAgencies = [];
    }

    fromState(state) {
        this.awardType = state.awardType.toArray();
        this.timePeriodFY = state.timePeriodFY.toArray();
        this.timePeriodRange = [];
        this.timePeriodType = state.timePeriodType;
        if (state.timePeriodType === 'dr' && state.timePeriodStart && state.timePeriodEnd) {
            this.timePeriodRange = [state.timePeriodStart, state.timePeriodEnd];
            this.timePeriodFY = [];
        }
        this.selectedLocations = state.selectedLocations.toArray();
        this.locationDomesticForeign = state.locationDomesticForeign;
        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();
    }

    commonParams() {
        // convert the search operation into JS objects for filters that have shared keys and
        // data structures between Awards and Transactions
        const filters = [];

        // add award types
        if (this.awardType.length > 0) {
            filters.push(AwardTypeQuery.buildQuery(this.awardType));
        }

        if (this.resultAwardType.length > 0) {
            // an award type subfilter is being applied to the search results (usually from
            // a results table tab)
            // treat this as an AND query for another set of award filters
            // for aggregation queries, we won't apply the prefix to this field because this
            // is specific to the results table
            filters.push(AwardTypeQuery.buildQuery(this.resultAwardType));
        }

        // add location queries
        if (this.selectedLocations.length > 0) {
            filters.push(LocationQuery.buildLocationQuery(this.selectedLocations));
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters.push(LocationQuery.buildDomesticForeignQuery(this.locationDomesticForeign));
        }

        // add agency queries
        if (this.awardingAgencies.length > 0) {
            filters.push(AgencyQuery.buildAgencyQuery(this.awardingAgencies));
        }

        if (this.fundingAgencies.length > 0) {
            filters.push(AgencyQuery.buildAgencyQuery(this.fundingAgencies));
        }

        return filters;
    }

    uniqueParams() {
        const filters = [];

        // add time period queries
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            const timeQuery = TimePeriodQuery.buildQuery({
                type: this.timePeriodType,
                fyRange: this.timePeriodFY,
                dateRange: this.timePeriodRange
            });
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        return filters;
    }

    toParams() {
        // converts the search operation into a JS object that can be POSTed to the endpoint

        // get the common filters that are shared with all models
        const commonFilters = this.commonParams();

        // now parse the remaining filters that are unique to this model
        const specificFilters = this.uniqueParams();

        // merge the two arrays together into the fully assembled filter parameters
        const filters = _.concat(commonFilters, specificFilters);

        return filters;
    }
}

export default SearchOperation;
