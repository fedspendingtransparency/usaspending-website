/**
 * @jest-environment jsdom
 * 
 * queryParams-test.js
 * Created by Maxwell Kendall
*/

import { combineQueryParams, stripUrlParams } from 'helpers/queryParams';

// NOTE: Not testing the helper fns that utilize URLSearchParams because that is not defined outside the browser.

test.each([
    [{ tab: 'active' }, { fy: '2020', period: '12' }, { tab: 'active', fy: '2020', period: '12' }],
    [{ tab: '' }, { fy: '2020', period: '12' }, { fy: '2020', period: '12', tab: '' }]
])('combineQueryParams takes two objects and combines them as expected', (existingParams, newParams, rtrn) => {
    expect(combineQueryParams(existingParams, newParams)).toEqual(rtrn);
});

describe('queryParams', () => {
    it('should remove invalid URL parameters', () => {
        const queryString = '?a=1&b=2&three=beef_wellington';
        const allowedParams = ['three', 'b', 'd'];
        expect(stripUrlParams(queryString, allowedParams)).toEqual('?b=2&three=beef_wellington');
    });

    it('should not change if all parameters are valid', () => {
        const queryString = '?a=1&b=2&three=beef_wellington';
        const allowedParams = ['b', 'three', 'a'];
        expect(stripUrlParams(queryString, allowedParams)).toEqual('?a=1&b=2&three=beef_wellington');
    });
});
