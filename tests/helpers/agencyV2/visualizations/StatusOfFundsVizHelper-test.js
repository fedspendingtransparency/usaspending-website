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
    mockProgramActivityOrObjectClassName } from '../../../mockData/helpers/statusOfFundsHelper';

test('parseRows', () => {
    expect(parseRows(mockData)).toHaveLength(mockParsedData.length);
    expect(parseRows(mockData)).toEqual(expect.arrayContaining(mockParsedData));
});

test('getLevel5Data', () => {
    expect(getLevel5Data(mockProgramActivityOrObjectClassName, mockLevel4ApiResponse)).toHaveLength(mockParsedData.length);
    expect(parseRows(mockData)).toEqual(expect.arrayContaining(mockParsedData));
});
