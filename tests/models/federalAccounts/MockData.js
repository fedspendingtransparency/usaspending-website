/**
 * AccountAwardSearchOperation-test.js
 * Created by Jonathan Hill 11/13/19
 */

import { Set, OrderedSet } from 'immutable';

export const mockProps = {
    filters: {
        dateType: 'fy',
        fy: new Set(),
        startDate: null,
        endDate: null,
        objectClass: new OrderedSet(['123', '1234']),
        programActivity: new OrderedSet([]),
        tas: []
    },
    account: {
        id: null,
        agency_identifier: '070',
        main_account_code: '0702',
        title: '',
        description: '',
        totals: {
            available: false,
            obligated: 0,
            unobligated: 0,
            budgetAuthority: 0,
            outlay: 0,
            balanceBroughtForward: 0,
            otherBudgetaryResources: 0,
            appropriations: 0
        }
    }
};
