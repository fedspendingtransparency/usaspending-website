/**
 * @jest-environment jsdom
 *
 * StatusOfFundsVizHelper-test.js
 * Created by Brian Petway 10/06/23
 * */

import { parseRows, getLevel5Data } from 'helpers/agency/StatusOfFundsVizHelper';
import { mockData,
    mockParsedData,
    mockLevel4ApiResponse,
    mockProgramActivityOrObjectClassName,
    mockLevel5Data } from '../../../mockData/helpers/statusOfFundsHelper';

test('parseRows', () => {
    // the order of the objects is different in the parsedData
    // so we check for length
    // and use arrayContaining to check for contents, out of order
    expect(parseRows(mockData)).toHaveLength(mockParsedData.length);
    expect(parseRows(mockData)).toEqual(expect.arrayContaining(mockParsedData));
});

test('getLevel5Data', () => {
    expect(getLevel5Data(mockProgramActivityOrObjectClassName, mockLevel4ApiResponse)).toEqual(mockLevel5Data);
});
