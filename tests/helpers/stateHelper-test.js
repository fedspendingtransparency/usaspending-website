/*
 * @jest-environment jsdom

 * stateHelper-test.js
 * Created by Max Kendall 02/05/2021
*/

import { parseStateDataFromUrl, URLifyStateName } from 'helpers/stateHelper';

test.each([
    ['1', false, 'alabama', '01'],
    ['01', false, 'alabama', '01'],
    ['11', false, 'district-of-columbia', '11'],
    ['district-of-columbia', true, 'district-of-columbia', '11'],
    ['78', false, 'us-virgin-islands', '78'],
    ['78', false, 'us-virgin-islands', '78'],
    ['us-virgin-islands', true, 'us-virgin-islands', '78']
])('parseStateDataFromURL fn: given the input %s -- wasInputStateName: %s; state name: %s; FIPS id: %s', (input, wasInputStateName, stateName, fipsId) => {
    expect(parseStateDataFromUrl(input)).toEqual([wasInputStateName, stateName, fipsId]);
});

test.each([
    ['US Virgin Islands', 'us-virgin-islands'],
    ['U.S. Virgin Islands', 'us-virgin-islands'],
    ['south carolina', 'south-carolina'],
    ['district of columbia', 'district-of-columbia']
])('URLifyStateName fn: given the input %s -- urlified name is %s', (input, rtrn) => {
    expect(URLifyStateName(input)).toEqual(rtrn);
});
