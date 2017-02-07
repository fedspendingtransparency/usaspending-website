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
    selectedFundingAgencies: new OrderedMap(),
    selectedAwardingAgencies: new OrderedMap(),
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all'
};
