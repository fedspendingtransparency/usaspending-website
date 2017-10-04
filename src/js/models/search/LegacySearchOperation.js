/**
 * LegacySearchOperation.js
 * Created by Kevin Li 9/11/17
 * TEMPORARY: for converting v2 filters to v1 filters
 */

import { OrderedSet, Set } from 'immutable';
import SearchOperation from './SearchOperation';

export default class LegacySearchOperation extends SearchOperation {
    fromState(state) {
        // the v2 Redux store no longer holds budget category data
        const convertedState = Object.assign({}, state, {
            budgetFunctions: new OrderedSet(),
            federalAccounts: new OrderedSet(),
            objectClasses: new Set()
        });
        super.fromState(convertedState);
    }
}
