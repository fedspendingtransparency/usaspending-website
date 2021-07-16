/**
 * defaultReduxFilters.js
 * Created by Kevin Li 1/27/17
 */

import { Set, OrderedMap } from 'immutable';

import { initialState as covid19DefaultState } from '../../src/js/redux/reducers/covid19/covid19Reducer';
import { initialState as googleAnalyticsDefaultState } from '../../src/js/redux/reducers/googleAnalytics/googleAnalyticsReducer';
import { CheckboxTreeSelections } from '../../src/js/redux/reducers/search/searchFiltersReducer';

import * as FiscalYearHelper from '../../src/js/helpers/fiscalYearHelper';

export const defaultFilters = {
    keyword: new OrderedMap(),
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set([`${FiscalYearHelper.currentFiscalYear()}`]),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all',
    budgetFunctions: new OrderedMap(),
    federalAccounts: new OrderedMap(),
    treasuryAccounts: new OrderedMap(),
    tasCodes: new CheckboxTreeSelections(),
    objectClasses: new OrderedMap(),
    covid19: covid19DefaultState,
    selectedFundingAgencies: new OrderedMap(),
    selectedAwardingAgencies: new OrderedMap(),
    selectedRecipients: new OrderedMap(),
    recipientDomesticForeign: 'all',
    naicsCodes: new CheckboxTreeSelections(),
    pscCodes: new CheckboxTreeSelections(),
    recipientType: new Set(),
    selectedRecipientLocations: new OrderedMap(),
    selectedAwardIDs: new OrderedMap(),
    awardAmounts: new OrderedMap(),
    selectedCFDA: new OrderedMap(),
    selectedNAICS: new OrderedMap(),
    selectedPSC: new OrderedMap(),
    pricingType: new Set(),
    setAside: new Set(),
    extentCompeted: new Set(),
    defCodes: new CheckboxTreeSelections(),
    googleAnalytics: googleAnalyticsDefaultState
};

export const defaultResultsMeta = {
    page: {
        count: 0,
        num_pages: 0,
        page_number: 1,
        total_obligation_sum: 0
    },
    total: {
        count: 0,
        total_obligation_sum: 0
    },
    visualization: {
        transaction_sum: 0
    },
    tableType: 'contracts',
    inFlight: false
};
