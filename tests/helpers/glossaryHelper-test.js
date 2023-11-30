/**
 * @jest-environment jsdom
 */
import { getNewUrlForGlossary } from 'helpers/glossaryHelper';

const glossaryFragment = '?glossary=';

test.each([
    // name, fn
    ['/', glossaryFragment, ''],
    ['/search', `/search${glossaryFragment}`, ''],
    ['/submission-statistics/', `/submission-statistics${glossaryFragment}&fy=2020&period=12`, '?fy=2020&period=12'],
    ['/test', `/test${glossaryFragment}&test=123`, '?test=123'],
    ['/test', `/test${glossaryFragment}&a=123&b=456`, '?a=123&b=456']
])('when existing url is %s, the glossary query param is appended correctly as %s', (existingUrl, expected, existingParams = '') => {
    expect(getNewUrlForGlossary(existingUrl, glossaryFragment, existingParams)).toEqual(expected);
});
