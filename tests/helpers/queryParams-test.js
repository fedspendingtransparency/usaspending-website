/**
 * queryParams-test.js
 * Created by Maxwell Kendall
*/

import { combineQueryParams } from 'helpers/queryParams';

// NOTE: Not testing the helper fns that utilize URLSearchParams because that is not defined outside the browser.

test.each([
    [{ tab: 'active' }, { fy: '2020', period: '12' }, { tab: 'active', fy: '2020', period: '12' }],
    [{ tab: '' }, { fy: '2020', period: '12' }, { fy: '2020', period: '12', tab: '' }]
])('combineQueryParams takes two objects and combines them as expected', (existingParams, newParams, rtrn) => {
    expect(combineQueryParams(existingParams, newParams)).toEqual(rtrn);
});
