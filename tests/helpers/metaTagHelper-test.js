/**
 * @jest-environment jsdom
 */
import { isCustomPageTitleDefined, getCanonicalUrl } from 'helpers/metaTagHelper';

test.each([
    ['Test Page | USAspending.gov', true],
    ['', false],
    ['USAspending.gov', false],
    [' | USAspending.gov', false],
    ['T | USAspending.gov', true]
])('isCustomPageTitleDefined: when input is %s, return is %s', (input, rtrn) => {
    expect(isCustomPageTitleDefined(input)).toEqual(rtrn);
});

test.each([
    ['/', 'https://www.usaspending.gov'],
    ['/award/123/', 'https://www.usaspending.gov/award/123'],
    ['/test', 'https://www.usaspending.gov/test']
])('getCanonicalUrl: when input is %s, return is %s', (input, rtrn) => {
    expect(getCanonicalUrl(input)).toEqual(rtrn);
});
