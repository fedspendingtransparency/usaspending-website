/**
 * defaultFilters
 * Created by Kevin Li 3/31/17
 */

import { Set, OrderedSet } from 'immutable';

export const defaultFilters = {
    dateType: 'fy',
    fy: new Set(),
    startDate: null,
    endDate: null,
    objectClass: new OrderedSet(),
    programActivity: new OrderedSet()
};
