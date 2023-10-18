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

describe('StatusOfFundsVizHelper', () => {
    describe('parseRows', () => {
        it('should check for children in the data it receives and return an object using the BaseAgencySubcomponentsList as a template', () => {
            // the order of the objects is different in the parsedData
            // so we check for length
            // and use arrayContaining to check for contents, out of order
            expect(parseRows(mockData)).toHaveLength(mockParsedData.length);
            expect(parseRows(mockData)).toEqual(expect.arrayContaining(mockParsedData));
        });
    });

    describe('getLevel5Data', () => {
        it('returns the children of the level 4 data object property that matches the name sent in as a param', () => {
            expect(getLevel5Data(mockProgramActivityOrObjectClassName, mockLevel4ApiResponse)).toEqual(mockLevel5Data);
        });
    });
});
