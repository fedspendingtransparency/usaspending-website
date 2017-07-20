/**
  * SearchOperation.js
  * Created by Kevin Li 11/4/16
  **/

import { concat } from 'lodash';

import * as AwardTypeQuery from './queryBuilders/AwardTypeQuery';
import * as TimePeriodQuery from './queryBuilders/TimePeriodQuery';
import * as LocationQuery from './queryBuilders/LocationQuery';
import * as BudgetCategoryQuery from './queryBuilders/BudgetCategoryQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as RecipientQuery from './queryBuilders/RecipientQuery';
import * as KeywordQuery from './queryBuilders/KeywordQuery';
import * as AwardIDQuery from './queryBuilders/AwardIDQuery';
import * as AwardAmountQuery from './queryBuilders/AwardAmountQuery';

class SearchOperation {
    constructor() {
        this.keyword = '';
        this.awardType = [];
        this.timePeriodType = 'fy';
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        // special filter for filtering results to only display those that match certain award types
        // this is used by the search results table "award type" tabs
        this.resultAwardType = [];

        this.selectedLocations = [];
        this.locationDomesticForeign = 'all';

        this.budgetFunctions = [];
        this.federalAccounts = [];
        this.objectClasses = [];

        this.awardingAgencies = [];
        this.fundingAgencies = [];

        this.selectedRecipients = [];
        this.recipientDomesticForeign = 'all';
        this.selectedRecipientLocations = [];
        this.recipientType = [];

        this.selectedAwardIDs = [];

        this.awardAmounts = [];

        this.searchContext = 'award';
    }

    fromState(state) {
        this.keyword = state.keyword;
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

        this.budgetFunctions = state.budgetFunctions.toArray();
        this.federalAccounts = state.federalAccounts.toArray();
        this.objectClasses = state.objectClasses.toObject();

        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();

        this.selectedRecipients = state.selectedRecipients.toArray();
        this.recipientDomesticForeign = state.recipientDomesticForeign;
        this.selectedRecipientLocations = state.selectedRecipientLocations.toArray();
        this.recipientType = state.recipientType.toArray();

        this.selectedAwardIDs = state.selectedAwardIDs.toArray();

        this.awardAmounts = state.awardAmounts.toArray();
    }

    commonParams() {
        // convert the search operation into JS objects for filters that have shared keys and
        // data structures between Awards and Transactions
        const filters = [];

        // add keyword query
        if (this.keyword !== '') {
            filters.push(KeywordQuery.buildKeywordQuery(this.keyword, this.searchContext));
        }

        // Add award types
        if (this.awardType.length > 0) {
            filters.push(AwardTypeQuery.buildQuery(this.awardType, this.searchContext));
        }

        if (this.resultAwardType.length > 0) {
            // an award type subfilter is being applied to the search results (usually from
            // a results table tab)
            // treat this as an AND query for another set of award filters
            // for aggregation queries, we won't apply the prefix to this field because this
            // is specific to the results table
            filters.push(AwardTypeQuery.buildQuery(
                this.resultAwardType, this.searchContext));
        }

        // Add location queries
        if (this.selectedLocations.length > 0) {
            filters.push(LocationQuery.buildLocationQuery(
                this.selectedLocations, this.searchContext));
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters.push(LocationQuery.buildDomesticForeignQuery(
                this.locationDomesticForeign, this.searchContext));
        }

        // Add Budget Category queries
        if (this.budgetFunctions.length > 0) {
            filters.push(BudgetCategoryQuery.buildBudgetFunctionQuery(
                this.budgetFunctions, this.searchContext));
        }

        if (this.federalAccounts.length > 0) {
            filters.push(BudgetCategoryQuery.buildFederalAccountQuery(
                this.federalAccounts, this.searchContext));
        }

        if (Object.keys(this.objectClasses).length > 0) {
            filters.push(BudgetCategoryQuery.buildObjectClassQuery(
                this.objectClasses, this.searchContext));
        }

        // Add recipient queries
        if (this.selectedRecipients.length > 0) {
            filters.push(RecipientQuery.buildRecipientQuery(
                this.selectedRecipients, this.searchContext));
        }

        if (this.recipientDomesticForeign !== '' && this.recipientDomesticForeign !== 'all') {
            filters.push(RecipientQuery.buildDomesticForeignQuery(
                this.recipientDomesticForeign, this.searchContext));
        }

        if (this.selectedRecipientLocations.length > 0) {
            filters.push(RecipientQuery.buildRecipientLocationQuery(
                this.selectedRecipientLocations, this.searchContext));
        }

        if (this.recipientType.length > 0) {
            filters.push(RecipientQuery.buildRecipientTypeQuery(
                this.recipientType, this.searchContext));
        }

        // Add Award ID Queries
        if (this.selectedAwardIDs.length > 0) {
            filters.push(AwardIDQuery.buildAwardIDQuery(
                this.selectedAwardIDs, this.searchContext)
            );
        }

        // Add Award Amount queries
        if (this.awardAmounts.length > 0) {
            const awardAmountsQuery = AwardAmountQuery.buildAwardAmountQuery(
                this.awardAmounts, this.searchContext);
            if (awardAmountsQuery) {
                filters.push(awardAmountsQuery);
            }
        }

        return filters;
    }

    uniqueParams() {
        const filters = [];

        // Add time period queries
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

        // Add agency query
        if (this.fundingAgencies.length > 0 || this.awardingAgencies.length > 0) {
            filters.push(AgencyQuery.buildAgencyQuery(
                this.fundingAgencies, this.awardingAgencies, this.searchContext));
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
        const filters = concat(commonFilters, specificFilters);

        return filters;
    }
}

export default SearchOperation;
