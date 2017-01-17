/**
  * SearchOperation.js
  * Created by Kevin Li 11/4/16
  **/

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

        this.awardingAgency = [];
        this.fundingAgency = [];
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
        this.awardingAgency = state.selectedAwardingAgencies;
        this.fundingAgency = state.selectedFundingAgencies;
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
            const timeQuery = TimePeriodQuery.buildQuery(this.timePeriodType,
                this.timePeriodFY, this.timePeriodRange);
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        // add location queries
        if (this.selectedLocations.length > 0) {
            filters.push(LocationQuery.buildLocationQuery(this.selectedLocations));
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters.push(LocationQuery.buildDomesticForeignQuery(this.locationDomesticForeign));
        }

        // add agency queries
        if (this.awardingAgency.length > 0) {
            filters.push(AgencyQuery.buildAwardingAgencyQuery(this.awardingAgency));
        }

        if (this.fundingAgency.length > 0) {
            filters.push(AgencyQuery.buildFundingAgencyQuery(this.fundingAgency));
        }

        return filters;
    }
}

export default SearchOperation;
