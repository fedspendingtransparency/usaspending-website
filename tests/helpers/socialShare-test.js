/**
 * @jest-environment jsdom
 *
 * socialShare-test
 * by Maxwell Kendall
 * 05/19/2020
 */
import {
    getBaseUrl
} from 'helpers/socialShare';
import "../testResources/mockGlobalConstants";

describe('socialShare helper', () => {
    describe('getBaseUrl', () => {
        it('generates the right url', () => {
            const result = getBaseUrl('agency/123');
            expect(result).toEqual(`https://www.usaspending.gov/agency/123`);
        });
    });
});
