/**
 * @jest-environment jsdom
 * 
 * socialShare-test
 * by Maxwell Kendall
 * 05/19/2020
 */
import {
    getSocialShareFn,
    getBaseUrl,
    socialUrls
} from 'helpers/socialShare';

import "../testResources/mockGlobalConstants";

describe('socialShare helper', () => {
    describe('getBaseUrl', () => {
        it('generates the right url', () => {
            const result = getBaseUrl('agency/123');
            expect(result).toEqual(`https://www.usaspending.gov/agency/123`);
        });
    });
    describe('getSocialShareFn', () => {
        const testUrl = encodeURIComponent(getBaseUrl('spending_exploder'));
        it.each([
            ['facebook', `${socialUrls.facebook}${testUrl}`],
            ['twitter', `${socialUrls.twitter}${testUrl}`],
            ['reddit', `${socialUrls.reddit}${testUrl}`],
            ['linkedin', `${socialUrls.linkedin}${testUrl}`]
        ])('generates the right url for %s', (medium, expectedUrl) => {
            const fn = getSocialShareFn(medium);
            fn('spending_exploder');
            expect(window.open).toHaveBeenCalledWith(
                expectedUrl,
                "_blank",
                "left=20,top=20,width=500,height=500,toolbar=1,resizable=0"
            );
        });
    });
});
