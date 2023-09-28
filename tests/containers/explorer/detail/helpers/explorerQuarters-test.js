/**
 * @jest-environment jsdom
 * 
 * explorerQuarters-test.js
 * Created by Kevin Li 2/16/18
 */

import * as explorerQuarters from 'containers/explorer/detail/helpers/explorerQuarters';
import { getPeriodsPerQuarterByFy } from '../../../../../src/js/containers/explorer/detail/helpers/explorerQuarters';

const nativeDate = Date.now;

const mockDate = (date) => {
    // mock the current date
    const month = parseInt(date.substring(5, 7), 10) - 1; // month is zero-indexed
    const day = parseInt(date.substring(8), 10);
    const mock = new Date(date.substring(0, 4), month, day);
    Date.now = () => mock;
};

afterAll(() => {
    // restore the original, native date function
    Date.now = nativeDate;
});

describe('explorerQuarters', () => {
    describe('handlePotentialStrings', () => {
        it('should convert its input to an integer if it is a string', () => {
            const output = explorerQuarters.handlePotentialStrings('12');
            expect(output).toEqual(12);
        });
        it('should return its input otherwise', () => {
            const output = explorerQuarters.handlePotentialStrings(12);
            expect(output).toEqual(12);
        });
    });
    describe('getPeriodsPerQuarterByFy', () => {
        it.each([
            [2019, 0, 1],
            [2020, 2, 3]
        ])('returns the correct array for fiscal year %i', (fy, resultIndex, expected) => {
            const result = getPeriodsPerQuarterByFy(fy);
            expect(result[resultIndex].length).toEqual(expected);
        });
    });
});
