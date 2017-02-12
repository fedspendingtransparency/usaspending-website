/**
 * defaultReduxFilters.js
 * Created by Kevin Li 1/27/17
 */

import { Set, OrderedMap } from 'immutable';

export const defaultFilters = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all'
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
